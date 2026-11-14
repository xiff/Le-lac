# À faire

- [ ] **Affiliation** : contacter tous les endroits proposés dans l’app (bars et restos de `lieux.js`,
  loueurs, écoles et saunas de `locations.js`) pour leur proposer un programme d’affiliation.
- [ ] **Domaine** : monlac.ch est en ligne, « Enforce HTTPS » est coché (12 novembre 2026). Reste : ajouter www.mon-lac.ch au certificat Infomaniak.
- [ ] **Icônes** : choisir les icônes définitives de la baignade et de la sortie en bateau.
- [ ] **Vérification mensuelle des lieux** : relier le dépôt à la tâche planifiée dans claude.ai.
- [ ] **Compteur de bains d'hiver remis à zéro dans l'app Android** (signalé le 13 novembre 2026) : cause probable, chaque APK de test était signé avec une clé jetable, donc il fallait désinstaller l'app (et perdre ses données) pour installer le suivant. **Corrigé le 14 novembre 2026** : `.github/workflows/apk-test.yml` signe avec une clé fixe lue dans les secrets `APK_TEST_KEYSTORE` (keystore en base64, alias `test`) et `APK_TEST_KS_PASS` ; sans ces secrets, il revient à la clé jetable avec un avertissement. Reste : ajouter les deux secrets dans GitHub, désinstaller une dernière fois l'ancienne app, puis vérifier qu'une deuxième installation garde le compteur. Le changement de téléphone efface toujours tout : synchronisation avec des comptes à prévoir (commentaire `shortcut:` dans `index.html`).
- [ ] **Coordonnées à confirmer** : Corsier-Port et Thonon – Saint-Disdille.
- [x] **Autres lacs** (12 novembre 2026) : 109 bars et restos, et 21 loueurs ajoutés (Neuchâtel 5, Bienne 4, Morat 1, Gruyère 3, Sion 2, Lugano 3, Majeur 4), chacun avec une source. Sources à fiabilité moyenne (annuaires torpille.ch, search.ch) pour Les Vikings, Alphasurf, Club Y-Plage, Domaine des Îles et Oasis : à remplacer par le site du loueur quand on le trouve.
  - [ ] Pas encore couverts : Cudrefin, Grandson (Nautic Plus : mentionné, sans page vérifiable), Brissago, Locarno côté kayak, le lac de Joux (aucun loueur cherché), RIVABIANCA à Lugano (lieu non confirmé), Kayak Lugano, Canoës Gruyère à Pont-en-Ogoz (fiche peu fiable). Horaires et prix non vérifiés : à confirmer auprès des loueurs, dans la prise de contact « affiliation ».
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

- [x] **Mettre en avant que monlac.ch respecte l’utilisateur** (12 novembre 2026) : « Sans compte, sans cookie, sans publicité » sous l’accroche de la présentation, section « Tes données restent les tiennes » (4 points : ni compte ni cookie, choix gardés sur l’appareil, position qui ne quitte pas le téléphone, Umami sans cookie hébergé en Europe) et une ligne dans le pied de page de l’app et de toutes les pages, en quatre langues. Chaque point a été vérifié dans le code (localStorage, géolocalisation calculée dans le navigateur, météo demandée avec les coordonnées de la plage).
- [ ] **Page « Confidentialité »** (quatre langues, générée comme la présentation) : à lier depuis le pied de page de l'app et de toutes les pages, et depuis l'encadré « Tes données restent les tiennes ». Contenu à établir avec des sources, sans rien affirmer d'invérifié :
  - ce qui reste dans le navigateur (`localStorage` : plage, langue, activités, favoris, historique de bains, tirage des titres) et comment l'effacer ;
  - la position : calculée dans le navigateur, jamais envoyée ;
  - les services tiers appelés depuis le navigateur du visiteur : Open-Meteo (météo), existenz.ch (secours genevois), Umami (audience), polices et images servies par GitHub Pages ; chacun reçoit au minimum l'adresse IP du visiteur, comme tout serveur web ;
  - Umami : ce que l'outil enregistre vraiment (lire sa documentation officielle avant d'écrire : adresse IP, pays, navigateur, pages vues ?), durée de conservation, région d'hébergement (Europe, confirmé), base légale ;
  - responsable du traitement et contact (contact@monlac.ch) ;
  - droits des visiteurs selon la loi suisse sur la protection des données (LPD) et le RGPD pour les visiteurs de l'UE : à faire relire par un juriste ou à reprendre d'un modèle officiel (PFPDT), pas à inventer.

## Mesure d’audience

- [x] **Tracker des visites** : Umami Cloud (sans cookie) ajouté le 11 novembre 2026 dans le `<head>` de toutes les pages
  (app, pages de plage, liste, blog, présentation). Statistiques sur cloud.umami.is.
