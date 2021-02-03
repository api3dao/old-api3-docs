module.exports = {
  title: 'Document Portal',
  description: 'Just playing around',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    logo: '/assets/img/logo2.png',
    nav: [
      { text: 'Requesters', link: '/requesters/' },
      { text: 'Providers', link: '/providers/' },
      {
        text: 'Versions',
        ariaLabel: 'Versions Menu',
        items: [
          { text: '1.0.0', link: '/1.0.0/' },
          { text: '1.0.1', link: '/1.0.1/' }
        ]
      },
      
      
      { text: 'GitHub', link: 'https://github.com/wkande/compare-vuepress' },
    ],
    sidebar: {
      '/requesters/': [
        '',     
        'create-request',  /* /foo/one.html */
        'develop-client-contract'
      ],

      '/providers/': [
        '',      /* /bar/ */
      ],

      '/baz/': 'auto', /* automatically generate single-page sidebars */

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