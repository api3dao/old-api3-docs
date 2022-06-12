---
title: What are dAPIs?
folder: Introduction
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

_See our article,
[dAPIs: APIs for dApps](https://medium.com/api3/dapis-apis-for-dapps-53b83f8d2493)
for an overview of dAPIs, and how they relate to
[Beacons](https://medium.com/api3/beacons-building-blocks-for-web3-data-connectivity-df6ad3eb5763)._

**dAPIs** are continuously updated streams of off-chain data, such as the latest
cryptocurrency, stock and commodity prices. They can power various decentralized
applications such as DeFi lending, synthetic assets, stable coins, derivatives,
NFTs and more.

dAPIs are composed of **Beacons**, which are _first-party data feeds_. A Beacon
is a first-party data feed because it is directly powered by the owner of the
data, the API provider. Compared to third-party oracle solutions, which involve
middlemen node operators, this approach is secure, transparent, cost-efficient
and scalable. See the section below about the
[advantages of dAPIs](#advantages-of-dapis) for more information. API3
[composes](#dapi-management) dAPIs out of individual Beacons or Beacon sets, and
provides them as turn-key data feed solutions on many chains.

## DapiServer.sol

Developers use the
[DapiServer.sol](https://github.com/api3dao/airnode-protocol-v1/blob/main/contracts/dapis/DapiServer.sol)
contract to access dAPIs. `DapiServer.sol` reads directly from its data store of
Beacons, which are powered by API provider-owned and operated Airnodes.

> <img src="./assets/images/dapp-beacon.png" width="550px"/>

Each dAPI has a human-readable name (e.g., `ETH/USD`) that makes them easily
accessible using `DapiServer.sol`.

```solidity
// Calling a dAPI, such as ETH/USD, using the DapiServer contract
(value, timestamp) =
  IDapiServer(_dapiServerContractAddress).readDataFeedWithDapiName("ETH/USD");
```

See the [dApp Developers](./developers/) section to learn more about accessing
dAPIs.

## Aggregated dAPIs

dAPIs return aggregated values from underlying Beacons that live on-chain,
within the storage of `DapiServer.sol`. A dAPI can be configured to read an
individual Beacon or an aggregation of multiple Beacons.

> <img src="./assets/images/dapi-beacons.png" width="550px"/>

## Advantages of dAPIs

**Security**: Data used to update a first-party data feed is cryptographically
signed by the owner of the data. This means that the data that will update a
feed cannot be tampered with once it leaves the source. Furthermore, the API
providers host our first-party oracle node, [Airnode](../airnode/), to push the
data to the chain themselves. This makes denial of service attacks by third
parties impossible.

**Transparency**: The cryptographic signatures can be used to verify that the
data that updates a feed comes directly from a specific API provider.
Furthermore, Beacons that underlie dAPIs allow the user to inspect what exact
API endpoints are being called, and with which parameters. This provides
complete transparency to the dApp developer, which is a big step from depending
on a pseudonymous selection of third parties that intentionally obscure their
data sources.

**Cost-efficiency**: dAPIs are cost efficient compared to third-party data
feeds, as the user does not need to pay middlemen node operators for their
services. Furthermore, first-party data feeds do not require redundancy against
middlemen attacks. This makes single Beacon dAPIs feasible, and allows API3 to
provide a wide variety of data feeds in a cost-efficient way.

**Scalability**: An inherently secure and cost-efficient data feed design allows
API3 to build a large number of them, across many chains. This is supplemented
by purpose-designed Airnode protocols and relayer schemes to improve efficiency
while not degrading the security guarantees of a first-party data feed.

## dAPI management

API3 composes dAPIs out of Beacons or Beacon sets, and provides them as a
turn-key data feed service. This allows the user to not have worry about the
exact API provider to be used, the endpoint to be called or the parameters to be
used. This process is managed by API3 core technical team multisigs deployed on
the chains that API3 serves on. API3 also provides access to individual Beacons
or Beacon sets for the users that require full control over the curation of the
data feeds they use.
