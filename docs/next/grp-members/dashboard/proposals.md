---
title: Working with Proposals
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Staking tokens in the DAO pool gives you governance rights to create and vote on proposals. To create a proposal, you must hold at least 0.1% of the total pool shares and not have created a proposal in the last seven days. This required percentage, set in the [`Api3Pool.sol`](https://github.com/api3dao/api3-dao/blob/main/packages/pool/contracts/Api3Pool.sol) contract, can be adjusted by the DAO. You can vote on all proposals or delegate your voting power to someone else.
  
## Getting Started

1. Access the [DAO Dashboard](https://api3.eth.link/)
2. Click the **Connect Wallet** button in the upper right hand corner and connect to your wallet using the mainnet.

<!-------------------------->
## Proposals and History

  The **Governance** page displays a list of active proposals and the **History** page displays proposals that have been executed or rejected.

  :::: tabs
  ::: tab Read & Learn
  1. Navigate to the **Governance** page.

  Here you can browse and write proposals, view the treasury and delegate your votes.  The **Active proposals** list displays all proposals open for voting. There are two types of proposals, primary and secondary. Primary proposals require an absolute majority vote while secondary proposals require a 15% vote to pass. For each proposal in the list you can see the title, proposal type, vote deadline and vote status.

  To view additional details click on the desired proposal. In addition to the information from the list item selected, the detail view shows your vote delegation status and a **Summary** section with the details of the proposal.

  2. To view previous governance proposals select **History** in the navigation bar.
  
  > Proposals in the history list have either been executed or rejected.
  :::

  ::: tab Watch and Learn
  > <iframe width="560" height="315" src="https://www.youtube.com/embed/k0XEkJtWAGk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  :::
  ::::

<!-------------------------->
## Proposal Creation
  Proposals are an important part of DAO governance and can be used to fund DAO projects or ratify DAO level decisions like updating the stake target.

  Before making a proposal, promote it on the [API3 forum](https://forum.api3.org/) where everyone can give feedback beforehand. Consider making a PDF of the proposal and placing it on IPFS. See the [Using IPFS for Proposals](proposals.md#using-ipfs-for-proposals) section below.

  To create a new proposal:
  - you must hold at least 0.1% of the total pool shares
  - you have not created a proposal in the last seven days

  <!--**Proposal Types**

  In general, a proposal type of _Primary_ has a larger treasury and more permissions but has more stringent voting settings than a _Secondary_ type. For a technical breakdown of the different permissions granted to the DAO's proposal types (and corresponding Agents) see this [README](https://github.com/api3dao/api3-dao/blob/develop/packages/dao/README.md#permissions).
  -->

  :::: tabs
  ::: tab Read & Learn

  1. Click the **New Proposal** button on the Governance page.

  2. Select the **Proposal Type** on the proposal form.

  > Proposals can be submitted to either the *Primary* or *Secondary* voting types. These two types have access to separate treasuries, have different voting settings, and have different permissions to change contract settings. For a technical breakdown of the different permissions granted to the DAO's proposal types (and corresponding Agents) see this [README](https://github.com/api3dao/api3-dao/blob/develop/packages/dao/README.md#permissions).

  3. Enter a descriptive **Title**.
  > The title will appear on the Governance page and is used to identify the proposal. A good descriptive title will help others navigate the proposal list.

  4. Enter a **Description** that details the proposal.
  > A description can be typed text but consider using a PDF hosted on IPFS. See the [Using IPFS for Proposals](proposals.md#using-ipfs-for-proposals) section below. Also consider adding a link back the forum where you posted your proposal for discussion.
  5. Enter the **Target Contract** address.
  > This is the address of the contract to call. For example the commonly used target contract for USDC is `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`.
  6. Enter the **Contract Target Signature**.
  > Defines the signature of the function to call within the target contract. For the target contract USDC mentioned above use `transfer(address, unit256)`
  7. Enter an **ETH Value**.
  > You can use zero if the target function is not `payable`.
  8. Enter **Parameters** which are the arguments that will be used to satisfy the signature of the target contract function.
  > The arguments must be provided in JSON array format where the values are stringified. 
  
  >For public addresses use the checksum version of the address where some alphabetical characters are capitalized. Copy your address to etherscan to get its checksum value. ENS names are allowed. See the [Using ENS Names](proposals.md#using-ens-names) section below. 

  >When using USDC remember it has 6 decimals. Add 6 zeros after the amount you are asking for.

  9. When you are ready, click the **Create** button at the bottom of the page.
  > After the proposal is created it is added to the proposal list and ready for voting.

  :::
  ::: tab Watch & Learn
  > <iframe width="560" height="315" src="https://www.youtube.com/embed/XO1iA3wSYMQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
4. at least 50% (for Primary voting app proposals) or 15% (for Secondary voting app proposals) of all voting power has voted "yes" on the proposal.

> <p align="left">
>  <img src="../../figures/dashboard/executable-proposal.png" width="400" />
> <br/>Click image to enlarge.
> </p>

## Using ENS Names

You can use the [ENS app](https://app.ens.domains/) to register a name and associate it with an Ethereum account. Then, while entering your proposal parameters, you can use this ENS name instead of the account address. Before making the transaction that will create the proposal, the DAO dashboard will look up the address that the ENS name is pointing to, and use the raw address in the proposal. Therefore, changing the address that the ENS name is pointing to after this look up operation **WILL NOT** have an affect on the proposal.

If you also want the voters to see the ENS name instead of the raw address to make your proposal more readable, you will have to use the [ENS app](https://app.ens.domains/) to set a reverse record pointing to your ENS name (i.e., you need to have your raw address point to the ENS name). For example, if you are making a proposal to make a `transfer(address,amount)` call to an ERC20 token contract where `address` will be the address of a multisig wallet, you can [set a reverse record with the multisig](https://medium.com/the-ethereum-name-service/you-can-now-manage-ens-names-with-gnosis-safe-9ddcb7e6c4ac) to your ENS name for it to appear on the proposal details page. See Parameters in [this proposal](https://api3.eth.link/#/history/secondary-6) for an example.

## Using IPFS for Proposals

Consider this use case: You posted on the [API3 forum](https://forum.api3.org/) about a potential proposal. You received positive feedback and decide to formally create a proposal using the DAO dashboard. In the proposal's description field you provide a link back to the forum so people can again see the proposal details. How does the voter know that it's the exact same proposal they had read earlier in the forum? IPFS addressing content by its hash is convenient here, because any change you'll make to your proposal will change its hash.

![image](../../assets/images/ipfs-proposals.png)

1. Create the proposal as a PDF.
2. Upload the PDF to [Fleek](https://fleek.co) (or your preferred provider). Fleek will provide a hash of the PDF: `bafybeifl4prxv75fgumtjh4ovklfkp7zzt7dwkl4xmndv37gtcalwpam2u`. 
3. For Fleek append the hash to `https://ipfs.fleek.co/ipfs/` 
    >
    > <a style="overflow-wrap: break-word;" target="_blank"
    >  href="https://ipfs.fleek.co/ipfs/bafybeifl4prxv75fgumtjh4ovklfkp7zzt7dwkl4xmndv37gtcalwpam2u">
    >  https://ipfs.fleek.co/ipfs/bafybeifl4prxv75fgumtjh4ovklfkp7zzt7dwkl4xmndv37gtcalwpam2u
    >  </a>
4. Add the URL to the forum posting for feedback and later to your DAO dashboard proposal in the description field.


   
Remember that the URL the voter sees in the DAO dashboard proposal description field is final and should match the URL on the forum.

**Updating a PDF**

You can update your PDF if needed. Upload it again to your IPFS provider, it will get a new hash. Next update the link in your forum posting before creating the proposal in the DAO dashboard. Ideally keep a list of versioned proposals. Once a proposal is made on the DAO dashboard using the IPFS hashed link in the description field, the PDF should be considered final. Changing the hashed link in the forum at this point would caution the voter.
