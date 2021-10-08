---
title: secrets.env
---
<TitleSpan>Deployment Files</TitleSpan>
# {{$frontmatter.title}}

The `secrets.env` file is bundled with a [`config.json`](config-json.md) file and contains the secrets that the
respective Airnode deployments will need. All variables defined in a `secrets.env` file will be available in the
`config.json` file via variable interpolation (e.g. `${VARIABLE}`).

There are few pieces of data we **highly recommend** you provide via variables:

| Variable name           | `config.json` field name               | Description                                           |
| ----------------------- | -------------------------------------- | ----------------------------------------------------- |
| AIRNODE_WALLET_MNEMONIC | `nodeSettings.airnodeWalletMnemonic`   | The wallet mnemonic that will be used by the Airnode  |
| HEARTBEAT_URL           | `nodeSettings.heartbeat.url`           | The URL to make the heartbeat request to              |
| HEARTBEAT_API_KEY       | `nodeSettings.heartbeat.apiKey`        | The API key to authenticate against the heartbeat URL |
| HEARTBEAT_ID            | `nodeSettings.heartbeat.id`            | The Airnode heartbeat ID for accounting purposes      |
| HTTP_GATEWAY_API_KEY    | `nodeSettings.httpGateway.apiKey`      | The API key to authenticate against the HTTP gateway  |
| PROVIDER_URL            | `chains[].providers.<name>.url`        | The blockchain provider url                           |
| SECURITY_SCHEME_NAME    | `apiCredentials[].securitySchemeValue` | The security scheme values                            |

Below is an example of `secrets.env`.

<!-- TODO: Reference a file from Airnode examples instead -->

```
AIRNODE_WALLET_MNEMONIC="achieve climb couple wait accident symbol spy blouse reduce foil echo label"
PROVIDER_URL="https://mainnet.infura.io/v3/5122f3ff104f30f21412aa38fd143d53"
SECURITY_SCHEME_NAME="FRACZKMH4F32BZ8X5uTd"

HEARTBEAT_API_KEY="d714a900-3b9e-4e4d-8eae-756ef06a8836"
HEARTBEAT_ID="916d3ec80fda"
HEARTBEAT_URL="https://your.heartbeat.service.io/airnode"

HTTP_GATEWAY_API_KEY="441ffc41-3c8b-44b9-a689-63b500fd17da"
```
