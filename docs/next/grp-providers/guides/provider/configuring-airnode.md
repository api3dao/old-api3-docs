---
title: Configuring Airnode
---

# {{$frontmatter.title}}

<TocHeader />
[[TOC]]

An Airnode is deployed or redeployed using configuration values from its `config.json` and `secrets.env` files. The  `config.json` specifies the [OIS](../../../technology/specifications/ois.md) (Oracle Integration Specifications) and other specific configuration details. The `secrets.env` file includes security credentials such as API keys and chain provider URLs.

> ![config-json](../../../assets/images/config-json.png)

---

It is assumed that you have already read the guide [API Integration](api-integration.md) and created an OIS json object. The [ois.json](../templates/ois-json.md), [config.json](../templates/config-json.md) and [secrets.env](../templates/secrets-env.md) templates are useful for this guide.

<details class="collapse-box">
  <summary class="collapse-box-summary">
  Other tips while using this guide.
  </summary>

  - Refer to the [config.json](../../../technology/deployment-files/config-json.md) and [secrets.env](../../../technology/deployment-files/secrets-env.md) _reference_ while using this guide.

  - Open the _template_ [config.json](../templates/config-json.md) in another browser window to follow along. 

  - View the _example_ [config.json](../../tutorial/config-json.md) file from the [Airnode Starter tutorial](../../tutorial/airnode-starter.md).

</details>

---

## Creating `config.json`

Use the [config.json template](../../guides/templates/config-json.html) to build your own Airnode configuration file. In the template, `config.json` has 6 fields:

- `ois`
- `triggers`
- `chains`
- `nodeSettings`
- `environment`
- `id`

### ois

The `ois` field is a list OIS objects that Airnode will be serving. This means that a single instance of an Airnode can serve multiple APIs. You can simply copy paste OIS objects that you will be serving into the `ois` list. Use the previous guide [API Integration](api-integration.md) to create an OIS object.

### triggers

The `triggers` field allows you to expose Airnode endpoints from an OIS selectively. For example, your OIS may include 10 endpoints, but you may only want to serve 2. Instead of modifying the OIS, you would simply create triggers for the 2. Similarly, you may want to serve an endpoint through the request–response protocol, but not the pub–sub protocol. In that case, you would only create the trigger for the request–response protocol.

Note that currently only the request–response protocol is implemented. You can list the endpoints that you want to serve with the request–response protocol under `triggers.request`. In most cases, you would create a trigger for each endpoint in your OIS object.

Each trigger has an `oisTitle` and `endpointName` that allow you to refer to one of the endpoints in an OIS object. Remember that an Airnode's config.json file can have more than one OIS object. Fill these in accordingly. 

Next add an `endpointId` to the trigger which is the ID that the requester will use in their on-chain requests to refer to this specific trigger. There are three ways to create an `endpointId`.

1. As a convention, we recommend this to be chosen as the Keccak256
2. hash of `{oisTitle}/{endpointName}`. In JS (using ethers.js):

    ```js
    endpointId = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['string'], [`${oisTitle}/${endpointName}`]));
    ```