- [x] **Umami** : hébergement des données en Europe (confirmé le 12 novembre 2026).

## App

- [x] **Activités de nuit** (12 novembre 2026) : d'après `is_day` d'Open-Meteo, propre à chaque plage. La nuit, les verdicts du windsurf, du kite, du wakeboard, du wakesurf et du ski nautique passent à « Non » (« Réservé au jour »), ceux du paddle et du foil aussi (« on ne te voit pas sur l'eau ») ; titre du verdict : « Il fait nuit ». Baignade, voile et bateau inchangés. Règle (`NUIT` dans `score.js`) : l'ordonnance fédérale sur la navigation intérieure (BSV, SR 747.201.1) réserve au jour, par clarté, le wakesurf, le ski nautique, les planches à voile, les planches à cerf-volant et les engins tractés ; rien de trouvé pour le paddle et le foil, d'où une formulation de prudence, sans citer de loi.
  - [ ] À vérifier : le texte exact de la BSV pour le wakeboard et le wing foil (non nommés dans ce que j'ai lu), et les règles cantonales plus strictes (par exemple Lucerne).
  - [x] Écran « Louer » : `#louer` dans l'adresse n'ouvre pas l'onglet. Corrigé le 13 novembre 2026 : un lien `#louer` ou `#sortir` ouvre l’onglet ; un rechargement revient sur le lac.
- [x] **Sortir et Louer selon la plage choisie** : dans les onglets « Sortir » et « Louer », afficher en premier
  les lieux et loueurs proches de la plage sélectionnée (triés par distance), au lieu d’une liste générale.

## Blog : objectif 100 articles

Plan complet (87 sujets, par groupe et priorité) : `BLOG-PLAN.md`, gardé hors du dépôt public.

- [x] **Température de l’eau par lac** (12 articles, 4 langues), publiés le 11 novembre 2026.
- [x] **Saunas et bain d’hiver, première moitié** (5 articles, 4 langues), publiés le 11 novembre 2026 : saunas du Léman, saunas flottants de Suisse,
  saunas du lac de Zurich, bain d’hiver dans les Trois-Lacs, bain d’hiver à Zurich.
- [ ] **Bain d’hiver, seconde moitié** (5) : clubs et rendez-vous, bienfaits (études à citer), respiration, programme de 4 semaines, néoprène.
  Sources médicales ou officielles obligatoires, et une photo libre par article (workflow `photos.yml`).
- [x] **« Où se baigner » par lac** (24 articles × 4 langues, 12 novembre 2026) : générés par `scripts/articles.baignade.mjs` depuis les données de l'app (plages avec la température du matin, bars et restos, loueurs, saunas) et des chiffres de Wikipédia (surface, profondeur, altitude ; un chiffre contesté entre sources n'est pas écrit : surface de Joux et de Bret, profondeur de Bret et des Brenets, altitude de Zoug). Carte propre à chaque article (`plages-<lac>.jpg`). Les lacs à une seule plage (Bret, Brenets, Ägeri, Silvaplana, Sion) donnent des pages courtes : à étoffer avec des sources (office du tourisme, commune) avant de les promouvoir.
  - [ ] Photos Wikimedia Commons pour ces 24 articles (aujourd'hui une carte en tête, la photo du lac est déjà dans l'article « température » pour 12 lacs).
  - [ ] **Faits locaux sourcés par lac** — commencé le 13 novembre 2026 : section « Entrée, saison et accès » ajoutée aux articles de Morat (Strandbad Murten : 9 mai–20 septembre, 8 francs, 7 min de la gare), Bienne (Strandbad Biel : 9 mai–13 septembre, 5 francs), Neuchâtel (plages gratuites, Jeunes-Rives) et Zurich (Utoquai 8 francs, 11 avril–25 octobre ; Kilchberg, Zollikon, Oberrieden, Richterswil). Prix et dates sont ceux de la saison 2026, relevés sur badi-info.ch, BLS, freizeit.ch et des annuaires : à remettre à jour chaque printemps (la routine hebdomadaire s'en charge). Lucerne, Thoune, Lugano et Majeur ajoutés le 13 novembre 2026 (Lugano : tarifs de la Ville sans année précisée ; Locarno : lido seulement, pas Ascona ni Tenero ; Lucerne : pas l'Ufschötti ; Thoune : pas Spiez ni Oberhofen). Zoug, Constance (Arbon, Romanshorn ; pas Kreuzlingen ni Rorschach), Untersee (Ermatingen seulement) et Hallwil ajoutés le 13 novembre 2026. Sempach (Nottwil, accès libres de Schenkon et Sempach), Baldegg (Baldegg, Gelfingen), Sarnen (Seefeld Park ; pas Wilen) et Greifensee (Furren, Uster, Maur) ajoutés le 13 novembre 2026 ; Maur : exploitation et surveillance incertaines depuis l'été 2026, à revérifier au printemps. Brienz, Ägeri, Gruyère, Joux, Bret, Sion et Silvaplana ajoutés le même jour : pour Gruyère, Joux et Sion les sources sont des annuaires (Torpille, Kidora, Discovr, Alpvision) et l'article le dit ; Bret : projet de classement 2025 interdisant la baignade dans le nord du lac, entrée en vigueur à confirmer ; Silvaplana : aucun droit d'entrée trouvé. **Reste 1 lac : Les Brenets** (aucune source officielle trouvée sur les zones de baignade ; à demander à la commune ou à l'office du tourisme de Neuchâtel). Neuchâtel repose sur des annuaires (Torpille, Kidora) : à confirmer auprès de la Ville.
  - [ ] **Serveur d'images mcp-image** : `.mcp.json` et domaine Gemini autorisés ; facturation active ; 40 images générées et 32 intégrées aux articles le 13 novembre 2026 ; 7 attendent leur page (nuit, données, futurs articles bain froid) (voir « IMAGES-IA.md »).
