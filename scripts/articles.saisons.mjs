// Température de l'eau mois par mois (saisons.json, scripts/saisons.mjs : Alplakes, modèle Simstrat, 2023 à 2025).
// 1) un tableau ajouté aux articles « température » existants ; 2) un article par lac qui n'en a pas ; 3) un comparatif « quel lac pour quel mois ».
import { readFileSync, existsSync } from 'node:fs';
import { SPOTS, lacDe, nomLac } from '../spots.js';
import { LOCATIONS } from '../locations.js';
import { ITEM } from './articles.lacs.mjs';

// Image d'hiver propre au lac (blog/img/ia/hiver-<lac>.jpg), sinon l'image générique.
const imgHiver = (nom) => (existsSync(new URL(`../blog/img/ia/hiver-${nom}.jpg`, import.meta.url)) ? `hiver-${nom}` : 'gen-hiver');
const S = (() => { try { return JSON.parse(readFileSync(new URL('../saisons.json', import.meta.url), 'utf8')); } catch { return { lacs: {} }; } })();
const SRC = ['Alplakes, Eawag (CC BY 4.0), modèle Simstrat', 'https://www.alplakes.eawag.ch'];
const LS = ['fr', 'en', 'de', 'it'], LOC = { fr: 'fr-CH', en: 'en-GB', de: 'de-CH', it: 'it-CH' };
const mois = (m, L) => new Date(2026, m, 1).toLocaleDateString(LOC[L], { month: 'long' });
const deg = (v, L) => `${v.toLocaleString(LOC[L], { minimumFractionDigits: 1, maximumFractionDigits: 1 })} °C`;
const T = {
  fr: { h: 'Mois par mois', cols: ['Mois', 'Moyenne', 'Jour le plus froid', 'Jour le plus chaud'], note: (a) => `Moyennes journalières à 70 cm sous la surface, une valeur pour tout le lac, années ${a} (modèle Simstrat d’Alplakes, Eawag). Près du bord et par beau temps, l’eau peut être plus chaude.`, quand: (m, n) => `En moyenne, l’eau dépasse 20 °C ${n ? `de ${m[0]} à ${m[1]}` : 'aucun mois'}.`, jamais: 'En moyenne, l’eau ne dépasse 20 °C aucun mois.' },
  en: { h: 'Month by month', cols: ['Month', 'Average', 'Coldest day', 'Warmest day'], note: (a) => `Daily averages 70 cm below the surface, one value for the whole lake, years ${a} (Alplakes Simstrat model, Eawag). Near the shore and in sunny weather the water can be warmer.`, quand: (m) => `On average the water is above 20 °C from ${m[0]} to ${m[1]}.`, jamais: 'On average the water does not exceed 20 °C in any month.' },
  de: { h: 'Monat für Monat', cols: ['Monat', 'Mittel', 'Kältester Tag', 'Wärmster Tag'], note: (a) => `Tagesmittel 70 cm unter der Oberfläche, ein Wert für den ganzen See, Jahre ${a} (Simstrat-Modell von Alplakes, Eawag). In Ufernähe und bei Sonne kann das Wasser wärmer sein.`, quand: (m) => `Im Mittel liegt das Wasser von ${m[0]} bis ${m[1]} über 20 °C.`, jamais: 'Im Mittel übersteigt das Wasser in keinem Monat 20 °C.' },
  it: { h: 'Mese per mese', cols: ['Mese', 'Media', 'Giorno più freddo', 'Giorno più caldo'], note: (a) => `Medie giornaliere a 70 cm sotto la superficie, un valore per tutto il lago, anni ${a} (modello Simstrat di Alplakes, Eawag). Vicino a riva e con il sole l’acqua può essere più calda.`, quand: (m) => `In media l’acqua supera i 20 °C da ${m[0]} a ${m[1]}.`, jamais: 'In media l’acqua non supera i 20 °C in nessun mese.' } };
