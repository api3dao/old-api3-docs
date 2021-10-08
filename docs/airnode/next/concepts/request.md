---
title: Request
---
<TitleSpan>Concepts and Definitions</TitleSpan>
# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3,4]" />

A request is made by a [requester](requester.md) to either the `makeFullRequest()` or `makeTemplateRequest()` function of the [AirnodeRrp.sol](README.md#airnoderrp-sol) protocol contract which adds the request to the event log. The targeted off-chain [Airnode](airnode.md) gathers the request from the event log and responds using the `fulFill()` function of AirnodeRrp.sol.

>![concepts-request](../assets/images/concepts-request.png)

Learn more on how to [Call an Airnode](../grp-developers/call-an-airnode.md).

## `requestId`

The `requestId` uniquely identifies a request. When a requester makes a request using AirnodeRrp.sol, a `requestId` is generated before the request is added to the event logs and the requestId is returned to the requester. This `requestId` is a hash of certain data members depending on which type of request is made, `makeFullRequest()` or `makeTemplateRequest()`. They only differ in that one uses `endpointId` plus `airnode` address and the other `templateId` (since template already contains the `airnode` address). 

|makeFullRequest()|makeTemplateRequest()|
|:---------|:---------|
|block.chainid|block.chainid|
|address(this)|address(this)|
|msg.sender|msg.sender|
|requesterRequestCount|requesterRequestCount|
|---|airnode|
|<span style="color:purple;font-weight:bold;">endpointId</span>|<span style="color:purple;font-weight:bold;">templateId</span>|
|sponsor|sponsor|
|sponsorWallet|sponsorWallet|
|fulfillAddress|fulfillAddress|
|fulfillFunctionId|fulfillFunctionId|
|parameters|parameters|

After the request (with `requestId`) is added to the event logs, Airnode gathers the request and verifies the `requestId` by re-computing its hash before responding to the request. This verifies the parameters have not been tampered with.

## Request Parameters

The following list summarizes the values expected for the parameters of a request.

- `templateId` the id of a template to use, _(only used for `makeTemplateRequest`)_

- `airnode` (address) and `endpointId` specify the endpoint, _(only used for `makeFullRequest`)_

- `sponsor` and `sponsorWallet` (addresses) specify which wallet will be used to fulfill the request

- `fulfillAddress` and `fulfillFunctionId` specify which contract/function will be called to fulfill the request

- `parameters` specify the API and [reserved](../../specifications/ois.md#_5-4-reservedparameters
) parameters (see [Airnode ABI specifications](../../specifications/airnode-abi-specifications.md) for how these are encoded)

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

- Fulfill
- Fail
- Ignore

### Fulfill

`fulfill()` is the desired outcome and it will only be called if Airnode received a successful response from the API provider.

:::tip Note:
Fulfill is the only outcome that returns results to a requester contract.
:::

For a successful request, Airnode  calls the `fulfill()` function in AirnodeRrp.sol that will in turn call back the requester contract at `fulfillAddress` using function `fulfillFunctionId` to deliver `data`.

`fulfill()` also receives a signature to validate on-chain that the response data was submitted by the Arinode.
<Fix> This is to prevent requesters from fulfilling their own requests in order to manipulate data submitted by AirnodeRrp.sol. More details: https://api3workspace.slack.com/archives/C027Y2FAV0S/p1632668101023800</Fix>

`fulfill()` will not revert if the `fulfillFunctionId` external call reverts. However, it will return `false` in this case or if there is no function with a matching signature at `fulfillAddress`. On the other hand, it will return `true` if the external call returns successfully or if there is no contract deployed at `fulfillAddress`. In the case `false` is returned then an error message will also be returned in a variable which can be decoded to retrieve the revert string. For example Airnode will decode this variable when this function returns `false` and call `fail()` on AirnodeRrp.sol with the revert string as the error message.

<Fix>Needs to be updated based on the new flow described in [Fulfill](./request.md#fulfill)</Fix>
> ![request-outcomes](../assets/images/request-outcomes.png)

### Fail

As noted in the diagram above, if the transaction that calls `fulfill()` returns `false`, the Airnode decodes the revert string and calls the `fail()` method to report the failure. The node will not attempt to fulfill a failed request afterwards.

Airnode is stateless, which means that there is no database storing which requests have been fulfilled or failed, which are waiting on confirmations and which are still pending. This information is retrieved from the chain on each request-response cycle (roughly every minute). During each cycle, retrieved requests need to be ordered in the same way to ensure they are submitted using the same nonce. This is important because it's possible for a transaction to not have been confirmed by the time the next cycle runs. If this happens, the transaction is re-submitted with a "faster" transaction fee, overwriting the previous transaction.

However, Airnode is also dependent on the blockchain provider to supply it with the onchain data. If the blockchain provider is unavailable for whatever reason, it is possible that a request cannot be fully validated, which means that it cannot be submitted back to the blockchain. As mentioned above, keeping requests in the sameorder, using the same nonce is critical. Therefore, any request that cannot be fully validated due to a blockchain provider error becomes "blocked". This means that it and any requests after it are unable to be submitted during the current cycle and will be retried during the following cycle. It is important to note that this is specific to each requester. e.g. a request sent from requester A that becomes "blocked", will not block requests sent from requester B.

### Ignore

If the Airnode cannot even fail a request (e.g., the requester is not sponsored by the sponsor), the request gets ignored.

After X blocks (20 by default for EVM chains), any requests that would become "blocked", will instead become "ignored". 
This means that Airnode will stop attempting to process the request in order to process later requests.

### Check if request is awaiting fulfillment

There is also a convenience method in AirnodeRrp.sol called `requestIsAwaitingFulfillment()` that can be called to check if a request was made but not yet fulfilled/failed. If a requester has made a request, received a `requestId` but did not hear back, it can call this method to check if the Airnode has called back `fail()` instead.
Returns `true` if the request is awaiting fulfillment (i.e., `true` if `fulfill()` or `fail()` is not called back yet), `false` otherwise.
