export default ({ Vue, router, options }) => {

  router.addRoutes([

    // So the DAO dashboard can find its way to the current release for the role API3 members
    { path: '/latest/members/', redirect: '/pre-alpha/members' },
    { path: '/latest/members', redirect: '/pre-alpha/members' },
    
    // Takes the user to the current release
    { path: '/latest/', redirect: '/pre-alpha' },
    { path: '/latest', redirect: '/pre-alpha' },
    
    // "/technology" has been changed to "/reference"
    { path: '/next/technology/*', redirect: '/next' }
  ])

  //console.log('enhanceApp.js > router:',router.getRoutes())
}
