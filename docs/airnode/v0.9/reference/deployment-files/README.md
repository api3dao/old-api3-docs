---
title: Overview
docSetName: Airnode v0.9
folder: Reference > Deployment Files
basePath: /airnode/v0.9
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

Airnode is deployed with the following files:

- [config.json](./config-json.md) specifies the API–Airnode integrations and
  various node and deployment parameters.

- [secrets.env](./secrets-env.md) holds secrets used by Airnode such as the
  Airnode mnemonic, API keys, blockchain provider URLs, and more.

- (if deploying to AWS only) [aws.env](./aws-env.md) holds AWS credentials and
  is required by the Docker
  [deployer image](../../grp-providers/docker/deployer-image.md).

Airnode deployments utilize secrets such as security scheme values (i.e., API
keys) and blockchain provider URLs. These secrets are injected into
`config.json` from `secrets.env` using standard shell variable interpolation
syntax (e.g. `${VARIABLE}`). This way secrets are stored separately but are
available as part of the configuration during the Airnode runtime.

The `config.json` file does NOT reference values in `aws.env` as `aws.env` is
read directly by the deployer image.

The deployer image outputs a [receipt.json](receipt-json.md) file after
deployment, which contains information about the deployment that can be referred
to later on for interaction or removal.
