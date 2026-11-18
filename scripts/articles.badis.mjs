// « Badis de Zurich » : les bains de la ville sur le lac et la Limmat, 4 langues (allemand d'abord), programmé le 4 décembre 2026.
// Source : badi-info.ch, « Zürich – die Badi-Metropole » (prix 2026, saisons 2026, fréquentation), lue le 18 novembre 2026, et les données de l'app.
const LEGENDE = { fr: 'Illustration générée par IA', en: 'AI-generated illustration', de: 'KI-generierte Illustration', it: 'Illustrazione generata dall’IA' };
const BI = ['badi-info.ch, « Zürich – die Badi-Metropole »', 'https://www.badi-info.ch/zueri-badis.html'];
const UL = (...t) => `<ul class="liste">\n${t.map((x) => `  <li>${x}</li>`).join('\n')}\n</ul>`;
const BAINS = ['zurich-mythenquai', 'zurich-tiefenbrunnen', 'zurich-utoquai', 'zurich-seebad-enge', 'zurich-wollishofen'];
const NOMS = { 'zurich-mythenquai': 'Strandbad Mythenquai', 'zurich-tiefenbrunnen': 'Strandbad Tiefenbrunnen', 'zurich-utoquai': 'Seebad Utoquai', 'zurich-seebad-enge': 'Seebad Enge', 'zurich-wollishofen': 'Strandbad Wollishofen' };
const liste = UL(...BAINS.map((id) => `<a href="{plage:${id}}">${NOMS[id]}</a>`));

