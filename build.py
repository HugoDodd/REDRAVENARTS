import os
import re
import time
import hashlib
import shutil
import pandas as pd
from pathlib import Path
from jinja2 import Template


# ==========================================
# CONFIGURATION
# ==========================================
SHEET_ID = "1O02GDnXZUsySrN9noBSCQ8O7Mgz7sr4VqV1fBohxWzo"
ARTIST_SHEET_NAME = "ArtistInfo"
ARTWORK_SHEET_NAME = "ArtworkInfo"

BASE_DIR = Path(__file__).parent
SEARCH_JS_FILE = BASE_DIR / "search.js"
IMAGES_DIR = BASE_DIR / "images"  # single shared images folder in the site root

# The Western / Asian / African & Middle Eastern index pages no longer exist, so the
# collection crumb ("Red Raven Arts / <Collection> / <Region> / ...") is removed from
# every generated page. Set to False to put it back.
HIDE_COLLECTION_IN_BREADCRUMB = True
CRUMB_STATS = {'pages': 0, 'stripped': 0, 'logo': 0, 'favicon': 0}

# Puts the logo (a link to the homepage) at the top left of every generated page, and removes
# the text "Red Raven Arts" crumb it replaces. The logo file lives at <site root>/images/logo.png.
ADD_LOGO_TO_PAGES = False
LOGO_PATH = "images/logo.png"

# Uses the same logo file as the browser-tab icon (and the iPhone home-screen icon) on every page.
ADD_FAVICON_TO_PAGES = True

# The tab icon is a small copy of the logo, made automatically on every build (needs Pillow:
# pip install pillow). If Pillow is missing, or the small file doesn't exist, the full logo is used.
FAVICON_PATH = "images/favicon.png"
FAVICON_SIZE = 192

def slugify(text):
    if not text or pd.isna(text):
        return ""
    text = str(text).lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    return re.sub(r'[\s_-]+', '-', text)

def _loose_pattern(text):
    """Regex for a label that matches '&' and '&amp;' and any run of whitespace."""
    tokens = [t for t in re.split(r'\s+', str(text).strip()) if t]
    def token(t):
        return '(?:&|&amp;)'.join(re.escape(part) for part in t.split('&'))
    return r'\s+'.join(token(t) for t in tokens)

def strip_collection_crumb(html, collection_name):
    """
    Removes the collection crumb (link + its '/' separator) from the page breadcrumb,
    e.g. 'Red Raven Arts / Western / British & European / Artist'
      -> 'Red Raven Arts / British & European / Artist'.
    Only touches the first match inside the breadcrumb block.
    """
    CRUMB_STATS['pages'] += 1
    if not HIDE_COLLECTION_IN_BREADCRUMB or not collection_name:
        return html

    block_re = re.compile(
        r'(<(div|nav|ol|ul)\b[^>]*class="[^"]*\bbreadcrumb\b[^"]*"[^>]*>)(.*?)(</\2>)',
        re.DOTALL | re.IGNORECASE
    )
    crumb_re = re.compile(
        r'<a\b[^>]*>\s*' + _loose_pattern(collection_name) + r'\s*</a>'
        r'\s*(?:<span\b[^>]*\bsep\b[^>]*>\s*/\s*</span>|/)?\s*',
        re.IGNORECASE
    )

    def fix_block(m):
        inner, n = crumb_re.subn('', m.group(3), count=1)
        if n:
            CRUMB_STATS['stripped'] += 1
        return m.group(1) + inner + m.group(4)

    return block_re.sub(fix_block, html, count=1)

def add_logo_to_header(html):
    """
    Adds the logo link before the breadcrumb and removes the 'Red Raven Arts' crumb.
    The logo's link and image path reuse the folder depth of that crumb's own link, so they
    are correct on every kind of page.
    """
    if not ADD_LOGO_TO_PAGES or 'class="site-logo"' in html:
        return html

    block_re = re.compile(
        r'(<(div|nav|ol|ul)\b[^>]*class="[^"]*\bbreadcrumb\b[^"]*"[^>]*>)(.*?)(</\2>)',
        re.DOTALL | re.IGNORECASE
    )
    home_re = re.compile(
        r'<a\b[^>]*href="([^"]*)"[^>]*>\s*Red\s+Raven\s+Arts\s*</a>'
        r'\s*(?:<span\b[^>]*\bsep\b[^>]*>\s*/\s*</span>|/)?\s*',
        re.IGNORECASE
    )

    m = block_re.search(html)
    if not m:
        return html
    hm = home_re.search(m.group(3))
    if not hm:
        return html

    href = hm.group(1)
    if href.endswith('index.html'):
        root = href[:-len('index.html')]
    elif href.endswith('/'):
        root = href
    else:
        return html          # unrecognised link format: leave this page alone

    logo = (f'<a class="site-logo" href="{href}" aria-label="Red Raven Arts, home">'
            f'<img src="{root}{LOGO_PATH}" alt="Red Raven Arts" width="800" height="800"></a>\n        ')
    inner = m.group(3)[:hm.start()] + m.group(3)[hm.end():]
    CRUMB_STATS['logo'] += 1
    return html[:m.start()] + logo + m.group(1) + inner + m.group(4) + html[m.end():]

