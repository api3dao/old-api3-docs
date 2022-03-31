---
title: Calling an Airnode
---

# {{$frontmatter.title}}

<VersionWarning/>
<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

A requester is a contract that can trigger an Airnode request. To do so, requester needs to be sponsored and make the request using a matching sponsor wallet. See [Requesters and Sponsors](requesters-sponsors.md) on how to sponsor a requester and derive the sponsor wallet.

Airnode is composed of two parts: the off-chain **Airnode** (a.k.a. "the node") deployed as self hosted or cloud provider functions, e.g., AWS) and the on-chain **protocol contract** AirnodeRrp.sol. A requester calls the protocol contract, which emits a blockchain event with the request parameters. Airnode listens to the events emitted by the AirnodeRrp contract. During its next run cycle, Airnode gets the request parameters from the emitted event. The diagram below illustrates the mechanics of the entire process as does the diagram in the [Overview](./) doc for developers.

The AirnodeRrp protocol is designed to be flexible and is meant to serve a variety of use cases. See the Airnode [requester examples](https://github.com/api3dao/airnode/tree/v0.2/packages/airnode-examples/contracts) for some potential design patterns.

Ignoring the mechanics of the overall process, the requester primarily focuses on two tasks as indicated by points A & B in the diagram below when calling an Airnode.

- <span style="color:green;font-weight:bold;">1</span>: Make the request
- <span style="color:blue;font-weight:bold;">2</span>: Accept and decode the response

> ![request-flow](../assets/images/call-an-airnode.png)
> 
> 1. <p class="diagram-line" style="color:green;">A requester makes a request to the AirnodeRrp contract which adds the requestId to storage, emits the request to the event logs and returns the requestId to the requester. The request is retrieved by the Airnode during its next run cycle. It then verifies the requester is authorized by checking authorizer contracts assigned to the Airnode.</p>
> 2. <p class="diagram-line" style="color:blue;">If the request is authorized, Airnode proceeds to respond. It first gathers the requested data from the API and calls the <code>fulfill()</code> function in AirnodeRrp, which removes the pending requestId from storage and makes a callback to <code>myFulfill()</code>. Gas costs associated with the response are covered by the sponsor of the requester.</p>

This remainder of this doc focuses on the requester implementation, it's deployment and sponsoring.

## Step #1: Inherit RrpRequester.sol

A requester inherits from the [RrpRequester.sol](https://github.com/api3dao/airnode/blob/v0.2/packages/airnode-protocol/contracts/rrp/requesters/RrpRequester.sol) contract. This will expose the AirnodeRrp.sol protocol contract to the requester allowing it to make Airnode requests.

```solidity
import "@api3/airnode-protocol/contracts/rrp/requesters/RrpRequester.sol";

contract MyRequester is RrpRequester {
  ...
  constructor (address airnodeRrpAddress)
      public
      RrpRequester(airnodeRrpAddress)
  {}
  ...
}
```

Note the constructor parameter `airnodeRrpAddress` which is the public address of the AirnodeRrp.sol protocol contract on the blockchain you wish to use. It is used by RrpRequester.sol to point itself to AirnodeRrp.sol.

See the list of all [Airnode contract addresses](../reference/airnode-addresses.md) in the reference section.

## Step #2: Implement the request logic

There are two types of requests provided by the AirnodeRrp.sol contract. See the [Request](../concepts/request.md) page for information related to each request type.

This example will use a [full request](../concepts/request.md#full-request) type (note the `airnodeRrp.makeFullRequest` function call in the code below) which is called from the requester's own function `callTheAirnode`. The function `makeFullRequest` requires that the requester pass all parameters needed by Airnode to call its underlying API.

Once the request has been made to `airnodeRrp.makeFullRequest` the AirnodeRrp.sol contract will return a `requestId` confirming the request has been accepted and is in process of being executed. Your requester would most likely wish to track all `requestId`s. Note the line `incomingFulfillments[requestId] = true;` in the code below that stores the `requestId`s in a mapping. This will be useful when the Airnode responds to the requester later at the function (`airnodeCallback`) with the `requestId` and the `data` requested.

```solidity
import "@api3/airnode-protocol/contracts/rrp/requesters/RrpRequester.sol";

contract MyRequester is RrpRequester {
  mapping(bytes32 => bool) public incomingFulfillments;
  mapping(bytes32 => int256) public fulfilledData;

  constructor (address airnodeRrpAddress)
      public
      RrpRequester(airnodeRrpAddress)
  {}

  function callTheAirnode(
      address airnode,
      bytes32 endpointId,
      address sponsor,
      address sponsorWallet,
      bytes calldata parameters // Inbound API parameters which may already be ABI encoded
      )
      external
  {
      bytes32 requestId = airnodeRrp.makeFullRequest( // Make the Airnode request
          airnode,                        // airnode
          endpointId,                     // endpointId
          sponsor,                        // sponsor's address
          sponsorWallet,                  // sponsorWallet
          address(this),                  // fulfillAddress
          this.airnodeCallback.selector,  // fulfillFunctionId
          parameters                      // API parameters
          );
      incomingFulfillments[requestId] = true;
  }

  function airnodeCallback(   // The AirnodeRrp.sol protocol contract will callback here.
      bytes32 requestId,
      bytes calldata data
  {
      ...
  }
}
```

### Request Parameters

A full request using the AirnodeRrp.sol contract `makeFullRequest` function requires all parameters needed by the Airnode application to be passed at runtime. This is in contrast to a template request that would use a template for some or all of the required parameters. Learn more about [using templates](call-an-airnode.md#using-templates).

Since the `callTheAirnode` function is going to make a [full request](../concepts/request.md#full-request) it must gather the following parameters to pass on to `airnodeRrp.makeFullRequest`.

- **airnode** and **endpointId**: As a pair these uniquely identify the endpoint desired at a particular Airnode.

- **sponsor**: The [sponsor](requesters-sponsors.md#what-is-a-sponsor) address.

- **sponsorWallet**: The [sponsor wallet](requesters-sponsors.md#how-to-derive-a-sponsor-wallet) address that the sponsor received when deriving the wallet for the Airnode being called.

- **fulfillAddress** and **fulfillFunctionId**: The public address of your requester contract and its function that will be called when the request is returned.

- **parameters**: Specify the API parameters and any [reserved parameters](../reference/specifications/reserved-parameters.md), these must be encoded. See [Airnode ABI specifications](../reference/specifications/airnode-abi-specifications.md) for how these are encoded.

  In most cases the parameters will be encoded off-chain and passed to the requester which will only forward them. You can use the [@api3/airnode-abi](../reference/specifications/airnode-abi-specifications.md#api3-airnode-abi) package for the encoding and decoding. Take a look at the javascript snippet below.

  ```javascript
  // Javascript snippet

  import { encode } from '@api3/airnode-abi';

  const parameters = [
    { type: 'bytes32', name: 'coin', value: 'ETH' },
    { type: 'bytes32', name: 'apiKey', value: 'UHHS7SRGC975E' },
  ];
  const encodedData = encode(parameters);

  console.log(encodedData);
  // '0x...'
  ```

  However, this is not a hard requirement and you can encode the parameters on chain as well. Take a look at the solidity snippet below.

  ```solidity
  // Solidity snippet

  abi.encode(
    bytes32("1SS"),
    bytes32("period"), "30d",
    bytes32("symbols"), "btc,eth,matic,link,uni,sushi,aave,chz,theta,rsr,grt,enj,ocean,kacy"
  )
  ```

For additional information on request parameters when calling `airnodeRrp.makeFullRequest()` see [Request Parameters](../concepts/request.md#request-parameters) in the Reference section.

## Step #3: Capture the Response

As soon as the Airnode gets a request it will gather the data and start an on-chain transaction responding to the request. The Airnode calls the AirnodeRrp.sol contract function `fulfill()` which in turn will call the requester, in this case, at `airnodeCallback`. Recall the request supplied the request contract address and the desired callback function which the AirnodeRrp.sol protocol contract stored with the `requestId` for the purpose of the callback.

```solidity
import "@api3/airnode-protocol/contracts/rrp/requesters/RrpRequester.sol";

contract MyRequester is RrpRequester {
    mapping(bytes32 => bool) public incomingFulfillments;
    mapping(bytes32 => int256) public fulfilledData;

    constructor (address airnodeRrpAddress)
        public
        RrpRequester(airnodeRrpAddress)
    {}

    function callTheAirnode(
        ...
    }

    function airnodeCallback(        // The AirnodeRrp.sol protocol contract will callback here.
        bytes32 requestId,
        bytes calldata data
        )
        external
        onlyAirnodeRrp
    {
        require(incomingFulfillments[requestId], "No such request made");
        delete incomingFulfillments[requestId];
        int256 decodedData = abi.decode(data, (int256));
        fulfilledData[requestId] = decodedData;
    }
}
```

### Response Parameters

The callback to a requester will contain two parameters as shown in the `airnodeCallback` function in the code sample above.

- **requestId**: First acquired when making the request and passed here as a reference to identify which request the response is for.
- **data**: For a successful response the requested data which has been encoded. Decode it using the function `decode()` from the `abi` object .

## Step #4: Deploy and Sponsor the Requester

Deploy the requester to the desired blockchain and then sponsor the requester. See [Requesters and Sponsors](requesters-sponsors.md#how-to-sponsor-a-requester) to learn more about sponsoring a requester.
