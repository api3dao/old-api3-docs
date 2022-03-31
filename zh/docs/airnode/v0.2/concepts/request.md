---
title: Request
---

<TitleSpan>Concepts and Definitions</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>
<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3,4]" />

A request is made, by a [requester](requester.md), to either the `makeFullRequest()` or `makeTemplateRequest()` functions of the [AirnodeRrp.sol](README.md#airnoderrp-sol) protocol contract which adds the request to its storage. The targeted off-chain [Airnode](airnode.md) gathers the request from AirnodeRrp.sol's storage and responds using the `fulFill()` function of AirnodeRrp.sol.

> ![concepts-request](../assets/images/concepts-request.png)
> 
> 1. <p class="diagram-line">The requester calls makeFullRequest() on the AirnodeRrp protocol contract.</p>
> 2. <p class="diagram-line">makeFullRequest() assigns a requestId to the request for tracking purposes, adds the requestId to storage, emits the request to the event logs and returns the requestId to the requester.</p>
> 3. <p class="diagram-line" style="color:gray;">Airnode, during its run cycle, picks the request from the event logs.</p>
> 4. <p class="diagram-line" style="color:blue;">Airnode gets data from the API.</p>
> 5. <p class="diagram-line" style="color:green;">Airnode sends the response to fulFill() in AirnodeRrp which in turn removes the pending requestId from storage and forwards the response to myFulFill(). The requestId is included as part of the response.</p>

Learn more on how to [Call an Airnode](../grp-developers/call-an-airnode.md).

## `requestId`

The `requestId` uniquely identifies a request. When a requester makes a request using AirnodeRrp.sol, a `requestId` is generated before the request is added to the event logs and the requestId is returned to the requester. This `requestId` is a hash of certain data members depending on which type of request is made, `makeFullRequest()` or `makeTemplateRequest()`. They only differ in that one uses `endpointId` plus `airnode` address and the other `templateId` (since template already contains the `airnode` address).

| makeFullRequest()                                              | makeTemplateRequest()                                          |
|:-------------------------------------------------------------- |:-------------------------------------------------------------- |
| block.chainid                                                  | block.chainid                                                  |
| address(this)                                                  | address(this)                                                  |
| msg.sender                                                     | msg.sender                                                     |
| requesterRequestCount                                          | requesterRequestCount                                          |
|                                                                | airnode                                                        |
| <span style="color:purple;font-weight:bold;">endpointId</span> | <span style="color:purple;font-weight:bold;">templateId</span> |
| sponsor                                                        | sponsor                                                        |
| sponsorWallet                                                  | sponsorWallet                                                  |
| fulfillAddress                                                 | fulfillAddress                                                 |
| fulfillFunctionId                                              | fulfillFunctionId                                              |
| parameters                                                     | parameters                                                     |

After the request (with `requestId`) is added to the event logs, Airnode gathers the request and verifies the `requestId` by re-computing its hash before responding to the request. This verifies the parameters have not been tampered with.

## Request Parameters

The following list summarizes the values expected for the parameters of a request.

- `templateId` the id of a template to use, _(only used for `makeTemplateRequest`)_

- `airnode` (address) and `endpointId` specify the endpoint, _(only used for `makeFullRequest`)_

- `sponsor` and `sponsorWallet` (addresses) specify which wallet will be used to fulfill the request

- `fulfillAddress` and `fulfillFunctionId` specify which contract/function will be called to fulfill the request

- `parameters` specify the API and [reserved](../reference/specifications/ois.md#_5-4-reservedparameters) parameters (see [Airnode ABI specifications](../reference/specifications/airnode-abi-specifications.md) for how these are encoded)

## Full Request

A full request does not refer to a template at all. Full requests are useful if the requester will not make a similar request ever again (e.g., in a prediction market context).

```solidity
function makeFullRequest(
    address airnode,
    bytes32 endpointId,
    address sponsor,
    address sponsorWallet,
    address fulfillAddress,
    bytes4 fulfillFunctionId,
    bytes calldata parameters
){...}
```

## Template Request

A template request refers to a template for the `airnode` address, `endpointId` and `parameters`.

```solidity
struct Template {
  address airnode;
  bytes32 endpointId;
  bytes parameters;
}
```

The requester can refer to the `templateId` of a template while making a request, and the Airnode will fetch these and use them in the request.

```solidity
function makeTemplateRequest(
    bytes32 templateId,
    address sponsor,
    address sponsorWallet,
    address fulfillAddress,
    bytes4 fulfillFunctionId,
    bytes calldata parameters
)
```

When a template is used to make a request, both the parameters encoded in `parameters` of the template and `parameters` provided at request-time by the requester will be used by the Airnode. In case the two include a parameter with the same name, the one provided at request-time will be used.

## Request Outcomes

A request made to an Airnode has three possible outcomes:

- [Fulfill](./request.md#fulfill)
- [Fail](./request.md#fail)
- [Ignore](./request.md#ignore)

### Fulfill

`fulfill()` is the desired outcome and it will only be called if Airnode received a successful response from the API provider.

> ![request-outcomes](../assets/images/request-outcomes.png)
> 
> 1. <p class="diagram-line">Airnode calls AirnodeRRP.fulFill() with a response only if the API has not responded with an error. AirnodeRrp.fulfill() performs a call back to myFulFill() which in turn receives the response.</p>
> 2. <p class="diagram-line" style="color:green;">If AirnodeRrp.fulFill() fails internally or the underlying low level call to myFulFill() reverts then Airnode will start the process in step #3 to fail the request.</p>
> 3. <p class="diagram-line" style="color:green;">If Airnode errors, or is told by AirnodeRrp.fulFill() to error, it calls AirnodeRrp.fail() which removes the request from the pending list of requestIds on-chain.</p>

::: tip Important to Note

Fulfill is the only outcome that returns results to a requester contract.

:::

For a successful request, Airnode calls the `fulfill()` function in AirnodeRrp.sol that will in turn call back the requester contract at `fulfillAddress` using function `fulfillFunctionId` to deliver `data`.

`fulfill()` also receives a signature to validate on-chain that the response data was submitted by the Airnode. This is to prevent requesters from fulfilling their own requests in order to manipulate data submitted by AirnodeRrp.sol.

`fulfill()` will not revert if the `fulfillFunctionId` external call reverts. However, it will return `false` in this case or if there is no function with a matching signature at `fulfillAddress`. On the other hand, it will return `true` if the external call returns successfully or if there is no contract deployed at `fulfillAddress`. In the case `false` is returned then an error message will also be returned in a variable which can be decoded to retrieve the revert string. For example Airnode will decode this variable when this function returns `false` and call `fail()` on AirnodeRrp.sol with the revert string as the error message.

### Fail

As noted in the diagram above, if the transaction that calls `fulfill()` returns `false`, the Airnode decodes the revert string and calls the `fail()` method to report the failure. The node will not attempt to fulfill a failed request afterwards.

Airnode is stateless, which means that there is no database storing which requests have been fulfilled or failed, which are waiting on confirmations and which are still pending. This information is retrieved from the chain on each request-response cycle (roughly every minute). During each cycle, retrieved requests need to be ordered in the same way to ensure they are submitted using the same nonce. This is important because it's possible for a transaction to not have been confirmed by the time the next cycle runs. If this happens, the transaction is re-submitted with a "faster" transaction fee, overwriting the previous transaction.

### Blocked

Airnode is also dependent on the blockchain provider to supply it with the onchain data. If the blockchain provider is unavailable for whatever reason, it is possible that a request cannot be fully validated, which means that it cannot be submitted back to the blockchain. As mentioned above, keeping requests in the same order, using the same nonce is critical. Therefore, any request that cannot be fully validated due to a blockchain provider error becomes "blocked". This means that it and any requests after it are unable to be submitted during the current cycle and will be retried during the following cycle. It is important to note that this is specific to each requester. e.g. a request sent from requester A that becomes "blocked", will not block requests sent from requester B.

The blocked requests get ignored after `ignoreBlockedRequestsAfterBlocks` (default value: 20), meaning that they are treated as an Ignored request (invalid requests are ignored, e.g., a request whose sponsor and sponsorWallet don't match).

#### Blocking cases

In chronological order in the coordinator life-cycle.

1. Airnode RRP has full requests (`makeFullRequest()1`), for which all parameters are specified, or template requests, which specify some of the parameters and specify the ID of a template that contains the rest of the parameters. After fetching templates, if the node can't find the template for a template request, that request gets blocked. This may happen if the blockchain provider is not responding to valid requests (e.g., the node is making too many requests and is being rate-limited).

2. To check authorization for a request, the node needs to know its endpoint ID. Full requests already specify the endpoint ID, and the templates should be fetched for template requests by this point, which specify the endpoint ID. While checking authorizations, if the endpoint ID of a request is not specified, that request gets blocked. This should never happen, because template requests that are missing templates are already blocked in sample #1 above.

3. The node makes a static call with some of the request parameters to check if a specific request is authorized (i.e., if it should respond to it). After fetching authorization results, if the node can't find the results for a request, that request gets blocked.This may happen if the blockchain provider is not responding to valid requests (e.g., the node is making too many requests and is being rate-limited).

4. The node invokes a worker for each request with a unique request ID to make the API calls. These workers should return either with a payload or an error (if the call has timed our or the API errored). While mapping the worker responses back (referred to as “disaggregation” in the code), if the node can't find the response for a request, that request gets blocked. In theory this should never happen.

### Ignore

If the Airnode cannot even fail a request (e.g., the requester is not sponsored by the sponsor), the request gets ignored.

After X blocks (20 by default for EVM chains), any requests that would become "blocked", will instead become "ignored". This means that Airnode will stop attempting to process the request in order to process later requests.

## Check if request is awaiting fulfillment

There is a convenience method in AirnodeRrp.sol called `requestIsAwaitingFulfillment()` that can be called to check if a request was made but not yet fulfilled/failed. If a requester has made a request, received a `requestId` but did not hear back, it can call this method to check if the Airnode has called back `fail()` instead.Returns `true` if the request is awaiting fulfillment (i.e., `true` if `fulfill()` or `fail()` is not called back yet), `false` otherwise.
