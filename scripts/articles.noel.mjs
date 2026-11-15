// Coupe de Noël de Genève (88e édition, 19 et 20 décembre 2026), 4 langues, publié le 15 novembre 2026.
// Tout vient du site officiel (cdn1934.ch), lu ce jour-là : règlement 2026, infos pratiques, histoire, annonce de l'édition.
// Pas de température de l'eau annoncée : le bloc « eau du jour » de l'article donne la valeur du moment.
const CDN = (p, t) => [`Coupe de Noël, « ${t} »`, `https://www.cdn1934.ch/${p}`];
const REGLEMENT = CDN('reglement', 'Règlement 2026 – 88e édition');
const INFOS = CDN('informations', 'Informations');
const HISTOIRE = CDN('histoire', 'L’histoire de la Coupe de Noël');
const EDITION = CDN('blog/2509-edition-2026', 'Édition 2026');
const PREPARER = CDN('se-preparer', 'Se préparer à la nage en eau froide');
const ACCUEIL = CDN('', '88e Coupe de Noël – Genève');
const LEGENDE = { fr: 'Illustration générée par IA', en: 'AI-generated illustration', de: 'KI-generierte Illustration', it: 'Illustrazione generata dall’IA' };
const UL = (...t) => `<ul class="liste">\n${t.map((x) => `  <li>${x}</li>`).join('\n')}\n</ul>`;

