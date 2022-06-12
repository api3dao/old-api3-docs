---
title: Developers—Why use dAPIs?
folder: Introduction
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<!--TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" /-->

Due to being composed out of first-party data feeds, dAPIs offer security,
transparency, cost-efficiency and scalability in a turn-key package.

**Security**: Data used to update a first-party data feed is cryptographically
signed by the owner of the data. This means that the data that will update a
feed cannot be tampered with once it leaves the source. Furthermore, the API
providers host our first-party oracle node, [Airnode](../airnode/), to push the
data to the chain themselves. This makes denial of service attacks by third
parties impossible.

**Transparency**: The cryptographic signatures can be used to verify that the
data that updates a feed comes directly from a specific API provider.
Furthermore, Beacons that underlie dAPIs allow the user to inspect what exact
API endpoints are being called, and with which parameters. This provides
complete transparency to the dApp developer, which is a big step from depending
on a pseudonymous selection of third parties that intentionally obscure their
data sources.

::: tip dAPI transparency

dAPIs source data from Beacons, which developers can examine to see the number of
data sources and the exact query parameters used with each of them.
See the [dAPI Browser](../reference/beacon-browser.md).

:::

**Cost-efficiency**: dAPIs are cost efficient compared to third-party data
feeds, as the user does not need to pay middlemen node operators for their
services. Furthermore, first-party data feeds do not require redundancy against
middlemen attacks. This makes single Beacon dAPIs feasible, and allows API3 to
provide a wide variety of data feeds in a cost-efficient way.

**Scalability**: An inherently secure and cost-efficient data feed design allows
API3 to build a large number of them, across many chains. This is supplemented
by purpose-designed Airnode protocols and relayer schemes to improve efficiency
while not degrading the security guarantees of a first-party data feed. The
improved scalability of dAPIs also factors into building aggregated data feeds.
Since first-party data feeds do not require redundancy at the middlemen layer,
the aggregation costs less gas and source-level decentralization becomes more
feasible.
