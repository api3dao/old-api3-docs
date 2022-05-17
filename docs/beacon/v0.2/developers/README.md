---
title: Getting Started
folder: dApp Developers
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

[RrpBeaconServerV0.sol](https://github.com/api3dao/airnode/blob/v0.6/packages/airnode-protocol/contracts/rrp/requesters/RrpBeaconServerV0.sol)
serves Beacon values sourced from Airnode. A Beacon is a live data point
associated with a `beaconId` which is derived from a `templateId` and additional
parameters. This is suitable where the more recent data point is always more
favorable, e.g., in the context of an asset price data feed.

Another definition of Beacons are single-Airnode data feeds that can be used
individually or combined to build decentralized data feeds or
[dAPIs](../#dapis-building-on-beacons).

- [readBeacon()](./read-beacon.md) - Returns a Beacon's value.
- [readerCanReadBeacon()](./reader-can-read-beacon.md) - Check if a reader
  address is whitelisted to read the beacon.
- [beaconIdToReaderToWhitelistStatus()](./beaconid-reader-whiteliststatus.md) -
  Details about the whitelist status of a reader address.

## Starter Project

This [beacon-reader-example](https://github.com/api3dao/beacon-reader-example)
starter project runs the unit tests of the project and steps through reading a
Beacon value from a smart contract both locally and remote. Be sure to read
through the
[README.md](https://github.com/api3dao/beacon-reader-example/blob/main/README.md)
and some of the example code such as the
[BeaconReaderExample.sol](https://github.com/api3dao/beacon-reader-example/blob/main/contracts/BeaconReaderExample.sol)
smart contract.

- [Setup](./#setup) - Clone the project and install dependencies.
- [Unit Tests](./#unit-tests) - Run tests that use a MockRrpBeaconServer
  contract to simulate reading a beacon.
- [Network: localhost](./#network-localhost) - Scripts to deploy the
  BeaconReaderExample contract to a localhost evm. Includes a script to have
  `BeaconReaderExample` read a beacon.
- [Networks: testnets](./#networks-testnets) - Scripts to deploy the
  BeaconReaderExample contract to a supported testnet. Includes a script to
  whitelist `BeaconReaderExample` and another for it to read a beacon.

### Setup

Clone or download the
[beacon-reader-example](https://github.com/api3dao/beacon-reader-example)
repository from GitHub.

```sh
git clone https://github.com/api3dao/beacon-reader-example.git
cd beacon-reader-example
```

Install the dependencies:

```sh
yarn install
```

### Unit Tests

Run tests that use a MockRrpBeaconServer contract to simulate reading a beacon
defined in the `test/` directory:

```sh
yarn run test
```

### Network: `localhost`

This section will deploy the BeaconReaderExample contract to a localhost evm.
Whitelisting the `BeaconReaderExample` contract is not required when using a
`localhost` evm. Start a local Ethereum node on a separate terminal:

```sh
yarn run eth-node
```

Open a new shell prompt and deploy `MockRrpBeaconServer`, `BeaconReaderExample`,
and mock-set a beacon value:

```sh
yarn run deploy:localhost
```

Have `BeaconReaderExample` read the mocked beacon value and print it on the
terminal:

```sh
yarn run read-beacon:localhost
```

### Networks: `testnets`

This section will use the address of a `RrpBeaconServerV0` contract already
deployed on the selected network.See
[Contract Addresses](./../reference/contract-addresses.md) for the address of
the deployed contract you wish to use. You can deploy the BeaconReaderExample
contract to one of the following networks.

- ropsten
- rinkeby
- goerli
- polygon-mumbai

Create a `credentials.json` file at the root of the repo, similar to
`credentials.example.json`. Fill in the mnemonic and the provider URL for the
chain you will be working on.

::: tip

You can replace `polygon-mumbai` in the following commands with `ropsten`,
`rinkeby` or `goerli`.

:::

Deploy `BeaconReaderExample` that is pointed to the pre-deployed
`RrpBeaconServer`:

```sh
yarn run deploy:polygon-mumbai
```

Whitelist the `BeaconReaderExample` you have deployed for the `ETH/USD` Beacon
powered by Amberdata:

```sh
yarn run whitelist-reader:polygon-mumbai
```

Have `BeaconReaderExample` read the Beacon value and print it on the terminal:

```sh
yarn run read-beacon:polygon-mumbai
```

::: tip

You can read Beacons other than `ETH/USD` by modifying
`scripts/whitelist-reader.js` and `scripts/read-beacon.js`. Refer to the
[Beacon Browser](../reference/beacon-browser.md) doc for a complete list.

:::

This should get you started on building a project that uses Beacons! Continue
reading if you want to learn more.

## Resources

- [Contract Addresses](../reference/contract-addresses.md): A list of
  `RrpBeaconServerV0` and `SelfServeRrpBeaconServerWhitelister` contract
  addresses available on specific networks.
- [Chains](../reference/chains.md): A list of chains that Beacon contracts have
  been deployed to.
- [Beacon Browser](../reference/beacon-browser.md): A list of functioning
  Beacons that have been deployed.

## Solidity Videos

The following short videos are relevant to smart contracts when calling other
contracts such as `RrpBeaconServerV0.sol`.

- [Call contract with an interface](https://www.youtube.com/watch?v=tbjyc-VQaQo)
- [Call other contracts](https://www.youtube.com/watch?v=6aQErpWPLbk)
