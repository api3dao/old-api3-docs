import { latestVersion } from './config.js';

export default ({ Vue, router, options }) => {
  /**
   * Vue global guard that looks for the use of /airnode/latest/ in the URL
   * and then re-directs to the latestVersion from config.json.
   * https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
   */
  router.beforeEach((to, from, next) => {
    if (to.path.indexOf('/airnode/latest/') > -1) {
      console.log('request made using latest >', to.path);
      next({ path: to.path.replace('/airnode/latest/', latestVersion) });
    } else {
      next();
    }
  });
};
