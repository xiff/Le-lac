# Images générées par IA : ton commun, Gem Google et prompts

Ce fichier sert à générer des illustrations dans le même ton que le site (« Le carnet du baigneur », voir `DESIGN.md`).
Il suit la méthode du skill Nano Banana (Gemini Image) : langage naturel, palette de la marque dans le prompt, format précisé,
**style verrouillé une fois pour toutes**, une image à la fois, texte **hors** de l'image.

## 1. Instructions à coller dans le Gem

Nom : **Mon Lac – illustrations**

```
Tu génères des illustrations pour le site Mon Lac (lacs suisses : eau, vent, plages, saunas, bain d'hiver).
Pour chaque demande, je te donne une SCÈNE et un FORMAT. Tu génères UNE image, jamais plusieurs.

STYLE (toujours le même, ne le change jamais) :
Illustration éditoriale à plat, texture de gouache douce et légèrement grainée, fond papier crème chaud (#f5efe3), lac bleu-vert profond (#0d4a5c) avec des variations plus claires (#0f6b80), une seule touche de jaune soleil (#f2b84b), encre bleu-vert très sombre pour les contours et les ombres (#10292f). Aplats généreux, formes simples, peu de détails. Lumière douce et basse. Ambiance calme, chaleureuse, jamais dramatique ni alarmiste. Pas de ciel dégradé « météo », pas d'icônes soleil-nuage, pas de néons.

RÈGLES :
- Aucun texte, aucune lettre, aucun logo, aucune enseigne dans l'image.
- Aucun visage ni personne reconnaissable. Pas de marque, pas de personnage protégé.
- Pas de monument identifiable ni de lieu réel dessiné avec précision : on suggère le caractère du lieu (montagnes, palmiers, vignes, roselières), on ne le copie pas.
- Pas de photoréalisme : c'est toujours une illustration, jamais une image qui se fait passer pour une photo.
- Composition aérée avec une zone calme en haut ou à gauche, pour qu'un titre puisse être posé par-dessus.
- Format 16:9 sauf indication contraire.
- Si la scène est ambiguë, pose UNE question avant de générer ; sinon, génère directement.
- Après l'image, écris une ligne : « Texte alternatif : » suivie d'une description factuelle de 15 mots maximum, en français.
```

Ajoutez dans les **fichiers de connaissances du Gem** 2 ou 3 images déjà validées : elles servent de références de style et limitent la dérive d'une image à l'autre.

## 2. Mode d'emploi

1. Génère **une image par demande**, en 1K pour essayer, en 2K quand elle te plaît.
2. Demande à chaque fois : `SCÈNE : <description ci-dessous>. FORMAT : 16:9.`
3. Si le style dérive, écris : « Même style que l'image de référence, change seulement la scène. »
4. Vérifie : aucun texte parasite, aucun visage, aucune ressemblance avec un lieu précis, palette crème, bleu-vert et jaune.
5. Enregistre l'image sous le nom indiqué, en JPEG, dans `blog/img/ia/`, et envoie-la-moi : je l'intègre à l'article avec sa légende.

**Mention obligatoire** sous chaque image : « Illustration générée par IA ». Gemini y ajoute un filigrane invisible (SynthID) : ne le retirez pas et ne présentez jamais ces images comme des photos.
Ne remplacez pas les photos Wikimedia des 12 articles « température » : elles montrent de vrais lieux.

## 3. Prompts : thèmes du site

| Fichier (`blog/img/ia/…jpg`) | Pour | Format | SCÈNE à donner au Gem |
|---|---|---|---|
| `og-image` | site | 1200×630 (génère en 16:9 puis recadre) | a calm alpine lake at sunrise seen from a wooden jetty, low sun, gentle ripples; leave the left third calm and empty |
| `saunas-bord-du-leman` | article saunas du Léman | 16:9 | a wood-fired barrel sauna and a yurt on a pebble beach at dusk, steam rising, the lake behind, warm light in the windows |
| `saunas-flottants-bateaux-saunas-suisse` | article saunas flottants | 16:9 | a small wooden floating sauna raft moored on a lake at dusk, warm light in the window, steam rising, a ladder into the water |
| `saunas-lac-de-zurich` | article saunas du lac de Zurich | 16:9 | a wooden lakeside bath with an open-air sauna cabin and a jetty into a wintry lake, soft evening light |
| `bain-d-hiver-neuchatel-bienne-morat` | article bain d’hiver Trois-Lacs | 16:9 | three small lakes seen as three tidy panels of one landscape, a shared wooden jetty with a ladder, frosty reeds |
| `bain-d-hiver-zurich` | article bain d’hiver Zurich | 16:9 | a wooden ladder entering a steaming lake on a frosty morning, a towel and a thermos on the jetty |
| `bise` | article bise | 16:9 | stylised wind lines sweeping across a lake, small whitecaps, a flag stiffly flying on a jetty |
| `buvettes` | bars et buvettes | 16:9 | an empty lakeside terrace with wooden tables and parasols, the lake behind, golden hour |
| `paddle` | paddle / activités de jour | 16:9 | a stand-up paddleboard lying on a pebble beach beside a lake, morning light, mountains in the haze |
| `nuit` | activités interdites de nuit | 16:9 | a dark lake under a starry sky with a single lantern on a jetty, paddleboards put away on a rack |
| `donnees` | section « Tes données » | 16:9 | a quiet cabin on a lake shore with a closed door and a key hanging on a hook |
| `clubs-bain-d-hiver` | futur article clubs et rendez-vous | 16:9 | a small group of towels and robes hung on a jetty rail at sunrise, steaming lake, no people visible |
| `bienfaits-bain-froid` | futur article bienfaits | 16:9 | a calm heron-grey morning lake with a thermometer hanging on a wooden post, ice crystals on the reeds |
| `respiration` | futur article respiration | 16:9 | a still lake at dawn, concentric ripples spreading from one point, a wooden ladder at the edge |
| `programme-4-semaines` | futur article programme de 4 semaines | 16:9 | four wooden steps leading down into a lake, each a little lower, soft morning light |
| `neoprene` | futur article néoprène | 16:9 | neoprene gloves, booties and a beanie laid neatly on a wooden bench by a lake, cold morning light |

