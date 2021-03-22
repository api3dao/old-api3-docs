---
title: Deployment Files Overview
---

# {{$frontmatter.title}}

<TocHeader />
[[TOC]]

Airnode is deployed with two files:

- [`config.json`](config-json.md) is the file that specificies the API–Airnode integrations, and various node and deployment parameters

- [`secrets.env`](secrets-env.md) is the file that keeps the secret parameters (the private key, API keys, blockchain provider URLs) that the Airnode deployments will use, and the cloud provider credentials that the deployer will use to make these deployments

The deployer outputs a [`receipt.json`](receipt-json.md) file after deployment, which contains a list of deployments that can be referred to later on for interaction/removal.

## Time stamps

The names of `config.json` and `secrets.env` are expected to be time-stamped at creation in `YYYY-MM-DD-HHMMSS` format.
For example:

> `2021-03-21-171803.config.json`
>
> `2021-03-21-171803.secrets.env`

The deployer will use the (`config.json` and `secrets.env`) file pair with the most recent time stamps, and will error if the two time stamps do not match.
After a successful run, it will output a `receipt.json` with the same time stamp, i.e.:

> `2021-03-21-171803.receipt.json`
