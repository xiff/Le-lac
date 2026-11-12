// Articles « température de l'eau » par lac, en quatre langues, écrits depuis les données de l'app :
// plages suivies (spots.js) et type de modèle Alplakes (3D = une valeur devant chaque plage, 1D = une valeur pour tout le lac).
import { SPOTS, LACS, lacDe, nomLac } from '../spots.js';
import { LOCATIONS } from '../locations.js';
import { valeurMatin, dateMatin, degMatin } from './matin.mjs';
import { texteLieu, villeDe } from '../traductions.js';

const CLES = ['neuchatel', 'bienne', 'morat', 'gruyere', 'joux', 'zurich', 'lucerne', 'thoune', 'brienz', 'constance', 'lugano', 'majeur'];
const SOURCES = [['Eawag, projet Alplakes', 'https://www.eawag.ch/fr/abteilung/surf/projekte/alplakes'], ['Alplakes, Eawag (CC BY 4.0)', 'https://www.alplakes.eawag.ch'],
  ['EGU 2026, précision des simulations des lacs suisses', 'https://meetingorganizer.copernicus.org/EGU26/EGU26-12579.html'], ['OpenStreetMap, contour du lac (ODbL)', 'https://www.openstreetmap.org/copyright']];
const min = (s) => s[0].toLowerCase() + s.slice(1);

