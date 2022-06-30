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
    title: 'How to Guides',
    initialOpenGroupIndex: 1,
    collapsable: false,
    children: [
      'user-guides/',
      'user-guides/signup',
      'user-guides/integrations',
      'user-guides/deployments',
    ],
  },
  {
    title: 'Reference',
    initialOpenGroupIndex: 1,
    collapsable: false,
    children: [
      'reference/terms',
      {
        title: 'Example Files',
        initialOpenGroupIndex: 1,
        collapsable: false,
        children: [
          'reference/example-files/config',
          'reference/example-files/aws',
          'reference/example-files/secrets',
        ],
      },
    ],
  },
];
