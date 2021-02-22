module.exports = [
      {
        title: 'Introduction', collapsable: false, 
        children: [
            '/next/',
            'fundamentals/first-party-oracles',
            'fundamentals/decentrally-governed-oracle-networks',
            
            'fundamentals/apis',
            'fundamentals/dapp',
            'fundamentals/dapis',
            /*{title: 'Fundamentals',  
            children: [
                'fundamentals/apis',
                'fundamentals/dapis',
                'fundamentals/first-party-oracles',
                'fundamentals/decentrally-governed-oracle-networks',
              ]
            },*/
            'introduction/contributing'
        ]
      },
      /*{
        title: 'Fundamentals', collapsable: false,
        children: [
            'fundamentals/apis',
            'fundamentals/first-party-oracles',
            'fundamentals/decentrally-governed-oracle-networks',
            'fundamentals/dapis'
        ]
      },*/
      {
        title: 'Airnode', collapsable: false,
        children: [
            'airnode/overview',
            'airnode/ethereum-providers',
            'airnode/design-philosophy',
            'airnode/implementation',
            
            //'airnode/ois',
            //'airnode/config-json',
            {
              title: 'Specifications',
              children: [
                  //'specifications/oracle-integration-specifications-ois',
                  'airnode/ois',
                  'specifications/airnode-abi',
                  'airnode/config-json',
                  'specifications/security-json',
                  'specifications/reserved-parameters'
              ]
            },
        ],
      },
      /*{
        title: 'Specifications', collapsable: false,
        children: [
            'specifications/oracle-integration-specifications-ois',
            'specifications/config-json',
            'specifications/security-json',
            'specifications/airnode-abi',
            'specifications/reserved-parameters'
        ]
      },*/
      {title: 'Protocols', initialOpenGroupIndex: -1, collapsable: false, children:[
        {title: 'Request-Response',
          children:['protocols/request-response/general-structure',
          {path:'protocols/request-response/provider', title:'Provider'},
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
        {
          title: 'Publish-Subscribe',
          children:['protocols/publish-subscribe/roadmap'
          ]}
        ]
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
            children:['guides/requester/creating-requester',
                      'guides/requester/developing-client-contract'
            ]
          },
          {title: 'Smart Contracts',
            children:['guides/smart-contracts/self-serve-integration',
                      'guides/smart-contracts/platform-compatible'
            ]
          },
          {title: 'Templates',
            children:['templates/ois.md',
                      'templates/config.md',
                      'templates/security.md'
            ]
          },
        ]
      },
      /*{
        title: 'Providers Guide (alt)',
        children: [
            'providers-guide/introduction.md',
            'providers-guide/api-integrations',
            'providers-guide/configure-airnode',
            'providers-guide/deploy-airnode',
            'providers-guide/set-authorizers',
      ]},
      {
        title: 'Requesters Guide (alt)',
        children: [
            'requesters-guide/introduction',
            'requesters-guide/create-request',
            'requesters-guide/develop-client-contract'
        ]
      },*/
      {
        title: 'Tutorials', collapsable: false,
        children: [
            'tutorials/airnode-starter',
            'tutorials/aws-credentials',
            'tutorials/client-examples'
        ]
      },
      {
        title: 'VuePress Migration', collapsable: false,
        children: [
            'migration-plan'
        ]
      }
    ]