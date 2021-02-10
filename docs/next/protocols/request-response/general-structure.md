---
title: General Structure

---

The first protocol implemented for Airnode is request–response. An Airnode serving the request–response protocol listens for requests, makes the API call specified by the request, and fulfills the request as soon as possible.

The request–response protocol is implemented as a single permisionless contract that all Airnodes interact with, which is named `Airnode.sol`. This contract has the following inheritance tree that compartmentalizes the aspects of the protocol:

## Airnode Contract

::: danger TODO
Is the above title correct for the following group of heading 3 elements?
:::

```text
Airnode.sol
├── TemplateStore.sol
└── EndpointStore.sol
    └── ProviderStore.sol
        └── RequesterStore.sol
```

### [`Airnode.sol`](https://github.com/api3dao/airnode/blob/master/packages/protocol/contracts/Airnode.sol)

* Used by clients to make requests.
* Used by Airnodes to fulfill requests.

### [`TemplateStore.sol`](https://github.com/api3dao/airnode/blob/master/packages/protocol/contracts/TemplateStore.sol)

* Used by requesters to store request templates.
* Used by Airnodes to retrieve request templates.

### [`EndpointStore.sol`](https://github.com/api3dao/airnode/blob/master/packages/protocol/contracts/EndpointStore.sol)

* Used by providers to set endpoint authorizers.
* Used by Airnodes to retrieve endpoint authorizers to check authorization status.

### [`ProviderStore.sol`](https://github.com/api3dao/airnode/blob/master/packages/protocol/contracts/ProviderStore.sol)

* Used by Airnodes to create provider records.
* Used by requesters to retrieve the extended public keys of providers to derive their designated wallet addresses.
* Used by requesters to request withdrawals from their designated wallets.
* Used by Airnodes to fulfill withdrawal requests.

### [`RequesterStore.sol`](https://github.com/api3dao/airnode/blob/master/packages/protocol/contracts/RequesterStore.sol)

* Used by requesters to create requester records.
* Used by requesters to endorse clients, which allows clients to make requests that will be fulfilled by the requesters' designated wallets.

### [`Convenience.sol`](https://github.com/api3dao/airnode/blob/master/packages/protocol/contracts/Convenience.sol)

This contract is used by Airnodes to make batch-calls to `Airnode.sol`. For example, instead of making a separate static call to retrieve each template, an Airnode can use `Convenience.sol` to retrieve multiple templates with a single static call. In addition, Airnodes use the this contract to check if a request is authorized according to endpoint authorizers.

## Concepts

_Click the links to go to the page of the specific concept. You are recommended to read these in the given order._

A [provider](provider.md) operates an Airnode to serve one or more APIs to smart contracts.

Each of the API operations that the provider's Airnode serves is accessible over an [endpoint](endpoint.md). The provider sets [authorizers](authorizer.md) for these endpoints, which are contracts that implement authorization policies.

A [requester](requester.md) owns contracts that make requests to providers. Each of these contracts is called a [client](client.md).

Each provider keeps a [designated wallet](designated-wallet.md) for each requester. The requester [endorses](endorsement.md) their clients for them to be allowed to make requests that will be fulfilled by the requester's designated wallet.

A requester can create a request [template](template.md), which is an on-chain record that they can refer to while making [requests](request.md).

## airnode-admin CLI

[`airnode-admin`](https://github.com/api3dao/airnode-admin/) is a CLI tool used by providers, requesters and third parties to interact with `Airnode.sol` and perform the administrative actions mentioned above.
