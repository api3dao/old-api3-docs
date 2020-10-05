# Airnode protocol: Requests

## Glossary

**Provider:** An entity that runs an Airnode to serve one or more APIs

**Requester:** An entity that can endorse clients for their requests to be fulfilled with the requester's designated wallets

**Client:** A contract that makes requests to providers

**Endpoint:** A specific service that a provider provides.
It is mapped to an API operation at the Airnode-end.
All requests refer to an endpoint.

**Template:** Short for request template.
It stores a set of request parameters on-chain.

## Templates

Templates are used to record request parameters onto the blockchain.
While making a request, the requester simply passes a `templateId`, rather than passing all the parameters.
This both improves UX by allowing the creation of templates over a GUI, and also allows a large parameter payload (e.g., off-chain computation specifications) to be used at no additional gas cost.
Template parameters can be overridden by parameters provided at request-time.

A template includes the following fields:

```solidity
struct Template {
    bytes32 providerId;
    bytes32 endpointId;
    uint256 requesterInd;
    address designatedWallet;
    address fulfillAddress;
    bytes4 fulfillFunctionId;
    bytes parameters;
    }
```

Among these, `requesterInd`, `designatedWallet`, `fulfillAddress`, `fulfillFunctionId` can be overriden by parameters defined at request-time.
In addition, parameters encoded in `parameters` can be overriden by ones provided with the same name at request-time.

## Request types

There are multiple request types with respect to how they utilize templates:

### 1. Regular request

A regular request refers to a template, yet provides its own `requesterInd`, `designatedWallet`, `fulfillAddress`, `fulfillFunctionId` that will override the ones from the template.

### 2. Short request

A short request refers to a template for all parameters.

### 3. Full request

A full request does not refer to a template at all.
They are useful if the client will not make a similar request ever again (e.g., in a prediction market context).

## Request outcomes

A request made to an Airnode has four possible outcomes:

### 1. Fulfill

If the node encountered no errors at any step, it calls the `fulfill()` method that will call back the method `fulfillFunctionId` at `fulfillAddress` to deliver `data` and 0 as the `statusCode`.

If the node encountered an error, it will do the same, but `statusCode` will be non-0, indicating to the client that the request failed (see [this](https://github.com/api3dao/airnode/tree/master/packages/node#behaviour) for details).
The client can then handle this error as it sees fit (e.g., ignore it, make a request to an alternative provider, etc.).

### 2. Fail

If `fulfill()` reverts, the node calls the `fail()` method to report this.
The node will not attempt to fulfill a failed request afterwards.

### 3. Ignore

If the node cannot even fail a request (e.g., the client is not endorsed by the requester), the request gets ignored.

[Home](/README.md#contents)
