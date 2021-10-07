---
title: DAO Contracts
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

<p align="center">
  <img src="../figures/dashboard/dao-contract-structure.png" width="700" />
</p>

The core of the DAO is a set of smart contracts based on Aragon's [aragonOS](https://github.com/aragon/aragonOS). The code for these contracts can be found [here](https://github.com/api3dao/api3-dao/), along with instructions for how to deploy a copy of the DAO.

|Name             |Mainnet Address                              |
|:--              |:--                                          |
|DAO Kernel       |`0x593ea926ee9820a933488b6a288433c387d06dba` |
|ACL              |`0x1e7ecc6d3b5b4cfdfc71cb7c3ea9ac4a55f4195a` |
|DAO Pool         |`0x6dd655f10d4b9e242ae186d9050b68f725c76d76` |
|Primary Voting   |`0xdb6c812e439ce5c740570578681ea7aadba5170b` |
|Secondary Voting |`0x1c8058e72e4902b3431ef057e8d9a58a73f26372` |
|Primary agent    |`0xd9f80bdb37e6bad114d747e60ce6d2aaf26704ae` |
|Secondary agent  |`0x556ecbb0311d350491ba0ec7e019c354d7723ce0` |
|Convenience      |`0x95087266018b9637aff3d76d4e0cad7e52c19636` |

<!-- Add mainnet addresses to this list -->
<!-- Add the main DAO contract to this list -->

## Pool (Api3Pool.sol)

The API3 Pool contract is where API3 token holders can stake their tokens to acquire voting power in the DAO. Stakers receive rewards in API3 tokens and can optionally delegate their voting power to another user. 

::: tip
The DAO pool contract will also be used to pay insurance claims out of the DAO pool. As of July 7th, 2021 this functionality has yet to be implemented.
:::

