---
title: Requesters and Sponsors
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

As a developer it helps to understand what a **requester** is and what a **sponsor** does. They are both important parts of the Airnode ecosystem. This doc will further define them and walk you through the process to derive a sponsor wallet and to sponsor a requester using the admin CLI commands. 

## What is a Requester?

The term **requester** is important to remember. It is mentioned in these docs and in the GitHub code. When requester is mentioned, the reference is to your smart contract that calls an Airnode. 

> ![image](../assets/images/requesters-sponsors-1.png)

As an example see the `myContract.sol` contract in the diagram within the [Overview](./) doc, it is a requester.

## What is a Sponsor?

Equally important is the term **sponsor** also found throughout the docs and code. A sponsor is an entity such as yourself, an organization, etc. 

As a sponsor you will use the address of an Ethereum account _(called a sponsorAddress)_ to "derive a sponsor wallet" for an Airnode, fund the wallet and then "sponsor a requester" with the same sponsorAddress. 

You do this because a sponsor is the entity that pays for the fulfillment of a request, the gas costs the Airnode will incur. These costs will be withdrawn from the sponsor wallet of the Airnode you have sponsored when the requester calls it.

In the diagram below a sponsor uses a sponsorAddress to "derive a sponsor wallet" for a specific Airnode and fund it. Then the sponsor uses the same sponsorAddress to "sponsor a requester". Because the requester was sponsored with the same sponsorAddress that was used to derive the sponsor wallet of the Airnode, the requester can now make requests of the Airnode.

>![image](../assets/images/sponsor-overview.png)

---

In the above diagram it is possible to use the same sponsorAddress `(0xF4...dDyu9)` to derive other sponsor wallets for other Airnodes. And it is possible to sponsor more than one requester with this same sponsorAddress. However it is important to remember that all requesters can now access all the  Airnodes regardless if they need to. There is no harm in this scenario.

**Some unique and more advanced scenarios.**
- Two requesters sponsored with the same sponsorAddress `(0xF4...dDyu9)` could access the same Airnode having a sponsor wallet derived by sponsorAddress `(0xF4...dDyu9)`.

- Using two separate sponsorAddresses (from two different Ethereum accounts), you can derive two separate sponsor wallets for the same Airnode, say `(0xF4...dDyu9)` and `(0xG9...fFzc5)`. Then you can sponsor one requester each with `(0xF4...dDyu9)` and the other with `(0xG9...fFzc5)`. Now each requester will deplete funds from a separate sponsor wallet. 

- You have derived two sponsor wallets for two different Airnodes using different sponsorAddresses, say `(0xF4...dDyu9)` and `(0xG9...fFzc5)`. You have one requester that needs to makes requests from each Airnode. Simply sponsor the requester twice with both sponsorAddresses.

**Things to remember:**

When you sponsor a requester with a sponsorAddress, you are giving it permission to use the sponsor wallet associated with the Airnode (created with the same sponsorAddress). 

When the requester makes a request to the Airnode, the Airnode will use funds from the correct sponsor wallet to pay gas costs in response to the request. Therefore the sponsor pays for teh fulfillment of the request.

<Fix> -----------> Marker: continue here to the end.</Fix>
## Admin CLI Commands

