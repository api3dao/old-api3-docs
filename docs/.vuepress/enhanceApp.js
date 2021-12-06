import { latestVersion } from './config.js';

export default ({ Vue, router, options }) => {
  /**
   * Vue global guard that looks for the use of /airnode/latest/ in the URL
   * and then re-directs to the latestVersion from config.json.
   * Reference:
   * 1. /docs/.vuepress/enhanceApp.js
   * 2. http://docs.api3.org/dev/redirects.html
   * 3. https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
   */
  router.beforeEach((to, from, next) => {
    if (to.path.indexOf('/airnode/latest/') > -1) {
      next({ path: to.path.replace('/airnode/latest/', latestVersion) });
    } else {
      next();
    }
  });
};
