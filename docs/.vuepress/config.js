module.exports = {
  env: process.env.NODE_ENV,
  /**
   * List all base routes that are to become versions here.
   */
  versions:[
    {name:'pre-alpha', url:'/pre-alpha/'},
  ],
  head: [
    ['link', { rel: 'icon', href: '/img/small-logo.png' }]
  ],
  title: 'Documentation',
  base: '/',
  description: 'Technical Documentation for API3 ',
  markdown: {
    lineNumbers: true,
    extractHeaders: ['h2', 'h3', 'h4', 'h5']
  },
  themeConfig: {
    startPath:'/pre-alpha/',
    sidebarDepth: 0,
    displayAllHeaders: false,
    logo: '/img/logo.png',
    nav: [
      { text: 'Discord', link: 'https://discord.gg/qnRrcfnm5W' },
      { text: 'Forum', link: 'https://forum.api3.org/' },
      { text: 'GitHub', link: 'https://github.com/api3dao/api3-docs' },
    ],
    sidebar: {'/next/':require(`../next/sidebar.js`),
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
  /**
   * Loading for PDF, not a great solution.
   * https://github.com/vuejs/vuepress/issues/700
   */
  chainWebpack: (config, isServer) => {
    config.module
      .rule('pdfs')
      .test(/\.pdf$/)
      .use('file-loader')
        .loader('file-loader')
      .options({
        name: `[path][name].[ext]`
      });
    
    config.module.rule('vue')
      .uses.store
      .get('vue-loader').store
      .get('options').transformAssetUrls = {
        video: ['src', 'poster'],
        source: 'src',
        img: 'src',
        image: ['xlink:href', 'href'],
        a: 'href'
      };
  },
  plugins: 
  [   
    ['@vuepress/html-redirect', {
      countdown: 0,
    }],
    ['vuepress-plugin-table-of-contents'],
    ['vue-pdf'],
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
    ],
  ],
}