const TEXTES = {
  fr: (N, n, d3, liste) => { const du = 'du ' + min(N), app = 'Mon Lac'; return {
    titre: `Température de l’eau ${du} aujourd’hui, ${d3 ? 'plage par plage' : 'et d’où vient le chiffre'}`,
    h1: `Température de l’eau ${du} : la valeur du jour et son origine`,
    desc: `La température de l’eau ${du} à 70 cm sous la surface, ${d3 ? `devant chacune des ${n} plages suivies` : `pour les ${n} plages suivies`}, mise à jour toutes les trois heures. D’où vient le chiffre et ce qu’il ne dit pas.`,
    bref: `${app} affiche la température de l’eau ${du} <strong>à 70 cm sous la surface</strong>, mise à jour toutes les trois heures à partir du modèle Alplakes de l’Eawag. ${d3
      ? `Le modèle est tridimensionnel : la valeur est lue <strong>devant chacune des ${n} plages suivies</strong>, et peut donc différer de l’une à l’autre.`
      : `Pour ce lac, le modèle donne <strong>une seule valeur pour tout le lac</strong> : les ${n} plages suivies affichent le même chiffre.`}`,
    eauTitre: `L’eau ${du} en ce moment`, eauUne: `En ce moment, le modèle donne <strong>§T</strong> à 70 cm sous la surface pour l’ensemble ${du}.`,
    alt: `Carte ${du} avec les ${n} plages suivies par ${app}`, credit: `Le ${min(N)} et les plages suivies. Carte ${app}, contour`,
    html: `
<h2>D’où vient la température ${du} ?</h2>
<p>Les chiffres viennent d’<strong>Alplakes</strong>, la plateforme de l’Eawag (l’institut de recherche sur l’eau du domaine des EPF). Elle combine des modèles numériques des lacs et des données satellitaires pour calculer la température de l’eau à différentes profondeurs. Les données sont publiées sous licence CC BY 4.0, et ${app} les relit toutes les trois heures.</p>
${d3
  ? `<p>Pour le ${min(N)}, Alplakes fait tourner un <strong>modèle en trois dimensions</strong>. ${app} y lit la valeur à 70 cm de profondeur, au point du modèle situé devant chaque plage. L’Eawag indique, pour les grands lacs, une erreur d’environ 1 °C en surface.</p>`
  : `<p>Pour le ${min(N)}, Alplakes fournit un <strong>modèle à une dimension</strong> (Simstrat) : il calcule la température selon la profondeur, mais pas selon l’endroit. ${app} y lit la valeur à 70 cm de profondeur et l’affiche pour toutes les plages du lac.</p>`}
<h2>La température est-elle la même sur toutes les plages ?</h2>
${d3
  ? `<p>Non. Le vent déplace l’eau de surface, et les baies peu profondes se réchauffent ou se refroidissent plus vite que le large : le même jour, deux plages peuvent afficher des valeurs différentes. <a href="#eau-du-jour">L’écart du moment</a> est calculé plus bas. Le mécanisme est expliqué, exemples mesurés à l’appui, dans notre article sur <a href="{blog:temperature-lac-leman}">la température du Léman</a>.</p>`
  : `<p>Dans l’app, oui, puisque le modèle ne donne qu’une valeur pour le lac. Dans la réalité, pas forcément : près d’une embouchure, dans une baie peu profonde ou après un coup de vent, l’eau peut s’écarter du chiffre affiché. Prenez-le comme la température d’ensemble du lac, pas comme une mesure faite sur votre plage.</p>`}
<h2>Pourquoi 70 cm sous la surface ?</h2>
<p>Parce que c’est à peu près l’eau dans laquelle on nage. La toute première pellicule de surface change très vite avec le soleil et l’air ; un peu plus bas, la valeur est plus stable et plus proche de ce que l’on ressent en entrant.</p>
<h2>Les ${n} plages suivies</h2>
<p>Chaque plage a sa page, avec l’eau, le vent et un verdict pour la baignade et le paddle.</p>
${liste}
<h2>Où voir la température ${du} en direct ?</h2>
<p>Dans l’<a href="{app}">app ${app}</a>, gratuite et sans compte. La <a href="{plages}">liste de toutes les plages</a> couvre aussi les autres lacs suisses.</p>` }; },

  en: (N, n, d3, liste) => { const app = 'My Lake'; return {
    titre: `${N} water temperature today${d3 ? ', beach by beach' : ', and where the figure comes from'}`,
    h1: `${N} water temperature: today’s value and where it comes from`,
    desc: `${N} water temperature 70 cm below the surface, ${d3 ? `in front of each of the ${n} beaches we follow` : `for the ${n} beaches we follow`}, updated every three hours. Where the figure comes from and what it does not tell you.`,
    bref: `${app} shows ${N}’s water temperature <strong>70 cm below the surface</strong>, updated every three hours from Eawag’s Alplakes model. ${d3
      ? `The model is three-dimensional: the value is read <strong>in front of each of the ${n} beaches we follow</strong>, so it can differ from one to the next.`
      : `For this lake the model gives <strong>a single value for the whole lake</strong>: the ${n} beaches we follow all show the same figure.`}`,
    eauTitre: `${N}’s water right now`, eauUne: `Right now the model gives <strong>§T</strong> at 70 cm below the surface for ${N} as a whole.`,
    alt: `Map of ${N} with the ${n} beaches followed by ${app}`, credit: `${N} and the beaches we follow. Map by ${app}, outline`,
    html: `
<h2>Where does the ${N} temperature come from?</h2>
<p>The figures come from <strong>Alplakes</strong>, the platform run by Eawag (the Swiss Federal Institute of Aquatic Science and Technology). It combines numerical lake models with satellite data to calculate water temperature at different depths. The data is published under a CC BY 4.0 licence, and ${app} reads it every three hours.</p>
${d3
  ? `<p>For ${N}, Alplakes runs a <strong>three-dimensional model</strong>. ${app} reads the value at 70 cm depth, at the model point in front of each beach. For the large lakes, Eawag reports an error of about 1 °C at the surface.</p>`
  : `<p>For ${N}, Alplakes provides a <strong>one-dimensional model</strong> (Simstrat): it calculates temperature by depth, but not by location. ${app} reads the value at 70 cm depth and shows it for every beach on the lake.</p>`}
<h2>Is the temperature the same at every beach?</h2>
${d3
  ? `<p>No. Wind moves the surface water, and shallow bays warm up or cool down faster than open water: on the same day, two beaches can show different values. <a href="#eau-du-jour">The current gap</a> is calculated below. The mechanism is explained, with measured examples, in our article on <a href="{blog:temperature-lac-leman}">Lake Geneva’s water temperature</a>.</p>`
  : `<p>In the app, yes, because the model gives only one value for the lake. In reality, not necessarily: near a river mouth, in a shallow bay or after strong wind, the water can differ from the figure shown. Read it as the lake’s overall temperature, not as a measurement taken at your beach.</p>`}
<h2>Why 70 cm below the surface?</h2>
<p>Because that is roughly the water you swim in. The very top film changes quickly with sun and air; slightly deeper, the value is steadier and closer to what you feel when you get in.</p>
<h2>The ${n} beaches we follow</h2>
<p>Each beach has its own page, with water, wind and a verdict for swimming and paddleboarding.</p>
${liste}
<h2>Where can you see the ${N} temperature live?</h2>
<p>In the <a href="{app}">${app} app</a>, free and with no account. The <a href="{plages}">list of all beaches</a> also covers the other Swiss lakes.</p>` }; },

  de: (N, n, d3, liste) => { const app = 'Mein See'; return {
    titre: `Wassertemperatur ${N} heute${d3 ? ', Badeplatz für Badeplatz' : ': woher der Wert kommt'}`,
    h1: `Wassertemperatur ${N}: der Wert von heute und woher er kommt`,
    desc: `Die Wassertemperatur im ${N} in 70 cm Tiefe, ${d3 ? `vor jedem der ${n} erfassten Badeplätze` : `für die ${n} erfassten Badeplätze`}, alle drei Stunden aktualisiert. Woher der Wert kommt und was er nicht aussagt.`,
    bref: `${app} zeigt die Wassertemperatur im ${N} <strong>70 cm unter der Oberfläche</strong>, alle drei Stunden aktualisiert aus dem Alplakes-Modell der Eawag. ${d3
      ? `Das Modell ist dreidimensional: Der Wert wird <strong>vor jedem der ${n} erfassten Badeplätze</strong> gelesen und kann sich deshalb von Ort zu Ort unterscheiden.`
      : `Für diesen See liefert das Modell <strong>einen einzigen Wert für den ganzen See</strong>: Die ${n} erfassten Badeplätze zeigen dieselbe Zahl.`}`,
    eauTitre: `Das Wasser im ${N} im Moment`, eauUne: `Im Moment ergibt das Modell <strong>§T</strong> in 70 cm Tiefe für den gesamten See (${N}).`,
    alt: `Karte: ${N} mit den ${n} von ${app} erfassten Badeplätzen`, credit: `${N} und die erfassten Badeplätze. Karte ${app}, Umriss`,
    html: `
<h2>Woher kommt die Wassertemperatur im ${N}?</h2>
<p>Die Werte stammen von <strong>Alplakes</strong>, der Plattform der Eawag (Wasserforschungsinstitut des ETH-Bereichs). Sie verbindet numerische Seemodelle mit Satellitendaten und berechnet die Wassertemperatur in verschiedenen Tiefen. Die Daten stehen unter der Lizenz CC BY 4.0, und ${app} liest sie alle drei Stunden neu ein.</p>
${d3
  ? `<p>Für diesen See rechnet Alplakes ein <strong>dreidimensionales Modell</strong>. ${app} liest den Wert in 70 cm Tiefe am Modellpunkt vor jedem Badeplatz. Die Eawag nennt für die grossen Seen einen Fehler von rund 1 °C an der Oberfläche.</p>`
  : `<p>Für diesen See stellt Alplakes ein <strong>eindimensionales Modell</strong> (Simstrat) bereit: Es berechnet die Temperatur nach der Tiefe, aber nicht nach dem Ort. ${app} liest den Wert in 70 cm Tiefe und zeigt ihn für alle Badeplätze des Sees.</p>`}
<h2>Ist das Wasser an allen Badeplätzen gleich warm?</h2>
${d3
  ? `<p>Nein. Der Wind verschiebt das Oberflächenwasser, und flache Buchten erwärmen sich oder kühlen schneller ab als der offene See: Am selben Tag können zwei Badeplätze unterschiedliche Werte zeigen. <a href="#eau-du-jour">Der aktuelle Unterschied</a> wird weiter unten berechnet. Wie das funktioniert, erklärt mit gemessenen Beispielen unser Artikel zur <a href="{blog:temperature-lac-leman}">Wassertemperatur im Genfersee</a>.</p>`
  : `<p>In der App ja, weil das Modell nur einen Wert für den See liefert. In Wirklichkeit nicht unbedingt: Bei einer Flussmündung, in einer flachen Bucht oder nach starkem Wind kann das Wasser vom angezeigten Wert abweichen. Lies ihn als Gesamttemperatur des Sees, nicht als Messung an deinem Badeplatz.</p>`}
<h2>Warum 70 cm unter der Oberfläche?</h2>
<p>Weil das ungefähr das Wasser ist, in dem man schwimmt. Die oberste Schicht ändert sich mit Sonne und Luft sehr schnell; etwas tiefer ist der Wert stabiler und näher an dem, was man beim Hineingehen spürt.</p>
<h2>Die ${n} erfassten Badeplätze</h2>
<p>Jeder Badeplatz hat eine eigene Seite, mit Wasser, Wind und einer Einschätzung fürs Baden und Paddeln.</p>
${liste}
<h2>Wo sieht man die Wassertemperatur im ${N} live?</h2>
<p>In der <a href="{app}">App ${app}</a>, kostenlos und ohne Konto. Die <a href="{plages}">Liste aller Badeplätze</a> deckt auch die anderen Schweizer Seen ab.</p>` }; },

  it: (N, n, d3, liste) => { const lago = N.startsWith('Lago') ? min(N) : N, del = 'del ' + lago, app = 'Il mio lago'; return {
    titre: `Temperatura dell’acqua ${del} oggi${d3 ? ', spiaggia per spiaggia' : ': da dove viene il dato'}`,
    h1: `Temperatura dell’acqua ${del}: il valore di oggi e la sua origine`,
    desc: `La temperatura dell’acqua ${del} a 70 cm sotto la superficie, ${d3 ? `davanti a ciascuna delle ${n} spiagge seguite` : `per le ${n} spiagge seguite`}, aggiornata ogni tre ore. Da dove viene il dato e che cosa non dice.`,
    bref: `${app} mostra la temperatura dell’acqua ${del} <strong>a 70 cm sotto la superficie</strong>, aggiornata ogni tre ore dal modello Alplakes dell’Eawag. ${d3
      ? `Il modello è tridimensionale: il valore è letto <strong>davanti a ciascuna delle ${n} spiagge seguite</strong> e può quindi variare dall’una all’altra.`
      : `Per questo lago il modello fornisce <strong>un solo valore per tutto il lago</strong>: le ${n} spiagge seguite mostrano la stessa cifra.`}`,
    eauTitre: `L’acqua ${del} in questo momento`, eauUne: `In questo momento il modello indica <strong>§T</strong> a 70 cm sotto la superficie per l’insieme ${del}.`,
    alt: `Mappa ${del} con le ${n} spiagge seguite da ${app}`, credit: `Il ${lago} e le spiagge seguite. Mappa ${app}, contorno`,
    html: `
<h2>Da dove viene la temperatura ${del}?</h2>
<p>I dati provengono da <strong>Alplakes</strong>, la piattaforma dell’Eawag (l’istituto di ricerca sull’acqua del settore dei politecnici federali). Combina modelli numerici dei laghi e dati satellitari per calcolare la temperatura dell’acqua a diverse profondità. I dati sono pubblicati con licenza CC BY 4.0 e ${app} li rilegge ogni tre ore.</p>
${d3
  ? `<p>Per questo lago Alplakes fa girare un <strong>modello tridimensionale</strong>. ${app} legge il valore a 70 cm di profondità, nel punto del modello davanti a ogni spiaggia. Per i grandi laghi l’Eawag indica un errore di circa 1 °C in superficie.</p>`
  : `<p>Per questo lago Alplakes fornisce un <strong>modello unidimensionale</strong> (Simstrat): calcola la temperatura secondo la profondità, ma non secondo il luogo. ${app} legge il valore a 70 cm di profondità e lo mostra per tutte le spiagge del lago.</p>`}
<h2>La temperatura è la stessa su tutte le spiagge?</h2>
${d3
  ? `<p>No. Il vento sposta l’acqua di superficie e le baie poco profonde si scaldano o si raffreddano più in fretta del largo: nello stesso giorno due spiagge possono mostrare valori diversi. <a href="#eau-du-jour">Lo scarto del momento</a> è calcolato più sotto. Il meccanismo è spiegato, con esempi misurati, nel nostro articolo sulla <a href="{blog:temperature-lac-leman}">temperatura del Lemano</a>.</p>`
  : `<p>Nell’app sì, perché il modello dà un solo valore per il lago. Nella realtà non per forza: vicino a una foce, in una baia poco profonda o dopo vento forte, l’acqua può scostarsi dalla cifra mostrata. Va letta come la temperatura d’insieme del lago, non come una misura fatta sulla tua spiaggia.</p>`}
<h2>Perché 70 cm sotto la superficie?</h2>
<p>Perché è più o meno l’acqua in cui si nuota. Il primissimo strato cambia molto in fretta con il sole e l’aria; poco più sotto il valore è più stabile e più vicino a ciò che si sente entrando.</p>
<h2>Le ${n} spiagge seguite</h2>
<p>Ogni spiaggia ha la sua pagina, con acqua, vento e un giudizio per il bagno e il paddle.</p>
${liste}
<h2>Dove vedere la temperatura ${del} in diretta?</h2>
<p>Nell’<a href="{app}">app ${app}</a>, gratuita e senza account. L’<a href="{plages}">elenco di tutte le spiagge</a> copre anche gli altri laghi svizzeri.</p>` }; },
};
// Photo de tête de chaque article : Wikimedia Commons (téléchargée par .github/workflows/photos-blog.yml), regardée une à une.
// [fichier Commons, auteur, licence, hauteur pour 1600 px de large, légende fr, en, de, it]
const BY_SA4 = ['CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'], BY4 = ['CC BY 4.0', 'https://creativecommons.org/licenses/by/4.0/'];
const PHOTOS = {
  neuchatel: ['Lac de Neuchâtel et Alpes.jpg', 'Wysa', BY_SA4, 1200, 'Le lac de Neuchâtel et les Alpes', 'Lake Neuchâtel and the Alps', 'Der Neuenburgersee und die Alpen', 'Il lago di Neuchâtel e le Alpi'],
  bienne: ['I09 361 Bieler See, Badestelle Sutz.jpg', 'Falk2', BY_SA4, 1067, 'Le lieu de baignade de Sutz, au bord du lac de Bienne', 'The bathing spot at Sutz on Lake Biel', 'Die Badestelle Sutz am Bielersee', 'Il punto di balneazione di Sutz, sul lago di Bienne'],
  morat: ['Murtensee im Herbst.jpg', 'Chrisi1964', BY_SA4, 1067, 'Le lac de Morat en automne', 'Lake Murten in autumn', 'Der Murtensee im Herbst', 'Il lago di Morat in autunno'],
  gruyere: ['Lake Gruyère at autumn.jpg', 'Türke Andras', BY_SA4, 1023, 'Le lac de la Gruyère en automne', 'Lake Gruyère in autumn', 'Der Greyerzersee im Herbst', 'Il lago della Gruyère in autunno'],
  joux: ['040 Dent de Vaulion and Lac de Joux at Sunset Photo by Giles Laurent.jpg', 'Giles Laurent', BY_SA4, 900, 'La Dent de Vaulion et le lac de Joux au coucher du soleil, en hiver', 'The Dent de Vaulion and Lac de Joux at sunset, in winter', 'Die Dent de Vaulion und der Lac de Joux bei Sonnenuntergang, im Winter', 'La Dent de Vaulion e il Lac de Joux al tramonto, in inverno'],
  zurich: ['Lake Zurich at Rapperswil, 20250330 0825 7818.jpg', 'Jakub Hałun', BY4, 1068, 'Le lac de Zurich à Rapperswil', 'Lake Zurich at Rapperswil', 'Der Zürichsee bei Rapperswil', 'Il lago di Zurigo a Rapperswil'],
  lucerne: ['Lucerne Lake from Schweizerhofquai.jpg', 'Ymblanter', BY_SA4, 1067, 'Le lac des Quatre-Cantons vu du Schweizerhofquai, à Lucerne', 'Lake Lucerne from the Schweizerhofquai in Lucerne', 'Der Vierwaldstättersee vom Schweizerhofquai in Luzern', 'Il lago dei Quattro Cantoni dallo Schweizerhofquai, a Lucerna'],
  thoune: ['LakeThunSwissAlps.jpg', 'Jasper.tm', BY_SA4, 1067, 'Le lac de Thoune et les Alpes', 'Lake Thun and the Alps', 'Der Thunersee und die Alpen', 'Il lago di Thun e le Alpi'],
  brienz: ['Brienzersee with a coastal town.jpg', 'Nicojonesgodel', BY_SA4, 1067, 'Un village au bord du lac de Brienz', 'A village on the shore of Lake Brienz', 'Ein Dorf am Ufer des Brienzersees', 'Un villaggio sulla riva del lago di Brienz'],
  constance: ['Bodensee Romanshorn CH.jpg', 'SiPE', BY_SA4, 900, 'Le lac de Constance à Romanshorn', 'Lake Constance at Romanshorn', 'Der Bodensee bei Romanshorn', 'Il lago di Costanza a Romanshorn'],
  lugano: ['Lugano - Luganersee & Monte San Salvatore (2013).jpg', 'JoachimKohler-HB', BY_SA4, 1067, 'Le lac de Lugano et le Monte San Salvatore, à Lugano', 'Lake Lugano and Monte San Salvatore, in Lugano', 'Der Luganersee und der Monte San Salvatore in Lugano', 'Il lago di Lugano e il Monte San Salvatore, a Lugano'],
  majeur: ['Waterfront of Ascona from lake.jpg', 'Paradise Chronicle', BY_SA4, 1067, 'Le front de lac d’Ascona, vu du lac Majeur', 'The Ascona waterfront seen from Lake Maggiore', 'Die Seepromenade von Ascona, vom Lago Maggiore aus', 'Il lungolago di Ascona visto dal lago Maggiore'],
};
// Loueurs et saunas du lac (locations.js), insérés avant la dernière section de chaque article.
const SAISON = { fr: 'de {a} à {b}', en: '{a} to {b}', de: 'von {a} bis {b}', it: 'da {a} a {b}' }, LOC = { fr: 'fr-CH', en: 'en-GB', de: 'de-CH', it: 'it-CH' };
const moisNom = (m, L) => new Date(2026, m - 1, 1).toLocaleDateString(LOC[L], { month: 'long' });
const ITEM = (l, L) => `  <li><strong><a href="${l.site ?? l.source}">${l.nom}</a></strong>, ${villeDe(l.ville, L)}${l.mois ? ` (${SAISON[L].replace('{a}', moisNom(l.mois[0], L)).replace('{b}', moisNom(l.mois[1], L))})` : ''}, ${{ fr: 'près de', en: 'near', de: 'bei', it: 'vicino a' }[L]} <a href="{plage:${l.spot}}">${SPOTS.find((x) => x.id === l.spot).nom}</a>${L === 'fr' ? ' : ' : ': '}${texteLieu(l, L, 'loc')}</li>`;
const TITRES_LOC = {
  fr: (du) => [`Louer sur l’eau ${du}`, `Saunas au bord ${du}`, 'Chaque fiche renvoie au site du loueur quand il existe. Horaires et prix changent : à confirmer auprès de lui.'],
  en: (_, N) => [`Renting on ${N}`, `Saunas on ${N}`, 'Each entry links to the operator’s own website when there is one. Hours and prices change: check with them.'],
  de: (_, N) => [`Mieten am ${N}`, `Saunas am ${N}`, 'Jeder Eintrag führt auf die Website des Anbieters, wenn es eine gibt. Öffnungszeiten und Preise ändern sich: beim Anbieter nachfragen.'],
  it: (_, N) => [`Noleggio sul ${N}`, `Saune sul ${N}`, 'Ogni scheda rimanda al sito del gestore, quando esiste. Orari e prezzi cambiano: da confermare con lui.'],
};
// Phrase datée de la valeur du matin pour le lac (une plage ou un intervalle selon les plages) ; null sans donnée récente.
const MATIN_LAC = {
  fr: (d, a, b, d3) => `Le ${d}, au matin, l’eau ${a === b ? `était à ${a}${d3 ? '' : ' pour l’ensemble du lac'}` : `allait de ${a} à ${b} selon la plage`} (70 cm sous la surface, modèle Alplakes).`,
  en: (d, a, b, d3) => `On ${d}, in the morning, the water ${a === b ? `was at ${a}${d3 ? '' : ' for the whole lake'}` : `ranged from ${a} to ${b} depending on the beach`} (70 cm below the surface, Alplakes model).`,
  de: (d, a, b, d3) => `Am ${d} lag das Wasser am Morgen ${a === b ? `bei ${a}${d3 ? '' : ' für den ganzen See'}` : `je nach Badeplatz zwischen ${a} und ${b}`} (70 cm unter der Oberfläche, Alplakes-Modell).`,
  it: (d, a, b, d3) => `Il ${d}, al mattino, l’acqua ${a === b ? `era a ${a}${d3 ? '' : ' per tutto il lago'}` : `andava da ${a} a ${b} secondo la spiaggia`} (70 cm sotto la superficie, modello Alplakes).`,
};
function matinLac(cle, L, d3) {
  const v = SPOTS.filter((s) => lacDe(s) === cle).map((s) => valeurMatin(s.id)).filter((x) => x != null);
  if (!v.length) return '';
  const [a, b] = [degMatin(Math.min(...v), L), degMatin(Math.max(...v), L)];
  return `<p class="matin">${MATIN_LAC[L](dateMatin(L), a, b, d3)}</p>\n`;
}
function loueurs(cle, L, N, du) {
  const ici = LOCATIONS.filter((l) => lacDe(SPOTS.find((x) => x.id === l.spot)) === cle);
  const loue = ici.filter((l) => l.activites.some((a) => a !== 'sauna')), sauna = ici.filter((l) => l.activites.length === 1 && l.activites[0] === 'sauna');
  const [tLoue, tSauna, note] = TITRES_LOC[L](du, N), liste = (a) => `<ul class="liste">\n${a.map((l) => ITEM(l, L)).join('\n')}\n</ul>`;
  return (loue.length ? `<h2>${tLoue}</h2>\n<p>${note}</p>\n${liste(loue)}\n` : '') + (sauna.length ? `<h2>${tSauna}</h2>\n${loue.length ? '' : `<p>${note}</p>\n`}${liste(sauna)}\n` : '');
}
const OSM = { fr: 'contributeurs OpenStreetMap', en: 'OpenStreetMap contributors', de: 'OpenStreetMap-Mitwirkende', it: 'contributori di OpenStreetMap' };

