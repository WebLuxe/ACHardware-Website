/* Everything specific to the shop lives here. Edit this file only. */
window.SITE = {
  name: 'AC Hardware',
  slogan: 'One-Stop Tools Station',
  phone: '464 6376',
  phoneIntl: '+2304646376',
  whatsapp: '',                 // add a WhatsApp number (e.g. '2305xxxxxxx') to show WhatsApp buttons
  address: '',                  // street address; leave empty to show "Call us for directions"
  mapQuery: '',                 // e.g. 'AC Hardware, Port Louis, Mauritius' to show a map
  hours: [],                    // e.g. [['Mon to Fri', '8:00 to 17:00'], ['Saturday', '8:00 to 13:00']]; empty = "Call for opening hours"
  tiktok: 'https://www.tiktok.com/@achardware.mu',
  tiktokHandle: '@achardware.mu',
  stats: { followers: 21200, likes: 106300 },
  brand: 'TOTAL',
  currency: 'Rs',
  demoPrices: true,              // true = shows "example prices" notes until real prices are in

  // [key, aisle name, photo, short line]
  categories: [
    ['power', 'Power tools', 'img/p-grinder.webp', 'Drills, grinders, saws'],
    ['hand', 'Hand tools', 'img/p-hand-tools.webp', 'Hammers, spanners, sets'],
    ['garden', 'Garden', 'img/p-garden.webp', 'Hoses, barrows, tools'],
    ['plumbing', 'Plumbing', 'img/p-pliers.webp', 'Wrenches, pliers, fittings'],
    ['electrical', 'Electrical', 'img/p-electric.webp', 'Testers, meters, cable'],
    ['paint', 'Paint & decor', 'img/p-paint.webp', 'Rollers, brushes, trays'],
    ['safety', 'Safety gear', 'img/p-flatlay.webp', 'Gloves, goggles, kits'],
    ['fixings', 'Screws & fixings', 'img/p-screws.webp', 'Screws, bolts, plugs']
  ],
  // [id, name, aisle, photo, price, spec, tag]
  products: [
    ['p1', 'Cordless drill 20V', 'power', 'img/p-drill.webp', 3950, '2 batteries · charger · case', 'Best seller'],
    ['p2', 'Impact drill 680W', 'power', 'img/p-drill-table.webp', 2450, '13 mm chuck · hammer mode', ''],
    ['p3', 'Angle grinder 750W', 'power', 'img/p-grinder.webp', 1850, '115 mm disc · side handle', 'Best seller'],
    ['p4', 'Circular saw 1400W', 'power', 'img/p-saw.webp', 3600, '185 mm blade · laser guide', 'New'],
    ['h1', 'Claw hammer 450 g', 'hand', 'img/p-hammer.webp', 390, 'Fibreglass handle', ''],
    ['h2', 'Screwdriver set, 6 pcs', 'hand', 'img/p-screwdriver.webp', 450, 'Flat & Phillips', 'Best seller'],
    ['h3', 'Tape measure 5 m', 'hand', 'img/p-tape.webp', 195, 'Auto lock · belt clip', ''],
    ['h4', 'Spanner set, 12 pcs', 'hand', 'img/p-wrenches.webp', 1250, 'Chrome vanadium', ''],
    ['h5', 'Woodwork starter kit', 'hand', 'img/p-hand-tools.webp', 1850, 'Saw · square · hammer · plane', 'New'],
    ['g1', 'Garden hose 15 m', 'garden', 'img/p-hose.webp', 950, 'With spray gun', ''],
    ['g2', 'Wheelbarrow 65 L', 'garden', 'img/p-garden.webp', 3200, 'Steel tray · air tyre', ''],
    ['g3', 'Garden tool set', 'garden', 'img/p-oldtools.webp', 1150, 'Spade · rake · shears', ''],
    ['b1', 'Pipe wrench 14"', 'plumbing', 'img/p-wrench.webp', 650, 'Heavy duty', ''],
    ['b2', 'Water pump pliers 10"', 'plumbing', 'img/p-pliers.webp', 420, 'Adjustable jaw', 'Best seller'],
    ['e1', 'Digital clamp meter', 'electrical', 'img/p-meter.webp', 1290, 'AC/DC · continuity', ''],
    ['e2', 'Electrician tester kit', 'electrical', 'img/p-electric.webp', 890, 'Probe · tester · case', ''],
    ['f1', 'Paint roller set 9"', 'paint', 'img/p-paint.webp', 220, 'Tray & extension pole', ''],
    ['s1', 'Safety starter kit', 'safety', 'img/p-flatlay.webp', 360, 'Gloves · goggles · pliers', ''],
    ['x1', 'Bolt & nut assortment', 'fixings', 'img/p-bolts.webp', 280, '240 pcs · storage box', ''],
    ['x2', 'Wood screws, 500 pcs', 'fixings', 'img/p-screws.webp', 190, 'Mixed sizes', '']
  ]
};
