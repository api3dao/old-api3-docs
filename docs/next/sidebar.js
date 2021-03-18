module.exports = [
  {
    title: 'Introduction', 
    children: [
      '',
      'contributing',
      'fundamentals/apis',
      'fundamentals/first-party-oracles',
      'fundamentals/decentrally-governed-oracle-networks',
      'fundamentals/dapis'
    ]
  },
  {
    title: 'Providers', 
    children: [
      {
        title: 'Airnode', initialOpenGroupIndex: -1, collapsable: true,
        children: [
            {title:'Design Philosophy', path:'grp-providers/airnode/design-philosophy'},
            {title:'Implementation', path:'grp-providers/airnode/implementation'},
            {title:'Ethereum Providers', path:'grp-providers/airnode/ethereum-providers'},
            {
              title: 'Specifications',
              children: [
                  {title:'Oracle Integration Specifications (OIS)', path:'grp-providers/airnode/specifications/ois'},
                  'grp-providers/airnode/specifications/airnode-abi-specifications',
                  'grp-providers/airnode/specifications/config-json',
                  'grp-providers/airnode/specifications/security-json',
                  'grp-providers/airnode/specifications/reserved-parameters'
              ]
            },
        ],
      },
      {title: 'Request-Response Protocol', collapsable: true,
        children:[
          'grp-providers/protocols/request-response/general-structure',
          'grp-providers/protocols/request-response/provider',
          'grp-providers/protocols/request-response/endpoint',
          'grp-providers/protocols/request-response/authorizer',
          'grp-providers/protocols/request-response/requester',
          'grp-providers/protocols/request-response/client',
          'grp-providers/protocols/request-response/designated-wallet',
          'grp-providers/protocols/request-response/endorsement',
          'grp-providers/protocols/request-response/template',
          'grp-providers/protocols/request-response/request'
        ],
      },
      {title: 'Guides', collapsable: true, 
        children:[
              'grp-providers/guides/provider/api-integration',
              'grp-providers/guides/provider/configuring-airnode',
              'grp-providers/guides/provider/deploying-airnode',
              'grp-providers/guides/provider/setting-authorizers',
          {title: 'Docker',
            children:[
              'grp-providers/guides/docker/client-image',
              'grp-providers/guides/docker/deployer-image'
            ]
          },
          {title: 'Templates',
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
    title: 'Requesters', 
    children:[
      {title: 'Requester', collapsable: false,
        children:[
          'grp-requesters/guides/requester/creating-a-requester',
          'grp-requesters/guides/requester/developing-a-client-contract',
        ]
      },
      {title: 'Smart Contracts Platform', collapsable: false,
        children:[
          'grp-requesters/guides/smart-contracts-platform/is-my-platform-compatible',
          'grp-requesters/guides/smart-contracts-platform/self-serve-integration'
        ]
      },
      {title: 'Request-Response Protocol', collapsable: true,
        children:[

        ],
      },
    ]
  },
  {
    title: 'Members', 
    children: [
      'grp-members/'
    ]
  },
]