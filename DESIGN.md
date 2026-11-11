---
name: Mon Lac
description: Eau, vent et verdict plage par plage sur les lacs suisses, dans un carnet de bord chaleureux.
colors:
  lac-profond: "#0d4a5c"
  lac-vif: "#0f6b80"
  papier: "#f5efe3"
  carte: "#fffdf8"
  encre: "#10292f"
  doux: "#4d666c"
  creme: "#fbf4e4"
  soleil: "#f2b84b"
  trait: "#10292f1a"
  verdict-0-fond: "#f6dcd4"
  verdict-0: "#8a2a1a"
  verdict-1-fond: "#f5e6c2"
  verdict-1: "#6b4800"
  verdict-2-fond: "#d8eedf"
  verdict-2: "#1b5f3c"
  verdict-3-fond: "#cde8ee"
  verdict-3: "#0a4d5c"
typography:
  display:
    fontFamily: "Young Serif, Georgia, serif"
    fontSize: "clamp(30px, 6vw, 44px)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Young Serif, Georgia, serif"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: 1.2
  mesure:
    fontFamily: "Young Serif, Georgia, serif"
    fontSize: "34px"
    fontWeight: 400
    lineHeight: 1
    fontFeature: "tabular-nums"
  body:
    fontFamily: "Onest, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Onest, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    letterSpacing: "0.06em"
rounded:
  tuile: "14px"
  carte: "18px"
  bloc: "20px"
  pilule: "99px"
  rond: "50%"
spacing:
  xs: "6px"
  sm: "12px"
  md: "20px"
  lg: "36px"
components:
  bouton:
    backgroundColor: "{colors.soleil}"
    textColor: "{colors.encre}"
    typography: "{typography.label}"
    rounded: "{rounded.pilule}"
    padding: "0 20px"
    height: "48px"
  bouton-secondaire:
    backgroundColor: "{colors.lac-profond}"
    textColor: "{colors.creme}"
    rounded: "{rounded.pilule}"
    padding: "0 16px"
    height: "44px"
  carte:
    backgroundColor: "{colors.carte}"
    textColor: "{colors.encre}"
    rounded: "{rounded.carte}"
    padding: "18px 20px"
  badge-verdict:
    backgroundColor: "{colors.verdict-3-fond}"
    textColor: "{colors.verdict-3}"
    rounded: "{rounded.pilule}"
    padding: "5px 11px"
  langue:
    textColor: "{colors.creme}"
    typography: "{typography.label}"
    rounded: "10px"
    size: "44px"
---

# Design System: Mon Lac

## Overview

**Creative North Star: "Le carnet du baigneur"**

