// Bars et restos au bord de l'eau, vérifiés le 8 novembre 2026 (offices du tourisme, guides, sites des lieux).
// zone = zone des plages (voir spots.js). mois = [premier, dernier] mois d'ouverture, absent si toute l'année.
// reserver (optionnel) : lien de réservation d'un partenaire ; le bouton n'apparaît que s'il est rempli.
export const LIEUX = [
  { nom: 'Buvette des Bains des Pâquis', ville: 'Genève', zone: 'geneve', type: 'bar', note: 'Ouverte toute l’année : fondue l’hiver, plat du jour l’été, les pieds presque dans l’eau.' },
  { nom: 'Restaurant de la Plage & Buvette', ville: 'Genève', zone: 'geneve', type: 'bar', note: 'Sur pilotis au bout de la plage des Eaux-Vives : perches, hot-dogs et glaces.' },
  { nom: 'La Barje des Lavandières', ville: 'Genève', zone: 'geneve', type: 'bar', mois: [5, 9], note: 'Buvette d’été au bord du Rhône, concerts gratuits, à deux pas de la rade.' },
  { nom: 'La Perle du Lac', ville: 'Genève', zone: 'geneve', type: 'resto', note: 'Pavillon dans le parc Mon Repos, grande terrasse face au lac. Fermé le lundi en hiver.' },
  { nom: 'Hôtel du Parc des Eaux-Vives', ville: 'Genève', zone: 'geneve', type: 'resto', note: 'Maison de maître en haut du parc, vue sur le lac et le Jura. Pour une occasion.' },
  { nom: 'Auberge d’Hermance', ville: 'Hermance', zone: 'geneve', type: 'resto', note: 'Village au bord du lac, à 20 minutes de Genève, produits du coin.' },
  { nom: 'Hôtel du Lac', ville: 'Coppet', zone: 'nyon', type: 'resto', note: 'Terrasse avec vue sur le lac, entre Genève et Nyon.' },
  { nom: 'La Jetée de la Compagnie', ville: 'Lausanne', zone: 'lausanne', type: 'bar', mois: [5, 9], note: 'Buvette d’été sur la jetée d’Ouchy : ponton, grillades et coucher de soleil.' },
  { nom: 'Le Lacustre', ville: 'Lausanne', zone: 'lausanne', type: 'resto', note: 'Au-dessus du débarcadère d’Ouchy : pizzas au feu de bois et brunch le week-end.' },
  { nom: 'Bar du Beau-Rivage Palace', ville: 'Lausanne', zone: 'lausanne', type: 'bar', note: 'Le verre chic, terrasse sous les arcades face au lac et aux Alpes.' },
  { nom: 'Le Rivage', ville: 'Lutry', zone: 'lausanne', type: 'resto', note: 'Terrasse sur les quais de Lutry, poissons du lac, au pied de Lavaux.' },
  { nom: 'Hôtel des Trois Couronnes', ville: 'Vevey', zone: 'vevey', type: 'bar', note: 'Terrasse panoramique Belle Époque sur les quais de Vevey.' },
  { nom: 'La Terrasse du Petit Palais', ville: 'Montreux', zone: 'vevey', type: 'resto', mois: [5, 9], note: 'La terrasse du Montreux Palace, face au lac et aux Alpes, aux beaux jours.' },
  { nom: 'Hôtel-Restaurant du Port', ville: 'Yvoire', zone: 'evian', type: 'resto', mois: [3, 10], note: 'Village médiéval, terrasse sur le port côté français.' },
];

export const lienCarte = (l) => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(`${l.nom} ${l.ville}`);

const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
// Fermé en ce moment ? Renvoie « Rouvre en mai » ou null si ouvert (ou ouvert toute l'année).
export function fermeture(l, d = new Date()) {
  if (!l.mois) return null;
  const m = d.getMonth() + 1, [a, b] = l.mois;
  return m >= a && m <= b ? null : `Fermé jusqu’en ${MOIS[a - 1]}`;
}

// Plage la plus proche d'une position (distance à plat, suffisante à l'échelle du lac).
export function plusProche(spots, lat, lon) {
  const k = Math.cos((lat * Math.PI) / 180);
  const d = (s) => (s.lat - lat) ** 2 + ((s.lon - lon) * k) ** 2;
  return spots.reduce((best, s, i) => (d(s) < d(spots[best]) ? i : best), 0);
}
