module.exports = [
  {
    title: 'Introduction', initialOpenGroupIndex: 0, collapsable: true,
    children: [
      '',
      'contributing',
      'blog-posts',
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
      'grp-requesters/become-a-sponsor',
      'grp-requesters/call-an-airnode',
      'grp-requesters/using-templates',
      'grp-requesters/fees',
      /*'grp-requesters/developing-a-client-contract',*/
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
      {
        title: 'Dashboard', collapsable: true,
        children: [
            'grp-members/dashboard/',
            'grp-members/dashboard/staking',
            'grp-members/dashboard/proposals',
            'grp-members/dashboard/voting',
            'grp-members/dashboard/videos'
            
        ]
      },
    ]
  },
  {
    title: 'Reference', initialOpenGroupIndex: -1, collapsable: true,
    children: [
      /*{
        title: 'Dashboard', collapsable: true,
        children: [
            'reference/dashboard/overview',
            'reference/dashboard/pool',
            'reference/dashboard/dao',
            'reference/dashboard/voting'
        ]
      },*/
      {
        title: 'Specification Files', collapsable: true,
        children: [
            {title:'Oracle Integration Specifications (OIS)', path:'reference/specifications/ois'},
            'reference/specifications/airnode-abi-specifications',
            'reference/specifications/reserved-parameters'
        ]
      },
      {
        title: 'Deployment Files', collapsable: true,
        children: [
            {title:'Overview', path:'reference/deployment-files/overview'},
            {title:'config.json', path:'reference/deployment-files/config-json'},
            {title:'secrets.env', path:'reference/deployment-files/secrets-env'},
            {title:'receipt.json', path:'reference/deployment-files/receipt-json'},
        ],
      },
      {
        title: 'Templates',
        children:[
          'reference/templates/ois-json',
          'reference/templates/config-json',
          'reference/templates/secrets-env'
        ]
      },
      {
        title: 'Request-Response Protocol', collapsable: true, initialOpenGroupIndex: -1,
        children:[
          'reference/protocols/request-response/general-structure',
          'reference/protocols/request-response/airnode',
          'reference/protocols/request-response/endpoint',
          'reference/protocols/request-response/authorizer',
          'reference/protocols/request-response/requester',
          'reference/protocols/request-response/client',
          'reference/protocols/request-response/designated-wallet',
          'reference/protocols/request-response/endorsement',
          'reference/protocols/request-response/template',
          'reference/protocols/request-response/request'
        ],
      },
      'reference/cli-commands',
      'reference/dao-contracts'
    ]
  },
  /*{
    title: '(x) Homeless', initialOpenGroupIndex: 0, collapsable: true,
    children:[
      'homeless/hardhat-starter',
      {title:'RRP Flow Chart', path:'reference/rrp-flowdiagram'},
    ]
  },*/
]