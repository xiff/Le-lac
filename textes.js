// Textes de l'interface en français et en anglais (expatriés et organisations internationales).
// Langue : choix mémorisé, sinon celle du téléphone ; français par défaut.
const TEXTES = {
  fr: {
    titre: 'Mon Lac aujourd’hui', partagerAria: 'Partager les conditions', plage: 'Plage', localiserAria: 'Choisir la plage la plus proche',
    chargement: 'On regarde le lac…', eau: 'eau', air: 'air', vent: 'vent km/h',
    bienvenueTitre: 'Bienvenue au bord de l’eau.', bienvenueTexte: 'Chaque jour, on lit le vent, l’eau et la bise pour te dire si ça vaut le coup de sortir le maillot. Commence par ta plage.',
    trouver: 'Trouver ma plage', plusTard: 'Je choisis moi-même', surLeau: 'Sur l’eau',
    defiTitre: 'Défi bain d’hiver', jySuisAlle: 'J’y suis allé', heures: 'Les 12 prochaines heures', heuresAria: 'Prévisions heure par heure',
    pied: 'Météo <a href="https://open-meteo.com">Open-Meteo</a> · eau à 70 cm : <a href="https://www.alplakes.eawag.ch">Alplakes, Eawag</a> (CC BY 4.0), modèle mis à jour toutes les 3 h.<br>Indicatif : le lac a toujours le dernier mot. <a href="presentation/">À propos</a>',
    terrasse: 'Temps de terrasse. Ce serait dommage de rester dedans.', typeLieu: 'Type de lieu', tout: 'Tout', bars: 'Bars', restos: 'Restos',
    noteLieux: 'Horaires et saisons changent : un coup de fil avant d’y aller.', sections: 'Sections', ongletLac: 'Le lac', ongletSortir: 'Sortir',
    qualite: (cl, o) => `Eau de baignade ${cl} (${o})`, sourceGe: (d, p) => `Canton de Genève, analyse du ${d}, ${p}`, classes: ['en cours de classification', 'excellente à bonne', 'bonne à moyenne', 'pouvant être momentanément polluée', 'de mauvaise qualité'],
    eauMauvaise: 'Baignade déconseillée : eau de mauvaise qualité selon les dernières analyses.', eauPolluee: 'Eau pouvant être momentanément polluée selon les dernières analyses : évite après un orage.',
    carteTitre: 'Tout le lac', extremes: (c, tc, f, tf) => `Le plus chaud : ${c}, ${tc}°. Le plus froid : ${f}, ${tf}°. Touche un point pour y aller.`,
    mesPlages: 'Mes plages', favoriAjouter: (n) => `Ajouter ${n} à mes plages`, favoriRetirer: (n) => `Retirer ${n} de mes plages`,
    favoriAjoute: (n) => `${n} est dans tes plages.`, favoriRetire: (n) => `${n} retirée de tes plages.`,
    autreLangue: 'English', libelles: ['Non', 'Bof', 'Bien', 'Parfait'],
    activites: { baignade: 'Baignade', paddle: 'Paddle', voile: 'Voile / wing', hiver: 'Bain d’hiver' },
    regions: { 'Genève': 'Genève', 'La Côte': 'La Côte', 'Morges et Lausanne': 'Morges et Lausanne', 'Riviera': 'Riviera', 'Rive française': 'Rive française' },
    ventDe: (d) => `vent venant de ${d}°`, releve: (h) => `Relevé de ${h}`, horsLigne: (h) => `Hors ligne · dernières données de ${h}`,
    orage: 'Orage : tout le monde sort de l’eau.', bise: 'Bise en cours : vagues, courant, et cheveux en bataille.', rafales: 'Rafales fortes : tiens bien ton paddle.',
    meilleur: (de, a) => `Meilleur moment ${de}–${a}`, afficherHeures: 'Afficher dans les prochaines heures',
    pasDeReponse: 'Le lac ne répond pas.', pasDeDonnees: 'Pas de réseau ni de données en mémoire. Réessaie dans un instant.',
    heuresVides: 'Prévisions horaires indisponibles pour l’instant. Le lac garde ses secrets.',
    pres: (n) => `Près de ${n}`, ailleurs: 'Ailleurs sur le lac', itineraire: 'Itinéraire', reserver: 'Réserver',
    pasDeGeo: 'Pas de localisation sur cet appareil.', cap: (n) => `Cap sur ${n}.`, geoRefusee: 'Position refusée. Choisis ta plage dans la liste.',
    bains: (n) => (n === 0 ? 'Aucun bain cette saison. Pour l’instant.' : n === 1 ? '1 bain cette saison. Le premier est le plus dur.' : `${n} bains cette saison. Les cygnes te respectent.`),
    partageBain: (n, plage, eau) => `Bain d’hiver n°${n} de la saison à ${plage}${eau == null ? '' : `, eau à ${eau}°`}. Qui me suit la prochaine fois ?`,
    merciBain: (n) => `Respect. Bain n°${n} noté.`, copie: 'Copié. Plus qu’à coller dans le groupe.', copieAussi: 'Message copié.', partageImpossible: 'Partage impossible ici.',
    partageConditions: (v, plage, eau, air, vent) => `${v} ${plage} : eau ${eau}, air ${air}°, vent ${vent} km/h.`, partageDefaut: 'Le Léman du jour en un coup d’œil.',
  },
  en: {
    titre: 'My Lake Today', partagerAria: 'Share conditions', plage: 'Beach', localiserAria: 'Pick the nearest beach',
    chargement: 'Checking the lake…', eau: 'water', air: 'air', vent: 'wind km/h',
    bienvenueTitre: 'Welcome to the waterfront.', bienvenueTexte: 'Every day we read the wind, the water and the bise to tell you if it’s worth grabbing your swimsuit. Start with your beach.',
    trouver: 'Find my beach', plusTard: 'I’ll pick myself', surLeau: 'On the water',
    defiTitre: 'Winter swim challenge', jySuisAlle: 'I went in', heures: 'Next 12 hours', heuresAria: 'Hour-by-hour forecast',
    pied: 'Weather <a href="https://open-meteo.com">Open-Meteo</a> · water at 70 cm: <a href="https://www.alplakes.eawag.ch">Alplakes, Eawag</a> (CC BY 4.0), model updated every 3 h.<br>For guidance only: the lake always has the last word. <a href="presentation/">About</a>',
    terrasse: 'Terrace weather. Shame to stay indoors.', typeLieu: 'Type of place', tout: 'All', bars: 'Bars', restos: 'Restaurants',
    noteLieux: 'Hours and seasons change: give them a call before you go.', sections: 'Sections', ongletLac: 'The lake', ongletSortir: 'Go out',
    qualite: (cl, o) => `Bathing water ${cl} (${o})`, sourceGe: (d, p) => `Canton of Geneva, tested ${d}, ${p}`, classes: ['being classified', 'excellent to good', 'good to fair', 'may be temporarily polluted', 'poor'],
    eauMauvaise: 'Swimming not advised: poor water quality according to the latest tests.', eauPolluee: 'Water may be temporarily polluted according to the latest tests: avoid after a storm.',
    carteTitre: 'The whole lake', extremes: (c, tc, f, tf) => `Warmest: ${c}, ${tc}°. Coldest: ${f}, ${tf}°. Tap a dot to go there.`,
    mesPlages: 'My beaches', favoriAjouter: (n) => `Add ${n} to my beaches`, favoriRetirer: (n) => `Remove ${n} from my beaches`,
    favoriAjoute: (n) => `${n} added to your beaches.`, favoriRetire: (n) => `${n} removed from your beaches.`,
    autreLangue: 'Français', libelles: ['No', 'Meh', 'Good', 'Perfect'],
    activites: { baignade: 'Swimming', paddle: 'Paddle', voile: 'Sailing / wing', hiver: 'Winter swim' },
    regions: { 'Genève': 'Geneva', 'La Côte': 'La Côte', 'Morges et Lausanne': 'Morges & Lausanne', 'Riviera': 'Riviera', 'Rive française': 'French shore' },
    ventDe: (d) => `wind from ${d}°`, releve: (h) => `Reading from ${h}`, horsLigne: (h) => `Offline · last data from ${h}`,
    orage: 'Thunderstorm: everybody out of the water.', bise: 'Bise blowing: waves, currents and messy hair.', rafales: 'Strong gusts: hold on to your paddle.',
    meilleur: (de, a) => `Best time ${de}–${a}`, afficherHeures: 'Show in the next hours',
    pasDeReponse: 'The lake isn’t answering.', pasDeDonnees: 'No network and nothing saved yet. Try again in a moment.',
    heuresVides: 'Hourly forecast unavailable for now. The lake keeps its secrets.',
    pres: (n) => `Near ${n}`, ailleurs: 'Elsewhere on the lake', itineraire: 'Directions', reserver: 'Book',
    pasDeGeo: 'No location on this device.', cap: (n) => `Heading to ${n}.`, geoRefusee: 'Location denied. Pick your beach from the list.',
    bains: (n) => (n === 0 ? 'No swims this season. Yet.' : n === 1 ? '1 swim this season. The first is the hardest.' : `${n} swims this season. The swans respect you.`),
    partageBain: (n, plage, eau) => `Winter swim #${n} of the season at ${plage}${eau == null ? '' : `, water at ${eau}°`}. Who’s joining next time?`,
    merciBain: (n) => `Respect. Swim #${n} logged.`, copie: 'Copied. Paste it in the group chat.', copieAussi: 'Message copied.', partageImpossible: 'Sharing isn’t available here.',
    partageConditions: (v, plage, eau, air, vent) => `${v} ${plage}: water ${eau}, air ${air}°, wind ${vent} km/h.`, partageDefaut: 'Lake Geneva today at a glance.',
  },
};

function choisir() {
  const url = new URLSearchParams(globalThis.location?.search ?? '').get('lang');
  if (TEXTES[url]) { try { localStorage.setItem('langue', url); } catch {} return url; }
  try { const l = localStorage.getItem('langue'); if (TEXTES[l]) return l; } catch {}
  return /^en\b/i.test(globalThis.navigator?.language ?? '') ? 'en' : 'fr';
}
export const LANGUE = choisir();
export const T = TEXTES[LANGUE];
export const AUTRE = LANGUE === 'fr' ? 'en' : 'fr';
export { TEXTES };