const annees = () => `${S.annees?.[0]}–${S.annees?.at(-1)}`;
const vingt = (m, L) => { const i = m.map((x, k) => (x.moy >= 20 ? k : -1)).filter((k) => k >= 0); return i.length ? T[L].quand([mois(i[0], L), mois(i.at(-1), L)], true) : T[L].jamais; };
const tableau = (lac, L) => {
  const m = S.lacs[lac], t = T[L];
  return `<p>${vingt(m, L)}</p>\n<table class="tableau"><thead><tr>${t.cols.map((c) => `<th>${c}</th>`).join('')}</tr></thead><tbody>\n${m.map((x, i) => `<tr><td>${mois(i, L)}</td><td>${deg(x.moy, L)}</td><td>${deg(x.min, L)}</td><td>${deg(x.max, L)}</td></tr>`).join('\n')}\n</tbody></table>\n<p>${t.note(annees())}</p>`;
};

// 1) Articles « température » existants : le tableau est inséré avant le dernier paragraphe.
export function ajouterSaisons(articles) {
  for (const a of articles) {
    const lac = a.slug.match(/^temperature-lac-(.+)$/)?.[1];
    if (!lac || !S.lacs[lac] || a.sources?.includes(SRC)) continue; // les articles créés ici ont déjà leur tableau
    a.sources = [...(a.sources ?? []), SRC];
    if (!a.modifie || a.modifie < '2026-11-21') a.modifie = '2026-11-21';
    for (const L of LS) {
      if (!a[L]?.html) continue;
      const h = a[L].html;
      a[L] = { ...a[L], html: (l) => { const s = h(l), b = `<h2>${T[L].h}</h2>\n${tableau(lac, L)}\n`, i = s.lastIndexOf('<p>'); return i > 0 ? s.slice(0, i) + b + s.slice(i) : s + b; } };
    }
  }
}

const P = (t) => `<p>${t}</p>`;
const TX = {
  fr: { titre: (n) => `Température de l’eau du ${n.replace(/^Lac/, 'lac')} mois par mois : quand se baigner`, h1: (n) => `${n} : la température de l’eau, mois par mois`, desc: (n) => `Température moyenne de l’eau du ${n.replace(/^Lac/, 'lac')} pour chaque mois, avec le jour le plus froid et le plus chaud, d’après le modèle Alplakes (2023 à 2025).`, plages: 'Les plages suivies par Mon Lac', fin: 'La température du jour, plage par plage, est dans l’<a href="{app}">app Mon Lac</a>.' },
  en: { titre: (n) => `${n} water temperature month by month: when to swim`, h1: (n) => `${n}: water temperature, month by month`, desc: (n) => `Average water temperature of ${n} for each month, with the coldest and warmest day, from the Alplakes model (2023 to 2025).`, plages: 'Beaches followed by My Lake', fin: 'Today’s temperature, beach by beach, is in the <a href="{app}">My Lake app</a>.' },
  de: { titre: (n) => `Wassertemperatur ${n} Monat für Monat: wann baden`, h1: (n) => `${n}: die Wassertemperatur Monat für Monat`, desc: (n) => `Mittlere Wassertemperatur ${n} für jeden Monat, mit kältestem und wärmstem Tag, nach dem Alplakes-Modell (2023 bis 2025).`, plages: 'Badeplätze bei Mein See', fin: 'Die Temperatur von heute, Badeplatz für Badeplatz, steht in der <a href="{app}">App Mein See</a>.' },
  it: { titre: (n) => `Temperatura dell’acqua del ${n.replace(/^Lago/, 'lago')} mese per mese: quando fare il bagno`, h1: (n) => `${n}: la temperatura dell’acqua, mese per mese`, desc: (n) => `Temperatura media dell’acqua del ${n.replace(/^Lago/, 'lago')} per ogni mese, con il giorno più freddo e più caldo, dal modello Alplakes (2023–2025).`, plages: 'Spiagge seguite da Il mio lago', fin: 'La temperatura di oggi, spiaggia per spiaggia, è nell’<a href="{app}">app Il mio lago</a>.' } };

