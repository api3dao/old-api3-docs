---
title: readerCanReadBeacon()
---

<TitleSpan>Functions</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

For on-chain smart contracts, the function
[readerCanReadBeacon()](https://github.com/api3dao/airnode/blob/master/packages/airnode-protocol/contracts/rrp/requesters/RrpBeaconServer.sol#L349-L361)
returns true if the `reader` parameter can access the `beaconId` parameter
meaning that the reader address has been whitelisted. Please contact the
[API3 Business Development API Team](https://api3.org) to be whitelisted.

Calling from off-chain code (_using a library such as `ether.js`_) is not
subject to whitelisting. Off-chain code is beyond the scope of this doc.

## Example Code

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@api3/airnode-protocol/contracts/rrp/requesters/interfaces/IRrpBeaconServer.sol";
contract mySmartContract {


  function myVerifyReadable(
    address _beaconContractAddress,
    bytes32 _beaconId
  ) external {
    bool private canRead;

    // Calling the BeaconServer for reader status
    // where "this" is the contract address of this contract (myVerifyReadable).
    (canRead) =
      RrpBeaconServer(_beaconContractAddress).readerCanReadBeacon(_beaconId, this);
  }
}

```

## Parameters

`readerCanReadBeacon(bytes32 beaconId, address reader)`

- `bytes32 beaconId` - The ID of the beacon.
- `address reader` - The address to verify such as the reader's smart contract
  address or another address.

## Returns

- `bool` - Whether the address passed is whitelisted and therefore can read the
  Beacon ID passed.
