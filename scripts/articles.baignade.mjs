// Articles « Où se baigner » : un par lac (hors Léman, déjà couvert), en quatre langues.
// Chaque article assemble des données vérifiées de l'app (plages, adresses, loueurs) et quelques chiffres du lac tirés de Wikipédia
// (surface, profondeur maximale, altitude) ; un chiffre sur lequel les sources se contredisent n'est pas écrit.
import { SPOTS, LACS, lacDe, nomLac } from '../spots.js';
import { LIEUX } from '../lieux.js';
import { texteLieu, villeDe } from '../traductions.js';
import { loueurs, duLac } from './articles.lacs.mjs';
import { valeurMatin, dateMatin, degMatin } from './matin.mjs';
import { CONTOURS } from '../contours.js';

const W = (t) => `https://en.wikipedia.org/wiki/${t}`;
// [surface km², profondeur max m, altitude m, page Wikipédia] ; null = chiffre absent ou contesté entre les sources.
const FAITS = {
  neuchatel: [218.3, 152, 429, W('Lake_Neuch%C3%A2tel')], bienne: [39.3, 74, 429, W('Lake_Biel')], morat: [22.8, 45, 429, W('Lake_Morat')],
  gruyere: [9.6, 75, 677, W('Lake_of_Gruy%C3%A8re')], joux: [null, 32, 1004, W('Lac_de_Joux')], bret: [null, null, 674, W('Lac_de_Bret')],
  brenets: [0.8, null, 750, W('Lac_des_Brenets')], sion: [null, null, null, 'https://www.bourgeoisie-de-sion.ch/fr/nature/domaine-des-iles/'],
  zurich: [88.7, 136, 406, W('Lake_Zurich')], greifensee: [8.45, 32, 435, W('Greifensee_(lake)')], lucerne: [113.6, 214, 434, W('Lake_Lucerne')],
  zoug: [38.3, 197, null, W('Lake_Zug')], aegeri: [7.3, 83, 724, W('%C3%84gerisee')], hallwil: [10.3, 48, 449, W('Lake_Hallwil')],
  thoune: [48.3, 217, 558, W('Lake_Thun')], brienz: [29.8, 260, 564, W('Lake_Brienz')], sempach: [14.5, 87, 504, W('Lake_Sempach')],
  baldegg: [5.2, 66, 463, W('Lake_Baldegg')], sarnen: [7.5, 51, 469, W('Lake_Sarnen')], silvaplana: [2.7, 77, 1791, W('Lake_Silvaplana')],
  constance: [473, 251, 395, W('Obersee_(Lake_Constance)')], untersee: [63, 45, 395, W('Untersee_(Lake_Constance)')],
  lugano: [48.7, 288, 271, W('Lake_Lugano')], majeur: [212.5, 372, 193, W('Lake_Maggiore')],
};
const PARTAGE = { constance: ['Suisse, Allemagne et Autriche', 'Switzerland, Germany and Austria', 'der Schweiz, Deutschland und Österreich', 'Svizzera, Germania e Austria'], lugano: ['la Suisse et l’Italie', 'Switzerland and Italy', 'der Schweiz und Italien', 'la Svizzera e l’Italia'], majeur: ['la Suisse et l’Italie', 'Switzerland and Italy', 'der Schweiz und Italien', 'la Svizzera e l’Italia'] };
const num = (n, L) => (L === 'fr' || L === 'it' ? String(n).replace('.', ',') : String(n));
const IDX = { fr: 0, en: 1, de: 2, it: 3 };
const LIENS = { // articles du blog à relier
  zurich: ['saunas-lac-de-zurich', 'bain-d-hiver-zurich', 'saunas-flottants-bateaux-saunas-suisse'], greifensee: ['bain-d-hiver-zurich'],
  neuchatel: ['bain-d-hiver-neuchatel-bienne-morat'], bienne: ['bain-d-hiver-neuchatel-bienne-morat', 'saunas-flottants-bateaux-saunas-suisse'], morat: ['bain-d-hiver-neuchatel-bienne-morat'],
  lucerne: ['saunas-flottants-bateaux-saunas-suisse'],
};
const AVEC_TEMP = ['neuchatel', 'bienne', 'morat', 'gruyere', 'joux', 'zurich', 'lucerne', 'thoune', 'brienz', 'constance', 'lugano', 'majeur'];
const SOURCE_ALP = ['Alplakes, Eawag (CC BY 4.0)', 'https://www.alplakes.eawag.ch'];
const OSM = { fr: 'contributeurs OpenStreetMap', en: 'OpenStreetMap contributors', de: 'OpenStreetMap-Mitwirkende', it: 'contributori di OpenStreetMap' };
const APP = { fr: 'Mon Lac', en: 'My Lake', de: 'Mein See', it: 'Il mio lago' };
const LOC = { fr: 'fr-CH', en: 'en-GB', de: 'de-CH', it: 'it-CH' };
const mois = (m, L) => new Date(2026, m - 1, 1).toLocaleDateString(LOC[L], { month: 'long' });
const DE_A = { fr: 'de {a} à {b}', en: '{a} to {b}', de: 'von {a} bis {b}', it: 'da {a} a {b}' };


// DU = « du lac de X » (génitif), DANS = « dans le lac de X », SUJET = sujet de phrase, AU_BORD = « au bord du lac de X ».
const SION = { fr: ['du Domaine des Îles (Sion)', 'au Domaine des Îles (Sion)', 'Le Domaine des Îles (Sion)'], en: ['at the Domaine des Îles (Sion)', 'at the Domaine des Îles (Sion)', 'The Domaine des Îles (Sion)'],
  de: ['im Domaine des Îles (Sitten)', 'im Domaine des Îles (Sitten)', 'Das Domaine des Îles (Sitten)'], it: ['del Domaine des Îles (Sion)', 'al Domaine des Îles (Sion)', 'Il Domaine des Îles (Sion)'] };