def make_favicon():
    """Makes images/favicon.png (a small square copy of images/logo.png) so tabs load a light file."""
    if not ADD_FAVICON_TO_PAGES:
        return
    logo = BASE_DIR / LOGO_PATH
    if not logo.exists():
        print(f"ℹ️ Tab icon: {LOGO_PATH} not found, so no small icon was made.")
        return
    try:
        from PIL import Image
    except ImportError:
        print("ℹ️ Tab icon: Pillow isn't installed, so the full-size logo is used. "
              "For a small, faster icon run:  pip install pillow")
        return
    img = Image.open(logo).convert("RGBA")
    img.thumbnail((FAVICON_SIZE, FAVICON_SIZE), Image.LANCZOS)
    canvas = Image.new("RGBA", (FAVICON_SIZE, FAVICON_SIZE), (0, 0, 0, 0))   # square, transparent padding
    canvas.paste(img, ((FAVICON_SIZE - img.width) // 2, (FAVICON_SIZE - img.height) // 2), img)
    canvas.save(BASE_DIR / FAVICON_PATH, optimize=True)
    kb = (BASE_DIR / FAVICON_PATH).stat().st_size / 1024
    print(f"🔖 Tab icon: made {FAVICON_PATH} ({FAVICON_SIZE}x{FAVICON_SIZE}, {kb:.0f} KB) from {LOGO_PATH}.")

def add_favicon_to_head(html):
    """
    Adds the logo as the browser-tab icon. The path to the site root is taken from the logo's
    own link, so it is correct at every folder depth. Any icon the template already has is replaced.
    """
    if not ADD_FAVICON_TO_PAGES:
        return html
    m = re.search(r'class="site-logo"\s+href="([^"]*)"', html)
    if not m or '</head>' not in html:
        return html
    href = m.group(1)
    if href.endswith('index.html'):
        root = href[:-len('index.html')]
    elif href.endswith('/'):
        root = href
    else:
        return html

    html = re.sub(r'[ \t]*<link\b[^>]*\brel="(?:shortcut icon|icon|apple-touch-icon)"[^>]*>\n?', '', html, flags=re.IGNORECASE)
    icon = FAVICON_PATH if (BASE_DIR / FAVICON_PATH).exists() else LOGO_PATH
    tags = (f'    <link rel="icon" type="image/png" href="{root}{icon}">\n'
            f'    <link rel="apple-touch-icon" href="{root}{icon}">\n')
    CRUMB_STATS['favicon'] += 1
    return html.replace('</head>', tags + '</head>', 1)

def finish_page(html, collection_name):
    """Final tidy-up applied to every generated page."""
    return add_favicon_to_head(add_logo_to_header(strip_collection_crumb(html, collection_name)))

def short_hash(text, length=6):
    """Deterministic short hash: the same input always gives the same result, on every build."""
    return hashlib.sha1(str(text).encode('utf-8')).hexdigest()[:length]

def make_work_slug(title, year, medium, img_filename, custom_slug, used_slugs):
    """
    Builds a URL slug for an artwork that is unique within one artist's works folder.

    - custom_slug (optional "Slug" column in the sheet) wins if provided.
    - Untitled works:  untitled-<year>-<hash>   (always hashed, since they collide constantly)
    - Titled works:    <title>   (clean). If the artist already has a work with that slug,
                       the later one becomes <title>-<hash>.
    The hash comes from the image filename, so it does not change when you add, remove
    or reorder rows in the sheet.
    """
    # Stable fingerprint: image filename is the best unique ID; fall back to the other fields
    fingerprint = img_filename or f"{title}|{year}|{medium}"

    if custom_slug:
        slug = custom_slug
    elif not title or title.lower() == 'untitled':
        parts = ["untitled"]
        slug = "-".join(p for p in parts if p) + "-" + short_hash(fingerprint)
    else:
        slug = slugify(title) or "work"
        if slug in used_slugs:
            slug = f"{slug}-{short_hash(fingerprint)}"

    # Safety net: guarantees uniqueness even if two works share an image filename
    candidate, n = slug, 2
    while candidate in used_slugs:
        candidate = f"{slug}-{n}"
        n += 1
    used_slugs.add(candidate)
    return candidate

def fetch_sheet_tab(sheet_name):
    """Fetches a specific Google Sheet tab directly as a Pandas Dataframe with cache-busting."""
    # Adding a timestamp parameter forces Google to bypass the cached version
    cache_buster = int(time.time())
    url = f"https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?tqx=out:csv&sheet={sheet_name}&cb={cache_buster}"
    try:
        df = pd.read_csv(url)
        df = df.fillna("")
        df = df.map(lambda x: x.strip() if isinstance(x, str) else x)
        print(f"✅ Successfully fetched fresh Google Sheet tab: '{sheet_name}'!")
        return df
    except Exception as e:
        print(f"❌ Failed to fetch Google Sheet tab '{sheet_name}': {e}")
        return None

def get_val(row_data, keys):
    """Flexible helper to check multiple possible column header names."""
    if isinstance(keys, str):
        keys = [keys]
    for key in keys:
        if key in row_data:
            val = row_data.get(key, '')
            if not pd.isna(val) and str(val).strip().lower() not in ['nan', '(nan)', '']:
                return str(val).strip()
    return ''

def process_artists_and_artworks(artists_df, artworks_df):
    """
    1. Loops through every artist in Artist Info.
    2. Loops through every artwork in Artwork Info and links to the correct artist via Artist ID.
    """
    artists_dict = {}

    # ==========================================
    # STEP 1: Loop through every artist in Artist Info
    # ==========================================
    print("\n👤 Processing Artist Info tab...")
    for _, row in artists_df.iterrows():
        artist_id = get_val(row, ['Artist ID', 'ArtistID', 'ID', 'artist_id'])
        if not artist_id:
            surname = get_val(row, ['Artist Surname', 'Surname', 'Last Name'])
            known_as = get_val(row, ['Known as', 'Known As', 'First Name'])
            base_name = known_as if known_as else surname
            artist_id = slugify(base_name)
        
        if not artist_id:
            continue

        known_as = get_val(row, ['Known as', 'Known As'])
        alias = get_val(row, ['Alias'])
        surname = get_val(row, ['Artist Surname', 'Surname'])

        base_name = known_as if known_as else surname
        display_name = f"{base_name} ({alias})" if alias else base_name
        artist_slug = slugify(base_name)

        region = get_val(row, ['Region'])
        region_slug = slugify(region)
        sub_region = get_val(row, ['Sub-Region', 'SubRegion', 'Sub Region'])
        sub_region_slug = slugify(sub_region)

        # Initialize artist record
        artists_dict[artist_id] = {
            'artist_id': artist_id,
            'surname': surname if surname else base_name,
            'known_as': known_as,
            'alias': alias,
            'artist_name': display_name,
            'slug': artist_slug,
            'lifespan': format_artist_dates(get_val(row, ['Lifespan', 'Dates'])),
            'biography': get_val(row, ['Biography', 'Bio']),
            'collection': get_val(row, ['Collection']),
            'region': region,
            'region_slug': region_slug,
            'sub_region': sub_region,
            'sub_region_slug': sub_region_slug,
            'works': []
        }
    print(f"✅ Loaded {len(artists_dict)} unique artists.")

    # ==========================================
    # STEP 2: Loop through every artwork in Artwork Info
    # ==========================================
    print("\n🖼️ Processing Artwork Info tab...")
    artwork_count = 0
    used_slugs_by_artist = {}  # artist_id -> set of work slugs already taken
    for _, row in artworks_df.iterrows():
        artist_id = get_val(row, ['Artist ID', 'ArtistID', 'ID', 'artist_id'])
        
        # Fallback matching if Artist ID column varies slightly
        if not artist_id or artist_id not in artists_dict:
            artist_name_ref = get_val(row, ['Artist Surname', 'Artist', 'Artist Name'])
            found_id = None
            for aid, a_data in artists_dict.items():
                if slugify(artist_name_ref) in aid or slugify(artist_name_ref) in a_data['slug'] or slugify(artist_name_ref) in slugify(a_data['surname']):
                    found_id = aid
                    break
            artist_id = found_id

        if not artist_id or artist_id not in artists_dict:
            continue

        title = get_val(row, ['Artwork Title', 'Title', 'Artwork'])
        img_filename = get_val(row, ['Image Filename', 'Image', 'Filename', 'Image File'])
        raw_year = get_val(row, ['Year', 'Date'])
        medium = get_val(row, ['Medium'])

        if raw_year:
            try:
                year = str(int(float(raw_year)))
            except ValueError:
                year = raw_year  # Fallback for text years like "c. 1988"
        else:
            year = ""

        if title or img_filename:
            try:
                w_val = float(row.get('Width (cm)', row.get('Width', 1)) or 1)
                w = int(round(w_val))
            except ValueError:
                w_val = 1.0
                w = 1
                
            try:
                h_val = float(row.get('Height (cm)', row.get('Height', 1)) or 1)
                h = int(round(h_val))
            except ValueError:
                h_val = 1.0
                h = 1

            ratio = w_val / h_val if h_val != 0 else 1.0

            work_slug = make_work_slug(
                title, year, medium, img_filename,
                slugify(get_val(row, ['Slug', 'Artwork Slug'])),
                used_slugs_by_artist.setdefault(artist_id, set())
            )

            caption = f"{title}, {year}" if year else title

            # Append work to the matching artist's works array
            artists_dict[artist_id]['works'].append({
                'title': title,
                'slug': work_slug,
                'year': year,
                'medium': medium,
                'width_cm': w,
                'height_cm': h,
                'image_filename': img_filename,
                'signature': get_val(row, ['Signature']),
                'provenance': get_val(row, ['Provenance']),
                'Notes': get_val(row, ['Notes']),
                'aspect_ratio': ratio,
                'caption': caption
            })
            artwork_count += 1

    print(f"✅ Successfully linked {artwork_count} artworks to their respective artists.")

    # Post-process aspect-ratio gallery sorting & select optimal 4:5 featured image
    TARGET_RATIO = 0.8  

    for artist_id, artist in artists_dict.items():
        works = artist['works']
        standard_gallery = [w for w in works]
        standard_gallery.sort(key=lambda x: abs(x["aspect_ratio"] - TARGET_RATIO))
        
        artist['processed_works'] = works
        artist['final_gallery_items'] = standard_gallery

        if works:
            best_work = min(works, key=lambda w: abs(w['aspect_ratio'] - TARGET_RATIO))
            artist['featured_image'] = best_work['image_filename']
            artist['featured_caption'] = f"{best_work['title']}, {best_work['year']}" if best_work['year'] else best_work['title']
        else:
            artist['featured_image'] = ''
            artist['featured_caption'] = ''

    # Artists with no artworks are left off the site. Their folder is then deleted by
    # cleanup_orphaned_files, and they drop out of the search index and region pages.
    visible = [a for a in artists_dict.values() if a['works']]
    hidden = [a for a in artists_dict.values() if not a['works']]
    if hidden:
        print(f"\n🙈 Hiding {len(hidden)} artist(s) with no artworks:")
        for a in hidden:
            print(f"   - {a['artist_name']} ({a['collection']})")
        print("   (If one of these should have works, check the Artist ID in the ArtworkInfo tab.)")

    return visible

def build_artist_pages(artist):
    """Renders HTML artist pages and individual artwork detail (works) pages."""
    collection_slug = slugify(artist['collection'])
    artist_slug = artist['slug']
    
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

        rendered_index = finish_page(rendered_index, artist['collection'])

        with open(artist_dir / f"{artist_slug}.html", 'w', encoding='utf-8') as f:
            f.write(rendered_index)
        print(f"✅ Created Artist Page: {collection_slug}/artists/{artist_slug}/{artist_slug}.html")

    # 2. Render Individual Artwork Detail (Works) Pages
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
            rendered_detail = finish_page(rendered_detail, artist['collection'])
            with open(works_dir / f"{work['slug']}.html", 'w', encoding='utf-8') as f:
                f.write(rendered_detail)

def update_search_js(artists_list):
    """Safely updates only the `artists` array in search.js."""
    search_entries = []
    
    for artist in artists_list:
        collection_slug = slugify(artist['collection'])
        url = f"{collection_slug}/artists/{artist['slug']}/{artist['slug']}.html"
        
        search_entries.append({
            'name': artist['artist_name'],
            'surname': artist['surname'],
            'url': url
        })

    search_entries.sort(key=lambda x: x['surname'].strip().lower())

    js_lines = ["const artists = ["]
    for entry in search_entries:
        safe_name = entry['name'].replace('"', '\\"')
        js_lines.append(f'    {{ name: "{safe_name}", url: "{entry["url"]}" }},')
    js_lines.append("];")
    
    array_code = "\n".join(js_lines)

    if SEARCH_JS_FILE.exists():
        with open(SEARCH_JS_FILE, 'r', encoding='utf-8') as f:
            content = f.read()

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
    """Groups artists by Collection -> Region -> Sub-Region and renders region pages."""
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

    template_path = BASE_DIR / 'region-index-template.html'
    if not template_path.exists():
        print(f"⚠️ Template missing: {template_path.name}")
        return

    with open(template_path, 'r', encoding='utf-8') as f:
        template = Template(f.read())

    for coll_slug, regions in grouped_data.items():
        for reg_slug, data in regions.items():
            sub_region_sections = []
            
            sorted_sub_regions = sorted(data['sub_regions'].items(), key=lambda x: x[0].strip().lower())

            for sub_name, sub_artists in sorted_sub_regions:
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

            rendered_html = finish_page(rendered_html, data['collection_name'])

            output_path = BASE_DIR / coll_slug / f"{reg_slug}.html"
            output_path.parent.mkdir(parents=True, exist_ok=True)

            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(rendered_html)

            print(f"✅ Created Region Page: {coll_slug}/{reg_slug}.html")

def cleanup_orphaned_files(active_artists):
    """Deletes artist folders and artwork HTML pages that no longer exist."""
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

def format_artist_dates(date_str):
    """Normalizes artist date formats for web display."""
    if not date_str:
        return ""
    s = str(date_str).strip()
    s = re.sub(r'(\d{4})\'s', r'\1s', s, flags=re.IGNORECASE)
    s = re.sub(r'(\d{4}s)(?:\/\d{2}s)+', lambda m: f"{m.group(1)}-19{m.group(0).split('/')[-1]}", s, flags=re.IGNORECASE)
    s = re.sub(r'\bf\.?l\.?\s*', 'fl.', s, flags=re.IGNORECASE)
    s = re.sub(r'\b([cbd])\.\s*', lambda m: m.group(1).lower() + '.', s, flags=re.IGNORECASE)
    s = re.sub(r'(\d{4}s?|\d{2}s?)\s*[-–]\s*(\d{4}s?|\d{2}s?|c\.|b\.|d\.|fl\.)', r'\1 – \2', s)
    s = re.sub(r'(\d+)\s*[-–]\s*$', r'\1 – ', s)
    return s

def check_images(artists_list):
    """Warns about artwork images that are missing from the root images folder."""
    on_disk = {p.name for p in IMAGES_DIR.iterdir() if p.is_file()} if IMAGES_DIR.exists() else set()
    lower_map = {n.lower(): n for n in on_disk}
    problems = 0
    for artist in artists_list:
        for work in artist['processed_works']:
            fn = work['image_filename']
            if fn in on_disk:
                continue
            problems += 1
            label = f"{artist['artist_name']} - {work['title'] or work['slug']}"
            if not fn:
                print(f"⚠️ No image filename: {label}")
            elif fn.lower() in lower_map:
                print(f"⚠️ Case mismatch: {label}: sheet says '{fn}', file is '{lower_map[fn.lower()]}'")
            else:
                print(f"⚠️ Missing image: {label}: '{fn}'")
    print(f"🖼️ Image check complete: {problems} problem(s) found.")

if __name__ == "__main__":
    print("\n📥 Fetching data from Google Sheet tabs...")
    artists_df = fetch_sheet_tab(ARTIST_SHEET_NAME)
    artworks_df = fetch_sheet_tab(ARTWORK_SHEET_NAME)

    if artists_df is not None and artworks_df is not None:
        print("\n🔨 Generating site from separate Artist and Artwork sheets...")
        artists_data = process_artists_and_artworks(artists_df, artworks_df)
        make_favicon()
        check_images(artists_data)

        cleanup_orphaned_files(artists_data)
        
        for artist in artists_data:
            build_artist_pages(artist)

        build_region_pages(artists_data)

        update_search_js(artists_data)

        if HIDE_COLLECTION_IN_BREADCRUMB:
            print(f"\n🧭 Breadcrumbs: removed the collection crumb from {CRUMB_STATS['stripped']} of {CRUMB_STATS['pages']} pages.")
            if ADD_LOGO_TO_PAGES:
                print(f"🖼️ Logo: added to {CRUMB_STATS['logo']} of {CRUMB_STATS['pages']} pages.")
            if ADD_FAVICON_TO_PAGES:
                print(f"🔖 Tab icon: added to {CRUMB_STATS['favicon']} of {CRUMB_STATS['pages']} pages.")
            if CRUMB_STATS['stripped'] < CRUMB_STATS['pages']:
                print("⚠️ Some pages still show the collection. Their template may build the breadcrumb "
                      "differently; check the breadcrumb markup in the templates.")
        print("\n🎉 Website generation complete!")