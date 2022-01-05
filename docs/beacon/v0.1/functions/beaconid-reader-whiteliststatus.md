---
title: beaconIdToReaderToWhitelistStatus()
---

<TitleSpan>Beacons</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

::: danger TODO:

- The return value `indefiniteWhitelistCount` needs a better explanation.

:::

For on-chain smart contracts, the function
[beaconIdToReaderToWhitelistStatus()](https://github.com/api3dao/airnode/blob/master/packages/airnode-protocol/contracts/rrp/requesters/RrpBeaconServer.sol#L322-L342)
returns detailed whitelisting status for the `reader` and `beaconId` parameters.
Please contact the [API3 Business Development API Team](https://api3.org) to be
whitelisted.

## Example Code

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@api3/airnode-protocol";
contract mySmartContract {
    uint64 private expirationTimestamp;
    uint192 private indefiniteWhitelistCount;

    function myReadableDetails(
      bytes32 _beaconId
      address _beaconContractAddress
    ) private {
        // Calling the BeaconServer for detailed whitelist status
        // where "this" is the contract address of this contract (myReadableDetails).
        (expirationTimestamp, indefiniteWhitelistCount) =
            RrpBeaconServer(_beaconContractAddress).beaconIdToReaderToWhitelistStatus(
              _beaconId,
              this
            );
    }
}
```

## Parameters

`beaconIdToReaderToWhitelistStatus(bytes32 beaconId, address reader)`

- `bytes32 beaconId` - The ID of the beacon.
- `address reader` - The address to get the whitelist details for.

## Returns

- `uint64 private expirationTimestamp` - Timestamp at which the whitelisting of
  the reader will expire.
- `uint192 indefiniteWhitelistCount` - Number of times `reader` was whitelisted
  indefinitely for `templateId`.

When the `address` has not been whitelisted this function returns:

```bash
expirationTimestamp   uint64 :  0
indefiniteWhitelistCount   uint192 :  0
```
