---
title: The Airnode
---

# {{$frontmatter.title}}

<VersionWarning/>
<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

Airnode is a serverless oracle node implemented with a "set and forget" philosophy. Airnode is composed of two parts: the off-chain **Airnode** (a.k.a. "the node") deployed as self hosted or cloud provider functions (e.g., AWS) and the on-chain **protocol contract** AirnodeRrp.sol.

> ![2-parts](./assets/images/summary-airnode-2-parts.png) <br/><br/>
> 
> <p class="diagram-line" style="color:black;">Airnode is composed of two parts: the off-chain Airnode (a.k.a. "the node") deployed usually as cloud provider functions (e.g., AWS) and the on-chain protocol contract  AirnodeRrp.sol.</p>
At its core, **Airnode** brings the ability for API providers to easily run their own _oracle nodes_. This allows them to provide their data on-chain, without an intermediary, to any _decentralized app_ \(dApp\) interested in their services.

At the heart of this mechanism sits **Airnode**, an open-source oracle node. It's designed to be easily deployed by any API provider with almost no maintenance. Because of Airnode, dApp developers can write _smart contracts_ to interact with the on-chain data of API providers.

Airnode is designed with mechanisms to remove the on-chain or off-chain concerns of API providers. The set-and-forget framework of Airnode is all about ease of implementation.

::: tip

Learn more about Airnode experience. Read Section 4 of the
<a href="/api3-whitepaper-v1.0.2.pdf#Airnode:%20A%20Node%20Designed%20for%20First-Party%20Oracles" target="_api3-whitepaper">API3
Whitepaper</a>, _Airnode: A Node Designed for First-Party Oracles_

:::

## Designed for First-Party Oracles

First-party oracles are integral to the API3 solution. This means each API is served by an oracle that is operated by the entity that owns the API, rather than a third party. This doc discusses the benefits of using first-party oracles, why it is not feasible for API providers to operate their own oracles with current available solutions and how to solve this problem with Airnode.

## Benefits of Disintermediation

There is a simple solution to intermediaries: First-party oracles; that is, oracles operated by the API providers themselves. API providers operating their own oracles means they would be signing their responses with their private keys at the smart contract platform protocol-level, which is the best proof that the data is not tampered with. Moreover, first-party oracles are private by default, as a third party cannot observe the raw data from the API being processed, which allows them to be used in a wider variety of use cases natively.

A data feed composed of first-party oracles would be more cost-efficient compared to one employing middlemen, as one needs to pay middlemen both for their services and to incentivize them against attacking the data feed (referred to as the middleman tax). In addition, a data feed composed of first-party oracles will need fewer oracles, as it would not need over-redundant decentralization at the oracle level to protect against attacks from third-parties. Assuming that each API is typically served by at least two third-party oracles, data feeds powered by first-party oracles would be at least 50% more efficient in terms of gas costs, by a conservative estimate.

First-party oracles also provide much needed transparency in terms of the data source and the degree of decentralization. Since each API provider will operate an oracle—which will be visible on-chain—the number of oracles serving a data feed will accurately represent how decentralized it is, as there is a one-to-one mapping between oracle and data source. Furthermore, the API providers would publish their on-chain identities through off-chain channels, which would allow the users to verify whose data they are consuming at a given time.

Finally, having the API providers operate the oracles helps solves the legal issues as the API services no longer need to be licensed to a third party and the API providers receive the entire revenue. Furthermore, this solves the rent-seeking third-party oracles problem, and allows the funds to be redirected to the group that is doing the heavy lifting, the API providers. Incentivizing API providers aligns their financial interests with the ones of the API3 ecosystem, resulting in a strong mutual bond between the two.

## Off-Chain Signing of Data

There is a hybrid solution that still depends on third-party oracles, yet does not let them tamper with the data. In this scheme, the API provider signs their data with their private key off-chain and serves it over a regular API endpoint. Third party oracles call this endpoint to get the signed data and post it to the chain. The authenticity of the data — that it is not tampered with by the third party oracles — can then be verified on-chain using the public key of the API provider.

Although it eliminates the risk of data tampering at the oracle level, this solution is essentially a half-measure. By depending on third-party oracles, it continues suffering from the ecosystem issues caused by depending on third-party oracles, and, in addition, requires modifications at the API-side to implement off-chain signing. This results in a severely limited API selection even compared to the regular third party oracle based solutions, and restricts the ecosystem growth potential of the solution to the application-scale.

