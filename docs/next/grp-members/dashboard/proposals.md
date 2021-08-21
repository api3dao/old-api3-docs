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
  > The arguments must be provided in JSON array format where the values are stringified. For example: when calling `transfer()` on the commonly used USDC contract you can use a public address or an ENS name for the first parameter. When using a public address use the checksum version of the address where some alphabetical characters are capitalized. Copy your address to etherscan to get its checksum value.
  > ```json
  >[
  >  "0xF4EB...Fd0d1663d78ddDKP9",
  >  "753200000000"
  >]
  >```
  >When you create a proposal using an ENS name, the public address of the ENS is recorded on-chain and will be used for the payout should the proposal pass. Therefore changing the address of the ENS after the creation of a proposal will not result in the updated address being used.
  >```json
  >[
  >  "my-ens.eth",
  >  "753200000000"
  >]
  >```
  >In the examples above (`753200000000`) is the requested amount which is 753,200 USDC. USDC has 6 decimals. You need to add 6 zeros after the amount you are asking for.

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

## Using IPFS for Proposals

Consider this use case: You posted on the [API3 forum](https://forum.api3.org/) about a potential proposal. You received positive feedback and decide to formally create a proposal using the DAO dashboard. In the proposal's description field you provide a link back to the forum so people can again see the proposal details. How does the voter know that it's the exact same proposal they had read earlier in the forum? IPFS addressing content by its hash is convenient here, because any change you'll make to your proposal will change its hash.

1. Create the proposal as a PDF.
2. Upload the PDF to [Fleek](https://fleek.co) (or your preferred provider). Fleek will provide a hash of the PDF: `bafybeifl4prxv75fgumtjh4ovklfkp7zzt7dwkl4xmndv37gtcalwpam2u`. 
3. For Fleek append the hash to `https://ipfs.fleek.co/ipfs/` 
   >[https://ipfs.fleek.co/ipfs/bafybeifl4prxv75fgumtjh4ovklfkp7zzt7dwkl4xmndv37gtcalwpam2u](https://ipfs.fleek.co/ipfs/bafybeifl4prxv75fgumtjh4ovklfkp7zzt7dwkl4xmndv37gtcalwpam2u)
4. Add the URL to the forum posting and later to your DAO dashboard proposal in the description field.
   
Remember that the URL the voter sees in the DAO dashboard proposal description field is final and should match the URL on the forum.

If you need to update your PDF, re-upload it to your IPFS provider and update the link in your forum posting before creating the proposal in the DAO dashboard. Ideally keep a list of versioned proposals. Once a proposal is made on the DAO dashboard using the IPFS hashed link, the PDF is final. Changing the hashed link in the forum at this point would caution the voter.
