(()=>{
'use strict';
/* ---------- helpers ---------- */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const zl=n=>(+n||0).toLocaleString('pl-PL',{style:'currency',currency:'PLN'});
const dPL=d=>new Date(d).toLocaleDateString('pl-PL');
const pad2=n=>String(n).padStart(2,'0');
const isoDay=d=>`${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const short=n=>n.replace(/ #\d+$/,'').replace(/,? (lewy|prawy|lewa|prawa|stanowisko \d)$/,'');
const cssId=k=>k.replace(/[^a-z0-9]/gi,'_');
const HAS3=typeof THREE!=='undefined';
const FONT_R='/*__FONT_R__*/',FONT_B='/*__FONT_B__*/';

/* ---------- service index library (shared demo data) ---------- */
const K={
  grease:['SRV-SM-LT2-400','Smar łożyskowy LT-2, 400 g',38],
  seal40:['SRV-SR-40628','Semmering 40×62×8 NBR',24.5],
  boltM10:['SRV-SB-M1030','Śruba zabezpieczająca M10×30 kl. 8.8',3.2],
  nutM10:['SRV-NS-M10','Nakrętka samohamowna M10 A2',1.4],
  washM10:['SRV-PD-M10','Podkładka M10 A2',.4],
  circlip:['SRV-PS-W40','Pierścień osadczy Segera W40',6.9],
  loctite:['SRV-KL-243-10','Klej do gwintów średni, 10 ml',29],
  boltM8:['SRV-SB-M8G','Śruba z łbem grzybkowym M8×40 A2',2.1],
  nutM8:['SRV-NK-M8K','Nakrętka kołpakowa M8 A2',1.8],
  capM8:['SRV-ZS-M8','Zaślepka antywandalowa M8',.9],
  shackle:['SRV-SZ-M10','Szakla zamknięta M10 A4',18],
  link:['SRV-OG-Q8','Ogniwo łączące Q8 A4',9.5],
  bush:['SRV-TL-PA25','Tuleja ślizgowa PA6 Ø25',12],
  pin:['SRV-SW-20','Sworzeń Ø20×120 z zawleczką',34],
  cotter:['SRV-ZW-4','Zawleczka 4×40 A2',.6],
  boltM12:['SRV-SB-M1270','Śruba M12×70 kl. 8.8',4.1],
  nutM12:['SRV-NS-M12','Nakrętka samohamowna M12',1.9],
  washM12:['SRV-PD-M12','Podkładka poszerzana M12',.7],
  anchor:['SRV-KT-M12','Kotwa chemiczna M12, zestaw',46],
  concrete:['SRV-BT-25','Beton szybkowiążący, 25 kg',32],
  grip:['SRV-TS-AS','Taśma antypoślizgowa 50 mm × 1 m',22],
  boltM6:['SRV-SB-M620','Śruba M6×20 z łbem walcowym',.9],
  brg6204:['SRV-LZ-6204','Łożysko kulkowe 6204-2RS',14.5],
  seger20:['SRV-PS-Z20','Pierścień osadczy Z20',1.9],
  rollpin:['SRV-KS-640','Kołek sprężysty 6×40',1.2],
  hydoil:['SRV-OH-HLP46','Olej hydrauliczny HLP 46, 1 l',31],
  spring:['SRV-SP-DY','Sprężyna powrotna dyszla',17],
  oring:['SRV-OR-1403','O-ring 140×3 EPDM',9.8],
  gasket:['SRV-UP-DN50','Uszczelka płaska DN50',6.4],
  impnut:['SRV-NW-M12','Nakrętka wirnika M12',11],
  key:['SRV-WP-6625','Wpust pryzmatyczny 6×6×25',3.6],
  spider:['SRV-WS-GR28','Wkładka elastyczna sprzęgła GR28',42],
  telecover:['SRV-OT-3S','Osłona teleskopowa siłownika',19],
};

/* ---------- service instructions (templates) ---------- */
const I={
  bearing:{t:'Wymiana łożyska',time:'90 min',crew:'2 osoby',tools:['Ściągacz do łożysk','Klucze płaskie i nasadowe','Szczypce do pierścieni osadczych','Klucz dynamometryczny'],torque:'M10 – 49 Nm · M12 – 85 Nm',steps:['Wyłącz produkt z użytkowania i zabezpiecz go przed uruchomieniem.','Zdejmij osłony i odciąż węzeł łożyskowy.','Wyjmij pierścień osadczy i zsuń zużyte łożysko ściągaczem.','Oczyść gniazdo i czop, sprawdź ich stan.','Zamontuj nowe łożysko i uszczelnienia z kompletu, nałóż smar.','Załóż nowy pierścień osadczy i elementy złączne, dokręć momentem z tabeli.','Sprawdź luz i płynność obrotu, zamontuj osłony.'],warn:'Pierścienie osadcze i nakrętki samohamowne są jednorazowe. Użyj nowych z kompletu.'},
  seal:{t:'Wymiana uszczelnienia',time:'2 h',crew:'1–2 osoby',tools:['Klucze nasadowe','Ściągacz wirnika','Czysta ściereczka bezpyłowa','Klucz dynamometryczny'],torque:'Nakrętka wirnika – 45 Nm',steps:['Zamknij zawory, opróżnij korpus i odłącz zasilanie.','Odkręć korpus od wspornika i zdejmij wirnik.','Zsuń zużyte uszczelnienie z wału i wyjmij pierścień stały z gniazda.','Oczyść wał i gniazdo, sprawdź powierzchnie.','Załóż nowe uszczelnienie i o-ringi z kompletu.','Zamontuj wirnik z nową nakrętką i skręć korpus.','Zalej pompę, odpowietrz i sprawdź szczelność.'],warn:'Nie dotykaj powierzchni ślizgowych palcami i nie uruchamiaj pompy na sucho.'},
  rotor:{t:'Wymiana elementu wirującego',time:'2–3 h',crew:'2 osoby',tools:['Klucze nasadowe','Ściągacz','Czujnik zegarowy','Klucz dynamometryczny'],torque:'Nakrętka wirnika – 45 Nm · M12 – 85 Nm',steps:['Odłącz zasilanie i media, zabezpiecz napęd przed uruchomieniem.','Zdemontuj korpus i elementy osadzone na wale w kolejności od końca.','Zdejmij zużyty element, sprawdź wpusty i czopy.','Zamontuj nowy element z nowymi wpustami i uszczelnieniem z kompletu.','Sprawdź bicie promieniowe (maks. 0,05 mm) i swobodny obrót.','Złóż zespół, dokręć momentem z tabeli i wykonaj próbę ruchową.'],warn:'Przy każdym demontażu wirnika lub wału wymień uszczelnienie mechaniczne. Jest w komplecie.'},
  bolted:{t:'Wymiana elementu przykręcanego',time:'30–45 min',crew:'1 osoba',tools:['Klucze nasadowe lub imbusowe','Klucz dynamometryczny'],torque:'M6 – 9 Nm · M8 – 22 Nm · M10 – 49 Nm',steps:['Wyłącz produkt z użytkowania.','Zdejmij zaślepki i odkręć śruby mocujące.','Zdejmij uszkodzony element i oczyść powierzchnie styku.','Przyłóż nowy element, wkręć nowe śruby z kompletu bez dokręcania.','Wyrównaj element i dokręć śruby momentem z tabeli.','Załóż zaślepki, sprawdź brak luzów i ostrych krawędzi.'],warn:'Używaj wyłącznie elementów złącznych z kompletu. Mają właściwą klasę i zabezpieczenie.'},
  struct:{t:'Wymiana elementu konstrukcyjnego',time:'3–4 h',crew:'2–3 osoby',tools:['Klucze 17 i 19 mm','Podpory montażowe','Poziomica','Klucz dynamometryczny'],torque:'M10 – 49 Nm · M12 – 85 Nm',steps:['Wyłącz produkt z użytkowania i podeprzyj konstrukcję.','Zdemontuj elementy przykręcone do wymienianej części.','Odkręć połączenia śrubowe lub kotwy.','Osadź nowy element i wypoziomuj go.','Dokręć połączenia momentem z tabeli, zamontuj pozostałe elementy.','Wykonaj kontrolę stateczności i próbę działania.'],warn:'Produkt wraca do użytku dopiero po pełnym związaniu kotew i sprawdzeniu połączeń.'},
  wheel:{t:'Wymiana koła lub rolki',time:'20 min',crew:'1 osoba',tools:['Wybijak','Młotek','Szczypce do pierścieni osadczych'],torque:'—',steps:['Odciąż koło: podeprzyj lub obróć produkt.','Zdejmij pierścień osadczy albo wybij kołek sprężysty.','Wysuń oś i zdejmij zużyte koło.','Załóż nowe koło z łożyskami, wsuń oś.','Zabezpiecz oś nowym pierścieniem lub kołkiem z kompletu.','Sprawdź swobodny obrót.'],warn:'Koła po obu stronach wymieniaj parami, żeby produkt nie ściągał na bok.'},
  hyd:{t:'Wymiana pompy hydraulicznej',time:'60 min',crew:'1–2 osoby',tools:['Klucze 17 mm','Wybijak','Naczynie na olej'],torque:'M10 – 49 Nm',steps:['Opuść widły do końca i zabezpiecz wózek.','Odłącz dyszel i cięgno sterujące.','Wybij sworzeń i wyjmij pompę z ramy.','Zamontuj nową pompę z nowym sworzniem i śrubami.','Uzupełnij olej HLP 46 do korka kontrolnego.','Odpowietrz układ: 10–15 ruchów dyszla z dźwignią w pozycji opuszczania.'],warn:'Zużyty olej hydrauliczny jest odpadem niebezpiecznym. Oddaj go do utylizacji.'},
  gas:{t:'Wymiana siłownika gazowego lub podstawy',time:'15 min',crew:'1 osoba',tools:['Młotek gumowy','Klucz do rur lub ściągacz stożka'],torque:'—',steps:['Odwróć krzesło i zdejmij podstawę, uderzając młotkiem gumowym przy stożku.','Wybij siłownik z mechanizmu ściągaczem lub obrotem klucza.','Wsuń nowy siłownik w podstawę, załóż osłonę teleskopową.','Nałóż mechanizm z siedziskiem na stożek siłownika.','Usiądź na krześle, aby stożki się zakleszczyły, i sprawdź regulację.'],warn:'Nie rozbieraj i nie przewiercaj siłownika gazowego. Jest pod ciśnieniem.'},
  link:{t:'Wymiana zawiesia, łańcucha lub siedziska',time:'30 min',crew:'1–2 osoby',tools:['Drabina','Klucz 17 mm','Miara'],torque:'M10 – 49 Nm',steps:['Rozepnij ogniwa łączące lub szakle.','Zdejmij zużyty element.','Zamontuj nowy element z nowymi ogniwami z kompletu.','Zakręć ogniwa do oporu i zabezpiecz gwint klejem.','Sprawdź prześwit nad nawierzchnią i równe zawieszenie.'],warn:'Ogniwa łączące są jednorazowe. Po demontażu zawsze użyj nowych.'},
  spring:{t:'Wymiana sprężyny',time:'60 min',crew:'2 osoby',tools:['Klucze 19 mm','Klucz dynamometryczny','Szczotka druciana'],torque:'M12 – 85 Nm',steps:['Wyłącz produkt z użytkowania.','Odkręć korpus od płyty górnej sprężyny.','Odkręć sprężynę od płyty montażowej.','Oczyść płytę i sprawdź gwinty kotew.','Zamontuj nową sprężynę z nowymi śrubami i podkładkami.','Przykręć korpus i dokręć momentem z tabeli.'],warn:'Sprężyna jest elementem bezpieczeństwa. Nie spawaj jej i nie skracaj.'},
};

/* ---------- 3D primitives ---------- */
const C={steel:'#A6B0B6',dark:'#5E676D',green:'#3C9A6B',blue:'#2F6DB5',yellow:'#F0B429',wood:'#B5875A',rubber:'#34393D',slate:'#3A4A5C',concrete:'#B9B6AE',inox:'#D5DBDF'};
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
const mat=c=>new THREE.MeshStandardMaterial({color:c,roughness:.55,metalness:.12});
function M(g,c,x=0,y=0,z=0){const m=new THREE.Mesh(g,mat(c));m.position.set(x,y,z);return m}
const box=(w,h,d,c,x,y,z)=>M(new THREE.BoxGeometry(w,h,d),c,x,y,z);
const cyl=(rt,rb,h,c,x,y,z,s=28)=>M(new THREE.CylinderGeometry(rt,rb,h,s),c,x,y,z);
const cylX=(rl,rr,h,c,x,y,z)=>{const m=cyl(rl,rr,h,c,x,y,z,32);m.rotation.z=Math.PI/2;return m};   // axis along X; rl = radius at -X end
const cylZ=(r,h,c,x,y,z)=>{const m=cyl(r,r,h,c,x,y,z,28);m.rotation.x=Math.PI/2;return m};
function rod(a,b,r,c){const d=b.clone().sub(a),L=d.length();const m=M(new THREE.CylinderGeometry(r,r,L,16),c);m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(V(0,1,0),d.normalize());return m}
function helixGeo(r,h,n,y0,seg,tr){const c=new THREE.Curve();c.getPoint=(t,o=new THREE.Vector3())=>{const a=t*n*Math.PI*2;return o.set(Math.cos(a)*r,y0+t*h,Math.sin(a)*r)};return new THREE.TubeGeometry(c,seg,tr,8,false)}

/* ---------- producers and products (demo data) ---------- */
// part: s = review status (a approved spare part, p proposed by the automat, n not a spare part); c = confidence; w = reason
// kit entries: [key, qtyPerPart, required]; key "@id" points at another element of the same model
const PRODUCERS={
  play:{name:'Producent A',ind:'Place zabaw',bok:'bok@producent-a.example'},
  pal:{name:'Producent B',ind:'Intralogistyka',bok:'bok@producent-b.example'},
  sed:{name:'Producent C',ind:'Meble biurowe',bok:'bok@producent-c.example'},
  hyd:{name:'Producent D',ind:'Pompy przemysłowe',bok:'bok@producent-d.example'},
  own:{name:'Twoja firma',ind:'Import własny',bok:'bok@twojafirma.example'},
};
const four=fn=>[1,2,3,4].map(fn);
const PRODUCTS=[
 {id:'orbit',name:'Karuzela tarczowa Orbit',code:'KR-0110',pr:'play',src:'STEP AP242',v:3,date:'2026-11-10',
  parts:[
   {id:'plat',g:'Konstrukcja ruchoma',name:'Tarcza platformy Ø2000, blacha ryflowana',idx:'KR-0110-01',price:2890,ins:'bolted',ex:[0,.95,0],kit:[['boltM10',8,1],['nutM10',8,1],['washM10',16,1],['grip',4,0]]},
   {id:'bear',g:'Konstrukcja ruchoma',name:'Łożysko główne 6208-2RS w obudowie',idx:'KR-0110-02',price:412,ins:'bearing',ex:[0,.3,0],kit:[['grease',1,1],['seal40',2,1],['boltM10',4,1],['nutM10',4,1],['circlip',1,1],['loctite',1,0]]},
   {id:'ring',g:'Konstrukcja ruchoma',name:'Pierścień uchwytów Ø1100 ze szprychami',idx:'KR-0110-04',price:640,ins:'bolted',ex:[0,1.8,0],kit:[['boltM8',4,1],['nutM8',4,1],['capM8',4,1]]},
   ...four(i=>({id:'hp'+i,g:'Uchwyty i siedziska',name:'Słupek uchwytu #'+i,idx:'KR-0110-05',price:145,ins:'bolted',ex:[Math.cos(Math.PI/4+(i-1)*Math.PI/2)*.15,1.3,Math.sin(Math.PI/4+(i-1)*Math.PI/2)*.15],kit:[['boltM8',2,1],['nutM8',2,1],['capM8',2,0]]})),
   {id:'seat1',g:'Uchwyty i siedziska',name:'Siedzisko HPL #1',idx:'KR-0110-06',price:260,ins:'bolted',ex:[.25,1.15,0],kit:[['boltM8',4,1],['nutM8',4,1],['capM8',4,0]]},
   {id:'seat2',g:'Uchwyty i siedziska',name:'Siedzisko HPL #2',idx:'KR-0110-06',price:260,ins:'bolted',ex:[-.25,1.15,0],kit:[['boltM8',4,1],['nutM8',4,1],['capM8',4,0]]},
   {id:'post',g:'Konstrukcja stała',name:'Kolumna centralna Ø114',idx:'KR-0110-03',price:980,ins:'struct',ex:[0,0,0],kit:[['boltM12',4,1],['nutM12',4,1],['washM12',8,1],['@bear',1,0]]},
   {id:'cover',g:'Konstrukcja stała',name:'Osłona węzła łożyskowego',idx:'KR-0110-07',price:118,ins:'bolted',ex:[0,.12,0],kit:[['boltM8',3,1],['capM8',3,0]],s:'p',c:.78,w:'Osłona mocowana trzema śrubami, narażona na uszkodzenia mechaniczne.'},
   {id:'anchor',g:'Konstrukcja stała',name:'Płyta kotwiąca z kotwami',idx:'KR-0110-08',price:540,ins:'struct',ex:[0,0,0],kit:[['anchor',4,1],['concrete',2,1]],s:'n',c:.9,w:'Element fundamentu. Wymiana tylko razem z całym urządzeniem.'},
  ],
  build(a){
   a.add('anchor',box(.72,.05,.72,C.concrete,0,.025,0));
   for(const [x,z] of [[.28,.28],[-.28,.28],[.28,-.28],[-.28,-.28]])a.add('anchor',cyl(.022,.022,.07,C.dark,x,.07,z,10));
   a.add('post',cyl(.057,.057,1.15,C.steel,0,.62,0));a.add('post',M(new THREE.SphereGeometry(.075,20,14),C.green,0,1.2,0));
   a.add('cover',cyl(.2,.28,.12,C.yellow,0,.11,0));
   a.add('bear',cyl(.15,.15,.1,C.dark,0,.23,0));a.add('bear',M(new THREE.TorusGeometry(.15,.02,10,30),C.steel,0,.23,0)).rotation.x=Math.PI/2;
   a.add('plat',cyl(1,1,.05,C.blue,0,.305,0,64));
   for(let i=0;i<4;i++){const an=Math.PI/4+i*Math.PI/2,x=Math.cos(an)*.55,z=Math.sin(an)*.55;a.add('hp'+(i+1),rod(V(x,.33,z),V(x,.96,z),.026,C.green))}
   a.add('ring',M(new THREE.TorusGeometry(.55,.028,12,64),C.green,0,.96,0)).rotation.x=Math.PI/2;
   for(let i=0;i<4;i++){const an=i*Math.PI/2;a.add('ring',rod(V(0,.96,0),V(Math.cos(an)*.55,.96,Math.sin(an)*.55),.02,C.green))}
   [0,Math.PI].forEach((an,i)=>{const g=new THREE.Group();g.add(box(.4,.05,.44,C.yellow,0,.53,0));g.add(box(.05,.2,.32,C.dark,0,.42,0));g.add(box(.04,.3,.44,C.yellow,.2,.72,0));g.position.set(Math.cos(an)*.78,0,Math.sin(an)*.78);g.rotation.y=-an;a.add('seat'+(i+1),g)});
  }},
 {id:'duo',name:'Huśtawka podwójna Duo',code:'HS-0220',pr:'play',src:'STEP AP242',v:5,date:'2026-10-28',
  parts:[
   {id:'beam',g:'Rama',name:'Belka poprzeczna Ø89 L=3300',idx:'HS-0220-01',price:1190,ins:'struct',kit:[['boltM12',4,1],['nutM12',4,1],['washM12',8,1]]},
   {id:'legL',g:'Rama',name:'Rama boczna A, lewa',idx:'HS-0220-02',price:1480,ins:'struct',kit:[['anchor',2,1],['concrete',2,1],['boltM12',2,1],['nutM12',2,1]]},
   {id:'legR',g:'Rama',name:'Rama boczna A, prawa',idx:'HS-0220-02',price:1480,ins:'struct',kit:[['anchor',2,1],['concrete',2,1],['boltM12',2,1],['nutM12',2,1]]},
   ...four(i=>({id:'h'+i,g:'Zawiesia',name:'Zawiesie łożyskowe #'+i,idx:'HS-0220-03',price:186,ins:'bearing',kit:[['bush',2,1],['boltM10',2,1],['nutM10',2,1],['shackle',1,1],['grease',1,0]]})),
   {id:'ch1',g:'Siedziska',name:'Komplet łańcuchów w osłonie PVC, stanowisko 1',idx:'HS-0220-04',price:320,ins:'link',kit:[['shackle',2,1],['link',2,1],['loctite',1,0]]},
   {id:'ch2',g:'Siedziska',name:'Komplet łańcuchów w osłonie PVC, stanowisko 2',idx:'HS-0220-04',price:320,ins:'link',kit:[['shackle',2,1],['link',2,1],['loctite',1,0]]},
   {id:'seat1',g:'Siedziska',name:'Siedzisko płaskie gumowe',idx:'HS-0220-05',price:210,ins:'link',kit:[['link',2,1],['@ch1',1,0]]},
   {id:'seat2',g:'Siedziska',name:'Siedzisko kubełkowe dla maluchów',idx:'HS-0220-06',price:340,ins:'link',kit:[['link',4,1],['@ch2',1,0]]},
  ],
  build(a){
   for(const [s,id] of [[-1.55,'legL'],[1.55,'legR']]){a.add(id,rod(V(s,0,-.95),V(s,2.26,0),.045,C.green));a.add(id,rod(V(s,0,.95),V(s,2.26,0),.045,C.green));a.add(id,rod(V(s,.9,-.57),V(s,.9,.57),.03,C.green))}
   a.add('beam',rod(V(-1.68,2.29,0),V(1.68,2.29,0),.045,C.green));
   [-1,-.55,.55,1].forEach((x,i)=>a.add('h'+(i+1),box(.1,.12,.1,C.dark,x,2.18,0)));
   for(const [x,id,yb] of [[-1,'ch1',.5],[-.55,'ch1',.5],[.55,'ch2',.6],[1,'ch2',.6]])a.add(id,rod(V(x,2.12,0),V(x,yb,0),.014,C.slate));
   a.add('seat1',box(.52,.045,.18,C.rubber,-.775,.48,0));
   const cr=new THREE.Group();cr.add(box(.46,.05,.36,C.rubber,0,0,0));cr.add(box(.46,.22,.04,C.rubber,0,.11,.17));cr.add(box(.46,.22,.04,C.rubber,0,.11,-.17));cr.add(box(.04,.22,.36,C.slate,.22,.11,0));cr.add(box(.04,.22,.36,C.slate,-.22,.11,0));cr.position.set(.775,.5,0);a.add('seat2',cr);
  }},
 {id:'pal',name:'Wózek paletowy ręczny PT 2500',code:'PT-2500',pr:'pal',src:'STEP AP214',v:2,date:'2026-11-03',
  parts:[
   {id:'pump',g:'Hydraulika',name:'Pompa hydrauliczna kompletna',idx:'PT-2500-02',price:1240,ins:'hyd',ex:[-.15,.3,0],kit:[['hydoil',1,1],['pin',1,1],['boltM10',2,1]]},
   {id:'tiller',g:'Sterowanie',name:'Dyszel z uchwytem',idx:'PT-2500-03',price:420,ins:'bolted',ex:[-.4,.45,0],kit:[['spring',1,1],['pin',1,1],['cotter',2,1]]},
   {id:'lever',g:'Sterowanie',name:'Dźwignia sterująca 3-pozycyjna',idx:'PT-2500-04',price:96,ins:'bolted',ex:[-.4,.6,.3],kit:[['rollpin',1,1],['boltM6',2,1]]},
   {id:'sw1',g:'Koła i rolki',name:'Koło sterujące Ø180 poliuretan #1',idx:'PT-2500-05',price:138,ins:'wheel',ex:[-.2,0,-.3],kit:[['brg6204',2,1],['seger20',2,1],['@sw2',1,0],['grease',1,0]]},
   {id:'sw2',g:'Koła i rolki',name:'Koło sterujące Ø180 poliuretan #2',idx:'PT-2500-05',price:138,ins:'wheel',ex:[-.2,0,.3],kit:[['brg6204',2,1],['seger20',2,1],['@sw1',1,0],['grease',1,0]]},
   {id:'lr1',g:'Koła i rolki',name:'Rolka widłowa Ø80×93 #1',idx:'PT-2500-07',price:64,ins:'wheel',ex:[.3,0,-.25],kit:[['brg6204',2,1],['rollpin',2,1]]},
   {id:'lr2',g:'Koła i rolki',name:'Rolka widłowa Ø80×93 #2',idx:'PT-2500-07',price:64,ins:'wheel',ex:[.3,0,.25],kit:[['brg6204',2,1],['rollpin',2,1]]},
   {id:'axle',g:'Koła i rolki',name:'Oś kół sterujących Ø20',idx:'PT-2500-06',price:54,ins:'wheel',ex:[-.45,0,0],kit:[['seger20',2,1]],s:'p',c:.71,w:'Element pary obrotowej. W historii sprzedaży 12 pozycji jako część.'},
   {id:'rods',g:'Rama',name:'Cięgna popychaczy (para)',idx:'PT-2500-08',price:210,ins:'struct',ex:[0,0,0],kit:[['pin',2,1],['cotter',4,1]],s:'p',c:.58,w:'Elementy ruchome pod widłami. Niska pewność: brak historii zgłoszeń.'},
   {id:'frame',g:'Rama',name:'Rama wideł 1150×540',idx:'PT-2500-01',price:1890,ins:'struct',ex:[0,.22,0],kit:[],s:'n',c:.92,w:'Element nośny. Uszkodzenie ramy oznacza wymianę wózka.'},
  ],
  build(a){
   for(const z of [-.19,.19])a.add('frame',box(1.15,.05,.16,C.yellow,.6,.085,z));
   a.add('frame',box(.1,.42,.54,C.yellow,-.02,.27,0));
   a.add('pump',cyl(.05,.05,.3,C.dark,-.15,.35,0));a.add('pump',box(.14,.1,.14,C.slate,-.15,.25,0));
   a.add('axle',rod(V(-.15,.09,-.15),V(-.15,.09,.15),.012,C.steel));
   a.add('sw1',cylZ(.09,.05,C.green,-.15,.09,-.1));a.add('sw2',cylZ(.09,.05,C.green,-.15,.09,.1));
   a.add('tiller',rod(V(-.17,.5,0),V(-.5,1.12,0),.022,C.rubber));a.add('tiller',rod(V(-.5,1.12,-.17),V(-.5,1.12,.17),.02,C.rubber));
   a.add('lever',box(.05,.13,.04,C.blue,-.455,1.04,.07));
   a.add('lr1',cylZ(.04,.1,C.green,1.08,.04,-.19));a.add('lr2',cylZ(.04,.1,C.green,1.08,.04,.19));
   for(const z of [-.19,.19])a.add('rods',rod(V(.03,.045,z),V(1.02,.045,z),.008,C.steel));
  }},
 {id:'chair',name:'Krzesło obrotowe Ergo 300',code:'ER-300',pr:'sed',src:'STEP AP242',v:7,date:'2026-11-15',
  parts:[
   {id:'seat',g:'Siedzisko i oparcie',name:'Siedzisko tapicerowane',idx:'ER-300-01',price:289,ins:'bolted',ex:[0,.28,0],kit:[['boltM6',4,1]]},
   {id:'back',g:'Siedzisko i oparcie',name:'Oparcie siatkowe z ramą',idx:'ER-300-02',price:342,ins:'bolted',ex:[-.25,.4,0],kit:[['boltM8',2,1],['capM8',2,0]]},
   {id:'armL',g:'Siedzisko i oparcie',name:'Podłokietnik regulowany lewy',idx:'ER-300-03',price:78,ins:'bolted',ex:[0,.3,-.25],kit:[['boltM6',3,1]]},
   {id:'armR',g:'Siedzisko i oparcie',name:'Podłokietnik regulowany prawy',idx:'ER-300-03',price:78,ins:'bolted',ex:[0,.3,.25],kit:[['boltM6',3,1]]},
   {id:'mech',g:'Mechanizm',name:'Mechanizm synchroniczny',idx:'ER-300-04',price:265,ins:'bolted',ex:[0,.1,0],kit:[['boltM6',4,1],['loctite',1,0]]},
   {id:'gas',g:'Mechanizm',name:'Siłownik gazowy kl. 4, skok 120 mm',idx:'ER-300-05',price:96,ins:'gas',ex:[0,-.06,0],kit:[['telecover',1,0]]},
   {id:'base',g:'Podstawa',name:'Podstawa pięcioramienna aluminiowa',idx:'ER-300-06',price:185,ins:'gas',ex:[0,-.22,0],kit:[['@gas',1,0]]},
   ...[1,2,3,4,5].map(i=>{const an=(i-1)*Math.PI*2/5;return{id:'c'+i,g:'Podstawa',name:'Kółko Ø65 do twardych podłóg #'+i,idx:'ER-300-07',price:14,ins:'wheel',ex:[Math.cos(an)*.12,-.4,Math.sin(an)*.12],kit:[]}}),
  ],
  build(a){
   for(let i=0;i<5;i++){const an=i*Math.PI*2/5,x=Math.cos(an)*.3,z=Math.sin(an)*.3;a.add('base',rod(V(0,.1,0),V(x,.07,z),.02,C.steel));a.add('c'+(i+1),M(new THREE.SphereGeometry(.035,14,10),C.rubber,x,.035,z))}
   a.add('base',cyl(.05,.05,.08,C.steel,0,.1,0));
   a.add('gas',cyl(.022,.022,.26,C.inox,0,.3,0));a.add('gas',cyl(.034,.034,.16,C.dark,0,.2,0));
   a.add('mech',box(.2,.05,.18,C.dark,0,.445,0));a.add('mech',rod(V(0,.44,.09),V(0,.43,.25),.008,C.dark));
   a.add('seat',box(.48,.07,.46,C.blue,.02,.505,0));
   a.add('back',rod(V(-.08,.45,0),V(-.27,.62,0),.018,C.dark));const b=a.add('back',box(.05,.5,.42,C.slate,-.29,.9,0));b.rotation.z=.1;
   for(const [s,id] of [[-1,'armL'],[1,'armR']]){a.add(id,box(.05,.2,.03,C.dark,0,.63,s*.25));a.add(id,box(.24,.03,.07,C.rubber,.02,.74,s*.25))}
  }},
 {id:'pump',name:'Pompa odśrodkowa HT 50-160',code:'HT-50-160',pr:'hyd',src:'STEP AP242',v:4,date:'2026-11-12',
  parts:[
   {id:'casing',g:'Część hydrauliczna',name:'Korpus spiralny DN65/DN50',idx:'HT-50-01',price:1480,ins:'struct',ex:[.95,0,0],kit:[['oring',1,1],['gasket',2,1],['boltM12',8,0]]},
   {id:'imp',g:'Część hydrauliczna',name:'Wirnik Ø160, brąz',idx:'HT-50-02',price:690,ins:'rotor',ex:[.62,0,0],kit:[['@mseal',1,1],['impnut',1,1],['key',1,1],['oring',1,1]]},
   {id:'mseal',g:'Część hydrauliczna',name:'Uszczelnienie mechaniczne Ø32 SiC/SiC/EPDM',idx:'HT-50-03',price:385,ins:'seal',ex:[.5,0,0],kit:[['oring',1,1],['impnut',1,1],['loctite',1,0]]},
   {id:'bear',g:'Łożyskowanie i wał',name:'Łożysko 6306-2Z C3',idx:'HT-50-05',price:74,ins:'bearing',ex:[.46,0,0],kit:[['seal40',1,1],['circlip',1,1],['grease',1,0]]},
   {id:'shaft',g:'Łożyskowanie i wał',name:'Wał pompy ze stali nierdzewnej',idx:'HT-50-06',price:540,ins:'rotor',ex:[.3,0,.45],kit:[['@bear',1,1],['@mseal',1,1],['key',2,1]],s:'p',c:.83,w:'Element wirujący współpracujący z łożyskiem i uszczelnieniem.'},
   {id:'brkt',g:'Łożyskowanie i wał',name:'Wspornik łożyskowy (latarnia)',idx:'HT-50-04',price:920,ins:'struct',ex:[.2,0,0],kit:[['boltM12',4,1],['nutM12',4,1]],s:'n',c:.66,w:'Odlew korpusu. Sprzedaż tylko po weryfikacji przez serwis.'},
   {id:'coup',g:'Napęd',name:'Sprzęgło kłowe GR28 kompletne',idx:'HT-50-07',price:310,ins:'bolted',ex:[0,0,0],kit:[['spider',1,1],['key',1,0]]},
   {id:'motor',g:'Napęd',name:'Silnik 4 kW IE3, B3',idx:'HT-50-08',price:2150,ins:'struct',ex:[-.15,0,0],kit:[['boltM10',4,1],['nutM10',4,1],['washM10',8,1],['spider',1,0]]},
   {id:'fancov',g:'Napęd',name:'Osłona wentylatora silnika',idx:'HT-50-09',price:68,ins:'bolted',ex:[-.32,0,0],kit:[['boltM6',4,1]],s:'p',c:.88,w:'Element osłonowy z cienkiej blachy, łatwo ulega uszkodzeniom.'},
   {id:'base',g:'Napęd',name:'Rama fundamentowa',idx:'HT-50-10',price:780,ins:'struct',ex:[0,0,0],kit:[['anchor',4,1]],s:'n',c:.93,w:'Konstrukcja spawana, nie podlega zużyciu.'},
  ],
  build(a){
   const Y=.3;
   a.add('base',box(1.06,.05,.4,C.dark,.02,.025,0));a.add('base',box(.34,.12,.3,C.dark,-.25,.11,0));a.add('base',box(.16,.14,.26,C.dark,.165,.12,0));
   a.add('motor',cylX(.14,.14,.42,C.blue,-.25,Y,0));a.add('motor',box(.12,.07,.12,C.blue,-.25,Y+.17,0));
   a.add('fancov',cylX(.148,.148,.1,C.slate,-.51,Y,0));
   a.add('coup',cylX(.06,.06,.1,C.yellow,.02,Y,0));
   a.add('brkt',cylX(.1,.12,.17,C.steel,.165,Y,0));
   a.add('bear',cylX(.06,.06,.04,C.dark,.13,Y,0));
   a.add('shaft',cylX(.018,.018,.5,C.inox,.17,Y,0));
   a.add('mseal',cylX(.042,.042,.035,C.rubber,.27,Y,0));
   a.add('imp',cylX(.13,.13,.04,C.wood,.355,Y,0));a.add('imp',cylX(.05,.03,.05,C.wood,.39,Y,0));
   a.add('casing',cylX(.19,.19,.13,C.green,.365,Y,0));a.add('casing',cylX(.065,.065,.12,C.green,.49,Y,0));a.add('casing',cylX(.1,.1,.02,C.green,.555,Y,0));
   a.add('casing',cyl(.05,.05,.2,C.green,.365,Y+.27,.09));a.add('casing',cyl(.085,.085,.02,C.green,.365,Y+.38,.09));
  }},
 // hidden until "imported" from STEP in sBoM Studio
 {id:'hop',name:'Bujak sprężynowy Konik',code:'BJ-0310',pr:'play',src:'STEP',hidden:true,
  parts:[
   {id:'spring',g:'Zawieszenie',name:'Sprężyna stalowa Ø200 z płytą górną',idx:'BJ-0310-02',price:690,ins:'spring',kit:[['boltM12',8,1],['nutM12',8,1],['washM12',16,1],['loctite',1,0]],s:'p',c:.94,w:'Element sprężysty pracujący zmęczeniowo.'},
   {id:'body',g:'Korpus',name:'Korpus HPL 19 mm, profil konika',idx:'BJ-0310-03',price:890,ins:'bolted',kit:[['boltM10',6,1],['nutM10',6,1],['washM10',12,1]],s:'p',c:.81,w:'Panel narażony na uszkodzenia mechaniczne.'},
   {id:'seat',g:'Korpus',name:'Siedzisko z tworzywa',idx:'BJ-0310-06',price:150,ins:'bolted',kit:[['boltM8',4,1],['nutM8',4,1]],s:'p',c:.77,w:'Element przykręcany, kontakt z użytkownikiem.'},
   {id:'handle',g:'Uchwyty',name:'Uchwyt rączki (para)',idx:'BJ-0310-04',price:95,ins:'bolted',kit:[['boltM8',2,1],['capM8',2,1]],s:'p',c:.9,w:'Uchwyt: element kontaktu z użytkownikiem.'},
   {id:'foot',g:'Uchwyty',name:'Podnóżek (para)',idx:'BJ-0310-05',price:85,ins:'bolted',kit:[['boltM8',2,1],['capM8',2,1]],s:'p',c:.86,w:'Element obciążany punktowo.'},
   {id:'base',g:'Zawieszenie',name:'Płyta montażowa z kotwami',idx:'BJ-0310-01',price:220,ins:'struct',kit:[['anchor',4,1]],s:'n',c:.88,w:'Element fundamentu, nie podlega zużyciu.'},
  ],
  build(a){
   a.add('base',cyl(.24,.24,.03,C.dark,0,.015,0,32));
   a.add('spring',M(helixGeo(.1,.5,7,.04,260,.019),C.green));a.add('spring',cyl(.13,.13,.025,C.dark,0,.555,0));
   const sh=new THREE.Shape();[[-.4,0],[.32,0],[.36,.16],[.44,.34],[.5,.56],[.4,.62],[.3,.52],[.24,.3],[-.2,.3],[-.34,.46],[-.46,.42],[-.4,.22]].forEach((p,i)=>i?sh.lineTo(p[0],p[1]):sh.moveTo(p[0],p[1]));sh.closePath();
   const eg=new THREE.ExtrudeGeometry(sh,{depth:.04,bevelEnabled:true,bevelThickness:.006,bevelSize:.006,bevelSegments:2});eg.translate(0,0,-.02);
   a.add('body',M(eg,C.yellow,0,.57,0));
   a.add('seat',box(.3,.05,.24,C.blue,-.02,.895,0));
   a.add('handle',rod(V(.36,1.04,-.17),V(.36,1.04,.17),.018,C.steel));
   a.add('foot',rod(V(.12,.66,-.2),V(.12,.66,.2),.018,C.steel));
  }},
];
const P=Object.fromEntries(PRODUCTS.map(p=>[p.id,p]));
const snap=parts=>JSON.parse(JSON.stringify(parts));
PRODUCTS.forEach(p=>{p.parts.forEach(x=>{x.s=x.s||'a'});p.dirty=0;p.pub=p.v?{v:p.v,date:p.date,parts:snap(p.parts)}:null});

/* ---------- state ---------- */
const S={prod:'orbit',mode:'client',last:null,barOpen:false,sel:new Map(),cat:'Wszystkie',q:'',hover:null,explode:false,exAmt:1,isolate:false,orderView:'parts',openKits:new Set(),edit:null,sfilter:'all',tool:false,pq:'',pf:'all',pOpen:new Set(),imp:null,step:{client:'products',studio:'studio'},pane:{configurator:'model',order:'items',studio:'repo'},docsBack:null,pubDone:null,sentSig:''};
const key=(p,id)=>p+':'+id;
const pubPart=(prod,id)=>prod.pub?prod.pub.parts.find(x=>x.id===id&&x.s==='a')||null:null;
const pubParts=prod=>prod.pub?prod.pub.parts.filter(x=>x.s==='a'):[];
const draftPart=(prod,id)=>prod.parts.find(x=>x.id===id)||null;
const partOf=k=>{const i=k.indexOf(':'),prod=P[k.slice(0,i)];return{prod,part:prod?pubPart(prod,k.slice(i+1)):null}};
const catalog=()=>PRODUCTS.filter(p=>p.pub&&!p.hidden);
/* ---------- price list (S-14): published prices, history, trend, CSV ---------- */
const PRICE={v:12,date:'2026-11-12',dates:{10:'2026-06-01',11:'2026-09-01',12:'2026-11-12'},hist:new Map()};
const hsh=s=>{let h=0;for(const c of s)h=(h*31+c.charCodeAt(0))>>>0;return h};
const nice=x=>x<20?Math.round(x*10)/10:x<300?Math.round(x):Math.round(x/10)*10;
// indices that have a published price: approved parts of published products + the service index library
function priceRows(){
  const m=new Map();
  for(const p of PRODUCTS){if(p.hidden||!p.pub)continue;for(const pt of p.pub.parts)if(pt.s==='a'&&pt.idx&&!m.has(pt.idx))m.set(pt.idx,{idx:pt.idx,name:pt.name,price:pt.price,src:p.name})}
  for(const k in K){const [c,n,pr]=K[k];if(!m.has(c))m.set(c,{idx:c,name:n,price:pr,src:'Biblioteka indeksów'})}
  return [...m.values()].sort((a,b)=>a.idx.localeCompare(b.idx));
}
(function seedPrices(){for(const r of priceRows()){const h=hsh(r.idx)%10,p=r.price;let a;
  if(h<2)a=[{v:10,price:nice(p*.93)},{v:12,price:p}];
  else if(h===2)a=[{v:10,price:nice(p*1.06)},{v:12,price:p}];
  else if(h<5)a=[{v:10,price:nice(p*.96)},{v:11,price:p}];
  else a=[{v:10,price:p}];
  if(a.length>1&&Math.abs(a[0].price-a[1].price)<.005)a=[{v:10,price:p}];
  PRICE.hist.set(r.idx,a.map((e,i)=>({v:e.v,date:PRICE.dates[e.v],price:e.price,src:i?'import CSV':'cennik początkowy'})))}})();
const priceAt=(idx,v)=>{const h=PRICE.hist.get(idx);let r=null;if(h)for(const e of h)if(e.v<=v)r=e.price;return r};
// trend = price in the current price list version against the previous version: up, flat or down
function trendOf(idx){const cur=priceAt(idx,PRICE.v),prev=priceAt(idx,PRICE.v-1);
  if(cur===null||prev===null)return{dir:'flat',prev:null,pct:0,fresh:true};
  const d=cur-prev;return{dir:d>.004?'up':d<-.004?'down':'flat',prev,pct:prev?d/prev*100:0}}
function recordPrices(changes,src){
  PRICE.v++;PRICE.date=isoDay(new Date());PRICE.dates[PRICE.v]=PRICE.date;
  for(const c of changes){
    if(!PRICE.hist.has(c.idx))PRICE.hist.set(c.idx,[]);
    PRICE.hist.get(c.idx).push({v:PRICE.v,date:PRICE.date,price:c.price,src});
    for(const p of PRODUCTS){for(const pt of p.parts)if(pt.idx===c.idx)pt.price=c.price;if(p.pub)for(const pt of p.pub.parts)if(pt.idx===c.idx)pt.price=c.price}
    for(const k in K)if(K[k][0]===c.idx)K[k][2]=c.price}
}
const csvNum=n=>n.toFixed(2).replace('.',',');
const csvCell=s=>/[;"\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s;
const csvFile=rows=>'﻿indeks;nazwa;cena_netto;waluta\r\n'+rows.map(r=>[r[0],csvCell(r[1]),r[2],'PLN'].join(';')).join('\r\n')+'\r\n';
const csvTemplate=()=>csvFile(priceRows().map(r=>[r.idx,r.name,csvNum(r.price)]));
function sampleCsv(){const rows=priceRows(),out=[];
  rows.forEach((r,i)=>{const m=i%14;
    if(m===3||m===10)out.push([r.idx,r.name,csvNum(Math.max(r.price+.01,Math.round(r.price*1.06*100)/100))]);
    else if(m===6)out.push([r.idx,r.name,csvNum(Math.max(.01,Math.min(r.price-.01,Math.round(r.price*.95*100)/100)))]);
    else if(m===1)out.push([r.idx,r.name,csvNum(r.price)])});
  out.splice(4,0,['XX-9999','Indeks spoza cennika','10,00']);
  if(rows[12])out.splice(7,0,[rows[12].idx,rows[12].name,'do ustalenia']);
  return csvFile(out)}
function csvSplit(line,sep){const out=[];let cur='',q=false;
  for(let i=0;i<line.length;i++){const c=line[i];
    if(q){if(c==='"'){if(line[i+1]==='"'){cur+='"';i++}else q=false}else cur+=c}
    else if(c==='"')q=true;else if(c===sep){out.push(cur);cur=''}else cur+=c}
  out.push(cur);return out.map(s=>s.trim())}
function parsePriceCsv(text,name){
  const res={name,changes:[],same:0,issues:[],err:''},lines=String(text).replace(/^﻿/,'').split(/\r\n|\n|\r/);
  const skip=l=>!l.trim()||l.trim().startsWith('#'),hi=lines.findIndex(l=>!skip(l));
  if(hi<0){res.err='Plik jest pusty.';return res}
  const head=lines[hi],sep=head.includes(';')?';':head.includes('\t')?'\t':',',cols=csvSplit(head,sep).map(s=>s.toLowerCase());
  const ci=cols.findIndex(c=>/^(indeks|index|kod|code|sku)/.test(c)),cp=cols.findIndex(c=>/^(cena|price|netto)/.test(c));
  if(ci<0||cp<0){res.err='W pierwszym wierszu brakuje kolumn „indeks” i „cena_netto”. Pobierz wzór CSV i wypełnij go.';return res}
  const known=new Map(priceRows().map(r=>[r.idx.toUpperCase(),r])),seen=new Map();
  for(let i=hi+1;i<lines.length;i++){if(skip(lines[i]))continue;
    const f=csvSplit(lines[i],sep),idx=f[ci]||'',raw=f[cp]||'';
    if(!idx){res.issues.push({line:i+1,idx:'—',why:'brak indeksu'});continue}
    const r=known.get(idx.toUpperCase());
    if(!r){res.issues.push({line:i+1,idx,why:'nieznany indeks albo część jeszcze nieopublikowana'});continue}
    let t=raw.replace(/[\s ]|zł|pln/gi,'');if(sep!==',')t=t.replace(',','.');
    if(!/^\d+(\.\d+)?$/.test(t)||!(+t>0)){res.issues.push({line:i+1,idx:r.idx,why:'błędna cena „'+raw+'”'});continue}
    if(seen.has(r.idx))res.issues.push({line:i+1,idx:r.idx,why:'indeks powtórzony w pliku, użyto ostatniej wartości'});
    seen.set(r.idx,Math.round(+t*100)/100)}
  for(const [idx,price] of seen){const r=known.get(idx.toUpperCase());
    if(Math.abs(price-r.price)<.005)res.same++;
    else res.changes.push({idx,name:r.name,old:r.price,price,dir:price>r.price?'up':'down',pct:r.price?(price-r.price)/r.price*100:0})}
  res.changes.sort((a,b)=>a.idx.localeCompare(b.idx));
  if(!seen.size&&!res.issues.length)res.err='Plik nie zawiera żadnego wiersza z ceną.';
  return res}

function kitOf(prod,part,pub){return part.kit.map(([c,q,req])=>{
  if(c[0]==='@'){const d=(pub?pubPart:draftPart)(prod,c.slice(1));return d?{c,node:d.id,code:d.idx,name:d.name,price:d.price,q,req:!!req}:null}
  const it=K[c];return it?{c,code:it[0],name:it[1],price:it[2],q,req:!!req}:null}).filter(Boolean)}

const REVEAL={turned:'Część była zasłonięta. Widok został obrócony.',inside:'Ta część jest wewnątrz. Model został rozsunięty.'};
function toggle(pid,fromList){
  const prod=P[S.prod],pt=pubPart(prod,pid);if(!pt)return;
  const k=key(prod.id,pid);
  if(S.sel.has(k)){S.sel.delete(k);S.openKits.delete(k);if(S.last===k)S.last=null}
  else{S.sel.set(k,{qty:1,off:new Set()});S.openKits.add(k);S.last=k;S.barOpen=false;const how=fromList&&ready?reveal(pid):'ok';
    if(REVEAL[how])showToast(REVEAL[how],'Pokaż model',goViewer)}
  refresh();
}

/* ---------- RFQ maths ---------- */
function lines(){
  const parts=[],agg=new Map();
  for(const [k,st] of S.sel){const {prod,part}=partOf(k);if(!part)continue;
    const kit=kitOf(prod,part,true).map(x=>{const dup=!!(x.node&&S.sel.has(key(prod.id,x.node)));return{...x,qty:x.q*st.qty,dup,on:!dup&&(x.req||!st.off.has(x.c))}});
    parts.push({k,prod,part,qty:st.qty,kit});
    const add=(code,name,price,qty,src,f)=>{const id=prod.pr+'|'+code,e=agg.get(id)||{pr:prod.pr,code,name,price,qty:0,src,for:new Set()};e.qty+=qty;if(src==='p')e.src='p';e.for.add(f);agg.set(id,e)};
    add(part.idx,short(part.name),part.price,st.qty,'p',prod.code);
    kit.filter(x=>x.on).forEach(x=>add(x.code,short(x.name),x.price,x.qty,'k',short(part.name)));
  }
  const ord=Object.keys(PRODUCERS);
  parts.sort((a,b)=>ord.indexOf(a.prod.pr)-ord.indexOf(b.prod.pr)||PRODUCTS.indexOf(a.prod)-PRODUCTS.indexOf(b.prod));
  const list=[...agg.values()].sort((a,b)=>ord.indexOf(a.pr)-ord.indexOf(b.pr)||(a.src===b.src?a.code.localeCompare(b.code):a.src==='p'?-1:1));
  return{parts,agg:list,net:list.reduce((s,e)=>s+e.price*e.qty,0)};
}
function depSet(){const s=new Set();for(const [k,st] of S.sel){const {prod,part}=partOf(k);if(!part||prod.id!==S.prod)continue;
  kitOf(prod,part,true).forEach(x=>{if(x.node&&(x.req||!st.off.has(x.c))&&!S.sel.has(key(prod.id,x.node)))s.add(x.node)})}return s}

/* ---------- viewer ---------- */
let renderer,scene,camera,controls,ground,grid,model=null,raycaster,mouse,ready=false,tween=null,drag=null,preview=null;
const viewer=$('#viewer'),tip=$('#tip');
let HL,HOV,KITC,OKC,GREY,WHITE;

function buildFlat(prod,api){
  const W=2,H=W/prod.aspect,y0=.1;
  if(!prod.tex){prod.tex=new THREE.Texture(prod.imgEl);prod.tex.needsUpdate=true}
  const sheet=new THREE.Mesh(new THREE.PlaneGeometry(W,H),new THREE.MeshBasicMaterial({map:prod.tex,transparent:true,opacity:.6}));
  sheet.position.set(0,y0+H/2,0);sheet.userData.sheet=true;api.root.add(sheet);api.flat={W,H,y0};
  const fr=new THREE.LineSegments(new THREE.EdgesGeometry(sheet.geometry),new THREE.LineBasicMaterial({color:0x7d8a83}));fr.position.copy(sheet.position);api.root.add(fr);
  const area=r=>(r[2]-r[0])*(r[3]-r[1]);
  prod.parts.filter(pt=>pt.region).sort((a,b)=>area(b.region)-area(a.region)).forEach((pt,i)=>{const [u0,v0,u1,v1]=pt.region,g=new THREE.PlaneGeometry((u1-u0)*W,(v1-v0)*H);
    g.attributes.uv.array.set([u0,v1,u1,v1,u0,v0,u1,v0]);
    const m=new THREE.Mesh(g,new THREE.MeshBasicMaterial({map:prod.tex}));m.position.set(-W/2+(u0+u1)/2*W,y0+(v0+v1)/2*H,.012+i*.004);api.add(pt.id,m);
    const e=new THREE.LineSegments(new THREE.EdgesGeometry(g),new THREE.LineBasicMaterial({color:0x16211c}));e.position.copy(m.position);e.position.z+=.002;api.add(pt.id,e)});
}
function buildModel(prod){
  const root=new THREE.Group(),groups={};
  const api={root,flat:null,add(pid,obj,parent){let g=groups[pid];if(!g){g=new THREE.Group();g.userData.pid=pid;(parent||root).add(g);groups[pid]=g}
    obj.traverse(o=>{if(o.isMesh){o.userData.pid=pid;o.castShadow=o.receiveShadow=!prod.flat;o.userData.base=o.material.color.clone()}});g.add(obj);return obj}};
  if(prod.flat)buildFlat(prod,api);else prod.build(api);
  root.updateMatrixWorld(true);
  const bb=new THREE.Box3().setFromObject(root),c=bb.getCenter(new THREE.Vector3());
  for(const [pid,g] of Object.entries(groups)){const pt=draftPart(prod,pid);let ex;
    if(pt&&pt.ex)ex=new THREE.Vector3(pt.ex[0],pt.ex[1],pt.ex[2]);
    else{ex=new THREE.Box3().setFromObject(g).getCenter(new THREE.Vector3()).sub(c);
      if(prod.flat){ex.multiplyScalar(.55);ex.z=.14}else{ex.y*=.9;if(ex.length()<.08)ex.set(0,-.25,0);ex.multiplyScalar(.6)}}
    g.userData.home=g.position.clone();g.userData.ex=ex;g.userData.t=0}
  return{root,groups,bb,flat:api.flat};
}
function initGL(){
  HL=new THREE.Color('#FF4A1C');HOV=new THREE.Color('#FFD24A');KITC=new THREE.Color('#E8A317');OKC=new THREE.Color('#2E9B6B');GREY=new THREE.Color('#A3ABA7');WHITE=new THREE.Color('#ffffff');
  try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true})}catch(e){$('#loading').textContent='Ta przeglądarka nie obsługuje WebGL. Części wybierzesz z listy obok.';return false}
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  viewer.prepend(renderer.domElement);
  scene=new THREE.Scene();
  camera=new THREE.PerspectiveCamera(38,1,.02,100);
  scene.add(new THREE.HemisphereLight(0xffffff,0x8a9a8c,.75));
  const d=new THREE.DirectionalLight(0xffffff,.9);d.position.set(3,6,4);d.castShadow=true;d.shadow.mapSize.set(1024,1024);Object.assign(d.shadow.camera,{left:-4,right:4,top:4,bottom:-4});d.shadow.bias=-.0005;scene.add(d);
  const f=new THREE.DirectionalLight(0xffffff,.3);f.position.set(-4,2,-3);scene.add(f);
  ground=new THREE.Mesh(new THREE.CircleGeometry(3.6,64),new THREE.MeshStandardMaterial({color:'#7FA68A',transparent:true,opacity:.42,depthWrite:false,roughness:1}));
  ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);
  grid=new THREE.PolarGridHelper(3.6,16,6,64,0x5b7a66,0x5b7a66);grid.material.transparent=true;grid.material.opacity=.18;grid.position.y=.002;scene.add(grid);
  preview=new THREE.LineLoop(new THREE.BufferGeometry().setAttribute('position',new THREE.BufferAttribute(new Float32Array(12),3)),new THREE.LineBasicMaterial({color:0xFF4A1C}));preview.visible=false;preview.frustumCulled=false;scene.add(preview);
  controls=new THREE.OrbitControls(camera,renderer.domElement);
  Object.assign(controls,{enableDamping:true,dampingFactor:.09,minPolarAngle:0,maxPolarAngle:Math.PI,autoRotateSpeed:1.4,screenSpacePanning:true});
  raycaster=new THREE.Raycaster();mouse=new THREE.Vector2();
  new ResizeObserver(resize).observe(viewer);resize();
  bindPointer();
  $('#loading').hidden=true;ready=true;
  (function loop(){requestAnimationFrame(loop);step();controls.update();renderer.render(scene,camera)})();
  return true;
}
function resize(){if(!renderer)return;const w=viewer.clientWidth,h=viewer.clientHeight;if(!w||!h)return;viewer.classList.toggle('short',h<440);const sb=$('#selBar');viewer.style.setProperty('--barh',(sb.hidden?0:sb.offsetHeight)+'px');renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}
function loadModel(keepCam){
  if(!ready)return;
  if(model)scene.remove(model.root);
  const prod=P[S.prod];model=buildModel(prod);scene.add(model.root);
  const r=model.bb.getSize(new THREE.Vector3()).length(),k=Math.max(.15,r*.85/3.6);
  ground.scale.setScalar(k);grid.scale.setScalar(k);ground.visible=grid.visible=!prod.flat;
  controls.minDistance=r*.15;controls.maxDistance=r*6;
  if(!keepCam){fit(true);pendingFit=!viewer.clientWidth||!viewer.clientHeight}paint();
}
function bboxAt(t){
  const gs=Object.values(model.groups);
  gs.forEach(g=>g.position.copy(g.userData.home).addScaledVector(g.userData.ex,t));model.root.updateMatrixWorld(true);
  const bb=new THREE.Box3().setFromObject(model.root);
  gs.forEach(g=>g.position.copy(g.userData.home).addScaledVector(g.userData.ex,g.userData.t));model.root.updateMatrixWorld(true);
  return bb;
}
function fit(instant){if(!model)return;const bb=bboxAt(S.explode?S.exAmt:0),c=bb.getCenter(new THREE.Vector3()),s=bb.getSize(new THREE.Vector3()).length();
  const flat=P[S.prod].flat,sz=bb.getSize(new THREE.Vector3()),th=Math.tan(camera.fov*Math.PI/360);
  const dist=flat?Math.max(sz.y/2/th,sz.x/2/(th*camera.aspect))/.8+sz.z:s*1.35/th*.55*Math.max(1,1.05/camera.aspect),dir=(flat?V(.22,.08,1):V(1,.62,1.15)).normalize();
  goTo(c,c.clone().add(dir.multiplyScalar(dist)),instant)}
function goTo(target,pos,instant){
  if(instant||reduce){tween=null;controls.target.copy(target);camera.position.copy(pos);controls.update();return}
  tween={t0:performance.now(),d:550,ft:controls.target.clone(),fp:camera.position.clone(),tt:target,tp:pos};
}
function step(){
  if(tween){const k=Math.min(1,(performance.now()-tween.t0)/tween.d),e=1-Math.pow(1-k,3);
    controls.target.lerpVectors(tween.ft,tween.tt,e);camera.position.lerpVectors(tween.fp,tween.tp,e);if(k>=1)tween=null}
  if(model){const tgt=S.explode?S.exAmt:0;for(const g of Object.values(model.groups)){const t=g.userData.t+=(tgt-g.userData.t)*(reduce?1:.12);g.position.copy(g.userData.home).addScaledVector(g.userData.ex,t)}}
}
function orbit(dT,dP){const off=camera.position.clone().sub(controls.target),s=new THREE.Spherical().setFromVector3(off);
  s.theta+=dT;s.phi=Math.min(Math.PI-.02,Math.max(.02,s.phi+dP));off.setFromSpherical(s);goTo(controls.target.clone(),controls.target.clone().add(off))}
function zoom(f){const off=camera.position.clone().sub(controls.target);off.setLength(Math.min(controls.maxDistance,Math.max(controls.minDistance,off.length()*f)));goTo(controls.target.clone(),controls.target.clone().add(off))}
function partBox(pid){const g=model.groups[pid],t=S.explode?S.exAmt:0,cur=g.position.clone();g.position.copy(g.userData.home).addScaledVector(g.userData.ex,t);g.updateMatrixWorld(true);
  const bb=new THREE.Box3().setFromObject(g);g.position.copy(cur);g.updateMatrixWorld(true);return bb}
function focusPart(pid,dir){if(!model||!model.groups[pid])return;const bb=partBox(pid),c=bb.getCenter(new THREE.Vector3());
  const r=Math.max(bb.getSize(new THREE.Vector3()).length(),model.bb.getSize(new THREE.Vector3()).length()*.3);dir=(dir||camera.position.clone().sub(controls.target)).clone().normalize();goTo(c,c.clone().add(dir.multiplyScalar(r*2.6*Math.max(1,1.05/camera.aspect))))}
/* is the part visible? sample the centre of each of its meshes; solid = not dimmed */
const solid=h=>h.object.isMesh&&h.object.userData.pid&&!(h.object.material.transparent&&h.object.material.opacity<.5);
function samples(pid){const out=[];model.groups[pid].traverse(o=>{if(o.isMesh)out.push(new THREE.Box3().setFromObject(o).getCenter(new THREE.Vector3()))});return out}
function atTarget(fn){const gs=Object.values(model.groups),t=S.explode?S.exAmt:0;gs.forEach(g=>g.position.copy(g.userData.home).addScaledVector(g.userData.ex,t));model.root.updateMatrixWorld(true);
  const out=fn();gs.forEach(g=>g.position.copy(g.userData.home).addScaledVector(g.userData.ex,g.userData.t));model.root.updateMatrixWorld(true);return out}
const DIRS=[[1,.62,1.15],[-1,.62,1.15],[1,.62,-1.15],[-1,.62,-1.15],[1,.15,0],[-1,.15,0],[0,.15,1],[0,.15,-1],[.01,1,0],[.01,-1,0]];
/* a direction from which the part can be seen in the current explode setting (the camera's own direction first), or null */
function viewDir(pid){
  const R=model.bb.getSize(new THREE.Vector3()).length()*4+5,cur=camera.position.clone().sub(controls.target).normalize();
  return atTarget(()=>{const pts=samples(pid),ok=d=>pts.some(pt=>{raycaster.set(pt.clone().addScaledVector(d,R),d.clone().negate());const h=raycaster.intersectObject(model.root,true).find(solid);return !!h&&h.object.userData.pid===pid});
    if(ok(cur))return{d:cur,turned:false};const d=DIRS.map(a=>V(a[0],a[1],a[2]).normalize()).find(ok);return d?{d,turned:true}:null});
}
/* show a part picked from the list: turn the camera if it is only covered, pull the model apart if it sits inside */
function reveal(pid){
  if(!model||!model.groups[pid])return 'none';
  if(model.flat){focusPart(pid);return 'ok'}
  let v=viewDir(pid);
  if(v){focusPart(pid,v.d);return v.turned?'turned':'ok'}
  if(S.explode){focusPart(pid);return 'ok'}
  setExplode(true,true);v=viewDir(pid);focusPart(pid,v?v.d:null);return 'inside';
}
function goViewer(){S.pane.configurator='model';go('configurator')}
function paint(){
  if(!model)return;
  const prod=P[S.prod],studio=S.mode==='studio',dep=studio?null:depSet(),anySel=!studio&&[...S.sel.keys()].some(k=>k.startsWith(prod.id+':'));
  for(const [pid,g] of Object.entries(model.groups)){
    const hv=S.hover===pid;let col=null,em=0,emc=null,dim=false,grey=false;
    if(studio){const s=(draftPart(prod,pid)||{}).s||'n';
      if(s==='a')col=OKC;else if(s==='p')col=KITC;else grey=true;
      if(S.edit===pid){em=.45;emc=col||GREY}else if(hv){em=.22;emc=col||GREY}}
    else{const on=S.sel.has(key(prod.id,pid));
      if(on){col=HL;em=hv?.55:.3;emc=HL}else if(dep.has(pid)){col=KITC;em=.22;emc=KITC}else if(hv){em=.25;emc=HOV}
      dim=S.isolate&&anySel&&!on&&!dep.has(pid)&&!hv}
    g.traverse(o=>{if(!o.isMesh)return;const m=o.material;
      if(col)m.color.copy(col);else{m.color.copy(o.userData.base);if(grey)m.color.lerp(GREY,prod.flat?.0:.7);if(!studio&&hv)m.color.lerp(HOV,.6)}
      if(prod.flat){if(col)m.color.copy(WHITE).lerp(col,em?.6:.38);else if(grey)m.color.setScalar(.72)}
      if(m.emissive){if(em)m.emissive.copy(emc).multiplyScalar(em);else m.emissive.setRGB(0,0,0)}
      m.transparent=dim;m.opacity=dim?.14:1;m.depthWrite=!dim})}
}
function hits(ev){const r=renderer.domElement.getBoundingClientRect();mouse.set(((ev.clientX-r.left)/r.width)*2-1,-((ev.clientY-r.top)/r.height)*2+1);raycaster.setFromCamera(mouse,camera);return raycaster.intersectObject(model.root,true)}
function pick(ev){const h=hits(ev).find(h=>h.object.isMesh&&h.object.userData.pid&&!(h.object.material.transparent&&h.object.material.opacity<.5));
  if(!h)return null;const pid=h.object.userData.pid;return S.mode==='studio'||pubPart(P[S.prod],pid)?pid:null}
function sheetUV(ev){const h=hits(ev).find(h=>h.object.userData.sheet);return h?[h.uv.x,h.uv.y]:null}
function drawPreview(){const f=model.flat,[a,b]=[drag.a,drag.b],x=u=>-f.W/2+u*f.W,y=v=>f.y0+v*f.H,p=preview.geometry.attributes.position;
  p.setXYZ(0,x(a[0]),y(a[1]),.03);p.setXYZ(1,x(b[0]),y(a[1]),.03);p.setXYZ(2,x(b[0]),y(b[1]),.03);p.setXYZ(3,x(a[0]),y(b[1]),.03);p.needsUpdate=true;preview.visible=true}
function bindPointer(){
  const el=renderer.domElement;let down=null,raf=0;
  el.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY,b:e.button,touch:e.pointerType!=='mouse'};
    if(S.tool&&S.mode==='studio'&&model&&model.flat&&e.button===0){const p=sheetUV(e);if(p){drag={a:p,b:p};controls.enabled=false;try{el.setPointerCapture(e.pointerId)}catch(_){}}}});
  el.addEventListener('pointerup',e=>{
    if(drag){const d=drag;drag=null;preview.visible=false;controls.enabled=true;down=null;addRegion(d);return}
    if(!down)return;const moved=Math.hypot(e.clientX-down.x,e.clientY-down.y);
    // a finger drifts more than a mouse: a touch that ends within 14 px of its start still counts as a tap
    if(moved<(down.touch?14:6)&&down.b===0&&model){const pid=pick({clientX:down.x,clientY:down.y});   // a tap means the spot that was touched first, not where the finger slid to
      if(pid){S.mode==='studio'?openEdit(pid,true):toggle(pid)}}down=null});
  el.addEventListener('pointercancel',()=>{if(drag){drag=null;preview.visible=false;controls.enabled=true}down=null});
  el.addEventListener('dblclick',e=>{const pid=pick(e);if(pid)focusPart(pid)});
  el.addEventListener('pointermove',e=>{
    if(drag){const p=sheetUV(e);if(p){drag.b=p;drawPreview()}return}
    if(e.pointerType==='touch'||raf)return;raf=requestAnimationFrame(()=>{raf=0;if(!model)return;const pid=down?null:pick(e);setHover(pid);
    if(pid){const prod=P[S.prod],studio=S.mode==='studio',pt=studio?draftPart(prod,pid):pubPart(prod,pid),r=viewer.getBoundingClientRect();
      tip.hidden=false;tip.style.left=Math.min(e.clientX-r.left,r.width-200)+'px';tip.style.top=(e.clientY-r.top)+'px';
      tip.innerHTML=studio?`<b>${esc(pt.name)}</b><br><span class="mono">${esc(pt.idx||'brak indeksu')}</span><br>${SL[pt.s]}${pt.s==='p'&&pt.c?' · pewność '+Math.round(pt.c*100)+'%':''}<br>Kliknij, aby edytować`
        :`<b>${esc(pt.name)}</b><br><span class="mono">${esc(pt.idx)}</span> · ok. ${zl(pt.price)}<br>${S.sel.has(key(prod.id,pid))?'Kliknij, aby odznaczyć':'Kliknij, aby zaznaczyć'}${pt.kit.length?' · '+kitOf(prod,pt,true).length+' poz. w komplecie':''}`}
    else tip.hidden=true;
    el.style.cursor=pid?'pointer':'grab'})});
  el.addEventListener('pointerleave',()=>{setHover(null);tip.hidden=true});
}
function setHover(pid){if(S.hover===pid)return;S.hover=pid;paint();$$('.prow,.srow').forEach(r=>r.classList.toggle('hov',r.dataset.pid===pid))}

/* viewer controls */
const step8=Math.PI/8;
$$('[data-orb]').forEach(b=>b.addEventListener('click',()=>{if(!ready)return;const d=b.dataset.orb;
  if(d==='left')orbit(-step8,0);if(d==='right')orbit(step8,0);if(d==='up')orbit(0,-step8);if(d==='down')orbit(0,step8);
  if(d==='top'){const L=camera.position.distanceTo(controls.target);goTo(controls.target.clone(),controls.target.clone().add(V(.001,L,0)))}}));
$$('[data-zoom]').forEach(b=>b.addEventListener('click',()=>ready&&zoom(b.dataset.zoom==='in'?.75:1.33)));
$('#tRotate').onclick=e=>{if(!ready)return;controls.autoRotate=!controls.autoRotate;e.currentTarget.setAttribute('aria-pressed',controls.autoRotate)};
function setExplode(on,noFit){S.explode=on;$('#tExplode').setAttribute('aria-pressed',on);$('#exLbl').textContent=on?'Złóż model':'Rozsuń części';$('#exTag').hidden=!on;if(ready&&!noFit)fit()}
$('#tExplode').onclick=()=>setExplode(!S.explode);
$('#exAmt').addEventListener('input',e=>{S.exAmt=+e.target.value});
$('#exAmt').addEventListener('change',()=>ready&&fit());
$('#tIsolate').onclick=e=>{S.isolate=!S.isolate;e.currentTarget.setAttribute('aria-pressed',S.isolate);paint();if(S.isolate&&![...S.sel.keys()].some(k=>k.startsWith(S.prod+':')))showToast('Zaznacz część, aby wyszarzyć pozostałe.')};
$('#tFit').onclick=()=>ready&&fit();
$('#tClear').onclick=()=>{[...S.sel.keys()].filter(k=>k.startsWith(S.prod+':')).forEach(k=>{S.sel.delete(k);S.openKits.delete(k)});refresh()};
viewer.addEventListener('keydown',e=>{if(!ready||e.target!==viewer)return;const m={ArrowLeft:()=>orbit(-step8,0),ArrowRight:()=>orbit(step8,0),ArrowUp:()=>orbit(0,-step8),ArrowDown:()=>orbit(0,step8),'+':()=>zoom(.75),'=':()=>zoom(.75),'-':()=>zoom(1.33),r:()=>fit(),R:()=>fit(),e:()=>$('#tExplode').click(),E:()=>$('#tExplode').click()}[e.key];if(m){e.preventDefault();m()}});

/* ---------- thumbnails and the sample drawing ---------- */
let T=null;
function thumbGL(){if(T)return T;const r=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});
  const sc=new THREE.Scene();sc.add(new THREE.HemisphereLight(0xffffff,0x8a9a8c,.9));const d=new THREE.DirectionalLight(0xffffff,.85);d.position.set(3,6,4);sc.add(d);
  return T={r,sc,cam:new THREE.PerspectiveCamera(32,1.5,.02,100)}}
function shot(prod,w,h,t,paper){
  const {r,sc,cam}=thumbGL();r.setPixelRatio(1);r.setSize(w,h,false);r.setClearColor(paper||0x000000,paper?1:0);
  const m=buildModel(prod);Object.values(m.groups).forEach(g=>g.position.copy(g.userData.home).addScaledVector(g.userData.ex,t));m.root.updateMatrixWorld(true);sc.add(m.root);
  const bb=new THREE.Box3().setFromObject(m.root),c=bb.getCenter(new THREE.Vector3()),s=bb.getSize(new THREE.Vector3()).length();
  cam.aspect=w/h;cam.updateProjectionMatrix();cam.position.copy(c).add(V(1,.6,1.2).normalize().multiplyScalar(s*1.95));cam.lookAt(c);cam.updateMatrixWorld(true);
  r.render(sc,cam);const src=r.domElement.toDataURL('image/png');
  const regions={};for(const [pid,g] of Object.entries(m.groups)){const b=new THREE.Box3().setFromObject(g);let u0=1,v0=1,u1=0,v1=0;
    for(const x of [b.min.x,b.max.x])for(const y of [b.min.y,b.max.y])for(const z of [b.min.z,b.max.z]){const p=V(x,y,z).project(cam);u0=Math.min(u0,p.x/2+.5);u1=Math.max(u1,p.x/2+.5);v0=Math.min(v0,p.y/2+.5);v1=Math.max(v1,p.y/2+.5)}
    const cl=q=>Math.min(1,Math.max(0,q));regions[pid]=[cl(u0-.008),cl(v0-.008),cl(u1+.008),cl(v1+.008)]}
  sc.remove(m.root);return{src,regions};
}
function makeThumb(prod){if(!HAS3||prod.flat||prod.thumb)return;try{prod.thumb=shot(prod,540,360,0).src}catch(e){}}

/* ---------- UI: catalog ---------- */
function renderCats(){const cats=['Wszystkie',...new Set(catalog().map(p=>PRODUCERS[p.pr].ind))];if(!cats.includes(S.cat))S.cat='Wszystkie';
  $('#cats').innerHTML=cats.map(c=>`<button class="chip" aria-pressed="${c===S.cat}" data-cat="${esc(c)}">${esc(c)}</button>`).join('')}
function renderProducts(){
  renderCats();
  const q=S.q.trim().toLowerCase();
  const list=catalog().filter(p=>{const pr=PRODUCERS[p.pr];return(S.cat==='Wszystkie'||pr.ind===S.cat)&&(!q||(p.name+' '+p.code+' '+pr.name+' '+pr.ind).toLowerCase().includes(q))});
  $('#pgrid').innerHTML=list.length?list.map(p=>{const n=[...S.sel.keys()].filter(k=>k.startsWith(p.id+':')).length,pr=PRODUCERS[p.pr];
    return `<button class="pcard" data-prod="${p.id}" aria-pressed="${p.id===S.prod&&S.mode==='client'}"><span class="badges">${n?`<span class="badge">${n} zazn.</span>`:''}${p.fresh?'<span class="badge new">nowa wersja sBoM</span>':''}</span>
    <span class="thumb">${p.thumb?`<img src="${p.thumb}" alt="">`:''}</span>
    <span class="meta"><b>${esc(p.name)}</b><span class="row"><span>${esc(pr.name)} · ${esc(pr.ind)}</span></span><span class="row"><span class="mono">${esc(p.code)}</span><span>sBoM v${p.pub.v} · ${dPL(p.pub.date)}</span></span><span class="open">Otwórz model →</span></span></button>`}).join('')
    :`<div class="empty" style="grid-column:1/-1">Brak produktów dla „${esc(S.q)}”. Sprawdź kod na tabliczce znamionowej.</div>`;
}
$('#cats').addEventListener('click',e=>{const b=e.target.closest('[data-cat]');if(!b)return;S.cat=b.dataset.cat;renderProducts()});
$('#q').addEventListener('input',e=>{S.q=e.target.value;renderProducts()});
$('#pgrid').addEventListener('click',e=>{const b=e.target.closest('[data-prod]');if(!b)return;if(S.mode!=='client')setMode('client',true);P[b.dataset.prod].fresh=false;selectProduct(b.dataset.prod,true)});
function selectProduct(id,scroll){S.prod=id;S.hover=null;S.edit=null;S.tool=false;if(scroll){S.pane.configurator='model';S.step[S.mode]='configurator'}loadModel();refresh()}

/* ---------- modes ---------- */
const SL={a:'część zamienna',p:'do przeglądu',n:'wyłączona'};
function setMode(m,quiet){
  S.mode=m;const st=m==='studio';
  document.body.dataset.view=m;
  $('#mClient').setAttribute('aria-pressed',!st);$('#mStudio').setAttribute('aria-pressed',st);
  $('#drawerClient').hidden=st;$('#drawerStudio').hidden=!st;$('#tIsolate').hidden=st;$('#tClear').hidden=st;
  S.hover=null;S.tool=false;tip.hidden=true;
  if(!st&&!P[S.prod].pub){S.prod=catalog()[0].id;loadModel()}
  if(!quiet)refresh();else showScreen();
}
const switchView=m=>{if(S.mode===m)return;setMode(m)};
$('#mClient').onclick=()=>switchView('client');$('#mStudio').onclick=()=>switchView('studio');
function openStudio(id){setMode('studio',true);selectProduct(id,true)}

/* ---------- UI: client drawer ---------- */
function setTab(t){const l=t==='list';$('#tabList').setAttribute('aria-selected',l);$('#tabSel').setAttribute('aria-selected',!l);$('#panelList').hidden=!l;$('#panelSel').hidden=l}
$('#tabList').onclick=()=>setTab('list');$('#tabSel').onclick=()=>setTab('sel');
function renderPartList(){
  const p=P[S.prod],dep=depSet();let g='',h='';
  for(const pt of pubParts(p)){if(pt.g!==g){g=pt.g;h+=`<li class="grp">${esc(g)}</li>`}
    const on=S.sel.has(key(p.id,pt.id)),n=kitOf(p,pt,true).length;
    h+=`<li><button class="prow${dep.has(pt.id)?' dep':''}" data-pid="${pt.id}" aria-pressed="${on}"><span class="cb"></span><span class="nm">${esc(pt.name)}<small><span class="mono">${esc(pt.idx)}</span> · ok. ${zl(pt.price)}${dep.has(pt.id)?' · w komplecie zaznaczonej części':''}</small></span>${n?`<span class="kitn" title="Pozycje kompletu sBoM">+${n} kit</span>`:''}</button></li>`}
  $('#plist').innerHTML=h||'<li class="empty">Ten produkt nie ma jeszcze opublikowanych części zamiennych.</li>';
}
$('#plist').addEventListener('click',e=>{const b=e.target.closest('.prow');if(b)toggle(b.dataset.pid,true)});
for(const id of ['#plist','#sList']){$(id).addEventListener('mouseover',e=>{const b=e.target.closest('.prow,.srow');setHover(b?b.dataset.pid:null)});
  $(id).addEventListener('mouseleave',()=>setHover(null));$(id).addEventListener('focusin',e=>{const b=e.target.closest('.prow,.srow');if(b)setHover(b.dataset.pid)})}

function renderSelected(L){
  const el=$('#panelSel');
  if(!L.parts.length){el.innerHTML=`<div class="empty"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M24 4l17 10v20L24 44 7 34V14z"/><path d="M7 14l17 10 17-10M24 24v20"/></svg><b>Nic jeszcze nie zaznaczono</b><span>Kliknij część na modelu lub na liście. Komplet sBoM pojawi się tutaj.</span></div>`;return}
  el.innerHTML=L.parts.map(x=>{const id=cssId(x.k),open=S.openKits.has(x.k),act=x.kit.filter(k=>k.on),kitSum=act.reduce((s,k)=>s+k.price*k.qty,0);
   return `<article class="selcard" id="sc-${id}" data-k="${x.k}">
    <div class="hd"><div><b>${esc(x.part.name)}</b><small><span class="mono">${esc(x.part.idx)}</span> · ${esc(x.prod.name)} · ok. ${zl(x.part.price)}</small></div>
      <div class="qty" aria-label="Ilość"><button data-act="dec" aria-label="Zmniejsz">−</button><output class="num">${x.qty}</output><button data-act="inc" aria-label="Zwiększ">+</button></div></div>
    ${x.kit.length?`<button class="kitbtn" data-act="kit" aria-expanded="${open}" aria-controls="kit-${id}"><span>Komplet sBoM · ${act.length}/${x.kit.length} poz. · <span class="num">ok. ${zl(kitSum)}</span></span><svg class="chev" width="14" height="14" viewBox="0 0 16 16"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="2" fill="none"/></svg></button>
    <ul class="kitlist" id="kit-${id}" ${open?'':'hidden'}>${x.kit.map(k=>`<li class="${k.on?'':'off'}"><input type="checkbox" data-act="kitc" data-c="${esc(k.c)}" ${k.on?'checked':''} ${k.req||k.dup?'disabled':''} aria-label="${esc(k.name)}"><span class="t">${esc(k.name)}<br><span class="mono muted">${esc(k.code)}</span>${k.node?'<span class="tagx mod">element modelu</span>':''}${k.dup?'<span class="tagx opt">zaznaczona osobno</span>':k.req?'<span class="tagx req">wymagane</span>':'<span class="tagx opt">zalecane</span>'}</span><span class="num">${k.qty} × ${zl(k.price)}</span></li>`).join('')}</ul>`:'<small class="muted">Ta część nie wymaga elementów dodatkowych.</small>'}
    <div class="acts">${x.prod.id===S.prod?'<button class="link" data-act="focus">Pokaż na modelu</button>':'<button class="link" data-act="open">Otwórz model</button>'}<button class="link" data-act="doc">Instrukcja wymiany</button><button class="link danger" data-act="rm">Usuń</button></div>
   </article>`}).join('');
}
$('#panelSel').addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b)return;const k=b.closest('.selcard').dataset.k,st=S.sel.get(k),{prod,part}=partOf(k);
  switch(b.dataset.act){
   case 'inc':st.qty=Math.min(99,st.qty+1);break;
   case 'dec':st.qty=Math.max(1,st.qty-1);break;
   case 'kit':S.openKits.has(k)?S.openKits.delete(k):S.openKits.add(k);break;
   case 'kitc':b.checked?st.off.delete(b.dataset.c):st.off.add(b.dataset.c);break;
   case 'rm':S.sel.delete(k);S.openKits.delete(k);break;
   case 'focus':{const how=reveal(part.id);if(REVEAL[how])showToast(REVEAL[how]);goViewer();return}
   case 'open':selectProduct(prod.id,false);setTimeout(()=>{const how=reveal(part.id);if(REVEAL[how])showToast(REVEAL[how]);goViewer()},80);return;
   case 'doc':openDoc(k);return;
  }refresh()});

