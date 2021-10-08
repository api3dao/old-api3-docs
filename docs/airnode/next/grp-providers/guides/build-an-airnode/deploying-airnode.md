---
title: Deploying Airnode
---
<TitleSpan>Build an Airnode</TitleSpan>
# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

After integrating your API ([API Integration](api-integration.md)) and creating the configuration files ([Configuring Airnode](configuring-airnode.md)), the next step is to deploy the Airnode. 

>Complete the following before deploying your Airnode.
>- [API Integration](api-integration.md)
>- [Configuring Airnode](configuring-airnode.md)
>- [Applying Authorization](./apply-auth.md) optional
>- [Heartbeat](./heartbeat.md) optional
>- [HTTP Gateway](./http-gateway.md) optional

## Deploy with Docker
The recommended way to deploy Airnode is by using the Docker [deployer image](../../docker/deployer-image.md). This image simply implements the deployer CLI which is not intended to be used directly. Try out the [Quick Deploy](../../tutorial/) tutorial if you wish to become familiar with the deployer image first.

The deployer interacts with a cloud provider (AWS) to deploy Airnode programmatically, without requiring you to click through a lot of ever-changing graphical interfaces. For it to do so, an `aws.env` file is required and was discussed in [Configuring an Airnode](./configuring-airnode.md#creating-aws-env).

## Install Docker

The [deployer image](../../docker/deployer-image.md) is containerized as a Docker image. This will deploy the Airnode to AWS Lambda without the worry of installing dependencies and is the recommended way to do a deployment. If you do not already have docker installed go to the [Docker website](https://docs.docker.com/get-docker/) and install it.

## Deployment

At this point your project should resemble the following. The `config.json`, `secrets.env` and `aws.env` files should be ready to go. Other files you may have added are expected but not used the deployer image.

```
my-airnode
├── aws.env
├── config
│   ├── config.json
│   └── secrets.env
└── output
    ├── receipt.json
```

From the root of the project directory run the Docker [deployer image](../../docker/deployer-image.md) which will deploy the Airnode to AWS. When the deployment has completed a `receipt.json` file will be written to the `/output` folder. This file contains important configuration information about the Airnode and is needed to remove the Airnode should the need arise.

<DeployerPermissionsWarning/>

:::: tabs
::: tab Linux/Mac
  ```
  docker run -it --rm \
    --env-file aws.env \
    -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) \
    -v "$(pwd)/config:/app/config" \
    -v "$(pwd)/output:/app/output" \
    api3/deployer:latest deploy
  ```
:::
::: tab Windows
  ```sh
  docker run -it --rm ^
    --env-file aws.env ^
    -v "%cd%/config:/app/config" ^
    -v "%cd%/output:/app/output" ^
    api3/deployer:latest deploy
  ```
:::
::::

This will first download the deployer image, which may take a few minutes depending on the speed of your Internet connection. Then, it will read your configuration files and start deployment. This process will be entirely automatic, with the exception that at one stage, the deployer will display the mnemonic of your Airnode's private key. Please note this down with pen and paper (do not copy paste to a text file on your computer) and keep it in a secure place.

## Testing with HTTP Gateway

If you opted to implement the HTTP Gateway for the Airnode it can be tested while bypassing the chain it was deployed to. There are two examples in other docs that detail how to do this.

- [Quick Deploy](../../tutorial/README.md#test-the-airnode) 
- [HTTP Gateway](./http-gateway.md)

## Removing the Airnode

When the Airnode was deployed a `receipt.json` file was created in the `/output` folder. This file is needed to remove an Airnode.

- `--env-file`: Location of the `aws.env` file.
- `-v`: Location of the `receipt.json` file.

:::: tabs
::: tab Linux/Mac
  ```sh
  docker run -it --rm \
    --env-file aws.env \
    -v "$(pwd)/output:/app/output" \
    api3/deployer:latest remove -r output/receipt.json
  ```
:::
::: tab Windows
For Windows, use CMD (and not PowerShell).
  ```sh
  docker run -it --rm ^
    --env-file aws.env ^
    -v "%cd%/output:/app/output" ^
    api3/deployer:latest remove -r output/receipt.json
  ```
:::
::::

## Calling the Airnode

Once the Airnode is deployed, see [Calling an Airnode](../../../grp-developers/call-an-airnode.md) to learn how requests are made to it.
