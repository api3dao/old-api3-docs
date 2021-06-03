---
title: Become a Requester
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Becoming a _requester_ is all about the desire to consume the off-chain API data that an Airnode provides. A _requester_ is an entity (individual, business, etc.) whose contracts make requests to Airnodes. These contracts are called clients. A _requester_ should not be confused with an _end user_ who is someone that uses a requester's client contracts, usually as part of a dApp.

Setting up a requester record is needed to allow client contracts access to one or more Airnodes. A requester record is used to endorse client contracts and endorse Airnodes.

The following diagram illustrates how to become a requester and its endorsements.

![become-requester](../assets/images/become-requester.png)

## Part 1: Create a Requester Record

Each requester needs to create a requester record, and get assigned a requester index. This is fairly easy, using the `create-requester` command from the [@api3/airnode-admin](https://github.com/api3dao/airnode/tree/pre-alpha/packages/admin#create-requester) package.

To create a new requester record you will need the following.

- providerURL such as the URL with your Infura providerID for the Ropsten network.
- A mnemonic for gas to fund the record creation.
- An address that will be used to administer the requester record in the future, keep it secret. 

::: tip mnemonic
Use this wallet for maintenance costs at API3 keeping a minimal amount of eth in it. This wallet pays the transaction gas costs to write the requester record, client contract endorsements, etc. This is not the wallet(s) that will pay gas costs to actually execute any Airnodes, for that the Airnodes themselves will create designated wallets on behalf of your requester record.
:::

```bash
npx @api3/airnode-admin create-requester \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --mnemonic "cricket oppose ..." \ # Used to pay the gas costs for this transaction.
  --requesterAdmin 0xaBd9daAdf...   # A secret admin address.
```

## Part 2: Endorse Client Contracts

A requester endorses a client contract allowing it make Airnode requests on behave of the requester. Your client contract should already be deployed. 

Endorsing a client contract means it can make Airnode requests, paid for by the designated wallet associated with the Airnode and the requesterIndex of your requester record. [Part 3](become-a-requester.md#part-3-endorse-airnodes) will explain more about designated wallets.

To endorse a client contract you will need the following.

- providerURL such as the URL with your Infura providerID for the Ropsten network.
- A mnemonic for gas to fund the endorsement.
- The requesterIndex returned from the call to create-requester. (Part #1 above)
- The public address of the client contract.

```bash
npx @api3/airnode-admin endorse-client \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --mnemonic "nature about salad..." \ # Used to pay the gas costs for this transaction.
  --requesterIndex 6 \                 # The requesterIndex of the requester record.
  --clientAddress 0x2c2e12...          # The public address of the contract to endorse.
```

## Part 3: Endorse Airnodes

To endorse a particular Airnode, a requester instructs the Airnode to derive a _designated wallet_ for the requester  using the Airnode's ID and the requester's requesterIndex. Each Airnode keeps a list of requester designated wallets that can access the Airnode. 

Client contracts endorsed by a requester will have access to all Airnodes the requester has endorsed. This allows the requester to cover the gas cost when accessing an Airnode. However this does not cover the cost of API data that the Airnode serves, see [API Provider Fees](fees.md#api-provider-fees). Requesters need to keep their designated wallets topped off if they want the Airnodes to fulfill requests made by their endorsed client contracts.

Since the designated wallet is recorded in the cloud provider (i.g., AWS) where Airnode functions live, there are no on-chain transaction gas costs when endorsing an Airnode.

The requester should keep in mind that a designated wallet is custodial, i.e., the Airnode keeps the private key, and the funds are trusted with the Airnode. Therefore, a requester should not fund a designated wallet with more then they can trust the Airnode with. Learn more about custodial designated wallets in [Fees](fees.md#airnode-execution-fees)

To endorse an Airnode simply tell any Airnode to derive a _designated wallet_ for your requesterIndex.

- providerURL such as the URL with your Infura providerID for the Ropsten network.
- The desired Airnode's ID, airnodeId.
- The requester's requesterIndex that was generated when creating a requester record.

```bash
npx @api3/airnode-admin derive-designated-wallet \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --airnodeId 0xe1e0dd... \ # The ID of the Airnode the requester wants access to.
  --requesterIndex 6        # The requesterIndex identifies the requester record.
```

## Record Keeping

During and after creating/managing your requester record there are some items you should write down for future use.

|Item|Description|
|-|-|
|Maintenance wallet (mnemonic)|A minimally funded mnemonic used to change your requester record and endorsements in the future.|
|requesterIndex|An identifer (number) you received when creating a requester record.|
|requesterAdmin|An address you created when creating a requester record.|
|Airnode designated wallets|For each Airnode you have endorsed a custodial designated wallet was created. The Airnode keeps the private key and returns you the public key which you use to add funds. |

## Other Requester Commands

There are other commands to further extend the requester's use of Airnodes. They are listed in [Reference > Commands](technology/commands-requester.md).