## Barriers to API Providers Operating Oracles

During work from the past, API3 communicated with API providers extensively and observed the following barriers to oracle onboarding and operation:

1. Traditional API providers are typically not more familiar with blockchain technologies than the general public. This applies even for the ones that curate cryptocurrency market data—as their main operation is collecting data from exchange APIs, processing them, and serving the result through their own APIs—which does not require any blockchain-specific know-how. Therefore, they typically cannot readily operate an oracle node with in-house resources.

2. There is no job market for oracle node operators. Even if some API providers were to obtain the specific know-how needed by hiring the few node operators that are available, this would not be a scalable solution.

3. Operating an oracle node consumes a lot of resources in the form of manhours and infrastructure costs. Unless one is guaranteed significant subsidies or future profits, operating an oracle node is financially infeasible.

4. Operating an oracle node requires the API provider to transact with cryptocurrencies. Specifically, they must pay for gas costs in the native currency (e.g., ETH) and receive payments in one or more cryptocurrencies. This disqualifies the vast majority of API providers due to compliance, legal and accounting reasons. In addition, any scheme that requires API providers to stake funds is categorically rejected for similar financial risk-related reasons.

## Airnode Features

Airnode is a fully-serverless oracle node that is designed specifically for API providers to operate their own oracles. It addresses many of the oracle node-related issues API provider face:

1. It does not require any specific know-how to operate. In fact, it is difficult to even speak of an operation, as Airnode is designed to be completely set and forget.

2. It does not require any day-to-day maintenance such as updating the operating system or monitoring the node for uptime owing to existing fully managed serverless technology. It is designed to be stateless, which makes it extremely resilient against any problem that can cause permanent downtime and require node operator intervention.

3. It is built on services priced on-demand, meaning that the node operator is charged only as much as their node is used. This allows any API provider to run an oracle for free and start paying only after they start generating revenue.

4. It does not require the node operator to handle cryptocurrency at all. Its protocol is designed in a way that the requester covers all gas costs.

One way to see Airnode is as a lightweight wrapper around a Web API that allows it to communicate with smart contract platforms with no overhead or payment token friction. Regarding the level of involvement required from the API provider, using Airnode can be likened to utilizing an API gateway that makes an API accessible over the Web, rather than operating a blockchain node as a side-business. The intent is for Airnode to become as ubiquitous and mundane for APIs as using an API gateway, which will make a vast variety of first-party oracles available to API3.

API providers invest significant resources to build a highly available infrastructure. It is important for the oracle node implementation to not contain single points of failure that may cause downtime. Existing solutions using third-party oracles depend on over-redundancy at the oracle level to cover for this, which results in excessive costs. API3 envisions each API to only be served by its first-party oracle, which means the redundancy has to be implemented at the level of the individual Airnode. The node being fully-serverless enables this to be done easily across different availability zones of a single cloud provider, or even across multiple cloud providers. It should also be mentioned that it will be possible to containerize Airnode and operate it on-premises, yet using the serverless version will be recommended for almost all use cases.

Airnode is developed by the founding members of API3 and is now open-sourced. The software is feature-complete for current protocols, and further development will be funded by API3 in the form of grants.

## Airnode Protocol

Preferring the better specified API connectivity problem over the oracle problem, API3 believes that an oracle node should be designed to interface APIs to smart contract platforms very well, rather than as a sandbox that can purportedly be used for any purpose imaginable. Based on this philosophy, the Airnode protocol is designed to follow the self-emergent patterns used by APIs to achieve as transparent and frictionless of an API–smart contract platform interface as possible.

The first and the most commonly used API style follows the request–response pattern, where the user makes a request with parameters and the API responds as soon as possible. This will be the first pattern that Airnode will support, as it is easy to standardize and integrate with existing APIs that follow the same pattern. An example use case of this scheme would be requesting the result of a specific match to be delivered, which can be used to resolve the respective prediction market. In addition, Airnode is planned to support the publish–subscribe pattern, where the user requests the oracle to call back a specific method when parametrized conditions are met. For example, a decentralized exchange may request the oracle to trigger a liquidation event for a user in a leveraged position when ETH price drops below a particular price. Either of these patterns can be used to implement the live data feeds that DeFi applications use today, but they can also support a much larger variety of use cases in the form of dAPIs.