/* ---------- UI: sBoM Studio drawer ---------- */
const touch=prod=>{prod.dirty=(prod.dirty||0)+1};
function extras(prod,pt){const g=model&&model.groups[pt.id],ex=g?g.userData.ex.toArray().map(n=>+n.toFixed(3)):pt.ex||null;
  return JSON.stringify({partpark:{schema:'sbom-node/1.0',nodeId:pt.id,itemCode:pt.idx||null,name:pt.name,serviceable:pt.s==='a',reviewStatus:{a:'approved',p:'proposed',n:'excluded'}[pt.s],explode:ex,...(pt.region?{imageRegion:pt.region.map(n=>+n.toFixed(4))}:{})}},null,2)}
function editor(prod,pt){
  const kit=kitOf(prod,pt,false);
  const head=pt.s==='p'?`<div class="prop"><div><b>Propozycja automatu</b>${pt.c?` · pewność ${Math.round(pt.c*100)}%`:''}<br>${esc(pt.w||'')}</div><div class="btnrow"><button class="btn sm primary" data-sa="approve">Zatwierdź jako część zamienną</button><button class="btn sm" data-sa="reject">Odrzuć</button></div></div>`
   :pt.s==='a'?`<div class="statline"><span class="pill a">zatwierdzona przez człowieka</span><button class="link danger" data-sa="reject">Wyłącz z części zamiennych</button></div>`
   :`<div><div class="statline"><span class="pill n">nie jest częścią zamienną</span><button class="link" data-sa="approve">Włącz jako część zamienną</button></div>${pt.w?`<small class="muted">${esc(pt.w)}</small>`:''}</div>`;
  const opts=`<optgroup label="Elementy tego modelu">${prod.parts.filter(x=>x.id!==pt.id&&!pt.kit.some(k=>k[0]==='@'+x.id)).map(x=>`<option value="@${x.id}">${esc(x.name)}</option>`).join('')}</optgroup><optgroup label="Biblioteka indeksów serwisowych">${Object.entries(K).filter(([k])=>!pt.kit.some(q=>q[0]===k)).map(([k,v])=>`<option value="${esc(k)}">${esc(v[1])} · ${esc(v[0])}</option>`).join('')}</optgroup>`;
  return `<div class="sed" data-pid="${pt.id}">${head}
   <label>Nazwa części<input id="se-name" data-f="name" value="${esc(pt.name)}"></label>
   <div class="f2"><label>Indeks serwisowy<input id="se-idx" data-f="idx" value="${esc(pt.idx)}" placeholder="np. ABC-0001"></label><label>Cena poglądowa netto (zł)<input id="se-price" data-f="price" type="number" min="0" step="0.01" value="${pt.price}"></label></div>
   <div><div class="eyebrow">Komplet serwisowy: elementy zależne</div>
    <div class="krows">${kit.length?kit.map(x=>`<div class="krow"><span>${esc(x.name)}<br><span class="mono muted">${esc(x.code||'brak indeksu')}</span>${x.node?'<span class="tagx mod">element modelu</span>':''}</span><input id="kq-${cssId(x.c)}" type="number" min="1" max="99" value="${x.q}" data-kq="${esc(x.c)}" aria-label="Ilość na jedną część"><select id="kr-${cssId(x.c)}" data-kr="${esc(x.c)}" aria-label="Wymagalność"><option value="1"${x.req?' selected':''}>wymagane</option><option value="0"${x.req?'':' selected'}>zalecane</option></select><button class="x" data-sa="kdel" data-c="${esc(x.c)}" aria-label="Usuń z kompletu">×</button></div>`).join(''):'<small class="muted">Brak elementów zależnych. Klient zamówi samą część.</small>'}</div>
    <div class="kadd"><select id="se-add" aria-label="Element do dodania">${opts}</select><button class="btn sm" data-sa="kadd">Dodaj</button></div>
    <details class="help"><summary>Dodaj indeks ręcznie</summary><div class="f2"><label>Indeks<input id="se-mcode" placeholder="np. SRV-USZ-0042"></label><label>Cena poglądowa (zł)<input id="se-mprice" type="number" min="0" step="0.01"></label></div><label>Nazwa<input id="se-mname" placeholder="np. Uszczelka pokrywy"></label><button class="btn sm" data-sa="kman">Dodaj do kompletu</button></details>
   </div>
   <details class="help"><summary>Metadane węzła w GLB</summary><pre class="code">${esc(extras(prod,pt))}</pre><small class="muted">To trafia do pola extras węzła. Ceny i komplety są w sbom.json i pricelist.json.</small></details>
   <div class="acts"><button class="link" data-sa="focus">Pokaż na modelu</button>${pt.region?'<button class="link danger" data-sa="delpart">Usuń obszar</button>':''}</div></div>`;
}
function renderStudio(){
  const prod=P[S.prod],pr=PRODUCERS[prod.pr],cnt={a:0,p:0,n:0};prod.parts.forEach(x=>cnt[x.s]++);
  const fid=document.activeElement&&document.activeElement.closest&&document.activeElement.closest('#drawerStudio')?document.activeElement.id:'';
  const sc=$('#sList').scrollTop;
  $('#sHead').innerHTML=`<div><b>${esc(prod.name)}</b><br><small class="muted">${esc(pr.name)} · źródło: ${esc(prod.src)} · ${prod.pub?`opublikowany sBoM v${prod.pub.v} z ${dPL(prod.pub.date)}`:'szkic, jeszcze nieopublikowany'}</small></div>
   <div class="btnrow" role="group" aria-label="Filtr elementów">${[['all','Wszystkie',prod.parts.length],['p','Do przeglądu',cnt.p],['a','Części',cnt.a],['n','Wyłączone',cnt.n]].map(([f,l,n])=>`<button class="chip" data-sf="${f}" aria-pressed="${S.sfilter===f}">${l} ${n}</button>`).join('')}</div>
   ${prod.flat?`<div class="btnrow"><button class="btn sm${S.tool?' primary':''}" data-sa="tool" aria-pressed="${S.tool}">${S.tool?'Przeciągnij prostokąt na rysunku…':'+ Zaznacz obszar części'}</button></div>`:''}`;
  const list=prod.parts.filter(x=>S.sfilter==='all'||x.s===S.sfilter);
  $('#sList').innerHTML=list.length?list.map(pt=>`<li><button class="srow" data-pid="${pt.id}" aria-expanded="${S.edit===pt.id}"><span class="dot ${pt.s}"></span><span class="nm">${rowLabel(pt)}</span><span class="pill ${pt.s}">${SL[pt.s]}</span></button>${S.edit===pt.id?editor(prod,pt):''}</li>`).join('')
   :`<li class="empty">${prod.parts.length?'Brak elementów w tym filtrze.':'Model nie ma jeszcze elementów. Zaznacz pierwszy obszar części na rysunku.'}</li>`;
  syncFoot();
  $('#sList').scrollTop=sc;
  if(fid){const el=document.getElementById(fid);if(el)el.focus({preventScroll:true})}
  viewer.classList.toggle('tooling',!!S.tool);
}
const rowLabel=pt=>`${esc(pt.name)}<small><span class="mono">${esc(pt.idx||'brak indeksu')}</span> · ${zl(pt.price)}${pt.kit.length?' · kit '+pt.kit.length:''}</small>`;
function syncFoot(){const prod=P[S.prod],ps=pubState(prod);
  $('#sInfo').textContent=`do przeglądu: ${ps.q} · zmiany robocze: ${prod.dirty}`;$('#sHint').textContent=ps.hint;
  renderPublish();renderStepper();renderAct()}
