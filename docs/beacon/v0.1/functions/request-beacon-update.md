---
title: requestBeaconUpdate()
---

<TitleSpan>Beacons</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

::: danger TODO:

- Needs links to sponsor and sponsorWallets.
- More on acquiring a Beacon templateId.
- If the update fails and it is important to the caller to know, how do they
  check?

:::

Anyone can trigger an update to a Beacon however doing so will incur gas costs.
Normally the Airnode that is paired with the Beacon triggers an update when the
tolerance of the Beacon's value is out of range.

To trigger an update to a Beacon's value call the function
[requestBeaconUpdate()](https://github.com/api3dao/airnode/blob/master/packages/airnode-protocol/contracts/rrp/requesters/RrpBeaconServer.sol#L184-L232).
Triggering a Beacon update does not require that the caller be whitelisted. This
is because the caller will be paying the gas costs.

## Example Code

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@api3/airnode-protocol";
import "@api3/airnode-protocol";
contract mySmartContract {
    uint64 private expirationTimestamp;
    uint192 private indefiniteWhitelistCount;

    function myRequestUpdate(
        address _beaconContractAddress,
        bytes32 _templateId,
        address _sponsor,
        address _sponsorWallet,
        bytes calldata _parameters
    ) private {
        // Calling the BeaconServer to update a Beacon.
        (expirationTimestamp, indefiniteWhitelistCount) =
            RrpBeaconServer(_beaconContractAddress).requestBeaconUpdate(
              _templateId,
              _sponsor,
              _sponsorWallet,
              _parameters
            );
    }
}
```

## Parameters

- `bytes32 templateId` - Template ID of the beacon to be updated.
- `address sponsor` - Sponsor whose wallet will be used to fulfill this request.
- `address sponsorWallet` - Sponsor wallet that will be used to fulfill this
  request.
- `bytes calldata paramters` - Parameters provided by the requester in addition
  to the parameters in the template.

## Returns

Nothing
