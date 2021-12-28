---
title: beaconIdToReaderToWhitelistStatus()
---

<TitleSpan>Beacons</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

For on-chain smart contracts, the function
[beaconIdToReaderToWhitelistStatus()](https://github.com/api3dao/airnode/blob/master/packages/airnode-protocol/contracts/rrp/requesters/RrpBeaconServer.sol#L322-L342)
returns detailed whitelisting status for the reader address and the beaconID
parameters. Please contact the
[API3 Business Development API Team](https://api3.org) to be whitelisted.

Calling from off-chain code (_using a library such as `ether.js`_) is not
subject to whitelisting. Off-chain code is beyond the scope of this doc.

## Example Code

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@api3/airnode-protocol";
contract mySmartContract {
    uint64 private expirationTimestamp;
    uint192 private indefiniteWhitelistCount;

    function myReadableDetails(address _contractAddress, bytes32 beaconId) private {
        // Calling the BeaconServer for detailed whitelist status
        // where "this" is the contract address of this contract (mySmartContract).
        (canRead) = RrpBeaconServer(_contractAddress).beaconIdToReaderToWhitelistStatus(beaconId, this);
    }
}

```

## Parameters

`readerCanReadBeacon(bytes32 beaconId, address reader)`

- `bytes32 beaconId` - The ID of the beacon.
- `address reader` - The address to get the whitelist details for.

## Returns

- `uint64 private expirationTimestamp` - Timestamp at which the whitelisting of
  the reader will expire.
- `uint192 indefiniteWhitelistCount` - Number of times `reader` was whitelisted
  indefinitely for `templateId`.

::: danger TODO:

- What is returned if the reader is not whitelisted for the Beacon ID?
- The return value `indefiniteWhitelistCount` needs a better explanation.

:::