const T = {
  de: { titre: 'Badis in Zürich: alle Seebäder und Flussbäder, Preise 2026, Saison', h1: 'Badis in Zürich: Seebäder, Flussbäder, Preise und Saison',
    desc: 'Zürich zählt 6 Strand- und Seebäder, 5 Flussbäder und 6 Freibäder. Eintritt 2026: CHF 8 für Erwachsene. Saison, Frühschwimmen, Wasserqualität und die Wassertemperatur von heute.',
    bref: 'Die Stadt Zürich hat <strong>6 Strand- und Seebäder</strong>, <strong>5 Flussbäder</strong> und <strong>6 Freibäder mit Becken</strong>, dazu Hallenbäder und ein Thermalbad. Der Eintritt kostete 2026 <strong>CHF 8 für Erwachsene</strong>. Die Saison lief vom 9. Mai bis Mitte September, das Seebad Utoquai von Mitte April bis Ende Oktober.',
    corps: `
<h2>Die Seebäder, mit der Wassertemperatur von heute</h2>
<p>Die Strand- und Seebäder am See, die unsere App jeden Morgen mit der Wassertemperatur zeigt:</p>
${liste}
<p>Am meisten besucht sind laut badi-info.ch die Strandbäder Tiefenbrunnen und Mythenquai. 2026 zählten die städtischen Sommerbäder 3,13 Millionen Eintritte, ein Rekord.</p>
<h2>Preise 2026</h2>
${UL('Erwachsene ab 20 Jahren: CHF 8 (12er-Karte CHF 80).', 'Jugendliche ab 16 Jahren und IV: CHF 6.', 'Kinder ab 6 Jahren: CHF 4.', 'Sportabo Sommer: CHF 110 für Erwachsene, gültig in allen Frei- und Hallenbädern der Stadt.')}
<h2>Saison und Öffnungszeiten 2026</h2>
${UL('Die Freibäder öffneten am 9. Mai und blieben bis Mitte September offen.', 'Mythenquai und Tiefenbrunnen blieben bis zum 27. September offen.', 'Das Seebad Utoquai ist von Mitte April bis gegen Ende Oktober offen.', 'Frühschwimmen bei jedem Wetter, täglich ab 7 Uhr in der Hauptsaison: Seebad Utoquai, Freibad Letzigraben und Freibad Seebach.')}
<p>Im Winter bleibt das Mythenquai als Parkanlage offen. Die genauen Zeiten jedes Bades stehen auf der Website der Stadt.</p>
<h2>Wasser und Wasserqualität</h2>
<p>Der Zürichsee ist stellenweise über 140 Meter tief: Wind und Schiffsverkehr bringen kaltes Wasser aus der Tiefe nach oben, deshalb schwankt die Temperatur. Die Limmat ist im oberen Teil oft etwas kühler als der See. Die Wasserqualität im See und in der Limmat erreicht laut badi-info.ch jeweils den höchsten Standard.</p>
<h2>Anlässe</h2>
${UL('<a href="{blog:seeueberquerung-zurich}">Seeüberquerung</a>: 1500 m vom Mythenquai zum Tiefenbrunnen, 2027 am Mittwoch, 30. Juni geplant.', '<a href="{blog:limmatschwimmen-zurich}">Limmatschwimmen</a>: jeweils Mitte August.', 'Samichlaus-Schwimmen für Winterschwimmer: Sonntag, 6. Dezember 2026.')}
<p>Weiterlesen: <a href="{blog:plages-lac-zurich}">alle Badeplätze am Zürichsee</a> und <a href="{blog:saunas-lac-de-zurich}">Saunas am Zürichsee</a>.</p>` },
  fr: { titre: 'Badis de Zurich : les bains du lac et de la Limmat, prix 2026, saison', h1: 'Les badis de Zurich : bains du lac, bains de rivière, prix et saison',
    desc: 'Zurich compte 6 bains de lac, 5 bains de rivière et 6 piscines en plein air. Entrée 2026 : 8 francs pour un adulte. Saison, baignade matinale, qualité de l’eau et température du jour.',
    bref: 'La ville de Zurich a <strong>6 bains de lac</strong>, <strong>5 bains de rivière</strong> et <strong>6 piscines en plein air</strong>, plus des piscines couvertes et un bain thermal. L’entrée coûtait <strong>8 francs pour un adulte</strong> en 2026. La saison allait du 9 mai à la mi-septembre, et de la mi-avril à fin octobre au Seebad Utoquai.',
    corps: `
<h2>Les bains du lac, avec l’eau du jour</h2>
<p>Les bains du lac que l’app affiche chaque matin avec la température de l’eau :</p>
${liste}
<p>Les plus fréquentés sont, selon badi-info.ch, les bains de Tiefenbrunnen et de Mythenquai. En 2026, les bains d’été de la ville ont compté 3,13 millions d’entrées, un record.</p>
<h2>Prix 2026</h2>
${UL('Adultes dès 20 ans : 8 francs (carte de 12 entrées : 80 francs).', 'Jeunes dès 16 ans et AI : 6 francs.', 'Enfants dès 6 ans : 4 francs.', 'Abonnement d’été : 110 francs pour un adulte, valable dans toutes les piscines de la ville.')}
<h2>Saison et horaires 2026</h2>
${UL('Les bains en plein air ont ouvert le 9 mai, jusqu’à la mi-septembre.', 'Mythenquai et Tiefenbrunnen sont restés ouverts jusqu’au 27 septembre.', 'Le Seebad Utoquai est ouvert de la mi-avril à fin octobre.', 'Baignade matinale par tous les temps, dès 7 h en haute saison : Seebad Utoquai, piscines de Letzigraben et de Seebach.')}
<p>L’hiver, le Mythenquai reste ouvert comme parc. Les horaires précis de chaque bain sont sur le site de la Ville.</p>
<h2>L’eau et sa qualité</h2>
<p>Le lac de Zurich dépasse 140 mètres de profondeur par endroits : le vent et le trafic des bateaux font remonter l’eau froide du fond, d’où des écarts de température. La Limmat est souvent un peu plus fraîche que le lac dans sa partie haute. La qualité de l’eau du lac et de la Limmat atteint le meilleur niveau, selon badi-info.ch.</p>
<h2>Les rendez-vous</h2>
${UL('<a href="{blog:seeueberquerung-zurich}">Traversée du lac</a> : 1500 m de Mythenquai à Tiefenbrunnen, prévue le mercredi 30 juin 2027.', '<a href="{blog:limmatschwimmen-zurich}">Limmatschwimmen</a> : chaque année à la mi-août.', 'Samichlaus-Schwimmen, pour les nageurs d’hiver : dimanche 6 décembre 2026.')}
<p>À lire aussi : <a href="{blog:plages-lac-zurich}">toutes les plages du lac de Zurich</a> et <a href="{blog:saunas-lac-de-zurich}">les saunas du lac</a>.</p>` },
  en: { titre: 'Zurich badis: all the lake and river baths, 2026 prices, season', h1: 'Zurich’s badis: lake baths, river baths, prices and season',
    desc: 'Zurich has 6 lake baths, 5 river baths and 6 outdoor pools. 2026 entry: CHF 8 for adults. Season, early swimming, water quality and today’s water temperature.',
    bref: 'The city of Zurich has <strong>6 lake baths</strong>, <strong>5 river baths</strong> and <strong>6 outdoor pools</strong>, plus indoor pools and a thermal bath. Entry cost <strong>CHF 8 for adults</strong> in 2026. The season ran from 9 May to mid-September, and from mid-April to late October at Seebad Utoquai.',
    corps: `
<h2>The lake baths, with today’s water</h2>
<p>The lake baths the app shows every morning with the water temperature:</p>
${liste}
<p>The busiest, according to badi-info.ch, are Tiefenbrunnen and Mythenquai. In 2026 the city’s summer baths counted 3.13 million visits, a record.</p>
<h2>2026 prices</h2>
${UL('Adults 20 and over: CHF 8 (12-entry card CHF 80).', 'Young people 16 and over, and disability insurance: CHF 6.', 'Children 6 and over: CHF 4.', 'Summer sports pass: CHF 110 for adults, valid in all city pools.')}
<h2>Season and hours 2026</h2>
${UL('Outdoor baths opened on 9 May and stayed open until mid-September.', 'Mythenquai and Tiefenbrunnen stayed open until 27 September.', 'Seebad Utoquai is open from mid-April to late October.', 'Early swimming in any weather, daily from 7 am in high season: Seebad Utoquai, Letzigraben and Seebach.')}
<p>In winter, Mythenquai stays open as a park. Each bath’s exact hours are on the city’s website.</p>
<h2>The water and its quality</h2>
<p>Lake Zurich is over 140 metres deep in places: wind and boat traffic bring cold water up from the depths, so the temperature varies. The upper Limmat is often a little cooler than the lake. Water quality in the lake and the Limmat reaches the highest standard, according to badi-info.ch.</p>
<h2>Events</h2>
${UL('<a href="{blog:seeueberquerung-zurich}">Lake crossing</a>: 1,500 m from Mythenquai to Tiefenbrunnen, planned for Wednesday 30 June 2027.', '<a href="{blog:limmatschwimmen-zurich}">Limmatschwimmen</a>: every year in mid-August.', 'Samichlaus-Schwimmen for winter swimmers: Sunday 6 December 2026.')}
<p>Read on: <a href="{blog:plages-lac-zurich}">all Lake Zurich beaches</a> and <a href="{blog:saunas-lac-de-zurich}">lakeside saunas</a>.</p>` },
  it: { titre: 'Badi di Zurigo: tutti i bagni sul lago e sulla Limmat, prezzi 2026, stagione', h1: 'I badi di Zurigo: bagni sul lago, bagni sul fiume, prezzi e stagione',
    desc: 'Zurigo conta 6 bagni sul lago, 5 bagni sul fiume e 6 piscine all’aperto. Ingresso 2026: 8 franchi per un adulto. Stagione, nuoto mattutino, qualità dell’acqua e temperatura di oggi.',
    bref: 'La città di Zurigo ha <strong>6 bagni sul lago</strong>, <strong>5 bagni sul fiume</strong> e <strong>6 piscine all’aperto</strong>, oltre a piscine coperte e un bagno termale. L’ingresso costava <strong>8 franchi per un adulto</strong> nel 2026. La stagione andava dal 9 maggio a metà settembre, e da metà aprile a fine ottobre al Seebad Utoquai.',
    corps: `
<h2>I bagni sul lago, con l’acqua di oggi</h2>
<p>I bagni sul lago che l’app mostra ogni mattina con la temperatura dell’acqua:</p>
${liste}
<p>I più frequentati, secondo badi-info.ch, sono Tiefenbrunnen e Mythenquai. Nel 2026 i bagni estivi della città hanno contato 3,13 milioni di ingressi, un record.</p>
<h2>Prezzi 2026</h2>
${UL('Adulti dai 20 anni: 8 franchi (carta da 12 ingressi: 80 franchi).', 'Giovani dai 16 anni e AI: 6 franchi.', 'Bambini dai 6 anni: 4 franchi.', 'Abbonamento estivo: 110 franchi per un adulto, valido in tutte le piscine della città.')}
<h2>Stagione e orari 2026</h2>
${UL('I bagni all’aperto hanno aperto il 9 maggio, fino a metà settembre.', 'Mythenquai e Tiefenbrunnen sono rimasti aperti fino al 27 settembre.', 'Il Seebad Utoquai è aperto da metà aprile a fine ottobre.', 'Nuoto mattutino con ogni tempo, dalle 7 in alta stagione: Seebad Utoquai, piscine di Letzigraben e Seebach.')}
<p>D’inverno il Mythenquai resta aperto come parco. Gli orari precisi di ogni bagno sono sul sito della Città.</p>
<h2>L’acqua e la sua qualità</h2>
<p>Il lago di Zurigo supera i 140 metri di profondità in alcuni punti: vento e traffico dei battelli fanno risalire l’acqua fredda dal fondo, da qui gli sbalzi di temperatura. La Limmat è spesso un po’ più fresca del lago nella parte alta. La qualità dell’acqua del lago e della Limmat raggiunge il livello più alto, secondo badi-info.ch.</p>
<h2>Appuntamenti</h2>
${UL('<a href="{blog:seeueberquerung-zurich}">Traversata del lago</a>: 1500 m da Mythenquai a Tiefenbrunnen, prevista mercoledì 30 giugno 2027.', '<a href="{blog:limmatschwimmen-zurich}">Limmatschwimmen</a>: ogni anno a metà agosto.', 'Samichlaus-Schwimmen per i nuotatori invernali: domenica 6 dicembre 2026.')}
<p>Da leggere anche: <a href="{blog:plages-lac-zurich}">tutte le spiagge del lago di Zurigo</a> e <a href="{blog:saunas-lac-de-zurich}">le saune sul lago</a>.</p>` },
};

export const articleBadis = () => ({ slug: 'badis-zurich', lac: 'zurich', image: 'blog/img/ia/badis-zurich.jpg', hauteur: 893,
  alt: { de: 'Ein hölzernes Seebad am Zürichsee an einem Sommertag, Liegewiese und Badesteg', fr: 'Un bain de lac en bois sur le lac de Zurich un jour d’été, pelouse et ponton', en: 'A wooden lake bath on Lake Zurich on a summer day, lawn and bathing jetty', it: 'Un bagno sul lago in legno sul lago di Zurigo in un giorno d’estate, prato e pontile' },
  credit: {}, creditHtml: { ...LEGENDE }, sources: [BI],
  ...Object.fromEntries(Object.entries(T).map(([L, t]) => [L, { titre: t.titre, h1: t.h1, desc: t.desc, bref: t.bref, html: () => t.corps }])) });
