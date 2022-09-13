---
title: secrets.env
docSetName: Airnode v0.10
folder: Reference > Example Files
basePath: /airnode/v0.10
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

- Variable names cannot contain dashes (-) or start with a number.

:::: tabs

::: tab Cloud Chain

```sh
AIRNODE_WALLET_MNEMONIC=""
RINKEBY_PROVIDER_URL=""
SS_COINGECKO_REQUESTS_API_KEY=""

HEARTBEAT_API_KEY=""
HEARTBEAT_URL=""

# Used for GCP only
GCP_PROJECT_ID=""
```

:::

::: tab Local Chain

```sh
AIRNODE_WALLET_MNEMONIC=""
LOCAL_PROVIDER_URL=""
SS_CURRENCY_CONVERTER_API_KEY=""
```

:::

::::
