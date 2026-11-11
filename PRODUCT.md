# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Le baigneur du quotidien : un habitant ou un visiteur des lacs suisses qui, en dix secondes et le plus souvent sur son téléphone, décide s’il va se baigner, faire du paddle ou prendre un bain d’hiver, et où. Il veut l’eau, le vent, la bise et un verdict clair pour la plage où il compte aller. Audiences secondaires, non confirmées en détail : sportifs nautiques (voile, kite, wing, wakeboard), visiteurs qui cherchent une buvette, un sauna ou une location près de l’eau.

## Product Purpose
Mon Lac (My Lake, Mein See, Il mio lago) est une web app installable (PWA) gratuite, sans compte, qui affiche pour chaque plage la température de l’eau, le vent, la bise et un verdict par activité. Elle couvre 220 plages sur 25 lacs suisses, avec un blog, des pages par plage, une présentation et les adresses utiles autour de l’eau (bars et restos, saunas, loueurs et écoles). Succès : la personne ouvre l’app, comprend en un coup d’œil si c’est le bon moment, et part.

## Positioning
Trois choses qu’un concurrent ne copierait pas tel quel, confirmées :
- l’eau à 70 cm de profondeur devant chaque plage (modèle Alplakes de l’Eawag, mis à jour toutes les trois heures) plutôt qu’une valeur unique par lac ; seuls cinq lacs n’ont qu’une valeur pour tout le lac, et ceux-là le disent ;
- un verdict par activité (baignade, paddle, voile) qui tient compte de la bise, pas seulement des chiffres ;
- l’expérience entière (app, pages de plage, blog, présentation) écrite en quatre langues : français, anglais, allemand, italien.

## Operating Context
Usage mobile en extérieur, souvent en plein soleil, parfois avec peu de réseau. L’app est une page statique en modules JavaScript, sans build : les données météo viennent d’Open-Meteo (appelé depuis le navigateur), l’eau d’Alplakes via une action GitHub qui produit `eau.json`, la qualité de l’eau du Léman de SITG et de la CIPEL. Hébergement GitHub Pages sur monlac.ch (mon-lac.ch redirige). Un service worker met l’app en cache. Une tâche planifiée mensuelle vérifie les fiches de saunas.

## Capabilities and Constraints
- Données : eau 3D devant chaque plage pour le Léman, Neuchâtel, Bienne, Morat, Lugano, Joux, Zurich, Greifensee, Quatre-Cantons, Zoug, Ägeri, Hallwil ; une valeur par lac pour la Gruyère, Majeur, Bret, Thoune, Brienz, Sempach, Baldegg, Sarnen, Silvaplana, Constance, Untersee ; aucune mesure pour Les Brenets et Sion (affichés « eau non mesurée »). Qualité de l’eau : Léman uniquement.
- Aucun fait inventé : les adresses viennent d’offices du tourisme ou des sites des lieux, les affirmations de santé exigent une source officielle (Société Suisse de Sauvetage, OFSP…).
- Aucun cookie, aucun compte ; tout outil d’audience futur doit rester sans cookie et de préférence européen.
- Thème clair uniquement ; pas de mode sombre.
- Pas de promesse de sécurité : l’app est indicative, « le lac a toujours le dernier mot ».
- Terminologie : « verdict », « plage » (Badeplatz, spiaggia), « eau à 70 cm ».
- Non décidé : tracker de visites, publication Android (Play Store), affiliation avec les lieux listés (à proposer, pas encore engagée).

## Brand Commitments
Nom Mon Lac et son logo à trois vagues. Voix chaleureuse, avec un brin d’humour dans les verdicts (« Même les cygnes hésitent »), toujours factuelle : chiffres et sources sérieux, jamais alarmiste. Un pied de page commun à toutes les pages ; le sélecteur de langue (sigles FR EN DE IT, nom complet en infobulle) est en haut de toutes les pages sauf l’app.

## Evidence on Hand
- Données réelles : `eau.json`, `qualite.json`, 220 plages dans `spots.js`, 109 adresses dans `lieux.js`, 23 fiches de saunas et loueurs dans `locations.js`.
- Contenu : 30 articles de blog en quatre langues, 880 pages de plage, présentation en quatre langues.
- Photos libres de Wikimedia Commons sous licence CC (crédits dans `presentation/img/credits.json`), cartes de lacs générées depuis OpenStreetMap.
- Absences à ne pas combler : aucun témoignage, aucun chiffre d’audience, aucun partenariat signé.

## Product Principles
1. Le verdict d’abord, le détail ensuite : on répond à « j’y vais ? » avant d’exposer les chiffres.
2. Dire d’où vient chaque chiffre et ce qu’il ne dit pas ; ne jamais présenter un modèle comme une mesure.
3. Rien d’inventé ni d’alarmiste : source citée ou rien, et aucune promesse de sécurité.
4. Quatre langues d’origine, pas une traduction après coup ; un sigle de langue toujours doublé de son nom complet.
5. Gratuit, sans compte, sans cookie : la confiance fait partie du produit.

## Accessibility & Inclusion
Cibles tactiles d’au moins 44 px, focus clavier visible, prise en charge de `prefers-reduced-motion`, textes alternatifs aux images, noms accessibles complets pour les sigles de langue. Lisibilité en plein soleil : contrastes d’au moins 4,5:1 pour le texte courant.
