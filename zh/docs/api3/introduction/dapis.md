---
title: dAPI (Decentralized API)
---

# {{$frontmatter.title}}

<TOC class="table-of-contents" :include-level="[2,3]" />

Consider the following:

- Decentralized applications need access to [APIs](./apis.md)
- APIs should be interfaced to smart contract platforms through [first-party oracles](./first-party-oracles.md)
- For API level decentralization, [decentrally-governed oracle networks](./decentrally-governed-oracle-networks.md) should be employed

It can be concluded that decentrally-governed networks of first-party oracles solve the API connectivity problem. Although this is technically correct, the same solution can be reached through a more useful lens.

Decentralized applications cannot access Web APIs, and oracle solutions aim to build decentralized interfaces to facilitate this. However, this approach results in an inferior solution and ecosystem (see the
<a href="/api3-whitepaper-v1.0.2.pdf" target="_api3-whitepaper">API3
Whitepaper</a> for a detailed explanation).

<p align="center">
  <img src="../assets/images/dapi.png" />
</p>

Instead, API3 builds complete products called decentralized APIs (dAPIs for short), which are blockchain-native, decentralized API services. From the user's (i.e., the entity that operates the decentralized application) perspective, the experience of using a dAPI would be very similar to a Web developer using a traditional API; they would find a dAPI they need, pay the subscription fee, and enjoy access.

Due to being defined as a full product rather than an interface, unlike a traditional oracle network, a dAPI includes the underlying APIs. This results in a superior solution (secure and cost-efficient first-party oracles) and ecosystem (with API providers as its members).