// 2) Un article par lac sans article « température ».
export const articlesSaisons = (dejaFaits) => {
  const out = [];
  for (const lac of Object.keys(S.lacs)) {
    if (dejaFaits.has(`temperature-lac-${lac}`)) continue;
    const pl = SPOTS.filter((s) => lacDe(s) === lac), a = { slug: `temperature-lac-${lac}`, sante: false, img: 'gen-temp', altIA: LS.map((L) => ({ fr: `Un thermomètre flottant sur l’eau calme du ${nomLac(lac, 'fr')}`, en: `A floating thermometer on the calm water of ${nomLac(lac, 'en')}`, de: `Ein schwimmendes Thermometer auf dem ruhigen Wasser, ${nomLac(lac, 'de')}`, it: `Un termometro galleggiante sull’acqua calma, ${nomLac(lac, 'it')}` })[L]), sources: [SRC] };
    for (const L of LS) {
      const n = nomLac(lac, L), x = TX[L], m = S.lacs[lac];
      const ete = Math.max(...m.map((v) => v.moy)), iMax = m.findIndex((v) => v.moy === ete);
      const bref = { fr: `Au ${n.replace(/^Lac/, 'lac')}, l’eau est la plus chaude en <strong>${mois(iMax, L)}</strong> : <strong>${deg(ete, L)}</strong> en moyenne. ${vingt(m, L)}`, en: `On ${n}, the water is warmest in <strong>${mois(iMax, L)}</strong>: <strong>${deg(ete, L)}</strong> on average. ${vingt(m, L)}`, de: `Im ${n} ist das Wasser im <strong>${mois(iMax, L)}</strong> am wärmsten: <strong>${deg(ete, L)}</strong> im Mittel. ${vingt(m, L)}`, it: `Sul ${n.replace(/^Lago/, 'lago')} l’acqua è più calda a <strong>${mois(iMax, L)}</strong>: <strong>${deg(ete, L)}</strong> in media. ${vingt(m, L)}` }[L];
      a[L] = { titre: x.titre(n), h1: x.h1(n), desc: x.desc(n), bref, html: () => `<h2>${T[L].h}</h2>\n${tableau(lac, L)}\n${pl.length ? `<h2>${x.plages}</h2>\n<ul class="liste">\n${pl.map((s) => `  <li><a href="{plage:${s.id}}">${s.nom}</a></li>`).join('\n')}\n</ul>\n` : ''}${P(x.fin)}` };
    }
    out.push(a);
  }
  return out;
};
export const LACS_SAISONS = () => Object.keys(S.lacs);

// 3) Comparatif : pour chaque mois d'été, les lacs classés du plus chaud au plus froid.
const TC = {
  fr: { titre: 'Quel lac suisse pour quel mois ? La température de l’eau de juin à septembre', h1: 'Les lacs suisses les plus chauds, mois par mois', desc: 'De juin à septembre, les lacs suisses classés du plus chaud au plus froid d’après la température moyenne de l’eau (modèle Alplakes, 2023 à 2025).', bref: (a, b, c) => `En juillet, le lac le plus chaud est en moyenne le <strong>${a}</strong> (${c}), le plus froid le <strong>${b}</strong>. Le classement change d’un mois à l’autre : voici juin, juillet, août et septembre.` },
  en: { titre: 'Which Swiss lake for which month? Water temperature from June to September', h1: 'The warmest Swiss lakes, month by month', desc: 'From June to September, Swiss lakes ranked from warmest to coldest by average water temperature (Alplakes model, 2023 to 2025).', bref: (a, b, c) => `In July the warmest lake on average is <strong>${a}</strong> (${c}), the coldest <strong>${b}</strong>. The ranking changes from month to month: here are June, July, August and September.` },
  de: { titre: 'Welcher Schweizer See in welchem Monat? Die Wassertemperatur von Juni bis September', h1: 'Die wärmsten Schweizer Seen, Monat für Monat', desc: 'Von Juni bis September die Schweizer Seen vom wärmsten zum kältesten, nach mittlerer Wassertemperatur (Alplakes-Modell, 2023 bis 2025).', bref: (a, b, c) => `Im Juli ist im Mittel der <strong>${a}</strong> am wärmsten (${c}), der <strong>${b}</strong> am kältesten. Die Rangliste ändert sich von Monat zu Monat: hier Juni, Juli, August und September.` },
  it: { titre: 'Quale lago svizzero per quale mese? La temperatura dell’acqua da giugno a settembre', h1: 'I laghi svizzeri più caldi, mese per mese', desc: 'Da giugno a settembre, i laghi svizzeri dal più caldo al più freddo secondo la temperatura media dell’acqua (modello Alplakes, 2023–2025).', bref: (a, b, c) => `A luglio il lago più caldo è in media il <strong>${a}</strong> (${c}), il più freddo il <strong>${b}</strong>. La classifica cambia di mese in mese: ecco giugno, luglio, agosto e settembre.` } };
