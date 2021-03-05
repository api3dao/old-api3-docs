---
title: Ethereum Providers
---

# {{$frontmatter.title}}

<TocHeader />
[[TOC]]

::: danger TODO
The second sentence below seems out-of-place.
:::

An oracle node requires access to a blockchain node (e.g., Ethereum) to listen for request events and send transactions to fulfill requests. The Airnode model minimizes the node operational effort using managed services wherever possible. 

It is assumed that the typical API Provider will be using an Ethereum Provider such as [Infura](https://infura.io/), [Alchemy](https://www.alchemyapi.io/), etc. These services will only increase in variety. Designing a solution that depends on them in the future will not be problematic.

::: danger TODO
Speak to the relationship of an Oracle and Ethereum Provider in more detail.
:::



## Availability

Although it is assumed that API Providers will be using an Ethereum Provider, they can use a private Ethereum node. Furthermore, Airnode is designed to allow the use of multiple Ethereum Providers simultaneously. This is achieved by treating all integrated providers individually.

As a result, the operations of an Airnode cannot be disrupted reliably unless all of its Ethereum Providers are malicious. Using multiple Ethereum Providers is a better strategy to achieve the best availability than using a private Ethereum node.

## Costs

Among these Ethereum Providers, [Infura](https://infura.io/pricing) provides 100,000 calls per day for free. An Oracle that doesn't get any requests makes less than 3,000 calls per day (2 calls per minute), which allows the user to keep an Oracle online for free, and upgrade to a paid plan once it gains traction. [Alchemy](https://www.alchemyapi.io/pricing) allows 25,000,000 compute units/month for free before billing begins.
