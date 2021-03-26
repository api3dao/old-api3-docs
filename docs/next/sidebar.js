module.exports = [
  {
    title: 'General/Introduction', initialOpenGroupIndex: 0, collapsable: true,
    children: [
      '',
      'contributing',
      'medium-posts',
      'fundamentals/apis',
      'fundamentals/first-party-oracles',
      'fundamentals/decentrally-governed-oracle-networks',
      'fundamentals/dapis'
    ]
  },
  {
    title: 'API Providers', initialOpenGroupIndex: 0, collapsable: true, 
    children: [
      {
        title: 'Airnode', initialOpenGroupIndex: -1, collapsable: true,
        children: [
            {title:'Design Philosophy', path:'grp-providers/airnode/design-philosophy'},
            {title:'Implementation', path:'grp-providers/airnode/implementation'},
            {title:'Ethereum Providers', path:'grp-providers/airnode/ethereum-providers'},
        ],
      },
      {
        title: 'Guides', collapsable: true, 
        children:[
              'grp-providers/guides/provider/api-integration',
              'grp-providers/guides/provider/configuring-airnode',
              'grp-providers/guides/provider/deploying-airnode',
              'grp-providers/guides/provider/setting-authorizers',
          {
            title: 'Docker',
            children:[
              'grp-providers/guides/docker/client-image',
              'grp-providers/guides/docker/deployer-image'
            ]
          },
          {
            title: '(?) Templates',
            children:[
              'grp-providers/guides/templates/ois-json',
              'grp-providers/guides/templates/config-json',
              'grp-providers/guides/templates/security-json'
            ]
          },
        ]
      },
      {
        title: 'Tutorials', collapsable: true,
        children: [
          'grp-providers/tutorials/airnode-starter',
          {title: 'Config Examples',
            children:[
              'grp-providers/tutorials/config-examples/authorizers-json',
              'grp-providers/tutorials/config-examples/config-example-json',
              'grp-providers/tutorials/config-examples/example-env',
              'grp-providers/tutorials/config-examples/security-json',
            ]
          },
        ]
      }
    ]
  },
  {
    title: 'Requesters', initialOpenGroupIndex: 0, collapsable: true,
    children:[
      {
        title: 'Requester', collapsable: false,
        children:[
          'grp-requesters/guides/requester/creating-a-requester',
          'grp-requesters/guides/requester/developing-a-client-contract',
        ]
      },
      {
        title: 'Smart Contracts Platform', collapsable: false,
        children:[
          'grp-requesters/guides/smart-contracts-platform/is-my-platform-compatible',
          'grp-requesters/guides/smart-contracts-platform/self-serve-integration'
        ]
      },
    ]
  },
  {
    title: 'API3 Members', initialOpenGroupIndex: 0, collapsable: true,
    children: [
      'grp-members/'
    ]
  },
  {
    title: 'Technology', initialOpenGroupIndex: 2, collapsable: true,
    children: [
      {
        title: 'Specification Files', collapsable: true,
        children: [
            {title:'Oracle Integration Specifications (OIS)', path:'technology/specifications/ois'},
            'technology/specifications/airnode-abi-specifications',
            'technology/specifications/reserved-parameters'
        ]
      },
      {
        title: 'Deployment Files', collapsable: true,
        children: [
            {title:'Overview', path:'technology/deployment-files/overview'},
            {title:'config.json', path:'technology/deployment-files/config-json'},
            {title:'secrets.env', path:'technology/deployment-files/secrets-env'},
            {title:'receipt.json', path:'technology/deployment-files/receipt-json'},
        ],
      },
      {
        title: 'Request-Response Protocol', collapsable: true, initialOpenGroupIndex: -1,
        children:[
          'technology/protocols/request-response/general-structure',
          'technology/protocols/request-response/airnode',
          'technology/protocols/request-response/endpoint',
          'technology/protocols/request-response/authorizer',
          'technology/protocols/request-response/requester',
          'technology/protocols/request-response/client',
          'technology/protocols/request-response/designated-wallet',
          'technology/protocols/request-response/endorsement',
          'technology/protocols/request-response/template',
          'technology/protocols/request-response/request'
        ],
      },
    ]
  },
]