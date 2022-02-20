const { processedRedirects } = require('./redirects');

export default ({ Vue, router, options }) => {
  router.beforeEach((to, from, next) => {
    const redirect = processedRedirects.find((item) => to.path === item[0]);

    if (redirect && redirect[1]) {
      next({ ...to, path: redirect[1] });
    } else next();
  });
};