The Airnode protocol is designed in a way that the request contract's sponsor assumes all gas costs, even including the request fulfillment (response) transactions. This is achieved by each Airnode having a separate wallet for each sponsor, similar to how cryptocurrency exchanges automatically designate wallets for users to deposit funds to. The sponsor funds this wallet with the native currency (e.g., ETH), either in a lump sum or through per-request microtransactions. The funds in this wallet are used to fulfill all of the following requests made by the sponsor. This scheme has significant advantages:

- The volatility in gas costs and payment token prices (e.g., LINK) makes it virtually impossible for oracles to set profitable yet competitive prices. Calculating prices dynamically on-chain requires multiple data feeds and adds a significant gas overhead per-request. With the Airnode protocol, the API providers do not have to concern themselves with gas costs, and can use pricing schemes such as $0.1 per call or $100 per month, which is similar to typical API pricing models.

- It is not reasonable to expect API providers to be able to convert fiat into cryptocurrency and fund their node wallets as a part of their day-to-day operations. In this scheme, the node operator never has to think about their node wallet balance.

- As seen in an attack performed on an Airnode competitor's data feeds, oracle nodes that use a common wallet to fulfill requests are susceptible to attackers spamming requests to drain their wallets. The solution to this is for the node operators to maintain a whitelist of trusted addresses that they will accept requests from. In addition to the difficulty of determining which contracts are supposed to be trusted in this context, this renders any kind of public listing service practically infeasible. This is a critical issue, as it stops the little independent ecosystem growth there is dead in its tracks. Airnode is not susceptible to this type of an attack, as a sponsor's designated wallet is only used to fulfill requests from the said sponsor, and cannot be drained by others.

- Traditional oracle nodes have to fulfill all requests with very high gas prices, as they cannot tolerate their transaction queue being blocked by a single transaction made with a low gas price. With the Airnode protocol, this is no longer a concern, as each sponsor will have a separate transaction queue. Then, sponsors whose requests are not time-critical would be able to provide the fulfillment gas price as a request parameter and enjoy service at a much lower gas cost. This scheme can be expected to synergize with EIP-1559.

Finally, let us briefly mention how the Airnode protocol approaches monetization. It is common for a project-specific token to be worked into the core of the protocol in an attempt to ensure that the said token is needed. However, this induces an enormous gas price overhead, severely restricts alternative monetization options and creates overall friction. For these reasons, the Airnode protocol purposefully avoids using such a token. Instead, the node operator is allowed to associate custom authorizer contracts to their oracle endpoints, which essentially decide if a requester should be responded to based on any criteria that can be implemented on-chain. The authorizer contracts can be used to enforce whitelists, blacklists, monthly subscription payments or per-call fees. This scheme is both very flexible, and is implemented in a way that does not add any gas cost overheads. Although dAPI monetization is a completely independent matter, the flexibility that Airnode provides will carry over, e.g., it will be possible to implement a dAPI where the users assume all gas costs, which is not possible with the existing oracle solutions.

## API Integrations

There is a chicken-and-egg problem when it comes to integrating APIs to oracles. If there is no existing demand for an API in an oracle ecosystem, nobody is incentivized to do the integration. If the API is not available due to a lack of integration, nobody develops applications that will create the demand.

For API3 to reach its full potential, it will need hundreds, if not thousands of first party oracles so that it can easily set up new dAPIs or recompose existing ones. This can only be achieved if APIs can be integrated to Airnode in an even more scalable way. To this end, an improved version of the proprietary integration tools will be open sourced for Airnode. Borrowing from the [OpenAPI Specification format](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md), Oracle Integration Specifications (OIS) define the operations of an API, the endpoints of an oracle, and how the two map to each other. An Airnode user will be able to serve an API over their oracle simply by providing its OIS to their node. Integrations made in this standardized format will be very easy to collect, version and distribute.

OIS is a JSON file, primarily designed to describe the integration specifications for Airnode to use. This means that it does not aim to be human-readable first and creating it manually to specify an integration would be difficult. This problem will be solved by ChainAPI (a product from API3 currently in development), an integration platform that will allow users to generate OIS for their APIs through an easy-to-use graphical interface. This will be accompanied by other quality of life improvements for Airnode users, such as a node dashboard and a marketplace to list their endpoints. As a result, API3 will have a wide selection of first-party oracles to compose dAPIs from and ecosystem growth will no longer be bottle necked by integration capacity.
