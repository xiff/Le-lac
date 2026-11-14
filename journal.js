// Fusion d'un journal importé dans la liste d'une saison : ignore les doublons (même date et même plage) et tout ce qui n'a pas la bonne forme.
export const SAISON = /^\d{4}-\d{4}$/;
export function fusionner(existant, importe) {
  const l = [...existant], vus = new Set(l.map((b) => b.d + '|' + b.plage));
  for (const b of Array.isArray(importe) ? importe : []) {
    if (!b || typeof b !== 'object' || vus.has(b.d + '|' + b.plage)) continue;
    vus.add(b.d + '|' + b.plage);
    l.push({ d: typeof b.d === 'string' ? b.d : null, plage: typeof b.plage === 'string' ? b.plage.slice(0, 80) : undefined, eau: typeof b.eau === 'number' ? b.eau : null });
  }
  return l.sort((x, y) => String(x.d).localeCompare(String(y.d)));
}
