"""One-off script: merges western/images, asian/images and african-middle-eastern/images
into a single ./images folder. Run it from your site root.

1. Leave DRY_RUN = True first. It only reports collisions and moves nothing.
2. Once it reports no collisions, set DRY_RUN = False and run it again.
It COPIES files (originals are kept). Delete the old folders yourself once the site works.
"""
from pathlib import Path
import shutil

ROOT = Path(__file__).parent
DEST = ROOT / "images"
SOURCES = ["western", "asian", "african-middle-eastern"]
DRY_RUN = False

seen = {}
collisions = []
for coll in SOURCES:
    folder = ROOT / coll / "images"
    if not folder.exists():
        print(f"⚠️ Not found, skipping: {folder}")
        continue
    for f in folder.iterdir():
        if not f.is_file():
            continue
        key = f.name.lower()  # case-insensitive, to be safe on Windows/Mac
        if key in seen:
            collisions.append((seen[key], f))
        else:
            seen[key] = f

if collisions:
    print("❌ Filename collisions found. Rename one of each pair, then re-run:")
    for a, b in collisions:
        print(f"   {a}  <->  {b}")
else:
    print(f"✅ {len(seen)} files, no collisions.")
    if DRY_RUN:
        print("Dry run only. Set DRY_RUN = False to copy the files.")
    else:
        DEST.mkdir(exist_ok=True)
        for f in seen.values():
            shutil.copy2(f, DEST / f.name)
        print(f"Copied {len(seen)} files to {DEST}")