let stale=false;
document.addEventListener('click',()=>{if(stale)refresh()});
function openEdit(pid,scroll){const prod=P[S.prod],pt=draftPart(prod,pid);if(!pt)return;
  S.edit=S.edit===pid&&!scroll?null:pid;if(S.sfilter!=='all'&&pt.s!==S.sfilter)S.sfilter='all';
  renderStudio();paint();if(S.edit){const row=$(`.srow[data-pid="${pid}"]`);row&&row.scrollIntoView({block:'nearest',behavior:reduce?'auto':'smooth'})}}
function addRegion(d){
  const prod=P[S.prod],u0=Math.min(d.a[0],d.b[0]),u1=Math.max(d.a[0],d.b[0]),v0=Math.min(d.a[1],d.b[1]),v1=Math.max(d.a[1],d.b[1]);
  if(u1-u0<.03||v1-v0<.03){showToast('Obszar jest za mały. Przeciągnij większy prostokąt.');return}
  const n=prod.parts.length+1,pt={id:'r'+Date.now().toString(36),g:'Obszary',name:'Element '+n,idx:'',price:0,ins:'bolted',kit:[],s:'p',c:null,w:'Obszar wskazany ręcznie. Uzupełnij nazwę, indeks i cenę, a potem zatwierdź.',region:[u0,v0,u1,v1]};
  prod.parts.push(pt);touch(prod);S.tool=false;S.edit=pt.id;S.sfilter='all';loadModel(true);refresh();
  $(`.srow[data-pid="${pt.id}"]`)?.scrollIntoView({block:'nearest'});
}
function publish(prod){
  const first=!prod.pub,ch=[];
  for(const pt of prod.parts)if(pt.s==='a'&&pt.idx){const h=PRICE.hist.get(pt.idx),cur=h&&h.length?h[h.length-1].price:null;if(cur===null||Math.abs(cur-pt.price)>.004)ch.push({idx:pt.idx,price:pt.price})}
  prod.pub={v:(prod.pub?prod.pub.v:0)+1,date:isoDay(new Date()),parts:snap(prod.parts)};prod.dirty=0;prod.fresh=true;makeThumb(prod);
  if(ch.length)recordPrices(ch,'edytor części · '+prod.code+' sBoM v'+prod.pub.v);
  S.pubDone=prod.id;
  showToast(first?`Opublikowano ${prod.name}, sBoM v1. Produkt jest w katalogu klientów.`:`Opublikowano sBoM v${prod.pub.v}. Klienci widzą nowe części i ceny poglądowe.`,'Zobacz jako klient',()=>{setMode('client',true);S.step.client='configurator';S.pane.configurator='model';refresh()});
  refresh();
}
$('#drawerStudio').addEventListener('click',e=>{
  const prod=P[S.prod],f=e.target.closest('[data-sf]');if(f){S.sfilter=f.dataset.sf;renderStudio();return}
  const a=e.target.closest('[data-sa]');
  if(!a){const r=e.target.closest('.srow');if(r)openEdit(r.dataset.pid);return}
  const act=a.dataset.sa,pt=S.edit?draftPart(prod,S.edit):null;
  if(act==='publish'){publish(prod);return}
  if(act==='tool'){S.tool=!S.tool;renderStudio();if(S.tool)showToast('Przeciągnij prostokąt wokół części na rysunku.');return}
  if(!pt)return;
  if(act==='focus'){const how=reveal(pt.id);if(REVEAL[how])showToast(REVEAL[how]);goViewer();return}
  if(act==='approve'){if(!pt.idx.trim()){showToast('Najpierw wpisz indeks serwisowy tej części.');$('#se-idx')?.focus();return}pt.s='a'}
  else if(act==='reject'){pt.s='n';pt.w=pt.w||'';if(!/człowiek/.test(pt.w))pt.w=('Wyłączona decyzją człowieka. '+pt.w).trim()}
  else if(act==='kadd'){const v=$('#se-add').value;if(!v)return;pt.kit.push([v,1,1])}
  else if(act==='kdel'){pt.kit=pt.kit.filter(k=>k[0]!==a.dataset.c)}
  else if(act==='kman'){const code=$('#se-mcode').value.trim(),name=$('#se-mname').value.trim(),price=parseFloat($('#se-mprice').value)||0;
    if(!code||!name){showToast('Wpisz indeks i nazwę elementu.');return}
    const kk='c:'+code;K[kk]=[code,name,price];if(!PRICE.hist.has(code))PRICE.hist.set(code,[{v:PRICE.v,date:isoDay(new Date()),price,src:'indeks dodany ręcznie'}]);if(!pt.kit.some(k=>k[0]===kk))pt.kit.push([kk,1,1])}
  else if(act==='delpart'){prod.parts=prod.parts.filter(x=>x!==pt);prod.parts.forEach(x=>{x.kit=x.kit.filter(k=>k[0]!=='@'+pt.id)});S.edit=null;touch(prod);loadModel(true);refresh();return}
  touch(prod);refresh();
});
$('#drawerStudio').addEventListener('change',e=>{
  const prod=P[S.prod],pt=S.edit?draftPart(prod,S.edit):null,t=e.target;if(!pt)return;
  if(t.dataset.f){pt[t.dataset.f]=t.dataset.f==='price'?Math.max(0,parseFloat(t.value)||0):t.value.trim()}
  else if(t.dataset.kq){const k=pt.kit.find(k=>k[0]===t.dataset.kq);if(k)k[1]=Math.min(99,Math.max(1,parseInt(t.value)||1))}
  else if(t.dataset.kr){const k=pt.kit.find(k=>k[0]===t.dataset.kr);if(k)k[2]=+t.value}
  else return;
  touch(prod);stale=true;syncFoot();
  const row=$(`.srow[data-pid="${pt.id}"] .nm`);if(row)row.innerHTML=rowLabel(pt);
});

