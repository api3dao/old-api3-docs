---
title: Request
---

When a client makes a request using `Airnode.sol`, it is returned a `requestId`. This `requestId` is a hash of all request parameters and a nonce. This allows Airnode to verify that the request parameters are not tampered with.

## Request parameters

* `providerId` and `endpointId` specify the endpoint
* `requesterIndex` and `designatedWallet` specify which wallet will be used to fulfill the request
* `fulfillAddress` and `fulfillFunctionId` specify which method will be called to fulfill the request
* `parameters` specify the API and \[reserved\]\(/airnode/ois.md\#54-reservedParameters

  \) parameters \(see [Airnode ABI specifications](/airnode/airnode-abi-specifications.md) for how these are encoded\)

## How templates are used in requests

A template includes the following fields:

```text
struct Template {
    bytes32 providerId;
    bytes32 endpointId;
    uint256 requesterIndex;
    address designatedWallet;
    address fulfillAddress;
    bytes4 fulfillFunctionId;
    bytes parameters;
    }
```

The client can refer to the `templateId` of a template while making the request, and the provider's Airnode will fetch these and use them in the request. Among these, `requesterIndex`, `designatedWallet`, `fulfillAddress`, `fulfillFunctionId` can be overriden by parameters defined at request-time.

When a template is used to make a request, both the parameters encoded in `parameters` of the template and `parameters` provided at request-time by the client will be used by the provider's Airnode. In case the two include a parameter with the same name, the one provided at request-time will be used.

## Request types

There are multiple request types with respect to how they utilize templates:

### 1. Regular request

A regular request refers to a template, yet provides its own `requesterIndex`, `designatedWallet`, `fulfillAddress`, `fulfillFunctionId` that will override the ones from the template.

### 2. Short request

A short request refers to a template for all parameters.

### 3. Full request

A full request does not refer to a template at all. They are useful if the client will not make a similar request ever again \(e.g., in a prediction market context\).

## Request outcomes

A request made to an Airnode has three possible outcomes:

### 1. Fulfill

If the node encountered no errors at any step, it calls the `fulfill()` method that will call back the method `fulfillFunctionId` at `fulfillAddress` to deliver `data` and 0 as the `statusCode`.

If the node encountered an error, it will do the same, but `statusCode` will be non-0, indicating to the client that the request has failed \(see [this](https://github.com/api3dao/airnode/tree/master/packages/node#behaviour) for details\). The client can then handle this error as it sees fit \(e.g., ignore it, make a request to an alternative provider, etc.\)

### 2. Fail

If `fulfill()` reverts, the node calls the `fail()` method to report this. The node will not attempt to fulfill a failed request afterwards.

### 3. Ignore

If the node cannot even fail a request \(e.g., the client is not endorsed by the requester\), the request gets ignored.
