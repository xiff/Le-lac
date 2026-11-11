// Coordonnées vérifiées le 9 novembre 2026 avec OpenStreetMap (scripts/coords.mjs) : la plage, pas le village.
// Plages suivies. Partagé par l'app et par scripts/eau.mjs (températures Alplakes).
// Coordonnées vérifiées dans le modèle du Léman : toutes à moins de 800 m d'un point de calcul.
// Liste établie d'après les sites de baignade cités par le canton de Genève, la CIPEL et les offices du tourisme.
// Lacs suivis et modèle de température de l'eau (Alplakes, Eawag) : 3D = une valeur devant chaque plage,
// 1D (Simstrat) = une valeur pour tout le lac (Gruyère, Majeur), null = pas de modèle (Domaine des Îles, Sion).
export const LACS = {
  leman: { nom: 'Léman', en: 'Lake Geneva', eau: { modele: 'delft3d-flow', lac: 'geneva' } },
  neuchatel: { nom: 'Lac de Neuchâtel', en: 'Lake Neuchâtel', eau: { modele: 'mitgcm', lac: 'neuchatel' } },
  bienne: { nom: 'Lac de Bienne', en: 'Lake Biel', eau: { modele: 'delft3d-flow', lac: 'biel' } },
  morat: { nom: 'Lac de Morat', en: 'Lake Murten', eau: { modele: 'delft3d-flow', lac: 'murten' } },
  gruyere: { nom: 'Lac de la Gruyère', en: 'Lake Gruyère', eau: { modele: 'simstrat', lac: 'gruyere' } },
  lugano: { nom: 'Lac de Lugano', en: 'Lake Lugano', eau: { modele: 'delft3d-flow', lac: 'lugano' } },
  majeur: { nom: 'Lac Majeur', en: 'Lake Maggiore', eau: { modele: 'simstrat', lac: 'maggiore' }, carteSud: 46.06 }, // carte : la partie suisse et un peu au-delà
  joux: { nom: 'Lac de Joux', en: 'Lac de Joux', eau: { modele: 'delft3d-flow', lac: 'joux' } },
  bret: { nom: 'Lac de Bret', en: 'Lac de Bret', eau: { modele: 'simstrat', lac: 'bret' } },
  sion: { nom: 'Sion – Domaine des Îles', en: 'Sion – Domaine des Îles', eau: null },
};
export const lacDe = (s) => s?.lac ?? 'leman'; // les plages du Léman n'ont pas de champ lac
// Noms anglais des régions (les plages des autres lacs ont pour région le nom du lac).
export const REGIONS_EN = { 'Genève': 'Geneva', 'Morges et Lausanne': 'Morges & Lausanne', 'Rive française': 'French shore',
  ...Object.fromEntries(Object.values(LACS).map((l) => [l.nom, l.en])) };

