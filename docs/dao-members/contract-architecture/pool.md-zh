---
title: 池(Api3Pool.sol)
---

# {{$frontmatter.title}}

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

API3池合约是API3代币持有者可以将他们的代币质押以获得DAO的投票权。 质押者获得API3代币的奖励，并可以选择将他们的投票权委托给另一个用户。

::: 提示

DAO池合约也将被用来从DAO池中支付保险索赔。 这个功能到目前为止还没有实现。

:::

查看 [API3Pool.sol](https://github.com/api3dao/api3-dao/tree/main/packages/pool/contracts) 合约代码，以了解合约的遗传结构。

- TimelockUtils.sol
- ClaimUtils.sol
- StakeUtils.sol
- TransferUtils.sol
- DelegationUtils.sol
- RewardUtils.sol
- Getterutils.sol
- StateUtils.sol

## 关键函数

### 存入、质押、解除质押和提币

| 签名                                                | 描述                                                                                   |
| ------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `depositRegular(uint256 amount)`                  | 将您的 API3 代币存入池中。 代币必须先存入才能质押。                                                        |
| `stake(uint256 amount)`                           | 质押存入的API3代币。 质押的代币将获得奖励，授予投票权(如果在池子中有尚未执行的claim，则投票权可能会被取消)。                         |
| `depositAndStake(address source, uint256 amount)` | 在一个交易中存入并质押API3代币。                                                                   |
| `scheduleUnstake(uint256 shares)`                 | 计划解除质押的代币。 为了解除API3代币的质押，成员必须先操作解除质押，并在代币解锁前等待预定的时间（目前是1周时间）。 操作解除质押的代币不再授予投票权或获得奖励。 |
| `unstake(address userAddress) returns(uint256)`   | API3代币解锁后，允许它们从池中提币（解锁和提币是不同的步骤）。 只有在操作解除质押并等待预定的时间后才能调用。                            |
| `withdrawRegular(uint256 amount)`                 | 从池合约中取出您的 API3 代币。                                                                   |
| `unstakeAndWithdraw(address destination)`         | 在一个交易中解锁并提币。                                                                         |

### 时间锁

| 签名                                                                                                                           | 描述                                                                          |
| ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `function deposit(address source, uint256 amount, address userAddress)`                                                      | 只能由 Timelock Manager 合约来调用。 为用户存入代币。                                        |
| `function depositWithVesting(address source, uint256 amount, address userAddress, uint256 releaseStart, uint256 releaseEnd)` | 只能由 Timelock Manager 合约来调用。 为用户按归属时间表存入代币。 这些存入的代币在归属之前不能被用户提取，但它们_可以_ 被质押。 |
| `function updateTimelockStatus(address userAddress, address timelockManagerAddress)`                                         | 根据Timelock Manager合约中的时间表，更新用户存入的归属代币的归属状态（比如 解锁的代币）。                       |

### 投票权

| 签名                                                       | 描述                                                       |
| -------------------------------------------------------- | -------------------------------------------------------- |
| `userVotingPowerAt(address userAddress, uint256 _block)` | 返回用户当前的投票能量(如果他们已经被委托投票权，0)。                             |
| `delegateVotingPower(address delegate)`                  | 将一个成员的投票权委托转让给另一个地址，这是由他们在质押池中的份额决定的。 在转让到新地址之前，无需取消投票权。 |
| `undelegateVotingPower()`                                | 取消委托成员的投票权。                                              |

### 其他

| 签名                                               | 描述                                                     |
| ------------------------------------------------ | ------------------------------------------------------ |
| `mintReward()`                                   | 将新的 API3 代币分发到质押池中，成员们可以在质押池中根据自己的份额解除质押和提币            |
| `payOutClaim(address recipient, uint256 amount)` | 仅可由经批准的claims manager合约才能调用的特殊功能，直接从质押池中支付索偿（claim）要求。 |
