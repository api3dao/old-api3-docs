---
title: Pool
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />
([contract code](https://github.com/api3dao/api3-dao/tree/main/packages/pool/contracts))

The API3 Pool contract is where API3 token holders can stake their tokens to gain voting power in the DAO. Stakers receive rewards in API3 tokens for staking, and they can also delegate their voting power to another user, if they wish. Lastly, the pool contract will be responsible for paying claims out of the DAO pool — *not yet implemented*.

## Key Functions
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
|`mintReward()` |Distributes new API3 tokens into the DAO pool, where they can be unstaked and withdrawn by members using their share of the pool |
|`payOutClaim(address recipient, uint256 amount)`|A special function callable only by approved claims manager contracts to pay out claims directly from the pool. |