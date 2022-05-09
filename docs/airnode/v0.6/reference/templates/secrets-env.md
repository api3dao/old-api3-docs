---
title: secrets.env
---

<TitleSpan>Templates</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

`secrets.env` 包含了相应的 Airnode 部署 需要的秘密信息。 在 `secrets.env`中定义的所有变量都可以在`config.json`中插值 更多详情，请查看 [secrets.env](../deployment-files/secrets-env.md) 文件的完整描述。

- 变量名称不能包含破折号 (-)。

```sh
AIRNODE_WALLET_MNEMONIC="<FILL_*>"
CHAIN_PROVIDER_URL="<FILL_*>"
SS_API_KEY="<FILL_*>"

HEARTBEAT_API_KEY="<FILL_*>"
HEARTBEAT_ID="<FILL_*>"
HEARTBEAT_URL="<FILL_*>"

HTTP_GATEWAY_API_KEY="<FILL_*>"
HTTP_SIGNED_DATA_GATEWAY_API_KEY="<FILL_*>"

# Used for GCP only
GCP_PROJECT_ID="<FILL_*>"
```
