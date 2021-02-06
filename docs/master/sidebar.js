module.exports = [
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
            'airnode/ethereum-providers'
        ]
      },
      {
        title: 'Specifications',
        children: [
            'specifications/oracle-integration-specifications-ois',
            'specifications/config.json',
            'specifications/security.json',
            'specifications/airnode-abi',
            'specifications/reserved-parameters'
        ]
      },

      /*
      {
        title: 'Request-Response',
        children:[
          'protocols/request-response/general-structure',
          'protocols/request-response/provider',
          'protocols/request-response/endpoint',
          'protocols/request-response/authorizer',
          'protocols/request-response/requester',
          'protocols/request-response/client',
          'protocols/request-response/designated-wallet',
          'protocols/request-response/endorsement',
          'protocols/request-response/template',
          'protocols/request-response/request'
        ]
      },
      {
        title: 'Publish-Subscribe',
        children:['protocols/publish-subscribe/introduction'
        ]
      },
      */


      {title: 'Protocols-Org', children:[
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
          ]
        },
        {
          title: 'Publish-Subscribe',
          children:['protocols/publish-subscribe/roadmap'
          ]}
        ]
      },
      {
        title: 'Protocols',
        children: [
            'protocols/request-response',
            'protocols/publish-subscribe'
        ]
      },
      {
        title: 'Providers',
        children: [
            'providers/introduction.md',
            'providers/api-integrations',
            'providers/configure-airnode',
            'providers/deploy-airnode',
            'providers/set-authorizers',
        ]
      },
      {
        title: 'Requesters',
        children: [
            'requesters/introduction',
            'requesters/create-request',
            'requesters/develop-client-contract'
        ]
      },
      {
        title: 'Tutorials',
        children: [
            'tutorials/airnode-starter'
        ]
      }
    ]