import { latestVersion } from './config.js';

export default ({ Vue, router, options }) => {
  //console.log(router.options.routes);
  //router.addRoute({ name: '00000xxxxxxxx', path: '/me/latest', redirect: '/' });
  //router.addRoute({ name: '1111xxxxxxxx', path: '/route/me', redirect: '/' });

  /*router.options.routes.forEach((element) => {
    if (element.path.indexOf('/airnode/v0.3/') > -1) {
      console.log(1, element.path);
      let newRoute = element.path.replace('/airnode/latest/', '/airnode/v0.3/');
      let rRoute = element.path.replace('/airnode/v0.3/', '/airnode/latest/');
      //router.addRoute({ path: element.path, redirect: newRoute });
      console.log(2, rRoute, '\n');
      router.addRoute({ path: rRoute });
    }
  });*/

  /*for (let i = 0; i < router.options.routes.length; i++) {
    let element = router.options.routes[i];
    let cnt = 1000;
    if (element.path.indexOf('/airnode/v0.3/') > -1) {
      console.log(1, element.path);
      //let newRoute = element.path.replace('/airnode/latest/', '/airnode/v0.3/');
      let rRoute = element.path.replace('/airnode/v0.3/', '/airnode/latest/');
      //router.addRoute({ path: element.path, redirect: newRoute });
      console.log(2, rRoute, '\n');
      router.addRoute({ name: cnt++, path: rRoute, redirect: element.path });
    }
  }*/

  //https://github.com/vuejs/vuepress/issues/1803
  router.beforeEach((to, from, next) => {
    if (to.path.indexOf('/airnode/latest/') > -1) {
      //console.log(to);
      let path = to.path.replace('/airnode/latest/', latestVersion);
      //next(false);
      window.location.href = path;
      //window.location.replace(path);
    } else {
      next();
    }
  });

  // HOLD THIS CODE AS A REFERENCE UNTIL THIS GETS PERFECTED

  /**
   * Vue global guard that looks for the use of /airnode/latest/ in the URL
   * and then re-directs to the latestVersion from config.json.
   * Reference:
   * 1. /docs/.vuepress/enhanceApp.js
   * 2. http://docs.api3.org/dev/redirects.html
   * 3. https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
   */
  /*router.beforeResolve((to, from, next) => {
    //console.log('from', from);
    //console.log('to', to);
    //console.log('beforeEach', to.path);

    //next((vm) => {
    //  console.log('callback');
    //});

    // ERROR: HierarchyRequestError: The operation would yield an incorrect node tree.

    if (to.path.indexOf('/airnode/latest/') > -1) {
      console.log('>', to.path);
      let path = to.path.replace('/airnode/latest/', latestVersion);
      path = '/airnode/v0.3/grp-developers/';
      console.log('<', path);
      next(path);
    } else {
      next();
    }
  });
  */
};
