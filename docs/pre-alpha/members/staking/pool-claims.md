---
title: Pool Claims (not active)
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

To insure against potential system failures, the API3 staking pool can empower special `ClaimsManager` contracts to withdraw staked tokens directly. Approved `ClaimsManager` contracts do this by calling `payOutClaim(address recipient, uint256 amount)` in the pool contract, which transfers tokens from the staking pool to the recipient. When this occurs, the total number of staked tokens goes down, and pool share value goes down in turn.

*No ClaimsManagers have been implemented or approved by the pool contract as of June 28th, 2021.*