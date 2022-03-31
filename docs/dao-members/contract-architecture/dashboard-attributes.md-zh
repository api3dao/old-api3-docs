---
title: Dashboard Attributes
---

# {{$frontmatter.title}}

The following parameters can be updated via DAO proposal by calling `StateUtils.sol` functions within the [API3 Pool contract](pool.md). For reference, percentage values are based on `10^18 = 100%`.

| Parameter Name               | Initial Value (units)   | Function Signature                                                       | Description                                                                                      |
| ---------------------------- | ----------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| stakeTarget                  | 50 * 10^16 (%*10^16)  | `setStakeTarget(uint256 _stakeTarget)`                                   | Percentage of all tokens targeted to be staked                                                   |
| aprUpdateStep                | 1 * 10^16 (%*10^16)   | `setAprUpdateStep(uint256 _aprUpdateStep)`                               | Percentage reward APR will be increased or decreased by                                          |
| maxApr                       | 75 * 10^16 (%*10^16)  | `setMaxApr(uint256 _maxApr)`                                             | Maximum reward APR                                                                               |
| minApr                       | 2.5 * 10^16 (%*10^16) | `setMinApr(uint256 _minApr)`                                             | Minimum reward APR                                                                               |
| proposalVotingPowerThreshold | 0.1 * 10^16 (%*10^16) | `setProposalVotingPowerThreshold(uint256 _proposalVotingPowerThreshold)` | Percentage of all shares that must be held to create a new proposal                              |
| unstakeWaitPeriod            | 604800 (seconds)        | `setUnstakeWaitPeriod(uint256 _unstakeWaitPeriod)`                       | Length of time a member must wait after scheduling unstake before unstaking tokens from the pool |
