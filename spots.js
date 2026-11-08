// Plages suivies. Partagé par l'app et par scripts/eau.mjs (températures Alplakes).
// Coordonnées vérifiées dans le modèle du Léman : toutes à moins de 800 m d'un point de calcul.
// Liste établie d'après les sites de baignade cités par le canton de Genève, la CIPEL et les offices du tourisme.
export const SPOTS = [
  { id: 'pregny-chambesy', nom: 'Pregny-Chambésy', lat: 46.2400, lon: 6.1530, region: 'Genève', zone: 'geneve' },
  { id: 'bains-des-paquis', nom: 'Bains des Pâquis', lat: 46.2105, lon: 6.1556, region: 'Genève', zone: 'geneve' },
  { id: 'geneve-plage', nom: 'Genève-Plage', lat: 46.2189, lon: 6.1797, region: 'Genève', zone: 'geneve' },
  { id: 'tropical-corner', nom: 'Tropical Corner', lat: 46.2212, lon: 6.1838, region: 'Genève', zone: 'geneve' },
  { id: 'baby-plage', nom: 'Baby-Plage', lat: 46.1988, lon: 6.1606, region: 'Genève', zone: 'geneve' },
  { id: 'plage-des-eaux-vives', nom: 'Plage des Eaux-Vives', lat: 46.2065, lon: 6.1650, region: 'Genève', zone: 'geneve' },
  { id: 'cologny', nom: 'Cologny', lat: 46.2250, lon: 6.1880, region: 'Genève', zone: 'geneve' },
  { id: 'collonge-bellerive-la-savonniere', nom: 'Collonge-Bellerive – La Savonnière', lat: 46.2625, lon: 6.196, region: 'Genève', zone: 'geneve' },
  { id: 'corsier-port', nom: 'Corsier-Port', lat: 46.2720, lon: 6.2080, region: 'Genève', zone: 'geneve' },
  { id: 'anieres', nom: 'Anières', lat: 46.2800, lon: 6.2190, region: 'Genève', zone: 'geneve' },
  { id: 'hermance', nom: 'Hermance', lat: 46.3015, lon: 6.2430, region: 'Genève', zone: 'geneve' },
  { id: 'bellevue', nom: 'Bellevue', lat: 46.2560, lon: 6.1620, region: 'Genève', zone: 'geneve' },
  { id: 'genthod', nom: 'Genthod', lat: 46.2660, lon: 6.1680, region: 'Genève', zone: 'geneve' },
  { id: 'versoix', nom: 'Versoix', lat: 46.2830, lon: 6.1700, region: 'Genève', zone: 'geneve' },
  { id: 'celigny', nom: 'Céligny', lat: 46.352, lon: 6.223, region: 'Genève', zone: 'geneve' },
  { id: 'mies', nom: 'Mies', lat: 46.3000, lon: 6.1780, region: 'La Côte', zone: 'nyon' },
  { id: 'coppet', nom: 'Coppet', lat: 46.3170, lon: 6.1930, region: 'La Côte', zone: 'nyon' },
  { id: 'nyon', nom: 'Nyon', lat: 46.3833, lon: 6.2417, region: 'La Côte', zone: 'nyon' },
  { id: 'prangins', nom: 'Prangins', lat: 46.3910, lon: 6.2620, region: 'La Côte', zone: 'nyon' },
  { id: 'gland', nom: 'Gland', lat: 46.4120, lon: 6.2870, region: 'La Côte', zone: 'nyon' },
  { id: 'dully', nom: 'Dully', lat: 46.4290, lon: 6.2970, region: 'La Côte', zone: 'nyon' },
  { id: 'rolle', nom: 'Rolle', lat: 46.4580, lon: 6.3400, region: 'La Côte', zone: 'nyon' },
  { id: 'perroy', nom: 'Perroy', lat: 46.4630, lon: 6.3610, region: 'La Côte', zone: 'nyon' },
  { id: 'allaman', nom: 'Allaman', lat: 46.4660, lon: 6.3990, region: 'La Côte', zone: 'nyon' },
  { id: 'buchillon', nom: 'Buchillon', lat: 46.4680, lon: 6.4190, region: 'La Côte', zone: 'nyon' },
  { id: 'saint-prex', nom: 'Saint-Prex', lat: 46.4770, lon: 6.4610, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'tolochenaz', nom: 'Tolochenaz', lat: 46.4940, lon: 6.4750, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'morges', nom: 'Morges', lat: 46.5050, lon: 6.4930, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'preverenges', nom: 'Préverenges', lat: 46.5130, lon: 6.5290, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'saint-sulpice', nom: 'Saint-Sulpice', lat: 46.5090, lon: 6.5580, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'lausanne-vidy', nom: 'Lausanne – Vidy', lat: 46.5161, lon: 6.5953, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'lausanne-ouchy', nom: 'Lausanne – Ouchy', lat: 46.5040, lon: 6.6290, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'lausanne-bellerive', nom: 'Lausanne – Bellerive', lat: 46.5055, lon: 6.6140, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'pully', nom: 'Pully', lat: 46.5060, lon: 6.6600, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'paudex', nom: 'Paudex', lat: 46.504, lon: 6.672, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'lutry', nom: 'Lutry', lat: 46.5020, lon: 6.6850, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'villette', nom: 'Villette', lat: 46.4910, lon: 6.7060, region: 'Riviera', zone: 'vevey' },
  { id: 'cully-moratel', nom: 'Cully – Moratel', lat: 46.487, lon: 6.727, region: 'Riviera', zone: 'vevey' },
  { id: 'rivaz', nom: 'Rivaz', lat: 46.473, lon: 6.78, region: 'Riviera', zone: 'vevey' },
  { id: 'saint-saphorin', nom: 'Saint-Saphorin', lat: 46.4705, lon: 6.7960, region: 'Riviera', zone: 'vevey' },
  { id: 'corseaux', nom: 'Corseaux', lat: 46.467, lon: 6.818, region: 'Riviera', zone: 'vevey' },
  { id: 'vevey', nom: 'Vevey', lat: 46.4614, lon: 6.8419, region: 'Riviera', zone: 'vevey' },
  { id: 'la-tour-de-peilz', nom: 'La Tour-de-Peilz', lat: 46.4520, lon: 6.8550, region: 'Riviera', zone: 'vevey' },
  { id: 'montreux-clarens', nom: 'Montreux – Clarens', lat: 46.4300, lon: 6.8960, region: 'Riviera', zone: 'vevey' },
  { id: 'veytaux', nom: 'Veytaux', lat: 46.4180, lon: 6.9240, region: 'Riviera', zone: 'vevey' },
  { id: 'villeneuve', nom: 'Villeneuve', lat: 46.3960, lon: 6.9230, region: 'Riviera', zone: 'vevey' },
  { id: 'noville', nom: 'Noville', lat: 46.3900, lon: 6.8940, region: 'Riviera', zone: 'vevey' },
  { id: 'le-bouveret', nom: 'Le Bouveret', lat: 46.3890, lon: 6.8580, region: 'Riviera', zone: 'vevey' },
  { id: 'saint-gingolph', nom: 'Saint-Gingolph', lat: 46.3930, lon: 6.8050, region: 'Riviera', zone: 'vevey' },
  { id: 'meillerie', nom: 'Meillerie', lat: 46.4095, lon: 6.7210, region: 'Rive française', zone: 'evian' },
  { id: 'lugrin', nom: 'Lugrin', lat: 46.4095, lon: 6.6640, region: 'Rive française', zone: 'evian' },
  { id: 'maxilly', nom: 'Maxilly', lat: 46.4070, lon: 6.6300, region: 'Rive française', zone: 'evian' },
  { id: 'neuvecelle', nom: 'Neuvecelle', lat: 46.4050, lon: 6.6050, region: 'Rive française', zone: 'evian' },
  { id: 'evian', nom: 'Évian', lat: 46.4010, lon: 6.5900, region: 'Rive française', zone: 'evian' },
  { id: 'publier-amphion', nom: 'Publier – Amphion', lat: 46.4, lon: 6.532, region: 'Rive française', zone: 'evian' },
  { id: 'thonon', nom: 'Thonon', lat: 46.3780, lon: 6.4800, region: 'Rive française', zone: 'evian' },
  { id: 'thonon-saint-disdille', nom: 'Thonon – Saint-Disdille', lat: 46.394, lon: 6.504, region: 'Rive française', zone: 'evian' },
  { id: 'anthy-sur-leman', nom: 'Anthy-sur-Léman', lat: 46.3600, lon: 6.4230, region: 'Rive française', zone: 'evian' },
  { id: 'margencel', nom: 'Margencel', lat: 46.3580, lon: 6.4060, region: 'Rive française', zone: 'evian' },
  { id: 'sciez', nom: 'Sciez', lat: 46.342, lon: 6.387, region: 'Rive française', zone: 'evian' },
  { id: 'excenevex', nom: 'Excenevex', lat: 46.3500, lon: 6.3600, region: 'Rive française', zone: 'evian' },
  { id: 'yvoire', nom: 'Yvoire', lat: 46.3720, lon: 6.3270, region: 'Rive française', zone: 'evian' },
  { id: 'nernier', nom: 'Nernier', lat: 46.3660, lon: 6.3060, region: 'Rive française', zone: 'evian' },
  { id: 'messery', nom: 'Messery', lat: 46.353, lon: 6.295, region: 'Rive française', zone: 'evian' },
  { id: 'chens-sur-leman', nom: 'Chens-sur-Léman', lat: 46.33, lon: 6.269, region: 'Rive française', zone: 'evian' },
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
export function projeter(largeur) {
  const k = Math.cos((46.4 * Math.PI) / 180), lons = SPOTS.map((s) => s.lon), lats = SPOTS.map((s) => s.lat);
  const x0 = Math.min(...lons), x1 = Math.max(...lons), y0 = Math.min(...lats), y1 = Math.max(...lats), m = 0.04;
  const echelle = largeur / ((x1 - x0) * k + 2 * m);
  return { hauteur: ((y1 - y0) + 2 * m) * echelle, xy: (s) => [((s.lon - x0) * k + m) * echelle, ((y1 - s.lat) + m) * echelle] };
}
