---
title: Endpoint
---

# {{$frontmatter.title}}
<VersionWarning/>
<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

Airnode serves APIs to blockchains according to [Oracle Integration Specifications (OIS)](../../airnode/specifications/ois.md). APIs are composed of [operations](../../airnode/specifications/ois.md#_4-4-paths), which represent individual functionalities that an API offers. OIS maps each API operation to an [endpoint](../../airnode/specifications/ois.md#_5-endpoints), which can be thought of as an Airnode operation. The endpoints that an Airnode will serve over the request–response protocol are listed under [triggers](../../airnode/specifications/config-json.md#triggers) of [config.json](../../airnode/specifications/config-json.md).

## `endpointId`

`endpointId` identifies specific endpoints that a provider serves, and is computed in JS (using ethers.js) as follows:

```js
endpointId = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['string'], [`${OIS_TITLE}/${ENDPOINT_NAME}`]));
```

Note that this means that `endpointId`s are not unique, and two providers can serve equivalent endpoints using the same ID (in fact, this is the desired outcome). This is not an issue, as requests are made with a `providerId` and `endpointId` pair.

This convention of determining `endpointId`s is not enforced at the protocol-level. For example, the provider can choose to generate their `endpointId`s randomly, and as long as their requesters use correct `endpointId`s, this will not be an issue.

## Authorizers

Providers can assign a list of authorizers to their endpoints. See the [section about authorizers](authorizer.md) for more details.
