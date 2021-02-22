module.exports = [
  {
    title: 'Introduction', collapsable: false, 
    children: [
        {title:'What is API3?', path:'/pre-alpha/'},
        'introduction/first-party-oracles',
        'introduction/decentrally-governed-oracle-networks',
        'introduction/apis',
        'introduction/dapis',
        'introduction/contributing',
    ]
  },
  {
    title: 'Airnode', collapsable: false,
    children: [
        'airnode/ethereum-providers',
        'airnode/design-philosophy',
        'airnode/implementation',
        {
          title: 'Specifications',
          children: [
              'airnode/specifications/ois',
              'airnode/specifications/airnode-abi-specifications',
              'airnode/specifications/config-json',
              'airnode/specifications/security-json',
              'airnode/specifications/reserved-parameters'
          ]
        },
    ],
  },
  //{title: 'Protocols', initialOpenGroupIndex: -1, collapsable: false, children:[
      {title: 'Request-Response',
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
      /*{
        title: 'Publish-Subscribe',
        children:['protocols/publish-subscribe/roadmap']
      }*/
    //]
  //},

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
      {title: 'Smart Contracts',
        children:['guides/smart-contracts/self-serve-integration',
                  'guides/smart-contracts/is-my-platform-compatible'
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
  /*{
    title: 'Tutorials', collapsable: false,
    children: [
        //'tutorials/airnode-starter',
        //'tutorials/aws-credentials',
        //'tutorials/client-examples'
    ]
  },*/
]