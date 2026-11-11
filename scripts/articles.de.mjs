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
});
