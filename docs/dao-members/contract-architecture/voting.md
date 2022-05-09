---
title: 投票(Api3Voting.sol)
---

# {{$frontmatter.title}}

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

API3的投票app实现了一个简单的基于法定人数的投票机制：

- 创建新提案至少需要的投票权(在池 合约中定义)
- 通过提案所需最低法定人数(等待期后)
- 可以决定通过提案的法定百分比

提案包含一个执行脚本，如果提案通过了，可以执行提案。

API3 DAO在投票app上安装了两个版本，主要版本和次要版本，以及它们所控制的两个Aragon 代理(Aragon Agents)。 主要版本控制大一点的国库，可以更新所有 DAO 设置。 次要版本则控制一个小得多的国库，只可以更新一些DAO设置。

查看 [Api3Template.sol](https://github.com/api3dao/api3-dao/tree/main/packages/dao/contracts) 合约代码和它所继承的Aragon合约。

- 基础模板

## 关键函数

| 签名                                                                                                                    | 描述                                    |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `newVote(bytes _executionScript, string _metadata, bool _castVote, bool _executesIfDecided) returns (uint256 voteId)` | 在 DAO 中创建一个新提案。 规定投票权的最低百分比（目前为0.1%）。 |
| `vote(uint256 _voteId, bool _supports, bool _executesIfDecided)`                                                      | 对现有提案投票yes或no。                        |
| `executeVote(uint256 _voteId)`                                                                                        | 如果提案已准备好执行，则执行提案。                     |

提案可以执行的前提是

> 1. 该提案尚未被执行，并且
> 2. 超过50%的投票权对提案投了“yes”票，

或者

> 1. 该提案尚未被执行，并
> 2. 该提案的投票期已经结束，并且
> 3. "yes"的总票数超过"no"的票数；和
> 4. 至少50%(用于主要app提案投票)或15%(用于次要app提案投票)投票能量对提案投了"yes"。
