// search.js

// 1. The "Database"
const artists = [
    { name: "Abdul Karim Al Orrayed", url: "african-middle-eastern/artists/abdul-karim-al-orrayed/abdul-karim-al-orrayed.html" },
    { name: "Adebisi Fabunmi", url: "african-middle-eastern/artists/adebisi-fabunmi/adebisi-fabunmi.html" },
    { name: "Ademola Williams", url: "african-middle-eastern/artists/ademola-williams/ademola-williams.html" },
    { name: "Adomech Moyo", url: "african-middle-eastern/artists/adomech-moyo/adomech-moyo.html" },
    { name: "Aftab Ahmed Khan", url: "asian/artists/aftab-ahmed-khan/aftab-ahmed-khan.html" },
    { name: "Ahmad Shibrain", url: "african-middle-eastern/artists/ahmad-shibrain/ahmad-shibrain.html" },
    { name: "Ahmed Abdel Aal", url: "african-middle-eastern/artists/ahmed-abdel-aal/ahmed-abdel-aal.html" },
    { name: "Ahmed Abushariaa", url: "african-middle-eastern/artists/ahmed-abushariaa/ahmed-abushariaa.html" },
    { name: "Akinola Lasekan", url: "african-middle-eastern/artists/akinola-lasekan/akinola-lasekan.html" },
    { name: "Albert Dombe", url: "african-middle-eastern/artists/albert-dombe/albert-dombe.html" },
    { name: "Albert Mongita", url: "african-middle-eastern/artists/albert-mongita/albert-mongita.html" },
    { name: "Albert Osabu Bartimeus", url: "african-middle-eastern/artists/albert-osabu-bartimeus/albert-osabu-bartimeus.html" },
    { name: "Alphonse Kiabelua", url: "african-middle-eastern/artists/alphonse-kiabelua/alphonse-kiabelua.html" },
    { name: "Alphonse Moto", url: "african-middle-eastern/artists/alphonse-moto/alphonse-moto.html" },
    { name: "Amal Ghosh", url: "asian/artists/amal-ghosh/amal-ghosh.html" },
    { name: "Asiru Olatunde", url: "african-middle-eastern/artists/asiru-olatunde/asiru-olatunde.html" },
    { name: "Avinash Chandra", url: "asian/artists/avinash-chandra/avinash-chandra.html" },
    { name: "Ayyad Al Nimer", url: "african-middle-eastern/artists/ayyad-al-nimer/ayyad-al-nimer.html" },
    { name: "Baniprosonno", url: "asian/artists/baniprosonno/baniprosonno.html" },
    { name: "Bayo Ogundele", url: "african-middle-eastern/artists/bayo-ogundele/bayo-ogundele.html" },
    { name: "Benjamin Menyah", url: "african-middle-eastern/artists/benjamin-menyah/benjamin-menyah.html" },
    { name: "Bernard Baifang", url: "african-middle-eastern/artists/bernard-baifang/bernard-baifang.html" },
    { name: "Borko Lazeski", url: "african-middle-eastern/artists/borko-lazeski/borko-lazeski.html" },
    { name: "Bruce Onobrakpeya", url: "african-middle-eastern/artists/bruce-onobrakpeya/bruce-onobrakpeya.html" },
    { name: "Burigude Zhang", url: "asian/artists/burigude-zhang/burigude-zhang.html" },
    { name: "Charles Kamangwana", url: "african-middle-eastern/artists/charles-kamangwana/charles-kamangwana.html" },
    { name: "Charles Sambono", url: "african-middle-eastern/artists/charles-sambono/charles-sambono.html" },
    { name: "Chen Kuan", url: "asian/artists/chen-kuan/chen-kuan.html" },
    { name: "Cheung Yee", url: "asian/artists/cheung-yee/cheung-yee.html" },
    { name: "Chien Ying Chang", url: "asian/artists/chien-ying-chang/chien-ying-chang.html" },
    { name: "Chihung Yang", url: "asian/artists/chihung-yang/chihung-yang.html" },
    { name: "Christo Coetzee", url: "african-middle-eastern/artists/christo-coetzee/christo-coetzee.html" },
    { name: "Chuks Anyanwu", url: "african-middle-eastern/artists/chuks-anyanwu/chuks-anyanwu.html" },
    { name: "Claude Goma", url: "african-middle-eastern/artists/claude-goma/claude-goma.html" },
    { name: "Clifford Frith", url: "african-middle-eastern/artists/clifford-frith/clifford-frith.html" },
    { name: "David Osevwe", url: "african-middle-eastern/artists/david-osevwe/david-osevwe.html" },
    { name: "Debdas Chakraborty", url: "asian/artists/debdas-chakraborty/debdas-chakraborty.html" },
    { name: "Dil Bahadur Chitrakar", url: "asian/artists/dil-bahadur-chitrakar/dil-bahadur-chitrakar.html" },
    { name: "Diran Garabedian", url: "african-middle-eastern/artists/diran-garabedian/diran-garabedian.html" },
    { name: "Dora Khayatt", url: "african-middle-eastern/artists/dora-khayatt/dora-khayatt.html" },
    { name: "Edmund Tetteh", url: "african-middle-eastern/artists/edmund-tetteh/edmund-tetteh.html" },
    { name: "Edward Njenga", url: "african-middle-eastern/artists/edward-njenga/edward-njenga.html" },
    { name: "Emmanuel Owusu Dartey", url: "african-middle-eastern/artists/emmanuel-owusu-dartey/emmanuel-owusu-dartey.html" },
    { name: "Emmanuel Taiwo Jegede", url: "african-middle-eastern/artists/emmanuel-taiwo-jegede/emmanuel-taiwo-jegede.html" },
    { name: "Eve De Negri", url: "african-middle-eastern/artists/eve-de-negri/eve-de-negri.html" },
    { name: "Faisal Laibi Sahi", url: "african-middle-eastern/artists/faisal-laibi-sahi/faisal-laibi-sahi.html" },
    { name: "Fela Odaranile", url: "african-middle-eastern/artists/fela-odaranile/fela-odaranile.html" },
    { name: "Fidel Oyiogu", url: "african-middle-eastern/artists/fidel-oyiogu/fidel-oyiogu.html" },
    { name: "Francis Msangi", url: "african-middle-eastern/artists/francis-msangi/francis-msangi.html" },
    { name: "Francois Iloki", url: "african-middle-eastern/artists/francois-iloki/francois-iloki.html" },
    { name: "Francois Thango", url: "african-middle-eastern/artists/francois-thango/francois-thango.html" },
    { name: "Gabriel Ellison", url: "african-middle-eastern/artists/gabriel-ellison/gabriel-ellison.html" },
    { name: "Gaspard De Mouko", url: "african-middle-eastern/artists/gaspard-de-mouko/gaspard-de-mouko.html" },
    { name: "Gd Paulraj", url: "asian/artists/g.-d.-paulraj/gd-paulraj.html" },
    { name: "George Kyeyune", url: "african-middle-eastern/artists/george-kyeyune/george-kyeyune.html" },
    { name: "Georges Sabbagh", url: "african-middle-eastern/artists/georges-sabbagh/georges-sabbagh.html" },
    { name: "Georgina Beier", url: "african-middle-eastern/artists/georgina-beier/georgina-beier.html" },
    { name: "Gerard Bhengu", url: "african-middle-eastern/artists/gerard-bhengu/gerard-bhengu.html" },
    { name: "Ghulam Rasool Santosh", url: "asian/artists/gulam-rasool-santosh/ghulam-rasool-santosh.html" },
    { name: "Gladys Mgudlandlu", url: "african-middle-eastern/artists/gladys-mgudlandlu/gladys-mgudlandlu.html" },
    { name: "Hans Werner Geerdts", url: "african-middle-eastern/artists/hans-werner-geerdts/hans-werner-geerdts.html" },
    { name: "Hargreaves Ntukwana", url: "african-middle-eastern/artists/hargreaves-ntukwana/hargreaves-ntukwana.html" },
    { name: "Hussein Shariffe", url: "african-middle-eastern/artists/hussein-shariffe/hussein-shariffe.html" },
    { name: "Ibou Diouf", url: "african-middle-eastern/artists/ibou-diouf/ibou-diouf.html" },
    { name: "Ignatius Sserulyo", url: "african-middle-eastern/artists/ignatius-sserulyo/ignatius-sserulyo.html" },
    { name: "Ihab Shaker", url: "african-middle-eastern/artists/ihab-shaker/ihab-shaker.html" },
    { name: "Israel Ala", url: "african-middle-eastern/artists/israel-ala/israel-ala.html" },
    { name: "J Sultan Ali", url: "asian/artists/j-sultan-ali/j-sultan-ali.html" },
    { name: "Jacob Afolabi", url: "african-middle-eastern/artists/jacob-afolabi/jacob-afolabi.html" },
    { name: "Jacob Yacouba", url: "african-middle-eastern/artists/jacob-yacouba/jacob-yacouba.html" },
    { name: "Jak Katarikawe", url: "african-middle-eastern/artists/jak-katarikawe/jak-katarikawe.html" },
    { name: "James Adedayo", url: "african-middle-eastern/artists/james-adedayo/james-adedayo.html" },
    { name: "Jamini Roy", url: "asian/artists/jamini-roy/jamini-roy.html" },
    { name: "Jean Khalife", url: "african-middle-eastern/artists/jean-khalife/jean-khalife.html" },
    { name: "Jimoh Buraimoh", url: "african-middle-eastern/artists/jimoh-buraimoh/jimoh-buraimoh.html" },
    { name: "Jivya Soma Mashe", url: "asian/artists/jivya-soma-mashe/jivya-soma-mashe.html" },
    { name: "John Hlatywayo", url: "african-middle-eastern/artists/john-hlatywayo/john-hlatywayo.html" },
    { name: "Jorge Nhaca", url: "african-middle-eastern/artists/jorge-nhaca/jorge-nhaca.html" },
    { name: "Kabinda Kunkulu Victor", url: "african-middle-eastern/artists/kabinda-kunkulu-victor/kabinda-kunkulu-victor.html" },
    { name: "Kamel Moustafa", url: "african-middle-eastern/artists/kamel-moustafa/kamel-moustafa.html" },
    { name: "Kefas Danjuma", url: "african-middle-eastern/artists/kefas-danjuma/kefas-danjuma.html" },
    { name: "Kent Onah", url: "african-middle-eastern/artists/kent-onah/kent-onah.html" },
    { name: "Kingsley Sambo", url: "african-middle-eastern/artists/kingsley-sambo/kingsley-sambo.html" },
    { name: "Labib Tadros", url: "african-middle-eastern/artists/labib-tadros/labib-tadros.html" },
    { name: "Lamine Dolo", url: "african-middle-eastern/artists/lamine-dolo/lamine-dolo.html" },
    { name: "Larry Scully", url: "african-middle-eastern/artists/larry-scully/larry-scully.html" },
    { name: "Lema Kusa", url: "african-middle-eastern/artists/lema-kusa/lema-kusa.html" },
    { name: "Li Mei Shu", url: "asian/artists/li-mei-shu/li-mei-shu.html" },
    { name: "Lionel Abrams", url: "african-middle-eastern/artists/lionel-abrams/lionel-abrams.html" },
    { name: "Louis Mwaniki", url: "african-middle-eastern/artists/louis-mwaniki/louis-mwaniki.html" },
    { name: "Lucky Sibiya", url: "african-middle-eastern/artists/lucky-sibiya/lucky-sibiya.html" },
    { name: "Luis Meque", url: "african-middle-eastern/artists/luis-meque/luis-meque.html" },
    { name: "Manoucher Yektai", url: "african-middle-eastern/artists/manoucher-yektai/manoucher-yektai.html" },
    { name: "Mansoor Rahi", url: "asian/artists/mansoor-rahi/mansoor-rahi.html" },
    { name: "Maqbool Fida Husain", url: "asian/artists/maqbool-fida-hussain/maqbool-fida-husain.html" },
    { name: "Marwan Kassab Bachi Marwan", url: "african-middle-eastern/artists/marwan-kassab-bachi-marwan/marwan-kassab-bachi-marwan.html" },
    { name: "Mary Krishna", url: "asian/artists/mary-krishna/mary-krishna.html" },
    { name: "Michael Agwu", url: "african-middle-eastern/artists/michael-agwu/michael-agwu.html" },
    { name: "Michael Ororke", url: "african-middle-eastern/artists/michael-ororke/michael-ororke.html" },
    { name: "Modou Niang", url: "african-middle-eastern/artists/modou-niang/modou-niang.html" },
    { name: "Mohammed Hassan", url: "african-middle-eastern/artists/mohammed-hassan/mohammed-hassan.html" },
    { name: "Mohan Sharma", url: "asian/artists/mohan-sharma/mohan-sharma.html" },
    { name: "Nasser Assar", url: "african-middle-eastern/artists/nasser-assar/nasser-assar.html" },
    { name: "Nasser Chaura", url: "african-middle-eastern/artists/nasser-chaura/nasser-chaura.html" },
    { name: "Natvar Bhavsar", url: "asian/artists/natvar-bhavsar/natvar-bhavsar.html" },
    { name: "Olayinka Burney Nicol", url: "african-middle-eastern/artists/olayinka-burney-nicol/olayinka-burney-nicol.html" },
    { name: "Oluwola Olayemi", url: "african-middle-eastern/artists/oluwola-olayemi/oluwola-olayemi.html" },
    { name: "Omar El Nagdi", url: "african-middle-eastern/artists/omar-el-nagdi/omar-el-nagdi.html" },
    { name: "Osi Audu", url: "african-middle-eastern/artists/osi-audu/osi-audu.html" },
    { name: "Paul Igboanugo", url: "african-middle-eastern/artists/paul-igboanugo/paul-igboanugo.html" },
    { name: "Peter Badejo", url: "african-middle-eastern/artists/peter-badejo/peter-badejo.html" },
    { name: "Philip Amonoo", url: "african-middle-eastern/artists/philip-amonoo/philip-amonoo.html" },
    { name: "Ram Yedekar", url: "asian/artists/ram-yedekar/ram-yedekar.html" },
    { name: "Rana Chalabi", url: "african-middle-eastern/artists/rana-chalabi/rana-chalabi.html" },
    { name: "Reza Mafi", url: "african-middle-eastern/artists/reza-mafi/reza-mafi.html" },
    { name: "Richard Lin", url: "asian/artists/richard-lin/richard-lin.html" },
    { name: "Roger Botembe", url: "african-middle-eastern/artists/roger-botembe/roger-botembe.html" },
    { name: "Roop Krishna", url: "asian/artists/roop-krishna/roop-krishna.html" },
    { name: "Rufus Ogundele", url: "african-middle-eastern/artists/rufus-ogundele/rufus-ogundele.html" },
    { name: "Saadi Al Kaabi", url: "african-middle-eastern/artists/saadi-al-kaabi/saadi-al-kaabi.html" },
    { name: "Sabry Ragheb", url: "african-middle-eastern/artists/sabry-ragheb/sabry-ragheb.html" },
    { name: "Sakher Farzat", url: "african-middle-eastern/artists/sakher-farzat/sakher-farzat.html" },
    { name: "Salah Enani", url: "african-middle-eastern/artists/salah-enani/salah-enani.html" },
    { name: "Saleem Arif Quadri", url: "asian/artists/saleem-arif-quadri/saleem-arif-quadri.html" },
    { name: "Salem Salah", url: "african-middle-eastern/artists/salem-salah/salem-salah.html" },
    { name: "Sam Ntiro", url: "african-middle-eastern/artists/sam-ntiro/sam-ntiro.html" },
    { name: "Sam Songo", url: "african-middle-eastern/artists/sam-songo/sam-songo.html" },
    { name: "Samir Nanoo", url: "african-middle-eastern/artists/samir-nanoo/samir-nanoo.html" },
    { name: "Seyni Diagne Diop", url: "african-middle-eastern/artists/seyni-diagne-diop/seyni-diagne-diop.html" },
    { name: "Sheshgiri Upendra Nayak", url: "asian/artists/sheshgiri-upendra-nayak/sheshgiri-upendra-nayak.html" },
    { name: "Shi Chi Lee", url: "asian/artists/shi-chi-lee/shi-chi-lee.html" },
    { name: "Siramdasu Venkata Rama Rao", url: "asian/artists/siramdasu-venkata-rama-rao/siramdasu-venkata-rama-rao.html" },
    { name: "Soku Ldj", url: "african-middle-eastern/artists/soku-ldj/soku-ldj.html" },
    { name: "Suad Al Attar", url: "african-middle-eastern/artists/suad-al-attar/suad-al-attar.html" },
    { name: "Sunil Madhav Sen", url: "asian/artists/sunil-madhav-sen/sunil-madhav-sen.html" },
    { name: "Susanne Wenger", url: "african-middle-eastern/artists/susanne-wenger/susanne-wenger.html" },
    { name: "Sydney Alex Kumalo", url: "african-middle-eastern/artists/sydney-alex-kumalo/sydney-alex-kumalo.html" },
    { name: "Taju Mohibi", url: "african-middle-eastern/artists/taju-mohibi/taju-mohibi.html" },
    { name: "Teng Hiok Chiu", url: "asian/artists/teng-hiok-chiu/teng-hiok-chiu.html" },
    { name: "Theresa Musoke", url: "african-middle-eastern/artists/theresa-musoke/theresa-musoke.html" },
    { name: "Toki Okunade", url: "african-middle-eastern/artists/toki-okunade/toki-okunade.html" },
    { name: "Tosun Bayrak", url: "african-middle-eastern/artists/tosun-bayrak/tosun-bayrak.html" },
    { name: "Tsultem Niam Osor", url: "asian/artists/tsultem-niam-osor/tsultem-niam-osor.html" },
    { name: "Twins Seven Seven", url: "african-middle-eastern/artists/twins-seven-seven/twins-seven-seven.html" },
    { name: "Van Lau", url: "asian/artists/van-lau/van-lau.html" },
    { name: "Victor Odoi", url: "african-middle-eastern/artists/victor-odoi/victor-odoi.html" },
    { name: "Wahab Jaffer", url: "asian/artists/wahab-jaffer/wahab-jaffer.html" },
    { name: "Wajih Nahle", url: "african-middle-eastern/artists/wajih-nahle/wajih-nahle.html" },
    { name: "Waka Andre Umoshi", url: "african-middle-eastern/artists/waka-andre-umoshi/waka-andre-umoshi.html" },
    { name: "Wasmaa Khalid Chorbachi", url: "african-middle-eastern/artists/wasmaa-khalid-chorbachi/wasmaa-khalid-chorbachi.html" },
    { name: "Ying Sheng Yang", url: "asian/artists/ying-sheng-yang/ying-sheng-yang.html" },
    { name: "Yinka Adeyemi", url: "african-middle-eastern/artists/yinka-adeyemi/yinka-adeyemi.html" },
    { name: "Yony Waite", url: "african-middle-eastern/artists/yony-waite/yony-waite.html" },
    { name: "Youssouf Bath", url: "african-middle-eastern/artists/youssouf-bath/youssouf-bath.html" },
    { name: "Zacheus O Oloruntoba", url: "african-middle-eastern/artists/zacheus-o-oloruntoba/zacheus-o-oloruntoba.html" },
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