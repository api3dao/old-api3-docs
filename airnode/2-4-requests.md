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
    address fulfillAddress;
    address errorAddress;
    bytes4 fulfillFunctionId;
    bytes4 errorFunctionId;
    bytes parameters;
    }
```

Among these, `fulfillAddress`, `errorAddress`, `fulfillFunctionId`, `errorFunctionId` can be overridden by parameters defined at request-time.
In addition, parameters encoded in `parameters` can be overridden by ones provided with the same name at request-time.

## Request types

There are multiple request types with respect to how they utilize templates:

### 1. Regular request

A regular request refers to a template, yet provides its own `fulfillAddress`, `errorAddress`, `fulfillFunctionId`, `errorFunctionId` that will override the ones from the template.

### 2. Short request

A short request refers to a template for all parameters.

### 3. Full request

A full request does not refer to a template at all.
They are useful if the client will not make a similar request ever again (e.g., in a prediction market context).

## Request outcomes

A request made to an Airnode has four possible outcomes:

### 1. Fulfill

If the node encountered no errors at any step, it calls the `fulfill()` method that will call back the method `fulfillFunctionId` at `fulfillAddress` to deliver `data`.

### 2. Error

If the node encountered any errors (including `fulfill()` reverting), it calls the `error()` method that will call back the method `errorFunctionId` at `errorAddress` to deliver `errorCode`.

### 3. Fail

If the node encountered any errors but it cannot error because `error()` reverts, it calls the `fail()` method to report this.

### 4. Ignore

If the node cannot even fail a request (e.g., the wallet designated for the requester does not have enough funds), the request gets ignored.

[Home](/README.md#contents)
