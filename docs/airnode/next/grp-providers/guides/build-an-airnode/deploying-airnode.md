---
title: Deploying Airnode
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

>Complete the following before deploying your Airnode.
>- [API Integration](api-integration.md)
>- [Configuring Airnode](configuring-airnode.md)


::: warning Please Note
The recommended way to deploy Airnode is by using the Deployer Docker image. This package simply implements the CLI used by that image and is not meant to be used directly by the end user.

See [Deploying Airnode](../grp-providers/guides/build-an-airnode/deploying-airnode.md) to deploy using Docker.
:::

<Fix>
As of 08-18-2021 the Airnode packages are still changing.

To get the Airnode repo to build on a Mac there is a change.

```bash
# Change package >protocol > package.json > build:fix-contracts-dts

echo \"export { TypedEventFilter } from './commons'\n\" >> src/contracts/index.ts && grep -rl 'extends ethers.utils.Interface' src/contracts | xargs sed -i '' 's/ethers\\.utils\\.Interface/Interface/g' && grep -rl 'Result ' src/contracts | xargs sed -i '' 's/Result /Result, Interface /g'

```

Next make changes to `packages/deployer/src/handlers/aws/index.ts`

```js
// Line 19
- const [err, initializedState] = await node.promiseUtils.go(node.handlers.initializeProvider(stateWithConfig));
+ const [err, initializedState] = await node.promiseUtils.go(() => node.handlers.initializeProvider(stateWithConfig));

// Line 42
- const [err, updatedState] = await node.promiseUtils.go(node.handlers.processTransactions(stateWithConfig));
+ const [err, updatedState] = await node.promiseUtils.go(() => node.handlers.processTransactions(stateWithConfig));
```

After these changes there will be 2 warnings. Not sure of their impact.

</Fix>




After integrating your API ([API Integration](api-integration.md)) and creating the configuration files ([Configuring Airnode](configuring-airnode.md)), the next step is to deploy your Airnode. Airnode comes with a [deployer](https://github.com/api3dao/airnode/tree/master/packages/deployer), which uses [Terraform](https://www.terraform.io/) to automate the entire deployment process. Rather than using the deployer directly it is recommended to use the provided Docker image.

---
## Temporary instructions to deploy using deployer

- Install Terraform
- Build the Airnode repo locally
- `git clone git@github.com:api3dao/airnode.git`
- Place config.json and secrets.env in airnode > packages > deployer > src > config-data
- `yarn run bootstrap`
- `yarn run build-all`
- Set (export) AWS environment variables
- To deploy: `yarn cli:deployer deploy`
- The `receipt.json` file will appear in the root of the deployer package
- To remove the deployment: `yarn cli:deployer remove-with-receipt`

---

## Install Docker

The [deployer](https://github.com/api3dao/airnode/tree/pre-alpha/packages/deployer) is containerized as a Docker image (opens new window), which allows you to deploy your Airnode on any platform without the worry of installing dependencies and is the recommended way to do a deployment.

If you do not already have docker installed go to the [Docker website](https://docs.docker.com/get-docker/) and install it.

## Creating cloud credentials

The deployer interacts with your cloud provider to deploy Airnode programmatically, without requiring you to click through a lot of ever-changing graphical interfaces.For it to be able to do that, you need to give it permission.

To be able to do this, you need to create a new user in your AWS account, give it programmatic access, retrieve its access key ID and secret access keys, and feed these to the deployer. Fortunately, this is not nearly as complicated as it sounds. Follow [this video](https://www.youtube.com/watch?v=KngM5bfpttA), get your keys, and put them in the secrets.env file as shown below.

```
AWS_ACCESS_KEY_ID="JSDYNDRU...AF2W3UGPA"
AWS_SECRET_ACCESSKEY="q4JiOfPP4wQOuRj01///7RAodTAg6lFb99IoB4XH"
...
```

Here is an [example file](../../../reference/templates/secrets-env.md) that is left blank. Make sure that you do not push your credentials to a repository or otherwise expose them as these credentials can be used to gain access to your Airnode's private key.

## Deployment

<Fix>Deployment" needs to be updated when vrs 0.1.0 is ready. Not sure which Airnode repo branch to pull from.</Fix>

Get the `config.json` and `security.json` files you have created while [configuring your Airnode](configuring-airnode.md), your `.env` file with your [cloud provider credentials](deploying-airnode.md#creating-cloud-credentials), and place these three files in the same directory.
Then, in this same directory, run the following command.


:::: tabs
::: tab Linux/Mac
  ```sh
  docker run -it --rm \
    --env-file .env \
    --env COMMAND=deploy-first-time \
    -v "$(pwd):/airnode/out" \
    api3/airnode-deployer:0.1.0
  ```
:::
::: tab Windows
  ```sh
  docker run -it --rm ^
    --env-file .env ^
    --env COMMAND=deploy-first-time ^
    -v "%cd%:/airnode/out" ^
    api3/airnode-deployer:0.1.0
  ```
:::
::::

This will first download the deployer image, which may take a few minutes depending on the speed of your Internet connection. Then, it will read your configuration files and start deployment. This process will be entirely automatic, with the exception that at one stage, the deployer will display the mnemonic of your Airnode's private key. Please note this down with pen and paper (do not copy paste to a text file on your computer) and keep it in a secure place.

<Fix>Deprecated?</Fix>
~~Another point to mention is that the deployer will display your Airnode wallet address, and ask you to deposit some ETH in it for it to create your provider record. Follow the instructions for your Airnode to create your provider record using your Airnode wallet, and it will send any unused ETH to the `airnodeAdminForRecordCreation` you have set in your `config.json`. You can see the [docs](../../../concepts/airnode.md#creating-an-airnode-record) for more information about this process.~~


A couple minutes after noting down your mnemonic and hitting `ENTER`, you should be done! The deployer will output a receipt file: `<file-name>.receipt.json`. This file does not include any sensitive information, so feel free to share it as needed. The receipt contains your Airnode's [`address`](../../../concepts/airnode.md#airnodeaddress) and the `airnodeAddressShort`. You will need to add the `airnodeAddressShort` to your `config.json` to be able to redeploy your node with updated configurations.

To find out how to redeploy your node or remove it from your cloud provider account, see the [deployer image](../../using-docker.md#deployer-image). Now, the next step is to configure the authorization policies for the endpoints you will be serving.

## Removing the Airnode


## Calling the Airnode

Once the Airnode is deployed, see [Calling an Airnode](../../../grp-developers/call-an-airnode.md) to learn how requests are made to it.
