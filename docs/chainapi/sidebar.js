module.exports = [
  {
    title: 'Introduction',
    initialOpenGroupIndex: 1,
    collapsable: false,
    children: [
      '', //README
      'introduction/why-use-chainapi',
    ],
  },
  {
    title: 'More',
    initialOpenGroupIndex: 1,
    collapsable: false,
    children: [
      'more/', // README
      { title: 'More Stuff about ChainAPI', path: 'more/more-stuff' },
    ],
  },
];
