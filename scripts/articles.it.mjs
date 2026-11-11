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
  'plages-geneve': {
    titre: 'Dove fare il bagno a Ginevra: le spiagge del cantone, una per una',
    h1: 'Dove fare il bagno a Ginevra: tutte le spiagge del cantone',
    desc: 'Dai Bains des Pâquis a Hermance: le spiagge ginevrine del Lemano con i loro chioschi e la temperatura dell’acqua del giorno per ciascuna.',
    bref: 'Il cantone di Ginevra conta <strong>15 spiagge e luoghi di balneazione seguiti da Il mio lago</strong>, da Pregny-Chambésy e Versoix sulla riva destra a Cologny, Corsier-Port e Hermance sulla riva sinistra, passando per i Bains des Pâquis e Genève-Plage nel cuore della città. Ognuna ha la sua pagina con la temperatura dell’acqua a 70 cm e il vento del giorno.',
    html: (L) => `
<h2>Quali sono le spiagge di Ginevra?</h2>
<p>Ecco tutte le spiagge ginevrine seguite dall’app, con un link alla loro pagina (acqua, vento, verdetto del giorno):</p>
${h.listePlages((s) => s.region === 'Genève', L)}
<h2>Dove fare il bagno nel centro di Ginevra?</h2>
<p>Nel cuore della rada, i <a href="{plage:bains-des-paquis}">Bains des Pâquis</a> sulla riva destra e la <a href="{plage:plage-des-eaux-vives}">spiaggia delle Eaux-Vives</a> sulla riva sinistra sono a due passi dal centro. Un po’ più lontano sulla riva sinistra, <a href="{plage:geneve-plage}">Genève-Plage</a> e <a href="{plage:baby-plage}">Baby-Plage</a> completano l’offerta.</p>
<h2>Dove bere qualcosa in riva all’acqua a Ginevra?</h2>
${h.listeLieux((x) => x.zone === 'geneve', L)}
<h2>Si può fare il bagno ovunque?</h2>
<p>Prima di fare il bagno bisogna verificare la qualità dell’acqua presso il cantone, che pubblica analisi datate spiaggia per spiaggia: vedi <a href="{blog:qualite-eau-baignade-leman}">come verificare la qualità dell’acqua</a>. D’inverno, i più coraggiosi praticano il <a href="{blog:bain-d-hiver-leman}">bagno invernale</a>.</p>
`,
  },
  'paddle-leman': {
    titre: 'Paddle sul Lemano: quando il lago è abbastanza calmo e dove noleggiare',
    h1: 'Paddle sul Lemano: quando uscire e dove noleggiare',
    desc: 'Da quale vento il paddle diventa difficile sul Lemano, come leggere le raffiche e i noleggi di paddle da Ginevra a Saint-Gingolph.',
    bref: 'Per il paddle contano <strong>le raffiche</strong>. In Il mio lago il paddle è «Perfetto» fino a 12 km/h di raffiche, «Bene» fino a 20 km/h, «Così così» fino a 28 km/h e sconsigliato oltre; la pioggia o un’aria sotto gli 8 °C fanno perdere un livello. Con la bise è meglio restare vicino a riva o aspettare.',
    html: (L) => `
<h2>Quale vento massimo per fare paddle?</h2>
<p>In piedi su una tavola si offre molta presa al vento, e le onde destabilizzano in fretta. Questi sono i riferimenti dell’<a href="{app}">app</a> (non norme ufficiali):</p>
<ul class="liste">
  <li><strong>Perfetto</strong>: raffiche fino a 12 km/h, il lago è uno specchio.</li>
  <li><strong>Bene</strong>: fino a 20 km/h, qualche increspatura.</li>
  <li><strong>Così così</strong>: fino a 28 km/h, scuote.</li>
  <li><strong>No</strong>: oltre, o in caso di temporale.</li>
</ul>
<p>La pioggia o un’aria sotto gli 8 °C fanno perdere un livello. Il vento del giorno, spiaggia per spiaggia, è nell’app; la <a href="{blog:bise-leman}">bise</a> merita un’attenzione particolare.</p>
<h2>Dove noleggiare un paddle sul Lemano?</h2>
${h.listeLoc(['paddle'], L)}
<p>Prezzi, orari e disponibilità cambiano: da verificare presso il noleggio prima di andare.</p>
<h2>Quale spiaggia scegliere per cominciare?</h2>
<p>Una spiaggia con un accesso facile e un punto riparato dal vento del giorno: la freccia del vento di ogni <a href="{plages}">pagina di spiaggia</a> aiuta a scegliere la riva meno esposta.</p>
`,
  },
  'kitesurf-windsurf-wingfoil-leman': {
    titre: 'Kitesurf, windsurf e wingfoil sul Lemano: il vento giusto e i posti giusti',
    h1: 'Kitesurf, windsurf e wingfoil sul Lemano',
    desc: 'Quale forza del vento per kitesurf, windsurf e foil sul Lemano, perché la bise fa i migliori downwind e dove noleggiare o imparare.',
    bref: 'Gli sport di scivolamento a vento hanno bisogno di un vento stabile. In Il mio lago il <strong>kitesurf</strong> è «Perfetto» tra 22 e 40 km/h, il <strong>windsurf</strong> tra 20 e 40 km/h e il <strong>foil</strong> da 12 km/h, o con bise di almeno 25 km/h per il downwind. La bise, il vento di nord-est più caratteristico del Lemano secondo MeteoSvizzera, è la loro migliore alleata.',
    html: (L) => `
<h2>Quale forza del vento per ogni disciplina?</h2>
<ul class="liste">
  <li><strong>Kitesurf</strong>: «Perfetto» da 22 a 40 km/h, «Bene» da 16 a 45 km/h; un voto in meno se le raffiche superano il vento medio di oltre 20 km/h, e «No» oltre 55 km/h di raffiche.</li>
  <li><strong>Windsurf</strong>: «Perfetto» da 20 a 40 km/h, «Bene» da 15 a 45 km/h; sopporta meglio le raffiche, fino a 60 km/h.</li>
  <li><strong>Foil</strong>: basta poco vento, «Perfetto» da 12 a 30 km/h; senza vento resta il pump foil.</li>
</ul>
<p>Sono i riferimenti dell’<a href="{app}">app</a>, non norme: il livello di ciascuno e la taglia dell’attrezzatura contano altrettanto.</p>
<h2>Perché la bise è ideale per il downwind?</h2>
<p>La <a href="{blog:bise-leman}">bise</a> soffia da nord-est, in modo regolare e spesso forte, e solleva un’onda lunga che corre sul lago. Per il foil, una bise di almeno 25 km/h dà il voto «Perfetto»: abbastanza per concatenare lunghe discese portate dalle onde. Sull’Haut-Lac gira a nord-nord-ovest (MeteoSvizzera).</p>
<h2>Dove noleggiare o imparare windsurf e wingfoil?</h2>
${h.listeLoc(['windsurf', 'wing'], L)}
<p>Per il kitesurf non abbiamo ancora un noleggio verificato; gli spot si scelgono in base alla direzione del vento, visibile su ogni <a href="{plages}">pagina di spiaggia</a>.</p>
`,
  },
  'wakeboard-wakesurf-ski-nautique-leman': {
    titre: 'Wakeboard, wakesurf e sci nautico sul Lemano: le scuole e i club',
    h1: 'Wakeboard, wakesurf e sci nautico sul Lemano',
    desc: 'Da Pregny a Thonon, le scuole e i club che escono in barca per wakeboard, wakesurf e sci nautico, e perché serve un lago liscio.',
    bref: 'Dietro una barca è <strong>un lago liscio</strong> a fare una bella sessione: in Il mio lago, wakeboard e sci nautico sono «Perfetti» fino a 15 km/h di raffiche, il wakesurf fino a 10 km/h. Secondo il cantone di Ginevra, la pratica è libera sul Lemano, nel rispetto delle regole di sicurezza. Scuole e club verificati qui sotto, da Ginevra a Montreux e sulla riva francese.',
    html: (L) => `
<h2>Perché serve un lago liscio?</h2>
<p>Wakeboard e sci nautico si praticano trainati da una barca; il wakesurf, invece, si surfa sull’onda della scia, senza corda. Il moto ondoso confonde quest’onda e rende la scivolata scomoda. I riferimenti dell’<a href="{app}">app</a>:</p>
<ul class="liste">
  <li><strong>Wakeboard e sci nautico</strong>: «Perfetto» fino a 15 km/h di raffiche, «Bene» fino a 25, «Così così» fino a 32.</li>
  <li><strong>Wakesurf</strong>: più esigente, «Perfetto» fino a 10 km/h, «Bene» fino a 18, «Così così» fino a 25.</li>
</ul>
<p>La pioggia o un’aria sotto i 10 °C fanno perdere un livello. Le mattine calme sono spesso le migliori.</p>
<h2>Dove fare wakeboard, wakesurf o sci nautico?</h2>
${h.listeLoc(['wakeboard', 'wakesurf', 'ski'], L)}
<p>Tariffe, stagioni e orari sono da verificare presso ogni scuola.</p>
<h2>Serve una patente?</h2>
<p>Per un’uscita con una scuola o un pilota, no: è lui a guidare la barca. Il cantone di Ginevra precisa che la pratica è libera sul Lemano e che le regole mirano alla sicurezza degli altri utenti; riguardano soprattutto chi usa la propria barca.</p>`,
  },
  'buvettes-restaurants-bord-du-leman': {
    titre: 'Chioschi e ristoranti in riva al Lemano: i nostri indirizzi con i piedi nell’acqua',
    h1: 'Chioschi e ristoranti in riva al Lemano, regione per regione',
    desc: 'Le terrazze in riva all’acqua di Ginevra, La Côte, Losanna, la Riviera e la riva francese, con le loro stagioni di apertura.',
    bref: 'Il mio lago censisce <strong>' + h.nbLieux + ' chioschi e ristoranti in riva al Lemano</strong>, verificati presso gli uffici del turismo e i siti dei locali: dai Bains des Pâquis a Ginevra ai lungolaghi di Vevey, dalla Guinguette de Vidy alla spiaggia di Sciez. Molti chioschi sono aperti solo nella bella stagione: il periodo è indicato quando è noto.',
    html: (L) => `
<h2>Dove bere qualcosa o mangiare in riva al Lemano?</h2>
${h.listeLieux(() => true, L)}
<h2>I chioschi sono aperti tutto l’anno?</h2>
<p>No: molti aprono solo da aprile o maggio a settembre, secondo il meteo. Le stagioni indicate sopra provengono dagli uffici del turismo o dai siti dei locali; orari e stagioni cambiano, una telefonata prima di andare evita le delusioni. La scheda «Uscire» dell’<a href="{app}">app</a> indica «Chiuso fino a…» fuori stagione.</p>
<h2>Manca un locale?</h2>
<p>La scheda «Uscire» dell’app propone un piccolo modulo per suggerire un indirizzo, riletto prima di essere aggiunto. Per scegliere la spiaggia accanto, vedi l’<a href="{plages}">elenco delle spiagge</a> e, a Ginevra, <a href="{blog:plages-geneve}">tutte le spiagge del cantone</a>.</p>`,
  },
  'plages-leman-rive-francaise': {
    titre: 'Spiagge del Lemano sul lato francese: da Évian a Chens-sur-Léman',
    h1: 'Le spiagge del Lemano sul lato francese, da Évian a Chens-sur-Léman',
    desc: 'Le spiagge della riva francese del Lemano, da Meillerie a Chens-sur-Léman, con la temperatura dell’acqua del giorno, i ristoranti e le scuole di wake nei dintorni.',
    bref: 'Il mio lago segue <strong>' + h.nbRive + ' spiagge sulla riva francese del Lemano</strong>, in Alta Savoia: da Meillerie ed Évian a est fino a Yvoire, Messery e Chens-sur-Léman vicino al confine ginevrino. Ognuna ha la sua pagina con l’acqua a 70 cm e il vento del giorno; la qualità dell’acqua si verifica sulla mappa delle spiagge della CIPEL.',
    html: (L) => `
<h2>Quali sono le spiagge della riva francese?</h2>
${h.listePlages((s) => s.region === 'Rive française', L)}
<h2>Dove mangiare in riva all’acqua sul lato francese?</h2>
${h.listeLieux((x) => x.zone === 'evian', L)}
<h2>Cosa fare sull’acqua sul lato francese?</h2>
${h.listeLoc(['paddle', 'kayak', 'pedalo', 'bateau', 'wakeboard', 'wakesurf', 'ski', 'wing'], L, (l) => h.SPOTS.find((s) => s.id === l.spot)?.region === 'Rive française')}
<h2>Come verificare la qualità dell’acqua?</h2>
<p>Per le spiagge francesi, l’app non ha un’analisi recente: rimanda alla mappa delle spiagge della CIPEL. Vedi <a href="{blog:qualite-eau-baignade-leman}">come verificare la qualità dell’acqua</a>. La temperatura del giorno di ogni spiaggia è nell’<a href="{app}">app</a>.</p>`,
  },
  'choc-thermique-eau-froide': {
    titre: 'Shock da freddo: i primi 90 secondi nell’acqua fredda del Lemano',
    h1: 'Shock da freddo: vivere bene i primi 90 secondi nell’acqua fredda',
    desc: 'Cosa fa il corpo entrando in acqua a 10 °C, perché non bisogna tuffarsi, come respirare nel primo minuto e perché andare dal medico prima di cominciare.',
    bref: 'Entrando in acqua fredda, il corpo reagisce con uno <strong>shock da freddo</strong>: respiro affannoso che non si controlla più, cuore che accelera, pressione che sale. Secondo la RNLI, questo shock dura circa <strong>60-90 secondi</strong>; è il momento più rischioso. Da qui le regole: andare dal medico prima di cominciare, non tuffarsi mai, entrare lentamente controllando il respiro, non essere mai soli e, se ci si ritrova in acqua senza volerlo, galleggiare finché lo shock passa.',
    html: (L) => `
<h2>Cosa succede nel corpo entrando in acqua fredda?</h2>
<p>A contatto con l’acqua fredda, la pelle scatena una reazione riflessa: una forte inspirazione involontaria, poi una respirazione rapida e difficile da controllare; il cuore accelera e la pressione sale. La RNLI, il servizio di soccorso britannico, chiama questo fenomeno <em>cold water shock</em> e ricorda che gran parte dei decessi in acqua fredda avviene nei primi minuti, a causa di questo shock e non dell’ipotermia.</p>
<h2>Quanto dura lo shock da freddo?</h2>
<p>Circa 60-90 secondi secondo la RNLI. Poi la respirazione si calma e si riprende il controllo. Per questo le prime volte si resta vicino a riva e non si cerca di nuotare subito.</p>
<h2>Perché non bisogna tuffarsi?</h2>
<p>Perché un’inspirazione riflessa con la testa sott’acqua può far inghiottire acqua. La Società svizzera di salvataggio (SSS) raccomanda di entrare lentamente, senza tuffarsi, di tenere la testa fuori dall’acqua e di indossare una cuffia.</p>
<h2>Come entrare in acqua fredda passo dopo passo?</h2>
<ul class="liste">
  <li><strong>Con qualcuno</strong>: un compagno sulla riva o in acqua (SSS, UPI).</li>
  <li><strong>Lentamente</strong>, camminando, soffiando a lungo per mantenere un respiro regolare.</li>
  <li><strong>Brevemente</strong>: le prime volte bastano da qualche decina di secondi a uno o due minuti; la SSS fissa il massimo in tanti minuti quanti sono i gradi.</li>
  <li><strong>Uscire</strong> al minimo malessere, in caso di brividi intensi o di dita intorpidite.</li>
</ul>
<h2>Cosa fare se si cade in acqua fredda?</h2>
<p>La RNLI insegna il riflesso <strong>«Float to Live»</strong>: non dimenarsi, gettare la testa all’indietro con le orecchie in acqua, allargare braccia e gambe e respirare con calma finché lo shock passa, poi chiamare aiuto o raggiungere la riva. Uno studio dell’Università di Portsmouth ha mostrato che queste indicazioni aiutano a galleggiare in lago e in mare anche persone poco esperte.</p>
<h2>Bisogna andare dal medico prima di cominciare?</h2>
<p>Sì, è il primo riflesso: lo shock da freddo sollecita molto il cuore. In caso di problemi cardiaci o di pressione, si chiede un parere medico prima del primo bagno. Alcuni nuotatori si abituano anche terminando le docce con qualche decina di secondi di acqua fredda, allungandoli a poco a poco; non è una garanzia, solo un modo dolce di scoprire la sensazione.</p>
<p>Per proseguire: <a href="{blog:materiel-bain-d-hiver}">l’attrezzatura per il bagno invernale</a> e <a href="{blog:afterdrop-se-rechauffer}">scaldarsi dopo il bagno</a>. L’acqua del giorno, spiaggia per spiaggia, è nell’<a href="{app}">app</a>.</p>`,
  },
  'materiel-bain-d-hiver': {
    titre: 'Attrezzatura per il bagno invernale: la lista completa prima di andare al Lemano',
    h1: 'L’attrezzatura del bagno invernale, dalla testa ai piedi',
    desc: 'Cuffia, scarpette e guanti in neoprene, boa da nuoto, tappetino per cambiarsi, mantella e thermos: tutto ciò che serve per un bagno invernale nel Lemano, e perché.',
    bref: 'Per un bagno invernale, l’essenziale sta in una borsa: <strong>un costume, una cuffia, scarpette ed eventualmente guanti in neoprene</strong> (piedi e mani si raffreddano in fretta), <strong>una boa da nuoto</strong> per essere visibili e riposarsi, poi per l’uscita <strong>un asciugamano, una mantella o un accappatoio caldo, vestiti facili da infilare, un tappetino per cambiarsi e una bevanda calda</strong>. E soprattutto, un compagno.',
    html: (L) => `
<h2>Cosa indossare in acqua fredda?</h2>
<ul class="liste">
  <li><strong>Un costume comodo</strong>, o una muta se si vuole nuotare più a lungo.</li>
  <li><strong>Una cuffia</strong> in silicone o in neoprene: la Società svizzera di salvataggio raccomanda di indossare una cuffia e di tenere la testa fuori dall’acqua.</li>
  <li><strong>Scarpette in neoprene</strong>: i piedi soffrono presto il freddo, e i ciottoli del Lemano non perdonano.</li>
  <li><strong>Guanti in neoprene</strong> se le mani si intorpidiscono; più sono spessi, più proteggono, ma più le dita perdono agilità. L’Outdoor Swimming Society li cita insieme alle scarpette tra gli accessori invernali utili.</li>
  <li><strong>Una boa da nuoto</strong> colorata: l’Ufficio prevenzione infortuni (UPI) la raccomanda in acque libere, per essere visti e potersi aggrappare in caso di bisogno.</li>
</ul>
<h2>Cosa prevedere per l’uscita dall’acqua?</h2>
<ul class="liste">
  <li><strong>Un grande asciugamano</strong> e una <strong>mantella o un accappatoio caldo</strong> per cambiarsi al riparo dal vento.</li>
  <li><strong>Vestiti ampi, facili da infilare</strong> con le dita fredde: strati sovrapposti, niente bottoni complicati, cuffia e calzini caldi.</li>
  <li><strong>Un tappetino per cambiarsi</strong>, per non poggiare i piedi su sassi o erba gelata.</li>
  <li><strong>Un thermos di bevanda calda</strong>: la SSS consiglia una bevanda tiepida per scaldarsi dall’interno. Niente alcol.</li>
</ul>
<h2>Qual è l’attrezzatura più importante?</h2>
<p>Un compagno. La SSS e l’UPI sono categoriche: non si nuota mai da soli in acque libere, ancora meno in acqua fredda. Il resto dell’attrezzatura rende il bagno più piacevole; la presenza di qualcuno lo rende più sicuro.</p>
<h2>Dove comprare o noleggiare questa attrezzatura vicino al Lemano?</h2>
<p>I negozi di sport e di surf della regione offrono cuffie, scarpette e guanti in neoprene. Per scaldarsi sul posto, alcuni luoghi hanno una sauna, come i Bains des Rives a Bellerive (Losanna) d’inverno: vedi la <a href="{blog:bain-d-hiver-leman}">guida al bagno invernale</a>.</p>
<p>Prima di partire: <a href="{blog:choc-thermique-eau-froide}">i primi 90 secondi in acqua fredda</a>. All’uscita: <a href="{blog:afterdrop-se-rechauffer}">scaldarsi bene</a>. L’acqua del giorno è nell’<a href="{app}">app</a>.</p>`,
  },
  'afterdrop-se-rechauffer': {
    titre: 'Afterdrop: perché si ha ancora più freddo dopo un bagno invernale e come scaldarsi',
    h1: 'Afterdrop: scaldarsi bene dopo un bagno invernale',
    desc: 'Perché il corpo continua a raffreddarsi per una decina di minuti dopo l’uscita dall’acqua, come cambiarsi, cosa bere e cosa è meglio evitare, come la doccia calda.',
    bref: 'L’<strong>afterdrop</strong> è il raffreddamento che continua <strong>dopo</strong> l’uscita dall’acqua: si può avere più freddo dieci minuti dopo essere usciti che nel momento di uscire, con brividi, perfino capogiri. Per scaldarsi bene: asciugarsi e vestirsi in fretta e con abiti caldi, bere una bevanda tiepida, muoversi con dolcezza senza grandi sforzi e restare al caldo e al riparo per un quarto d’ora circa. La Società svizzera di salvataggio sconsiglia la doccia calda subito dopo.',
    html: (L) => `
<h2>Che cos’è l’afterdrop?</h2>
<p>È il calo della temperatura del corpo che prosegue quando si è già usciti dall’acqua e ci si trova all’asciutto. Le guide al nuoto in acque libere lo collocano spesso una decina di minuti dopo l’uscita; può durare più a lungo dopo un bagno lungo. Lo si avverte come un’ondata di freddo, brividi che aumentano, a volte capogiri.</p>
<h2>Come scaldarsi dopo un bagno invernale?</h2>
<ul class="liste">
  <li><strong>Cambiarsi subito</strong>: togliere il costume bagnato, asciugarsi e infilare vestiti caldi e asciutti, al riparo dal vento (SSS).</li>
  <li><strong>Coprire testa, mani e piedi</strong>: cuffia, guanti, calzini caldi.</li>
  <li><strong>Bere caldo</strong>: la SSS raccomanda una bevanda tiepida per scaldarsi dall’interno.</li>
  <li><strong>Muoversi con dolcezza</strong>: camminare, battere i piedi. La SSS sconsiglia gli sforzi intensi, e l’esercizio intenso può accentuare l’afterdrop (DAN Alert Diver).</li>
  <li><strong>Restare al caldo e al riparo</strong> per un quarto d’ora circa prima di rimettersi in viaggio, soprattutto in bici o alla guida.</li>
</ul>
<h2>Perché evitare la doccia calda subito dopo?</h2>
<p>La Società svizzera di salvataggio la sconsiglia subito dopo un bagno in acqua fredda. Ci si scalda prima vestendosi e bevendo caldo; la doccia verrà più tardi, quando il corpo sarà tornato a una temperatura normale.</p>
<h2>Quando preoccuparsi?</h2>
<p>Se i brividi non si fermano, se la persona diventa confusa, goffa o sonnolenta, bisogna metterla al caldo e chiamare i soccorsi (144 in Svizzera, 15 o 112 in Francia): sono segni di ipotermia, che richiedono un riscaldamento seguito da professionisti.</p>
<p>Da leggere anche: <a href="{blog:choc-thermique-eau-froide}">i primi 90 secondi in acqua fredda</a> e <a href="{blog:materiel-bain-d-hiver}">l’attrezzatura per il bagno invernale</a>. La <a href="{blog:bain-d-hiver-leman}">guida al bagno invernale</a> indica le spiagge e le saune del Lemano.</p>`,
  },
});
