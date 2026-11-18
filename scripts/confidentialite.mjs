// Génère confidentialite/ (fr) et confidentialite/en|de|it/ : la page « Confidentialité ».
// Chaque affirmation vient du code du site ou d'une page officielle lue le 15 novembre 2026 (voir SOURCES dans TODO.md) ;
// relancer ce script après toute modification, et changer MAJ quand le contenu change vraiment.
import { writeFile, mkdir } from 'node:fs/promises';
import { pied, langues } from './pied.mjs';

const BASE = 'https://monlac.ch/', MAJ = '2026-11-15';
const SUF = { fr: '', en: 'en/', de: 'de/', it: 'it/' }, LANGUES = Object.keys(SUF);
const NOM = { fr: 'Mon Lac', en: 'My Lake', de: 'Mein See', it: 'Il mio lago' };
const MAIL = 'contact@monlac.ch';
const date = (L) => new Date(MAJ).toLocaleDateString({ fr: 'fr-CH', en: 'en-GB', de: 'de-CH', it: 'it-CH' }[L], { day: 'numeric', month: 'long', year: 'numeric' });
const a = (u, t) => `<a href="${u}" rel="noopener">${t}</a>`;

const TXT = {
  fr: {
    titre: 'Confidentialité', desc: 'Ce que monlac.ch enregistre, chez qui, et comment l’effacer : sans compte, sans cookie, sans publicité.',
    chapo: 'En deux phrases : monlac.ch n’a ni compte, ni cookie, ni publicité, et garde tes choix dans ton navigateur. Quelques services extérieurs reçoivent ton adresse IP quand ta page se charge ; voici lesquels et pourquoi.',
    maj: 'Dernière mise à jour', ariane: 'Fil d’Ariane', retour: 'Ouvrir l’app',
    s: [
      ['Qui est responsable', `<p>monlac.ch (« ${NOM.fr} ») est un site d’information indépendant, sans publicité ni abonnement. Pour toute question sur tes données : ${a('mailto:' + MAIL, MAIL)}.</p>`],
      ['Ce que nous ne faisons pas', `<ul><li>Pas de compte, pas d’inscription, pas de lettre d’information.</li><li>Pas de cookie, pas de publicité, pas de pistage entre sites.</li><li>Pas de base de données d’utilisateurs : nous ne pouvons pas te retrouver, ni retrouver ton journal de bains.</li></ul>`],
      ['Ce qui reste sur ton appareil', `<p>Ces informations sont enregistrées dans ton navigateur (<em>localStorage</em>), jamais envoyées chez nous : ta plage, ta langue, tes activités, tes favoris, ton journal de bains (date, plage, température de l’eau), quelques réglages d’affichage (avis déjà lus, date du dernier export) et un compteur qui varie les phrases du titre.</p><p><b>Pour les effacer :</b> retire un bain avec le « × » de « Mon historique », ou vide les données du site dans les réglages de ton navigateur. Dans ce cas, ton journal disparaît et nous ne pouvons pas le retrouver : exporte-le de temps en temps.</p>`],
      ['Ta position', `<p>« Trouver ma plage » calcule la plage la plus proche dans ton navigateur, seulement quand tu appuies sur le bouton. Ta position n’est jamais envoyée : la météo est demandée avec les coordonnées de la plage.</p>`],
      ['Proposer un lieu', `<p>Le formulaire « Un bar ou un resto manque ? » n’envoie rien lui-même : il ouvre ton application de messagerie avec un message prérempli. Si tu l’envoies, nous recevons ton adresse email et ton texte, uniquement pour examiner ta proposition.</p>`],
      ['Mesure d’audience : Umami', `<p>Pour savoir combien de personnes utilisent le site, nous utilisons Umami Cloud (Umami Software, Inc.), sans cookie. D’après la documentation officielle d’Umami, il enregistre la page vue, le site d’origine, le navigateur, le système, le type d’appareil, la langue et un lieu approximatif (pays, région, ville) déduit de l’adresse IP. L’adresse IP n’est pas conservée dans les statistiques : elle sert, avec le navigateur, à calculer un identifiant de visite anonyme, qui change chaque mois. Elle peut en revanche apparaître dans les journaux techniques d’Umami et de ses prestataires.</p><p>Umami fait appel à des sous-traitants situés en Europe et aux États-Unis (hébergement, base de données, réseau de diffusion) ; ${a('https://umami.is/subprocessors', 'liste officielle')}. Nous mesurons la fréquentation sur la base de notre intérêt légitime à savoir si le site sert.</p>`],
      ['Services extérieurs appelés par ton navigateur', `<ul><li><b>Open-Meteo</b> (OpenMeteo GmbH, Bürglen UR, Suisse) fournit la météo. Ton navigateur lui envoie les coordonnées de la plage et, comme toute requête, ton adresse IP. Open-Meteo indique ne pas utiliser de cookie, et conserver ses journaux, qui peuvent contenir des coordonnées, 90 jours. ${a('https://open-meteo.com/en/terms', 'Conditions et confidentialité')}.</li><li><b>existenz.ch</b> (Christian Studer, Bureau für digitale Existenz) ne sert qu’en secours, pour la température du lac à Genève quand notre modèle n’a pas de valeur. Il relaie des données de l’Office fédéral de l’environnement. Ton adresse IP lui parvient avec la requête ; nous n’avons trouvé aucune déclaration de confidentialité publiée sur ce service. ${a('https://existenz.ch/apiservice/', 'Présentation')}.</li><li><b>GitHub Pages</b> (GitHub, Inc., États-Unis) héberge le site. GitHub traite l’adresse IP des visiteurs, et indique encadrer les transferts depuis la Suisse et l’Union européenne par des clauses contractuelles types et le Data Privacy Framework. ${a('https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement', 'Déclaration de confidentialité')}.</li></ul><p>L’eau (Alplakes, Eawag), la qualité (CIPEL, canton de Genève) et les autres sources sont lues par nos serveurs, pas par ton navigateur. Les liens vers des sites extérieurs ne sont chargés que si tu cliques.</p>`],
      ['Tes droits', `<p>Tu peux demander l’accès, la rectification ou l’effacement de tes données, ou t’opposer à leur traitement, en écrivant à ${a('mailto:' + MAIL, MAIL)}. Comme nous ne tenons aucun fichier d’utilisateurs, ces demandes concernent surtout les emails reçus. Tu peux aussi t’adresser au Préposé fédéral à la protection des données et à la transparence (Suisse) ou à l’autorité de protection des données de ton pays (en France, la CNIL).</p>`],
      ['Changements', `<p>Si ces pratiques changent, cette page est mise à jour et la date ci-dessous aussi.</p>`],
    ],
  },
  en: {
    titre: 'Privacy', desc: 'What monlac.ch records, who receives it, and how to erase it: no account, no cookie, no ads.',
    chapo: 'In two sentences: monlac.ch has no account, no cookie and no ads, and keeps your choices in your browser. A few outside services receive your IP address when a page loads; here is which ones and why.',
    maj: 'Last updated', ariane: 'Breadcrumb', retour: 'Open the app',
    s: [
      ['Who is responsible', `<p>monlac.ch (“${NOM.en}”) is an independent information site with no ads and no subscription. For any question about your data: ${a('mailto:' + MAIL, MAIL)}.</p>`],
      ['What we don’t do', `<ul><li>No account, no sign-up, no newsletter.</li><li>No cookies, no ads, no tracking across sites.</li><li>No user database: we cannot find you, nor your swim log.</li></ul>`],
      ['What stays on your device', `<p>This information is saved in your browser (<em>localStorage</em>) and never sent to us: your beach, language, activities, favourites, your swim log (date, beach, water temperature), a few display settings (notices already read, date of your last export) and a counter that varies the headline wording.</p><p><b>To erase it:</b> remove a swim with the “×” in “My history”, or clear the site’s data in your browser settings. If you do, your log is gone and we cannot recover it: export it from time to time.</p>`],
      ['Your location', `<p>“Find my beach” works out the nearest beach inside your browser, only when you press the button. Your location is never sent: the weather is requested with the beach’s coordinates.</p>`],
      ['Suggesting a place', `<p>The “A bar or restaurant is missing?” form sends nothing itself: it opens your email app with a pre-filled message. If you send it, we receive your email address and your text, only to review your suggestion.</p>`],
      ['Audience measurement: Umami', `<p>To know how many people use the site, we use Umami Cloud (Umami Software, Inc.), without cookies. According to Umami’s official documentation, it records the page viewed, referrer, browser, system, device type, language and an approximate location (country, region, city) derived from the IP address. The IP address is not kept in the statistics: together with the browser, it is used to compute an anonymous visit identifier that changes every month. It may, however, appear in the technical logs of Umami and its providers.</p><p>Umami uses subprocessors in Europe and the United States (hosting, database, content delivery); ${a('https://umami.is/subprocessors', 'official list')}. We measure traffic on the basis of our legitimate interest in knowing whether the site is useful.</p>`],
      ['Outside services called by your browser', `<ul><li><b>Open-Meteo</b> (OpenMeteo GmbH, Bürglen UR, Switzerland) provides the weather. Your browser sends it the beach’s coordinates and, as with any request, your IP address. Open-Meteo states it uses no cookies and keeps its logs, which may contain coordinates, for 90 days. ${a('https://open-meteo.com/en/terms', 'Terms and privacy')}.</li><li><b>existenz.ch</b> (Christian Studer, Bureau für digitale Existenz) is only a fallback, for the lake temperature at Geneva when our model has no value. It relays data from the Swiss Federal Office for the Environment. Your IP address reaches it with the request; we found no published privacy statement for this service. ${a('https://existenz.ch/apiservice/', 'Overview')}.</li><li><b>GitHub Pages</b> (GitHub, Inc., United States) hosts the site. GitHub processes visitors’ IP addresses, and states it covers transfers from Switzerland and the European Union with standard contractual clauses and the Data Privacy Framework. ${a('https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement', 'Privacy statement')}.</li></ul><p>Water data (Alplakes, Eawag), water quality (CIPEL, canton of Geneva) and other sources are read by our servers, not by your browser. Links to outside sites load only if you click.</p>`],
      ['Your rights', `<p>You can ask for access, correction or erasure of your data, or object to its processing, by writing to ${a('mailto:' + MAIL, MAIL)}. Since we keep no user file, such requests mostly concern emails received. You may also contact the Federal Data Protection and Information Commissioner (Switzerland) or the data protection authority of your country (in France, the CNIL).</p>`],
      ['Changes', `<p>If these practices change, this page and the date below are updated.</p>`],
    ],
  },
  de: {
    titre: 'Datenschutz', desc: 'Was monlac.ch speichert, wer es erhält und wie du es löschst: ohne Konto, ohne Cookie, ohne Werbung.',
    chapo: 'In zwei Sätzen: monlac.ch hat kein Konto, keine Cookies und keine Werbung und behält deine Auswahl in deinem Browser. Einige externe Dienste erhalten beim Laden einer Seite deine IP-Adresse; hier steht, welche und warum.',
    maj: 'Zuletzt aktualisiert', ariane: 'Brotkrumen', retour: 'App öffnen',
    s: [
      ['Wer verantwortlich ist', `<p>monlac.ch («${NOM.de}») ist eine unabhängige Informationsseite ohne Werbung und ohne Abo. Bei Fragen zu deinen Daten: ${a('mailto:' + MAIL, MAIL)}.</p>`],
      ['Was wir nicht tun', `<ul><li>Kein Konto, keine Anmeldung, kein Newsletter.</li><li>Keine Cookies, keine Werbung, kein seitenübergreifendes Tracking.</li><li>Keine Nutzerdatenbank: Wir können dich und dein Badetagebuch nicht wiederfinden.</li></ul>`],
      ['Was auf deinem Gerät bleibt', `<p>Diese Angaben werden in deinem Browser gespeichert (<em>localStorage</em>) und nie an uns gesendet: dein Strand, deine Sprache, deine Aktivitäten, deine Favoriten, dein Badetagebuch (Datum, Strand, Wassertemperatur), einige Anzeigeeinstellungen (bereits gelesene Hinweise, Datum des letzten Exports) und ein Zähler, der die Titelsätze abwechselt.</p><p><b>Zum Löschen:</b> Entferne ein Bad mit dem «×» unter «Mein Verlauf» oder lösche die Websitedaten in den Browsereinstellungen. Dann ist dein Tagebuch weg und wir können es nicht wiederherstellen: Exportiere es ab und zu.</p>`],
      ['Dein Standort', `<p>«Meinen Strand finden» berechnet den nächsten Strand in deinem Browser, nur wenn du die Taste drückst. Dein Standort wird nie gesendet: Das Wetter wird mit den Koordinaten des Strands abgefragt.</p>`],
      ['Einen Ort vorschlagen', `<p>Das Formular «Es fehlt eine Bar oder ein Restaurant?» sendet selbst nichts: Es öffnet deine E-Mail-App mit einer vorbereiteten Nachricht. Wenn du sie abschickst, erhalten wir deine E-Mail-Adresse und deinen Text, nur um deinen Vorschlag zu prüfen.</p>`],
      ['Reichweitenmessung: Umami', `<p>Um zu wissen, wie viele Personen die Seite nutzen, verwenden wir Umami Cloud (Umami Software, Inc.), ohne Cookies. Laut der offiziellen Dokumentation von Umami werden die besuchte Seite, die Herkunftsseite, Browser, System, Gerätetyp, Sprache und ein ungefährer Standort (Land, Region, Stadt) erfasst, der aus der IP-Adresse abgeleitet wird. Die IP-Adresse wird nicht in den Statistiken gespeichert: Zusammen mit dem Browser dient sie zur Berechnung einer anonymen Besuchskennung, die sich jeden Monat ändert. In den technischen Protokollen von Umami und seinen Dienstleistern kann sie dennoch auftauchen.</p><p>Umami setzt Unterauftragsverarbeiter in Europa und den USA ein (Hosting, Datenbank, Content-Auslieferung); ${a('https://umami.is/subprocessors', 'offizielle Liste')}. Wir messen die Nutzung aufgrund unseres berechtigten Interesses, zu wissen, ob die Seite nützt.</p>`],
      ['Externe Dienste, die dein Browser aufruft', `<ul><li><b>Open-Meteo</b> (OpenMeteo GmbH, Bürglen UR, Schweiz) liefert das Wetter. Dein Browser sendet die Koordinaten des Strands und, wie bei jeder Anfrage, deine IP-Adresse. Open-Meteo gibt an, keine Cookies zu verwenden und seine Protokolle, die Koordinaten enthalten können, 90 Tage aufzubewahren. ${a('https://open-meteo.com/en/terms', 'Bedingungen und Datenschutz')}.</li><li><b>existenz.ch</b> (Christian Studer, Bureau für digitale Existenz) dient nur als Reserve, für die Seetemperatur in Genf, wenn unser Modell keinen Wert hat. Es leitet Daten des Bundesamts für Umwelt weiter. Deine IP-Adresse erreicht den Dienst mit der Anfrage; wir haben keine veröffentlichte Datenschutzerklärung für diesen Dienst gefunden. ${a('https://existenz.ch/apiservice/', 'Übersicht')}.</li><li><b>GitHub Pages</b> (GitHub, Inc., USA) hostet die Seite. GitHub verarbeitet die IP-Adressen der Besuchenden und gibt an, Übertragungen aus der Schweiz und der Europäischen Union durch Standardvertragsklauseln und das Data Privacy Framework abzusichern. ${a('https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement', 'Datenschutzerklärung')}.</li></ul><p>Wasserdaten (Alplakes, Eawag), Wasserqualität (CIPEL, Kanton Genf) und andere Quellen liest unser Server, nicht dein Browser. Links zu externen Seiten werden nur geladen, wenn du klickst.</p>`],
      ['Deine Rechte', `<p>Du kannst Auskunft, Berichtigung oder Löschung deiner Daten verlangen oder der Bearbeitung widersprechen, indem du an ${a('mailto:' + MAIL, MAIL)} schreibst. Da wir keine Nutzerdatei führen, betreffen solche Anfragen vor allem erhaltene E-Mails. Du kannst dich auch an den Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (Schweiz) oder an die Datenschutzbehörde deines Landes wenden (in Frankreich die CNIL).</p>`],
      ['Änderungen', `<p>Ändern sich diese Praktiken, werden diese Seite und das Datum unten aktualisiert.</p>`],
    ],
  },
  it: {
    titre: 'Privacy', desc: 'Cosa registra monlac.ch, chi lo riceve e come cancellarlo: senza account, senza cookie, senza pubblicità.',
    chapo: 'In due frasi: monlac.ch non ha account, cookie né pubblicità e tiene le tue scelte nel tuo browser. Alcuni servizi esterni ricevono il tuo indirizzo IP quando una pagina si carica; ecco quali e perché.',
    maj: 'Ultimo aggiornamento', ariane: 'Percorso', retour: 'Apri l’app',
    s: [
      ['Chi è responsabile', `<p>monlac.ch («${NOM.it}») è un sito d’informazione indipendente, senza pubblicità né abbonamento. Per qualsiasi domanda sui tuoi dati: ${a('mailto:' + MAIL, MAIL)}.</p>`],
      ['Cosa non facciamo', `<ul><li>Nessun account, nessuna registrazione, nessuna newsletter.</li><li>Nessun cookie, nessuna pubblicità, nessun tracciamento tra siti.</li><li>Nessun database di utenti: non possiamo ritrovare né te né il tuo diario dei bagni.</li></ul>`],
      ['Cosa resta sul tuo dispositivo', `<p>Queste informazioni sono salvate nel tuo browser (<em>localStorage</em>) e mai inviate a noi: la tua spiaggia, la lingua, le attività, i preferiti, il diario dei bagni (data, spiaggia, temperatura dell’acqua), alcune impostazioni di visualizzazione (avvisi già letti, data dell’ultima esportazione) e un contatore che varia le frasi del titolo.</p><p><b>Per cancellarle:</b> rimuovi un bagno con la «×» di «La mia cronologia», oppure cancella i dati del sito nelle impostazioni del browser. In tal caso il diario sparisce e non possiamo recuperarlo: esportalo ogni tanto.</p>`],
      ['La tua posizione', `<p>«Trova la mia spiaggia» calcola la spiaggia più vicina nel tuo browser, solo quando premi il pulsante. La tua posizione non viene mai inviata: il meteo è richiesto con le coordinate della spiaggia.</p>`],
      ['Proporre un luogo', `<p>Il modulo «Manca un bar o un ristorante?» non invia nulla da solo: apre la tua app di posta con un messaggio precompilato. Se lo invii, riceviamo il tuo indirizzo email e il tuo testo, solo per esaminare la proposta.</p>`],
      ['Misurazione del pubblico: Umami', `<p>Per sapere quante persone usano il sito, usiamo Umami Cloud (Umami Software, Inc.), senza cookie. Secondo la documentazione ufficiale di Umami, registra la pagina vista, la provenienza, il browser, il sistema, il tipo di dispositivo, la lingua e una posizione approssimativa (paese, regione, città) dedotta dall’indirizzo IP. L’indirizzo IP non è conservato nelle statistiche: insieme al browser serve a calcolare un identificativo di visita anonimo, che cambia ogni mese. Può invece comparire nei registri tecnici di Umami e dei suoi fornitori.</p><p>Umami si avvale di subfornitori in Europa e negli Stati Uniti (hosting, database, rete di distribuzione); ${a('https://umami.is/subprocessors', 'elenco ufficiale')}. Misuriamo la frequentazione sulla base del nostro interesse legittimo a sapere se il sito serve.</p>`],
      ['Servizi esterni chiamati dal tuo browser', `<ul><li><b>Open-Meteo</b> (OpenMeteo GmbH, Bürglen UR, Svizzera) fornisce il meteo. Il tuo browser gli invia le coordinate della spiaggia e, come ogni richiesta, il tuo indirizzo IP. Open-Meteo indica di non usare cookie e di conservare i propri registri, che possono contenere coordinate, per 90 giorni. ${a('https://open-meteo.com/en/terms', 'Condizioni e privacy')}.</li><li><b>existenz.ch</b> (Christian Studer, Bureau für digitale Existenz) serve solo come riserva, per la temperatura del lago a Ginevra quando il nostro modello non ha valori. Inoltra dati dell’Ufficio federale dell’ambiente. Il tuo indirizzo IP lo raggiunge con la richiesta; non abbiamo trovato alcuna informativa sulla privacy pubblicata per questo servizio. ${a('https://existenz.ch/apiservice/', 'Presentazione')}.</li><li><b>GitHub Pages</b> (GitHub, Inc., Stati Uniti) ospita il sito. GitHub tratta gli indirizzi IP dei visitatori e indica di coprire i trasferimenti dalla Svizzera e dall’Unione europea con clausole contrattuali tipo e il Data Privacy Framework. ${a('https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement', 'Informativa sulla privacy')}.</li></ul><p>I dati sull’acqua (Alplakes, Eawag), la qualità (CIPEL, cantone di Ginevra) e le altre fonti sono letti dai nostri server, non dal tuo browser. I link a siti esterni si caricano solo se clicchi.</p>`],
      ['I tuoi diritti', `<p>Puoi chiedere accesso, rettifica o cancellazione dei tuoi dati, o opporti al loro trattamento, scrivendo a ${a('mailto:' + MAIL, MAIL)}. Poiché non teniamo alcun archivio di utenti, queste richieste riguardano soprattutto le email ricevute. Puoi anche rivolgerti all’Incaricato federale della protezione dei dati e della trasparenza (Svizzera) o all’autorità per la protezione dei dati del tuo paese (in Francia, la CNIL).</p>`],
      ['Modifiche', `<p>Se queste pratiche cambiano, questa pagina e la data qui sotto vengono aggiornate.</p>`],
    ],
  },
};
const OG = { fr: 'fr_CH', en: 'en_GB', de: 'de_CH', it: 'it_CH' };
const MARQUE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>';
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export function pageConfidentialite(L) {
  const t = TXT[L], r = SUF[L] ? '../../' : '../', url = `${BASE}confidentialite/${SUF[L]}`;
  const urls = Object.fromEntries(LANGUES.map((l) => [l, `${BASE}confidentialite/${SUF[l]}`]));
  const liens = Object.fromEntries(LANGUES.map((l) => [l, (SUF[L] ? '../' : '') + SUF[l]]));
  return `<!doctype html>
<html lang="${L}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(t.titre)} · ${NOM[L]}</title>
<meta name="description" content="${esc(t.desc)}">
<link rel="canonical" href="${url}">
${LANGUES.map((l) => `<link rel="alternate" hreflang="${l}" href="${urls[l]}">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${urls.fr}">
<meta property="og:title" content="${esc(t.titre)} · ${NOM[L]}">
<meta property="og:description" content="${esc(t.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="${OG[L]}">
<meta name="theme-color" content="#0d4a5c">
<link rel="icon" href="${r}favicon.ico" sizes="48x48">
<link rel="icon" href="${r}icon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${r}plage/plage.css">
<link rel="preload" href="${r}fonts/young-serif-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${r}fonts/onest-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<script defer src="https://cloud.umami.is/script.js" data-website-id="3fac0d48-00cf-403c-87f1-19e4a21bbe68"></script>
</head>
<body>
<header>
  <div class="haut"><a class="marque" translate="no" href="${r}?lang=${L}">${MARQUE}${NOM[L]}</a>${langues(L, liens)}</div>
  <h1>${esc(t.titre)}</h1>
  <p class="chapo">${esc(t.chapo)}</p>
</header>
<main class="article legal">
${t.s.map(([h, c]) => `  <h2>${h}</h2>\n  ${c}`).join('\n')}
  <p class="releve">${t.maj} : <time datetime="${MAJ}">${date(L)}</time></p>
  <a class="bouton" href="${r}?lang=${L}">${t.retour}</a>
</main>
${pied(L, r)}
</body>
</html>
`;
}

if (process.argv[1].endsWith('confidentialite.mjs')) {
  for (const L of LANGUES) {
    const dir = new URL(`../confidentialite/${SUF[L]}`, import.meta.url);
    await mkdir(dir, { recursive: true });
    await writeFile(new URL('index.html', dir), pageConfidentialite(L));
  }
  console.log('confidentialite : 4 pages écrites');
}