/* ---------- UI: studio section (repository, import) ---------- */
function renderRepo(){
  $('#repoBody').innerHTML=PRODUCTS.filter(p=>!p.hidden).map(p=>{const pr=PRODUCERS[p.pr],a=p.parts.filter(x=>x.s==='a').length,q=p.parts.filter(x=>x.s==='p').length;
    return `<tr><td><b>${esc(p.name)}</b><br><small>${esc(pr.name)} · <span class="mono">${esc(p.code)}</span></small><small class="rmeta">${p.pub?'sBoM v'+p.pub.v:'szkic'} · części: ${a}${q?' · do przeglądu: '+q:''}</small></td><td>${esc(p.src)}</td><td class="num">${p.pub?'v'+p.pub.v+'<br><small>'+dPL(p.pub.date)+'</small>':'—'}</td><td class="r num">${a}</td><td class="r num">${q||'—'}</td><td>${!p.pub?'<span class="pill n">szkic</span>':p.dirty?'<span class="pill p">zmiany robocze</span>':'<span class="pill a">opublikowany</span>'}</td><td class="r"><button class="btn sm" data-open="${p.id}">Otwórz</button></td></tr>`}).join('');
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-open]');if(b)openStudio(b.dataset.open)});
const impLog=$('#impLog');
function logSteps(steps,done){impLog.hidden=false;impLog.innerHTML='';steps.forEach((t,i)=>setTimeout(()=>{impLog.insertAdjacentHTML('beforeend',`<li>${t}</li>`);if(i===steps.length-1)done()},reduce?0:420*(i+1)))}
function importStep(name,size){
  if(!HAS3||!ready){showToast('Import wymaga działającego podglądu 3D.');return}
  const prod=P.hop;
  if(!prod.hidden){showToast('Model przykładowy jest już w repozytorium.','Otwórz',()=>openStudio('hop'));return}
  const tmp=buildModel(prod);let tri=0,mesh=0;tmp.root.traverse(o=>{if(o.isMesh){mesh++;const g=o.geometry;tri+=(g.index?g.index.count:g.attributes.position.count)/3}});
  const prop=prod.parts.filter(x=>x.s==='p').length;
  logSteps([`Wczytano plik <b>${esc(name)}</b>${size?' ('+size+')':''}. Pokaz na modelu przykładowym.`,`Struktura złożenia: ${prod.parts.length} komponentów, ${mesh} brył.`,`Teselacja i uproszczenie: ${Math.round(tri).toLocaleString('pl-PL')} trójkątów w modelu serwisowym.`,'Zapis: model.glb (metadane w extras węzłów) + sbom.json + pricelist.json.',`Automat zaproponował ${prop} części zamiennych z kompletami. Czekają na przegląd człowieka.`],()=>{
    prod.hidden=false;prod.src='STEP: '+name;makeThumb(prod);refresh();
    impLog.insertAdjacentHTML('beforeend','<li class="done"><button class="btn sm primary" data-open="hop">Otwórz w sBoM Studio</button></li>')});
}
let pngN=0;
function importImage(src,name,auto){
  if(!HAS3||!ready){showToast('Import wymaga działającego podglądu 3D.');return}
  const img=new Image();
  img.onload=()=>{let w=img.naturalWidth,h=img.naturalHeight,el=img;const mx=1600;
    if(Math.max(w,h)>mx){const k=mx/Math.max(w,h),c=document.createElement('canvas');c.width=Math.round(w*k);c.height=Math.round(h*k);c.getContext('2d').drawImage(img,0,0,c.width,c.height);el=c;w=c.width;h=c.height}
    const id='png'+(++pngN),base=name.replace(/\.[a-z0-9]+$/i,'');
    const prod={id,name:auto?'Wózek paletowy PT 2500 (z rysunku)':base,code:'PNG-'+String(pngN).padStart(3,'0'),pr:auto?'pal':'own',flat:true,src:'PNG: '+name,imgEl:el,thumb:src,aspect:w/h,parts:auto||[],pub:null,dirty:0};
    PRODUCTS.push(prod);P[id]=prod;
    logSteps([`Wczytano obraz <b>${esc(name)}</b> (${w}×${h} px).`,'Zapis: każdy obszar części to płaska siatka z teksturą w model.glb.',auto?`Automat wskazał ${auto.filter(x=>x.s==='p').length} obszarów części. Czekają na przegląd człowieka.`:'Ten prototyp nie rozpoznaje części na własnych obrazach. Zaznacz obszary ręcznie w sBoM Studio.'],()=>{
      refresh();impLog.insertAdjacentHTML('beforeend',`<li class="done"><button class="btn sm primary" data-open="${id}">Otwórz w sBoM Studio</button></li>`)});
  };
  img.onerror=()=>showToast('Nie udało się wczytać obrazu. Wybierz plik PNG lub JPG.');
  img.src=src;
}
const kb=n=>n>1048576?(n/1048576).toFixed(1).replace('.',',')+' MB':Math.max(1,Math.round(n/1024))+' kB';
$('#bStep').onclick=()=>$('#fStep').click();$('#bPng').onclick=()=>$('#fPng').click();
$('#fStep').addEventListener('change',e=>{const f=e.target.files[0];if(f)importStep(f.name,kb(f.size));e.target.value=''});
$('#fPng').addEventListener('change',e=>{const f=e.target.files[0];if(!f)return;if(!/^image\/(png|jpeg)$/.test(f.type)){showToast('Wybierz plik PNG lub JPG.');return}
  const rd=new FileReader();rd.onload=()=>importImage(rd.result,f.name,null);rd.readAsDataURL(f);e.target.value=''});
