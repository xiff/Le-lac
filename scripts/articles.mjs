// Articles du blog, en français et en anglais. Chaque fait vient d'une source citée en bas d'article,
// ou des listes vérifiées de l'app (plages, lieux, loueurs), insérées ici depuis les mêmes fichiers.
// Liens dans le HTML : {plage:id}, {plages}, {app}, {blog:slug} ; le générateur les résout selon la langue.
import { SPOTS, REGIONS, lacDe } from '../spots.js';
import { texteLieu, villeDe } from '../traductions.js';
import { creerDe } from './articles.de.mjs';
import { creerIt } from './articles.it.mjs';
import { LIEUX } from '../lieux.js';
import { LOCATIONS } from '../locations.js';

const ZONES = { geneve: 'Genève', nyon: 'La Côte', lausanne: 'Morges et Lausanne', vevey: 'Riviera', evian: 'Rive française' };
const LOCALE = { fr: 'fr-CH', en: 'en-GB', de: 'de-CH', it: 'it-CH' };
const region = (r, L) => REGIONS[L][r] ?? r;
const DEUX_PTS = (L) => (L === 'fr' ? ' : ' : ': '); // typographie française : espace avant les deux-points
const mois = (m, L) => new Date(2026, m - 1, 1).toLocaleDateString(LOCALE[L], { month: 'long' });
const saison = (x, L) => (x.mois ? ` (${{ fr: 'de {a} à {b}', en: '{a} to {b}', de: 'von {a} bis {b}', it: 'da {a} a {b}' }[L].replace('{a}', mois(x.mois[0], L)).replace('{b}', mois(x.mois[1], L))})` : '');
const nomSpot = (id) => SPOTS.find((s) => s.id === id)?.nom ?? id;

// Listes générées depuis les données de l'app : elles restent justes quand une plage ou un lieu est ajouté.
const listePlages = (filtre, L) => `<ul class="liste">\n${SPOTS.filter(filtre).map((s) => `  <li><a href="{plage:${s.id}}">${s.nom}</a></li>`).join('\n')}\n</ul>`;
const listeLieux = (filtre, L) => Object.entries(ZONES).map(([z, r]) => {
  const l = LIEUX.filter((x) => x.zone === z && filtre(x));
  return l.length ? `<h3>${region(r, L)}</h3>\n<ul class="liste">\n${l.map((x) => `  <li><strong>${x.nom}</strong>, ${villeDe(x.ville, L)}${saison(x, L)}${DEUX_PTS(L)}${texteLieu(x, L)}</li>`).join('\n')}\n</ul>` : '';
}).join('\n');
// Les articles parlent du Léman : on n'y liste que ses loueurs et saunas.
const duLeman = (l) => lacDe(SPOTS.find((s) => s.id === l.spot)) === 'leman';
const listeLoc = (acts, L, filtre = () => true) => `<ul class="liste">\n${LOCATIONS.filter((l) => duLeman(l) && l.activites.some((a) => acts.includes(a)) && filtre(l)).map((l) =>
  `  <li><strong><a href="${l.site ?? l.source}">${l.nom}</a></strong>, ${villeDe(l.ville, L)}${saison(l, L)}, ${{ fr: 'près de', en: 'near', de: 'bei', it: 'vicino a' }[L]} <a href="{plage:${l.spot}}">${nomSpot(l.spot)}</a>${DEUX_PTS(L)}${texteLieu(l, L, 'loc')}</li>`).join('\n')}\n</ul>`;

const IMG = {
  coupeDepart: { image: 'presentation/img/coupe-noel-depart.jpg', hauteur: 1071, alt: { fr: 'Nageurs sur le ponton de départ de la Coupe de Noël à Genève', en: 'Swimmers on the start pontoon of the Coupe de Noël in Geneva' },
    credit: { fr: 'La Coupe de Noël 2012, Genève', en: 'The 2012 Coupe de Noël, Geneva' }, auteur: 'Clément Bucco-Lechat', licence: ['CC BY-SA 3.0', 'https://creativecommons.org/licenses/by-sa/3.0/'], page: 'https://commons.wikimedia.org/wiki/File:2012_Coupe_de_Noel_-_Geneva_12.JPG' },
  coupeBonnets: { image: 'presentation/img/coupe-noel-bonnets.jpg', hauteur: 1071, alt: { fr: 'Nageurs en bonnet dans le lac pendant la Coupe de Noël à Genève', en: 'Swimmers in caps in the lake during the Coupe de Noël in Geneva' },
    credit: { fr: 'La Coupe de Noël 2012, Genève', en: 'The 2012 Coupe de Noël, Geneva' }, auteur: 'Clément Bucco-Lechat', licence: ['CC BY-SA 3.0', 'https://creativecommons.org/licenses/by-sa/3.0/'], page: 'https://commons.wikimedia.org/wiki/File:2012_Coupe_de_Noel_-_Geneva_09.JPG' },
  bise: { image: 'presentation/img/bise-geneve.jpg', hauteur: 1067, alt: { fr: 'Un ponton couvert de glace sur la rade de Genève après un coup de bise', en: 'A pontoon coated in ice on Geneva harbour after a spell of bise' },
    credit: { fr: 'Effet de la bise à Genève', en: 'The bise at work in Geneva' }, auteur: 'Patrick Nouhailler', licence: ['CC BY-SA 3.0', 'https://creativecommons.org/licenses/by-sa/3.0/'], page: 'https://commons.wikimedia.org/wiki/File:Effet_de_la_Bise_a_Geneve_-_panoramio_(4).jpg' },
  satellite: { image: 'presentation/img/leman-satellite.jpg', hauteur: 1108, alt: { fr: 'Le Léman vu par le satellite Sentinel-2', en: 'Lake Geneva seen by the Sentinel-2 satellite' },
    credit: { fr: 'Le Léman vu par Sentinel-2, juin 2018', en: 'Lake Geneva seen by Sentinel-2, June 2018' }, auteur: 'Copernicus Sentinel-2, ESA', licence: ['CC BY-SA 3.0 IGO', 'https://creativecommons.org/licenses/by-sa/3.0/igo/'], page: 'https://commons.wikimedia.org/wiki/File:Lake_Geneva_by_Sentinel-2.jpg' },
  vidy: { image: 'presentation/img/vidy.jpg', hauteur: 1067, alt: { fr: 'La plage de Vidy à Lausanne, en été', en: 'Vidy beach in Lausanne, in summer' },
    credit: { fr: 'La plage de Vidy, Lausanne', en: 'Vidy beach, Lausanne' }, auteur: 'Gzzz', licence: ['CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'], page: 'https://commons.wikimedia.org/wiki/File:Vidy_plage_Lausanne_2020_(1).jpg' },
  paquisEte: { image: 'presentation/img/paquis-ete.jpg', hauteur: 1200, alt: { fr: 'La jetée et le bassin des Bains des Pâquis à Genève, en été', en: 'The jetty and bathing area of the Bains des Pâquis in Geneva, in summer' },
    credit: { fr: 'Les Bains des Pâquis, Genève', en: 'The Bains des Pâquis, Geneva' }, auteur: 'Mourad Ben Abdallah', licence: ['CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'], page: 'https://commons.wikimedia.org/wiki/File:Bains_des_P%C3%A2quis_-_JeP_2022_-_Jet%C3%A9e.jpg' },
  paddle: { image: 'presentation/img/paddle.jpg', hauteur: 1200, alt: { fr: 'Trois personnes en stand up paddle sur un lac au coucher du soleil', en: 'Three people stand-up paddling on a lake at sunset' },
    credit: { fr: 'Paddle sur le lac de Zurich', en: 'Paddling on Lake Zurich' }, auteur: 'Roland zh', licence: ['CC BY-SA 3.0', 'https://creativecommons.org/licenses/by-sa/3.0/'], page: 'https://commons.wikimedia.org/wiki/File:%27Paddler%27_-_B%C3%BCrkliplatz_2012-08-08_19-28-38_(WB850F).JPG' },
  kite: { image: 'presentation/img/kite-zoug.jpg', hauteur: 900, alt: { fr: 'Un kitesurfeur sur le lac de Zoug, les Alpes enneigées au fond', en: 'A kitesurfer on Lake Zug, snowy Alps behind' },
    credit: { fr: 'Kitesurf sur le lac de Zoug', en: 'Kitesurfing on Lake Zug' }, auteur: 'Roy Egloff', licence: ['CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'], page: 'https://commons.wikimedia.org/wiki/File:CH.ZG.Zug_Brueggli_2021-05-25_Lake-Zug_Kitesurfing_01_16x9-R.jpg' },
  bateauSki: { image: 'presentation/img/bateau-ski.jpg', hauteur: 1067, alt: { fr: 'Un bateau de ski nautique amarré sur le Léman, des paddles au loin', en: 'A water-ski boat moored on Lake Geneva, paddleboarders in the distance' },
    credit: { fr: 'Bateau de ski nautique sur le Léman, Vaud', en: 'Water-ski boat on Lake Geneva, Vaud' }, auteur: 'Christian David', licence: ['CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'], page: 'https://commons.wikimedia.org/wiki/File:Moored_ski_boat_and_paddleboarders,_Lake_Geneva,_Vaud.jpg' },
  yvoire: { image: 'presentation/img/yvoire.jpg', hauteur: 1150, alt: { fr: 'Le port et le front de lac d’Yvoire', en: 'The harbour and lakefront of Yvoire' },
    credit: { fr: 'Le front de lac d’Yvoire', en: 'The Yvoire lakefront' }, auteur: 'Zairon', licence: ['CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'], page: 'https://commons.wikimedia.org/wiki/File:Yvoire_Front_du_Lac_6.jpg' },
  glace: { image: 'presentation/img/trou-glace.jpg', hauteur: 1067, alt: { fr: 'Une échelle de bain d’hiver plongeant dans un trou creusé dans la glace', en: 'A winter-swimming ladder going down into a hole cut in the ice' },
    credit: { fr: 'Bain d’hiver à Malmö, Suède', en: 'Winter swimming in Malmö, Sweden' }, auteur: 'Johan Jönsson (Julle)', licence: ['CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'], page: 'https://commons.wikimedia.org/wiki/File:Trappa_Ribergsborgsstranden_brygga_10_vinterbad_februari_2021_01.jpg' },
  apresBain: { image: 'presentation/img/apres-bain.jpg', hauteur: 1067, alt: { fr: 'Un nageur d’hiver enveloppé dans une serviette boit une boisson chaude après le bain', en: 'A winter swimmer wrapped in a towel drinks something hot after the swim' },
    credit: { fr: 'Après la course, championnats du monde de nage hivernale, Rovaniemi 2014', en: 'After the race, Winter Swimming World Championships, Rovaniemi 2014' }, auteur: 'Udrekeli', licence: ['CC BY-SA 3.0', 'https://creativecommons.org/licenses/by-sa/3.0/'], page: 'https://commons.wikimedia.org/wiki/File:Henri_kuprashvili_-_The_Winter_Swimming_2014.JPG' },
  ouchy: { image: 'presentation/img/ouchy.jpg', hauteur: 900, alt: { fr: 'Les quais d’Ouchy au bord du Léman', en: 'The Ouchy waterfront on Lake Geneva' },
    credit: { fr: 'Les quais d’Ouchy, Lausanne', en: 'The Ouchy waterfront, Lausanne' }, auteur: 'Gnu-Bricoleur', licence: ['CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'], page: 'https://commons.wikimedia.org/wiki/File:Quai_sur_lac.jpg' },
};
// Légendes et textes alternatifs en allemand et en italien : [alt de, alt it, légende de, légende it].
const IMG_DE_IT = {
  coupeDepart: ['Schwimmer auf dem Startponton der Coupe de Noël in Genf', 'Nuotatori sul pontile di partenza della Coupe de Noël a Ginevra', 'Die Coupe de Noël 2012, Genf', 'La Coupe de Noël 2012, Ginevra'],
  coupeBonnets: ['Schwimmer mit Badekappen im See bei der Coupe de Noël in Genf', 'Nuotatori con la cuffia nel lago durante la Coupe de Noël a Ginevra', 'Die Coupe de Noël 2012, Genf', 'La Coupe de Noël 2012, Ginevra'],
  bise: ['Ein eisbedeckter Steg in der Rade von Genf nach einem Bise-Stoss', 'Un pontile coperto di ghiaccio nella rada di Ginevra dopo un colpo di bise', 'Die Bise am Werk in Genf', 'La bise all’opera a Ginevra'],
  satellite: ['Der Genfersee vom Satelliten Sentinel-2 aus gesehen', 'Il Lemano visto dal satellite Sentinel-2', 'Der Genfersee, gesehen von Sentinel-2, Juni 2018', 'Il Lemano visto da Sentinel-2, giugno 2018'],
  vidy: ['Der Strand von Vidy in Lausanne im Sommer', 'La spiaggia di Vidy a Losanna, in estate', 'Der Strand von Vidy, Lausanne', 'La spiaggia di Vidy, Losanna'],
  paquisEte: ['Der Steg und das Becken der Bains des Pâquis in Genf im Sommer', 'Il molo e la vasca dei Bains des Pâquis a Ginevra, in estate', 'Die Bains des Pâquis, Genf', 'I Bains des Pâquis, Ginevra'],
  paddle: ['Drei Menschen beim Stand-up-Paddeln auf einem See bei Sonnenuntergang', 'Tre persone in stand up paddle su un lago al tramonto', 'Paddeln auf dem Zürichsee', 'Paddle sul lago di Zurigo'],
  kite: ['Ein Kitesurfer auf dem Zugersee, im Hintergrund verschneite Alpen', 'Un kitesurfista sul lago di Zugo, sullo sfondo le Alpi innevate', 'Kitesurfen auf dem Zugersee', 'Kitesurf sul lago di Zugo'],
  bateauSki: ['Ein Wasserskiboot am Genfersee vertäut, Paddler in der Ferne', 'Una barca da sci nautico ormeggiata sul Lemano, paddle in lontananza', 'Wasserskiboot auf dem Genfersee, Waadt', 'Barca da sci nautico sul Lemano, Vaud'],
  ouchy: ['Die Quais von Ouchy am Genfersee', 'I lungolaghi di Ouchy sul Lemano', 'Die Quais von Ouchy, Lausanne', 'I lungolaghi di Ouchy, Losanna'],
  yvoire: ['Der Hafen und die Seepromenade von Yvoire', 'Il porto e il lungolago di Yvoire', 'Die Seepromenade von Yvoire', 'Il lungolago di Yvoire'],
  glace: ['Eine Winterbade-Leiter, die in ein ins Eis gesägtes Loch führt', 'Una scaletta da bagno invernale che scende in un buco aperto nel ghiaccio', 'Winterbaden in Malmö, Schweden', 'Bagno invernale a Malmö, Svezia'],
  apresBain: ['Ein in ein Handtuch gehüllter Winterschwimmer trinkt nach dem Bad etwas Heisses', 'Un nuotatore invernale avvolto in un asciugamano beve qualcosa di caldo dopo il bagno', 'Nach dem Rennen, Weltmeisterschaften im Winterschwimmen, Rovaniemi 2014', 'Dopo la gara, campionati mondiali di nuoto invernale, Rovaniemi 2014'],
};
for (const [k, [ad, ai, cd, ci]] of Object.entries(IMG_DE_IT)) Object.assign(IMG[k].alt, { de: ad, it: ai }), Object.assign(IMG[k].credit, { de: cd, it: ci });