export const articleComparatif = () => {
  const lacs = Object.keys(S.lacs);
  if (lacs.length < 5) return [];
  const a = { slug: 'quel-lac-pour-quel-mois', sante: false, img: 'comparatif-mois', altIA: ['Une rangée de thermomètres colorés devant plusieurs lacs suisses stylisés', 'A row of coloured thermometers in front of several stylised Swiss lakes', 'Eine Reihe bunter Thermometer vor mehreren stilisierten Schweizer Seen', 'Una fila di termometri colorati davanti a diversi laghi svizzeri stilizzati'], sources: [SRC] };
  for (const L of LS) {
    const tri = (i) => [...lacs].sort((p, q) => S.lacs[q][i].moy - S.lacs[p][i].moy);
    const j = tri(6);
    const blocs = [5, 6, 7, 8].map((i) => `<h2>${mois(i, L)[0].toUpperCase() + mois(i, L).slice(1)}</h2>\n<ol class="liste">\n${tri(i).map((l) => `  <li><strong>${nomLac(l, L)}</strong> : ${deg(S.lacs[l][i].moy, L)}</li>`).join('\n')}\n</ol>`).join('\n');
    a[L] = { titre: TC[L].titre, h1: TC[L].h1, desc: TC[L].desc, bref: TC[L].bref(...[j[0], j.at(-1)].map((l) => nomLac(l, L).replace(/^(Lac|Lago)/, (x) => x.toLowerCase())), deg(S.lacs[j[0]][6].moy, L)), html: () => `${blocs}\n<p>${T[L].note(annees())}</p>` };
  }
  return [a];
};

