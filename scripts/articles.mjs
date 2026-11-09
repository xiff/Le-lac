// Articles du blog. Chaque fait vient d'une source citée en bas d'article (pas de chiffre inventé).
// html = corps de l'article ; les <h2> sont des questions réelles, la section « En bref » répond d'emblée.
export const ARTICLES = [
  {
    slug: 'bain-d-hiver-leman',
    titre: 'Bain d’hiver dans le Léman : bien débuter à Genève et Lausanne',
    h1: 'Bain d’hiver dans le Léman : bien débuter',
    desc: 'Combien de temps rester dans l’eau, comment entrer, où se baigner et se réchauffer à Genève et Lausanne : le guide du bain d’hiver dans le Léman, avec l’eau du jour plage par plage.',
    publie: '2026-11-09', modifie: '2026-11-09',
    image: 'presentation/img/baignade-hiver.jpg', hauteur: 1200, imageAlt: 'Nageurs en bonnet dans le lac lors de la Coupe de Noël à Genève',
    credit: 'La Coupe de Noël, Genève. Photo GastelEtzwane, <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.fr">CC BY-SA 4.0</a>, <a href="https://commons.wikimedia.org/wiki/File:Coupe_Noel_20151220.jpg">Wikimedia Commons</a>.',
    bref: 'Le bain d’hiver se pratique dans le Léman quand l’eau passe sous 15 °C, en gros d’octobre à mai. La Société Suisse de Sauvetage (SSS) donne une règle simple : <strong>ne pas rester plus de minutes que l’eau n’a de degrés</strong> (5 °C = 5 minutes au maximum). Entrer lentement, garder la tête hors de l’eau avec un bonnet, ne jamais y aller seul, sortir au moindre malaise, puis se sécher et s’habiller chaudement, sans douche chaude.',
    html: `
<h2>Combien de temps peut-on rester dans l’eau froide ?</h2>
<p>La fiche « Nager en eau froide » de la SSS propose un repère facile à retenir : la température de l’eau en degrés donne la durée maximale de la baignade en minutes. À 10 °C, on ne dépasse pas 10 minutes ; à 5 °C, 5 minutes. C’est un maximum, pas un objectif : les premières fois, quelques brasses suffisent largement.</p>
<p><a href="#eau-du-jour">L’eau du jour plage par plage</a> est affichée plus bas et dans l’app Mon Lac aujourd’hui.</p>

<h2>Comment entrer dans l’eau froide sans danger ?</h2>
<ul class="liste">
  <li><strong>Entrer lentement</strong> pour laisser le corps s’habituer, sans sauter ni plonger.</li>
  <li><strong>Garder la tête hors de l’eau</strong> et porter un bonnet.</li>
  <li><strong>Ne jamais y aller seul</strong> : le Bureau de prévention des accidents (BPA) recommande aussi une aide à la flottaison, comme une bouée de natation.</li>
  <li><strong>Sortir immédiatement</strong> si l’on se sent mal.</li>
  <li><strong>Être en bonne condition physique</strong> : la SSS rappelle que l’eau froide le demande. En cas de doute sur sa santé, on en parle à son médecin avant de commencer.</li>
</ul>

<h2>Que faire en sortant de l’eau ?</h2>
<p>Se sécher soigneusement et enfiler tout de suite des vêtements chauds et secs. La SSS déconseille la douche chaude juste après, les endroits exposés au vent et les gros efforts. Une boisson tiède aide à se réchauffer de l’intérieur.</p>

<h2>Où se baigner l’hiver à Genève et à Lausanne ?</h2>
<p><strong>Genève.</strong> Les <a href="../../plage/bains-des-paquis/">Bains des Pâquis</a> restent le rendez-vous des nageurs d’hiver ; leur buvette est ouverte toute l’année, avec la fondue l’hiver. En décembre, la Coupe de Noël se nage dans la rade. Pour se réchauffer autrement, le Sauna Boats Genève propose un sauna flottant au départ du quai Gustave-Ador, près de la <a href="../../plage/plage-des-eaux-vives/">plage des Eaux-Vives</a>.</p>
<p><strong>Lausanne.</strong> À Ouchy, les Bains des Rives installent d’octobre à mars un sauna au bord du lac, avec un plongeon dans le Léman entre deux séances : de quoi enchaîner chaud et froid près de la <a href="../../plage/lausanne-ouchy/">plage d’Ouchy</a>.</p>
<p>La <a href="../../plage/">liste des 65 plages</a> donne la température et le vent de chacune.</p>

<h2>Comment Mon Lac aujourd’hui aide pour le bain d’hiver ?</h2>
<p>D’octobre à mai, dès que l’eau est sous 15 °C, la case « Baignade » de l’app devient « Bain d’hiver ». Sa note dépend surtout du vent : l’eau froide est le but, les rafales et les vagues beaucoup moins. Le <strong>défi bain d’hiver</strong> garde la date, la plage et la température de chaque bain, et l’historique se partage en un geste avec ses compagnons de baignade.</p>`,
    sources: [
      ['Société Suisse de Sauvetage SSS, fiche « Nager en eau froide »', 'https://www.slrg.ch/sites/default/files/2025-02/Fiche-nager-en-eau-froide-web.pdf'],
      ['BPA, baignade en eaux libres : une bouée de natation peut sauver une vie', 'https://www.bfu.ch/media/gdkcesaq/baignade-en-eaux-libres-une-bouee-de-natation-peut-sauver-une-vie.pdf'],
      ['Bains des Rives, Lausanne (loisirs.ch)', 'https://www.loisirs.ch/activite/bains-des-rives-a-lausanne-sauna/'],
      ['Sauna Boats Genève', 'https://saunaboat-geneve.ch/fr/'],
      ['Température de l’eau : modèle Alplakes, Eawag (CC BY 4.0)', 'https://www.alplakes.eawag.ch'],
    ],
    plages: ['bains-des-paquis', 'plage-des-eaux-vives', 'lausanne-ouchy'],
  },
  {
    slug: 'bise-leman',
    titre: 'La bise sur le Léman : ce qu’elle change pour la baignade, le paddle et le kite',
    h1: 'La bise sur le Léman, et ce qu’elle change sur l’eau',
    desc: 'D’où vient la bise, comment la reconnaître et à partir de quand elle gêne la baignade et le paddle, alors que kitesurfeurs, windsurfeurs et foilers l’attendent.',
    publie: '2026-11-09', modifie: '2026-11-09',
    image: 'presentation/img/jet-deau.jpg', hauteur: 1047, imageAlt: 'La rade de Genève et le jet d’eau',
    credit: 'La rade de Genève. Photo Gzzz, <a href="https://creativecommons.org/licenses/by-sa/3.0/deed.fr">CC BY-SA 3.0</a>, <a href="https://commons.wikimedia.org/wiki/File:Rade_de_Gen%C3%A8ve_2012.jpg">Wikimedia Commons</a>.',
    bref: 'La bise est un vent froid et sec qui souffle du nord-est. Pour MétéoSuisse, c’est <strong>le vent le plus caractéristique du Léman</strong> : elle s’installe quand une haute pression couvre les îles Britanniques et une basse pression l’Italie. Elle lève des vagues qui gênent la baignade, le paddle et les sorties en bateau, mais elle fait le bonheur des kitesurfeurs, des windsurfeurs et des foilers.',
    html: `
<h2>D’où vient la bise ?</h2>
<p>Selon MétéoSuisse, la bise s’établit lorsqu’une haute pression recouvre les îles Britanniques et une basse pression l’Italie. L’air froid est alors canalisé par le Plateau suisse, qui se resserre vers l’ouest, et accélère en arrivant sur le Léman.</p>

<h2>D’où souffle-t-elle sur le lac ?</h2>
<p>Sur le Petit-Lac (côté Genève) et le Grand-Lac, la bise souffle du <strong>nord-est</strong>. Sur le Haut-Lac, ralentie par les Alpes vaudoises, elle est déviée vers l’embouchure du Rhône et souffle plutôt du nord-nord-ouest (MétéoSuisse). La Société internationale de sauvetage du Léman (SISL) la décrit comme le vent le plus fréquent du lac, et note que la température baisse vite à son passage.</p>

<h2>Comment savoir s’il y a de la bise aujourd’hui ?</h2>
<p>Un vent de nord-est, froid et sec, qui forme des moutons sur le lac : c’est elle. Dans Mon Lac aujourd’hui, on parle de bise quand le vent vient du nord-est (entre 20 et 80°) et dépasse 15 km/h ; l’app l’annonce alors en haut de l’écran. La flèche du vent, plage par plage, montre d’où il souffle.</p>

<h2>Peut-on se baigner ou faire du paddle par bise ?</h2>
<p>Par bise forte, mieux vaut attendre. Elle lève des vagues et du courant près des rives exposées. Ce sont les repères que l’app applique (ce ne sont pas des normes officielles) :</p>
<ul class="liste">
  <li><strong>Baignade</strong> : au-delà de 25 km/h de bise, la note ne dépasse pas « Bof ».</li>
  <li><strong>Paddle</strong> : la note baisse dès que les rafales passent 12 km/h, et devient « Non » au-delà de 28 km/h.</li>
  <li><strong>Sortie en bateau</strong> : plafonnée à « Bof » quand la bise dépasse 25 km/h.</li>
</ul>

<h2>Pourquoi les kitesurfeurs et les foilers aiment la bise ?</h2>
<p>Parce que c’est un vent établi et souvent soutenu. Dans l’app, le kitesurf est « Parfait » entre 22 et 40 km/h de vent, le windsurf entre 20 et 40 km/h. Pour le foil, une bise d’au moins 25 km/h donne une note « Parfait » : c’est le vent des <strong>downwinds</strong>, ces longues descentes portées par les vagues. La bise ne masque pas le verdict de la voile, du kite, du windsurf ni du foil.</p>
<p>Pour une sortie, la <a href="../../plage/">liste des plages</a> et l’app donnent le vent et sa direction devant chaque plage.</p>`,
    sources: [
      ['MétéoSuisse, les vents du Léman', 'https://www.meteoschweiz.admin.ch/wetter/wetter-und-klima-von-a-bis-z/winde-genfersee.html'],
      ['SISL, dossier technique « Le Léman »', 'https://sisl.ch/images/Dossiers_techniques/le_leman.pdf'],
      ['Vent et rafales : Open-Meteo', 'https://open-meteo.com'],
    ],
    plages: [],
  },
  {
    slug: 'temperature-lac-leman',
    titre: 'Température du lac Léman : d’où viennent les chiffres et pourquoi ils varient',
    h1: 'Température du lac Léman : comment elle est mesurée, et pourquoi elle varie',
    desc: 'Comment l’eau du Léman est calculée à 70 cm devant chaque plage, pourquoi elle peut perdre plusieurs degrés en deux jours, et où la consulter en direct.',
    publie: '2026-11-09', modifie: '2026-11-09',
    image: 'presentation/img/paquis.jpg', hauteur: 1067, imageAlt: 'Les Bains des Pâquis à Genève, le soir',
    credit: 'Les Bains des Pâquis, Genève. Photo Babsy, <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.fr">CC BY-SA 4.0</a>, <a href="https://commons.wikimedia.org/wiki/File:Bains_des_P%C3%A2quis_le_soir.JPG">Wikimedia Commons</a>.',
    bref: 'Mon Lac aujourd’hui affiche la température de l’eau <strong>à 70 cm sous la surface, devant chacune des 65 plages</strong>, mise à jour toutes les trois heures à partir du modèle Alplakes de l’Eawag. Elle peut différer de plusieurs degrés d’une plage à l’autre le même jour, et chuter brutalement quand un vent fort fait remonter l’eau froide du fond : c’est l’« upwelling ».',
    html: `
<h2>Comment la température du Léman est-elle calculée ?</h2>
<p>Les chiffres viennent d’<strong>Alplakes</strong>, la plateforme de l’Eawag (l’institut de recherche sur l’eau du domaine des EPF). Elle combine des modèles numériques des lacs et des données satellitaires pour calculer la température de l’eau à différentes profondeurs, avec des prévisions sur plusieurs jours. L’Eawag indique, pour les grands lacs, une erreur d’environ 1 °C en surface.</p>
<p>Mon Lac aujourd’hui lit la valeur du modèle devant chaque plage, à 70 cm de profondeur, toutes les trois heures. Les données sont publiées sous licence CC BY 4.0.</p>

<h2>Pourquoi 70 cm sous la surface ?</h2>
<p>Parce que c’est à peu près l’eau dans laquelle on nage. La toute première pellicule de surface se réchauffe ou se refroidit très vite avec le soleil et l’air ; un peu plus bas, la valeur est plus stable et plus proche de ce que l’on ressent en entrant.</p>

<h2>Pourquoi l’eau n’a-t-elle pas la même température partout ?</h2>
<p>Le Léman est grand et profond, et le vent y déplace l’eau de surface. Quand un vent fort souffle longtemps dans la même direction, il pousse l’eau chaude de surface ; pour compenser, de l’eau froide profonde remonte près de certaines rives. Les scientifiques appellent ce phénomène l’<strong>upwelling</strong>.</p>
<ul class="liste">
  <li>En juin 2025, l’eau est passée de 19 à 11 °C en quelques jours près de Genève, sous un vent fort et persistant du sud-ouest ; Alplakes l’avait prévu plusieurs jours à l’avance (Eawag).</li>
  <li>Le record connu : fin juin 2017, l’eau des Bains des Pâquis est passée de 23 à tout juste 8 °C en deux jours (Eawag).</li>
</ul>
<p>Résultat : le même jour, deux plages peuvent afficher des écarts de plusieurs degrés. <a href="#eau-du-jour">L’écart du moment</a> est calculé ci-dessous.</p>

<h2>Où voir la température du Léman en direct ?</h2>
<p>Dans l’<a href="../../">app Mon Lac aujourd’hui</a>, gratuite et sans compte, avec le vent, la bise et un verdict pour chaque activité. La <a href="../../plage/">liste des 65 plages</a> donne aussi une page par plage, de Genève à Saint-Gingolph et d’Évian à Chens-sur-Léman.</p>`,
    sources: [
      ['Eawag, « Cold shock in Lake Geneva: Alplakes shows why »', 'https://www.eawag.ch/en/info/portal/news/news-detail/cold-shock-in-lake-geneva-alplakes-shows-why'],
      ['Eawag, projet Alplakes', 'https://www.eawag.ch/fr/abteilung/surf/projekte/alplakes'],
      ['Alplakes (données CC BY 4.0)', 'https://www.alplakes.eawag.ch'],
      ['EGU 2026, précision des simulations opérationnelles des lacs suisses', 'https://meetingorganizer.copernicus.org/EGU26/EGU26-12579.html'],
    ],
    plages: ['bains-des-paquis'],
  },
];