3. You can also use [`@api3/airnode-admin`](https://github.com/api3dao/airnode/tree/pre-alpha/packages/admin#derive-endpoint-id) to derive endpoint IDs using the `oisTitle` and `endpointName`.

    ```bash
    Derives the endpoint ID using the OIS title and the endpoint name using the convention described here.

    npx @api3/airnode-admin derive-endpoint-id \
      --oisTitle "My OIS title..." \
      --endpointName "My endpoint name..."
    ```

### chains

The `chains` field (array) lists the blockchains the Airnode deployment will serve on and specifies respective parameters. Currently Airnode only supports Ethereum blockchains as denoted by `type: "evm"`. Each row in the `chains` represents an Ethereum blockchain the Airnode will serve as identified by the `id`. There are several supported blockchains.

<Todo>

The complete 0.1.0 list of Ethereum providers and their AirnodeRRP contractIDs does not appear to be ready. [See the list](https://github.com/api3dao/airnode/tree/master/packages/protocol/deployments)

</Todo>

<ChainsSupported :version="'0.1.0'" />

For additional information about chain parameters see the [chains](../../../technology/deployment-files/config-json.html#chains) section of the config.json explanation in the _Technology > Deployment Files_.

<details class="collapse-box">
  <summary class="collapse-box-summary">
  View a sample of the chains field.
  </summary>

  ```json
    "chains": [
      {
        "id": "3",
        "type": "evm",
        "providerNames": [
          "infura_ropsten"
        ],
        "contracts": {
          "AirnodeRrp": "0xF6d2675468989387e96127546e0CBC9A384fa418"
        },
        "airnodeAdmin": "{FILL_AIRNODE_ADMIN}",
        "authorizers": [
          "0x0000000000000000000000000000000000000000"
        ],
        "blockHistoryLimit": 300,
        "minConfirmations": 0,
        "ignoreBlockedRequestsAfterBlocks": 20
      }
    ],
```

</details>

#### id

An Airnode can serve multiple chains simultaneously. Set the ID of the desired chain in `id` (e.g., `3` for Ropsten testnet). See the list of supported chains above for each chain's ID.

#### type

`type` is the type of the chain, and only `evm` is supported at this time.

#### providerNames

Airnode can use multiple Ethereum providers per chain. These could be a private Ethereum node, or an Ethereum service provider such as Infura. Accordingly, the `providers` field is list which allows for multiple Ethereum providers. Enter the `name` (to be used in logs) and the `url` of the Ethereum provider as an object.

#### contracts

`contracts` contains the addresses of the contracts that implement the Airnode protocols. Although you can deploy these contracts yourself, you are recommended to use the ones that were deployed by API3. You can find them in the list above.

#### airnodeAdmin

`airnodeAdmin` is the address that your Airnode will set as the [provider admin](../../../technology/protocols/request-response/airnode.md#airnodeAdmin) while creating the provider record on the respective chain. You should set this field to an address that only you control.

#### authorizers

The list of authorizer contract addresses the Airnode deployment will set on-chain. See the [protocol docs](../../../technology/protocols/request-response/airnode.md#setting-endpoint-authorizers) for more information. Note that the Airnode master wallet has to be funded (on the respective chain) to be able to make the transaction that will set or update this value.

#### blockHistoryLimit

`blockHistoryLimit` (optional) - the number of blocks in the past that the Airnode deployment should search for requests. Defaults to `300` (roughly 1 hour for Ethereum).

#### minConfirmations

`minConfirmations` (optional) - the number of confirmations required for a request to be considered valid. Defaults to `0`.

#### ignoreBlockedRequestsAfterBlocks

`ignoreBlockedRequestsAfterBlocks` (optional) - the number of blocks that need to pass for the node to start ignoring blocked requests. Defaults to `20`.

### nodeSettings

The `nodeSettings` field holds node-specific (Airnode) configuration parameters. The first of these is `providerIdShort`, which is used as a label by the deployer to detect previous deployments. Therefore, you must not have the `providerIdShort` field in your `config.json` during the first deployment as it will be created for you. On the other hand, you must have it for the following redeployments. You can find your `providerIdShort` in the receipt file outputted after deployment. This guide assumes that you have not deployed Airnode yet, so we did not include the `providerIdShort` field in the `config.json` template.

#### nodeVersion

The `nodeSettings.nodeVersion` field indicates which node version this `config.json` is prepared for. Since the `config.json` format can be expected to change with node versions, using a `config.json` prepared for one Airnode version with another may result in unexpected issues. The current node version is `0.1.0`, so you can leave it as such.

#### cloudProvider

The `nodeSettings.cloudProvider` field indicates to the deployer which cloud provider Airnode should be deployed at. The deployer currently supports AWS, so leave this value as `aws`. We are planning to extend the deployer to support a wide variety of cloud providers. If you would like to contribute, please join the conversation in [this issue](https://github.com/api3dao/airnode/issues/154).

#### region

The `nodeSettings.region` field can be seen as an extension of `cloudProvider`, it refers to which region of the cloud provider Airnode will be deployed at. An example value for AWS would be `us-east-1`. Note that transferring a deployment from one region to the other is not trivial at this moment (i.e., it does not take one command like deployment, but rather three). Therefore, try to pick a region and stick to it for this specific deployment. If you would like to contribute to related tooling, please join the conversation in [this issue](https://github.com/api3dao/airnode/issues/155).

#### stage

The `nodeSettings.stage` field allows you to deploy multiple Airnodes with the same provider ID. For example, the provider may deploy one Airnode with the stage `api3` to serve API3 dAPIs, and one with the stage `public` that serves the public. A regular user will have a single deployment, so feel free to set any descriptive name as your `stage`.

#### logFormat

Set the `logFormat` field set to `json` for Airnode to log in JSON.

### environment

The secrets.env file is used to set environment variables which the Airnode deployer uses for deployments. Airnode utilizes the `environment` object in config.json to identify the variables it needs for deployment or redeployment. See the reference [config.json](../../technology/deployment-files/config-json.md#environment) for additional input.

**Example:** 

1. When creating a config.json file the `chains` field declares its use of blockchain 3, Ropsten. It then declares the use of the blockchain provider "infura_ropsten" in the `providerNames` array. The name "infura_ropsten" is completely arbitrary.
    ```json
    "chains": [
      {
        "id": "3",
        "type": "evm",
        "providerNames": [
          "infura_ropsten"
        ],
        ...
      }
    ]
    ```

2. The Airnode deployer will use the `chains[0].providerNames[0]` value from above (infura_ropsten) to get the environment variable name for "infura_ropsten" which is "CP_EVM_3_infura_ropsten". It does so by mapping `chains[0].providerNames[0]` to `environment.chainProviders[n].name` which is a sibling of `envName`, the environment variable name  "CP_EVM_3_infura_ropsten". 
    ```json
    "environment": {
      "chainProviders": [
        {
          "chainType": "evm",
          "chainId": "3",
          "name": "infura_ropsten",
          "envName": "CP_EVM_3_infura_ropsten"
        }
      ],
      "securitySchemes": []
    },
    ```


3. When the Airnode deployer executes it first sets the environment variables named in secrets.env. Note the variable `CP_EVM_3_infura_ropsten` with a value that is a provider URL. Using the config.json file the deployer will be able to map its way to the CP_EVM_3_infura_ropsten environment variable and its value.
    ```bash
    AWS_ACCESS_KEY_ID="XYZ123"
    AWS_SECRET_KEY="ABC789"
    MASTER_KEY_MNEMONIC="achieve climb couple wait accident symbol spy blouse reduce foil echo label"
    SS_myOisTitle_mySecurityScheme="FRACZKMH4F32BZ8X5uTd"
    CP_EVM_3_infura_ropsten="https://ropsten.infura.io/v3/7545745CVDG834834"
    ```
 

### id

<Todo>

The secrets.env file does not appear to have an **id**.

</Todo>

The `config.json` file has an `id` field, which identifies the specific configuration. Furthermore, `secrets.env` has the same field with the identical value, allowing the deployer to verify that the two files match. For this to work, you are recommended to choose a unique value for this field for each `config.json`/`secrets.env` you create (e.g., use a UUID).

## Creating `secrets.env`

<Todo>

Needs conversion to secrets.env when finalized.

</Todo>

The `secrets.env` file is where you store secrets such as a chain provider url, cloud provider keys, etc. Make sure to download the [`secrets` template](../templates/secrets.md) and refer to the [docs](../../../technology/specifications/secrets.md) as needed.

```bash
MASTER_KEY_MNEMONIC=""
AWS_ACCESS_KEY_ID=""
AWS_SECRET_KEY=""
CP_EVM_31337_EVM_LOCAL=""
SS_CURRENCY_CONVERTER_API_CURRENCY_CONVERTER_SECURITY_SCHEME=""
```

For each security scheme you have defined in your `config.json`, you need to create an entry in `security.json` that includes its value. Feel free to duplicate the OIS entries under `apiCredentials` or security scheme entries under these OIS entries as needed. Finally, make sure that you use the same `id` that you have used in `config.json`.

## Conclusion

<Todo>

There is some confusion here. Can the config.json file be made public? Here it implies no since chain provider info may be present that should not be released. Are these now in secrets.env? If not then the diagram at the top of this page needs to be changed.

</Todo>

In this guide, we created the `config.json` and `secrets.env` files required to deploy an Airnode. Note that `config.json` is user-specific, so the `config.json` file is probably of not much use to others Furthermore, it contains your Ethereum provider URLs, which tend to include security credentials/keys The `secrets.env` file contains API keys, so it should definitely be kept secret. Therefore, even though you can safely share your OIS, you should avoid publishing your configuration files/pushing them to repos.

Now that we have our Airnode configuration files, the next step is [Deploying Airnode](deploying-airnode.md).
