---
title: secrets.env
---

# {{$frontmatter.title}}

<TocHeader />
[[TOC]]

The `secrets.env` file is bundled with a [`config.json`](config-json.md) file and contains the secrets that the respective Airnode deployments will need.
All variables defined in a `secrets.env` file will be set as the environment variables of all deployments specified in the `config.json` file.

A `secrets.env` file is composed of three main groups of variables:
- [Cloud provider credentials](../../grp-providers/guides/provider/deploying-airnode.md#creating-cloud-credentials) that are used by the deployer
- `MASTER_KEY_MNEMONIC` that gives access to the Airnode master wallet and [designated wallets](../protocols/request-response/designated-wallet.md)
- Environment variables [referred to in `config.json`](config-json.md#environment) with the names `envName`

The contents of an example `secrets.env` file is given below:

```
AWS_ACCESS_KEY_ID="JSDYNDRUA1XAF2W3UGPA"
AWS_SECRET_KEY="q4JiOfPP4wQOuRj01/6/7RAodTAg6lFb99IoB4XH"
MASTER_KEY_MNEMONIC="achieve climb couple wait accident symbol spy blouse reduce foil echo label"
ss_myOisTitle_mySecurityScheme="FRACZKMH4F32BZ8X5uTd"
cp_evm_1_mainnet-infura="https://mainnet.infura.io/v3/5122f3ff104f30f21412aa38fd143d53"
```
