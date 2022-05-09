---
title: beaconIdToReaderToWhitelistStatus()
---

<TitleSpan>Functions</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

For on-chain smart contracts, the function [beaconIdToReaderToWhitelistStatus()](https://github.com/api3dao/airnode/blob/master/packages/airnode-protocol/contracts/rrp/requesters/RrpBeaconServer.sol#L363-L383) returns detailed whitelisting status for the `reader` and `beaconId` parameters.

::: tip Get Whitelisted

Please contact the [API3 Business Development API Team](https://api3dao.typeform.com/to/O1Uvxc8m) about Beacon whitelisting.

:::

## Example Code

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@api3/airnode-protocol/contracts/rrp/requesters/interfaces/IRrpBeaconServer.sol";
contract mySmartContract {

  function myReadableDetails(
    bytes32 _beaconId
    address _beaconContractAddress
  ) external {
    uint64 private expirationTimestamp;
    uint192 private indefiniteWhitelistCount;

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

- `uint64 private expirationTimestamp` - Timestamp at which the whitelisting of the reader will expire.
- `uint192 indefiniteWhitelistCount` - Number of times `reader` was whitelisted indefinitely for `beaconId`. A reader is indefinitely whitelisted by the whitelist manager account or by any other account that has the [<span style="overflow-wrap: break-word;">INDEFINITE_WHITELISTER_ROLE_DESCRIPTION</span>](https://github.com/api3dao/airnode/blob/6d902da259ec3084c8f4764cadc74e270e5c7162/packages/airnode-protocol/contracts/whitelist/WhitelistRoles.sol#L32-L33) role. Each time an authorized account indefinitely whitelists the reader a recorded counter is incremented. When the reader's whitelist status is revoked then the counter is decremented. This means that as long as the counter (`indefiniteWhitelistCount`) is greater than 0 the reader is whitelisted indefinitely.

When the `address` has not been whitelisted this function returns:

```bash
expirationTimestamp   uint64 :  0
indefiniteWhitelistCount   uint192 :  0
```
