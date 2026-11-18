// Traversées populaires à la nage (Zurich, Limmat, Lucerne, Lugano), 4 langues, programmées en décembre 2026.
// Sources lues le 18 novembre 2026 : offices du tourisme, MySwitzerland, Ville de Zurich, sponsor. Les dates 2027 ne sont pas encore annoncées : on le dit,
// on donne les repères de l'édition 2026, et l'article est à mettre à jour dès l'annonce (voir TODO.md).
const LEGENDE = { fr: 'Illustration générée par IA', en: 'AI-generated illustration', de: 'KI-generierte Illustration', it: 'Illustrazione generata dall’IA' };
const UL = (...t) => `<ul class="liste">\n${t.map((x) => `  <li>${x}</li>`).join('\n')}\n</ul>`;
const AUTRES = {
  fr: '<p>Les autres traversées : <a href="{blog:seeueberquerung-zurich}">lac de Zurich</a>, <a href="{blog:limmatschwimmen-zurich}">Limmat</a>, <a href="{blog:seeueberquerung-luzern}">Lucerne</a>, <a href="{blog:traversata-lago-di-lugano}">Lugano</a>. L’eau du jour, plage par plage, est dans l’<a href="{app}">app</a>.</p>',
  en: '<p>The other crossings: <a href="{blog:seeueberquerung-zurich}">Lake Zurich</a>, <a href="{blog:limmatschwimmen-zurich}">the Limmat</a>, <a href="{blog:seeueberquerung-luzern}">Lucerne</a>, <a href="{blog:traversata-lago-di-lugano}">Lugano</a>. Today’s water, beach by beach, is in the <a href="{app}">app</a>.</p>',
  de: '<p>Die anderen Überquerungen: <a href="{blog:seeueberquerung-zurich}">Zürichsee</a>, <a href="{blog:limmatschwimmen-zurich}">Limmat</a>, <a href="{blog:seeueberquerung-luzern}">Luzern</a>, <a href="{blog:traversata-lago-di-lugano}">Lugano</a>. Das Wasser von heute, Badeplatz für Badeplatz, steht in der <a href="{app}">App</a>.</p>',
  it: '<p>Le altre traversate: <a href="{blog:seeueberquerung-zurich}">lago di Zurigo</a>, <a href="{blog:limmatschwimmen-zurich}">Limmat</a>, <a href="{blog:seeueberquerung-luzern}">Lucerna</a>, <a href="{blog:traversata-lago-di-lugano}">Lugano</a>. L’acqua di oggi, spiaggia per spiaggia, è nell’<a href="{app}">app</a>.</p>' };
const art = (slug, img, lac, alt, sources, L) => ({ slug, lac, image: `blog/img/ia/${img}.jpg`, hauteur: 893, alt: Object.fromEntries(['fr', 'en', 'de', 'it'].map((l, i) => [l, alt[i]])),
  credit: {}, creditHtml: { ...LEGENDE }, sources, ...Object.fromEntries(Object.entries(L).map(([l, c]) => [l, { ...c, html: () => c.corps + '\n' + AUTRES[l] }])) });

const MS_ZH = ['MySwitzerland, « Stadtzürcher Seeüberquerung 2026 »', 'https://www.myswitzerland.com/en/experiences/events/stadtzuercher-seeueberquerung-2026/'];
const ZKB = ['Zürcher Kantonalbank, « Seeüberquerung »', 'https://www.zkb.ch/de/ueber-uns/unser-engagement/sport-gesundheit/seeueberquerung.html'];
const ZH_FORM = ['Stadtpolizei Zürich, formulaire « Seequerung » (groupes)', 'https://www.stadt-zuerich.ch/content/dam/stzh/pd/Deutsch/Stadtpolizei/Formulare%20und%20Merkblaetter/Gewaesser/anmeldeform-seequerung-08-2023.pdf'];
const MS_LIMMAT = ['MySwitzerland, « 60. Zürcher Limmatschwimmen »', 'https://www.myswitzerland.com/en/experiences/events/60-zuercher-limmatschwimmen/'];
const IAE_LIMMAT = ['IamExpat, « Zürcher Limmat-Schwimmen »', 'https://www.iamexpat.ch/lifestyle/events-festivals-switzerland/zurcher-limmat-schwimmen-public-swim-limmat-river'];
const LU = ['Luzern Tourismus, « Seeüberquerung Luzern »', 'https://www.luzern.com/de/event/seeueberquerung-luzern'];
const MS_LU = ['MySwitzerland, « Lake Lucerne Crossing »', 'https://www.myswitzerland.com/en/experiences/events/lake-lucerne-crossing/'];
const TI = ['Ticino Turismo, « Traversata Lago di Lugano 2026 »', 'https://www.ticino.ch/it/events/details/traversata-lago-di-lugano-2026/10280.html'];
const LR = ['Lugano Region, « Traversata Lago di Lugano 2026 »', 'https://www.luganoregion.com/en/events/details/traversata-lago-di-lugano-2026/10280.html'];

