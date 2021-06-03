module.exports = [
  {
    title: 'Introduction', initialOpenGroupIndex: 0, collapsable: true,
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
          //'grp-providers/guides/provider/api-integration-orig',
          'grp-providers/guides/provider/configuring-airnode',
          //'grp-providers/guides/provider/configuring-airnode-orig',
          'grp-providers/guides/provider/deploying-airnode',
          //'grp-providers/guides/provider/deploying-airnode-orig',
          'grp-providers/guides/provider/setting-authorizers',
          //'grp-providers/guides/provider/setting-authorizers-orig',
          
        ]
      },
      {
        title: 'Docker',
        children:[
          'grp-providers/guides/docker/client-image',
          'grp-providers/guides/docker/deployer-image'
        ]
      },
      {
        title: 'Tutorial', collapsable: true,
        children: [
          'grp-providers/tutorial/airnode-starter',
          'grp-providers/tutorial/config-json',
          'grp-providers/tutorial/secrets-env',
          'grp-providers/tutorial/authorizers-json',
          'grp-providers/tutorial/receipt-json'
         /* {title: 'Config Examples',
            children:[
              'grp-providers/tutorials/config-examples/authorizers-json',
              'grp-providers/tutorials/config-examples/config-example-json',
              'grp-providers/tutorials/config-examples/example-env',
              'grp-providers/tutorials/config-examples/security-json',
            ]
          },*/
        ]
      }
    ]
  },
  {
    title: 'Requesters', initialOpenGroupIndex: 0, collapsable: true,
    children:[
      'grp-requesters/become-a-requester',
      'grp-requesters/call-an-airnode',
      'grp-requesters/fees',
      'grp-requesters/developing-a-client-contract',
      'grp-requesters/self-serve-platforms',
      /*{
        
        title: '(x) Requester', collapsable: false,
        children:[
          'grp-requesters/guides/requester/creating-a-requester',
          'grp-requesters/guides/requester/developing-a-client-contract',
        ]
      },
      {
        title: '(x) Smart Contracts Platform', collapsable: false,
        children:[
          ['grp-requesters/guides/smart-contracts-platform/is-my-platform-compatible','Is my platform compatible?'],
          ['grp-requesters/guides/smart-contracts-platform/self-serve-integration', 'Self-serve integration ']
        ]
      },*/
    ]
  },
  {
    /** 
     * When adding a new doc or group before the"Dashboard" group
     * you must change the value of initialOpenGroupIndex.
     */
    title: 'API3 Members', initialOpenGroupIndex: 2, collapsable: true,
    children: [
      {title:'API3 DAO', path:'grp-members/'},
      {title:'The DAO Pool', path:'grp-members/dao-pool'},
      'grp-members/faqs',
      /*{title: 'Dashboard', collapsable: true,
      children: [
        {title:'Monitor the DAO Pool', path:'grp-members/dashboard/pool'},
        {title:'Stake your Tokens', path:'grp-members/dashboard/staking-tokens'},
        {title:'Vote', path:'grp-members/dashboard/vote'},
        {title:'Submit Proposals', path:'grp-members/dashboard/submit-proposals'},
      ]}*/
    ]
  },
  {
    title: 'Technology', initialOpenGroupIndex: -1, collapsable: true,
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
        title: 'Templates',
        children:[
          'technology/templates/ois-json',
          'technology/templates/config-json',
          'technology/templates/secrets-env'
        ]
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
      'technology/cli-commands',
    ]
  },
  {
    title: '(x) Homeless', initialOpenGroupIndex: 0, collapsable: true,
    children:[
      'homeless/hardhat-starter',
      {title:'RRP Flow Chart', path:'technology/rrp-flowdiagram'},
    ]
  },
]