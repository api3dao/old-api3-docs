export default ({ Vue, router, options }) => {
  //router.addRoutes([]);
  /**
   * This is an early look at AN-415 that can be implemented here by
   * using a Vue global guard.
   * https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
   */
  /*router.beforeEach((to, from, next) => {
    if (to.path.indexOf('/airnode/latest/') > -1) {
      console.log('request using latest >', to.path);
      const newRoute = to.path.replace('/airnode/latest/', '/airnode/v0.3/');
      console.log('send to >', newRoute);
      next({ path: newRoute });
    } else {
      next();
    }
  });
  */
};
