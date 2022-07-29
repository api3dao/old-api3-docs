module.exports = [
  {
    title: 'Introduction',
    initialOpenGroupIndex: 1,
    collapsable: false,
    children: [
      '', //README
      'introduction/why-use-dapis',
      'introduction/why-power',
      'introduction/api3-market',
    ],
  },
  {
    title: 'dApp Developers',
    initialOpenGroupIndex: 1,
    collapsable: false,
    children: [
      'developers/', // README
      'developers/read-data-feed-with-dapi-name',
      'developers/read-data-feed-value-with-dapi-name',
      'developers/read-data-feed-with-id',
      'developers/read-data-feed-value-with-id',
      'developers/reader-can-read-datafeed',
      'developers/data-feed-id-to-reader-to-whitelist-status',
    ],
  },
  {
    title: 'Operations Repository',
    initialOpenGroupIndex: 1,
    collapsable: false,
    children: [
      'operations/operations-repository.md',
      'operations/structure.md',
      'operations/reference.md',
    ],
  },
  {
    title: 'Reference',
    initialOpenGroupIndex: 1,
    collapsable: false,
    children: [
      'reference/schemes.md',
      'reference/dapi-browser.md',
      'reference/chains.md',
    ],
  },
];
