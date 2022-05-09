---
title: requestBeaconUpdate()
---

<TitleSpan>Functions</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

Anyone can trigger an update to a Beacon however doing so will incur gas costs. Normally the Airnode that is paired with the Beacon triggers an update when the tolerance of the Beacon's value is out of range.

To trigger an update to a Beacon's value call the function [requestBeaconUpdate()](https://github.com/api3dao/airnode/blob/master/packages/airnode-protocol/contracts/rrp/requesters/RrpBeaconServer.sol#L184-L232). Triggering a Beacon update does not require that the caller be whitelisted. This is because the caller will be paying the gas costs.

There are two requirements for `requestBeaconUpdate()` to be called:

1. The [sponsor](../../../airnode/v0.5/concepts/sponsor.md) must call [setSponsorshipStatus()](https://github.com/api3dao/airnode/blob/master/packages/airnode-protocol/contracts/rrp/AirnodeRrp.sol#L36-L58) of the AirnodeRrp contract to sponsor the RrpBeaconServer contract.

2. The sponsor must call [setUpdatePermissionStatus()](https://github.com/api3dao/airnode/blob/master/packages/airnode-protocol/contracts/rrp/requesters/RrpBeaconServer.sol#L169-L182) of the RrpBeaconServer contract to give request update permission to the user of this method. The template and additional parameters used here must specify a single point of data of type `int256` and an additional timestamp of type `uint256` to be returned because this is what `fulfill()` expects. This point of data must be castable to `int224` and the timestamp must be castable to `uint32`.

## Example Code

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@api3/airnode-protocol/contracts/rrp/requesters/interfaces/IRrpBeaconServer.sol";
contract mySmartContract {

   function myRequestUpdate(
      address _beaconContractAddress,
      bytes32 _templateId,
      address _sponsor,
      address _sponsorWallet,
      bytes calldata _parameters
   ) external {

      // Calling the BeaconServer to update a Beacon.
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

`requestBeaconUpdate( bytes32 _templateId, address _sponsor, address _sponsorWallet, bytes calldata _parameters )`

- `bytes32 templateId` - Template ID of the beacon to be updated.
- `address sponsor` - Sponsor whose wallet will be used to fulfill this request.
- `address sponsorWallet` - Sponsor wallet that will be used to fulfill this request.
- `bytes calldata parameters` - Parameters provided by the requester in addition to the parameters in the template.

## Returns

Nothing

It may be important to the caller of `requestBeaconUpdate()` to determine if the requested update failed. There are three probable methods to check.

1. The caller should check the `timestamp` returned by `readBeacon()` function to be sure it is fresh enough.

2. If a more accurate determination is required, call `readBeacon()` and acquire the `timestamnp`, then call `requestBeaconUpdate()`. The next call to `readBeacon()` should have a newer `timestamp`.

3. Use an off-chain app that subscribes to events of `RrpBeaconServer.sol`.
