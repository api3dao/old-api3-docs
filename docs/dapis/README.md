---
title: What are dAPIs?
folder: Introduction
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

_See the article,
[dAPIs: APIs for dApps](https://medium.com/api3/dapis-apis-for-dapps-53b83f8d2493)
for an overview of dAPIs, and how they relate to
[Beacons](https://medium.com/api3/beacons-building-blocks-for-web3-data-connectivity-df6ad3eb5763)._

**dAPIs** are continuously updated streams of off-chain data, such as the latest
cryptocurrency, stock and commodity prices. They can power various decentralized
applications such as DeFi lending, synthetic assets, stable coins, derivatives,
NFTs and more.

dAPIs are composed of **Beacons**, which are _first-party data feeds_. A Beacon
is directly powered by the owner of the data, the API provider. Compared to
third-party oracle solutions, which involve middlemen node operators, this
approach is secure, transparent, cost-efficient and scalable. API3 composes
dAPIs out of Beacons, and provides them as turn-key data feed solutions on many
chains.

## `DapiServer.sol`

Developers use the
[`DapiServer.sol`](https://github.com/api3dao/airnode-protocol-v1/blob/main/contracts/dapis/DapiServer.sol)
contract to access dAPIs. `DapiServer.sol` reads directly from its data store of
Beacons, which are powered by API provider-owned and operated
<router-link :to="$themeConfig.latestVersions.airnode">Airnodes</router-link>.

> <img src="./assets/images/dapp-beacon.png" width="550px"/>

A dAPI can be configured to read an individual Beacon or an aggregation of
multiple Beacons.

> <img src="./assets/images/dapi-beacons.png" width="550px"/>

Each dAPI has a human-readable name (e.g., `ETH/USD`) that makes them easily
accessible using `DapiServer.sol`.

```solidity
// Reading the ETH/USD dAPI using the DapiServer contract
(value, timestamp) =
  IDapiServer(_dapiServerContractAddress).readDataFeedWithDapiName("ETH/USD");
```

See the [dApp Developers](./developers/) section to learn more about accessing
dAPIs.

## dAPI Composition

API3 composes dAPIs out of individual Beacons and Beacon sets, and provides them
as turn-key data feed services. Users need not worry about the exact API
provider used, the endpoint called, or the parameters used. This process is
managed by the API3 core technical team multisigs deployed on the chains that
dAPIs are provided on. API3 also provides access to individual Beacons or Beacon
sets for the users that require full control over the curation of the data feeds
they use.
