# À faire

- [ ] **Affiliation** : contacter tous les endroits proposés dans l’app (bars et restos de `lieux.js`,
  loueurs, écoles et saunas de `locations.js`) pour leur proposer un programme d’affiliation.
- [ ] **Domaine** : monlac.ch est en ligne, « Enforce HTTPS » est coché (12 novembre 2026). Reste : ajouter www.mon-lac.ch au certificat Infomaniak.
- [ ] **Icônes** : choisir les icônes définitives de la baignade et de la sortie en bateau.
- [ ] **Vérification mensuelle des lieux** : relier le dépôt à la tâche planifiée dans claude.ai.
- [ ] **Coordonnées à confirmer** : Corsier-Port et Thonon – Saint-Disdille.
- [ ] **Autres lacs** : bars et restos ajoutés (109 adresses au total sur 25 lacs) ; reste les loueurs autour des lacs de Neuchâtel, Bienne, Morat, la Gruyère, Sion, Lugano et Majeur.
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

## Respect de l’utilisateur

- [ ] **Mettre en avant que monlac.ch respecte l’utilisateur** : aucun cookie, aucun compte, pas de publicité, mesure d’audience Umami hébergée en Europe, sans cookie ni suivi individuel. À dire clairement et sans jargon : une ligne sous le titre de la page « À propos », un encadré « Vos données » (quoi, pourquoi, où) dans la présentation et l'app, dans les quatre langues, et un mot dans le pied de page. Ne rien affirmer que les faits ne soutiennent pas (par exemple ne pas écrire « aucune donnée collectée » : Umami compte les visites).

## Mesure d’audience

- [x] **Tracker des visites** : Umami Cloud (sans cookie) ajouté le 11 novembre 2026 dans le `<head>` de toutes les pages
  (app, pages de plage, liste, blog, présentation). Statistiques sur cloud.umami.is.
- [x] **Umami** : hébergement des données en Europe (confirmé le 12 novembre 2026).

## App

- [x] **Activités de nuit** (12 novembre 2026) : d'après `is_day` d'Open-Meteo, propre à chaque plage. La nuit, les verdicts du windsurf, du kite, du wakeboard, du wakesurf et du ski nautique passent à « Non » (« Réservé au jour »), ceux du paddle et du foil aussi (« on ne te voit pas sur l'eau ») ; titre du verdict : « Il fait nuit ». Baignade, voile et bateau inchangés. Règle (`NUIT` dans `score.js`) : l'ordonnance fédérale sur la navigation intérieure (BSV, SR 747.201.1) réserve au jour, par clarté, le wakesurf, le ski nautique, les planches à voile, les planches à cerf-volant et les engins tractés ; rien de trouvé pour le paddle et le foil, d'où une formulation de prudence, sans citer de loi.
  - [ ] À vérifier : le texte exact de la BSV pour le wakeboard et le wing foil (non nommés dans ce que j'ai lu), et les règles cantonales plus strictes (par exemple Lucerne).
  - [ ] Écran « Louer » : `#louer` dans l'adresse n'ouvre pas l'onglet.
- [x] **Sortir et Louer selon la plage choisie** : dans les onglets « Sortir » et « Louer », afficher en premier
  les lieux et loueurs proches de la plage sélectionnée (triés par distance), au lieu d’une liste générale.

## Blog : objectif 100 articles

Plan complet (87 sujets, par groupe et priorité) : `BLOG-PLAN.md`, gardé hors du dépôt public.

- [x] **Température de l’eau par lac** (12 articles, 4 langues), publiés le 11 novembre 2026.
- [x] **Saunas et bain d’hiver, première moitié** (5 articles, 4 langues), publiés le 11 novembre 2026 : saunas du Léman, saunas flottants de Suisse,
  saunas du lac de Zurich, bain d’hiver dans les Trois-Lacs, bain d’hiver à Zurich.
- [ ] **Bain d’hiver, seconde moitié** (5) : clubs et rendez-vous, bienfaits (études à citer), respiration, programme de 4 semaines, néoprène.
  Sources médicales ou officielles obligatoires, et une photo libre par article (workflow `photos.yml`).
- [ ] **« Où se baigner » par lac** (24), à mettre en ligne avant mars.
- [ ] **Comprendre le lac** (10) : vents, foehn, chute brutale de température, seiches, brassage, niveau, lacs les plus chauds et les plus froids.
- [ ] **Guides locaux du Léman** (12) : Lausanne, Riviera, La Côte, Lavaux, plages gratuites, familles, chiens, train, sable, plongeoirs, coucher de soleil, Rhône.
- [ ] **Sécurité et santé** (10) : puces de canard, cyanobactéries, orages, feux de tempête, courants, eau libre, règles SSS, hypothermie. Sources officielles obligatoires.
- [ ] **Activités** (9) : paddle par lac, bateau sans permis, kite à Silvaplana, wingfoil, kayak, traversées à la nage.
- [ ] **SEO** : monlac.ch est déclaré dans Google Search Console et le sitemap est soumis (12 novembre 2026) ; suivre l'indexation et les requêtes dans quelques jours. Reste : inscrire la température du jour dans le HTML des pages de plage ;
  demander un lien aux lieux listés (avec la prise de contact affiliation), aux offices du tourisme et aux clubs ; écrire d’abord en allemand pour les lacs alémaniques.