// 4) Bain d'hiver par lac (hors Léman, Zurich, Neuchâtel, Bienne et Morat, déjà couverts) : eau de décembre à mars, saunas du lac, prudence.
const HIVER_DEJA = ['leman', 'zurich', 'neuchatel', 'bienne', 'morat'];
const HIV = [11, 0, 1, 2];
const TH = {
  fr: { titre: (n) => `Bain d’hiver au ${n.replace(/^Lac/, 'lac')} : la température de l’eau de décembre à mars`, h1: (n) => `Se baigner en hiver : ${n}`, desc: (n) => `Température moyenne de l’eau du ${n.replace(/^Lac/, 'lac')} de décembre à mars (Alplakes, 2023 à 2025), les saunas au bord du lac et les règles de prudence du bain froid.`,
    bref: (n, f, v) => `Au ${n.replace(/^Lac/, 'lac')}, l’eau est la plus froide en <strong>${f}</strong> : <strong>${v}</strong> en moyenne (modèle Alplakes, 2023 à 2025). Un bain d’hiver se prépare : jamais seul, court, et se réchauffer tout de suite après.`,
    hT: 'L’eau en hiver', hS: 'Saunas au bord du lac', hP: 'Avant d’y aller', p: 'Entrer lentement, ne jamais nager seul, sortir avant d’avoir froid. Lire <a href="{blog:choc-thermique-eau-froide}">les 90 premières secondes</a>, <a href="{blog:afterdrop-se-rechauffer}">se réchauffer après</a> et <a href="{blog:materiel-bain-d-hiver}">le matériel</a>.', note: (a) => `Moyennes journalières à 70 cm, une valeur pour tout le lac, années ${a} (modèle Simstrat d’Alplakes, Eawag).` },
  en: { titre: (n) => `Winter swimming in ${n}: water temperature from December to March`, h1: (n) => `Winter swimming: ${n}`, desc: (n) => `Average water temperature of ${n} from December to March (Alplakes, 2023 to 2025), lakeside saunas and the safety rules of cold-water swimming.`,
    bref: (n, f, v) => `In ${n} the water is coldest in <strong>${f}</strong>: <strong>${v}</strong> on average (Alplakes model, 2023 to 2025). A winter swim needs preparing: never alone, short, and warm up straight after.`,
    hT: 'The water in winter', hS: 'Lakeside saunas', hP: 'Before you go', p: 'Go in slowly, never swim alone, get out before you feel cold. Read <a href="{blog:choc-thermique-eau-froide}">the first 90 seconds</a>, <a href="{blog:afterdrop-se-rechauffer}">warming up afterwards</a> and <a href="{blog:materiel-bain-d-hiver}">the kit</a>.', note: (a) => `Daily averages at 70 cm, one value for the whole lake, years ${a} (Alplakes Simstrat model, Eawag).` },
  de: { titre: (n) => `Winterbaden im ${n}: die Wassertemperatur von Dezember bis März`, h1: (n) => `Winterbaden: ${n}`, desc: (n) => `Mittlere Wassertemperatur im ${n} von Dezember bis März (Alplakes, 2023 bis 2025), Saunas am See und die Sicherheitsregeln fürs Kaltbaden.`,
    bref: (n, f, v) => `Im ${n} ist das Wasser im <strong>${f}</strong> am kältesten: <strong>${v}</strong> im Mittel (Alplakes-Modell, 2023 bis 2025). Ein Winterbad will vorbereitet sein: nie allein, kurz, und danach sofort aufwärmen.`,
    hT: 'Das Wasser im Winter', hS: 'Saunas am See', hP: 'Bevor Sie gehen', p: 'Langsam hineingehen, nie allein schwimmen, hinaus, bevor man friert. Lesen: <a href="{blog:choc-thermique-eau-froide}">die ersten 90 Sekunden</a>, <a href="{blog:afterdrop-se-rechauffer}">sich danach aufwärmen</a> und <a href="{blog:materiel-bain-d-hiver}">die Ausrüstung</a>.', note: (a) => `Tagesmittel in 70 cm Tiefe, ein Wert für den ganzen See, Jahre ${a} (Simstrat-Modell von Alplakes, Eawag).` },
  it: { titre: (n) => `Bagno invernale nel ${n.replace(/^Lago/, 'lago')}: la temperatura dell’acqua da dicembre a marzo`, h1: (n) => `Bagno invernale: ${n}`, desc: (n) => `Temperatura media dell’acqua del ${n.replace(/^Lago/, 'lago')} da dicembre a marzo (Alplakes, 2023–2025), le saune sul lago e le regole di prudenza del bagno freddo.`,
    bref: (n, f, v) => `Nel ${n.replace(/^Lago/, 'lago')} l’acqua è più fredda a <strong>${f}</strong>: <strong>${v}</strong> in media (modello Alplakes, 2023–2025). Un bagno invernale si prepara: mai da soli, breve, e riscaldarsi subito dopo.`,
    hT: 'L’acqua in inverno', hS: 'Saune sul lago', hP: 'Prima di andare', p: 'Entrare lentamente, mai nuotare da soli, uscire prima di avere freddo. Leggere <a href="{blog:choc-thermique-eau-froide}">i primi 90 secondi</a>, <a href="{blog:afterdrop-se-rechauffer}">riscaldarsi dopo</a> e <a href="{blog:materiel-bain-d-hiver}">l’attrezzatura</a>.', note: (a) => `Medie giornaliere a 70 cm, un valore per tutto il lago, anni ${a} (modello Simstrat di Alplakes, Eawag).` } };
