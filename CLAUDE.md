# Consignes pour Claude Code

## Images IA (génération payante : ne jamais gaspiller)

Toute image du blog ou du site suit le style de `IMAGES-IA.md`, sans exception :
illustration éditoriale à la gouache, à plat, sur papier crème (#f5efe3), palette bleu-vert #0d4a5c / #0f6b80, une seule touche de jaune #f2b84b, encre #10292f.
**Jamais une photo, jamais « photorealistic ».** Pas de texte, pas de visages.

À chaque appel de génération :
1. Passer l'image de référence `blog/img/ia/bise.jpg` (chemin absolu) dans `inputImagePaths`.
2. Terminer le prompt par : `STYLE : flat editorial gouache illustration on cream paper, NOT a photo, not photorealistic. Same style as the reference image, change only the scene. No text, no letters, no logos, no faces.`
3. Avant toute série : générer **une seule** image, la regarder (Read), et ne continuer que si elle est dans le style. Relire chaque lot sur une planche avant de fusionner.
4. Ne jamais régénérer des images déjà faites sans accord explicite de l'éditeur.
