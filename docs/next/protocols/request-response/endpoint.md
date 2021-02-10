---
title: Endpoint
---

Airnode serves APIs to blockchains according to [Oracle Integration Specifications \(OIS\)](../../airnode/ois.md). APIs are composed of [operations](../../airnode/ois.md#4.4-paths), which represent individual functionalities that an API offers. OIS maps each API operation to an [endpoint](../../airnode/ois.md#5-endpoints), which can be thought of as an Airnode operation. The endpoints that an Airnode will serve over the request–response protocol are listed under [triggers](../../airnode/config-json.md#triggers) of [config.json](../../airnode/config-json.md).

## endpointId

`endpointId` identifies specific endpoints that a provider serves, and is computed in JS \(using ethers.js\) as follows:

```javascript
endpointId = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['string'], [`${OIS_NAME}/${ENDPOINT_NAME}`]));
```

Note that this means that `endpointId`s are not unique, and two providers can serve equivalent endpoints using the same ID \(in fact, this is the desired outcome\). This is not an issue, as requests are made with a `providerId` and `endpointId` pair.

This convention of determining `endpointId`s is not enforced at the protocol-level. For example, the provider can choose to generate their `endpointId`s randomly, and as long as their requesters use correct `endpointId`s, this will not be an issue.

## Authorizers

Providers can assign a list of authorizers to their endpoints. See the next section about [Authorizers](authorizer.md) for more details.

