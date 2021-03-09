//const sidebars = require('./lib/sidebars.js')

const search = require('./lib/search.js')

module.exports = {
  env: process.env.NODE_ENV,
  versions:[
    {name:'next', url:'/next/grp-providers/'},
    {name:'0.1.0', url:'/0.1.0/grp-providers/'},
    {name:'pre-alpha', url:'/pre-alpha/'},
  ],
  //versionDefault: 'pre-alpha',
  sidebarHeaders:[
    {vrs:'pre-alpha', current:true, buttons:[]},
    {vrs:'0.1.0', buttons:[
      {isActive: false, label:'Members', url:'/0.1.0/grp-members/', img:'users'},
      {isActive: false, label:'Requesters', url:'/0.1.0/grp-requesters/', img:'eye'},
      {isActive: true, label:'Providers', url:'/0.1.0/grp-providers/', img:'sitemap'}
    ]},
    {vrs:'next', buttons:[
      {isActive: false, label:'Members', url:'/next/grp-members/', img:'users'},
      {isActive: false, label:'Requesters', url:'/next/grp-requesters/', img:'eye'},
      {isActive: true, label:'Providers', url:'/next/grp-providers/', img:'sitemap'}
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
      //{ text: 'Website', link: 'https://www.api3.org' },
      { text: 'Discord (Dev)', link: 'https://discord.gg/qnRrcfnm5W' },
      { text: 'Telegram (Chat)', link: 'https://t.me/API3DAO' },
      { text: 'GitHub', link: 'https://github.com/api3dao/api3-docs' },
    ],
    //repo: 'api3/api3-docs',
    //repoLabel: 'GitHub!',
    //sidebar: sidebars.list,
    sidebar: {'/next/grp-providers/':require(`../next/grp-providers/sidebar.js`),
              '/next/grp-requesters/':require(`../next/grp-requesters/sidebar.js`),
              '/next/grp-members/':require(`../next/grp-members/sidebar.js`),
              '/0.1.0/grp-providers/':require(`../0.1.0/grp-providers/sidebar.js`),
              '/0.1.0/grp-requesters/':require(`../0.1.0/grp-requesters/sidebar.js`),
              '/0.1.0/grp-members/':require(`../0.1.0/grp-members/sidebar.js`),
              '/pre-alpha/':require(`../pre-alpha/sidebar.js`),
              '/dev/':require(`../dev/sidebar.js`),
             },
    /* 2021-02-17
       smoothScroll=true will cause the TOC to require a dclick for Ubuntu Firefox.
       Try true again after Firefox gets an update.
    */
    smoothScroll: false 
  },
  plugins: [
      ['@vuepress/medium-zoom'],
      ['vuepress-plugin-element-tabs'],
      ['@vuepress/last-updated'],
      ['@vuepress/back-to-top', true],
      //['fulltext-search'], https://z3by.github.io/vuepress-tools/plugins/vuepress-plugin-fulltext-search.html
      ['@vuepress/search', {
          searchMaxSuggestions: 15,
          // Only search the latest version, e.g. 4.3, otherwise many duplicates will show up
          // TODO need to change this to the selected version rather than the latest
          //test: `/${versioning.versions.latest.replace('.', '\\.')}/`
          test: '/pre-alpha/'
        }
      ]
  ]
}