Mon Lac se lit comme un carnet de bord posé au bord de l’eau : un papier chaud (#f5efe3), une encre bleu-vert très sombre, un lac profond pour les en-têtes et une seule pointe de soleil pour ce qui invite à agir. L’interface répond d’abord à « j’y vais ? » par un verdict lisible d’un coup d’œil, puis expose les chiffres, avec la source et la limite du chiffre.

La voix visuelle est chaleureuse, sans jargon météo : pas de ciel dégradé, pas de pictos soleil-nuage génériques, pas de néons sportifs. Les surfaces sont presque plates et tonales, les angles généreux, les titres en serif (Young Serif) pour donner du caractère et le corps en Onest pour la lisibilité en plein soleil. Le thème est clair uniquement, il n’existe pas de mode sombre. Jamais d’alarmisme : même un verdict défavorable reste posé, dans une teinte terre cuite, pas dans un rouge criard.

**Key Characteristics:**
- Papier crème et encre profonde, un lac bleu-vert pour l’en-tête, un soleil pour l’action.
- Verdict en pastille tonale (quatre niveaux), jamais en couleur saturée.
- Surfaces plates, coins de 14 à 20 px, boutons en pilule de 44 px minimum.
- Serif expressif pour les titres et les chiffres, sans-serif neutre pour le texte.
- Une colonne de lecture étroite (520 px dans l’app, 680 px sur les pages et grands écrans).

## Colors

Une palette de lac et de papier : un bleu-vert profond et un soleil unique, soutenus par quatre teintes tonales de verdict.

### Primary
- **Lac profond** (#0d4a5c) : fond des en-têtes, boutons secondaires, texte sur surface tonale bleue. Il porte l’identité.
- **Lac vif** (#0f6b80) : liens de contenu, accents de lecture, chiffres secondaires.
- **Soleil** (#f2b84b) : action principale (bouton, favori actif), anneau de focus, surlignage de sélection. Rare à l’écran : c’est lui qui dit « vas-y ».

### Neutral
- **Papier chaud** (#f5efe3) : fond de page.
- **Carte** (#fffdf8) : surface des cartes et des blocs de contenu.
- **Encre lac** (#10292f) : texte courant et titres.
- **Brume de lac** (#4d666c) : texte secondaire, légendes (contraste au-dessus de 4,5:1 sur le papier).
- **Crème** (#fbf4e4) : texte sur lac profond ; ses variantes à transparence servent au texte secondaire d’en-tête.
- **Trait** (#10292f1a) : séparateurs d’un pixel.

### Verdict (tonal, quatre niveaux)
- **Terre cuite** (fond #f6dcd4, texte #8a2a1a) : déconseillé.
- **Sable doré** (fond #f5e6c2, texte #6b4800) : prudence.
- **Roseau** (fond #d8eedf, texte #1b5f3c) : bon.
- **Eau claire** (fond #cde8ee, texte #0a4d5c) : excellent et neutre informatif (bienvenue, onglet actif).

### Named Rules
**La règle du Soleil unique.** Le jaune soleil ne marque que l’action principale, le focus et la sélection. S’il est partout, il ne dit plus rien.
**La règle du verdict posé.** Un mauvais verdict se dit en terre cuite sur fond pâle, jamais en rouge saturé : on informe, on n’alarme pas.

## Typography

**Display Font:** Young Serif (avec Georgia, serif)
**Body Font:** Onest (avec system-ui, sans-serif)

**Character:** un serif rond et chaleureux pour les titres et les mesures, un sans-serif géométrique et très lisible pour tout le reste ; l’un donne la personnalité, l’autre tient en plein soleil.

### Hierarchy
- **Display** (400, clamp(30px, 6vw, 44px), 1.08, -0.02em) : titre de page, avec `text-wrap: balance`.
- **Headline** (400, 24px, 1.2) : titres de section ; 20 px dans les blocs « En bref ».
- **Mesure** (400, 34px, 1, chiffres tabulaires) : température de l’eau, vent, valeurs-clés.
- **Body** (400, 17px, 1.55) : texte courant, limité à 64 ch dans les articles.
- **Label** (600, 13px, 0.06em) : sigles de langue, étiquettes, légendes et boutons.

### Named Rules
**La règle du chiffre aligné.** Tout nombre qui change (températures, heures, classements) utilise les chiffres tabulaires, pour que les colonnes ne dansent pas.

## Layout

Une colonne de lecture centrée : 520 px dans l’app (680 px à partir de 1100 px de large), 680 px sur les pages de plage et les articles, 1080 px pour les listes et la grille du blog. L’en-tête bleu suit la même largeur que le contenu, et ses bords ondulent vers le papier. Les espacements vont de 6 à 36 px, avec peu d’air entre éléments liés et plus entre groupes. Mobile d’abord : barre d’onglets fixe en bas dans l’app (Plage, Sortir, Louer), sélecteur de langue en haut des autres pages, marges de 20 px, respect de `safe-area-inset`. Les points de rupture usuels sont 700, 760 et 1100 px.

## Elevation & Depth

Le système est plat et tonal : la profondeur vient du papier crème sous des cartes plus claires, pas d’ombres marquées. Une ombre diffuse d’un pixel sert à détacher les cartes ; la barre d’onglets reçoit une ombre vers le haut.

### Shadow Vocabulary
- **Carte** (`box-shadow: 0 1px 3px #10292f14`) : cartes, blocs « En bref », tuiles horaires.
- **Barre du bas** (`box-shadow: 0 -6px 20px #10292f12`) : barre d’onglets fixe.
- **Contour doux** (`box-shadow: inset 0 0 0 1.5px currentColor`) : boutons secondaires sans remplissage.

### Named Rules
**La règle du plat au repos.** Aucune ombre portée marquée, aucun halo coloré : l’état se dit par la teinte et la forme, pas par l’élévation.

## Shapes

Des formes douces et généreuses : pilules (99 px) pour tout ce qui se touche (boutons, favoris, badges), 14 px pour les tuiles et les onglets, 16 à 20 px pour cartes et blocs, cercle pour les boutons ronds et les points de carte. Pas de bordure épaisse ; séparateurs d’un pixel en teinte d’encre à 10 %. Les cartes de lacs sont des silhouettes OpenStreetMap remplies d’un bleu pâle, avec les plages en points.

## Components

### Boutons
- **Shape:** pilule (99 px), hauteur de 48 px sur les pages, 44 px dans l’app.
- **Primary:** fond soleil, texte encre, graisse 700, sans soulignement.
- **Secondary:** fond lac profond, texte crème ; ou contour doux de 1,5 px, sans remplissage, sur fond bleu.
- **Hover / Focus / Press:** à l’appui, réduction à 97 % (160 ms, ease-out exponentiel) ; anneau de focus de 2 px en soleil, décalé de 3 px.

### Cartes
- **Corner Style:** 18 à 20 px.
- **Background:** carte (#fffdf8) sur papier.
- **Shadow Strategy:** ombre diffuse d’un pixel, voir Elevation & Depth.
- **Internal Padding:** 16 à 20 px.

### Badges de verdict
- **Style:** pilule tonale (fond pâle, texte foncé de la même teinte), 0,8 rem, graisse 700.
- **State:** quatre niveaux, de terre cuite à eau claire.

### Navigation
- **App:** barre fixe de trois onglets (Plage, Sortir, Louer) ; l’onglet actif glisse sous une pastille tonale bleu pâle sur 250 ms.
- **Pages:** fil d’Ariane en crème atténué dans l’en-tête ; sélecteur de langue en haut à droite.

### Sélecteur de langue (composant signature)
Des sigles (FR, EN, DE, IT) en 13 px, graisse 600, espacés de 0,06 em, sans la langue courante. Chaque sigle est une cible de 44 px, avec le nom complet en `title` et en `aria-label`. Le texte s’aligne sur la colonne et la cible déborde. Il est en haut de toutes les pages sauf l’app.

### Tuiles horaires et favoris
Tuiles de 62 px minimum, coins 14 px, défilantes avec accroche ; favoris en pilules crème translucide qui deviennent soleil quand ils sont actifs.

## Do's and Don'ts

### Do:
- **Do** garder papier #f5efe3 en fond et carte #fffdf8 pour les surfaces, avec le texte en encre #10292f.
- **Do** réserver le soleil #f2b84b à l’action principale, au focus et à la sélection.
- **Do** donner à toute cible tactile au moins 44 px, et un nom complet accessible aux sigles.
- **Do** mettre les nombres qui varient en chiffres tabulaires.
- **Do** dire un verdict défavorable en terre cuite pâle (#f6dcd4 / #8a2a1a), pas en rouge saturé.
- **Do** respecter `prefers-reduced-motion` : désactiver les transitions non essentielles.

### Don't:
- **Don't** ajouter de mode sombre : le thème est clair uniquement.
- **Don't** utiliser de look météo générique : ciels dégradés, pictos soleil-nuage standards, néons sportifs.
- **Don't** alarmer : pas de rouge criard, pas de promesse de sécurité (« le lac a toujours le dernier mot »).
- **Don't** empiler les ombres ni inventer d’élévation : le système est plat et tonal.
- **Don't** imbriquer des cartes dans des cartes, ni répéter des grilles de cartes identiques comme structure de page.
- **Don't** présenter un chiffre modélisé comme une mesure : citer la source et ce que le chiffre ne dit pas.
