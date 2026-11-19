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
