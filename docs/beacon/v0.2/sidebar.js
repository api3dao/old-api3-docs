module.exports = [
  {
    title: 'Introduction',
    initialOpenGroupIndex: 1,
    collapsable: false,
    children: [
      '', //README
      'introduction/why-use-beacons',
      'introduction/hackathon',
    ],
  },
  {
    title: 'Beacon Server Functions',
    initialOpenGroupIndex: 1,
    collapsable: false,
    children: [
      'functions/', // README
      'functions/read-beacon',
      'functions/reader-can-read-beacon',
      'functions/beaconid-reader-whiteliststatus',
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
      'reference/chain-browser.md',
      'reference/monitor.md',
    ],
  },
];