## 4. Prompts : un portrait par lac (articles « Où se baigner »)

Ces images donnent le **caractère** du lac, pas sa ressemblance. Les décors viennent de ce que montrent les photos Wikimedia choisies
pour le site et de faits sourcés (altitude, forme du lac). Chacune sera légendée « Illustration générée par IA ».

| Fichier (`blog/img/ia/…jpg`) | Lac | SCÈNE à donner au Gem |
|---|---|---|
| `portrait-neuchatel` | Lake Neuchâtel | a wide calm lake with a long low horizon, the silhouette of a far Alpine range across the water, a pebble shore with reed beds in the foreground |
| `portrait-bienne` | Lake Biel | vineyard terraces stepping down to the water, a small red-roofed village on the shore, a calm bay |
| `portrait-morat` | Lake Murten | a small walled medieval town on a gentle hill above a calm lake, sandy shore with oaks and pines in the foreground |
| `portrait-gruyere` | Lake Gruyère | a long narrow reservoir between steep green hills in autumn colours, a hamlet with a small white church spire on the shore |
| `portrait-joux` | Lac de Joux | a high Jura plateau lake in winter, snow-covered spruce forest, low golden sun, the lake partly frozen |
| `portrait-bret` | Lac de Bret | a tiny wooded lake among meadows, one lone wooden pontoon, still water, soft morning mist |
| `portrait-brenets` | Lac des Brenets | a narrow river-like lake between steep forested cliffs, a small excursion boat in the distance |
| `portrait-sion` | Domaine des Îles, Sion | a former gravel-pit lake in a wide Alpine valley, floating pontoons, vineyard slopes and bare peaks behind |
| `portrait-zurich` | Lake Zurich | a historic wooden lakeside bathhouse on stilts with sun terraces, a long lake fading into haze, distant Alps |
| `portrait-greifensee` | Greifensee | a small lake on the Swiss plateau, reed margins, a village on the shore, gentle rolling hills |
| `portrait-lucerne` | Lake Lucerne | steep forested mountains plunging into deep blue-green water, several arms of the lake, a paddle steamer far away |
| `portrait-zoug` | Lake Zug | a lakeside promenade lined with trees, a calm lake, a snow-capped ridge on the horizon |
| `portrait-aegeri` | Lake Ägeri | a small mountain lake in a green valley, cow pasture sloping to the shore, a wooden jetty |
| `portrait-hallwil` | Lake Hallwil | a reed-fringed lake among rolling hills, a small rowing boat, still water at dawn |
| `portrait-thoune` | Lake Thun | a broad lake in front of big snow-covered Alpine peaks, a small harbour with a few moored boats |
| `portrait-brienz` | Lake Brienz | strikingly turquoise water, wooden chalets with red-brown roofs down to the shore, steep mountains behind |
| `portrait-sempach` | Lake Sempach | a rounded lake surrounded by farmland and orchards, a small lakeside bath with a diving platform |
| `portrait-baldegg` | Lake Baldegg | a quiet small lake with reeds and orchard-covered hills, a single bench facing the water |
| `portrait-sarnen` | Lake Sarnen | a lake in a wide green valley with forested mountains, a simple wooden lido on the shore |
| `portrait-silvaplana` | Lake Silvaplana | a high Alpine lake ruffled by wind, a few windsurf sails, bare peaks and larch trees, thin crisp light |
| `portrait-constance` | Lake Constance | a vast lake with an almost endless horizon, a harbour full of sailboat masts, big sky |
| `portrait-untersee` | Lake Constance, Untersee | a shallow calm bay with orchards on the shore, a small harbour, soft low hills |
| `portrait-lugano` | Lake Lugano | a palm-lined lakeside promenade, a steep green mountain across the water, turquoise lake |
| `portrait-majeur` | Lake Maggiore | a palm-lined waterfront with colourful lakefront houses, a wide blue lake, a mountain far across |

Pour les lacs à une seule plage (Bret, Les Brenets, Ägeri, Silvaplana, Sion), une illustration est la bonne image de tête : la carte seule y était très pauvre.

## 5. Ce que je ferai des images

- Les placer en tête des articles concernés (à la place de la carte, qui passe dans le corps de l'article), avec le texte alternatif du Gem et la légende « Illustration générée par IA ».
- Ne rien changer aux pages de plage : elles montrent des lieux réels.

## 6. Serveur d'images directement dans Claude Code (optionnel)

Le serveur `mcp-image` est déclaré dans `.mcp.json`. Il reste à enregistrer la clé Gemini dans l'environnement, puis à démarrer une nouvelle session. Voir `TODO.md`.
