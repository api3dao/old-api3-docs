---
title: Rewards
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

## Earning Rewards
Earning rewards is simple: everyone who owns shares of the DAO pool (everyone who has staked API3 tokens into the DAO pool contract) will earn rewards as they are added to the DAO pool. When you schedule tokens to be unstaked, you stop earning rewards for those tokens.

Remember that when you stake, you receive non-transferable pool shares equal to the current total number of issued shares divided by the total number of tokens staked. Since the reward adds additional tokens to the pool, the "price" for one share will not always be one token.

## Reward Calculation And Distribution
Rewards are added as staked API3 tokens into the DAO pool each time the `mintReward` function is called. `mintReward` is callable by anyone, once per "epoch" (currently 1 week). When it is called, an amount of API3 tokens is minted and added to the DAO pool:

> `rewardAmount = totalStakedTokens * APR * epochLength / epochsPerYear / 100`

In other words, *the reward is the annual percentage (APR) increase divided by the number of epochs per year (currently ~52)*.

In addition, each time `mintReward` is called, the annual percentage (the reward rate) is updated up or down by APR update step size (1%), according to whether the total number of staked tokens is above or below its target. The initial target is 50%, so if the total number of staked tokens is less than 50% of the total token supply when `mintReward` is called, APR will be raised by 1% for the next reward payout (and vice versa). Thus, APR will constantly be adjusted, but it will always stay between a designated maximum and minimum -- currently 75% and 2.5% respectively.

## Reward Withdrawal
Rewards withdrawals are baked into default withdrawals, except that rewards are locked for 1 year after minting. As a staker, your pool shares will always reflect a proportional right to the pool of staked tokens, including any rewards that have been minted. When you unstake and withdraw your tokens, you will receive:
 - your tokens,
 - plus any share of the rewards you earned,
 - minus rewards that were added to the pool within the last year, which will remain staked.
