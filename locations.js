// Location et écoles d'activités nautiques autour du Léman, vérifiées le 8 novembre 2026.
// spot = plage la plus proche (spots.js) ; mois = saison d'ouverture si une source fiable la donne.
// site = site officiel quand il est confirmé ; source = page qui atteste l'offre.
// reserver (optionnel) : lien de réservation d'un partenaire ; le bouton n'apparaît que s'il est rempli.
export const ACTIVITES_LOC = {
  paddle: { fr: 'Paddle', en: 'Paddle' }, kayak: { fr: 'Kayak', en: 'Kayak' }, pedalo: { fr: 'Pédalo', en: 'Pedal boat' },
  bateau: { fr: 'Bateau', en: 'Boat' }, voile: { fr: 'Voile', en: 'Sailing' }, windsurf: { fr: 'Windsurf', en: 'Windsurf' },
  wing: { fr: 'Wing foil', en: 'Wing foil' }, wakeboard: { fr: 'Wakeboard', en: 'Wakeboard' }, sauna: { fr: 'Sauna', en: 'Sauna' },
};

export const LOCATIONS = [
  { nom: 'Sauna Boats Genève', ville: 'Genève', spot: 'plage-des-eaux-vives', activites: ['sauna', 'bateau'], site: 'https://saunaboat-geneve.ch/fr/',
    note: 'Le premier sauna flottant du Léman : jusqu’à six personnes, sans permis dans la rade, départ Quai Gustave-Ador 33.',
    en: 'Lake Geneva’s first floating sauna: up to six people, no licence needed in the harbour, departs Quai Gustave-Ador 33.',
    source: 'https://www.tdg.ch/geneve-un-sauna-flottant-sur-le-leman-aux-eaux-vives-271926804949' },
  { nom: 'Tropical Corner', ville: 'Cologny', spot: 'tropical-corner', activites: ['windsurf', 'paddle', 'wakeboard'], mois: [4, 10],
    note: 'École de windsurf depuis 1981 : location de planches et de paddles, ponton de wakeboard.',
    en: 'Windsurf school since 1981: board and paddle rental, wakeboard pontoon.',
    source: 'https://www.geneve.com/en/attractions/detail/tropical-corner' },
  { nom: 'Les Corsaires', ville: 'Genève', spot: 'plage-des-eaux-vives', activites: ['pedalo'],
    note: 'Pédalos de 2 à 6 places, avec ou sans toboggan, juste à côté du Jet d’eau.',
    en: 'Pedal boats for 2 to 6, with or without a slide, right next to the Jet d’eau.',
    source: 'https://www.geneve.com/en/see-do/outdoor-wellness/water-activities' },
  { nom: 'GenevaBoats', ville: 'Genève', spot: 'bains-des-paquis', activites: ['bateau'],
    note: 'Bateaux avec ou sans skipper depuis le quai du Mont-Blanc, pour une balade dans la rade ou plus loin.',
    en: 'Boats with or without a skipper from Quai du Mont-Blanc, around the harbour or further.',
    source: 'https://www.geneve.com/fr/attractions/detail/location-de-bateaux-genevaboats' },
  { nom: 'SUP Club Nyon', ville: 'Nyon', spot: 'nyon', activites: ['paddle'],
    note: 'Club de paddle au bord du lac, rue de Rive.',
    en: 'Lakeside paddle club on Rue de Rive.',
    source: 'https://torpille.ch/listing-category/activites-nautiques/paddle/' },
  { nom: 'Léman Kayak', ville: 'Allaman', spot: 'allaman', activites: ['kayak'],
    note: 'Randonnées en kayak sur le lac entre Allaman, Nyon et Morges, guidées ou en autonomie.',
    en: 'Kayak trips between Allaman, Nyon and Morges, guided or self-guided.',
    source: 'https://www.myswitzerland.com/en-ae/planning/offers/randonne-kayak-allaman-nyon/' },
  { nom: 'Passion Nautique', ville: 'Morges', spot: 'morges', activites: ['pedalo', 'bateau'],
    note: 'Base de location à Morges, du pédalo au bateau à moteur sans permis.',
    en: 'Rental base in Morges, from pedal boats to licence-free motorboats.',
    source: 'https://vvanat.fr/blog/passion-nautique-morges/' },
  { nom: 'Pedalino', ville: 'Lausanne', spot: 'lausanne-vidy', activites: ['paddle', 'pedalo', 'bateau'], mois: [5, 9],
    note: 'Centre nautique d’été au bout est de la grande plage de Vidy : paddles, pédalos, bateaux à moteur.',
    en: 'Summer water-sports centre at the east end of Vidy beach: paddles, pedal boats, motorboats.',
    source: 'https://www.lausanne-tourisme.ch/fr/activites-nautiques' },
  { nom: 'Pieds dans l’O', ville: 'Lausanne', spot: 'lausanne-ouchy', activites: ['pedalo', 'bateau', 'wakeboard'],
    note: 'Au vieux port d’Ouchy : pédalos, bateaux électriques ou à moteur, wakeboard et ski nautique.',
    en: 'At Ouchy’s old harbour: pedal boats, electric or motorboats, wakeboard and water skiing.',
    source: 'https://torpille.ch/listing/pieds-dans-lo-lausanne/' },
  { nom: 'Bains des Rives', ville: 'Lausanne', spot: 'lausanne-ouchy', activites: ['sauna'], mois: [10, 3],
    note: 'Sauna en yourte au bord du lac, plongeon dans le Léman entre deux séances, d’octobre à mars.',
    en: 'Yurt sauna by the lake with a dip in Lake Geneva between sessions, October to March.',
    source: 'https://www.loisirs.ch/activite/bains-des-rives-a-lausanne-sauna/' },
  { nom: 'SwissPaddle', ville: 'Corseaux', spot: 'corseaux', activites: ['paddle', 'wing'],
    note: 'Paddles et wing foil à Corseaux, à côté de Nestlé Vevey.',
    en: 'Paddle boards and wing foil in Corseaux, next to Nestlé in Vevey.',
    source: 'https://torpille.ch/listing/swisspaddle-vevey/' },
  { nom: 'Nautic Loisirs', ville: 'Montreux', spot: 'montreux-clarens', activites: ['paddle', 'kayak', 'bateau', 'windsurf'], site: 'https://www.nauticloisirs.ch',
    note: 'Quai des Fleurs : paddles, kayaks, planches à voile et bateaux à moteur.',
    en: 'Quai des Fleurs: paddles, kayaks, windsurf boards and motorboats.',
    source: 'https://www.fodors.com/world/europe/switzerland/vaud/things-to-do/sports-activities/boating-302718480' },
  { nom: 'Evolution 2 Thonon', ville: 'Thonon', spot: 'thonon', activites: ['paddle', 'kayak', 'pedalo'],
    note: 'Base nautique du quai de Ripaille, près de la plage de la Pinède : paddle, paddle géant, kayak, pédalo.',
    en: 'Water-sports base on Quai de Ripaille near Pinède beach: paddle, giant paddle, kayak, pedal boat.',
    source: 'https://www.haute-savoie-tourisme.org/loisirs/activites-sportives/sports-cyclistes/7914483-multi-activite-velo-electrique-canoe-ou-paddle' },
];

// Ouvert en ce moment ? (saisons à cheval sur l'année comprises, ex. octobre à mars)
export function ouvertLoc(l, d = new Date()) {
  if (!l.mois) return true;
  const m = d.getMonth() + 1, [a, b] = l.mois;
  return a <= b ? m >= a && m <= b : m >= a || m <= b;
}
