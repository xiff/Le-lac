// Bain d'hiver, seconde moitié (5 articles, 4 langues), publiés le 15 novembre 2026.
// Chaque affirmation vient d'une source citée en bas d'article, lue ce jour-là ; ce qui n'est pas documenté est dit tel quel.
// Les illustrations sont celles de blog/img/ia/ (voir IMAGES-IA.md).
const SSS = ['Société Suisse de Sauvetage SSS, « Nager en eau froide »', 'https://www.slrg.ch/sites/default/files/2025-02/Fiche-nager-en-eau-froide-web.pdf'];
const HELSANA = ['Helsana, « Winterschwimmen – das bringt’s und so geht’s »', 'https://www.helsana.ch/content/helsana/de/blog/koerper/bewegung/winterschwimmen.html'];
const OSS = ['Outdoor Swimming Society, « Risks of cold water »', 'https://www.outdoorswimmingsociety.com/risks-cold-water/'];
const RLSS = ['RLSS UK, « Top tips for safer open water swimming »', 'https://www.rlss.org.uk/top-tips-for-safer-open-water-swimming'];
const TIPTON = ['Tipton et al., « Cold water immersion: kill or cure? », Experimental Physiology, 2017', 'https://pubmed.ncbi.nlm.nih.gov/28833689/'];
const META = ['« Effects of cold-water immersion on health and wellbeing: a systematic review and meta-analysis », PLoS One, 2025', 'https://pubmed.ncbi.nlm.nih.gov/39879231/'];
const GR = ['Graubünden Ferien, « Eisbaden »', 'https://www.graubuenden.ch/de/aktivitaeten/winter/eisbaden'];
const ZH = ['Zürich Tourismus, « Eisbaden in Zürich »', 'https://www.zuerich.com/de/sightseeing-aktivitaeten/sport-und-erholung/wassersport/eisbaden'];
const LEGENDE = { fr: 'Illustration générée par IA', en: 'AI-generated illustration', de: 'KI-generierte Illustration', it: 'Illustrazione generata dall’IA' };
const base = (slug, img, alt, sources) => ({ slug, sante: true, publie: '2026-11-15', modifie: '2026-11-15', image: `blog/img/ia/${img}.jpg`, hauteur: 893,
  alt: { fr: alt[0], en: alt[1], de: alt[2], it: alt[3] }, credit: {}, creditHtml: { ...LEGENDE }, sources });

