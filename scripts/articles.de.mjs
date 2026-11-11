// Articles du blog en allemand : slug -> { titre, h1, desc, bref, html }. Même structure que les articles français ;
// h = assistants de articles.mjs (listes générées depuis les données de l'app).
export const creerDe = (h) => ({
  'bain-d-hiver-leman': {
    titre: 'Winterbaden im Genfersee: gut starten in Genf und Lausanne',
    h1: 'Winterbaden im Genfersee: gut starten',
    desc: 'Wie lange im Wasser bleiben, wie hineingehen, wo baden und sich aufwärmen in Genf und Lausanne: der Leitfaden zum Winterbaden im Genfersee, mit dem Tageswasser Badeplatz für Badeplatz.',
    bref: 'Winterbaden im Genfersee heisst baden, wenn das Wasser unter 15 °C fällt, ungefähr von Oktober bis Mai. Die Schweizerische Lebensrettungs-Gesellschaft (SLRG) nennt eine einfache Regel: <strong>nicht mehr Minuten im Wasser bleiben, als das Wasser Grad hat</strong> (5 °C = höchstens 5 Minuten). Langsam hineingehen, den Kopf mit einer Mütze über Wasser halten, nie allein gehen, beim kleinsten Unwohlsein sofort raus, dann abtrocknen und sich warm anziehen, ohne heisse Dusche.',
    html: (L) => `
<h2>Wie lange kann man im kalten Wasser bleiben?</h2>
<p>Das Merkblatt «Kaltwasserschwimmen» der SLRG nennt eine leicht zu merkende Faustregel: Die Wassertemperatur in Grad ergibt die maximale Badedauer in Minuten. Bei 10 °C bleibt man höchstens 10 Minuten, bei 5 °C 5 Minuten. Das ist ein Höchstwert, kein Ziel: Die ersten Male reichen ein paar Züge völlig aus.</p>
<p><a href="#eau-du-jour">Das Wasser von heute</a> steht weiter unten und, Badeplatz für Badeplatz, in <a href="{app}">der App Mein See</a>.</p>
<h2>Wie geht man gefahrlos ins kalte Wasser?</h2>
<ul class="liste">
  <li><strong>Langsam hineingehen</strong>, damit sich der Körper gewöhnen kann, ohne zu springen oder zu tauchen.</li>
  <li><strong>Den Kopf über Wasser halten</strong> und eine Mütze tragen.</li>
  <li><strong>Nie allein gehen</strong>: Die Beratungsstelle für Unfallverhütung (BFU) empfiehlt ausserdem eine Schwimmhilfe, zum Beispiel eine Schwimmboje.</li>
  <li><strong>Sofort aus dem Wasser</strong>, wenn man sich unwohl fühlt.</li>
  <li><strong>Gut in Form sein</strong>: Die SLRG erinnert daran, dass kaltes Wasser das verlangt. Bei Zweifeln an der eigenen Gesundheit spricht man vorher mit der Ärztin oder dem Arzt.</li>
</ul>
<h2>Was tun nach dem Bad?</h2>
<p>Gründlich abtrocknen und sofort warme, trockene Kleidung anziehen. Die SLRG rät von einer heissen Dusche direkt danach, windigen Orten und grossen Anstrengungen ab. Ein lauwarmes Getränk hilft, sich von innen aufzuwärmen.</p>
<h2>Wo kann man im Winter in Genf und Lausanne baden?</h2>
<p><strong>Genf.</strong> Die <a href="{plage:bains-des-paquis}">Bains des Pâquis</a> bleiben der Treffpunkt der Winterschwimmer; ihre Buvette ist das ganze Jahr geöffnet, im Winter mit Fondue. Im Dezember wird die Coupe de Noël im Hafenbecken geschwommen. Zum Aufwärmen auf andere Art bietet Sauna Boats Genf eine schwimmende Sauna ab dem Quai Gustave-Ador, nahe dem <a href="{plage:plage-des-eaux-vives}">Strand Eaux-Vives</a>.</p>
<p><strong>Lausanne.</strong> In Bellerive stellen die Bains des Rives von Oktober bis März Jurten-Saunen am See auf, mit einem Sprung in den Genfersee zwischen den Gängen, nahe dem <a href="{plage:lausanne-bellerive}">Strand von Bellerive</a>.</p>
<p>Die <a href="{plages}">Liste aller Badeplätze</a> zeigt Temperatur und Wind jedes einzelnen.</p>
<h2>Wo kann man sich in einer Sauna am Genfersee aufwärmen?</h2>
${h.listeLoc(['sauna'], L)}
<p>Öffnungszeiten, Preise und Reservation ändern sich von Saison zu Saison: Frag bei jedem Ort nach.</p>
<h2>Wie hilft Mein See beim Winterbaden?</h2>
<p>Von Oktober bis Mai, sobald das Wasser unter 15 °C liegt, wird die Kachel «Baden» der App zu «Winterbaden». Ihre Bewertung hängt vor allem vom Wind ab: Kaltes Wasser ist das Ziel, Böen und Wellen viel weniger. Die <strong>Winterbade-Challenge</strong> hält Datum, Badeplatz und Temperatur jedes Bades fest, und der Verlauf lässt sich mit einem Fingertipp teilen. Zum Weiterlesen: <a href="{blog:choc-thermique-eau-froide}">die ersten 90 Sekunden im kalten Wasser</a>, <a href="{blog:materiel-bain-d-hiver}">die Ausrüstung</a> und <a href="{blog:afterdrop-se-rechauffer}">sich nach dem Bad aufwärmen</a>. Für die Zahlen siehe <a href="{blog:temperature-lac-leman}">wie die Temperatur des Genfersees berechnet wird</a>.</p>
`,
  },
  'bise-leman': {
    titre: 'Die Bise auf dem Genfersee: was sie fürs Baden, Paddeln und Kiten ändert',
    h1: 'Die Bise auf dem Genfersee und was sie auf dem Wasser ändert',
    desc: 'Woher die Bise kommt, wie man sie erkennt und ab wann sie das Baden und Paddeln stört, während Kitesurfer, Windsurfer und Foiler auf sie warten.',
    bref: 'Die Bise ist ein kalter, trockener Wind aus Nordosten. Für MeteoSchweiz ist sie <strong>der charakteristischste Wind des Genfersees</strong>: Sie stellt sich ein, wenn ein Hoch über den Britischen Inseln und ein Tief über Italien liegt. Sie wirft Wellen auf, die das Baden, Paddeln und Bootsfahren stören, ist aber ein Geschenk für Kitesurfer, Windsurfer und Foiler.',
    html: (L) => `
<h2>Woher kommt die Bise?</h2>
<p>Laut MeteoSchweiz stellt sich die Bise ein, wenn ein Hoch über den Britischen Inseln und ein Tief über Italien liegt. Die kalte Luft wird dann durch das Schweizer Mittelland gelenkt, das sich nach Westen verengt, und beschleunigt, wenn sie auf den Genfersee trifft.</p>
<h2>Aus welcher Richtung weht sie auf dem See?</h2>
<p>Auf dem Petit-Lac (Genfer Seite) und dem Grand-Lac weht die Bise aus <strong>Nordosten</strong>. Auf dem Haut-Lac wird sie von den Waadtländer Alpen gebremst, zur Rhonemündung hin abgelenkt und weht eher aus Nord-Nordwest (MeteoSchweiz). Die Société internationale de sauvetage du Léman (SISL) beschreibt sie als den häufigsten Wind des Sees und hält fest, dass die Temperatur bei ihrem Durchzug schnell sinkt.</p>
<h2>Woran erkennt man, ob heute Bise weht?</h2>
<p>Ein kalter, trockener Nordostwind, der auf dem See Schaumkronen bildet: das ist sie. In <a href="{app}">Mein See</a> spricht man von Bise, wenn der Wind aus Nordosten kommt (zwischen 20 und 80°) und mehr als 15 km/h weht; die App meldet sie dann oben auf dem Bildschirm. Der Windpfeil zeigt Badeplatz für Badeplatz, woher er weht.</p>
<h2>Kann man bei Bise baden oder paddeln?</h2>
<p>Bei starker Bise wartet man besser: Sie wirft Wellen auf und erzeugt Strömung nahe den exponierten Ufern. Das sind die Richtwerte der App (keine offiziellen Normen):</p>
<ul class="liste">
  <li><strong>Baden</strong>: Ab 25 km/h Bise geht die Note nicht über «Naja» hinaus.</li>
  <li><strong>Paddeln</strong>: Die Note sinkt, sobald die Böen 12 km/h überschreiten, und wird ab 28 km/h zu «Nein» (siehe <a href="{blog:paddle-leman}">Paddeln auf dem Genfersee</a>).</li>
  <li><strong>Bootsausflug</strong>: bei mehr als 25 km/h Bise auf «Naja» begrenzt.</li>
</ul>
<h2>Warum mögen Kitesurfer und Foiler die Bise?</h2>
<p>Weil sie ein stabiler und oft kräftiger Wind ist. In der App ist Kitesurfen zwischen 22 und 40 km/h Wind «Perfekt», Windsurfen zwischen 20 und 40 km/h. Beim Foilen ergibt eine Bise von mindestens 25 km/h die Note «Perfekt»: Das ist der Wind für <strong>Downwinds</strong>, die langen, von den Wellen getragenen Fahrten. Mehr dazu in <a href="{blog:kitesurf-windsurf-wingfoil-leman}">Kitesurfen, Windsurfen und Wingfoilen auf dem Genfersee</a>.</p>
`,
  },
  'temperature-lac-leman': {
    titre: 'Temperatur des Genfersees: woher die Zahlen kommen und warum sie schwanken',
    h1: 'Temperatur des Genfersees: wie sie bestimmt wird und warum sie schwankt',
    desc: 'Wie das Wasser des Genfersees in 70 cm Tiefe vor jedem Badeplatz berechnet wird, warum es in zwei Tagen mehrere Grad verlieren kann und wo man es live sieht.',
    bref: 'Mein See zeigt die Wassertemperatur <strong>in 70 cm Tiefe vor jedem der 65 Badeplätze</strong>, alle drei Stunden aus dem Alplakes-Modell der Eawag aktualisiert. Sie kann sich am selben Tag von Badeplatz zu Badeplatz um mehrere Grad unterscheiden und abrupt fallen, wenn ein starker Wind kaltes Tiefenwasser nach oben bringt: das ist das «Upwelling».',
    html: (L) => `
<h2>Wie wird die Temperatur des Genfersees berechnet?</h2>
<p>Die Zahlen stammen von <strong>Alplakes</strong>, der Plattform der Eawag (dem Wasserforschungsinstitut des ETH-Bereichs). Sie kombiniert numerische Seenmodelle und Satellitendaten, um die Wassertemperatur in verschiedenen Tiefen zu berechnen, mit Prognosen für mehrere Tage. Die Eawag nennt für grosse Seen einen Fehler von etwa 1 °C an der Oberfläche.</p>
<p>Mein See liest den Modellwert vor jedem Badeplatz in 70 cm Tiefe, alle drei Stunden. Die Daten sind unter der Lizenz CC BY 4.0 veröffentlicht.</p>
<h2>Warum 70 cm unter der Oberfläche?</h2>
<p>Weil das ungefähr das Wasser ist, in dem man schwimmt. Der allerobersten Film erwärmt oder kühlt sich mit Sonne und Luft sehr schnell ab; etwas tiefer ist der Wert stabiler und näher an dem, was man beim Hineingehen spürt.</p>
<h2>Warum ist das Wasser nicht überall gleich warm?</h2>
<p>Der Genfersee ist gross und tief, und der Wind verschiebt darin das Oberflächenwasser. Wenn ein starker Wind lange aus derselben Richtung weht, schiebt er das warme Oberflächenwasser weg; zum Ausgleich steigt kaltes Tiefenwasser nahe einzelner Ufer auf. Die Wissenschaft nennt dieses Phänomen <strong>Upwelling</strong>.</p>
<ul class="liste">
  <li>Im Juni 2025 fiel das Wasser bei Genf innert weniger Tage von 19 auf 11 °C, unter einem starken, anhaltenden Südwestwind; Alplakes hatte es mehrere Tage im Voraus vorhergesagt (Eawag).</li>
  <li>Der bekannte Rekord: Ende Juni 2017 fiel das Wasser an den <a href="{plage:bains-des-paquis}">Bains des Pâquis</a> innert zwei Tagen von 23 auf genau 8 °C (Eawag).</li>
</ul>
<p>Das Ergebnis: Am selben Tag können zwei Badeplätze mehrere Grad auseinanderliegen. <a href="#eau-du-jour">Der aktuelle Unterschied</a> wird weiter unten berechnet.</p>
<h2>Wo sieht man die Temperatur des Genfersees live?</h2>
<p>In der <a href="{app}">App Mein See</a>, gratis und ohne Konto, mit Wind, Bise und einem Urteil für jede Aktivität. Die <a href="{plages}">Liste der Badeplätze</a> bietet ausserdem eine Seite pro Badeplatz, von Genf bis Saint-Gingolph und von Évian bis Chens-sur-Léman.</p>
`,
  },
  'qualite-eau-baignade-leman': {
    titre: 'Badewasserqualität am Genfersee: wie man weiss, ob man baden kann',
    h1: 'Badewasserqualität am Genfersee: wie man sie prüft',
    desc: 'Wer das Wasser der Badeplätze am Genfersee untersucht, wie man die Einstufungen liest und warum eine Analyse vom August nichts über das Wasser im November sagt.',
    bref: 'Die Badewasserqualität des Genfersees wird von den Behörden überwacht: In Genf veröffentlicht der <strong>Kanton</strong> datierte Analysen Badeplatz für Badeplatz; rund um den See veröffentlicht die <strong>CIPEL</strong> eine Karte und eine Einstufung der Badeplätze. Eine Analyse gilt nur für den Moment, in dem sie gemacht wurde: Vor dem Baden muss man ihr Datum ansehen. Mein See zeigt eine Qualität nur an, wenn die Analyse weniger als 30 Tage alt ist, und verweist sonst auf die Quelle.',
    html: (L) => `
<h2>Wer kontrolliert die Wasserqualität der Badeplätze am Genfersee?</h2>
<p>In Genf untersucht der Kanton das Wasser der Strände und Badestellen und veröffentlicht die Ergebnisse; sie werden auch als offene Daten über das Genfer Raumdateninformationssystem (SITG) verbreitet. Für den ganzen See veröffentlicht die Internationale Kommission zum Schutz des Genfersees (CIPEL) eine Karte der Badeplätze mit ihrer Einstufung.</p>
<h2>Wie liest man die Einstufung eines Badeplatzes?</h2>
<p>Die Genfer Badeplätze werden in Kategorien eingeteilt, von «ausgezeichnetem bis gutem» Wasser bis zu Wasser «von mangelhafter Qualität», dazwischen «gut bis ausreichend» und «kann vorübergehend verschmutzt sein». Ist ein Badeplatz mit «kann vorübergehend verschmutzt sein» bewertet, sollte man besonders nach einem Gewitter nicht baden, wenn abfliessendes Regenwasser in den See gelangt. Wasser «von mangelhafter Qualität» bedeutet, dass vom Baden abgeraten wird.</p>
<h2>Warum ist das Datum der Analyse so wichtig?</h2>
<p>Weil sich das Wasser verändert: Regen, Gewitter, Wind und Temperatur verändern die Lage von einer Woche zur nächsten. Eine Probe vom Sommer sagt nichts über das Wasser im Herbst. Deshalb zeigt die <a href="{app}">App</a> die Qualität nur an, wenn die Analyse weniger als 30 Tage alt ist; die Jahreseinstufung sagt nichts über das Wasser von heute aus und wird deshalb nicht als solches angezeigt.</p>
<h2>Wo prüft man die Wasserqualität vor dem Baden?</h2>
<ul class="liste">
  <li><strong>Genfer Badeplätze</strong>: die Seite des Kantons zur Badewasserqualität.</li>
  <li><strong>Anderswo am See</strong>: die Badeplatzkarte der CIPEL.</li>
  <li>In der App führt ein Link am Seitenende je nach gewähltem Badeplatz zur richtigen Quelle.</li>
</ul>
<p>Die <a href="{plages}">Liste der Badeplätze</a> zeigt für jeden die Wassertemperatur und den Wind; für den Winter siehe auch <a href="{blog:bain-d-hiver-leman}">den Leitfaden zum Winterbaden</a>.</p>
`,
  },
  'plages-geneve': {
    titre: 'Wo in Genf baden: die Badeplätze des Kantons, einer nach dem anderen',
    h1: 'Wo in Genf baden: alle Badeplätze des Kantons',
    desc: 'Von den Bains des Pâquis bis Hermance: die Genfer Badeplätze am Genfersee mit ihren Buvetten und der Wassertemperatur von heute für jeden.',
    bref: 'Der Kanton Genf zählt <strong>15 Badeplätze und Badestellen, die Mein See verfolgt</strong>, von Pregny-Chambésy und Versoix am rechten Ufer bis Cologny, Corsier-Port und Hermance am linken Ufer, mit den Bains des Pâquis und Genève-Plage mitten in der Stadt. Jeder hat seine Seite mit der Wassertemperatur in 70 cm Tiefe und dem Wind von heute.',
    html: (L) => `
<h2>Welche Badeplätze gibt es in Genf?</h2>
<p>Hier sind alle Genfer Badeplätze, die die App verfolgt, mit einem Link auf ihre Seite (Wasser, Wind, Tagesurteil):</p>
${h.listePlages((s) => s.region === 'Genève', L)}
<h2>Wo kann man im Zentrum von Genf baden?</h2>
<p>Mitten in der Rade liegen die <a href="{plage:bains-des-paquis}">Bains des Pâquis</a> am rechten Ufer und der <a href="{plage:plage-des-eaux-vives}">Strand Eaux-Vives</a> am linken Ufer, beide nur wenige Schritte vom Zentrum. Etwas weiter am linken Ufer ergänzen <a href="{plage:geneve-plage}">Genève-Plage</a> und <a href="{plage:baby-plage}">Baby-Plage</a> das Angebot.</p>
<h2>Wo kann man in Genf am Wasser etwas trinken?</h2>
${h.listeLieux((x) => x.zone === 'geneve', L)}
<h2>Kann man überall baden?</h2>
<p>Vor dem Baden sollte man die Wasserqualität beim Kanton prüfen, der datierte Analysen Badeplatz für Badeplatz veröffentlicht: siehe <a href="{blog:qualite-eau-baignade-leman}">wie man die Wasserqualität prüft</a>. Im Winter praktizieren die Mutigsten das <a href="{blog:bain-d-hiver-leman}">Winterbaden</a>.</p>
`,
  },
  'paddle-leman': {
    titre: 'Paddeln auf dem Genfersee: wann der See ruhig genug ist und wo man mieten kann',
    h1: 'Paddeln auf dem Genfersee: wann los und wo mieten',
    desc: 'Ab welchem Wind das Paddeln auf dem Genfersee schwierig wird, wie man Böen liest und die Paddle-Verleiher von Genf bis Saint-Gingolph.',
    bref: 'Beim Paddeln zählen <strong>die Böen</strong>. In Mein See ist Paddeln «Perfekt» bis 12 km/h Böen, «Gut» bis 20 km/h, «Naja» bis 28 km/h und darüber nicht empfohlen; Regen oder Luft unter 8 °C kosten eine Stufe. Bei Bise bleibt man besser nahe am Ufer oder wartet.',
    html: (L) => `
<h2>Welcher Wind ist für das Paddeln maximal?</h2>
<p>Auf dem Board stehend bietet man dem Wind viel Angriffsfläche, und Wellen bringen einen schnell aus dem Gleichgewicht. Das sind die Richtwerte der <a href="{app}">App</a> (keine offiziellen Normen):</p>
<ul class="liste">
  <li><strong>Perfekt</strong>: Böen bis 12 km/h, der See ist ein Spiegel.</li>
  <li><strong>Gut</strong>: bis 20 km/h, ein paar Wellchen.</li>
  <li><strong>Naja</strong>: bis 28 km/h, es schaukelt.</li>
  <li><strong>Nein</strong>: darüber oder bei Gewitter.</li>
</ul>
<p>Regen oder Luft unter 8 °C kosten eine Stufe. Der Wind von heute steht Badeplatz für Badeplatz in der App; die <a href="{blog:bise-leman}">Bise</a> verdient besondere Aufmerksamkeit.</p>
<h2>Wo kann man auf dem Genfersee ein Paddle mieten?</h2>
${h.listeLoc(['paddle'], L)}
<p>Preise, Zeiten und Verfügbarkeit ändern sich: Frag vor dem Hingehen beim Verleih nach.</p>
<h2>Welchen Badeplatz wählt man für den Anfang?</h2>
<p>Einen Badeplatz mit leichtem Einstieg und einer vor dem Wind des Tages geschützten Stelle: Der Windpfeil auf jeder <a href="{plages}">Badeplatz-Seite</a> hilft, das am wenigsten exponierte Ufer zu wählen.</p>
`,
  },
  'kitesurf-windsurf-wingfoil-leman': {
    titre: 'Kitesurfen, Windsurfen und Wingfoilen auf dem Genfersee: der richtige Wind und die richtigen Spots',
    h1: 'Kitesurfen, Windsurfen und Wingfoilen auf dem Genfersee',
    desc: 'Welche Windstärke fürs Kitesurfen, Windsurfen und Foilen auf dem Genfersee, warum die Bise die besten Downwinds macht und wo man mieten oder lernen kann.',
    bref: 'Windsportarten brauchen einen stabilen Wind. In Mein See ist <strong>Kitesurfen</strong> «Perfekt» zwischen 22 und 40 km/h, <strong>Windsurfen</strong> zwischen 20 und 40 km/h und <strong>Foilen</strong> ab 12 km/h, für Downwinds bei Bise von mindestens 25 km/h. Die Bise, laut MeteoSchweiz der charakteristischste Nordostwind des Genfersees, ist ihr bester Verbündeter.',
    html: (L) => `
<h2>Welche Windstärke für welche Disziplin?</h2>
<ul class="liste">
  <li><strong>Kitesurfen</strong>: «Perfekt» von 22 bis 40 km/h, «Gut» von 16 bis 45 km/h; eine Note weniger, wenn die Böen den mittleren Wind um mehr als 20 km/h übersteigen, und «Nein» ab 55 km/h Böen.</li>
  <li><strong>Windsurfen</strong>: «Perfekt» von 20 bis 40 km/h, «Gut» von 15 bis 45 km/h; es verträgt Böen besser, bis 60 km/h.</li>
  <li><strong>Foilen</strong>: wenig Wind genügt, «Perfekt» von 12 bis 30 km/h; ohne Wind bleibt das Pump-Foilen.</li>
</ul>
<p>Das sind die Richtwerte der <a href="{app}">App</a>, keine Normen: Das Niveau jedes Einzelnen und die Grösse des Materials zählen ebenso viel.</p>
<h2>Warum ist die Bise ideal für Downwinds?</h2>
<p>Die <a href="{blog:bise-leman}">Bise</a> weht aus Nordosten, gleichmässig und oft stark, und wirft eine Dünung auf, die über den See läuft. Beim Foilen ergibt eine Bise von mindestens 25 km/h die Note «Perfekt»: genug für lange, von den Wellen getragene Fahrten. Auf dem Haut-Lac dreht sie auf Nord-Nordwest (MeteoSchweiz).</p>
<h2>Wo kann man Windsurfen und Wingfoilen mieten oder lernen?</h2>
${h.listeLoc(['windsurf', 'wing'], L)}
<p>Fürs Kitesurfen haben wir noch keinen geprüften Verleih; die Spots wählt man nach der Windrichtung, die auf jeder <a href="{plages}">Badeplatz-Seite</a> zu sehen ist.</p>
`,
  },
  'wakeboard-wakesurf-ski-nautique-leman': {
    titre: 'Wakeboard, Wakesurf und Wasserski auf dem Genfersee: die Schulen und Clubs',
    h1: 'Wakeboard, Wakesurf und Wasserski auf dem Genfersee',
    desc: 'Von Pregny bis Thonon: die Schulen und Clubs, die das Boot für Wakeboard, Wakesurf und Wasserski rausnehmen, und warum es einen glatten See braucht.',
    bref: 'Hinter einem Boot macht <strong>ein glatter See</strong> eine schöne Session: In Mein See sind Wakeboard und Wasserski «Perfekt» bis 15 km/h Böen, Wakesurf bis 10 km/h. Laut dem Kanton Genf ist die Ausübung auf dem Genfersee frei, unter Einhaltung der Sicherheitsregeln. Geprüfte Schulen und Clubs unten, von Genf bis Montreux und am französischen Ufer.',
    html: (L) => `
<h2>Warum braucht es einen glatten See?</h2>
<p>Wakeboard und Wasserski fährt man vom Boot gezogen; Wakesurfen dagegen surft man ohne Seil auf der Welle des Kielwassers. Kabbelwasser verwischt diese Welle und macht das Gleiten unangenehm. Die Richtwerte der <a href="{app}">App</a>:</p>
<ul class="liste">
  <li><strong>Wakeboard und Wasserski</strong>: «Perfekt» bis 15 km/h Böen, «Gut» bis 25, «Naja» bis 32.</li>
  <li><strong>Wakesurf</strong>: anspruchsvoller, «Perfekt» bis 10 km/h, «Gut» bis 18, «Naja» bis 25.</li>
</ul>
<p>Regen oder Luft unter 10 °C kosten eine Stufe. Ruhige Morgen sind oft die besten.</p>
<h2>Wo kann man Wakeboard, Wakesurf oder Wasserski machen?</h2>
${h.listeLoc(['wakeboard', 'wakesurf', 'ski'], L)}
<p>Tarife, Saisons und Zeiten sind bei jeder Schule zu prüfen.</p>
<h2>Braucht man einen Ausweis?</h2>
<p>Bei einer Ausfahrt mit einer Schule oder einem Fahrer nein: Er steuert das Boot. Der Kanton Genf hält fest, dass die Ausübung auf dem Genfersee frei ist und die Regeln die Sicherheit der anderen Nutzer bezwecken; sie betreffen vor allem diejenigen, die ihr eigenes Boot benutzen.</p>`,
  },
  'buvettes-restaurants-bord-du-leman': {
    titre: 'Buvetten und Restaurants am Genfersee: unsere Adressen mit den Füssen im Wasser',
    h1: 'Buvetten und Restaurants am Genfersee, Region für Region',
    desc: 'Die Terrassen am Wasser in Genf, an der Côte, in Lausanne, an der Riviera und am französischen Ufer, mit ihren Öffnungssaisons.',
    bref: 'Mein See verzeichnet <strong>' + h.nbLieux + ' Buvetten und Restaurants am Genfersee</strong>, geprüft bei den Tourismusbüros und auf den Websites der Orte: von den Bains des Pâquis in Genf bis zu den Quais von Vevey, von der Guinguette de Vidy bis zum Strand von Sciez. Viele Buvetten sind nur in der schönen Jahreszeit geöffnet: Die Zeit ist angegeben, wenn sie bekannt ist.',
    html: (L) => `
<h2>Wo kann man am Genfersee etwas trinken oder essen?</h2>
${h.listeLieux(() => true, L)}
<h2>Sind die Buvetten das ganze Jahr geöffnet?</h2>
<p>Nein: Viele öffnen nur von April oder Mai bis September, je nach Wetter. Die obigen Saisons stammen von den Tourismusbüros oder den Websites der Orte; Zeiten und Saisons ändern sich, ein Anruf vor dem Hingehen erspart Enttäuschungen. Der Reiter «Ausgehen» der <a href="{app}">App</a> zeigt ausserhalb der Saison «Geschlossen bis…» an.</p>
<h2>Fehlt ein Ort?</h2>
<p>Der Reiter «Ausgehen» der App bietet ein kleines Formular, um eine Adresse vorzuschlagen; sie wird vor der Aufnahme geprüft. Um den Badeplatz nebenan zu wählen, siehe die <a href="{plages}">Liste der Badeplätze</a> und, in Genf, <a href="{blog:plages-geneve}">alle Badeplätze des Kantons</a>.</p>`,
  },
  'plages-leman-rive-francaise': {
    titre: 'Badeplätze am Genfersee auf der französischen Seite: von Évian bis Chens-sur-Léman',
    h1: 'Die Badeplätze am Genfersee auf der französischen Seite, von Évian bis Chens-sur-Léman',
    desc: 'Die Badeplätze am französischen Ufer des Genfersees, von Meillerie bis Chens-sur-Léman, mit der Wassertemperatur von heute, den Restaurants und den Wake-Schulen in der Nähe.',
    bref: 'Mein See verfolgt <strong>' + h.nbRive + ' Badeplätze am französischen Ufer des Genfersees</strong>, in Haute-Savoie: von Meillerie und Évian im Osten bis Yvoire, Messery und Chens-sur-Léman nahe der Genfer Grenze. Jeder hat seine Seite mit dem Wasser in 70 cm Tiefe und dem Wind von heute; die Wasserqualität prüft man auf der Badeplatzkarte der CIPEL.',
    html: (L) => `
<h2>Welche Badeplätze gibt es am französischen Ufer?</h2>
${h.listePlages((s) => s.region === 'Rive française', L)}
<h2>Wo kann man auf der französischen Seite am Wasser essen?</h2>
${h.listeLieux((x) => x.zone === 'evian', L)}
<h2>Was kann man auf der französischen Seite auf dem Wasser machen?</h2>
${h.listeLoc(['paddle', 'kayak', 'pedalo', 'bateau', 'wakeboard', 'wakesurf', 'ski', 'wing'], L, (l) => h.SPOTS.find((s) => s.id === l.spot)?.region === 'Rive française')}
<h2>Wie prüft man die Wasserqualität?</h2>
<p>Für die französischen Badeplätze hat die App keine aktuelle Analyse: Sie verweist auf die Badeplatzkarte der CIPEL. Siehe <a href="{blog:qualite-eau-baignade-leman}">wie man die Wasserqualität prüft</a>. Die Tagestemperatur jedes Badeplatzes steht in der <a href="{app}">App</a>.</p>`,
  },
  'choc-thermique-eau-froide': {
    titre: 'Kälteschock: die ersten 90 Sekunden im kalten Wasser des Genfersees',
    h1: 'Kälteschock: die ersten 90 Sekunden im kalten Wasser gut überstehen',
    desc: 'Was der Körper beim Einstieg in 10 °C kaltes Wasser tut, warum man nicht springen sollte, wie man in der ersten Minute atmet und warum man vor dem Start zum Arzt geht.',
    bref: 'Beim Einstieg in kaltes Wasser reagiert der Körper mit einem <strong>Kälteschock</strong>: keuchende Atmung, die man nicht mehr kontrolliert, rasendes Herz, steigender Blutdruck. Laut RNLI dauert dieser Schock etwa <strong>60 bis 90 Sekunden</strong>; es ist der riskanteste Moment. Daher die Regeln: vor dem Start zum Arzt, nie springen, langsam einsteigen und die Atmung kontrollieren, nie allein sein und, wer unfreiwillig im Wasser landet, auf dem Rücken treiben, bis der Schock vorbei ist.',
    html: (L) => `
<h2>Was passiert im Körper beim Einstieg ins kalte Wasser?</h2>
<p>Bei Kontakt mit kaltem Wasser löst die Haut eine Reflexreaktion aus: ein starkes, unwillkürliches Einatmen, dann schnelles und schwer zu beherrschendes Atmen; das Herz beschleunigt und der Blutdruck steigt. Die RNLI, der britische Seenotrettungsdienst, nennt dieses Phänomen <em>cold water shock</em> und erinnert daran, dass ein grosser Teil der Todesfälle im kalten Wasser in den ersten Minuten durch diesen Schock eintritt und nicht durch Unterkühlung.</p>
<h2>Wie lange dauert der Kälteschock?</h2>
<p>Laut RNLI etwa 60 bis 90 Sekunden. Danach beruhigt sich die Atmung und man hat sich wieder im Griff. Deshalb bleibt man die ersten Male nahe am Ufer und versucht nicht, sofort zu schwimmen.</p>
<h2>Warum sollte man nicht springen?</h2>
<p>Weil ein Reflex-Einatmen mit dem Kopf unter Wasser dazu führen kann, dass man Wasser schluckt. Die Schweizerische Lebensrettungs-Gesellschaft (SLRG) empfiehlt, langsam einzusteigen, nicht zu springen, den Kopf über Wasser zu halten und eine Mütze zu tragen.</p>
<h2>Wie steigt man Schritt für Schritt ins kalte Wasser?</h2>
<ul class="liste">
  <li><strong>Mit jemandem</strong>: eine Begleitung am Ufer oder im Wasser (SLRG, BFU).</li>
  <li><strong>Langsam</strong>, gehend, mit langem Ausatmen, um die Atmung gleichmässig zu halten.</li>
  <li><strong>Kurz</strong>: Die ersten Male genügen einige Dutzend Sekunden bis ein oder zwei Minuten; die SLRG legt das Maximum auf so viele Minuten wie Grad fest.</li>
  <li><strong>Raus</strong> beim kleinsten Unwohlsein, bei starkem Zittern oder tauben Fingern.</li>
</ul>
<h2>Was tun, wenn man ins kalte Wasser fällt?</h2>
<p>Die RNLI lehrt den Reflex <strong>«Float to Live»</strong>: nicht um sich schlagen, den Kopf nach hinten legen, Ohren im Wasser, Arme und Beine ausstrecken und ruhig atmen, bis der Schock vorbei ist, dann um Hilfe rufen oder zum Ufer zurückkehren. Eine Studie der Universität Portsmouth hat gezeigt, dass diese Anweisungen auch wenig erfahrenen Personen helfen, in See und Meer zu treiben.</p>
<h2>Sollte man vor dem Start zum Arzt?</h2>
<p>Ja, das ist der erste Reflex: Der Kälteschock belastet das Herz stark. Bei Herzproblemen oder Bluthochdruck holt man vor dem ersten Bad ärztlichen Rat ein. Manche Schwimmer gewöhnen sich auch daran, indem sie ihre Duschen mit einigen Dutzend Sekunden kaltem Wasser beenden und diese nach und nach verlängern; das ist keine Garantie, nur eine sanfte Art, das Gefühl kennenzulernen.</p>
<p>Zum Weiterlesen: <a href="{blog:materiel-bain-d-hiver}">die Ausrüstung fürs Winterbaden</a> und <a href="{blog:afterdrop-se-rechauffer}">sich nach dem Bad aufwärmen</a>. Das Wasser von heute steht Badeplatz für Badeplatz in der <a href="{app}">App</a>.</p>`,
  },
  'materiel-bain-d-hiver': {
    titre: 'Ausrüstung fürs Winterbaden: die vollständige Liste vor dem Gang an den Genfersee',
    h1: 'Die Ausrüstung fürs Winterbaden, von Kopf bis Fuss',
    desc: 'Mütze, Neopren-Schuhe und -Handschuhe, Schwimmboje, Unterlage zum Umziehen, Cape und Thermosflasche: alles, was man für ein Winterbad im Genfersee mitnehmen sollte, und warum.',
    bref: 'Für ein Winterbad passt das Wesentliche in eine Tasche: <strong>ein Badeanzug oder eine Badehose, eine Mütze, Schuhe und eventuell Neopren-Handschuhe</strong> (Füsse und Hände kühlen schnell aus), <strong>eine Schwimmboje</strong>, um gesehen zu werden und sich auszuruhen, und für den Ausstieg <strong>ein Handtuch, ein Cape oder ein warmer Bademantel, leicht anzuziehende Kleidung, eine Unterlage zum Umziehen und ein warmes Getränk</strong>. Und vor allem eine Begleitung.',
    html: (L) => `
<h2>Was trägt man im kalten Wasser?</h2>
<ul class="liste">
  <li><strong>Einen bequemen Badeanzug oder eine Badehose</strong>, oder einen Anzug, wenn man länger schwimmen will.</li>
  <li><strong>Eine Mütze</strong> aus Silikon oder Neopren: Die Schweizerische Lebensrettungs-Gesellschaft empfiehlt, eine Mütze zu tragen und den Kopf über Wasser zu halten.</li>
  <li><strong>Neopren-Schuhe</strong>: Die Füsse leiden schnell unter der Kälte, und die Kiesel des Genfersees verzeihen nichts.</li>
  <li><strong>Neopren-Handschuhe</strong>, wenn die Hände taub werden; je dicker, desto besser der Schutz, aber desto weniger Geschick in den Fingern. Die Outdoor Swimming Society nennt sie zusammen mit den Schuhen unter den nützlichen Winterzubehörteilen.</li>
  <li><strong>Eine farbige Schwimmboje</strong>: Die Beratungsstelle für Unfallverhütung (BFU) empfiehlt sie im Freiwasser, um gesehen zu werden und sich bei Bedarf festhalten zu können.</li>
</ul>
<h2>Was braucht man für den Ausstieg?</h2>
<ul class="liste">
  <li><strong>Ein grosses Handtuch</strong> und ein <strong>Cape oder einen warmen Bademantel</strong>, um sich windgeschützt umzuziehen.</li>
  <li><strong>Weite, leicht anzuziehende Kleidung</strong> für kalte Finger: mehrere Schichten, keine komplizierten Knöpfe, Mütze und warme Socken.</li>
  <li><strong>Eine Unterlage zum Umziehen</strong>, um nicht mit den Füssen auf Steine oder gefrorenes Gras zu treten.</li>
  <li><strong>Eine Thermosflasche mit einem warmen Getränk</strong>: Die SLRG rät zu einem lauwarmen Getränk, um sich von innen aufzuwärmen. Kein Alkohol.</li>
</ul>
<h2>Welche Ausrüstung ist die wichtigste?</h2>
<p>Eine Begleitung. SLRG und BFU sind eindeutig: Man schwimmt nie allein im Freiwasser, erst recht nicht im kalten Wasser. Der Rest der Ausrüstung macht das Bad angenehmer; die Anwesenheit von jemandem macht es sicherer.</p>
<h2>Wo kann man diese Ausrüstung in der Nähe des Genfersees kaufen oder mieten?</h2>
<p>Die Sport- und Surfgeschäfte der Region bieten Mützen, Schuhe und Handschuhe aus Neopren an. Zum Aufwärmen vor Ort haben manche Orte eine Sauna, etwa die Bains des Rives in Bellerive (Lausanne) im Winter: siehe den <a href="{blog:bain-d-hiver-leman}">Leitfaden zum Winterbaden</a>.</p>
<p>Vor dem Aufbruch: <a href="{blog:choc-thermique-eau-froide}">die ersten 90 Sekunden im kalten Wasser</a>. Beim Ausstieg: <a href="{blog:afterdrop-se-rechauffer}">sich gut aufwärmen</a>. Das Wasser von heute steht in der <a href="{app}">App</a>.</p>`,
  },
  'afterdrop-se-rechauffer': {
    titre: 'Afterdrop: warum man nach einem Winterbad noch mehr friert und wie man sich aufwärmt',
    h1: 'Afterdrop: sich nach einem Winterbad gut aufwärmen',
    desc: 'Warum der Körper nach dem Ausstieg noch etwa zehn Minuten weiter auskühlt, wie man sich umzieht, was man trinkt und was man besser vermeidet, etwa die heisse Dusche.',
    bref: 'Der <strong>Afterdrop</strong> ist die Abkühlung, die <strong>nach</strong> dem Ausstieg aus dem Wasser weitergeht: Zehn Minuten nach dem Ausstieg kann man mehr frieren als im Moment des Ausstiegs, mit Zittern, bis hin zu Schwindel. Um sich gut aufzuwärmen: abtrocknen und sich schnell und warm anziehen, ein lauwarmes Getränk trinken, sich sanft ohne grosse Anstrengung bewegen und etwa eine Viertelstunde im Warmen und in Ruhe bleiben. Die Schweizerische Lebensrettungs-Gesellschaft rät von der heissen Dusche direkt danach ab.',
    html: (L) => `
<h2>Was ist der Afterdrop?</h2>
<p>Das ist das Weitersinken der Körpertemperatur, obwohl man bereits aus dem Wasser gestiegen ist und im Trockenen steht. Die Ratgeber zum Freiwasserschwimmen setzen es oft etwa zehn Minuten nach dem Ausstieg an; nach einem langen Bad kann es länger dauern. Man spürt ihn als Kältewelle, verstärktes Zittern, manchmal Schwindel.</p>
<h2>Wie wärmt man sich nach einem Winterbad auf?</h2>
<ul class="liste">
  <li><strong>Sofort umziehen</strong>: den nassen Badeanzug ausziehen, abtrocknen und warme, trockene Kleidung anziehen, windgeschützt (SLRG).</li>
  <li><strong>Kopf, Hände und Füsse bedecken</strong>: Mütze, Handschuhe, warme Socken.</li>
  <li><strong>Warm trinken</strong>: Die SLRG empfiehlt ein lauwarmes Getränk, um sich von innen aufzuwärmen.</li>
  <li><strong>Sich sanft bewegen</strong>: gehen, auf der Stelle treten. Die SLRG rät von grossen Anstrengungen ab, und intensive Bewegung kann den Afterdrop verstärken (DAN Alert Diver).</li>
  <li><strong>Etwa eine Viertelstunde im Warmen und in Ruhe bleiben</strong>, bevor man weiterfährt, besonders mit dem Velo oder am Steuer.</li>
</ul>
<h2>Warum direkt danach nicht heiss duschen?</h2>
<p>Die Schweizerische Lebensrettungs-Gesellschaft rät direkt nach einem Bad in kaltem Wasser davon ab. Man wärmt sich zuerst auf, indem man sich anzieht und warm trinkt; die Dusche kommt später, wenn der Körper wieder auf normaler Temperatur ist.</p>
<h2>Wann sollte man sich Sorgen machen?</h2>
<p>Wenn das Zittern nicht aufhört oder die Person verwirrt, ungeschickt oder schläfrig wird, muss man sie ins Warme bringen und die Rettung rufen (144 in der Schweiz, 15 oder 112 in Frankreich): Das sind Anzeichen einer Unterkühlung, die eine begleitete Erwärmung erfordert.</p>
<p>Lesenswert auch: <a href="{blog:choc-thermique-eau-froide}">die ersten 90 Sekunden im kalten Wasser</a> und <a href="{blog:materiel-bain-d-hiver}">die Ausrüstung fürs Winterbaden</a>. Der <a href="{blog:bain-d-hiver-leman}">Leitfaden zum Winterbaden</a> nennt die Badeplätze und Saunen am Genfersee.</p>`,
  },
});
