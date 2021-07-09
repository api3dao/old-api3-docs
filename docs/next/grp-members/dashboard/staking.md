---
title: Staking Tokens
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2]" />

Staking API3 tokens in the [DAO pool](dao-pool.md) makes you eligible for rewards and governance rights. 

## Getting Started

1. Access the [DAO Dashboard](https://api3.eth.link/)
2. Select the **Staking** navigation link in the upper left hand corner.
3.  Lastly click the **Connect Wallet** button in the upper right hand corner and connect your wallet using mainnet.


<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

## Deposit and Withdraw Tokens

Before tokens can be staked you must deposit them in the DAO pool. Doing so will remove them from your wallet and place them into the DAO pool under the control of its smart contracts. Deposited tokens (that are unstaked) can be withdrawn from the DAO pool at any time and returned to your wallet. 

:::: tabs
::: tab Read & Learn
#### Deposit
1. Select the **_Deposit_** button.
> If this is your first deposit you will need to authorize the DAO pool smart contract first. Use step #2 then step #3. Otherwise skip to step 4.
2. (First time depositors) Enter the number of tokens to deposit and click the **_Approve_** button.
3. Enter the number of tokens to deposit and click the **_Deposit_** button.
> Note that deposited tokens are not staked. They will not earn rewards or grant you governance rights.

#### Withdraw
You can only withdraw unstaked tokens. The max amount that can be withdrawn is displayed (labeled WITHDRAWABLE) on the staking page.
1. Select the **_Withdraw_** link.
2. Enter the number of tokens to withdraw and click the **_Withdraw_** button.
> The tokens withdrawn are returned to your wallet.
:::

::: tab Watch & Learn
  <iframe width="560" height="315" src="https://www.youtube.com/embed/PdSE-SiUx3M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
:::
::::


## Stake & Earn

:::: tabs
::: tab Read & Learn
When you stake your deposited tokens you will be granted the right to create and vote on proposals. In addition you will earn rewards but also share in the risk of the insurance service. Rewards are updated every seven days and are proportional to the number of tokens you have staked in the DAO pool (as a percentage of the DAO pool).

1. Select the **_Stake_** button.
> The tokens available to stake depends on the number deposited and are available to withdraw.
2. Enter the number of tokens to stake (or select the **Max** link) and click the **_Stake_** button.

:::
::: tab Watch & Learn
  <iframe width="560" height="315" src="https://www.youtube.com/embed/DQMsgQvkg7k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
:::
::::


## Unstake and Withdraw Tokens

To unstake and withdraw tokens from the pool:
1. Visit the **"Staking" tab** in one of the [DAO front ends](../README.md#frontends).
2. **Schedule an unstake.** This immediately reduces your voting power proportionally to the number of tokens you schedule to unstake. 
<p align="center">
  <img src="../../figures/dashboard/unstake.png" width="400" />
</p>
3. **Wait through the delay period** (currently 7 days, but this is adjustable by the DAO). The tokens you scheduled to unstake will not earn you rewards during this period.
<p align="center">
  <img src="../../figures/dashboard/pending-unstake.png" width="400" />
</p>
4. **Unstake tokens.** When you unstake, your tokens will still be in the pool contract, but they will be available to withdraw.
<p align="center">
  <img src="../../figures/dashboard/unstake-ready.png" width="400" />
</p>
5. **Withdraw tokens** to send them back to your personal address.
<p align="center">
  <img src="../../figures/dashboard/withdraw.png" width="400" />
</p>




