---
title: Request
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

When a client makes a request using `Airnode.sol`, it is returned a `requestId`. This `requestId` is a hash of all request parameters and a nonce. This allows Airnode to verify that the request parameters are not tampered with.

## Request parameters

- `airnodeId` and `endpointId` specify the endpoint
- `requesterIndex` and `designatedWallet` specify which wallet will be used to fulfill the request
- `fulfillAddress` and `fulfillFunctionId` specify which method will be called to fulfill the request
- `parameters` specify the API and [reserved](../../specifications/ois.md#_5-4-reservedparameters
) parameters (see [Airnode ABI specifications](../../specifications/airnode-abi-specifications.md) for how these are encoded)

## How templates are used in requests

A template includes the following fields:

```solidity
struct Template {
    bytes32 airnodeId;
    bytes32 endpointId;
    uint256 requesterIndex;
    address designatedWallet;
    address fulfillAddress;
    bytes4 fulfillFunctionId;
    bytes parameters;
    }
```

The client can refer to the `templateId` of a template while making the request, and the Airnode will fetch these and use them in the request. Among these, `requesterIndex`, `designatedWallet`, `fulfillAddress`, `fulfillFunctionId` can be overridden by parameters defined at request-time.

When a template is used to make a request, both the parameters encoded in `parameters` of the template and `parameters` provided at request-time by the client will be used by the Airnode. In case the two include a parameter with the same name, the one provided at request-time will be used.

## Request types

There are multiple request types with respect to how they utilize templates:

### 1. Regular request

A regular request refers to a template, yet provides its own `requesterIndex`, `designatedWallet`, `fulfillAddress`, `fulfillFunctionId` that will override the ones from the template.

### 2. Short request

A short request refers to a template for all parameters.

### 3. Full request

A full request does not refer to a template at all. They are useful if the client will not make a similar request ever again (e.g., in a prediction market context).

## Request outcomes

A request made to an Airnode has three possible outcomes:

### 1. Fulfill

If the node encountered no errors at any step, it calls the `fulfill()` method that will call back the method `fulfillFunctionId` at `fulfillAddress` to deliver `data` and 0 as the `statusCode`.

If the node encountered an error, it will do the same, but [`statusCode`](https://github.com/api3dao/airnode/blob/6f31a4c27d40e86101673bf37d223fef6625dfdd/packages/protocol/contracts/AirnodeRrp.sol#L148) (shown in the [Codes](request.md#codes) table below) will be non-0, indicating to the client that the request has failed. The client can then handle this error as it sees fit (e.g., ignore it, make a request to an alternative provider, etc.)

### 2. Fail

If `fulfill()` reverts, the node calls the `fail()` method to report this. The node will not attempt to fulfill a failed request afterwards.

### 3. Ignore

If the node cannot even fail a request (e.g., the client is not endorsed by the requester), the request gets ignored.

### Statuses
|Status | Description|
| --- | --- |
|Pending    |The request has no current issues and can be fulfilled |
|Fulfilled  |The transaction that fulfilled the request has been confirmed onchain	|
|Blocked    |A required piece of data was not able to be loaded or something else is preventing the request from being fulfilled now:<ul><li>The request is not fulfilled</li><li>Requests ordered after this one are not fulfilled</li><li>After a preconfigured number of blocks (default 20), the request will be ignored</li></ul>|
|Ignored    |The request is not fulfilled or actioned any further |
|Errored    |No further action is taken on the request. It is fulfilled as "errored" with the relevant error code |


 

### Codes
|Code | Name | Status | Description |
| --: | --- | --- | --- |
|1    |RequestParameterDecodingFailed |Errored   |The request contains invalid parameters |
|2    |RequestInvalid                 |Ignored   |The request ID cannot be verified against the other fields |
|3    |TemplateNotFound               |Blocked   |The API call template could not be loaded |
|4    |TemplateParameterDecodingFailed|Errored   |The API call template contains invalid parameters |
|5    |TemplateInvalid                |Ignored   |The API call template cannot be verified against the other fields |
|6    |DesignatedWalletInvalid        |Ignored   |The request's designated wallet differs from the expected designated wallet |
|7    |AuthorizationNotFound          |Blocked   |The API call authorization status could not be loaded |
|8    |Unauthorized                   |Errored   |The client contract submitting the API call request is not authorized |
|9    |PendingWithdrawal              |Ignored   |The request cannot be actioned while there is a pending withdrawal |
|10   |UnknownOIS                     |Errored   |The API call endpointId does not match a known OIS |
|11   |UnknownEndpoint                |Errored   |The API call endpointId does not match a known endpoint |
|12   |NoMatchingAggregatedCall       |Ignored   |The individual API call cannot be matched to an aggregated API call |
|13   |ApiCallFailed                  |Errored   |The API call failed |
|14   |ResponseParametersInvalid      |Errored   |The API call is missing a "_type" parameter |
|15   |ResponseValueNotFound          |Errored   |A value could not be extracted from the API call response using the "_path" parameter |
|16   |ResponseValueNotCastable       |Errored   |The API call response value could not be cast successfully using the "_type" parameter |
|17   |FulfillTransactionFailed       |Errored   |The fulfill transaction could not be submitted successfully |