import os
from pathlib import Path

# Root directory of your project
ROOT_DIR = Path(".")

# Folders to ignore during scanning
EXCLUDE_DIRS = {".git", "dist", "node_modules", "json_data", "__pycache__"}

def slug_to_name(slug):
    """Converts 'paul-igboanugo' or 'j-sultan-ali' to 'Paul Igboanugo' / 'J Sultan Ali'."""
    return ' '.join(word.capitalize() for word in slug.split('-'))

def extract_global_artists():
    global_artist_list = []

    # Find all 'artists' directories across all region folders
    for artists_dir in ROOT_DIR.rglob("artists"):
        # Skip excluded directories
        if any(part in EXCLUDE_DIRS for part in artists_dir.parts):
            continue

        # Extract the region folder name (the directory containing /artists/)
        region_name = artists_dir.parent.name

        # Walk through the artists folder for this region
        for root, _, files in os.walk(artists_dir):
            for file in files:
                # Target artist main pages and exclude artwork detail pages inside /works/
                if file.endswith('.html') and 'works' not in Path(root).parts:
                    artist_slug = Path(file).stem
                    display_name = slug_to_name(artist_slug)

                    # Build URL: region/artists/artist-slug/artist-slug.html
                    rel_path = (Path(root).relative_to(artists_dir) / file).as_posix()
                    url = f"{region_name}/artists/{rel_path}"

                    global_artist_list.append({
                        'name': display_name,
                        'url': url
                    })

    # Deduplicate in case an artist appears twice
    unique_artists = {a['url']: a for a in global_artist_list}.values()

    # Sort the global master list alphabetically A-Z by name
    sorted_artists = sorted(unique_artists, key=lambda x: x['name'])

    # Format into JavaScript dictionary
    js_output = ["const artists = ["]
    for artist in sorted_artists:
        js_output.append(f'    {{ name: "{artist["name"]}", url: "{artist["url"]}" }},')
    js_output.append("];")

    final_js = "\n".join(js_output)

    # Print to console
    print("\n" + final_js + "\n")

    # Optionally write directly to search.js
    search_file = ROOT_DIR / "search.js"
    if search_file.exists():
        with open(search_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Replace existing `const artists = [...];` block if present
        import re
        new_content = re.sub(
            r'const artists = \[.*?\];',
            final_js,
            content,
            flags=re.DOTALL
        )
        with open(search_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"✅ Automatically updated global array in '{search_file.name}'!")

if __name__ == "__main__":
    extract_global_artists()