export const SPOTS = [
  { id: 'pregny-chambesy', nom: 'Pregny-Chambésy', lat: 46.24265, lon: 6.15302, region: 'Genève', zone: 'geneve' },
  { id: 'bains-des-paquis', nom: 'Bains des Pâquis', lat: 46.21016, lon: 6.15489, region: 'Genève', zone: 'geneve' },
  { id: 'geneve-plage', nom: 'Genève-Plage', lat: 46.21408, lon: 6.17297, region: 'Genève', zone: 'geneve' },
  { id: 'tropical-corner', nom: 'Tropical Corner', lat: 46.21493, lon: 6.17500, region: 'Genève', zone: 'geneve' },
  { id: 'baby-plage', nom: 'Baby-Plage', lat: 46.20863, lon: 6.16353, region: 'Genève', zone: 'geneve' },
  { id: 'plage-des-eaux-vives', nom: 'Plage des Eaux-Vives', lat: 46.20934, lon: 6.16479, region: 'Genève', zone: 'geneve' },
  { id: 'cologny', nom: 'Cologny', lat: 46.22305, lon: 6.18092, region: 'Genève', zone: 'geneve' },
  { id: 'collonge-bellerive-la-savonniere', nom: 'Collonge-Bellerive – La Savonnière', lat: 46.26103, lon: 6.19648, region: 'Genève', zone: 'geneve' },
  { id: 'corsier-port', nom: 'Corsier-Port', lat: 46.2720, lon: 6.2080, region: 'Genève', zone: 'geneve' },
  { id: 'anieres', nom: 'Anières', lat: 46.27734, lon: 6.22083, region: 'Genève', zone: 'geneve' },
  { id: 'hermance', nom: 'Hermance', lat: 46.30361, lon: 6.24103, region: 'Genève', zone: 'geneve' },
  { id: 'bellevue', nom: 'Bellevue', lat: 46.25951, lon: 6.15888, region: 'Genève', zone: 'geneve' },
  { id: 'genthod', nom: 'Genthod', lat: 46.26351, lon: 6.16427, region: 'Genève', zone: 'geneve' },
  { id: 'versoix', nom: 'Versoix', lat: 46.28950, lon: 6.17084, region: 'Genève', zone: 'geneve' },
  { id: 'celigny', nom: 'Céligny', lat: 46.35326, lon: 6.21278, region: 'Genève', zone: 'geneve' },
  { id: 'mies', nom: 'Mies', lat: 46.30336, lon: 6.18044, region: 'La Côte', zone: 'nyon' },
  { id: 'coppet', nom: 'Coppet', lat: 46.31982, lon: 6.19725, region: 'La Côte', zone: 'nyon' },
  { id: 'nyon', nom: 'Nyon', lat: 46.37702, lon: 6.23607, region: 'La Côte', zone: 'nyon' },
  { id: 'prangins', nom: 'Prangins', lat: 46.39243, lon: 6.26525, region: 'La Côte', zone: 'nyon' },
  { id: 'gland', nom: 'Gland', lat: 46.41892, lon: 6.29002, region: 'La Côte', zone: 'nyon' },
  { id: 'dully', nom: 'Dully', lat: 46.42457, lon: 6.29707, region: 'La Côte', zone: 'nyon' },
  { id: 'rolle', nom: 'Rolle', lat: 46.46134, lon: 6.35042, region: 'La Côte', zone: 'nyon' },
  { id: 'perroy', nom: 'Perroy', lat: 46.46259, lon: 6.36108, region: 'La Côte', zone: 'nyon' },
  { id: 'allaman', nom: 'Allaman', lat: 46.46444, lon: 6.38397, region: 'La Côte', zone: 'nyon' },
  { id: 'buchillon', nom: 'Buchillon', lat: 46.46850, lon: 6.42128, region: 'La Côte', zone: 'nyon' },
  { id: 'saint-prex', nom: 'Saint-Prex', lat: 46.47913, lon: 6.45643, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'tolochenaz', nom: 'Tolochenaz', lat: 46.49136, lon: 6.48047, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'morges', nom: 'Morges', lat: 46.50368, lon: 6.49360, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'preverenges', nom: 'Préverenges', lat: 46.51327, lon: 6.52678, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'saint-sulpice', nom: 'Saint-Sulpice', lat: 46.51331, lon: 6.57241, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'lausanne-vidy', nom: 'Lausanne – Vidy', lat: 46.51773, lon: 6.59201, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'lausanne-ouchy', nom: 'Lausanne – Ouchy', lat: 46.50658, lon: 6.62924, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'lausanne-bellerive', nom: 'Lausanne – Bellerive', lat: 46.51054, lon: 6.61295, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'pully', nom: 'Pully', lat: 46.50478, lon: 6.66663, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'paudex', nom: 'Paudex', lat: 46.50391, lon: 6.67180, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'lutry', nom: 'Lutry', lat: 46.50000, lon: 6.69199, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'villette', nom: 'Villette', lat: 46.49301, lon: 6.71009, region: 'Riviera', zone: 'vevey' },
  { id: 'cully-moratel', nom: 'Cully – Moratel', lat: 46.48892, lon: 6.74139, region: 'Riviera', zone: 'vevey' },
  { id: 'rivaz', nom: 'Rivaz', lat: 46.47405, lon: 6.77861, region: 'Riviera', zone: 'vevey' },
  { id: 'saint-saphorin', nom: 'Saint-Saphorin', lat: 46.47216, lon: 6.79814, region: 'Riviera', zone: 'vevey' },
  { id: 'corseaux', nom: 'Corseaux', lat: 46.46784, lon: 6.83198, region: 'Riviera', zone: 'vevey' },
  { id: 'vevey', nom: 'Vevey', lat: 46.46253, lon: 6.84378, region: 'Riviera', zone: 'vevey' },
  { id: 'la-tour-de-peilz', nom: 'La Tour-de-Peilz', lat: 46.45209, lon: 6.85478, region: 'Riviera', zone: 'vevey' },
  { id: 'montreux-clarens', nom: 'Montreux – Clarens', lat: 46.43934, lon: 6.89040, region: 'Riviera', zone: 'vevey' },
  { id: 'veytaux', nom: 'Veytaux', lat: 46.41583, lon: 6.92753, region: 'Riviera', zone: 'vevey' },
  { id: 'villeneuve', nom: 'Villeneuve', lat: 46.40212, lon: 6.92512, region: 'Riviera', zone: 'vevey' },
  { id: 'noville', nom: 'Noville', lat: 46.39617, lon: 6.88667, region: 'Riviera', zone: 'vevey' },
  { id: 'le-bouveret', nom: 'Le Bouveret', lat: 46.38916, lon: 6.85979, region: 'Riviera', zone: 'vevey' },
  { id: 'saint-gingolph', nom: 'Saint-Gingolph', lat: 46.39292, lon: 6.79472, region: 'Riviera', zone: 'vevey' },
  { id: 'meillerie', nom: 'Meillerie', lat: 46.40761, lon: 6.71525, region: 'Rive française', zone: 'evian' },
  { id: 'lugrin', nom: 'Lugrin', lat: 46.40562, lon: 6.65125, region: 'Rive française', zone: 'evian' },
  { id: 'maxilly', nom: 'Maxilly', lat: 46.40446, lon: 6.62880, region: 'Rive française', zone: 'evian' },
  { id: 'neuvecelle', nom: 'Neuvecelle', lat: 46.40232, lon: 6.60648, region: 'Rive française', zone: 'evian' },
  { id: 'evian', nom: 'Évian', lat: 46.40109, lon: 6.58384, region: 'Rive française', zone: 'evian' },
  { id: 'publier-amphion', nom: 'Publier – Amphion', lat: 46.39780, lon: 6.53486, region: 'Rive française', zone: 'evian' },
  { id: 'thonon', nom: 'Thonon', lat: 46.38701, lon: 6.48342, region: 'Rive française', zone: 'evian' },
  { id: 'thonon-saint-disdille', nom: 'Thonon – Saint-Disdille', lat: 46.394, lon: 6.504, region: 'Rive française', zone: 'evian' },
  { id: 'anthy-sur-leman', nom: 'Anthy-sur-Léman', lat: 46.35995, lon: 6.42345, region: 'Rive française', zone: 'evian' },
  { id: 'margencel', nom: 'Margencel', lat: 46.35984, lon: 6.41328, region: 'Rive française', zone: 'evian' },
  { id: 'sciez', nom: 'Sciez', lat: 46.34131, lon: 6.39186, region: 'Rive française', zone: 'evian' },
  { id: 'excenevex', nom: 'Excenevex', lat: 46.34936, lon: 6.36034, region: 'Rive française', zone: 'evian' },
  { id: 'yvoire', nom: 'Yvoire', lat: 46.37032, lon: 6.32859, region: 'Rive française', zone: 'evian' },
  { id: 'nernier', nom: 'Nernier', lat: 46.36569, lon: 6.30276, region: 'Rive française', zone: 'evian' },
  { id: 'messery', nom: 'Messery', lat: 46.35538, lon: 6.28599, region: 'Rive française', zone: 'evian' },
  { id: 'chens-sur-leman', nom: 'Chens-sur-Léman', lat: 46.32526, lon: 6.25751, region: 'Rive française', zone: 'evian' },
  // Autres lacs : plages tirées d'OpenStreetMap (scripts/decouvrir.mjs), le 10 novembre 2026.
  { id: 'yverdon-les-bains', nom: 'Yverdon-les-Bains', lat: 46.78493, lon: 6.65241, region: 'Lac de Neuchâtel', zone: 'neuchatel', lac: 'neuchatel' },
  { id: 'grandson-corcelettes', nom: 'Grandson – Corcelettes', lat: 46.81996, lon: 6.67373, region: 'Lac de Neuchâtel', zone: 'neuchatel', lac: 'neuchatel' },
  { id: 'yvonand', nom: 'Yvonand', lat: 46.80556, lon: 6.73621, region: 'Lac de Neuchâtel', zone: 'neuchatel', lac: 'neuchatel' },
  { id: 'concise', nom: 'Concise', lat: 46.84804, lon: 6.71859, region: 'Lac de Neuchâtel', zone: 'neuchatel', lac: 'neuchatel' },
  { id: 'saint-aubin-ne', nom: 'Saint-Aubin', lat: 46.89090, lon: 6.77384, region: 'Lac de Neuchâtel', zone: 'neuchatel', lac: 'neuchatel' },
  { id: 'cortaillod', nom: 'Cortaillod', lat: 46.93884, lon: 6.85143, region: 'Lac de Neuchâtel', zone: 'neuchatel', lac: 'neuchatel' },
  { id: 'boudry', nom: 'Boudry', lat: 46.94859, lon: 6.87071, region: 'Lac de Neuchâtel', zone: 'neuchatel', lac: 'neuchatel' },
  { id: 'colombier', nom: 'Colombier', lat: 46.96785, lon: 6.87360, region: 'Lac de Neuchâtel', zone: 'neuchatel', lac: 'neuchatel' },
  { id: 'neuchatel-jeunes-rives', nom: 'Neuchâtel – Jeunes-Rives', lat: 46.99155, lon: 6.93972, region: 'Lac de Neuchâtel', zone: 'neuchatel', lac: 'neuchatel' },
  { id: 'hauterive', nom: 'Hauterive', lat: 47.00931, lon: 6.97652, region: 'Lac de Neuchâtel', zone: 'neuchatel', lac: 'neuchatel' },
  { id: 'cudrefin', nom: 'Cudrefin', lat: 46.95843, lon: 7.01415, region: 'Lac de Neuchâtel', zone: 'neuchatel', lac: 'neuchatel' },
  { id: 'portalban', nom: 'Portalban', lat: 46.92255, lon: 6.95359, region: 'Lac de Neuchâtel', zone: 'neuchatel', lac: 'neuchatel' },
  { id: 'gletterens', nom: 'Gletterens', lat: 46.90804, lon: 6.92853, region: 'Lac de Neuchâtel', zone: 'neuchatel', lac: 'neuchatel' },
  { id: 'forel', nom: 'Forel', lat: 46.88102, lon: 6.88432, region: 'Lac de Neuchâtel', zone: 'neuchatel', lac: 'neuchatel' },
  { id: 'estavayer-le-lac', nom: 'Estavayer – Nouvelle Plage', lat: 46.85665, lon: 6.84823, region: 'Lac de Neuchâtel', zone: 'neuchatel', lac: 'neuchatel' },
  { id: 'cerlier', nom: 'Cerlier (Erlach)', lat: 47.04708, lon: 7.09679, region: 'Lac de Bienne', zone: 'bienne', lac: 'bienne' },
  { id: 'la-neuveville', nom: 'La Neuveville', lat: 47.06001, lon: 7.08845, region: 'Lac de Bienne', zone: 'bienne', lac: 'bienne' },
  { id: 'strandbad-rostele', nom: 'Strandbad Rostele', lat: 47.09526, lon: 7.16302, region: 'Lac de Bienne', zone: 'bienne', lac: 'bienne' },
  { id: 'tuscherz', nom: 'Tüscherz', lat: 47.11150, lon: 7.19126, region: 'Lac de Bienne', zone: 'bienne', lac: 'bienne' },
  { id: 'badewiese-funtelen', nom: 'Badewiese Funtelen', lat: 47.12171, lon: 7.20792, region: 'Lac de Bienne', zone: 'bienne', lac: 'bienne' },
  { id: 'bienne-plage', nom: 'Bienne – Plage', lat: 47.12955, lon: 7.23414, region: 'Lac de Bienne', zone: 'bienne', lac: 'bienne' },
  { id: 'nidau', nom: 'Nidau', lat: 47.12508, lon: 7.23075, region: 'Lac de Bienne', zone: 'bienne', lac: 'bienne' },
  { id: 'morat', nom: 'Morat', lat: 46.92733, lon: 7.11054, region: 'Lac de Morat', zone: 'morat', lac: 'morat' },
  { id: 'faoug', nom: 'Faoug', lat: 46.90998, lon: 7.07803, region: 'Lac de Morat', zone: 'morat', lac: 'morat' },
  { id: 'avenches', nom: 'Avenches', lat: 46.90520, lon: 7.04993, region: 'Lac de Morat', zone: 'morat', lac: 'morat' },
  { id: 'salavaux', nom: 'Salavaux', lat: 46.91481, lon: 7.03490, region: 'Lac de Morat', zone: 'morat', lac: 'morat' },
  { id: 'pont-la-ville', nom: 'Pont-la-Ville', lat: 46.69171, lon: 7.11127, region: 'Lac de la Gruyère', zone: 'gruyere', lac: 'gruyere' },
  { id: 'la-roche', nom: 'La Roche', lat: 46.68787, lon: 7.12131, region: 'Lac de la Gruyère', zone: 'gruyere', lac: 'gruyere' },
  { id: 'gumefens', nom: 'Gumefens', lat: 46.67892, lon: 7.08875, region: 'Lac de la Gruyère', zone: 'gruyere', lac: 'gruyere' },
  { id: 'corbieres', nom: 'Corbières', lat: 46.66338, lon: 7.10178, region: 'Lac de la Gruyère', zone: 'gruyere', lac: 'gruyere' },
  { id: 'morlon', nom: 'Morlon', lat: 46.62662, lon: 7.09564, region: 'Lac de la Gruyère', zone: 'gruyere', lac: 'gruyere' },
  { id: 'domaine-des-iles', nom: 'Domaine des Îles', lat: 46.21189, lon: 7.32197, region: 'Sion – Domaine des Îles', zone: 'sion', lac: 'sion' },
  // Tessin : lidos tirés d'OpenStreetMap (scripts/decouvrir.mjs), le 11 novembre 2026, rive suisse uniquement.
  { id: 'caslano', nom: 'Caslano', lat: 45.97119, lon: 8.88715, region: 'Lac de Lugano', zone: 'lugano', lac: 'lugano' },
  { id: 'magliaso', nom: 'Magliaso', lat: 45.97988, lon: 8.89485, region: 'Lac de Lugano', zone: 'lugano', lac: 'lugano' },
  { id: 'agno', nom: 'Agno', lat: 45.99222, lon: 8.89916, region: 'Lac de Lugano', zone: 'lugano', lac: 'lugano' },
  { id: 'lugano-riva-caccia', nom: 'Lugano – Riva Caccia', lat: 45.99573, lon: 8.94713, region: 'Lac de Lugano', zone: 'lugano', lac: 'lugano' },
  { id: 'paradiso-conca-d-oro', nom: 'Paradiso – Conca d’Oro', lat: 45.98879, lon: 8.95450, region: 'Lac de Lugano', zone: 'lugano', lac: 'lugano' },
  { id: 'lugano-parco-ciani', nom: 'Lugano – Parco Ciani', lat: 46.00219, lon: 8.96116, region: 'Lac de Lugano', zone: 'lugano', lac: 'lugano' },
  { id: 'lido-di-lugano', nom: 'Lido di Lugano', lat: 46.00472, lon: 8.96364, region: 'Lac de Lugano', zone: 'lugano', lac: 'lugano' },
  { id: 'castagnola-san-domenico', nom: 'Castagnola – San Domenico', lat: 46.00219, lon: 8.98952, region: 'Lac de Lugano', zone: 'lugano', lac: 'lugano' },
  { id: 'melide', nom: 'Melide', lat: 45.95280, lon: 8.94889, region: 'Lac de Lugano', zone: 'lugano', lac: 'lugano' },
  { id: 'bissone', nom: 'Bissone', lat: 45.95171, lon: 8.96390, region: 'Lac de Lugano', zone: 'lugano', lac: 'lugano' },
  { id: 'maroggia', nom: 'Maroggia', lat: 45.93375, lon: 8.96868, region: 'Lac de Lugano', zone: 'lugano', lac: 'lugano' },
  { id: 'melano', nom: 'Melano', lat: 45.92096, lon: 8.98164, region: 'Lac de Lugano', zone: 'lugano', lac: 'lugano' },
  { id: 'capolago', nom: 'Capolago', lat: 45.90492, lon: 8.97854, region: 'Lac de Lugano', zone: 'lugano', lac: 'lugano' },
  { id: 'riva-san-vitale', nom: 'Riva San Vitale', lat: 45.90622, lon: 8.97433, region: 'Lac de Lugano', zone: 'lugano', lac: 'lugano' },
  { id: 'brissago', nom: 'Brissago', lat: 46.11219, lon: 8.70599, region: 'Lac Majeur', zone: 'majeur', lac: 'majeur' },
  { id: 'ascona', nom: 'Ascona', lat: 46.14731, lon: 8.78201, region: 'Lac Majeur', zone: 'majeur', lac: 'majeur' },
  { id: 'gerra-gambarogno', nom: 'Gerra (Gambarogno)', lat: 46.12304, lon: 8.78376, region: 'Lac Majeur', zone: 'majeur', lac: 'majeur' },
  { id: 'lido-locarno', nom: 'Lido Locarno', lat: 46.16197, lon: 8.80378, region: 'Lac Majeur', zone: 'majeur', lac: 'majeur' },
  { id: 'locarno-bagno-pubblico', nom: 'Locarno – Bagno pubblico', lat: 46.15670, lon: 8.80360, region: 'Lac Majeur', zone: 'majeur', lac: 'majeur' },
  { id: 'tenero-lido-mappo', nom: 'Tenero – Lido Mappo', lat: 46.17472, lon: 8.84280, region: 'Lac Majeur', zone: 'majeur', lac: 'majeur' },
  { id: 'tenero', nom: 'Tenero', lat: 46.16719, lon: 8.85097, region: 'Lac Majeur', zone: 'majeur', lac: 'majeur' },
  // Lac de Joux et lac de Bret : OpenStreetMap (scripts/decouvrir.mjs), le 11 novembre 2026.
  { id: 'le-sentier-rocheray', nom: 'Le Sentier – Le Rocheray', lat: 46.61870, lon: 6.24686, region: 'Lac de Joux', zone: 'joux', lac: 'joux' },
  { id: 'le-pont', nom: 'Le Pont', lat: 46.66694, lon: 6.32894, region: 'Lac de Joux', zone: 'joux', lac: 'joux' },
  { id: 'lac-de-bret', nom: 'Lac de Bret', lat: 46.51546, lon: 6.77170, region: 'Lac de Bret', zone: 'bret', lac: 'bret' },
];

