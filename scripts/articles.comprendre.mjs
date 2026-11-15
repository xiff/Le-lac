// « Comprendre le lac » : 10 articles, 4 langues, dates échelonnées (voir DATES dans articles.mjs).
// Les faits viennent de Wikipédia (pages « Léman », « Seiche lémanique », « Foehn », « Stratification thermique », « Thermocline »), lues le 15 novembre 2026 ;
// la comparaison des lacs vient des températures du matin de l'app (Alplakes, Eawag). Ce que ces pages ne disent pas n'est pas écrit.
import { SPOTS, lacDe, nomLac } from '../spots.js';
import { valeurMatin, dateMatin, degMatin } from './matin.mjs';

const WP = (t, l = 'fr') => `https://${l}.wikipedia.org/wiki/${t}`;
const LEMAN = ['Wikipédia, « Léman »', WP('L%C3%A9man')];
const SEICHE = ['Wikipédia, « Seiche lémanique »', WP('Seiche_l%C3%A9manique')];
const FOEHN = ['Wikipédia, « Foehn »', WP('Foehn')];
const STRAT = ['Wikipédia, « Stratification thermique »', WP('Stratification_thermique')];
const THERMO = ['Wikipédia, « Thermocline »', WP('Thermocline')];
const ALP = ['Alplakes, Eawag (CC BY 4.0)', 'https://www.alplakes.eawag.ch'];
const LEGENDE = { fr: 'Illustration générée par IA', en: 'AI-generated illustration', de: 'KI-generierte Illustration', it: 'Illustrazione generata dall’IA' };
const FIN = {
  fr: '<p>Le vent, la température et la bise du moment, plage par plage, sont dans l’<a href="{app}">app Mon Lac</a>.</p>',
  en: '<p>The current wind, water temperature and bise, beach by beach, are in the <a href="{app}">My Lake app</a>.</p>',
  de: '<p>Wind, Wassertemperatur und Bise von heute, Badeplatz für Badeplatz, stehen in der <a href="{app}">App Mein See</a>.</p>',
  it: '<p>Vento, temperatura dell’acqua e bise del momento, spiaggia per spiaggia, sono nell’<a href="{app}">app Il mio lago</a>.</p>' };
// Une entrée : image attendue (blog/img/ia/<img>.jpg, voir IMAGES-IA.md), alt, sources, puis les quatre langues { titre, h1, desc, bref, html }.
const A = (slug, img, alt, sources, t) => ({ slug, sante: false, img, altIA: alt, sources, ...t });

