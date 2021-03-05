---
title: APIs
showComment: false
---

# {{$frontmatter.title}}

<TocHeader />
[[TOC]]

*See the article, [APIs: The Digital Glue](https://medium.com/api3/apis-the-digital-glue-7ac87566e773) for a more complete background on APIs.*

An API (Application Programming Interface) is a well-defined and documented protocol that one can use to interact with an application programmatically. In the context of decentralized applications, this definition is quite useless, and even misguiding. Instead, we should see APIs as channels businesses use to monetize their data and services.

Take the [CoinMarketCap API](https://coinmarketcap.com/api/) as an example.
It allows Web developers to use all the data seen on https://coinmarketcap.com/ and more in their applications programmatically by making API calls.
In return, developers pay a [subscription fee](https://coinmarketcap.com/api/pricing/).
In practice, any kind of data or service that is worth using is served by a paid API.

::: danger TODO
Removed the pricing page image for CoinMarketCap. Seems devs have seen a million of these. Devs like to move fast through documenation. The above paragraph does a great job of getting the point across, and there is a link to the pricing page. Should the image stay?
:::

<!-- ![img](../figures/coinmarketcap.png) -->

## API Connectivity Problem

A smart contract cannot access data that is not presently in the blockchain, which is commonly known as *the Oracle Problem*. Smart contracts often need access to paid (read: useful) APIs. Therefore, all the game theoretic and cryptographic methods proposed for various oracle solutions essentially aim to provide smart contracts access to these paid APIs. It would be more accurate to define the problem at hand as *the API Connectivity Problem*. This redefinition will have ripple effects across the entire oracle solution, from how the ecosystem is built to the lowest levels of the protocol.

*See the article, [The API Connectivity Problem](https://medium.com/api3/the-api-connectivity-problem-bd7fa0420636) for an in-depth understanding.*

## API Provider

API Provider is a term that is criminally underused by existing oracle solutions.
It refers to the business that owns and operates the API that the decentralized application needs to receive data and services from. It is only natural for the API Provider to be a point of consideration in the solution of the API Connectivity Problem.
