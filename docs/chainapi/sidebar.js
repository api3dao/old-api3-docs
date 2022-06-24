module.exports = [
  {
    title: 'Introduction',
    initialOpenGroupIndex: 1,
    collapsable: false,
    children: [
      '', //README
      'introduction/why-use-chainapi',
      'introduction/concepts',
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
    title: 'Example Files',
    initialOpenGroupIndex: 1,
    collapsable: false,
    children: [
      'example-files/config',
      'example-files/aws',
      'example-files/secrets',
    ],
  },
];
