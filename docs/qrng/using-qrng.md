---
title: How to use API3 QRNG
---

<TitleSpan>QRNG</TitleSpan>

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

Upon request, [Airnode](/airnode/v0.6/) calls a designated API operation and
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
[accesses an Airnode](/airnode/v0.6/grp-developers/) to acquire data from API
operations.

## QRNG Example Project

The [qrng-example](https://github.com/api3dao/qrng-example) project (GitHub
repo) demonstrates using the Airnode request–response protocol to receive QRNG
services. It is recommended to run the example project to learn how it uses the
QRNG service on a testnet, and read the associated README file. It also contains
example code that will be useful when creating a requester (smart contract) that
requests a random number, and is referenced frequently within this doc.

## Using the QRNG Service

Preparing to use the QRNG service involves three steps.

- **Create a Requester**: Create a requester (smart contract) to make a request
  and add a callback function to accept the response.
- **Set the Parameters**: After the requester is added to the desired chain, set
  its parameters used to make a request.
- **Sponsor the Requester**: The requester needs to be sponsored to cover gas
  costs for the on-chain response.

### Step 1: Create a Requester

Call the QRNG service using the _request–response protocol (RRP)_ implemented by
the on-chain `AirnodeRrpV0` contract. Refer to the
[Calling an Airnode](/airnode/v0.6/grp-developers/call-an-airnode.md) doc for a
detailed explanation and instructions to make a `AirnodeRrpV0` request. The
[@api3/airnode-protocol](https://www.npmjs.com/package/@api3/airnode-protocol)
package is distributed via npm.

The code example below is what a requester might look like when requesting a
single random number. The code is extracted from the
[QrngExample.sol](https://github.com/api3dao/qrng-example/blob/main/contracts/QrngExample.sol)
contract and has been simplified to only request a single random number with
each call.

```js
//SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
import "@api3/airnode-protocol/contracts/rrp/requesters/RrpRequesterV0.sol";

contract QrngExample is RrpRequesterV0 {
    event RequestedUint256(bytes32 indexed requestId);
    event ReceivedUint256(bytes32 indexed requestId, uint256 response);

    // These can be set using setRequestParameters())
    address public airnode;
    bytes32 public endpointIdUint256;
    address public sponsorWallet;

    mapping(bytes32 => bool) public expectingRequestWithIdToBeFulfilled;

    constructor(address _airnodeRrp) RrpRequesterV0(_airnodeRrp) {}

    // Set parameters used by airnodeRrp.makeFullRequest(...)
    // See makeRequestUint256()
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

    // Calls the AirnodeRrp contract with a request
    // airnodeRrp.makeFullRequest() returns a requestId to hold onto.
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
   from `AirnodeRrp`. The callback contains the `requestId` returned by the
   initial request and the `data`, which contains the random number. The
   `requestId` is verified and removed from the mapping
   `expectingRequestWithIdToBeFulfilled`.

### Step 2: Set the Parameters

The function `makeRequestUint256()` calls `airnodeRrp.makeFullRequest()` which
requires seven parameters, four of which self-populate. The other three need to
be set as a best practice.

```solidity
address public airnode;
bytes32 public endpointIdUint256;
address public sponsorWallet;
```

Set the value of these parameters prior to using the requester. The most common
method is a script that calls `setRequestParameters()`. Once set, the requester
can make a request to get a random number as often as needed without passing any
parameters. The parameters can be altered later to access other QRNG sources in
the future. See the following examples in the QRNG example project.

- [script](https://github.com/api3dao/qrng-example/blob/main/deploy/2_setup.js) -
  Script to update the parameters in a requester.
- [script data](https://github.com/api3dao/qrng-example/blob/main/data/apis.json) -
  Values used by the script for the parameters.

::: tip Sponsor Wallet

The above mentioned script from the `qrng-example` project also
[sets the sponsor wallet](https://github.com/api3dao/qrng-example/blob/main/deploy/2_setup.js#L11-L28)
used to pay gas costs. An alternate method is to use the `airnode-admin` CLI as
detailed in the following section, _Step 3: Sponsor the Requester_.

:::

### Step 3: Sponsor the Requester

The requester must be sponsored to pay for the gas costs when Airnode places the
random number on-chain in response to a request. Requesters can be sponsored
using a script or, as an alternate method, using the
[airnode-admin CLI](/airnode/v0.6/reference/packages/admin-cli.md#sponsor-requester).

Refer to the
[Sponsor a Requester](/airnode/v0.6/grp-developers/requesters-sponsors.md#how-to-sponsor-a-requester)
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
[airnode-admin CLI](/airnode/v0.6/reference/packages/admin-cli.md#sponsor-requester)
for additional options to sponsor a requester.

- `provider-url` - A chain provider such as Infura pointing to the desired
  chain.
- `sponsor-mnemonic` - A wallet mnemonic to pay gas costs with its default
  account unless otherwise specified..
- `requester-address` - The on-chain address of the requester (smart contract).

You can use an existing wallet's mnemonic but it is recommended to create one
specifically for your requester's sponsor wallet.

<airnode-SponsorWalletWarning/>