$('#demoStep').onclick=()=>importStep('bujak-sprezynowy.step','');
$('#demoPng').onclick=()=>{
  if(!HAS3||!ready){showToast('Import wymaga działającego podglądu 3D.');return}
  const ex=PRODUCTS.find(p=>p.flat&&p.pr==='pal');if(ex){showToast('Przykładowy rysunek jest już w repozytorium.','Otwórz',()=>openStudio(ex.id));return}
  const {src,regions}=shot(P.pal,1200,800,1,0xF3F1EA);
  const parts=snap(P.pal.parts).map((x,i)=>{delete x.ex;return{...x,region:regions[x.id],s:x.id==='frame'?'n':'p',c:x.id==='frame'?.9:[.93,.88,.74,.9,.9,.85,.85,.69,.61][i]||.8,w:x.id==='frame'?'Największy obszar: element nośny, nie część zamienna.':'Segmentacja obrazu: wykryto odrębny element.'}}).filter(x=>x.region);
  importImage(src,'wozek-paletowy-rozstrzelony.png',parts);
};

/* ---------- UI: request for quotation ---------- */
const NOTICE=`<div class="notice"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="10" cy="10" r="7.5"/><path d="M10 9v5M10 6.2v.1"/></svg><div><b>Ceny są poglądowe i nie stanowią oferty handlowej.</b><span class="more"> Po wysłaniu zapytania biuro obsługi klienta producenta potwierdzi dostępność i ceny oraz prześle ostateczną ofertę.</span></div></div>`;
function renderOrder(L){
  const el=$('#orderBody');
  if(!L.parts.length){el.innerHTML=`<div class="empty"><b>Zapytanie jest puste</b><span>Zaznacz uszkodzone części na modelu. Każda doda swój komplet serwisowy.</span><button class="btn sm" data-go="configurator">Przejdź do modelu</button></div>`;return}
  const prs=[...new Set(L.parts.map(x=>x.prod.pr))];let rows='';
  if(S.orderView==='parts'){let cp='',cur='';
    for(const x of L.parts){
      if(x.prod.pr!==cp){cp=x.prod.pr;cur='';const pr=PRODUCERS[cp];rows+=`<tr class="prhead"><td colspan="5">${esc(pr.name)} <small>· zapytanie trafi na ${esc(pr.bok)}</small></td></tr>`}
      if(x.prod.id!==cur){cur=x.prod.id;rows+=`<tr class="prodhead"><td colspan="5">${esc(x.prod.name)} <span class="mono">${esc(x.prod.code)}</span> · sBoM v${x.prod.pub.v}</td></tr>`}
      rows+=`<tr class="part"><td><span class="src p">część</span></td><td><b>${esc(x.part.name)}</b></td><td class="mono">${esc(x.part.idx)}</td><td class="r num">${x.qty}</td><td class="r num">${zl(x.part.price*x.qty)}</td></tr>`;
      rows+=x.kit.filter(k=>k.on).map(k=>`<tr class="kitrow"><td><span class="src k">kit</span></td><td>${esc(k.name)}</td><td class="mono">${esc(k.code)}</td><td class="r num">${k.qty}</td><td class="r num">${zl(k.price*k.qty)}</td></tr>`).join('')}
    rows=`<thead><tr><th>Typ</th><th>Pozycja</th><th>Indeks</th><th class="r">Ilość</th><th class="r">Wartość poglądowa</th></tr></thead><tbody>${rows}</tbody>`;
  }else{let cp='';
    rows=`<thead><tr><th>Indeks</th><th>Nazwa</th><th>Dotyczy</th><th class="r">Ilość</th><th class="r">Cena pogl.</th><th class="r">Wartość pogl.</th></tr></thead><tbody>${L.agg.map(e=>{let h='';if(e.pr!==cp){cp=e.pr;h=`<tr class="prhead"><td colspan="6">${esc(PRODUCERS[cp].name)}</td></tr>`}
      return h+`<tr class="${e.src==='p'?'part':'kitrow'}"><td class="mono">${esc(e.code)}</td><td>${esc(e.name)}</td><td class="muted" style="font-size:.8rem">${esc([...e.for].join(', '))}</td><td class="r num">${e.qty}</td><td class="r num">${zl(e.price)}</td><td class="r num">${zl(e.price*e.qty)}</td></tr>`}).join('')}</tbody>`;
  }
  el.innerHTML=`<div class="tablewrap ordscroll"><table class="ord ${S.orderView==='parts'?'parts':'agg'}">${rows}</table></div>
   <div class="ordfoot"><div class="totals num">${prs.length>1?prs.map(p=>`<div><span>${esc(PRODUCERS[p].name)}</span><span>${zl(L.agg.filter(e=>e.pr===p).reduce((s,e)=>s+e.price*e.qty,0))}</span></div>`).join(''):''}
   <div class="grand"><span>Szacunkowo netto</span><span>${zl(L.net)}</span></div><div class="muted" style="font-size:.8rem"><span>${L.agg.length} indeksów · ${prs.length} ${prs.length===1?'zapytanie':'zapytania'} · bez VAT i dostawy</span></div></div>${NOTICE}</div>`;
}
$('#vParts').onclick=()=>{S.orderView='parts';$('#vParts').setAttribute('aria-pressed',true);$('#vIdx').setAttribute('aria-pressed',false);refresh()};
$('#vIdx').onclick=()=>{S.orderView='idx';$('#vIdx').setAttribute('aria-pressed',true);$('#vParts').setAttribute('aria-pressed',false);refresh()};

