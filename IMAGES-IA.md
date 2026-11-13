# Images générées par IA : prompts à copier

Le Gem **@generateur-image-le-lac** contient déjà le style, la palette et les règles (voir `DESIGN.md`).
Chaque bloc ci-dessous se colle tel quel dans Gemini.

## Mode d'emploi

**À changer une fois dans le Gem** : remplace la règle « Pas de monument identifiable ni de lieu réel dessiné avec précision… » par :
« Quand le prompt indique un LIEU RÉEL, dessine-le de façon reconnaissable (relief, rives, bâtiments, point de vue), toujours dans le style illustration, jamais comme une photo. »
Sans ce changement, le Gem reçoit deux consignes contraires et invente des décors.

1. Colle un bloc, génère **une image à la fois**, en 1K pour essayer, en 2K quand elle te plaît.
2. Si le style dérive, écris : « Même style que l'image de référence, change seulement la scène. »
3. Vérifie : aucun texte parasite, aucun visage, palette crème, bleu-vert et jaune, et que le lieu ressemble au vrai (compare avec une photo).
4. **Nom du fichier** : Gemini ne peut pas nommer le fichier téléchargé (il s'appelle `Gemini_Generated_Image_….png`).
   Renomme-le avec le nom en titre du bloc, en JPEG, dans `blog/img/ia/`, et envoie-le-moi avec le texte alternatif donné par le Gem.

**Mention obligatoire** sous chaque image : « Illustration générée par IA ». Gemini y ajoute un filigrane invisible (SynthID) : ne le retirez pas et ne présentez jamais ces images comme des photos.
Ne remplacez pas les photos Wikimedia des 12 articles « température » : elles montrent de vrais lieux.

## Thèmes du site

### `og-image.jpg` · site (recadrer ensuite en 1200×630)

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : Léman, rive suisse près de Lausanne.
SCÈNE : seen from the end of a wooden jetty at sunrise: in the foreground the jetty planks and a ladder; in the middle the wide calm lake with gentle ripples; in the background the French Chablais mountains across the water, low sun just above them. Keep the left third of the image as calm empty water and sky.
FORMAT : 16:9.
```

### `saunas-bord-du-leman.jpg` · article saunas du Léman

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : Bains des Rives, plage de Bellerive à Lausanne.
SCÈNE : on the pebble beach of Bellerive at dusk in winter: two round felt yurts and a wooden barrel sauna with smoking chimneys, steam rising, warm light in a small window; in the foreground a short wooden walkway down to the water; across the wide lake, the snowy French Chablais mountains above the town of Évian.
FORMAT : 16:9.
```

### `saunas-flottants-bateaux-saunas-suisse.jpg` · article saunas flottants

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : Saunafloss, débarcadère de Cerlier (Erlach), lac de Bienne.
SCÈNE : two small square wooden sauna rafts moored at a lake landing stage at dusk, each with a smoking stovepipe and a lit window, a steel ladder going into the water; behind, the old town of Erlach with its castle on the wooded hill above the shore; on the right, the long green St. Peter's Island stretching into the lake.
FORMAT : 16:9.
```

### `saunas-lac-de-zurich.jpg` · article saunas du lac de Zurich

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : Seebad Enge, Zurich.
SCÈNE : the historic wooden bathhouse of Seebad Enge built on piles over the lake on a winter evening: pale wooden walls, a long sun terrace on the water, steam escaping from a sauna door, warm light inside; behind, the long lake narrowing into haze and the faint snowy Glarus Alps on the horizon.
FORMAT : 16:9.
```

### `bain-d-hiver-neuchatel-bienne-morat.jpg` · article bain d'hiver des Trois-Lacs

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : vue depuis le Mont Vully, entre les lacs de Morat et de Neuchâtel.
SCÈNE : a frosty winter morning seen from the vineyard slopes of Mont Vully: in the foreground bare vine rows white with frost; below on the left, the small round Lake Murten; on the right, the much larger Lake Neuchâtel; a thin mist on the water; far away, the long blue line of the Jura mountains.
FORMAT : 16:9.
```

### `bain-d-hiver-zurich.jpg` · article bain d'hiver Zurich

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : Seebad Utoquai, Zurich.
SCÈNE : the wooden jetty of the Seebad Utoquai on a frosty morning: a steel ladder going into dark steaming water, a folded towel and a thermos on the planks, a few swans nearby; across the lake, the Zurich shore with bare trees; distant snowy Alps at the end of the lake.
FORMAT : 16:9.
```

### `bise.jpg` · article bise

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : Bains des Pâquis et Jet d'eau, rade de Genève.
SCÈNE : a cold sunny day with strong north-east wind: the stone jetty of the Bains des Pâquis with its white lighthouse, small whitecaps all over the harbour, the tall Jet d'eau fountain bent sideways by the wind and blowing spray; stylised wind lines sweeping across the water; a flag stiffly flying.
FORMAT : 16:9.
```

### `buvettes.jpg` · article bars et buvettes du Léman

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : une buvette de plage sur la rive vaudoise du Léman.
SCÈNE : an empty lakeside buvette at golden hour: a small wooden kiosk with a striped awning, a few wooden tables and folded parasols on the grass, a pebble beach; across the wide lake, the French Chablais mountains in warm evening light.
FORMAT : 16:9.
```

### `paddle.jpg` · article paddle sur le Léman

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : une plage de galets du Léman, vue vers Lavaux.
SCÈNE : a stand-up paddleboard and its paddle lying on a pebble beach on a calm early morning, the lake flat as a mirror; on the left, the terraced Lavaux vineyards sloping down to the water; ahead, the eastern end of the lake with the Dents du Midi peaks in soft haze.
FORMAT : 16:9.
```

### `nuit.jpg` · article activités de nuit

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : un ponton du Léman la nuit.
SCÈNE : a dark lake under a starry sky with a single lantern glowing at the end of a wooden jetty; paddleboards stored upright on a wooden rack on the shore; across the water, the few lights of small French villages along the dark Chablais mountains.
FORMAT : 16:9.
```

### `donnees.jpg` · section « Tes données »

```
@generateur-image-le-lac
SCÈNE : a quiet wooden cabin on a lake shore at dusk, its door closed, a single key hanging on a hook beside the door, calm water in front.
FORMAT : 16:9.
```

### `clubs-bain-d-hiver.jpg` · futur article clubs et rendez-vous

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : une jetée du Léman au lever du soleil, en hiver.
SCÈNE : several towels and bathrobes hung on the rail of a wooden jetty at sunrise, a steel ladder into the steaming lake, frost on the planks; across the water, the snowy French Chablais mountains; no people visible.
FORMAT : 16:9.
```

### `bienfaits-bain-froid.jpg` · futur article bienfaits du bain froid

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : une rive à roseaux d'un lac suisse en hiver.
SCÈNE : a calm grey winter morning lake, a simple water thermometer hanging on a wooden post at the water's edge, ice crystals on the reeds around it, a thin mist above the water.
FORMAT : 16:9.
```

### `respiration.jpg` · futur article respiration

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : un ponton du Léman à l'aube.
SCÈNE : a perfectly still lake at dawn, concentric ripples spreading from one point near a wooden ladder at the end of a jetty, soft pink light, the Chablais mountains as a pale silhouette across the water.
FORMAT : 16:9.
```

### `programme-4-semaines.jpg` · futur article programme de 4 semaines

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : une jetée du Léman.
SCÈNE : four wooden steps leading down into a calm lake, each one a little lower and closer to the water, soft morning light, the lake and distant mountains behind.
FORMAT : 16:9.
```

### `neoprene.jpg` · futur article néoprène

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : un bain du Léman en hiver.
SCÈNE : neoprene gloves, neoprene booties and a wool beanie laid neatly on a wooden bench on a lakeside jetty, cold blue morning light, the calm lake behind.
FORMAT : 16:9.
```

## Un portrait par lac (articles « Où se baigner »)

Chaque image montre un endroit réel du lac (souvent la plage citée dans l'article), avec son relief et ses repères. Pour les lacs à une seule plage (Bret, Les Brenets, Ägeri, Silvaplana, Sion), une illustration est la bonne image de tête : la carte seule y était très pauvre.

### `portrait-neuchatel.jpg` · Lac : Lake Neuchâtel

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : Jeunes-Rives, Neuchâtel (plage urbaine gratuite).
SCÈNE : the urban beach of Jeunes-Rives in Neuchâtel: in the foreground a lawn with a few trees and a small strip of pebble beach; in the middle the very wide, calm lake with a long low horizon; in the background, on a clear day, the whole white chain of the Bernese Alps far across the water.
FORMAT : 16:9.
```

### `portrait-bienne.jpg` · Lac : Lake Biel

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : rive nord du lac de Bienne, vignes de Gléresse (Ligerz).
SCÈNE : seen from the vineyards above Ligerz on the north shore: in the foreground terraced vineyards with stone walls stepping down to the water; the small white church of Ligerz with its slim tower among the vines; in the middle the calm lake; on the left, the long green St. Peter's Island lying low in the lake.
FORMAT : 16:9.
```

### `portrait-morat.jpg` · Lac : Lake Murten

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : Strandbad Murten, au pied de la vieille ville de Morat.
SCÈNE : the sandy beach of the Murten lido in the foreground; just behind it, on a gentle rise, the walled medieval town of Murten with its ramparts, towers and red roofs; on the right, the calm round lake and, across it, the gentle vineyard slope of Mont Vully.
FORMAT : 16:9.
```

### `portrait-gruyere.jpg` · Lac : Lake Gruyère

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : rive de La Roche ou de Corbières, lac de la Gruyère.
SCÈNE : a long narrow reservoir lake between steep wooded hills in autumn colours, a small free beach with a wooden pontoon in the foreground, a village with a small church spire on the far shore, and the pointed summit of the Moléson in the distance to the south.
FORMAT : 16:9.
```

### `portrait-joux.jpg` · Lac : Lac de Joux

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : plage du Rocheray, Le Sentier, avec la Dent de Vaulion.
SCÈNE : a high Jura valley lake in winter at sunset: in the foreground the snowy shore of Le Rocheray; the lake partly frozen; dense dark spruce forests on both sides; at the far end, the distinctive steep cliff of the Dent de Vaulion catching the last golden light.
FORMAT : 16:9.
```

### `portrait-bret.jpg` · Lac : Lac de Bret

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : lac de Bret, dans les hauts de Lavaux (réserve d'eau potable, pas de zone de baignade).
SCÈNE : a small calm lake among green meadows and patches of forest in the hills above Lavaux, reed beds along the shore, morning mist on the water, a path and a bench on the grassy bank; no beach, no pontoon, no swimmers.
FORMAT : 16:9.
```

### `portrait-brenets.jpg` · Lac : Lac des Brenets

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : lac des Brenets, sur le Doubs (frontière franco-suisse).
SCÈNE : a narrow winding river lake between tall pale limestone cliffs covered with forest, calm dark green water reflecting the rocks, a small white excursion boat far away heading to the gorge, a little landing stage in the foreground.
FORMAT : 16:9.
```

### `portrait-sion.jpg` · Lac : Domaine des Îles, Sion

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : Domaine des Îles, Sion (Valais).
SCÈNE : a former gravel-pit lake in the wide flat Rhône valley: a sandy shore and a floating pontoon in the foreground, poplars and willows around the water; in the distance, the two rocky hills of Valère and Tourbillon with their castle and fortified church above Sion; dry vineyard slopes and bare mountain peaks behind.
FORMAT : 16:9.
```

### `portrait-zurich.jpg` · Lac : Lake Zurich

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : Seebad Utoquai, Zurich.
SCÈNE : the historic wooden bathhouse of Seebad Utoquai on piles in the lake, with its wooden sun decks and small towers; a calm summer morning; the long lake fading into haze towards the south and the faint snowy Glarus Alps on the horizon.
FORMAT : 16:9.
```

### `portrait-greifensee.jpg` · Lac : Greifensee

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : Strandbad Uster, Greifensee.
SCÈNE : a small calm lake on the Swiss plateau: in the foreground a lawn and a wooden diving platform of the Uster lido; wide reed margins along the shore; across the water, the small village of Greifensee with its little castle and church; gentle rolling green hills.
FORMAT : 16:9.
```

### `portrait-lucerne.jpg` · Lac : Lake Lucerne

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : Seebad Luzern, devant le Schweizerhofquai, avec le Pilatus.
SCÈNE : the wooden lake bath of Lucerne floating in front of the lakeside promenade: in the foreground its wooden deck and ladders; in the middle the deep blue-green lake with an old white paddle steamer; in the background the jagged rocky ridge of Mount Pilatus on the right and the gentle wooded Rigi on the left.
FORMAT : 16:9.
```

### `portrait-zoug.jpg` · Lac : Lake Zug

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : Strandbad Zug, avec le Rigi.
SCÈNE : the free lido of Zug at sunset: a lawn and a wooden jetty in the foreground, a lakeside promenade with trees; the calm lake glowing orange; across the water to the south, the broad dark mass of the Rigi mountain.
FORMAT : 16:9.
```

### `portrait-aegeri.jpg` · Lac : Lake Ägeri

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : Lido d'Unterägeri.
SCÈNE : a small mountain lake in a green valley: in the foreground the Unterägeri lido with a floating raft and a wooden diving tower; pastures sloping down to the shore on the opposite side; wooded pre-Alpine hills all around; calm clear water.
FORMAT : 16:9.
```

### `portrait-hallwil.jpg` · Lac : Lake Hallwil

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : Strandbad Seerose, Meisterschwanden.
SCÈNE : a reed-fringed lake among rolling green hills at dawn: in the foreground the lawn and wooden jetty of the Seerose lido; a small wooden rowing boat on the still water; a few orchard trees and farmhouses on the far shore.
FORMAT : 16:9.
```

### `portrait-thoune.jpg` · Lac : Lake Thun

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : Strandbad Thun, avec le Niesen.
SCÈNE : a broad lake seen from the Thun lido: in the foreground a lawn and a pool edge by the lake; on the right, the perfect pyramid of the Niesen mountain; in the far distance, the big snowy peaks of the Eiger, Mönch and Jungfrau; a few sailboats on the water.
FORMAT : 16:9.
```

### `portrait-brienz.jpg` · Lac : Lake Brienz

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : village de Brienz et sa rive.
SCÈNE : strikingly turquoise lake water; in the foreground the shore of Brienz village with dark brown wooden chalets with steep roofs; across the lake, steep forested mountains with the white thread of the Giessbach waterfall; a paddle steamer far away.
FORMAT : 16:9.
```

### `portrait-sempach.jpg` · Lac : Lake Sempach

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : Seebad Nottwil (plage de sable gratuite).
SCÈNE : a rounded lake surrounded by farmland and orchards: in the foreground the small sandy beach of the Nottwil lido with a kiosk; calm water; gentle green hills around; on the horizon, the faint jagged silhouette of Mount Pilatus.
FORMAT : 16:9.
```

### `portrait-baldegg.jpg` · Lac : Lake Baldegg

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : Seebad Baldegg.
SCÈNE : a quiet small lake with wide reed beds and orchard-covered hills: in the foreground the lawn and a short wooden jetty of the Baldegg lake bath, a single bench facing the water; on the hill above the village, the long white building of the Baldegg convent.
FORMAT : 16:9.
```

### `portrait-sarnen.jpg` · Lac : Lake Sarnen

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : Seebad Sarnen, Seefeld Park.
SCÈNE : a lake in a wide green valley with forested mountains on both sides: in the foreground the lawn and wooden lido of Seefeld Park at Sarnen; calm water stretching south between the mountains; higher snowy peaks at the end of the valley.
FORMAT : 16:9.
```

### `portrait-silvaplana.jpg` · Lac : Lake Silvaplana

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : plage du centre de surf de Silvaplana (Engadine).
SCÈNE : a high Alpine lake ruffled by the afternoon wind: many colourful windsurf and kitesurf sails on the water; golden larch trees on the slopes; the rocky Piz Corvatsch with glaciers above; thin crisp mountain light; a small beach in the foreground.
FORMAT : 16:9.
```

### `portrait-constance.jpg` · Lac : Lake Constance

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : port de Romanshorn.
SCÈNE : a vast lake with an almost endless flat horizon under a big sky: in the foreground the harbour of Romanshorn with many sailboat masts and a large white car ferry; a lighthouse at the harbour entrance; the far German shore only a thin line.
FORMAT : 16:9.
```

### `portrait-untersee.jpg` · Lac : Lake Constance, Untersee

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : Strandbad Ermatingen, face à l'île de Reichenau.
SCÈNE : a shallow calm bay with reeds: in the foreground the lawn and jetty of the Ermatingen lido; across the water, the low flat island of Reichenau with vegetable fields and greenhouses; orchards and soft low hills on the Swiss shore.
FORMAT : 16:9.
```

### `portrait-lugano.jpg` · Lac : Lake Lugano

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : Lido di Lugano, avec le Monte San Salvatore.
SCÈNE : a palm-lined lakeside promenade in Lugano; in the foreground the lido with its lawns and the lake; across the bay, the steep green cone of Monte San Salvatore; deep turquoise water, warm southern light.
FORMAT : 16:9.
```

### `portrait-majeur.jpg` · Lac : Lake Maggiore

```
@generateur-image-le-lac
LIEU RÉEL, à rendre reconnaissable : front de lac d'Ascona.
SCÈNE : the waterfront of Ascona seen from the lake: a row of colourful Italian-style houses with arcades and a church tower, palm trees along the quay; a wide blue lake in the foreground; in the distance, the small Brissago islands and the mountains across the lake.
FORMAT : 16:9.
```

## Ce que je ferai des images

- Les placer en tête des articles concernés (à la place de la carte, qui passe dans le corps de l'article), avec le texte alternatif du Gem et la légende « Illustration générée par IA ».
- Ne rien changer aux pages de plage : elles montrent des lieux réels.

## Serveur d'images directement dans Claude Code (optionnel)

Le serveur `mcp-image` est déclaré dans `.mcp.json` et la clé est en place. Il manque la facturation sur le projet Google (le palier gratuit ne permet pas de générer d'images). Voir `TODO.md`.
