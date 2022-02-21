const { redirects } = require('./redirects');

function getRedirectRoute(to) {
  const exactRedirect = redirects.find(
    (item) => to.path === item.from && item.to
  );

  if (exactRedirect) {
    return { ...to, path: exactRedirect.to, replace: true };
  }

  const fuzzyRedirect = redirects
    .filter((item) => item.fuzzy)
    .find((item) => to.path.indexOf(item.from) === 0);

  if (fuzzyRedirect) {
    return {
      ...to,
      path: to.path.replace(fuzzyRedirect.from, fuzzyRedirect.to),
      replace: true,
    };
  }

  return undefined;
}

export default ({ Vue, router, options }) => {
  router.beforeEach((to, from, next) => {
    const redirect = getRedirectRoute(to);

    if (redirect) {
      router.push(redirect);
    }
    next();
  });
};
