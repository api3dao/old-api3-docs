---
title: What is API3?
---

# {{$frontmatter.title}}

[[toc]]

**API3** ([https://api3.org](https://api3.org)) is a collaborative project to deliver traditional API services to smart contract platforms in a decentralized and trust-minimized way. It is governed by a decentralized autonomous organization (DAO), namely the **API3 DAO** ([https://dao.api3.org](https://dao.api3.org)). Therefore, its code is open source and its operations are transparent.

## Thesis Statement

The vast majority of the external integrations that decentralized applications need are to commercial Web APIs that traditional businesses have built to monetize their data and services.

Therefore, what is widely known as _the oracle problem_ is in practice _the API connectivity problem_.

Existing oracle solutions fall short because they fail to make this distinction, resulting in inferior solutions that depend on third-party oracles and ecosystems that exclude API providers. By refining the definition of the problem, **API3** aims to provide a much more optimal solution.

::: tip
For a detailed discussion of the API3project, read the [PDF Whitepaper](https://raw.githubusercontent.com/api3dao/api3-whitepaper/master/api3-whitepaper.pdf).
:::

## The Airnode

As you'll learn throughout this documentation, at its core **API3** brings the ability for API providers to easily run their own Oracle nodes allowing them to provide their data on-chain without any intermediary to any Decentralized App \(dApp\) interested by those data.

At the heart of this mechanism sits **Airnode**, our open-source Oracle node.  
It's designed to be easily deployed by any API Provider with almost no maintenance.

Then any dApp developer can write Smart Contracts to interact with the on-chain data of the API Provider provided by **Airnode**.

Since it is wanted to not overload in any means the API Providers with on-chain or off-chain concerns for providing their data on-chain, **Airnode** is designed with some mechanisms that allow this easiness.

::: tip
This documentation is all about explaining those mechanisms.
:::

::: tip
It's recommended to have read the chapter 4 of the whitepaper: _Airnode: A Node Designed for First-Party Oracles_
:::

## Learn More about API3

<!-- START TAB BOX -->
:::: tabs
::: tab API3 Website
Our website \([https://api3.org/](https://api3.org/)\) is still the best place to learn more.
:::

::: tab The White Paper
**Abstract**

With decentralized applications beginning to provide meaningful services in areas such as decentralized finance, there is an increasing need for these applications to receive data or trigger events using traditional Web APIs.

However, the generic oracle solutions fail to appropriately address the API connectivity problem due to an over-generalized and misguided approach. To remedy this issue, API3 will drive a collaborative effort to create a new generation of blockchain-native, decentralized APIs, or dAPIs for short.

dAPIs are composed of first-party oracles operated by API providers, and thus are more secure and cost-efficient than alternative solutions that employ middlemen. At the core of the governance, security, and value capture mechanics of this initiative will be the API3 token. Staking the token will grant its holders full governing rights over the API3 DAO along with all the associated rewards.

Staked API3 tokens will be used as collateral for the on-chain insurance service that will provide quantifiable and trustless security guarantees to dAPI users. These mechanics will remove the need for a central authority at the ecosystem level. As a result, the API3 Project will allow smart contract platforms to leverage APIs for the building of meaningful applications in a truly decentralized and trust-minimized way.

**Link to the Full PDF Version**

For a detailed discussion of the project, check the full version of the whitepaper [in PDF here](https://raw.githubusercontent.com/api3dao/api3-whitepaper/master/api3-whitepaper.pdf).
:::

::: tab Blog Posts
For people that are not comfortable with academic-style papers📜   
That's fine👌  
The following Blog Posts explain the Whitepaper in smaller digestible pieces.

**About our journey: Getting APIs on the Blockchain**

1. [APIs: The Digital Glue](https://medium.com/api3/apis-the-digital-glue-7ac87566e773)
2. [The API Connectivity Problem](https://medium.com/api3/the-api-connectivity-problem-bd7fa0420636)
3. [First-Party vs Third-Party Oracles](https://medium.com/api3/first-party-vs-third-party-oracles-90356e3cffe5)
4. [Where are the first-party oracles?](https://medium.com/api3/where-are-the-first-party-oracles-5078cebaf17)
5. [Staking & oracles](https://medium.com/api3/staking-oracles-c91f2f5bcf6d)
6. [Why security must be quantified](https://medium.com/api3/why-security-must-be-quantified-3d2dd06c4909)
7. [On DAOs: Decentralized Autonomous Organizations](https://medium.com/api3/on-daos-decentralized-autonomous-organizations-84c00abb89bc)
8. [API3: The Glue Connecting the Blockchain to the Digital World](https://medium.com/api3/api3-the-glue-connecting-the-blockchain-to-the-digital-world-129e61ec598f)

**About Airnode: The first-party oracle node**

1. [Airnode: The API gateway for blockchains](https://medium.com/api3/airnode-the-api-gateway-for-blockchains-8b07ff136840)
2. [Getting to know Airnode](https://medium.com/api3/getting-to-know-airnode-162e50ea243e)

**About the Governance**

* [API3 Builder Terminology](https://medium.com/api3/api3-builder-terminology-dd398fe447c3)
* [API3 Tokenomics Update](https://medium.com/api3/api3-tokenomics-update-f032d6e49b30)
* [Announcing Monolith \#1: Authoritative API3 DAO](https://medium.com/api3/announcing-monolith-1-authoritative-api3-dao-ec9ca6d044f8)
* [API3 Operations](https://medium.com/api3/api3-operations-a35c93a3a9d)

**Standalone Posts**

* [API3 — Decentralized APIs for the Decentralized Web](https://medium.com/api3/api3-decentralized-apis-for-the-decentralized-web-d711f47190ac)
* [The Gordian Knot called “The Oracle Problem”](https://medium.com/api3/the-gordian-knot-called-the-oracle-problem-e9731c55da13)
* [AI Winter, Oracle Frost](https://medium.com/api3/ai-winter-oracle-frost-4fffe9bfdb95)
* [The Race to First-Party Oracles](https://medium.com/api3/the-race-to-first-party-oracles-87fab596e906)
* [Is API3 the ‘Chainlink Killer’?](https://medium.com/api3/is-api3-the-chainlink-killer-3bd59f93c895)

**All the Blog Posts**

You can find all our blog posts on our [Medium page here](https://medium.com/api3)
:::

::: tab Communities
💬 &nbsp;&nbsp; Feel free to join our Community Chat on [Telegram](https://t.me/API3DAO)

💻 &nbsp;&nbsp; Feel free to join our Developer Chat on [Discord](https://discord.gg/qnRrcfnm5W)

💬 &nbsp;&nbsp; Feel free to join our DAO Chat on the [DAOtalk Forum](https://daotalk.org/c/daos/api3-dao/37)
:::

::: tab GitHub
On our Github Page \([https://github.com/api3dao](https://github.com/api3dao)\) you will find everything about.. everything.

Indeed, as stated from the beginning, there we have repositories about:

* the whitepaper
* the codes
* the docs \(including this very one\)
* some examples

Feel free to contribute. &nbsp;👍
:::
::::
<!-- END TAB BOX -->

## Contributing

At **API3** we are open to any proposals and improvements.

Feel free to contribute by:

* opening issues
* making pull requests
* proposing features

::: tip
You can read more about contributing in the [Contributing](./contributing.html) section
:::