export const LACS_HIVER = () => Object.keys(S.lacs).filter((l) => !HIVER_DEJA.includes(l) && SPOTS.some((s) => lacDe(s) === l));
export const articlesHiverLacs = () => LACS_HIVER().map((lac) => {
  const m = S.lacs[lac], iF = HIV.reduce((a, i) => (m[i].moy < m[a].moy ? i : a), HIV[0]);
  const ids = new Set(SPOTS.filter((s) => lacDe(s) === lac).map((s) => s.id)), saunas = LOCATIONS.filter((l) => ids.has(l.spot) && l.activites.includes('sauna'));
  const a = { slug: `bain-d-hiver-lac-${lac}`, sante: true, img: imgHiver(lac), altIA: LS.map((L) => ({ fr: `Un ponton enneigé au bord du ${nomLac(lac, 'fr')}, la vapeur au-dessus de l’eau froide`, en: `A snowy jetty on ${nomLac(lac, 'en')}, mist above the cold water`, de: `Ein verschneiter Steg am ${nomLac(lac, 'de')}, Dampf über dem kalten Wasser`, it: `Un pontile innevato sul ${nomLac(lac, 'it')}, vapore sopra l’acqua fredda` })[L]), sources: [SRC] };
  for (const L of LS) {
    const n = nomLac(lac, L), x = TH[L];
    const tab = `<table class="tableau"><thead><tr>${T[L].cols.map((c) => `<th>${c}</th>`).join('')}</tr></thead><tbody>\n${HIV.map((i) => `<tr><td>${mois(i, L)}</td><td>${deg(m[i].moy, L)}</td><td>${deg(m[i].min, L)}</td><td>${deg(m[i].max, L)}</td></tr>`).join('\n')}\n</tbody></table>\n<p>${x.note(annees())}</p>`;
    const sa = saunas.length ? `<h2>${x.hS}</h2>\n<ul class="liste">\n${saunas.map((l) => ITEM(l, L)).join('\n')}\n</ul>\n` : '';
    a[L] = { titre: x.titre(n), h1: x.h1(n), desc: x.desc(n), bref: x.bref(n, mois(iF, L), deg(m[iF].moy, L)), html: () => `<h2>${x.hT}</h2>\n${tab}\n${sa}<h2>${x.hP}</h2>\n<p>${x.p}</p>` };
  }
  return a;
});

