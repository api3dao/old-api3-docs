---
title: Deployer Image
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Use the deployer image to deploy or remove an Airnode with a cloud provider such as AWS. The simplest way is to use the pre-built packages. If you would rather build the images yourself see [docker README](https://github.com/api3dao/airnode/tree/master/packages/deployer/docker) in the deploy package.

The deployer image has two commands.

- `deploy`: Deploys or updates an Airnode.
- `remove`: Removes

See the [Quick Start Demo]() to quickly deploy a pre-configured Airnode using the deployer image.

## `deploy`

The `deploy` command will create the Airnode with a cloud provider or update it if it already exists. Three files are needed to run the deploy command.

- config.json
- secrets.env
- aws.env

:::: tabs
::: tab Linux/Mac
  ```sh
  docker run -it --rm \
  --env-file aws.env \
    -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) \
    -v "$(pwd)/config:/app/config" \
    -v "$(pwd)/output:/app/output" \
    @api3/deployer:latest deploy
  ```
:::
::: tab Windows
If you are using Windows, use CMD (and not PowerShell).
  ```sh
  docker run -it --rm ^
    --env-file aws.env ^
    -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) ^
    -v "%cd%/config:/app/config" ^
    -v "%cd%/output:/app/output" ^
    @api3/deployer:latest deploy
  ```
:::
::::

### `remove`

:::: tabs
::: tab Linux/Mac
  ```sh
  docker run -it --rm \
    --env-file aws.env \
    -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) \
    -v "$(pwd)/output:/app/output" \
    api3/deployer:latest remove -r output/receipt.json
  ```
:::
::: tab Windows
If you are using Windows, use CMD (and not PowerShell).
  ```sh
  docker run -it --rm ^
    --env-file aws.env ^
    -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) ^
    -v "%cd%/output:/app/output" ^
    api3/deployer:latest remove -r output/receipt.json
  ```
:::
