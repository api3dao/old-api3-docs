const sidebars = require('./lib/sidebars.js')

module.exports = {
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
    sidebarDepth: 0,
    displayAllHeaders: false,
    logo: '/img/logo.png',
    nav: [
      {
        text: 'Versions',
        ariaLabel: 'Versions Menu',
        items: [
          { text: 'next', link: '/next/' },
          { text: 'pre-alpha', link: '/pre-alpha/' }
        ]
      },
      { text: 'Website', link: 'https://www.api3.org' },
      { text: 'Discord (Dev)', link: 'https://discord.gg/qnRrcfnm5W' },
      { text: 'Telegram (Chat)', link: 'https://t.me/API3DAO' },
    ],
    repo: 'api3/api3-docs',
    repoLabel: 'GitHub!',
    sidebar: sidebars.list,
    /* 2021-02-17
       smoothScroll=true will cause the TOC to require a dclick for ubuntu firefox.
       Try true again after firefox gets an update.
    */
    smoothScroll: false 
  },
  plugins: [
    //['reco'],
      ['@vuepress/medium-zoom'],
      ['vuepress-plugin-element-tabs'],
      ['@vuepress/last-updated'],
      ['@vuepress/back-to-top', true],
      ['@vuepress/search', {
          searchMaxSuggestions: 15,
          // Only search the latest version, e.g. 4.3, otherwise many duplicates will show up
          // TODO need to change this to the selected version rather than the latest
          //test: `/${versioning.versions.latest.replace('.', '\\.')}/`
          test:``
        }]
  ]
}