const maj = (t) => t[0].toUpperCase() + t.slice(1);
function formes(cle, L) {
  if (cle === 'sion') { const [DU, DANS, SUJET] = SION[L]; return { DU, DANS, SUJET, AU_BORD: DU }; }
  const nom = nomLac(cle, L);
  if (L === 'fr') { const DU = duLac(cle, L), le = DU.replace(/^du /, 'le '); return { DU, DANS: 'dans ' + le, SUJET: maj(le), AU_BORD: DU }; }
  if (L === 'en') return { DU: 'on ' + nom, DANS: 'in ' + nom, SUJET: nom, AU_BORD: 'by ' + nom };
  if (L === 'de') return { DU: 'am ' + nom, DANS: 'am ' + nom, SUJET: /^Lac /.test(nom) ? nom : 'Der ' + nom, AU_BORD: 'am ' + nom };
  const DU = duLac(cle, L); return { DU, DANS: DU.replace(/^del /, 'nel '), SUJET: maj(DU.replace(/^del /, 'il ')), AU_BORD: DU.replace(/^del /, 'in riva al ').replace(/^in riva al (?!lago)/, 'in riva al ') };
}
const T = {
  fr: { titre: (F, n) => `Où se baigner ${F.DANS} : ${n > 1 ? 'les ' + n + ' plages' : 'la plage'}, avec l’eau du matin`, h1: (F) => `Où se baigner ${F.DANS} : toutes les plages`,
    desc: (F, n) => `${n > 1 ? 'Les ' + n + ' plages suivies' : 'La plage suivie'} ${F.DU} : liste complète avec la température de l’eau du matin, où manger et boire, où louer un bateau ou un paddle.`,
    aire: (a) => `couvre environ ${a} km²`, prof: (p) => `descend jusqu’à ${p} m`, haut: (z) => `se trouve à ${z} m d’altitude`, et: ' et ',
    partage: (x) => ` Ses rives sont partagées entre ${x}.`, bref: (F, n, nom) => `Mon Lac suit <strong>${n > 1 ? n + ' plages' : 'une plage'} ${F.DU}</strong>${n > 1 ? '' : ` : ${nom}`}, avec la température de l’eau à 70 cm sous la surface quand elle est calculée. Voici la liste, puis les adresses utiles autour de l’eau.`,
    hPlages: (F, n) => `${n > 1 ? 'Les ' + n + ' plages suivies' : 'La plage suivie'} ${F.DU}`, valeurs: (d) => `Entre parenthèses : la température du matin du ${d}, à 70 cm sous la surface (modèle Alplakes).`,
    hLieux: (F) => `Un verre ou un repas au bord ${F.AU_BORD.replace(/^au bord /, '')}`, saison: ' (de {a} à {b})', hAussi: 'À lire aussi', tempT: (F) => `Température de l’eau ${F.DU} : d’où viennent les chiffres`,
    sans: 'L’eau n’est pas mesurée ici : aucun modèle ne la calcule encore, et l’app préfère ne pas inventer de chiffre.', un: 'Pour ce lac, l’eau est une seule valeur pour tout le lac : les plages affichent le même chiffre.',
    alt: (F, n) => `Carte ${F.DU} avec ${n > 1 ? 'les ' + n + ' plages suivies' : 'la plage suivie'}`, credit: (F) => `Les plages suivies ${F.DU}. Carte Mon Lac` },
  en: { titre: (F, n) => `Where to swim ${F.DANS}: ${n > 2 ? 'all ' + n + ' beaches' : n === 2 ? 'both beaches' : 'the beach'}, with the morning water temperature`, h1: (F) => `Where to swim ${F.DANS}: every beach`,
    desc: (F, n) => `${n > 1 ? 'The ' + n + ' beaches' : 'The beach'} followed ${F.DU}: full list with the morning water temperature, where to eat and drink, where to rent a boat or paddleboard.`,
    aire: (a) => `covers about ${a} km²`, prof: (p) => `is up to ${p} m deep`, haut: (z) => `lies at ${z} m above sea level`, et: ' and ',
    partage: (x) => ` Its shores are shared by ${x}.`, bref: (F, n, nom) => `My Lake follows <strong>${n > 1 ? n + ' beaches' : 'one beach'} ${F.DU}</strong>${n > 1 ? '' : `: ${nom}`}, with the water temperature 70 cm below the surface where it is calculated. Here is the list, then useful places around the water.`,
    hPlages: (F, n) => `${n > 1 ? 'The ' + n + ' beaches' : 'The beach'} followed ${F.DU}`, valeurs: (d) => `In brackets: the morning temperature on ${d}, 70 cm below the surface (Alplakes model).`,
    hLieux: (F) => `A drink or a meal ${F.AU_BORD}`, saison: ' ({a} to {b})', hAussi: 'Also read', tempT: (F) => `Water temperature ${F.DU}: where the figures come from`,
    sans: 'The water is not measured here: no model calculates it yet, and the app prefers not to make up a figure.', un: 'For this lake the water is a single value for the whole lake: all beaches show the same figure.',
    alt: (F, n) => `Map ${F.DU} with the ${n > 1 ? n + ' beaches we follow' : 'beach we follow'}`, credit: (F) => `The beaches we follow ${F.DU}. Map by My Lake` },
  de: { titre: (F, n) => `Wo baden ${F.DANS}: ${n > 1 ? 'alle ' + n + ' Badeplätze' : 'der Badeplatz'}, mit dem Wasser vom Morgen`, h1: (F) => `Wo baden ${F.DANS}: alle Badeplätze`,
    desc: (F, n) => `${n > 1 ? 'Die ' + n + ' erfassten Badeplätze' : 'Der erfasste Badeplatz'} ${F.DU}: vollständige Liste mit der Wassertemperatur vom Morgen, wo man isst und trinkt, wo man ein Boot oder Paddle mietet.`,
    aire: (a) => `misst etwa ${a} km²`, prof: (p) => `ist bis zu ${p} m tief`, haut: (z) => `liegt auf ${z} m Höhe`, et: ' und ',
    partage: (x) => ` Seine Ufer teilen sich ${x}.`, bref: (F, n, nom) => `Mein See erfasst <strong>${n > 1 ? n + ' Badeplätze' : 'einen Badeplatz'} ${F.DU}</strong>${n > 1 ? '' : `: ${nom}`}, mit der Wassertemperatur in 70 cm Tiefe, wo sie berechnet wird. Hier die Liste, danach nützliche Adressen am Wasser.`,
    hPlages: (F, n) => `${n > 1 ? 'Die ' + n + ' erfassten Badeplätze' : 'Der erfasste Badeplatz'} ${F.DU}`, valeurs: (d) => `In Klammern: die Temperatur vom Morgen des ${d}, in 70 cm Tiefe (Alplakes-Modell).`,
    hLieux: (F) => `Ein Drink oder eine Mahlzeit ${F.AU_BORD}`, saison: ' (von {a} bis {b})', hAussi: 'Auch lesenswert', tempT: (F) => `Wassertemperatur ${F.DU}: woher die Zahlen kommen`,
    sans: 'Das Wasser wird hier nicht gemessen: Noch kein Modell berechnet es, und die App erfindet lieber keine Zahl.', un: 'Für diesen See gibt es einen einzigen Wert für den ganzen See: Alle Badeplätze zeigen dieselbe Zahl.',
    alt: (F, n) => `Karte ${F.DU} mit ${n > 1 ? 'den ' + n + ' erfassten Badeplätzen' : 'dem erfassten Badeplatz'}`, credit: (F) => `Die erfassten Badeplätze ${F.DU}. Karte Mein See` },
  it: { titre: (F, n) => `Dove fare il bagno ${F.DANS}: ${n > 1 ? 'le ' + n + ' spiagge' : 'la spiaggia'}, con l’acqua del mattino`, h1: (F) => `Dove fare il bagno ${F.DANS}: tutte le spiagge`,
    desc: (F, n) => `${n > 1 ? 'Le ' + n + ' spiagge seguite' : 'La spiaggia seguita'} ${F.DU}: elenco completo con la temperatura dell’acqua del mattino, dove mangiare e bere, dove noleggiare una barca o un paddle.`,
    aire: (a) => `copre circa ${a} km²`, prof: (p) => `scende fino a ${p} m`, haut: (z) => `si trova a ${z} m di altitudine`, et: ' e ',
    partage: (x) => ` Le sue rive sono condivise tra ${x}.`, bref: (F, n, nom) => `Il mio lago segue <strong>${n > 1 ? n + ' spiagge' : 'una spiaggia'} ${F.DU}</strong>${n > 1 ? '' : `: ${nom}`}, con la temperatura dell’acqua a 70 cm sotto la superficie dove è calcolata. Ecco l’elenco, poi gli indirizzi utili in riva all’acqua.`,
    hPlages: (F, n) => `${n > 1 ? 'Le ' + n + ' spiagge seguite' : 'La spiaggia seguita'} ${F.DU}`, valeurs: (d) => `Tra parentesi: la temperatura del mattino del ${d}, a 70 cm sotto la superficie (modello Alplakes).`,
    hLieux: (F) => `Un drink o un pasto ${F.AU_BORD}`, saison: ' (da {a} a {b})', hAussi: 'Da leggere anche', tempT: (F) => `Temperatura dell’acqua ${F.DU}: da dove vengono i dati`,
    sans: 'L’acqua qui non viene misurata: nessun modello la calcola ancora e l’app preferisce non inventare un valore.', un: 'Per questo lago l’acqua è un solo valore per tutto il lago: le spiagge mostrano la stessa cifra.',
    alt: (F, n) => `Mappa ${F.DU} con ${n > 1 ? 'le ' + n + ' spiagge seguite' : 'la spiaggia seguita'}`, credit: (F) => `Le spiagge seguite ${F.DU}. Mappa Il mio lago` },
};
const CONTOURS_OK = new Set(Object.keys(CONTOURS));

