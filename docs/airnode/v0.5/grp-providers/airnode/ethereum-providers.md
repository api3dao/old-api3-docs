---
title: Ethereum providers
---

# {{$frontmatter.title}}

<TOC class="table-of-contents" :include-level="[2,3]" />

An oracle node requires access to a blockchain (e.g., Ethereum) node to listen
for request events and send transactions to fulfill requests. The Airnode model
aims to minimize the node operation effort using managed services wherever
possible. Accordingly, it is assumed that the typical user will be using an
Ethereum provider such as Infura, Alchemy, etc. These services will only
increase in variety, so designing a solution depending on these is not expected
to cause a problem in the future. In addition, among these Ethereum providers,
Infura provides 100,000 calls per day for free. An oracle that doesn't get any
requests makes less than 3,000 calls per day (2 calls per minute), which allows
the user to keep an oracle online for free, and upgrade to a paid plan once it
gains traction.

Although it is assumed that the user will be using an Ethereum provider, there
is no reason for providers to not be able to use a private Ethereum node.
Furthermore, Airnode is designed to allow the usage of multiple Ethereum
providers simultaneously. This is achieved by treating all integrated providers
individually. As a result, the operations of an Airnode cannot be disrupted
reliably unless all of its providers are malicious. Therefore, using multiple
Ethereum providers is a better strategy to achieve the best availability than
using a private Ethereum node.
