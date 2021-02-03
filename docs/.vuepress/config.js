module.exports = {
  title: 'API3 Document Portal',
  description: 'Just playing around',
  plugins: ['@vuepress/last-updated'],
  plugins: [
    'versioning',
    ['@vuepress/search', {
      searchMaxSuggestions: 10
    }]
  ],
  markdown: {
    lineNumbers: true
  },
  theme: 'titanium',
  themeConfig: {
    logo: '/assets/img/logo2.png',
    nav: [
      { text: 'Requesters', link: '/requesters/' },
      { text: 'Providers', link: '/providers/' },
      { text: 'Hackathon 2022', link: '/hackathon/' },
      /*{
        text: 'Versions',
        ariaLabel: 'Versions Menu',
        items: [
          { text: '1.0.0', link: '/1.0.0/' },
          { text: '1.0.1', link: '/1.0.1/' }
        ]
      },*/
      
      
      { text: 'GitHub', link: 'https://github.com/wkande/compare-vuepress' },
    ],
    sidebar:{
      "/providers/": [
        
        {
          "title": "Providers",
          "collapsable": false,
          "children": [
            [
              "",
              "Introduction"
            ],
            '/providers/api-integrations',
            '/providers/configure-airnode',
            '/providers/deploy-airnode',
            '/providers/set-authorizers'
          ]
        },
        {title:"________________", "collapsable": false,},
        {
          "title": "More Guides",
          "collapsable": false,
          "children": [
            '/requesters/',
            '/hackathon/'
          ]
        },
      ],
      "/requesters/": [
        {
          "title": "Requesters",
          "collapsable": false,
          "children": [
            [
              "",
              "Introduction"
            ],
            "/requesters/create-request",
            "/requesters/develop-client-contract"
          ]
        },
        {title:"________________", "collapsable": false,},
        {
          "title": "More Guides",
          "collapsable": false,
          "children": [
            '/providers/',
            '/hackathon/'
          ]
        },
      ],
      "/hackathon/": [
        {
          "title": "Hackathon 2020",
          "collapsable": false,
          "children": [
            [
              "",
              "Introduction"
            ],
            "/hackathon/location"
          ]
        },
        {title:"________________", "collapsable": false,},
        {
          "title": "More Guides",
          "collapsable": false,
          "children": [
            '/requesters/',
            '/providers/'
          ]
        },
      ],
    }
    /*sidebar: [
      {
        title: 'Requesters',   // required
        path: '',      // optional, link of the title, which should be an absolute path and must exist
        collapsable: true, // optional, defaults to true
        sidebarDepth: 1,    // optional, defaults to 1
        children: [
          '/requesters/create-request',
          '/requesters/develop-client-contract'
        ]
      },
      {
        title: 'Providers',   // required
        path: '/providers/',      // optional, link of the title, which should be an absolute path and must exist
        collapsable: true, // optional, defaults to true
        sidebarDepth: 1,    // optional, defaults to 1
        children: [
          '/providers/api-integrations',
          '/providers/configure-airnode',
          '/providers/deploy-airnode',
          '/providers/set-authorizers'
        ]
      },
      {
        title: 'Hackathon 2022',   // required
        path: '/hackathon/',      // optional, link of the title, which should be an absolute path and must exist
        collapsable: true, // optional, defaults to true
        sidebarDepth: 1,    // optional, defaults to 1
        children: [
          '/hackathon/location'
        ]
      },
    ]*/
    
  }
}
