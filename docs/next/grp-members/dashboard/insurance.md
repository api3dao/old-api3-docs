---
title: Insurance Claims (not active)
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

::: warning As at July 8th, 2021
The ClaimsManagers contracts that implements insurance claims has not been implemented and is scheduled for a later date.
:::

To insure against potential system failures, the DAO pool can empower special `ClaimsManager` contracts to withdraw staked tokens directly. Approved `ClaimsManager` contracts do this by calling `payOutClaim(address recipient, uint256 amount)` in the DAO pool contract, which transfers tokens from the DAO pool to the recipient. When this occurs, the total number of staked tokens goes down, and pool share value goes down in turn.

*No ClaimsManagers have been implemented or approved by the DAO pool contract as of July 8th, 2021.*