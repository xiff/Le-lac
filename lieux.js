// Bars et restos au bord de l'eau, vérifiés le 8 novembre 2026 (offices du tourisme, guides, sites des lieux).
// Sources des ajouts : lacote-tourisme.ch, myswitzerland.com, hautesavoiemontblanc-tourisme.com, montsdugenevois.com, auvergnerhonealpes-tourisme.com.
// zone = zone des plages (voir spots.js). mois = [premier, dernier] mois d'ouverture, absent si toute l'année.
// reserver (optionnel) : lien de réservation d'un partenaire ; le bouton n'apparaît que s'il est rempli.
export const LIEUX = [
  { nom: 'Buvette des Bains des Pâquis', ville: 'Genève', zone: 'geneve', type: 'bar', note: 'Ouverte toute l’année : fondue l’hiver, plat du jour l’été, les pieds presque dans l’eau.', en: 'Open all year: fondue in winter, dish of the day in summer, feet almost in the water.' },
  { nom: 'Tropical Corner', ville: 'Cologny', zone: 'geneve', type: 'bar', mois: [4, 10], note: 'Club nautique les pieds dans l’eau depuis 1981 : terrasse sous les palmiers, burgers et tapas, ponton de wakeboard, windsurf et paddle.', en: 'Lakeside watersports club since 1981: terrace under palm trees, burgers and tapas, wakeboard pontoon, windsurf and paddle.' },
  { nom: 'Restaurant de la Plage & Buvette', ville: 'Genève', zone: 'geneve', type: 'bar', note: 'Sur pilotis au bout de la plage des Eaux-Vives : perches, hot-dogs et glaces.', en: 'On stilts at the end of Eaux-Vives beach: perch, hot dogs and ice cream.' },
  { nom: 'La Barje des Lavandières', ville: 'Genève', zone: 'geneve', type: 'bar', mois: [5, 9], note: 'Buvette d’été au bord du Rhône, concerts gratuits, à deux pas de la rade.', en: 'Summer bar on the Rhône with free concerts, a stone’s throw from the harbour.' },
  { nom: 'La Perle du Lac', ville: 'Genève', zone: 'geneve', type: 'resto', note: 'Pavillon dans le parc Mon Repos, grande terrasse face au lac. Fermé le lundi en hiver.', en: 'Pavilion in Mon Repos park, big terrace facing the lake. Closed Mondays in winter.' },
  { nom: 'Hôtel du Parc des Eaux-Vives', ville: 'Genève', zone: 'geneve', type: 'resto', note: 'Maison de maître en haut du parc, vue sur le lac et le Jura. Pour une occasion.', en: 'Mansion at the top of the park, lake and Jura views. For a special occasion.' },
  { nom: 'Auberge d’Hermance', ville: 'Hermance', zone: 'geneve', type: 'resto', note: 'Village au bord du lac, à 20 minutes de Genève, produits du coin.', en: 'Lakeside village 20 minutes from Geneva, local produce.' },
  { nom: 'Hôtel du Lac', ville: 'Coppet', zone: 'nyon', type: 'resto', note: 'Terrasse avec vue sur le lac, entre Genève et Nyon.', en: 'Terrace with a lake view, between Geneva and Nyon.' },
  { nom: 'O’Les Terrasses du Lac', ville: 'Nyon', zone: 'nyon', type: 'bar', note: 'Rue de Rive, trois espaces et une terrasse face au lac et aux Alpes, du café du matin au dernier verre.', en: 'Rue de Rive, three spaces and a terrace facing the lake and the Alps, from morning coffee to the last drink.' },
  { nom: 'Restaurant de la Plage', ville: 'Nyon', zone: 'nyon', type: 'resto', note: 'Poisson du lac et spécialités régionales au bord de l’eau, brunch le dimanche.', en: 'Lake fish and regional dishes by the water, Sunday brunch.' },
  { nom: 'La Jetée de la Compagnie', ville: 'Lausanne', zone: 'lausanne', type: 'bar', mois: [5, 9], note: 'Buvette d’été sur la jetée d’Ouchy : ponton, grillades et coucher de soleil.', en: 'Summer bar on the Ouchy jetty: deck, barbecue and sunsets.' },
  { nom: 'Le Lacustre', ville: 'Lausanne', zone: 'lausanne', type: 'resto', note: 'Au-dessus du débarcadère d’Ouchy : pizzas au feu de bois et brunch le week-end.', en: 'Above the Ouchy pier: wood-fired pizza and weekend brunch.' },
  { nom: 'Bar du Beau-Rivage Palace', ville: 'Lausanne', zone: 'lausanne', type: 'bar', note: 'Le verre chic, terrasse sous les arcades face au lac et aux Alpes.', en: 'The fancy drink, terrace under the arches facing the lake and the Alps.' },
  { nom: 'Le Rivage', ville: 'Lutry', zone: 'lausanne', type: 'resto', note: 'Terrasse sur les quais de Lutry, poissons du lac, au pied de Lavaux.', en: 'Terrace on the Lutry quays, lake fish, at the foot of Lavaux.' },
  { nom: 'Hôtel des Trois Couronnes', ville: 'Vevey', zone: 'vevey', type: 'bar', note: 'Terrasse panoramique Belle Époque sur les quais de Vevey.', en: 'Belle Époque panoramic terrace on the Vevey quays.' },
  { nom: 'La Terrasse du Petit Palais', ville: 'Montreux', zone: 'vevey', type: 'resto', mois: [5, 9], note: 'La terrasse du Montreux Palace, face au lac et aux Alpes, aux beaux jours.', en: 'The Montreux Palace terrace, facing the lake and the Alps, in fine weather.' },
  { nom: 'Hôtel Restaurant de la Plage', ville: 'Excenevex', zone: 'evian', type: 'resto', note: 'Les pieds dans l’eau toute l’année, panorama sur le lac et les montagnes, cuisine maison de saison.', en: 'Feet in the water all year round, lake and mountain views, seasonal home cooking.' },
  { nom: 'La Guinguette de la plage', ville: 'Excenevex', zone: 'evian', type: 'bar', note: 'La guinguette de la grande plage de sable d’Excenevex.', en: 'The beach bar on Excenevex’s big sandy beach.' },
  { nom: 'Restaurant Plage Les Pêcheurs', ville: 'Sciez', zone: 'evian', type: 'resto', note: 'Une institution depuis 1964 : terrasse les pieds dans l’eau sous des platanes centenaires.', en: 'An institution since 1964: feet-in-the-water terrace under century-old plane trees.' },
  { nom: 'Hôtel-Restaurant du Port', ville: 'Yvoire', zone: 'evian', type: 'resto', mois: [3, 10], note: 'Village médiéval, terrasse sur le port côté français.', en: 'Medieval village, terrace on the harbour on the French side.' },
];

export const lienCarte = (l) => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(`${l.nom} ${l.ville}`);

// Fermé en ce moment ? Renvoie « Fermé jusqu'en mai » ou null si ouvert (ou ouvert toute l'année).
export function fermeture(l, d = new Date(), langue = 'fr') {
  if (!l.mois) return null;
  const m = d.getMonth() + 1, [a, b] = l.mois;
  if (m >= a && m <= b) return null;
  const mois = new Date(2026, a - 1, 1).toLocaleDateString(langue === 'en' ? 'en-GB' : 'fr-CH', { month: 'long' });
  return langue === 'en' ? `Closed until ${mois}` : `Fermé jusqu’en ${mois}`;
}

// Plage la plus proche d'une position (distance à plat, suffisante à l'échelle du lac).
export function plusProche(spots, lat, lon) {
  const k = Math.cos((lat * Math.PI) / 180);
  const d = (s) => (s.lat - lat) ** 2 + ((s.lon - lon) * k) ** 2;
  return spots.reduce((best, s, i) => (d(s) < d(spots[best]) ? i : best), 0);
}
