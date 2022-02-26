const { redirects } = require('./redirects.js');

function getRedirectRoute(to) {
  console.log(to, redirects);

  const exactRedirect = redirects
    .filter((item) => item.exact)
    .find((item) => to.path === item.from && item.to);

  if (exactRedirect) {
    return { ...to, path: exactRedirect.to, replace: true };
  }

  //let fuzzyRedirect = undefined;
  /**redirects
    .filter((item) => item.fuzzy)
    .find((item) => item.from.indexOf(to.path) > -1);*/

  /*let fuzzyList = redirects.filter((item) => item.fuzzy);
  let abort = false;
  for (let i = 0; i < fuzzyList.length && !abort; i++) {
    const fromList = fuzzyList[i].from;

    const redirectTo = fuzzyList[i].to;
    for (let z = 0; z < fromList.length; z++) {
      const from = fromList[z];
      console.log(from, to.path, to.path.substr(0, from.length));
      if (to.path.substr(0, from.length) === from) {
        console.log('GOT IT', from);
        // Now replace the to from redirect into the new fuzzyRedirect.to
        const newTo = to.path.replace(from, fuzzyList[i].to);
        fuzzyRedirect = { from: fromList, to: newTo };
        abort = true;
        break;
      }
    }
  }*/

  const fuzzyRedirect = redirects
    .filter((item) => item.fuzzy)
    .find((item) => to.path.indexOf(item.from) === 0);

  if (fuzzyRedirect) {
    console.log('to.path >', to.path);
    console.log('from >', fuzzyRedirect.from);
    console.log('fuzzy found', fuzzyRedirect);
    return {
      ...to,
      //path: to.path.replace(to.path, fuzzyRedirect.to),
      path: to.path.replace(fuzzyRedirect.from, fuzzyRedirect.to),
      replace: true,
    };
  }

  return undefined;
}

let spaLoaded = false;
export default ({ Vue, router, options }) => {
  router.beforeEach((to, from, next) => {
    if (!spaLoaded) {
      // An external inbound link will cause the SPA to reload.
      // Therefore after loading the SPA there is no need to run the
      // redirect process again on each internal link. Internal links
      // will never use redirects. If you did then change it (the internal link).
      spaLoaded = true;
      const redirect = getRedirectRoute(to);

      if (redirect) {
        console.log(redirect);
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
