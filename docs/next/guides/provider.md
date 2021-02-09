---
title: Provider
---

<!-- ---------------- -->
<!-- API integration  -->
<!-- ---------------- -->
<!-- ---------------- -->
<!-- ---------------- -->

## API integration

To integrate a System X to a System Y, we need to do three things:
- Specify the interface of System X
- Specify the interface of System Y
- Specify how the interface of System X maps to the interface of System Y

[Oracle Integration Specifications (OIS)](/airnode/ois.md) are designed to follow these exact steps:
- API operations are specified
- Oracle endpoints are specified
- Oracle endpoints are mapped to API operations

Therefore, the only thing you need to do to integrate an API to Airnode is to create an OIS.
You can do this simply by reading the [OIS docs](/airnode/ois.md) and creating the OIS for your specific API and use-case.
This guide aims to follow a more instructive approach and give some tips along the way.
Make sure to refer to the [OIS docs](/airnode/ois.md) when you need further details, and you can also refer to the [OAS 3.0.3 docs](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md) about fields related to API specifications.

### OIS Template

We will be working on the [OIS template](/templates/ois.json), so first download that and let us go over the notation.
An OIS is a [JSON](https://www.json.org) file.
This guide will assume that you are already familiar with the JSON format, but you can probably work off of the OIS template even if this is the first time you are using it.

In the OIS template, there are some fields that contain `{FILL_*}`.
This means that the value you will be replacing this with is independent from the other fields.
On the other hand, if two fields contain the same expression  (e.g., `{FILL_OPERATION_PARAMETER_1_NAME}`), you must use the same value in them, because they are referencing each other.

### Step 1: Specifying the API

OIS uses a simplified version of the [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification).
This means that if you have the OpenAPI/Swagger specifications of the API that you are going to integrate, you are about 80% done, because you can copy paste entire sections (but make sure that you make the necessary modifications to conform to the OIS format).
At the moment, we do not have a tool that converts OpenAPI specifications to OIS automatically.
If you would like to help build this, please join the conversation in [this issue](https://github.com/api3dao/airnode/issues/152).

Let us quickly specify the OIS first:

- `oisFormat`: Leave this as `1.0.0`, which is the current OIS format version.
- `title`: This is the title of your OIS.
Note that an Airnode can only serve one OIS of the same title.
Therefore, make sure that you pick a name unique to the integration you are doing.
For the purposes of this guide, you can simply use the name of your API.
- `version`: This is the version of this specific OIS, and is for you to be able to version-control your integrations.
You are recommended to use [semver](https://semver.org/) for this, so your initial version could be `0.1.0`.

Now we can move on to specifying the API under `apiSpecifications`.
This guide will continue assuming you do not have the OpenAPI specifications of the API that you will be integrating.

#### Base URL

The first step of specifying your API is to enter its base URL under `apiSpecifications.servers.0.url`, but let us talk about base URLs and paths before that.
Say this is the full URL you want the API calls to be made to:
```
https://www.myapi.com/v1/getdata
```
There are two ways to segment this:
```
Base URL: https://www.myapi.com
path:     /v1/getdata
```
or
```
Base URL: https://www.myapi.com/v1
path:     /getdata
```
because the call will be made to `base URL+path`, and thus both will result in the same full URL.

Set your base URL as the section of the full URL that you expect to be shared by all operations.
In the example above, we would recommend using `https://www.myapi.com`, in case additional paths starting with `/v2` get added to the API in the future.
As you can tell, API integration requires many subjective choices, and is more art than science.

#### Paths

An API operation is specified by a path and a method.
For example:
```
path:     /v1/getdata
method:   GET
```
Here, `GET` refers to an [HTTP request method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods).
This implies that we could have had another API operation that can be specified as:
```
path:     /v1/getdata
method:   POST
```
Then, a path is not enough to specify an operation by itself, we must also provide its method.

In the OIS template, we have a `paths` object with a single element.
This means that the OIS template specifies only one API operation, but you can have more simply by adding more elements to that object.
The name of the element (denoted as `{FILL_PATH}`) should be replaced with the path (e.g., `/v1/getdata`).
Similarly, `{FILL_METHOD}` should be replaced with the method of the operation you want to integrate (e.g., `GET`).

##### Path parameters

Some API operations have path parameters such as the following
```
/price/{coinId}
```
This means that calling the `/price/ethereum` path will return the Ethereum price, calling the `/price/bitcoin` path will return the Bitcoin price, etc.

These path parameters are given in curly braces in the path, and must also be defined as [operation parameters](#operation-parameters) with the same `name`, and their `in` field defined as `path`.
A request that maps to this operation and does not define this path parameter will be errored.

##### Operation parameters

After specifying the path and method of an operation, the final step is to specify its parameters.
Each parameter is an object in `apiSpecifications.path.{PATH}.{METHOD}.parameters`, with the fields `in` and `name`.
`in` tells where the parameter goes in the HTTP request to the API, and `name` tells the name that the parameter value will be sent under.

Note that you do not have to specify all operation parameters, but only the ones that you want the on-chain requester to be able to provide (see [endpoint parameters](#parameters)), and the ones that you want to hardcode a value to (see [fixed operation parameters](#fixedoperationparameters)).

#### Security schemes

As a final step, we need to specify the security schemes of the API.
Usually, this means telling Airnode where the API key goes, and under what name.
Note that we will not be entering the API key itself in the OIS, because the OIS is not meant to include any user-specific information.
Security credentials such as API keys go in [`security.json`](/airnode/security-json.md).

First, name the security scheme by replacing `{FILL_SECURITY_SCHEME_NAME}` under `apiSpecifications.components.securitySchemes`.
Note that you will also need to use the same name under `apiSpecifications.security`.
Make sure to choose a descriptive name, such as `myapi_apikey`.
This name will also be referred to in [`security.json`](/airnode/security-json.md).

Next, fill in `type`, `name` and `in` by referring to the [`components` section of OIS](/airnode/ois.md#42-components).
[OAS 3.0.3 docs](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#securitySchemeObject) is also a good source for further details.

As noted above, make sure to insert the name of your security scheme under `apiSpecifications.security`.
Furthermore, similar to API operations, you can use multiple security schemes simply by duplicating the one provided in the OIS template (e.g., an API key goes in the header, and an additional user ID goes in the query).
Similarly, if the API you are integrating is publicly accessible, you can remove all security schemes.

Congratulations, you have just specified your API operations!
Now let us move on to the part that will be exposed to the chain.

### Step 2: Specifying the endpoints

An endpoint is a service that Airnode exposes to on-chain clients.
It maps to an API operation, but the nature of this mapping is customizable.
Then, it is the integrator's job to define what this service is.

For example, if your API operation returns an asset price given its ticker (e.g., `BTC`), you can specify the endpoint such that the requester provides the ticker as a parameter.
The resulting endpoint would be a general one that returns prices for any kind of asset.
On the other hand, you can hardcode `BTC` as the asset whose price will be returned (using [fixed operation parameters](#fixedoperationparameters)), which would make your endpoint a specific one that only returns the BTC price.

The recommended endpoint definition pattern is to create an endpoint for each API operation, and allow the requesters to provide all operation parameters themselves.
This results in optimal flexibility, and essentially allows the requesters to use the entire API functionality on-chain.
Normally, oracle integrations strive to hardcode as many API parameters as possible because passing these parameters on-chain results in a gas cost overhead.
However, the Airnode protocol uses [templates](/request-response-protocol/template.md) (not to be confused with the OIS template we are using for this guide), which allow requesters to specify a large number of endpoint parameters at no additional gas cost.

Note that there are some cases where you may not want to map endpoints to API operations one-to-one.
For example, the API operation may have a parameter, `responseFormat`, that can take the values `JSON`/`XML` and determines in which format the API will respond to the call.
Airnode expects responses to be in JSON format, and thus hardcoding this parameter as `JSON` would be more suitable than letting the requester decide, as there is only one valid choice.
Again, the integrator's job is to be aware of these subtleties and use judgement.

After this brief detour, let us get back to filling in our OIS template.

`endpoints` is a list, with each endpoint represented as an object under it.
In the OIS template, there is only one endpoint defined but you can add more, just like the API operations.
The first field you need to fill in is `name`.
Make sure that it is descriptive, and that multiple endpoints do not have the same name.
If you are integrating API operations to endpoints one-to-one, using the API operation path as the endpoint name is a decent choice (i.e., the endpoint `name` would be `/v1/getdata`).
Note that you would also add the method to this name if there were multiple operations with different methods for a single path.

The next step is to fill in `endpoints.*.operation`.
Here, you need to enter the `path` and `method` of an API operation you have defined in `apiSpecifications.paths`, which means that requests to this endpoint will have the Airnode call the respective API operation.

#### `fixedOperationParameters`

It is common to need to hardcode API parameters (recall the `JSON`/`XML` example above).
We call such hardcoded parameters "fixed operation parameters".

In the OIS template, we have one fixed operation parameter under `endpoints.*.fixedOperationParameters`, and it refers to the first operation parameter.
This means that whenever the Airnode receives a request for this endpoint, the respective API call will be made with that operation parameter set to `endpoints.*.fixedOperationParameters.*.value`.

An endpoint can have multiple fixed operation parameters.
An operation parameter cannot be both in `fixedOperationParameters` and `parameters`.

#### `reservedParameters`

The requester can provide some parameters that are not mapped to API operation parameters.
These parameters are called "reserved parameters", and their names start with an underscore.
See the [related OIS docs](/airnode/ois.md#54-reservedParameters) for more information.

The current list of reserved parameters are `_type`, `_path` and `_times`.
See the [reserved parameters guide](/airnode/reserved-parameters.md) to see what each of these parameters are for.
In most cases, all three should be defined as reserved parameters with no fixed/default values, as doing so provides the requester with the most flexibility.

#### `parameters`

Endpoint parameters map to API operation parameters that the requester is allowed to provide values for.
It refers to an API operation (similar to a fixed operation parameter) through its field `operationParameter`.
You can also provide `default` values for endpoint parameters, though this is not recommended in most cases.

Endpoint parameters have a `name` field, which does not have to be the same as the API operation parameter that they map to.
As a separate note, an endpoint can have multiple parameters.

### Conclusion

This was all!
We specified the API operations and endpoints.
Each endpoint maps to an API operation, and each endpoint parameter maps to an API operation parameter.
The resulting OIS includes no user-specific information, which means that you can share it for others to easily provide the same services (for example, to set up a third-party oracle network).

Note that there was some subjectivity while defining the endpoints.
This means that two different OISes can exist for the same exact API, differing based on how the integrators designed the interface that the requester will use.
However, in most cases, one would simply map API operations to endpoints directly, and let the requester provide all API operation parameters through the endpoint parameters.
At the moment, we do not have a tool that generates an `endpoints` list that maps to `apiSpecifications.paths` one-to-one.
If you would like to help build this, please join the conversation in [this issue](https://github.com/api3dao/airnode/issues/153).

<!-- -------------------- -->
<!-- Configuring Airnode  -->
<!-- -------------------- -->
<!-- -------------------- -->
<!-- -------------------- -->

## Configuring Airnode

Users configure their Airnodes by providing a `config.json` and a `security.json` file during deployment/redeployment.
`config.json` specifies the API–oracle integration specifications in the form of [OIS](/airnode/ois.md)es, but also user-specific configuration details.
`security.json` includes security credentials such as API keys.
Both [`config.json`](/airnode/config-json.md) and [`security.json`](/airnode/security-json.md) formats are documented, which you can follow to create these files.
This guide aims to follow a more instructive approach and give some tips along the way.

We assume that you have already followed the [API integration guide](/provider-guides/api-integration.md) and created your OIS.
Similar to the [OIS template](/templates/ois.json) we have provided in the previous guide, we have a [`config.json` template](/templates/config.json) and a [`security.json` template](/templates/security.json) for this guide.
Download these files and see the [template notation information](/provider-guides/api-integration.md#ois-template).

### Creating `config.json`

As you can see in the template, `config.json` has 4 fields:
1. `ois`
1. `triggers`
1. `nodeSettings`
1. `id`

#### `ois`

`ois` is a list OIS objects that Airnode will be serving.
This means that a single instance of an Airnode can serve multiple APIs.
You can simply copy paste OISes that you will be serving into the `ois` list.

#### `triggers`

`triggers` allow you to expose the endpoints in your OIS selectively.
For example, your OIS may include 10 endpoints, but you may only want to serve 2.
Instead of modifying the OIS, you would simply create triggers for the 2.
Similarly, you may want to serve an endpoint through the request–response protocol, but not the pub–sub protocol.
In that case, you would only create the trigger for the request–response protocol.

Note that at this stage, only the request–response protocol is implemented.
You can list the endpoints that you want to serve under `triggers.request`.
In most cases, you would create a trigger for each endpoint in your OIS.

Each trigger has an `oisTitle` and `endpointName` that allow you to refer to one of the endpoints in one of the OISes.
Fill these in accordingly.
`endpointId` is the ID that the requester will use in their on-chain requests to refer to this specific trigger.
As a convention, we recommend this to be chosen as the Keccak256 hash of `{oisTitle}/{endpointName}`.
In JS (using ethers.js):

```js
endpointId = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['string'], [`${oisTitle}/${endpointName}`]));
```

You can also use [`@api3/airnode-admin`](https://github.com/api3dao/airnode/tree/master/packages/admin#derive-endpoint-id) to derive endpoint IDs according to this convention.
However, you can set `endpointId` to an arbitrary `bytes32` value (e.g., `0x0000000000000000000000000000000000000000000000000000000000000123`), and as long as the requester uses the same `endpointId` while making requests to this endpoint, it will work fine.
If you are not using the recommended convention, make sure that your endpoints have different IDs.

#### `nodeSettings`

`nodeSettings` are node-specific configuration parameters.
The first of these is `providerIdShort`, which is used as a label by the deployer to detect previous deployments.
Therefore, you must not have the `providerIdShort` field in your `config.json` during the first deployment.
On the other hand, you must have it for the following redeployments.
You can find your `providerIdShort` in the receipt file outputted after deployment.
This guide assumes that you have not deployed Airnode yet, so we did not include the `providerIdShort` field in the `config.json` template.

`nodeVersion` indicates which node version this `config.json` is prepared for.
Since the `config.json` format can be expected to change with node versions, using a `config.json` prepared for one Airnode version with another may result in unexpected issues.
The current node version is `0.1.0`, so you can leave it as such.

`cloudProvider` indicates to the deployer which cloud provider Airnode should be deployed at.
The deployer currently supports AWS, so you can leave this value as `aws`.
We are planning to extend the deployer to support a wide variety of cloud providers.
If you would like to contribute, please join the conversation in [this issue](https://github.com/api3dao/airnode/issues/154).

`region` can be seen as an extension of `cloudProvider`, it refers to which region of the cloud provider Airnode will be deployed at.
An example value would be `us-east-1`.
Note that transferring a deployment from one region to the other is not trivial at this moment (i.e., it does not take one command like deployment, but rather three).
Therefore, try to pick a region and stick to it for this specific deployment.
If you would like to contribute to related tooling, please join the conversation in [this issue](https://github.com/api3dao/airnode/issues/155).

`stage` allows you to deploy multiple Airnodes with the same provider ID.
For example, the provider may deploy one Airnode with the stage `api3` to serve API3 dAPIs, and one with the stage `public` that serves the public.
A regular user will have a single deployment, so feel free to set any descriptive name as your `stage`.
And finally, you probably want your `logFormat` to be set to `json` for your Airnode to log in JSON.

##### `nodeSettings.chains`

An Airnode can serve multiple chains simultaneously.
You can specify each of these chains under `nodeSettings.chains` as an object.

You should set the ID of the chain in `id` (e.g., `3` for Ropsten testnet).
`type` is the type of the chain, and only `evm` is supported at the moment.

Airnode can use multiple Ethereum providers per chain.
These can both be your private Ethereum node, or an Ethereum service provider such as Infura.
Accordingly, the `providers` field is list.
Enter the `name` (to be used in logs) and the `url` of the Ethereum provider as an object.

`contracts` contains the addresses of the contracts that implement the Airnode protocols.
Although you can deploy these contracts yourself, you are recommended to use the ones that were deployed by API3.
You can find them [here](https://github.com/api3dao/airnode/tree/master/packages/protocol/deployments).

`providerAdminForRecordCreation` is the address that your Airnode will set as the [provider admin](/request-response-protocol/provider.md#provideradmin) while creating the provider record on the respective chain.
You should set this field to an address that only you control.

#### `id`

`config.json` has an `id` field, which identifies the specific configuration.
Furthermore, `security.json` has the same field with the identical value, allowing the deployer to verify that the two files match.
For this to work, you are recommended to choose a unique value for this field for each `config.json`/`security.json` you create (e.g., use a UUID).

### Creating `security.json`

`security.json` is where we will store our API keys.
Make sure to download the [`security.json` template](/templates/security.json) and refer to the [docs](/airnode/security-json.md) as needed.

For each security scheme you have defined in your `config.json`, you need to create an entry in `security.json` that includes its value.
Feel free to duplicate the OIS entries under `apiCredentials` or security scheme entries under these OIS entries as needed.
Finally, make sure that you use the same `id` that you have used in `config.json`.

### Conclusion

In this guide, we created the `config.json` and `security.json` files required to deploy our Airnode.
Note that `config.json` is user-specific, so your `config.json` file is probably of not much use to others.
Furthermore, it contains your Ethereum provider URLs, which tend to include security credentials/keys.
Your `security.json` contains your API keys, so it should definitely be kept secret.
Therefore, even though you can safely share your OIS, you should avoid publishing your configuration files/pushing them to repos.

Now that we have our Airnode configuration files, the next step is deployment.

<!-- ------------------ -->
<!-- Deploying Airnode  -->
<!-- ------------------ -->
<!-- ------------------ -->
<!-- ------------------ -->

## Deploying Airnode

After [integrating your API](/provider-guides/api-integration.md) and [creating the configuration files](/provider-guides/configuring-airnode.md), the next step is to deploy your Airnode.
Airnode comes with a [deployer](https://github.com/api3dao/airnode/tree/master/packages/deployer), which uses [Terraform](https://www.terraform.io/) and [Serverless Framework](https://www.serverless.com/) to automate the entire deployment process.
This deployer is also containerized as a [Docker](https://www.docker.com/) image, which allows you to deploy your Airnode on any platform without worrying about installing dependencies.
So let's begin!

### Installing Docker

The upside of containerizing the deployer is that you only need to install Docker.
The downside is that you need to install Docker.
Go to the [Docker website](https://docs.docker.com/get-docker/) and install it first.

### Creating cloud credentials

The deployer interacts with your cloud provider to deploy Airnode programmatically, without requiring you to click through a lot of ever-changing graphical interfaces.
For it to be able to do that, you need to give it permission.

To be able to do this, you need to create a new user in your AWS account, give it programmatic access, retrieve its access key ID and secret access keys, and feed these to the deployer.
Fortunately, this is not nearly as complicated as it sounds.
Follow [this video](https://www.youtube.com/watch?v=KngM5bfpttA), get your keys, and put them in a file named `.env` as below (values are made up, you need to replace these with your own):
```
AWS_ACCESS_KEY_ID=JSDYNDRUA1XAF2W3UGPA
AWS_SECRET_KEY=q4JiOfPP4wQOuRj01/6/7RAodTAg6lFb99IoB4XH
```
Here is an [example file](https://github.com/api3dao/airnode/blob/master/packages/deployer/.env.example) that is left blank.
Make sure that you do not push your credentials to a repository or leave them around!
These credentials can be used to gain access to your Airnode's private key.

### Deployment

Get the `config.json` and `security.json` files you have created while [configuring your Airnode](/provider-guides/configuring-airnode.md), your `.env` file with your [cloud provider credentials](#creating-cloud-credentials), and place these three files in the same directory.
Then, in this same directory, run the following command (if you are on Windows, use CMD, replace `\` with `^`, `$(pwd)` with `%cd%`):

```sh
docker run -it --rm \
  --env-file .env \
  --env COMMAND=deploy-first-time \
  -v $(pwd):/airnode/out \
  api3/airnode:latest
```

This will first download the deployer image, which may take a few minutes depending on the speed of your Internet connection.
Then, it will read your configuration files and start deployment.
This process will be entirely automatic, with the exception that at one stage, the deployer will display the mnemonic of your Airnode's private key.
Please note this down with pen and paper (do not copy paste to a text file on your computer) and keep it in a secure place.

Another point to mention is that the deployer will display your master wallet address, and ask you to deposit some ETH in it for it to create your provider record.
Follow the instructions for your Airnode to create your provider record using your master wallet, and it will send any unused ETH to the `providerAdminForRecordCreation` you have set in your `config.json`.
You can see the [docs](/request-response-protocol/provider.md#creating-a-provider-record) for more information about this process.

A couple minutes after noting down your mnemonic and hitting `ENTER`, you should be done!
The deployer will output a receipt file ending with `.receipt.json`.
This file does not include any sensitive information, so feel free to share it as needed.
The receipt contains your [`providerId`](/request-response-protocol/provider.md#provideid), `providerIdShort` and `masterWalletAddress` that you will need to fund for it to create your provider record (if you have not already).
You will need to add your `providerIdShort` to your `config.json` to be able to redeploy your node with updated configurations.

To find out how to redeploy your node or remove it from your cloud provider account, see the [deployer image docs](https://github.com/api3dao/airnode/blob/master/Docker.md).
Now, the next step is to configure the authorization policies for the endpoints you will be serving.

<!-- -------------------- -->
<!-- Setting Authorizers  -->
<!-- -------------------- -->
<!-- -------------------- -->
<!-- -------------------- -->

## Setting authorizers

We are assuming that you have [configured your Airnode](/provider-guides/configuring-airnode.md) (and set `endpointId`s of your endpoints), and [deployed your Airnode](/provider-guides/deploying-airnode.md) and received your `providerId` in your receipt file.
Requesters who know your `providerId` and `endpointId`s should now be able to make requests to your endpoints.
However, you probably do not want to serve the entire public with your Airnode, but rather
- Only serve your own client contracts
- Only serve requesters who have made a subscription payment
- Only serve requesters who have gone through KYC
- ...

In this guide, we will explain how you can achieve this.

### `authorizers`

[`EndpointStore.sol`](/request-response-protocol/general-structure.md#endpointstoresol) keeps a list of [authorizer](/request-response-protocol/authorizer.md) addresses for each `providerId`–`endpointId` pair.
An authorizer is a contract that Airnode calls to check if it should respond to a specific request.
It can enforce any kind of authorization policy that one could implement as a contract.

### Default state: Deny all

By default, the authorizers of all endpoints of a provider is an empty list.
An empty authorizers list means that endpoint is not allowed to be used by anyone.
Therefore, after deploying your Airnode, you must also set authorizers for your endpoints for them to be accessible.

### Allow all

The simplest authorization policy is opening the endpoint to the public, so let us see how to do that first.
Authorizers being set to `[0]` means that all requests made to it will be authorized (i.e., will be responded to by Airnode).
Only the `providerAdmin` of a provider can update the authorizers of its endpoints.
Therefore, you will need to make a transaction using the provider admin address (that you have set in `config.json` as `providerAdminForRecordCreation`) to [`EndpointStore.sol`](/request-response-protocol/general-structure.md#endpointstoresol).
In JS (using ethers.js):
```js
airnode.connect(providerAdmin).updateEndpointAuthorizers(providerId, endpointId, [ethers.constants.AddressZero]);
```
You can also use [`@api3/airnode-admin`](https://github.com/api3dao/airnode/tree/master/packages/admin#update-authorizers) to update endpoint authorizers.

After making this transaction, your Airnode will respond to all requests.
Note that being able to do this on-chain through `providerAdmin` allows you to update your authorization policies without interacting with your Airnode or having to redeploy it.

### Custom authorization policies

We have mentioned that authorizer contracts can implement any arbitrary authorization logic.
See [this example](https://github.com/api3dao/airnode/blob/master/packages/protocol/contracts/authorizers/MinBalanceAuthorizer.sol) where Airnode only responds to requests if the wallet it will use to fulfill the request has a balance more than an amount set by the provider admin.

The authorizer list allows you to combine single-purpose authorizer contracts to form complex policies as described in the [docs](/request-response-protocol/authorizer.md#authorizer-list).
If you would like to contribute to this set of authorizer contracts, please join the conversation in [this issue](https://github.com/api3dao/airnode/issues/38).

### Conclusion

Your Airnode is completly set up now.
The following guides will be on how a requester would be able to make requests to it.