// Faits locaux sourcés, lac par lac : entrée et saison des bains (prix et dates de la saison 2026, relevés le 13 novembre 2026) et accès. À mettre à jour chaque printemps.
const LOCAUX = {
 "morat": {
  "src": [
   [
    "BLS, Strandbad Murten",
    "https://www.bls.ch/en/freizeit-und-ferien/ausfluege/badeplatz-strandbad-murten"
   ],
   [
    "badi-info.ch, Strandbad Murten",
    "https://www.badi-info.ch/a/murten.html"
   ],
   [
    "freizeit.ch, Hallen- und Strandbad Murten",
    "https://www.freizeit.ch/freizeit/hallen-und-strandbad-in-murten/"
   ],
   [
    "Hallen-, Schwimm- und Strandbad Murten, billets",
    "https://www.schwimmbad-murten.ch/de/hallenbad-ticket-erwachsen"
   ]
  ],
  "fr": [
   "<strong>Strandbad Murten</strong> (Lausannestrasse 2) : ouvert du 9 mai au 20 septembre 2026, avec une grande saison de 9 h à 21 h du 30 mai au 30 août ; entrée adulte à 8 francs ; plage de sable sur le lac. Depuis la gare de Morat, il faut compter environ 7 minutes à pied."
  ],
  "en": [
   "<strong>Strandbad Murten</strong> (Lausannestrasse 2): open 9 May to 20 September 2026, with a main season of 9am to 9pm from 30 May to 30 August; adult entry CHF 8; sandy beach on the lake. From Murten station, allow about 7 minutes on foot."
  ],
  "de": [
   "<strong>Strandbad Murten</strong> (Lausannestrasse 2): geöffnet vom 9. Mai bis 20. September 2026, mit Hauptsaison von 9 bis 21 Uhr vom 30. Mai bis 30. August; Eintritt Erwachsene CHF 8; Sandstrand am See. Vom Bahnhof Murten sind es etwa 7 Minuten zu Fuss."
  ],
  "it": [
   "<strong>Strandbad Murten</strong> (Lausannestrasse 2): aperto dal 9 maggio al 20 settembre 2026, con alta stagione dalle 9 alle 21 dal 30 maggio al 30 agosto; ingresso adulti 8 franchi; spiaggia di sabbia sul lago. Dalla stazione di Morat ci vogliono circa 7 minuti a piedi."
  ]
 },
 "bienne": {
  "src": [
   [
    "badi-info.ch, Strandbad Biel",
    "https://www.badi-info.ch/be/biel-strandbad.html"
   ],
   [
    "freizeit.ch, Strandbad Biel",
    "https://www.freizeit.ch/freizeit/25841/strandbad-biel"
   ]
  ],
  "fr": [
   "<strong>Strandbad Biel</strong> (Uferweg 40, Nidau) : saison 2026 du 9 mai au 13 septembre ; entrée adulte à 5 francs, 4 francs en tarif réduit (étudiants, apprentis, AVS)."
  ],
  "en": [
   "<strong>Strandbad Biel</strong> (Uferweg 40, Nidau): 2026 season from 9 May to 13 September; adult entry CHF 5, CHF 4 reduced (students, apprentices, pensioners)."
  ],
  "de": [
   "<strong>Strandbad Biel</strong> (Uferweg 40, Nidau): Saison 2026 vom 9. Mai bis 13. September; Eintritt Erwachsene CHF 5, ermässigt CHF 4 (Studierende, Lehrlinge, AHV)."
  ],
  "it": [
   "<strong>Strandbad Biel</strong> (Uferweg 40, Nidau): stagione 2026 dal 9 maggio al 13 settembre; ingresso adulti 5 franchi, ridotto 4 franchi (studenti, apprendisti, AVS)."
  ]
 },
 "neuchatel": {
  "src": [
   [
    "Torpille, plages du lac de Neuchâtel",
    "https://torpille.ch/plages-lac-neuchatel/"
   ],
   [
    "Kidora, plage des Jeunes-Rives",
    "https://kidora.ch/activites/plage-des-jeunes-rives-neuchatel"
   ]
  ],
  "fr": [
   "Les plages du lac sont pour la plupart gratuites ; seuls les bains avec piscine (Serrières, Nid-du-Crô) sont payants, d’après l’annuaire Torpille.",
   "<strong>Jeunes-Rives</strong> : plage urbaine gratuite, avec douches, toilettes et pelouses, à environ 5 minutes à pied de la gare, d’après Kidora."
  ],
  "en": [
   "Most of the lake’s beaches are free; only the baths with a pool (Serrières, Nid-du-Crô) charge, according to the Torpille directory.",
   "<strong>Jeunes-Rives</strong>: a free city beach with showers, toilets and lawns, about 5 minutes’ walk from the station, according to Kidora."
  ],
  "de": [
   "Die meisten Strände am See sind gratis; nur die Bäder mit Schwimmbecken (Serrières, Nid-du-Crô) kosten Eintritt, laut dem Verzeichnis Torpille.",
   "<strong>Jeunes-Rives</strong>: gratis Stadtstrand mit Duschen, WC und Wiesen, etwa 5 Gehminuten vom Bahnhof, laut Kidora."
  ],
  "it": [
   "La maggior parte delle spiagge del lago è gratuita; solo i bagni con piscina (Serrières, Nid-du-Crô) sono a pagamento, secondo l’elenco Torpille.",
   "<strong>Jeunes-Rives</strong>: spiaggia urbana gratuita con docce, servizi e prati, a circa 5 minuti a piedi dalla stazione, secondo Kidora."
  ]
 },
 "zurich": {
  "src": [
   [
    "badi-info.ch, Seebad Utoquai",
    "https://www.badi-info.ch/Utoquai.html"
   ],
   [
    "badi-info.ch, Seebad Kilchberg",
    "https://www.badi-info.ch/zh/kilchberg-strandbad.html"
   ],
   [
    "badi-info.ch, Seebad Zollikon",
    "https://www.badi-info.ch/zh/zollikon-seebad.html"
   ],
   [
    "badi-info.ch, Strandbad Oberrieden",
    "https://www.badi-info.ch/zh/oberrieden-strandbad.html"
   ],
   [
    "badi-info.ch, Seebad Richterswil",
    "https://www.badi-info.ch/zh/richterswil-strandbad.html"
   ]
  ],
  "fr": [
   "<strong>Seebad Utoquai</strong> : saison 2026 du 11 avril au 25 octobre, entrée adulte à 8 francs (carte de 12 entrées : 80 francs).",
   "Autres bains de la rive en 2026, entrée adulte : Kilchberg 6 francs (du 1er mai au 20 septembre), Zollikon 6 francs (du 1er mai au 13 septembre), Oberrieden 5 francs (du 10 mai au 20 septembre), Richterswil 5 francs."
  ],
  "en": [
   "<strong>Seebad Utoquai</strong>: 2026 season from 11 April to 25 October, adult entry CHF 8 (12-entry card: CHF 80).",
   "Other lakeside baths in 2026, adult entry: Kilchberg CHF 6 (1 May to 20 September), Zollikon CHF 6 (1 May to 13 September), Oberrieden CHF 5 (10 May to 20 September), Richterswil CHF 5."
  ],
  "de": [
   "<strong>Seebad Utoquai</strong>: Saison 2026 vom 11. April bis 25. Oktober, Eintritt Erwachsene CHF 8 (12er-Karte: CHF 80).",
   "Weitere Seebäder 2026, Eintritt Erwachsene: Kilchberg CHF 6 (1. Mai bis 20. September), Zollikon CHF 6 (1. Mai bis 13. September), Oberrieden CHF 5 (10. Mai bis 20. September), Richterswil CHF 5."
  ],
  "it": [
   "<strong>Seebad Utoquai</strong>: stagione 2026 dall’11 aprile al 25 ottobre, ingresso adulti 8 franchi (carta da 12 ingressi: 80 franchi).",
   "Altri bagni sul lago nel 2026, ingresso adulti: Kilchberg 6 franchi (dal 1° maggio al 20 settembre), Zollikon 6 franchi (dal 1° maggio al 13 settembre), Oberrieden 5 franchi (dal 10 maggio al 20 settembre), Richterswil 5 franchi."
  ]
 },
 "lucerne": {
  "src": [
   [
    "Seebad Luzern, prix",
    "https://www.seebadluzern.ch/das-bad/preise/"
   ],
   [
    "badi-info.ch, Seebad Luzern",
    "https://www.badi-info.ch/lu/luzern-seebad.html"
   ],
   [
    "Lido Luzern, prix",
    "https://new.lido-luzern.ch/zeiten_preise/preise/"
   ]
  ],
  "fr": [
   "<strong>Seebad Luzern</strong> : ouvert dès le 1er mai, saison en principe jusqu’au Bettag (20 septembre 2026), fermé par mauvais temps ; entrée adulte à 8 francs, 4 francs pour les 6 à 15 ans.",
   "<strong>Lido Luzern</strong> (établissement distinct, payant) : entrée adulte à 8 francs en semaine et 10 francs le week-end ; 5 francs pour les moins de 16 ans, gratuit pour les moins de 6 ans."
  ],
  "en": [
   "<strong>Seebad Luzern</strong>: open from 1 May, season normally until Bettag (20 September 2026), closed in bad weather; adult entry CHF 8, CHF 4 for ages 6 to 15.",
   "<strong>Lido Luzern</strong> (a separate, paid facility): adult entry CHF 8 on weekdays and CHF 10 at weekends; CHF 5 under 16, free under 6."
  ],
  "de": [
   "<strong>Seebad Luzern</strong>: ab 1. Mai geöffnet, Saison in der Regel bis zum Bettag (20. September 2026), bei schlechtem Wetter geschlossen; Eintritt Erwachsene CHF 8, Jugendliche von 6 bis 15 Jahren CHF 4.",
   "<strong>Lido Luzern</strong> (eigene, kostenpflichtige Anlage): Eintritt Erwachsene CHF 8 unter der Woche und CHF 10 am Wochenende; unter 16 Jahren CHF 5, unter 6 Jahren gratis."
  ],
  "it": [
   "<strong>Seebad Luzern</strong>: aperto dal 1° maggio, stagione in genere fino al Bettag (20 settembre 2026), chiuso con il maltempo; ingresso adulti 8 franchi, 4 franchi dai 6 ai 15 anni.",
   "<strong>Lido Luzern</strong> (struttura distinta, a pagamento): ingresso adulti 8 franchi nei giorni feriali e 10 nel fine settimana; 5 franchi sotto i 16 anni, gratis sotto i 6."
  ]
 },
 "thoune": {
  "src": [
   [
    "Stadt Thun, début de la saison",
    "https://www.thun.ch/medienmitteilungen/2838523"
   ],
   [
    "freizeit.ch, Strandbad Thun",
    "https://www.freizeit.ch/freizeit/25836/strandbad-thun"
   ],
   [
    "Sportbetriebe Thun, entrées",
    "https://sportwebshop.thun.ch/de/einzeleintritte"
   ]
  ],
  "fr": [
   "<strong>Strandbad Thun</strong> : saison 2026 du 2 mai au 20 septembre, ouvert tous les jours de 7 h à 20 h jusqu’au 31 août, puis jusqu’à 19 h en septembre ; entrée adulte à 7 francs, 5 francs pour apprentis et seniors, 3 francs pour les enfants."
  ],
  "en": [
   "<strong>Strandbad Thun</strong>: 2026 season from 2 May to 20 September, open daily 7am to 8pm until 31 August, then until 7pm in September; adult entry CHF 7, CHF 5 for apprentices and seniors, CHF 3 for children."
  ],
  "de": [
   "<strong>Strandbad Thun</strong>: Saison 2026 vom 2. Mai bis 20. September, bis 31. August täglich von 7 bis 20 Uhr, im September bis 19 Uhr; Eintritt Erwachsene CHF 7, Lernende und Senioren CHF 5, Kinder CHF 3."
  ],
  "it": [
   "<strong>Strandbad Thun</strong>: stagione 2026 dal 2 maggio al 20 settembre, aperto ogni giorno dalle 7 alle 20 fino al 31 agosto, poi fino alle 19 a settembre; ingresso adulti 7 franchi, 5 franchi per apprendisti e anziani, 3 franchi per i bambini."
  ]
 },
 "lugano": {
  "src": [
   [
    "Città di Lugano, Lido di Lugano",
    "https://www.lugano.ch/vivere-lugano/cultura-e-tempo-libero/lidi-e-piscine/lido-lugano/"
   ],
   [
    "Città di Lugano, Lido Riva Caccia",
    "https://www.lugano.ch/vivere-lugano/cultura-e-tempo-libero/lidi-e-piscine/lido-riva-caccia/"
   ]
  ],
  "fr": [
   "<strong>Lido di Lugano</strong> : d’après la Ville, entrée adulte à 11 francs, 7 francs pour les jeunes jusqu’à 20 ans, étudiants, AVS et AI, 3,50 francs jusqu’à 13 ans (la page ne dit pas pour quelle saison ces tarifs valent).",
   "<strong>Lido Riva Caccia</strong> : d’après la Ville, ouvert du 25 mai au 20 septembre 2026, entrée adulte à 15 francs."
  ],
  "en": [
   "<strong>Lido di Lugano</strong>: according to the City, adult entry CHF 11, CHF 7 for young people up to 20, students and pensioners, CHF 3.50 up to age 13 (the page does not say which season these prices apply to).",
   "<strong>Lido Riva Caccia</strong>: according to the City, open from 25 May to 20 September 2026, adult entry CHF 15."
  ],
  "de": [
   "<strong>Lido di Lugano</strong>: laut der Stadt Eintritt Erwachsene CHF 11, CHF 7 für Jugendliche bis 20 Jahre, Studierende, AHV und IV, CHF 3.50 bis 13 Jahre (die Seite sagt nicht, für welche Saison diese Preise gelten).",
   "<strong>Lido Riva Caccia</strong>: laut der Stadt vom 25. Mai bis 20. September 2026 geöffnet, Eintritt Erwachsene CHF 15."
  ],
  "it": [
   "<strong>Lido di Lugano</strong>: secondo la Città, ingresso adulti 11 franchi, 7 franchi per giovani fino a 20 anni, studenti, AVS e AI, 3,50 franchi fino a 13 anni (la pagina non dice per quale stagione valgano questi prezzi).",
   "<strong>Lido Riva Caccia</strong>: secondo la Città, aperto dal 25 maggio al 20 settembre 2026, ingresso adulti 15 franchi."
  ]
 },
 "majeur": {
  "src": [
   [
    "Lido Locarno, tarifs d’été 2026",
    "https://www.lidolocarno.ch/media/502754/tarifs-summer-2026.pdf"
   ],
   [
    "Lido Locarno, horaires d’été 2026",
    "https://www.lidolocarno.ch/it/news/news-detail/id/5827/orari-di-apertura-estate-2026"
   ]
  ],
  "fr": [
   "<strong>Lido Locarno</strong> : tarifs d’été 2026 : piscines à 13 francs pour un adulte, piscines et toboggans à 18 francs ; 7 francs pour les enfants de 3 à 15 ans (piscines), gratuit pour les moins de 3 ans. Les horaires changent au fil de la saison : voir le site du lido."
  ],
  "en": [
   "<strong>Lido Locarno</strong>: summer 2026 prices: pools CHF 13 for an adult, pools and water slides CHF 18; CHF 7 for children aged 3 to 15 (pools), free under 3. Hours change through the season: see the lido’s website."
  ],
  "de": [
   "<strong>Lido Locarno</strong>: Sommertarife 2026: Schwimmbecken CHF 13 für Erwachsene, Becken und Rutschbahnen CHF 18; CHF 7 für Kinder von 3 bis 15 Jahren (Becken), gratis unter 3 Jahren. Die Öffnungszeiten wechseln im Lauf der Saison: siehe Website des Lidos."
  ],
  "it": [
   "<strong>Lido Locarno</strong>: tariffe estive 2026: piscine 13 franchi per un adulto, piscine e scivoli 18 franchi; 7 franchi per i bambini da 3 a 15 anni (piscine), gratis sotto i 3 anni. Gli orari cambiano nel corso della stagione: vedi il sito del lido."
  ]
 },
 "zoug": {
  "src": [
   [
    "badi-info.ch, Strandbad Zug",
    "https://www.badi-info.ch/a/zug-strandbad.html"
   ],
   [
    "Zuger Zeitung, Badis im Kanton Zug",
    "https://www.zugerzeitung.ch/zentralschweiz/zug/badis-im-kanton-zug-oeffnungszeiten-preise-kinderfreundlichkeit-ld.4164965"
   ],
   [
    "nau.ch, nouveau Strandbad Zug",
    "https://www.nau.ch/ort/zug/doppelt-so-viel-platz-neues-strandbad-ist-bereit-fur-die-saison-67125935"
   ]
  ],
  "fr": [
   "<strong>Strandbad Zug</strong> : entrée gratuite ; saison 2026 du 9 mai au 20 septembre, surveillance de 9 h à 19 h 30. La Ville de Zoug indique que tous ses bains restent gratuits, d’après nau.ch.",
   "<strong>Cham</strong> (Strandbad) : entrée gratuite. <strong>Buonas</strong> (Seebad Wildenmann) : entrée payante, 3 francs pour un adulte et 2 francs pour les 6 à 15 ans, d’après la Zuger Zeitung (tarif d’un article dont nous n’avons pas la date)."
  ],
  "en": [
   "<strong>Strandbad Zug</strong>: free entry; 2026 season from 9 May to 20 September, lifeguards from 9am to 7.30pm. The City of Zug says all its baths stay free, according to nau.ch.",
   "<strong>Cham</strong> (Strandbad): free entry. <strong>Buonas</strong> (Seebad Wildenmann): paid entry, CHF 3 for an adult and CHF 2 for ages 6 to 15, according to the Zuger Zeitung (prices from an article whose date we do not have)."
  ],
  "de": [
   "<strong>Strandbad Zug</strong>: freier Eintritt; Saison 2026 vom 9. Mai bis 20. September, Badeaufsicht von 9 bis 19.30 Uhr. Die Stadt Zug sagt, dass alle ihre Badis gratis bleiben, laut nau.ch.",
   "<strong>Cham</strong> (Strandbad): freier Eintritt. <strong>Buonas</strong> (Seebad Wildenmann): kostenpflichtig, Erwachsene CHF 3, Kinder von 6 bis 15 Jahren CHF 2, laut Zuger Zeitung (Preise aus einem Artikel, dessen Datum uns fehlt)."
  ],
  "it": [
   "<strong>Strandbad Zug</strong>: ingresso gratuito; stagione 2026 dal 9 maggio al 20 settembre, sorveglianza dalle 9 alle 19.30. La Città di Zugo afferma che tutti i suoi bagni restano gratuiti, secondo nau.ch.",
   "<strong>Cham</strong> (Strandbad): ingresso gratuito. <strong>Buonas</strong> (Seebad Wildenmann): a pagamento, 3 franchi per un adulto e 2 franchi dai 6 ai 15 anni, secondo la Zuger Zeitung (tariffe di un articolo di cui non abbiamo la data)."
  ]
 },
 "constance": {
  "src": [
   [
    "Stadt Arbon, tarifs 2026",
    "https://www.arbon.ch/public/upload/assets/258/Tarife_Schwimmbad_und_Strandbad_2026.pdf?fp=4"
   ],
   [
    "badi-info.ch, Strandbad Buchhorn, Arbon",
    "https://www.badi-info.ch/tg/strandbad-arbon.html"
   ],
   [
    "Thurgauer Zeitung, prix du Seebad Romanshorn",
    "https://www.thurgauerzeitung.ch/ostschweiz/oberthurgau/seebad-romanshorn-erhoehung-der-badi-preise-ld.4140188"
   ],
   [
    "badi-info.ch, Seebad Romanshorn",
    "https://www.badi-info.ch/tg/romanshorn.html"
   ]
  ],
  "fr": [
   "<strong>Strandbad Buchhorn, Arbon</strong> : tarif 2026 de la Ville, entrée adulte à 8 francs, 4 francs pour les enfants et élèves ; ouvert de 10 h à 19 h jusqu’au 7 juin, puis de 9 h à 20 h du 8 juin au 9 août (badi-info.ch).",
   "<strong>Seebad Romanshorn</strong> : entrée adulte à 10 francs depuis la hausse (8 francs avant), 5 francs pour les enfants."
  ],
  "en": [
   "<strong>Strandbad Buchhorn, Arbon</strong>: the town’s 2026 prices, adult entry CHF 8, CHF 4 for children and pupils; open 10am to 7pm until 7 June, then 9am to 8pm from 8 June to 9 August (badi-info.ch).",
   "<strong>Seebad Romanshorn</strong>: adult entry CHF 10 since the increase (it was CHF 8), CHF 5 for children."
  ],
  "de": [
   "<strong>Strandbad Buchhorn, Arbon</strong>: Tarif 2026 der Stadt, Eintritt Erwachsene CHF 8, Kinder und Schüler CHF 4; bis 7. Juni von 10 bis 19 Uhr geöffnet, danach vom 8. Juni bis 9. August von 9 bis 20 Uhr (badi-info.ch).",
   "<strong>Seebad Romanshorn</strong>: Eintritt Erwachsene CHF 10 seit der Erhöhung (vorher CHF 8), Kinder CHF 5."
  ],
  "it": [
   "<strong>Strandbad Buchhorn, Arbon</strong>: tariffe 2026 della città, ingresso adulti 8 franchi, 4 franchi per bambini e scolari; aperto dalle 10 alle 19 fino al 7 giugno, poi dalle 9 alle 20 dall’8 giugno al 9 agosto (badi-info.ch).",
   "<strong>Seebad Romanshorn</strong>: ingresso adulti 10 franchi dopo l’aumento (prima 8 franchi), 5 franchi per i bambini."
  ]
 },
 "untersee": {
  "src": [
   [
    "badi-info.ch, Strandbad Ermatingen",
    "https://www.badi-info.ch/tg/ermatingen.html"
   ],
   [
    "Gemeinde Ermatingen, Strandbad",
    "https://www.ermatingen.ch/de/Leben-am-Untersee/See,-Hafen/Strandbad"
   ]
  ],
  "fr": [
   "<strong>Strandbad Ermatingen</strong> : entrée gratuite ; saison 2026 du 10 mai au 20 septembre, ouvert de 10 h à 22 h d’après badi-info.ch (la page de la commune ne donne que la saison 2025, également à entrée libre)."
  ],
  "en": [
   "<strong>Strandbad Ermatingen</strong>: free entry; 2026 season from 10 May to 20 September, open 10am to 10pm according to badi-info.ch (the municipality’s page only gives the 2025 season, also free)."
  ],
  "de": [
   "<strong>Strandbad Ermatingen</strong>: freier Eintritt; Saison 2026 vom 10. Mai bis 20. September, laut badi-info.ch von 10 bis 22 Uhr geöffnet (die Gemeindeseite nennt nur die Saison 2025, ebenfalls mit freiem Eintritt)."
  ],
  "it": [
   "<strong>Strandbad Ermatingen</strong>: ingresso gratuito; stagione 2026 dal 10 maggio al 20 settembre, aperto dalle 10 alle 22 secondo badi-info.ch (la pagina del comune riporta solo la stagione 2025, anch’essa a ingresso libero)."
  ]
 },
 "hallwil": {
  "src": [
   [
    "badi-info.ch, Strandbad Seerose Meisterschwanden",
    "https://www.badi-info.ch/a/meisterschwanden.html"
   ],
   [
    "freizeit.ch, Strandbad Seerose",
    "https://www.freizeit.ch/freizeit/25854/strandbad-seerose"
   ],
   [
    "Gemeinde Meisterschwanden, Strandbad Seerose",
    "https://www.meisterschwanden.ch/tourismus/strandbaeder/strandbad-seerose.html/209"
   ]
  ],
  "fr": [
   "<strong>Strandbad Seerose</strong> (Meisterschwanden) : entrée adulte à 7 francs, 2 francs pour les 6 à 16 ans ; ouvert dès le 23 avril 2026 par beau temps, de 11 h à 19 h en mai, puis de 9 h au coucher du soleil de juin à septembre ; entrée libre pour les seuls clients du restaurant. Le car postal part des gares de Wohlen et de Lenzburg jusqu’à Meisterschwanden Oberdorf."
  ],
  "en": [
   "<strong>Strandbad Seerose</strong> (Meisterschwanden): adult entry CHF 7, CHF 2 for ages 6 to 16; open from 23 April 2026 in fine weather, 11am to 7pm in May, then from 9am to sunset from June to September; free entry for restaurant-only visitors. The PostBus runs from Wohlen and Lenzburg stations to Meisterschwanden Oberdorf."
  ],
  "de": [
   "<strong>Strandbad Seerose</strong> (Meisterschwanden): Eintritt Erwachsene CHF 7, Kinder von 6 bis 16 Jahren CHF 2; bei schönem Wetter ab 23. April 2026 geöffnet, im Mai von 11 bis 19 Uhr, von Juni bis September ab 9 Uhr bis Sonnenuntergang; Eintritt frei für reine Restaurantbesucher. Das Postauto fährt ab den Bahnhöfen Wohlen und Lenzburg bis Meisterschwanden Oberdorf."
  ],
  "it": [
   "<strong>Strandbad Seerose</strong> (Meisterschwanden): ingresso adulti 7 franchi, 2 franchi dai 6 ai 16 anni; aperto dal 23 aprile 2026 con bel tempo, dalle 11 alle 19 a maggio, poi dalle 9 al tramonto da giugno a settembre; ingresso libero per chi va solo al ristorante. L’autopostale parte dalle stazioni di Wohlen e Lenzburg fino a Meisterschwanden Oberdorf."
  ]
 },
 "sempach": {
  "src": [
   [
    "Gemeinde Nottwil, Seebad",
    "https://www.nottwil.ch/de/verwaltung/dienstleistungen/282_seebad"
   ],
   [
    "badi-info.ch, Seebad Nottwil",
    "https://www.badi-info.ch/lu/nottwil-seebad.html"
   ],
   [
    "Trechter, accès libre au lac de Sempach",
    "https://trechter.ch/freier_zugang_sempachersee/"
   ]
  ],
  "fr": [
   "<strong>Seebad Nottwil</strong> : entrée gratuite ; saison 2026 du 3 avril au 27 septembre, prolongée par beau temps selon la commune ; de 13 h à 18 h d’avril à la mi-mai, puis de 9 h à 22 h jusqu’en septembre (badi-info.ch). Plage de sable, kiosque et restaurant en saison, pas de parking sur place.",
   "Accès libre au lac aussi à <strong>Schenkon</strong> (Gmeindsplätzli) et à <strong>Sempach</strong> (Seeallee, où l’on se baigne à ses risques), d’après Trechter."
  ],
  "en": [
   "<strong>Seebad Nottwil</strong>: free entry; 2026 season from 3 April to 27 September, extended in fine weather according to the municipality; 1pm to 6pm from April to mid-May, then 9am to 10pm until September (badi-info.ch). Sandy beach, kiosk and restaurant in season, no parking on site.",
   "Free access to the lake also at <strong>Schenkon</strong> (Gmeindsplätzli) and <strong>Sempach</strong> (Seeallee, where you swim at your own risk), according to Trechter."
  ],
  "de": [
   "<strong>Seebad Nottwil</strong>: freier Eintritt; Saison 2026 vom 3. April bis 27. September, bei schönem Wetter laut Gemeinde verlängerbar; von April bis Mitte Mai 13 bis 18 Uhr, danach 9 bis 22 Uhr bis September (badi-info.ch). Sandstrand, Kiosk und Restaurant in der Saison, keine Parkplätze vor Ort.",
   "Freier Zugang zum See auch beim <strong>Gmeindsplätzli Schenkon</strong> und in der <strong>Seeallee Sempach</strong> (Baden auf eigene Gefahr), laut Trechter."
  ],
  "it": [
   "<strong>Seebad Nottwil</strong>: ingresso gratuito; stagione 2026 dal 3 aprile al 27 settembre, prolungabile con bel tempo secondo il comune; dalle 13 alle 18 da aprile a metà maggio, poi dalle 9 alle 22 fino a settembre (badi-info.ch). Spiaggia di sabbia, chiosco e ristorante in stagione, nessun parcheggio sul posto.",
   "Accesso libero al lago anche a <strong>Schenkon</strong> (Gmeindsplätzli) e a <strong>Sempach</strong> (Seeallee, dove si fa il bagno a proprio rischio), secondo Trechter."
  ]
 },
 "baldegg": {
  "src": [
   [
    "badi-info.ch, Seebad Baldegg",
    "https://www.badi-info.ch/lu/baldegg-seebad.html"
   ],
   [
    "Gemeinde Hochdorf, Seebad Baldegg",
    "https://www.hochdorf.ch/freizeit/sport/seebad-baldegg.html/262/l/de"
   ],
   [
    "badi-info.ch, Seebad Gelfingen",
    "https://www.badi-info.ch/lu/gelfingen.html"
   ]
  ],
  "fr": [
   "<strong>Seebad Baldegg</strong> : saison 2026 du 10 mai au 13 septembre ; entrée adulte à 6 francs, 3 francs pour les enfants nés de 2010 à 2020, gratuit pour les enfants nés dès 2021. Les horaires de fermeture varient selon les sources : voir le site du bain.",
   "<strong>Seebad Gelfingen</strong> : entrée gratuite, toujours accessible, surveillé seulement par moments (badi-info.ch) ; pelouse, plongeoir de 3 m, radeau, place de grill, vestiaires et WC."
  ],
  "en": [
   "<strong>Seebad Baldegg</strong>: 2026 season from 10 May to 13 September; adult entry CHF 6, CHF 3 for children born 2010 to 2020, free for children born from 2021. Closing times differ between sources: see the bath’s website.",
   "<strong>Seebad Gelfingen</strong>: free entry, always accessible, supervised only part of the time (badi-info.ch); lawn, 3 m diving tower, raft, barbecue spot, changing rooms and toilets."
  ],
  "de": [
   "<strong>Seebad Baldegg</strong>: Saison 2026 vom 10. Mai bis 13. September; Eintritt Erwachsene CHF 6, Kinder Jahrgang 2010 bis 2020 CHF 3, Kinder ab Jahrgang 2021 gratis. Die Schliesszeiten weichen je nach Quelle ab: siehe Website des Bads.",
   "<strong>Seebad Gelfingen</strong>: freier Eintritt, immer zugänglich, nur zeitweise beaufsichtigt (badi-info.ch); Liegewiese, 3-m-Sprungturm, Floss, Grillstelle, Umkleideräume und WC."
  ],
  "it": [
   "<strong>Seebad Baldegg</strong>: stagione 2026 dal 10 maggio al 13 settembre; ingresso adulti 6 franchi, 3 franchi per i bambini nati dal 2010 al 2020, gratis per i nati dal 2021. Gli orari di chiusura variano secondo le fonti: vedi il sito del bagno.",
   "<strong>Seebad Gelfingen</strong>: ingresso gratuito, sempre accessibile, sorvegliato solo a tratti (badi-info.ch); prato, trampolino da 3 m, zattera, griglia, spogliatoi e servizi."
  ]
 },
 "sarnen": {
  "src": [
   [
    "badi-info.ch, Frei- und Seebad Sarnen",
    "https://www.badi-info.ch/a/sarnen.html"
   ],
   [
    "Seefeld Park Sarnen, prix",
    "https://www.seefeldpark.ch/preise/"
   ]
  ],
  "fr": [
   "<strong>Seebad Sarnen</strong> (Seefeld Park) : saison 2026 du 25 avril au 20 septembre ; entrée adulte à 8 francs, 4 francs pour les 6 à 15 ans, 6 francs pour apprentis et étudiants, 6 francs le soir dès 17 h. Les horaires varient selon les sources : voir le site du parc."
  ],
  "en": [
   "<strong>Seebad Sarnen</strong> (Seefeld Park): 2026 season from 25 April to 20 September; adult entry CHF 8, CHF 4 for ages 6 to 15, CHF 6 for apprentices and students, CHF 6 in the evening from 5pm. Hours differ between sources: see the park’s website."
  ],
  "de": [
   "<strong>Seebad Sarnen</strong> (Seefeld Park): Saison 2026 vom 25. April bis 20. September; Eintritt Erwachsene CHF 8, Kinder von 6 bis 15 Jahren CHF 4, Lernende und Studierende CHF 6, abends ab 17 Uhr CHF 6. Die Öffnungszeiten weichen je nach Quelle ab: siehe Website des Parks."
  ],
  "it": [
   "<strong>Seebad Sarnen</strong> (Seefeld Park): stagione 2026 dal 25 aprile al 20 settembre; ingresso adulti 8 franchi, 4 franchi dai 6 ai 15 anni, 6 franchi per apprendisti e studenti, 6 franchi la sera dalle 17. Gli orari variano secondo le fonti: vedi il sito del parco."
  ]
 },
 "greifensee": {
  "src": [
   [
    "badi-info.ch, Strandbad Furren",
    "https://www.badi-info.ch/furren.html"
   ],
   [
    "freizeit.ch, Strandbad Uster",
    "https://www.freizeit.ch/freizeit/25852/strandbad-uster"
   ],
   [
    "badi-info.ch, Strandbad Maur",
    "https://www.badi-info.ch/zh/maur-strandbad.html"
   ],
   [
    "nau.ch, Badi Maur",
    "https://www.nau.ch/news/schweiz/badi-maur-zh-fehlt-aufsicht-und-ist-nun-gratis-67141271"
   ]
  ],
  "fr": [
   "<strong>Furren</strong> : petit bain gratuit avec vestiaires, WC, douche froide et grill (badi-info.ch).",
   "<strong>Strandbad Uster</strong> : saison 2026 dès le 9 mai ; entrée adulte à 6,50 francs, 3,50 francs dès 6 ans ; de 9 h à 20 h 30 en mai, jusqu’à 19 h en septembre.",
   "<strong>Strandbad Maur</strong> : entrée gratuite depuis juillet 2026. Dans une annonce du 23 juin 2026, la commune dit que l’exploitant ne peut plus assurer ni l’exploitation ni la surveillance des bains : la situation a pu changer depuis, à vérifier auprès de la commune."
  ],
  "en": [
   "<strong>Furren</strong>: a small free bath with changing rooms, toilets, a cold shower and a grill (badi-info.ch).",
   "<strong>Strandbad Uster</strong>: 2026 season from 9 May; adult entry CHF 6.50, CHF 3.50 from age 6; 9am to 8.30pm in May, until 7pm in September.",
   "<strong>Strandbad Maur</strong>: free entry since July 2026. In a notice of 23 June 2026 the municipality says the operator can no longer ensure either operation or lifeguard supervision: the situation may have changed since, check with the municipality."
  ],
  "de": [
   "<strong>Furren</strong>: kleines Gratis-Seebad mit Garderobe, WC, Kaltwasserdusche und Grill (badi-info.ch).",
   "<strong>Strandbad Uster</strong>: Saison 2026 ab 9. Mai; Eintritt Erwachsene CHF 6.50, Kinder ab 6 Jahren CHF 3.50; im Mai von 9 bis 20.30 Uhr, im September bis 19 Uhr.",
   "<strong>Strandbad Maur</strong>: freier Eintritt seit Juli 2026. In einer Mitteilung vom 23. Juni 2026 schreibt die Gemeinde, dass der Pächter weder den Badebetrieb noch die Badeaufsicht gewährleisten kann: Die Lage kann sich seither geändert haben, bei der Gemeinde nachfragen."
  ],
  "it": [
   "<strong>Furren</strong>: piccolo bagno gratuito con spogliatoi, servizi, doccia fredda e griglia (badi-info.ch).",
   "<strong>Strandbad Uster</strong>: stagione 2026 dal 9 maggio; ingresso adulti 6,50 franchi, 3,50 franchi dai 6 anni; dalle 9 alle 20.30 a maggio, fino alle 19 a settembre.",
   "<strong>Strandbad Maur</strong>: ingresso gratuito da luglio 2026. In un avviso del 23 giugno 2026 il comune dice che il gestore non può più garantire né l’esercizio né la sorveglianza dei bagni: la situazione può essere cambiata da allora, da verificare con il comune."
  ]
 },
 "brienz": {
  "src": [
   [
    "badi-info.ch, Strandbad Bönigen",
    "https://www.badi-info.ch/be/boenigen.html"
   ],
   [
    "freizeit.ch, Strandbad Brienz",
    "https://www.freizeit.ch/freizeit/19287/strandbad-brienz"
   ],
   [
    "badi-info.ch, Strandbad Iseltwald",
    "https://www.badi-info.ch/be/iseltwald.html"
   ],
   [
    "badi-info.ch, Strandbad Niederried",
    "https://www.badi-info.ch/be/niederried-strandbad.html"
   ]
  ],
  "fr": [
   "<strong>Bönigen</strong> (payant) : saison 2026 du 16 mai au 13 septembre ; adulte 6 francs, 4 francs de 6 à 15 ans, tarif de fin de journée dès 17 h (3,50 francs adulte).",
   "<strong>Brienz</strong> (payant) : du 1er mai au 15 septembre 2026, tous les jours de 11 h à 21 h ; adulte dès 16 ans 6 francs, 4 francs dès 6 ans, gratuit en dessous.",
   "<strong>Iseltwald</strong> et <strong>Niederried</strong> : entrée gratuite. À Niederried, le bain est toujours accessible et sans surveillance ; Iseltwald est ouvert dès le 9 mai 2026 (les horaires varient selon les sources)."
  ],
  "en": [
   "<strong>Bönigen</strong> (paid): 2026 season from 16 May to 13 September; adult CHF 6, CHF 4 for ages 6 to 15, evening rate from 5pm (adult CHF 3.50).",
   "<strong>Brienz</strong> (paid): 1 May to 15 September 2026, daily 11am to 9pm; adult from age 16 CHF 6, CHF 4 from age 6, free below that.",
   "<strong>Iseltwald</strong> and <strong>Niederried</strong>: free entry. At Niederried the bathing spot is always accessible and unsupervised; Iseltwald opens from 9 May 2026 (hours differ between sources)."
  ],
  "de": [
   "<strong>Bönigen</strong> (kostenpflichtig): Saison 2026 vom 16. Mai bis 13. September; Erwachsene CHF 6, Kinder von 6 bis 15 Jahren CHF 4, Feierabendtarif ab 17 Uhr (Erwachsene CHF 3.50).",
   "<strong>Brienz</strong> (kostenpflichtig): 1. Mai bis 15. September 2026, täglich von 11 bis 21 Uhr; Erwachsene ab 16 Jahren CHF 6, Kinder ab 6 Jahren CHF 4, darunter gratis.",
   "<strong>Iseltwald</strong> und <strong>Niederried</strong>: freier Eintritt. In Niederried ist das Seebädli immer zugänglich und ohne Badeaufsicht; Iseltwald ist ab 9. Mai 2026 geöffnet (die Zeiten weichen je nach Quelle ab)."
  ],
  "it": [
   "<strong>Bönigen</strong> (a pagamento): stagione 2026 dal 16 maggio al 13 settembre; adulti 6 franchi, 4 franchi dai 6 ai 15 anni, tariffa serale dalle 17 (adulti 3,50 franchi).",
   "<strong>Brienz</strong> (a pagamento): dal 1° maggio al 15 settembre 2026, ogni giorno dalle 11 alle 21; adulti dai 16 anni 6 franchi, 4 franchi dai 6 anni, gratis sotto.",
   "<strong>Iseltwald</strong> e <strong>Niederried</strong>: ingresso gratuito. A Niederried il bagno è sempre accessibile e senza sorveglianza; Iseltwald apre dal 9 maggio 2026 (gli orari variano secondo le fonti)."
  ]
 },
 "aegeri": {
  "src": [
   [
    "Ägeribad, Strandbad",
    "https://www.aegeribad.ch/schwimmen/Strandbad.html"
   ],
   [
    "badi-info.ch, Ägeribad",
    "https://www.badi-info.ch/a/aegeribad.html"
   ],
   [
    "badi-info.ch, Lido Unterägeri",
    "https://www.badi-info.ch/a/unteraegeri.html"
   ]
  ],
  "fr": [
   "<strong>Ägeribad</strong> (Oberägeri) : l’accès au lac est gratuit d’après badi-info.ch ; saison de la plage du 10 mai au 20 septembre 2026 (site du bain).",
   "<strong>Lido Unterägeri</strong> : saison 2026 du 9 mai au 20 septembre ; adulte 5 francs, 3,50 francs pour jeunes et étudiants, 2,50 francs de 6 à 16 ans ; ferme à 18 h le 1er août ; radeau et plongeoirs de 1, 3 et 5 m ; bus jusqu’à l’arrêt Unterägeri Seefeld, parking gratuit."
  ],
  "en": [
   "<strong>Ägeribad</strong> (Oberägeri): lake access is free according to badi-info.ch; beach season from 10 May to 20 September 2026 (the bath’s website).",
   "<strong>Lido Unterägeri</strong>: 2026 season from 9 May to 20 September; adult CHF 5, CHF 3.50 for young people and students, CHF 2.50 for ages 6 to 16; closes at 6pm on 1 August; raft and diving boards at 1, 3 and 5 m; bus to the Unterägeri Seefeld stop, free parking."
  ],
  "de": [
   "<strong>Ägeribad</strong> (Oberägeri): Der Zugang zum See ist laut badi-info.ch kostenlos; Strandbad-Saison vom 10. Mai bis 20. September 2026 (Website des Bads).",
   "<strong>Lido Unterägeri</strong>: Saison 2026 vom 9. Mai bis 20. September; Erwachsene CHF 5, Jugendliche und Studierende CHF 3.50, Kinder von 6 bis 16 Jahren CHF 2.50; am 1. August schliesst es um 18 Uhr; Floss und Sprungturm mit 1, 3 und 5 m; Bus bis Haltestelle Unterägeri Seefeld, Parkplätze kostenlos."
  ],
  "it": [
   "<strong>Ägeribad</strong> (Oberägeri): l’accesso al lago è gratuito secondo badi-info.ch; stagione della spiaggia dal 10 maggio al 20 settembre 2026 (sito del bagno).",
   "<strong>Lido Unterägeri</strong>: stagione 2026 dal 9 maggio al 20 settembre; adulti 5 franchi, 3,50 franchi per giovani e studenti, 2,50 franchi dai 6 ai 16 anni; chiude alle 18 il 1° agosto; zattera e trampolini da 1, 3 e 5 m; autobus fino alla fermata Unterägeri Seefeld, parcheggio gratuito."
  ]
 },
 "gruyere": {
  "src": [
   [
    "Torpille, plages du lac de la Gruyère",
    "https://torpille.ch/plages-lac-gruyere/"
   ],
   [
    "Kidora, plage de La Roche",
    "https://kidora.ch/activites/plage-de-la-roche"
   ]
  ],
  "fr": [
   "D’après les annuaires Torpille et Kidora, les plages du lac sont gratuites : à La Roche, l’accès est libre et seuls la location nautique et la buvette sont payantes ; Corbières et Morlon sont aussi en accès libre.",
   "Aucune source consultée ne mentionne de surveillance de baignade, et certaines zones du lac sont réglementées : la baignade n’est pas autorisée partout. À vérifier auprès des communes."
  ],
  "en": [
   "According to the Torpille and Kidora directories, the lake’s beaches are free: at La Roche access is open and only the boat rental and the kiosk charge; Corbières and Morlon are also free to enter.",
   "None of the sources consulted mentions lifeguard supervision, and some areas of the lake are regulated: swimming is not allowed everywhere. Check with the municipalities."
  ],
  "de": [
   "Laut den Verzeichnissen Torpille und Kidora sind die Strände am See gratis: In La Roche ist der Zugang frei, nur Bootsvermietung und Kiosk kosten; auch Corbières und Morlon sind frei zugänglich.",
   "Keine der konsultierten Quellen nennt eine Badeaufsicht, und einzelne Bereiche des Sees sind reglementiert: Baden ist nicht überall erlaubt. Bei den Gemeinden nachfragen."
  ],
  "it": [
   "Secondo gli elenchi Torpille e Kidora, le spiagge del lago sono gratuite: a La Roche l’accesso è libero e solo il noleggio nautico e il chiosco sono a pagamento; anche Corbières e Morlon sono ad accesso libero.",
   "Nessuna fonte consultata menziona una sorveglianza dei bagnanti e alcune zone del lago sono regolamentate: non si può fare il bagno ovunque. Da verificare con i comuni."
  ]
 },
 "joux": {
  "src": [
   [
    "Kidora, plage du Rocheray",
    "https://kidora.ch/activites/plage-du-rocheray-lac-de-joux"
   ],
   [
    "Kidora, plage du Pont",
    "https://kidora.ch/activites/plage-du-pont-lac-de-joux"
   ],
   [
    "Torpille, plages du lac de Joux",
    "https://torpille.ch/plages-lac-joux/"
   ]
  ],
  "fr": [
   "D’après Kidora et Torpille, les plages du lac de Joux sont gratuites et en accès libre (au Rocheray, seuls les locations nautiques et la petite restauration sont payantes), accessibles toute l’année.",
   "La baignade n’est pas surveillée sur ces plages : gardez les jeunes enfants à l’œil au bord de l’eau."
  ],
  "en": [
   "According to Kidora and Torpille, the beaches on Lac de Joux are free and open (at the Rocheray, only boat rental and snacks are paid), accessible all year.",
   "Swimming is not supervised on these beaches: keep an eye on young children at the water’s edge."
  ],
  "de": [
   "Laut Kidora und Torpille sind die Strände am Lac de Joux gratis und frei zugänglich (am Rocheray kosten nur Bootsvermietung und kleine Verpflegung), das ganze Jahr.",
   "Das Baden ist an diesen Stränden nicht beaufsichtigt: Kleine Kinder am Wasser im Auge behalten."
  ],
  "it": [
   "Secondo Kidora e Torpille, le spiagge del Lac de Joux sono gratuite e ad accesso libero (al Rocheray solo il noleggio nautico e la ristorazione leggera sono a pagamento), accessibili tutto l’anno.",
   "La balneazione non è sorvegliata su queste spiagge: tenete d’occhio i bambini piccoli a bordo acqua."
  ]
 },
 "bret": {
  "src": [
   [
    "État de Vaud, projet de classement du lac de Bret (rapport explicatif)",
    "https://www.vd.ch/fileadmin/user_upload/themes/environnement/biodiversite/fichiers_doc/Chasse/DC_LdB_Rap_explicatif.pdf"
   ]
  ],
  "fr": [
   "Le lac de Bret est une réserve d’eau potable et un site naturel sensible : aucune zone de baignade publique aménagée n’apparaît dans les sources officielles consultées.",
   "Un projet de classement publié en 2025 par l’État de Vaud prévoit d’interdire la baignade et les engins nautiques dans le secteur protégé du nord du lac, pour ne pas déranger la faune. Je n’ai pas pu confirmer s’il est entré en vigueur : renseignez-vous sur place avant de vous baigner."
  ],
  "en": [
   "Lac de Bret is a drinking-water reserve and a sensitive natural site: no developed public bathing area appears in the official sources consulted.",
   "A classification project published in 2025 by the Canton of Vaud plans to ban swimming and watercraft in the protected northern part of the lake, so as not to disturb wildlife. We could not confirm whether it has come into force: check locally before swimming."
  ],
  "de": [
   "Der Lac de Bret ist ein Trinkwasserreservoir und ein empfindliches Naturgebiet: In den konsultierten offiziellen Quellen erscheint keine eingerichtete öffentliche Badezone.",
   "Ein 2025 vom Kanton Waadt veröffentlichtes Schutzprojekt sieht vor, Baden und Wasserfahrzeuge im geschützten Nordteil des Sees zu verbieten, um die Tierwelt nicht zu stören. Ob es in Kraft getreten ist, konnten wir nicht bestätigen: Vor dem Baden vor Ort nachfragen."
  ],
  "it": [
   "Il Lac de Bret è una riserva di acqua potabile e un sito naturale sensibile: nelle fonti ufficiali consultate non compare alcuna zona di balneazione pubblica attrezzata.",
   "Un progetto di classificazione pubblicato nel 2025 dal Canton Vaud prevede di vietare la balneazione e le imbarcazioni nel settore protetto a nord del lago, per non disturbare la fauna. Non ho potuto confermare se sia entrato in vigore: informatevi sul posto prima di fare il bagno."
  ]
 },
 "sion": {
  "src": [
   [
    "Discovr, Domaine des Îles",
    "https://discovr.ch/fr/places/domaine-iles/"
   ],
   [
    "Alpvision, Domaine des Îles",
    "https://www.alpvisionresidences.com/blog/fr/domaine-des-iles/"
   ],
   [
    "Bourgeoisie de Sion, Domaine des Îles",
    "https://www.bourgeoisie-de-sion.ch/fr/nature/domaine-des-iles/"
   ]
  ],
  "fr": [
   "Le domaine, géré par la Bourgeoisie de Sion, est décrit comme gratuit et en accès libre toute l’année (Discovr).",
   "Une baignade surveillée par des sauveteurs est annoncée surtout de mai à septembre (Alpvision, page d’il y a environ un an) : nous n’avons pas de confirmation pour 2026, à demander à la Bourgeoisie."
  ],
  "en": [
   "The estate, run by the Bourgeoisie of Sion, is described as free and open all year (Discovr).",
   "Lifeguard-supervised swimming is announced mainly from May to September (Alpvision, a page about a year old): we have no confirmation for 2026, ask the Bourgeoisie."
  ],
  "de": [
   "Das von der Burgergemeinde Sitten verwaltete Gelände wird als gratis und das ganze Jahr frei zugänglich beschrieben (Discovr).",
   "Beaufsichtigtes Baden wird vor allem von Mai bis September angekündigt (Alpvision, eine rund ein Jahr alte Seite): Für 2026 haben wir keine Bestätigung, bei der Burgergemeinde nachfragen."
  ],
  "it": [
   "La tenuta, gestita dalla Borghesia di Sion, è descritta come gratuita e ad accesso libero tutto l’anno (Discovr).",
   "La balneazione sorvegliata da bagnini è annunciata soprattutto da maggio a settembre (Alpvision, una pagina di circa un anno fa): non abbiamo conferma per il 2026, da chiedere alla Borghesia."
  ]
 },
 "silvaplana": {
  "src": [
   [
    "schweizersee.ch, Silvaplanersee",
    "https://www.schweizersee.ch/silvaplanersee/"
   ],
   [
    "Silvaplana Tourismus, Badesee",
    "https://silvaplana.ch/sommer/erleben/badesee-schwimmen"
   ]
  ],
  "fr": [
   "Le lac est librement accessible et n’est jamais surveillé ; les sports nautiques se pratiquent à ses propres risques, uniquement depuis les accès officiels (plage du centre de surf, extrémité du port côté camping, plage du camping), d’après schweizersee.ch.",
   "Parking payant à Mulets et au pont de Surlej. Nous n’avons trouvé aucun droit d’entrée pour se baigner."
  ],
  "en": [
   "The lake is freely accessible and never supervised; water sports are at your own risk, only from the official access points (the surf centre beach, the campsite end of the harbour, the campsite beach), according to schweizersee.ch.",
   "Paid parking at Mulets and the Surlej bridge. We found no entry fee for swimming."
  ],
  "de": [
   "Der See ist frei zugänglich und zu keiner Zeit überwacht; Wassersport erfolgt auf eigene Gefahr, nur von den offiziellen Zugängen aus (Strand beim Surf Center, Hafenende auf der Campingseite, Strand des Campingplatzes), laut schweizersee.ch.",
   "Parkplätze kostenpflichtig bei Mulets und an der Surlej-Brücke. Einen Eintritt zum Baden haben wir nicht gefunden."
  ],
  "it": [
   "Il lago è liberamente accessibile e mai sorvegliato; gli sport nautici si praticano a proprio rischio, solo dagli accessi ufficiali (spiaggia del centro surf, estremità del porto lato campeggio, spiaggia del campeggio), secondo schweizersee.ch.",
   "Parcheggio a pagamento a Mulets e al ponte di Surlej. Non ho trovato alcun ingresso a pagamento per fare il bagno."
  ]
 }
};
const T_LOCAL = { fr: ['Entrée, saison et accès', 'Prix et dates relevés le 13 novembre 2026 sur les sources ci-dessous, pour la saison 2026 : à confirmer sur le site de chaque bain avant d’y aller.'], en: ['Entry, season and access', 'Prices and dates collected on 13 November 2026 from the sources below, for the 2026 season: check each baths’ website before you go.'], de: ['Eintritt, Saison und Anreise', 'Preise und Daten vom 13. November 2026 aus den unten genannten Quellen, für die Saison 2026: vor dem Besuch auf der Website des Bads prüfen.'], it: ['Ingresso, stagione e accesso', 'Prezzi e date rilevati il 13 novembre 2026 dalle fonti qui sotto, per la stagione 2026: da verificare sul sito di ogni bagno prima di andare.'] };
export const articlesBaignade = () => Object.keys(LACS).filter((c) => c !== 'leman').map((cle) => {
  const plages = SPOTS.filter((s) => lacDe(s) === cle), n = plages.length, [aire, prof, alt, src] = FAITS[cle], lieux = LIEUX.filter((x) => x.zone === cle);
  const a = { slug: `plages-lac-${cle}`, lac: cle, publie: '2026-11-12', modifie: '2026-11-12', image: `blog/img/plages-${cle}.jpg`, hauteur: 900, alt: {}, credit: {}, creditHtml: {},
    sources: [[`Wikipedia, ${nomLac(cle, 'en')}`, src], SOURCE_ALP, ['OpenStreetMap, contours et plages (ODbL)', 'https://www.openstreetmap.org/copyright']] };
  if (LOCAUX[cle]) a.sources.push(...LOCAUX[cle].src);
  if (LOCAUX[cle]) a.modifie = '2026-11-13';
  if (cle === 'sion') a.sources[0] = ['Bourgeoisie de Sion, Domaine des Îles', src];
  for (const L of ['fr', 'en', 'de', 'it']) {
    const t = T[L], F = formes(cle, L), sep = L === 'fr' ? ' : ' : ': ';
    const faits = [aire != null && t.aire(num(aire, L)), prof != null && t.prof(prof), alt != null && t.haut(alt)].filter(Boolean);
    let intro = faits.length ? `${F.SUJET} ${faits.length > 1 ? faits.slice(0, -1).join(', ') + t.et + faits.at(-1) : faits[0]}.` : '';
    if (PARTAGE[cle]) intro += t.partage(PARTAGE[cle][IDX[L]]);
    if (cle === 'sion') intro = { fr: 'Le Domaine des Îles est un domaine de 53,5 hectares au bord du Rhône, avec un lac né d’une ancienne gravière.', en: 'The Domaine des Îles is a 53.5-hectare estate on the Rhône, with a lake that began as a former gravel pit.', de: 'Das Domaine des Îles ist ein 53,5 Hektar grosses Gelände an der Rhone, mit einem See, der aus einer ehemaligen Kiesgrube entstanden ist.', it: 'Il Domaine des Îles è una tenuta di 53,5 ettari sul Rodano, con un lago nato da un’ex cava di ghiaia.' }[L];
    const valeurs = plages.map((s) => [s, valeurMatin(s.id)]), avecValeur = valeurs.some(([, v]) => v != null);
    const liste = `<ul class="liste">\n${valeurs.map(([s, v]) => `  <li><a href="{plage:${s.id}}">${s.nom}</a>${v != null ? ` (${degMatin(v, L)})` : ''}</li>`).join('\n')}\n</ul>`;
    const modele = LACS[cle].eau ? (LACS[cle].eau.modele === 'simstrat' ? t.un : '') : t.sans;
    const lieuxHtml = lieux.length ? `<h2>${t.hLieux(F)}</h2>\n<ul class="liste">\n${lieux.map((x) => `  <li><strong>${x.nom}</strong>, ${villeDe(x.ville, L)}${x.mois ? t.saison.replace('{a}', mois(x.mois[0], L)).replace('{b}', mois(x.mois[1], L)) : ''}${sep}${texteLieu(x, L)}</li>`).join('\n')}\n</ul>\n` : '';
    const aussi = [AVEC_TEMP.includes(cle) && `temperature-lac-${cle}`, ...(LIENS[cle] ?? [])].filter(Boolean);
    const aussiHtml = aussi.length ? `<h2>${t.hAussi}</h2>\n<ul class="liste">\n${aussi.map((sl) => `  <li><a href="{blog:${sl}}">${sl.startsWith('temperature') ? t.tempT(F) : `{titre:${sl}}`}</a></li>`).join('\n')}\n</ul>\n` : '';
    const html = `${intro ? `<p>${intro}</p>\n` : ''}<h2>${t.hPlages(F, n)}</h2>\n${avecValeur ? `<p>${t.valeurs(dateMatin(L))}</p>\n` : ''}${liste}\n${modele ? `<p>${modele}</p>\n` : ''}${LOCAUX[cle] ? `<h2>${T_LOCAL[L][0]}</h2>\n<p>${T_LOCAL[L][1]}</p>\n<ul class="liste">\n${LOCAUX[cle][L].map((x) => `  <li>${x}</li>`).join('\n')}\n</ul>\n` : ''}${lieuxHtml}${loueurs(cle, L, L === 'it' ? nomLac(cle, L).replace(/^Lago/, 'lago') : nomLac(cle, L), duLac(cle, L))}${aussiHtml}`;
    a[L] = { titre: t.titre(F, n), h1: t.h1(F), desc: t.desc(F, n), bref: t.bref(F, n, plages[0].nom), html: () => html };
    a.alt[L] = t.alt(F, n); a.credit[L] = t.credit(F);
    a.creditHtml[L] = t.credit(F) + (CONTOURS_OK.has(cle) ? `, © <a href="https://www.openstreetmap.org/copyright">${OSM[L]}</a>.` : '.');
  }
  return a;
});