export const articlesLacs = (listePlages) => CLES.map((cle) => {
  const n = SPOTS.filter((s) => lacDe(s) === cle).length, d3 = LACS[cle].eau.modele !== 'simstrat';
  const [fichier, auteur, licence, hauteur, ...legendes] = PHOTOS[cle], LL = ['fr', 'en', 'de', 'it'];
  const a = { slug: `temperature-lac-${cle}`, lac: cle, publie: '2026-11-11', modifie: '2026-11-11', image: `blog/img/photo-${cle}.jpg`, hauteur, sources: SOURCES, auteur, licence,
    page: 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(fichier.replaceAll(' ', '_')), alt: {}, credit: {} };
  for (const L of LL) {
    const { alt, credit, html, ...t } = TEXTES[L](nomLac(cle, L), n, d3, listePlages((s) => lacDe(s) === cle, L));
    // La carte du lac, avant la liste des plages (dernier <ul class="liste"> de l'article).
    const carte = `<figure class="une"><img src="{racine}blog/img/carte-${cle}.jpg" alt="${alt}" width="1600" height="900" loading="lazy"><figcaption>${credit} © <a href="https://www.openstreetmap.org/copyright">${OSM[L]}</a>.</figcaption></figure>\n`;
    const i = html.lastIndexOf('<ul class="liste">'), avecCarte = html.slice(0, i) + carte + html.slice(i);
    const j = avecCarte.lastIndexOf('<h2>'), du = L === 'fr' ? 'du ' + nomLac(cle, L).replace(/^L/, 'l') : L === 'it' ? 'del ' + nomLac(cle, L).replace(/^Lago/, 'lago') : nomLac(cle, L);
    const complet = avecCarte.slice(0, j) + loueurs(cle, L, L === 'it' ? nomLac(cle, L).replace(/^Lago/, 'lago') : nomLac(cle, L), du) + avecCarte.slice(j);
    const k0 = complet.indexOf('<h2>'), avecMatin = complet.slice(0, k0) + matinLac(cle, L, d3) + complet.slice(k0);
    a[L] = { ...t, html: () => avecMatin }; a.alt[L] = a.credit[L] = legendes[LL.indexOf(L)];
  }
  return a;
});
