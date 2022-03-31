---
title: Endpoint
---

<TitleSpan>Concepts and Definitions</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

Airnode serves APIs to blockchains according to [Oracle Integration Specifications (OIS)](../reference/specifications/ois.md). APIs are composed of [operations](../reference/specifications/ois.md#_5-2-operation), which represent individual functionalities that an API offers. OIS maps each API operation to an [endpoint](../reference/specifications/ois.md#_5-endpoints), which can be thought of as an Airnode operation. The endpoints that an Airnode will serve over the request–response protocol are listed under [triggers](../reference/deployment-files/config-json.md#triggers) of [config.json](../reference/deployment-files/config-json.md).

## `endpointId`

> You can use the [admin CLI](../reference/packages/admin-cli.md) to derive the endpoint id from your terminal

`endpointId` identifies specific endpoints that an Airnode serves, and is computed in JS (using ethers.js) as follows:

```js
ethers.utils.keccak256(
  ethers.utils.defaultAbiCoder.encode(
    ['string', 'string'],
    [oisTitle, endpointName]
  )
);
```

Note that this means that an `endpointId` is not unique, and two Airnodes can serve equivalent endpoints using the same ID (in fact, this is the desired outcome).This is not an issue, as requests are made with a `airnode` (Airnode's `address`) and `endpointId` pair.

This convention of determining an `endpointId` is not enforced at the protocol-level. For example, one could choose to generate an `endpointId` randomly, and as long as requesters use the correct `endpointId`, this will not be an issue.

## Authorizers

Airnodes can assign a list of authorizers to their endpoints. See the section [Authorizer](authorization.md) for more information.
