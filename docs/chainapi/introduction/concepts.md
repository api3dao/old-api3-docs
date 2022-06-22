---
title: Concepts and Definitions
---

<TitleSpan>Introduction</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<!-- ONLY USE :include-level="[3,4]" so the definitions come thru -->
<TOC class="table-of-contents" :include-level="[3,4]" />

The general terms used by ChainAPI follow standard blockchain definitions. Other
related Airnode [Concepts and Definitions](../../airnode/v0.7/concepts/) may be
useful to better understand how Airnode works.

### API Card

A UI component in the ChainAPI app that contains information about a data
provider’s connected API. A data service provider can have multiple APIs in one
account.

### Base URL

The top-level domain name of a data source (e.g. domain.com).

### Blockchain Providers

Also see [Chain Providers](../../airnode/v0.7/concepts/chain-providers.md) in
the Airnode documentation set.

### Cloud Provider

A service provider that is accessible via API rather than a local or self-hosted
server.

### Deployment

The process of pushing code live to a server.

### Endpoint

A path in an API URL that points to a specific subset of information from the
data set.

### Heartbeat

A response from an API that indicates the API is active and working.

### HTTP

An application-layer protocol for transmitting hypermedia documents, such as
HTML. An HTTP request is made by a client, to a named host, which is located on
a server. The aim of the request is to access a resource on the server. This is
a more secure version, called HTTPS.

### Integration

A connection between two services, such as through an API.

### Mainnet

Every blockchain project has a mainnet. A mainnet is a blockchain that actually
carries out the functionality of transferring digital currency from senders to
recipients. This is different from a testnet, which acts as a test of such
transaction functionality.

### Mnemonic

Sometimes refereed to a _seed phrase_ or _serect recovery phrase_ that is use to
create a digital wallet. ChainAPI currently support MetaMask.

### Parameters

Parameters are passed through an API endpoint to filter what data is included in
the API response.

### Path

A path is the part of a URL that comes after the top-level domain (e.g.
/this/is/a/path).

### Reserved Parameters

Also see [Reserved Parameters](../../ois/v1.0.0/reserved-parameters.md) in the
OIS documentation set.

### Security Schemes

A security scheme specifies all the settings for a particular aspect of API
security; for example, the user registry that you use to authenticate access to
the API. Three types of schemes are available: basic authentication, API key,
and OAuth2.

### Versioning

The practice of assigning numbers to deployments in order to distinguish one
from the other. Semantic versioning is the most widely used format, where a
whole number is used for large breaking changes, the first decimal is used to
indicate a significant release, the second decimal is used to indicate a smaller
release related to new backwards-compatible functionality, and an optional third
decimal is used to indicate a security patch or bug fix.