/* ---------- UI: docs ---------- */
function renderDocs(L){
  const el=$('#docsList'),open=new Set($$('#docsList details[open]').map(d=>d.dataset.k));
  if(!L.parts.length){el.innerHTML=`<div class="card empty"><b>Instrukcje pojawią się po zaznaczeniu części</b><span>Dla każdej części dostaniesz listę narzędzi, momenty dokręcenia i kroki wymiany.</span></div>`;return}
  el.innerHTML=L.parts.map(x=>{const d=I[x.part.ins]||I.bolted;return `<details data-k="${x.k}" id="doc-${cssId(x.k)}" ${open.has(x.k)?'open':''}>
   <summary><span class="ic">${esc(x.part.idx.slice(-2))}</span><span><b>${esc(d.t)}: ${esc(x.part.name)}</b><small>${esc(x.prod.name)} · ${d.time} · ${d.crew}</small></span><svg class="chev" width="16" height="16" viewBox="0 0 16 16"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="2" fill="none"/></svg></summary>
   <div class="docbody"><ol>${d.steps.map(s=>`<li><span>${esc(s)}</span></li>`).join('')}</ol>
    <div class="spec"><div class="box"><h4>Narzędzia</h4><ul>${d.tools.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div>
     <div class="box"><h4>Momenty dokręcenia</h4>${esc(d.torque)}</div>
     ${x.kit.length?`<div class="box"><h4>Z kompletu sBoM</h4><ul>${x.kit.map(k=>`<li>${k.qty}× ${esc(k.name)}${k.on?'':' <em class="muted">('+(k.dup?'zaznaczona osobno':'pominięte')+')</em>'}</li>`).join('')}</ul></div>`:''}</div>
    <div class="warn"><b>Uwaga:</b> ${esc(d.warn)}</div></div></details>`}).join('');
}
function openDoc(k){go('docs');const d=document.getElementById('doc-'+cssId(k));if(d){d.open=true;d.scrollIntoView({block:'start'})}}
$('#docsToggle').onclick=()=>{const ds=$$('#docsList details');const all=ds.length&&ds.every(d=>d.open);ds.forEach(d=>d.open=!all);syncDocsBtn()};
$('#docsList').addEventListener('toggle',syncDocsBtn,true);
function syncDocsBtn(){const ds=$$('#docsList details');$('#docsToggle').textContent=ds.length&&ds.every(d=>d.open)?'Zwiń wszystkie':'Rozwiń wszystkie';$('#docsToggle').disabled=!ds.length}

/* ---------- viewer status bar: first-step hint ---------- */
const TAPICON='<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 10V4.5a1.5 1.5 0 0 1 3 0V9l3.6.9a2 2 0 0 1 1.5 2.2l-.5 3.4a2 2 0 0 1-2 1.7H9.8a2 2 0 0 1-1.6-.8L5 12.2a1.3 1.3 0 0 1 2-1.6z"/></svg>';
function renderBar(L){
  const bar=$('#selBar'),prod=P[S.prod],mine=L.parts.filter(x=>x.prod.id===prod.id);
  if(S.mode!=='client')bar.hidden=true;
  else if(!mine.length){bar.hidden=false;bar.className='selbar hintonly';bar.innerHTML=TAPICON+'<span>Kliknij lub dotknij części, aby dodać ją do zapytania</span>'}
  else{const order=[...S.sel.keys()],x=mine.find(m=>m.k===S.last)||mine.slice().sort((a,b)=>order.indexOf(a.k)-order.indexOf(b.k)).pop(),act=x.kit.filter(k=>k.on),sum=act.reduce((s,k)=>s+k.price*k.qty,0);
    bar.hidden=false;bar.className='selbar';bar.dataset.k=x.k;
    bar.innerHTML=`<div class="sb-main"><span class="sb-dot"></span><div class="sb-txt"><b>${esc(x.part.name)}</b><small><span class="mono">${esc(x.part.idx)}</span> · ok. ${zl(x.part.price)} · ${act.length?`<span class="sb-kitn">+ ${act.length} poz. kompletu</span>`:'bez kompletu'}${mine.length>1?` · zaznaczone tu: ${mine.length}`:''}</small></div>
      <div class="sb-acts"><button class="btn sm" data-sb="undo">Cofnij</button>${x.kit.length?`<button class="btn sm" data-sb="kit" aria-expanded="${!!S.barOpen}">Komplet</button>`:''}</div></div>
      ${S.barOpen&&x.kit.length?`<ul class="sb-list">${x.kit.map(k=>`<li class="${k.on?'':'off'}"><span>${k.qty} × ${esc(k.name)}</span><span class="tagx ${k.req&&!k.dup?'req':'opt'}">${k.dup?'zaznaczona osobno':k.req?'wymagane':k.on?'zalecane':'pominięte'}</span></li>`).join('')}</ul>
      <div class="sb-foot"><span>Część z kompletem: ok. ${zl(x.part.price*x.qty+sum)}</span><button class="btn sm primary" data-go="order">Do zapytania →</button></div>`:''}`}
  viewer.classList.toggle('hasbar',!bar.hidden);viewer.classList.toggle('baropen',!bar.hidden&&!!bar.querySelector('.sb-list'));viewer.style.setProperty('--barh',(bar.hidden?0:bar.offsetHeight)+'px');
}
$('#selBar').addEventListener('click',e=>{const b=e.target.closest('[data-sb]');if(!b)return;const k=$('#selBar').dataset.k;
  if(b.dataset.sb==='undo'){S.sel.delete(k);S.openKits.delete(k);if(S.last===k)S.last=null;S.barOpen=false}
  else S.barOpen=!S.barOpen;
  refresh()});

/* ---------- refresh ---------- */
const LEG={client:'<span><i style="background:#FF4A1C"></i>zaznaczona</span><span><i style="background:#E8A317"></i>z kompletu</span><span class="lg-hover"><i style="background:#FFD24A"></i>pod kursorem</span>',
  studio:'<span><i style="background:#2E9B6B"></i>część zamienna</span><span><i style="background:#E8A317"></i>do przeglądu</span><span><i style="background:#A3ABA7"></i>wyłączona</span>'};
function refresh(){
  stale=false;
  for(const k of [...S.sel.keys()])if(!partOf(k).part){S.sel.delete(k);S.openKits.delete(k)}
  if(RFQS.length&&selSig()!==S.sentSig){RFQS=[];if(S.step.client==='done')S.step.client='order'}   // the confirmation belongs to the list that was sent
  const L=lines(),prod=P[S.prod];
  renderProducts();renderPartList();renderSelected(L);renderOrder(L);renderDocs(L);renderStudio();renderRepo();renderPrices();showScreen(L);renderBar(L);syncDocsBtn();paint();
  $('#cartCount').textContent=L.agg.length;$('#cartSum').textContent='ok. '+zl(L.net);
  const sc=$('#selCount');sc.textContent=S.sel.size;sc.classList.toggle('z',!S.sel.size);
  $('#legend').innerHTML=LEG[S.mode];
  $('#vTitle').innerHTML=`<b>${esc(prod.name)}</b>`;
  $('#vCode').textContent=S.mode==='studio'?`${prod.code} · wersja robocza`:`${prod.code} · sBoM v${prod.pub.v} · ceny poglądowe z ${dPL(PRICE.date)}`;
}

/* ---------- price list screen ---------- */
const TG={up:'<svg viewBox="0 0 22 14" aria-hidden="true"><path d="M2 12l6-5 4 3 8-8M15 2h5v5"/></svg>',
  flat:'<svg viewBox="0 0 22 14" aria-hidden="true"><path d="M2 7h18M16 3l4 4-4 4"/></svg>',
  down:'<svg viewBox="0 0 22 14" aria-hidden="true"><path d="M2 2l6 5 4-3 8 8M15 12h5V7"/></svg>'};
const TL={up:'wzrost',flat:'stała',down:'spadek'};
const pct=n=>(n>0?'+':'−')+Math.abs(n).toLocaleString('pl-PL',{minimumFractionDigits:1,maximumFractionDigits:1})+'%';
const trendTag=(dir,p,txt)=>`<span class="trend t-${dir}">${TG[dir]}<b>${txt||TL[dir]}</b>${dir!=='flat'&&p!=null?' '+pct(p):''}</span>`;
function spark(h){const W=190,H=46,v0=h[0].v,v1=Math.max(PRICE.v,v0+1),ps=h.map(e=>e.price),lo=Math.min(...ps),hi=Math.max(...ps);
  const x=v=>8+(v-v0)/(v1-v0)*(W-16),y=p=>hi===lo?H/2:H-9-(p-lo)/(hi-lo)*(H-18);
  let d=`M${x(h[0].v)} ${y(h[0].price)}`;for(let i=1;i<h.length;i++)d+=`H${x(h[i].v)}V${y(h[i].price)}`;d+=`H${x(v1)}`;
  return `<svg class="spark" viewBox="0 0 ${W} ${H}" role="img" aria-label="Wykres historii ceny"><path d="${d}"/>${h.map(e=>`<circle cx="${x(e.v)}" cy="${y(e.price)}" r="3"/>`).join('')}</svg>`}
function histHtml(idx){const h=PRICE.hist.get(idx)||[];
  return `<div class="phist">${h.length?spark(h):''}<ol>${h.slice().reverse().map((e,i,a)=>{const older=a[i+1],d=older?e.price-older.price:0,dir=!older||Math.abs(d)<.005?'flat':d>0?'up':'down';
    return `<li><b>cennik v${e.v}</b> · ${dPL(e.date)} · <span class="num">${zl(e.price)}</span> · ${esc(e.src)} ${older?trendTag(dir,older.price?d/older.price*100:0):'<span class="muted">pierwsza cena</span>'}</li>`}).join('')}</ol></div>`}
