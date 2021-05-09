---
title: secrets.env
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

<Todo>

The docs are outdated here. Decided that the environment variables should be all uppercase not contain any hyphens because of https://unix.stackexchange.com/a/23714. The provider name is also a part of the environment variable name in the first example (evm-local). The environment field in config.json maps an environment variable name to each blockchain provider. The environment variable can be specified to be anything, but ChainAPI will use the following convention CP_<CHAIN_TYPE>_<CHAIN_ID>_<PROVIDER_NAME> where the whitespaces and any non-alphanumeric characters in <PROVIDER_NAME> are replaced with _.

</Todo>

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
