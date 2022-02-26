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

const redirectList = [
  {
    from: `/pre-alpha/protocols/request-response/authorizer.html`,
    to: `/airnode/pre-alpha/protocols/request-response/authorizer.html`,
    exact: true, // comment: 'legacy',
  },
  {
    from: `/pre-alpha/guides/provider/deploying-airnode.html`,
    to: `/airnode/pre-alpha/guides/provider/deploying-airnode.html`,
    exact: true, // comment: 'legacy',
  },
  {
    from: `/pre-alpha/guides/docker/deployer-image.html`,
    to: `/airnode/pre-alpha/guides/docker/deployer-image.html`,
    exact: true, // comment: 'legacy',
  },
  {
    from: `/pre-alpha/airnode-starter`,
    to: `/airnode/pre-alpha/tutorials/airnode-starter.html`,
    exact: true, // comment: 'legacy',
  },
  {
    from: `/d/response-parameters`,
    to: `/airnode/${airnodeLatest}/grp-developers/call-an-airnode.html#response-parameters`,
    exact: true, // comment: 'legacy',
  },
  {
    from: `/r/reserved-parameters`,
    to: `/airnode/${airnodeLatest}/reference/specifications/reserved-parameters.html`,
    exact: true, // comment: 'legacy',
  },
  {
    from: `/d/request-parameters`,
    to: `/airnode/${airnodeLatest}/grp-developers/call-an-airnode.html#request-parameters`,
    exact: true, // comment: 'legacy',
  },
  {
    from: `/p/fixed-parameters`,
    to: `/airnode/${airnodeLatest}/grp-providers/guides/build-an-airnode/api-integration.html#fixedoperationparameters`,
    exact: true, // comment: 'legacy',
  },
  {
    from: `/d/call-an-airnode`,
    to: `/airnode/${airnodeLatest}/grp-developers/call-an-airnode.html`,
    exact: true, // comment: 'legacy',
  },
  {
    from: `/airnode-starter`,
    to: `/airnode/pre-alpha/tutorials/airnode-starter.html`,
    exact: true, // comment: 'legacy',
  },
  {
    from: [
      '/latest/members',
      '/latest/members/',
      '/dao/',
      '/dao',
      '/members/',
      '/members',
    ],
    to: `/dao-members/`,
    fuzzy: true,
  },
  {
    from: [
      '/beacons/',
      '/beacons',
      '/beacons/latest/',
      '/beacons/latest',
      '/beacon/',
      '/beacon',
      '/beacon/latest/',
      '/beacon/latest',
    ],
    to: `/beacon/${beaconLatest}/`,
    fuzzy: true,
  },
  {
    from: [
      '/airnode/latest/',
      '/airnode/latest',
      '/airnode/',
      '/airnode',
      '/latest/',
      '/latest',
    ],
    to: `/airnode/${airnodeLatest}/`,
    fuzzy: true,
  },
  {
    from: ['/next/', '/next'],
    to: `/airnode/${airnodeNext}/`,
    fuzzy: true,
  },
  {
    from: ['/ois/latest/', '/ois/latest', '/ois/', '/ois'],
    to: `/ois/${oisLatest}/`,
    fuzzy: true,
  },
];

export const redirects = redirectList;
