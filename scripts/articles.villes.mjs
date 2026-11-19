// Guides de baignade en ville dans la langue locale : Lucerne (allemand d'abord) et Lugano (italien d'abord), 4 langues.
// Sources lues le 19 novembre 2026 : badi-info.ch (fiches des bains, saison et prix 2026) ; Ville de Lugano pour Riva Caccia.
const LEGENDE = { fr: 'Illustration générée par IA', en: 'AI-generated illustration', de: 'KI-generierte Illustration', it: 'Illustrazione generata dall’IA' };
const UL = (...t) => `<ul class="liste">\n${t.map((x) => `  <li>${x}</li>`).join('\n')}\n</ul>`;
const BI = (p, t) => [`badi-info.ch, « ${t} »`, `https://www.badi-info.ch/${p}`];
const art = (slug, lac, alt, sources, T) => ({ slug, lac, image: `blog/img/ia/${slug}.jpg`, hauteur: 893, credit: {}, creditHtml: { ...LEGENDE }, sources,
  alt: Object.fromEntries(['fr', 'en', 'de', 'it'].map((l, i) => [l, alt[i]])),
  ...Object.fromEntries(Object.entries(T).map(([L, t]) => [L, { titre: t.titre, h1: t.h1, desc: t.desc, bref: t.bref, html: () => t.corps }])) });

const LIDO_LU = BI('lu/luzern-lido.html', 'Strandbad Lido Luzern'), UFS = BI('lu/strandbad-aufschuette.html', 'Strandbad Aufschütte «Ufschötti» Luzern'), TRI = BI('lu/strandbad-tribschen.html', 'Strandbad Tribschen Luzern');
const LIDO_LG = BI('ti/lugano-lido.html', 'Lido di Lugano'), RIVA = ['Città di Lugano, « Lido Riva Caccia »', 'https://lugano.ch/en/vivere-lugano/cultura-e-tempo-libero/lidi-e-piscine/lido-riva-caccia'];

