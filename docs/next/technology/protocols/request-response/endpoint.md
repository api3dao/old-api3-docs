---
title: Endpoint
---

# {{$frontmatter.title}}

<TocHeader />
[[TOC]]

Airnode serves APIs to blockchains according to [Oracle Integration Specifications (OIS)](../../specifications/ois.md).
APIs are composed of [operations](../../specifications/ois.md#_4-4-paths), which represent individual functionalities that an API offers. OIS maps each API operation to an [endpoint](../../specifications/ois.md#_5-endpoints), which can be thought of as an Airnode operation.The endpoints that an Airnode will serve over the request–response protocol are listed under [triggers](../../deployment-files/config-json.md#triggers) of [config.json](../../deployment-files/config-json.md).

## `endpointId`

`endpointId` identifies specific endpoints that an Airnode serves, and is computed in JS (using ethers.js) as follows:

```js
endpointId = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['string'], [`${OIS_NAME}/${ENDPOINT_NAME}`]));
```

Note that this means that an `endpointId` is not unique, and two Airnodes can serve equivalent endpoints using the same ID (in fact, this is the desired outcome). This is not an issue, as requests are made with a `airnodeId` and `endpointId` pair.

This convention of determining an `endpointId` is not enforced at the protocol-level. For example, one could choose to generate an `endpointId` randomly. As long as requesters use the correct `endpointId`, this is not an issue.

## Authorizers

Airnodes can assign a list of authorizers to their endpoints.
See the [section about Authorizer](authorizer.md) for more details.
