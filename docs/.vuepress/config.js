const versioning = require('./lib/versioning.js')

module.exports = {
  head: [
    ['link', { rel: 'icon', href: '/img/small-logo.png' }]
  ],
  title: 'Documentation',
  base: '/vuepress-docs/',
  description: 'Technical documentation for API3 ',
  markdown: {
    lineNumbers: true,
    toc: { includeLevel: [1, 2, 3] },
  },

  themeConfig: {
    noFoundPageByTencent: false, /* vuepress-theme-reco */
    subSidebar: 'auto', /* vuepress-theme-reco */
    displayAllHeaders: false,
    logo: '/img/api3-cropped.png',
    /*versions: {
        latest: versioning.versions.latest,
        selected: versioning.versions.latest,
        all: versioning.versions.all
    },*/
    nav: [
      /*{
        text: 'Versions',
        items: versioning.linksFor('requesters/introduction.md') // TODO create custom component
      },*/
      { text: 'Website', link: 'https://www.api3.org' },
      { text: 'Discord (Dev)', link: 'https://discord.gg/qnRrcfnm5W' },
      { text: 'Telegram (Chat)', link: 'https://t.me/API3DAO' },
    ],
    repo: 'wkande/vuepress-docs',
    repoLabel: 'GitHub!',
    sidebar: versioning.sidebars,
    smoothScroll: true
  },
  plugins: [
      ['@vuepress/medium-zoom'],
      ['vuepress-plugin-element-tabs'],
      ['@vuepress/last-updated'],
      /* reco is setting a back-top-top */
      ['@vuepress/back-to-top', true],
      ['@vuepress/search', {
          searchMaxSuggestions: 15,
          // Only search the latest version, e.g. 4.3, otherwise many duplicates will show up
          // TODO need to change this to the selected version rather than the latest
          test: `/${versioning.versions.latest.replace('.', '\\.')}/`
      }]
  ]
}