export const articlesVilles = () => [
  art('baden-in-luzern', 'lucerne',
    ['Le Lido de Lucerne au bord du lac des Quatre-Cantons, plage de sable, plongeoir et le Pilatus', 'The Lido in Lucerne on Lake Lucerne, sandy beach, diving tower and Mount Pilatus', 'Das Lido Luzern am Vierwaldstättersee, Sandstrand, Sprungturm und Pilatus', 'Il Lido di Lucerna sul lago dei Quattro Cantoni, spiaggia di sabbia, trampolino e Pilatus'],
    [LIDO_LU, UFS, TRI], {
    de: { titre: 'Baden in Luzern: Lido, Ufschötti, Tribschen, Preise 2026', h1: 'Baden in Luzern: die Strandbäder am Vierwaldstättersee',
      desc: 'Baden in Luzern: Lido mit 300 m Sandstrand (CHF 8), Ufschötti gratis, Strandbad Tribschen (CHF 7). Saison 2026, Öffnungszeiten, Anreise und die Wassertemperatur von heute.',
      bref: 'In Luzern badet man vor allem an drei Orten: im <strong>Lido</strong> mit 300 m Sandstrand (CHF 8 werktags), auf der <strong>Ufschötti</strong> mit Sandstrand und <strong>gratis</strong>, und im <strong>Strandbad Tribschen</strong> (CHF 7). Die Saison 2026 lief vom 9. Mai bis zum 20. September.',
      corps: `
<h2>Lido Luzern</h2>
${UL('300 m Sandstrand und Liegewiese, Sprungturm im See (1,70 m, 4 m und 6,30 m), Flosse, beheiztes 25-m-Becken (etwa 24 °C).', 'Eintritt 2026: Erwachsene CHF 8 (Montag bis Freitag) und CHF 10 (Samstag und Sonntag), Kinder 6–15 Jahre CHF 5.', 'Geöffnet vom 9. Mai bis 20. September 2026; im Sommer bis 20 oder 21 Uhr.', 'Anreise: Bahn bis «Verkehrshaus», Bus 6 oder 8 bis «Verkehrshaus/Lido» oder Schiff ab Bahnhofquai. Startpunkt der <a href="{blog:seeueberquerung-luzern}">Seeüberquerung</a>.')}
<p>Wassertemperatur heute: <a href="{plage:lucerne-lido}">Lido</a>.</p>
<h2>Ufschötti</h2>
${UL('Park mit grossen Wiesen und knapp 200 m Sandstrand. <strong>Eintritt gratis.</strong>', 'Baden auf eigene Verantwortung; bei gehisster SLRG-Fahne ist ein Teil des Strandes bewacht.', 'Grillieren erlaubt auf den feuerfesten Platten; Kiosk und Beach Bar.', 'Offen von 8 bis 22 Uhr; von Anfang November bis Ostern geschlossen.')}
<p>Wassertemperatur heute: <a href="{plage:lucerne-ufschuetti}">Ufschötti</a>.</p>
<h2>Strandbad Tribschen</h2>
${UL('Sandstrand, Schwimmbahn im See, abgetrennter Nichtschwimmerbereich, Floss, Kinderplanschbecken.', 'Eintritt 2026: Erwachsene CHF 7, Kinder 6–15 Jahre CHF 5.', 'Geöffnet vom 9. Mai bis voraussichtlich 20. September 2026.', 'Bus 6, 7 oder 8 bis «Wartegg», oder Schiff bis «Tribschen». Ziel der Seeüberquerung.')}
<p>Wassertemperatur heute: <a href="{plage:lucerne-tribschen}">Tribschen</a>. Alle Badeplätze am See: <a href="{blog:plages-lac-lucerne}">Vierwaldstättersee</a>.</p>` },
    fr: { titre: 'Se baigner à Lucerne : Lido, Ufschötti, Tribschen, prix 2026', h1: 'Se baigner à Lucerne : les bains du lac des Quatre-Cantons',
      desc: 'Se baigner à Lucerne : le Lido et ses 300 m de sable (8 francs), l’Ufschötti gratuite, le Strandbad Tribschen (7 francs). Saison 2026, horaires, accès et eau du jour.',
      bref: 'À Lucerne, on se baigne surtout à trois endroits : au <strong>Lido</strong> et ses 300 m de sable (8 francs en semaine), sur l’<strong>Ufschötti</strong>, plage de sable <strong>gratuite</strong>, et au <strong>Strandbad Tribschen</strong> (7 francs). La saison 2026 allait du 9 mai au 20 septembre.',
      corps: `
<h2>Lido de Lucerne</h2>
${UL('300 m de plage de sable et une pelouse, plongeoir dans le lac (1,70 m, 4 m et 6,30 m), radeaux, bassin chauffé de 25 m (environ 24 °C).', 'Entrée 2026 : adultes 8 francs en semaine, 10 francs le week-end ; enfants de 6 à 15 ans 5 francs.', 'Ouvert du 9 mai au 20 septembre 2026, jusqu’à 20 h ou 21 h en été.', 'Accès : train jusqu’à « Verkehrshaus », bus 6 ou 8 jusqu’à « Verkehrshaus/Lido », ou bateau depuis le Bahnhofquai. Départ de la <a href="{blog:seeueberquerung-luzern}">traversée du lac</a>.')}
<p>L’eau du jour : <a href="{plage:lucerne-lido}">Lido</a>.</p>
<h2>Ufschötti</h2>
${UL('Un parc avec de grandes pelouses et près de 200 m de plage de sable. <strong>Entrée gratuite.</strong>', 'Baignade à ses risques ; quand le drapeau de la SSS est hissé, une partie de la plage est surveillée.', 'Grillades permises sur les dalles prévues ; kiosque et bar de plage.', 'Ouvert de 8 h à 22 h ; fermé de début novembre à Pâques.')}
<p>L’eau du jour : <a href="{plage:lucerne-ufschuetti}">Ufschötti</a>.</p>
<h2>Strandbad Tribschen</h2>
${UL('Plage de sable, ligne de nage dans le lac, zone séparée pour les non-nageurs, radeau, pataugeoire.', 'Entrée 2026 : adultes 7 francs, enfants de 6 à 15 ans 5 francs.', 'Ouvert du 9 mai au 20 septembre 2026 environ.', 'Bus 6, 7 ou 8 jusqu’à « Wartegg », ou bateau jusqu’à « Tribschen ». Arrivée de la traversée du lac.')}
<p>L’eau du jour : <a href="{plage:lucerne-tribschen}">Tribschen</a>. Toutes les plages du lac : <a href="{blog:plages-lac-lucerne}">lac des Quatre-Cantons</a>.</p>` },
    en: { titre: 'Swimming in Lucerne: Lido, Ufschötti, Tribschen, 2026 prices', h1: 'Swimming in Lucerne: the lake baths on Lake Lucerne',
      desc: 'Swimming in Lucerne: the Lido and its 300 m sandy beach (CHF 8), free Ufschötti, Strandbad Tribschen (CHF 7). 2026 season, hours, getting there and today’s water.',
      bref: 'In Lucerne, people mostly swim in three places: the <strong>Lido</strong> with its 300 m sandy beach (CHF 8 on weekdays), the <strong>Ufschötti</strong>, a <strong>free</strong> sandy beach, and <strong>Strandbad Tribschen</strong> (CHF 7). The 2026 season ran from 9 May to 20 September.',
      corps: `
<h2>Lido Luzern</h2>
${UL('300 m sandy beach and lawn, diving tower in the lake (1.70 m, 4 m and 6.30 m), rafts, heated 25 m pool (about 24 °C).', '2026 entry: adults CHF 8 on weekdays, CHF 10 at weekends; children 6–15 CHF 5.', 'Open 9 May to 20 September 2026, until 8 or 9 pm in summer.', 'Getting there: train to “Verkehrshaus”, bus 6 or 8 to “Verkehrshaus/Lido”, or boat from Bahnhofquai. Start of the <a href="{blog:seeueberquerung-luzern}">lake crossing</a>.')}
<p>Today’s water: <a href="{plage:lucerne-lido}">Lido</a>.</p>
<h2>Ufschötti</h2>
${UL('A park with big lawns and nearly 200 m of sandy beach. <strong>Free entry.</strong>', 'Swim at your own risk; when the lifesaving flag is up, part of the beach is supervised.', 'Barbecues allowed on the fireproof slabs; kiosk and beach bar.', 'Open 8 am to 10 pm; closed from early November to Easter.')}
<p>Today’s water: <a href="{plage:lucerne-ufschuetti}">Ufschötti</a>.</p>
<h2>Strandbad Tribschen</h2>
${UL('Sandy beach, swimming lane in the lake, separate non-swimmer area, raft, paddling pool.', '2026 entry: adults CHF 7, children 6–15 CHF 5.', 'Open 9 May to about 20 September 2026.', 'Bus 6, 7 or 8 to “Wartegg”, or boat to “Tribschen”. Finish of the lake crossing.')}
<p>Today’s water: <a href="{plage:lucerne-tribschen}">Tribschen</a>. All beaches on the lake: <a href="{blog:plages-lac-lucerne}">Lake Lucerne</a>.</p>` },
    it: { titre: 'Fare il bagno a Lucerna: Lido, Ufschötti, Tribschen, prezzi 2026', h1: 'Fare il bagno a Lucerna: i lidi del lago dei Quattro Cantoni',
      desc: 'Fare il bagno a Lucerna: il Lido con 300 m di sabbia (8 franchi), l’Ufschötti gratuita, lo Strandbad Tribschen (7 franchi). Stagione 2026, orari, accesso e acqua di oggi.',
      bref: 'A Lucerna si fa il bagno soprattutto in tre posti: al <strong>Lido</strong> con 300 m di sabbia (8 franchi nei giorni feriali), all’<strong>Ufschötti</strong>, spiaggia di sabbia <strong>gratuita</strong>, e allo <strong>Strandbad Tribschen</strong> (7 franchi). La stagione 2026 andava dal 9 maggio al 20 settembre.',
      corps: `
<h2>Lido di Lucerna</h2>
${UL('300 m di spiaggia di sabbia e prato, trampolino nel lago (1,70 m, 4 m e 6,30 m), zattere, vasca riscaldata di 25 m (circa 24 °C).', 'Ingresso 2026: adulti 8 franchi nei giorni feriali, 10 nel fine settimana; bambini 6–15 anni 5 franchi.', 'Aperto dal 9 maggio al 20 settembre 2026, fino alle 20 o 21 in estate.', 'Accesso: treno fino a «Verkehrshaus», bus 6 o 8 fino a «Verkehrshaus/Lido», o battello dal Bahnhofquai. Partenza della <a href="{blog:seeueberquerung-luzern}">traversata del lago</a>.')}
<p>L’acqua di oggi: <a href="{plage:lucerne-lido}">Lido</a>.</p>
<h2>Ufschötti</h2>
${UL('Un parco con grandi prati e quasi 200 m di spiaggia di sabbia. <strong>Ingresso gratuito.</strong>', 'Bagno a proprio rischio; con la bandiera del salvataggio issata, una parte della spiaggia è sorvegliata.', 'Grigliate permesse sulle piastre apposite; chiosco e bar sulla spiaggia.', 'Aperto dalle 8 alle 22; chiuso da inizio novembre a Pasqua.')}
<p>L’acqua di oggi: <a href="{plage:lucerne-ufschuetti}">Ufschötti</a>.</p>
<h2>Strandbad Tribschen</h2>
${UL('Spiaggia di sabbia, corsia di nuoto nel lago, zona separata per chi non nuota, zattera, piscina per bambini.', 'Ingresso 2026: adulti 7 franchi, bambini 6–15 anni 5 franchi.', 'Aperto dal 9 maggio al 20 settembre 2026 circa.', 'Bus 6, 7 o 8 fino a «Wartegg», o battello fino a «Tribschen». Arrivo della traversata del lago.')}
<p>L’acqua di oggi: <a href="{plage:lucerne-tribschen}">Tribschen</a>. Tutte le spiagge del lago: <a href="{blog:plages-lac-lucerne}">lago dei Quattro Cantoni</a>.</p>` } }),

  art('lidi-di-lugano', 'lugano',
    ['Le Lido di Lugano, son pavillon à arcades et ses bassins au bord du lac, le Monte Brè derrière', 'The Lido di Lugano, its arcaded pavilion and pools by the lake, Monte Brè behind', 'Das Lido di Lugano mit Arkadenpavillon und Becken am See, dahinter der Monte Brè', 'Il Lido di Lugano, il padiglione ad arcate e le vasche sul lago, dietro il Monte Brè'],
    [LIDO_LG, RIVA], {
    it: { titre: 'Lidi di Lugano: Lido di Lugano e Riva Caccia, prezzi 2026', h1: 'I lidi di Lugano: dove fare il bagno in città',
      desc: 'Fare il bagno a Lugano: Lido di Lugano con spiaggia di sabbia e vasca olimpionica (11 franchi), Lido Riva Caccia su piattaforme galleggianti (15 franchi). Stagione 2026 e acqua di oggi.',
      bref: 'In città, a Lugano si fa il bagno soprattutto al <strong>Lido di Lugano</strong>, con spiaggia di sabbia e vasca olimpionica (<strong>11 franchi</strong> per un adulto), e al <strong>Lido Riva Caccia</strong>, su piattaforme galleggianti nel golfo (<strong>15 franchi</strong>). Il Lido di Lugano era aperto dal 1° maggio al 20 settembre 2026.',
      corps: `
<h2>Lido di Lugano</h2>
${UL('Grande lido con spiaggia di sabbia sul lago, vasca olimpionica di 50 m riscaldata (circa 25 °C), vasca di 25 m, vasca tuffi con trampolini da 1, 3, 5 e 10 m.', 'Ingresso 2026: adulti 11 franchi; giovani 14–20 anni, studenti e AVS/AI 7 franchi; bambini 3–13 anni 3,50 franchi. Tariffe ridotte la mattina presto, a mezzogiorno e dopo le 16.', 'Aperto dal 1° maggio al 20 settembre 2026, fino alle 19.30 in estate.', 'Bus fino a «Lago» o «Palazzo Studi», a 100 metri; a piedi dalla stazione circa 20 minuti. Il padiglione ad arcate risale al 1928.')}
<p>L’acqua di oggi: <a href="{plage:lido-di-lugano}">Lido di Lugano</a>. È anche l’arrivo della <a href="{blog:traversata-lago-di-lugano}">Traversata del lago</a>.</p>
<h2>Lido Riva Caccia</h2>
${UL('A due passi dal centro, su piattaforme galleggianti sul golfo di Lugano.', 'Secondo la Città, aperto dal 25 maggio al 20 settembre 2026, ingresso adulti 15 franchi.')}
<p>L’acqua di oggi: <a href="{plage:lugano-riva-caccia}">Riva Caccia</a>. Tutte le spiagge del lago: <a href="{blog:plages-lac-lugano}">lago di Lugano</a>.</p>` },
    de: { titre: 'Baden in Lugano: Lido di Lugano und Riva Caccia, Preise 2026', h1: 'Baden in Lugano: die Lidi in der Stadt',
      desc: 'Baden in Lugano: Lido di Lugano mit Sandstrand und Olympiabecken (CHF 11), Lido Riva Caccia auf schwimmenden Plattformen (CHF 15). Saison 2026 und die Wassertemperatur von heute.',
      bref: 'In der Stadt Lugano badet man vor allem im <strong>Lido di Lugano</strong>, mit Sandstrand und Olympiabecken (<strong>CHF 11</strong> für Erwachsene), und im <strong>Lido Riva Caccia</strong> auf schwimmenden Plattformen im Golf (<strong>CHF 15</strong>). Das Lido di Lugano war vom 1. Mai bis 20. September 2026 offen.',
      corps: `
<h2>Lido di Lugano</h2>
${UL('Grosses Strandbad mit Sandstrand am See, beheiztes 50-m-Olympiabecken (etwa 25 °C), 25-m-Becken, Sprungbecken mit 1-, 3-, 5- und 10-m-Anlage.', 'Eintritt 2026: Erwachsene CHF 11; Jugendliche 14–20 Jahre, Studierende und AHV/IV CHF 7; Kinder 3–13 Jahre CHF 3.50. Günstigere Tarife früh morgens, mittags und nach 16 Uhr.', 'Offen vom 1. Mai bis 20. September 2026, im Sommer bis 19.30 Uhr.', 'Bus bis «Lago» oder «Palazzo Studi», 100 Meter entfernt; zu Fuss vom Bahnhof etwa 20 Minuten. Der Arkadenpavillon stammt von 1928.')}
<p>Wassertemperatur heute: <a href="{plage:lido-di-lugano}">Lido di Lugano</a>. Hier endet auch die <a href="{blog:traversata-lago-di-lugano}">Traversata</a>.</p>
<h2>Lido Riva Caccia</h2>
${UL('Wenige Schritte vom Zentrum, auf schwimmenden Plattformen im Golf von Lugano.', 'Laut der Stadt offen vom 25. Mai bis 20. September 2026, Eintritt für Erwachsene CHF 15.')}
<p>Wassertemperatur heute: <a href="{plage:lugano-riva-caccia}">Riva Caccia</a>. Alle Badeplätze am See: <a href="{blog:plages-lac-lugano}">Luganersee</a>.</p>` },
    fr: { titre: 'Se baigner à Lugano : Lido di Lugano et Riva Caccia, prix 2026', h1: 'Se baigner à Lugano : les lidos de la ville',
      desc: 'Se baigner à Lugano : le Lido di Lugano, plage de sable et bassin olympique (11 francs), le Lido Riva Caccia sur plateformes flottantes (15 francs). Saison 2026 et eau du jour.',
      bref: 'En ville, à Lugano, on se baigne surtout au <strong>Lido di Lugano</strong>, plage de sable et bassin olympique (<strong>11 francs</strong> pour un adulte), et au <strong>Lido Riva Caccia</strong>, sur des plateformes flottantes dans le golfe (<strong>15 francs</strong>). Le Lido di Lugano était ouvert du 1er mai au 20 septembre 2026.',
      corps: `
<h2>Lido di Lugano</h2>
${UL('Un grand lido avec plage de sable sur le lac, bassin olympique de 50 m chauffé (environ 25 °C), bassin de 25 m, fosse de plongeon avec tremplins de 1, 3, 5 et 10 m.', 'Entrée 2026 : adultes 11 francs ; jeunes de 14 à 20 ans, étudiants et AVS/AI 7 francs ; enfants de 3 à 13 ans 3,50 francs. Tarifs réduits tôt le matin, à midi et après 16 h.', 'Ouvert du 1er mai au 20 septembre 2026, jusqu’à 19 h 30 en été.', 'Bus jusqu’à « Lago » ou « Palazzo Studi », à 100 mètres ; environ 20 minutes à pied depuis la gare. Le pavillon à arcades date de 1928.')}
<p>L’eau du jour : <a href="{plage:lido-di-lugano}">Lido di Lugano</a>. C’est aussi l’arrivée de la <a href="{blog:traversata-lago-di-lugano}">traversée du lac</a>.</p>
<h2>Lido Riva Caccia</h2>
${UL('À deux pas du centre, sur des plateformes flottantes dans le golfe de Lugano.', 'Selon la Ville, ouvert du 25 mai au 20 septembre 2026, entrée adulte 15 francs.')}
<p>L’eau du jour : <a href="{plage:lugano-riva-caccia}">Riva Caccia</a>. Toutes les plages du lac : <a href="{blog:plages-lac-lugano}">lac de Lugano</a>.</p>` },
    en: { titre: 'Swimming in Lugano: Lido di Lugano and Riva Caccia, 2026 prices', h1: 'Swimming in Lugano: the city’s lidos',
      desc: 'Swimming in Lugano: the Lido di Lugano with sandy beach and Olympic pool (CHF 11), the Lido Riva Caccia on floating platforms (CHF 15). 2026 season and today’s water.',
      bref: 'In the city, Lugano’s main swimming spots are the <strong>Lido di Lugano</strong>, with a sandy beach and Olympic pool (<strong>CHF 11</strong> for adults), and the <strong>Lido Riva Caccia</strong>, on floating platforms in the gulf (<strong>CHF 15</strong>). The Lido di Lugano was open from 1 May to 20 September 2026.',
      corps: `
<h2>Lido di Lugano</h2>
${UL('A large lido with a sandy beach on the lake, heated 50 m Olympic pool (about 25 °C), 25 m pool, diving pool with 1, 3, 5 and 10 m boards.', '2026 entry: adults CHF 11; ages 14–20, students and pensioners CHF 7; children 3–13 CHF 3.50. Cheaper rates early morning, at lunchtime and after 4 pm.', 'Open 1 May to 20 September 2026, until 7.30 pm in summer.', 'Bus to “Lago” or “Palazzo Studi”, 100 metres away; about 20 minutes on foot from the station. The arcaded pavilion dates from 1928.')}
<p>Today’s water: <a href="{plage:lido-di-lugano}">Lido di Lugano</a>. It is also the finish of the <a href="{blog:traversata-lago-di-lugano}">lake crossing</a>.</p>
<h2>Lido Riva Caccia</h2>
${UL('A stone’s throw from the centre, on floating platforms in the Gulf of Lugano.', 'According to the City, open 25 May to 20 September 2026, adult entry CHF 15.')}
<p>Today’s water: <a href="{plage:lugano-riva-caccia}">Riva Caccia</a>. All beaches on the lake: <a href="{blog:plages-lac-lugano}">Lake Lugano</a>.</p>` } }),
];

