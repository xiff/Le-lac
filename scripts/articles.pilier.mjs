// Page pilier « Où se baigner en Suisse » : les 25 lacs suivis, l'eau du matin et un lien vers chaque guide. 4 langues.
// Tout vient des données de l'app (spots.js, modèle Alplakes via matin.mjs) : rien d'écrit à la main sur un lac, donc rien à inventer.
import { SPOTS, LACS, lacDe, nomLac } from '../spots.js';
import { valeurMatin, dateMatin, degMatin } from './matin.mjs';
import { nomPlage } from '../traductions.js';

const LEGENDE = { fr: 'Illustration générée par IA', en: 'AI-generated illustration', de: 'KI-generierte Illustration', it: 'Illustrazione generata dall’IA' };
const T = {
  fr: { titre: 'Où se baigner en Suisse : les 25 lacs, avec l’eau du jour', h1: 'Où se baigner en Suisse ? Les 25 lacs suivis, avec la température du matin',
    desc: 'Les lacs suisses pour se baigner, du Léman au lac Majeur : nombre de plages, plage la plus chaude ce matin et guide de chaque lac. Eau mise à jour chaque jour (modèle Alplakes).',
    bref: (n, p) => `Mon Lac suit <strong>${p} plages sur ${n} lacs</strong> en Suisse et sur la rive française du Léman. Pour chacun : le nombre de plages, la plus chaude ce matin et le guide complet. L’eau est celle du modèle Alplakes de l’Eawag, à 70 cm sous la surface, mise à jour chaque jour.`,
    hTab: 'Les lacs, de la plus grande à la plus petite offre', cols: ['Lac', 'Plages', 'La plus chaude ce matin', 'Guide'], guide: 'Le guide', plages: 'Toutes les plages',
    hTop: 'Les cinq plages les plus chaudes ce matin', matin: (d) => `Valeurs du matin du ${d}, à 70 cm sous la surface.`,
    hChoisir: 'Comment choisir ?', choisir: 'Les grands lacs du Plateau (Léman, Neuchâtel, Zurich, Constance) ont le plus de plages et de bains aménagés. Les lacs du Tessin (Lugano, Majeur) se réchauffent souvent plus tôt. Les lacs d’altitude, comme Silvaplana ou Joux, restent plus frais. La valeur du jour, plage par plage, est dans l’<a href="{app}">app</a> : elle peut varier de plusieurs degrés sur un même lac.' },
  en: { titre: 'Where to swim in Switzerland: 25 lakes, with today’s water', h1: 'Where to swim in Switzerland? The 25 lakes we follow, with this morning’s temperature',
    desc: 'Swiss lakes for swimming, from Lake Geneva to Lake Maggiore: number of beaches, warmest beach this morning and a guide to each lake. Water updated daily (Alplakes model).',
    bref: (n, p) => `My Lake follows <strong>${p} beaches on ${n} lakes</strong> in Switzerland and on the French shore of Lake Geneva. For each: the number of beaches, the warmest one this morning and the full guide. The water comes from Eawag’s Alplakes model, 70 cm below the surface, updated daily.`,
    hTab: 'The lakes, from the most beaches to the fewest', cols: ['Lake', 'Beaches', 'Warmest this morning', 'Guide'], guide: 'Guide', plages: 'All beaches',
    hTop: 'The five warmest beaches this morning', matin: (d) => `Morning values for ${d}, 70 cm below the surface.`,
    hChoisir: 'How to choose?', choisir: 'The big lowland lakes (Geneva, Neuchâtel, Zurich, Constance) have the most beaches and lidos. The Ticino lakes (Lugano, Maggiore) often warm up earlier. High lakes such as Silvaplana or Joux stay cooler. Today’s value, beach by beach, is in the <a href="{app}">app</a>: it can vary by several degrees on the same lake.' },
  de: { titre: 'Baden in der Schweiz: die 25 Seen, mit dem Wasser von heute', h1: 'Wo baden in der Schweiz? Die 25 Seen, mit der Wassertemperatur vom Morgen',
    desc: 'Die Schweizer Badeseen, vom Genfersee bis zum Lago Maggiore: Anzahl Badeplätze, wärmster Badeplatz heute Morgen und Ratgeber zu jedem See. Wasser täglich aktualisiert (Modell Alplakes).',
    bref: (n, p) => `Mein See erfasst <strong>${p} Badeplätze an ${n} Seen</strong> in der Schweiz und am französischen Ufer des Genfersees. Für jeden See: die Zahl der Badeplätze, der wärmste heute Morgen und der ganze Ratgeber. Das Wasser stammt aus dem Modell Alplakes der Eawag, 70 cm unter der Oberfläche, täglich aktualisiert.`,
    hTab: 'Die Seen, vom grössten zum kleinsten Angebot', cols: ['See', 'Badeplätze', 'Am wärmsten heute Morgen', 'Ratgeber'], guide: 'Ratgeber', plages: 'Alle Badeplätze',
    hTop: 'Die fünf wärmsten Badeplätze heute Morgen', matin: (d) => `Werte vom Morgen des ${d}, 70 cm unter der Oberfläche.`,
    hChoisir: 'Wie wählen?', choisir: 'Die grossen Mittellandseen (Genfersee, Neuenburgersee, Zürichsee, Bodensee) haben die meisten Badeplätze und Strandbäder. Die Tessiner Seen (Lugano, Maggiore) erwärmen sich oft früher. Hoch gelegene Seen wie Silvaplana oder Joux bleiben kühler. Der Wert von heute, Badeplatz für Badeplatz, steht in der <a href="{app}">App</a>: Er kann am selben See um mehrere Grad schwanken.' },
  it: { titre: 'Dove fare il bagno in Svizzera: i 25 laghi, con l’acqua di oggi', h1: 'Dove fare il bagno in Svizzera? I 25 laghi seguiti, con la temperatura del mattino',
    desc: 'I laghi svizzeri per fare il bagno, dal Lemano al Lago Maggiore: numero di spiagge, spiaggia più calda stamattina e guida di ogni lago. Acqua aggiornata ogni giorno (modello Alplakes).',
    bref: (n, p) => `Il mio lago segue <strong>${p} spiagge su ${n} laghi</strong> in Svizzera e sulla riva francese del Lemano. Per ognuno: il numero di spiagge, la più calda stamattina e la guida completa. L’acqua viene dal modello Alplakes dell’Eawag, a 70 cm sotto la superficie, aggiornata ogni giorno.`,
    hTab: 'I laghi, dalla più ampia alla più piccola offerta', cols: ['Lago', 'Spiagge', 'La più calda stamattina', 'Guida'], guide: 'Guida', plages: 'Tutte le spiagge',
    hTop: 'Le cinque spiagge più calde stamattina', matin: (d) => `Valori del mattino del ${d}, a 70 cm sotto la superficie.`,
    hChoisir: 'Come scegliere?', choisir: 'I grandi laghi dell’Altopiano (Lemano, Neuchâtel, Zurigo, Costanza) hanno più spiagge e lidi. I laghi ticinesi (Lugano, Maggiore) si scaldano spesso prima. I laghi in quota, come Silvaplana o Joux, restano più freschi. Il valore di oggi, spiaggia per spiaggia, è nell’<a href="{app}">app</a>: può variare di diversi gradi sullo stesso lago.' },
};

