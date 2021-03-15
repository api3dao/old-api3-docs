module.exports = [
  {title: 'Introduction', collapsable: false, 
    children: [
      '/next/grp-providers/',
    ]
  },
  {title: 'Request-Response Protocol', collapsable: false,
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
    ],
  },
  {title: 'Guides', initialOpenGroupIndex: -1, collapsable: false, 
    children:[
      {title: 'Provider',
        children:[
          'guides/provider/api-integration',
          'guides/provider/configuring-airnode',
          'guides/provider/deploying-airnode',
          'guides/provider/setting-authorizers'
        ]
      },
      {title: 'Docker',
        children:[
          'guides/docker/docker',
          'guides/docker/docker-client'
        ]
      },
      {title: 'Templates',
        children:[
          'guides/templates/ois-json',
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
        children:[
          'tutorials/config-examples/authorizers-json',
          'tutorials/config-examples/config-example-json',
          'tutorials/config-examples/example-env',
          'tutorials/config-examples/security-json',
        ]
      },
    ]
  }
]