---
title: secrets.env
---

<TitleSpan>Templates</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

The `secrets.env` contains the secrets that the respective Airnode deployments will need. All variables defined in a `secrets.env` can be interpolated inside `config.json`. For more details, see the full description of the [secrets.env](../deployment-files/secrets-env.md) file.

```sh
AIRNODE_WALLET_MNEMONIC="<FILL_*>"
CHAIN_PROVIDER_URL="<FILL_*>"
SS_API_KEY="<FILL_*>"

HEARTBEAT_API_KEY="<FILL_*>"
HEARTBEAT_ID="<FILL_*>"
HEARTBEAT_URL="<FILL_*>"

HTTP_GATEWAY_API_KEY="<FILL_*>"

# Used for GCP only
GCP_PROJECT_ID="<FILL_*>"
```