There are several sponsor and requester related commands in the [@api3/airnode-admin](../reference/cli-commands.md#create-requester) package. You can also see a list of available commands using `npx @api3/airnode-admin --help`.

In the next two sections of this doc you will use two commands from the @api3/airnode-admin package to _derive a sponsor wallet_ and to _sponsor a requester_.

<Fix>These links need fixing when CLI doc is ready.</Fix>

1. [`derive-sponsor-wallet`](../reference/cli-commands.md#derive-designated-wallet)creates a sponsor wallet associated with an Airnode.
2. [`sponsor-requester`](../reference/cli-commands.md#endorse-client) sponsors a requester.


## How to Derive a Sponsor Wallet

<Fix>Again the use of sponsor here is confusing</Fix>
To use a particular Airnode, derive a _sponsor wallet_ using an `airnodeAddress` and a `sponsor`. Once the wallet is created it must be funded using the public address returned by the command`derive-sponsor-wallet`. Each Airnode keeps a list of sponsor wallets that can access the Airnode. Learn more about [sponsor wallets](../reference/protocols/request-response/sponsor-wallet.md).

Since the sponsor wallet is recorded in the cloud provider (i.g., AWS) where Airnode functions live, there are no on-chain transaction gas costs when deriving a sponsor wallet.

To derive a sponsor wallet for an Airnode execute the `sponsor-designated-wallet` command using the parameters detailed in the list below.

<Fix>Below the use of sponsor is just confusing because it really means address and I feel compelled to say so.</Fix>
- A blockchain `providerURL` such as the URL with your Infura providerID on the Ropsten network.
- The `airnodeAddress` of the desired Airnode.
- A `sponsor` (public address of a wallet you control).

[@api3/airnode-admin sponsor-designated-wallet](../reference/cli-commands.md#derive-designated-wallet)

```bash
npx @api3/airnode-admin derive-designated-wallet \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --airnodeId 0xe1e0dd... \ # The ID of the Airnode the requester wants access to.
  --requesterIndex 6        # The requesterIndex identifies the requester record.

  # Returns
  Derived the address of the wallet designated for requester with index 6 
  by Airnode with ID 0xaebd88bf458dfc4899d... 
  to be 0xa5C073E31fAb1F8acf... # Here is the wallet's public address.
```

The command derive-sponsor-wallet will return the public address of the sponsor wallet to be funded.

<SponsorWalletWarning/>

## How to Sponsor a Requester

You sponsor a requester allowing it make Airnode requests on behave of the requester. Your client contract should already be deployed. 

Requesters that have been sponsored by the same `sponsor` that derived the sponsor wallet of an Airnode by a requester will have access to all Airnodes the requester has funded using the designated wallet. This allows the requester to cover the gas cost when executing an Airnode. However this does not cover the cost of API data that the Airnode serves, see [API Provider Fees](fees.md#api-provider-fees). Developers need to keep their sponsor wallets topped off if they want the Airnodes to fulfill requests made by their requesters.

Endorsing a client contract means it can make Airnode requests, paid for by a designated wallet associated with the Airnode and the requesterIndex from your requester record. [Part 3](sponsorship.md#part-3-funding-airnodes) will explain more about designated wallets.

To endorse a client contract you will need the following.

- A blockchain providerURL such as the URL with your Infura providerID on the Ropsten network.
- A mnemonic for gas to fund the endorsement.
- The `requesterIndex` returned from the call to create-requester. (Part #1 above)
- The `clientAddress` which is the public address of the client contract.

[@api3/airnode-admin endorse-client](../reference/cli-commands.md#endorse-client)

::: tip mnemonic
This wallet pays the transaction gas costs to write the requester record. This is not the wallet(s) that will pay gas costs to actually execute any Airnode, for that the Airnode themselves will create sponsor wallets on behalf of your sponsor record. [Part 3](sponsorship.md#part-3-funding-airnodes) will explain more about sponsor wallets.
:::

```bash
npx @api3/airnode-admin endorse-client \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --mnemonic "cricket oppose ...." \ # Used to pay the gas costs for this transaction.
  --requesterIndex 6 \                 # The requesterIndex of the requester record.
  --clientAddress 0x2c2e12...          # The public address of the contract to endorse.

  # Returns
  Endorsed 0x2c2e12... 
  by requester with index 6
```

The command `endorse-client` will return the client contract address and the requester index that were passed to execute the command. 

## Record Keeping

During and after deriving a sponsor wallets and sponsoring requesters there are a few things to keep track of.

|Item|Description|
|-|-|
|sponsors|Sponsors are a public address of a wallet you control. Write down which sponsor you used for each Airnode when you derive its sponsor wallet. Also write down which sponsor you used to sponsor any requesters.|
|sponsor wallets|* For each Airnode you have derived a sponsor wallet, the Airnode keeps the private key and returns you the public address which you use to add funds.|

\* You can acquire the public address of a sponsor wallet later, if you loose it, by running the command`sponsor-designated-wallet`again. Since the sponsor wallet was already created for the sponsor/airnodeAddress pair, the command will only return the known public address for the wallet. However you must use the same sponsor used when the wallet was first create or a new sponsor wallet wil be created.