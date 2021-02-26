<p align="center">
  <img src="./figures/api3.png" width="400" />
</p>

[[TOC]]

<Version selectedVersion="pre-alpha" />

<div class="toc-label">Table of Contents</div>

*API3 documentation is kept as a regular repository of Markdown files for everyone to be able to easily contribute.
Feel free to create [issues](https://github.com/api3dao/api3-docs/issues) for discussions, proposed additions and changes.*

## What is API3?

[API3](https://api3.org/) is a collaborative project to deliver traditional API services to smart contract platforms in a decentralized and trust-minimized way.
It is governed by a decentralized autonomous organization (DAO), its code is open source and its operations are transparent.

## API3 thesis statement

The vast majority of the external integrations that decentralized applications need are to commercial Web APIs that traditional businesses have built to monetize their data and services.
Therefore, what is widely known as *the oracle problem* is in practice *the API connectivity problem*.
Existing oracle solutions fall short because they fail to make this distinction, resulting in inferior solutions that depend on third-party oracles and ecosystems that exclude API providers.
By refining the definition of the problem, API3 aims to provide a much more optimal solution.

## Whitepaper

See the [API3 Whitepaper](https://github.com/api3dao/api3-whitepaper/blob/master/api3-whitepaper.pdf) for a detailed discussion of the project.
Just as these docs, you can discuss it and propose updates through [issues](https://github.com/api3dao/api3-whitepaper/issues).

## Medium posts

See a grouped list of our Medium posts [here](../pages/medium.md).

## Fundamentals

An introduction to the API connectivity problem and API3's solution

- [API](fundamentals/apis.md)
- [First-party oracles](fundamentals/first-party-oracles.md)
- [Decentrally-governed oracle networks](fundamentals/decentrally-governed-oracle-networks.md)
- [dAPI](fundamentals/dapis.md)

*See our article, [API3: The Glue Connecting the Blockchain to the Digital World](https://medium.com/api3/api3-the-glue-connecting-the-blockchain-to-the-digital-world-129e61ec598f) for an overview of the API3 solution.*

## Airnode

The design of Airnode and specification details

- [Design philosophy](airnode/design-philosophy.md)
- [Implementation](airnode/implementation.md)
- [Ethereum providers](airnode/ethereum-providers.md)
- [OIS](airnode/specifications/ois.md)
- [`config.json`](airnode/specifications/config-json.md)
- [`security.json`](airnode/specifications/security-json.md)
- [Airnode ABI specifications](airnode/specifications/airnode-abi-specifications.md)
- [Reserved parameters](airnode/specifications/reserved-parameters.md)

## Request–response protocol

The description of the components of the request–response protocol and how they interrelate

- [General structure](protocols/request-response/general-structure.md)
- [Provider](protocols/request-response/provider.md)
- [Endpoint](protocols/request-response/endpoint.md)
- [Authorizer](protocols/request-response/authorizer.md)
- [Requester](protocols/request-response/requester.md)
- [Client](protocols/request-response/client.md)
- [Designated wallet](protocols/request-response/designated-wallet.md)
- [Endorsement](protocols/request-response/endorsement.md)
- [Template](protocols/request-response/template.md)
- [Request](protocols/request-response/request.md)

## Provider guides

- [API integration](guides/provider/api-integration.md)
- [Configuring Airnode](guides/provider/configuring-airnode.md)
- [Deploying Airnode](guides/provider/deploying-airnode.md)
- [Setting authorizers](guides/provider/setting-authorizers.md)

## Requester guides

- [Creating a requester](guides/requester/creating-a-requester.md)
- [Developing a client contract](guides/requester/developing-a-client-contract.md)

Refer to the [Airnode starter](https://github.com/api3dao/airnode-starter) repo, where these provider and requester guides are reiterated with a real API on a public chain.

## Smart contract platform guides

- [Is my platform compatible?](guides/smart-contracts/is-my-platform-compatible.md)
- [Self-serve integration](guides/smart-contracts/self-serve-integration.md)

# Community

## Become a part of API3

API3 is formed by people who spontaneously found each other through a common understanding.
Despite being largely overlooked, the API connectivity problem is the most critical obstacle in front of meaningful decentralized applications being built at scale.

If existing oracle solutions do not fulfill the needs of the decentralized applications you want to build, give you a fair opportunity to monetize your API business, or feel like they are working against the ethos of decentralization, we invite you to be a part of API3 so that we can solve the API connectivity problem together.
If you are coming from a technical background, see our [guide](introduction/contributing.md) to get you started on contributing.

The API connectivity problem is in essence an ecosystem building problem, more so than a technical one.
This means that API3 can use the skills of all kinds of experts and the decentralized nature of the project will allow you to shape it in a way that makes the best use of your skills.

## Communication channels

**Website:** https://api3.org/

**Telegram (for community):** https://t.me/API3DAO

**Discord (for contributors):** https://discord.gg/qnRrcfnm5W

**Medium publication of the DAO:** https://medium.com/api3