function renderPrices(){
  const rows=priceRows().map(r=>({...r,t:trendOf(r.idx)})),n={up:0,flat:0,down:0};rows.forEach(r=>n[r.t.dir]++);
  const prevV=PRICE.v-1;
  $('#plVer').textContent=`Cennik v${PRICE.v} · obowiązuje od ${dPL(PRICE.date)}`;
  $('#plMeta').textContent=`Indeksy: ${rows.length} · PLN netto · trend względem cennika v${prevV}${PRICE.dates[prevV]?' z '+dPL(PRICE.dates[prevV]):''}`;
  const tot=rows.length||1;
  $('#plTrend').innerHTML=['up','flat','down'].map(k=>`<button class="ttile t-${k}" data-pf="${k}" aria-pressed="${S.pf===k}"><span class="tg">${TG[k]}</span><b class="num">${n[k]}</b><span class="tl">${{up:'Wzrost',flat:'Stała',down:'Spadek'}[k]}</span><small>${Math.round(n[k]/tot*100)}%<span class="tw"> indeksów</span></small></button>`).join('')
    +`<div class="tbar" aria-hidden="true">${['up','flat','down'].map(k=>n[k]?`<i class="t-${k}" style="flex:${n[k]}"></i>`:'').join('')}</div>`;
  const q=S.pq.trim().toLowerCase(),list=rows.filter(r=>(S.pf==='all'||r.t.dir===S.pf)&&(!q||(r.idx+' '+r.name+' '+r.src).toLowerCase().includes(q)));
  $('#plCount').textContent=list.length===rows.length?`Wszystkie indeksy: ${rows.length}`:`Pokazano ${list.length} z ${rows.length}`;
  $('#plAll').hidden=S.pf==='all'&&!q;
  $('#plBody').innerHTML=list.length?list.map(r=>{const open=S.pOpen.has(r.idx);
    return `<tr><td class="mono">${esc(r.idx)}</td><td>${esc(r.name)}<br><small>${esc(r.src)}</small></td><td class="r num"><b>${zl(r.price)}</b></td><td>${r.t.fresh?trendTag('flat',null,'nowy indeks'):trendTag(r.t.dir,r.t.pct)}</td><td class="r num muted">${r.t.prev===null?'—':zl(r.t.prev)}</td><td class="r"><button class="link" data-ph="${esc(r.idx)}" aria-expanded="${open}">Historia</button></td></tr>${open?`<tr class="plh"><td colspan="6">${histHtml(r.idx)}</td></tr>`:''}`}).join('')
    :'<tr><td colspan="6"><div class="empty"><b>Brak indeksów</b><span>Zmień filtr trendu albo frazę wyszukiwania.</span></div></td></tr>';
  const box=$('#plImport'),im=S.imp;box.hidden=!im;$('#plMain').hidden=!!im;if(!im)return;
  if(im.err){box.innerHTML=`<div class="plimp"><div class="plimp-h"><b>Nie udało się odczytać pliku ${esc(im.name)}</b></div><p class="formerr" style="margin:0">${esc(im.err)}</p></div>`;return}
  const up=im.changes.filter(c=>c.dir==='up').length,dn=im.changes.length-up;
  box.innerHTML=`<div class="plimp"><div class="plimp-h"><b>Podgląd importu: ${esc(im.name)}</b><span class="muted">Nic nie zostało jeszcze zapisane.</span></div>
    <div class="btnrow tsum">${trendTag('up',null,up+' wzrost')}${trendTag('flat',null,im.same+' bez zmian')}${trendTag('down',null,dn+' spadek')}${im.issues.length?`<span class="pill p">${im.issues.length} do sprawdzenia</span>`:''}</div>
    ${im.issues.length?`<ul class="plissues">${im.issues.map(i=>`<li>Wiersz ${i.line} · <span class="mono">${esc(i.idx)}</span>: ${esc(i.why)}</li>`).join('')}</ul>`:''}
    ${im.changes.length?`<div class="tablewrap"><table class="pl"><thead><tr><th>Indeks</th><th>Nazwa</th><th class="r">Było</th><th class="r">Będzie</th><th>Zmiana</th></tr></thead><tbody>${im.changes.map(c=>`<tr><td class="mono">${esc(c.idx)}</td><td>${esc(c.name)}</td><td class="r num muted">${zl(c.old)}</td><td class="r num"><b>${zl(c.price)}</b></td><td>${trendTag(c.dir,c.pct)}</td></tr>`).join('')}</tbody></table></div>`:'<p class="muted" style="margin:0">Plik nie zmienia żadnej ceny.</p>'}</div>`;
}
function openImport(text,name){S.imp=parsePriceCsv(text,name);renderPrices();renderAct()}
function pricePublish(){const im=S.imp;if(!im||im.err||!im.changes.length)return;
  const up=im.changes.filter(c=>c.dir==='up').length,dn=im.changes.length-up;
  recordPrices(im.changes.map(c=>({idx:c.idx,price:c.price})),'import CSV: '+im.name);S.imp=null;S.pf='all';refresh();
  showToast(`Opublikowano cennik v${PRICE.v}: wzrost ${up}, spadek ${dn}. Klienci widzą nowe ceny.`,'Zobacz jako klient',()=>switchView('client'))}
async function saveCsv(filename,text){
  if(!HOSTED){saveFile(filename,new Blob([text],{type:'text/csv;charset=utf-8'}));return}
  const clip=async why=>{try{await navigator.clipboard.writeText(text);showToast(why+' Wzór CSV skopiowano do schowka.')}catch(_){showToast(why)}};
  if(!DL){clip('Zapis plików jest niedostępny w tym widoku.');return}
  try{await DL.save({filename,data:text});showToast('Zapisano plik '+filename+'.')}
  catch(e){const c=e&&e.code;if(c==='declined'){showToast('Zapis anulowany.');return}if(c==='rate_limited'){showToast('Poczekaj chwilę i spróbuj ponownie.');return}clip('Pliku CSV nie da się zapisać w tym widoku.')}
}
$('#bCsvTpl').onclick=()=>saveCsv('partpark-cennik-wzor.csv',csvTemplate());
$('#bCsv').onclick=()=>$('#fCsv').click();
$('#fCsv').onchange=e=>{const f=e.target.files[0];e.target.value='';if(!f)return;
  if(f.size>2e6){showToast('Plik jest za duży. Cennik CSV ma zwykle kilkaset wierszy.');return}
  const rd=new FileReader();rd.onload=()=>openImport(rd.result,f.name);rd.onerror=()=>showToast('Nie udało się wczytać pliku.');rd.readAsText(f)};
$('#demoCsv').onclick=()=>openImport(sampleCsv(),'cennik-przyklad.csv');
$('#plQ').addEventListener('input',e=>{S.pq=e.target.value;renderPrices()});
$('#prices').addEventListener('click',e=>{
  const t=e.target.closest('[data-pf]');if(t){S.pf=S.pf===t.dataset.pf?'all':t.dataset.pf;renderPrices();return}
  const h=e.target.closest('[data-ph]');if(h){const k=h.dataset.ph;S.pOpen.has(k)?S.pOpen.delete(k):S.pOpen.add(k);renderPrices();return}
  if(e.target.closest('#plAll')){S.pf='all';S.pq='';$('#plQ').value='';renderPrices();return}
});

/* ---------- screens, stepper, action bar ---------- */
const STEPS={client:[['products','Produkt'],['configurator','Części'],['order','Zapytanie'],['done','Potwierdzenie']],
  studio:[['studio','Repozytorium'],['configurator','Przegląd'],['publish','Publikacja'],['prices','Cennik']]};
const CHECK='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 5"/></svg>';
const BOOK='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 3h4A1.5 1.5 0 0 1 8 4.5V13a1.5 1.5 0 0 0-1.5-1.5h-4zM13.5 3h-4A1.5 1.5 0 0 0 8 4.5V13a1.5 1.5 0 0 1 1.5-1.5h4z"/></svg>';
const cur=()=>S.step[S.mode];
const selSig=()=>JSON.stringify([...S.sel].map(([k,v])=>[k,v.qty,[...v.off]]));
function pubState(prod){const a=prod.parts.filter(x=>x.s==='a'),q=prod.parts.filter(x=>x.s==='p').length,noIdx=a.filter(x=>!x.idx);
  const can=!!(a.length&&!noIdx.length&&(prod.dirty>0||!prod.pub));
  const hint=noIdx.length?'Uzupełnij indeks: '+noIdx[0].name:!a.length?'Zatwierdź co najmniej jedną część.':!can?'Brak zmian do publikacji. Klienci widzą aktualną wersję.':q?'Propozycje bez decyzji nie trafią do klientów.':'Klienci zobaczą zmiany po publikacji.';
  return{a,q,noIdx,can,hint,next:(prod.pub?prod.pub.v:0)+1}}
// sub-label, done flag and availability of every step
function stepState(L){const prod=P[S.prod];
  if(S.mode==='client'){const n=S.sel.size;
    return{products:{s:prod.name,done:true},
      configurator:{s:n?`zaznaczone: ${n} · indeksy: ${L.agg.length}`:'nic nie zaznaczono',done:n>0},
      order:{s:n?'ok. '+zl(L.net):'brak pozycji',done:RFQS.length>0},
      done:{s:RFQS.length?(RFQS.length>1?'zapytania: '+RFQS.length:RFQS[0].no):'po wysłaniu',done:RFQS.length>0,off:!RFQS.length}}}
  const ps=pubState(prod),pubd=!!prod.pub&&!prod.dirty;
  return{studio:{s:prod.name,done:true},
    configurator:{s:ps.q?`do przeglądu: ${ps.q}`:'wszystko przejrzane',done:!ps.q},
    publish:{s:pubd?`sBoM v${prod.pub.v} u klientów`:prod.pub?`zmiany robocze: ${prod.dirty}`:'szkic',done:pubd},
    prices:{s:`cennik v${PRICE.v}`,done:false}}}
function renderStepper(L){L=L||lines();const st=stepState(L),list=STEPS[S.mode],c=cur(),ci=list.findIndex(x=>x[0]===c);
  list.reduce((ok,[id])=>st[id].done=ok&&st[id].done,true);
  const now=ci>=0?`<b>Krok ${ci+1} z ${list.length} · ${list[ci][1]}</b> · ${esc(st[c].s)}`:`<b>Instrukcje wymiany</b> · ${esc(P[S.prod].name)}`;
  $('#stepper').innerHTML=`<ol class="stp">${list.map(([id,l],i)=>{const x=st[id],on=id===c,done=x.done&&!on;
    return `<li class="${i&&st[list[i-1][0]].done?'after-done':''}"><button class="st${done?' done':''}" data-go="${id}" ${on?'aria-current="step"':''} ${x.off?'disabled title="Dostępne po wysłaniu zapytania"':''} aria-label="Etap ${i+1} z ${list.length}: ${l}. ${esc(x.s)}${done?'. Gotowe':''}"><span class="st-n">${done?CHECK:i+1}</span><span class="st-t"><span class="st-l">${l}</span><span class="st-s">${esc(x.s)}</span></span></button></li>`}).join('')}</ol>
    ${S.mode==='client'?`<button class="st-aux" data-go="docs" aria-current="${c==='docs'}" aria-label="Instrukcje wymiany">${BOOK}<span class="lbl">Instrukcje</span>${S.sel.size?`<span class="count">${S.sel.size}</span>`:''}</button>`:''}
    <div class="st-now">${now}</div>`}
function renderAct(L){L=L||lines();const c=cur(),prod=P[S.prod],n=S.sel.size;let back=null,info='',next=null;
  if(S.mode==='client'){
    if(c==='products'){info=`<b>Wybierz produkt z katalogu</b><small>otwarty: ${esc(prod.name)}</small>`;next={l:'Dalej: części',go:'configurator'}}
    else if(c==='configurator'){back=['products','Produkt'];info=n?`<b>Zaznaczone: ${n} · indeksy: ${L.agg.length}</b><small>szacunkowo netto ok. ${zl(L.net)} · ceny poglądowe</small>`:`<b>Zaznacz uszkodzoną część</b><small>na modelu albo na liście części</small>`;
      next={l:'Dalej: zapytanie',go:'order',off:!n,t:'Najpierw zaznacz co najmniej jedną część'}}
    else if(c==='order'){back=['configurator','Części'];const prs=new Set(L.parts.map(x=>x.prod.pr)).size;
      info=n?`<b>Szacunkowo netto ok. ${zl(L.net)}</b><small>indeksy: ${L.agg.length} · zapytania: ${prs} · ceny poglądowe, to nie oferta</small>`:`<b>Zapytanie jest puste</b><small>wróć do części i zaznacz uszkodzony element</small>`;
      next={l:'Wyślij zapytanie ofertowe',act:'send',off:!n,t:'Zapytanie nie ma pozycji'}}
    else if(c==='done'){back=['order','Zapytanie'];info=`<b>${RFQS.length>1?'Przygotowano zapytania: '+RFQS.length:'Zapytanie '+(RFQS[0]?RFQS[0].no:'')}</b><small>ostateczną ofertę prześle biuro obsługi klienta</small>`;next={l:'Nowe zapytanie',act:'new',plain:true}}
    else{back=[S.docsBack||'configurator','Wróć'];info=`<b>Instrukcje wymiany</b><small>${n?'dla zaznaczonych części: '+n:'pojawią się po zaznaczeniu części'}</small>`}
  }else{const ps=pubState(prod);
    if(c==='studio'){info=`<b>Otwarty model: ${esc(prod.name)}</b><small>wybierz inny z repozytorium albo zaimportuj nowy</small>`;next={l:'Dalej: przegląd',go:'configurator'}}
    else if(c==='configurator'){back=['studio','Repozytorium'];info=`<b>${esc(prod.name)}</b><small>do przeglądu: ${ps.q} · zmiany robocze: ${prod.dirty}</small>`;next={l:'Dalej: publikacja',go:'publish'}}
    else if(c==='publish'){back=['configurator','Przegląd'];info=`<b>${esc(prod.name)}</b><small>${esc(ps.hint)}</small>`;
      next=S.pubDone===prod.id&&!prod.dirty?{l:'Zobacz jako klient',act:'asclient'}:{l:'Opublikuj sBoM v'+ps.next,act:'publish',off:!ps.can,t:ps.hint}}
    else if(S.imp){const im=S.imp,ok=!im.err&&im.changes.length>0,up=im.err?0:im.changes.filter(x=>x.dir==='up').length;back=['#cancel',im.err?'Zamknij':'Anuluj import'];
      info=im.err?`<b>Nie udało się odczytać pliku</b><small>${esc(im.name)}</small>`:`<b>Podgląd importu: ${esc(im.name)}</b><small>wzrost ${up} · spadek ${im.changes.length-up} · bez zmian ${im.same} · jeszcze nic nie zapisano</small>`;
      if(!im.err)next={l:'Opublikuj cennik v'+(PRICE.v+1),act:'pricepub',off:!ok,t:'Plik nie zmienia żadnej ceny'}}
    else{back=['publish','Publikacja'];info=`<b>Cennik v${PRICE.v} · obowiązuje od ${dPL(PRICE.date)}</b><small>masowa zmiana cen: pobierz wzór, popraw ceny, zaimportuj CSV</small>`}
  }
  $('#actbar').innerHTML=(back?`<button class="btn act-back" id="actBack" data-ab="${back[0]}" aria-label="Wstecz: ${back[1]}"><span aria-hidden="true">←</span><span class="lbl">${back[1]}</span></button>`:'')
    +`<div class="act-info">${info}</div>`
    +(next?`<button class="btn${next.plain?'':' primary'}" id="actNext" ${next.go?`data-go="${next.go}"`:`data-an="${next.act}"`} ${next.off?`disabled title="${esc(next.t||'')}"`:''}>${next.l}${next.go?' <span aria-hidden="true">→</span>':''}</button>`:'');
}
$('#actbar').addEventListener('click',e=>{
  const b=e.target.closest('[data-ab]');if(b){if(b.dataset.ab==='#cancel'){S.imp=null;renderPrices();renderAct()}else go(b.dataset.ab);return}
  const a=e.target.closest('[data-an]');if(!a||a.disabled)return;const prod=P[S.prod];
  switch(a.dataset.an){
    case 'send':$('#orderForm').requestSubmit();break;
    case 'new':S.sel.clear();S.openKits.clear();S.last=null;S.barOpen=false;RFQS=[];S.step.client='products';refresh();break;
    case 'publish':publish(prod);break;
    case 'asclient':setMode('client',true);S.step.client='configurator';S.pane.configurator='model';refresh();break;
    case 'pricepub':pricePublish();break;
  }});
// panes: on narrow windows a stage shows one pane at a time, switched by the sub-tabs
const PANES={configurator:()=>S.mode==='client'?[['model','Model'],['list','Lista części'],['sel','Zaznaczone '+S.sel.size]]:[['model','Model'],['list','Elementy '+P[S.prod].parts.length]],
  order:()=>[['items','Pozycje'],['form','Dane do zapytania']],
  studio:()=>[['repo','Repozytorium'],['import','Nowy model']]};
function applyPanes(){for(const scr of ['configurator','order','studio']){
  if(scr==='configurator'&&S.mode==='studio'&&S.pane[scr]==='sel')S.pane[scr]='list';
  const v=S.pane[scr],grp=v==='sel'?'list':v;
  $(`.subtabs[data-for="${scr}"]`).innerHTML=PANES[scr]().map(([k,l])=>`<button data-pane="${k}" aria-pressed="${k===v}">${l}</button>`).join('');
  $$(`#${scr} [data-p]`).forEach(el=>el.classList.toggle('pane-off',el.dataset.p!==grp))}}
function setPane(scr,v){S.pane[scr]=v;if(scr==='configurator'&&S.mode==='client'&&v!=='model')setTab(v);applyPanes()}
document.addEventListener('click',e=>{const b=e.target.closest('.subtabs [data-pane]');if(b)setPane(b.closest('.subtabs').dataset.for,b.dataset.pane)});
let pendingFit=false;
function showScreen(L){const c=cur();
  $$('.scr').forEach(el=>{el.hidden=el.id!==c});
  $('#configurator').setAttribute('aria-label',S.mode==='client'?'Etap 2: części na modelu serwisowym':'sBoM Studio, etap 2: przegląd modelu i sBoM');
  applyPanes();renderStepper(L);renderAct(L);
  if(c==='configurator'&&ready)requestAnimationFrame(()=>{resize();if(pendingFit&&viewer.clientWidth){pendingFit=false;fit(true)}});
}
function go(id){const m=S.mode;if(id==='top')id=STEPS[m][0][0];
  if(id==='done'&&!RFQS.length)return;
  const ok=m==='client'?['products','configurator','order','done','docs']:['studio','configurator','publish','prices'];if(!ok.includes(id))return;
  if(id==='docs'&&cur()!=='docs')S.docsBack=cur();
  S.step[m]=id;$('#toast').classList.remove('show');showScreen();const scr=document.getElementById(id);scr&&scr.focus({preventScroll:true})}
