// Articles du blog en italien : slug -> { titre, h1, desc, bref, html }. Même structure que les articles français ;
// h = assistants de articles.mjs (listes générées depuis les données de l'app).
export const creerIt = (h) => ({
  'bain-d-hiver-leman': {
    titre: 'Bagno invernale nel Lemano: iniziare bene a Ginevra e a Losanna',
    h1: 'Bagno invernale nel Lemano: iniziare bene',
    desc: 'Quanto restare in acqua, come entrare, dove fare il bagno e scaldarsi a Ginevra e a Losanna: la guida al bagno invernale nel Lemano, con l’acqua del giorno spiaggia per spiaggia.',
    bref: 'Il bagno invernale nel Lemano si fa quando l’acqua scende sotto i 15 °C, grosso modo da ottobre a maggio. La Società svizzera di salvataggio (SSS) dà una regola semplice: <strong>non restare in acqua più minuti di quanti gradi ha l’acqua</strong> (5 °C = 5 minuti al massimo). Entrare lentamente, tenere la testa fuori dall’acqua con una cuffia, non andare mai da soli, uscire al minimo malessere, poi asciugarsi e vestirsi con abiti caldi, senza doccia calda.',
    html: (L) => `
<h2>Quanto si può restare in acqua fredda?</h2>
<p>La scheda «Nuotare in acqua fredda» della SSS propone un riferimento facile da ricordare: la temperatura dell’acqua in gradi dà la durata massima del bagno in minuti. A 10 °C non si supera i 10 minuti; a 5 °C, 5 minuti. È un massimo, non un obiettivo: le prime volte bastano poche bracciate.</p>
<p><a href="#eau-du-jour">L’acqua del giorno</a> è mostrata più in basso e, spiaggia per spiaggia, nell’<a href="{app}">app Il mio lago</a>.</p>
<h2>Come entrare in acqua fredda senza rischi?</h2>
<ul class="liste">
  <li><strong>Entrare lentamente</strong> per lasciare al corpo il tempo di abituarsi, senza saltare né tuffarsi.</li>
  <li><strong>Tenere la testa fuori dall’acqua</strong> e indossare una cuffia.</li>
  <li><strong>Non andare mai da soli</strong>: l’Ufficio prevenzione infortuni (UPI) raccomanda anche un ausilio al galleggiamento, come una boa da nuoto.</li>
  <li><strong>Uscire subito</strong> se ci si sente male.</li>
  <li><strong>Essere in buona forma fisica</strong>: la SSS ricorda che l’acqua fredda lo richiede. In caso di dubbi sulla propria salute, se ne parla con il medico prima di cominciare.</li>
</ul>
<h2>Cosa fare quando si esce dall’acqua?</h2>
<p>Asciugarsi bene e indossare subito vestiti caldi e asciutti. La SSS sconsiglia la doccia calda subito dopo, i luoghi esposti al vento e gli sforzi intensi. Una bevanda tiepida aiuta a scaldarsi dall’interno.</p>
<h2>Dove fare il bagno d’inverno a Ginevra e a Losanna?</h2>
<p><strong>Ginevra.</strong> I <a href="{plage:bains-des-paquis}">Bains des Pâquis</a> restano il ritrovo dei nuotatori invernali; il loro chiosco è aperto tutto l’anno, con la fonduta in inverno. A dicembre la Coupe de Noël si nuota nella rada. Per scaldarsi in un altro modo, Sauna Boats Genève propone una sauna galleggiante con partenza dal Quai Gustave-Ador, vicino alla <a href="{plage:plage-des-eaux-vives}">spiaggia delle Eaux-Vives</a>.</p>
<p><strong>Losanna.</strong> A Bellerive, da ottobre a marzo i Bains des Rives allestiscono saune in yurta in riva al lago, con un tuffo nel Lemano tra una seduta e l’altra, vicino alla <a href="{plage:lausanne-bellerive}">spiaggia di Bellerive</a>.</p>
<p>L’<a href="{plages}">elenco di tutte le spiagge</a> indica temperatura e vento di ciascuna.</p>
<h2>Dove scaldarsi in una sauna in riva al Lemano?</h2>
${h.listeLoc(['sauna'], L)}
<p>Orari, prezzi e prenotazione cambiano da una stagione all’altra: da verificare presso ogni locale.</p>
<h2>Come ti aiuta Il mio lago nel bagno invernale?</h2>
<p>Da ottobre a maggio, non appena l’acqua è sotto i 15 °C, il riquadro «Balneazione» dell’app diventa «Bagno invernale». Il suo voto dipende soprattutto dal vento: l’acqua fredda è lo scopo, le raffiche e le onde molto meno. La <strong>sfida bagno invernale</strong> conserva la data, la spiaggia e la temperatura di ogni bagno, e lo storico si condivide con un gesto. Per approfondire: <a href="{blog:choc-thermique-eau-froide}">i primi 90 secondi in acqua fredda</a>, <a href="{blog:materiel-bain-d-hiver}">l’attrezzatura</a> e <a href="{blog:afterdrop-se-rechauffer}">scaldarsi dopo il bagno</a>. Per i numeri, vedi <a href="{blog:temperature-lac-leman}">come viene calcolata la temperatura del Lemano</a>.</p>
`,
  },
  'bise-leman': {
    titre: 'La bise sul Lemano: cosa cambia per balneazione, paddle e kite',
    h1: 'La bise sul Lemano e cosa cambia sull’acqua',
    desc: 'Da dove viene la bise, come riconoscerla e da quando disturba balneazione e paddle, mentre kitesurfisti, windsurfisti e foiler la aspettano.',
    bref: 'La bise è un vento freddo e secco che soffia da nord-est. Per MeteoSvizzera è <strong>il vento più caratteristico del Lemano</strong>: si instaura quando un’alta pressione copre le Isole Britanniche e una bassa pressione l’Italia. Solleva onde che disturbano balneazione, paddle e gite in barca, ma fa la felicità di kitesurfisti, windsurfisti e foiler.',
    html: (L) => `
<h2>Da dove viene la bise?</h2>
<p>Secondo MeteoSvizzera, la bise si instaura quando un’alta pressione copre le Isole Britanniche e una bassa pressione l’Italia. L’aria fredda viene allora incanalata dall’Altopiano svizzero, che si restringe verso ovest, e accelera arrivando sul Lemano.</p>
<h2>Da dove soffia sul lago?</h2>
<p>Sul Petit-Lac (lato Ginevra) e sul Grand-Lac, la bise soffia da <strong>nord-est</strong>. Sull’Haut-Lac, rallentata dalle Alpi vodesi, viene deviata verso la foce del Rodano e soffia piuttosto da nord-nord-ovest (MeteoSvizzera). La Société internationale de sauvetage du Léman (SISL) la descrive come il vento più frequente del lago e nota che la temperatura scende in fretta al suo passaggio.</p>
<h2>Come sapere se oggi c’è la bise?</h2>
<p>Un vento da nord-est, freddo e secco, che forma i cavalloni sul lago: è lei. In <a href="{app}">Il mio lago</a> si parla di bise quando il vento viene da nord-est (tra 20 e 80°) e supera i 15 km/h; l’app la segnala allora in alto sullo schermo. La freccia del vento, spiaggia per spiaggia, mostra da dove soffia.</p>
<h2>Si può fare il bagno o il paddle con la bise?</h2>
<p>Con bise forte è meglio aspettare: solleva onde e corrente vicino alle rive esposte. Ecco i riferimenti dell’app (non sono norme ufficiali):</p>
<ul class="liste">
  <li><strong>Balneazione</strong>: oltre i 25 km/h di bise, il voto non supera «Così così».</li>
  <li><strong>Paddle</strong>: il voto scende non appena le raffiche superano i 12 km/h, e diventa «No» oltre i 28 km/h (vedi <a href="{blog:paddle-leman}">il paddle sul Lemano</a>).</li>
  <li><strong>Gita in barca</strong>: limitata a «Così così» quando la bise supera i 25 km/h.</li>
</ul>
<h2>Perché kitesurfisti e foiler amano la bise?</h2>
<p>Perché è un vento stabile e spesso sostenuto. Nell’app, il kitesurf è «Perfetto» tra 22 e 40 km/h di vento, il windsurf tra 20 e 40 km/h. Per il foil, una bise di almeno 25 km/h dà il voto «Perfetto»: è il vento dei <strong>downwind</strong>, le lunghe discese portate dalle onde. Più dettagli in <a href="{blog:kitesurf-windsurf-wingfoil-leman}">kitesurf, windsurf e wingfoil sul Lemano</a>.</p>
`,
  },
  'temperature-lac-leman': {
    titre: 'Temperatura del Lemano: da dove vengono i numeri e perché variano',
    h1: 'Temperatura del Lemano: come viene misurata e perché varia',
    desc: 'Come viene calcolata l’acqua del Lemano a 70 cm davanti a ogni spiaggia, perché può perdere diversi gradi in due giorni e dove consultarla in diretta.',
    bref: 'Il mio lago mostra la temperatura dell’acqua <strong>a 70 cm sotto la superficie, davanti a ciascuna delle 65 spiagge</strong>, aggiornata ogni tre ore dal modello Alplakes dell’Eawag. Può differire di diversi gradi da una spiaggia all’altra nello stesso giorno, e crollare bruscamente quando un vento forte fa risalire l’acqua fredda del fondo: è l’«upwelling».',
    html: (L) => `
<h2>Come viene calcolata la temperatura del Lemano?</h2>
<p>I numeri vengono da <strong>Alplakes</strong>, la piattaforma dell’Eawag (l’istituto di ricerca sull’acqua del Politecnico federale). Combina modelli numerici dei laghi e dati satellitari per calcolare la temperatura dell’acqua a diverse profondità, con previsioni su più giorni. L’Eawag indica, per i grandi laghi, un errore di circa 1 °C in superficie.</p>
<p>Il mio lago legge il valore del modello davanti a ogni spiaggia, a 70 cm di profondità, ogni tre ore. I dati sono pubblicati con licenza CC BY 4.0.</p>
<h2>Perché 70 cm sotto la superficie?</h2>
<p>Perché è più o meno l’acqua in cui si nuota. La primissima pellicola di superficie si scalda o si raffredda molto in fretta con il sole e l’aria; un po’ più in basso il valore è più stabile e più vicino a ciò che si sente entrando.</p>
<h2>Perché l’acqua non ha la stessa temperatura ovunque?</h2>
<p>Il Lemano è grande e profondo, e il vento vi sposta l’acqua di superficie. Quando un vento forte soffia a lungo nella stessa direzione, spinge l’acqua calda di superficie; per compensare, acqua fredda profonda risale vicino ad alcune rive. Gli scienziati chiamano questo fenomeno <strong>upwelling</strong>.</p>
<ul class="liste">
  <li>Nel giugno 2025 l’acqua è passata da 19 a 11 °C in pochi giorni vicino a Ginevra, sotto un vento forte e persistente da sud-ovest; Alplakes l’aveva previsto con diversi giorni di anticipo (Eawag).</li>
  <li>Il record noto: a fine giugno 2017 l’acqua dei <a href="{plage:bains-des-paquis}">Bains des Pâquis</a> è passata da 23 a soli 8 °C in due giorni (Eawag).</li>
</ul>
<p>Risultato: lo stesso giorno, due spiagge possono mostrare diversi gradi di differenza. <a href="#eau-du-jour">Lo scarto del momento</a> è calcolato qui sotto.</p>
<h2>Dove vedere la temperatura del Lemano in diretta?</h2>
<p>Nell’<a href="{app}">app Il mio lago</a>, gratuita e senza account, con vento, bise e un verdetto per ogni attività. L’<a href="{plages}">elenco delle spiagge</a> offre anche una pagina per ogni spiaggia, da Ginevra a Saint-Gingolph e da Évian a Chens-sur-Léman.</p>
`,
  },
  'qualite-eau-baignade-leman': {
    titre: 'Qualità dell’acqua di balneazione nel Lemano: come sapere se si può fare il bagno',
    h1: 'Qualità dell’acqua di balneazione nel Lemano: come verificarla',
    desc: 'Chi analizza l’acqua delle spiagge del Lemano, come leggere le classificazioni e perché un’analisi di agosto non dice nulla sull’acqua di novembre.',
    bref: 'La qualità dell’acqua di balneazione del Lemano è monitorata dalle autorità: a Ginevra il <strong>cantone</strong> pubblica analisi datate spiaggia per spiaggia; intorno al lago la <strong>CIPEL</strong> pubblica una mappa e una classificazione delle spiagge. Un’analisi vale solo per il momento in cui è stata fatta: prima di fare il bagno bisogna guardarne la data. Il mio lago mostra una qualità solo se l’analisi ha meno di 30 giorni, altrimenti rimanda alla fonte.',
    html: (L) => `
<h2>Chi controlla la qualità dell’acqua delle spiagge del Lemano?</h2>
<p>A Ginevra il cantone analizza l’acqua delle spiagge e dei luoghi di balneazione e ne pubblica i risultati; sono diffusi anche come dati aperti dal sistema informativo del territorio ginevrino (SITG). Per l’insieme del lago, la Commissione internazionale per la protezione delle acque del Lemano (CIPEL) pubblica una mappa delle spiagge con la loro classificazione.</p>
<h2>Come leggere la classificazione di una spiaggia?</h2>
<p>Le spiagge ginevrine sono classificate in categorie, dall’acqua «eccellente o buona» all’acqua «di scarsa qualità», passando per «buona o sufficiente» e «può essere temporaneamente inquinata». Quando una spiaggia è valutata «può essere temporaneamente inquinata», conviene evitare il bagno soprattutto dopo un temporale, quando le acque di dilavamento arrivano al lago. Un’acqua «di scarsa qualità» significa che la balneazione è sconsigliata.</p>
<h2>Perché la data dell’analisi conta tanto?</h2>
<p>Perché l’acqua cambia: pioggia, temporali, vento e temperatura modificano la situazione da una settimana all’altra. Un prelievo estivo non dice nulla sull’acqua in autunno. Per questo l’<a href="{app}">app</a> mostra la qualità solo se l’analisi ha meno di 30 giorni; la classificazione annuale non dice nulla sull’acqua del giorno e quindi non è mostrata come tale.</p>
<h2>Dove verificare la qualità dell’acqua prima del bagno?</h2>
<ul class="liste">
  <li><strong>Spiagge ginevrine</strong>: la pagina del cantone dedicata alla qualità dell’acqua di balneazione.</li>
  <li><strong>Altrove sul lago</strong>: la mappa delle spiagge della CIPEL.</li>
  <li>Nell’app, un link in fondo alla pagina rimanda alla fonte giusta in base alla spiaggia scelta.</li>
</ul>
<p>L’<a href="{plages}">elenco delle spiagge</a> indica per ciascuna la temperatura dell’acqua e il vento; per l’inverno, vedi anche <a href="{blog:bain-d-hiver-leman}">la guida al bagno invernale</a>.</p>
`,
  },
});
