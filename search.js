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

// Global Tab Management & History State Handler for Red Raven Arts
document.addEventListener('DOMContentLoaded', function() {
    // 1. Intercept tab button clicks automatically
    const tabLinks = document.querySelectorAll('.tab-link');
    
    tabLinks.forEach(button => {
        // Extract the tab name ('Overview' or 'Works') from your existing inline onclick attribute
        const onclickAttr = button.getAttribute('onclick');
        if (!onclickAttr) return;
        
        const match = onclickAttr.match(/openTab\(event,\s*'([^']+)'\)/);
        if (match) {
            const tabName = match[1];
            
            // Add an extra layer of behavior when clicked
            button.addEventListener('click', function() {
                if (tabName === 'Works') {
                    window.location.hash = 'works';
                } else {
                    // Clears the hash cleanly when navigating back to Overview
                    history.replaceState(null, document.title, window.location.pathname + window.location.search);
                }
            });
        }
    });

    // 2. Automatically handle initial load and back button operations
    function checkHashAndOpenTab() {
        if (window.location.hash === '#works') {
            const targetButton = Array.from(document.querySelectorAll('.tab-link'))
                .find(btn => btn.getAttribute('onclick') && btn.getAttribute('onclick').includes('Works'));
            
            if (targetButton) {
                // Remove active states from all buttons/tabs
                document.querySelectorAll('.tab-content, .tab-link').forEach(el => el.classList.remove('active'));
                
                // Set active states for the Works tab
                targetButton.classList.add('active');
                const worksContent = document.getElementById('Works');
                if (worksContent) worksContent.classList.add('active');
            }
        } else {
            // Revert to Overview if hash is empty (e.g. forward/backward navigation changes)
            const overviewButton = Array.from(document.querySelectorAll('.tab-link'))
                .find(btn => btn.getAttribute('onclick') && btn.getAttribute('onclick').includes('Overview'));
            
            if (overviewButton) {
                document.querySelectorAll('.tab-content, .tab-link').forEach(el => el.classList.remove('active'));
                overviewButton.classList.add('active');
                const overviewContent = document.getElementById('Overview');
                if (overviewContent) overviewContent.classList.add('active');
            }
        }
    }

    // Run the checks
    checkHashAndOpenTab();
    window.addEventListener('hashchange', checkHashAndOpenTab);
});