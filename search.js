// search.js

// 1. The "Database"
const artists = [
    { name: "Avinash Chandra", url: "asian/artists/avinash-chandra/avinash-chandra.html" },
    { name: "Baniprosonno", url: "asian/artists/baniprosonno/baniprosonno.html" },
    { name: "Natvar Bhavsar", url: "asian/artists/natvar-bhavsar/natvar-bhavsar.html" },
    { name: "Aftab Ahmed Khan", url: "asian/artists/aftab-ahmed-khan.html" },
    { name: "Amal Ghosh", url: "asian/artists/amal-ghosh/amal-ghosh.html" },
    { name: "Debdas Chakraborty", url: "asian/artists/debdas-chakraborty/debdas-chakraborty.html" },
    { name: "Dil Bahadur Chitrakar", url: "asian/artists/dil-bahadur-chitrakar/dil-bahadur-chitrakar.html" },
    { name: "G D Paulraj", url: "asian/artists/g.-d.-paulraj/gd-paulraj.html" },
    { name: "Gulam Rasool Santosh", url: "asian/artists/gulam-rasool-santosh/gulam-rasool-santosh.html" },
    { name: "J. Sultan Ali", url: "asian/artists/j-sultan-ali/j-sultan-ali.html" },
    { name: "Jamini Roy", url: "asian/artists/jamini-roy/jamini-roy.html" },
    { name: "Jivya Soma Mashe", url: "asian/artists/jivya-soma-mashe/jivya-soma-mashe.html" },
    { name: "Mansoor Rahi", url: "asian/artists/mansoor-rahi/mansoor-rahi.html" },
    { name: "Maqbool Fida Hussain", url: "asian/artists/maqbool-fida-hussain/maqbool-fida-hussain.html" },
    { name: "Mary Krishna", url: "asian/artists/mary-krishna/mary-krishna.html" },
    { name: "Mohan Sharma", url: "asian/artists/mohan-sharma/mohan-sharma.html" },
    { name: "Roop Krishna", url: "asian/artists/roop-krishna/roop-krishna.html" },
    { name: "Saleem Arif Quadri", url: "asian/artists/saleem-arif-quadri/saleem-arif-quadri.html" },
    { name: "Sheshgiri Upendra Nayak", url: "asian/artists/sheshgiri-upendra-nayak/sheshgiri-upendra-nayak.html" },
    { name: "Siramdasu Venkata Rama Rao", url: "asian/artists/siramdasu-venkata-rama-rao/siramdasu-venkata-rama-rao.html" },
    { name: "Wahab Jaffer", url: "asian/artists/wahab-jaffer/wahab-jaffer.html" },
];

// 2. The Logic
function filterArtists() {
    const input = document.getElementById('artistSearch');
    const resultsContainer = document.getElementById('searchResults');
    const query = input.value.toLowerCase();
    
    resultsContainer.innerHTML = '';

    if (query.length < 2) {
        resultsContainer.style.display = 'none';
        return;
    }

    const filtered = artists.filter(artist => 
        artist.name.toLowerCase().includes(query)
    );

    if (filtered.length > 0) {
        resultsContainer.style.display = 'block';
        filtered.forEach(artist => {
            const link = document.createElement('a');
            
            // 1. Get the current "Base" of your project
            // This looks at the URL and finds where the folder 'RedRavenArts' ends
            const isLocal = window.location.protocol === 'file:';
            let finalUrl = '';

            if (isLocal) {
                // Find the path to the main folder and append the artist URL
                const path = window.location.pathname;
                const rootIndex = path.indexOf('RedRavenArts/');
                const rootPath = path.substring(0, rootIndex + 13); // 13 is the length of 'RedRavenArts/'
                finalUrl = rootPath + artist.url;
            } else {
                // If hosted on a server, use the clean root-relative path
                finalUrl = '/' + artist.url;
            }

            link.href = finalUrl;
            link.classList.add('search-item');
            link.textContent = artist.name;
            resultsContainer.appendChild(link);
        });
    } else {
        resultsContainer.style.display = 'none';
    }
}

// 3. Close search if user clicks outside
document.addEventListener('click', function(event) {
    const isClickInside = document.querySelector('.search-wrapper').contains(event.target);
    if (!isClickInside) {
        document.getElementById('searchResults').style.display = 'none';
    }
});