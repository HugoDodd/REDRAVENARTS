import os
import re
import shutil
import pandas as pd
from pathlib import Path
from jinja2 import Template

# ==========================================
# CONFIGURATION
# ==========================================
SHEET_ID = "1O02GDnXZUsySrN9noBSCQ8O7Mgz7sr4VqV1fBohxWzo"
SHEET_NAME = "Sheet1"  # Name of the tab in your Google Sheet

BASE_DIR = Path(__file__).parent
SEARCH_JS_FILE = BASE_DIR / "search.js"

def slugify(text):
    if not text or pd.isna(text):
        return ""
    text = str(text).lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    return re.sub(r'[\s_-]+', '-', text)

def fetch_sheet_data():
    """Fetches Google Sheet directly as a Pandas Dataframe via public CSV URL."""
    url = f"https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?tqx=out:csv&sheet={SHEET_NAME}"
    try:
        df = pd.read_csv(url)
        # 1. Fill NaN values with empty strings FIRST
        df = df.fillna("")
        # 2. Clean blank string whitespace across all cells
        df = df.map(lambda x: x.strip() if isinstance(x, str) else x)
        print("✅ Successfully fetched Google Sheet data!")
        return df
    except Exception as e:
        print(f"❌ Failed to fetch Google Sheet: {e}")
        return None

def process_sheets_dataframe(df):
    """Groups artwork rows by artist and extracts artist metadata."""
    artists_dict = {}

    def get_val(row_data, key):
        val = row_data.get(key, '')
        if pd.isna(val) or str(val).strip().lower() in ['nan', '(nan)']:
            return ''
        return str(val).strip()

    for _, row in df.iterrows():
        # 1. Determine Display Name & Alias
        known_as = get_val(row, 'Known as')
        alias = get_val(row, 'Alias')
        surname = get_val(row, 'Artist Surname')

        if not known_as and not surname:
            continue  # Skip empty rows

        base_name = known_as if known_as else surname
        display_name = f"{base_name} ({alias})" if alias else base_name

        artist_slug = slugify(base_name)
        region = get_val(row, 'Region')
        region_slug = slugify(region)
        sub_region = get_val(row, 'Sub-Region')
        sub_region_slug = slugify(sub_region)

        # Initialize Artist record if encountering them for the first time
        if artist_slug not in artists_dict:
            artists_dict[artist_slug] = {
                'surname': surname if surname else base_name,
                'known_as': known_as,
                'alias': alias,
                'artist_name': display_name,
                'slug': artist_slug,
                'lifespan': get_val(row, 'Lifespan'),
                'biography': get_val(row, 'Biography'),
                'collection': get_val(row, 'Collection'),
                'region': region,
                'region_slug': region_slug,
                'sub_region': sub_region,
                'sub_region_slug': sub_region_slug,
                'works': []
            }
        else:
            # Fallback for repeated rows if fields were left blank
            existing = artists_dict[artist_slug]
            if not existing['lifespan']:
                existing['lifespan'] = get_val(row, 'Lifespan')
            if not existing['biography']:
                existing['biography'] = get_val(row, 'Biography')

        # 2. Extract Artwork Details for this row
        title = get_val(row, 'Artwork Title')
        img_filename = get_val(row, 'Image Filename')
        raw_year = get_val(row, 'Year')
        medium = get_val(row, 'Medium')

        if raw_year:
            try:
                year = str(int(float(raw_year)))
            except ValueError:
                year = raw_year  # Fallback for text years like "c. 1988" or "1988-1990"
        else:
            year = ""

        if title or img_filename:
            try:
                w_val = float(row.get('Width (cm)', 1) or 1)
                w = int(round(w_val))
            except ValueError:
                w_val = 1.0
                w = 1
                
            try:
                h_val = float(row.get('Height (cm)', 1) or 1)
                h = int(round(h_val))
            except ValueError:
                h_val = 1.0
                h = 1

            ratio = w_val / h_val if h_val != 0 else 1.0

            if title.lower() == 'untitled' or not title:
                year_str = f"-{year}" if year else ""
                medium_str = f"-{slugify(medium)}" if medium else ""
                work_slug = f"untitled{year_str}{medium_str}"
            else:
                work_slug = slugify(title)

            caption = f"{title}, {year}" if year else title

            artists_dict[artist_slug]['works'].append({
                'title': title,
                'slug': work_slug,
                'year': year,
                'medium': medium,
                'width_cm': w,
                'height_cm': h,
                'image_filename': img_filename,
                'signature': get_val(row, 'Signature'),
                'provenance': get_val(row, 'Provenance'),
                'Notes': get_val(row, 'Notes'),
                'aspect_ratio': ratio,
                'caption': caption
            })

    # Post-process aspect-ratio gallery sorting & select optimal 4:5 featured image
    TARGET_RATIO = 0.8  # ~4:5 aspect ratio container

    for slug, artist in artists_dict.items():
        works = artist['works']
        standard_gallery = [w for w in works if 0.75 <= w['aspect_ratio'] <= 1.4]
        bottom_line_gallery = [w for w in works if w not in standard_gallery]
        bottom_line_gallery.sort(key=lambda x: x['aspect_ratio'])
        
        artist['processed_works'] = works
        artist['final_gallery_items'] = standard_gallery + bottom_line_gallery

        if works:
            # Pick work with aspect ratio closest to 0.8 (4:5)
            best_work = min(works, key=lambda w: abs(w['aspect_ratio'] - TARGET_RATIO))
            artist['featured_image'] = best_work['image_filename']
            artist['featured_caption'] = f"{best_work['title']}, {best_work['year']}" if best_work['year'] else best_work['title']
        else:
            artist['featured_image'] = ''
            artist['featured_caption'] = ''

    return list(artists_dict.values())