// 5) Deux comparatifs de plus : les lacs les plus doux en hiver ; la saison où l'eau dépasse 20 °C, lac par lac.
const minus = (l, L) => nomLac(l, L).replace(/^(Lac|Lago)/, (x) => x.toLowerCase());
const TW = {
  fr: { titre: 'Bain d’hiver : les lacs suisses où l’eau est la moins froide en janvier et février', h1: 'Quel lac pour le bain d’hiver ? Les plus doux, les plus froids', desc: 'Les lacs suisses classés selon la température moyenne de l’eau en janvier et février (modèle Alplakes, 2023 à 2025).', bref: (a, v, b, w) => `En février, l’eau la moins froide est en moyenne celle du <strong>${a}</strong> (${v}), la plus froide celle du <strong>${b}</strong> (${w}). Les grands lacs profonds gardent leur chaleur plus longtemps.`, sante: 'Quel que soit le lac, un bain d’hiver se prépare : <a href="{blog:choc-thermique-eau-froide}">les 90 premières secondes</a>, <a href="{blog:programme-4-semaines-bain-d-hiver}">un programme de 4 semaines</a>.' },
  en: { titre: 'Winter swimming: the Swiss lakes with the least cold water in January and February', h1: 'Which lake for winter swimming? The mildest and the coldest', desc: 'Swiss lakes ranked by average water temperature in January and February (Alplakes model, 2023 to 2025).', bref: (a, v, b, w) => `In February the least cold water is on average in <strong>${a}</strong> (${v}), the coldest in <strong>${b}</strong> (${w}). Large, deep lakes keep their warmth longer.`, sante: 'Whatever the lake, a winter swim needs preparing: <a href="{blog:choc-thermique-eau-froide}">the first 90 seconds</a>, <a href="{blog:programme-4-semaines-bain-d-hiver}">a 4-week programme</a>.' },
  de: { titre: 'Winterbaden: die Schweizer Seen mit dem am wenigsten kalten Wasser im Januar und Februar', h1: 'Welcher See fürs Winterbaden? Die mildesten und die kältesten', desc: 'Schweizer Seen nach mittlerer Wassertemperatur im Januar und Februar (Alplakes-Modell, 2023 bis 2025).', bref: (a, v, b, w) => `Im Februar ist das Wasser im Mittel im <strong>${a}</strong> am wenigsten kalt (${v}), im <strong>${b}</strong> am kältesten (${w}). Grosse, tiefe Seen halten ihre Wärme länger.`, sante: 'Egal welcher See: Ein Winterbad will vorbereitet sein: <a href="{blog:choc-thermique-eau-froide}">die ersten 90 Sekunden</a>, <a href="{blog:programme-4-semaines-bain-d-hiver}">ein 4-Wochen-Programm</a>.' },
  it: { titre: 'Bagno invernale: i laghi svizzeri con l’acqua meno fredda a gennaio e febbraio', h1: 'Quale lago per il bagno invernale? I più miti e i più freddi', desc: 'I laghi svizzeri classificati secondo la temperatura media dell’acqua a gennaio e febbraio (modello Alplakes, 2023–2025).', bref: (a, v, b, w) => `A febbraio l’acqua meno fredda è in media quella del <strong>${a}</strong> (${v}), la più fredda quella del <strong>${b}</strong> (${w}). I grandi laghi profondi conservano il calore più a lungo.`, sante: 'Qualunque sia il lago, un bagno invernale si prepara: <a href="{blog:choc-thermique-eau-froide}">i primi 90 secondi</a>, <a href="{blog:programme-4-semaines-bain-d-hiver}">un programma di 4 settimane</a>.' } };
const TS = {
  fr: { titre: 'Saison de baignade : combien de mois l’eau dépasse 20 °C dans chaque lac suisse', h1: 'La saison des bains à plus de 20 °C, lac par lac', desc: 'Pour chaque lac suisse, les mois où l’eau dépasse 20 °C en moyenne, du plus long au plus court (modèle Alplakes, 2023 à 2025).', bref: (n, a, m) => `Sur ${n} lacs, l’eau dépasse 20 °C en moyenne pendant ${m} mois au plus ; d’autres n’y arrivent jamais, comme le <strong>${a}</strong>.`, h: ['Les lacs où l’eau dépasse 20 °C', 'Les lacs où elle reste en dessous'], mois: (n) => `${n} mois` },
  en: { titre: 'Swimming season: how many months the water is above 20 °C in each Swiss lake', h1: 'The above-20 °C swimming season, lake by lake', desc: 'For each Swiss lake, the months when the water averages above 20 °C, from longest to shortest (Alplakes model, 2023 to 2025).', bref: (n, a, m) => `Across ${n} lakes, the water averages above 20 °C for ${m} months at most; others never get there, such as <strong>${a}</strong>.`, h: ['Lakes where the water exceeds 20 °C', 'Lakes where it stays below'], mois: (n) => `${n} month${n > 1 ? 's' : ''}` },
  de: { titre: 'Badesaison: wie viele Monate das Wasser in jedem Schweizer See über 20 °C liegt', h1: 'Die Badesaison über 20 °C, See für See', desc: 'Für jeden Schweizer See die Monate, in denen das Wasser im Mittel über 20 °C liegt, vom längsten zum kürzesten (Alplakes-Modell, 2023 bis 2025).', bref: (n, a, m) => `In ${n} Seen liegt das Wasser höchstens ${m} Monate im Mittel über 20 °C; andere erreichen das nie, etwa der <strong>${a}</strong>.`, h: ['Seen mit über 20 °C', 'Seen, die darunter bleiben'], mois: (n) => `${n} Monat${n > 1 ? 'e' : ''}` },
  it: { titre: 'Stagione balneare: quanti mesi l’acqua supera i 20 °C in ogni lago svizzero', h1: 'La stagione dei bagni sopra i 20 °C, lago per lago', desc: 'Per ogni lago svizzero, i mesi in cui l’acqua supera in media i 20 °C, dal più lungo al più breve (modello Alplakes, 2023–2025).', bref: (n, a, m) => `Su ${n} laghi l’acqua supera in media i 20 °C per al massimo ${m} mesi; altri non ci arrivano mai, come il <strong>${a}</strong>.`, h: ['I laghi dove l’acqua supera i 20 °C', 'I laghi dove resta sotto'], mois: (n) => `${n} mes${n > 1 ? 'i' : 'e'}` } };