const SSS = ['Société Suisse de Sauvetage SSS, « Nager en eau froide »', 'https://www.slrg.ch/sites/default/files/2025-02/Fiche-nager-en-eau-froide-web.pdf'];
const ALPLAKES = ['Alplakes, Eawag (CC BY 4.0)', 'https://www.alplakes.eawag.ch'];
const OPENMETEO = ['Open-Meteo', 'https://open-meteo.com'];
const METEOSUISSE = ['MétéoSuisse, les vents du Léman', 'https://www.meteoschweiz.admin.ch/wetter/wetter-und-klima-von-a-bis-z/winde-genfersee.html'];
const CIPEL = ['CIPEL, carte des plages', 'https://www.cipel.org/carte-des-plages/'];
const GE_QUALITE = ['Canton de Genève, qualité de l’eau de baignade', 'https://www.ge.ch/plages-lieux-baignade-eaux-vives-geneve/qualite-eau-baignade'];
const SITG = ['SITG, plages et qualité des eaux de baignade (opendata.swiss)', 'https://opendata.swiss/fr/dataset?q=ECO_PLAGES'];
const BPA = ['BPA, une bouée de natation peut sauver une vie', 'https://www.bfu.ch/media/gdkcesaq/baignade-en-eaux-libres-une-bouee-de-natation-peut-sauver-une-vie.pdf'];
const RNLI = ['RNLI, « Float to live » : le choc du froid', 'https://rnli.org/news-and-media/2017/may/25/rnli-says-fight-your-instincts-not-the-water-to-help-stay-alive'];
const PORTSMOUTH = ['Université de Portsmouth, Float to Live en eau libre', 'https://www.port.ac.uk/news-events-and-blogs/news/inexperienced-water-users-can-float-to-live-in-open-water-conditions'];
const OSS_KIT = ['Outdoor Swimming Society, équipement d’hiver', 'https://www.outdoorswimmingsociety.com/swim-accessories-winter/'];
const AFTERDROP = ['220 Triathlon, se réchauffer après une nage en eau libre', 'https://www.220triathlon.com/gear/swim/how-to-warm-your-cold-body-up-after-open-water-swimming/'];
const ALERTDIVER = ['DAN Alert Diver, hypothermie', 'https://alertdiver.eu/fr_FR/articles/hypothermie/'];
const GE_NAV = ['Canton de Genève, ski nautique, wakeboard et wakesurf', 'https://www.ge.ch/naviguer-geneve/ski-nautique-wakeboard-wakesurf'];

