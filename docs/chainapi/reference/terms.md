---
title: Terminology
folder: Reference
docSetName: ChainAPI
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<!-- ONLY USE :include-level="[3,4]" so the definitions come thru -->
<TOC class="table-of-contents" :include-level="[3,4]" />

The general terms used by ChainAPI follow standard blockchain and REST API
definitions. Other related Airnode
[Concepts and Definitions](../../airnode/v0.7/concepts/) may be useful to better
understand how Airnode works.

### Airnode

[Airnode](/airnode/v0.7/) is a serverless oracle node implemented with a "set
and forget" philosophy. Airnode is composed of two parts: the off-chain Airnode
(a.k.a. "the node") deployed as self-hosted or cloud provider functions (e.g.,
AWS or GCP) and the on-chain protocol contract AirnodeRrpV0.sol.

### API Card

A UI component of the ChainAPI app that contains information about a data
provider’s connected API or integration. A data service provider can have
multiple API integrations for a single account.

### Base URL

REST APIs have a base URL to which the endpoint paths are appended. A base URL
is defined by a scheme, host, and basePath on the root level of the API
specification. (i.e. `https://www.domain.com/basepath/`)

`basePath` is the URL prefix for all API paths, relative to the host root. It
must start with a leading slash /. If `basePath` is not specified, it defaults
to /, that is, all paths start at the host root.

Also see [Path](./terms.md#path) below on this page.

### Blockchain Providers

Blockchain node providers offer blockchain nodes and blockchain node hosting as
a service. Blockchain nodes are essential for a functioning blockchain because
the nodes store a full copy of the distributed ledger, and are necessary for
blockchain developers to build decentralized applications. For Airnode they
provide RPC access to a desired blockchain. Also see
[Chain Providers](../../airnode/v0.7/concepts/chain-providers.md) in the Airnode
documentation set.

### Cloud Provider

Cloud providers host remote services such as serverless. Airnode can be deployed
to either AWS or GCP. Using a serverless service minimizes the infrastructure an
API provider must maintain. Airnode (implemented using
[nodejs](https://nodejs.dev)) runs effortlessly in a serverless environment.

### Deployment

<!-- Add [dAPIs](../../../dapis/) when the dAPIs doc set is ready. -->

The process of pushing code to operate as an executable service on a server.
ChainAPI builds the required integration file needed to deploy an Airnode to
either AWS or GCP. As a result, the Airnode will be able to communicate directly
with an API provider's API endpoints and provide data to a desired blockchain
either directly using RRP or through dAPIs.

### Endpoint

An endpoint is a resource of an API. It is the path in an API URL that points to
a specific subset of information from the data set of an API. A ChainAPI
integration defines endpoints that target specific API resources accessed by an
Airnode.

### Heartbeat

A response from an API that indicates the API is active and working. Airnode can
provide a webhook style
[heartbeat](../../airnode/v0.7/grp-providers/guides/build-an-airnode/heartbeat.md)
as an indicator that is is up and running. Setup of the heartbeat is an advanced
configuration.

### HTTP

An application-layer protocol (scheme) for transmitting hypermedia documents,
such as HTML. An HTTP request is made by a client, to a named host, which is
located on a server. The aim of the request is to access a resource on the
server. There is a more secure version called HTTPS. HTTPS is commonly used to
access REST API resources using endpoint declarations in a URL.

### Integration

A connection between two services. Use ChainAPI integrations to create a
definition file that defines the connection between an Airnode and an API
provider's API data resources.

### Mainnet

Every blockchain project has a mainnet. Mainnets are considered production
environments. A mainnet is a blockchain that actually carries out the execution
and functionality of on-chain real-world transactions. This is different from a
testnet, which acts as a test of such transaction execution and functionality.

### Mnemonic

Sometimes refereed to a _seed phrase_ or _secret recovery phrase_. A mnemonic is
used to create a digital wallet. ChainAPI currently supports MetaMask digital
wallets. Hardware wallets connected to MetaMask are also supported.

### Parameters

Parameters are passed to an API endpoint allowing it to filter an API's data
resources. The API endpoint uses the parameters to source a response. Endpoints
and their parameters are a fundamental requirement to complete a ChainAPI
integration which integrates an Airnode to a set of API endpoints.

### Path

Path is the part of a URL that comes after the [base URL](./terms.md#base-url).

```js
https://www.mydomin.com/v1/user/15
/*
scheme   → https://
host     → www.domain.com
basePath → /v1
path     → /user/15
*/

https://www.mydomin.com/user/15 // no basePath
/*
scheme   → https://
host     → www.domain.com
basePath → implied as /
path     → /user/15
*/
```

### Reserved Parameters

Reserved parameters are used internally by Airnode. They do not map to normal
API endpoint parameters. They are used by Airnode for special purposes.

- Endpoint parameters - Airnode endpoint parameters are mapped to API operation
  parameters.
- Reserved parameters - Reserved parameters perform a specific operation on the
  response before fulfilling the request. Reserved parameter names start with
  `_`.

See [Reserved Parameters](../../ois/v1.0/reserved-parameters.md) in the OIS
documentation set.

### Security Schemes

A security scheme specifies the security settings for a particular API; for
example, an API key. An Airnode can use the following security scheme types to
authenticate itself to API endpoints.

- apiKey
- http
  - basic
  - bearer

See
[API Security](../../airnode/v0.7/grp-providers/guides/build-an-airnode/api-security.md)
in hte Airnode documentation set.

### Versioning

Versioning is the creation and management of multiple product releases, all of
which have the same general function, but are improved, upgraded or customized.
ChainAPI creates a new version of an integration each time it is updated.
