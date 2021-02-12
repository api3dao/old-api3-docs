module.exports = [
      {
        title: 'Getting Started',
        children: [
            'getting-started/what-is-api3',
            'getting-started/contributing'
        ]
      },
      {
        title: 'Fundamentals',
        children: [
            'fundamentals/about-apis',
            'fundamentals/first-party-oracles',
            'fundamentals/decentrally-governed-oracle-networks',
            'fundamentals/dapi'
        ]
      },
      {
        title: 'Airnode',
        children: [
            'airnode/design-philosophy',
            'airnode/implementation',
            'airnode/ethereum-providers',
            'airnode/ois',
            'airnode/config-json'
        ]
      },
      {
        title: 'Specifications',
        children: [
            'specifications/oracle-integration-specifications-ois',
            'specifications/config-json',
            'specifications/security-json',
            'specifications/airnode-abi',
            'specifications/reserved-parameters'
        ]
      },
      {title: 'Protocols', initialOpenGroupIndex: -1, children:[
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
      {title: 'Guides', initialOpenGroupIndex: -1, children:[
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
          {title: 'Templates',
            children:['templates/ois.md',
                      'templates/config.md',
                      'templates/security.md'
            ]
          }
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
        title: 'Tutorials',
        children: [
            'tutorials/airnode-starter',
            'tutorials/aws-credentials'
        ]
      }
    ]