export const articlesHiver = () => [
  { ...base('bienfaits-bain-froid', 'bienfaits-bain-froid',
      ['Un thermomètre sur un poteau de bois au bord d’un lac, roseaux givrés, brume sur l’eau', 'A thermometer on a wooden post at a lake edge, frosted reeds, mist over the water', 'Ein Thermometer an einem Holzpfosten am Seeufer, bereifte Schilfhalme, Dunst über dem Wasser', 'Un termometro su un palo di legno in riva al lago, canne gelate, foschia sull’acqua'],
      [HELSANA, META, TIPTON, GR]),
    fr: { titre: 'Bienfaits du bain froid : ce que disent les études, et ce qu’elles ne disent pas', h1: 'Les bienfaits du bain froid : ce qui est établi, ce qui reste à prouver',
      desc: 'Sommeil, qualité de vie, humeur, rhumes, circulation : ce que montrent une méta-analyse de 2025 et une revue de référence sur l’eau froide, ce qu’en dit une assurance suisse, et pour qui c’est déconseillé.',
      bref: 'Les sources ne disent pas toutes la même chose. Une <strong>méta-analyse de 2025</strong> sur des adultes en bonne santé relève une meilleure qualité de sommeil et de vie après des immersions en eau froide, mais <strong>pas d’effet sur l’humeur</strong>, avec peu d’essais et de petits échantillons. L’assurance Helsana, elle, écrit que le froid bref stimule la circulation, réduit le stress et améliore l’humeur. Une revue de référence conclut que la solidité des preuves varie selon les promesses, certaines restant au niveau de l’anecdote.',
      html: () => `
<h2>Que montre la recherche ?</h2>
<p>Une revue systématique et méta-analyse publiée en 2025 dans <em>PLoS One</em> a regroupé les essais sur l’immersion en eau froide chez des adultes en bonne santé. Elle relève une amélioration de la qualité du sommeil et de la qualité de vie, mais aucun effet sur l’humeur. Ses auteurs soulignent que les preuves restent limitées : peu d’essais contrôlés, de petits échantillons, des populations peu variées.</p>
<p>Une revue de référence sur le sujet, « Cold water immersion: kill or cure? » (<em>Experimental Physiology</em>, 2017), arrive à une conclusion de même nature : la solidité des preuves varie selon ce qu’on prétend, et pour certaines promesses elle reste au niveau de la supposition anecdotique. Elle range aussi les premières secondes dans l’eau, le « choc du froid », parmi les moments les plus dangereux.</p>
<h2>Ce que dit une assurance suisse</h2>
<p>Dans son guide du bain d’hiver, Helsana écrit que des études confirment qu’un froid de courte durée stimule le système cardio-vasculaire, réduit le stress et améliore l’humeur, et que des études et des témoignages laissent penser que les nageurs d’eau froide attrapent moins de rhumes. Ce sont des indications : sur l’humeur, la méta-analyse citée plus haut ne retrouve pas d’effet.</p>
<h2>Ce qu’on peut dire honnêtement</h2>
<ul class="liste">
  <li>Beaucoup de gens disent se sentir bien après un bain froid. Ce ressenti est réel pour eux ; il ne prouve pas à lui seul un effet mesurable.</li>
  <li>Le sommeil et la qualité de vie sont les deux critères où une méta-analyse récente voit un effet.</li>
  <li>Les promesses sur l’immunité, le métabolisme ou la dépression reposent sur des preuves plus minces ; nous ne les reprenons pas ici.</li>
</ul>
<h2>Pour qui c’est déconseillé</h2>
<p>Graubünden Ferien rappelle que le bain dans l’eau glacée est réservé aux personnes en bonne santé : il est déconseillé en cas d’hypertension, de diabète, de maladie du cœur ou des vaisseaux, et, au moindre doute, on en parle d’abord à son médecin. Helsana dit la même chose pour les problèmes cardio-vasculaires et pour toute personne qui ne se sent pas sûre d’elle. On y va aussi accompagné.</p>
<p>Pour commencer sans se faire peur : <a href="{blog:programme-4-semaines-bain-d-hiver}">un programme de 4 semaines</a>, <a href="{blog:respiration-eau-froide}">la respiration dans l’eau froide</a> et <a href="{blog:choc-thermique-eau-froide}">les 90 premières secondes</a>. L’eau du moment, plage par plage, est dans l’<a href="{app}">app</a>.</p>` },
    en: { titre: 'Benefits of cold-water swimming: what the studies say, and what they don’t', h1: 'The benefits of cold-water swimming: what is established, what is still to prove',
      desc: 'Sleep, quality of life, mood, colds, circulation: what a 2025 meta-analysis and a landmark review say about cold water, what a Swiss health insurer says, and who should avoid it.',
      bref: 'The sources do not all say the same thing. A <strong>2025 meta-analysis</strong> of healthy adults finds better sleep quality and quality of life after cold-water immersion, but <strong>no effect on mood</strong>, with few trials and small samples. The insurer Helsana writes that brief cold stimulates circulation, reduces stress and lifts mood. A landmark review concludes that the strength of evidence varies with the claim, some resting at the level of anecdote.',
      html: () => `
<h2>What does the research show?</h2>
<p>A systematic review and meta-analysis published in 2025 in <em>PLoS One</em> pooled trials of cold-water immersion in healthy adults. It finds improved sleep quality and quality of life, but no effect on mood. Its authors stress that the evidence remains limited: few controlled trials, small samples, little diversity among participants.</p>
<p>A landmark review, “Cold water immersion: kill or cure?” (<em>Experimental Physiology</em>, 2017), reaches a conclusion of the same kind: the strength of evidence varies with what is claimed, and for some claims it remains at the level of anecdotal speculation. It also lists the first seconds in the water, the “cold shock”, among the most hazardous moments.</p>
<h2>What a Swiss insurer says</h2>
<p>In its winter-swimming guide, Helsana writes that studies confirm that brief cold stimulates the cardiovascular system, reduces stress and lifts mood, and that studies and accounts suggest cold-water swimmers catch fewer colds. These are indications: on mood, the meta-analysis above finds no effect.</p>
<h2>What can honestly be said</h2>
<ul class="liste">
  <li>Many people say they feel good after a cold dip. That feeling is real to them; on its own it does not prove a measurable effect.</li>
  <li>Sleep and quality of life are the two outcomes where a recent meta-analysis sees an effect.</li>
  <li>Claims about immunity, metabolism or depression rest on thinner evidence; we do not repeat them here.</li>
</ul>
<h2>Who should avoid it</h2>
<p>Graubünden Ferien reminds readers that icy-water bathing is for healthy people: it is discouraged for high blood pressure, diabetes, and heart or vascular disease, and if in doubt you talk to your doctor first. Helsana says the same for cardiovascular problems and for anyone who feels unsure. And you go with someone.</p>
<p>To start without scaring yourself: <a href="{blog:programme-4-semaines-bain-d-hiver}">a 4-week programme</a>, <a href="{blog:respiration-eau-froide}">breathing in cold water</a> and <a href="{blog:choc-thermique-eau-froide}">the first 90 seconds</a>. The current water temperature, beach by beach, is in the <a href="{app}">app</a>.</p>` },
    de: { titre: 'Wirkung von Kaltbaden: was Studien sagen und was nicht', h1: 'Die Wirkung von Kaltbaden: was belegt ist und was noch zu beweisen bleibt',
      desc: 'Schlaf, Lebensqualität, Stimmung, Erkältungen, Kreislauf: was eine Metaanalyse von 2025 und eine Übersichtsarbeit zu kaltem Wasser sagen, was eine Schweizer Krankenkasse schreibt und für wen es nicht geeignet ist.',
      bref: 'Die Quellen sagen nicht alle dasselbe. Eine <strong>Metaanalyse von 2025</strong> an gesunden Erwachsenen findet nach Kaltwasserbädern bessere Schlafqualität und Lebensqualität, aber <strong>keine Wirkung auf die Stimmung</strong>, bei wenigen Studien und kleinen Stichproben. Die Krankenkasse Helsana schreibt, kurze Kälte rege den Kreislauf an, reduziere Stress und hebe die Stimmung. Eine Übersichtsarbeit kommt zum Schluss, dass die Beweislage je nach Versprechen unterschiedlich stark ist und teils auf dem Niveau von Anekdoten bleibt.',
      html: () => `
<h2>Was zeigt die Forschung?</h2>
<p>Eine systematische Übersichtsarbeit mit Metaanalyse, 2025 in <em>PLoS One</em> erschienen, fasste Studien zum Kaltwasserbad bei gesunden Erwachsenen zusammen. Sie findet bessere Schlafqualität und Lebensqualität, aber keine Wirkung auf die Stimmung. Die Autorinnen und Autoren betonen, die Belege blieben begrenzt: wenige kontrollierte Studien, kleine Stichproben, wenig vielfältige Teilnehmende.</p>
<p>Eine massgebliche Übersichtsarbeit, «Cold water immersion: kill or cure?» (<em>Experimental Physiology</em>, 2017), kommt zu einem Schluss derselben Art: Die Stärke der Belege hängt davon ab, was behauptet wird, und bei manchem bleibt sie auf dem Niveau anekdotischer Vermutung. Sie zählt auch die ersten Sekunden im Wasser, den «Kälteschock», zu den gefährlichsten Momenten.</p>
<h2>Was eine Schweizer Krankenkasse schreibt</h2>
<p>In ihrem Ratgeber zum Winterschwimmen schreibt Helsana, Untersuchungen bestätigten, dass kurzzeitige Kälte das Herz-Kreislauf-System anrege, Stress reduziere und die Stimmung aufhelle, und Studien und Erfahrungsberichte deuteten darauf hin, dass Kaltwasserschwimmende seltener an Erkältungen erkranken. Das sind Hinweise: Bei der Stimmung findet die oben genannte Metaanalyse keine Wirkung.</p>
<h2>Was sich ehrlich sagen lässt</h2>
<ul class="liste">
  <li>Viele Menschen fühlen sich nach einem kalten Bad gut. Dieses Gefühl ist für sie real; allein belegt es keine messbare Wirkung.</li>
  <li>Schlaf und Lebensqualität sind die beiden Ergebnisse, bei denen eine aktuelle Metaanalyse eine Wirkung sieht.</li>
  <li>Versprechen zu Immunsystem, Stoffwechsel oder Depression stützen sich auf dünnere Belege; wir geben sie hier nicht weiter.</li>
</ul>
<h2>Für wen es nicht geeignet ist</h2>
<p>Graubünden Ferien erinnert daran, dass Eisbaden nur für Gesunde ist: Bei Bluthochdruck, Diabetes sowie Herz- und Gefässerkrankungen wird davon abgeraten, und im Zweifel spricht man zuerst mit der Ärztin oder dem Arzt. Helsana sagt dasselbe für Herz-Kreislauf-Probleme und für alle, die sich unsicher fühlen. Und man geht in Begleitung.</p>
<p>Für einen sanften Start: <a href="{blog:programme-4-semaines-bain-d-hiver}">ein 4-Wochen-Programm</a>, <a href="{blog:respiration-eau-froide}">die Atmung im kalten Wasser</a> und <a href="{blog:choc-thermique-eau-froide}">die ersten 90 Sekunden</a>. Das Wasser von heute, Badeplatz für Badeplatz, steht in der <a href="{app}">App</a>.</p>` },
    it: { titre: 'Benefici del bagno freddo: cosa dicono gli studi e cosa no', h1: 'I benefici del bagno freddo: cosa è provato, cosa resta da dimostrare',
      desc: 'Sonno, qualità della vita, umore, raffreddori, circolazione: cosa dicono una meta-analisi del 2025 e una revisione di riferimento sull’acqua fredda, cosa scrive un’assicurazione svizzera e per chi è sconsigliato.',
      bref: 'Le fonti non dicono tutte la stessa cosa. Una <strong>meta-analisi del 2025</strong> su adulti sani rileva una migliore qualità del sonno e della vita dopo immersioni in acqua fredda, ma <strong>nessun effetto sull’umore</strong>, con pochi studi e campioni piccoli. L’assicurazione Helsana scrive che il freddo breve stimola la circolazione, riduce lo stress e migliora l’umore. Una revisione di riferimento conclude che la solidità delle prove varia secondo le promesse, alcune restando a livello aneddotico.',
      html: () => `
<h2>Cosa mostra la ricerca?</h2>
<p>Una revisione sistematica con meta-analisi pubblicata nel 2025 su <em>PLoS One</em> ha riunito gli studi sull’immersione in acqua fredda in adulti sani. Rileva un miglioramento della qualità del sonno e della qualità della vita, ma nessun effetto sull’umore. Gli autori sottolineano che le prove restano limitate: pochi studi controllati, campioni piccoli, partecipanti poco vari.</p>
<p>Una revisione di riferimento, «Cold water immersion: kill or cure?» (<em>Experimental Physiology</em>, 2017), giunge a una conclusione dello stesso tipo: la solidità delle prove varia secondo ciò che si sostiene, e per alcune promesse resta a livello di supposizione aneddotica. Mette anche i primi secondi in acqua, lo «shock da freddo», tra i momenti più pericolosi.</p>
<h2>Cosa scrive un’assicurazione svizzera</h2>
<p>Nella sua guida al nuoto invernale, Helsana scrive che studi confermano che il freddo di breve durata stimola il sistema cardiovascolare, riduce lo stress e migliora l’umore, e che studi e testimonianze fanno pensare che chi nuota in acqua fredda si raffreddi meno spesso. Sono indicazioni: sull’umore, la meta-analisi citata sopra non trova effetti.</p>
<h2>Cosa si può dire onestamente</h2>
<ul class="liste">
  <li>Molte persone dicono di sentirsi bene dopo un bagno freddo. Per loro la sensazione è reale; da sola non prova un effetto misurabile.</li>
  <li>Sonno e qualità della vita sono i due esiti in cui una meta-analisi recente vede un effetto.</li>
  <li>Le promesse su difese immunitarie, metabolismo o depressione poggiano su prove più sottili; non le riprendiamo qui.</li>
</ul>
<h2>Per chi è sconsigliato</h2>
<p>Graubünden Ferien ricorda che il bagno in acqua gelida è per persone sane: è sconsigliato in caso di pressione alta, diabete, malattie del cuore e dei vasi, e nel dubbio se ne parla prima con il medico. Helsana dice lo stesso per i problemi cardiovascolari e per chiunque non si senta sicuro. E si va in compagnia.</p>
<p>Per cominciare senza spaventarsi: <a href="{blog:programme-4-semaines-bain-d-hiver}">un programma di 4 settimane</a>, <a href="{blog:respiration-eau-froide}">la respirazione in acqua fredda</a> e <a href="{blog:choc-thermique-eau-froide}">i primi 90 secondi</a>. L’acqua del momento, spiaggia per spiaggia, è nell’<a href="{app}">app</a>.</p>` } },

  { ...base('respiration-eau-froide', 'respiration',
      ['Un ponton de pierre avec une échelle, ronds dans l’eau calme, lueur rose sur les montagnes', 'A stone jetty with a ladder, ripples on calm water, pink glow on the mountains', 'Ein Steinsteg mit Leiter, Ringe auf ruhigem Wasser, rosa Schimmer auf den Bergen', 'Un molo di pietra con una scaletta, cerchi sull’acqua calma, luce rosa sulle montagne'],
      [OSS, HELSANA, TIPTON, SSS]),
    fr: { titre: 'Respiration dans l’eau froide : gérer le réflexe de souffle au moment d’entrer', h1: 'Respirer dans l’eau froide : ce qui se passe, et ce qui aide',
      desc: 'Le réflexe de souffle, l’hyperventilation incontrôlable, la panique : ce que décrivent la Outdoor Swimming Society, Helsana et une revue de référence, et comment entrer pour laisser la respiration se calmer.',
      bref: 'Dans une eau sous 15 °C, le corps réagit à l’entrée par un <strong>réflexe de souffle</strong>, puis par une <strong>hyperventilation qu’on ne contrôle pas</strong>, qui peut provoquer la panique. Ce qui est documenté : entrer lentement, rester là où l’on a pied jusqu’à ce que la respiration se calme, garder la tête hors de l’eau. Nous n’avons pas trouvé de source solide pour une technique de respiration précise, et nous n’en recommandons donc pas.',
      html: () => `
<h2>Que se passe-t-il quand on entre dans l’eau froide ?</h2>
<p>La Outdoor Swimming Society décrit la suite : en dessous d’environ 15 °C, l’entrée déclenche le « choc du froid », qui commence par un réflexe d’inspiration brusque. Il est suivi d’une période d’hyperventilation qu’on ne peut pas contrôler : la respiration devient très rapide, ce qui peut donner une sensation de panique. Les nageurs débutants ont de plus tendance à se mettre à la verticale, position où l’on flotte moins bien, et la panique s’installe plus vite. Une revue de référence publiée dans <em>Experimental Physiology</em> range ces premières réactions parmi les plus dangereuses de l’immersion.</p>
<h2>Ce qui aide, d’après les sources</h2>
<ul class="liste">
  <li><strong>Entrer lentement</strong> : c’est la consigne de la Outdoor Swimming Society comme de Helsana, qui ajoute de se mouiller le corps peu à peu.</li>
  <li><strong>Rester là où l’on a pied</strong> jusqu’à ce que le réflexe soit passé et que la respiration soit maîtrisée (Outdoor Swimming Society).</li>
  <li><strong>Garder la tête hors de l’eau</strong> : Helsana recommande d’éviter de la plonger.</li>
  <li><strong>Ne pas y aller seul</strong> : si la respiration s’emballe, quelqu’un doit pouvoir réagir (Helsana).</li>
</ul>
<h2>Et les techniques de respiration ?</h2>
<p>On trouve beaucoup de méthodes (respirations lentes, apnées, cycles) sur internet. Pour le bain d’hiver, nous n’avons pas trouvé de source scientifique ou d’organisme de sauvetage qui en recommande une précise, et nous ne les reprenons pas. Ce qui est établi est plus simple : laisser au corps le temps de passer le réflexe avant de nager. Un nageur interrogé par Helsana au bord du Léman, dans une eau à environ dix degrés, dit que sa respiration devient plus lente et plus régulière dans l’eau froide ; c’est un témoignage, pas une preuve.</p>
<h2>Quand sortir ?</h2>
<p>Dès qu’on se sent mal à l’aise. La règle de la SSS fixe la durée maximale : <strong>autant de minutes que l’eau a de degrés</strong>, et beaucoup moins au début. Après le bain : <a href="{blog:afterdrop-se-rechauffer}">bien se réchauffer</a>.</p>
<p>À lire aussi : <a href="{blog:choc-thermique-eau-froide}">les 90 premières secondes dans l’eau froide</a> et <a href="{blog:programme-4-semaines-bain-d-hiver}">un programme de 4 semaines</a>. L’eau du moment est dans l’<a href="{app}">app</a>.</p>` },
    en: { titre: 'Breathing in cold water: handling the gasp reflex as you get in', h1: 'Breathing in cold water: what happens, and what helps',
      desc: 'The gasp reflex, uncontrollable hyperventilation, panic: what the Outdoor Swimming Society, Helsana and a landmark review describe, and how to get in so your breathing can settle.',
      bref: 'In water below 15 °C, the body reacts to entry with a <strong>gasp reflex</strong>, then <strong>hyperventilation you cannot control</strong>, which can bring on panic. What is documented: get in slowly, stay where you can stand until your breathing settles, keep your head out of the water. We found no solid source for a specific breathing technique, so we do not recommend one.',
      html: () => `
<h2>What happens when you get into cold water?</h2>
<p>The Outdoor Swimming Society describes it: below roughly 15 °C, getting in triggers “cold shock”, which starts with a sudden gasp reflex. It is followed by a period of hyperventilation that you cannot control: breathing becomes very rapid, which can feel like panic. New swimmers also tend to go upright in the water, where you are less buoyant, and panic can set in faster. A landmark review in <em>Experimental Physiology</em> counts these first reactions among the most hazardous of immersion.</p>
<h2>What helps, according to the sources</h2>
<ul class="liste">
  <li><strong>Get in slowly</strong>: this is the advice of the Outdoor Swimming Society and of Helsana, which adds to wet your body gradually.</li>
  <li><strong>Stay where you can stand</strong> until the reflex has passed and your breathing is under control (Outdoor Swimming Society).</li>
  <li><strong>Keep your head out of the water</strong>: Helsana advises against putting it under.</li>
  <li><strong>Do not go alone</strong>: if your breathing runs away, someone must be able to react (Helsana).</li>
</ul>
<h2>What about breathing techniques?</h2>
<p>Plenty of methods (slow breathing, breath-holds, cycles) circulate online. For winter swimming we found no scientific source or lifesaving body that recommends a specific one, and we do not repeat them. What is established is simpler: give the body time to get through the reflex before you swim. A swimmer interviewed by Helsana on Lake Geneva, in water at about ten degrees, says his breathing becomes slower and steadier in cold water; that is a personal account, not proof.</p>
<h2>When to get out</h2>
<p>As soon as you feel uncomfortable. The SSS rule sets the maximum time: <strong>as many minutes as the water has degrees</strong>, and far fewer at first. Afterwards: <a href="{blog:afterdrop-se-rechauffer}">warm up properly</a>.</p>
<p>Also read: <a href="{blog:choc-thermique-eau-froide}">the first 90 seconds in cold water</a> and <a href="{blog:programme-4-semaines-bain-d-hiver}">a 4-week programme</a>. The current water temperature is in the <a href="{app}">app</a>.</p>` },
    de: { titre: 'Atmen im kalten Wasser: den Atemreflex beim Einstieg beherrschen', h1: 'Atmen im kalten Wasser: was passiert und was hilft',
      desc: 'Atemreflex, unkontrollierbare Hyperventilation, Panik: was die Outdoor Swimming Society, Helsana und eine Übersichtsarbeit beschreiben und wie man einsteigt, damit sich die Atmung beruhigt.',
      bref: 'In Wasser unter 15 °C reagiert der Körper beim Einstieg mit einem <strong>Atemreflex</strong> und dann mit einer <strong>Hyperventilation, die man nicht kontrollieren kann</strong> und die Panik auslösen kann. Belegt ist: langsam einsteigen, dort stehen bleiben, wo man Boden unter den Füssen hat, bis sich die Atmung beruhigt, den Kopf über Wasser halten. Für eine bestimmte Atemtechnik haben wir keine belastbare Quelle gefunden und empfehlen deshalb keine.',
      html: () => `
<h2>Was passiert beim Einstieg ins kalte Wasser?</h2>
<p>Die Outdoor Swimming Society beschreibt es so: Unter etwa 15 °C löst der Einstieg den «Kälteschock» aus, der mit einem plötzlichen Einatmungsreflex beginnt. Danach folgt eine Phase der Hyperventilation, die man nicht kontrollieren kann: Die Atmung wird sehr schnell, was sich wie Panik anfühlen kann. Neulinge richten sich im Wasser zudem oft auf, wo sie weniger Auftrieb haben, und die Panik setzt schneller ein. Eine massgebliche Übersichtsarbeit in <em>Experimental Physiology</em> zählt diese ersten Reaktionen zu den gefährlichsten beim Eintauchen.</p>
<h2>Was hilft, laut den Quellen</h2>
<ul class="liste">
  <li><strong>Langsam einsteigen</strong>: Das raten die Outdoor Swimming Society und Helsana, die dazu empfiehlt, den Körper nach und nach zu benetzen.</li>
  <li><strong>Dort bleiben, wo man stehen kann</strong>, bis der Reflex vorbei und die Atmung unter Kontrolle ist (Outdoor Swimming Society).</li>
  <li><strong>Den Kopf über Wasser halten</strong>: Helsana rät, ihn nicht einzutauchen.</li>
  <li><strong>Nicht allein gehen</strong>: Wenn die Atmung davonläuft, muss jemand reagieren können (Helsana).</li>
</ul>
<h2>Und Atemtechniken?</h2>
<p>Im Internet kursieren viele Methoden (langsame Atmung, Atemanhalten, Zyklen). Für das Winterbaden haben wir keine wissenschaftliche Quelle und keine Rettungsorganisation gefunden, die eine bestimmte empfiehlt, und geben sie nicht weiter. Belegt ist Einfacheres: dem Körper Zeit lassen, den Reflex zu überstehen, bevor man schwimmt. Ein von Helsana am Genfersee befragter Schwimmer sagt, bei etwa zehn Grad Wassertemperatur werde sein Atem im kalten Wasser langsamer und gleichmässiger; das ist ein Erfahrungsbericht, kein Beweis.</p>
<h2>Wann man hinausgehen sollte</h2>
<p>Sobald man sich unwohl fühlt. Die SLRG-Regel legt die Höchstdauer fest: <strong>so viele Minuten, wie das Wasser Grad hat</strong>, und am Anfang deutlich weniger. Danach: <a href="{blog:afterdrop-se-rechauffer}">sich gut aufwärmen</a>.</p>
<p>Lesenswert auch: <a href="{blog:choc-thermique-eau-froide}">die ersten 90 Sekunden im kalten Wasser</a> und <a href="{blog:programme-4-semaines-bain-d-hiver}">ein 4-Wochen-Programm</a>. Das Wasser von heute steht in der <a href="{app}">App</a>.</p>` },
    it: { titre: 'Respirare in acqua fredda: gestire il riflesso di respiro all’ingresso', h1: 'Respirare in acqua fredda: cosa succede e cosa aiuta',
      desc: 'Il riflesso di respiro, l’iperventilazione incontrollabile, il panico: cosa descrivono la Outdoor Swimming Society, Helsana e una revisione di riferimento, e come entrare per lasciar calmare il respiro.',
      bref: 'In acqua sotto i 15 °C il corpo reagisce all’ingresso con un <strong>riflesso di respiro</strong> e poi con un’<strong>iperventilazione che non si controlla</strong> e che può provocare panico. Ciò che è documentato: entrare lentamente, restare dove si tocca finché il respiro si calma, tenere la testa fuori dall’acqua. Non abbiamo trovato una fonte solida per una tecnica di respirazione precisa, quindi non ne raccomandiamo nessuna.',
      html: () => `
<h2>Cosa succede entrando in acqua fredda?</h2>
<p>La Outdoor Swimming Society lo descrive così: sotto i 15 °C circa, l’ingresso scatena lo «shock da freddo», che inizia con un brusco riflesso inspiratorio. Segue un periodo di iperventilazione che non si può controllare: il respiro diventa rapidissimo, e può dare una sensazione di panico. I principianti tendono inoltre a mettersi in verticale, posizione in cui si galleggia meno, e il panico arriva più in fretta. Una revisione di riferimento su <em>Experimental Physiology</em> colloca queste prime reazioni tra le più pericolose dell’immersione.</p>
<h2>Cosa aiuta, secondo le fonti</h2>
<ul class="liste">
  <li><strong>Entrare lentamente</strong>: lo consigliano la Outdoor Swimming Society e Helsana, che aggiunge di bagnare il corpo poco a poco.</li>
  <li><strong>Restare dove si tocca</strong> finché il riflesso è passato e il respiro è sotto controllo (Outdoor Swimming Society).</li>
  <li><strong>Tenere la testa fuori dall’acqua</strong>: Helsana sconsiglia di immergerla.</li>
  <li><strong>Non andare da soli</strong>: se il respiro si scatena, qualcuno deve poter intervenire (Helsana).</li>
</ul>
<h2>E le tecniche di respirazione?</h2>
<p>In rete circolano molti metodi (respiri lenti, apnee, cicli). Per il nuoto invernale non abbiamo trovato una fonte scientifica né un ente di salvataggio che ne raccomandi uno preciso, e non li riprendiamo. Ciò che è provato è più semplice: dare al corpo il tempo di superare il riflesso prima di nuotare. Un nuotatore intervistato da Helsana sul Lemano, con acqua a circa dieci gradi, dice che il suo respiro in acqua fredda diventa più lento e regolare; è una testimonianza, non una prova.</p>
<h2>Quando uscire</h2>
<p>Appena ci si sente a disagio. La regola della SSS fissa la durata massima: <strong>tanti minuti quanti gradi ha l’acqua</strong>, e molti meno all’inizio. Dopo: <a href="{blog:afterdrop-se-rechauffer}">riscaldarsi bene</a>.</p>
<p>Da leggere anche: <a href="{blog:choc-thermique-eau-froide}">i primi 90 secondi in acqua fredda</a> e <a href="{blog:programme-4-semaines-bain-d-hiver}">un programma di 4 settimane</a>. L’acqua del momento è nell’<a href="{app}">app</a>.</p>` } },

  { ...base('programme-4-semaines-bain-d-hiver', 'programme-4-semaines',
      ['Un ponton de pierre et son escalier de bois qui descend dans un lac bleu, rives lointaines', 'A stone jetty and its wooden steps going down into a blue lake, distant shores', 'Ein Steinsteg mit Holztreppe, die in einen blauen See hinabführt, ferne Ufer', 'Un molo di pietra con la scala di legno che scende in un lago blu, rive lontane'],
      [SSS, HELSANA, OSS, GR]),
    fr: { titre: 'Programme de 4 semaines pour débuter le bain d’hiver, pas à pas', h1: 'Débuter le bain d’hiver : un programme de 4 semaines',
      desc: 'Quatre semaines pour passer de quelques secondes à quelques minutes dans l’eau froide, avec la règle de la Société Suisse de Sauvetage comme plafond. Une proposition de Mon Lac, pas un protocole médical.',
      bref: 'Voici <strong>notre proposition</strong> en quatre étapes, construite sur les règles des sources : commencer par quelques secondes (Helsana), entrer lentement, ne jamais dépasser <strong>autant de minutes que l’eau a de degrés</strong> (Société Suisse de Sauvetage), y aller accompagné. C’est un cadre de prudence, pas un protocole médical ni une promesse de résultat : ceux qui ont un souci de santé en parlent d’abord à leur médecin.',
      html: () => `
<h2>Les règles qui fixent le cadre</h2>
<ul class="liste">
  <li><strong>Plafond de durée</strong> : autant de minutes que l’eau a de degrés (5 minutes à 5 °C), et c’est un maximum, pas un objectif (Société Suisse de Sauvetage, Helsana).</li>
  <li><strong>Commencer petit</strong> : au début, quelques secondes suffisent ; on augmente avec le temps (Helsana).</li>
  <li><strong>Entrer lentement</strong>, se mouiller le corps peu à peu, éviter de plonger la tête (Helsana).</li>
  <li><strong>Jamais seul</strong> : une deuxième personne vient avec vous (Helsana).</li>
  <li><strong>S’habituer en été déjà</strong> : des bains réguliers en plein air avant l’automne habituent le corps aux températures plus basses (Helsana).</li>
  <li><strong>Pas de débutant sous 12 °C</strong> avec une combinaison non plus : celle-ci n’empêche ni le choc du froid ni l’hypothermie (RLSS, Royaume-Uni).</li>
</ul>
<h2>Semaine 1 : s’habituer à l’eau</h2>
<p>Deux ou trois sorties. Entrez jusqu’aux genoux, puis à la taille, quelques secondes, sans plonger. Sortez avant d’avoir vraiment froid. L’objectif : que le réflexe de souffle (<a href="{blog:respiration-eau-froide}">voir l’article</a>) devienne moins surprenant.</p>
<h2>Semaine 2 : jusqu’aux épaules</h2>
<p>Entrez lentement jusqu’aux épaules, la tête hors de l’eau, de quelques dizaines de secondes à une minute. Restez où vous avez pied, attendez que la respiration soit calme avant de bouger les bras.</p>
<h2>Semaine 3 : quelques minutes, avec prudence</h2>
<p>Passez à une ou deux minutes, puis trois si l’eau le permet. Vérifiez la <a href="#eau-du-jour">température du moment</a> avant d’entrer : le plafond de la règle baisse avec l’eau. Pour les femmes, Helsana rapporte que les experts recommandent des variantes plus douces, une à trois minutes dans une eau de 10 à 12 °C, surtout dans la seconde moitié du cycle.</p>
<h2>Semaine 4 : fixer sa routine</h2>
<p>Restez sous le plafond de la règle, et plutôt en dessous. Choisissez une plage où vous pouvez sortir facilement et vous changer à l’abri, venez avec la même personne, et prévoyez <a href="{blog:afterdrop-se-rechauffer}">le réchauffement</a> et <a href="{blog:materiel-bain-d-hiver}">le matériel</a> avant l’entrée.</p>
<h2>Quand arrêter ou s’abstenir</h2>
<p>On sort dès qu’on se sent mal à l’aise. Graubünden Ferien déconseille le bain dans l’eau glacée en cas d’hypertension, de diabète ou de maladie du cœur et des vaisseaux ; Helsana invite à y renoncer ou à demander l’avis de son médecin en cas de problème de santé ou de doute. Pour le contexte des études : <a href="{blog:bienfaits-bain-froid}">les bienfaits du bain froid</a>.</p>
<p>L’eau du moment, plage par plage, est dans l’<a href="{app}">app</a>.</p>` },
    en: { titre: 'A 4-week programme to start winter swimming, step by step', h1: 'Starting winter swimming: a 4-week programme',
      desc: 'Four weeks to go from a few seconds to a few minutes in cold water, with the Swiss Lifesaving Society’s rule as the ceiling. A suggestion from My Lake, not a medical protocol.',
      bref: 'This is <strong>our suggestion</strong> in four stages, built on the rules in the sources: start with a few seconds (Helsana), get in slowly, never exceed <strong>as many minutes as the water has degrees</strong> (Swiss Lifesaving Society), go with someone. It is a frame of caution, not a medical protocol or a promise of results: anyone with a health concern talks to their doctor first.',
      html: () => `
<h2>The rules that set the frame</h2>
<ul class="liste">
  <li><strong>Time ceiling</strong>: as many minutes as the water has degrees (5 minutes at 5 °C), and it is a maximum, not a target (Swiss Lifesaving Society, Helsana).</li>
  <li><strong>Start small</strong>: at first a few seconds are enough; build up over time (Helsana).</li>
  <li><strong>Get in slowly</strong>, wet your body gradually, avoid putting your head under (Helsana).</li>
  <li><strong>Never alone</strong>: a second person comes with you (Helsana).</li>
  <li><strong>Start in summer</strong>: regular outdoor swims before autumn get the body used to lower temperatures (Helsana).</li>
  <li><strong>No beginners below 12 °C</strong>, wetsuit or not: a wetsuit prevents neither cold shock nor hypothermia (RLSS, UK).</li>
</ul>
<h2>Week 1: get used to the water</h2>
<p>Two or three outings. Go in up to your knees, then your waist, for a few seconds, without ducking. Get out before you are really cold. The aim: for the gasp reflex (<a href="{blog:respiration-eau-froide}">see the article</a>) to be less of a surprise.</p>
<h2>Week 2: up to the shoulders</h2>
<p>Go in slowly up to your shoulders, head out of the water, for a few tens of seconds up to a minute. Stay where you can stand, and wait for your breathing to settle before moving your arms.</p>
<h2>Week 3: a few minutes, carefully</h2>
<p>Move to one or two minutes, then three if the water allows. Check the <a href="#eau-du-jour">current temperature</a> before you get in: the ceiling of the rule drops with the water. For women, Helsana reports that experts recommend gentler variants, one to three minutes in water at 10 to 12 °C, especially in the second half of the cycle.</p>
<h2>Week 4: settle your routine</h2>
<p>Stay under the ceiling of the rule, and preferably well under it. Pick a beach where you can get out easily and change under shelter, come with the same person, and plan <a href="{blog:afterdrop-se-rechauffer}">the warm-up</a> and <a href="{blog:materiel-bain-d-hiver}">the kit</a> before you get in.</p>
<h2>When to stop or to stay out</h2>
<p>Get out as soon as you feel uncomfortable. Graubünden Ferien discourages icy-water bathing for high blood pressure, diabetes, and heart or vascular disease; Helsana advises giving it up or asking your doctor if you have a health problem or any doubt. For the context of the studies: <a href="{blog:bienfaits-bain-froid}">the benefits of cold-water swimming</a>.</p>
<p>The current water temperature, beach by beach, is in the <a href="{app}">app</a>.</p>` },
    de: { titre: '4-Wochen-Programm für den Einstieg ins Winterbaden, Schritt für Schritt', h1: 'Mit dem Winterbaden beginnen: ein 4-Wochen-Programm',
      desc: 'Vier Wochen von wenigen Sekunden zu einigen Minuten im kalten Wasser, mit der Regel der Schweizerischen Lebensrettungs-Gesellschaft als Obergrenze. Ein Vorschlag von Mein See, kein medizinisches Protokoll.',
      bref: 'Das ist <strong>unser Vorschlag</strong> in vier Stufen, gebaut auf den Regeln der Quellen: mit wenigen Sekunden beginnen (Helsana), langsam einsteigen, nie mehr Minuten im Wasser bleiben, als das Wasser <strong>Grad hat</strong> (SLRG), in Begleitung gehen. Es ist ein Rahmen der Vorsicht, kein medizinisches Protokoll und kein Erfolgsversprechen: Wer ein Gesundheitsproblem hat, spricht zuerst mit der Ärztin oder dem Arzt.',
      html: () => `
<h2>Die Regeln, die den Rahmen setzen</h2>
<ul class="liste">
  <li><strong>Zeitgrenze</strong>: so viele Minuten, wie das Wasser Grad hat (5 Minuten bei 5 °C), und zwar als Höchstwert, nicht als Ziel (SLRG, Helsana).</li>
  <li><strong>Klein anfangen</strong>: Am Anfang genügen wenige Sekunden; man steigert sich mit der Zeit (Helsana).</li>
  <li><strong>Langsam einsteigen</strong>, den Körper nach und nach benetzen, den Kopf nicht eintauchen (Helsana, SLRG).</li>
  <li><strong>Nie allein</strong>: Eine zweite Person kommt mit (Helsana).</li>
  <li><strong>Schon im Sommer gewöhnen</strong>: Regelmässiges Baden im Freien vor dem Herbst gewöhnt den Körper an tiefere Temperaturen (Helsana).</li>
  <li><strong>Keine Anfänger unter 12 °C</strong>, auch nicht im Neoprenanzug: Er verhindert weder Kälteschock noch Unterkühlung (RLSS, Grossbritannien).</li>
</ul>
<h2>Woche 1: ans Wasser gewöhnen</h2>
<p>Zwei bis drei Ausflüge. Bis zu den Knien, dann bis zur Hüfte hineingehen, einige Sekunden lang, ohne zu tauchen. Hinausgehen, bevor man richtig friert. Ziel: dass der Atemreflex (<a href="{blog:respiration-eau-froide}">siehe Artikel</a>) weniger überrascht.</p>
<h2>Woche 2: bis zu den Schultern</h2>
<p>Langsam bis zu den Schultern einsteigen, Kopf über Wasser, einige Dutzend Sekunden bis eine Minute. Dort bleiben, wo man stehen kann, und warten, bis sich die Atmung beruhigt hat, bevor man die Arme bewegt.</p>
<h2>Woche 3: einige Minuten, mit Vorsicht</h2>
<p>Auf ein bis zwei Minuten steigern, dann drei, wenn das Wasser es erlaubt. Die <a href="#eau-du-jour">aktuelle Temperatur</a> vor dem Einstieg prüfen: Die Obergrenze der Regel sinkt mit dem Wasser. Für Frauen berichtet Helsana, Fachleute empfählen sanftere Varianten, eine bis drei Minuten in Wasser von 10 bis 12 °C, vor allem in der zweiten Zyklushälfte.</p>
<h2>Woche 4: die Routine festigen</h2>
<p>Unter der Obergrenze der Regel bleiben, besser deutlich darunter. Einen Badeplatz wählen, an dem man leicht hinauskommt und sich geschützt umziehen kann, mit derselben Person kommen und <a href="{blog:afterdrop-se-rechauffer}">das Aufwärmen</a> und <a href="{blog:materiel-bain-d-hiver}">die Ausrüstung</a> vor dem Einstieg einplanen.</p>
<h2>Wann man aufhört oder verzichtet</h2>
<p>Man geht hinaus, sobald man sich unwohl fühlt. Graubünden Ferien rät bei Bluthochdruck, Diabetes sowie Herz- und Gefässerkrankungen vom Eisbaden ab; Helsana empfiehlt, bei gesundheitlichen Problemen oder Unsicherheit darauf zu verzichten oder es ärztlich abklären zu lassen. Zum Einordnen der Studien: <a href="{blog:bienfaits-bain-froid}">die Wirkung von Kaltbaden</a>.</p>
<p>Das Wasser von heute, Badeplatz für Badeplatz, steht in der <a href="{app}">App</a>.</p>` },
    it: { titre: 'Programma di 4 settimane per iniziare il bagno invernale, passo dopo passo', h1: 'Iniziare il bagno invernale: un programma di 4 settimane',
      desc: 'Quattro settimane per passare da qualche secondo a qualche minuto in acqua fredda, con la regola della Società Svizzera di Salvataggio come tetto. Una proposta di Il mio lago, non un protocollo medico.',
      bref: 'Questa è <strong>la nostra proposta</strong> in quattro tappe, costruita sulle regole delle fonti: cominciare con pochi secondi (Helsana), entrare lentamente, non superare mai <strong>tanti minuti quanti gradi ha l’acqua</strong> (Società Svizzera di Salvataggio), andare in compagnia. È un quadro di prudenza, non un protocollo medico né una promessa di risultati: chi ha un problema di salute ne parla prima con il medico.',
      html: () => `
<h2>Le regole che fissano il quadro</h2>
<ul class="liste">
  <li><strong>Tetto di durata</strong>: tanti minuti quanti gradi ha l’acqua (5 minuti a 5 °C), ed è un massimo, non un obiettivo (Società Svizzera di Salvataggio, Helsana).</li>
  <li><strong>Cominciare in piccolo</strong>: all’inizio bastano pochi secondi; si aumenta col tempo (Helsana).</li>
  <li><strong>Entrare lentamente</strong>, bagnare il corpo poco a poco, evitare di immergere la testa (Helsana).</li>
  <li><strong>Mai da soli</strong>: una seconda persona viene con voi (Helsana).</li>
  <li><strong>Abituarsi già d’estate</strong>: bagni regolari all’aperto prima dell’autunno abituano il corpo a temperature più basse (Helsana).</li>
  <li><strong>Niente principianti sotto i 12 °C</strong>, anche con la muta: non impedisce né lo shock da freddo né l’ipotermia (RLSS, Regno Unito).</li>
</ul>
<h2>Settimana 1: abituarsi all’acqua</h2>
<p>Due o tre uscite. Entrate fino alle ginocchia, poi fino alla vita, per qualche secondo, senza immergervi. Uscite prima di avere davvero freddo. L’obiettivo: che il riflesso di respiro (<a href="{blog:respiration-eau-froide}">vedi l’articolo</a>) sorprenda meno.</p>
<h2>Settimana 2: fino alle spalle</h2>
<p>Entrate lentamente fino alle spalle, testa fuori dall’acqua, da qualche decina di secondi a un minuto. Restate dove toccate e aspettate che il respiro si calmi prima di muovere le braccia.</p>
<h2>Settimana 3: qualche minuto, con prudenza</h2>
<p>Passate a uno o due minuti, poi tre se l’acqua lo permette. Controllate la <a href="#eau-du-jour">temperatura del momento</a> prima di entrare: il tetto della regola scende con l’acqua. Per le donne, Helsana riferisce che gli esperti raccomandano varianti più dolci, da uno a tre minuti in acqua da 10 a 12 °C, soprattutto nella seconda metà del ciclo.</p>
<h2>Settimana 4: fissare la routine</h2>
<p>Restate sotto il tetto della regola, meglio se molto sotto. Scegliete una spiaggia da cui si esce facilmente e dove ci si cambia al riparo, venite con la stessa persona, e prevedete <a href="{blog:afterdrop-se-rechauffer}">il riscaldamento</a> e <a href="{blog:materiel-bain-d-hiver}">l’attrezzatura</a> prima dell’ingresso.</p>
<h2>Quando fermarsi o rinunciare</h2>
<p>Si esce appena ci si sente a disagio. Graubünden Ferien sconsiglia il bagno in acqua gelida in caso di pressione alta, diabete o malattie del cuore e dei vasi; Helsana invita a rinunciare o a chiedere il parere del medico in caso di problemi di salute o di dubbio. Per inquadrare gli studi: <a href="{blog:bienfaits-bain-froid}">i benefici del bagno freddo</a>.</p>
<p>L’acqua del momento, spiaggia per spiaggia, è nell’<a href="{app}">app</a>.</p>` } },

  { ...base('neoprene-bain-d-hiver', 'neoprene',
      ['Un banc de bois sur un ponton avec des gants, des chaussons et un bonnet de laine, le lac au petit matin', 'A wooden bench on a jetty with gloves, boots and a wool hat, the lake at dawn', 'Eine Holzbank auf einem Steg mit Handschuhen, Schuhen und einer Wollmütze, der See im Morgenlicht', 'Una panchina di legno su un molo con guanti, scarpette e un berretto di lana, il lago all’alba'],
      [RLSS, HELSANA, SSS]),
    fr: { titre: 'Néoprène pour le bain d’hiver : combinaison, gants, chaussons, ce que ça change', h1: 'Néoprène et bain d’hiver : combinaison, gants et chaussons',
      desc: 'À quoi sert une combinaison en eau froide, quelle épaisseur selon la température d’après la RLSS, pourquoi elle n’empêche ni le choc du froid ni l’hypothermie, et les gants et chaussons dont parle Helsana.',
      bref: 'Une combinaison en néoprène aide à <strong>garder la chaleur</strong> et à flotter, surtout en dessous de 18 °C, mais elle <strong>n’empêche ni le choc du froid ni l’hypothermie</strong>, et la RLSS déconseille aux débutants une eau sous 12 °C même en combinaison. Pour le bain d’hiver classique, Helsana liste bonnet, bouée, serviette et vêtements chauds, et, au besoin, des gants et des chaussons en néoprène.',
      html: () => `
<h2>Ce que fait une combinaison, et ce qu’elle ne fait pas</h2>
<p>Selon la RLSS, nager en combinaison en eau libre est en général plus sûr, surtout quand l’eau est à 18 °C ou moins : elle aide à garder la chaleur et améliore la flottabilité. Mais on peut éprouver le choc du froid et l’hypothermie en combinaison, et la RLSS déconseille aux débutants de nager dans une eau sous 12 °C. La combinaison ne remplace donc pas <a href="{blog:programme-4-semaines-bain-d-hiver}">l’habituation progressive</a>.</p>
<h2>Quelle épaisseur ?</h2>
<p>La RLSS donne une grille, à prendre comme un ordre de grandeur :</p>
<ul class="liste">
  <li>au-dessus de 20 °C : pas forcément de combinaison, une fine de 1 à 2 mm peut suffire ;</li>
  <li>16 à 20 °C : 2 ou 3 mm ;</li>
  <li>14 à 17 °C : 3 ou 4 mm ;</li>
  <li>11 à 14 °C : 4 ou 5 mm ;</li>
  <li>sous 12 °C : 5 mm ou plus.</li>
</ul>
<p>Le choix dépend aussi de votre sensibilité au froid, de votre niveau et des conditions. Une combinaison bien ajustée garde la chaleur parce qu’elle limite l’eau qui circule entre elle et la peau, sans gêner les mouvements. Essayez plusieurs modèles.</p>
<h2>Gants, chaussons et le reste</h2>
<p>Pour le bain d’hiver sans combinaison, Helsana recommande un bonnet (de bain ou en laine), une bouée de nage ou un sac étanche, une serviette, des vêtements chauds et une boisson chaude pour après, et, au besoin, des gants et des chaussettes en néoprène. Et, par sécurité, de venir avec une deuxième personne. La liste complète : <a href="{blog:materiel-bain-d-hiver}">le matériel pour le bain d’hiver</a>.</p>
<h2>Après le bain</h2>
<p>Le néoprène mouillé refroidit : on s’en débarrasse vite et on s’habille au sec. La Société Suisse de Sauvetage déconseille la douche chaude juste après le bain et recommande une boisson tiède : <a href="{blog:afterdrop-se-rechauffer}">le détail sur l’afterdrop</a>.</p>
<p>L’eau du moment, plage par plage, est dans l’<a href="{app}">app</a>.</p>` },
    en: { titre: 'Neoprene for winter swimming: wetsuit, gloves, boots, and what they change', h1: 'Neoprene and winter swimming: wetsuit, gloves and boots',
      desc: 'What a wetsuit does in cold water, which thickness for which temperature according to RLSS, why it prevents neither cold shock nor hypothermia, and the gloves and boots Helsana mentions.',
      bref: 'A neoprene wetsuit helps you <strong>retain warmth</strong> and float, especially below 18 °C, but it <strong>prevents neither cold shock nor hypothermia</strong>, and RLSS advises beginners against water below 12 °C even in a wetsuit. For classic winter swimming, Helsana lists a hat, a tow float, a towel and warm clothes, and, if needed, neoprene gloves and socks.',
      html: () => `
<h2>What a wetsuit does, and what it doesn’t</h2>
<p>According to RLSS, swimming in a wetsuit in open water is generally safer, especially when the water is 18 °C or lower: it helps retain warmth and improves buoyancy. But you can still experience cold shock and hypothermia in a wetsuit, and RLSS does not recommend that beginners swim in water below 12 °C. A wetsuit therefore does not replace <a href="{blog:programme-4-semaines-bain-d-hiver}">gradual acclimatisation</a>.</p>
<h2>Which thickness?</h2>
<p>RLSS gives a guide, to be taken as a rough order of magnitude:</p>
<ul class="liste">
  <li>above 20 °C: not necessarily a wetsuit, a thin 1 to 2 mm one may be enough;</li>
  <li>16 to 20 °C: 2 or 3 mm;</li>
  <li>14 to 17 °C: 3 or 4 mm;</li>
  <li>11 to 14 °C: 4 or 5 mm;</li>
  <li>below 12 °C: 5 mm or more.</li>
</ul>
<p>The choice also depends on how much you feel the cold, your ability and the conditions. A well-fitting wetsuit keeps you warm because it limits the water circulating between suit and skin, without restricting movement. Try several models.</p>
<h2>Gloves, boots and the rest</h2>
<p>For winter swimming without a wetsuit, Helsana recommends a hat (swim cap or wool), a tow float or dry bag, a towel, warm clothes and a hot drink for afterwards, and, if needed, neoprene gloves and socks. And, for safety, to come with a second person. The full list: <a href="{blog:materiel-bain-d-hiver}">kit for winter swimming</a>.</p>
<h2>After the swim</h2>
<p>Wet neoprene chills: get out of it quickly and dress in dry clothes. The Swiss Lifesaving Society advises against a hot shower right after the swim and recommends a lukewarm drink: <a href="{blog:afterdrop-se-rechauffer}">more on afterdrop</a>.</p>
<p>The current water temperature, beach by beach, is in the <a href="{app}">app</a>.</p>` },
    de: { titre: 'Neopren fürs Winterbaden: Anzug, Handschuhe, Schuhe und was sie bewirken', h1: 'Neopren und Winterbaden: Anzug, Handschuhe und Schuhe',
      desc: 'Was ein Neoprenanzug im kalten Wasser leistet, welche Dicke bei welcher Temperatur laut RLSS, warum er weder Kälteschock noch Unterkühlung verhindert und welche Handschuhe und Socken Helsana erwähnt.',
      bref: 'Ein Neoprenanzug hilft, die <strong>Wärme zu halten</strong> und zu schwimmen, besonders unter 18 °C, doch er <strong>verhindert weder Kälteschock noch Unterkühlung</strong>, und die RLSS rät Anfängern auch im Anzug von Wasser unter 12 °C ab. Fürs klassische Winterbaden nennt Helsana Mütze, Schwimmboje, Handtuch und warme Kleidung und bei Bedarf Neoprenhandschuhe und -socken.',
      html: () => `
<h2>Was ein Anzug leistet und was nicht</h2>
<p>Laut RLSS ist das Schwimmen im Neoprenanzug im Freiwasser in der Regel sicherer, besonders bei Wassertemperaturen von 18 °C oder weniger: Er hilft, die Wärme zu halten, und verbessert den Auftrieb. Aber man kann auch im Anzug Kälteschock und Unterkühlung erleben, und die RLSS rät Anfängern davon ab, in Wasser unter 12 °C zu schwimmen. Ein Anzug ersetzt also nicht <a href="{blog:programme-4-semaines-bain-d-hiver}">die schrittweise Gewöhnung</a>.</p>
<h2>Welche Dicke?</h2>
<p>Die RLSS gibt eine Übersicht, als grobe Grössenordnung zu verstehen:</p>
<ul class="liste">
  <li>über 20 °C: nicht unbedingt ein Anzug, ein dünner von 1 bis 2 mm kann genügen;</li>
  <li>16 bis 20 °C: 2 oder 3 mm;</li>
  <li>14 bis 17 °C: 3 oder 4 mm;</li>
  <li>11 bis 14 °C: 4 oder 5 mm;</li>
  <li>unter 12 °C: 5 mm oder mehr.</li>
</ul>
<p>Die Wahl hängt auch davon ab, wie kälteempfindlich man ist, vom Können und von den Bedingungen. Ein gut sitzender Anzug hält warm, weil er das zwischen Anzug und Haut zirkulierende Wasser begrenzt, ohne die Bewegung einzuschränken. Mehrere Modelle anprobieren.</p>
<h2>Handschuhe, Schuhe und der Rest</h2>
<p>Fürs Winterbaden ohne Anzug empfiehlt Helsana eine Kopfbedeckung (Badekappe oder Mütze), eine Schwimmboje oder einen Dry-Bag, ein Handtuch, warme Kleidung und ein warmes Getränk für danach und bei Bedarf Neoprenhandschuhe und -socken. Und aus Sicherheitsgründen, eine zweite Person mitzunehmen. Die ganze Liste: <a href="{blog:materiel-bain-d-hiver}">die Ausrüstung fürs Winterbaden</a>.</p>
<h2>Nach dem Bad</h2>
<p>Nasses Neopren kühlt aus: schnell ausziehen und trockene Kleidung anziehen. Die Schweizerische Lebensrettungs-Gesellschaft rät direkt nach dem Bad von der heissen Dusche ab und empfiehlt ein lauwarmes Getränk: <a href="{blog:afterdrop-se-rechauffer}">mehr zum Afterdrop</a>.</p>
<p>Das Wasser von heute, Badeplatz für Badeplatz, steht in der <a href="{app}">App</a>.</p>` },
    it: { titre: 'Neoprene per il bagno invernale: muta, guanti, scarpette e cosa cambiano', h1: 'Neoprene e bagno invernale: muta, guanti e scarpette',
      desc: 'Cosa fa una muta in acqua fredda, quale spessore per quale temperatura secondo la RLSS, perché non impedisce né lo shock da freddo né l’ipotermia, e i guanti e le calze di cui parla Helsana.',
      bref: 'Una muta in neoprene aiuta a <strong>trattenere il calore</strong> e a galleggiare, soprattutto sotto i 18 °C, ma <strong>non impedisce né lo shock da freddo né l’ipotermia</strong>, e la RLSS sconsiglia ai principianti l’acqua sotto i 12 °C anche in muta. Per il bagno invernale classico, Helsana elenca berretto, boa di nuoto, asciugamano e vestiti caldi e, se serve, guanti e calze in neoprene.',
      html: () => `
<h2>Cosa fa una muta e cosa no</h2>
<p>Secondo la RLSS, nuotare in muta in acque libere è in genere più sicuro, soprattutto con acqua a 18 °C o meno: aiuta a trattenere il calore e migliora la galleggiabilità. Ma si possono provare lo shock da freddo e l’ipotermia anche in muta, e la RLSS sconsiglia ai principianti di nuotare in acqua sotto i 12 °C. La muta non sostituisce quindi <a href="{blog:programme-4-semaines-bain-d-hiver}">l’abitudine graduale</a>.</p>
<h2>Che spessore?</h2>
<p>La RLSS dà una tabella, da prendere come ordine di grandezza:</p>
<ul class="liste">
  <li>sopra i 20 °C: non per forza una muta, una sottile da 1 a 2 mm può bastare;</li>
  <li>da 16 a 20 °C: 2 o 3 mm;</li>
  <li>da 14 a 17 °C: 3 o 4 mm;</li>
  <li>da 11 a 14 °C: 4 o 5 mm;</li>
  <li>sotto i 12 °C: 5 mm o più.</li>
</ul>
<p>La scelta dipende anche da quanto si soffre il freddo, dal livello e dalle condizioni. Una muta ben aderente tiene caldo perché limita l’acqua che circola tra muta e pelle, senza impedire i movimenti. Provate più modelli.</p>
<h2>Guanti, scarpette e il resto</h2>
<p>Per il bagno invernale senza muta, Helsana raccomanda un copricapo (cuffia o berretto), una boa da nuoto o un sacco impermeabile, un asciugamano, vestiti caldi e una bevanda calda per dopo e, se serve, guanti e calze in neoprene. E, per sicurezza, di venire con una seconda persona. L’elenco completo: <a href="{blog:materiel-bain-d-hiver}">l’attrezzatura per il bagno invernale</a>.</p>
<h2>Dopo il bagno</h2>
<p>Il neoprene bagnato raffredda: toglietelo in fretta e vestitevi all’asciutto. La Società Svizzera di Salvataggio sconsiglia la doccia calda subito dopo il bagno e raccomanda una bevanda tiepida: <a href="{blog:afterdrop-se-rechauffer}">i dettagli sull’afterdrop</a>.</p>
<p>L’acqua del momento, spiaggia per spiaggia, è nell’<a href="{app}">app</a>.</p>` } },

  { ...base('bain-d-hiver-en-groupe-suisse', 'clubs-bain-d-hiver',
      ['Un ponton de bois en hiver, peignoirs accrochés à la rambarde, échelle dans l’eau fumante, Alpes au fond', 'A wooden jetty in winter, bathrobes hung on the railing, a ladder into steaming water, the Alps behind', 'Ein Holzsteg im Winter, Bademäntel am Geländer, eine Leiter ins dampfende Wasser, dahinter die Alpen', 'Un molo di legno in inverno, accappatoi appesi alla ringhiera, una scaletta nell’acqua fumante, le Alpi sullo sfondo'],
      [GR, ZH, HELSANA, SSS]),
    fr: { titre: 'Bain d’hiver en groupe en Suisse : cours, ateliers et rendez-vous pour débuter', h1: 'Bain d’hiver en groupe : où débuter accompagné en Suisse',
      desc: 'Eisbadi d’Arosa, cours à Davos et à Saint-Moritz, Seebad Utoquai à Zurich, Pâquis à Genève : où l’on peut apprendre le bain d’hiver avec d’autres, et pourquoi il vaut mieux ne pas y aller seul.',
      bref: 'Pour débuter, <strong>le plus sûr est d’y aller avec d’autres</strong> : Graubünden Ferien le dit, Helsana aussi, et Zürich Tourismus recommande un encadrement pour commencer. Voici ce que nous avons pu vérifier : l’Eisbadi d’Arosa (atelier quotidien pour les débutants), des cours à Davos et à Saint-Moritz, des cours encadrés au Seebad Utoquai à Zurich. Nous n’avons pas trouvé de liste officielle de clubs de bain d’hiver en Suisse, et n’en inventons pas.',
      html: () => `
<h2>Pourquoi y aller en groupe ?</h2>
<p>Graubünden Ferien écrit que le bain dans l’eau glacée se fait uniquement accompagné : il est plus agréable en groupe, et plus sûr si la circulation fait défaut malgré la préparation. Helsana demande de venir avec une deuxième personne, par sécurité, et la Société Suisse de Sauvetage rappelle la règle des minutes : <a href="{blog:bain-d-hiver-leman}">autant de minutes que l’eau a de degrés</a>. Zürich Tourismus recommande aux débutants une offre encadrée, qui apporte les bases et des repères.</p>
<h2>Grisons : de l’eau à zéro degré, avec encadrement</h2>
<ul class="liste">
  <li><strong>Eisbadi Arosa</strong> : présentée comme la première Eisbadi de Suisse, avec un atelier quotidien pour les débutants ; les places de bain sont ensuite accessibles en tout temps aux personnes expérimentées, et un wagon-sauna permet de se réchauffer (Graubünden Ferien).</li>
  <li><strong>Davos</strong> : Markus Blum propose des cours pour débutants et avancés, dans un bassin au bord du lac de Davos, ou pour les expérimentés dans un trou dans la glace du lac naturel (Graubünden Ferien).</li>
  <li><strong>Saint-Moritz</strong> : on peut se baigner dans le lac gelé derrière la Reithalle, avec des vestiaires à l’Eisarena Ludains ; pour les débutants, St. Moritz Outdoors propose un bain de glace accompagné (Graubünden Ferien).</li>
</ul>
<h2>Zurich : cours et sauna</h2>
<p>D’après Zürich Tourismus, le Seebad Utoquai offre des débuts structurés, avec des cours encadrés par des professionnels. La ville associe aussi le bain d’hiver et la sauna : la Sauna am Fluss alterne chaleur et courts bains froids dans la Limmat, et le Saunaboot permet de nager dans le lac de Zurich après la sauna, en privé. Notre guide : <a href="{blog:bain-d-hiver-zurich}">le bain d’hiver à Zurich</a>, et <a href="{blog:saunas-lac-de-zurich}">les saunas du lac</a>.</p>
<h2>Léman et Trois-Lacs</h2>
<p>Nous détaillons Genève et Lausanne dans <a href="{blog:bain-d-hiver-leman}">le bain d’hiver au Léman</a>, et Neuchâtel, Bienne et Morat dans <a href="{blog:bain-d-hiver-neuchatel-bienne-morat}">le bain d’hiver dans les Trois-Lacs</a>. Pour se réchauffer ensuite : <a href="{blog:saunas-bord-du-leman}">les saunas du Léman</a>.</p>
<h2>Ce qu’on n’a pas pu vérifier</h2>
<p>Nous n’avons pas trouvé de liste officielle de clubs ou de groupes de bain d’hiver en Suisse, et Graubünden Ferien cite une association faîtière, la « Swiss Cold Training Association », dont nous n’avons pas lu les pages. Si vous organisez une sortie régulière et souhaitez qu’on la mentionne, écrivez-nous : nous la vérifierons avant de la publier.</p>
<p>Avant de partir : <a href="{blog:programme-4-semaines-bain-d-hiver}">un programme de 4 semaines</a>, <a href="{blog:materiel-bain-d-hiver}">le matériel</a>. L’eau du moment est dans l’<a href="{app}">app</a>.</p>` },
    en: { titre: 'Winter swimming in a group in Switzerland: courses, workshops and meet-ups for beginners', h1: 'Winter swimming in a group: where to start with company in Switzerland',
      desc: 'Eisbadi Arosa, courses in Davos and St. Moritz, Seebad Utoquai in Zurich, Pâquis in Geneva: where you can learn winter swimming with others, and why it is better not to go alone.',
      bref: 'To start, <strong>the safest way is to go with others</strong>: Graubünden Ferien says so, Helsana too, and Zürich Tourismus recommends guidance for beginners. Here is what we could verify: Eisbadi Arosa (daily workshop for beginners), courses in Davos and St. Moritz, guided courses at Seebad Utoquai in Zurich. We found no official list of winter-swimming clubs in Switzerland, and we do not invent one.',
      html: () => `
<h2>Why go in a group?</h2>
<p>Graubünden Ferien writes that ice bathing is done only with company: it is more fun in a group, and safer if your circulation gives out despite preparation. Helsana asks you to bring a second person, for safety, and the Swiss Lifesaving Society reminds us of the minutes rule: <a href="{blog:bain-d-hiver-leman}">as many minutes as the water has degrees</a>. Zürich Tourismus recommends a guided offer for beginners, which provides the basics and some bearings.</p>
<h2>Graubünden: near-freezing water, with guidance</h2>
<ul class="liste">
  <li><strong>Eisbadi Arosa</strong>: presented as the first Eisbadi in Switzerland, with a daily workshop for beginners; the bathing spots are then open at any time to experienced swimmers, and a sauna wagon lets you warm up (Graubünden Ferien).</li>
  <li><strong>Davos</strong>: Markus Blum offers courses for beginners and advanced swimmers, in a pool by Lake Davos, or for the experienced in a hole cut in the ice of the natural lake (Graubünden Ferien).</li>
  <li><strong>St. Moritz</strong>: you can bathe in the frozen lake behind the Reithalle, with changing rooms at the Eisarena Ludains; for beginners, St. Moritz Outdoors offers guided ice bathing (Graubünden Ferien).</li>
</ul>
<h2>Zurich: courses and sauna</h2>
<p>According to Zürich Tourismus, Seebad Utoquai offers structured introductions, with courses led by professionals. The city also pairs winter swimming with sauna: the Sauna am Fluss alternates heat with short cold dips in the Limmat, and the Saunaboot lets you swim in Lake Zurich after the sauna, in private. Our guides: <a href="{blog:bain-d-hiver-zurich}">winter swimming in Zurich</a>, and <a href="{blog:saunas-lac-de-zurich}">the lakeside saunas</a>.</p>
<h2>Lake Geneva and the Three Lakes</h2>
<p>We cover Geneva and Lausanne in <a href="{blog:bain-d-hiver-leman}">winter swimming on Lake Geneva</a>, and Neuchâtel, Biel and Murten in <a href="{blog:bain-d-hiver-neuchatel-bienne-morat}">winter swimming in the Three Lakes</a>. To warm up afterwards: <a href="{blog:saunas-bord-du-leman}">the saunas of Lake Geneva</a>.</p>
<h2>What we could not verify</h2>
<p>We found no official list of winter-swimming clubs or groups in Switzerland, and Graubünden Ferien cites an umbrella body, the “Swiss Cold Training Association”, whose pages we did not read. If you run a regular outing and would like it mentioned, write to us: we will check it before publishing.</p>
<p>Before you go: <a href="{blog:programme-4-semaines-bain-d-hiver}">a 4-week programme</a>, <a href="{blog:materiel-bain-d-hiver}">the kit</a>. The current water temperature is in the <a href="{app}">app</a>.</p>` },
    de: { titre: 'Winterbaden in der Gruppe in der Schweiz: Kurse, Workshops und Treffpunkte für den Einstieg', h1: 'Winterbaden in der Gruppe: wo man in der Schweiz begleitet einsteigt',
      desc: 'Eisbadi Arosa, Kurse in Davos und St. Moritz, Seebad Utoquai in Zürich, Pâquis in Genf: wo man Winterbaden mit anderen lernen kann und warum man besser nicht allein geht.',
      bref: 'Für den Einstieg ist es <strong>am sichersten, mit anderen zu gehen</strong>: Graubünden Ferien sagt es, Helsana auch, und Zürich Tourismus empfiehlt Einsteigenden ein begleitetes Angebot. Das konnten wir überprüfen: die Eisbadi Arosa (täglicher Workshop für Neulinge), Kurse in Davos und St. Moritz, begleitete Kurse im Seebad Utoquai in Zürich. Eine offizielle Liste von Winterbade-Clubs in der Schweiz haben wir nicht gefunden und erfinden keine.',
      html: () => `
<h2>Warum in der Gruppe?</h2>
<p>Graubünden Ferien schreibt, Eisbaden gehe nur in Begleitung: Es mache in der Gruppe mehr Spass und sei sicherer, falls der Kreislauf trotz Vorbereitung schlappmacht. Helsana bittet, aus Sicherheitsgründen eine zweite Person mitzunehmen, und die Schweizerische Lebensrettungs-Gesellschaft erinnert an die Minutenregel: <a href="{blog:bain-d-hiver-leman}">so viele Minuten, wie das Wasser Grad hat</a>. Zürich Tourismus empfiehlt Einsteigenden ein begleitetes Angebot, das Grundlagen und Orientierung vermittelt.</p>
<h2>Graubünden: Wasser um den Nullpunkt, mit Begleitung</h2>
<ul class="liste">
  <li><strong>Eisbadi Arosa</strong>: als erste Eisbadi der Schweiz vorgestellt, mit täglichem Workshop für Neulinge; die Badeplätze sind danach für Erfahrene jederzeit zugänglich, und im Saunawagen kann man sich aufwärmen (Graubünden Ferien).</li>
  <li><strong>Davos</strong>: Markus Blum bietet Kurse für Anfängerinnen und Fortgeschrittene im Pool am Davoser See oder für Profis im Eisloch im Natursee an (Graubünden Ferien).</li>
  <li><strong>St. Moritz</strong>: Hinter der Reithalle kann man im gefrorenen St. Moritzersee baden, Umkleiden gibt es in der Eisarena Ludains; für Neulinge bietet St. Moritz Outdoors begleitetes Eisbaden an (Graubünden Ferien).</li>
</ul>
<h2>Zürich: Kurse und Sauna</h2>
<p>Laut Zürich Tourismus bietet das Seebad Utoquai strukturierte Einstiege mit professionell begleiteten Kursen. Die Stadt verbindet das Winterbaden auch mit der Sauna: Die Sauna am Fluss kombiniert Saunagänge mit kurzen Kälteimpulsen in der Limmat, und das Saunaboot macht Schwimmen im Zürichsee nach der Sauna zum privaten Erlebnis. Unsere Ratgeber: <a href="{blog:bain-d-hiver-zurich}">Winterbaden in Zürich</a> und <a href="{blog:saunas-lac-de-zurich}">die Saunas am See</a>.</p>
<h2>Genfersee und Drei-Seen-Land</h2>
<p>Genf und Lausanne behandeln wir in <a href="{blog:bain-d-hiver-leman}">Winterbaden im Genfersee</a>, Neuenburg, Biel und Murten in <a href="{blog:bain-d-hiver-neuchatel-bienne-morat}">Winterbaden im Drei-Seen-Land</a>. Zum Aufwärmen danach: <a href="{blog:saunas-bord-du-leman}">die Saunas am Genfersee</a>.</p>
<h2>Was wir nicht überprüfen konnten</h2>
<p>Eine offizielle Liste von Winterbade-Clubs oder -Gruppen in der Schweiz haben wir nicht gefunden, und Graubünden Ferien nennt einen Dachverband, die «Swiss Cold Training Association», dessen Seiten wir nicht gelesen haben. Wenn Sie einen regelmässigen Treff organisieren und erwähnt werden möchten, schreiben Sie uns: Wir prüfen ihn vor der Veröffentlichung.</p>
<p>Vor dem Aufbruch: <a href="{blog:programme-4-semaines-bain-d-hiver}">ein 4-Wochen-Programm</a>, <a href="{blog:materiel-bain-d-hiver}">die Ausrüstung</a>. Das Wasser von heute steht in der <a href="{app}">App</a>.</p>` },
    it: { titre: 'Bagno invernale in gruppo in Svizzera: corsi, workshop e ritrovi per iniziare', h1: 'Bagno invernale in gruppo: dove iniziare in compagnia in Svizzera',
      desc: 'Eisbadi di Arosa, corsi a Davos e St. Moritz, Seebad Utoquai a Zurigo, Pâquis a Ginevra: dove si può imparare il bagno invernale con altri, e perché è meglio non andare da soli.',
      bref: 'Per iniziare, <strong>il più sicuro è andare con altri</strong>: lo dice Graubünden Ferien, lo dice Helsana, e Zürich Tourismus raccomanda ai principianti un’offerta guidata. Ecco cosa abbiamo potuto verificare: l’Eisbadi di Arosa (workshop quotidiano per i principianti), corsi a Davos e St. Moritz, corsi guidati al Seebad Utoquai di Zurigo. Non abbiamo trovato un elenco ufficiale di club di bagno invernale in Svizzera, e non ne inventiamo uno.',
      html: () => `
<h2>Perché in gruppo?</h2>
<p>Graubünden Ferien scrive che il bagno in acqua gelida si fa solo in compagnia: in gruppo è più divertente e più sicuro, se la circolazione cede nonostante la preparazione. Helsana chiede di venire con una seconda persona, per sicurezza, e la Società Svizzera di Salvataggio ricorda la regola dei minuti: <a href="{blog:bain-d-hiver-leman}">tanti minuti quanti gradi ha l’acqua</a>. Zürich Tourismus raccomanda ai principianti un’offerta guidata, che dà le basi e dei punti di riferimento.</p>
<h2>Grigioni: acqua attorno allo zero, con accompagnamento</h2>
<ul class="liste">
  <li><strong>Eisbadi Arosa</strong>: presentata come la prima Eisbadi della Svizzera, con un workshop quotidiano per i principianti; i posti per il bagno sono poi accessibili sempre agli esperti, e un vagone-sauna permette di riscaldarsi (Graubünden Ferien).</li>
  <li><strong>Davos</strong>: Markus Blum propone corsi per principianti e avanzati, in una vasca sul lago di Davos, o per gli esperti in un buco nel ghiaccio del lago naturale (Graubünden Ferien).</li>
  <li><strong>St. Moritz</strong>: si può fare il bagno nel lago ghiacciato dietro la Reithalle, con spogliatoi all’Eisarena Ludains; per i principianti, St. Moritz Outdoors propone un bagno nel ghiaccio accompagnato (Graubünden Ferien).</li>
</ul>
<h2>Zurigo: corsi e sauna</h2>
<p>Secondo Zürich Tourismus, il Seebad Utoquai offre inizi strutturati, con corsi tenuti da professionisti. La città abbina anche bagno invernale e sauna: la Sauna am Fluss alterna il caldo a brevi bagni freddi nella Limmat, e il Saunaboot permette di nuotare nel lago di Zurigo dopo la sauna, in privato. Le nostre guide: <a href="{blog:bain-d-hiver-zurich}">il bagno invernale a Zurigo</a> e <a href="{blog:saunas-lac-de-zurich}">le saune del lago</a>.</p>
<h2>Lemano e Tre Laghi</h2>
<p>Ginevra e Losanna sono nella guida <a href="{blog:bain-d-hiver-leman}">il bagno invernale sul Lemano</a>, Neuchâtel, Bienne e Morat in <a href="{blog:bain-d-hiver-neuchatel-bienne-morat}">il bagno invernale nei Tre Laghi</a>. Per riscaldarsi dopo: <a href="{blog:saunas-bord-du-leman}">le saune del Lemano</a>.</p>
<h2>Cosa non abbiamo potuto verificare</h2>
<p>Non abbiamo trovato un elenco ufficiale di club o gruppi di bagno invernale in Svizzera, e Graubünden Ferien cita un’associazione di categoria, la «Swiss Cold Training Association», di cui non abbiamo letto le pagine. Se organizzate un’uscita regolare e volete che venga citata, scriveteci: la verificheremo prima di pubblicarla.</p>
<p>Prima di partire: <a href="{blog:programme-4-semaines-bain-d-hiver}">un programma di 4 settimane</a>, <a href="{blog:materiel-bain-d-hiver}">l’attrezzatura</a>. L’acqua del momento è nell’<a href="{app}">app</a>.</p>` } },
];
