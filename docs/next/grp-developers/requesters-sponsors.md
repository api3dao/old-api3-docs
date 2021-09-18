---
title: Requesters and Sponsors
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

As a developer it helps to understand what a **requester** is and what a **sponsor** does. They are both important parts of the Airnode ecosystem. This doc will further define them and walk you through the process to derive a sponsor wallet and to sponsor a requester using the admin CLI commands. 

## What is a Requester?

The term [requester](../concepts/requester.md) is important to remember. When requester is mentioned, the reference is to your smart contract that calls an Airnode.

> ![image](../assets/images/requesters-sponsors-1.png)

As an example see the `myContract.sol` contract in the diagram within the [Overview](./) doc, it is a requester.

## What is a Sponsor?

Equally important is the term [sponsor](../concepts/sponsor.md). A sponsor is an entity such as yourself, an organization, etc. Sponsors create relationships between requesters and Airnodes.

### Sponsor's Requester/Airnode Relationships
As a sponsor you will use the address of an Ethereum account _(called a [`sponsorAddress`](../concepts/sponsor.md#sponsoraddress))_ from a digital wallet you own to "sponsor a requester"  and then with the same `sponsorAddress` "derive a [`sponsorWallet`](../concepts/sponsor.md#sponsorwallet)" for an Airnode. This action creates a relationship between a sponsor's requester and a particular Airnode. You do this because a sponsor is the entity that pays for the fulfillment of a request, the gas costs the Airnode will incur. These costs will be withdrawn from the `sponsorWallet` of the Airnode when the requester calls it.

In the diagram below a sponsor uses a mnemonic to sponsor a requester with the Admin CLI. The CLI will use the default address of the mnemonic as the `sponsorAddress` for the sponsorship. Next the sponsor will derive a `sponsorWallet` for an Airnode using the same `sponsorAddress`.

Because the requester was sponsored with the same `sponsorAddress` that was used to derive the `sponsorWallet` of the Airnode, the requester can now make requests of the Airnode.

>![image](../assets/images/sponsor-overview.png)

---

In the above diagram it is possible to use the same sponsorAddress `(0xF4...dDyu9)` to derive other sponsor wallets for other Airnodes. And it is possible to sponsor more than one requester with this same sponsorAddress. However it is important to remember that all requesters can now access all the  Airnodes regardless if they need to. There is no harm in this scenario.

### Advanced Scenarios
- Two requesters sponsored with the same sponsorAddress `(0xF4...dDyu9)` could access the same Airnode having a sponsor wallet derived by sponsorAddress `(0xF4...dDyu9)`.

- Using two separate sponsorAddresses (from two different Ethereum accounts), you can derive two separate sponsor wallets for the same Airnode, say `(0xF4...dDyu9)` and `(0xG9...fFzc5)`. Then you can sponsor one requester each with `(0xF4...dDyu9)` and the other with `(0xG9...fFzc5)`. Now each requester will deplete funds from a separate sponsor wallet. 

- You have derived two sponsor wallets for two different Airnodes using different sponsorAddresses, say `(0xF4...dDyu9)` and `(0xG9...fFzc5)`. You have one requester that needs to makes requests from each Airnode. Simply sponsor the requester twice with both sponsorAddresses.

### Things to Remember

When you sponsor a requester with a sponsorAddress, you are giving it permission to use the sponsor wallet associated with the Airnode (created with the same sponsorAddress). 

When the requester makes a request to the Airnode, the Airnode will use funds from the corresponding sponsor wallet to pay gas costs in response to the request. Therefore the sponsor pays for the fulfillment of the request.

## Admin CLI Commands

There are several sponsor and requester related commands in the [Admin CLI Commands](../reference/cli-commands.md#create-requester) package. You can also see a list of available commands using `npx @api3/airnode-admin --help`.

In the next two sections of this doc you will use two commands from the @api3/airnode-admin package to _derive a sponsor wallet_ and to _sponsor a requester_.

1. [`derive-sponsor-wallet`](../reference/cli-commands.md#derive-sponsor-wallet)creates a sponsor wallet associated with an Airnode.
2. [`sponsor-requester`](../reference/cli-commands.md#sponsor-reqeuster) sponsors a requester.


## How to Derive a Sponsor Wallet

To use a particular Airnode you must derive a _sponsor wallet_. Once the sponsor wallet is created it must be funded using the public address returned by the command`derive-sponsor-wallet`. Each Airnode keeps a separate list of individual sponsor wallets that can access the Airnode. Learn more about [sponsor wallets](../reference/concepts/sponsor-wallet.md).

To derive a sponsor wallet for an Airnode execute the `sponsor-wallet` command using the parameters detailed in the list below. There are no transaction gas costs to do so.

- `providerURL` a blockchain provider URL (such as Infura) with providerID for a desired network
- `airnode` of address the desired Airnode
- `sponsor` the sponsorAddress (an address of an Ethereum account) owned by a sponsor

:::: tabs
::: tab Linux/Mac
```bash
npx @api3/airnode-admin derive-sponsor-wallet \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --airnode 0xe1...dF05s \
  --sponsor 0xF4...dDyu9
```
:::
::: tab Windows
```bash
npx @api3/airnode-admin derive-sponsor-wallet ^
  --providerUrl https://ropsten.infura.io/v3/<KEY> ^
  --airnode 0xe1...dF05s ^
  --sponsor 0xF4...dDyu9
```
:::
::::

The command `derive-sponsor-wallet` will return the public address of the sponsor wallet to be funded by the sponsor. In this example it is `0xa5...gS4E9`.

<Fix>The return value below needs to be updated with the real McCoy.</Fix>

> `Derived the address of the wallet for sponsor with address 0xF4...dDyu9 
>  by Airnode with address 0xe1...dF05s to be 0xa5...gS4E9`

If you forget the public address of the sponsor wallet simply run derive-sponsor-wallet again. Since the wallet already exists for the airnodeAddress/sponsorAddress pair it will just return the address.

<SponsorWalletWarning/>

## How to Sponsor a Requester

When a sponsor uses the same `sponsorAddress` to "sponsor a requester" and to "derive a sponsor wallet" for an Airnode, the requester will have permission to make requests to the Airnode on behave of the sponsor. This allows the sponsor to cover the gas costs incurred by the Airnode when responding to the request. Sponsors need to keep their sponsor wallets topped off if they want Airnodes to fulfill requests made by their requesters. However this does not cover the cost of API data that the Airnode serves, see [API Provider Fees](fees.md#api-provider-fees). 

To sponsor a requester you will need the following. Your requester should already be deployed on-chain.

- `providerURL` A blockchain provider URL (such as Infura) with providerID for the desired network.
- `mnemonic`  Used for gas costs to fund the sponsorship and used to derive the `sponsorAddress` from the default address. The `sponsorAddress` will be needed to derive a `sponsorWallet` for an Airnode.
- `requesterAddress` The address of the requester (smart contract).

:::: tabs
::: tab Linux/Mac
```bash
npx @api3/airnode-admin sponsor-requester ^
  --providerUrl https://ropsten.infura.io/v3/<KEY> ^
  --mnemonic "cricket...oppose" ^            
  --requester 0x2c...gDER7        
```
:::
::: tab Windows
```
npx @api3/airnode-admin sponsor-requester \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --mnemonic "cricket...oppose" \           
  --requester 0x2c...gDER7        
```
:::
::::

The command `sponsor-requester` will return the addresses for the requester and sponsor. 

> Sponsored 0x2c...gDER7 by sponsor with sponsorAddress 0xF4...dDyu9

## Record Keeping

During and after deriving a sponsor wallets and sponsoring requesters there are a few things to keep track of.

|Item|Description|
|-|-|
|requesters|Remember which sponsorAddress you used for each Airnode when you derive its sponsor wallet. Also write down which sponsor you used to sponsor any requesters.|
|sponsor wallets|Remember the sponsorAddress of sponsor wallets for each Airnode. For each Airnode you have derived a sponsor wallet, the Airnode keeps the private key and returns you the public address which you use to fund the sponsor wallet.|

You can acquire the public address of a sponsor wallet later, if you loose it, by running the command `derive-sponsor-wallet` again. Since the sponsor wallet was already created for the sponsorAddress/airnodeAddress pair, the command will only return the public address for the wallet. However you must use the same sponsorAddress used when the wallet was first creates or a new sponsor wallet will be created.