const versioning = require('./lib/versioning.js')

module.exports = {
  title: 'API3 Document Portal',
  description: 'Just playing around',
  plugins: ['@vuepress/last-updated'],
  plugins: [
    ['@vuepress/search', {
      searchMaxSuggestions: 10
    }]
  ],
  markdown: {
    lineNumbers: true
  },
  
  themeConfig: {
    displayAllHeaders: false,
    logo: '/assets/img/logo2.png',
    versions: {
        latest: versioning.versions.latest,
        selected: versioning.versions.latest,
        all: versioning.versions.all
    },
    nav: [
      {
        text: 'Versions',
        items: versioning.linksFor('requesters/introduction.md') // TODO create custom component
      },
      { text: 'GitHub', link: 'https://github.com/wkande/vuepress-docs' },
    ],
    sidebar: versioning.sidebars
  }
}
