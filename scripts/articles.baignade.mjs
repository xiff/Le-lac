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

export const articlesBaignade = () => Object.keys(LACS).filter((c) => c !== 'leman').map((cle) => {
  const plages = SPOTS.filter((s) => lacDe(s) === cle), n = plages.length, [aire, prof, alt, src] = FAITS[cle], lieux = LIEUX.filter((x) => x.zone === cle);
  const a = { slug: `plages-lac-${cle}`, lac: cle, publie: '2026-11-12', modifie: '2026-11-12', image: `blog/img/plages-${cle}.jpg`, hauteur: 900, alt: {}, credit: {}, creditHtml: {},
    sources: [[`Wikipedia, ${nomLac(cle, 'en')}`, src], SOURCE_ALP, ['OpenStreetMap, contours et plages (ODbL)', 'https://www.openstreetmap.org/copyright']] };
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
    const html = `${intro ? `<p>${intro}</p>\n` : ''}<h2>${t.hPlages(F, n)}</h2>\n${avecValeur ? `<p>${t.valeurs(dateMatin(L))}</p>\n` : ''}${liste}\n${modele ? `<p>${modele}</p>\n` : ''}${lieuxHtml}${loueurs(cle, L, L === 'it' ? nomLac(cle, L).replace(/^Lago/, 'lago') : nomLac(cle, L), duLac(cle, L))}${aussiHtml}`;
    a[L] = { titre: t.titre(F, n), h1: t.h1(F), desc: t.desc(F, n), bref: t.bref(F, n, plages[0].nom), html: () => html };
    a.alt[L] = t.alt(F, n); a.credit[L] = t.credit(F);
    a.creditHtml[L] = t.credit(F) + (CONTOURS_OK.has(cle) ? `, © <a href="https://www.openstreetmap.org/copyright">${OSM[L]}</a>.` : '.');
  }
  return a;
});
