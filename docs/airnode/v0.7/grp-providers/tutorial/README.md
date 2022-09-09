---
title: Overview
docSetName: Airnode v0.7
folder: API Providers > Tutorials
basePath: /airnode/v0.7
tags:
  - quick deploy gcp
  - tutorial tutorials
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

## Quick series

The tutorials section of the docs provides some simple guides regarding the
setup and use of Airnodes.

The **"Quick"** series of tutorials are simple introductions to setting up an
Airnode. The purpose is to demonstrate what is needed to deploy an Airnode.
Configuration files are provided with only minor changes to be made on your
part.

- **Quick Deploy AWS** or [Deploying Airnode to AWS](./quick-deploy-aws/): This
  guide is a straight forward starter to create an Airnode on AWS. This
  deployment type is a typical production environment.

- **Quick Deploy GCP** or [Deploying Airnode to GCP](./quick-deploy-gcp/): This
  guide is a straight forward starter to create an Airnode on GCP. This
  deployment type is a typical production environment.

- **Quick Deploy Container** or
  [Deploying Airnode to a Docker Container](./quick-deploy-container/): This
  guide is a straight forward starter to create an Airnode locally in a Docker
  container. This deployment type is a typical development environment although
  self hosted Docker containers can be used for production environments.

## Monorepo Examples

There are examples of various Airnode functionality in the
[airnode-examples package](https://github.com/api3dao/airnode/tree/v0.7/packages/airnode-examples)
of the Airnode monorepo:

- [authenticated-coinmarketcap](https://github.com/api3dao/airnode/blob/v0.7/packages/airnode-examples/integrations/authenticated-coinmarketcap) -
  cryptocurrency price request using
  [authentication](../guides/build-an-airnode/api-security.md#airnode-authentication-security-schemes).
- [coingecko](https://github.com/api3dao/airnode/blob/v0.7/packages/airnode-examples/integrations/coingecko) -
  unauthenticated cryptocurrency price request.
- [coingecko-post-processing](https://github.com/api3dao/airnode/tree/v0.7/packages/airnode-examples/integrations/coingecko-post-processing) -
  demonstration of the [post-processing](../../../../ois/v1.1/processing.md)
  feature.
- [coingecko-pre-processing](https://github.com/api3dao/airnode/tree/v0.7/packages/airnode-examples/integrations/coingecko-pre-processing) -
  demonstration of the [pre-processing](../../../../ois/v1.1/processing.md)
  feature.
- [coingecko-signed-data](https://github.com/api3dao/airnode/tree/v0.7/packages/airnode-examples/integrations/coingecko-signed-data) -
  demonstration of [signed data](../guides/build-an-airnode/http-gateways.md)
  retrieval for beacon updates.
- [coingecko-template](https://github.com/api3dao/airnode/tree/v0.7/packages/airnode-examples/integrations/coingecko-template) -
  demonstration of [template](../../grp-developers/using-templates.md) requests.
- [coingecko-testable](https://github.com/api3dao/airnode/tree/v0.7/packages/airnode-examples/integrations/coingecko-testable) -
  demonstration of how to test the endpoint using the
  [HTTP gateway](../guides/build-an-airnode/http-gateways.md).
- [failing-example](https://github.com/api3dao/airnode/tree/v0.7/packages/airnode-examples/integrations/failing-example) -
  demonstration of Airnode error handling through an invalid request.
- [relay-security-schemes](https://github.com/api3dao/airnode/tree/v0.7/packages/airnode-examples/integrations/relay-security-schemes) -
  demonstration of how to
  [relay multiple request metadata](../guides/build-an-airnode/api-security.md#relayed-meta-data-security-schemes)
  like chain ID and sponsor address to the API endpoint.
- [weather-multi-value](https://github.com/api3dao/airnode/tree/v0.7/packages/airnode-examples/integrations/weather-multi-value) -
  authenticated weather request
  [encoding multiple parameters](../../../../ois/v1.1/reserved-parameters.md#encoding-multiple-values)
  including the transaction timestamp, time of sunset, temperature, and a
  description of the weather.
