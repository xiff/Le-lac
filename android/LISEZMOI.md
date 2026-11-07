# Version Play Store (Trusted Web Activity)

L'app Android est une coquille qui ouvre le site plein écran, sans barre d'adresse.
Rien n'est publié : ces fichiers servent à la générer le moment venu.

## Étapes

1. Installer Bubblewrap (Node 18+ et JDK 17) : `npm i -g @bubblewrap/cli`
2. Dans ce dossier : `bubblewrap init --manifest=https://xiff.github.io/Le-lac/manifest.webmanifest`
   (ou `bubblewrap update` pour reprendre `twa-manifest.json`). Il crée la clé de signature
   `android.keystore` : **la garder précieusement et ne jamais la commiter**, sans elle plus de mise à jour possible.
3. `bubblewrap build` produit `app-release-bundle.aab` à envoyer sur la Google Play Console (compte à 25 $, une fois).
4. `bubblewrap fingerprint list` donne l'empreinte SHA-256 : la coller dans `assetlinks.json`.
   Si Google Play signe l'app (cas par défaut), prendre plutôt l'empreinte affichée dans la Play Console,
   rubrique Intégrité de l'application.

## Le piège de GitHub Pages

`assetlinks.json` doit être servi à la racine du domaine : `https://xiff.github.io/.well-known/assetlinks.json`.
Le dépôt `Le-lac` ne sert que `/Le-lac/…`, donc il faut **un dépôt `xiff/xiff.github.io`** contenant
`.well-known/assetlinks.json` (avec un fichier `.nojekyll` vide à la racine, sinon le dossier caché est ignoré).
Sans ça, l'app s'ouvre quand même mais avec une barre d'adresse en haut.
Plus simple à terme : un nom de domaine à toi (ex. lelac.ch) pointé sur GitHub Pages.