def build_artist_pages(artist):
    """
    Renders HTML pages inside collection/artists/artist_slug/
    e.g., african-middle-eastern/artists/eve-de-negri/eve-de-negri.html
    """
    collection_slug = slugify(artist['collection'])
    artist_slug = artist['slug']
    
    # Target directory path
    artist_dir = BASE_DIR / collection_slug / "artists" / artist_slug
    works_dir = artist_dir / "works"
    works_dir.mkdir(parents=True, exist_ok=True)

    # 1. Render Artist Index Page
    template_file = BASE_DIR / 'artist-index-template.html'
    if template_file.exists():
        with open(template_file, 'r', encoding='utf-8') as f:
            index_template = Template(f.read())

        rendered_index = index_template.render(
            artist=artist,
            gallery_works=artist['final_gallery_items'],
            artist_file=f"{artist_slug}.html"
        )

        with open(artist_dir / f"{artist_slug}.html", 'w', encoding='utf-8') as f:
            f.write(rendered_index)
        print(f"✅ Created Page: {collection_slug}/artists/{artist_slug}/{artist_slug}.html")

    # 2. Render Artwork Detail Pages
    detail_file = BASE_DIR / 'artwork-detail-template.html'
    if detail_file.exists():
        with open(detail_file, 'r', encoding='utf-8') as f:
            detail_template = Template(f.read())

        for work in artist['processed_works']:
            rendered_detail = detail_template.render(
                artist=artist,
                work=work,
                artist_file=f"{artist_slug}.html"
            )
            with open(works_dir / f"{work['slug']}.html", 'w', encoding='utf-8') as f:
                f.write(rendered_detail)

def update_search_js(artists_list):
    """Safely updates only the `artists` array in search.js without wiping the click logic."""
    search_entries = []
    
    for artist in artists_list:
        collection_slug = slugify(artist['collection'])
        # Store clean relative path: region/artists/artist-slug/artist-slug.html
        url = f"{collection_slug}/artists/{artist['slug']}/{artist['slug']}.html"
        
        search_entries.append({
            'name': artist['artist_name'],
            'surname': artist['surname'],
            'url': url
        })

    # Sort master search index alphabetically by artist surname
    search_entries.sort(key=lambda x: x['surname'].strip().lower())

    # Build the JavaScript array string
    js_lines = ["const artists = ["]
    for entry in search_entries:
        # Escaping quotes to prevent syntax breaking on names with apostrophes
        safe_name = entry['name'].replace('"', '\\"')
        js_lines.append(f'    {{ name: "{safe_name}", url: "{entry["url"]}" }},')
    js_lines.append("];")
    
    array_code = "\n".join(js_lines)

    if SEARCH_JS_FILE.exists():
        with open(SEARCH_JS_FILE, 'r', encoding='utf-8') as f:
            content = f.read()

        # Update only the `const artists = [...];` array using Regex
        new_content = re.sub(
            r'const artists = \[.*?\];', 
            array_code, 
            content, 
            flags=re.DOTALL
        )
        
        with open(SEARCH_JS_FILE, 'w', encoding='utf-8') as f:
            f.write(new_content)
            
        print(f"🚀 Updated search index in '{SEARCH_JS_FILE.name}' ({len(search_entries)} artists indexed).")
    else:
        print(f"⚠️ Search file missing at '{SEARCH_JS_FILE}'. Creating standalone search array.")
        with open(SEARCH_JS_FILE, 'w', encoding='utf-8') as f:
            f.write(array_code)

