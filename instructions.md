# 🎨 How to Update the Red Raven Arts Collection

Welcome! This guide explains how to add new artworks, update artist details, and publish changes to the live website using Google Sheets.

---

## 📋 Step 1: Update the Google Sheet

1. Open the **RedRavenArts Collection Google Sheet** in your browser. (Check your browser bookmarks or search for it on [Google Sheets](https://sheets.google.com/)).
2. Scroll to the bottom of the table to add your new entry, filling out the columns as follows:

   * **Artist Surname:** The artist's family name used for alphabetical sorting on the site (e.g., *Paulraj*).
      * *Pseudonyms:* For artists known exclusively by a pseudonym (e.g., *Twins Seven Seven*), type the full pseudonym here so they sort under **T**.
   * **Known as:** How the artist's name appears on the site (e.g., *G. D. Paulraj*).
      * You are the expert here! Use your best judgment for initials, pseudonyms, middle names or Chinese name ordering (*Surname Firstname*).
   * **Alias:** An optional secondary name placed in brackets (e.g., `Daniel Harris (Zev)` or `Richard Lin (Lin Show Yu)`). Leave empty if not needed.
   * **Lifespan:** The artist's dates. *(Can be left blank if already filled in for this artist higher up in the sheet)*.
      * **Standard:** `1914-1979`
      * **Living Artist:** `b.1945`
      * **Estimated Date(s):** `c.1914-1979` or `c.1914-c.1979`
      * **Active Period (Birth/Death Unknown):** `fl.1920-1950` or `fl.1960s-1980s`
      * **Birth Known, Death/Status Unknown:** `1914-`
   * **Biography:** Paste your written artist biography here. *(Can be left blank if already filled in for this artist higher up)*.
   * **Collection / Region / Sub-Region:** Select the appropriate options from the dropdown menus.
   * **Artwork Title:** The official title of the piece without quotation marks (e.g., *Sails*). Type **Untitled** if it has no title.
   * **Year:** Creation year of the piece (e.g., `1988` or `c.1988`). Leave blank if unknown.
   * **Width (cm) & Height (cm):** Dimensions in centimeters.
   * **Image Filename:** The exact name of your image file, including the extension (e.g., `paulraj-landscape.jpg`).
   * **Signature:** Details on signing/dating/titling (e.g., *Signed lower right* or *Signed and dated 1974*).
   * **Provenance:** Ownership history listed under the first divider line. Leave empty if none.
   * **Notes:** Additional commentary, subject matter details, or backstory. Leave empty if none.

> **⚠️ Important:** Spelling must be exact! If you are adding a second artwork for an existing artist, make sure **Artist Surname** and **Known as** are spelled identically to earlier entries, otherwise the site will create a duplicate artist page.

---

## 🖼️ Step 2: Add Artwork Images

Before running the website generator, place your new artwork images in the project folder:

1. Open Finder and locate your new image file on your Mac.
2. Open a second Finder window and navigate to the **Red Raven Arts** folder.
3. Go to the correct region folder: **`african-middle-eastern`**, **`asian`**, or **`western`**.
4. Open the **`images`** subfolder and drag your new image file inside.

---

## 🚀 Step 3: Run the Website Generator

Now update the website files with a single double-click:

1. Open the main **Red Raven Arts** folder in Finder.
2. Double-click **`run_builder.command`**.
3. A Terminal window will open automatically and display the build progress.
4. When you see **`✅ Build complete!`**, press `Enter` or close the window. 

*(You can now open `index.html` locally on your computer to preview your changes!)*

---

## 🌐 Step 4: Publish Changes Live to the Web

To send your updates live to the internet:

1. Open **GitHub Desktop** on your Mac.
2. You will see a list of modified files on the left side of the screen.
3. In the lower-left summary box, type a short note about what you added (e.g., *"Added 2 new paintings for G. D. Paulraj"*).
4. Click the blue **Commit to main** button.
5. Click **Push origin** at the top right of the window.

🎉 **Done!** Your website will automatically update online within 1–2 minutes.