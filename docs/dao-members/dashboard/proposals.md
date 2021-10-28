---
title: Working with Proposals
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Staking tokens in the DAO pool gives you governance rights to create and vote on
proposals.

To create a proposal, you must not have created a proposal in the last seven
days and you must hold at least 0.1% of the total pool shares. This required
percentage, as well as other DAO parameters, can be adjusted by the DAO as
described in
[Dashboard Attributes](../contract-architecture/dashboard-attributes.md). To
view the percentage of pool shares for an address, visit the
[DAO Tracker wallets page](https://enormous.cloud/dao/api3/tracker/wallets).

You can vote on all proposals regardless of the percentage of pool shares you
own. See [How to Vote](voting.md) for instructions. Alternatively, you can
delegate your voting power to someone else. See the
[delegation pitch section](https://forum.api3.org/c/delegation-pitch/7) of the
API3 forum for posts by community members offering to act as delegates or to
post your own delegate pitch.

## Getting Started

1. Access the [DAO Dashboard](https://api3.eth.link/)
2. Click the **Connect Wallet** button in the upper right hand corner and
   connect to your wallet using the Ethereum Mainnet.

<!-------------------------->

## Proposals and History

The **Governance** page displays a list of active proposals and the **History**
page displays proposals that have been executed or rejected.

:::: tabs

::: tab Read & Learn

1. Navigate to the **Governance** page.

> Here you can browse and create proposals, view the treasury, and delegate your
> votes. **Active proposals** lists all proposals open for voting.

> There are two types of proposals, primary and secondary. Primary proposals
> require an absolute majority vote, while secondary proposals require a 15%
> vote to pass. For each proposal in the list you can see the title, proposal
> type, vote deadline, and vote status.

> To view additional details click on the desired proposal. The detail view
> shows your vote delegation status and a **Summary** section with the details
> of the proposal.

2. To view previous governance proposals, navigate to the **History** page.

> Proposals in the history list have either been executed or rejected.

:::

::: tab Watch and Learn

  <iframe width="560" height="315" src="https://www.youtube.com/embed/k0XEkJtWAGk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

:::

::::

<!-------------------------->

## Proposal Creation

Proposals are an important part of DAO governance and can be used to fund DAO
projects or ratify DAO level decisions like updating the stake target.

Creating a proposal involves the following steps:

1. (Recommended) Promote your idea and gather feedback on the API3 forum using a
   [sentiment check post](https://forum.api3.org/t/sentiment-check-template/56).
   Generally, ideas receiving community engagement on the forum are more likely
   to pass once crafted as official proposals.
2. Create an
   [official proposal post](https://forum.api3.org/t/api3-dao-example-proposal-template/52)
   on the API3 forum. This should contain a link to the
   [proposal description on IPFS](#using-ipfs-for-proposals).
3. After receiving feedback from the above steps, create a formal proposal using
   the DAO dashboard as described below.
4. Provide a link to this proposal in the official proposal forum thread to
   direct community members on where to vote.

To create a new proposal using the DAO dashboard:

  <!--**Proposal Types**

  In general, a proposal type of _Primary_ has a larger treasury and more permissions but has more stringent voting settings than a _Secondary_ type. For a technical breakdown of the different permissions granted to the DAO's proposal types (and corresponding Agents) see this [README](https://github.com/api3dao/api3-dao/blob/develop/packages/dao/README.md#permissions).
  -->

:::: tabs

::: tab Read & Learn

1. Click the **New Proposal** button on the Governance page.

2. Select the **Proposal Type** on the proposal form.

> Proposals can be submitted to either the _Primary_ or _Secondary_ voting
> types. These two types have access to separate treasuries, have different
> voting settings, and have different permissions to change contract settings.
> For a technical breakdown of the different permissions granted to the DAO's
> proposal types (and corresponding Agents) see this
> [README](https://github.com/api3dao/api3-dao/blob/develop/packages/dao/README.md#permissions).

3. Enter a descriptive **Title**.

   > The title will appear on the Governance page and is used to identify the
   > proposal. A good descriptive title will help others navigate the proposal
   > list.

4. Enter a **Description** that details the proposal.
   > A description can be typed text but consider using a PDF hosted on IPFS.
   > See the [Using IPFS for Proposals](proposals.md#using-ipfs-for-proposals)
   > section below. Also consider adding a link back the forum where you posted
   > your proposal for discussion.
5. Enter the **Target Contract** address.
   > This is the address of the contract to call. For example the commonly used
   > target contract for USDC is `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`.
6. Enter the **Contract Target Signature**.
   > Defines the signature of the function to call within the target contract.
   > For the target contract USDC mentioned above use
   > `transfer(address, unit256)`
7. Enter an **ETH Value**.
   > You can use zero if the target function is not `payable`.
8. Enter **Parameters** which are the arguments that will be used to satisfy the
   signature of the target contract function.
   > The arguments must be provided in JSON array format where the values are
   > stringified.

> For public addresses use the checksum version of the address where some
> alphabetical characters are capitalized. Copy your address to etherscan to get
> its checksum value. ENS names are allowed. See the
> [Using ENS Names](proposals.md#using-ens-names) section below.

> When using USDC remember it has 6 decimals. Add 6 zeros after the amount you
> are asking for.

9. When you are ready, click the **Create** button at the bottom of the page.
   > The proposal is then added to the proposal list and can be voted on.

:::

::: tab Watch & Learn

  <iframe width="560" height="315" src="https://www.youtube.com/embed/XO1iA3wSYMQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

:::

::::

## Proposal Execution

A proposal is ready for execution if:

1. the proposal hasn't already been executed, and
2. greater than 50% of all voting power has voted "yes" on the proposal,

OR

1. the proposal hasn't already been executed, and
2. the proposal's voting period has ended, and
3. the total "yes" vote exceeds the "no" vote, and
4. at least 50% (for Primary voting app proposals) or 15% (for Secondary voting
   app proposals) of all voting power has voted "yes" on the proposal.

Once a proposal has satisfied either set of criteria, anyone can send a
transaction executing it using the Execute button that appears on its details
page, as shown below:

> <p align="left">
>  <img src="../figures/dashboard/executable-proposal.png" width="400" />
> <br/>Click image to enlarge.
> </p>

## Using ENS Names

You are encouraged to use the [ENS app](https://app.ens.domains/) to register a
name and associate it with an Ethereum account. Then, while entering your
proposal parameters, you can use this ENS name instead of the account address.
Before making the transaction that will create the proposal, the DAO dashboard
will look up the address that the ENS name is pointing to and use the raw
address in the proposal. Therefore, changing the address that the ENS name is
pointing to after this look up operation **WILL NOT** have an affect on the
proposal.

For voters to see your ENS name instead of the raw address on the proposal
details page, you will have to use the [ENS app](https://app.ens.domains/) to
set a reverse record pointing to your ENS name (i.e., you need to have your raw
address point to the ENS name). If your proposal will make a
`transfer(address,amount)` call to an ERC20 token contract where `address` is
the address of a _multisig_ wallet, you can
[set a reverse record with the multisig](https://medium.com/the-ethereum-name-service/you-can-now-manage-ens-names-with-gnosis-safe-9ddcb7e6c4ac)
to your ENS name. See Parameters in
[this proposal](https://api3.eth.link/#/history/secondary-6) for an example.

## Using IPFS for Proposals

Consider this use case: You posted on the [API3 forum](https://forum.api3.org/)
about a potential proposal. You received positive feedback and decide to
formally create a proposal using the DAO dashboard. In the proposal's
description field you provide a link back to the forum so people can again see
the proposal details. How does the voter know that it's the exact same proposal
they had read earlier in the forum? IPFS addressing content by its hash is
convenient here, because any change you'll make to your proposal will change its
hash.

![image](../assets/images/ipfs-proposals.png)

To host a proposal description on IPFS:

1. Create a PDF version of the proposal.
2. Upload the PDF to [Fleek](https://fleek.co) or your preferred IPFS hosting
   provider. To do so using Fleek, create a free Basic account and use the
   Upload tool on the Storage page. Fleek will provide an IPFS hash of the PDF,
   for example: `bafybeifl4prxv75fgumtjh4ovklfkp7zzt7dwkl4xmndv37gtcalwpam2u`.
3. If using Fleek, append the hash to `https://ipfs.fleek.co/ipfs/`. The URL for
   the above hash would then be:
   > <a style="overflow-wrap: break-word;" target="_blank"
   >  href="https://ipfs.fleek.co/ipfs/bafybeifl4prxv75fgumtjh4ovklfkp7zzt7dwkl4xmndv37gtcalwpam2u">
   > https://ipfs.fleek.co/ipfs/bafybeifl4prxv75fgumtjh4ovklfkp7zzt7dwkl4xmndv37gtcalwpam2u
   > </a>
4. Add the URL to your forum posting and later to the description field of your
   DAO dashboard proposal.

Remember that the URL the voter sees in the DAO dashboard proposal description
field is final and should match the URL on the forum.

**Updating a PDF**

You can update your PDF if needed before creating a formal proposal using the
DAO dashboard. First, upload the new version to your IPFS provider; since the
content has changed, it will get a new hash. Next, update the link in your forum
posting. Lastly, create the proposal using the DAO dashboard. Since the proposal
contains the IPFS hashed link in the description field, the PDF should be
considered final and changing the hashed link in the forum at this point would
caution the voter.