See the [API3Pool.sol](https://github.com/api3dao/api3-dao/tree/main/packages/pool/contracts) contract code for the list of contracts it inherits from.

- TimelockUtils.sol
- ClaimUtils.sol
- StakeUtils.sol
- TransferUtils.sol
- DelegationUtils.sol
- RewardUtils.sol
- GetterUtils.sol
- StateUtils.sol


### Depositing, Staking, Unstaking, and Withdrawing
|Signature | Description|
|--- |--- |
|`depositRegular(uint256 amount)` |Deposits your API3 tokens into the pool. Tokens must be deposited before they can be staked. |
|`stake(uint256 amount)`|Stakes deposited API3 tokens. Staked tokens will earn rewards, grant voting power (and may be slashed if there is a claim on the pool—not yet implemented). |
|`depositAndStake(address source, uint256 amount)` |Deposits and stakes API3 tokens in one transaction. |
|`scheduleUnstake(uint256 shares)` |Schedules staked tokens to be unstaked. In order to unstake API3 tokens, members must first schedule an unstake and wait the scheduled period before unstaking (currently ~1 week). Tokens scheduled to be unstaked no longer grant voting power or earn rewards.  |
|`unstake(address userAddress) returns(uint256)` |Unstakes API3 tokens, allowing them to be withdrawn from the pool (unstaking and withdrawing are separate steps). Can only be called after scheduling an unstake and waiting the scheduled amount of time. |
|`withdrawRegular(uint256 amount)` |Withdraws your API3 tokens from the Pool contract. |
|`unstakeAndWithdraw(address destination)` |Unstakes and withdraws tokens in one transaction. |

### Timelock Functions
|Signature | Description|
|--- |--- |
|`function deposit(address source, uint256 amount, address userAddress)` |Callable only by the Timelock Manager contract. Deposits tokens on behalf of a user. |
|`function depositWithVesting(address source, uint256 amount, address userAddress, uint256 releaseStart, uint256 releaseEnd)` |Callable only by the Timelock Manager contract. Deposits tokens on a vesting schedule on behalf of a user. These vesting tokens cannot be withdrawn by the user until they have vested, but they *can* be staked. |
|`function updateTimelockStatus(address userAddress, address timelockManagerAddress)` |Updates the vesting status of a user's deposited vesting tokens (i.e. unlocks tokens) according to the schedule in the Timelock Manager contract. |

### Voting Power
|Signature | Description|
|--- |--- |
|`userVotingPowerAt(address userAddress, uint256 _block)`|Returns a user's current voting power (0 if they have delegated it). |
|`delegateVotingPower(address delegate)` |Delegates a member's voting power, as decided by their share of the DAO pool, to another address. It is not necessary to undelegate before redelegating to a new address. |
|`undelegateVotingPower()` |Undelegates a member's voting power. |

### Other
|Signature | Description|
|--- |--- |
|`mintReward()` |Distributes new API3 tokens into the DAO pool, where they can be unstaked and withdrawn by members using their share of the pool. |
|`payOutClaim(address recipient, uint256 amount)`|A special function callable only by approved claims manager contracts to pay out claims directly from the pool. |

## DAO (Api3Template.sol)

The API3 DAO contract is the core DAO contract, and it serves a coordinating and setup role. It holds the admin role in API3's contracts including the DAO pool, and it delegates some of this responsibility to the DAO's other contracts (its voting apps and [Aragon Agents](https://aragon.org/agent)).

The base Aragon DAO template contract used by API3 DAO can be found [here](https://github.com/aragon/dao-templates/blob/master/shared/contracts/BaseTemplate.sol).

See the [Api3Template.sol](https://github.com/api3dao/api3-dao/tree/main/packages/dao/contracts) contract code and the list of contracts it inherits from.

- BaseTemplate.sol

## Voting (Api3Voting.sol)

API3's voting app implements a simple quorum-based voting mechanism with:

- a minimum required voting power to create a new proposal (defined in the Pool contract)
- a minimum required quorum for passing a proposal (after a waiting period)
- a quorum percentage to pass a proposal instantly

Proposals include an execution script, which can be executed if the proposal passes.

The API3 DAO has installed two instances of its voting app, primary and secondary versions, along with two Aragon Agents that they control. The primary app commands a larger treasury and can update all DAO settings, while the secondary commands a much smaller treasury and can update some of the DAO settings.

See the [Api3Voting.sol](https://github.com/api3dao/api3-dao/tree/main/packages/dao/contracts) contract code and the Aragon contracts it inherits from.

|Signature | Description|
|--- |--- |
|`newVote(bytes _executionScript, string _metadata, bool _castVote, bool _executesIfDecided) returns (uint256 voteId)` |Create a new proposal in the DAO. Requires a minimum percentage of voting power (currently 0.1%). |
|`vote(uint256 _voteId, bool _supports, bool _executesIfDecided)` |Vote yes or no on an existing proposal. |
|`executeVote(uint256 _voteId)` |Execute a proposal, if it is ready for execution. |

## Dashboard Attributes

The following parameters can be updated via DAO proposal, by calling functions in the [DAO pool contract](../README.md):

<Fix><p>What is the name of the contract(s) mentions above. Link to it in its repo if it makes sense.</p></Fix>

|Parameter Name |Initial Value (units) |Function Signature |Description |
|--- |--- |--- |--- |
|stakeTarget |50 * 10^16 (%*10^16) |`setStakeTarget(uint256 _stakeTarget)`|Percentage of all tokens targeted to be staked |
|aprUpdateStep |1 * 10^16 (%*10^16) |`setAprUpdateStep(uint256 _aprUpdateStep)` |Percentage reward APR will be increased or decreased by |
|maxApr |75 * 10^16 (%*10^16) |`setMaxApr(uint256 _maxApr)` |Maximum reward APR |
|minApr |2.5 * 10^16 (%*10^16) |`setMinApr(uint256 _minApr)` |Minimum reward APR |
|proposalVotingPowerThreshold |1 * 10^17 (%*10^16) |`setProposalVotingPowerThreshold(uint256 _proposalVotingPowerThreshold)` |Percentage of all shares that must be held to create a new proposal |
|unstakeWaitPeriod |604800 (seconds) |`setUnstakeWaitPeriod(uint256 _unstakeWaitPeriod)` |Length of time a member must wait after scheduling unstake before unstaking tokens from the pool |
