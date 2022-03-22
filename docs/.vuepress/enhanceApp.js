const { redirects } = require('./redirects.js');

function getRedirectRoute(to) {
  const exactRedirect = redirects
    .filter((item) => item.exact)
    .find((item) => to.path === item.from && item.to);

  if (exactRedirect) {
    return { ...to, path: exactRedirect.to, replace: true };
  }

  // to.path != item.to - the to.path cannot equal the "to" key in the redirect
  const fuzzyRedirect = redirects
    .filter((item) => item.fuzzy)
    .find((item) => to.path.indexOf(item.from) === 0 && to.path != item.to);

  if (fuzzyRedirect) {
    return {
      ...to,
      path: to.path.replace(fuzzyRedirect.from, fuzzyRedirect.to),
      replace: true,
    };
  }

  return undefined;
}

let spaLoaded = false;
export default ({ Vue, router, options, siteData }) => {
  router.beforeEach((to, from, next) => {
    // Checking the startup route for the SPA to see if it
    // exists in the SPA router objects.
    const route = router.options.routes.find((obj) => obj.path == to.path);

    if (!spaLoaded && !route) {
      // An external inbound link will cause the SPA to reload.
      // Therefore after loading the SPA there is no need to run the
      // redirect process again on each internal link. Internal links
      // will never use redirects. If you did then change it (the internal link).
      spaLoaded = true;
      const redirect = getRedirectRoute(to);

      if (redirect) {
        redirect.path = redirect.path.replace('//', '/');

        // Do not use `router.push` here, it messes with the history stack.
        router.replace(redirect);
        // If there is an anchor it gets handled in the SideBar.vue component
        // when the SPA loads.
      }
    }
    next();
  });
};