export const ARTICLES = [
  {
    slug: 'bain-d-hiver-leman', sante: true, publie: '2026-11-06', modifie: '2026-11-06', ...IMG.coupeDepart,
    sources: [SSS, ['BPA, une bouée de natation peut sauver une vie', 'https://www.bfu.ch/media/gdkcesaq/baignade-en-eaux-libres-une-bouee-de-natation-peut-sauver-une-vie.pdf'],
      ['Bains des Rives, Lausanne (loisirs.ch)', 'https://www.loisirs.ch/activite/bains-des-rives-a-lausanne-sauna/'], ['Sauna Boats Genève', 'https://saunaboat-geneve.ch/fr/'], ALPLAKES],
    fr: {
      titre: 'Bain d’hiver dans le Léman : bien débuter à Genève et Lausanne',
      h1: 'Bain d’hiver dans le Léman : bien débuter',
      desc: 'Combien de temps rester dans l’eau, comment entrer, où se baigner et se réchauffer à Genève et Lausanne : le guide du bain d’hiver dans le Léman, avec l’eau du jour plage par plage.',
      bref: 'Le bain d’hiver se pratique dans le Léman quand l’eau passe sous 15 °C, en gros d’octobre à mai. La Société Suisse de Sauvetage (SSS) donne une règle simple : <strong>ne pas rester plus de minutes que l’eau n’a de degrés</strong> (5 °C = 5 minutes au maximum). Entrer lentement, garder la tête hors de l’eau avec un bonnet, ne jamais y aller seul, sortir au moindre malaise, puis se sécher et s’habiller chaudement, sans douche chaude.',
      html: (L) => `
<h2>Combien de temps peut-on rester dans l’eau froide ?</h2>
<p>La fiche « Nager en eau froide » de la SSS propose un repère facile à retenir : la température de l’eau en degrés donne la durée maximale de la baignade en minutes. À 10 °C, on ne dépasse pas 10 minutes ; à 5 °C, 5 minutes. C’est un maximum, pas un objectif : les premières fois, quelques brasses suffisent largement.</p>
<p><a href="#eau-du-jour">L’eau du jour</a> est affichée plus bas et, plage par plage, dans <a href="{app}">l’app Mon Lac</a>.</p>
<h2>Comment entrer dans l’eau froide sans danger ?</h2>
<ul class="liste">
  <li><strong>Entrer lentement</strong> pour laisser le corps s’habituer, sans sauter ni plonger.</li>
  <li><strong>Garder la tête hors de l’eau</strong> et porter un bonnet.</li>
  <li><strong>Ne jamais y aller seul</strong> : le Bureau de prévention des accidents (BPA) recommande aussi une aide à la flottaison, comme une bouée de natation.</li>
  <li><strong>Sortir immédiatement</strong> si l’on se sent mal.</li>
  <li><strong>Être en bonne condition physique</strong> : la SSS rappelle que l’eau froide le demande. En cas de doute sur sa santé, on en parle à son médecin avant de commencer.</li>
</ul>
<h2>Que faire en sortant de l’eau ?</h2>
<p>Se sécher soigneusement et enfiler tout de suite des vêtements chauds et secs. La SSS déconseille la douche chaude juste après, les endroits exposés au vent et les gros efforts. Une boisson tiède aide à se réchauffer de l’intérieur.</p>
<h2>Où se baigner l’hiver à Genève et à Lausanne ?</h2>
<p><strong>Genève.</strong> Les <a href="{plage:bains-des-paquis}">Bains des Pâquis</a> restent le rendez-vous des nageurs d’hiver ; leur buvette est ouverte toute l’année, avec la fondue l’hiver. En décembre, la Coupe de Noël se nage dans la rade. Pour se réchauffer autrement, le Sauna Boats Genève propose un sauna flottant au départ du quai Gustave-Ador, près de la <a href="{plage:plage-des-eaux-vives}">plage des Eaux-Vives</a>.</p>
<p><strong>Lausanne.</strong> À Bellerive, les Bains des Rives installent d’octobre à mars des yourtes-saunas au bord du lac, avec un plongeon dans le Léman entre deux séances, près de la <a href="{plage:lausanne-bellerive}">plage de Bellerive</a>.</p>
<p>La <a href="{plages}">liste des 65 plages</a> donne la température et le vent de chacune.</p>
<h2>Où se réchauffer dans un sauna au bord du Léman ?</h2>
${listeLoc(['sauna'], L)}
<p>Horaires, prix et réservation changent d’une saison à l’autre : à vérifier auprès de chaque lieu.</p>
<h2>Comment Mon Lac aide pour le bain d’hiver ?</h2>
<p>D’octobre à mai, dès que l’eau est sous 15 °C, la case « Baignade » de l’app devient « Bain d’hiver ». Sa note dépend surtout du vent : l’eau froide est le but, les rafales et les vagues beaucoup moins. Le <strong>défi bain d’hiver</strong> garde la date, la plage et la température de chaque bain, et l’historique se partage en un geste. Pour aller plus loin : <a href="{blog:choc-thermique-eau-froide}">les 90 premières secondes dans l’eau froide</a>, <a href="{blog:materiel-bain-d-hiver}">le matériel</a> et <a href="{blog:afterdrop-se-rechauffer}">se réchauffer après le bain</a>. Pour les chiffres, voir <a href="{blog:temperature-lac-leman}">comment la température du Léman est calculée</a>.</p>`,
    },
    en: {
      titre: 'Winter swimming in Lake Geneva: getting started in Geneva and Lausanne',
      h1: 'Winter swimming in Lake Geneva: getting started',
      desc: 'How long to stay in, how to get in, where to swim and warm up in Geneva and Lausanne: a guide to winter swimming in Lake Geneva, with today’s water temperature beach by beach.',
      bref: 'Winter swimming in Lake Geneva starts when the water drops below 15 °C, roughly from October to May. The Swiss Lifesaving Society (SLRG/SSS) gives a simple rule: <strong>stay in no more minutes than the water has degrees</strong> (5 °C = 5 minutes at most). Get in slowly, keep your head out of the water with a cap on, never go alone, get out at the first sign of feeling unwell, then dry off and dress warmly, without a hot shower.',
      html: (L) => `
<h2>How long can you stay in cold water?</h2>
<p>The Swiss Lifesaving Society’s cold-water sheet gives an easy rule of thumb: the water temperature in degrees is the maximum swim time in minutes. At 10 °C, no more than 10 minutes; at 5 °C, 5 minutes. It is a maximum, not a target: the first few times, a few strokes are plenty.</p>
<p><a href="#eau-du-jour">Today’s water temperature</a> is shown below, and beach by beach in <a href="{app}">the My Lake app</a>.</p>
<h2>How do you get into cold water safely?</h2>
<ul class="liste">
  <li><strong>Get in slowly</strong> to let your body adjust; no jumping or diving.</li>
  <li><strong>Keep your head out of the water</strong> and wear a cap.</li>
  <li><strong>Never go alone</strong>: the Swiss Council for Accident Prevention (BFU) also recommends a flotation aid such as a swim buoy.</li>
  <li><strong>Get out straight away</strong> if you feel unwell.</li>
  <li><strong>Be in good physical shape</strong>: cold water demands it. If in doubt about your health, talk to your doctor first.</li>
</ul>
<h2>What should you do when you get out?</h2>
<p>Dry off thoroughly and put on warm, dry clothes right away. The lifesaving society advises against a hot shower straight after, windy spots and hard exercise. A warm drink helps you warm up from the inside.</p>
<h2>Where can you swim in winter in Geneva and Lausanne?</h2>
<p><strong>Geneva.</strong> The <a href="{plage:bains-des-paquis}">Bains des Pâquis</a> are the winter swimmers’ meeting point; their café is open all year, with fondue in winter. In December, the Coupe de Noël race is swum in the harbour. To warm up differently, Sauna Boats Genève runs a floating sauna from Quai Gustave-Ador, near <a href="{plage:plage-des-eaux-vives}">Eaux-Vives beach</a>.</p>
<p><strong>Lausanne.</strong> At Bellerive, the Bains des Rives set up lakeside yurt saunas from October to March, with a dip in the lake between sessions, near <a href="{plage:lausanne-bellerive}">Bellerive beach</a>.</p>
<p>The <a href="{plages}">list of all 65 beaches</a> gives the water temperature and wind for each one.</p>
<h2>Where can you warm up in a sauna by Lake Geneva?</h2>
${listeLoc(['sauna'], L)}
<p>Hours, prices and booking change from season to season: check with each place.</p>
<h2>How does My Lake help with winter swimming?</h2>
<p>From October to May, once the water is below 15 °C, the app’s “Swimming” tile becomes “Winter swim”. Its rating depends mostly on the wind: cold water is the point, gusts and waves much less so. The <strong>winter swim challenge</strong> keeps the date, beach and water temperature of each swim, and your history can be shared in one tap. Read on: <a href="{blog:choc-thermique-eau-froide}">the first 90 seconds in cold water</a>, <a href="{blog:materiel-bain-d-hiver}">what to bring</a> and <a href="{blog:afterdrop-se-rechauffer}">warming up afterwards</a>. For the figures, see <a href="{blog:temperature-lac-leman}">how Lake Geneva’s temperature is calculated</a>.</p>`,
    },
  },
  {
    slug: 'bise-leman', publie: '2026-10-30', modifie: '2026-11-01', ...IMG.bise,
    sources: [METEOSUISSE, ['SISL, dossier technique « Le Léman »', 'https://sisl.ch/images/Dossiers_techniques/le_leman.pdf'], OPENMETEO],
    fr: {
      titre: 'La bise sur le Léman : ce qu’elle change pour la baignade, le paddle et le kite',
      h1: 'La bise sur le Léman, et ce qu’elle change sur l’eau',
      desc: 'D’où vient la bise, comment la reconnaître et à partir de quand elle gêne la baignade et le paddle, alors que kitesurfeurs, windsurfeurs et foilers l’attendent.',
      bref: 'La bise est un vent froid et sec qui souffle du nord-est. Pour MétéoSuisse, c’est <strong>le vent le plus caractéristique du Léman</strong> : elle s’installe quand une haute pression couvre les îles Britanniques et une basse pression l’Italie. Elle lève des vagues qui gênent la baignade, le paddle et les sorties en bateau, mais elle fait le bonheur des kitesurfeurs, des windsurfeurs et des foilers.',
      html: () => `
<h2>D’où vient la bise ?</h2>
<p>Selon MétéoSuisse, la bise s’établit lorsqu’une haute pression recouvre les îles Britanniques et une basse pression l’Italie. L’air froid est alors canalisé par le Plateau suisse, qui se resserre vers l’ouest, et accélère en arrivant sur le Léman.</p>
<h2>D’où souffle-t-elle sur le lac ?</h2>
<p>Sur le Petit-Lac (côté Genève) et le Grand-Lac, la bise souffle du <strong>nord-est</strong>. Sur le Haut-Lac, ralentie par les Alpes vaudoises, elle est déviée vers l’embouchure du Rhône et souffle plutôt du nord-nord-ouest (MétéoSuisse). La Société internationale de sauvetage du Léman (SISL) la décrit comme le vent le plus fréquent du lac, et note que la température baisse vite à son passage.</p>
<h2>Comment savoir s’il y a de la bise aujourd’hui ?</h2>
<p>Un vent de nord-est, froid et sec, qui forme des moutons sur le lac : c’est elle. Dans <a href="{app}">Mon Lac</a>, on parle de bise quand le vent vient du nord-est (entre 20 et 80°) et dépasse 15 km/h ; l’app l’annonce alors en haut de l’écran. La flèche du vent, plage par plage, montre d’où il souffle.</p>
<h2>Peut-on se baigner ou faire du paddle par bise ?</h2>
<p>Par bise forte, mieux vaut attendre : elle lève des vagues et du courant près des rives exposées. Voici les repères de l’app (ce ne sont pas des normes officielles) :</p>
<ul class="liste">
  <li><strong>Baignade</strong> : au-delà de 25 km/h de bise, la note ne dépasse pas « Bof ».</li>
  <li><strong>Paddle</strong> : la note baisse dès que les rafales passent 12 km/h, et devient « Non » au-delà de 28 km/h (voir <a href="{blog:paddle-leman}">le paddle sur le Léman</a>).</li>
  <li><strong>Sortie en bateau</strong> : plafonnée à « Bof » quand la bise dépasse 25 km/h.</li>
</ul>
<h2>Pourquoi les kitesurfeurs et les foilers aiment la bise ?</h2>
<p>Parce que c’est un vent établi et souvent soutenu. Dans l’app, le kitesurf est « Parfait » entre 22 et 40 km/h de vent, le windsurf entre 20 et 40 km/h. Pour le foil, une bise d’au moins 25 km/h donne une note « Parfait » : c’est le vent des <strong>downwinds</strong>, ces longues descentes portées par les vagues. Plus de détails dans <a href="{blog:kitesurf-windsurf-wingfoil-leman}">kitesurf, windsurf et wingfoil sur le Léman</a>.</p>`,
    },
    en: {
      titre: 'The bise on Lake Geneva: what it means for swimming, paddleboarding and kitesurfing',
      h1: 'The bise on Lake Geneva, and what it changes on the water',
      desc: 'Where the bise comes from, how to recognise it and when it spoils swimming and paddleboarding, while kitesurfers, windsurfers and foilers wait for it.',
      bref: 'The bise is a cold, dry wind blowing from the north-east. MeteoSwiss calls it <strong>Lake Geneva’s most characteristic wind</strong>: it sets in when high pressure covers the British Isles and low pressure sits over Italy. It whips up waves that spoil swimming, paddleboarding and boat trips, but kitesurfers, windsurfers and foilers love it.',
      html: () => `
<h2>Where does the bise come from?</h2>
<p>According to MeteoSwiss, the bise sets in when high pressure covers the British Isles and low pressure lies over Italy. The cold air is channelled by the Swiss Plateau, which narrows towards the west, and speeds up as it reaches Lake Geneva.</p>
<h2>Which direction does it blow from on the lake?</h2>
<p>On the Petit-Lac (the Geneva end) and the Grand-Lac, the bise blows from the <strong>north-east</strong>. On the Haut-Lac, slowed by the Vaud Alps, it is deflected towards the mouth of the Rhône and blows more from the north-north-west (MeteoSwiss). The Lake Geneva lifesaving society (SISL) describes it as the lake’s most frequent wind and notes that temperatures drop quickly when it arrives.</p>
<h2>How do you know if the bise is blowing today?</h2>
<p>A cold, dry north-easterly that raises whitecaps on the lake: that is the bise. In <a href="{app}">My Lake</a>, it counts as bise when the wind comes from the north-east (20 to 80°) and exceeds 15 km/h; the app then flags it at the top of the screen. The wind arrow for each beach shows where it is coming from.</p>
<h2>Can you swim or paddleboard when the bise blows?</h2>
<p>In a strong bise it is better to wait: it raises waves and currents along exposed shores. These are the app’s guidelines (not official standards):</p>
<ul class="liste">
  <li><strong>Swimming</strong>: above 25 km/h of bise, the rating stays at “Meh” at best.</li>
  <li><strong>Paddleboarding</strong>: the rating drops once gusts pass 12 km/h and becomes “No” above 28 km/h (see <a href="{blog:paddle-leman}">paddleboarding on Lake Geneva</a>).</li>
  <li><strong>Boat trip</strong>: capped at “Meh” when the bise exceeds 25 km/h.</li>
</ul>
<h2>Why do kitesurfers and foilers love the bise?</h2>
<p>Because it is steady and often strong. In the app, kitesurfing is “Perfect” between 22 and 40 km/h, windsurfing between 20 and 40 km/h. For foiling, a bise of at least 25 km/h gives a “Perfect” rating: it is the wind for <strong>downwinders</strong>, long runs carried by the waves. More in <a href="{blog:kitesurf-windsurf-wingfoil-leman}">kitesurfing, windsurfing and wing foiling on Lake Geneva</a>.</p>`,
    },
  },
  {
    slug: 'temperature-lac-leman', publie: '2026-10-22', modifie: '2026-10-22', ...IMG.satellite,
    sources: [['Eawag, « Cold shock in Lake Geneva: Alplakes shows why »', 'https://www.eawag.ch/en/info/portal/news/news-detail/cold-shock-in-lake-geneva-alplakes-shows-why'],
      ['Eawag, projet Alplakes', 'https://www.eawag.ch/fr/abteilung/surf/projekte/alplakes'], ALPLAKES,
      ['EGU 2026, précision des simulations des lacs suisses', 'https://meetingorganizer.copernicus.org/EGU26/EGU26-12579.html']],
    fr: {
      titre: 'Température du lac Léman : d’où viennent les chiffres et pourquoi ils varient',
      h1: 'Température du lac Léman : comment elle est mesurée, et pourquoi elle varie',
      desc: 'Comment l’eau du Léman est calculée à 70 cm devant chaque plage, pourquoi elle peut perdre plusieurs degrés en deux jours, et où la consulter en direct.',
      bref: 'Mon Lac affiche la température de l’eau <strong>à 70 cm sous la surface, devant chacune des 65 plages</strong>, mise à jour toutes les trois heures à partir du modèle Alplakes de l’Eawag. Elle peut différer de plusieurs degrés d’une plage à l’autre le même jour, et chuter brutalement quand un vent fort fait remonter l’eau froide du fond : c’est l’« upwelling ».',
      html: () => `
<h2>Comment la température du Léman est-elle calculée ?</h2>
<p>Les chiffres viennent d’<strong>Alplakes</strong>, la plateforme de l’Eawag (l’institut de recherche sur l’eau du domaine des EPF). Elle combine des modèles numériques des lacs et des données satellitaires pour calculer la température de l’eau à différentes profondeurs, avec des prévisions sur plusieurs jours. L’Eawag indique, pour les grands lacs, une erreur d’environ 1 °C en surface.</p>
<p>Mon Lac lit la valeur du modèle devant chaque plage, à 70 cm de profondeur, toutes les trois heures. Les données sont publiées sous licence CC BY 4.0.</p>
<h2>Pourquoi 70 cm sous la surface ?</h2>
<p>Parce que c’est à peu près l’eau dans laquelle on nage. La toute première pellicule de surface se réchauffe ou se refroidit très vite avec le soleil et l’air ; un peu plus bas, la valeur est plus stable et plus proche de ce que l’on ressent en entrant.</p>
<h2>Pourquoi l’eau n’a-t-elle pas la même température partout ?</h2>
<p>Le Léman est grand et profond, et le vent y déplace l’eau de surface. Quand un vent fort souffle longtemps dans la même direction, il pousse l’eau chaude de surface ; pour compenser, de l’eau froide profonde remonte près de certaines rives. Les scientifiques appellent ce phénomène l’<strong>upwelling</strong>.</p>
<ul class="liste">
  <li>En juin 2025, l’eau est passée de 19 à 11 °C en quelques jours près de Genève, sous un vent fort et persistant du sud-ouest ; Alplakes l’avait prévu plusieurs jours à l’avance (Eawag).</li>
  <li>Le record connu : fin juin 2017, l’eau des <a href="{plage:bains-des-paquis}">Bains des Pâquis</a> est passée de 23 à tout juste 8 °C en deux jours (Eawag).</li>
</ul>
<p>Résultat : le même jour, deux plages peuvent afficher plusieurs degrés d’écart. <a href="#eau-du-jour">L’écart du moment</a> est calculé ci-dessous.</p>
<h2>Où voir la température du Léman en direct ?</h2>
<p>Dans l’<a href="{app}">app Mon Lac</a>, gratuite et sans compte, avec le vent, la bise et un verdict pour chaque activité. La <a href="{plages}">liste des 65 plages</a> donne aussi une page par plage, de Genève à Saint-Gingolph et d’Évian à Chens-sur-Léman.</p>`,
    },
    en: {
      titre: 'Lake Geneva water temperature: where the figures come from and why they vary',
      h1: 'Lake Geneva water temperature: how it is measured, and why it varies',
      desc: 'How Lake Geneva’s water is calculated 70 cm below the surface in front of each beach, why it can drop several degrees in two days, and where to check it live.',
      bref: 'My Lake shows the water temperature <strong>70 cm below the surface, in front of each of the 65 beaches</strong>, updated every three hours from Eawag’s Alplakes model. It can differ by several degrees from one beach to another on the same day, and drop sharply when a strong wind brings cold water up from the depths: this is called “upwelling”.',
      html: () => `
<h2>How is Lake Geneva’s temperature calculated?</h2>
<p>The figures come from <strong>Alplakes</strong>, the platform run by Eawag, the Swiss Federal Institute of Aquatic Science and Technology. It combines numerical lake models and satellite data to calculate water temperature at different depths, with forecasts several days ahead. Eawag reports an error of about 1 °C at the surface for large lakes.</p>
<p>My Lake reads the model value in front of each beach, at 70 cm depth, every three hours. The data are published under a CC BY 4.0 licence.</p>
<h2>Why 70 cm below the surface?</h2>
<p>Because that is roughly the water you swim in. The very top layer warms or cools very quickly with sun and air; a little deeper, the value is more stable and closer to what you feel when you get in.</p>
<h2>Why isn’t the water the same temperature everywhere?</h2>
<p>Lake Geneva is large and deep, and wind moves its surface water around. When a strong wind blows for a long time in the same direction, it pushes the warm surface water away; to compensate, cold deep water rises near some shores. Scientists call this <strong>upwelling</strong>.</p>
<ul class="liste">
  <li>In June 2025, the water near Geneva dropped from 19 to 11 °C within a few days under a strong, persistent south-westerly; Alplakes had forecast it several days ahead (Eawag).</li>
  <li>The known record: at the end of June 2017, the water at the <a href="{plage:bains-des-paquis}">Bains des Pâquis</a> fell from 23 to barely 8 °C in two days (Eawag).</li>
</ul>
<p>As a result, two beaches can be several degrees apart on the same day. <a href="#eau-du-jour">The current spread</a> is calculated below.</p>
<h2>Where can you check Lake Geneva’s temperature live?</h2>
<p>In the <a href="{app}">My Lake app</a>, free and with no account, with wind, bise and a verdict for each activity. The <a href="{plages}">list of all 65 beaches</a> also has one page per beach, from Geneva to Saint-Gingolph and from Évian to Chens-sur-Léman.</p>`,
    },
  },
  {
    slug: 'qualite-eau-baignade-leman', publie: '2026-11-08', modifie: '2026-11-08', ...IMG.vidy,
    sources: [GE_QUALITE, SITG, CIPEL],
    fr: {
      titre: 'Qualité de l’eau de baignade au Léman : comment savoir si on peut se baigner',
      h1: 'Qualité de l’eau de baignade au Léman : comment la vérifier',
      desc: 'Qui analyse l’eau des plages du Léman, comment lire les classements, et pourquoi une analyse d’août ne dit rien de l’eau en novembre.',
      bref: 'La qualité de l’eau de baignade du Léman est suivie par les autorités : à Genève, le <strong>canton</strong> publie des analyses datées plage par plage ; autour du lac, la <strong>CIPEL</strong> publie une carte et un classement des plages. Une analyse ne vaut que pour le moment où elle a été faite : avant de se baigner, il faut regarder sa date. Mon Lac n’affiche une qualité que si l’analyse a moins de 30 jours, et renvoie sinon vers la source.',
      html: () => `
<h2>Qui contrôle la qualité de l’eau des plages du Léman ?</h2>
<p>À Genève, le canton analyse l’eau des plages et des lieux de baignade et publie les résultats ; ils sont aussi diffusés en données ouvertes par le système d’information du territoire genevois (SITG). Pour l’ensemble du lac, la Commission internationale pour la protection des eaux du Léman (CIPEL) publie une carte des plages avec leur classement.</p>
<h2>Comment lire le classement d’une plage ?</h2>
<p>Les plages genevoises sont classées en catégories, de l’eau « excellente à bonne » à l’eau « de mauvaise qualité », en passant par « bonne à moyenne » et « pouvant être momentanément polluée ». Quand une plage est notée « pouvant être momentanément polluée », la baignade est à éviter en particulier après un orage, quand les eaux de ruissellement arrivent au lac. Une eau « de mauvaise qualité » signifie que la baignade est déconseillée.</p>
<h2>Pourquoi la date de l’analyse compte autant ?</h2>
<p>Parce que l’eau change : pluie, orage, vent et température modifient la situation d’une semaine à l’autre. Un prélèvement de l’été ne dit rien de l’eau en automne. C’est pourquoi l’<a href="{app}">app</a> n’affiche la qualité que si l’analyse date de moins de 30 jours ; le classement annuel ne dit rien de l’eau du jour et n’est donc pas affiché comme tel.</p>
<h2>Où vérifier la qualité de l’eau avant de se baigner ?</h2>
<ul class="liste">
  <li><strong>Plages genevoises</strong> : la page du canton consacrée à la qualité de l’eau de baignade.</li>
  <li><strong>Ailleurs sur le lac</strong> : la carte des plages de la CIPEL.</li>
  <li>Dans l’app, un lien en bas de page renvoie vers la bonne source selon la plage choisie.</li>
</ul>
<p>La <a href="{plages}">liste des plages</a> donne pour chacune la température de l’eau et le vent ; pour l’hiver, voir aussi <a href="{blog:bain-d-hiver-leman}">le guide du bain d’hiver</a>.</p>`,
    },
    en: {
      titre: 'Bathing water quality in Lake Geneva: how to know if you can swim',
      h1: 'Bathing water quality in Lake Geneva: how to check it',
      desc: 'Who tests the water at Lake Geneva’s beaches, how to read the ratings, and why an August test says nothing about the water in November.',
      bref: 'Lake Geneva’s bathing water is monitored by the authorities: in Geneva, the <strong>canton</strong> publishes dated test results beach by beach; around the lake, <strong>CIPEL</strong> publishes a beach map and ratings. A test only holds for the moment it was taken, so check its date before swimming. My Lake only shows water quality when the test is less than 30 days old, and otherwise links to the source.',
      html: () => `
<h2>Who checks the water quality at Lake Geneva’s beaches?</h2>
<p>In Geneva, the canton tests the water at beaches and swimming spots and publishes the results; they are also released as open data by the Geneva land information system (SITG). For the whole lake, the International Commission for the Protection of Lake Geneva (CIPEL) publishes a map of beaches with their ratings.</p>
<h2>How do you read a beach’s rating?</h2>
<p>Geneva beaches are rated in categories, from “excellent to good” water to “poor” water, via “good to fair” and “may be temporarily polluted”. When a beach is rated “may be temporarily polluted”, avoid swimming especially after a thunderstorm, when run-off reaches the lake. “Poor” water means swimming is not advised.</p>
<h2>Why does the date of the test matter so much?</h2>
<p>Because the water changes: rain, storms, wind and temperature alter things from one week to the next. A summer sample says nothing about the water in autumn. That is why the <a href="{app}">app</a> only shows water quality when the test is less than 30 days old; the annual rating says nothing about today’s water, so it is not shown as such.</p>
<h2>Where can you check the water quality before swimming?</h2>
<ul class="liste">
  <li><strong>Geneva beaches</strong>: the canton’s bathing water quality page.</li>
  <li><strong>Elsewhere on the lake</strong>: CIPEL’s beach map.</li>
  <li>In the app, a link at the bottom of the page points to the right source for the chosen beach.</li>
</ul>
<p>The <a href="{plages}">beach list</a> gives the water temperature and wind for each one; for winter, see also <a href="{blog:bain-d-hiver-leman}">the winter swimming guide</a>.</p>`,
    },
  },
  {
    slug: 'plages-geneve', publie: '2026-10-27', modifie: '2026-11-08', ...IMG.paquisEte,
    sources: [GE_QUALITE, ALPLAKES],
    fr: {
      titre: 'Où se baigner à Genève : les plages du canton, une par une',
      h1: 'Où se baigner à Genève : toutes les plages du canton',
      desc: 'Des Bains des Pâquis à Hermance, les plages genevoises du Léman avec leurs buvettes, et la température de l’eau du jour pour chacune.',
      bref: 'Le canton de Genève compte <strong>' + SPOTS.filter((s) => s.region === 'Genève').length + ' plages et lieux de baignade suivis par Mon Lac</strong>, de Pregny-Chambésy et Versoix sur la rive droite à Cologny, Corsier-Port et Hermance sur la rive gauche, en passant par les Bains des Pâquis et Genève-Plage au cœur de la ville. Chacun a sa page avec la température de l’eau à 70 cm et le vent du jour.',
      html: (L) => `
<h2>Quelles sont les plages de Genève ?</h2>
<p>Voici toutes les plages genevoises suivies par l’app, avec un lien vers leur page (eau, vent, verdict du jour) :</p>
${listePlages((s) => s.region === 'Genève', L)}
<h2>Où se baigner au centre de Genève ?</h2>
<p>Au cœur de la rade, les <a href="{plage:bains-des-paquis}">Bains des Pâquis</a> sur la rive droite et la <a href="{plage:plage-des-eaux-vives}">plage des Eaux-Vives</a> sur la rive gauche sont à deux pas du centre. Un peu plus loin sur la rive gauche, <a href="{plage:geneve-plage}">Genève-Plage</a> et <a href="{plage:baby-plage}">Baby-Plage</a> complètent l’offre.</p>
<h2>Où boire un verre au bord de l’eau à Genève ?</h2>
${listeLieux((x) => x.zone === 'geneve', L)}
<h2>Peut-on se baigner partout ?</h2>
<p>Avant de se baigner, il faut vérifier la qualité de l’eau auprès du canton, qui publie des analyses datées plage par plage : voir <a href="{blog:qualite-eau-baignade-leman}">comment vérifier la qualité de l’eau</a>. L’hiver, les plus courageux pratiquent le <a href="{blog:bain-d-hiver-leman}">bain d’hiver</a>.</p>`,
    },
    en: {
      titre: 'Where to swim in Geneva: every beach in the canton',
      h1: 'Where to swim in Geneva: all the canton’s beaches',
      desc: 'From the Bains des Pâquis to Hermance, Geneva’s Lake Geneva beaches with their cafés, and today’s water temperature for each one.',
      bref: 'The canton of Geneva has <strong>' + SPOTS.filter((s) => s.region === 'Genève').length + ' beaches and swimming spots covered by My Lake</strong>, from Pregny-Chambésy and Versoix on the right bank to Cologny, Corsier-Port and Hermance on the left bank, with the Bains des Pâquis and Genève-Plage in the heart of the city. Each has its own page with the water temperature at 70 cm and today’s wind.',
      html: (L) => `
<h2>What are Geneva’s beaches?</h2>
<p>Here are all the Geneva beaches covered by the app, with a link to each page (water, wind, today’s verdict):</p>
${listePlages((s) => s.region === 'Genève', L)}
<h2>Where can you swim in central Geneva?</h2>
<p>Right in the harbour, the <a href="{plage:bains-des-paquis}">Bains des Pâquis</a> on the right bank and <a href="{plage:plage-des-eaux-vives}">Eaux-Vives beach</a> on the left bank are a short walk from the centre. A little further along the left bank, <a href="{plage:geneve-plage}">Genève-Plage</a> and <a href="{plage:baby-plage}">Baby-Plage</a> complete the picture.</p>
<h2>Where can you have a drink by the water in Geneva?</h2>
${listeLieux((x) => x.zone === 'geneve', L)}
<h2>Can you swim anywhere?</h2>
<p>Before swimming, check the water quality with the canton, which publishes dated tests beach by beach: see <a href="{blog:qualite-eau-baignade-leman}">how to check water quality</a>. In winter, the bravest go <a href="{blog:bain-d-hiver-leman}">winter swimming</a>.</p>`,
    },
  },
  {
    slug: 'paddle-leman', publie: '2026-10-26', modifie: '2026-10-30', ...IMG.paddle,
    sources: [OPENMETEO, ...LOCATIONS.filter((l) => l.activites.includes('paddle')).map((l) => [l.nom, l.site ?? l.source])],
    fr: {
      titre: 'Paddle sur le Léman : quand le lac est assez calme, et où louer',
      h1: 'Paddle sur le Léman : quand sortir et où louer',
      desc: 'À partir de quel vent le paddle devient difficile sur le Léman, comment lire les rafales, et les loueurs de paddle de Genève à Saint-Gingolph.',
      bref: 'Pour le paddle, ce sont <strong>les rafales</strong> qui comptent. Dans Mon Lac, le paddle est « Parfait » jusqu’à 12 km/h de rafales, « Bien » jusqu’à 20 km/h, « Bof » jusqu’à 28 km/h et déconseillé au-delà ; la pluie ou un air sous 8 °C font perdre un cran. Par bise, mieux vaut rester près du bord ou attendre.',
      html: (L) => `
<h2>Quel vent maximum pour faire du paddle ?</h2>
<p>Debout sur une planche, on offre beaucoup de prise au vent, et les vagues déstabilisent vite. Ce sont les repères de l’<a href="{app}">app</a> (pas des normes officielles) :</p>
<ul class="liste">
  <li><strong>Parfait</strong> : rafales jusqu’à 12 km/h, le lac est un miroir.</li>
  <li><strong>Bien</strong> : jusqu’à 20 km/h, quelques vaguelettes.</li>
  <li><strong>Bof</strong> : jusqu’à 28 km/h, ça secoue.</li>
  <li><strong>Non</strong> : au-delà, ou en cas d’orage.</li>
</ul>
<p>La pluie ou un air sous 8 °C font perdre un cran. Le vent du jour, plage par plage, est dans l’app ; la <a href="{blog:bise-leman}">bise</a> mérite une attention particulière.</p>
<h2>Où louer un paddle sur le Léman ?</h2>
${listeLoc(['paddle'], L)}
<p>Prix, horaires et disponibilités changent : à vérifier auprès du loueur avant d’y aller.</p>
<h2>Quelle plage choisir pour débuter ?</h2>
<p>Une plage avec une entrée facile et un endroit abrité du vent du jour : la flèche de vent de chaque <a href="{plages}">page de plage</a> aide à choisir la rive la moins exposée.</p>`,
    },
    en: {
      titre: 'Paddleboarding on Lake Geneva: when the lake is calm enough, and where to rent',
      h1: 'Paddleboarding on Lake Geneva: when to go and where to rent',
      desc: 'At what wind speed paddleboarding gets hard on Lake Geneva, how to read gusts, and paddleboard rentals from Geneva to Saint-Gingolph.',
      bref: 'For paddleboarding, <strong>gusts</strong> are what matter. In My Lake, paddleboarding is “Perfect” up to 12 km/h of gusts, “Good” up to 20 km/h, “Meh” up to 28 km/h and not advised beyond; rain or air below 8 °C costs one notch. When the bise blows, stay close to shore or wait.',
      html: (L) => `
<h2>What is the maximum wind for paddleboarding?</h2>
<p>Standing on a board, you catch a lot of wind, and waves quickly throw you off balance. These are the <a href="{app}">app</a>’s guidelines (not official standards):</p>
<ul class="liste">
  <li><strong>Perfect</strong>: gusts up to 12 km/h, the lake is like glass.</li>
  <li><strong>Good</strong>: up to 20 km/h, a few ripples.</li>
  <li><strong>Meh</strong>: up to 28 km/h, it gets choppy.</li>
  <li><strong>No</strong>: beyond that, or in a thunderstorm.</li>
</ul>
<p>Rain or air below 8 °C costs one notch. Today’s wind for each beach is in the app; the <a href="{blog:bise-leman}">bise</a> deserves special attention.</p>
<h2>Where can you rent a paddleboard on Lake Geneva?</h2>
${listeLoc(['paddle'], L)}
<p>Prices, hours and availability change: check with the rental place before you go.</p>
<h2>Which beach is best for beginners?</h2>
<p>A beach with easy access and shelter from the day’s wind: the wind arrow on each <a href="{plages}">beach page</a> helps you pick the least exposed shore.</p>`,
    },
  },
  {
    slug: 'kitesurf-windsurf-wingfoil-leman', publie: '2026-11-01', modifie: '2026-11-01', ...IMG.kite,
    sources: [METEOSUISSE, OPENMETEO, ...LOCATIONS.filter((l) => l.activites.some((a) => ['windsurf', 'wing'].includes(a))).map((l) => [l.nom, l.site ?? l.source])],
    fr: {
      titre: 'Kitesurf, windsurf et wingfoil sur le Léman : le bon vent et les bons spots',
      h1: 'Kitesurf, windsurf et wingfoil sur le Léman',
      desc: 'Quelle force de vent pour le kitesurf, le windsurf et le foil sur le Léman, pourquoi la bise fait les meilleurs downwinds, et où louer ou apprendre.',
      bref: 'Les sports de glisse au vent ont besoin d’un vent établi. Dans Mon Lac, le <strong>kitesurf</strong> est « Parfait » entre 22 et 40 km/h, le <strong>windsurf</strong> entre 20 et 40 km/h, et le <strong>foil</strong> dès 12 km/h, ou par bise d’au moins 25 km/h pour le downwind. La bise, vent de nord-est le plus caractéristique du Léman selon MétéoSuisse, est leur meilleure alliée.',
      html: (L) => `
<h2>Quelle force de vent pour chaque discipline ?</h2>
<ul class="liste">
  <li><strong>Kitesurf</strong> : « Parfait » de 22 à 40 km/h, « Bien » de 16 à 45 km/h ; une note de moins si les rafales dépassent le vent moyen de plus de 20 km/h, et « Non » au-delà de 55 km/h de rafales.</li>
  <li><strong>Windsurf</strong> : « Parfait » de 20 à 40 km/h, « Bien » de 15 à 45 km/h ; il supporte mieux les rafales, jusqu’à 60 km/h.</li>
  <li><strong>Foil</strong> : peu de vent suffit, « Parfait » de 12 à 30 km/h ; sans vent, reste le pump foil.</li>
</ul>
<p>Ce sont les repères de l’<a href="{app}">app</a>, pas des normes : le niveau de chacun et la taille du matériel comptent autant.</p>
<h2>Pourquoi la bise est idéale pour le downwind ?</h2>
<p>La <a href="{blog:bise-leman}">bise</a> souffle du nord-est, de façon régulière et souvent forte, et lève une houle qui court sur le lac. Pour le foil, une bise d’au moins 25 km/h donne une note « Parfait » : de quoi enchaîner de longues descentes portées par les vagues. Sur le Haut-Lac, elle tourne au nord-nord-ouest (MétéoSuisse).</p>
<h2>Où louer ou apprendre le windsurf et le wingfoil ?</h2>
${listeLoc(['windsurf', 'wing'], L)}
<p>Pour le kitesurf, nous n’avons pas encore de loueur vérifié ; les spots se choisissent selon la direction du vent, visible sur chaque <a href="{plages}">page de plage</a>.</p>`,
    },
    en: {
      titre: 'Kitesurfing, windsurfing and wing foiling on Lake Geneva: the right wind and the right spots',
      h1: 'Kitesurfing, windsurfing and wing foiling on Lake Geneva',
      desc: 'How much wind for kitesurfing, windsurfing and foiling on Lake Geneva, why the bise makes the best downwinders, and where to rent or learn.',
      bref: 'Wind sports need a steady wind. In My Lake, <strong>kitesurfing</strong> is “Perfect” between 22 and 40 km/h, <strong>windsurfing</strong> between 20 and 40 km/h, and <strong>foiling</strong> from 12 km/h, or in a bise of at least 25 km/h for downwinders. The bise, the north-easterly MeteoSwiss calls Lake Geneva’s most characteristic wind, is their best friend.',
      html: (L) => `
<h2>How much wind for each sport?</h2>
<ul class="liste">
  <li><strong>Kitesurfing</strong>: “Perfect” from 22 to 40 km/h, “Good” from 16 to 45 km/h; one notch lower if gusts exceed the mean wind by more than 20 km/h, and “No” above 55 km/h of gusts.</li>
  <li><strong>Windsurfing</strong>: “Perfect” from 20 to 40 km/h, “Good” from 15 to 45 km/h; it copes better with gusts, up to 60 km/h.</li>
  <li><strong>Foiling</strong>: little wind is enough, “Perfect” from 12 to 30 km/h; with no wind, there is still pump foiling.</li>
</ul>
<p>These are the <a href="{app}">app</a>’s guidelines, not standards: skill level and gear size matter just as much.</p>
<h2>Why is the bise ideal for downwinders?</h2>
<p>The <a href="{blog:bise-leman}">bise</a> blows from the north-east, steadily and often strongly, and raises a swell that runs down the lake. For foiling, a bise of at least 25 km/h gives a “Perfect” rating: enough for long runs carried by the waves. On the Haut-Lac it turns north-north-west (MeteoSwiss).</p>
<h2>Where can you rent or learn windsurfing and wing foiling?</h2>
${listeLoc(['windsurf', 'wing'], L)}
<p>For kitesurfing, we do not have a verified rental place yet; spots depend on the wind direction, shown on each <a href="{plages}">beach page</a>.</p>`,
    },
  },
  {
    slug: 'wakeboard-wakesurf-ski-nautique-leman', publie: '2026-10-23', modifie: '2026-10-23', ...IMG.bateauSki,
    sources: [GE_NAV, ...LOCATIONS.filter((l) => l.activites.some((a) => ['wakeboard', 'wakesurf', 'ski'].includes(a))).map((l) => [l.nom, l.source])],
    fr: {
      titre: 'Wakeboard, wakesurf et ski nautique sur le Léman : les écoles et clubs',
      h1: 'Wakeboard, wakesurf et ski nautique sur le Léman',
      desc: 'De Pregny à Thonon, les écoles et clubs qui sortent le bateau pour le wakeboard, le wakesurf et le ski nautique, et pourquoi il faut un lac lisse.',
      bref: 'Derrière un bateau, c’est <strong>un lac lisse</strong> qui fait une belle session : dans Mon Lac, le wakeboard et le ski nautique sont « Parfaits » jusqu’à 15 km/h de rafales, le wakesurf jusqu’à 10 km/h. Selon le canton de Genève, la pratique est libre sur le Léman, dans le respect des règles de sécurité. Écoles et clubs vérifiés ci-dessous, de Genève à Montreux et sur la rive française.',
      html: (L) => `
<h2>Pourquoi faut-il un lac lisse ?</h2>
<p>Le wakeboard et le ski nautique se pratiquent tirés par un bateau ; le wakesurf, lui, se surfe sur la vague du sillage, sans corde. Le clapot brouille cette vague et rend la glisse inconfortable. Les repères de l’<a href="{app}">app</a> :</p>
<ul class="liste">
  <li><strong>Wakeboard et ski nautique</strong> : « Parfait » jusqu’à 15 km/h de rafales, « Bien » jusqu’à 25, « Bof » jusqu’à 32.</li>
  <li><strong>Wakesurf</strong> : plus exigeant, « Parfait » jusqu’à 10 km/h, « Bien » jusqu’à 18, « Bof » jusqu’à 25.</li>
</ul>
<p>La pluie ou un air sous 10 °C font perdre un cran. Les matins calmes sont souvent les meilleurs.</p>
<h2>Où faire du wakeboard, du wakesurf ou du ski nautique ?</h2>
${listeLoc(['wakeboard', 'wakesurf', 'ski'], L)}
<p>Tarifs, saisons et horaires sont à vérifier auprès de chaque école.</p>
<h2>Faut-il un permis ?</h2>
<p>Pour une sortie avec une école ou un pilote, non : c’est lui qui conduit le bateau. Le canton de Genève précise que la pratique est libre sur le Léman, et que les règles visent la sécurité des autres usagers ; elles concernent surtout ceux qui utilisent leur propre bateau.</p>`,
    },
    en: {
      titre: 'Wakeboarding, wakesurfing and water-skiing on Lake Geneva: schools and clubs',
      h1: 'Wakeboarding, wakesurfing and water-skiing on Lake Geneva',
      desc: 'From Pregny to Thonon, the schools and clubs that take the boat out for wakeboarding, wakesurfing and water-skiing, and why you need a glassy lake.',
      bref: 'Behind a boat, <strong>a glassy lake</strong> makes a good session: in My Lake, wakeboarding and water-skiing are “Perfect” up to 15 km/h of gusts, wakesurfing up to 10 km/h. According to the canton of Geneva, these sports can be practised freely on Lake Geneva, within safety rules. Verified schools and clubs below, from Geneva to Montreux and on the French shore.',
      html: (L) => `
<h2>Why do you need a glassy lake?</h2>
<p>Wakeboarding and water-skiing are done towed by a boat; wakesurfing is surfed on the wake wave, without a rope. Chop scrambles that wave and makes riding uncomfortable. The <a href="{app}">app</a>’s guidelines:</p>
<ul class="liste">
  <li><strong>Wakeboarding and water-skiing</strong>: “Perfect” up to 15 km/h of gusts, “Good” up to 25, “Meh” up to 32.</li>
  <li><strong>Wakesurfing</strong>: more demanding, “Perfect” up to 10 km/h, “Good” up to 18, “Meh” up to 25.</li>
</ul>
<p>Rain or air below 10 °C costs one notch. Calm mornings are often the best.</p>
<h2>Where can you go wakeboarding, wakesurfing or water-skiing?</h2>
${listeLoc(['wakeboard', 'wakesurf', 'ski'], L)}
<p>Prices, seasons and hours should be checked with each school.</p>
<h2>Do you need a licence?</h2>
<p>Not for an outing with a school or a driver: they drive the boat. The canton of Geneva states that these sports are free on Lake Geneva and that the rules aim at the safety of other lake users; they mostly concern people using their own boat.</p>`,
    },
  },
  {
    slug: 'buvettes-restaurants-bord-du-leman', publie: '2026-10-20', modifie: '2026-10-27', ...IMG.ouchy,
    sources: [['Genève Tourisme', 'https://www.geneve.com'], ['Lausanne Tourisme', 'https://www.lausanne-tourisme.ch'], ['Montreux Riviera', 'https://www.montreuxriviera.com'],
      ['La Côte Tourisme', 'https://www.lacote-tourisme.ch'], ['MySwitzerland', 'https://www.myswitzerland.com'], ['Haute-Savoie Mont-Blanc Tourisme', 'https://hautesavoiemontblanc-tourisme.com']],
    fr: {
      titre: 'Buvettes et restos au bord du Léman : nos adresses les pieds dans l’eau',
      h1: 'Buvettes et restaurants au bord du Léman, région par région',
      desc: 'Les terrasses au bord de l’eau de Genève, La Côte, Lausanne, la Riviera et la rive française, avec leurs saisons d’ouverture.',
      bref: 'Mon Lac recense <strong>' + LIEUX.length + ' buvettes et restaurants au bord du Léman</strong>, vérifiés auprès des offices du tourisme et des sites des lieux : des Bains des Pâquis à Genève aux quais de Vevey, de la Guinguette de Vidy à la plage de Sciez. Beaucoup de buvettes ne sont ouvertes qu’à la belle saison : la période est indiquée quand elle est connue.',
      html: (L) => `
<h2>Où boire un verre ou manger au bord du Léman ?</h2>
${listeLieux(() => true, L)}
<h2>Les buvettes sont-elles ouvertes toute l’année ?</h2>
<p>Non : beaucoup ouvrent seulement d’avril ou mai à septembre, selon la météo. Les saisons ci-dessus viennent des offices du tourisme ou des sites des lieux ; horaires et saisons changent, un coup de fil avant d’y aller évite les déceptions. L’onglet « Sortir » de l’<a href="{app}">app</a> indique « Fermé jusqu’en… » hors saison.</p>
<h2>Un lieu manque ?</h2>
<p>L’onglet « Sortir » de l’app propose un petit formulaire pour suggérer une adresse, relue avant ajout. Pour choisir la plage d’à côté, voir la <a href="{plages}">liste des plages</a> et, à Genève, <a href="{blog:plages-geneve}">toutes les plages du canton</a>.</p>`,
    },
    en: {
      titre: 'Lakeside cafés and restaurants on Lake Geneva: our feet-in-the-water picks',
      h1: 'Cafés and restaurants on the shores of Lake Geneva, region by region',
      desc: 'Waterside terraces in Geneva, La Côte, Lausanne, the Riviera and the French shore, with their opening seasons.',
      bref: 'My Lake lists <strong>' + LIEUX.length + ' cafés and restaurants on the shores of Lake Geneva</strong>, checked against tourist offices and the places’ own websites: from the Bains des Pâquis in Geneva to the Vevey waterfront, from the Guinguette de Vidy to Sciez beach. Many beach cafés only open in the warm season: the period is shown when known.',
      html: (L) => `
<h2>Where can you eat or drink by Lake Geneva?</h2>
${listeLieux(() => true, L)}
<h2>Are beach cafés open all year?</h2>
<p>No: many only open from April or May to September, depending on the weather. The seasons above come from tourist offices or the places’ websites; hours and seasons change, so a phone call before you go avoids disappointment. The “Go out” tab in the <a href="{app}">app</a> shows “Closed until…” out of season.</p>
<h2>Is a place missing?</h2>
<p>The app’s “Go out” tab has a short form to suggest a place, reviewed before it is added. To pick a nearby beach, see the <a href="{plages}">beach list</a> and, in Geneva, <a href="{blog:plages-geneve}">all the canton’s beaches</a>.</p>`,
    },
  },
  {
    slug: 'plages-leman-rive-francaise', publie: '2026-11-05', modifie: '2026-11-08', ...IMG.yvoire,
    sources: [ALPLAKES, CIPEL, ['Haute-Savoie Mont-Blanc Tourisme', 'https://hautesavoiemontblanc-tourisme.com']],
    fr: {
      titre: 'Plages du Léman côté français : d’Évian à Chens-sur-Léman',
      h1: 'Les plages du Léman côté français, d’Évian à Chens-sur-Léman',
      desc: 'Les plages de la rive française du Léman, de Meillerie à Chens-sur-Léman, avec la température de l’eau du jour, les restos et les écoles de wake autour.',
      bref: 'Mon Lac suit <strong>' + SPOTS.filter((s) => s.region === 'Rive française').length + ' plages sur la rive française du Léman</strong>, en Haute-Savoie : de Meillerie et Évian à l’est jusqu’à Yvoire, Messery et Chens-sur-Léman près de la frontière genevoise. Chacune a sa page avec l’eau à 70 cm et le vent du jour ; la qualité de l’eau se vérifie sur la carte des plages de la CIPEL.',
      html: (L) => `
<h2>Quelles sont les plages de la rive française ?</h2>
${listePlages((s) => s.region === 'Rive française', L)}
<h2>Où manger au bord de l’eau côté français ?</h2>
${listeLieux((x) => x.zone === 'evian', L)}
<h2>Que faire sur l’eau côté français ?</h2>
${listeLoc(['paddle', 'kayak', 'pedalo', 'bateau', 'wakeboard', 'wakesurf', 'ski', 'wing'], L, (l) => SPOTS.find((s) => s.id === l.spot)?.region === 'Rive française')}
<h2>Comment vérifier la qualité de l’eau ?</h2>
<p>Pour les plages françaises, l’app n’a pas d’analyse récente : elle renvoie vers la carte des plages de la CIPEL. Voir <a href="{blog:qualite-eau-baignade-leman}">comment vérifier la qualité de l’eau</a>. La température du jour de chaque plage est dans l’<a href="{app}">app</a>.</p>`,
    },
    en: {
      titre: 'Lake Geneva beaches on the French side: from Évian to Chens-sur-Léman',
      h1: 'Lake Geneva beaches on the French shore, from Évian to Chens-sur-Léman',
      desc: 'Beaches on the French shore of Lake Geneva, from Meillerie to Chens-sur-Léman, with today’s water temperature, restaurants and wake schools nearby.',
      bref: 'My Lake covers <strong>' + SPOTS.filter((s) => s.region === 'Rive française').length + ' beaches on the French shore of Lake Geneva</strong>, in Haute-Savoie: from Meillerie and Évian in the east to Yvoire, Messery and Chens-sur-Léman near the Geneva border. Each has its own page with the water at 70 cm and today’s wind; water quality can be checked on CIPEL’s beach map.',
      html: (L) => `
<h2>What are the beaches on the French shore?</h2>
${listePlages((s) => s.region === 'Rive française', L)}
<h2>Where can you eat by the water on the French side?</h2>
${listeLieux((x) => x.zone === 'evian', L)}
<h2>What is there to do on the water on the French side?</h2>
${listeLoc(['paddle', 'kayak', 'pedalo', 'bateau', 'wakeboard', 'wakesurf', 'ski', 'wing'], L, (l) => SPOTS.find((s) => s.id === l.spot)?.region === 'Rive française')}
<h2>How do you check the water quality?</h2>
<p>For French beaches, the app has no recent test results: it links to CIPEL’s beach map. See <a href="{blog:qualite-eau-baignade-leman}">how to check water quality</a>. Today’s temperature for each beach is in the <a href="{app}">app</a>.</p>`,
    },
  },
  {
    slug: 'choc-thermique-eau-froide', sante: true, publie: '2026-10-19', modifie: '2026-11-02', ...IMG.glace,
    sources: [RNLI, PORTSMOUTH, SSS, BPA],
    fr: {
      titre: 'Choc thermique : les 90 premières secondes dans l’eau froide du Léman',
      h1: 'Choc thermique : bien vivre les 90 premières secondes dans l’eau froide',
      desc: 'Ce que fait le corps en entrant dans une eau à 10 °C, pourquoi il ne faut pas plonger, comment respirer pendant la première minute, et pourquoi voir un médecin avant de commencer.',
      bref: 'En entrant dans une eau froide, le corps réagit par un <strong>choc thermique</strong> : respiration haletante qu’on ne contrôle plus, cœur qui s’emballe, tension qui monte. Selon la RNLI, ce choc dure environ <strong>60 à 90 secondes</strong> ; c’est le moment le plus risqué. D’où les règles : voir un médecin avant de commencer, ne jamais plonger, entrer lentement en contrôlant sa respiration, ne jamais être seul, et, si l’on se retrouve dans l’eau sans l’avoir voulu, flotter le temps que le choc passe.',
      html: () => `
<h2>Que se passe-t-il dans le corps en entrant dans l’eau froide ?</h2>
<p>Au contact de l’eau froide, la peau déclenche une réaction réflexe : une forte inspiration involontaire, puis une respiration rapide et difficile à maîtriser ; le cœur accélère et la tension monte. La RNLI, le service de sauvetage britannique, appelle ce phénomène le <em>cold water shock</em> et rappelle qu’une grande partie des décès en eau froide survient dans les premières minutes, à cause de ce choc et non de l’hypothermie.</p>
<h2>Combien de temps dure le choc thermique ?</h2>
<p>Environ 60 à 90 secondes selon la RNLI. Ensuite, la respiration se calme et on reprend le contrôle. C’est pourquoi les premières fois, on reste près du bord et on ne cherche pas à nager tout de suite.</p>
<h2>Pourquoi ne faut-il pas plonger ?</h2>
<p>Parce qu’une inspiration réflexe la tête sous l’eau peut faire avaler de l’eau. La Société Suisse de Sauvetage (SSS) recommande d’entrer lentement, sans plonger, de garder la tête hors de l’eau et de porter un bonnet.</p>
<h2>Comment entrer dans l’eau froide pas à pas ?</h2>
<ul class="liste">
  <li><strong>Avec quelqu’un</strong> : un binôme sur la berge ou dans l’eau (SSS, BPA).</li>
  <li><strong>Lentement</strong>, en marchant, en soufflant longuement pour garder une respiration régulière.</li>
  <li><strong>Brièvement</strong> : les premières fois, de quelques dizaines de secondes à une ou deux minutes suffisent ; la SSS fixe le maximum à autant de minutes que de degrés.</li>
  <li><strong>Sortir</strong> au moindre malaise, en cas de frissons intenses ou de doigts engourdis.</li>
</ul>
<h2>Que faire si l’on tombe dans l’eau froide ?</h2>
<p>La RNLI enseigne le réflexe <strong>« Float to Live »</strong> : ne pas se débattre, basculer la tête en arrière, oreilles dans l’eau, écarter bras et jambes et respirer calmement le temps que le choc passe, puis appeler à l’aide ou rejoindre le bord. Une étude de l’Université de Portsmouth a montré que ces consignes aident aussi des personnes peu expérimentées à flotter en lac et en mer.</p>
<h2>Faut-il voir un médecin avant de commencer ?</h2>
<p>Oui, c’est le premier réflexe : le choc thermique sollicite fortement le cœur. En cas de problème cardiaque ou de tension, on demande un avis médical avant le premier bain. Certains nageurs s’habituent aussi en terminant leurs douches par quelques dizaines de secondes d’eau froide, en allongeant peu à peu ; ce n’est pas une garantie, juste une façon douce de découvrir la sensation.</p>
<p>Pour la suite : <a href="{blog:materiel-bain-d-hiver}">le matériel du bain d’hiver</a> et <a href="{blog:afterdrop-se-rechauffer}">se réchauffer après le bain</a>. L’eau du jour, plage par plage, est dans l’<a href="{app}">app</a>.</p>`,
    },
    en: {
      titre: 'Cold water shock: the first 90 seconds in Lake Geneva’s cold water',
      h1: 'Cold water shock: getting through the first 90 seconds',
      desc: 'What your body does when you enter 10 °C water, why you should not dive in, how to breathe during the first minute, and why to see a doctor before you start.',
      bref: 'Entering cold water triggers <strong>cold water shock</strong>: uncontrollable gasping, a racing heart and rising blood pressure. According to the RNLI, it lasts about <strong>60 to 90 seconds</strong>, the riskiest moment. Hence the rules: see a doctor before starting, never dive in, get in slowly while controlling your breathing, never go alone, and if you end up in the water unexpectedly, float until the shock passes.',
      html: () => `
<h2>What happens to your body when you enter cold water?</h2>
<p>When cold water hits the skin, it triggers a reflex: a sharp involuntary gasp, then fast breathing that is hard to control; the heart speeds up and blood pressure rises. The RNLI, the UK lifeboat charity, calls this cold water shock and points out that many cold-water deaths happen in the first minutes, because of this shock rather than hypothermia.</p>
<h2>How long does cold water shock last?</h2>
<p>About 60 to 90 seconds, according to the RNLI. After that, breathing settles and you regain control. That is why, the first few times, you stay close to the edge and do not try to swim straight away.</p>
<h2>Why shouldn’t you dive in?</h2>
<p>Because a reflex gasp with your head underwater can make you swallow water. The Swiss Lifesaving Society advises getting in slowly, without diving, keeping your head out of the water and wearing a cap.</p>
<h2>How do you get into cold water step by step?</h2>
<ul class="liste">
  <li><strong>With someone</strong>: a buddy on the shore or in the water (Swiss Lifesaving Society, BFU).</li>
  <li><strong>Slowly</strong>, walking in and breathing out long and slow to keep your breathing steady.</li>
  <li><strong>Briefly</strong>: the first few times, a few tens of seconds to a minute or two is plenty; the lifesaving society sets the maximum at as many minutes as degrees.</li>
  <li><strong>Get out</strong> at the first sign of feeling unwell, intense shivering or numb fingers.</li>
</ul>
<h2>What should you do if you fall into cold water?</h2>
<p>The RNLI teaches <strong>“Float to Live”</strong>: don’t thrash, tilt your head back with your ears underwater, spread your arms and legs and breathe calmly until the shock passes, then call for help or make for the shore. A University of Portsmouth study showed these instructions also help inexperienced people float in lakes and the sea.</p>
<h2>Should you see a doctor before starting?</h2>
<p>Yes, that comes first: cold water shock puts real strain on the heart. With any heart or blood pressure condition, get medical advice before your first dip. Some swimmers also get used to the feeling by ending their showers with a few tens of seconds of cold water, gradually longer; it is no guarantee, just a gentle way to discover the sensation.</p>
<p>Next: <a href="{blog:materiel-bain-d-hiver}">what to bring for winter swimming</a> and <a href="{blog:afterdrop-se-rechauffer}">warming up afterwards</a>. Today’s water, beach by beach, is in the <a href="{app}">app</a>.</p>`,
    },
  },
  {
    slug: 'materiel-bain-d-hiver', sante: true, publie: '2026-10-29', modifie: '2026-11-06', ...IMG.coupeBonnets,
    sources: [OSS_KIT, SSS, BPA],
    fr: {
      titre: 'Matériel pour le bain d’hiver : la liste complète avant d’aller au Léman',
      h1: 'Le matériel du bain d’hiver, de la tête aux pieds',
      desc: 'Bonnet, chaussons et gants en néoprène, bouée, tapis pour se changer, cape et thermos : tout ce qu’il faut emporter pour un bain d’hiver dans le Léman, et pourquoi.',
      bref: 'Pour un bain d’hiver, l’essentiel tient dans un sac : <strong>un maillot, un bonnet, des chaussons et éventuellement des gants en néoprène</strong> (les pieds et les mains refroidissent vite), <strong>une bouée de natation</strong> pour être visible et se reposer, puis pour la sortie <strong>une serviette, une cape ou un peignoir chaud, des vêtements faciles à enfiler, un tapis pour se changer et une boisson chaude</strong>. Et surtout, un binôme.',
      html: () => `
<h2>Que porter dans l’eau froide ?</h2>
<ul class="liste">
  <li><strong>Un maillot confortable</strong>, ou une combinaison si l’on veut nager plus longtemps.</li>
  <li><strong>Un bonnet</strong> en silicone ou en néoprène : la Société Suisse de Sauvetage recommande de porter un bonnet et de garder la tête hors de l’eau.</li>
  <li><strong>Des chaussons en néoprène</strong> : les pieds souffrent vite du froid, et les galets du Léman ne pardonnent pas.</li>
  <li><strong>Des gants en néoprène</strong> si les mains engourdissent ; plus ils sont épais, plus ils protègent, mais plus les doigts perdent en agilité. L’Outdoor Swimming Society les cite avec les chaussons parmi les accessoires d’hiver utiles.</li>
  <li><strong>Une bouée de natation</strong> colorée : le Bureau de prévention des accidents (BPA) la recommande en eau libre, pour être vu et pouvoir se tenir en cas de besoin.</li>
</ul>
<h2>Que prévoir pour la sortie de l’eau ?</h2>
<ul class="liste">
  <li><strong>Une grande serviette</strong> et une <strong>cape ou un peignoir chaud</strong> pour se changer à l’abri du vent.</li>
  <li><strong>Des vêtements amples, faciles à enfiler</strong> avec des doigts froids : couches superposées, pas de boutons compliqués, bonnet et chaussettes chaudes.</li>
  <li><strong>Un tapis pour se changer</strong>, pour ne pas poser les pieds sur les cailloux ou l’herbe gelée.</li>
  <li><strong>Une thermos de boisson chaude</strong> : la SSS conseille une boisson tiède pour se réchauffer de l’intérieur. Pas d’alcool.</li>
</ul>
<h2>Quel est l’équipement le plus important ?</h2>
<p>Un binôme. La SSS et le BPA sont formels : on ne nage jamais seul en eau libre, encore moins en eau froide. Le reste du matériel rend le bain plus agréable ; la présence de quelqu’un le rend plus sûr.</p>
<h2>Où acheter ou louer ce matériel près du Léman ?</h2>
<p>Les magasins de sport et de surf de la région proposent bonnets, chaussons et gants en néoprène. Pour se réchauffer sur place, certains lieux ont un sauna, comme les Bains des Rives à Bellerive (Lausanne) l’hiver : voir le <a href="{blog:bain-d-hiver-leman}">guide du bain d’hiver</a>.</p>
<p>Avant de partir : <a href="{blog:choc-thermique-eau-froide}">les 90 premières secondes dans l’eau froide</a>. En sortant : <a href="{blog:afterdrop-se-rechauffer}">bien se réchauffer</a>. L’eau du jour est dans l’<a href="{app}">app</a>.</p>`,
    },
    en: {
      titre: 'Winter swimming kit: the complete list before heading to Lake Geneva',
      h1: 'Winter swimming kit, from head to toe',
      desc: 'Cap, neoprene socks and gloves, swim buoy, changing mat, robe and flask: everything to bring for a winter swim in Lake Geneva, and why.',
      bref: 'For a winter swim, the essentials fit in one bag: <strong>a swimsuit, a cap, neoprene socks and possibly gloves</strong> (feet and hands chill fast), <strong>a swim buoy</strong> to be seen and rest on, then for getting out <strong>a towel, a warm robe or changing cape, easy-to-put-on clothes, a changing mat and a hot drink</strong>. And above all, a buddy.',
      html: () => `
<h2>What should you wear in cold water?</h2>
<ul class="liste">
  <li><strong>A comfortable swimsuit</strong>, or a wetsuit if you want to swim longer.</li>
  <li><strong>A cap</strong>, silicone or neoprene: the Swiss Lifesaving Society advises wearing a cap and keeping your head out of the water.</li>
  <li><strong>Neoprene socks</strong>: feet feel the cold fast, and Lake Geneva’s pebbles are unforgiving.</li>
  <li><strong>Neoprene gloves</strong> if your hands go numb; thicker means warmer but less dexterity. The Outdoor Swimming Society lists them, with socks, among useful winter accessories.</li>
  <li><strong>A brightly coloured swim buoy</strong>: the Swiss Council for Accident Prevention (BFU) recommends one in open water, to be seen and to hold on to if needed.</li>
</ul>
<h2>What do you need for getting out?</h2>
<ul class="liste">
  <li><strong>A large towel</strong> and a <strong>warm robe or changing cape</strong> to change out of the wind.</li>
  <li><strong>Loose clothes that are easy to put on</strong> with cold fingers: layers, no fiddly buttons, a hat and warm socks.</li>
  <li><strong>A changing mat</strong>, so your feet stay off stones or frozen grass.</li>
  <li><strong>A flask of hot drink</strong>: the lifesaving society suggests a warm drink to warm up from the inside. No alcohol.</li>
</ul>
<h2>What is the most important piece of kit?</h2>
<p>A buddy. The Swiss Lifesaving Society and the BFU are clear: never swim alone in open water, even less so in cold water. The rest of the kit makes the swim more pleasant; having someone there makes it safer.</p>
<h2>Where can you buy or rent kit near Lake Geneva?</h2>
<p>Local sports and surf shops sell neoprene caps, socks and gloves. To warm up on site, some places have a sauna, like the Bains des Rives at Bellerive (Lausanne) in winter: see the <a href="{blog:bain-d-hiver-leman}">winter swimming guide</a>.</p>
<p>Before you go: <a href="{blog:choc-thermique-eau-froide}">the first 90 seconds in cold water</a>. Afterwards: <a href="{blog:afterdrop-se-rechauffer}">warming up properly</a>. Today’s water is in the <a href="{app}">app</a>.</p>`,
    },
  },
  {
    slug: 'afterdrop-se-rechauffer', sante: true, publie: '2026-11-02', modifie: '2026-11-06', ...IMG.apresBain,
    sources: [SSS, AFTERDROP, ALERTDIVER],
    fr: {
      titre: 'Afterdrop : pourquoi on a encore plus froid après un bain d’hiver, et comment se réchauffer',
      h1: 'Afterdrop : bien se réchauffer après un bain d’hiver',
      desc: 'Pourquoi le corps continue de se refroidir une dizaine de minutes après la sortie de l’eau, comment se changer, quoi boire, et ce qu’il vaut mieux éviter, comme la douche chaude.',
      bref: 'L’<strong>afterdrop</strong>, c’est le refroidissement qui continue <strong>après</strong> la sortie de l’eau : on peut avoir plus froid dix minutes après être sorti qu’au moment de sortir, avec frissons, voire vertiges. Pour bien se réchauffer : se sécher et s’habiller vite et chaudement, boire une boisson tiède, bouger doucement sans gros effort, et rester au chaud et au calme une quinzaine de minutes. La Société Suisse de Sauvetage déconseille la douche chaude juste après.',
      html: () => `
<h2>Qu’est-ce que l’afterdrop ?</h2>
<p>C’est la baisse de la température du corps qui se poursuit alors qu’on est déjà sorti de l’eau et qu’on se trouve au sec. Les guides de nage en eau libre la situent souvent une dizaine de minutes après la sortie ; elle peut durer plus longtemps après un bain long. On le ressent par une vague de froid, des frissons qui redoublent, parfois des vertiges.</p>
<h2>Comment se réchauffer après un bain d’hiver ?</h2>
<ul class="liste">
  <li><strong>Se changer tout de suite</strong> : enlever le maillot mouillé, se sécher et enfiler des vêtements chauds et secs, à l’abri du vent (SSS).</li>
  <li><strong>Couvrir la tête, les mains et les pieds</strong> : bonnet, gants, chaussettes chaudes.</li>
  <li><strong>Boire chaud</strong> : la SSS recommande une boisson tiède pour se réchauffer de l’intérieur.</li>
  <li><strong>Bouger doucement</strong> : marcher, piétiner. La SSS déconseille les gros efforts, et l’exercice intense peut accentuer l’afterdrop (DAN Alert Diver).</li>
  <li><strong>Rester au chaud et au calme</strong> une quinzaine de minutes avant de reprendre la route, surtout à vélo ou au volant.</li>
</ul>
<h2>Pourquoi éviter la douche chaude juste après ?</h2>
<p>La Société Suisse de Sauvetage la déconseille juste après un bain en eau froide. On se réchauffe d’abord en s’habillant et en buvant chaud ; la douche viendra plus tard, une fois le corps revenu à une température normale.</p>
<h2>Quand faut-il s’inquiéter ?</h2>
<p>Si les frissons ne s’arrêtent pas, si la personne devient confuse, maladroite ou somnolente, il faut la mettre au chaud et appeler les secours (144 en Suisse, 15 ou 112 en France) : ce sont des signes d’hypothermie, qui demandent un réchauffement encadré.</p>
<p>À lire aussi : <a href="{blog:choc-thermique-eau-froide}">les 90 premières secondes dans l’eau froide</a> et <a href="{blog:materiel-bain-d-hiver}">le matériel du bain d’hiver</a>. Le <a href="{blog:bain-d-hiver-leman}">guide du bain d’hiver</a> donne les plages et les saunas du Léman.</p>`,
    },
    en: {
      titre: 'Afterdrop: why you feel colder after a winter swim, and how to warm up',
      h1: 'Afterdrop: warming up properly after a winter swim',
      desc: 'Why your body keeps cooling for about ten minutes after getting out, how to change, what to drink, and what to avoid, such as a hot shower.',
      bref: '<strong>Afterdrop</strong> is the cooling that continues <strong>after</strong> you leave the water: you can feel colder ten minutes after getting out than when you got out, with shivering or even dizziness. To warm up: dry off and dress quickly and warmly, have a warm drink, move gently without hard effort, and stay warm and calm for about fifteen minutes. The Swiss Lifesaving Society advises against a hot shower straight after.',
      html: () => `
<h2>What is afterdrop?</h2>
<p>It is the drop in body temperature that continues once you are already out of the water and dry. Open-water swimming guides often place it about ten minutes after getting out; it can last longer after a long swim. You feel it as a wave of cold, stronger shivering, sometimes dizziness.</p>
<h2>How do you warm up after a winter swim?</h2>
<ul class="liste">
  <li><strong>Change straight away</strong>: take off your wet swimsuit, dry off and put on warm, dry clothes, out of the wind (Swiss Lifesaving Society).</li>
  <li><strong>Cover your head, hands and feet</strong>: hat, gloves, warm socks.</li>
  <li><strong>Drink something warm</strong>: the lifesaving society recommends a warm drink to warm up from the inside.</li>
  <li><strong>Move gently</strong>: walk, stamp your feet. Avoid hard exercise, which can make afterdrop worse (DAN Alert Diver).</li>
  <li><strong>Stay warm and calm</strong> for about fifteen minutes before heading off, especially by bike or car.</li>
</ul>
<h2>Why avoid a hot shower straight after?</h2>
<p>The Swiss Lifesaving Society advises against it right after a cold-water swim. Warm up first by dressing and drinking something hot; the shower can come later, once your body is back to normal.</p>
<h2>When should you worry?</h2>
<p>If the shivering does not stop, or the person becomes confused, clumsy or drowsy, get them somewhere warm and call emergency services (144 in Switzerland, 15 or 112 in France): these are signs of hypothermia, which needs supervised rewarming.</p>
<p>Also read: <a href="{blog:choc-thermique-eau-froide}">the first 90 seconds in cold water</a> and <a href="{blog:materiel-bain-d-hiver}">winter swimming kit</a>. The <a href="{blog:bain-d-hiver-leman}">winter swimming guide</a> lists Lake Geneva’s beaches and saunas.</p>`,
    },
  },
];
// Traductions allemandes et italiennes (scripts/articles.de.mjs, articles.it.mjs) ; un article sans traduction n'existe pas dans cette langue.
const TRAD = { de: creerDe({ listePlages, listeLieux, listeLoc }), it: creerIt({ listePlages, listeLieux, listeLoc }) };
for (const a of ARTICLES) for (const l of ['de', 'it']) if (TRAD[l][a.slug]) a[l] = TRAD[l][a.slug];

