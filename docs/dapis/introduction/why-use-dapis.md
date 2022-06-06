---
title: Developers - Why use dAPIs?
folder: Introduction
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<!--TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" /-->

As on-chain first-party data feeds, dAPIs offer a simple and trusted
composability layer for building more transparent, reliable, and cost-efficient
dApps.

One major advantage of dAPIs is data source transparency: the underlying Beacons
that are sourced by dAPIs, are operated by a singular first-party oracle and
therefore carries the reputation and trustworthiness of that data provider.

By aggregating the values of multiple Beacons, dAPIs can gain resiliency and
reliability without sacrificing the trustworthiness and transparency of a single
Beacon value. This is a compelling alternative to the obscurity of other
"decentralized" oracles that do not report the number nor identities of the APIs
powering their data feeds. One only has to look at the numerous instances of
mis-reported cryptocurrency prices by third-party oracles for evidence that
greater transparency in data feed composition will enable more resilient data
feeds, fewer catastrophic failures, and an overall better user experience.

::: tip dAPI Transparency

dAPIs source data from identifiable Beacons meaning that developers can see the
number of Beacons used and what API provider powers each Beacon. See the
[dAPI Browser](../reference/dapi-browser.md).

:::

dAPIs are also a cost-efficient mechanism for obtaining trustworthy off-chain
data. In situations where a dAPI uses a single Beacon, the dAPI iis reliable
enough and further decentralization would create unnecessary overhead. Costs can
be minimized by leveraging this singular source of data. For situations
requiring an aggregate of Beacon values, dAPIs that leverage multiple Beacon
values enable the transparent composition of the appropriate number of data
sources for the specific use-case.

Another major advantage of dAPIs is their simplicity. Developers can quickly
integrate dAPI data by accessing on-chain contract storage.

Lastly, dAPIs composed of curated sets of Beacons will power new applications
demanding specific security guarantees. These guarantees will be provided by
API3 in the form of coverage policies, payable in the case of data feed
malfunction.

Altogether, dAPIs offer developers an improved solution for accessing off-chain
data in a simple, transparent, reliable, and cost-efficient manner. This new
primitive is appealing both for traditional oracle use-cases and for novel,
previously infeasible blockchain applications.