export const articlesNoel = () => [{
  slug: 'coupe-de-noel-geneve', sante: true, image: 'blog/img/ia/coupe-de-noel.jpg', hauteur: 893,
  alt: {
    fr: 'Le quai du Jardin anglais à Genève un matin de décembre, un bateau amarré, un jacuzzi fumant et le Jet d’eau au loin',
    en: 'The Jardin Anglais quay in Geneva on a December morning, a moored boat, a steaming hot tub and the Jet d’eau far off',
    de: 'Der Quai beim Jardin Anglais in Genf an einem Dezembermorgen, ein vertäutes Schiff, ein dampfender Whirlpool, in der Ferne der Jet d’eau',
    it: 'Il molo del Jardin Anglais a Ginevra in un mattino di dicembre, un battello ormeggiato, una vasca fumante e il Jet d’eau in lontananza',
  },
  credit: {}, creditHtml: { ...LEGENDE }, sources: [REGLEMENT, INFOS, EDITION, HISTOIRE, PREPARER, ACCUEIL],
  fr: {
    titre: 'Coupe de Noël 2026 à Genève : dates, parcours, inscriptions et conseils',
    h1: 'La Coupe de Noël 2026 à Genève : 100 mètres dans la rade en décembre',
    desc: 'La 88e Coupe de Noël se nage les 19 et 20 décembre 2026 dans la rade de Genève : 100 m le long du Jardin anglais. Programme, catégories, prix, accès, vestiaires et préparation, d’après le site officiel.',
    bref: 'La <strong>88e Coupe de Noël</strong> a lieu les <strong>19 et 20 décembre 2026</strong> dans la rade de Genève : <strong>100 mètres</strong> de nage depuis le Jardin anglais, en séries chronométrées ou en déguisement. L’inscription coûte <strong>CHF 45</strong>, et le site officiel annonce l’édition <strong>complète</strong>. Pour le public, l’entrée est gratuite.',
    html: () => `
<h2>Qu’est-ce que la Coupe de Noël ?</h2>
<p>Une course de 100 mètres dans le lac, en plein hiver, au cœur de Genève. Elle est née en 1934 : un membre du Cercle des Nageurs de Genève, M. Doria, l’a créée sur le modèle d’une course vue sur la Seine à Paris, avec moins de dix nageurs la première année. L’organisateur la présente comme la plus ancienne manifestation sportive du canton, inscrite au patrimoine immatériel suisse en 2023. Elle est aujourd’hui organisée par l’Association CdN 1934, avec le soutien du Service des sports de la Ville de Genève.</p>
<h2>Quand et où ?</h2>
<p>Les <strong>samedi 19 et dimanche 20 décembre 2026</strong>. Le départ se fait sur la rive gauche de la rade, au ponton de Swissboat au Jardin anglais, près du quai Marchand ; l’arrivée est environ 100 mètres plus loin, en aval. Le premier départ est donné à 8 h 30, puis une vague part toutes les 5 minutes ; pour la sécurité, il n’y a jamais plus de deux vagues (50 nageurs) dans l’eau en même temps.</p>
<h2>Quelles catégories ?</h2>
${UL('<strong>Séries chronométrées</strong> (500 places) : classement par âge et par sexe, le dimanche matin entre 8 h 30 et midi. Nouveauté 2026 : une catégorie <strong>70 ans et plus</strong> et le Trophée Gaëtan Beysard, avec une vague de 100 m ouverte à toutes et tous le dimanche à midi.',
  '<strong>Séries humoristiques</strong> (4000 places) : en déguisement, sans chronomètre ni classement. Le déguisement ne doit jamais gêner la nage : le Sauvetage de Genève, la Brigade de la navigation et l’organisateur peuvent refuser le départ ou faire sortir de l’eau un nageur qui n’avance pas. Pas de confettis.',
  '<strong>The Race</strong>, la course élite : dimanche 20 décembre à 10 h pour les hommes et 10 h 30 pour les femmes, avec des prix en espèces pour les cinq premiers.')}
<p>Toutes les catégories sont ouvertes aux nageurs nés en 2011 ou avant, soit 15 ans et plus.</p>
<h2>Inscription et prix</h2>
<p>L’inscription coûte <strong>CHF 45</strong> par personne (EUR 48), contre CHF 40 pendant plus de dix ans. Elle a ouvert en deux temps : le 26 septembre 2026 pour les séries chronométrées, le 10 octobre pour les séries humoristiques, avec paiement par carte ou Twint. Le 15 novembre 2026, le site officiel annonce que <strong>la 88e édition est complète</strong>.</p>
<h2>Le jour J</h2>
${UL('<strong>Vestiaires</strong> : sur le bateau « Le Genève », au quai Marchand, chauffés mais sans douche, ouverts dès 7 h 45. L’organisateur conseille d’arriver une heure avant sa vague.',
  '<strong>Chambre d’appel</strong> : à deux pas des vestiaires, environ 15 minutes avant la vague. On peut y laisser peignoir, serviette et sandales.',
  '<strong>À la sortie de l’eau</strong> : un thé chaud, un cadeau souvenir et un jacuzzi chauffé au feu de bois ; fondue, raclette et boissons chaudes au village de la Coupe.',
  '<strong>Accès</strong> : environ 20 minutes à pied depuis la gare Cornavin, 15 minutes depuis la gare des Eaux-Vives ; arrêts Métropole, Place des Eaux-Vives, Rive et Molard. L’organisateur demande de privilégier les transports publics.')}
<h2>Comment se préparer ?</h2>
<p>L’organisateur insiste : la nage en eau froide ne s’improvise pas. Ses conseils : s’habituer progressivement, ne jamais nager seul, porter un bonnet, entrer lentement dans l’eau et attendre que la respiration se calme avant de nager, connaître ses limites, se réchauffer progressivement après, sans douche très chaude, et sortir de l’eau en cas de désorientation, de frissons incontrôlables ou de perte de sensibilité.</p>
<p>Pour aller plus loin : <a href="{blog:choc-thermique-eau-froide}">les 90 premières secondes dans l’eau froide</a>, <a href="{blog:materiel-bain-d-hiver}">le matériel du bain d’hiver</a>, <a href="{blog:afterdrop-se-rechauffer}">se réchauffer après</a> et <a href="{blog:bain-d-hiver-leman}">où se baigner l’hiver au Léman</a>.</p>` },
  en: {
    titre: 'Coupe de Noël 2026 in Geneva: dates, course, entries and tips',
    h1: 'The 2026 Coupe de Noël in Geneva: 100 metres in the harbour in December',
    desc: 'The 88th Coupe de Noël is swum on 19 and 20 December 2026 in Geneva harbour: 100 m along the Jardin Anglais. Programme, categories, price, access, changing rooms and preparation, from the official website.',
    bref: 'The <strong>88th Coupe de Noël</strong> takes place on <strong>19 and 20 December 2026</strong> in Geneva harbour: <strong>100 metres</strong> from the Jardin Anglais, in timed heats or in fancy dress. Entry costs <strong>CHF 45</strong>, and the official website says the edition is <strong>full</strong>. Watching is free.',
    html: () => `
<h2>What is the Coupe de Noël?</h2>
<p>A 100-metre race in the lake, in midwinter, in the heart of Geneva. It began in 1934: a member of the Cercle des Nageurs de Genève, Mr Doria, created it after a race he had seen on the Seine in Paris, with fewer than ten swimmers in the first year. The organiser describes it as the canton’s oldest sporting event, listed as Swiss intangible heritage in 2023. Today it is run by the Association CdN 1934, with support from the City of Geneva’s sports department.</p>
<h2>When and where?</h2>
<p>On <strong>Saturday 19 and Sunday 20 December 2026</strong>. The start is on the left bank of the harbour, at the Swissboat pontoon by the Jardin Anglais, near the Quai Marchand; the finish is about 100 metres downstream. The first start is at 8.30 am, then a wave leaves every 5 minutes; for safety there are never more than two waves (50 swimmers) in the water at once.</p>
<h2>Which categories?</h2>
${UL('<strong>Timed heats</strong> (500 places): ranked by age and sex, on Sunday morning between 8.30 and noon. New in 2026: a <strong>70 and over</strong> category and the Gaëtan Beysard Trophy, with a 100 m wave open to everyone on Sunday at noon.',
  '<strong>Fun heats</strong> (4,000 places): in fancy dress, untimed and unranked. A costume must never get in the way of swimming: Geneva’s lake rescue, the navigation police and the organiser may refuse a start or take out of the water anyone who cannot make progress. No confetti.',
  '<strong>The Race</strong>, the elite race: Sunday 20 December at 10 am for men and 10.30 am for women, with cash prizes for the top five.')}
<p>All categories are open to swimmers born in 2011 or earlier, i.e. aged 15 and over.</p>
<h2>Entry and price</h2>
<p>Entry costs <strong>CHF 45</strong> per person (EUR 48), up from CHF 40 for more than a decade. It opened in two stages: 26 September 2026 for timed heats and 10 October for fun heats, paid by card or Twint. On 15 November 2026 the official website says <strong>the 88th edition is full</strong>.</p>
<h2>On the day</h2>
${UL('<strong>Changing rooms</strong>: on the boat “Le Genève” at the Quai Marchand, heated but without showers, open from 7.45 am. The organiser suggests arriving an hour before your wave.',
  '<strong>Call room</strong>: a few steps from the changing rooms, about 15 minutes before your wave. You can leave a robe, towel and sandals there.',
  '<strong>Out of the water</strong>: a hot tea, a souvenir gift and a wood-fired hot tub; fondue, raclette and hot drinks in the event village.',
  '<strong>Getting there</strong>: about 20 minutes on foot from Cornavin station, 15 minutes from Eaux-Vives station; stops Métropole, Place des Eaux-Vives, Rive and Molard. The organiser asks you to use public transport.')}
<h2>How to prepare?</h2>
<p>The organiser is clear: cold-water swimming cannot be improvised. Its advice: build up gradually, never swim alone, wear a cap, enter the water slowly and wait for your breathing to settle before swimming, know your limits, warm up gradually afterwards without a very hot shower, and get out if you feel disoriented, shiver uncontrollably or lose feeling.</p>
<p>Read on: <a href="{blog:choc-thermique-eau-froide}">the first 90 seconds in cold water</a>, <a href="{blog:materiel-bain-d-hiver}">winter swimming kit</a>, <a href="{blog:afterdrop-se-rechauffer}">warming up afterwards</a> and <a href="{blog:bain-d-hiver-leman}">where to swim on Lake Geneva in winter</a>.</p>` },
  de: {
    titre: 'Coupe de Noël 2026 in Genf: Daten, Strecke, Anmeldung und Tipps',
    h1: 'Die Coupe de Noël 2026 in Genf: 100 Meter im Hafenbecken im Dezember',
    desc: 'Die 88. Coupe de Noël wird am 19. und 20. Dezember 2026 in der Genfer Rade geschwommen: 100 m entlang des Jardin Anglais. Programm, Kategorien, Preis, Anreise, Garderoben und Vorbereitung, nach der offiziellen Website.',
    bref: 'Die <strong>88. Coupe de Noël</strong> findet am <strong>19. und 20. Dezember 2026</strong> in der Genfer Rade statt: <strong>100 Meter</strong> ab dem Jardin Anglais, in gezeiteten Serien oder verkleidet. Die Anmeldung kostet <strong>CHF 45</strong>, und laut offizieller Website ist die Ausgabe <strong>ausgebucht</strong>. Zuschauen ist gratis.',
    html: () => `
<h2>Was ist die Coupe de Noël?</h2>
<p>Ein 100-Meter-Rennen im See, mitten im Winter, mitten in Genf. Es begann 1934: Herr Doria, Mitglied des Cercle des Nageurs de Genève, gründete es nach dem Vorbild eines Rennens auf der Seine in Paris, im ersten Jahr mit weniger als zehn Schwimmern. Der Veranstalter bezeichnet es als ältesten Sportanlass des Kantons, seit 2023 Teil des immateriellen Kulturerbes der Schweiz. Heute organisiert es die Association CdN 1934 mit Unterstützung des Sportamts der Stadt Genf.</p>
<h2>Wann und wo?</h2>
<p>Am <strong>Samstag, 19., und Sonntag, 20. Dezember 2026</strong>. Start ist am linken Ufer der Rade, am Swissboat-Steg beim Jardin Anglais, nahe dem Quai Marchand; das Ziel liegt rund 100 Meter weiter flussabwärts. Der erste Start erfolgt um 8.30 Uhr, danach alle 5 Minuten eine Welle; aus Sicherheitsgründen sind nie mehr als zwei Wellen (50 Schwimmende) gleichzeitig im Wasser.</p>
<h2>Welche Kategorien?</h2>
${UL('<strong>Gezeitete Serien</strong> (500 Plätze): Wertung nach Alter und Geschlecht, am Sonntagmorgen zwischen 8.30 und 12 Uhr. Neu 2026: eine Kategorie <strong>70 Jahre und älter</strong> und die Trophée Gaëtan Beysard, mit einer 100-m-Welle für alle am Sonntag um 12 Uhr.',
  '<strong>Humoristische Serien</strong> (4000 Plätze): verkleidet, ohne Zeitmessung und ohne Rangliste. Die Verkleidung darf das Schwimmen nie behindern: Seerettung, Seepolizei und Veranstalter können den Start verweigern oder Schwimmende aus dem Wasser holen, die nicht vorankommen. Kein Konfetti.',
  '<strong>The Race</strong>, das Eliterennen: Sonntag, 20. Dezember, um 10 Uhr für Männer und um 10.30 Uhr für Frauen, mit Geldpreisen für die ersten fünf.')}
<p>Alle Kategorien stehen Schwimmenden mit Jahrgang 2011 oder älter offen, also ab 15 Jahren.</p>
<h2>Anmeldung und Preis</h2>
<p>Die Anmeldung kostet <strong>CHF 45</strong> pro Person (EUR 48), nach mehr als zehn Jahren zu CHF 40. Sie öffnete in zwei Etappen: am 26. September 2026 für die gezeiteten Serien, am 10. Oktober für die humoristischen, Zahlung per Karte oder Twint. Am 15. November 2026 meldet die offizielle Website, dass <strong>die 88. Ausgabe ausgebucht</strong> ist.</p>
<h2>Am Renntag</h2>
${UL('<strong>Garderoben</strong>: auf dem Schiff «Le Genève» am Quai Marchand, geheizt, aber ohne Duschen, ab 7.45 Uhr offen. Der Veranstalter rät, eine Stunde vor der eigenen Welle da zu sein.',
  '<strong>Callroom</strong>: wenige Schritte von den Garderoben, etwa 15 Minuten vor der Welle. Bademantel, Handtuch und Sandalen kann man dort lassen.',
  '<strong>Nach dem Schwimmen</strong>: ein heisser Tee, ein Erinnerungsgeschenk und ein holzbeheizter Whirlpool; Fondue, Raclette und heisse Getränke im Festdorf.',
  '<strong>Anreise</strong>: rund 20 Minuten zu Fuss vom Bahnhof Cornavin, 15 Minuten vom Bahnhof Eaux-Vives; Haltestellen Métropole, Place des Eaux-Vives, Rive und Molard. Der Veranstalter bittet, den öffentlichen Verkehr zu nutzen.')}
<h2>Wie bereitet man sich vor?</h2>
<p>Der Veranstalter betont: Schwimmen in kaltem Wasser improvisiert man nicht. Seine Ratschläge: sich schrittweise gewöhnen, nie allein schwimmen, eine Badekappe tragen, langsam ins Wasser gehen und warten, bis sich die Atmung beruhigt, die eigenen Grenzen kennen, sich danach schrittweise aufwärmen, ohne sehr heisse Dusche, und bei Orientierungslosigkeit, unkontrolliertem Zittern oder Gefühlsverlust aus dem Wasser gehen.</p>
<p>Weiterlesen: <a href="{blog:choc-thermique-eau-froide}">die ersten 90 Sekunden im kalten Wasser</a>, <a href="{blog:materiel-bain-d-hiver}">die Ausrüstung fürs Winterschwimmen</a>, <a href="{blog:afterdrop-se-rechauffer}">sich danach aufwärmen</a> und <a href="{blog:bain-d-hiver-leman}">Winterbaden am Genfersee</a>.</p>` },
  it: {
    titre: 'Coupe de Noël 2026 a Ginevra: date, percorso, iscrizioni e consigli',
    h1: 'La Coupe de Noël 2026 a Ginevra: 100 metri nella rada a dicembre',
    desc: 'La 88ª Coupe de Noël si nuota il 19 e 20 dicembre 2026 nella rada di Ginevra: 100 m lungo il Jardin Anglais. Programma, categorie, prezzo, accesso, spogliatoi e preparazione, secondo il sito ufficiale.',
    bref: 'La <strong>88ª Coupe de Noël</strong> si svolge il <strong>19 e 20 dicembre 2026</strong> nella rada di Ginevra: <strong>100 metri</strong> dal Jardin Anglais, in serie cronometrate o in costume. L’iscrizione costa <strong>CHF 45</strong> e il sito ufficiale annuncia l’edizione <strong>al completo</strong>. Per il pubblico l’ingresso è gratuito.',
    html: () => `
<h2>Che cos’è la Coupe de Noël?</h2>
<p>Una gara di 100 metri nel lago, in pieno inverno, nel cuore di Ginevra. È nata nel 1934: un membro del Cercle des Nageurs de Genève, il signor Doria, la creò sul modello di una gara vista sulla Senna a Parigi, con meno di dieci nuotatori il primo anno. L’organizzatore la presenta come la più antica manifestazione sportiva del cantone, iscritta nel patrimonio immateriale svizzero nel 2023. Oggi è organizzata dall’Association CdN 1934, con il sostegno del Servizio dello sport della Città di Ginevra.</p>
<h2>Quando e dove?</h2>
<p><strong>Sabato 19 e domenica 20 dicembre 2026</strong>. La partenza è sulla riva sinistra della rada, al pontile Swissboat del Jardin Anglais, vicino al quai Marchand; l’arrivo è circa 100 metri più a valle. La prima partenza è alle 8.30, poi parte un’onda ogni 5 minuti; per sicurezza non ci sono mai più di due onde (50 nuotatori) in acqua contemporaneamente.</p>
<h2>Quali categorie?</h2>
${UL('<strong>Serie cronometrate</strong> (500 posti): classifica per età e sesso, domenica mattina tra le 8.30 e mezzogiorno. Novità 2026: una categoria <strong>70 anni e più</strong> e il Trofeo Gaëtan Beysard, con un’onda di 100 m aperta a tutti domenica a mezzogiorno.',
  '<strong>Serie umoristiche</strong> (4000 posti): in costume, senza cronometro né classifica. Il costume non deve mai ostacolare il nuoto: il salvataggio del lago, la polizia della navigazione e l’organizzatore possono rifiutare la partenza o far uscire dall’acqua chi non avanza. Niente coriandoli.',
  '<strong>The Race</strong>, la gara d’élite: domenica 20 dicembre alle 10 per gli uomini e alle 10.30 per le donne, con premi in denaro per i primi cinque.')}
<p>Tutte le categorie sono aperte ai nati nel 2011 o prima, cioè dai 15 anni in su.</p>
<h2>Iscrizione e prezzo</h2>
<p>L’iscrizione costa <strong>CHF 45</strong> a persona (EUR 48), dopo più di dieci anni a CHF 40. Si è aperta in due fasi: il 26 settembre 2026 per le serie cronometrate, il 10 ottobre per quelle umoristiche, con pagamento con carta o Twint. Il 15 novembre 2026 il sito ufficiale annuncia che <strong>la 88ª edizione è al completo</strong>.</p>
<h2>Il giorno della gara</h2>
${UL('<strong>Spogliatoi</strong>: sul battello «Le Genève» al quai Marchand, riscaldati ma senza docce, aperti dalle 7.45. L’organizzatore consiglia di arrivare un’ora prima della propria onda.',
  '<strong>Camera di chiamata</strong>: a due passi dagli spogliatoi, circa 15 minuti prima dell’onda. Vi si possono lasciare accappatoio, asciugamano e sandali.',
  '<strong>All’uscita dall’acqua</strong>: un tè caldo, un regalo ricordo e una vasca idromassaggio riscaldata a legna; fondue, raclette e bevande calde nel villaggio della Coupe.',
  '<strong>Accesso</strong>: circa 20 minuti a piedi dalla stazione di Cornavin, 15 dalla stazione di Eaux-Vives; fermate Métropole, Place des Eaux-Vives, Rive e Molard. L’organizzatore chiede di preferire i trasporti pubblici.')}
<h2>Come prepararsi?</h2>
<p>L’organizzatore insiste: il nuoto in acqua fredda non si improvvisa. I suoi consigli: abituarsi gradualmente, non nuotare mai da soli, portare la cuffia, entrare lentamente in acqua e aspettare che il respiro si calmi prima di nuotare, conoscere i propri limiti, riscaldarsi gradualmente dopo, senza doccia molto calda, e uscire dall’acqua in caso di disorientamento, brividi incontrollabili o perdita di sensibilità.</p>
<p>Per saperne di più: <a href="{blog:choc-thermique-eau-froide}">i primi 90 secondi in acqua fredda</a>, <a href="{blog:materiel-bain-d-hiver}">l’attrezzatura per il bagno invernale</a>, <a href="{blog:afterdrop-se-rechauffer}">riscaldarsi dopo</a> e <a href="{blog:bain-d-hiver-leman}">il bagno invernale sul Lemano</a>.</p>` },
}];