- [ ] **Comprendre le lac** (10) : vents, foehn, chute brutale de température, seiches, brassage, niveau, lacs les plus chauds et les plus froids.
- [ ] **Guides locaux du Léman** (12) : Lausanne, Riviera, La Côte, Lavaux, plages gratuites, familles, chiens, train, sable, plongeoirs, coucher de soleil, Rhône.
- [ ] **Sécurité et santé** (10) : puces de canard, cyanobactéries, orages, feux de tempête, courants, eau libre, règles SSS, hypothermie. Sources officielles obligatoires.
- [ ] **Activités** (9) : paddle par lac, bateau sans permis, kite à Silvaplana, wingfoil, kayak, traversées à la nage.
- [ ] **SEO** : monlac.ch est déclaré dans Google Search Console et le sitemap est soumis (12 novembre 2026) ; suivre l'indexation et les requêtes dans quelques jours. la température du matin est écrite dans le HTML des pages de plage depuis le 12 novembre 2026 (voir ci-dessous). Reste :
  demander un lien aux lieux listés (avec la prise de contact affiliation), aux offices du tourisme et aux clubs ; écrire d’abord en allemand pour les lacs alémaniques.

## Fait le 12 novembre 2026 : loueurs dans le blog et température dans le HTML

- [x] **Loueurs et saunas dans les articles « température par lac »** (neuchâtel, bienne, morat, gruyère, zurich, lucerne, lugano, majeur, constance) : sections « Louer sur l'eau » et « Saunas », générées depuis `locations.js`, dans les quatre langues. Aucun loueur pour Joux, Thoune et Brienz (non cherchés) : pas de section.
- [x] **Température du matin dans le HTML des pages de plage (SEO)** : une phrase datée (« Le 12 novembre 2026, au matin : 12,1 °C à 70 cm… d'après le modèle Alplakes ») dans la section « D'où viennent ces chiffres » et à la fin de la meta description, en quatre langues. La valeur vient de `eau-jour.json`, figé une fois par jour par `scripts/eau-jour.mjs` (workflow `eau.yml`), pour que les 880 pages ne changent qu'une fois par jour et non toutes les 3 heures. Rien d'écrit pour les plages sans modèle d'eau ni si la valeur a plus de 6 h d'écart. À surveiller : le premier passage de l'action après 6 h UTC doit bien créer `eau-jour.json`.
- [x] Température du matin étendue à la liste des plages (la plus froide et la plus chaude du jour) et aux 12 articles « température par lac » (une valeur ou un intervalle), via `scripts/matin.mjs` ; l'action `eau.yml` régénère maintenant aussi le blog chaque jour (`node scripts/blog.mjs`, dossier `blog` ajouté au commit).
- [x] Phrase du bandeau « En ce moment » (liste des plages et articles du Léman) : reformulée en français et en italien avec parenthèses (« de 6,6° (Silvaplana) à 15,6° (Tenero) »), anglais et allemand déjà clairs.

- [x] **Avis sur la page de la plage de Bret** (13 novembre 2026) : encadré « À vérifier avant de vous baigner » (réserve d'eau potable, projet de classement 2025 de l'État de Vaud) dans les quatre langues, mécanisme `AVIS` de `scripts/pages.mjs` réutilisable pour d'autres plages. Également affiché dans l’app (bandeau sous l’alerte, lien vers le rapport).
- [x] Textes des faits locaux : première personne (« je ») remplacée par « nous » dans les quatre langues.
