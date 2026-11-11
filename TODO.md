# À faire

- [ ] **Affiliation** : contacter tous les endroits proposés dans l’app (bars et restos de `lieux.js`,
  loueurs, écoles et saunas de `locations.js`) pour leur proposer un programme d’affiliation.
- [ ] **Domaine** : monlac.ch est en ligne. Reste : cocher « Enforce HTTPS » dans GitHub Pages, et ajouter www.mon-lac.ch au certificat Infomaniak.
- [ ] **Icônes** : choisir les icônes définitives de la baignade et de la sortie en bateau.
- [ ] **Vérification mensuelle des lieux** : relier le dépôt à la tâche planifiée dans claude.ai.
- [ ] **Coordonnées à confirmer** : Corsier-Port et Thonon – Saint-Disdille.
- [ ] **Autres lacs** : bars et restos ajoutés (58 adresses, sauf Ägeri, Sarnen, Les Brenets) ; reste les loueurs autour des lacs de Neuchâtel, Bienne, Morat, la Gruyère, Sion, Lugano et Majeur.
- [ ] **Android / Play Store** : régénérer l’APK pour monlac.ch, publier `.well-known/assetlinks.json` avec l’empreinte de la clé.

## Nouveaux lacs (Suisse), par priorité

Modèle de l’eau disponible chez Alplakes (Eawag) : 3D = une valeur devant chaque plage, 1D = une valeur pour tout le lac.
À chaque ajout : plages vérifiées avec OpenStreetMap (`scripts/decouvrir.mjs`), contour (`scripts/contours.mjs`), lieux et loueurs de sources fiables.

1. [x] **Tessin** : lac de Lugano (14 lidos, 3D) et lac Majeur (7 lidos, 1D), ajoutés le 11 novembre 2026.
   Origlio : baignade interdite (ticino.ch). Muzzano : aucun lido trouvé, à confirmer.
2. [ ] **Suisse romande**
   - [x] **Lac de Joux** : 3D (`delft3d-flow/joux`), 1D aussi. Plages du Pont, de L’Abbaye, du Rocheray (Le Sentier)…
   - [x] Lac de Joux (Le Rocheray, Le Pont), lac de Bret, lac des Brenets (sans modèle d’eau : le modèle `brenet` d’Alplakes est le lac Brenet, vallée de Joux).
3. [x] **Suisse centrale et alémanique** : lac de Zurich (3D), lac de Zoug (3D `mitgcm/zug`), lac des Quatre-Cantons (3D `mitgcm/lucerne`), lac d’Ägeri (3D), lac de Hallwil (3D), Greifensee (3D), lac de Thoune et lac de Brienz (1D), lac de Sempach, lac de Baldegg, lac de Sarnen (1D).
4. [x] **Grisons** (Silvaplana ajouté ; aucun lido trouvé dans OpenStreetMap à Saint-Moritz et Sils) : lacs de Saint-Moritz (3D `stmoritz`), Silvaplana et Sils (1D).
5. [x] **Lac de Constance, rive suisse** : 1D (`lowerconstance`).

## Langues

- [x] **Allemand et italien** : app, pages de plage, liste, présentation et blog (13 articles) traduits le 11 novembre 2026.
- [ ] **Relecture par des locuteurs natifs** : les traductions allemandes et italiennes (surtout les articles de santé sur le bain d’hiver) n’ont pas été relues par une personne dont c’est la langue.
- [ ] **Titres et formulations propres à chaque langue** : adapter, si besoin, les jeux de mots des verdicts (« Même les cygnes hésitent », etc.).

## Mesure d’audience

- [ ] **Tracker des visites** : de préférence un outil européen, sans cookie et respectueux de la vie privée,
  pour garder la promesse « aucun cookie, aucun compte » de la présentation (pas de bannière de consentement à ajouter).
  Pistes : Plausible (UE), Matomo Cloud ou auto-hébergé, Simple Analytics (UE), Pirsch (Allemagne).
  Google Analytics est possible mais pose des cookies et demande une bannière de consentement (LPD suisse, RGPD pour les visiteurs de l’UE).

## App

- [x] **Sortir et Louer selon la plage choisie** : dans les onglets « Sortir » et « Louer », afficher en premier
  les lieux et loueurs proches de la plage sélectionnée (triés par distance), au lieu d’une liste générale.
