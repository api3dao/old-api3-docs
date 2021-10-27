module.exports = [
  {
    title: 'Introduction',
    initialOpenGroupIndex: 1,
    collapsable: false,
    children: [
      '', // API3 DAO
      { title: 'API3 DAO', path: 'introduction/api3-dao' },
      { title: 'The DAO Pool', path: 'introduction/dao-pool' },
      'introduction/symlink-blog-posts',
    ],
  },
  {
    title: 'Dashboard',
    collapsable: false,
    children: [
      'dashboard/',
      'dashboard/staking',
      'dashboard/proposals',
      'dashboard/voting',
      'dashboard/videos',
      'dashboard/dao-tracker',
    ],
  },
  {
    title: 'Contract Architecture',
    collapsable: false,
    children: [
      'contract-architecture/',
      'contract-architecture/pool',
      'contract-architecture/dao',
      'contract-architecture/voting',
      'contract-architecture/dashboard-attributes',
    ],
  },
];
