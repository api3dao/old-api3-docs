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
      'user-guides/registration',
      'user-guides/integrations',
      'user-guides/deployments',
      'user-guides/workspaces',
      'user-guides/Import&Export',
    ],
  },
  {
    title: 'Reference',
    initialOpenGroupIndex: 1,
    collapsable: false,
    children: [
      'reference/terms',
      {
        title: 'Example Deployment Files',
        initialOpenGroupIndex: 1,
        collapsable: false,
        children: [
          'reference/example-files/overview',
          'reference/example-files/',
          'reference/example-files/config',
          'reference/example-files/aws',
          'reference/example-files/secrets',
        ],
      },
    ],
  },
];