def build_region_pages(artists_list):
    """
    Groups artists by Collection -> Region -> Sub-Region,
    sorts sub-regions and artists alphabetically, and renders region HTML pages.
    """
    grouped_data = {}

    for artist in artists_list:
        coll_slug = slugify(artist['collection'])
        reg_slug = artist['region_slug'] if artist.get('region_slug') else slugify(artist.get('region', ''))
        sub_region_name = artist.get('sub_region') or 'General'

        if not coll_slug or not reg_slug:
            continue

        if coll_slug not in grouped_data:
            grouped_data[coll_slug] = {}

        if reg_slug not in grouped_data[coll_slug]:
            grouped_data[coll_slug][reg_slug] = {
                'region_name': artist['region'],
                'collection_name': artist['collection'],
                'sub_regions': {}
            }

        if sub_region_name not in grouped_data[coll_slug][reg_slug]['sub_regions']:
            grouped_data[coll_slug][reg_slug]['sub_regions'][sub_region_name] = []

        grouped_data[coll_slug][reg_slug]['sub_regions'][sub_region_name].append(artist)

    # Load template
    template_path = BASE_DIR / 'region-index-template.html'
    if not template_path.exists():
        print(f"⚠️ Template missing: {template_path.name}")
        return

    with open(template_path, 'r', encoding='utf-8') as f:
        template = Template(f.read())

    # Generate each region index file
    for coll_slug, regions in grouped_data.items():
        for reg_slug, data in regions.items():
            sub_region_sections = []
            
            # 1. Sort sub-regions alphabetically by name
            sorted_sub_regions = sorted(data['sub_regions'].items(), key=lambda x: x[0].strip().lower())

            for sub_name, sub_artists in sorted_sub_regions:
                # 2. Sort artists alphabetically by surname
                sorted_artists = sorted(sub_artists, key=lambda x: x['surname'].strip().lower())
                section_id = slugify(sub_name)
                
                sub_region_sections.append({
                    'id': section_id,
                    'name': sub_name,
                    'artists': sorted_artists
                })

            rendered_html = template.render(
                collection_name=data['collection_name'],
                region_name=data['region_name'],
                sub_region_sections=sub_region_sections
            )

            output_path = BASE_DIR / coll_slug / f"{reg_slug}.html"
            output_path.parent.mkdir(parents=True, exist_ok=True)

            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(rendered_html)

            print(f"✅ Created Region Page: {coll_slug}/{reg_slug}.html")

def cleanup_orphaned_files(active_artists):
    """
    Deletes artist folders and artwork HTML pages that no longer exist 
    in the Google Sheet, while leaving image files completely untouched.
    """
    active_artist_slugs = set()
    active_work_slugs = set()

    for artist in active_artists:
        active_artist_slugs.add((slugify(artist['collection']), artist['slug']))

        for work in artist['processed_works']:
            active_work_slugs.add((slugify(artist['collection']), artist['slug'], work['slug']))

    collections = ['western', 'asian', 'african-middle-eastern']

    for coll in collections:
        coll_dir = BASE_DIR / coll
        if not coll_dir.exists():
            continue

        artists_dir = coll_dir / 'artists'
        if artists_dir.exists():
            for artist_folder in artists_dir.iterdir():
                if artist_folder.is_dir():
                    artist_slug = artist_folder.name
                    
                    if (coll, artist_slug) not in active_artist_slugs:
                        shutil.rmtree(artist_folder)
                        print(f"🗑️ Deleted Removed Artist Directory: {coll}/artists/{artist_slug}")
                    else:
                        works_dir = artist_folder / "works"
                        if works_dir.exists():
                            for work_file in works_dir.glob("*.html"):
                                work_slug = work_file.stem
                                if (coll, artist_slug, work_slug) not in active_work_slugs:
                                    work_file.unlink()
                                    print(f"🗑️ Deleted Removed Artwork HTML: {coll}/artists/{artist_slug}/works/{work_file.name}")

if __name__ == "__main__":
    df = fetch_sheet_data()
    if df is not None:
        print("\n🔨 Generating site from Google Sheets...")
        artists_data = process_sheets_dataframe(df)

        cleanup_orphaned_files(artists_data)
        
        for artist in artists_data:
            build_artist_pages(artist)

        build_region_pages(artists_data)

        update_search_js(artists_data)
        print("\n🎉 Website generation complete!")