export const articlesComprendre = () => {
  // Classement des lacs à partir des températures du matin (seulement si l'app en a pour la plupart des lacs).
  const cles = [...new Set(SPOTS.map((s) => lacDe(s)))];
  const moy = cles.map((c) => { const v = SPOTS.filter((s) => lacDe(s) === c).map((s) => valeurMatin(s.id)).filter((x) => x != null); return v.length ? [c, v.reduce((a, b) => a + b) / v.length] : null; }).filter(Boolean).sort((a, b) => a[1] - b[1]);
  const rang = (L) => {
    if (moy.length < 8) return '';
    const l = (arr) => `<ul class="liste">\n${arr.map(([c, v]) => `  <li><strong>${nomLac(c, L)}</strong> : ${degMatin(v, L)}</li>`).join('\n')}\n</ul>`;
    const T = { fr: ['Le classement du matin', `Moyenne des plages de chaque lac, température du matin du ${dateMatin('fr')} (modèle Alplakes, Eawag). Elle change chaque jour.`, 'Les plus chauds', 'Les plus froids'],
      en: ['This morning’s ranking', `Average of each lake’s beaches, morning temperature of ${dateMatin('en')} (Alplakes model, Eawag). It changes every day.`, 'Warmest', 'Coldest'],
      de: ['Die Rangliste vom Morgen', `Mittelwert der Badeplätze jedes Sees, Morgentemperatur vom ${dateMatin('de')} (Alplakes-Modell, Eawag). Sie ändert sich täglich.`, 'Am wärmsten', 'Am kältesten'],
      it: ['La classifica del mattino', `Media delle spiagge di ogni lago, temperatura del mattino del ${dateMatin('it')} (modello Alplakes, Eawag). Cambia ogni giorno.`, 'I più caldi', 'I più freddi'] }[L];
    return `<h2>${T[0]}</h2>\n<p>${T[1]}</p>\n<h3>${T[2]}</h3>\n${l(moy.slice(-5).reverse())}\n<h3>${T[3]}</h3>\n${l(moy.slice(0, 5))}\n`;
  };
  const lien = { fr: (s, t) => `<a href="{blog:${s}}">${t}</a>`, en: (s, t) => `<a href="{blog:${s}}">${t}</a>`, de: (s, t) => `<a href="{blog:${s}}">${t}</a>`, it: (s, t) => `<a href="{blog:${s}}">${t}</a>` };
  return [
    A('vents-du-leman', 'vents-leman', ['La jetée des Pâquis, des drapeaux tendus par le vent, les vagues du Léman', 'The Pâquis jetty, flags stretched by the wind, Lake Geneva’s waves', 'Der Steg der Pâquis, vom Wind gespannte Fahnen, die Wellen des Genfersees', 'Il molo dei Pâquis, bandiere tese dal vento, le onde del Lemano'], [LEMAN, ALP], {
      fr: { titre: 'Les vents du Léman : bise, vaudaire, joran et séchard', h1: 'Les vents du Léman : bise, vaudaire, joran, séchard',
        desc: 'Quatre vents font le Léman : la bise, la vaudaire, le joran et le séchard. D’où ils soufflent, à quelle force, quand, et ce qu’ils font à l’eau, d’après Wikipédia.',
        bref: 'Le Léman a quatre vents principaux : la <strong>bise</strong> (nord-est, froide et sèche, de 15 à 90 km/h), la <strong>vaudaire</strong> (sud-est, plus de 50 km/h sur le haut lac), le <strong>joran</strong> (nord-ouest, souvent au printemps, jusqu’à plus de 100 km/h) et le <strong>séchard</strong> (brise légère de jour). Ce sont les vents, plus que tout, qui font les courants du lac.',
        html: () => `<h2>Quels sont les vents du Léman ?</h2>
<ul class="liste">
  <li><strong>La bise</strong> : vent de beau temps, froid et sec, venu du nord-est. En principe, elle se forme entre un anticyclone au nord et une dépression sur le golfe de Gênes. Elle souffle de façon irrégulière, entre 15 et 90 km/h, et s’installe pour 3 à 10 jours. <a href="{blog:bise-leman}">Notre article sur la bise</a>.</li>
  <li><strong>La vaudaire</strong> : vent du sud-est qui touche le haut lac, côtés français et suisse, et souffle à plus de 50 km/h.</li>
  <li><strong>Le joran</strong> : vent de nord-ouest de la côte nord, côté suisse, fréquent au printemps ; il peut dépasser 100 km/h.</li>
  <li><strong>Le séchard</strong> : brise légère qui souffle de jour sur le Petit et le Grand lac.</li>
</ul>
<h2>Que font les vents à l’eau ?</h2>
<p>D’après Wikipédia, ce sont les courants dus à l’action mécanique du vent qui sont les plus importants dans le lac : d’abord en surface, puis, en réaction, des courants en profondeur qui vont en sens inverse. C’est aussi le vent qui entretient les <a href="{blog:seiches-leman}">seiches</a>.</p>
<h2>Et pour la baignade et le paddle ?</h2>
<p>Un vent soutenu, c’est des vagues et du courant : <a href="{blog:paddle-leman}">le paddle</a> et la baignade demandent de regarder la prévision. Ce que dit l’app, plage par plage, tient compte du vent et des rafales.</p>
${FIN.fr}` },
      en: { titre: 'The winds of Lake Geneva: bise, vaudaire, joran and séchard', h1: 'The winds of Lake Geneva: bise, vaudaire, joran, séchard',
        desc: 'Four winds shape Lake Geneva: the bise, the vaudaire, the joran and the séchard. Where they blow from, how hard, when, and what they do to the water, according to Wikipedia.',
        bref: 'Lake Geneva has four main winds: the <strong>bise</strong> (north-east, cold and dry, 15 to 90 km/h), the <strong>vaudaire</strong> (south-east, over 50 km/h on the upper lake), the <strong>joran</strong> (north-west, often in spring, up to over 100 km/h) and the <strong>séchard</strong> (a light daytime breeze). More than anything, it is the winds that drive the lake’s currents.',
        html: () => `<h2>What are the winds of Lake Geneva?</h2>
<ul class="liste">
  <li><strong>The bise</strong>: a cold, dry fair-weather wind from the north-east. It usually forms between a high to the north and a low over the Gulf of Genoa. It blows unevenly, between 15 and 90 km/h, and settles in for 3 to 10 days. <a href="{blog:bise-leman}">Our article on the bise</a>.</li>
  <li><strong>The vaudaire</strong>: a south-easterly that hits the upper lake, on the French and Swiss sides, blowing at over 50 km/h.</li>
  <li><strong>The joran</strong>: a north-westerly on the Swiss north shore, frequent in spring; it can exceed 100 km/h.</li>
  <li><strong>The séchard</strong>: a light breeze blowing by day over the Petit and Grand lac.</li>
</ul>
<h2>What do winds do to the water?</h2>
<p>According to Wikipedia, the currents caused by the mechanical action of the wind are the most important in the lake: first at the surface, then, in response, currents at depth running the opposite way. The wind also keeps the <a href="{blog:seiches-leman}">seiches</a> going.</p>
<h2>And for swimming and paddling?</h2>
<p>A steady wind means waves and current: <a href="{blog:paddle-leman}">paddling</a> and swimming call for a look at the forecast. The app’s beach-by-beach verdict takes wind and gusts into account.</p>
${FIN.en}` },
      de: { titre: 'Die Winde des Genfersees: Bise, Vaudaire, Joran und Séchard', h1: 'Die Winde des Genfersees: Bise, Vaudaire, Joran, Séchard',
        desc: 'Vier Winde prägen den Genfersee: Bise, Vaudaire, Joran und Séchard. Woher sie wehen, wie stark, wann und was sie mit dem Wasser machen, nach Wikipedia.',
        bref: 'Der Genfersee hat vier Hauptwinde: die <strong>Bise</strong> (Nordost, kalt und trocken, 15 bis 90 km/h), die <strong>Vaudaire</strong> (Südost, über 50 km/h am oberen See), den <strong>Joran</strong> (Nordwest, oft im Frühling, bis über 100 km/h) und den <strong>Séchard</strong> (leichte Brise am Tag). Mehr als alles andere sind es die Winde, die die Strömungen des Sees antreiben.',
        html: () => `<h2>Welche Winde gibt es am Genfersee?</h2>
<ul class="liste">
  <li><strong>Die Bise</strong>: ein kalter, trockener Schönwetterwind aus Nordost. Sie entsteht in der Regel zwischen einem Hoch im Norden und einem Tief über dem Golf von Genua. Sie weht unregelmässig, zwischen 15 und 90 km/h, und hält 3 bis 10 Tage an. <a href="{blog:bise-leman}">Unser Artikel zur Bise</a>.</li>
  <li><strong>Die Vaudaire</strong>: ein Südostwind, der den oberen See auf französischer und Schweizer Seite trifft und mit über 50 km/h weht.</li>
  <li><strong>Der Joran</strong>: ein Nordwestwind am Schweizer Nordufer, im Frühling häufig; er kann 100 km/h überschreiten.</li>
  <li><strong>Der Séchard</strong>: eine leichte Brise, die tagsüber über Petit und Grand lac weht.</li>
</ul>
<h2>Was machen die Winde mit dem Wasser?</h2>
<p>Laut Wikipedia sind die durch die mechanische Wirkung des Windes verursachten Strömungen im See die wichtigsten: zuerst an der Oberfläche, dann, als Reaktion, Strömungen in der Tiefe in Gegenrichtung. Der Wind hält auch die <a href="{blog:seiches-leman}">Seiches</a> in Gang.</p>
<h2>Und zum Baden und Paddeln?</h2>
<p>Anhaltender Wind heisst Wellen und Strömung: <a href="{blog:paddle-leman}">Paddeln</a> und Baden verlangen einen Blick auf die Vorhersage. Die Bewertung der App je Badeplatz berücksichtigt Wind und Böen.</p>
${FIN.de}` },
      it: { titre: 'I venti del Lemano: bise, vaudaire, joran e séchard', h1: 'I venti del Lemano: bise, vaudaire, joran, séchard',
        desc: 'Quattro venti fanno il Lemano: la bise, la vaudaire, il joran e il séchard. Da dove soffiano, con quale forza, quando, e cosa fanno all’acqua, secondo Wikipedia.',
        bref: 'Il Lemano ha quattro venti principali: la <strong>bise</strong> (nord-est, fredda e secca, da 15 a 90 km/h), la <strong>vaudaire</strong> (sud-est, oltre 50 km/h sull’alto lago), il <strong>joran</strong> (nord-ovest, spesso in primavera, fino a oltre 100 km/h) e il <strong>séchard</strong> (leggera brezza di giorno). Più di ogni altra cosa sono i venti a creare le correnti del lago.',
        html: () => `<h2>Quali sono i venti del Lemano?</h2>
<ul class="liste">
  <li><strong>La bise</strong>: vento di bel tempo, freddo e secco, da nord-est. In genere si forma tra un anticiclone a nord e una depressione sul golfo di Genova. Soffia in modo irregolare, tra 15 e 90 km/h, e si installa per 3-10 giorni. <a href="{blog:bise-leman}">Il nostro articolo sulla bise</a>.</li>
  <li><strong>La vaudaire</strong>: vento di sud-est che colpisce l’alto lago, sul lato francese e svizzero, e soffia a oltre 50 km/h.</li>
  <li><strong>Il joran</strong>: vento di nord-ovest della costa nord svizzera, frequente in primavera; può superare i 100 km/h.</li>
  <li><strong>Il séchard</strong>: leggera brezza che soffia di giorno sul Petit e sul Grand lac.</li>
</ul>
<h2>Cosa fanno i venti all’acqua?</h2>
<p>Secondo Wikipedia, le correnti dovute all’azione meccanica del vento sono le più importanti nel lago: prima in superficie, poi, in reazione, correnti in profondità in senso opposto. Il vento mantiene anche le <a href="{blog:seiches-leman}">sesse</a>.</p>
<h2>E per il bagno e il paddle?</h2>
<p>Un vento sostenuto significa onde e corrente: il <a href="{blog:paddle-leman}">paddle</a> e il bagno richiedono uno sguardo alle previsioni. Il verdetto dell’app, spiaggia per spiaggia, tiene conto di vento e raffiche.</p>
${FIN.it}` } }),

    A('lacs-les-plus-chauds-et-les-plus-froids', 'lacs-chauds-froids', ['Un thermomètre dans l’eau, d’un côté un lac bleu clair ensoleillé, de l’autre un lac de montagne sombre', 'A thermometer in the water, a sunny pale-blue lake on one side, a dark mountain lake on the other', 'Ein Thermometer im Wasser, auf der einen Seite ein sonniger hellblauer See, auf der anderen ein dunkler Bergsee', 'Un termometro nell’acqua, da un lato un lago azzurro e soleggiato, dall’altro un lago di montagna scuro'], [ALP], {
      fr: { titre: 'Les lacs suisses les plus chauds et les plus froids ce matin', h1: 'Quels lacs suisses sont les plus chauds, et les plus froids ?',
        desc: 'Le classement du matin des lacs suivis par Mon Lac, d’après le modèle Alplakes de l’Eawag, mis à jour chaque jour, et comment lire ces écarts.',
        bref: 'Les 25 lacs de Mon Lac n’ont pas la même température au même moment : l’écart se lit chaque matin dans les données du modèle <strong>Alplakes (Eawag)</strong>. Cette page affiche le classement du jour, avec la date ; il change chaque jour.',
        html: () => `${rang('fr')}<h2>Comment lire ce classement ?</h2>
<p>Chaque valeur est la moyenne, pour un lac, de la température du modèle à ses plages, le matin. C’est une estimation d’un modèle, à environ 70 cm sous la surface : elle peut s’écarter de ce qu’on ressent un après-midi de plein soleil. Les lacs sans modèle (Domaine des Îles à Sion) n’y figurent pas.</p>
<h2>Pour chaque lac</h2>
<p>La page de chaque lac donne ses plages, leur température du matin et les chiffres de base (surface, profondeur, altitude) : voir, par exemple, <a href="{blog:temperature-lac-leman}">la température du Léman</a>. La liste complète est dans <a href="{plages}">toutes les plages</a>.</p>
${FIN.fr}` },
      en: { titre: 'The warmest and coldest Swiss lakes this morning', h1: 'Which Swiss lakes are the warmest, and the coldest?',
        desc: 'This morning’s ranking of the lakes My Lake follows, from Eawag’s Alplakes model, updated daily, and how to read the gaps.',
        bref: 'The 25 lakes in My Lake are not at the same temperature at the same time: the gap shows up each morning in the <strong>Alplakes (Eawag)</strong> model data. This page shows the day’s ranking, with its date; it changes every day.',
        html: () => `${rang('en')}<h2>How to read this ranking</h2>
<p>Each value is the average, for a lake, of the model temperature at its beaches in the morning. It is a model estimate, at about 70 cm below the surface: it can differ from what you feel on a sunny afternoon. Lakes without a model (Domaine des Îles in Sion) are not listed.</p>
<h2>For each lake</h2>
<p>Each lake’s page gives its beaches, their morning temperature and the basic figures (area, depth, altitude): see, for example, <a href="{blog:temperature-lac-leman}">the temperature of Lake Geneva</a>. The full list is in <a href="{plages}">all beaches</a>.</p>
${FIN.en}` },
      de: { titre: 'Die wärmsten und kältesten Schweizer Seen heute Morgen', h1: 'Welche Schweizer Seen sind am wärmsten und am kältesten?',
        desc: 'Die Rangliste vom Morgen der Seen, die Mein See verfolgt, nach dem Alplakes-Modell der Eawag, täglich aktualisiert, und wie man die Unterschiede liest.',
        bref: 'Die 25 Seen von Mein See haben nicht zur selben Zeit dieselbe Temperatur: Der Unterschied zeigt sich jeden Morgen in den Daten des Modells <strong>Alplakes (Eawag)</strong>. Diese Seite zeigt die Rangliste des Tages mit Datum; sie ändert sich täglich.',
        html: () => `${rang('de')}<h2>Wie man diese Rangliste liest</h2>
<p>Jeder Wert ist der Mittelwert der Modelltemperatur an den Badeplätzen eines Sees am Morgen. Es ist eine Modellschätzung in etwa 70 cm Tiefe: Sie kann von dem abweichen, was man an einem sonnigen Nachmittag spürt. Seen ohne Modell (Domaine des Îles in Sitten) fehlen.</p>
<h2>Für jeden See</h2>
<p>Die Seite jedes Sees nennt seine Badeplätze, ihre Morgentemperatur und die Grunddaten (Fläche, Tiefe, Höhe): siehe zum Beispiel <a href="{blog:temperature-lac-leman}">die Temperatur des Genfersees</a>. Die ganze Liste steht unter <a href="{plages}">alle Badeplätze</a>.</p>
${FIN.de}` },
      it: { titre: 'I laghi svizzeri più caldi e più freddi stamattina', h1: 'Quali laghi svizzeri sono i più caldi e i più freddi?',
        desc: 'La classifica del mattino dei laghi seguiti da Il mio lago, dal modello Alplakes dell’Eawag, aggiornata ogni giorno, e come leggere le differenze.',
        bref: 'I 25 laghi de Il mio lago non hanno la stessa temperatura nello stesso momento: la differenza si legge ogni mattina nei dati del modello <strong>Alplakes (Eawag)</strong>. Questa pagina mostra la classifica del giorno, con la data; cambia ogni giorno.',
        html: () => `${rang('it')}<h2>Come leggere questa classifica</h2>
<p>Ogni valore è la media, per un lago, della temperatura del modello alle sue spiagge, al mattino. È una stima del modello, a circa 70 cm sotto la superficie: può discostarsi da ciò che si sente in un pomeriggio di pieno sole. I laghi senza modello (Domaine des Îles a Sion) non compaiono.</p>
<h2>Per ogni lago</h2>
<p>La pagina di ogni lago dà le sue spiagge, la temperatura del mattino e i dati di base (superficie, profondità, altitudine): vedi, per esempio, <a href="{blog:temperature-lac-leman}">la temperatura del Lemano</a>. L’elenco completo è in <a href="{plages}">tutte le spiagge</a>.</p>
${FIN.it}` } }),

    A('seiches-leman', 'seiches', ['Le lac calme au crépuscule, des cercles concentriques sur l’eau près d’un ponton', 'The calm lake at dusk, concentric ripples on the water near a jetty', 'Der ruhige See in der Dämmerung, konzentrische Ringe auf dem Wasser nahe einem Steg', 'Il lago calmo al crepuscolo, cerchi concentrici sull’acqua vicino a un pontile'], [SEICHE, LEMAN], {
      fr: { titre: 'Les seiches du Léman : quand le lac se balance', h1: 'Les seiches du Léman : le lac qui oscille',
        desc: 'Une seiche est une onde stationnaire du lac : le niveau monte d’un côté pendant qu’il descend de l’autre. Période, hauteur, qui l’a étudiée, d’après Wikipédia.',
        bref: 'Une <strong>seiche</strong> est une oscillation de l’eau d’un lac : le niveau s’abaisse d’un côté pendant qu’il monte de l’autre. Au Léman, les seiches longitudinales atteignent <strong>30 centimètres</strong> au maximum, avec une période d’environ <strong>73 minutes</strong>. Elles sont causées par le vent ou par une dépression.',
        html: () => `<h2>Qu’est-ce qu’une seiche ?</h2>
<p>Le mot « seiche » désignait, dans la région du Léman, les oscillations visibles du lac, avant de prendre un sens précis en physique. Il recouvre deux types d’ondes stationnaires : celles de la <strong>surface libre</strong>, entre l’air et l’eau, et celles de la <strong>thermocline</strong>, entre les eaux de surface et les eaux profondes (voir <a href="{blog:seiches-internes-leman}">les seiches internes</a>).</p>
<h2>Combien de centimètres, combien de minutes ?</h2>
<p>Pour les seiches de surface, causées par le vent ou par une dépression, Wikipédia donne, au Léman, une hauteur maximale de 30 centimètres pour les seiches longitudinales, avec des périodes de l’ordre de 73 minutes. Les seiches transversales, entre Morges et Évian, sont beaucoup plus courtes.</p>
<h2>Qui les a étudiées ?</h2>
<p>François-Alphonse Forel, Édouard Sarasin et Philippe Plantamour ont fait les premières études, avec des instruments qui mesuraient le niveau du lac à Vevey et à Genève. Forel a distingué les seiches longitudinales et transversales, puis trois types principaux, et proposé une formule : la durée d’une demi-seiche vaut la longueur de la section de lac divisée par la racine du produit de la pesanteur et de la profondeur moyenne.</p>
<h2>Et au bord de l’eau ?</h2>
<p>Un niveau qui monte et descend de quelques centimètres sur plus d’une heure se remarque surtout sur les rives plates ou les pontons. Rien d’alarmant : c’est le lac qui se balance.</p>
${FIN.fr}` },
      en: { titre: 'The seiches of Lake Geneva: when the lake sloshes', h1: 'The seiches of Lake Geneva: the lake that oscillates',
        desc: 'A seiche is a standing wave in a lake: the level rises on one side while it falls on the other. Period, height, who studied it, according to Wikipedia.',
        bref: 'A <strong>seiche</strong> is an oscillation of a lake’s water: the level falls on one side while it rises on the other. On Lake Geneva, longitudinal seiches reach <strong>30 centimetres</strong> at most, with a period of about <strong>73 minutes</strong>. They are caused by wind or by a low-pressure system.',
        html: () => `<h2>What is a seiche?</h2>
<p>The word “seiche” was used around Lake Geneva for the visible oscillations of the lake, before it took on a precise meaning in physics. It covers two kinds of standing waves: those of the <strong>free surface</strong>, between air and water, and those of the <strong>thermocline</strong>, between surface water and deep water (see <a href="{blog:seiches-internes-leman}">internal seiches</a>).</p>
<h2>How many centimetres, how many minutes?</h2>
<p>For surface seiches, caused by wind or by a low, Wikipedia gives, for Lake Geneva, a maximum height of 30 centimetres for longitudinal seiches, with periods of about 73 minutes. Transverse seiches, between Morges and Évian, are much shorter.</p>
<h2>Who studied them?</h2>
<p>François-Alphonse Forel, Édouard Sarasin and Philippe Plantamour made the first studies, with instruments measuring the lake level at Vevey and Geneva. Forel distinguished longitudinal and transverse seiches, then three main types, and proposed a formula: the duration of half a seiche equals the length of the lake section divided by the square root of gravity times the mean depth.</p>
<h2>And at the water’s edge?</h2>
<p>A level that rises and falls a few centimetres over more than an hour is noticeable mostly on flat shores and jetties. Nothing alarming: it is the lake sloshing.</p>
${FIN.en}` },
      de: { titre: 'Die Seiches des Genfersees: wenn der See schaukelt', h1: 'Die Seiches des Genfersees: der See, der schwingt',
        desc: 'Eine Seiche ist eine stehende Welle im See: Der Pegel steigt auf der einen Seite, während er auf der anderen fällt. Periode, Höhe, wer sie erforscht hat, nach Wikipedia.',
        bref: 'Eine <strong>Seiche</strong> ist eine Schwingung des Seewassers: Der Pegel sinkt auf der einen Seite, während er auf der anderen steigt. Am Genfersee erreichen die Längsseiches höchstens <strong>30 Zentimeter</strong> bei einer Periode von etwa <strong>73 Minuten</strong>. Sie werden durch Wind oder ein Tiefdruckgebiet verursacht.',
        html: () => `<h2>Was ist eine Seiche?</h2>
<p>Das Wort «Seiche» bezeichnete in der Genferseeregion die sichtbaren Schwingungen des Sees, bevor es in der Physik eine genaue Bedeutung bekam. Es umfasst zwei Arten stehender Wellen: die der <strong>freien Oberfläche</strong> zwischen Luft und Wasser und die der <strong>Sprungschicht</strong> zwischen Oberflächen- und Tiefenwasser (siehe <a href="{blog:seiches-internes-leman}">interne Seiches</a>).</p>
<h2>Wie viele Zentimeter, wie viele Minuten?</h2>
<p>Für Oberflächenseiches, verursacht durch Wind oder ein Tief, nennt Wikipedia für den Genfersee eine Höchsthöhe von 30 Zentimetern bei Längsseiches, mit Perioden von etwa 73 Minuten. Die Querseiches zwischen Morges und Évian sind viel kürzer.</p>
<h2>Wer hat sie erforscht?</h2>
<p>François-Alphonse Forel, Édouard Sarasin und Philippe Plantamour machten die ersten Untersuchungen, mit Geräten, die den Seepegel in Vevey und Genf massen. Forel unterschied Längs- und Querseiches, dann drei Haupttypen, und schlug eine Formel vor: Die Dauer einer halben Seiche entspricht der Länge des Seeabschnitts geteilt durch die Wurzel aus Erdbeschleunigung mal mittlerer Tiefe.</p>
<h2>Und am Ufer?</h2>
<p>Ein Pegel, der über mehr als eine Stunde um einige Zentimeter steigt und fällt, fällt vor allem an flachen Ufern und Stegen auf. Nichts Beunruhigendes: Der See schaukelt.</p>
${FIN.de}` },
      it: { titre: 'Le sesse del Lemano: quando il lago dondola', h1: 'Le sesse del Lemano: il lago che oscilla',
        desc: 'Una sessa è un’onda stazionaria del lago: il livello sale da un lato mentre scende dall’altro. Periodo, altezza, chi l’ha studiata, secondo Wikipedia.',
        bref: 'Una <strong>sessa</strong> è un’oscillazione dell’acqua del lago: il livello scende da un lato mentre sale dall’altro. Sul Lemano le sesse longitudinali raggiungono al massimo <strong>30 centimetri</strong>, con un periodo di circa <strong>73 minuti</strong>. Sono causate dal vento o da una depressione.',
        html: () => `<h2>Che cos’è una sessa?</h2>
<p>La parola «seiche» indicava, nella regione del Lemano, le oscillazioni visibili del lago, prima di assumere un significato preciso in fisica. Copre due tipi di onde stazionarie: quelle della <strong>superficie libera</strong>, tra aria e acqua, e quelle del <strong>termoclino</strong>, tra acque superficiali e acque profonde (vedi <a href="{blog:seiches-internes-leman}">le sesse interne</a>).</p>
<h2>Quanti centimetri, quanti minuti?</h2>
<p>Per le sesse di superficie, causate da vento o da una depressione, Wikipedia dà per il Lemano un’altezza massima di 30 centimetri per le sesse longitudinali, con periodi dell’ordine di 73 minuti. Le sesse trasversali, tra Morges ed Évian, sono molto più brevi.</p>
<h2>Chi le ha studiate?</h2>
<p>François-Alphonse Forel, Édouard Sarasin e Philippe Plantamour fecero i primi studi, con strumenti che misuravano il livello del lago a Vevey e a Ginevra. Forel distinse sesse longitudinali e trasversali, poi tre tipi principali, e propose una formula: la durata di mezza sessa è la lunghezza del tratto di lago divisa per la radice del prodotto tra gravità e profondità media.</p>
<h2>E sulla riva?</h2>
<p>Un livello che sale e scende di qualche centimetro in più di un’ora si nota soprattutto sulle rive piatte e sui pontili. Niente di allarmante: è il lago che dondola.</p>
${FIN.it}` } }),
    A('seiches-internes-leman', 'seiches-internes', ['Un ponton de pierre et un lac vu en coupe, une couche d’eau claire au-dessus d’une couche sombre qui bascule', 'A stone jetty and a lake seen in cross-section, a pale layer of water above a dark layer that tilts', 'Ein Steinsteg und ein See im Querschnitt, eine helle Wasserschicht über einer dunklen, die kippt', 'Un molo di pietra e un lago visto in sezione, uno strato d’acqua chiaro sopra uno scuro che si inclina'], [SEICHE, THERMO], {
      fr: { titre: 'Chute brutale de la température de l’eau : les seiches internes du Léman', h1: 'Pourquoi l’eau peut se refroidir d’un coup : les seiches internes',
        desc: 'En été, le lac a deux couches, et le vent peut faire basculer la frontière entre elles. Ce que dit Wikipédia des seiches internes du Léman, et ce que cela peut expliquer au bord de l’eau.',
        bref: 'En été, la surface du lac se réchauffe et une <strong>thermocline</strong> se forme : une zone de transition rapide entre l’eau de surface et l’eau profonde. Le vent peut faire <strong>basculer</strong> cette frontière : c’est une <strong>seiche interne</strong>. Au Léman, près des rives, son amplitude en profondeur peut atteindre <strong>10 mètres</strong>, avec des déplacements de 35 cm/s pendant 5 à 6 heures (Wikipédia).',
        html: () => `<h2>Que se passe-t-il en été ?</h2>
<p>Le réchauffement de l’eau à la surface crée, à une profondeur intermédiaire, une thermocline stable : la zone de transition thermique rapide entre les eaux superficielles et les eaux profondes. La couche du dessus s’appelle l’épilimnion, celle du dessous l’hypolimnion.</p>
<h2>Une seiche à l’intérieur du lac</h2>
<p>Le vent qui souffle sur la surface entraîne un basculement de cette interface, qui se traduit par une onde stationnaire, comme celles des <a href="{blog:seiches-leman}">seiches de surface</a>. Comme la différence de densité est plus faible qu’entre l’air et l’eau, ces ondes ont une plus forte amplitude en profondeur ; elles n’arrivent à la surface que très atténuées. Près des rives du Léman, l’amplitude en profondeur peut atteindre 10 m, associée pendant 5 à 6 heures à des déplacements de 35 cm/s au sein de l’eau.</p>
<h2>Ce que cela peut expliquer, et ce que nous ne savons pas</h2>
<p>Quand la frontière entre les couches bascule vers une rive, de l’eau d’une autre couche peut s’y rapprocher : c’est une explication plausible des baisses brusques de température que les baigneurs signalent après un coup de vent. Wikipédia ne relie pas explicitement les seiches internes à ces ressentis, et nous ne pouvons pas dire, plage par plage, quand cela arrive. Le modèle de l’app donne la température à environ 70 cm, pas la mesure de la minute. À lire aussi : <a href="{blog:choc-thermique-eau-froide}">les 90 premières secondes dans l’eau froide</a>.</p>
${FIN.fr}` },
      en: { titre: 'Sudden drop in water temperature: the internal seiches of Lake Geneva', h1: 'Why the water can suddenly turn cold: internal seiches',
        desc: 'In summer the lake has two layers, and the wind can tilt the boundary between them. What Wikipedia says about the internal seiches of Lake Geneva, and what that may explain at the water’s edge.',
        bref: 'In summer the lake surface warms and a <strong>thermocline</strong> forms: a zone of rapid transition between surface and deep water. The wind can <strong>tilt</strong> that boundary: this is an <strong>internal seiche</strong>. On Lake Geneva, near the shores, its amplitude at depth can reach <strong>10 metres</strong>, with movements of 35 cm/s for 5 to 6 hours (Wikipedia).',
        html: () => `<h2>What happens in summer?</h2>
<p>The warming of surface water creates, at an intermediate depth, a stable thermocline: the zone of rapid thermal transition between surface and deep water. The upper layer is called the epilimnion, the lower one the hypolimnion.</p>
<h2>A seiche inside the lake</h2>
<p>Wind blowing over the surface tilts this interface, which shows up as a standing wave, like those of <a href="{blog:seiches-leman}">surface seiches</a>. Since the density difference is smaller than between air and water, these waves have a larger amplitude at depth; they reach the surface only much attenuated. Near the shores of Lake Geneva, the amplitude at depth can reach 10 m, associated for 5 to 6 hours with movements of 35 cm/s within the water.</p>
<h2>What this may explain, and what we do not know</h2>
<p>When the boundary between layers tilts toward a shore, water from another layer can come close: this is a plausible explanation for the sudden temperature drops swimmers report after a gust of wind. Wikipedia does not explicitly link internal seiches to these experiences, and we cannot say, beach by beach, when it happens. The app’s model gives the temperature at about 70 cm, not a minute-by-minute measurement. Also read: <a href="{blog:choc-thermique-eau-froide}">the first 90 seconds in cold water</a>.</p>
${FIN.en}` },
      de: { titre: 'Plötzlicher Temperatursturz im Wasser: die internen Seiches des Genfersees', h1: 'Warum das Wasser plötzlich kalt werden kann: interne Seiches',
        desc: 'Im Sommer hat der See zwei Schichten, und der Wind kann die Grenze zwischen ihnen kippen. Was Wikipedia zu den internen Seiches des Genfersees sagt und was das am Ufer erklären kann.',
        bref: 'Im Sommer erwärmt sich die Seeoberfläche und es bildet sich eine <strong>Sprungschicht</strong>: eine Zone schnellen Übergangs zwischen Oberflächen- und Tiefenwasser. Der Wind kann diese Grenze <strong>kippen</strong>: Das ist eine <strong>interne Seiche</strong>. Am Genfersee kann ihre Amplitude in der Tiefe nahe dem Ufer <strong>10 Meter</strong> erreichen, mit Bewegungen von 35 cm/s während 5 bis 6 Stunden (Wikipedia).',
        html: () => `<h2>Was passiert im Sommer?</h2>
<p>Die Erwärmung des Oberflächenwassers erzeugt in mittlerer Tiefe eine stabile Sprungschicht: die Zone schnellen thermischen Übergangs zwischen Oberflächen- und Tiefenwasser. Die obere Schicht heisst Epilimnion, die untere Hypolimnion.</p>
<h2>Eine Seiche im Inneren des Sees</h2>
<p>Der Wind über der Oberfläche kippt diese Grenzfläche, was sich als stehende Welle zeigt, ähnlich den <a href="{blog:seiches-leman}">Oberflächenseiches</a>. Da der Dichteunterschied kleiner ist als zwischen Luft und Wasser, haben diese Wellen in der Tiefe eine grössere Amplitude; an der Oberfläche kommen sie nur stark abgeschwächt an. Nahe den Ufern des Genfersees kann die Amplitude in der Tiefe 10 m erreichen, verbunden mit 5 bis 6 Stunden lang Bewegungen von 35 cm/s im Wasser.</p>
<h2>Was das erklären kann und was wir nicht wissen</h2>
<p>Kippt die Grenze zwischen den Schichten zu einem Ufer hin, kann Wasser einer anderen Schicht dorthin gelangen: eine plausible Erklärung für die plötzlichen Temperaturstürze, die Badende nach einer Windböe melden. Wikipedia verknüpft interne Seiches nicht ausdrücklich mit solchen Erfahrungen, und wir können nicht Badeplatz für Badeplatz sagen, wann es geschieht. Das Modell der App gibt die Temperatur in etwa 70 cm Tiefe, keine Minutenmessung. Lesenswert auch: <a href="{blog:choc-thermique-eau-froide}">die ersten 90 Sekunden im kalten Wasser</a>.</p>
${FIN.de}` },
      it: { titre: 'Calo improvviso della temperatura dell’acqua: le sesse interne del Lemano', h1: 'Perché l’acqua può raffreddarsi di colpo: le sesse interne',
        desc: 'In estate il lago ha due strati, e il vento può far inclinare il confine tra loro. Cosa dice Wikipedia sulle sesse interne del Lemano e cosa può spiegare a riva.',
        bref: 'In estate la superficie del lago si scalda e si forma un <strong>termoclino</strong>: una zona di rapida transizione tra acqua superficiale e acqua profonda. Il vento può far <strong>inclinare</strong> questo confine: è una <strong>sessa interna</strong>. Sul Lemano, vicino alle rive, la sua ampiezza in profondità può raggiungere <strong>10 metri</strong>, con spostamenti di 35 cm/s per 5-6 ore (Wikipedia).',
        html: () => `<h2>Cosa succede in estate?</h2>
<p>Il riscaldamento dell’acqua in superficie crea, a una profondità intermedia, un termoclino stabile: la zona di rapida transizione termica tra acque superficiali e acque profonde. Lo strato superiore si chiama epilimnio, quello inferiore ipolimnio.</p>
<h2>Una sessa dentro il lago</h2>
<p>Il vento che soffia sulla superficie fa inclinare questa interfaccia, il che si traduce in un’onda stazionaria, come quelle delle <a href="{blog:seiches-leman}">sesse di superficie</a>. Poiché la differenza di densità è minore che tra aria e acqua, queste onde hanno un’ampiezza maggiore in profondità; arrivano in superficie molto attenuate. Vicino alle rive del Lemano l’ampiezza in profondità può raggiungere 10 m, associata per 5-6 ore a spostamenti di 35 cm/s nell’acqua.</p>
<h2>Cosa può spiegare, e cosa non sappiamo</h2>
<p>Quando il confine tra gli strati si inclina verso una riva, l’acqua di un altro strato può avvicinarsi: è una spiegazione plausibile dei cali bruschi di temperatura che i bagnanti segnalano dopo una raffica. Wikipedia non collega esplicitamente le sesse interne a queste esperienze, e non possiamo dire, spiaggia per spiaggia, quando accada. Il modello dell’app dà la temperatura a circa 70 cm, non una misura al minuto. Da leggere anche: <a href="{blog:choc-thermique-eau-froide}">i primi 90 secondi in acqua fredda</a>.</p>
${FIN.it}` } }),

    A('foehn-suisse-lacs', 'foehn', ['Un mur de nuages sur les crêtes des Alpes, le ciel dégagé au-dessus d’un lac, voiles tendues', 'A wall of cloud on the Alpine ridges, clear sky above a lake, taut sails', 'Eine Wolkenwand auf den Alpenkämmen, klarer Himmel über einem See, gespannte Segel', 'Un muro di nuvole sulle creste alpine, cielo sereno sopra un lago, vele tese'], [FOEHN], {
      fr: { titre: 'Le foehn en Suisse : un vent chaud et sec venu du sud', h1: 'Le foehn : comment un vent du sud réchauffe le nord des Alpes',
        desc: 'D’où vient le foehn, pourquoi il est sec et chaud, de combien il réchauffe l’air, et l’épisode de novembre 1982 à Zurich, d’après Wikipédia.',
        bref: 'Le <strong>foehn</strong> est un vent <strong>sec et chaud de secteur sud</strong> qui souffle surtout en automne et à la fin de l’hiver, au nord des Alpes. Il peut faire monter la température de plus de <strong>10 °C en quelques minutes</strong> ; les 7 et 8 novembre 1982, il faisait 2 °C dans la plaine du Pô et 20 °C à Zurich.',
        html: () => `<h2>D’où vient le foehn ?</h2>
<p>Le mot vient du suisse-allemand <em>Föhn</em>, du latin <em>favonius</em>, « vent doux ». Au nord de l’arc alpin, il souffle du sud, souvent avec une dépression sur les îles Britanniques et le nord de la France.</p>
<h2>Pourquoi est-il chaud et sec ?</h2>
<p>L’air humide monte le versant sud des Alpes et se refroidit ; la vapeur d’eau se condense et fait pleuvoir côté sud. Il redescend ensuite, sec, du côté nord. Un air sec qui descend se réchauffe d’environ 10 °C par kilomètre, quand un air saturé qui monte se refroidit d’environ 6 °C par kilomètre : à altitude égale, l’air qui arrive au nord est donc plus chaud. Cela donne aussi, selon Wikipédia, des nuits beaucoup plus chaudes qu’à l’ordinaire.</p>
<h2>Un épisode célèbre</h2>
<p>Les 7 et 8 novembre 1982, un épisode dit centennal a frappé le nord de la Suisse : rafales de 80 nœuds au Jungfraujoch, 2 °C dans la plaine du Pô et 20 °C à Zurich.</p>
<h2>Et sur les lacs ?</h2>
<p>La page que nous avons lue ne décrit pas l’effet du foehn sur les lacs. Retenez que c’est un vent du sud qui peut être fort et brusque : consultez la prévision de vent et de rafales avant de partir sur l’eau. Autres vents : <a href="{blog:vents-du-leman}">les vents du Léman</a>.</p>
${FIN.fr}` },
      en: { titre: 'The foehn in Switzerland: a warm, dry wind from the south', h1: 'The foehn: how a southerly wind warms the north of the Alps',
        desc: 'Where the foehn comes from, why it is dry and warm, how much it warms the air, and the November 1982 episode in Zurich, according to Wikipedia.',
        bref: 'The <strong>foehn</strong> is a <strong>dry, warm southerly wind</strong> that blows mostly in autumn and late winter, north of the Alps. It can raise the temperature by more than <strong>10 °C in a few minutes</strong>; on 7 and 8 November 1982 it was 2 °C on the Po plain and 20 °C in Zurich.',
        html: () => `<h2>Where does the foehn come from?</h2>
<p>The word comes from Swiss German <em>Föhn</em>, from Latin <em>favonius</em>, “mild wind”. North of the Alps it blows from the south, often with a low over the British Isles and northern France.</p>
<h2>Why is it warm and dry?</h2>
<p>Humid air climbs the southern slope of the Alps and cools; the water vapour condenses and rains on the south side. It then descends, dry, on the north side. Dry air descending warms by about 10 °C per kilometre, while saturated air rising cools by about 6 °C per kilometre: at the same altitude, the air arriving on the north side is therefore warmer. According to Wikipedia, this also gives much warmer nights than usual.</p>
<h2>A famous episode</h2>
<p>On 7 and 8 November 1982, a once-in-a-century episode hit northern Switzerland: gusts of 80 knots at the Jungfraujoch, 2 °C on the Po plain and 20 °C in Zurich.</p>
<h2>And on lakes?</h2>
<p>The page we read does not describe the foehn’s effect on lakes. Keep in mind that it is a southerly that can be strong and sudden: check the wind and gust forecast before heading out on the water. Other winds: <a href="{blog:vents-du-leman}">the winds of Lake Geneva</a>.</p>
${FIN.en}` },
      de: { titre: 'Der Föhn in der Schweiz: ein warmer, trockener Wind aus Süden', h1: 'Der Föhn: wie ein Südwind den Alpennordrand erwärmt',
        desc: 'Woher der Föhn kommt, warum er trocken und warm ist, wie stark er die Luft erwärmt, und die Episode vom November 1982 in Zürich, nach Wikipedia.',
        bref: 'Der <strong>Föhn</strong> ist ein <strong>trockener, warmer Südwind</strong>, der vor allem im Herbst und Spätwinter nördlich der Alpen weht. Er kann die Temperatur in wenigen Minuten um mehr als <strong>10 °C</strong> steigen lassen; am 7. und 8. November 1982 waren es 2 °C in der Poebene und 20 °C in Zürich.',
        html: () => `<h2>Woher kommt der Föhn?</h2>
<p>Das Wort stammt aus dem Schweizerdeutschen <em>Föhn</em>, vom lateinischen <em>favonius</em>, «sanfter Wind». Nördlich der Alpen weht er aus Süden, oft mit einem Tief über den Britischen Inseln und Nordfrankreich.</p>
<h2>Warum ist er warm und trocken?</h2>
<p>Feuchte Luft steigt am Alpensüdhang auf und kühlt ab; der Wasserdampf kondensiert und regnet auf der Südseite ab. Dann sinkt sie trocken auf der Nordseite ab. Absinkende trockene Luft erwärmt sich um etwa 10 °C pro Kilometer, aufsteigende gesättigte Luft kühlt um etwa 6 °C pro Kilometer ab: Auf gleicher Höhe ist die Luft auf der Nordseite also wärmer. Laut Wikipedia ergibt das auch viel wärmere Nächte als üblich.</p>
<h2>Eine berühmte Episode</h2>
<p>Am 7. und 8. November 1982 traf eine Jahrhundertepisode die Nordschweiz: Böen von 80 Knoten auf dem Jungfraujoch, 2 °C in der Poebene und 20 °C in Zürich.</p>
<h2>Und auf Seen?</h2>
<p>Die Seite, die wir gelesen haben, beschreibt die Wirkung des Föhns auf Seen nicht. Merken Sie sich: Es ist ein Südwind, der stark und plötzlich sein kann; prüfen Sie Wind- und Böenvorhersage, bevor Sie aufs Wasser gehen. Andere Winde: <a href="{blog:vents-du-leman}">die Winde des Genfersees</a>.</p>
${FIN.de}` },
      it: { titre: 'Il favonio in Svizzera: un vento caldo e secco da sud', h1: 'Il favonio (foehn): come un vento del sud riscalda il nord delle Alpi',
        desc: 'Da dove viene il foehn, perché è secco e caldo, di quanto riscalda l’aria, e l’episodio del novembre 1982 a Zurigo, secondo Wikipedia.',
        bref: 'Il <strong>foehn</strong> è un <strong>vento secco e caldo da sud</strong> che soffia soprattutto in autunno e a fine inverno, a nord delle Alpi. Può far salire la temperatura di oltre <strong>10 °C in pochi minuti</strong>; il 7 e 8 novembre 1982 c’erano 2 °C nella pianura padana e 20 °C a Zurigo.',
        html: () => `<h2>Da dove viene il foehn?</h2>
<p>La parola viene dallo svizzero tedesco <em>Föhn</em>, dal latino <em>favonius</em>, «vento dolce». A nord dell’arco alpino soffia da sud, spesso con una depressione sulle Isole britanniche e sulla Francia settentrionale.</p>
<h2>Perché è caldo e secco?</h2>
<p>L’aria umida sale il versante sud delle Alpi e si raffredda; il vapore si condensa e piove sul lato sud. Poi ridiscende, secca, sul lato nord. L’aria secca che scende si scalda di circa 10 °C per chilometro, mentre l’aria satura che sale si raffredda di circa 6 °C per chilometro: alla stessa quota, l’aria che arriva a nord è quindi più calda. Secondo Wikipedia ne risultano anche notti molto più calde del solito.</p>
<h2>Un episodio famoso</h2>
<p>Il 7 e 8 novembre 1982 un episodio secolare colpì la Svizzera settentrionale: raffiche di 80 nodi allo Jungfraujoch, 2 °C nella pianura padana e 20 °C a Zurigo.</p>
<h2>E sui laghi?</h2>
<p>La pagina che abbiamo letto non descrive l’effetto del foehn sui laghi. Ricordate che è un vento da sud che può essere forte e improvviso: controllate le previsioni di vento e raffiche prima di andare sull’acqua. Altri venti: <a href="{blog:vents-du-leman}">i venti del Lemano</a>.</p>
${FIN.it}` } }),

    A('brassage-du-lac', 'brassage', ['Un lac en hiver sous la brume, l’eau qui fume, des couches de bleu qui se mêlent', 'A lake in winter under mist, steaming water, layers of blue mixing', 'Ein See im Winter unter Dunst, dampfendes Wasser, sich mischende Blauschichten', 'Un lago in inverno sotto la foschia, acqua fumante, strati di blu che si mescolano'], [LEMAN, STRAT], {
      fr: { titre: 'Le brassage du lac : pourquoi les hivers froids comptent pour le Léman', h1: 'Le brassage du lac : l’oxygène des profondeurs',
        desc: 'Chaque fin d’année, les eaux du lac peuvent se mélanger. Ce qu’est le brassage, pourquoi il faut des hivers très froids, et ce qui s’est passé en 2017, d’après Wikipédia et la CIPEL.',
        bref: 'Le <strong>brassage</strong> est le mélange vertical des eaux du lac, en fin d’année. Un brassage <strong>complet</strong> demande des hivers très froids, où l’eau de surface apporte son oxygène en profondeur : ils se raréfient. Durant l’hiver 2017, le Léman a été brassé jusqu’à <strong>200 m</strong>, mais pas complètement : le lac fait plus de 300 m.',
        html: () => `<h2>Les couches du lac</h2>
<p>Par temps chaud, les lacs forment des couches de températures distinctes : l’épilimnion en haut, la thermocline au milieu, l’hypolimnion plus froid jusqu’au fond. Voir <a href="{blog:stratification-thermocline-lac}">la stratification du lac</a>.</p>
<h2>Que se passe-t-il en fin d’année ?</h2>
<p>Wikipédia mentionne des courants verticaux, le « brassage du lac en fin d’année ». Lorsque l’eau de surface se refroidit, elle peut descendre et mélanger la colonne d’eau.</p>
<h2>Pourquoi les hivers froids comptent</h2>
<p>Selon la page « Léman » de Wikipédia, les brassages complets nécessitent des hivers très froids, au cours desquels l’eau de surface apporte son oxygène en profondeur ; ils se raréfient, ce qui, avec le réchauffement climatique, annonce de nouvelles adaptations de l’écosystème. Durant l’hiver 2017, les eaux ont été brassées jusqu’à 200 m ; selon la CIPEL, ce brassage n’a pas été complet, le lac ayant plus de 300 m de profondeur.</p>
<h2>Pour la baignade</h2>
<p>Le brassage ne change pas ce qu’on ressent à la plage au quotidien. Il se joue en hiver et en profondeur ; on le suit pour la santé du lac. Sur la température de surface : <a href="{blog:rechauffement-du-leman}">le Léman se réchauffe</a>.</p>
${FIN.fr}` },
      en: { titre: 'Lake turnover: why cold winters matter for Lake Geneva', h1: 'Lake turnover: oxygen for the depths',
        desc: 'Each year-end, a lake’s waters can mix. What turnover is, why very cold winters are needed, and what happened in 2017, according to Wikipedia and CIPEL.',
        bref: '<strong>Turnover</strong> is the vertical mixing of a lake’s water at the end of the year. A <strong>complete</strong> turnover needs very cold winters, when surface water brings its oxygen to the depths: they are becoming rarer. In winter 2017, Lake Geneva was mixed down to <strong>200 m</strong>, but not completely: the lake is over 300 m deep.',
        html: () => `<h2>The layers of the lake</h2>
<p>In warm weather, lakes form layers of distinct temperatures: the epilimnion on top, the thermocline in the middle, the colder hypolimnion down to the bottom. See <a href="{blog:stratification-thermocline-lac}">lake stratification</a>.</p>
<h2>What happens at the end of the year?</h2>
<p>Wikipedia mentions vertical currents, the “turnover of the lake at the end of the year”. When surface water cools, it can sink and mix the water column.</p>
<h2>Why cold winters matter</h2>
<p>According to Wikipedia’s “Léman” page, complete turnovers need very cold winters, during which surface water brings its oxygen to the depths; they are becoming rarer, which, along with climate warming, points to new adaptations of the ecosystem. In winter 2017 the waters were mixed down to 200 m; according to CIPEL, this turnover was not complete, the lake being more than 300 m deep.</p>
<h2>For swimming</h2>
<p>Turnover does not change what you feel at the beach day to day. It happens in winter and at depth; it is followed for the lake’s health. On surface temperature: <a href="{blog:rechauffement-du-leman}">Lake Geneva is warming</a>.</p>
${FIN.en}` },
      de: { titre: 'Die Durchmischung des Sees: warum kalte Winter für den Genfersee zählen', h1: 'Die Durchmischung des Sees: Sauerstoff für die Tiefe',
        desc: 'Jedes Jahresende kann sich das Seewasser durchmischen. Was Durchmischung ist, warum es sehr kalte Winter braucht und was 2017 geschah, nach Wikipedia und CIPEL.',
        bref: 'Die <strong>Durchmischung</strong> ist die senkrechte Vermischung des Seewassers am Jahresende. Eine <strong>vollständige</strong> Durchmischung braucht sehr kalte Winter, in denen das Oberflächenwasser seinen Sauerstoff in die Tiefe bringt: Sie werden seltener. Im Winter 2017 wurde der Genfersee bis <strong>200 m</strong> durchmischt, aber nicht vollständig: Der See ist über 300 m tief.',
        html: () => `<h2>Die Schichten des Sees</h2>
<p>Bei warmem Wetter bilden Seen Schichten verschiedener Temperatur: oben das Epilimnion, in der Mitte die Sprungschicht, darunter das kältere Hypolimnion bis zum Grund. Siehe <a href="{blog:stratification-thermocline-lac}">die Schichtung des Sees</a>.</p>
<h2>Was passiert am Jahresende?</h2>
<p>Wikipedia erwähnt senkrechte Strömungen, die «Durchmischung des Sees am Jahresende». Kühlt das Oberflächenwasser ab, kann es absinken und die Wassersäule durchmischen.</p>
<h2>Warum kalte Winter zählen</h2>
<p>Laut der Wikipedia-Seite «Léman» brauchen vollständige Durchmischungen sehr kalte Winter, in denen das Oberflächenwasser seinen Sauerstoff in die Tiefe bringt; sie werden seltener, was zusammen mit der Klimaerwärmung neue Anpassungen des Ökosystems ankündigt. Im Winter 2017 wurde das Wasser bis 200 m durchmischt; laut CIPEL war diese Durchmischung nicht vollständig, da der See über 300 m tief ist.</p>
<h2>Fürs Baden</h2>
<p>Die Durchmischung ändert nichts an dem, was man tagtäglich am Strand spürt. Sie findet im Winter und in der Tiefe statt; man verfolgt sie für die Gesundheit des Sees. Zur Oberflächentemperatur: <a href="{blog:rechauffement-du-leman}">der Genfersee erwärmt sich</a>.</p>
${FIN.de}` },
      it: { titre: 'Il rimescolamento del lago: perché gli inverni freddi contano per il Lemano', h1: 'Il rimescolamento del lago: ossigeno per le profondità',
        desc: 'A fine anno le acque del lago possono mescolarsi. Cos’è il rimescolamento, perché servono inverni molto freddi e cosa accadde nel 2017, secondo Wikipedia e la CIPEL.',
        bref: 'Il <strong>rimescolamento</strong> è il mescolamento verticale delle acque del lago a fine anno. Un rimescolamento <strong>completo</strong> richiede inverni molto freddi, in cui l’acqua di superficie porta il suo ossigeno in profondità: diventano più rari. Nell’inverno 2017 il Lemano è stato rimescolato fino a <strong>200 m</strong>, ma non completamente: il lago è profondo oltre 300 m.',
        html: () => `<h2>Gli strati del lago</h2>
<p>Con il caldo i laghi formano strati di temperature distinte: l’epilimnio in alto, il termoclino al centro, l’ipolimnio più freddo fino al fondo. Vedi <a href="{blog:stratification-thermocline-lac}">la stratificazione del lago</a>.</p>
<h2>Cosa succede a fine anno?</h2>
<p>Wikipedia menziona correnti verticali, il «rimescolamento del lago a fine anno». Quando l’acqua di superficie si raffredda, può scendere e mescolare la colonna d’acqua.</p>
<h2>Perché gli inverni freddi contano</h2>
<p>Secondo la pagina «Léman» di Wikipedia, i rimescolamenti completi richiedono inverni molto freddi, in cui l’acqua di superficie porta il suo ossigeno in profondità; diventano più rari, il che, con il riscaldamento climatico, annuncia nuovi adattamenti dell’ecosistema. Nell’inverno 2017 le acque sono state rimescolate fino a 200 m; secondo la CIPEL, il rimescolamento non è stato completo, essendo il lago profondo più di 300 m.</p>
<h2>Per il bagno</h2>
<p>Il rimescolamento non cambia ciò che si sente in spiaggia ogni giorno. Avviene in inverno e in profondità; lo si segue per la salute del lago. Sulla temperatura di superficie: <a href="{blog:rechauffement-du-leman}">il Lemano si scalda</a>.</p>
${FIN.it}` } }),

    A('niveau-du-leman', 'niveau-leman', ['Un ponton, le niveau du lac marqué sur un pilier gradué, des galets mouillés', 'A jetty, the lake level marked on a graduated post, wet pebbles', 'Ein Steg, der Seepegel auf einem Messpfosten markiert, nasse Kiesel', 'Un pontile, il livello del lago segnato su un palo graduato, ciottoli bagnati'], [LEMAN], {
      fr: { titre: 'Le niveau du Léman : qui le règle, entre quelles cotes', h1: 'Le niveau du Léman : un lac régulé entre 371,7 et 372,3 m',
        desc: 'Depuis 1884 le niveau du Léman est régulé entre 371,7 et 372,3 mètres. Avant, il variait de 1,54 m entre été et hiver. Les cotes de l’accord de 1984, d’après Wikipédia.',
        bref: 'Le niveau du Léman est <strong>régulé artificiellement entre 371,7 et 372,3 mètres</strong> d’altitude depuis 1884. Avant le barrage, Forel mesurait en moyenne <strong>1,54 m</strong> d’écart entre l’été et l’hiver, à cause du Rhône. La cote moyenne mesurée entre 1943 et 2008 est de 372,05 m.',
        html: () => `<h2>Qui règle le niveau ?</h2>
<p>Le niveau est régulé artificiellement depuis 1884, par un barrage à rideaux mobiles au pont de la Machine à Genève, à la suite d’une convention intercantonale de 1884 et d’un règlement fédéral de 1892. Le Rhône, en amont, contrôle l’hydrographie du lac : son débit moyen était de 179,2 m³/s entre 2005 et 2015, et ses variations, dues surtout aux glaciers, faisaient fluctuer le niveau en moyenne de 1,54 m entre l’été et l’hiver, d’après les mesures de François-Alphonse Forel avant le barrage.</p>
<h2>Les cotes</h2>
<ul class="liste">
  <li>Régulation : entre 371,7 et 372,3 m.</li>
  <li>Moyenne entre 1943 et 2008 : 372,05 m ; minimum de 371,78 m en 1949, maximum de 372,19 m en 1977.</li>
  <li>Accord de 1984 : 371,6 m de mars à avril et 372,3 m de juin à décembre.</li>
  <li>Chaque année bissextile, le niveau est abaissé à 371,45 m pour permettre des travaux d’entretien le long des rives.</li>
</ul>
<h2>Profondeur</h2>
<p>La profondeur maximale est de 309,7 m et la profondeur moyenne de 152,7 m. Sur les variations de niveau de quelques centimètres en une heure : <a href="{blog:seiches-leman}">les seiches</a>.</p>
${FIN.fr}` },
      en: { titre: 'The level of Lake Geneva: who sets it, between which heights', h1: 'The level of Lake Geneva: a lake regulated between 371.7 and 372.3 m',
        desc: 'Since 1884 the level of Lake Geneva has been regulated between 371.7 and 372.3 metres. Before, it varied by 1.54 m between summer and winter. The 1984 agreement’s heights, according to Wikipedia.',
        bref: 'The level of Lake Geneva has been <strong>artificially regulated between 371.7 and 372.3 metres</strong> above sea level since 1884. Before the dam, Forel measured an average difference of <strong>1.54 m</strong> between summer and winter, because of the Rhône. The mean level measured between 1943 and 2008 is 372.05 m.',
        html: () => `<h2>Who sets the level?</h2>
<p>The level has been artificially regulated since 1884, by a movable-curtain dam at the Pont de la Machine in Geneva, following an inter-cantonal convention of 1884 and a federal regulation of 1892. The Rhône upstream controls the lake’s hydrography: its mean flow was 179.2 m³/s between 2005 and 2015, and its variations, mostly due to glaciers, made the level fluctuate by an average of 1.54 m between summer and winter, from François-Alphonse Forel’s measurements before the dam.</p>
<h2>The levels</h2>
<ul class="liste">
  <li>Regulation: between 371.7 and 372.3 m.</li>
  <li>Average between 1943 and 2008: 372.05 m; minimum of 371.78 m in 1949, maximum of 372.19 m in 1977.</li>
  <li>1984 agreement: 371.6 m from March to April and 372.3 m from June to December.</li>
  <li>Every leap year the level is lowered to 371.45 m to allow maintenance work along the shores.</li>
</ul>
<h2>Depth</h2>
<p>The maximum depth is 309.7 m and the mean depth 152.7 m. On level changes of a few centimetres within an hour: <a href="{blog:seiches-leman}">seiches</a>.</p>
${FIN.en}` },
      de: { titre: 'Der Pegel des Genfersees: wer ihn regelt, zwischen welchen Höhen', h1: 'Der Pegel des Genfersees: ein See, geregelt zwischen 371,7 und 372,3 m',
        desc: 'Seit 1884 wird der Pegel des Genfersees zwischen 371,7 und 372,3 Metern geregelt. Davor schwankte er zwischen Sommer und Winter um 1,54 m. Die Höhen der Vereinbarung von 1984, nach Wikipedia.',
        bref: 'Der Pegel des Genfersees wird seit 1884 <strong>künstlich zwischen 371,7 und 372,3 Metern</strong> über Meer geregelt. Vor dem Wehr maass Forel im Mittel <strong>1,54 m</strong> Unterschied zwischen Sommer und Winter, wegen der Rhone. Der zwischen 1943 und 2008 gemessene Mittelwert liegt bei 372,05 m.',
        html: () => `<h2>Wer regelt den Pegel?</h2>
<p>Der Pegel wird seit 1884 künstlich geregelt, durch ein Nadelwehr am Pont de la Machine in Genf, nach einer interkantonalen Übereinkunft von 1884 und einem Bundesreglement von 1892. Die Rhone oberhalb steuert die Hydrographie des Sees: Ihr mittlerer Abfluss betrug zwischen 2005 und 2015 179,2 m³/s, und ihre Schwankungen, vor allem durch Gletscher, liessen den Pegel im Mittel um 1,54 m zwischen Sommer und Winter schwanken, nach den Messungen von François-Alphonse Forel vor dem Wehr.</p>
<h2>Die Höhen</h2>
<ul class="liste">
  <li>Regelung: zwischen 371,7 und 372,3 m.</li>
  <li>Mittel zwischen 1943 und 2008: 372,05 m; Minimum 371,78 m 1949, Maximum 372,19 m 1977.</li>
  <li>Vereinbarung von 1984: 371,6 m von März bis April und 372,3 m von Juni bis Dezember.</li>
  <li>In jedem Schaltjahr wird der Pegel auf 371,45 m abgesenkt, um Unterhaltsarbeiten am Ufer zu ermöglichen.</li>
</ul>
<h2>Tiefe</h2>
<p>Die maximale Tiefe beträgt 309,7 m, die mittlere 152,7 m. Zu Pegeländerungen von einigen Zentimetern binnen einer Stunde: <a href="{blog:seiches-leman}">Seiches</a>.</p>
${FIN.de}` },
      it: { titre: 'Il livello del Lemano: chi lo regola, tra quali quote', h1: 'Il livello del Lemano: un lago regolato tra 371,7 e 372,3 m',
        desc: 'Dal 1884 il livello del Lemano è regolato tra 371,7 e 372,3 metri. Prima variava di 1,54 m tra estate e inverno. Le quote dell’accordo del 1984, secondo Wikipedia.',
        bref: 'Il livello del Lemano è <strong>regolato artificialmente tra 371,7 e 372,3 metri</strong> di altitudine dal 1884. Prima della diga, Forel misurava in media <strong>1,54 m</strong> di differenza tra estate e inverno, a causa del Rodano. La quota media misurata tra il 1943 e il 2008 è 372,05 m.',
        html: () => `<h2>Chi regola il livello?</h2>
<p>Il livello è regolato artificialmente dal 1884, da una diga a tendine mobili al Pont de la Machine a Ginevra, in seguito a una convenzione intercantonale del 1884 e a un regolamento federale del 1892. Il Rodano a monte controlla l’idrografia del lago: la sua portata media era di 179,2 m³/s tra il 2005 e il 2015, e le sue variazioni, dovute soprattutto ai ghiacciai, facevano oscillare il livello in media di 1,54 m tra estate e inverno, secondo le misure di François-Alphonse Forel prima della diga.</p>
<h2>Le quote</h2>
<ul class="liste">
  <li>Regolazione: tra 371,7 e 372,3 m.</li>
  <li>Media tra il 1943 e il 2008: 372,05 m; minimo di 371,78 m nel 1949, massimo di 372,19 m nel 1977.</li>
  <li>Accordo del 1984: 371,6 m da marzo ad aprile e 372,3 m da giugno a dicembre.</li>
  <li>Ogni anno bisestile il livello viene abbassato a 371,45 m per permettere lavori di manutenzione lungo le rive.</li>
</ul>
<h2>Profondità</h2>
<p>La profondità massima è 309,7 m, la media 152,7 m. Sulle variazioni di livello di qualche centimetro in un’ora: <a href="{blog:seiches-leman}">le sesse</a>.</p>
${FIN.it}` } }),

    A('stratification-thermocline-lac', 'stratification', ['Un lac en coupe, trois bandes d’eau du bleu clair au bleu sombre, un thermomètre à chaque niveau', 'A lake in cross-section, three bands of water from pale to dark blue, a thermometer at each level', 'Ein See im Querschnitt, drei Wasserbänder von hell- bis dunkelblau, ein Thermometer auf jeder Ebene', 'Un lago in sezione, tre fasce d’acqua dall’azzurro al blu scuro, un termometro a ogni livello'], [STRAT, THERMO], {
      fr: { titre: 'Thermocline et stratification : pourquoi la surface du lac est plus chaude', h1: 'Les couches du lac : épilimnion, thermocline, hypolimnion',
        desc: 'Par temps chaud, un lac forme trois couches : une chaude en surface, une zone de transition, une froide en profondeur. Ce que sont l’épilimnion, la thermocline et l’hypolimnion.',
        bref: 'Par temps chaud, un lac se range en <strong>trois couches</strong> : l’<strong>épilimnion</strong> (chaude, en surface), la <strong>thermocline</strong> (la zone de transition thermique rapide) et l’<strong>hypolimnion</strong> (plus froid, jusqu’au fond). C’est parce que l’eau chaude est moins dense que l’eau froide : elle flotte dessus.',
        html: () => `<h2>Pourquoi des couches ?</h2>
<p>La plupart des fluides ont une masse volumique qui diminue quand la température monte : la partie chaude monte au-dessus de la partie froide. L’eau de surface d’un lac au repos est donc plus chaude que l’eau un mètre plus bas.</p>
<h2>Les trois couches</h2>
<ul class="liste">
  <li><strong>L’épilimnion</strong> : la couche chaude du dessus. Le vent et les vagues y font circuler l’eau, ce qui répartit à peu près uniformément la chaleur sur les premières dizaines de mètres.</li>
  <li><strong>La thermocline</strong> (ou métalimnion) : la couche intermédiaire, zone de transition thermique rapide. Elle peut changer de profondeur au fil de la journée.</li>
  <li><strong>L’hypolimnion</strong> : la couche plus froide, jusqu’au fond. Dans un lac eutrophe, il peut manquer d’oxygène.</li>
</ul>
<h2>Pourquoi c’est utile à savoir</h2>
<p>La température que donne l’app est celle du modèle à environ 70 cm : la couche de surface. Plus bas, l’eau est plus froide. Quand le vent fait basculer la thermocline, l’eau peut changer vite : voir <a href="{blog:seiches-internes-leman}">les seiches internes</a>. En fin d’année, les couches se mélangent : <a href="{blog:brassage-du-lac}">le brassage</a>.</p>
${FIN.fr}` },
      en: { titre: 'Thermocline and stratification: why a lake’s surface is warmer', h1: 'The layers of a lake: epilimnion, thermocline, hypolimnion',
        desc: 'In warm weather a lake forms three layers: a warm one at the surface, a transition zone, a cold one at depth. What the epilimnion, thermocline and hypolimnion are.',
        bref: 'In warm weather a lake sorts into <strong>three layers</strong>: the <strong>epilimnion</strong> (warm, at the surface), the <strong>thermocline</strong> (the zone of rapid thermal transition) and the <strong>hypolimnion</strong> (colder, down to the bottom). It is because warm water is less dense than cold water: it floats on top.',
        html: () => `<h2>Why layers?</h2>
<p>Most fluids have a density that falls as temperature rises: the warm part rises above the cold part. The surface water of a still lake is therefore warmer than the water a metre below.</p>
<h2>The three layers</h2>
<ul class="liste">
  <li><strong>The epilimnion</strong>: the warm upper layer. Wind and waves circulate the water there, spreading heat roughly evenly over the first tens of metres.</li>
  <li><strong>The thermocline</strong> (or metalimnion): the middle layer, a zone of rapid thermal transition. It can change depth over the course of the day.</li>
  <li><strong>The hypolimnion</strong>: the colder layer, down to the bottom. In a eutrophic lake it can run short of oxygen.</li>
</ul>
<h2>Why it is useful to know</h2>
<p>The temperature the app gives is the model’s at about 70 cm: the surface layer. Lower down, the water is colder. When the wind tilts the thermocline, the water can change quickly: see <a href="{blog:seiches-internes-leman}">internal seiches</a>. At the end of the year the layers mix: <a href="{blog:brassage-du-lac}">turnover</a>.</p>
${FIN.en}` },
      de: { titre: 'Sprungschicht und Schichtung: warum die Seeoberfläche wärmer ist', h1: 'Die Schichten eines Sees: Epilimnion, Sprungschicht, Hypolimnion',
        desc: 'Bei warmem Wetter bildet ein See drei Schichten: eine warme an der Oberfläche, eine Übergangszone, eine kalte in der Tiefe. Was Epilimnion, Sprungschicht und Hypolimnion sind.',
        bref: 'Bei warmem Wetter ordnet sich ein See in <strong>drei Schichten</strong>: das <strong>Epilimnion</strong> (warm, an der Oberfläche), die <strong>Sprungschicht</strong> (die Zone schnellen thermischen Übergangs) und das <strong>Hypolimnion</strong> (kälter, bis zum Grund). Grund: Warmes Wasser ist weniger dicht als kaltes und schwimmt oben.',
        html: () => `<h2>Warum Schichten?</h2>
<p>Die meisten Fluide haben eine Dichte, die mit steigender Temperatur sinkt: Der warme Teil steigt über den kalten. Das Oberflächenwasser eines ruhigen Sees ist daher wärmer als das Wasser einen Meter tiefer.</p>
<h2>Die drei Schichten</h2>
<ul class="liste">
  <li><strong>Das Epilimnion</strong>: die warme obere Schicht. Wind und Wellen lassen das Wasser dort zirkulieren und verteilen die Wärme ungefähr gleichmässig über die ersten zehn Meter.</li>
  <li><strong>Die Sprungschicht</strong> (oder das Metalimnion): die Zwischenschicht, eine Zone schnellen thermischen Übergangs. Sie kann im Lauf des Tages die Tiefe wechseln.</li>
  <li><strong>Das Hypolimnion</strong>: die kältere Schicht bis zum Grund. In einem eutrophen See kann es an Sauerstoff mangeln.</li>
</ul>
<h2>Warum das zu wissen nützt</h2>
<p>Die Temperatur der App ist die des Modells in etwa 70 cm Tiefe: die Oberflächenschicht. Weiter unten ist das Wasser kälter. Kippt der Wind die Sprungschicht, kann sich das Wasser schnell ändern: siehe <a href="{blog:seiches-internes-leman}">interne Seiches</a>. Am Jahresende mischen sich die Schichten: <a href="{blog:brassage-du-lac}">die Durchmischung</a>.</p>
${FIN.de}` },
      it: { titre: 'Termoclino e stratificazione: perché la superficie del lago è più calda', h1: 'Gli strati di un lago: epilimnio, termoclino, ipolimnio',
        desc: 'Con il caldo un lago forma tre strati: uno caldo in superficie, una zona di transizione, uno freddo in profondità. Cosa sono epilimnio, termoclino e ipolimnio.',
        bref: 'Con il caldo un lago si dispone in <strong>tre strati</strong>: l’<strong>epilimnio</strong> (caldo, in superficie), il <strong>termoclino</strong> (la zona di rapida transizione termica) e l’<strong>ipolimnio</strong> (più freddo, fino al fondo). Perché l’acqua calda è meno densa di quella fredda e galleggia sopra.',
        html: () => `<h2>Perché gli strati?</h2>
<p>La maggior parte dei fluidi ha una densità che diminuisce con la temperatura: la parte calda sale sopra quella fredda. L’acqua di superficie di un lago fermo è quindi più calda di quella un metro più sotto.</p>
<h2>I tre strati</h2>
<ul class="liste">
  <li><strong>L’epilimnio</strong>: lo strato caldo superiore. Vento e onde vi fanno circolare l’acqua, distribuendo il calore in modo più o meno uniforme sulle prime decine di metri.</li>
  <li><strong>Il termoclino</strong> (o metalimnio): lo strato intermedio, zona di rapida transizione termica. Può cambiare profondità nel corso della giornata.</li>
  <li><strong>L’ipolimnio</strong>: lo strato più freddo, fino al fondo. In un lago eutrofico può mancare l’ossigeno.</li>
</ul>
<h2>Perché è utile saperlo</h2>
<p>La temperatura dell’app è quella del modello a circa 70 cm: lo strato di superficie. Più in basso l’acqua è più fredda. Quando il vento fa inclinare il termoclino, l’acqua può cambiare in fretta: vedi <a href="{blog:seiches-internes-leman}">le sesse interne</a>. A fine anno gli strati si mescolano: <a href="{blog:brassage-du-lac}">il rimescolamento</a>.</p>
${FIN.it}` } }),

    A('microclimat-du-leman', 'microclimat', ['Des vignes en terrasses au bord du lac, la rive baignée de lumière douce, des palmiers à Montreux', 'Terraced vineyards by the lake, the shore bathed in soft light, palms at Montreux', 'Rebterrassen am See, das Ufer in weichem Licht, Palmen in Montreux', 'Vigneti a terrazze in riva al lago, la riva immersa in una luce dolce, palme a Montreux'], [LEMAN], {
      fr: { titre: 'Le microclimat du Léman : comment le lac adoucit l’hiver et rafraîchit l’été', h1: 'Le lac fait son climat : adoucir l’hiver, rafraîchir l’été',
        desc: 'Par la masse d’eau qu’il contient, le Léman crée un microclimat autour de lui. Ce que dit Wikipédia de ses effets, de Montreux à la bise.',
        bref: 'Par la masse d’eau qu’il contient, le Léman crée un <strong>microclimat</strong> : en hiver, le lac restitue la chaleur accumulée durant l’été, ce qui adoucit les températures à son voisinage ; en été, il <strong>rafraîchit</strong> tout son pourtour. Montreux et ses abords sont protégés de la bise.',
        html: () => `<h2>Un grand volume d’eau</h2>
<p>Situé à la bordure nord-ouest des Alpes, le Léman contient une énorme masse d’eau, dont la profondeur moyenne est de 152,7 m. Cette masse change lentement de température, bien plus lentement que l’air.</p>
<h2>L’hiver et l’été</h2>
<p>D’après Wikipédia, en hiver le lac restitue la chaleur accumulée durant l’été, ce qui adoucit les températures à son voisinage ; en été, il rafraîchit tout son pourtour. C’est aussi pourquoi l’eau reste agréable longtemps après l’été, et froide longtemps après l’hiver.</p>
<h2>Montreux, à l’abri de la bise</h2>
<p>La partie de la Riviera vaudoise autour de Montreux est protégée de la bise, vent froid du nord-est : <a href="{blog:vents-du-leman}">les vents du Léman</a>.</p>
<h2>Et l’eau des plages ?</h2>
<p>La température de chaque plage, mise à jour chaque jour, est dans l’<a href="{app}">app</a> et sur <a href="{blog:temperature-lac-leman}">la page sur la température du Léman</a>.</p>
${FIN.fr}` },
      en: { titre: 'The microclimate of Lake Geneva: how the lake softens winter and cools summer', h1: 'The lake makes its own climate: softening winter, cooling summer',
        desc: 'Through the mass of water it holds, Lake Geneva creates a microclimate around itself. What Wikipedia says about its effects, from Montreux to the bise.',
        bref: 'Through the mass of water it holds, Lake Geneva creates a <strong>microclimate</strong>: in winter, the lake gives back the heat stored over summer, which softens temperatures nearby; in summer, it <strong>cools</strong> its whole shoreline. Montreux and its surroundings are sheltered from the bise.',
        html: () => `<h2>A great volume of water</h2>
<p>Located on the north-western edge of the Alps, Lake Geneva holds an enormous mass of water, with a mean depth of 152.7 m. This mass changes temperature slowly, far more slowly than air.</p>
<h2>Winter and summer</h2>
<p>According to Wikipedia, in winter the lake gives back the heat stored over summer, which softens temperatures nearby; in summer, it cools its whole shoreline. This is also why the water stays pleasant long after summer, and cold long after winter.</p>
<h2>Montreux, sheltered from the bise</h2>
<p>The part of the Vaud Riviera around Montreux is sheltered from the bise, the cold north-easterly: <a href="{blog:vents-du-leman}">the winds of Lake Geneva</a>.</p>
<h2>And the beach water?</h2>
<p>Each beach’s temperature, updated daily, is in the <a href="{app}">app</a> and on <a href="{blog:temperature-lac-leman}">the page on Lake Geneva’s temperature</a>.</p>
${FIN.en}` },
      de: { titre: 'Das Mikroklima des Genfersees: wie der See den Winter mildert und den Sommer kühlt', h1: 'Der See macht sein Klima: den Winter mildern, den Sommer kühlen',
        desc: 'Durch seine Wassermasse schafft der Genfersee um sich herum ein Mikroklima. Was Wikipedia zu seinen Wirkungen sagt, von Montreux bis zur Bise.',
        bref: 'Durch seine Wassermasse schafft der Genfersee ein <strong>Mikroklima</strong>: Im Winter gibt der See die im Sommer gespeicherte Wärme ab, was die Temperaturen in der Nähe mildert; im Sommer <strong>kühlt</strong> er sein ganzes Ufer. Montreux und seine Umgebung sind vor der Bise geschützt.',
        html: () => `<h2>Eine grosse Wassermasse</h2>
<p>Am Nordwestrand der Alpen gelegen, enthält der Genfersee eine enorme Wassermasse mit einer mittleren Tiefe von 152,7 m. Diese Masse ändert ihre Temperatur langsam, viel langsamer als die Luft.</p>
<h2>Winter und Sommer</h2>
<p>Laut Wikipedia gibt der See im Winter die im Sommer gespeicherte Wärme ab, was die Temperaturen in der Nähe mildert; im Sommer kühlt er sein ganzes Ufer. Deshalb bleibt das Wasser auch lange nach dem Sommer angenehm und lange nach dem Winter kalt.</p>
<h2>Montreux, geschützt vor der Bise</h2>
<p>Der Teil der Waadtländer Riviera rund um Montreux ist vor der Bise, dem kalten Nordostwind, geschützt: <a href="{blog:vents-du-leman}">die Winde des Genfersees</a>.</p>
<h2>Und das Wasser an den Stränden?</h2>
<p>Die Temperatur jedes Badeplatzes, täglich aktualisiert, steht in der <a href="{app}">App</a> und auf <a href="{blog:temperature-lac-leman}">der Seite zur Temperatur des Genfersees</a>.</p>
${FIN.de}` },
      it: { titre: 'Il microclima del Lemano: come il lago addolcisce l’inverno e rinfresca l’estate', h1: 'Il lago fa il suo clima: addolcire l’inverno, rinfrescare l’estate',
        desc: 'Con la massa d’acqua che contiene, il Lemano crea un microclima intorno a sé. Cosa dice Wikipedia dei suoi effetti, da Montreux alla bise.',
        bref: 'Con la massa d’acqua che contiene, il Lemano crea un <strong>microclima</strong>: in inverno il lago restituisce il calore accumulato in estate, il che addolcisce le temperature vicine; in estate <strong>rinfresca</strong> tutta la sua riva. Montreux e dintorni sono protetti dalla bise.',
        html: () => `<h2>Un grande volume d’acqua</h2>
<p>Situato sul bordo nord-occidentale delle Alpi, il Lemano contiene un’enorme massa d’acqua, con profondità media di 152,7 m. Questa massa cambia temperatura lentamente, molto più lentamente dell’aria.</p>
<h2>Inverno ed estate</h2>
<p>Secondo Wikipedia, in inverno il lago restituisce il calore accumulato in estate, il che addolcisce le temperature vicine; in estate rinfresca tutta la sua riva. Per questo l’acqua resta piacevole a lungo dopo l’estate, e fredda a lungo dopo l’inverno.</p>
<h2>Montreux, al riparo dalla bise</h2>
<p>La parte della Riviera vodese intorno a Montreux è protetta dalla bise, il freddo vento di nord-est: <a href="{blog:vents-du-leman}">i venti del Lemano</a>.</p>
<h2>E l’acqua delle spiagge?</h2>
<p>La temperatura di ogni spiaggia, aggiornata ogni giorno, è nell’<a href="{app}">app</a> e nella <a href="{blog:temperature-lac-leman}">pagina sulla temperatura del Lemano</a>.</p>
${FIN.it}` } }),

    A('rechauffement-du-leman', 'rechauffement', ['Un thermomètre qui monte devant un lac calme, une courbe douce dessinée dans les nuages', 'A thermometer rising in front of a calm lake, a gentle curve drawn in the clouds', 'Ein steigendes Thermometer vor einem ruhigen See, eine sanfte Kurve in den Wolken', 'Un termometro che sale davanti a un lago calmo, una dolce curva disegnata tra le nuvole'], [LEMAN], {
      fr: { titre: 'Le Léman se réchauffe : +2 °C en surface en 46 ans', h1: 'Le Léman se réchauffe : ce que disent les mesures',
        desc: 'La température moyenne des eaux de surface du Léman est passée de 10,9 °C en 1970 à 12,9 °C en 2016. Ce que cela change pour le lac, d’après Wikipédia.',
        bref: 'En raison du changement climatique, la température moyenne des eaux de surface du Léman (à 5 mètres de profondeur) est passée de <strong>10,9 °C en 1970 à 12,9 °C en 2016</strong>, soit <strong>2 °C en 46 ans</strong> (Wikipédia). Les brassages complets, qui exigent des hivers très froids, se raréfient.',
        html: () => `<h2>Les chiffres</h2>
<p>D’après Wikipédia, la température moyenne des eaux de surface du Léman, mesurée à 5 mètres de profondeur, est passée de 10,9 °C en 1970 à 12,9 °C en 2016 : 2 °C de plus en 46 ans.</p>
<h2>Ce que cela change pour le lac</h2>
<p>Wikipédia relève que la raréfaction des brassages complets du lac, qui nécessitent des hivers très froids pour que l’eau de surface apporte son oxygène en profondeur, et le réchauffement climatique, qui modifie les dates du frai des poissons, vont être à l’origine de nouvelles adaptations de l’écosystème : <a href="{blog:brassage-du-lac}">le brassage</a>.</p>
<h2>Pour les baigneurs</h2>
<p>Le chiffre est une moyenne annuelle : il ne dit pas combien de degrés de plus on trouvera tel jour d’été. Pour la température du moment, plage par plage : <a href="{blog:temperature-lac-leman}">notre page sur la température du Léman</a>.</p>
${FIN.fr}` },
      en: { titre: 'Lake Geneva is warming: +2 °C at the surface in 46 years', h1: 'Lake Geneva is warming: what the measurements say',
        desc: 'The mean surface-water temperature of Lake Geneva rose from 10.9 °C in 1970 to 12.9 °C in 2016. What that changes for the lake, according to Wikipedia.',
        bref: 'Because of climate change, the mean surface-water temperature of Lake Geneva (at 5 metres depth) rose from <strong>10.9 °C in 1970 to 12.9 °C in 2016</strong>, that is <strong>2 °C in 46 years</strong> (Wikipedia). Complete turnovers, which need very cold winters, are becoming rarer.',
        html: () => `<h2>The figures</h2>
<p>According to Wikipedia, the mean surface-water temperature of Lake Geneva, measured at 5 metres depth, rose from 10.9 °C in 1970 to 12.9 °C in 2016: 2 °C more in 46 years.</p>
<h2>What this changes for the lake</h2>
<p>Wikipedia notes that the rarer complete turnovers of the lake, which need very cold winters for surface water to bring its oxygen to the depths, and climate warming, which changes fish spawning dates, will lead to new adaptations of the ecosystem: <a href="{blog:brassage-du-lac}">turnover</a>.</p>
<h2>For swimmers</h2>
<p>The figure is an annual average: it does not say how many degrees warmer you will find the water on a given summer day. For the current temperature, beach by beach: <a href="{blog:temperature-lac-leman}">our page on Lake Geneva’s temperature</a>.</p>
${FIN.en}` },
      de: { titre: 'Der Genfersee erwärmt sich: +2 °C an der Oberfläche in 46 Jahren', h1: 'Der Genfersee erwärmt sich: was die Messungen sagen',
        desc: 'Die mittlere Oberflächentemperatur des Genfersees stieg von 10,9 °C im Jahr 1970 auf 12,9 °C im Jahr 2016. Was das für den See ändert, nach Wikipedia.',
        bref: 'Wegen des Klimawandels stieg die mittlere Temperatur des Oberflächenwassers des Genfersees (in 5 Metern Tiefe) von <strong>10,9 °C im Jahr 1970 auf 12,9 °C im Jahr 2016</strong>, also um <strong>2 °C in 46 Jahren</strong> (Wikipedia). Vollständige Durchmischungen, die sehr kalte Winter brauchen, werden seltener.',
        html: () => `<h2>Die Zahlen</h2>
<p>Laut Wikipedia stieg die in 5 Metern Tiefe gemessene mittlere Temperatur des Oberflächenwassers des Genfersees von 10,9 °C im Jahr 1970 auf 12,9 °C im Jahr 2016: 2 °C mehr in 46 Jahren.</p>
<h2>Was das für den See ändert</h2>
<p>Wikipedia hält fest, dass die selteneren vollständigen Durchmischungen, die sehr kalte Winter brauchen, damit das Oberflächenwasser seinen Sauerstoff in die Tiefe bringt, und die Klimaerwärmung, die die Laichzeiten der Fische verschiebt, zu neuen Anpassungen des Ökosystems führen werden: <a href="{blog:brassage-du-lac}">die Durchmischung</a>.</p>
<h2>Für Badende</h2>
<p>Die Zahl ist ein Jahresmittel: Sie sagt nicht, wie viel wärmer das Wasser an einem bestimmten Sommertag ist. Für die aktuelle Temperatur, Badeplatz für Badeplatz: <a href="{blog:temperature-lac-leman}">unsere Seite zur Temperatur des Genfersees</a>.</p>
${FIN.de}` },
      it: { titre: 'Il Lemano si scalda: +2 °C in superficie in 46 anni', h1: 'Il Lemano si scalda: cosa dicono le misure',
        desc: 'La temperatura media delle acque di superficie del Lemano è passata da 10,9 °C nel 1970 a 12,9 °C nel 2016. Cosa cambia per il lago, secondo Wikipedia.',
        bref: 'A causa del cambiamento climatico, la temperatura media delle acque di superficie del Lemano (a 5 metri di profondità) è passata da <strong>10,9 °C nel 1970 a 12,9 °C nel 2016</strong>, cioè <strong>2 °C in 46 anni</strong> (Wikipedia). I rimescolamenti completi, che richiedono inverni molto freddi, diventano più rari.',
        html: () => `<h2>I numeri</h2>
<p>Secondo Wikipedia, la temperatura media delle acque di superficie del Lemano, misurata a 5 metri di profondità, è passata da 10,9 °C nel 1970 a 12,9 °C nel 2016: 2 °C in più in 46 anni.</p>
<h2>Cosa cambia per il lago</h2>
<p>Wikipedia osserva che la rarefazione dei rimescolamenti completi, che richiedono inverni molto freddi perché l’acqua di superficie porti il suo ossigeno in profondità, e il riscaldamento climatico, che modifica le date di frega dei pesci, saranno all’origine di nuovi adattamenti dell’ecosistema: <a href="{blog:brassage-du-lac}">il rimescolamento</a>.</p>
<h2>Per i bagnanti</h2>
<p>Il dato è una media annuale: non dice quanti gradi in più si troveranno in un certo giorno d’estate. Per la temperatura del momento, spiaggia per spiaggia: <a href="{blog:temperature-lac-leman}">la nostra pagina sulla temperatura del Lemano</a>.</p>
${FIN.it}` } }),
  ];
};
