// Fige eau.json une fois par jour (à partir de 6 h UTC) dans eau-jour.json : les pages de plage en tirent la
// température du matin écrite dans leur HTML, qui ne change donc qu'une fois par jour (et non toutes les 3 heures).
import { readFile, writeFile } from 'node:fs/promises';

const eau = JSON.parse(await readFile(new URL('../eau.json', import.meta.url), 'utf8'));
const jour = await readFile(new URL('../eau-jour.json', import.meta.url), 'utf8').then((t) => JSON.parse(t).maj?.slice(0, 10)).catch(() => null);
const aujourdhui = new Date().toISOString().slice(0, 10);
if (new Date().getUTCHours() >= 6 && jour !== aujourdhui && eau.maj?.slice(0, 10) === aujourdhui) {
  await writeFile(new URL('../eau-jour.json', import.meta.url), JSON.stringify(eau));
  console.log('eau-jour.json mis à jour');
}
