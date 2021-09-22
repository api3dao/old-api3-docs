---
title: Voting Power
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

## Deposit & Stake Tokens

Users must stake API3 tokens to be eligible for rewards, to vote, and to create proposals. To stake: 
1. Visit the **"Staking" tab** in one of the [DAO front ends](../README.md#frontends).
2. **Deposit tokens.**
<p align="center">
  <img src="../../figures/deposit.png" width="300" />
  <img src="../../figures/stake.png" width="300" />
</p>
3. **Stake tokens** for non-transferable shares, according to the current share price (total shares / total staked tokens). **Your voting power is your shares.** More precisely, voting power is modeled on Aragon's "MiniMe" framework: for each proposal, a user's voting power uses their shares from the most recent stake or unstake action they took prior to the proposal being submitted. Your staked token balance will go up over time as **you earn [rewards](./rewards.md) for staking.**
<p align="center">
  <img src="../../figures/staking-dash.png" width="500" />
</p>

## Unstake and Withdraw Tokens

To unstake and withdraw tokens from the pool:
1. Visit the **"Staking" tab** in one of the [DAO front ends](../README.md#frontends).
2. **Schedule an unstake.** This immediately reduces your voting power proportionally to the number of tokens you schedule to unstake. 
<p align="center">
  <img src="../../figures/unstake.png" width="400" />
</p>
3. **Wait through the delay period** (currently 7 days, but this is adjustable by the DAO). The tokens you scheduled to unstake will not earn you rewards during this period.
<p align="center">
  <img src="../../figures/pending-unstake.png" width="400" />
</p>
4. **Unstake tokens.** When you unstake, your tokens will still be in the pool contract, but they will be available to withdraw.
<p align="center">
  <img src="../../figures/unstake-ready.png" width="400" />
</p>
5. **Withdraw tokens** to send them back to your personal address.
<p align="center">
  <img src="../../figures/withdraw.png" width="400" />
</p>

## Delegation

You may delegate your voting power to another address via the **"Delegate" button** in the **"Governance" tab**.

When you delegate, your full voting power will be granted to the address of your choice. You cannot partially delegate, nor can you delegate to an address that is already delegating to someone else.
<p align="center">
  <img src="../../figures/delegate.png" width="400" />
</p>

Staking more tokens after delegating will increase the amount of voting power you have delegated (it will not give both your address and the address you delegate to voting power simultaneously).

**You can undelegate your voting power anytime.**