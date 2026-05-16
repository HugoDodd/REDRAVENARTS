<<<<<<< HEAD
// search.js

// 1. The "Database"
const artists = [
    { name: "Avinash Chandra", url: "asian/artists/avinash-chandra.html" },
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
                finalUrl = 'file:///C:/Users/garet/OneDrive/Documents/GitHub/REDRAVENARTS/' + artist.url;
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
=======
// search.js

// 1. The "Database"
const artists = [
    { name: "Avinash Chandra", url: "asian/artists/avinash-chandra/avinash-chandra.html" },
    { name: "Baniprosonno", url: "asian/artists/baniprosonno/baniprosonno.html" },
    { name: "Natvar Bhavsar", url: "asian/artists/natvar-bhavsar/natvar-bhavsar.html" },
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
>>>>>>> 6b43cde (Changed directory structure and added first 3 artists.)
});