const ZUG = BI('a/zug-strandbad.html', 'Strandbad Zug'), NAU = ['nau.ch, « Doppelt so viel Platz: neues Strandbad ist bereit für die Saison »', 'https://www.nau.ch/ort/zug/doppelt-so-viel-platz-neues-strandbad-ist-bereit-fur-die-saison-67125935'];
const ZZ = ['Zuger Zeitung, « Badis im Kanton Zug: Öffnungszeiten, Preise, Kinderfreundlichkeit »', 'https://www.zugerzeitung.ch/zentralschweiz/zug/badis-im-kanton-zug-oeffnungszeiten-preise-kinderfreundlichkeit-ld.4164965'];
const ROM = BI('tg/romanshorn.html', 'Seebad Romanshorn'), TZ = ['Thurgauer Zeitung, « Seebad Romanshorn: Erhöhung der Badi-Preise »', 'https://www.thurgauerzeitung.ch/ostschweiz/oberthurgau/seebad-romanshorn-erhoehung-der-badi-preise-ld.4140188'];
const ARB = ['Stadt Arbon, « Tarife Schwimmbad und Strandbad 2026 »', 'https://www.arbon.ch/public/upload/assets/258/Tarife_Schwimmbad_und_Strandbad_2026.pdf?fp=4'], ARB2 = BI('tg/strandbad-arbon.html', 'Strandbad Arbon');
const LOC = BI('ti/locarno-lido.html', 'Lido Locarno'), LOCT = ['Lido Locarno, « Tariffe estate 2026 »', 'https://www.lidolocarno.ch/media/502754/tarifs-summer-2026.pdf'], ALT = ['Ascona-Locarno Tourism, « Beaches »', 'https://www.ascona-locarno.com/en/what-s-on/stories/beaches'];
const T3 = (titre, h1, desc, bref, corps) => ({ titre, h1, desc, bref, corps });