document.addEventListener('click',e=>{const b=e.target.closest('[data-go]');if(b&&!b.disabled){e.preventDefault();go(b.dataset.go)}});
function renderPublish(){const prod=P[S.prod],pr=PRODUCERS[prod.pr],ps=pubState(prod),ex=prod.parts.filter(x=>x.s==='n').length,done=S.pubDone===prod.id&&!prod.dirty;
  const ch=ps.a.filter(pt=>pt.idx).map(pt=>{const h=PRICE.hist.get(pt.idx),was=h&&h.length?h[h.length-1].price:null;return was===null?{pt,fresh:true}:Math.abs(was-pt.price)>.004?{pt,was}:null}).filter(Boolean);
  $('#pubBody').innerHTML=`<div><div class="eyebrow">Publikacja wersji sBoM</div><h3>${esc(prod.name)}</h3><small class="muted">${esc(pr.name)} · <span class="mono">${esc(prod.code)}</span> · ${prod.pub?`u klientów: sBoM v${prod.pub.v} z ${dPL(prod.pub.date)}`:'szkic, jeszcze nieopublikowany'}</small></div>
   ${done?`<div class="pubok" id="pubOk"><div class="okmark">${CHECK.replace('viewBox','width="22" height="22" viewBox')}</div><div><b>Opublikowano sBoM v${prod.pub.v}.</b> Klienci widzą nowe części i ceny poglądowe. Sprawdź wynik w perspektywie klienta albo wróć do repozytorium.</div></div>`:''}
   <div class="pubgrid"><div class="pubtile a"><b class="num">${ps.a.length}</b><span>Części zamienne</span><small>trafią do klientów</small></div><div class="pubtile p"><b class="num">${ps.q}</b><span>Do przeglądu</span><small>nie trafią do klientów</small></div><div class="pubtile"><b class="num">${ex}</b><span>Wyłączone</span><small>widoczne, niewybieralne</small></div></div>
   ${ps.noIdx.length?`<div class="pubblock"><b>Publikacja jest zablokowana.</b> Zatwierdzone części bez indeksu: ${ps.noIdx.map(x=>esc(x.name)).join(', ')}. <button class="link" data-go="configurator">Wróć do przeglądu</button></div>`:''}
   <div><div class="eyebrow" style="margin-bottom:6px">Zmiany cen w tej publikacji</div>${ch.length?`<ul class="publist">${ch.map(c=>`<li><span class="mono">${esc(c.pt.idx)}</span><span>${esc(c.pt.name)}</span>${c.fresh?`<b class="num">${zl(c.pt.price)}</b>${trendTag('flat',null,'nowy indeks')}`:`<span class="num muted">${zl(c.was)}</span><span aria-hidden="true">→</span><b class="num">${zl(c.pt.price)}</b>${trendTag(c.pt.price>c.was?'up':'down',c.was?(c.pt.price-c.was)/c.was*100:0)}`}</li>`).join('')}</ul>`:'<p class="muted" style="margin:0;font-size:.86rem">Bez zmian cen.</p>'}</div>
   <p class="muted" style="margin:0;font-size:.86rem">Publikację zatwierdza właściciel produktu. Klienci zobaczą wersję od razu, a zmiany cen trafią do historii cennika.</p>
   ${done?`<div class="btnrow"><button class="btn sm" data-go="studio">Wróć do repozytorium</button><button class="btn sm" data-go="prices">Przejdź do cennika</button></div>`:''}`}

/* ---------- toast ---------- */
let tt;function showToast(msg,label,act){$('#toastMsg').textContent=msg;const b=$('#toastBtn');b.hidden=!act;b.textContent=label||'Pokaż';b.onclick=()=>{act&&act();$('#toast').classList.remove('show')};$('#toast').classList.add('show');clearTimeout(tt);tt=setTimeout(()=>$('#toast').classList.remove('show'),4600)}

/* ---------- RFQ documents: XML, PDF, ZIP ---------- */
const fv=id=>$(id).value.trim();
function formData(){return{company:fv('#fCompany'),nip:fv('#fNip'),person:fv('#fPerson'),phone:fv('#fPhone'),email:fv('#fEmail'),site:fv('#fSite'),serial:fv('#fSerial'),urgent:$('input[name=mode]:checked').value==='exp',install:$('#fTech').checked,notes:fv('#fNotes')}}
function buildRfqs(){
  const L=lines(),now=new Date(),stamp=`${now.getFullYear()}${pad2(now.getMonth()+1)}${pad2(now.getDate())}`,rnd=Math.floor(1000+Math.random()*9000),form=formData(),out=[];
  for(const prId of [...new Set(L.parts.map(x=>x.prod.pr))]){const ls=[];let n=0,total=0;
    for(const x of L.parts.filter(x=>x.prod.pr===prId)){const pn=++n;
      ls.push({n:pn,type:'part',code:x.part.idx,name:x.part.name,qty:x.qty,price:x.part.price,prod:x.prod,node:x.part.id});total+=x.part.price*x.qty;
      for(const k of x.kit.filter(k=>k.on)){ls.push({n:++n,type:'kit',parent:pn,code:k.code,name:k.name,qty:k.qty,price:k.price,req:k.req,prod:x.prod,node:k.node||null});total+=k.price*k.qty}}
    out.push({no:`RFQ-${stamp}-${rnd}-${out.length+1}`,date:now,pr:PRODUCERS[prId],lines:ls,total,form})}
  return out;
}
const money=n=>(+n).toFixed(2),pz=n=>zl(n).replace(/[\u00a0\u202f]/g,' ');
function tz(d){const o=-d.getTimezoneOffset(),s=o>=0?'+':'-',a=Math.abs(o);return `${isoDay(d)}T${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}${s}${pad2(a/60|0)}:${pad2(a%60)}`}
function rfqXml(r){const f=r.form,x=esc;
  return `<?xml version="1.0" encoding="UTF-8"?>
<RequestForQuotation xmlns="urn:partpark:rfq:1.0" version="1.0">
  <Header>
    <RfqNumber>${x(r.no)}</RfqNumber>
    <IssueDateTime>${tz(r.date)}</IssueDateTime>
    <Language>pl</Language>
    <Currency>PLN</Currency>
    <PriceBasis>indicative</PriceBasis>
    <Disclaimer>Ceny poglądowe. Nie stanowią oferty handlowej. Ostateczną ofertę przesyła biuro obsługi klienta.</Disclaimer>
  </Header>
  <Supplier>
    <Name>${x(r.pr.name)}</Name>
    <CustomerServiceEmail>${x(r.pr.bok)}</CustomerServiceEmail>
  </Supplier>
  <Buyer>
    <Company>${x(f.company)}</Company>
    <TaxId>${x(f.nip)}</TaxId>
    <Contact><Name>${x(f.person)}</Name><Email>${x(f.email)}</Email><Phone>${x(f.phone)}</Phone></Contact>
    <DeliveryAddress>${x(f.site)}</DeliveryAddress>
  </Buyer>
  <Request>
    <Urgency>${f.urgent?'urgent':'standard'}</Urgency>
    <InstallationQuoteRequested>${f.install}</InstallationQuoteRequested>
    <ProductSerialNumber>${x(f.serial)}</ProductSerialNumber>
    <Notes>${x(f.notes)}</Notes>
  </Request>
  <Lines>
${r.lines.map(l=>`    <Line number="${l.n}" type="${l.type}"${l.parent?` parentLine="${l.parent}" required="${!!l.req}"`:''}>
      <ItemCode>${x(l.code)}</ItemCode>
      <Name>${x(l.name)}</Name>
      <Quantity unit="szt">${l.qty}</Quantity>
      <IndicativeUnitNetPrice>${money(l.price)}</IndicativeUnitNetPrice>
      <IndicativeNetAmount>${money(l.price*l.qty)}</IndicativeNetAmount>
      <Product code="${x(l.prod.code)}" name="${x(l.prod.name)}" sbomVersion="${l.prod.pub.v}"${l.node?` nodeId="${x(l.node)}"`:''}/>
    </Line>`).join('\n')}
  </Lines>
  <Totals>
    <LineCount>${r.lines.length}</LineCount>
    <IndicativeNetTotal>${money(r.total)}</IndicativeNetTotal>
  </Totals>
</RequestForQuotation>
`}
const DIS='Ceny są poglądowe i nie stanowią oferty handlowej. Wymagają potwierdzenia przez biuro obsługi klienta, które prześle ostateczną ofertę.';
function rfqSheet(r){const f=r.form;
  return `<div class="sheet"><div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:baseline"><h4>Zapytanie ofertowe</h4><span class="mono">${esc(r.no)}</span></div>
  <div>Data: ${dPL(r.date)} · Pilność: ${f.urgent?'pilne, produkt wyłączony z użytku':'standard'}${f.install?' · z wyceną wymiany przez serwis':''}</div>
  <div class="cols"><div><b>Zamawiający</b><br>${esc(f.company)}<br>NIP ${esc(f.nip)}<br>${esc(f.person)}<br>${esc(f.email)} · ${esc(f.phone)}<br>Dostawa: ${esc(f.site)}${f.serial?'<br>Nr seryjny: '+esc(f.serial):''}</div><div><b>Adresat</b><br>${esc(r.pr.name)}<br>Biuro obsługi klienta<br>${esc(r.pr.bok)}</div></div>
  <div class="tw"><table><thead><tr><th>Lp.</th><th>Indeks</th><th>Nazwa</th><th class="r">Ilość</th><th class="r">Cena pogl. netto</th><th class="r">Wartość pogl.</th></tr></thead><tbody>
  ${r.lines.map(l=>`<tr><td>${l.n}</td><td class="mono">${esc(l.code)}</td><td class="${l.type==='kit'?'k':''}">${l.type==='kit'?'':'<b>'}${esc(l.name)}${l.type==='kit'?' <span>(komplet do poz. '+l.parent+')</span>':'</b><br>'+esc(l.prod.name)+' · sBoM v'+l.prod.pub.v}</td><td class="r num">${l.qty}</td><td class="r num">${zl(l.price)}</td><td class="r num">${zl(l.price*l.qty)}</td></tr>`).join('')}
  </tbody></table></div>
  <div style="text-align:right;margin-top:8px"><b>Szacunkowa wartość netto: ${zl(r.total)}</b></div>
  ${f.notes?`<div style="margin-top:8px"><b>Uwagi:</b> ${esc(f.notes)}</div>`:''}
  <div class="dis">${DIS}</div></div>`}
function rfqPdf(r){
  const {jsPDF}=window.jspdf,d=new jsPDF({unit:'mm',format:'a4'}),f=r.form,L=15,R=195;
  d.addFileToVFS('dv.ttf',FONT_R);d.addFont('dv.ttf','dv','normal');d.addFileToVFS('dvb.ttf',FONT_B);d.addFont('dvb.ttf','dv','bold');
  const B=()=>d.setFont('dv','bold'),N=()=>d.setFont('dv','normal');let y=20;
  B();d.setFontSize(17);d.text('Zapytanie ofertowe',L,y);N();d.setFontSize(10);d.text(r.no,R,y,{align:'right'});y+=7;
  d.setFontSize(8.5);d.setTextColor(90);d.text(`Data: ${dPL(r.date)}  ·  Pilność: ${f.urgent?'pilne, produkt wyłączony z użytku':'standard'}${f.install?'  ·  z wyceną wymiany przez serwis':''}`,L,y);d.setTextColor(0);y+=9;
  const block=(x,title,rows)=>{let yy=y;B();d.setFontSize(9);d.text(title,x,yy);N();yy+=5;rows.filter(Boolean).forEach(t=>{const ls=d.splitTextToSize(String(t),82);d.text(ls,x,yy);yy+=ls.length*4.3});return yy};
  const y1=block(L,'Zamawiający',[f.company,'NIP '+f.nip,f.person,f.email+' · '+f.phone,'Dostawa: '+f.site,f.serial&&'Nr seryjny: '+f.serial]);
  const y2=block(110,'Adresat',[r.pr.name,'Biuro obsługi klienta',r.pr.bok]);y=Math.max(y1,y2)+6;
  const head=()=>{d.setFillColor(236,239,234);d.rect(L,y-4.5,R-L,6.5,'F');B();d.setFontSize(7.5);d.text('Lp.',L+1.5,y);d.text('Indeks',L+10,y);d.text('Nazwa',L+48,y);d.text('Ilość',141,y,{align:'right'});d.text('Cena pogl. netto',170,y,{align:'right'});d.text('Wartość pogl.',R-1.5,y,{align:'right'});N();y+=6.5};
  head();d.setFontSize(8);
  for(const l of r.lines){const kit=l.type==='kit',nm=d.splitTextToSize(kit?l.name+' (komplet do poz. '+l.parent+')':l.name,kit?66:70),sub=kit?[]:d.splitTextToSize(l.prod.name+' · sBoM v'+l.prod.pub.v,70),h=(nm.length+sub.length)*3.9+2.6;
    if(y+h>278){d.addPage();y=20;head();d.setFontSize(8)}
    d.setTextColor(kit?95:0);d.text(String(l.n),L+1.5,y);d.text(l.code,L+10,y);kit?N():B();d.text(nm,L+48+(kit?3:0),y);N();
    if(sub.length){d.setTextColor(95);d.text(sub,L+48,y+nm.length*3.9)}
    d.setTextColor(kit?95:0);d.text(String(l.qty),141,y,{align:'right'});d.text(pz(l.price),170,y,{align:'right'});d.text(pz(l.price*l.qty),R-1.5,y,{align:'right'});
    y+=h;d.setDrawColor(215);d.line(L,y-3.2,R,y-3.2)}
  d.setTextColor(0);if(y>262){d.addPage();y=20}
  y+=3;B();d.setFontSize(10.5);d.text('Szacunkowa wartość netto: '+pz(r.total),R-1.5,y,{align:'right'});N();y+=8;d.setFontSize(8.5);
  if(f.notes){const ls=d.splitTextToSize('Uwagi: '+f.notes,R-L);d.text(ls,L,y);y+=ls.length*4.2+3}
  d.setTextColor(95);d.text(d.splitTextToSize(DIS,R-L),L,y);
  d.setFontSize(7.5);d.text('Wygenerowano w PartPark. Załącznik XML zawiera te same dane w formacie do importu.',L,289);
  return d.output('blob');
}
let DL=null,RFQS=[],rIdx=0,rView='pdf';
const canPdf=()=>typeof window.jspdf!=='undefined',canZip=()=>typeof window.JSZip!=='undefined';
const HOSTED=!!(window.claude&&typeof window.claude.use==='function');   // false when the file is opened on its own
function syncDl(){const ok=DL||!HOSTED;$('#mPdf').hidden=!(ok&&canPdf());$('#mZip').hidden=!(ok&&canPdf()&&canZip())}
try{if(window.claude&&typeof window.claude.use==='function')window.claude.use('downloads').then(d=>{DL=d||null;syncDl()}).catch(()=>{})}catch(e){}
async function saveFile(filename,data){
  if(!HOSTED){const a=document.createElement('a');a.href=URL.createObjectURL(data instanceof Blob?data:new Blob([data]));a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),5000);showToast('Pobrano plik '+filename+'.');return}
  try{await DL.save({filename,data});showToast('Zapisano plik '+filename+'.')}
  catch(e){const c=e&&e.code;if(c==='declined'){showToast('Zapis anulowany.');return}if(c==='rate_limited'){showToast('Poczekaj chwilę i spróbuj ponownie.');return}
    DL=null;syncDl();showToast('Zapis plików jest niedostępny w tym widoku. Skopiuj XML.')}
}
function renderModal(){
  const r=RFQS[rIdx];if(!r)return;
  $('#mTabs').hidden=RFQS.length<2;$('#mTabs').innerHTML=RFQS.map((q,i)=>`<button data-ri="${i}" aria-pressed="${i===rIdx}">${esc(q.pr.name)}</button>`).join('');
  $('#mMeta').innerHTML=`Do: <b>${esc(r.pr.bok)}</b> · kopia: ${esc(r.form.email)} · załączniki: <span class="mono">${esc(r.no)}.xml</span>, <span class="mono">${esc(r.no)}.pdf</span>`;
  $('#mvPdf').setAttribute('aria-pressed',rView==='pdf');$('#mvXml').setAttribute('aria-pressed',rView==='xml');
  $('#mView').innerHTML=rView==='pdf'?rfqSheet(r):`<pre class="code" id="mXml">${esc(rfqXml(r))}</pre>`;
}
$('#mTabs').addEventListener('click',e=>{const b=e.target.closest('[data-ri]');if(b){rIdx=+b.dataset.ri;renderModal()}});
$('#mvPdf').onclick=()=>{rView='pdf';renderModal()};$('#mvXml').onclick=()=>{rView='xml';renderModal()};
$('#mPdf').onclick=()=>{const r=RFQS[rIdx];try{saveFile(r.no+'.pdf',rfqPdf(r))}catch(e){showToast('Nie udało się zbudować PDF.')}};
$('#mZip').onclick=async()=>{const r=RFQS[rIdx];try{const z=new JSZip();z.file(r.no+'.xml',rfqXml(r));z.file(r.no+'.pdf',rfqPdf(r));saveFile(r.no+'.zip',await z.generateAsync({type:'blob'}))}catch(e){showToast('Nie udało się zbudować paczki ZIP.')}};
async function copyText(txt,sel){try{await navigator.clipboard.writeText(txt);showToast('Skopiowano do schowka.')}catch(e){if(sel){const r=document.createRange();r.selectNodeContents(sel);getSelection().removeAllRanges();getSelection().addRange(r)}showToast('Schowek jest niedostępny. Zaznacz tekst i skopiuj ręcznie.')}}
$('#mCopy').onclick=()=>{rView='xml';renderModal();copyText(rfqXml(RFQS[rIdx]),$('#mXml'))};
$('#copyBtn').onclick=()=>{if(!S.sel.size){showToast('Najpierw zaznacz części na modelu.');return}const L=lines();let cp='',s='Lista indeksów (ceny poglądowe) – PartPark\n';
  L.agg.forEach(e=>{if(e.pr!==cp){cp=e.pr;s+='\n'+PRODUCERS[cp].name+'\n'}s+=`${e.code.padEnd(18)}${String(e.qty).padStart(4)}  ${e.name}\n`});s+=`\nSzacunkowo netto: ${zl(L.net)}\n`;copyText(s)};
$('#formMore').addEventListener('toggle',e=>{const d=e.target,f=$('#orderForm');if(d.open)requestAnimationFrame(()=>{f.scrollTop+=d.getBoundingClientRect().top-f.getBoundingClientRect().top-8})});
$('#orderForm').addEventListener('submit',e=>{e.preventDefault();const err=$('#formErr');
  if(!S.sel.size){err.textContent='Zapytanie nie ma pozycji. Zaznacz co najmniej jedną część na modelu.';err.hidden=false;return}
  if(!e.target.checkValidity()){err.textContent='Uzupełnij pola: firma, NIP (10 cyfr), osoba kontaktowa, telefon, e-mail i adres dostawy.';err.hidden=false;setPane('order','form');e.target.reportValidity();return}
  err.hidden=true;RFQS=buildRfqs();rIdx=0;rView='pdf';
  $('#mTitle').textContent=RFQS.length>1?`Przygotowano ${RFQS.length} zapytania ofertowe`:'Zapytanie ofertowe '+RFQS[0].no;
  $('#mText').textContent='Wersja demonstracyjna niczego nie wysyła. W działającym systemie każde zapytanie trafia e-mailem do biura obsługi klienta producenta z załącznikami XML i PDF, a Ty dostajesz kopię. Ostateczną ofertę przesyła biuro obsługi klienta.';
  S.sentSig=selSig();syncDl();renderModal();S.step.client='done';refresh()});

/* ---------- boot ---------- */
const glOK=HAS3&&THREE.OrbitControls&&initGL();
if(!HAS3)$('#loading').textContent='Nie udało się wczytać silnika 3D. Lista części obok działa normalnie.';
if(glOK)catalog().forEach(makeThumb);
// the request starts empty: the viewer hint names the first step
setMode('client',true);loadModel();setTab('list');refresh();
})();