export const articlesComparatifs2 = () => {
  const lacs = Object.keys(S.lacs);
  if (lacs.length < 5) return [];
  const hiver = { slug: 'lacs-les-plus-doux-en-hiver', sante: true, img: imgHiver('lacs'), altIA: ['Un ponton enneigé au bord d’un lac suisse, la brume au-dessus de l’eau froide', 'A snowy jetty on a Swiss lake, mist above the cold water', 'Ein verschneiter Steg an einem Schweizer See, Nebel über dem kalten Wasser', 'Un pontile innevato su un lago svizzero, nebbia sopra l’acqua fredda'], sources: [SRC] };
  const saison = { slug: 'saison-de-baignade-20-degres', sante: false, img: 'comparatif-mois', altIA: ['Une rangée de thermomètres colorés devant plusieurs lacs suisses stylisés', 'A row of coloured thermometers in front of several stylised Swiss lakes', 'Eine Reihe bunter Thermometer vor mehreren stilisierten Schweizer Seen', 'Una fila di termometri colorati davanti a diversi laghi svizzeri stilizzati'], sources: [SRC] };
  const nb = (l) => S.lacs[l].filter((m) => m.moy >= 20).length;
  for (const L of LS) {
    const triF = [...lacs].sort((p, q) => S.lacs[q][1].moy - S.lacs[p][1].moy);
    const ol = (arr, f) => `<ol class="liste">\n${arr.map((l) => `  <li><strong>${nomLac(l, L)}</strong> : ${f(l)}</li>`).join('\n')}\n</ol>`;
    const x = TW[L];
    hiver[L] = { titre: x.titre, h1: x.h1, desc: x.desc, bref: x.bref(minus(triF[0], L), deg(S.lacs[triF[0]][1].moy, L), minus(triF.at(-1), L), deg(S.lacs[triF.at(-1)][1].moy, L)),
      html: () => [0, 1].map((i) => `<h2>${mois(i, L)[0].toUpperCase() + mois(i, L).slice(1)}</h2>\n${ol([...lacs].sort((p, q) => S.lacs[q][i].moy - S.lacs[p][i].moy), (l) => deg(S.lacs[l][i].moy, L))}`).join('\n') + `\n<p>${T[L].note(annees())}</p>\n<p>${x.sante}</p>` };
    const y = TS[L], avec = lacs.filter((l) => nb(l)).sort((p, q) => nb(q) - nb(p) || S.lacs[q][7].moy - S.lacs[p][7].moy), sans = lacs.filter((l) => !nb(l));
    const per = (l) => { const i = S.lacs[l].map((m, k) => (m.moy >= 20 ? k : -1)).filter((k) => k >= 0); return `${y.mois(i.length)} (${mois(i[0], L)}${i.length > 1 ? `–${mois(i.at(-1), L)}` : ''})`; };
    saison[L] = { titre: y.titre, h1: y.h1, desc: y.desc, bref: y.bref(lacs.length, minus(sans[0] ?? triF.at(-1), L), Math.max(...lacs.map(nb))),
      html: () => `<h2>${y.h[0]}</h2>\n${ol(avec, per)}\n${sans.length ? `<h2>${y.h[1]}</h2>\n${ol(sans, (l) => `max. ${deg(Math.max(...S.lacs[l].map((m) => m.moy)), L)}`)}\n` : ''}<p>${T[L].note(annees())}</p>` };
  }
  return [hiver, saison];
};