export const articlePilier = () => {
  const lacs = Object.keys(LACS).map((k) => {
    const pl = SPOTS.filter((s) => lacDe(s) === k).map((s) => [s, valeurMatin(s.id)]);
    const chaud = pl.filter(([, v]) => v != null).sort((a, b) => b[1] - a[1])[0];
    return { k, n: pl.length, chaud, pl };
  }).sort((a, b) => b.n - a.n);
  const top = lacs.flatMap((l) => l.pl.map(([s, v]) => [s, v, l.k])).filter(([, v]) => v != null).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const a = { slug: 'ou-se-baigner-en-suisse', image: 'blog/img/ia/ou-se-baigner-en-suisse.jpg', hauteur: 893, lac: Object.keys(LACS),
    alt: { fr: 'Carte peinte de la Suisse et de ses lacs, du Léman au lac de Constance et au lac Majeur', en: 'Painted map of Switzerland and its lakes, from Lake Geneva to Lake Constance and Lake Maggiore', de: 'Gemalte Karte der Schweiz und ihrer Seen, vom Genfersee bis zum Bodensee und Lago Maggiore', it: 'Mappa dipinta della Svizzera e dei suoi laghi, dal Lemano al lago di Costanza e al Lago Maggiore' },
    credit: {}, creditHtml: { ...LEGENDE }, sources: [['Eawag, Alplakes', 'https://www.alplakes.eawag.ch/']] };
  for (const [L, t] of Object.entries(T)) {
    const lien = (k) => (k === 'leman' ? '{plages}' : `{blog:plages-lac-${k}}`);
    const tableau = `<table class="tableau"><thead><tr>${t.cols.map((c) => `<th>${c}</th>`).join('')}</tr></thead><tbody>\n${lacs.map((l) => `<tr><td>${nomLac(l.k, L)}</td><td>${l.n}</td><td>${l.chaud ? `<a href="{plage:${l.chaud[0].id}}">${nomPlage(l.chaud[0].nom, L)}</a>, ${degMatin(l.chaud[1], L)}` : '–'}</td><td><a href="${lien(l.k)}">${l.k === 'leman' ? t.plages : t.guide}</a></td></tr>`).join('\n')}\n</tbody></table>`;
    const liste = `<ol class="liste">\n${top.map(([s, v, k]) => `  <li><a href="{plage:${s.id}}">${nomPlage(s.nom, L)}</a> (${nomLac(k, L)})${L === 'fr' ? ' : ' : ': '}${degMatin(v, L)}</li>`).join('\n')}\n</ol>`;
    a[L] = { titre: t.titre, h1: t.h1, desc: t.desc, bref: t.bref(lacs.length, SPOTS.length),
      html: () => `<h2>${t.hTab}</h2>\n<p class="matin">${t.matin(dateMatin(L))}</p>\n${tableau}\n<h2>${t.hTop}</h2>\n${liste}\n<h2>${t.hChoisir}</h2>\n<p>${t.choisir}</p>` };
  }
  return a;
};