export const articlesTraversees = () => [
  art('seeueberquerung-zurich', 'seeueberquerung-zurich', 'zurich',
    ['Le lac de Zurich vu du Strandbad Mythenquai un matin d’été, des bouées alignées vers la rive d’en face', 'Lake Zurich from Strandbad Mythenquai on a summer morning, buoys lined up towards the far shore', 'Der Zürichsee vom Strandbad Mythenquai an einem Sommermorgen, Bojen bis zum anderen Ufer', 'Il lago di Zurigo dallo Strandbad Mythenquai in un mattino d’estate, boe allineate verso l’altra riva'],
    [MS_ZH, ZKB, ZH_FORM, ['badi-info.ch, « Zürich – die Badi-Metropole » (dates 2027)', 'https://www.badi-info.ch/zueri-badis.html']], {
    de: { titre: 'Seeüberquerung Zürich 2027: Datum, Tickets, Strecke', h1: 'Stadtzürcher Seeüberquerung 2027: was man schon weiss',
      desc: 'Die Stadtzürcher Seeüberquerung: 1500 m vom Strandbad Mythenquai zum Strandbad Tiefenbrunnen, Tickets auf Ticketcorner, ab 21 °C Wassertemperatur. 2027 am Mittwoch, 30. Juni geplant, Ersatzdaten 7. Juli und 18. August.',
      bref: 'Die <strong>Seeüberquerung</strong> führt über <strong>1500 Meter</strong> vom Strandbad Mythenquai zum Strandbad Tiefenbrunnen, mit bis zu <strong>9000 Schwimmenden</strong>. 2027 ist sie am <strong>Mittwoch, 30. Juni</strong> geplant, mit den Ersatzdaten 7. Juli und 18. August (badi-info.ch, Stand 18. November 2026).',
      corps: `
<h2>Wie läuft sie ab?</h2>
<p>Die Strecke misst 1500 Meter zwischen den Strandbädern Mythenquai und Tiefenbrunnen. Es ist kein Wettkampf: Zeiten werden nicht gemessen (Zürcher Kantonalbank). Teilnehmen können geübte Schwimmerinnen und Schwimmer ab 12 Jahren (MySwitzerland).</p>
<h2>Wann findet sie statt?</h2>
<p>2027 ist die Seeüberquerung am Mittwoch, 30. Juni geplant; Ersatzdaten sind der 7. Juli und der 18. August (badi-info.ch). Sie findet nur bei gutem Wetter und einer Wassertemperatur von über 21 °C statt.</p>
<h2>Tickets</h2>
${UL('Verkauf auf Ticketcorner, ab dem Montag vor der Überquerung um 12 Uhr (MySwitzerland).', 'Gruppen ab 10 Personen melden sich bei der Stadtpolizei an und brauchen ein Begleitboot mit Schiffsführer, wegen des dichten Bootsverkehrs im Seebecken (Formular der Stadtpolizei).')}
<h2>Vorbereitung</h2>
<p>1500 Meter im offenen See sind etwas anderes als im Becken: vorher ein paar Mal im See schwimmen, die Distanz kennen, nie überschätzen. Die Wassertemperatur vom Mythenquai und vom Tiefenbrunnen zeigt unsere App jeden Morgen.</p>` },
    fr: { titre: 'Traversée du lac de Zurich 2027 (Seeüberquerung) : date, billets, parcours', h1: 'La traversée du lac de Zurich 2027 : ce que l’on sait déjà',
      desc: 'La Stadtzürcher Seeüberquerung : 1500 m du Strandbad Mythenquai au Strandbad Tiefenbrunnen, billets sur Ticketcorner, eau à plus de 21 °C. Prévue le mercredi 30 juin 2027, dates de réserve les 7 juillet et 18 août.',
      bref: 'La <strong>Seeüberquerung</strong> traverse le lac de Zurich sur <strong>1500 mètres</strong>, du Strandbad Mythenquai au Strandbad Tiefenbrunnen, avec jusqu’à <strong>9000 nageurs</strong>. En 2027, elle est prévue le <strong>mercredi 30 juin</strong>, avec les dates de réserve du 7 juillet et du 18 août (badi-info.ch, au 18 novembre 2026).',
      corps: `
<h2>Comment ça se passe ?</h2>
<p>Le parcours fait 1500 mètres entre les bains de Mythenquai et de Tiefenbrunnen. Ce n’est pas une course : aucun temps n’est mesuré (Banque cantonale de Zurich). Elle est ouverte aux nageurs entraînés dès 12 ans (MySwitzerland).</p>
<h2>Quand ?</h2>
<p>En 2027, la traversée est prévue le mercredi 30 juin, avec des dates de réserve les 7 juillet et 18 août (badi-info.ch). Elle n’a lieu que par beau temps et avec une eau à plus de 21 °C.</p>
<h2>Billets</h2>
${UL('Vente sur Ticketcorner, à partir du lundi précédant la traversée à midi (MySwitzerland).', 'Les groupes de 10 personnes et plus s’annoncent à la police municipale et doivent être suivis par un bateau avec un pilote, à cause du trafic dense dans le bassin (formulaire de la police).')}
<h2>Se préparer</h2>
<p>1500 mètres en lac, ce n’est pas la piscine : nager plusieurs fois en lac avant, connaître sa distance, ne pas se surestimer. L’eau du jour à Mythenquai et à Tiefenbrunnen est dans l’app chaque matin.</p>` },
    en: { titre: 'Lake Zurich crossing 2027 (Seeüberquerung): date, tickets, route', h1: 'The 2027 Lake Zurich crossing: what we already know',
      desc: 'The Stadtzürcher Seeüberquerung: 1,500 m from Strandbad Mythenquai to Strandbad Tiefenbrunnen, tickets on Ticketcorner, water above 21 °C. Planned for Wednesday 30 June 2027, reserve dates 7 July and 18 August.',
      bref: 'The <strong>Seeüberquerung</strong> crosses Lake Zurich over <strong>1,500 metres</strong>, from Strandbad Mythenquai to Strandbad Tiefenbrunnen, with up to <strong>9,000 swimmers</strong>. In 2027 it is planned for <strong>Wednesday 30 June</strong>, with reserve dates on 7 July and 18 August (badi-info.ch, as of 18 November 2026).',
      corps: `
<h2>How does it work?</h2>
<p>The course is 1,500 metres between the Mythenquai and Tiefenbrunnen lidos. It is not a race: no times are taken (Zürcher Kantonalbank). It is open to trained swimmers aged 12 and over (MySwitzerland).</p>
<h2>When?</h2>
<p>In 2027 the crossing is planned for Wednesday 30 June, with reserve dates on 7 July and 18 August (badi-info.ch). It only goes ahead in good weather with water above 21 °C.</p>
<h2>Tickets</h2>
${UL('Sold on Ticketcorner, from noon on the Monday before the crossing (MySwitzerland).', 'Groups of 10 or more register with the city police and need an escort boat with a licensed skipper, because of heavy boat traffic in the basin (police form).')}
<h2>Getting ready</h2>
<p>1,500 metres in open water is not a pool: swim in the lake a few times first, know your distance, do not overestimate yourself. Today’s water at Mythenquai and Tiefenbrunnen is in the app every morning.</p>` },
    it: { titre: 'Traversata del lago di Zurigo 2027 (Seeüberquerung): data, biglietti, percorso', h1: 'La traversata del lago di Zurigo 2027: cosa si sa già',
      desc: 'La Stadtzürcher Seeüberquerung: 1500 m dallo Strandbad Mythenquai allo Strandbad Tiefenbrunnen, biglietti su Ticketcorner, acqua sopra i 21 °C. Prevista mercoledì 30 giugno 2027, date di riserva 7 luglio e 18 agosto.',
      bref: 'La <strong>Seeüberquerung</strong> attraversa il lago di Zurigo per <strong>1500 metri</strong>, dallo Strandbad Mythenquai allo Strandbad Tiefenbrunnen, con fino a <strong>9000 nuotatori</strong>. Nel 2027 è prevista <strong>mercoledì 30 giugno</strong>, con date di riserva il 7 luglio e il 18 agosto (badi-info.ch, al 18 novembre 2026).',
      corps: `
<h2>Come funziona?</h2>
<p>Il percorso è di 1500 metri tra i lidi di Mythenquai e Tiefenbrunnen. Non è una gara: i tempi non vengono misurati (Zürcher Kantonalbank). È aperta ai nuotatori allenati dai 12 anni (MySwitzerland).</p>
<h2>Quando?</h2>
<p>Nel 2027 la traversata è prevista mercoledì 30 giugno, con date di riserva il 7 luglio e il 18 agosto (badi-info.ch). Si svolge solo con bel tempo e acqua sopra i 21 °C.</p>
<h2>Biglietti</h2>
${UL('In vendita su Ticketcorner, dal lunedì precedente la traversata a mezzogiorno (MySwitzerland).', 'I gruppi di 10 persone o più si annunciano alla polizia cittadina e devono essere accompagnati da una barca con conducente, per il traffico intenso nel bacino (modulo della polizia).')}
<h2>Prepararsi</h2>
<p>1500 metri in lago non sono una piscina: nuotare qualche volta in lago prima, conoscere la propria distanza, non sopravvalutarsi. L’acqua di oggi a Mythenquai e Tiefenbrunnen è nell’app ogni mattina.</p>` } }),

  art('limmatschwimmen-zurich', 'limmatschwimmen-zurich', 'zurich',
    ['La Limmat à Zurich en été, des bouées gonflables qui descendent le courant entre les quais', 'The Limmat in Zurich in summer, inflatable floats drifting downstream between the quays', 'Die Limmat in Zürich im Sommer, Schwimmhilfen treiben zwischen den Quais flussabwärts', 'La Limmat a Zurigo in estate, galleggianti che scendono la corrente tra le rive'],
    [MS_LIMMAT, IAE_LIMMAT], {
    de: { titre: 'Limmatschwimmen 2027: Datum, Tickets, Strecke', h1: 'Zürcher Limmatschwimmen 2027: was man schon weiss',
      desc: 'Das Zürcher Limmatschwimmen: rund 2 km vom Stadthausquai zum Oberen Letten, mit Schwimmhilfe, Tickets im Vorverkauf. Datum 2027 noch nicht bekannt, die Eckdaten der 60. Ausgabe 2026.',
      bref: 'Beim <strong>Limmatschwimmen</strong> treibt man rund <strong>2 Kilometer</strong> vom Stadthausquai bis zum Oberen Letten, <strong>mit Schwimmhilfe</strong>. Die 60. Ausgabe war am <strong>Samstag, 15. August 2026</strong> geplant. Das <strong>Datum 2027 ist noch nicht bekannt</strong> (Stand 18. November 2026).',
      corps: `
<h2>Wie läuft es ab?</h2>
<p>Die Strecke führt rund 2 Kilometer vom Stadthausquai zum Oberen Letten, unter mehreren Brücken hindurch. Ohne Schwimmhilfe geht es nicht, ausser bei der ewz-Challenge zum Auftakt (IamExpat). Treffpunkt ist die Frauenbadi am Stadthausquai.</p>
<h2>Wann?</h2>
<p>2026 war die 60. Ausgabe für Samstag, 15. August geplant, mit Ersatzdatum eine Woche später; der Anlass hängt von Wetter und Wasser ab (MySwitzerland). Das Datum 2027 ergänzen wir, sobald es feststeht.</p>
<h2>Tickets</h2>
<p>Tickets gibt es im Vorverkauf online, wenige Tage vor dem Anlass, und die Teilnehmerzahl ist begrenzt. Die Startgruppen gehen nach Nummern auf die Strecke (IamExpat).</p>` },
    fr: { titre: 'Limmatschwimmen 2027 à Zurich : date, billets, parcours', h1: 'Le Limmatschwimmen 2027 à Zurich : ce que l’on sait déjà',
      desc: 'Le Limmatschwimmen de Zurich : environ 2 km du Stadthausquai au Oberer Letten, avec aide à la flottaison, billets en prévente. Date 2027 pas encore connue, les repères de la 60e édition en 2026.',
      bref: 'Au <strong>Limmatschwimmen</strong>, on descend la Limmat sur environ <strong>2 kilomètres</strong>, du Stadthausquai au Oberer Letten, <strong>avec une aide à la flottaison</strong>. La 60e édition était prévue le <strong>samedi 15 août 2026</strong>. La <strong>date 2027 n’est pas encore connue</strong> (au 18 novembre 2026).',
      corps: `
<h2>Comment ça se passe ?</h2>
<p>Le parcours fait environ 2 kilomètres, du Stadthausquai au Oberer Letten, sous plusieurs ponts. L’aide à la flottaison est obligatoire, sauf pour l’ewz-Challenge du départ (IamExpat). Le rendez-vous est aux bains des femmes du Stadthausquai.</p>
<h2>Quand ?</h2>
<p>En 2026, la 60e édition était prévue le samedi 15 août, avec une date de réserve une semaine plus tard ; tout dépend de la météo et de l’eau (MySwitzerland). Nous ajouterons la date 2027 dès qu’elle sera connue.</p>
<h2>Billets</h2>
<p>Les billets se vendent en ligne quelques jours avant, en nombre limité. Les groupes partent par numéro (IamExpat).</p>` },
    en: { titre: 'Limmatschwimmen 2027 in Zurich: date, tickets, route', h1: 'The 2027 Limmatschwimmen in Zurich: what we already know',
      desc: 'Zurich’s Limmatschwimmen: about 2 km from Stadthausquai to Oberer Letten, with a swim aid, tickets in advance. 2027 date not yet known; the pattern of the 60th edition in 2026.',
      bref: 'At the <strong>Limmatschwimmen</strong> you drift about <strong>2 kilometres</strong> down the Limmat, from Stadthausquai to Oberer Letten, <strong>with a swim aid</strong>. The 60th edition was planned for <strong>Saturday 15 August 2026</strong>. The <strong>2027 date is not yet known</strong> (as of 18 November 2026).',
      corps: `
<h2>How does it work?</h2>
<p>The route is about 2 kilometres from Stadthausquai to Oberer Letten, under several bridges. A swim aid is required, except for the opening ewz-Challenge (IamExpat). The meeting point is the Frauenbadi at Stadthausquai.</p>
<h2>When?</h2>
<p>In 2026 the 60th edition was planned for Saturday 15 August, with a reserve date a week later; it depends on weather and water (MySwitzerland). We will add the 2027 date once it is set.</p>
<h2>Tickets</h2>
<p>Tickets are sold online a few days before, in limited numbers. Groups start by number (IamExpat).</p>` },
    it: { titre: 'Limmatschwimmen 2027 a Zurigo: data, biglietti, percorso', h1: 'Il Limmatschwimmen 2027 a Zurigo: cosa si sa già',
      desc: 'Il Limmatschwimmen di Zurigo: circa 2 km dallo Stadthausquai all’Oberer Letten, con galleggiante, biglietti in prevendita. Data 2027 non ancora nota, i riferimenti della 60ª edizione nel 2026.',
      bref: 'Al <strong>Limmatschwimmen</strong> si scende la Limmat per circa <strong>2 chilometri</strong>, dallo Stadthausquai all’Oberer Letten, <strong>con un galleggiante</strong>. La 60ª edizione era prevista <strong>sabato 15 agosto 2026</strong>. La <strong>data 2027 non è ancora nota</strong> (al 18 novembre 2026).',
      corps: `
<h2>Come funziona?</h2>
<p>Il percorso è di circa 2 chilometri dallo Stadthausquai all’Oberer Letten, sotto diversi ponti. Il galleggiante è obbligatorio, tranne per l’ewz-Challenge iniziale (IamExpat). Il ritrovo è alla Frauenbadi dello Stadthausquai.</p>
<h2>Quando?</h2>
<p>Nel 2026 la 60ª edizione era prevista sabato 15 agosto, con data di riserva una settimana dopo; dipende da meteo e acqua (MySwitzerland). Aggiungeremo la data 2027 appena sarà fissata.</p>
<h2>Biglietti</h2>
<p>I biglietti si vendono online pochi giorni prima, in numero limitato. I gruppi partono per numero (IamExpat).</p>` } }),

  art('seeueberquerung-luzern', 'seeueberquerung-luzern', 'lucerne',
    ['Le lac des Quatre-Cantons devant le Lido de Lucerne, une ligne de bouées vers Tribschen et le Pilatus au fond', 'Lake Lucerne by the Lucerne Lido, a line of buoys towards Tribschen and Mount Pilatus behind', 'Der Vierwaldstättersee beim Lido Luzern, eine Bojenlinie Richtung Tribschen, dahinter der Pilatus', 'Il lago dei Quattro Cantoni davanti al Lido di Lucerna, una fila di boe verso Tribschen e il Pilatus sullo sfondo'],
    [LU, MS_LU], {
    de: { titre: 'Seeüberquerung Luzern 2027: Datum, Anmeldung, Preise', h1: 'Seeüberquerung Luzern 2027: was man schon weiss',
      desc: 'Die Seeüberquerung Luzern: 1,1 km vom Strandbad Lido zum Strandbad Tribschen, 600 Startplätze, CHF 40 für Erwachsene. Datum 2027 noch nicht bekannt, die Eckdaten von 2026.',
      bref: 'Die <strong>Seeüberquerung Luzern</strong> führt über <strong>1,1 Kilometer</strong> vom Strandbad Lido zum Strandbad Tribschen, mit Blick auf den Pilatus. Es gibt <strong>600 Startplätze</strong>, die in den letzten Jahren schnell ausgebucht waren. 2026 fand sie am <strong>Sonntag, 16. August</strong> statt; das <strong>Datum 2027 ist noch nicht bekannt</strong>.',
      corps: `
<h2>Strecke und Preise</h2>
${UL('1,1 Kilometer vom Strandbad Lido zum Strandbad Tribschen (Luzern Tourismus).', '600 Startplätze, früh anmelden: sie waren in den vergangenen Jahren jeweils innert kürzester Zeit ausgebucht.', 'Erwachsene CHF 40, Jugendliche CHF 25 (Preise 2026).')}
<h2>Wann?</h2>
<p>2026 war die 15. Ausgabe am Sonntag, 16. August, von 8 bis 14 Uhr. Das Datum 2027 ergänzen wir, sobald es feststeht. Anmeldung über die offizielle Website des Anlasses.</p>` },
    fr: { titre: 'Traversée du lac à Lucerne 2027 (Seeüberquerung) : date, inscription, prix', h1: 'La traversée du lac à Lucerne 2027 : ce que l’on sait déjà',
      desc: 'La Seeüberquerung de Lucerne : 1,1 km du Strandbad Lido au Strandbad Tribschen, 600 places, 40 francs pour un adulte. Date 2027 pas encore connue, les repères de 2026.',
      bref: 'La <strong>Seeüberquerung de Lucerne</strong> fait <strong>1,1 kilomètre</strong>, du Strandbad Lido au Strandbad Tribschen, face au Pilatus. Il y a <strong>600 places</strong>, parties très vite ces dernières années. En 2026, elle a eu lieu le <strong>dimanche 16 août</strong> ; la <strong>date 2027 n’est pas encore connue</strong>.',
      corps: `
<h2>Parcours et prix</h2>
${UL('1,1 kilomètre du Strandbad Lido au Strandbad Tribschen (Lucerne Tourisme).', '600 places, à réserver tôt : elles sont parties en très peu de temps les années précédentes.', 'Adultes 40 francs, jeunes 25 francs (prix 2026).')}
<h2>Quand ?</h2>
<p>En 2026, la 15e édition avait lieu le dimanche 16 août, de 8 h à 14 h. Nous ajouterons la date 2027 dès qu’elle sera connue. L’inscription se fait sur le site officiel de l’événement.</p>` },
    en: { titre: 'Lake Lucerne crossing 2027 (Seeüberquerung): date, entry, prices', h1: 'The 2027 Lake Lucerne crossing: what we already know',
      desc: 'The Seeüberquerung Luzern: 1.1 km from Strandbad Lido to Strandbad Tribschen, 600 places, CHF 40 for adults. 2027 date not yet known; the 2026 pattern.',
      bref: 'The <strong>Lucerne lake crossing</strong> covers <strong>1.1 kilometres</strong>, from Strandbad Lido to Strandbad Tribschen, facing Mount Pilatus. There are <strong>600 places</strong>, which sold out fast in recent years. In 2026 it took place on <strong>Sunday 16 August</strong>; the <strong>2027 date is not yet known</strong>.',
      corps: `
<h2>Route and prices</h2>
${UL('1.1 kilometres from Strandbad Lido to Strandbad Tribschen (Lucerne Tourism).', '600 places, book early: in past years they went within a very short time.', 'Adults CHF 40, young people CHF 25 (2026 prices).')}
<h2>When?</h2>
<p>In 2026 the 15th edition took place on Sunday 16 August, 8 am to 2 pm. We will add the 2027 date once it is set. Entry is via the event’s official website.</p>` },
    it: { titre: 'Traversata del lago a Lucerna 2027 (Seeüberquerung): data, iscrizione, prezzi', h1: 'La traversata del lago a Lucerna 2027: cosa si sa già',
      desc: 'La Seeüberquerung di Lucerna: 1,1 km dallo Strandbad Lido allo Strandbad Tribschen, 600 posti, 40 franchi per un adulto. Data 2027 non ancora nota, i riferimenti del 2026.',
      bref: 'La <strong>Seeüberquerung di Lucerna</strong> è di <strong>1,1 chilometri</strong>, dallo Strandbad Lido allo Strandbad Tribschen, di fronte al Pilatus. Ci sono <strong>600 posti</strong>, esauriti in fretta negli ultimi anni. Nel 2026 si è svolta <strong>domenica 16 agosto</strong>; la <strong>data 2027 non è ancora nota</strong>.',
      corps: `
<h2>Percorso e prezzi</h2>
${UL('1,1 chilometri dallo Strandbad Lido allo Strandbad Tribschen (Lucerna Turismo).', '600 posti, iscriversi presto: negli anni scorsi sono andati esauriti in pochissimo tempo.', 'Adulti 40 franchi, giovani 25 franchi (prezzi 2026).')}
<h2>Quando?</h2>
<p>Nel 2026 la 15ª edizione si è svolta domenica 16 agosto, dalle 8 alle 14. Aggiungeremo la data 2027 appena sarà fissata. L’iscrizione si fa sul sito ufficiale dell’evento.</p>` } }),

  art('traversata-lago-di-lugano', 'traversata-lago-di-lugano', 'lugano',
    ['Le golfe de Lugano vu de Caprino, l’eau turquoise jusqu’au Lido de Lugano et le Monte San Salvatore', 'The Gulf of Lugano from Caprino, turquoise water across to the Lido di Lugano and Monte San Salvatore', 'Der Golf von Lugano von Caprino aus, türkisfarbenes Wasser bis zum Lido di Lugano, der Monte San Salvatore', 'Il golfo di Lugano visto da Caprino, l’acqua turchese fino al Lido di Lugano e il Monte San Salvatore'],
    [TI, LR], {
    it: { titre: 'Traversata del Lago di Lugano 2027: data, iscrizione, percorso', h1: 'Traversata del Lago di Lugano 2027: cosa si sa già',
      desc: 'La Traversata del Lago di Lugano: 2500 m da Caprino al Lido di Lugano, nuotata popolare non competitiva dal 1932. Data 2027 non ancora nota, i riferimenti della 94ª edizione nel 2026.',
      bref: 'La <strong>Traversata del Lago di Lugano</strong> è una nuotata popolare <strong>non competitiva di 2500 metri</strong>, da <strong>Caprino al Lido di Lugano</strong>. La 94ª edizione si è svolta <strong>domenica 16 agosto 2026</strong>. La <strong>data 2027 non è ancora nota</strong> (al 18 novembre 2026).',
      corps: `
<h2>Percorso</h2>
<p>Il percorso tradizionale parte da Caprino, sulla riva opposta, e arriva al Lido di Lugano dopo 2500 metri, attraversando il 46° parallelo nord. Non è una gara (Ticino Turismo). L’organizza l’associazione Traversata Lago di Lugano 1932.</p>
<h2>Quando e come iscriversi</h2>
<p>Nel 2026 la 94ª edizione si è svolta domenica 16 agosto. L’iscrizione si fa online sul sito ufficiale della Traversata o tramite endu.net (Lugano Region). Aggiungeremo la data 2027 appena sarà annunciata.</p>
<h2>Prepararsi</h2>
<p>2500 metri in lago sono una bella distanza: allenarsi in acqua libera prima, conoscere il proprio ritmo. L’acqua di oggi al Lido di Lugano è nell’app ogni mattina.</p>` },
    fr: { titre: 'Traversée du lac de Lugano 2027 (Traversata) : date, inscription, parcours', h1: 'La traversée du lac de Lugano 2027 : ce que l’on sait déjà',
      desc: 'La Traversata del Lago di Lugano : 2500 m de Caprino au Lido de Lugano, nage populaire sans classement depuis 1932. Date 2027 pas encore connue, les repères de la 94e édition en 2026.',
      bref: 'La <strong>Traversata del Lago di Lugano</strong> est une nage populaire <strong>sans classement, sur 2500 mètres</strong>, de <strong>Caprino au Lido de Lugano</strong>. La 94e édition a eu lieu le <strong>dimanche 16 août 2026</strong>. La <strong>date 2027 n’est pas encore connue</strong> (au 18 novembre 2026).',
      corps: `
<h2>Le parcours</h2>
<p>Le parcours traditionnel part de Caprino, sur la rive d’en face, et arrive au Lido de Lugano après 2500 mètres, en passant le 46e parallèle nord. Ce n’est pas une course (Ticino Turismo). Elle est organisée par l’association Traversata Lago di Lugano 1932.</p>
<h2>Quand et comment s’inscrire</h2>
<p>En 2026, la 94e édition a eu lieu le dimanche 16 août. L’inscription se fait en ligne sur le site officiel de la Traversata ou sur endu.net (Lugano Region). Nous ajouterons la date 2027 dès l’annonce.</p>
<h2>Se préparer</h2>
<p>2500 mètres en lac, c’est une vraie distance : s’entraîner en eau libre avant, connaître son rythme. L’eau du jour au Lido de Lugano est dans l’app chaque matin.</p>` },
    de: { titre: 'Traversata del Lago di Lugano 2027: Datum, Anmeldung, Strecke', h1: 'Die Überquerung des Luganersees 2027: was man schon weiss',
      desc: 'Die Traversata del Lago di Lugano: 2500 m von Caprino zum Lido di Lugano, Volksschwimmen ohne Wertung seit 1932. Datum 2027 noch nicht bekannt, die Eckdaten der 94. Ausgabe 2026.',
      bref: 'Die <strong>Traversata del Lago di Lugano</strong> ist ein Volksschwimmen <strong>ohne Wertung über 2500 Meter</strong>, von <strong>Caprino zum Lido di Lugano</strong>. Die 94. Ausgabe fand am <strong>Sonntag, 16. August 2026</strong> statt. Das <strong>Datum 2027 ist noch nicht bekannt</strong> (Stand 18. November 2026).',
      corps: `
<h2>Strecke</h2>
<p>Die traditionelle Strecke beginnt in Caprino am gegenüberliegenden Ufer und endet nach 2500 Metern am Lido di Lugano, über den 46. Breitengrad. Es ist kein Wettkampf (Ticino Turismo). Veranstalter ist der Verein Traversata Lago di Lugano 1932.</p>
<h2>Wann und Anmeldung</h2>
<p>2026 fand die 94. Ausgabe am Sonntag, 16. August statt. Anmeldung online auf der offiziellen Website der Traversata oder über endu.net (Lugano Region). Das Datum 2027 ergänzen wir nach der Ankündigung.</p>
<h2>Vorbereitung</h2>
<p>2500 Meter im See sind eine echte Distanz: vorher im offenen Wasser trainieren, das eigene Tempo kennen. Das Wasser von heute am Lido di Lugano zeigt unsere App jeden Morgen.</p>` },
    en: { titre: 'Lake Lugano crossing 2027 (Traversata): date, entry, route', h1: 'The 2027 Lake Lugano crossing: what we already know',
      desc: 'The Traversata del Lago di Lugano: 2,500 m from Caprino to the Lido di Lugano, an untimed popular swim since 1932. 2027 date not yet known; the pattern of the 94th edition in 2026.',
      bref: 'The <strong>Traversata del Lago di Lugano</strong> is an <strong>untimed 2,500-metre</strong> popular swim, from <strong>Caprino to the Lido di Lugano</strong>. The 94th edition took place on <strong>Sunday 16 August 2026</strong>. The <strong>2027 date is not yet known</strong> (as of 18 November 2026).',
      corps: `
<h2>The route</h2>
<p>The traditional route starts in Caprino, on the opposite shore, and finishes at the Lido di Lugano after 2,500 metres, crossing the 46th parallel north. It is not a race (Ticino Turismo). It is run by the Traversata Lago di Lugano 1932 association.</p>
<h2>When and how to enter</h2>
<p>In 2026 the 94th edition took place on Sunday 16 August. Entry is online on the Traversata’s official website or via endu.net (Lugano Region). We will add the 2027 date once announced.</p>
<h2>Getting ready</h2>
<p>2,500 metres in a lake is a real distance: train in open water first, know your pace. Today’s water at the Lido di Lugano is in the app every morning.</p>` } }),
];
