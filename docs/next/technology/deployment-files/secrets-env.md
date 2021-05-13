---
title: secrets.env
---

# {{$frontmatter.title}}

The `secrets.env` file is bundled with a [`config.json`](config-json.md) file and contains the secrets that the respective Airnode deployments will need.
All variables defined in a `secrets.env` file will be set as the environment variables of all deployments specified in the `config.json` file.

**There are four categories of secrets.**

|||
|-|-|
|AWS_ACCESS_KEY_ID - AWS_SECRET_KEY|AWS account credentials|
|MASTER_KEY_MNEMONIC|The wallet MNEMONIC that will be used by the Airnode|
|CP_${chainType}\_${chainId}_${name}|blockchain provider urls|
|SS_${oisTitle}_${name}|securitySchemes|

The wallet mnemonic and AWS credentials are known values you can add directly to secrets.env.

The last two categories above (CP_ and  SS_) are environment variable names that are declared in the [`environment.chainProviders`](configuring-airnode.md#chainproviders) or [`environment.securitySchemes`](configuring-airnode.md#securityschemes) objects from the config.json file. Use the values of the fields `envName` for the environment variable names.

  > The  (CP_, SS_) environment variable names have formatting requirements. Correct them here and in the `environment` object if needed. Replace any unsupported characters (whitespace, dash, etc.) with underscores. All characters are uppercase. Supported characters; (A-Z, 0-9, _). While not required consider using the following naming conventions for better readability in logs.
  > - `CP_${chainType}_${chainId}_${name}`
  > - `SS_${oisTitle}_${name}`

Below is an example of `secrets.env`.

```
AWS_ACCESS_KEY_ID="JSDYNDRUA1XAF2W3UGPA"
AWS_SECRET_KEY="q4JiOfPP4wQOuRj01/6/7RAodTAg6lFb99IoB4XH"
MASTER_KEY_MNEMONIC="achieve climb couple wait accident symbol spy blouse reduce foil echo label"
SS_MYOISTITLE_MY_SECURITY_SCHEME="FRACZKMH4F32BZ8X5uTd"
CP_EVM_1_MAINNET_INFURA_="https://mainnet.infura.io/v3/5122f3ff104f30f21412aa38fd143d53"
```
