// Bars et restos au bord de l'eau, vérifiés le 8 novembre 2026 (offices du tourisme, guides, sites des lieux).
// Sources des ajouts : lacote-tourisme.ch, myswitzerland.com, hautesavoiemontblanc-tourisme.com, montsdugenevois.com, auvergnerhonealpes-tourisme.com, lausanne-tourisme.ch, hautesavoiemontblanc-tourisme.com, montreuxriviera.com, morges-tourisme.ch.
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
  { nom: 'Le Casino', ville: 'Rolle', zone: 'nyon', type: 'resto', note: 'Terrasse ombragée sur la promenade du lac et véranda lumineuse. Fermé dimanche soir et lundi.', en: 'Shaded terrace on the lakeside promenade and a bright veranda. Closed Sunday evening and Monday.' },
  { nom: 'O’Les Terrasses du Lac', ville: 'Nyon', zone: 'nyon', type: 'bar', note: 'Rue de Rive, trois espaces et une terrasse face au lac et aux Alpes, du café du matin au dernier verre.', en: 'Rue de Rive, three spaces and a terrace facing the lake and the Alps, from morning coffee to the last drink.' },
  { nom: 'Restaurant de la Plage', ville: 'Nyon', zone: 'nyon', type: 'resto', note: 'Poisson du lac et spécialités régionales au bord de l’eau, brunch le dimanche.', en: 'Lake fish and regional dishes by the water, Sunday brunch.' },
  { nom: 'Le Pavois', ville: 'Morges', zone: 'lausanne', type: 'resto', note: 'Restaurant de l’hôtel Mont-Blanc au Lac, terrasse sur les quais de Morges.', en: 'Restaurant of the Mont-Blanc au Lac hotel, terrace on the Morges quays.' },
  { nom: 'La Jetée de la Compagnie', ville: 'Lausanne', zone: 'lausanne', type: 'bar', mois: [5, 9], note: 'Buvette d’été sur la jetée d’Ouchy : ponton, grillades et coucher de soleil.', en: 'Summer bar on the Ouchy jetty: deck, barbecue and sunsets.' },
  { nom: 'Hôtel-Restaurant de la Plage', ville: 'Préverenges', zone: 'lausanne', type: 'resto', note: 'Au bout de l’avenue de la Plage, terrasse ensoleillée à deux pas de la grande plage de sable.', en: 'At the end of Avenue de la Plage, sunny terrace a stone’s throw from the big sandy beach.' },
  { nom: 'La Guinguette de Vidy', ville: 'Lausanne', zone: 'lausanne', type: 'bar', mois: [4, 9], note: 'Devant le Bowl de Vidy, au bord de l’eau : le rendez-vous des promeneurs et des paddleurs.', en: 'In front of the Vidy Bowl by the water: where walkers and paddlers meet.' },
  { nom: 'Le Lacustre', ville: 'Lausanne', zone: 'lausanne', type: 'resto', note: 'Au-dessus du débarcadère d’Ouchy : pizzas au feu de bois et brunch le week-end.', en: 'Above the Ouchy pier: wood-fired pizza and weekend brunch.' },
  { nom: 'Bar du Beau-Rivage Palace', ville: 'Lausanne', zone: 'lausanne', type: 'bar', note: 'Le verre chic, terrasse sous les arcades face au lac et aux Alpes.', en: 'The fancy drink, terrace under the arches facing the lake and the Alps.' },
  { nom: 'La Générale', ville: 'Pully', zone: 'lausanne', type: 'bar', mois: [4, 9], note: 'Buvette du port de Pully, marches en pierre jusqu’au lac, beach-volley à côté.', en: 'Pully harbour bar, stone steps down to the lake, beach volleyball next door.' },
  { nom: 'Restaurant du Port de Pully', ville: 'Pully', zone: 'lausanne', type: 'resto', note: 'Sur le port, face au lac et aux Alpes.', en: 'On the harbour, facing the lake and the Alps.' },
  { nom: 'Le Rivage', ville: 'Lutry', zone: 'lausanne', type: 'resto', note: 'Terrasse sur les quais de Lutry, poissons du lac, au pied de Lavaux.', en: 'Terrace on the Lutry quays, lake fish, at the foot of Lavaux.' },
  { nom: 'Hôtel des Trois Couronnes', ville: 'Vevey', zone: 'vevey', type: 'bar', note: 'Terrasse panoramique Belle Époque sur les quais de Vevey.', en: 'Belle Époque panoramic terrace on the Vevey quays.' },
  { nom: 'Kju', ville: 'Vevey', zone: 'vevey', type: 'bar', note: 'Restaurant, bar et club dans un ancien hangar à bateaux du XVIIIe, une des plus belles terrasses de Vevey.', en: 'Restaurant, bar and club in an 18th-century boathouse, one of the finest terraces in Vevey.' },
  { nom: 'La Véranda (Grand Hôtel du Lac)', ville: 'Vevey', zone: 'vevey', type: 'resto', note: 'Terrasse sur le port, le lac et les Alpes, cuisine décontractée.', en: 'Terrace over the harbour, the lake and the Alps, relaxed cooking.' },
  { nom: 'La Terrasse du Petit Palais', ville: 'Montreux', zone: 'vevey', type: 'resto', mois: [5, 9], note: 'La terrasse du Montreux Palace, face au lac et aux Alpes, aux beaux jours.', en: 'The Montreux Palace terrace, facing the lake and the Alps, in fine weather.' },
  { nom: 'Bar-Restaurant de la Plage municipale', ville: 'Thonon-les-Bains', zone: 'evian', type: 'resto', mois: [5, 9], note: 'Au cœur de la plage municipale, quai de Ripaille : menu du jour et spécialités locales, les pieds dans l’eau.', en: 'In the middle of the town beach on Quai de Ripaille: dish of the day and local specialities, feet in the water.' },
  { nom: 'Le Phare', ville: 'Le Bouveret', zone: 'vevey', type: 'bar', note: 'Terrasse sur le lac face au coucher de soleil, ouverte de 9 h à minuit.', en: 'Lake terrace facing the sunset, open 9am to midnight.' },
  { nom: 'Café Helvetia « Au 17 17 »', ville: 'Saint-Gingolph', zone: 'vevey', type: 'bar', note: 'Grande terrasse au-dessus du lac, ouverte toute l’année.', en: 'Big terrace above the lake, open all year round.' },
  { nom: 'Restaurant Bellevue', ville: 'Saint-Gingolph', zone: 'vevey', type: 'resto', note: 'Sur le quai, terrasse face au lac et aux montagnes.', en: 'On the quay, terrace facing the lake and the mountains.' },
  { nom: 'Hôtel Restaurant de la Plage', ville: 'Excenevex', zone: 'evian', type: 'resto', note: 'Les pieds dans l’eau toute l’année, panorama sur le lac et les montagnes, cuisine maison de saison.', en: 'Feet in the water all year round, lake and mountain views, seasonal home cooking.' },
  { nom: 'La Guinguette de la plage', ville: 'Excenevex', zone: 'evian', type: 'bar', note: 'La guinguette de la grande plage de sable d’Excenevex.', en: 'The beach bar on Excenevex’s big sandy beach.' },
  { nom: 'Restaurant Plage Les Pêcheurs', ville: 'Sciez', zone: 'evian', type: 'resto', note: 'Une institution depuis 1964 : terrasse les pieds dans l’eau sous des platanes centenaires.', en: 'An institution since 1964: feet-in-the-water terrace under century-old plane trees.' },
  { nom: 'Yacht Restaurant', ville: 'Évian-les-Bains', zone: 'evian', type: 'resto', note: 'Au Hilton, quai Paul-Léger, cuisine méditerranéenne face au lac.', en: 'At the Hilton on Quai Paul-Léger, Mediterranean food facing the lake.' },
  { nom: 'Ô Lac', ville: 'Neuvecelle', zone: 'evian', type: 'resto', note: 'Hôtel-restaurant à Grande Rive, terrasse panoramique face au lac.', en: 'Hotel restaurant at Grande Rive, panoramic terrace facing the lake.' },
  { nom: 'Hôtel-Restaurant du Port', ville: 'Yvoire', zone: 'evian', type: 'resto', mois: [3, 10], note: 'Village médiéval, terrasse sur le port côté français.', en: 'Medieval village, terrace on the harbour on the French side.' },
];

export const lienCarte = (l) => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(`${l.nom} ${l.ville}`);

// Fermé en ce moment ? Renvoie « Fermé jusqu'en mai » ou null si ouvert (ou ouvert toute l'année).
export function fermeture(l, d = new Date(), langue = 'fr') {
  if (!l.mois) return null;
  const m = d.getMonth() + 1, [a, b] = l.mois;
  if (m >= a && m <= b) return null;
  const mois = new Date(2026, a - 1, 1).toLocaleDateString({ en: 'en-GB', de: 'de-CH', it: 'it-CH' }[langue] ?? 'fr-CH', { month: 'long' });
  return { en: `Closed until ${mois}`, de: `Geschlossen bis ${mois}`, it: `Chiuso fino a ${mois}` }[langue] ?? `Fermé jusqu’en ${mois}`;
}

// Plage la plus proche d'une position (distance à plat, suffisante à l'échelle du lac).
export function plusProche(spots, lat, lon) {
  const k = Math.cos((lat * Math.PI) / 180);
  const d = (s) => (s.lat - lat) ** 2 + ((s.lon - lon) * k) ** 2;
  return spots.reduce((best, s, i) => (d(s) < d(spots[best]) ? i : best), 0);
}
