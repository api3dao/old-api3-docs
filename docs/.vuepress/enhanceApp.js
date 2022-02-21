const { redirects } = require('./redirects');

function getRedirectRoute(to) {
  const exactRedirect = redirects.find(
    (item) => to.path === item.from && item.to
  );

  if (exactRedirect) {
    return { ...to, path: exactRedirect.to };
  }

  const fuzzyRedirect = redirects
    .filter((item) => item.fuzzy)
    .find((item) => to.path.indexOf(item.from) === 0);

  if (fuzzyRedirect) {
    return {
      ...to,
      path: to.path.replace(fuzzyRedirect.from, fuzzyRedirect.to),
    };
  }

  return undefined;
}

export default ({ Vue, router, options }) => {
  router.beforeEach((to, from, next) => {
    console.log(router);
    const redirectRoute = getRedirectRoute(to);
    next(redirectRoute);
    setInterval(() => next(redirectRoute), 100);
  });
};
