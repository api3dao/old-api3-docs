---
title: QRNG Example Project
docSetName: QRNG
folder: How to Guides
basePath: /qrng
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

The [qrng-example](https://github.com/api3dao/qrng-example) project (GitHub
repo) demonstrates how to build a smart contract (known as a requester) using
the Airnode request–response protocol to receive QRNG services. It is
recommended to run the example project to learn how it uses the QRNG service on
a testnet, and read the associated README file. It also contains example code
that will be useful when creating a requester (smart contract) that requests a
random number.

- [qrng-example/contracts/](https://github.com/api3dao/qrng-example/tree/main/contracts)
  - `QrngExamples.sol`: A sample requester used to call the QRNG service.
- [qrng-example/deploy/](https://github.com/api3dao/qrng-example/tree/main/deploy)
  - `deploy.js`: Script that deploys a requester to a chain.
  - `setup.js`: Script that sets the parameters on the requester contract. These
    parameters are used when calling the QRNG service.
  - `fund.js`: Script that funds the wallet the requester uses to pay the gas
    costs.

::: tip Gas Costs

Using the QRNG service is free, meaning there is no subscription fee to pay.
There is a gas cost incurred on-chain when Airnode places the random number
on-chain in response to a request, which the requester needs to pay for.

:::

## Sponsor Wallet

The QRNG example project
[sets the sponsor wallet](https://github.com/api3dao/qrng-example/blob/main/deploy/2_setup.js#L11-L28)
using the requester address. The wallet is then used to pay gas costs when the
Airnode responds to a request. An alternate method is to use the
[Admin CLI](/airnode/v0.9/reference/packages/admin-cli.md) as is the case with
the [Remix Example Project](./remix-example.md).

<airnode-SponsorWalletWarning/>

## Withdrawals

In this example, the requester contract was written with the scope of
demonstrating on-chain requests for random numbers.

::: warning

For brevity, the requester contract does not contain withdrawal or other
additional functionality.

:::

For those inclined, withdrawal functionality can be added to the requester
contract. First, funds must be transferred from `sponsorWallet` to `sponsor`.
Since the requester contract is
[set as the sponsor](https://github.com/api3dao/qrng-example/blob/46c93797902f25a46b73e40f8fa52c745b64ebb2/contracts/QrngExample.sol#L66),
the requester contract needs to make the withdrawal request by calling
`requestWithdrawal` from the
[WithdrawalUtilsV0](https://github.com/api3dao/airnode/blob/4f3454cf40e1b0a1373e954df96ac22e1ce2e43f/packages/airnode-protocol/contracts/rrp/WithdrawalUtilsV0.sol#L27)
contract. The `AirnodeRrpV0` contract inherits this contract and therefore the
[published addresses](../../airnode/v0.7/reference/airnode-addresses.md) can be
used. Second, a withdrawal function must be added to the requester contract such
that the owner of the requester contract can transfer the requester contract
balance to their address.
