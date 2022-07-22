---
title: How to use API3 QRNG
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

The API3 QRNG service is implemented using the Airnode request–response protocol
contract,
[AirnodeRrpV0](https://github.com/api3dao/airnode/blob/master/packages/airnode-protocol/contracts/rrp/AirnodeRrpV0.sol),
to acquire a random number.

::: tip Gas Costs

Using the QRNG service is free, meaning there is no subscription fee to pay.
There is a gas cost incurred on-chain when Airnode places the random number
on-chain in response to a request, which the requester needs to pay for.

:::

## How it Works

Upon request, [Airnode](/airnode/v0.7/) calls a designated API operation and
acquires a random number and then delivers it on-chain, via the `AirnodeRrpV0`
protocol contract, to a requester.

In the diagram below a requester (smart contract) submits a request for a random
number to `AirnodeRrpV0`. Airnode gathers the request from the `AirnodeRrpV0`
protocol contract, gets the random number from an API operation and sends it
back to `AirnodeRrpV0`. Once received, `AirnodeRrpV0` performs a callback to the
requester with the random number.

> <img src="./assets/images/access-overview.png" width="400"  />

Calling `AirnodeRrpV0` for a random number is the same as any other Airnode
request. Read more about how a requester
[accesses an Airnode](/airnode/v0.7/grp-developers/) to acquire data from API
operations.

## QRNG Example Project

The [qrng-example](https://github.com/api3dao/qrng-example) project (GitHub
repo) demonstrates how to build a smart contract (known as a requester) using
the Airnode request–response protocol to receive QRNG services. It is
recommended to run the example project to learn how it uses the QRNG service on
a testnet, and read the associated README file. It also contains example code
that will be useful when creating a requester (smart contract) that requests a
random number, and is referenced frequently within this doc.

- [qrng-example/contracts/](https://github.com/api3dao/qrng-example/tree/main/contracts)
  - `QrngExamples.sol`: A sample requester (smart contract) used to call the
    QRNG service.
- [qrng-example/deploy/](https://github.com/api3dao/qrng-example/tree/main/deploy)
  - `deploy.js`: Script that deploys a requester to a chain.
  - `setup.js`: Script that sets the parameters on the requester contract. These
    parameters are used when calling the QRNG service.
  - `fund.js`: Script that funds the wallet the requester uses to pay the gas
    costs.

## Using a QRNG Service

This section is an overview of the
[QRNG Example Project](./using-qrng.md#qrng-example-project) mentioned above.
Preparing to use the QRNG service involves three steps.

- **Create a Requester**: Create a requester (smart contract) to make a request
  and add a callback function to accept the response.
- **Set the Parameters**: After the requester is added to the desired chain, set
  the parameters it uses to make requests.
- **Make a Request**: Make a request and understand the request/response flow.

### Create a Requester

Create a requester (smart contract) that will call the QRNG service using the
_request–response protocol (RRP)_ implemented by the on-chain `AirnodeRrpV0`
contract. Refer to the
[Calling an Airnode](/airnode/v0.7/grp-developers/call-an-airnode.md) doc for a
detailed explanation and instructions to make a `AirnodeRrpV0` request. The
[@api3/airnode-protocol](https://www.npmjs.com/package/@api3/airnode-protocol)
package is distributed via npm.

The code example below is what a requester might look like when requesting a
single random number. The code is extracted from the
[QrngExample.sol](https://github.com/api3dao/qrng-example/blob/main/contracts/QrngExample.sol)
contract and has been simplified to only request a single random number with
each call to the QRNG service.

```js
//SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
import "@api3/airnode-protocol/contracts/rrp/requesters/RrpRequesterV0.sol";

contract QrngExample is RrpRequesterV0 {
    event RequestedUint256(bytes32 indexed requestId);
    event ReceivedUint256(bytes32 indexed requestId, uint256 response);

    // These are set using setRequestParameters() below.
    address public airnode;
    bytes32 public endpointIdUint256;
    address public sponsorWallet;

    mapping(bytes32 => bool) public expectingRequestWithIdToBeFulfilled;

    constructor(address _airnodeRrp) RrpRequesterV0(_airnodeRrp) {}

    // Set parameters used by airnodeRrp.makeFullRequest(...)
    // See makeRequestUint256() below.
    function setRequestParameters(
        address _airnode,
        bytes32 _endpointIdUint256,
        address _sponsorWallet
    ) external {
        // Normally, this function should be protected, as in:
        // require(msg.sender == owner, "Sender not owner");
        airnode = _airnode;
        endpointIdUint256 = _endpointIdUint256;
        sponsorWallet = _sponsorWallet;
    }

    // Calls the AirnodeRrp contract with a request.
    // airnodeRrp.makeFullRequest() returns a requestId to hold onto.
    // The response will be delivered to fulfillUint256() shown below.
    function makeRequestUint256() external {
        bytes32 requestId = airnodeRrp.makeFullRequest(
            airnode,
            endpointIdUint256,
            address(this),
            sponsorWallet,
            address(this),
            this.fulfillUint256.selector,
            ""
        );
        // Store the requestId
        expectingRequestWithIdToBeFulfilled[requestId] = true;
        emit RequestedUint256(requestId);
    }

    // AirnodeRrp will call back with a response
    function fulfillUint256(bytes32 requestId, bytes calldata data)
        external
        onlyAirnodeRrp
    {
        // Verify the requestId exists
        require(
            expectingRequestWithIdToBeFulfilled[requestId],
            "Request ID not known"
        );
        expectingRequestWithIdToBeFulfilled[requestId] = false;
        uint256 qrngUint256 = abi.decode(data, (uint256));
        // Do what you want with `qrngUint256` here...
        emit ReceivedUint256(requestId, qrngUint256);
    }
}
```

In practice, the requester implements two functions that are specific to
_requesting_ and _receiving_ a random number from the QRNG service. Consider the
following flow to understand how to call for a random number.

1. The function `makeRequestUint256()` calls `airnodeRrp.makeFullRequest()` to
   request a random number, which in turn returns a `requestId`. The `requestId`
   is stored in the mapping `expectingRequestWithIdToBeFulfilled` for reference
   in the callback function.

2. The function `fulfillUint256` is the callback to receive the random number
   from the QRNG service. The callback contains the `requestId` returned by the
   initial request and the `data`, which contains the random number. The
   `requestId` is verified and removed from the mapping
   `expectingRequestWithIdToBeFulfilled`.

An additional pair of functions
([makeRequestUint256Array()](https://github.com/api3dao/qrng-example/blob/main/contracts/QrngExample.sol#L98-L113)
and
[fulfillUint256Array()](https://github.com/api3dao/qrng-example/blob/main/contracts/QrngExample.sol#L115-L131))
can be used to acquire an array of random numbers.

### Set the Parameters

The function `makeRequestUint256()` calls `airnodeRrp.makeFullRequest()` which
requires several parameters, three of which must be set prior to calling
`airnodeRrp.makeFullRequest()`.

```solidity
address public airnode;
bytes32 public endpointIdUint256;
address public sponsorWallet;
```

- `airnode`: The airnode address of the desired QRNG service provider.
- `endpointIdUint256`: The Airnode endpoint ID that will return a single random
  number.
- `sponsorWallet`: A wallet derived from the requester' contract address, the
  Airnode address, and the Airnode xpub. Used to pay gas costs to acquire a
  random number.

Set the value of the `airnode` and `endpointIdUint256` prior to using the
requester. The most common method is a script that calls
`setRequestParameters()`. The parameter `sponsorWallet` is created by the
aforementioned script automatically.

- [2_setup.js](https://github.com/api3dao/qrng-example/blob/main/deploy/2_setup.js) -
  Script to update the parameters in a requester.
- [apis.json](https://github.com/api3dao/qrng-example/blob/main/data/apis.json) -
  Values used by the script for some of the parameters. Also see
  [Providers](./providers.md) for a list of Airnode addresses and their
  associated endpoint IDs.

Once parameters are set, the requester can make a request to get a random number
as often as needed without passing any parameters. The parameters can be altered
later to access other QRNG service providers in the future.

::: tip Sponsor Wallet

The above mentioned script from the `qrng-example` project also
[sets the sponsor wallet](https://github.com/api3dao/qrng-example/blob/main/deploy/2_setup.js#L11-L28)
used to pay gas costs. An alternate method is to use the `airnode-admin` CLI as
detailed in the following section, _Step 3: Sponsor the Requester_.

:::

### Sponsor the Requester

The requester must be sponsored to pay for the gas costs when Airnode places the
random number on-chain in response to a request. Requesters can be sponsored
using a script or, as an alternate method, using the
[airnode-admin CLI](/airnode/v0.7/reference/packages/admin-cli.md#sponsor-requester).

Refer to the
[Sponsor a Requester](/airnode/v0.7/grp-developers/requesters-sponsors.md#how-to-sponsor-a-requester)
doc for a detailed explanation and other instructions to create a sponsor wallet
for a requester. The sponsor wallet is applied to a requester using the
`airnode-admin` CLI as shown below.

```bash
npx @api3/airnode-admin sponsor-requester \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --sponsor-mnemonic "cricket...oppose" \
  --requester-address 0x2c...gDER7

# CLI output
Requester 0x2c...gDER7 sponsored using sponsorAddress 0xF4...dDyu9
```

See the
[airnode-admin CLI](/airnode/v0.7/reference/packages/admin-cli.md#sponsor-requester)
for additional options to sponsor a requester.

- `provider-url` - A chain provider such as Infura pointing to the desired
  chain.
- `sponsor-mnemonic` - A wallet mnemonic to pay gas costs with its default
  account unless otherwise specified..
- `requester-address` - The on-chain address of the requester (smart contract).

You can use an existing wallet's mnemonic but it is recommended to create one
specifically for your requester's sponsor wallet.

<airnode-SponsorWalletWarning/>

## QRNG on YouTube

See the YouTube video
[API3 Developers: QRNG Access & Usage Guide](https://www.youtube.com/watch?v=hnQ5Hd-EGbQ)
that also covers how to use QRNG.
