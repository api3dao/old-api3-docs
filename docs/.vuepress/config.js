module.exports = {
  env: process.env.NODE_ENV,
  versions:[
    {name:'next', url:'/next/grp-providers/'},
    {name:'pre-alpha', url:'/pre-alpha/'},
  ],
  sidebarHeaders:[
    {vrs:'pre-alpha', current:true, buttons:[]},
    {vrs:'next', buttons:[
      {isActive: false, info:true,          baseUrl:'/next/', img:'info-circle'},
      {isActive: false, label:'Members',    baseUrl:'/next/grp-members/', img:'users'},
      {isActive: false, label:'Requesters', baseUrl:'/next/grp-requesters/', img:'eye'},
      {isActive: true,  label:'Providers',  baseUrl:'/next/grp-providers/', img:'sitemap'}
    ]}
  ],
  head: [
    ['link', { rel: 'icon', href: '/img/small-logo.png' }]
  ],
  title: 'Documentation',
  base: '/api3-docs/',
  description: 'Technical Documentation for API3 ',
  markdown: {
    lineNumbers: true,
    toc: { includeLevel: [2, 3] },
  },
  themeConfig: {
    startPath:'/pre-alpha/',
    sidebarDepth: 0,
    displayAllHeaders: false,
    logo: '/img/logo.png',
    nav: [
      { text: 'Discord (Dev)', link: 'https://discord.gg/qnRrcfnm5W' },
      { text: 'Telegram (Chat)', link: 'https://t.me/API3DAO' },
      { text: 'GitHub', link: 'https://github.com/api3dao/api3-docs' },
    ],
    sidebar: {'/next/grp-providers/':require(`../next/grp-providers/sidebar.js`),
              '/next/grp-requesters/':require(`../next/grp-requesters/sidebar.js`),
              '/next/grp-members/':require(`../next/grp-members/sidebar.js`),
              '/next/':require(`../next/sidebar.js`), // Default the /next route to /next-grp-provider
              '/pre-alpha/':require(`../pre-alpha/sidebar.js`),
              '/dev/':require(`../dev/sidebar.js`),
             },
    /* 
      2021-02-17: wkande: 
      smoothScroll=true will cause the TOC to require a double click for Ubuntu Firefox.
      Try true again after Firefox gets an update.
    */
    smoothScroll: false 
  },
  plugins: [
      ['@vuepress/medium-zoom'],
      ['vuepress-plugin-element-tabs'],
      ['@vuepress/last-updated'],
      ['@vuepress/back-to-top', true],
      ['@vuepress/search', {
          searchMaxSuggestions: 15,
          /*
            2021-03-10: wkande:  Do not use "test:", version filtering has been 
            added to .vuepress.components/SearchBox.vue
          */
        }
      ]
  ]
}
