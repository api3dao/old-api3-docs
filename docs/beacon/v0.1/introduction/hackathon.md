---
title: ETHDenver - Feb 2022
---

<TitleSpan>Introduction</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Experience API3 **Beacons** at ETHDenver (February 11-20, 2022) during
[#BUIDLWEEK](https://www.ethdenver.com/buidlweek).

## Versions

API3 has set up Beacons (supported by Airnodes) using the following versions.

- Airnode version `v0.3.1`
- Beacon version `v0.1.0`

Access Beacons using the `RrpBeaconSerever.sol` contract. Specific network
addresses for the contract are in the
[Contract Addresses](../reference/contract-addresses.md) doc. For _#BUIDLWEEK_
please use either the Goerli or Mumbai network.

## Amberdata Beacons

[Amberdata](https://amberdata.io) has connected some of their great API
endpoints to API3 Beacons for _#BUIDLWEEK_. They are available on the Goerli and
Mumbai networks. See the [Beacon IDs](../reference/beacon-ids.md) doc for a list
of beaconIds used to access Beacon values with the RrpBeaconServer.sol contract
function [readBeacon()](../functions/read-beacon.md).

## Beacon Whitelisting

::: warning Please Note

For _#BUIDLWEEK_ you do not need to contact the API3 Business Development Team
for access to the Amberdata Beacons mentioned above. You can whitelist yourself
on the Goerli or Mumbai networks using [etherscan](https://etherscan.io/).

:::

::: danger TODO:

- Get the URL to the etherscan whitelist contract.
- Add instructions on the function to call to self whitelist.

:::
