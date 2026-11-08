// Plages suivies. Partagé par l'app et par scripts/eau.mjs (températures Alplakes).
// Coordonnées vérifiées dans le modèle du Léman : toutes à moins de 800 m d'un point de calcul.
export const SPOTS = [
  { id: 'bains-des-paquis', nom: 'Bains des Pâquis', lat: 46.2105, lon: 6.1556, region: 'Genève', zone: 'geneve' },
  { id: 'geneve-plage', nom: 'Genève-Plage', lat: 46.2189, lon: 6.1797, region: 'Genève', zone: 'geneve' },
  { id: 'baby-plage', nom: 'Baby-Plage', lat: 46.1988, lon: 6.1606, region: 'Genève', zone: 'geneve' },
  { id: 'plage-des-eaux-vives', nom: 'Plage des Eaux-Vives', lat: 46.2065, lon: 6.1650, region: 'Genève', zone: 'geneve' },
  { id: 'versoix', nom: 'Versoix', lat: 46.2830, lon: 6.1700, region: 'Genève', zone: 'geneve' },
  { id: 'hermance', nom: 'Hermance', lat: 46.3015, lon: 6.2430, region: 'Genève', zone: 'geneve' },
  { id: 'coppet', nom: 'Coppet', lat: 46.3170, lon: 6.1930, region: 'La Côte', zone: 'nyon' },
  { id: 'nyon', nom: 'Nyon', lat: 46.3833, lon: 6.2417, region: 'La Côte', zone: 'nyon' },
  { id: 'rolle', nom: 'Rolle', lat: 46.4580, lon: 6.3400, region: 'La Côte', zone: 'nyon' },
  { id: 'morges', nom: 'Morges', lat: 46.5050, lon: 6.4930, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'preverenges', nom: 'Préverenges', lat: 46.5130, lon: 6.5290, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'saint-sulpice', nom: 'Saint-Sulpice', lat: 46.5090, lon: 6.5580, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'lausanne-vidy', nom: 'Lausanne – Vidy', lat: 46.5161, lon: 6.5953, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'lausanne-bellerive', nom: 'Lausanne – Bellerive', lat: 46.5055, lon: 6.6140, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'pully', nom: 'Pully', lat: 46.5060, lon: 6.6600, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'lutry', nom: 'Lutry', lat: 46.5020, lon: 6.6850, region: 'Morges et Lausanne', zone: 'lausanne' },
  { id: 'vevey', nom: 'Vevey', lat: 46.4614, lon: 6.8419, region: 'Riviera', zone: 'vevey' },
  { id: 'la-tour-de-peilz', nom: 'La Tour-de-Peilz', lat: 46.4520, lon: 6.8550, region: 'Riviera', zone: 'vevey' },
  { id: 'montreux-clarens', nom: 'Montreux – Clarens', lat: 46.4300, lon: 6.8960, region: 'Riviera', zone: 'vevey' },
  { id: 'villeneuve', nom: 'Villeneuve', lat: 46.3960, lon: 6.9230, region: 'Riviera', zone: 'vevey' },
  { id: 'saint-gingolph', nom: 'Saint-Gingolph', lat: 46.3930, lon: 6.8050, region: 'Riviera', zone: 'vevey' },
  { id: 'evian', nom: 'Évian', lat: 46.4010, lon: 6.5900, region: 'Rive française', zone: 'evian' },
  { id: 'thonon', nom: 'Thonon', lat: 46.3780, lon: 6.4800, region: 'Rive française', zone: 'evian' },
  { id: 'excenevex', nom: 'Excenevex', lat: 46.3500, lon: 6.3600, region: 'Rive française', zone: 'evian' },
  { id: 'yvoire', nom: 'Yvoire', lat: 46.3720, lon: 6.3270, region: 'Rive française', zone: 'evian' },
];

// Valeur de la série la plus proche de l'instant donné, si elle date de moins de 6 h.
export function valeurProche(serie, quand = Date.now()) {
  if (!serie?.t?.length) return null;
  let best = -1, ecart = Infinity;
  serie.t.forEach((t, i) => { const e = Math.abs(Date.parse(t) - quand); if (e < ecart && Number.isFinite(serie.v[i])) { ecart = e; best = i; } });
  return best >= 0 && ecart <= 6 * 3600e3 ? serie.v[best] : null;
}
