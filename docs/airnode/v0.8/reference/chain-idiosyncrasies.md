---
title: Chain Idiosyncrasies
folder: Reference
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<!--TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" /-->

Differences in chain design inevitably lead to some unique chain-specific
considerations. Below are idiosyncrasies we have identified, though it may not
be comprehensive and we are interested in hearing if you encounter others.

## config.json - chains field

The idiosyncrasies below relate to the `chains` field of `config.json`. For the
corresponding Airnode configuration guide section
[see here](../grp-providers/guides/build-an-airnode/configuring-airnode.md#chains)
and for the corresponding reference section
[see here](../reference/deployment-files/config-json.md#chains).

### Avalanche

Gas fees on Avalanche mainnet are often underestimated when using `legacy` as a
`txType`. The error manifests as the max fee per gas being set to less than the
block base fee, resulting in unfulfilled requests. A solution to this is to set
`gasPriceMultiplier` to slightly greater than `1` e.g. `1.1`.

### Arbitrum

<!-- markdown-link-check-disable -->

Execution costs on Arbitrum are calculated slightly differently than Ethereum,
which impacts the gas required to fulfill requests. To account for this, we
recommend a minimum value of `2000000` for `fulfillmentGasLimit` when using both
Arbitrum mainnet and testnet. For more on ArbGas
[see here](https://developer.offchainlabs.com/docs/arbgas).

<!-- markdown-link-check-enable -->

### Metis

On the Metis testnet Stardust, though not on the Metis mainnet Andromeda, we
recommend a `fulfillmentGasLimit` of at least `2000000`.

### Optimism

Use `legacy` as the `txType` rather than `eip1559`.

As a L2 scaling solution, Optimism has an L1 data fee and an L2 execution fee,
which are
[accounted for separately](https://community.optimism.io/docs/developers/build/transaction-fees/#displaying-fees-to-users).
To cover the L1 data fee when a sponsor requests a
[withdrawal](../concepts/sponsor.md#withdrawals), an amount has to be subtracted
from the funds returned to the sponsor. The `withdrawalRemainder` parameter has
been introduced specifically for this reason, though the value required will
differ between Optimism mainnet and testnet due to differences in L1 gas fees.
For Optimism testnet, a `withdrawalRemainder` of `1 gwei` should suffice, while
for Optimism mainnet, a value as high as `2.4 finney` (`2400000 gwei`) may be
required in order to cover an L1 gas price of `300 gwei` and `8000` L1 gas used
by the transaction.
