// Génère un APK de TEST (Trusted Web Activity) à partir de twa-manifest.json, sans questions.
// Signé avec une clé jetable créée par la tâche GitHub : pour essayer l'app, pas pour le Play Store.
const fs = require('fs');
const path = require('path');
const { TwaManifest, TwaGenerator, Config, JdkHelper, AndroidSdkTools, GradleWrapper, ConsoleLog } = require('@bubblewrap/core');

(async () => {
  const log = new ConsoleLog('apk');
  const dossier = path.resolve('build-twa');
  const manifeste = new TwaManifest(JSON.parse(fs.readFileSync(path.join(__dirname, 'twa-manifest.json'), 'utf8')));
  await new TwaGenerator().createTwaProject(dossier, manifeste, log);
  // Sans réduction de code : R8 renommait une classe que la bibliothèque TWA active par son nom au démarrage
  // (« Component class R.u does not exist »), et l'app se fermait aussitôt ouverte.
  const gradle = path.join(dossier, 'app/build.gradle');
  const avant = fs.readFileSync(gradle, 'utf8'), apres = avant.replace(/minifyEnabled\s+true/g, 'minifyEnabled false');
  if (apres === avant) throw new Error('minifyEnabled true introuvable dans app/build.gradle');
  fs.writeFileSync(gradle, apres);

  const config = new Config(process.env.JAVA_HOME, process.env.ANDROID_HOME);
  const jdk = new JdkHelper(process, config);
  const sdk = await AndroidSdkTools.create(process, config, jdk, log);
  await new GradleWrapper(process, sdk, dossier).assembleRelease();

  const brut = path.join(dossier, 'app/build/outputs/apk/release/app-release-unsigned.apk');
  const aligne = path.join(dossier, 'aligne.apk');
  await sdk.zipalign(brut, aligne);
  await sdk.apksigner(process.env.KEYSTORE, process.env.KS_PASS, 'test', process.env.KS_PASS, aligne, path.resolve('mon-lac-test.apk'));
  log.info('APK de test prêt : mon-lac-test.apk');
})().catch((e) => { console.error(e); process.exit(1); });
