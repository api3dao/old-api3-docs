const oisLatest = `v1.0.0`;
const airnodeLatest = `v0.4`;
const airnodeNext = `v0.5`;
const beaconLatest = `v0.1`;

const unsortedRedirects = [
  {
    from: `/pre-alpha/protocols/request-response/authorizer.html`,
    to: `/airnode/pre-alpha/protocols/request-response/authorizer.html`,
    // comment: 'legacy',
  },
  {
    from: `/pre-alpha/guides/provider/deploying-airnode.html`,
    to: `/airnode/pre-alpha/guides/provider/deploying-airnode.html`,
    // comment: 'legacy',
  },
  {
    from: `/pre-alpha/guides/docker/deployer-image.html`,
    to: `/airnode/pre-alpha/guides/docker/deployer-image.html`,
    // comment: 'legacy',
  },
  {
    from: `/pre-alpha/airnode-starter`,
    to: `/airnode/pre-alpha/tutorials/airnode-starter.html`,
    // comment: 'legacy',
  },
  {
    from: `/d/response-parameters`,
    to: `/airnode/${airnodeLatest}/grp-developers/call-an-airnode.html#response-parameters`,
    // comment: 'legacy',
  },
  {
    from: `/r/reserved-parameters`,
    to: `/airnode/${airnodeLatest}/reference/specifications/reserved-parameters.html`,
    // comment: 'legacy',
  },
  {
    from: `/d/request-parameters`,
    to: `/airnode/${airnodeLatest}/grp-developers/call-an-airnode.html#request-parameters`,
    // comment: 'legacy',
  },
  {
    from: `/p/fixed-parameters`,
    to: `/airnode/${airnodeLatest}/grp-providers/guides/build-an-airnode/api-integration.html#fixedoperationparameters`,
    // comment: 'legacy',
  },
  {
    from: `/d/call-an-airnode`,
    to: `/airnode/${airnodeLatest}/grp-developers/call-an-airnode.html`,
    // comment: 'legacy',
  },
  {
    from: `/airnode-starter`,
    to: `/airnode/pre-alpha/tutorials/airnode-starter.html`,
    // comment: 'legacy',
  },
  {
    from: `/airnode/latest/`,
    to: `/airnode/${airnodeLatest}/`,
    fuzzy: true,
  },
  {
    from: `/beacon/latest/`,
    to: `/beacon/${beaconLatest}/`,
    fuzzy: true,
  },
  {
    from: `/latest/members`,
    to: `/dao-members`,
  },
  {
    from: `/beacon/latest/`,
    to: `/beacon/${beaconLatest}/`,
    fuzzy: true,
  },
  {
    from: `/ois/latest/`,
    to: `/ois/${oisLatest}/`,
    fuzzy: true,
  },
  {
    from: `/pre-alpha`,
    to: `/airnode/pre-alpha`,
    // comment: 'legacy',
  },
  {
    from: `/airnode`,
    to: `/airnode/${airnodeLatest}`,
  },
  {
    from: `/beacons`,
    to: `/beacon/${beaconLatest}`,
  },
  {
    from: `/latest`,
    to: `/airnode/${airnodeLatest}`,
  },
  {
    from: `/beacon`,
    to: `/beacon/${beaconLatest}`,
  },
  {
    from: `/next`,
    to: `/airnode/${airnodeNext}`,
  },
  {
    from: `/v0.2`,
    to: `/airnode/v0.2`,
  },
  {
    from: `/v0.3`,
    to: `/airnode/v0.3`,
  },
  {
    from: `/v0.4`,
    to: `/airnode/v0.4`,
  },
  {
    from: `/ois`,
    to: `/ois/${oisLatest}`,
  },
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
