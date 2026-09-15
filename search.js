// search.js

// 1. The "Database" (Automatically updated by build_from_sheets.py)
const artists = [
    { name: "Youssouf Bath", url: "african-middle-eastern/artists/youssouf-bath/youssouf-bath.html" },
    { name: "John Christoforou", url: "western/artists/john-christoforou/john-christoforou.html" },
    { name: "Gabriel Ellison", url: "african-middle-eastern/artists/gabriel-ellison/gabriel-ellison.html" },
    { name: "Kent Onah", url: "african-middle-eastern/artists/kent-onah/kent-onah.html" },
    { name: "G. D. Paulraj", url: "asian/artists/g-d-paulraj/g-d-paulraj.html" },
    { name: "Twins Seven Seven", url: "african-middle-eastern/artists/twins-seven-seven/twins-seven-seven.html" },
];

// 2. The Search Logic (Supports local file:///, GitHub Pages, & root domains)
function filterArtists() {
    const input = document.getElementById('artistSearch');
    const resultsContainer = document.getElementById('searchResults');
    
    if (!input || !resultsContainer) return;

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
            
            const isLocal = window.location.protocol === 'file:';
            let finalUrl = '';

            if (isLocal) {
                // Resolves pathing dynamically by finding your local root folder
                const path = window.location.pathname;
                const folderName = 'RedRavenArts/';
                const rootIndex = path.indexOf(folderName);
                
                if (rootIndex !== -1) {
                    const rootPath = path.substring(0, rootIndex + folderName.length);
                    finalUrl = rootPath + artist.url;
                } else {
                    finalUrl = artist.url;
                }
            } else {
                // Hosted web server (GitHub Pages vs Custom Domain)
                if (window.location.hostname.endsWith('github.io')) {
                    // Always locks to the repo name regardless of deep nested subpages
                    finalUrl = '/REDRAVENARTS/' + artist.url;
                } else {
                    // Custom domain / root deployment
                    finalUrl = '/' + artist.url;
                }
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

// 3. Close search dropdown if user clicks outside
document.addEventListener('click', function(event) {
    const searchWrapper = document.querySelector('.search-wrapper');
    const resultsContainer = document.getElementById('searchResults');
    
    if (searchWrapper && resultsContainer) {
        const isClickInside = searchWrapper.contains(event.target);
        if (!isClickInside) {
            resultsContainer.style.display = 'none';
        }
    }
});

// 4. Global Tab Management & History State Handler
document.addEventListener('DOMContentLoaded', function() {
    const tabLinks = document.querySelectorAll('.tab-link');
    
    tabLinks.forEach(button => {
        const onclickAttr = button.getAttribute('onclick');
        if (!onclickAttr) return;
        
        const match = onclickAttr.match(/openTab\(event,\s*'([^']+)'\)/);
        if (match) {
            const tabName = match[1];
            
            button.addEventListener('click', function() {
                if (tabName === 'Works') {
                    window.location.hash = 'works';
                } else {
                    history.replaceState(null, document.title, window.location.pathname + window.location.search);
                }
            });
        }
    });

    function checkHashAndOpenTab() {
        if (window.location.hash === '#works') {
            const targetButton = Array.from(document.querySelectorAll('.tab-link'))
                .find(btn => btn.getAttribute('onclick') && btn.getAttribute('onclick').includes('Works'));
            
            if (targetButton) {
                document.querySelectorAll('.tab-content, .tab-link').forEach(el => el.classList.remove('active'));
                targetButton.classList.add('active');
                const worksContent = document.getElementById('Works');
                if (worksContent) worksContent.classList.add('active');
            }
        } else {
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

    checkHashAndOpenTab();
    window.addEventListener('hashchange', checkHashAndOpenTab);
});