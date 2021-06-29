module.exports = [
  {
    title: 'Introduction', collapsable: false, 
    children: [
        {title:'What is API3?', path:'/pre-alpha/'},
        'introduction/contributing',
    ]
  },
  {
    title: 'Fundamentals', collapsable: false, 
    children: [
        {title: 'API', path: 'fundamentals/apis'},
        'fundamentals/first-party-oracles',
        'fundamentals/decentrally-governed-oracle-networks',
        {title: 'dAPI', path: 'fundamentals/dapis'},
    ]
  },
  
  {
    /** 
     * When adding a new doc or group before the "Dashboard" group
     * you must change the value of initialOpenGroupIndex to match the doc to
     * display first when the folder opens, -1 will display the README.md.
     */
    title: 'API3 Members', collapsable: false,
    children: [
      {title:'Overview', path:'members/overview'},
      {
        title:'Contract Architecture',
        children: [
          'members/contract-architecture/overview',
          'members/contract-architecture/pool',
          'members/contract-architecture/dao',
          'members/contract-architecture/voting'
        ]
      },
      {
        title:'Staking',
        children: [
          'members/staking/voting-power',
          'members/staking/rewards',
          'members/staking/pool-claims'
        ]
      },
      {
        title:'Governance',
        children: [
          'members/governance/proposals',
          'members/governance/voting'
        ]
      }
    ]
  },


  {
    title: 'Airnode', collapsable: false,
    children: [
        {title:'Design Philosophy', path:'airnode/design-philosophy'},
        {title:'Implementation', path:'airnode/implementation'},
        {title:'Ethereum Providers', path:'airnode/ethereum-providers'},
        {
          title: 'Specifications',
          children: [
              {title:'Oracle Integration Specifications (OIS)', path:'airnode/specifications/ois'},
              'airnode/specifications/airnode-abi-specifications',
              'airnode/specifications/config-json',
              'airnode/specifications/security-json',
              'airnode/specifications/reserved-parameters'
          ]
        },
    ],
  },
  {title: 'Request-Response Protocol',
    children:['protocols/request-response/general-structure',
    'protocols/request-response/provider',
    'protocols/request-response/endpoint',
    'protocols/request-response/authorizer',
    'protocols/request-response/requester',
    'protocols/request-response/client',
    'protocols/request-response/designated-wallet',
    'protocols/request-response/endorsement',
    'protocols/request-response/template',
    'protocols/request-response/request'
    ],
  },
  {title: 'Guides', initialOpenGroupIndex: -1, collapsable: false, children:[
      {title: 'Provider',
        children:['guides/provider/api-integration',
                  'guides/provider/configuring-airnode',
                  'guides/provider/deploying-airnode',
                  'guides/provider/setting-authorizers'
        ]
      },
      {title: 'Requester',
        children:['guides/requester/creating-a-requester',
                  'guides/requester/developing-a-client-contract'
        ]
      },
      {title: 'Smart Contracts Platform',
        children:['guides/smart-contracts/is-my-platform-compatible',
                  'guides/smart-contracts/self-serve-integration',
        ]
      },
      {title: 'Docker',
        children:['guides/docker/client-image',
        'guides/docker/deployer-image'
        ]
      },
      {title: 'Templates',
        children:['guides/templates/ois-json',
                  'guides/templates/config-json',
                  'guides/templates/security-json'
        ]
      },
    ]
  },
  {
    title: 'Tutorials', collapsable: false,
    children: [
        'tutorials/airnode-starter',
        {title: 'Config Examples',
          children:['tutorials/config-examples/authorizers-json',
                    'tutorials/config-examples/config-example-json',
                    'tutorials/config-examples/example-env',
                    'tutorials/config-examples/security-json',
          ]
        },
    ]
  }
]