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
      'functions/request-beacon-update',
    ],
  },

  {
    title: 'Reference',
    initialOpenGroupIndex: 1,
    collapsable: false,
    children: [
      'reference/beacon-scheme.md',
      'reference/contract-addresses.md',
      'reference/beacon-ids.md',
    ],
  },
];
