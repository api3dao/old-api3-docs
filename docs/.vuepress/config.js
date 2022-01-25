module.exports = {
  env: process.env.NODE_ENV,
  /// Airnode doc set version pick list.
  versions: [
    { name: 'v0.3', url: '/airnode/v0.3/' },
    { name: 'v0.2', url: '/airnode/v0.2/' },
    { name: 'pre-alpha', url: '/airnode/pre-alpha/' },
  ],
  /// Beacon doc set version pick list.
  versionsBeacon: [{ name: 'v0.1', url: '/beacon/v0.1/' }],
  /// OIS doc set version pick list.
  versionsOis: [{ name: 'v1.0.0', url: '/ois/v1.0.0/' }],
  /// Latest/current Airnode doc set version.
  latestVersion: '/airnode/v0.3/',
  /// Latest/current Beacon doc set version.
  latestBeaconVersion: '/beacon/v0.1/',
  /// Latest/current OIS doc set version.
  latestOisVersion: '/ois/v1.0.0/',
  head: [['link', { rel: 'icon', href: '/img/small-logo.png' }]],
  title: 'Documentation',
  base: '/',
  description: 'Technical Documentation for API3 ',
  markdown: {
    lineNumbers: true,
    extractHeaders: ['h2', 'h3', 'h4', 'h5'],
  },
  themeConfig: {
    startPath: '/airnode/v0.3/',
    sidebarDepth: 0,
    displayAllHeaders: false,
    logo: '/img/logo.png',
    nav: [
      { text: 'Discord', link: 'https://discord.gg/qnRrcfnm5W' },
      { text: 'Forum', link: 'https://forum.api3.org' },
      { text: 'GitHub', link: 'https://github.com/api3dao/api3-docs' },
    ],
    sidebar: {
      '/airnode/v0.5/': require(`../airnode/v0.5/sidebar.js`),
      '/airnode/v0.4/': require(`../airnode/v0.4/sidebar.js`),
      '/airnode/v0.3/': require(`../airnode/v0.3/sidebar.js`),
      '/airnode/v0.2/': require(`../airnode/v0.2/sidebar.js`),
      '/airnode/pre-alpha/': require(`../airnode/pre-alpha/sidebar.js`),
      '/beacon/v0.1/': require(`../beacon/v0.1/sidebar.js`),
      '/ois/v1.0.0/': require(`../ois/v1.0.0/sidebar.js`),
      '/dao-members/': require(`../dao-members/sidebar.js`),
      '/api3/': require(`../api3/sidebar.js`),
      '/dev/': require(`../dev/sidebar.js`),
      '/dev-airnode/': require(`../dev-airnode/sidebar.js`),
    },
    /*
      2021-02-17: wkande:
      smoothScroll=true will cause the TOC to require a double click for Ubuntu Firefox.
      Try true again after Firefox gets an update.
    */
    smoothScroll: false,
  },
  /**
   * Tells vuepress live-reload server which files to process.
   * Ignore folders and files when prefixed with !.
   */
  patterns: ['**/*.md', '**/*.vue'],
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
        name: `[path][name].[ext]`,
      });

    config.module
      .rule('vue')
      .uses.store.get('vue-loader')
      .store.get('options').transformAssetUrls = {
      video: ['src', 'poster'],
      source: 'src',
      img: 'src',
      image: ['xlink:href', 'href'],
      a: 'href',
    };
  },
  plugins: [
    [
      '@vuepress/html-redirect',
      {
        countdown: 0,
      },
    ],
    ['vuepress-plugin-table-of-contents'],
    //['vue-pdf'],
    ['@vuepress/medium-zoom'],
    ['vuepress-plugin-element-tabs'],
    ['@vuepress/last-updated'],
    ['@vuepress/back-to-top', true],
    [
      '@vuepress/search',
      {
        searchMaxSuggestions: 15,
        /*
          2021-03-10: wkande:  Do not use "test:", version filtering has been
          added to .vuepress.components/SearchBox.vue
        */
      },
    ],
  ],
};
