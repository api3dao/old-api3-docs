module.exports = [
  {
    title: 'Introduction', collapsable: false, 
    children: [
        '/next/grp-requesters/',
    ]
  },
  {title: 'Guides', initialOpenGroupIndex: -1,
    children:[
      {title: 'Requester', collapsable: false,
        children:[
          'guides/requester/creating-a-requester',
          'guides/requester/developing-a-client-contract',
        ]
      },
      {title: 'Smart Contracts Platform',
        children:[
          'guides/smart-contracts-platform/is-my-platform-compatible',
          'guides/smart-contracts-platform/self-serve-integration'
        ]
      },
    ]
  },
]