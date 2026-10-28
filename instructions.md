# 🎨 How to Update the Red Raven Arts Collection

---

## 📋 Step 1: Update the Google Sheet

1. Open the **RedRavenArts Collection Google Sheet** in your browser. (It should be in recent documents on [Google Sheets](https://sheets.google.com/)).
2. Choose either the ArtistInfo sheet or ArtworkInfo sheet and add a new entry.
3. The ArtistInfo fields are as follows:
   * **Artist ID**: A unique ID assigned to each artist in the form ARTIST-0001, ARTIST-0002, ARTIST-0003, etc.

   * **Artist Surname**: The artist's family name used for alphabetical sorting on the site (e.g., Paulraj). For artists known exclusively by a pseudonym (e.g., Twins Seven Seven), type the full pseudonym here so they sort under the appropriate letter (e.g., T).

   * **Known as**: How the artist's name appears on the site (e.g., G. D. Paulraj, Twins Seven Seven).

   * **Alias**: An optional secondary name placed in brackets (e.g., Daniel Harris (Zev) or Richard Lin (Lin Show Yu)). Leave empty if not needed (most artists).

   * **Lifespan**: The artist's dates.
      * Standard: 1914-1979
      * Living Artist: b.1945
      * Estimated Date(s): c.1914-1979
      * Active Period (Birth/Death Unknown): fl.1920-1950 or fl.1960s-1980s
      * Birth Known, Death/Status Unknown: 1914-
   
   * **Biography**: The written biography for the artist found in the document.
   
   * **Collection**: Western, Asian, or African & Middle Eastern.

   * **Region**: British & European, Americas & Other Western, East Asian, South Asian, South East Asian, North African & Middle Eastern, Sub-Saharan African.

   * **Sub-Region**: Britain & Europe, United States & Canada, Latin America, Caribbean, Oceania, China (incl. Hong Kong & Taiwan), Mongolia, Korea, Japan, Bangladesh, India, Nepal, Pakistan, Mainland Southeast Asia, Philippines, Malaysia & Singapore, Indonesia, North Africa, Middle East, East Africa, Nigeria, West Africa, Southern Africa, Congo.

4. The ArtworkInfo fields are as follows:

   * **Artist ID**: The unique ID of the artist from `ArtistInfo`.
   
   * **Artwork Title**: The official title of the piece without quotation marks (e.g., Sails). Type Untitled if it has no title.

   * **Year**: Creation year of the piece (e.g., 1988 or c.1988). Leave blank if unknown.

   * **Medium**: The artwork medium.
   
   * **Width (cm) & Height (cm)**: Dimensions in centimeters.
   
   * **Image Filename**: The filename that the artwork image was saved under. The ones that will work can be found on the website in the collection folder, for example in `western/images/`. Please include the file extension (e.g., Aguilar Alcuiz-500.jpg)

   * **Signature**: Details on signing/dating/titling (e.g., Signed lower right or Signed and dated 1974).

   * **Provenance**: Ownership history listed under the first divider line. Leave empty if none.

   * **Notes**: Additional commentary, subject matter details, or backstory. Leave empty if none.

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

1. Open the file in VSCode.
2. Find the **Source Control** tab on the left (third one down, looks like a 4speed gearbox  pattern, will have a blue bubble with the number of changes you have made since last time in it).
3. Add a short message in the message box on what you changed.
4. Click the **Commit to main** button.
5. Click **Push origin** button.

🎉 **Done!** Your website will automatically update online within 1–2 minutes.