export const articlesLacs2 = () => [
  art('badis-am-zugersee', 'zoug',
    ['Le Strandbad de Zoug, plage de sable, plongeoir dans le lac et le Rigi en face', 'Strandbad Zug, sandy beach, diving platform in the lake and the Rigi opposite', 'Das Strandbad Zug mit Sandstrand, Sprunganlage im See und gegenüber die Rigi', 'Lo Strandbad di Zugo, spiaggia di sabbia, trampolino nel lago e il Rigi di fronte'],
    [ZUG, NAU, ZZ], {
    de: T3('Badis am Zugersee: Strandbad Zug gratis, Cham, Buonas', 'Baden am Zugersee: die Strandbäder von Zug, Cham und Buonas',
      'Das Strandbad Zug ist gratis (Saison 2026 vom 9. Mai bis 20. September), ebenso Cham; Buonas kostet CHF 3. Sprunganlage, Aufsicht, Anreise und die Wassertemperatur von heute.',
      'Am Zugersee ist Baden oft <strong>gratis</strong>: Das <strong>Strandbad Zug</strong> verlangt keinen Eintritt (Saison 2026 vom 9. Mai bis 20. September), das <strong>Strandbad Cham</strong> auch nicht. Das <strong>Seebad Buonas</strong> kostet CHF 3 für Erwachsene.',
      `
<h2>Strandbad Zug</h2>
${UL('Sandstrand, Sprunganlage im See (1, 3 und 5 m), Kinderplanschbecken, Liegewiesen. <strong>Eintritt gratis.</strong>', 'Saison 2026 vom 9. Mai bis 20. September, täglich ab 9 Uhr bei gutem Wetter; Badeaufsicht von 9 bis 19.30 Uhr.', 'Keine Hunde, keine SUPs; Luftmatratzen erlaubt.', 'Bus oder Bahn bis «Zug, Schutzengel», dann etwa 300 m; wenige Parkplätze, besser mit ÖV oder Velo.')}
<p>Wassertemperatur heute: <a href="{plage:zug-strandbad}">Strandbad Zug</a>. Laut nau.ch bleiben alle Bäder der Stadt Zug gratis.</p>
<h2>Cham und Buonas</h2>
${UL('<a href="{plage:cham}">Strandbad Cham</a>: Eintritt gratis.', '<a href="{plage:buonas}">Seebad Buonas</a>: CHF 3 für Erwachsene, CHF 2 für 6- bis 15-Jährige (Zuger Zeitung, Artikel ohne Datum).')}
<p>Alle Badeplätze am See: <a href="{blog:plages-lac-zoug}">Zugersee</a>.</p>`),
    fr: T3('Se baigner au lac de Zoug : Strandbad de Zoug gratuit, Cham, Buonas', 'Se baigner au lac de Zoug : les bains de Zoug, Cham et Buonas',
      'Le Strandbad de Zoug est gratuit (saison 2026 du 9 mai au 20 septembre), comme celui de Cham ; Buonas coûte 3 francs. Plongeoir, surveillance, accès et eau du jour.',
      'Au lac de Zoug, la baignade est souvent <strong>gratuite</strong> : le <strong>Strandbad de Zoug</strong> ne fait pas payer l’entrée (saison 2026 du 9 mai au 20 septembre), celui de <strong>Cham</strong> non plus. Le <strong>Seebad de Buonas</strong> coûte 3 francs pour un adulte.',
      `
<h2>Strandbad de Zoug</h2>
${UL('Plage de sable, plongeoir dans le lac (1, 3 et 5 m), pataugeoire, pelouses. <strong>Entrée gratuite.</strong>', 'Saison 2026 du 9 mai au 20 septembre, tous les jours dès 9 h par beau temps ; surveillance de 9 h à 19 h 30.', 'Pas de chiens ni de paddles ; matelas gonflables admis.', 'Bus ou train jusqu’à « Zug, Schutzengel », puis environ 300 m ; peu de places de parc, mieux vaut venir en transports publics ou à vélo.')}
<p>L’eau du jour : <a href="{plage:zug-strandbad}">Strandbad de Zoug</a>. Selon nau.ch, tous les bains de la ville restent gratuits.</p>
<h2>Cham et Buonas</h2>
${UL('<a href="{plage:cham}">Strandbad de Cham</a> : entrée gratuite.', '<a href="{plage:buonas}">Seebad de Buonas</a> : 3 francs pour un adulte, 2 francs de 6 à 15 ans (Zuger Zeitung, article non daté).')}
<p>Toutes les plages du lac : <a href="{blog:plages-lac-zoug}">lac de Zoug</a>.</p>`),
    en: T3('Swimming in Lake Zug: free Strandbad Zug, Cham, Buonas', 'Swimming in Lake Zug: the lidos of Zug, Cham and Buonas',
      'Strandbad Zug is free (2026 season 9 May to 20 September), and so is Cham; Buonas costs CHF 3. Diving platform, lifeguards, getting there and today’s water.',
      'On Lake Zug, swimming is often <strong>free</strong>: <strong>Strandbad Zug</strong> charges no entry (2026 season 9 May to 20 September), and neither does <strong>Cham</strong>. <strong>Seebad Buonas</strong> costs CHF 3 for adults.',
      `
<h2>Strandbad Zug</h2>
${UL('Sandy beach, diving platform in the lake (1, 3 and 5 m), paddling pool, lawns. <strong>Free entry.</strong>', '2026 season 9 May to 20 September, daily from 9 am in good weather; lifeguards 9 am to 7.30 pm.', 'No dogs, no paddleboards; air mattresses allowed.', 'Bus or train to “Zug, Schutzengel”, then about 300 m; little parking, public transport or bike is better.')}
<p>Today’s water: <a href="{plage:zug-strandbad}">Strandbad Zug</a>. According to nau.ch, all the city’s baths stay free.</p>
<h2>Cham and Buonas</h2>
${UL('<a href="{plage:cham}">Strandbad Cham</a>: free entry.', '<a href="{plage:buonas}">Seebad Buonas</a>: CHF 3 for adults, CHF 2 for ages 6–15 (Zuger Zeitung, undated article).')}
<p>All beaches on the lake: <a href="{blog:plages-lac-zoug}">Lake Zug</a>.</p>`),
    it: T3('Fare il bagno nel lago di Zugo: Strandbad di Zugo gratuito, Cham, Buonas', 'Fare il bagno nel lago di Zugo: i lidi di Zugo, Cham e Buonas',
      'Lo Strandbad di Zugo è gratuito (stagione 2026 dal 9 maggio al 20 settembre), come quello di Cham; Buonas costa 3 franchi. Trampolino, sorveglianza, accesso e acqua di oggi.',
      'Sul lago di Zugo il bagno è spesso <strong>gratuito</strong>: lo <strong>Strandbad di Zugo</strong> non fa pagare l’ingresso (stagione 2026 dal 9 maggio al 20 settembre), quello di <strong>Cham</strong> neppure. Il <strong>Seebad di Buonas</strong> costa 3 franchi per un adulto.',
      `
<h2>Strandbad di Zugo</h2>
${UL('Spiaggia di sabbia, trampolino nel lago (1, 3 e 5 m), piscina per bambini, prati. <strong>Ingresso gratuito.</strong>', 'Stagione 2026 dal 9 maggio al 20 settembre, ogni giorno dalle 9 con bel tempo; sorveglianza dalle 9 alle 19.30.', 'Niente cani né SUP; materassini ammessi.', 'Bus o treno fino a «Zug, Schutzengel», poi circa 300 m; pochi parcheggi, meglio i mezzi pubblici o la bici.')}
<p>L’acqua di oggi: <a href="{plage:zug-strandbad}">Strandbad di Zugo</a>. Secondo nau.ch, tutti i bagni della città restano gratuiti.</p>
<h2>Cham e Buonas</h2>
${UL('<a href="{plage:cham}">Strandbad di Cham</a>: ingresso gratuito.', '<a href="{plage:buonas}">Seebad di Buonas</a>: 3 franchi per un adulto, 2 franchi dai 6 ai 15 anni (Zuger Zeitung, articolo senza data).')}
<p>Tutte le spiagge del lago: <a href="{blog:plages-lac-zoug}">lago di Zugo</a>.</p>`) }),

  art('baden-am-bodensee', 'constance',
    ['Le port et le bain de Romanshorn au bord du lac de Constance, un grand toboggan et le lac à perte de vue', 'Romanshorn’s lake bath on Lake Constance, a long water slide and the lake stretching away', 'Das Seebad Romanshorn am Bodensee, eine lange Rutschbahn und der See bis zum Horizont', 'Il bagno di Romanshorn sul lago di Costanza, un lungo scivolo e il lago a perdita d’occhio'],
    [ROM, TZ, ARB, ARB2], {
    de: T3('Baden am Bodensee, Schweizer Ufer: Romanshorn und Arbon', 'Baden am Bodensee auf der Schweizer Seite: Seebad Romanshorn und Strandbad Arbon',
      'Baden am Schweizer Bodenseeufer: Seebad Romanshorn mit 50-m-Becken und 100-m-Rutschbahn (CHF 10), Strandbad Arbon (CHF 8). Saison 2026, Öffnungszeiten und die Wassertemperatur von heute.',
      'Am Schweizer Ufer des Bodensees sind <strong>Romanshorn</strong> und <strong>Arbon</strong> die grossen Seebäder. Romanshorn hat ein 50-m-Becken, eine 100-m-Rutschbahn und einen Badesteg in den See (<strong>CHF 10</strong>); das Strandbad Arbon kostet <strong>CHF 8</strong>.',
      `
<h2>Seebad Romanshorn</h2>
${UL('Seezugang über Treppen mit Flachwasserzone, Badesteg und Flosse im Bodensee.', '50-m-Becken mit 8 Bahnen, Sprunganlage 1, 3 und 5 m, 100-m-Wasserrutschbahn, Kinderplanschbecken, grosse Liegewiese.', 'Eintritt: CHF 10 für Erwachsene (seit der Erhöhung, vorher CHF 8), CHF 5 für Kinder (Thurgauer Zeitung).', 'Saison 2026 vom 1. Mai bis 30. August, früher als sonst wegen einer Sanierung; Frühschwimmen im Sommer dienstags und donnerstags ab 6 Uhr. Im Winter überdeckt eine Traglufthalle das 25-m-Becken.')}
<p>Wassertemperatur heute: <a href="{plage:romanshorn}">Romanshorn</a>.</p>
<h2>Strandbad Arbon</h2>
${UL('Eintritt 2026: Erwachsene CHF 8, Kinder und Schüler CHF 4 (Tarif der Stadt).', 'Offen von 10 bis 19 Uhr bis 7. Juni, dann von 9 bis 20 Uhr bis 9. August (badi-info.ch).')}
<p>Wassertemperatur heute: <a href="{plage:arbon}">Arbon</a>. Alle Badeplätze am Schweizer Ufer: <a href="{blog:plages-lac-constance}">Bodensee</a>.</p>`),
    fr: T3('Se baigner au lac de Constance, rive suisse : Romanshorn et Arbon', 'Se baigner au lac de Constance côté suisse : bains de Romanshorn et d’Arbon',
      'Se baigner sur la rive suisse du lac de Constance : le bain de Romanshorn, bassin de 50 m et toboggan de 100 m (10 francs), le Strandbad d’Arbon (8 francs). Saison 2026, horaires et eau du jour.',
      'Sur la rive suisse du lac de Constance, <strong>Romanshorn</strong> et <strong>Arbon</strong> sont les grands bains. Romanshorn a un bassin de 50 m, un toboggan de 100 m et un ponton dans le lac (<strong>10 francs</strong>) ; le Strandbad d’Arbon coûte <strong>8 francs</strong>.',
      `
<h2>Bain de Romanshorn</h2>
${UL('Accès au lac par des escaliers avec une zone peu profonde, ponton et radeaux dans le lac.', 'Bassin de 50 m à 8 lignes, plongeoirs de 1, 3 et 5 m, toboggan de 100 m, pataugeoire, grande pelouse.', 'Entrée : 10 francs pour un adulte (après la hausse, 8 francs avant), 5 francs pour un enfant (Thurgauer Zeitung).', 'Saison 2026 du 1er mai au 30 août, plus courte que d’habitude à cause de travaux ; baignade matinale l’été les mardis et jeudis dès 6 h. L’hiver, une halle gonflable couvre le bassin de 25 m.')}
<p>L’eau du jour : <a href="{plage:romanshorn}">Romanshorn</a>.</p>
<h2>Strandbad d’Arbon</h2>
${UL('Entrée 2026 : adultes 8 francs, enfants et élèves 4 francs (tarif de la Ville).', 'Ouvert de 10 h à 19 h jusqu’au 7 juin, puis de 9 h à 20 h jusqu’au 9 août (badi-info.ch).')}
<p>L’eau du jour : <a href="{plage:arbon}">Arbon</a>. Toutes les plages de la rive suisse : <a href="{blog:plages-lac-constance}">lac de Constance</a>.</p>`),
    en: T3('Swimming in Lake Constance, Swiss shore: Romanshorn and Arbon', 'Swimming in Lake Constance on the Swiss side: Romanshorn and Arbon lake baths',
      'Swimming on the Swiss shore of Lake Constance: Romanshorn lake bath with a 50 m pool and 100 m slide (CHF 10), Strandbad Arbon (CHF 8). 2026 season, hours and today’s water.',
      'On the Swiss shore of Lake Constance, <strong>Romanshorn</strong> and <strong>Arbon</strong> are the big lake baths. Romanshorn has a 50 m pool, a 100 m slide and a jetty into the lake (<strong>CHF 10</strong>); Strandbad Arbon costs <strong>CHF 8</strong>.',
      `
<h2>Seebad Romanshorn</h2>
${UL('Lake access by steps with a shallow area, jetty and rafts in the lake.', '50 m pool with 8 lanes, 1, 3 and 5 m boards, 100 m water slide, paddling pool, big lawn.', 'Entry: CHF 10 for adults (after the increase, CHF 8 before), CHF 5 for children (Thurgauer Zeitung).', '2026 season 1 May to 30 August, shorter than usual because of renovation; early swimming in summer on Tuesdays and Thursdays from 6 am. In winter an air dome covers the 25 m pool.')}
<p>Today’s water: <a href="{plage:romanshorn}">Romanshorn</a>.</p>
<h2>Strandbad Arbon</h2>
${UL('2026 entry: adults CHF 8, children and pupils CHF 4 (city rates).', 'Open 10 am to 7 pm until 7 June, then 9 am to 8 pm until 9 August (badi-info.ch).')}
<p>Today’s water: <a href="{plage:arbon}">Arbon</a>. All beaches on the Swiss shore: <a href="{blog:plages-lac-constance}">Lake Constance</a>.</p>`),
    it: T3('Fare il bagno nel lago di Costanza, riva svizzera: Romanshorn e Arbon', 'Fare il bagno nel lago di Costanza sul lato svizzero: Romanshorn e Arbon',
      'Fare il bagno sulla riva svizzera del lago di Costanza: il bagno di Romanshorn con vasca di 50 m e scivolo di 100 m (10 franchi), lo Strandbad di Arbon (8 franchi). Stagione 2026, orari e acqua di oggi.',
      'Sulla riva svizzera del lago di Costanza, <strong>Romanshorn</strong> e <strong>Arbon</strong> sono i grandi lidi. Romanshorn ha una vasca di 50 m, uno scivolo di 100 m e un pontile nel lago (<strong>10 franchi</strong>); lo Strandbad di Arbon costa <strong>8 franchi</strong>.',
      `
<h2>Bagno di Romanshorn</h2>
${UL('Accesso al lago con scale e zona bassa, pontile e zattere nel lago.', 'Vasca di 50 m con 8 corsie, trampolini da 1, 3 e 5 m, scivolo di 100 m, piscina per bambini, grande prato.', 'Ingresso: 10 franchi per un adulto (dopo l’aumento, prima 8), 5 franchi per un bambino (Thurgauer Zeitung).', 'Stagione 2026 dal 1° maggio al 30 agosto, più corta del solito per lavori; nuoto mattutino d’estate il martedì e il giovedì dalle 6. D’inverno una tensostruttura copre la vasca da 25 m.')}
<p>L’acqua di oggi: <a href="{plage:romanshorn}">Romanshorn</a>.</p>
<h2>Strandbad di Arbon</h2>
${UL('Ingresso 2026: adulti 8 franchi, bambini e allievi 4 franchi (tariffa della Città).', 'Aperto dalle 10 alle 19 fino al 7 giugno, poi dalle 9 alle 20 fino al 9 agosto (badi-info.ch).')}
<p>L’acqua di oggi: <a href="{plage:arbon}">Arbon</a>. Tutte le spiagge della riva svizzera: <a href="{blog:plages-lac-constance}">lago di Costanza</a>.</p>`) }),

  art('lidi-lago-maggiore', 'majeur',
    ['Le Lido de Locarno au bord du lac Majeur, bassins, toboggans et montagnes en face', 'The Lido Locarno on Lake Maggiore, pools, slides and mountains opposite', 'Das Lido Locarno am Lago Maggiore, Becken, Rutschbahnen und gegenüber die Berge', 'Il Lido Locarno sul Lago Maggiore, vasche, scivoli e le montagne di fronte'],
    [LOC, LOCT, ALT], {
    it: T3('Lidi del Lago Maggiore svizzero: Lido Locarno, Ascona, prezzi 2026', 'Dove fare il bagno sul Lago Maggiore svizzero: Lido Locarno e bagni pubblici',
      'Fare il bagno sul Lago Maggiore svizzero: Lido Locarno con spiaggia, vasca olimpionica, scivoli e vasca termale (13 franchi), bagno pubblico gratuito ad Ascona, Lido Tenero chiuso nel 2026.',
      'Sulla riva svizzera del Lago Maggiore, il <strong>Lido Locarno</strong> unisce spiaggia di sabbia, vasca olimpionica, scivoli e una vasca termale all’aperto (<strong>13 franchi</strong> per un adulto, 18 con gli scivoli). Ad <strong>Ascona</strong> c’è un bagno pubblico <strong>gratuito</strong>. Il <strong>Lido Tenero</strong> è rimasto chiuso nel 2026.',
      `
<h2>Lido Locarno</h2>
${UL('Spiaggia di sabbia sul lago, vasca olimpionica di 50 m (27–28 °C), vasca ludica, vasca tuffi con trampolini fino a 10 m.', 'Scivoli fino a 102 m, tra cui un looping fino a 60 km/h; vasca termale all’aperto a 34 °C, accessibile tutto l’anno.', 'Ingresso estate 2026: adulti 13 franchi (18 con gli scivoli), bambini 3–15 anni 7 franchi, gratis sotto i 3 anni (tariffe del Lido).', 'D’estate aperto dalle 8.30 alle 21.')}
<p>L’acqua di oggi: <a href="{plage:lido-locarno}">Lido Locarno</a>.</p>
<h2>Ascona, Brissago, Tenero</h2>
${UL('Ad Ascona il bagno pubblico è una spiaggia gratuita con riva sabbiosa (Ascona-Locarno Tourism): <a href="{plage:ascona}">acqua di oggi</a>.', 'Il Lido Brissago è tra i lidi grandi e adatti alle famiglie: <a href="{plage:brissago}">Brissago</a>.', 'Il Lido Tenero è rimasto chiuso per la stagione 2026.')}
<p>Tutte le spiagge della riva svizzera: <a href="{blog:plages-lac-majeur}">Lago Maggiore</a>.</p>`),
    de: T3('Lidi am Lago Maggiore (Schweiz): Lido Locarno, Ascona, Preise 2026', 'Baden am Schweizer Lago Maggiore: Lido Locarno und die öffentlichen Bäder',
      'Baden am Schweizer Lago Maggiore: Lido Locarno mit Strand, Olympiabecken, Rutschbahnen und Thermalbecken (CHF 13), gratis Bagno pubblico in Ascona, Lido Tenero 2026 geschlossen.',
      'Am Schweizer Ufer des Lago Maggiore verbindet das <strong>Lido Locarno</strong> Sandstrand, Olympiabecken, Rutschbahnen und ein Thermalbecken im Freien (<strong>CHF 13</strong> für Erwachsene, CHF 18 mit Rutschen). In <strong>Ascona</strong> gibt es ein <strong>Gratis</strong>-Bad. Das <strong>Lido Tenero</strong> blieb 2026 geschlossen.',
      `
<h2>Lido Locarno</h2>
${UL('Sandstrand am See, 50-m-Olympiabecken (27–28 °C), Spassbecken, Sprungbecken mit Anlage bis 10 m.', 'Rutschbahnen bis 102 m, darunter ein Looping bis 60 km/h; Thermalbecken im Freien mit 34 °C, ganzjährig zugänglich.', 'Eintritt Sommer 2026: Erwachsene CHF 13 (CHF 18 mit Rutschen), Kinder 3–15 Jahre CHF 7, unter 3 Jahren gratis (Tarife des Lido).', 'Im Sommer offen von 8.30 bis 21 Uhr.')}
<p>Wassertemperatur heute: <a href="{plage:lido-locarno}">Lido Locarno</a>.</p>
<h2>Ascona, Brissago, Tenero</h2>
${UL('In Ascona ist das Bagno pubblico ein Gratis-Strand mit Sandufer (Ascona-Locarno Tourism): <a href="{plage:ascona}">Wasser von heute</a>.', 'Das Lido Brissago zählt zu den grossen, familienfreundlichen Lidi: <a href="{plage:brissago}">Brissago</a>.', 'Das Lido Tenero blieb in der Saison 2026 geschlossen.')}
<p>Alle Badeplätze am Schweizer Ufer: <a href="{blog:plages-lac-majeur}">Lago Maggiore</a>.</p>`),
    fr: T3('Se baigner au lac Majeur suisse : Lido de Locarno, Ascona, prix 2026', 'Se baigner au lac Majeur côté suisse : le Lido de Locarno et les bains publics',
      'Se baigner au lac Majeur suisse : le Lido de Locarno, plage, bassin olympique, toboggans et bassin thermal (13 francs), le bain public gratuit d’Ascona, le Lido de Tenero fermé en 2026.',
      'Sur la rive suisse du lac Majeur, le <strong>Lido de Locarno</strong> réunit plage de sable, bassin olympique, toboggans et bassin thermal en plein air (<strong>13 francs</strong> pour un adulte, 18 avec les toboggans). À <strong>Ascona</strong>, le bain public est <strong>gratuit</strong>. Le <strong>Lido de Tenero</strong> est resté fermé en 2026.',
      `
<h2>Lido de Locarno</h2>
${UL('Plage de sable sur le lac, bassin olympique de 50 m (27–28 °C), bassin ludique, fosse de plongeon jusqu’à 10 m.', 'Toboggans jusqu’à 102 m, dont un looping jusqu’à 60 km/h ; bassin thermal en plein air à 34 °C, ouvert toute l’année.', 'Entrée été 2026 : adultes 13 francs (18 avec les toboggans), enfants de 3 à 15 ans 7 francs, gratuit avant 3 ans (tarifs du Lido).', 'Ouvert de 8 h 30 à 21 h l’été.')}
<p>L’eau du jour : <a href="{plage:lido-locarno}">Lido de Locarno</a>.</p>
<h2>Ascona, Brissago, Tenero</h2>
${UL('À Ascona, le bain public est une plage gratuite à la rive sablonneuse (Ascona-Locarno Tourism) : <a href="{plage:ascona}">l’eau du jour</a>.', 'Le Lido de Brissago fait partie des grands lidos adaptés aux familles : <a href="{plage:brissago}">Brissago</a>.', 'Le Lido de Tenero est resté fermé pour la saison 2026.')}
<p>Toutes les plages de la rive suisse : <a href="{blog:plages-lac-majeur}">lac Majeur</a>.</p>`),
    en: T3('Lake Maggiore lidos (Switzerland): Lido Locarno, Ascona, 2026 prices', 'Swimming on Swiss Lake Maggiore: the Lido Locarno and public beaches',
      'Swimming on Swiss Lake Maggiore: Lido Locarno with beach, Olympic pool, slides and thermal pool (CHF 13), free public beach in Ascona, Lido Tenero closed in 2026.',
      'On the Swiss shore of Lake Maggiore, the <strong>Lido Locarno</strong> combines a sandy beach, Olympic pool, slides and an outdoor thermal pool (<strong>CHF 13</strong> for adults, CHF 18 with slides). <strong>Ascona</strong> has a <strong>free</strong> public beach. The <strong>Lido Tenero</strong> stayed closed in 2026.',
      `
<h2>Lido Locarno</h2>
${UL('Sandy beach on the lake, 50 m Olympic pool (27–28 °C), fun pool, diving pool up to 10 m.', 'Slides up to 102 m, including a loop reaching 60 km/h; outdoor thermal pool at 34 °C, open all year.', 'Summer 2026 entry: adults CHF 13 (CHF 18 with slides), children 3–15 CHF 7, free under 3 (Lido rates).', 'Open 8.30 am to 9 pm in summer.')}
<p>Today’s water: <a href="{plage:lido-locarno}">Lido Locarno</a>.</p>
<h2>Ascona, Brissago, Tenero</h2>
${UL('In Ascona the public bath is a free beach with a sandy shore (Ascona-Locarno Tourism): <a href="{plage:ascona}">today’s water</a>.', 'The Lido Brissago is among the large family-friendly lidos: <a href="{plage:brissago}">Brissago</a>.', 'The Lido Tenero stayed closed for the 2026 season.')}
<p>All beaches on the Swiss shore: <a href="{blog:plages-lac-majeur}">Lake Maggiore</a>.</p>`) }),
];
