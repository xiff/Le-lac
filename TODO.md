# À faire

- [ ] **Affiliation** : contacter tous les endroits proposés dans l’app (bars et restos de `lieux.js`,
  loueurs, écoles et saunas de `locations.js`) pour leur proposer un programme d’affiliation.
- [ ] **Domaine monlac.ch** : une fois acheté, ajouter le fichier `CNAME` et mettre à jour les adresses du site.
- [ ] **Icônes** : choisir les icônes définitives de la baignade et de la sortie en bateau.
- [ ] **Vérification mensuelle des lieux** : relier le dépôt à la tâche planifiée dans claude.ai.
- [ ] **Coordonnées à confirmer** : Corsier-Port et Thonon – Saint-Disdille.
- [ ] **Autres lacs** : ajouter bars, restos et loueurs autour des lacs de Neuchâtel, Bienne, Morat, la Gruyère et Sion.

## Nouveaux lacs (Suisse), par priorité

Modèle de l’eau disponible chez Alplakes (Eawag) : 3D = une valeur devant chaque plage, 1D = une valeur pour tout le lac.
À chaque ajout : plages vérifiées avec OpenStreetMap (`scripts/decouvrir.mjs`), contour (`scripts/contours.mjs`), lieux et loueurs de sources fiables.

1. [ ] **Tessin, en premier**
   - [ ] **Lac de Lugano (Ceresio)** : 3D (`delft3d-flow/lugano`), 1D aussi (`lowerlugano`). Lido de Lugano, Paradiso, Caslano, Melide, Morcote…
   - [ ] **Lac Majeur (Verbano), rive suisse** : 1D (`simstrat/maggiore`). Lido de Locarno, Ascona, Tenero, Magadino, Brissago…
   - [ ] Petits lacs tessinois (Origlio, Muzzano) : pas de modèle Alplakes connu, afficher « eau non mesurée » comme à Sion.
2. [ ] **Suisse romande**
   - [ ] **Lac de Joux** : 3D (`delft3d-flow/joux`), 1D aussi. Plages du Pont, de L’Abbaye, du Rocheray (Le Sentier)…
   - [ ] Lac de Bret (1D `bret`), lac des Brenets (1D `brenet`).
3. [ ] **Suisse centrale et alémanique** : lac de Zurich (3D), lac de Zoug (3D `mitgcm/zug`), lac des Quatre-Cantons (3D `mitgcm/lucerne`), lac d’Ägeri (3D), lac de Hallwil (3D), Greifensee (3D), lac de Thoune et lac de Brienz (1D), lac de Sempach, lac de Baldegg, lac de Sarnen (1D).
4. [ ] **Grisons** : lacs de Saint-Moritz (3D `stmoritz`), Silvaplana et Sils (1D).
5. [ ] **Lac de Constance, rive suisse** : 1D (`lowerconstance`).

## Langues

- [ ] **Allemand** : traduire l’app (`textes.js`), les pages de plage (`scripts/pages.mjs`), la liste, la présentation et le blog ; ajouter `de` aux liens `hreflang` et au sélecteur de langue.
- [ ] **Italien** : même chose, utile dès l’ajout des lacs tessinois.

## Mesure d’audience

- [ ] **Tracker des visites** : de préférence un outil européen, sans cookie et respectueux de la vie privée,
  pour garder la promesse « aucun cookie, aucun compte » de la présentation (pas de bannière de consentement à ajouter).
  Pistes : Plausible (UE), Matomo Cloud ou auto-hébergé, Simple Analytics (UE), Pirsch (Allemagne).
  Google Analytics est possible mais pose des cookies et demande une bannière de consentement (LPD suisse, RGPD pour les visiteurs de l’UE).

## App

- [ ] **Sortir et Louer selon la plage choisie** : dans les onglets « Sortir » et « Louer », afficher en premier
  les lieux et loueurs proches de la plage sélectionnée (triés par distance), au lieu d’une liste générale.
