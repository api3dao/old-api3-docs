---
title: Proposals and Voting
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Staking tokens in the DAO pool gives you governance rights to create and vote on proposals. To create a proposal, you must hold at least 0.1% of the total pool shares. This required percentage, set in the [`Api3Pool.sol`](https://github.com/api3dao/api3-dao/blob/main/packages/pool/contracts/Api3Pool.sol) contract, can be adjusted by the DAO. You can vote on all proposals or delegate your voting power to someone else.

## Getting Started

1. Access the [DAO Dashboard](https://api3.eth.link/)
2. Click the **Connect Wallet** button in the upper right hand corner and connect to your wallet using the mainnet.

<!-------------------------->
## Proposals and History

  The **Governance** page displays a list of active proposals and the **History** page displays proposals that have been executed or rejected.

  :::: tabs
  ::: tab Read & Learn
  1. Select **Governance** page in the upper left hand corner.

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

  To create a new proposal:
  - you must hold at least 0.1% of the total pool shares
  - you have not created a proposal in the last seven days

  Please note that primary and secondary proposals have separate cool down periods.

  <Todo>

  What are the periods mentioned above.

  </Todo>

  In general, the Primary voting app has a larger treasury and more permissions but has more stringent voting settings. For a technical breakdown of the different permissions granted to the DAO's two voting apps (and corresponding Agents) see this [README](https://github.com/api3dao/api3-dao/blob/develop/packages/dao/README.md#permissions).

  :::: tabs
  ::: tab Read & Learn

  1. Select the **New Proposal** button on the Governance page.

  2. Select the **Proposal Type** on the proposal form.

  > Proposals can be submitted to either the *Primary* or *Secondary* voting types. These two types have access to separate treasuries, have different voting settings, and have different permissions to change contract settings.

  3. Enter a descriptive **Title**.
  > The title will appear on the Governance page and is used to identify the proposal. A good descriptive title will help others navigate the proposal list.

  4. Enter a **Description** that details the proposal.
  5. Enter the **Target Contract** address.
  > This is the address of the contract to call.
  6. Enter the **Contract Target Signature**.
  > Defines the signature of the function to call within the contract.
  7. Enter an **ETH Value**.
  > You can use zero if the target function is not payable.
  8. Enter **Parameters** which are the arguments that will be used to satisfy the signature of the target function.
  > The arguments must be provided in JSON array format where the values are stringified.
  9. When you are ready ,select the **Create** button at the bottom of the page.
  > After the proposal is created it is added to the proposal list and ready for voting.


  :::
  ::: tab Watch & Learn
  > <iframe width="560" height="315" src="https://www.youtube.com/embed/XO1iA3wSYMQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  :::
  ::::

### Proposal Types
The following parameters can be updated via DAO proposal, by proposing to call functions in the [pool contract](../README.md):

|Parameter Name |Initial Value (units) |Function Signature |Description |
|--- |--- |--- |--- |
|stakeTarget |50 * 10^16 (%*10^16) |`setStakeTarget(uint256 _stakeTarget)`|Percentage of all tokens targeted to be staked |
|aprUpdateStep |1 * 10^16 (%*10^16) |`setAprUpdateStep(uint256 _aprUpdateStep)` |Percentage reward APR will be increased or decreased by |
|maxApr |75 * 10^16 (%*10^16) |`setMaxApr(uint256 _maxApr)` |Maximum reward APR |
|minApr |2.5 * 10^16 (%*10^16) |`setMinApr(uint256 _minApr)` |Minimum reward APR |
|proposalVotingPowerThreshold |1 * 10^17 (%*10^16) |`setProposalVotingPowerThreshold(uint256 _proposalVotingPowerThreshold)` |Percentage of all shares that must be held to create a new proposal |
|unstakeWaitPeriod |604800 (seconds) |`setUnstakeWaitPeriod(uint256 _unstakeWaitPeriod)` |Length of time a member must wait after scheduling unstake before unstaking tokens from the pool |


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