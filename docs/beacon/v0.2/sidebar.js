module.exports = [
  {
    title: 'Introduction',
    initialOpenGroupIndex: 1,
    collapsable: false,
    children: [
      '', //README
      'introduction/why-use-beacons',
      'introduction/why-power',
    ],
  },
  {
    title: 'dApp Developers',
    initialOpenGroupIndex: 1,
    collapsable: false,
    children: [
      'developers/', // README
      'developers/read-beacon',
      'developers/reader-can-read-beacon',
      'developers/beaconid-reader-whiteliststatus',
    ],
  },

  {
    title: 'Reference',
    initialOpenGroupIndex: 1,
    collapsable: false,
    children: [
      'reference/beacon-scheme.md',
      'reference/contract-addresses.md',
      'reference/beacon-browser.md',
      'reference/chains.md',
      'reference/monitor.md',
    ],
  },
];
