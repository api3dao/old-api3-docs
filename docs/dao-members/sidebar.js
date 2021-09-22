module.exports = [
  /*{
    title: 'Introduction', initialOpenGroupIndex: 0, collapsable: true,
    children: [
      '',
      'contributing',
      'blog-posts',
      'fundamentals/apis',
      'fundamentals/first-party-oracles',
      'fundamentals/decentrally-governed-oracle-networks',
      'fundamentals/dapis'
    ]
  },*/
  {
    title: 'Introduction', initialOpenGroupIndex: 1, collapsable: false,
    children: [
      '', // API3 DAO
      {title:'API3 DAO', path:'introduction/api3-dao'},
      {title:'The DAO Pool', path:'introduction/dao-pool'},
      'introduction/blog-posts',
    ]
  },
  {
    title: 'Dashboard', collapsable: false,
    children: [
        'dashboard/',
        'dashboard/staking',
        'dashboard/proposals',
        'dashboard/voting',
        'dashboard/videos',
        {title: 'DAO Tracker', path: 'dashboard/dao-tracker'},
    ]
  },
  {
    title:'Contract Architecture', collapsable: false,
    children: [
      'contract-architecture/overview',
      'contract-architecture/pool',
      'contract-architecture/dao',
      'contract-architecture/voting',
      'contract-architecture/dashboard-attributes'
    ]
  },
]
