module.exports = [
  {
    title: 'Introduction',
    initialOpenGroupIndex: 0,
    collapsable: true,
    children: ['', 'introduction/why-use-airnode'],
  },
  {
    title: 'API Providers',
    initialOpenGroupIndex: 0,
    collapsable: true,
    children: [
      'grp-providers/', // Routes to the README.md in grp-providers
      {
        title: 'Design Philosophy',
        path: 'grp-providers/airnode/design-philosophy',
      },
      { title: 'Implementation', path: 'grp-providers/airnode/implementation' },
      {
        title: 'Ethereum Providers',
        path: 'grp-providers/airnode/ethereum-providers',
      },
      {
        title: 'Build an Airnode',
        collapsable: true,
        children: [
          'grp-providers/guides/build-an-airnode/',
          'grp-providers/guides/build-an-airnode/api-integration',
          'grp-providers/guides/build-an-airnode/configuring-airnode',
          'grp-providers/guides/build-an-airnode/apply-auth',
          {
            title: 'Heartbeat (optional)',
            path: 'grp-providers/guides/build-an-airnode/heartbeat',
          },
          {
            title: 'HTTP Gateway (optional)',
            path: 'grp-providers/guides/build-an-airnode/http-gateway',
          },
          'grp-providers/guides/build-an-airnode/deploying-airnode',
        ],
      },
      {
        title: 'Docker Images',
        collapsable: true,
        children: [
          'grp-providers/docker/',
          'grp-providers/docker/deployer-image',
          'grp-providers/docker/client-image',
        ],
      },
      {
        title: 'Tutorial',
        collapsable: true,
        children: [
          'grp-providers/tutorial/',
          'grp-providers/tutorial/config-json',
          'grp-providers/tutorial/secrets-env',
          'grp-providers/tutorial/aws-env',
        ],
      },
      //'grp-providers/validator',
    ],
  },
  {
    title: 'Developers',
    initialOpenGroupIndex: 0,
    collapsable: false,
    children: [
      'grp-developers/', // Routes to the README.md in grp-developers
      'grp-developers/requesters-sponsors',
      'grp-developers/call-an-airnode',
      'grp-developers/using-templates',
      'grp-developers/fees',
      /* Hide self-serve until AN-334 if completed. */
      //'grp-developers/self-serve-platforms',
    ],
  },
  {
    title: 'Concepts and Definitions',
    collapsable: true,
    initialOpenGroupIndex: -1,
    children: [
      'concepts/', // Routes to the README.md in /concepts
      'concepts/airnode',
      'concepts/endpoint',
      'concepts/authorization',
      'concepts/airnode-auth',
      'concepts/requester',
      'concepts/sponsor',
      'concepts/template',
      'concepts/request',
      'concepts/chain-providers',
    ],
  },
  {
    title: 'Reference',
    initialOpenGroupIndex: -1,
    collapsable: true,
    children: [
      {
        title: 'Specifications',
        collapsable: true,
        children: [
          {
            title: 'Oracle Integration Specifications (OIS)',
            path: 'reference/specifications/ois',
          },
          'reference/specifications/airnode-abi-specifications',
          'reference/specifications/reserved-parameters',
        ],
      },
      {
        title: 'Deployment Files',
        collapsable: true,
        children: [
          'reference/deployment-files/',
          {
            title: 'config.json',
            path: 'reference/deployment-files/config-json',
          },
          {
            title: 'secrets.env',
            path: 'reference/deployment-files/secrets-env',
          },
          { title: 'aws.env', path: 'reference/deployment-files/aws-env' },
          {
            title: 'receipt.json',
            path: 'reference/deployment-files/receipt-json',
          },
        ],
      },
      {
        title: 'Examples Files',
        collapsable: true,
        children: [
          'reference/examples/config-json',
          'reference/examples/secrets-env',
          'reference/examples/aws-env',
        ],
      },
      {
        title: 'Templates',
        children: [
          'reference/templates/ois-json',
          'reference/templates/config-json',
          'reference/templates/secrets-env',
          'reference/templates/aws-env',
        ],
      },
      {
        title: 'Packages',
        children: [
          'reference/packages/', // Routes to the README.md in reference/packages/
          'reference/packages/admin-cli-commands',
          'reference/packages/airnode-abi',
        ],
      },
      'reference/airnode-addresses',
    ],
  },
];
