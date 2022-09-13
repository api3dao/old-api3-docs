---
title: Deployment Usage
docSetName: Operations
folder: Operations Repository
basePath: /operations
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Before you begin, run `yarn make`.

## Beacon Deployment Process

### 1. Have the API provider generate the mnemonic

Prior to deploying a beacon system, the provider needs to run the following
command to generate a mnemonic

```
npx @api3/airnode-admin generate-mnemonic
```

The provider needs to keep the mnemonic private and use it to generate the
`airnode` address and `xpub` (extended public key). Ask them to forward these to
the API3 team ahead of deployment.

To generate the airnode address the provider needs to run the following command:

```
npx @api3/airnode-admin derive-airnode-address \
--airnode-mnemonic "nature about salad..."
```

To generate the xpub, the provider needs to run the following command:

```
npx @api3/airnode-admin derive-airnode-xpub \
 --airnode-mnemonic "nature about salad..."
```

### 2. Create the boilerplate directory for the API provider

run the following command

```
yarn create-boilerplate
```

This command prompts for various API metadata and creates a set of folders with
examples that need to be populated.

### 3. Populate the OIS

<!-- markdown-link-check-disable -->

Populate the `/data/apis/<PROVIDER_NAME>/OIS/*.json` according to the
[OIS specification](/ois/v1.1/ois.html).

<!-- markdown-link-check-enable -->

> Note that the above files can have any name initially as the validator will
> name them according to their `oisTitle-oisVersion`

### 4. Populate the templates

within the `/data/apis/<PROVIDER_NAME>/templates` folder you will need to create
a file for every template used in the beacon system. Each template should match
the structure below:

```
{
  "name": "AmberData AAVE/BTC",
  "templateId": "",
  "endpointId": "0x592da7070110dc6.....",
  "parameters": "",
  "decodedParameters": [
    { "name": "pair", "type": "string32", "value": "aave_btc" },
    { "name": "_path", "type": "string32", "value": "payload.vwap" },
    { "name": "_type", "type": "string32", "value": "int256" },
    { "name": "_times", "type": "string32", "value": "1000000" },
  ]
}
```

`templateId` and `parameters` can be empty when populating the template data.  
For populating `decodedParamters`, you can refer to
[this](/airnode/v0.7/grp-developers/call-an-airnode.html#request-parameters).
For deriving the `endpointId`, you can refer to
[this](/airnode/v0.7/reference/packages/admin-cli.html#derive-endpoint-id)

> Note that the above files can have any name initially as the normalization
> script will name them according to their `templateName`.

Once populated run the following command to generate the templateIds and
parameters:

```
yarn normalize
```

### 5. Populate the beacons

within the `/data/apis/<PROVIDER_NAME>/beacons` folder you will need to create a
file for every beacon. Each beacon should match the structure below:

```
{
  "name": "AmberData AAVE/BTC",
  "description": "AmberData - AAVE/BTC - Pair",
  "beaconId": "",
  "airnodeAddress": "0x5b1243308f........",
  "templateId": "0x4ea5398d313d6b8a......", // fetched from step 4
  "chains": {
    "polygon": {
      "active": true,
      "sponsor": "0xAb770D6E94e26.......",
      "topUpWallets": [],
      "updateConditionPercentage": 2,
      "airseekerConfig": { "deviationThreshold": 1, "heartbeatInterval": 86400, "updateInterval": 30 }
    }
    "bsc": {
      "active": true,
      "sponsor": "0xAb770D6E94e26.......",
      "topUpWallets": [],
      "updateConditionPercentage": 2,
      "airseekerConfig": { "deviationThreshold": 1, "heartbeatInterval": 86400, "updateInterval": 30 }
    }
  }
}
```

`beaconId` and `topUpWallets` can be empty when populating the beacon data.

`updateConditionPercentage` is the deviation at which the beacon will be updated
by airkeeper (ran by the provider). Absence of this field means that the beacon
is not included in the `airkeeper.json` configuration for the specified chain.

`airseekerConfig` is the configuration of airseeker (ran by API3). Absence of
this field means that the beacon is not included in the `airseeker.json`
configuration for the specified chain.

> Note that the above files can have any name initially as the normalization
> script will name them according to their `beaconName`.

Once populated run the following command to generate the `Provider-Sponsor`
TopUp Wallet used by airkeeper

```
yarn generate-topup-wallets
```

> There is also a prompt to specify the `API3` TopUp Wallet which is used by
> airseeker:

When complete, run the following command to normalize the repository (this will
also generate the `beaconId`s like in the previous step).

```
yarn normalize
```

### 6. Generate the Deployment files

Run the following command to create a set of config files for deployment

```
yarn create-config
```

This will create following files for both the airnode and airkeeper deployment
in `/data/apis/<PROVIDER_NAME>/deployments/<DEPLOYMENT_DATE>`

- `airnode`
  - `aws`
    - `config.json`: The Airnode config file, should not require editing.
    - `secrets.env`: This file will need to be populated by the provider during
      deployment.
    - `aws.env`: This file will need to be populated by the provider during
      deployment
  - `gcp` (if selected in the prompts of create-config)
    - `config.json`: The Airnode config file, should not require editing.
    - `secrets.env`: This file will need to be populated by the provider during
      deployment.
    - `gcp.json`: This file will need to be populated by the provider during
- `airkeeper`
  - `aws`
    - `config.json`: The Airnode config file, should not require editing.
    - `airkeeper.json`: The Airkeeper config file, should not require editing.
    - `secrets.env`: This file will need to be populated by the provider during
      deployment.
    - `aws.env`: This file will need to be populated by the provider during
      deployment

### 8. Checkout and publish

Once you have populated the config files, avoiding populating them with any
secrets.

Checkout using `git checkout -b ...`. Use a new descriptively-named branch, eg.
"nasa-deployment" and push the branch to the operations repository.

### 9. Register the subscriptionsIds

You will need to register the subscriptionIds for each beacon on chain. To do
this fill in the credentials with your mnemonic in
`/chain/credentials.example.json` (fill in the mnemonic for all the chains the
beacons will be deployed on). Then run the following command:

```
yarn register-subscriptions
```

> Make sure your mnemonic is funded on chain, otherwise the register transaction
> will revert

### 10. Deployment at the client's premises:

- Clone the repository and switch to the branch created in step 8
- Forward the API provider the contents of `secrets.env` (Provider URLs, gateway
  keys).
- Guide the API provider through populating the `secrets.env` and `aws.env` in
  `/data/apis/<PROVIDER_NAME>/deployments/<DEPLOYMENT_DATE>`.
- Deploy Airnode and Airkeeper with the following command:

```
yarn deploy-all
```

- Be sure to retain a copy of `receipt.json` located at  
  `/data/apis/<PROVIDER_NAME>/deployments/<DEPLOYMENT_DATE>/airnode/receipt.json`.
- Thank the API provider for being part of the API3 ecosystem.
- Post `receipt.json` to our Slack channel: `#operations-keys` and also push it
  to API3's keybase account.

### 10. Back on your development machine:

Once the above steps have been followed, commit, push and create a PR. The CI
system will conduct various tests. Once these tests have passed and you receive
approval (as enforced by Github) you will then be able to merge your new
deployment to main. The telemetry apps will begin collecting data from your new
deployment immediately.
