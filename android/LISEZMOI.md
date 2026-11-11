# Version Play Store (Trusted Web Activity)

L'app Android est une coquille qui ouvre le site plein écran, sans barre d'adresse.
Rien n'est publié : ces fichiers servent à la générer le moment venu.

## Étapes

1. Installer Bubblewrap (Node 18+ et JDK 17) : `npm i -g @bubblewrap/cli`
2. Dans ce dossier : `bubblewrap init --manifest=https://monlac.ch/manifest.webmanifest`
   (ou `bubblewrap update` pour reprendre `twa-manifest.json`). Il crée la clé de signature
   `android.keystore` : **la garder précieusement et ne jamais la commiter**, sans elle plus de mise à jour possible.
3. `bubblewrap build` produit `app-release-bundle.aab` à envoyer sur la Google Play Console (compte à 25 $, une fois).
4. `bubblewrap fingerprint list` donne l'empreinte SHA-256 : la coller dans `assetlinks.json`.
   Si Google Play signe l'app (cas par défaut), prendre plutôt l'empreinte affichée dans la Play Console,
   rubrique Intégrité de l'application.

## Le piège de GitHub Pages

`assetlinks.json` doit être servi à la racine du domaine : `https://monlac.ch/.well-known/assetlinks.json`.
Le site étant sur son propre domaine, il suffit de le copier dans `.well-known/assetlinks.json` à la racine de ce dépôt
(avec un fichier `.nojekyll` vide à la racine, sinon GitHub Pages ignore le dossier caché), une fois l'empreinte remplie.