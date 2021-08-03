---
title: Calling an Airnode
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

<Todo>
<p>This doc needs updating once the new repo README(s) are ready for the Airnode (beta) re-writes.</p>
</Todo>

Client contracts that have been endorsed by a requester can call an Airnode. See [Become a Requester](become-a-sponsor.md) to set up a requester record, endorse a client contract and fund an Airnode.

Airnode is composed of two parts: the off-chain **Airnode** (cloud provider functions, e.g., AWS) and the on-chain **AirnodeRrp.sol** protocol contract.

---
  >![call](../assets/images/call-an-airnode.png)

In the above diagram a client contract makes a request to the AirnodeRrp.sol contract which is retrieved by the Airnode during its next run cycle. Airnode then gathers the requested data from the API and creates a transaction to call the function `fulfill()` in AirnodeRrp.sol which in turn makes a callback to the function `clientFulFill` in the client contract.


The AirnodeRrp protocol is designed to be flexible and is meant to serve a variety of use cases. See the Airnode [client examples](https://github.com/api3dao/airnode-starter/blob/main/contracts/ExampleClient.sol) for some potential design patterns. Requesters need to create a client contract that builds on the following items.

1. Make a request to the AirnodeRrp contract
2. Capture the response from the Airnode application
3. Deploy the client contract
4. [Endorse](become-a-sponsor.md#part-2-endorse-client-contracts) the client contract

This document focuses items 1 & 2 above, making a request and capturing the response from an Airnode. See [Endorse Client Contracts](become-a-sponsor.md#part-2-endorse-client-contracts) to learn more about client contract endorsements. Deploying your client contract is beyond the scope of this doc.

## Step #1: Inherit AirnodeRrpClient.sol

To get started a client contract inherits from the [AirnodeRrpClient.sol](https://github.com/api3dao/airnode/blob/master/packages/protocol/contracts/AirnodeRrpClient.sol) contract. This will expose the AirnodeRrp.sol protocol contract to the client contract.

```solidity
import "@api3/airnode-protocol/contracts/AirnodeRrpClient.sol";

contract ExampleClientContract is AirnodeRrpClient {
  ...
  constructor (address airnodeAddress)
      public
      AirnodeClient(airnodeAddress)
  {}
  ...
}
```
Note the constructor parameter `airnodeAddress` which is the public address of the AirnodeRrp.sol protocol contract on the blockchain you wish to use. It is used by AirnodeRrpClient.sol to point itself to AirnodeRrp.sol. See the the list of available addresses below.

> <ChainsSupported :version="'0.1.0'" />

## Step #2: Make a Request

There are three types of requests provided by the AirnodeRrp.sol contract. See [Request Types](../reference/protocols/request-response/request.md#request-types) in the Reference section for information related to each request type. 

This example will use a [full request](../reference/protocols/request-response/request.md#_3-full-request) type (note the `airnode.makeFullRequest` function call in the code below) which is called from the client contract's own function `callTheAirnode`. The function `makeFullRequest` requires the client contract pass all parameters needed by Airnode to call its underlying API.

Once the request has been made to `airnode.makeFullRequest` the AirnodeRrp.sol contract will return a `requestId` confirming the request has been accepted and is in process of being executed. Your contract would most likely wish to track all requestIds. Note the line `incomingFulfillments[requestId] = true;` in the code below that stores the requestIds in a mapping. This will be useful when the Airnode responds to the request later at the function (`airnodeCallback`) with the requestId, statusCode and the data requested.

```solidity
import "@api3/airnode-protocol/contracts/AirnodeRrpClient.sol";

contract ExampleClientContract is AirnodeRrpClient {
  mapping(bytes32 => bool) public incomingFulfillments;
  mapping(bytes32 => int256) public fulfilledData;

  constructor (address airnodeAddress)
      public
      AirnodeClient(airnodeAddress)
  {}

  function callTheAirnode(
      bytes32 airnodeId,
      bytes32 endpointId,
      uint256 requesterIndex,
      address designatedWallet,
      bytes calldata parameters // Inbound API parameters which may already be ABI encoded
      )
      external
  {
      bytes32 requestId = airnode.makeFullRequest( // Make the Airnode request 
          airnodeId,                      // airnodeId
          endpointId,                     // endpointId
          requesterIndex,                 // requesterIndex
          designatedWallet,               // designatedWallet
          address(this),                  // fulfillAddress
          this.airnodeCallback.selector,  // fulfillFunctionId
          parameters                      // API parameters
          );
      incomingFulfillments[requestId] = true;
  }
  
  function airnodeCallback(   // The AirnodeRrp.sol protocol contract will callback here.
      bytes32 requestId,
      uint256 statusCode,
      bytes calldata data
  { 
      ...
  }
}
```

### Request Parameters

A _full request_ using the AirnodeRrp.sol contract `makeFullRequest` function requires all parameters needed by the Airnode application be passed at runtime. This is in contrast to a _regular or short request_ type that would use a template for some or all of the required parameters. See more about [Using Templates](call-an-airnode.md#using-templates) below.

Since the `callTheAirnode` function is going to make a full request it must gather the following parameters to pass on to `airnode.makeFullRequest`.

- **airnodeId** and **endpointId**: As a pair these uniquely identify the endpoint desired at a particular Airnode.

- **requesterIndex** and **designatedWallet**: The [requesterIndex](../grp-developers/become-a-sponsor.md#part-1-create-a-requester-record) from the requester's record and the [designated wallet](become-a-sponsor.md#part-3-funding-airnodes) that the requester received when endorsing the Airnode being called. The designated wallet must belong to the requesterId.
  
- **fulfillAddress** and **fulfillFunctionId**: The public address of your client contract and its function that will be called when the request is returned.

- **parameters**: Specify the API parameters and any [reserved parameters](../reference/specifications/reserved-parameters.md), these must be encoded. See [Airnode ABI specifications]() for how these are encoded.


    *More about parameters*

    In most cases the parameters will be encoded off-chain and passed to the client contract. Most APIs will have some sort of security such as an apiKey which cannot be made public inside a client contract. Consider the following example which encodes the parameters off-chain before calling a client contract. This is done using  the [@api3/airnode-abi](https://github.com/api3dao/airnode/tree/master/packages/airnode-abi) library.

    <h4 style="color:gray;margin-bottom:-12px">Off-chain parameter encoding using @api3/airnode-abi:</h4>

    ```solidity
    import { encode } from '@api3/airnode-abi';

    const parameters = [
      { type: 'bytes32', name: 'coin', value: 'ETH' },
      { type: 'bytes32', name: 'apiKey', value: 'UHHS7SRGC975E' },
    ];
    const encodedData = encode(parameters);

    console.log(encodedData);
    // '0x...'
    ```

For additional information on request parameters when calling `airnode.makeFullRequest()` see [Request Parameters](../reference/protocols/request-response/request.md#request-parameters) in the Reference section.

## Step #3: Capture the Response

The request you made has been queued in the AirnodeRrp.sol contract. The off-chain Airnode you specified runs a continuous cycle and gathers its requests from AirnodeRrp.sol. All off-chain Airnodes gather, on a regular cycle, requests assigned to them from AirnodeRrp.sol.

As soon as the Airnode gets a request it will gather the data and start an on-chain transaction responding to the request. The Airnode calls the AirnodeRrp.sol contract function `fulfiil()` which in turn will call the client contract, in this case, at `airnodeCallback`. Recall the request supplied the client contract address and the desired callback function which the AirnodeRrp.sol contract stored with the requestId for the purpose of the callback.

<Todo>

Does the code below need to `import { decode } from '@api3/airnode-abi';`.

And change decode to `int256 decodedData = decode(data, (int256));`.

</Todo>

```solidity
import "@api3/airnode-protocol/contracts/AirnodeClient.sol";

contract ExampleClient is AirnodeClient {
    mapping(bytes32 => bool) public incomingFulfillments;
    mapping(bytes32 => int256) public fulfilledData;

    constructor (address airnodeAddress)
        public
        AirnodeClient(airnodeAddress)
    {}

    function callTheAirnode(
        ...
    }

    function airnodeCallback(        // The AirnodeRrp.sol protocol contract will callback here.
        bytes32 requestId,
        uint256 statusCode,
        bytes calldata data
        )
        external
        onlyAirnode()
    {
        require(incomingFulfillments[requestId], "No such request made");
        delete incomingFulfillments[requestId];
        if (statusCode == 0)
        {
            int256 decodedData = abi.decode(data, (int256));
            fulfilledData[requestId] = decodedData;
        }
        else  // There was an error
        {
          ...
        }
    }
}
```

### Response Parameters

The callback to a client contract will contain three parameters.

- **requestId**: First acquired when making the request and passed here as a reference to identify which request the response is for.
- **statusCode**: A statusCode of `0` indicates a successful response and a `non-0` statusCode an error. See [statusCode](../reference/protocols/request-response/request.md#statuscode) for a list of error statusCodes.

- **calldata**: For a successful response the requested data which has been encoded. Decode it using the function `decode()` from the `abi` object .


