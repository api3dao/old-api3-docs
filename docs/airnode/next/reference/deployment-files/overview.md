---
title: Deployment Files Overview
---
<TitleSpan>Deployment Files</TitleSpan>
# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Airnode is deployed with two files:

- [`config.json`](config-json.md) is the file that specifies the API–Airnode integrations, and various node and
  deployment parameters

- [`secrets.env`](secrets-env.md) is the file that keeps the secret parameters (airnode mnemonic, API keys, blockchain
  provider URLs, ...) that the Airnode deployments will use

Airnode deployments utilizes secrets such as security scheme values (i.e., API keys) and blockchain provider URLs. While
populating `config.json` you can use standard shell variable interpolation syntax (e.g. `${VARIABLE}`) to insert values
from `secrets.env`. That way the secrets are kept separately but are available as part of the configuration during the
Airnode runtime.

The deployer outputs a [`receipt.json`](receipt-json.md) file after deployment, which contains information about the
deployment that can be referred to later on for interaction or removal.
