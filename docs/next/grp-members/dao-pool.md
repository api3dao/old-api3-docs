---
title: The DAO Pool
---

# {{$frontmatter.title}}

<TocHeader />
[[TOC]]

The API3 DAO has a single staking pool called the **DAO pool**. Staking API3 tokens in the DAO pool will grant representation and staking rewards, but at the same time, the staked tokens will be used as collateral to pay out insurance claims as needed. To do this, the DAO pool focuses on three token utilities and implements an insurance service which by design balances revenue and risk through responsible governance.

:::tip
In this article the word **_security_** refers to a "guarantee of dAPI service".
:::

## Token Utilities

Decentralized governance requires well-balanced incentive mechanisms that accurately model both positive and negative outcomes. In other words, the governing
entities should be rewarded for good results and penalized for bad ones. The API3
token is designed to facilitate this through three main utilities:

_Three main utilities of the API3 token._

1. [Staking](#staking): Grants dAPI revenue and inflationary rewards.
1. [Collateral](#collateral): Backs insurance services that protect users from damages caused
by dAPI malfunctions.
1. [Governance](#governance): Grants direct representation in the API3 DAO.

Note that it is critical for these three utilities to coincide. All governing entities must
receive staking rewards for them to govern in a way that maximizes revenue. All
governing entities must have their funds used as collateral for them to govern in a
way that minimizes _security_ risks.

Reference <a href="/api3-whitepaper-v1.0.1.pdf#API3 tokenomics" target="api3-docs">section 5.6 _"API3 Tokenomics"_</a> of the API3 whitepaper.

### Staking

The staking utility provides a financial incentive for participating in the DAO and contributing to increase its revenue. By [staking](tokens.md#staked-tokens) your API3 tokens into the DAO pool, you take part in providing API3 users with quantifiable security in the form of insurance and receive governance voting rights.

> ![dao-pool-staking](../assets/images/dao-pool-staking.png)

API3 aims to set up, maintain, and monetize dAPIs at scale. Its success in doing so
can be estimated by its total revenue, as this will increase with the number of dAPIs
and the amount of funds secured by them. To align the governance incentives with
API3’s success, a portion of this revenue decided on by the DAO will be distributed
to stakers. This mechanic will produce positive staking incentives.

**Benefits:**
- Generate shares (tokens) in the DAO through revenue sharing from the insurance service fees.
- Improved token inflation protection compared to unstaked tokens.
- Voting privileges on DAO proposals.
  
**Risks:**
- Insurance pool funds (staked tokens) are used to cover potential financial losses from dAPI malfunctions that the dAPI consumer might incur.

To stake your tokens use the [Dashboard](dashboard/staking-tokens.md). You can stake as many times as you’d like. Your percentage of all the tokens in the insurance pool are directly related to your percentage of the rewards and the risks. If you stake 10% of the pool you earn 10% of rewards and will pay 10% of insurance claims.

### Collateral

The collateral utility has the participants share the DAO's operational risk and incentivizes them to minimize it.

If staking tokens only yielded rewards, the sole governance incentive would be to maximize the revenue. This would be done by increasing the number of dAPI users aggressively, and the amount that is secured by the dAPIs with it. Doing so puts excessive pressure on a dAPI which is more likely to malfunction due to an attack. Therefore, this is not a sustainable governance strategy for decentralized data feeds.

Exposing the governing parties to the risk that we are trying to avoid would align their incentives with that of the DAO. Then, the governing parties need to be penalized when a dAPI malfunction occurs using an onchain insurance service that provides dAPI users with quantifiable and trustless security guarantees. The [insurance service](dao-pool.md#insurance-service) uses staked token of the DAO pool as collateral, which means that when a dAPI malfunction is confirmed through the dispute resolution protocol, user damages will be covered from the staking pool.

Reference <a href="/api3-whitepaper-v1.0.1.pdf#Collateral" target="api3-docs">section 5.6.2 _"Collateral"_</a> of the API3 whitepaper.

### Governance

The governance utility gives the participants the ability to enact and manage staking and collateral.

The only way to gain representation in the API3 DAO is to stake API3 tokens in the DAO pool.  Staked tokens give their holders the right to take part in the governance of the API3 ecosystem through the API3 DAO. To vote token holders must stake their API3 tokens in the DAO pool, which also gives them access to weekly staking rewards but also share in the risk of dAPI insurance.

All governing parties will be exposed to all risks and rewards of API3, and will govern to optimize them. Inflationary rewards and the staked tokens being used as collateral will create a positive feedback loop in terms of governance quality. Initial token holders will have to stake and expose themselves to risk if they do not want to lose value to inflation. If they misgovern and lose collateral through insurance claims, these tokens will get returned to the open market, from where they will be acquired by new governing parties. In contrast, if initial token holders govern well and cause token scarcity in the market, the representation distribution will be protected. In other words, governance tokens being used as collateral results in a robust Darwinian structure that improves itself and is able to recover from failures.

## Insurance Service

API3 provides dAPI users with a quantifiable level of _security_ in the form of an
on-chain insurance service. Staked DAO pool funds are used to cover potential financial losses from dAPI malfunctions that the dAPI consumer might incur. This accomplishes two goals:

- The insurance acts as a well-defined and trustless safety net in case of a dAPI malfunction.
- It holds the governing parties responsible for dAPI malfunctions, and thus incentivizes them to govern towards more secure dAPIs.

API3 co-develop an on-chain insurance service with Kleros that provides quantifiable and trustless security to dAPI users. This insurance service will protect the dAPI user against damages caused by certain dAPI malfunctions up to a payout limit. Note that even if API3 did not provide this service, the dAPI user could have received on-chain insurance services using a third party solution. Such a solution would tend towards charging very high insurance premiums, as they would not have access to the information and expertise to accurately assess dAPI risks.

The proposed insurance service is special in the way that it is collateralized by the funds staked by the governing parties of the API3 DAO. Therefore, it not only provides _security_ to the dAPI user, but also creates a very strong incentive for dAPIs to be governed in a way that dAPI _security_ is maximized, which will further decrease insurance costs.

Reference <a href="/api3-whitepaper-v1.0.1.pdf#Insurance process" target="api3-docs">section 5.6 _"Insurance process"_</a> of the API3 whitepaper.
