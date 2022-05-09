---
title: 控制面板属性
---

# {{$frontmatter.title}}

以下参数可以通过 DAO 提案更新，在 [API3 池合约](pool.md) 中调用 `StateUtils.sol` 功能。 作为参考，百分比值是基于 `10^18 = 100%`。

| 参数名称                         | 初始值 (单位)                | 函数签名                                                                     | 描述                         |
| ---------------------------- | ----------------------- | ------------------------------------------------------------------------ | -------------------------- |
| stakeTarget                  | 50 * 10^16 (%*10^16)  | `setStakeTarget(uint256 _stakeTarget)`                                   | 代币质押百分比                    |
| aprUpdateStep                | 1 * 10^16 (%*10^16)   | `setAprUpdateStep(uint256 _aprUpdateStep)`                               | 增加或减少的奖励APR百分比             |
| maxApr                       | 75 * 10^16 (%*10^16)  | `setMaxApr(uint256 _maxApr)`                                             | 最大奖励APR                    |
| minApr                       | 2.5 * 10^16 (%*10^16) | `setMinApr(uint256 _minApr)`                                             | 最小奖励 APR                   |
| proposalVotingPowerThreshold | 0.1 * 10^16 (%*10^16) | `setProposalVotingPowerThreshold(uint256 _proposalVotingPowerThreshold)` | 创建新提案必须具备的持币百分比            |
| unstakeWaitPeriod            | 604800 (seconds)        | `setUnstockWaitPeriod(uint256 _unstakehWaitPeriod)`                      | 成员在解除质押后，从池中取出代币前必须等待的时间长度 |
