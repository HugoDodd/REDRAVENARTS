// search.js

// 1. The "Database" (Automatically updated by build_from_sheets.py)
const artists = [
    { name: "Hubert Nii Abbey", url: "african-middle-eastern/artists/hubert-nii-abbey/hubert-nii-abbey.html" },
    { name: "Ahmed Abdel-Aal", url: "african-middle-eastern/artists/ahmed-abdel-aal/ahmed-abdel-aal.html" },
    { name: "Lionel Abrams", url: "african-middle-eastern/artists/lionel-abrams/lionel-abrams.html" },
    { name: "Ahmed Abushariaa", url: "african-middle-eastern/artists/ahmed-abushariaa/ahmed-abushariaa.html" },
    { name: "Norman Ackroyd", url: "western/artists/norman-ackroyd/norman-ackroyd.html" },
    { name: "James Adedayo", url: "african-middle-eastern/artists/james-adedayo/james-adedayo.html" },
    { name: "Yinka Adeyemi", url: "african-middle-eastern/artists/yinka-adeyemi/yinka-adeyemi.html" },
    { name: "Eva Aeppli", url: "western/artists/eva-aeppli/eva-aeppli.html" },
    { name: "Jacob Afolabi", url: "african-middle-eastern/artists/jacob-afolabi/jacob-afolabi.html" },
    { name: "Michael O. Agwu (Okah)", url: "african-middle-eastern/artists/michael-o-agwu/michael-o-agwu.html" },
    { name: "Ayo Ajayi", url: "african-middle-eastern/artists/ayo-ajayi/ayo-ajayi.html" },
    { name: "Suad Al-Attar", url: "african-middle-eastern/artists/suad-al-attar/suad-al-attar.html" },
    { name: "Saadi Al-Kaabi", url: "african-middle-eastern/artists/saadi-al-kaabi/saadi-al-kaabi.html" },
    { name: "Ayyad Al-Nimer", url: "african-middle-eastern/artists/ayyad-al-nimer/ayyad-al-nimer.html" },
    { name: "Abdul Karim Al-Orrayed", url: "african-middle-eastern/artists/abdul-karim-al-orrayed/abdul-karim-al-orrayed.html" },
    { name: "Israel Ala (Albert Odunsi)", url: "african-middle-eastern/artists/israel-ala/israel-ala.html" },
    { name: "Alcopley", url: "western/artists/alcopley/alcopley.html" },
    { name: "Federico Aguilar Alcuaz", url: "asian/artists/federico-aguilar-alcuaz/federico-aguilar-alcuaz.html" },
    { name: "Samir Ali (Samir Ali Nuobi)", url: "african-middle-eastern/artists/samir-ali/samir-ali.html" },
    { name: "J. Sultan Ali", url: "asian/artists/j-sultan-ali/j-sultan-ali.html" },
    { name: "Philip Amonoo", url: "african-middle-eastern/artists/philip-amonoo/philip-amonoo.html" },
    { name: "Victor Anton", url: "western/artists/victor-anton/victor-anton.html" },
    { name: "Chuks Anyanwu", url: "african-middle-eastern/artists/chuks-anyanwu/chuks-anyanwu.html" },
    { name: "Emanoel Araujo", url: "western/artists/emanoel-araujo/emanoel-araujo.html" },
    { name: "Enrique Arnal", url: "western/artists/enrique-arnal/enrique-arnal.html" },
    { name: "Nasser Assar", url: "african-middle-eastern/artists/nasser-assar/nasser-assar.html" },
    { name: "Osi Audu", url: "african-middle-eastern/artists/osi-audu/osi-audu.html" },
    { name: "Nasser Azam", url: "asian/artists/nasser-azam/nasser-azam.html" },
    { name: "Nadira Azzouz", url: "african-middle-eastern/artists/nadira-azzouz/nadira-azzouz.html" },
    { name: "Bernard Baifang", url: "african-middle-eastern/artists/bernard-baifang/bernard-baifang.html" },
    { name: "Baniprosonno", url: "asian/artists/baniprosonno/baniprosonno.html" },
    { name: "Albert Osabu Bartimeus", url: "african-middle-eastern/artists/albert-osabu-bartimeus/albert-osabu-bartimeus.html" },
    { name: "Youssouf Bath", url: "african-middle-eastern/artists/youssouf-bath/youssouf-bath.html" },
    { name: "Tosun Bayrak", url: "african-middle-eastern/artists/tosun-bayrak/tosun-bayrak.html" },
    { name: "Frank Beanland", url: "western/artists/frank-beanland/frank-beanland.html" },
    { name: "Georgina Beier", url: "western/artists/georgina-beier/georgina-beier.html" },
    { name: "Shirley Bellwood", url: "western/artists/shirley-bellwood/shirley-bellwood.html" },
    { name: "Etienne Beothy (Istvan Beothy)", url: "western/artists/etienne-beothy/etienne-beothy.html" },
    { name: "Pamela Beves", url: "western/artists/pamela-beves/pamela-beves.html" },
    { name: "Natvar Bhavsar", url: "asian/artists/natvar-bhavsar/natvar-bhavsar.html" },
    { name: "Gerard Bhengu", url: "african-middle-eastern/artists/gerard-bhengu/gerard-bhengu.html" },
    { name: "Oswell Blakeston", url: "western/artists/oswell-blakeston/oswell-blakeston.html" },
    { name: "Jacob Bornfriend", url: "western/artists/jacob-bornfriend/jacob-bornfriend.html" },
    { name: "Roger Botembe", url: "african-middle-eastern/artists/roger-botembe/roger-botembe.html" },
    { name: "Denis Bowen", url: "western/artists/denis-bowen/denis-bowen.html" },
    { name: "Yasmin Brandolini d’Adda", url: "western/artists/yasmin-brandolini-dadda/yasmin-brandolini-dadda.html" },
    { name: "John Bratby RA", url: "western/artists/john-bratby-ra/john-bratby-ra.html" },
    { name: "Alfredo Buenaventura", url: "asian/artists/alfredo-buenaventura/alfredo-buenaventura.html" },
    { name: "Cesar Buenaventura", url: "asian/artists/cesar-buenaventura/cesar-buenaventura.html" },
    { name: "Jimoh Buraimoh", url: "african-middle-eastern/artists/jimoh-buraimoh/jimoh-buraimoh.html" },
    { name: "Olayinka Burney-Nicol", url: "african-middle-eastern/artists/olayinka-burney-nicol/olayinka-burney-nicol.html" },
    { name: "Arthur Butelezi", url: "african-middle-eastern/artists/arthur-butelezi/arthur-butelezi.html" },
    { name: "Robert Carroll", url: "western/artists/robert-carroll/robert-carroll.html" },
    { name: "John Carter RA", url: "western/artists/john-carter-ra/john-carter-ra.html" },
    { name: "Enrico Cervelli", url: "western/artists/enrico-cervelli/enrico-cervelli.html" },
    { name: "Alfredo Cardona Chacon", url: "western/artists/alfredo-cardona-chacon/alfredo-cardona-chacon.html" },
    { name: "Debdas Chakraborty", url: "asian/artists/debdas-chakraborty/debdas-chakraborty.html" },
    { name: "Rana Chalabi", url: "african-middle-eastern/artists/rana-chalabi/rana-chalabi.html" },
    { name: "Jehan Chan", url: "asian/artists/jehan-chan/jehan-chan.html" },
    { name: "Avinash Chandra", url: "asian/artists/avinash-chandra/avinash-chandra.html" },
    { name: "Chien-Ying Chang", url: "asian/artists/chien-ying-chang/chien-ying-chang.html" },
    { name: "Max Chapman", url: "western/artists/max-chapman/max-chapman.html" },
    { name: "J.R. Charton", url: "western/artists/jr-charton/jr-charton.html" },
    { name: "Nasser Chaura", url: "african-middle-eastern/artists/nasser-chaura/nasser-chaura.html" },
    { name: "Chen Kuan", url: "asian/artists/chen-kuan/chen-kuan.html" },
    { name: "Han Kuan Cheng", url: "asian/artists/han-kuan-cheng/han-kuan-cheng.html" },
    { name: "Cheong Laitong", url: "asian/artists/cheong-laitong/cheong-laitong.html" },
    { name: "Cheung Yee", url: "asian/artists/cheung-yee/cheung-yee.html" },
    { name: "Dil Bahadur Chitrakar (D.B. Chitrakar)", url: "asian/artists/dil-bahadur-chitrakar/dil-bahadur-chitrakar.html" },
    { name: "Teng-Hiok Chiu", url: "asian/artists/teng-hiok-chiu/teng-hiok-chiu.html" },
    { name: "Chong Sing Kwai", url: "asian/artists/chong-sing-kwai/chong-sing-kwai.html" },
    { name: "Wasma’a Khalid Chorbachi", url: "african-middle-eastern/artists/wasmaa-khalid-chorbachi/wasmaa-khalid-chorbachi.html" },
    { name: "John Christoforou", url: "western/artists/john-christoforou/john-christoforou.html" },
    { name: "Peter Clough", url: "western/artists/peter-clough/peter-clough.html" },
    { name: "Prunella Clough", url: "western/artists/prunella-clough/prunella-clough.html" },
    { name: "Christo Coetzee", url: "african-middle-eastern/artists/christo-coetzee/christo-coetzee.html" },
    { name: "Alfred Cohen", url: "western/artists/alfred-cohen/alfred-cohen.html" },
    { name: "Ithell Colquhoun", url: "western/artists/ithell-colquhoun/ithell-colquhoun.html" },
    { name: "Magda Cordell", url: "western/artists/magda-cordell/magda-cordell.html" },
    { name: "Gabriel Custodio", url: "asian/artists/gabriel-custodio/gabriel-custodio.html" },
    { name: "Arnold Daghani", url: "western/artists/arnold-daghani/arnold-daghani.html" },
    { name: "Karl Fred Dahmen (Karl Friedrich Dahmen)", url: "western/artists/karl-fred-dahmen/karl-fred-dahmen.html" },
    { name: "Kefas Danjuma", url: "african-middle-eastern/artists/kefas-danjuma/kefas-danjuma.html" },
    { name: "Emmanuel Owusu Dartey", url: "african-middle-eastern/artists/emmanuel-owusu-dartey/emmanuel-owusu-dartey.html" },
    { name: "Kristjan Davidsson", url: "western/artists/kristjan-davidsson/kristjan-davidsson.html" },
    { name: "Anita de Caro", url: "western/artists/anita-de-caro/anita-de-caro.html" },
    { name: "Eve de Negri", url: "western/artists/eve-de-negri/eve-de-negri.html" },
    { name: "Jeffrey Dennis", url: "western/artists/jeffrey-dennis/jeffrey-dennis.html" },
    { name: "Edoardo Di Muro", url: "western/artists/edoardo-di-muro/edoardo-di-muro.html" },
    { name: "Badara Diallo", url: "african-middle-eastern/artists/badara-diallo/badara-diallo.html" },
    { name: "Nhek Dim", url: "asian/artists/nhek-dim/nhek-dim.html" },
    { name: "Seyni Diagne Diop", url: "african-middle-eastern/artists/seyni-diagne-diop/seyni-diagne-diop.html" },
    { name: "Ibou Diouf", url: "african-middle-eastern/artists/ibou-diouf/ibou-diouf.html" },
    { name: "Lamine Dolo", url: "african-middle-eastern/artists/lamine-dolo/lamine-dolo.html" },
    { name: "Albert Dombe", url: "african-middle-eastern/artists/albert-dombe/albert-dombe.html" },
    { name: "John Drawbridge", url: "western/artists/john-drawbridge/john-drawbridge.html" },
    { name: "Zbigniew Drecki", url: "western/artists/zbigniew-drecki/zbigniew-drecki.html" },
    { name: "Nguyen Ducmanh", url: "asian/artists/nguyen-ducmanh/nguyen-ducmanh.html" },
    { name: "Antonio Dumlao", url: "asian/artists/antonio-dumlao/antonio-dumlao.html" },
    { name: "Enid Eardley", url: "western/artists/enid-eardley/enid-eardley.html" },
    { name: "John Edwards", url: "western/artists/john-edwards/john-edwards.html" },
    { name: "Gabriel Ellison", url: "african-middle-eastern/artists/gabriel-ellison/gabriel-ellison.html" },
    { name: "Salah Enani", url: "african-middle-eastern/artists/salah-enani/salah-enani.html" },
    { name: "Monica English", url: "western/artists/monica-english/monica-english.html" },
    { name: "Handel Evans", url: "western/artists/handel-evans/handel-evans.html" },
    { name: "Adebisi Fabunmi", url: "african-middle-eastern/artists/adebisi-fabunmi/adebisi-fabunmi.html" },
    { name: "Bernard Farmer", url: "western/artists/bernard-farmer/bernard-farmer.html" },
    { name: "Sakher Farzat", url: "african-middle-eastern/artists/sakher-farzat/sakher-farzat.html" },
    { name: "Arthur Fleischmann", url: "western/artists/arthur-fleischmann/arthur-fleischmann.html" },
    { name: "Foo Syn Choon", url: "asian/artists/foo-syn-choon/foo-syn-choon.html" },
    { name: "Armet Francis", url: "western/artists/armet-francis/armet-francis.html" },
    { name: "Clifford Frith", url: "western/artists/clifford-frith/clifford-frith.html" },
    { name: "Diran Garabedian", url: "african-middle-eastern/artists/diran-garabedian/diran-garabedian.html" },
    { name: "Luis Garcia Guerrero", url: "western/artists/luis-garcia-guerrero/luis-garcia-guerrero.html" },
    { name: "Hans Werner Geerdts", url: "western/artists/hans-werner-geerdts/hans-werner-geerdts.html" },
    { name: "Lena George", url: "western/artists/lena-george/lena-george.html" },
    { name: "Amal Ghosh", url: "asian/artists/amal-ghosh/amal-ghosh.html" },
    { name: "Claude Goma", url: "african-middle-eastern/artists/claude-goma/claude-goma.html" },
    { name: "Esther Grainger", url: "western/artists/esther-grainger/esther-grainger.html" },
    { name: "Peter Greenaway", url: "western/artists/peter-greenaway/peter-greenaway.html" },
    { name: "Sylvia Guirey", url: "western/artists/sylvia-guirey/sylvia-guirey.html" },
    { name: "Peter Harris", url: "western/artists/peter-harris/peter-harris.html" },
    { name: "Daniel Harris (Zev)", url: "western/artists/daniel-harris/daniel-harris.html" },
    { name: "Ahmad Hassan", url: "asian/artists/ahmad-hassan/ahmad-hassan.html" },
    { name: "Mohammed Hassan", url: "african-middle-eastern/artists/mohammed-hassan/mohammed-hassan.html" },
    { name: "Jann Haworth", url: "western/artists/jann-haworth/jann-haworth.html" },
    { name: "Rose Henriques", url: "western/artists/rose-henriques/rose-henriques.html" },
    { name: "John Hlatywayo", url: "african-middle-eastern/artists/john-hlatywayo/john-hlatywayo.html" },
    { name: "Maqbool Fida Husain", url: "asian/artists/maqbool-fida-husain/maqbool-fida-husain.html" },
    { name: "Adelita Husni-Bey", url: "western/artists/adelita-husni-bey/adelita-husni-bey.html" },
    { name: "Hayder Idris Ibrahim", url: "african-middle-eastern/artists/hayder-idris-ibrahim/hayder-idris-ibrahim.html" },
    { name: "Paul Igboanugo", url: "african-middle-eastern/artists/paul-igboanugo/paul-igboanugo.html" },
    { name: "Francois Iloki", url: "african-middle-eastern/artists/francois-iloki/francois-iloki.html" },
    { name: "Norbert Ilunga", url: "african-middle-eastern/artists/norbert-ilunga/norbert-ilunga.html" },
    { name: "Anthony Jadunath", url: "western/artists/anthony-jadunath/anthony-jadunath.html" },
    { name: "Wahab Jaffer", url: "asian/artists/wahab-jaffer/wahab-jaffer.html" },
    { name: "Dewa Nyoman Jati", url: "asian/artists/dewa-nyoman-jati/dewa-nyoman-jati.html" },
    { name: "Emmanuel Taiwo Jegede", url: "african-middle-eastern/artists/emmanuel-taiwo-jegede/emmanuel-taiwo-jegede.html" },
    { name: "Jo Jones", url: "western/artists/jo-jones/jo-jones.html" },
    { name: "I Wayan Kabetan", url: "asian/artists/i-wayan-kabetan/i-wayan-kabetan.html" },
    { name: "Peter Kalkhof", url: "western/artists/peter-kalkhof/peter-kalkhof.html" },
    { name: "Kam Kee Yong", url: "asian/artists/kam-kee-yong/kam-kee-yong.html" },
    { name: "Charles Kamangwana", url: "african-middle-eastern/artists/charles-kamangwana/charles-kamangwana.html" },
    { name: "Jak Katarikawe", url: "african-middle-eastern/artists/jak-katarikawe/jak-katarikawe.html" },
    { name: "Omer Khairy", url: "african-middle-eastern/artists/omer-khairy/omer-khairy.html" },
    { name: "Jean Khalife", url: "african-middle-eastern/artists/jean-khalife/jean-khalife.html" },
    { name: "Aftab Ahmed Khan", url: "asian/artists/aftab-ahmed-khan/aftab-ahmed-khan.html" },
    { name: "Dora Khayatt", url: "african-middle-eastern/artists/dora-khayatt/dora-khayatt.html" },
    { name: "Alphonse Kiabelua", url: "african-middle-eastern/artists/alphonse-kiabelua/alphonse-kiabelua.html" },
    { name: "Faustin Kitsiba", url: "african-middle-eastern/artists/faustin-kitsiba/faustin-kitsiba.html" },
    { name: "Frans Krajcberg", url: "western/artists/frans-krajcberg/frans-krajcberg.html" },
    { name: "Mary Krishna (Indumati Roop Krishna)", url: "western/artists/mary-krishna/mary-krishna.html" },
    { name: "Roop Krishna", url: "asian/artists/roop-krishna/roop-krishna.html" },
    { name: "Stanley Kumalo", url: "african-middle-eastern/artists/stanley-kumalo/stanley-kumalo.html" },
    { name: "Lema Kusa", url: "african-middle-eastern/artists/lema-kusa/lema-kusa.html" },
    { name: "George Kyeyune", url: "african-middle-eastern/artists/george-kyeyune/george-kyeyune.html" },
    { name: "Nguyen Lam", url: "asian/artists/nguyen-lam/nguyen-lam.html" },
    { name: "Francois Lanzi", url: "western/artists/francois-lanzi/francois-lanzi.html" },
    { name: "Borko Lazeski", url: "western/artists/borko-lazeski/borko-lazeski.html" },
    { name: "Shi-Chi Lee", url: "asian/artists/shi-chi-lee/shi-chi-lee.html" },
    { name: "I Gusti Nyoman Lempad", url: "asian/artists/i-gusti-nyoman-lempad/i-gusti-nyoman-lempad.html" },
    { name: "Li Mei-shu", url: "asian/artists/li-mei-shu/li-mei-shu.html" },
    { name: "Lim Cheng Hoe", url: "asian/artists/lim-cheng-hoe/lim-cheng-hoe.html" },
    { name: "Richard Lin (Lin Show Yu)", url: "asian/artists/richard-lin/richard-lin.html" },
    { name: "Dorle Lindner", url: "western/artists/dorle-lindner/dorle-lindner.html" },
    { name: "James Lowe (Jim Lowe)", url: "western/artists/james-lowe/james-lowe.html" },
    { name: "Averil Lysaght", url: "western/artists/averil-lysaght/averil-lysaght.html" },
    { name: "Josaku Maeda", url: "asian/artists/josaku-maeda/josaku-maeda.html" },
    { name: "Reza Mafi", url: "african-middle-eastern/artists/reza-mafi/reza-mafi.html" },
    { name: "Marwan (Marwan Kassab-Bachi)", url: "african-middle-eastern/artists/marwan/marwan.html" },
    { name: "Jivya Soma Mashe", url: "asian/artists/jivya-soma-mashe/jivya-soma-mashe.html" },
    { name: "Anna Mayerson", url: "western/artists/anna-mayerson/anna-mayerson.html" },
    { name: "John Melville", url: "western/artists/john-melville/john-melville.html" },
    { name: "Theo Mendez", url: "western/artists/theo-mendez/theo-mendez.html" },
    { name: "Benjamin Menyah", url: "african-middle-eastern/artists/benjamin-menyah/benjamin-menyah.html" },
    { name: "Luis Meque", url: "african-middle-eastern/artists/luis-meque/luis-meque.html" },
    { name: "Gladys Mgudlandlu", url: "african-middle-eastern/artists/gladys-mgudlandlu/gladys-mgudlandlu.html" },
    { name: "Teddy Millington-Drake", url: "western/artists/teddy-millington-drake/teddy-millington-drake.html" },
    { name: "Taju Mohibi", url: "african-middle-eastern/artists/taju-mohibi/taju-mohibi.html" },
    { name: "Albert Mongita", url: "african-middle-eastern/artists/albert-mongita/albert-mongita.html" },
    { name: "Mali Morris", url: "western/artists/mali-morris/mali-morris.html" },
    { name: "Alphonse Moto", url: "african-middle-eastern/artists/alphonse-moto/alphonse-moto.html" },
    { name: "Gaspard de Mouko", url: "african-middle-eastern/artists/gaspard-de-mouko/gaspard-de-mouko.html" },
    { name: "Kamel Moustafa", url: "african-middle-eastern/artists/kamel-moustafa/kamel-moustafa.html" },
    { name: "Adomech Moyo", url: "african-middle-eastern/artists/adomech-moyo/adomech-moyo.html" },
    { name: "Arthur Moyse", url: "western/artists/arthur-moyse/arthur-moyse.html" },
    { name: "Francis Msangi", url: "african-middle-eastern/artists/francis-msangi/francis-msangi.html" },
    { name: "Theresa Musoke", url: "african-middle-eastern/artists/theresa-musoke/theresa-musoke.html" },
    { name: "Louis Mwaniki", url: "african-middle-eastern/artists/louis-mwaniki/louis-mwaniki.html" },
    { name: "Omar el-Nagdi", url: "african-middle-eastern/artists/omar-el-nagdi/omar-el-nagdi.html" },
    { name: "Wajih Nahle", url: "african-middle-eastern/artists/wajih-nahle/wajih-nahle.html" },
    { name: "Samir Nanoo", url: "african-middle-eastern/artists/samir-nanoo/samir-nanoo.html" },
    { name: "Sheshgiri Upendra Nayak", url: "asian/artists/sheshgiri-upendra-nayak/sheshgiri-upendra-nayak.html" },
    { name: "Maria Thereza Negreiros", url: "western/artists/maria-thereza-negreiros/maria-thereza-negreiros.html" },
    { name: "Jorge Nhaca", url: "african-middle-eastern/artists/jorge-nhaca/jorge-nhaca.html" },
    { name: "Tsultem Niam-Osor", url: "asian/artists/tsultem-niam-osor/tsultem-niam-osor.html" },
    { name: "Modou Niang", url: "african-middle-eastern/artists/modou-niang/modou-niang.html" },
    { name: "Edward Njenga", url: "african-middle-eastern/artists/edward-njenga/edward-njenga.html" },
    { name: "Sam Ntiro", url: "african-middle-eastern/artists/sam-ntiro/sam-ntiro.html" },
    { name: "Hargreaves Ntukwana", url: "african-middle-eastern/artists/hargreaves-ntukwana/hargreaves-ntukwana.html" },
    { name: "Fela Odaranile", url: "african-middle-eastern/artists/fela-odaranile/fela-odaranile.html" },
    { name: "Victor Odoi", url: "african-middle-eastern/artists/victor-odoi/victor-odoi.html" },
    { name: "Bayo Ogundele", url: "african-middle-eastern/artists/bayo-ogundele/bayo-ogundele.html" },
    { name: "Rufus Ogundele", url: "african-middle-eastern/artists/rufus-ogundele/rufus-ogundele.html" },
    { name: "Toki Okunade", url: "african-middle-eastern/artists/toki-okunade/toki-okunade.html" },
    { name: "Asiru Olatunde", url: "african-middle-eastern/artists/asiru-olatunde/asiru-olatunde.html" },
    { name: "Oluwola Olayemi", url: "african-middle-eastern/artists/oluwola-olayemi/oluwola-olayemi.html" },
    { name: "Zacheus O. Oloruntoba", url: "african-middle-eastern/artists/zacheus-o-oloruntoba/zacheus-o-oloruntoba.html" },
    { name: "Kent Onah", url: "african-middle-eastern/artists/kent-onah/kent-onah.html" },
    { name: "Bruce Onobrakpeya", url: "african-middle-eastern/artists/bruce-onobrakpeya/bruce-onobrakpeya.html" },
    { name: "Bryan Organ", url: "western/artists/bryan-organ/bryan-organ.html" },
    { name: "David Osevwe", url: "african-middle-eastern/artists/david-osevwe/david-osevwe.html" },
    { name: "Frederik Lund Ottesen", url: "western/artists/frederik-lund-ottesen/frederik-lund-ottesen.html" },
    { name: "Fidel Oyiogu", url: "african-middle-eastern/artists/fidel-oyiogu/fidel-oyiogu.html" },
    { name: "Grace Pailthorpe", url: "western/artists/grace-pailthorpe/grace-pailthorpe.html" },
    { name: "I Ketut Pasek", url: "asian/artists/i-ketut-pasek/i-ketut-pasek.html" },
    { name: "Fra. Roberto Pasotti", url: "western/artists/fra-roberto-pasotti/fra-roberto-pasotti.html" },
    { name: "G. D. Paulraj", url: "asian/artists/g-d-paulraj/g-d-paulraj.html" },
    { name: "Pham Thuc Chuong", url: "asian/artists/pham-thuc-chuong/pham-thuc-chuong.html" },
    { name: "Louis Pohl", url: "western/artists/louis-pohl/louis-pohl.html" },
    { name: "Jozef Zbigniew Polak", url: "western/artists/jozef-zbigniew-polak/jozef-zbigniew-polak.html" },
    { name: "Nipon Pritakomol", url: "asian/artists/nipon-pritakomol/nipon-pritakomol.html" },
    { name: "Saleem Arif Quadri", url: "asian/artists/saleem-arif-quadri/saleem-arif-quadri.html" },
    { name: "Sabry Ragheb", url: "african-middle-eastern/artists/sabry-ragheb/sabry-ragheb.html" },
    { name: "Mansoor Rahi", url: "asian/artists/mansoor-rahi/mansoor-rahi.html" },
    { name: "Ida Bagus Rai", url: "asian/artists/ida-bagus-rai/ida-bagus-rai.html" },
    { name: "Siramdasu Venkata Rama Rao", url: "asian/artists/siramdasu-venkata-rama-rao/siramdasu-venkata-rama-rao.html" },
    { name: "Emma Reyes", url: "western/artists/emma-reyes/emma-reyes.html" },
    { name: "Ceri Richards", url: "western/artists/ceri-richards/ceri-richards.html" },
    { name: "Germaine Richier", url: "western/artists/germaine-richier/germaine-richier.html" },
    { name: "Edith Rimmington", url: "western/artists/edith-rimmington/edith-rimmington.html" },
    { name: "Suzanne Rodillon", url: "western/artists/suzanne-rodillon/suzanne-rodillon.html" },
    { name: "Francis Rose", url: "western/artists/francis-rose/francis-rose.html" },
    { name: "Frank Roth", url: "western/artists/frank-roth/frank-roth.html" },
    { name: "Jamini Roy", url: "asian/artists/jamini-roy/jamini-roy.html" },
    { name: "Georges Sabbagh", url: "african-middle-eastern/artists/georges-sabbagh/georges-sabbagh.html" },
    { name: "Faisal Laibi Sahi", url: "african-middle-eastern/artists/faisal-laibi-sahi/faisal-laibi-sahi.html" },
    { name: "Salem Salah", url: "african-middle-eastern/artists/salem-salah/salem-salah.html" },
    { name: "Kingsley Sambo", url: "african-middle-eastern/artists/kingsley-sambo/kingsley-sambo.html" },
    { name: "Charles Sambono", url: "african-middle-eastern/artists/charles-sambono/charles-sambono.html" },
    { name: "Ghulam Rasool Santosh", url: "asian/artists/ghulam-rasool-santosh/ghulam-rasool-santosh.html" },
    { name: "Edgardo Sarmiento", url: "asian/artists/edgardo-sarmiento/edgardo-sarmiento.html" },
    { name: "Rudolf Sauter", url: "western/artists/rudolf-sauter/rudolf-sauter.html" },
    { name: "Ulrico Schettini (Montefiore)", url: "western/artists/ulrico-schettini/ulrico-schettini.html" },
    { name: "Peter Schmidt", url: "western/artists/peter-schmidt/peter-schmidt.html" },
    { name: "Reinhardt Schuster", url: "western/artists/reinhardt-schuster/reinhardt-schuster.html" },
    { name: "Carlos Scliar", url: "western/artists/carlos-scliar/carlos-scliar.html" },
    { name: "Larry Scully", url: "african-middle-eastern/artists/larry-scully/larry-scully.html" },
    { name: "John Seldon", url: "western/artists/john-seldon/john-seldon.html" },
    { name: "Sunil Madhav Sen", url: "asian/artists/sunil-madhav-sen/sunil-madhav-sen.html" },
    { name: "Yong Mun Sen", url: "asian/artists/yong-mun-sen/yong-mun-sen.html" },
    { name: "Hilda Benjamin Sexton", url: "western/artists/hilda-benjamin-sexton/hilda-benjamin-sexton.html" },
    { name: "Ihab Shaker", url: "african-middle-eastern/artists/ihab-shaker/ihab-shaker.html" },
    { name: "Hussein Shariffe", url: "african-middle-eastern/artists/hussein-shariffe/hussein-shariffe.html" },
    { name: "Mohan Sharma", url: "asian/artists/mohan-sharma/mohan-sharma.html" },
    { name: "Ahmad Shibrain", url: "african-middle-eastern/artists/ahmad-shibrain/ahmad-shibrain.html" },
    { name: "Lucky Sibiya", url: "african-middle-eastern/artists/lucky-sibiya/lucky-sibiya.html" },
    { name: "Penny Slinger", url: "western/artists/penny-slinger/penny-slinger.html" },
    { name: "Arie Smit", url: "asian/artists/arie-smit/arie-smit.html" },
    { name: "Jack Smith", url: "western/artists/jack-smith/jack-smith.html" },
    { name: "Soku Ldj", url: "african-middle-eastern/artists/soku-ldj/soku-ldj.html" },
    { name: "Sam Songo", url: "african-middle-eastern/artists/sam-songo/sam-songo.html" },
    { name: "Humphrey Spender", url: "western/artists/humphrey-spender/humphrey-spender.html" },
    { name: "Ignatius Sserulyo", url: "african-middle-eastern/artists/ignatius-sserulyo/ignatius-sserulyo.html" },
    { name: "Elvic Steele", url: "western/artists/elvic-steele/elvic-steele.html" },
    { name: "John Stezaker", url: "western/artists/john-stezaker/john-stezaker.html" },
    { name: "Christopher Sturgess-Lief", url: "western/artists/christopher-sturgess-lief/christopher-sturgess-lief.html" },
    { name: "Labib Tadros", url: "african-middle-eastern/artists/labib-tadros/labib-tadros.html" },
    { name: "Edmund Tetteh", url: "african-middle-eastern/artists/edmund-tetteh/edmund-tetteh.html" },
    { name: "Francois Thango", url: "african-middle-eastern/artists/francois-thango/francois-thango.html" },
    { name: "Ida Bagus Made Tibah", url: "asian/artists/ida-bagus-made-tibah/ida-bagus-made-tibah.html" },
    { name: "Joe Tilson RA", url: "western/artists/joe-tilson-ra/joe-tilson-ra.html" },
    { name: "Willy Tirr", url: "western/artists/willy-tirr/willy-tirr.html" },
    { name: "Nina Tryggvadottir", url: "western/artists/nina-tryggvadottir/nina-tryggvadottir.html" },
    { name: "Twins Seven Seven", url: "african-middle-eastern/artists/twins-seven-seven/twins-seven-seven.html" },
    { name: "Fred Uhlman", url: "western/artists/fred-uhlman/fred-uhlman.html" },
    { name: "Waka Andre Umoshi", url: "african-middle-eastern/artists/waka-andre-umoshi/waka-andre-umoshi.html" },
    { name: "Van Lau", url: "asian/artists/van-lau/van-lau.html" },
    { name: "Lucienne Ha Van Vuong", url: "western/artists/lucienne-ha-van-vuong/lucienne-ha-van-vuong.html" },
    { name: "Kabinda Kunkulu Victor", url: "african-middle-eastern/artists/kabinda-kunkulu-victor/kabinda-kunkulu-victor.html" },
    { name: "Ann Voyles", url: "western/artists/ann-voyles/ann-voyles.html" },
    { name: "Freda Wadsworth", url: "western/artists/freda-wadsworth/freda-wadsworth.html" },
    { name: "Yony Waite", url: "western/artists/yony-waite/yony-waite.html" },
    { name: "Susanne Wenger (Adunni Olorisha)", url: "western/artists/susanne-wenger/susanne-wenger.html" },
    { name: "Ademola Williams", url: "african-middle-eastern/artists/ademola-williams/ademola-williams.html" },
    { name: "Frank Avray Wilson", url: "western/artists/frank-avray-wilson/frank-avray-wilson.html" },
    { name: "Jacob Yacouba (Jacob Yakouba)", url: "african-middle-eastern/artists/jacob-yacouba/jacob-yacouba.html" },
    { name: "Chihung Yang", url: "asian/artists/chihung-yang/chihung-yang.html" },
    { name: "Ying Sheng Yang", url: "asian/artists/ying-sheng-yang/ying-sheng-yang.html" },
    { name: "Ram Yedekar", url: "asian/artists/ram-yedekar/ram-yedekar.html" },
    { name: "Manoucher Yektai", url: "african-middle-eastern/artists/manoucher-yektai/manoucher-yektai.html" },
    { name: "Simon Chong Yew", url: "asian/artists/simon-chong-yew/simon-chong-yew.html" },
    { name: "Leon Zack", url: "western/artists/leon-zack/leon-zack.html" },
    { name: "Emna Zghal", url: "african-middle-eastern/artists/emna-zghal/emna-zghal.html" },
    { name: "Burigude Zhang", url: "asian/artists/burigude-zhang/burigude-zhang.html" },
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