// Valeur de la série la plus proche de l'instant donné, si elle date de moins de 6 h.
export function valeurProche(serie, quand = Date.now()) {
  if (!serie?.t?.length) return null;
  let best = -1, ecart = Infinity;
  serie.t.forEach((t, i) => { const e = Math.abs(Date.parse(t) - quand); if (e < ecart && Number.isFinite(serie.v[i])) { ecart = e; best = i; } });
  return best >= 0 && ecart <= 6 * 3600e3 ? serie.v[best] : null;
}

// Tour du lac dans l'ordre du rivage (rive nord d'ouest en est, puis rive sud d'est en ouest) : sert à dessiner la carte.
export const TOUR = ['bains-des-paquis', 'pregny-chambesy', 'bellevue', 'genthod', 'versoix', 'celigny', 'mies', 'coppet', 'nyon', 'prangins', 'gland', 'dully', 'rolle', 'perroy', 'allaman', 'buchillon', 'saint-prex', 'tolochenaz', 'morges', 'preverenges', 'saint-sulpice', 'lausanne-vidy', 'lausanne-ouchy', 'lausanne-bellerive', 'pully', 'paudex', 'lutry', 'villette', 'cully-moratel', 'rivaz', 'saint-saphorin', 'corseaux', 'vevey', 'la-tour-de-peilz', 'montreux-clarens', 'veytaux', 'villeneuve', 'noville', 'le-bouveret', 'saint-gingolph', 'meillerie', 'lugrin', 'maxilly', 'neuvecelle', 'evian', 'publier-amphion', 'thonon-saint-disdille', 'thonon', 'anthy-sur-leman', 'margencel', 'sciez', 'excenevex', 'yvoire', 'nernier', 'messery', 'chens-sur-leman', 'hermance', 'anieres', 'corsier-port', 'collonge-bellerive-la-savonniere', 'cologny', 'tropical-corner', 'plage-des-eaux-vives', 'baby-plage', 'geneve-plage'];

// Projection simple (équirectangulaire autour de 46,4° N) vers un cadre de largeur donnée.
export function projeter(largeur, points = SPOTS.filter((s) => lacDe(s) === 'leman')) { // par défaut, les plages du Léman
  const lons = points.map((s) => s.lon), lats = points.map((s) => s.lat);
  const x0 = Math.min(...lons), x1 = Math.max(...lons), y0 = Math.min(...lats), y1 = Math.max(...lats);
  const k = Math.cos((((y0 + y1) / 2) * Math.PI) / 180), m = Math.max(x1 - x0, y1 - y0) * 0.054; // marge : 0.04° pour le Léman, comme avant
  const echelle = largeur / ((x1 - x0) * k + 2 * m);
  return { hauteur: ((y1 - y0) + 2 * m) * echelle, xy: (s) => [((s.lon - x0) * k + m) * echelle, ((y1 - s.lat) + m) * echelle] };
}
