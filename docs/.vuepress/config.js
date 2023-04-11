module.exports = {
  env: process.env.NODE_ENV,

  /// Doc set versioned pick lists.
  versions: [
    { name: 'v0.10', url: '/airnode/v0.10/' },
    { name: 'v0.9', url: '/airnode/v0.9/' },
    { name: 'v0.8', url: '/airnode/v0.8/' },
    { name: 'v0.7', url: '/airnode/v0.7/' },
    { name: 'v0.6', url: '/airnode/v0.6/' },
    { name: 'v0.5', url: '/airnode/v0.5/' },
    { name: 'v0.4', url: '/airnode/v0.4/' },
    { name: 'v0.3', url: '/airnode/v0.3/' },
    { name: 'v0.2', url: '/airnode/v0.2/' },
    { name: 'pre-alpha', url: '/airnode/pre-alpha/' },
  ],
  versionsOis: [
    { name: 'v1.4', url: '/ois/v1.4/' },
    { name: 'v1.2', url: '/ois/v1.2/' },
    { name: 'v1.1', url: '/ois/v1.1/' },
    { name: 'v1.0', url: '/ois/v1.0/' },
  ],

  /// Next version of airnode, used by /next route.
  airnodeVersionNext: [{ name: 'v0.11', url: '/airnode/v0.11/' }],

  /// Latest/current Airnode doc set versioned paths.
  /// Used by api3dao/airnode CI link checking.
  latestVersion: '/airnode/v0.10/',
  latestOisVersion: '/ois/v1.4/',

  /// The title of the versioned doc sets, these are used by the search.
  latestTitle: 'Airnode v0.10',
  latestOisTitle: 'OIS v1.4',

  /// Job page revision, incremented when a new job(s) is added
  jobPageRevision: 4,

  /// basePath for each doc set, used by search
  basePaths: {
    '/': 'All Documentation',
    '/airnode/v0.10': 'Airnode v0.10',
    '/airnode/v0.9': 'Airnode v0.9',
    '/airnode/v0.8': 'Airnode v0.8',
    '/airnode/v0.7': 'Airnode v0.7',
    '/airnode/v0.6': 'Airnode v0.6',
    '/airnode/v0.5': 'Airnode v0.5',
    '/airnode/v0.4': 'Airnode v0.4',
    '/airnode/v0.3': 'Airnode v0.3',
    '/airnode/v0.2': 'Airnode v0.2',
    '/airnode/pre-alpha': 'Airnode pre-alpha',
    '/api3': 'API3',
    '/dapis': 'dAPIs',
    '/dao-members': 'DAO Members',
    //'/ois/v2.0': 'OIS v2.0',
    '/ois/v1.4': 'OIS v1.4',
    '/ois/v1.2': 'OIS v1.2',
    '/ois/v1.1': 'OIS v1.1',
    '/ois/v1.0': 'OIS v1.0',
    '/qrng': 'QRNG',
  },
  head: [
    [
      'meta',
      {
        name: 'viewport',
        content:
          'width=device-width,user-scalable=yes,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0',
      },
    ],
    ['link', { rel: 'icon', href: '/img/small-logo.png' }],
  ],
  title: 'Documentation',
  base: '/',
  description: 'Technical Documentation for API3 ',
  markdown: {
    lineNumbers: true,
    extractHeaders: ['h2', 'h3', 'h4', 'h5'],
  },
  themeConfig: {
    startPath: '/airnode/v0.10/',
    latestVersions: { airnode: '/airnode/v0.10/', ois: '/ois/v1.4' },
    sidebarDepth: 0,
    displayAllHeaders: false,
    logo: '/img/logo.png',
    nav: [
      { text: 'Discord', link: 'https://discord.gg/qnRrcfnm5W' },
      { text: 'Forum', link: 'https://forum.api3.org' },
      { text: 'GitHub', link: 'https://github.com/api3dao/api3-docs' },
    ],
    sidebar: {
      //'/airnode/v0.11/': require(`../airnode/v0.11/sidebar.js`),
      '/airnode/v0.10/': require(`../airnode/v0.10/sidebar.js`),
      '/airnode/v0.9/': require(`../airnode/v0.9/sidebar.js`),
      '/airnode/v0.8/': require(`../airnode/v0.8/sidebar.js`),
      '/airnode/v0.7/': require(`../airnode/v0.7/sidebar.js`),
      '/airnode/v0.6/': require(`../airnode/v0.6/sidebar.js`),
      '/airnode/v0.5/': require(`../airnode/v0.5/sidebar.js`),
      '/airnode/v0.4/': require(`../airnode/v0.4/sidebar.js`),
      '/airnode/v0.3/': require(`../airnode/v0.3/sidebar.js`),
      '/airnode/v0.2/': require(`../airnode/v0.2/sidebar.js`),
      '/airnode/pre-alpha/': require(`../airnode/pre-alpha/sidebar.js`),
      '/dapis/': require(`../dapis/sidebar.js`),
      //'/ois/v2.0/': require(`../ois/v2.0/sidebar.js`),
      '/ois/v1.4/': require(`../ois/v1.4/sidebar.js`),
      '/ois/v1.3/': require(`../ois/v1.3/sidebar.js`),
      '/ois/v1.2/': require(`../ois/v1.2/sidebar.js`),
      '/ois/v1.1/': require(`../ois/v1.1/sidebar.js`),
      '/ois/v1.0/': require(`../ois/v1.0/sidebar.js`),
      '/qrng/': require(`../qrng/sidebar.js`),
      '/dao-members/': require(`../dao-members/sidebar.js`),
      '/api3/': require(`../api3/sidebar.js`),
      '/dev/': require(`../dev/sidebar.js`),
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
    ['vuepress-plugin-table-of-contents'],
    //['vue-pdf'],
    ['vuepress-plugin-element-tabs'],
    ['@vuepress/last-updated'],
    ['@vuepress/back-to-top', true],
    [
      '@vuepress/search',
      {
        searchMaxSuggestions: 250,
        /*
          2021-03-10: wkande:  Do not use "test:", version filtering has been
          added to .vuepress.components/SearchBox.vue
        */
      },
    ],
    [
      // https://github.com/vuejs/vuepress/issues/160#issuecomment-479847087
      'vuepress-plugin-dehydrate',
      {
        noSSR: '404.html',
        noScript: [],
      },
    ],
  ],
};
