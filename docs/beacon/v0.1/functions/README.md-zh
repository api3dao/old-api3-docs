---
title: Overview
---

<TitleSpan>Functions</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

[RrpBeaconServer.sol](https://github.com/api3dao/airnode/blob/master/packages/airnode-protocol/contracts/rrp/requesters/RrpBeaconServer.sol) serves Beacon values sourced from Airnode. A Beacon is a live data point associated with a `beaconId` which is derived from a `templateId` and additional parameters. This is suitable where the more recent data point is always more favorable, e.g., in the context of an asset price data feed.

Another definition of Beacons are single-Airnode data feeds that can be used individually or combined to build decentralized data feeds or [dAPIs](../#dapis-building-on-beacons).

- [readBeacon()](./read-beacon.md) - Returns a Beacon's value.
- [readerCanReadBeacon()](./reader-can-read-beacon.md) - Check if a reader address is whitelisted to read the beacon.
- [beaconIdToReaderToWhitelistStatus()](./beaconid-reader-whiteliststatus.md) - Details about the whitelist status of a reader address.
- [requestBeaconUpdate()](./request-beacon-update.md) - Triggers an update to a Beacon's value.

## Creating a starter project

### Using a CLI tool

The easiest way to create a new project is by running a CLI tool, which generates the minimal project files that will get you started with building your application based on beacons. Simply run:

```
npm exec --package @api3/services --call create-beacon-reader-app
```

The CLI tool will ask you for path in which to initialize the project and template on which the project files are based. As of now, there is only one template to choose (using javascript + hardhat), but there will be more templates in the future. You can also show help or pass the arguments directly:

```
# To show help
npm exec --package @api3/services --call "create-beacon-reader-app --help"
# To provide the path and template directly through CLI
npm exec --package @api3/services --call "create-beacon-reader-app  --path=./my-app --template=javascript-ethers-hardhat"
```

::: warning Git needed

In order to install the `@api3/services` repository you need to have `git` installed.

:::

### Clone or download an existing repo

Alternatively, you can clone or download the [beacon-reader-example](https://github.com/api3dao/beacon-reader-example) repository from GitHub. This project was created by the services CLI tool mentioned above.

This starter project steps through reading a Beacon value from a smart contract. Be sure to read through the [README.md](https://github.com/api3dao/beacon-reader-example/blob/main/README.md) and some of the example code such as the [BeaconReaderExample.sol](https://github.com/api3dao/beacon-reader-example/blob/main/contracts/BeaconReaderExample.sol) smart contract.

## RrpBeaconServer Contract Addresses

See the [Contract Addresses](../reference/contract-addresses.md) doc for a list of addresses available on specific networks.

## Solidity Videos

The following short videos are relevant to smart contracts when calling other contracts such as `RrpBeaconServer.sol`.

- [Call contract with an interface](https://www.youtube.com/watch?v=tbjyc-VQaQo)
- [Call other contracts](https://www.youtube.com/watch?v=6aQErpWPLbk)
