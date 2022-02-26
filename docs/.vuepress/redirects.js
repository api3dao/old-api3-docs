/**
 * This file contains the dynamic redirect (browser based) used by the docs.
 * The SPA's router will sense the need to redirect the user, see enhanceApp.js.
 * The JSON object contains 2 types of object, exact and fuzzy. enhanceApp.js
 * will route to the first one is finds checking exact types first.
 */
const {
  versions,
  versionsBeacon,
  versionsOis,
  airnodeVersionNext,
} = require('./config');

const oisLatest = versionsOis[0].name;
const airnodeLatest = versions[0].name;
const airnodeNext = airnodeVersionNext[0].name;
const beaconLatest = versionsBeacon[0].name;

// prettier-ignore
const unsortedRedirects = [
  {
    from: `/pre-alpha/protocols/request-response/authorizer.html`,
    to: `/airnode/pre-alpha/protocols/request-response/authorizer.html`,
    exact:true
    // comment: 'legacy',
  },
  {
    from: `/pre-alpha/guides/provider/deploying-airnode.html`,
    to: `/airnode/pre-alpha/guides/provider/deploying-airnode.html`,
    exact:true
    // comment: 'legacy',
  },
  {
    from: `/pre-alpha/guides/docker/deployer-image.html`,
    to: `/airnode/pre-alpha/guides/docker/deployer-image.html`,
    exact:true
    // comment: 'legacy',
  },
  {
    from: `/pre-alpha/airnode-starter`,
    to: `/airnode/pre-alpha/tutorials/airnode-starter.html`,
    exact:true
    // comment: 'legacy',
  },
  {
    from: `/d/response-parameters`,
    to: `/airnode/${airnodeLatest}/grp-developers/call-an-airnode.html#response-parameters`,
    exact:true
    // comment: 'legacy',
  },
  {
    from: `/r/reserved-parameters`,
    to: `/airnode/${airnodeLatest}/reference/specifications/reserved-parameters.html`,
    exact:true
    // comment: 'legacy',
  },
  {
    from: `/d/request-parameters`,
    to: `/airnode/${airnodeLatest}/grp-developers/call-an-airnode.html#request-parameters`,
    exact:true
    // comment: 'legacy',
  },
  {
    from: `/p/fixed-parameters`,
    to: `/airnode/${airnodeLatest}/grp-providers/guides/build-an-airnode/api-integration.html#fixedoperationparameters`,
    exact:true
    // comment: 'legacy',
  },
  {
    from: `/d/call-an-airnode`, 
    to: `/airnode/${airnodeLatest}/grp-developers/call-an-airnode.html`, 
    exact:true
    // comment: 'legacy',
  },
  {
    from: `/airnode-starter`,
    to: `/airnode/pre-alpha/tutorials/airnode-starter.html`,
    exact:true
    // comment: 'legacy',
  },
  // fuzzy
  { from: `/pre-alpha`, to: `/airnode/pre-alpha/`, fuzzy: true }, // comment: 'legacy'
  { from: `/latest/members`,to: `/dao-members/`, fuzzy: true },
  { from: `/latest`, to: `/airnode/${airnodeLatest}/`, fuzzy: true },
  { from: `/airnode`, to: `/airnode/${airnodeLatest}/`, fuzzy: true},
  { from: `/airnode/latest`, to: `/airnode/${airnodeLatest}/`, fuzzy: true },
  { from: `/airnode/next`, to: `/airnode/${airnodeNext}/`, fuzzy: true },
  { from: `/next`, to: `/airnode/${airnodeNext}/`, fuzzy: true },
  { from: `/beacons`, to: `/beacon/${beaconLatest}/`, fuzzy: true },
  { from: `/beacons/latest`, to: `/beacon/${beaconLatest}/`, fuzzy: true },
  { from: `/beacon`, to: `/beacon/${beaconLatest}/`, fuzzy: true },
  { from: `/beacon/latest`, to: `/beacon/${beaconLatest}/`, fuzzy: true },
  { from: `/ois/latest`, to: `/ois/${oisLatest}/`, fuzzy: true },
  { from: `/ois`, to: `/ois/${oisLatest}/`, fuzzy: true },
];

export const redirects = unsortedRedirects.sort((first, second) => {
  if (first.from.length > second.from.length) {
    return -1;
  }

  if (first.from.length < second.from.length) {
    return 1;
  }

  return 0;
});
