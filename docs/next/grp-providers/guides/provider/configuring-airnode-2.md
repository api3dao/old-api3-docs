---
title: Configuring Airnode (2)
---

# {{$frontmatter.title}}

<TocHeader />
[[TOC]]

An Airnode is deployed or redeployed using configuration values from its `config.json` and `secrets.env` files. The  `config.json` specifies the [OIS](../../../technology/specifications/ois.md) (Oracle Integration Specifications) and other specific configuration details. The `secrets.env` file includes security credentials such as API keys.

> ![config-json](../../../assets/images/config-json.png)

It is assumed that you have already read the guide [API Integration (OIS)](api-integration.md) and created an OIS json object. Similar to the [OIS template](../templates/ois-json.md) provided in the previous guide, the [config.json template](../templates/config-json.md) and [secrets.env template](../templates/secrets-env.md) files are useful for this guide.

::: tip Tips

- Read the [API Integration](api-integration.md) guide first.

- Refer to the [config.json](../../../technology/deployment-files/config-json.md) and [secrets.env](../../../technology/deployment-files/secrets-env.md) reference while using this guide.

- Open the [config.json template](https://docs.api3.org/next/grp-providers/guides/templates/config-json.html) in another browser window to follow along. 

- View an Airnode [example config.json](../../tutorials/config-examples/config-example-json.md) file from the Airnode Starter tutorial.

:::

## Creating `config.json`

Use the [config.json template](../../guides/templates/config-json.html) to build your own Airnode configuration file. In the template, `config.json` has 6 fields:

- `chains`
- `environment`
- `id`
- `nodeSettings`
- `triggers`
- `ois`

<Todo>

Reorganize the field sections below. Add `environment`.

</Todo>

### ois

The `ois` field is a list OIS objects that Airnode will be serving. This means that a single instance of an Airnode can serve multiple APIs. You can simply copy paste OIS objects that you will be serving into the `ois` list. Use the previous guide [API Integration](api-integration.md) to create an OIS object.

### triggers

The `triggers` field allows you to expose Airnode endpoints from an OIS selectively. For example, your OIS may include 10 endpoints, but you may only want to serve 2. Instead of modifying the OIS, you would simply create triggers for the 2. Similarly, you may want to serve an endpoint through the request–response protocol, but not the pub–sub protocol. In that case, you would only create the trigger for the request–response protocol.

Note that currently only the request–response protocol is implemented. You can list the endpoints that you want to serve with the request–response protocol under `triggers.request`. In most cases, you would create a trigger for each endpoint in your OIS object.

Each trigger has an `oisTitle` and `endpointName` that allow you to refer to one of the endpoints in an OIS object. Remember that an Airnode's config.json file can have more than one OIS object. Fill these in accordingly. 

Next add an `endpointId` to the trigger which is the ID that the requester will use in their on-chain requests to refer to this specific trigger. There are three ways to create an `endpointId`.

1. As a convention, we recommend this to be chosen as the Keccak256 hash of `{oisTitle}/{endpointName}`. In JS (using ethers.js):

    ```js
    endpointId = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['string'], [`${oisTitle}/${endpointName}`]));
    ```

2. You can also use [`@api3/airnode-admin`](https://github.com/api3dao/airnode/tree/pre-alpha/packages/admin#derive-endpoint-id) to derive endpoint IDs using the `oisTitle` and `endpointName`.

    ```bash
    Derives the endpoint ID using the OIS title and the endpoint name using the convention described here.

    npx @api3/airnode-admin derive-endpoint-id \
      --oisTitle "My OIS title..." \
      --endpointName "My endpoint name..."
    ```

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

And finally, you probably want the `logFormat` field set to `json` for Airnode to log in JSON.

#### chains

<!-- Todo -->
<Todo>

The paragraph below says that multiple chains can be used. However the `nodeSettings.chains` field is a single object. Is the field different for vrs 0.1.0.

</Todo>

An Airnode can serve multiple chains simultaneously. You can specify each of these chains under `nodeSettings.chains` as an object.

You should set the ID of the chain in `id` (e.g., `3` for Ropsten testnet).
`type` is the type of the chain, and only `evm` is supported at the moment.

Airnode can use multiple Ethereum providers per chain.
These could be your private Ethereum node, or an Ethereum service provider such as Infura. Accordingly,the `providers` field is list. Enter the `name` (to be used in logs) and the `url` of the Ethereum provider as an object.




`contracts` contains the addresses of the contracts that implement the Airnode protocols.
Although you can deploy these contracts yourself, you are recommended to use the ones that were deployed by API3.
You can find them [here](https://github.com/api3dao/airnode/tree/pre-alpha/packages/protocol/deployments).

`providerAdminForRecordCreation` is the address that your Airnode will set as the [provider admin](../../../technology/protocols/request-response/provider.md#provideradmin) while creating the provider record on the respective chain.
You should set this field to an address that only you control.

### id

<Todo>

The serets.env file does not appear to have an **id**.

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
