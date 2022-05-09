---
title: Beacon ID Scheme
---

<TitleSpan>Reference</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

<!-- See BEC-102 on the Beacon Board. -->

When accessing a Beacon's value with the [readBeacon()](../functions/read-beacon.md) function only the `beaconId` is needed by the caller to access its value. The use of a `templateId` is only required when there is a need to update a Beacon value. Usually this is called by the Beacon itself and is **not** a normal operational procedure a Beacon consumer needs to concern themselves with.

A Beacon will update itself when an allowed deviation of its current value is met. Behind every Beacon there is a single template. Additionally, behind every Beacon template there is an Airnode which returns the Beacon's value from an API endpoint. The template contains the parameters used by Airnode when calling the API endpoint. Additional Beacon parameters may be required to merge with the template for the Airnode to call an API endpoint. This entire process is completed using the function [requestBeaconUpdate()](../functions/request-beacon-update.md).

::: tip

Useless you intent to ask the Beacon to update itself, outside of its normal update process, the use of a Beacon's template will be of no concern. However to update a Beacon manually a requester will need the templateId of the Beacon when calling the [requestBeaconUpdate()](../functions/request-beacon-update.md) function.

:::

## Deriving IDs

Create a `templateId` by hashing the Airnode address, the endpointId and the parameters of the template. See the [createTemplate()](https://github.com/api3dao/airnode/blob/master/packages/airnode-protocol/contracts/rrp/TemplateUtils.sol#L17-L46) function in the monorepo.

Create a `beaconId` by hashing the `templateId` and the Beacon parameters. See the [requestBeaconUpdate()](https://github.com/api3dao/airnode/blob/master/packages/airnode-protocol/contracts/rrp/requesters/RrpBeaconServer.sol#L213) function in the monorepo.

The `templateId` cannot be derived from the `beaconId`.
