# API (Application programming interface)

An API is a well-defined and documented protocol that one can use to interact with an application programmatically.
In the context of decentralized applications, this definition is quite useless, and even misguiding.
Instead, we should see APIs as channels businesses use to monetize their data and services.

Take the [CoinMarketCap API](https://coinmarketcap.com/api/) as an example.
It allows Web developers to use all the data on https://coinmarketcap.com/ and more in their applications programmatically by making API calls.
In return, developers pay a [subscription fee](https://coinmarketcap.com/api/pricing/).
In practice, any kind of data or service that is worth using is served by a paid API, i.e., *if you are not paying for it, you are the product*.

## ~~Oracle problem~~ API connectivity problem

A smart contract cannot access data that is not presently in the blockchain, which is commonly known as *the oracle problem*.
This is only worth consideration because it includes not being able to call the paid (read: useful) APIs described above.
Therefore, all the exotic game theoretic and cryptographic methods proposed for various oracle solutions essentially aim to provide smart contracts access to these paid APIs.
Therefore, it would be more accurate to define the problem at hand as *the API connectivity problem*.
As you read through, you will discover that this redefinition will have ripple effects across the entire solution, from how the ecosystem is built to the lowest levels of the protocol.

## API provider

API provider is a term that is criminally underused by existing oracle solutions.
It refers to the business that owns and operates the API that the decentralized application needs to receive data and services from.
Then, it is only natural for the API provider to be a point of consideration in the solution of the API connectivity problem.

[Home](/README.md#contents)
