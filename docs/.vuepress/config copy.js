module.exports = {
  title: 'Document Portal',
  description: 'Just playing around',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    logo: '/assets/img/logo2.png',
    nav: [
      {
        text: 'Versions',
        ariaLabel: 'Versions Menu',
        items: [
          { text: '1.0.0', link: '/1.0.0/' },
          { text: '1.0.1', link: '/1.0.1/' }
        ]
      },
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'GitHub', link: 'https://github.com/wkande/compare-vuepress' },
    ],
    sidebar: {
      
      '/requesters/': [
          '',
          'create-request',  /* /foo/one.html */
          {title: '__________________', path: '', collapsable: false},
          {
            title: 'Other Books',   // required
            path: '',      // optional, link of the title, which should be an absolute path and must exist
            collapsable: false, // optional, defaults to true
            sidebarDepth: 1,    // optional, defaults to 1
            children: [
              '/providers/'
            ]
          }
        ]
      ,
      '/providers/': [
          '', 
          {
            title: 'Other Books',   // required
            path: '',      // optional, link of the title, which should be an absolute path and must exist
            collapsable: false, // optional, defaults to true
            sidebarDepth: 1,    // optional, defaults to 1
            children: [
              '/requesters/'
            ]
          }
        ]
      ,
        
      '/baz/': 'auto', /* automatically generate single-page sidebars */
      '/': [
        '',
        'create-request',  /* /foo/one.html */
        ]
      ,

      // fallback
      '/': [
        '',        /* / */
        'contact', /* /contact.html */
        'about'    /* /about.html */
      ]


    }
  }
}


      /*{
        title: 'Books',   // required
         // optional, link of the title, which should be an absolute path and must exist
        collapsable: true, // optional, defaults to true
        sidebarDepth: 1,    // optional, defaults to 1
        initialOpenGroupIndex: -1,
        children: [
          ['/requesters/', 'Requesters'],
          ['/providers/', 'Providers']
        ]
      },*/


/*['/', '→'],
      ['/requesters/', 'Requesters'],
      ['/requesters/create-request', 'Create a Request'],
      
      
      
      
      
      
*/