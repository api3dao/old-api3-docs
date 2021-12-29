---
title: requestBeaconUpdate()
---

<TitleSpan>Beacons</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

::: danger TODO:

Incomplete

:::

Anyone can trigger an update to a Beacon however doing so will incur gas costs.
Normally the Airnode that is paired with the Beacon triggers an update when the
tolerance of the Beacon's value is out of range.

To trigger an update to a Beacon's value call the function
[requestBeaconUpdate()](https://github.com/api3dao/airnode/blob/master/packages/airnode-protocol/contracts/rrp/requesters/RrpBeaconServer.sol#L184-L232).
Triggering a Beacon update does not require that the caller be whitelisted. This
is because the caller will be paying the gas costs to do so.

## Example Code

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@api3/airnode-protocol";


```

## Parameters

## Returns
