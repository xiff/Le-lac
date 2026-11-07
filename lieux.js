// Bars et restos au bord de l'eau. zone = zone des plages (voir SPOTS dans index.html).
// shortcut: liste écrite à la main, sans horaires ni prix ; passer à une base éditable quand les partenaires paieront pour y figurer.
export const LIEUX = [
  { nom: 'Buvette des Bains des Pâquis', ville: 'Genève', zone: 'geneve', type: 'bar', note: 'Fondue l’hiver, plat du jour l’été, les pieds presque dans l’eau.' },
  { nom: 'La Barje des Lavandières', ville: 'Genève', zone: 'geneve', type: 'bar', note: 'Buvette d’été au bord du Rhône, à deux pas de la rade.' },
  { nom: 'Buvettes de la plage des Eaux-Vives', ville: 'Genève', zone: 'geneve', type: 'bar', note: 'La plage la plus récente de Genève, l’apéro les pieds dans les galets.' },
  { nom: 'Le Chat-Botté (Beau-Rivage)', ville: 'Genève', zone: 'geneve', type: 'resto', note: 'Terrasse face au Jet d’eau. Le restaurant pour les grandes occasions.' },
  { nom: 'La Perle du Lac', ville: 'Genève', zone: 'geneve', type: 'resto', note: 'Terrasse dans le parc Mon Repos, face au lac.' },
  { nom: 'Restaurant du Parc des Eaux-Vives', ville: 'Genève', zone: 'geneve', type: 'resto', note: 'Maison de maître dans le parc, vue sur la rade. Pour une occasion.' },
  { nom: 'Auberge d’Hermance', ville: 'Hermance', zone: 'geneve', type: 'resto', note: 'Village au bord du lac, à 20 minutes de Genève.' },
  { nom: 'Hôtel du Lac', ville: 'Coppet', zone: 'nyon', type: 'resto', note: 'Terrasse au ras de l’eau entre Genève et Nyon.' },
  { nom: 'La Jetée de la Compagnie', ville: 'Lausanne', zone: 'lausanne', type: 'bar', note: 'Buvette d’été sur la jetée d’Ouchy, parfaite au coucher du soleil.' },
  { nom: 'Le Lacustre', ville: 'Lausanne', zone: 'lausanne', type: 'resto', note: 'Sur le quai d’Ouchy, face aux bateaux CGN.' },
  { nom: 'Beau-Rivage Palace', ville: 'Lausanne', zone: 'lausanne', type: 'bar', note: 'Le verre chic du dimanche, jardins jusqu’au lac.' },
  { nom: 'Hôtel Le Rivage', ville: 'Lutry', zone: 'lausanne', type: 'resto', note: 'Terrasse sur le quai de Lutry, au pied de Lavaux.' },
  { nom: 'Le Major Davel', ville: 'Cully', zone: 'vevey', type: 'resto', note: 'Filets de perche face au lac, au cœur de Lavaux.' },
  { nom: 'Hôtel des Trois Couronnes', ville: 'Vevey', zone: 'vevey', type: 'bar', note: 'Terrasse Belle Époque sur les quais de Vevey.' },
  { nom: 'Fairmont Le Montreux Palace', ville: 'Montreux', zone: 'vevey', type: 'bar', note: 'Un verre Belle Époque face aux Dents-du-Midi.' },
  { nom: 'Hôtel du Port', ville: 'Yvoire', zone: 'evian', type: 'resto', note: 'Village médiéval, terrasse sur le port côté français.' },
];

export const lienCarte = (l) => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(`${l.nom} ${l.ville}`);
