---
title: Using Docker
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

<Fix>The commands use "latest" for <b>version</b> and need to be update.</Fix>

Using Docker is the easiest way to both deploy an Airnode and to run an Airnode locally. There are two docker images for each: the deployer image and the client image. 

- The **deployer image** deploys the node in the form of serverless functions (e.g. AWS Lambda). 
- The **client image** is the node itself, containerized. The container can be run locally or deployed to the cloud (e.g. AWS EC2 or Lightsail). 

You would probably run the client image container locally while developing, and use the deployer image to deploy the serverless functions for production.

## Client Image

1. Build the Docker image (you can skip this step and fetch the pre-built image).
  
    :::: tabs
    ::: tab Linux/Mac
      ```sh
      mv Dockerfile Dockerfile-deployer && \
      mv Dockerfile-client Dockerfile && \
      docker build . -t api3/airnode-client:latest && \
      mv Dockerfile Dockerfile-client && \
      mv Dockerfile-deployer Dockerfile
      ```
    :::
    ::: tab Windows
      ```sh
      mv Dockerfile Dockerfile-deployer && ^
      mv Dockerfile-client Dockerfile && ^
      docker build . -t api3/airnode-client:latest && ^
      mv Dockerfile Dockerfile-client && ^
      mv Dockerfile-deployer Dockerfile
      ```
    :::
    ::::

2. Ensure that your `.env` file looks like [.env.example](https://github.com/api3dao/airnode/blob/pre-alpha/packages/node/__dev__/.env.example) and is the current working directory.

3. Also ensure that [config.json](https://github.com/api3dao/airnode/blob/pre-alpha/packages/node/__dev__/config.json.example) is also in the current working directory.
Note that `nodeSettings.cloudProvider` should be `local`.

4. The following command runs an airnode client that is invoked every minute

    :::: tabs
    ::: tab Linux/Mac
      ```sh
      docker run -it --rm \
          --env-file .env \
          -v $(pwd):/airnode/out \
          api3/airnode-client:pre-alpha
      ```
    :::
    ::: tab Windows
      ```sh
      docker run -it --rm ^
          --env-file .env ^
          -v "%cd%":/airnode/out ^
          api3/airnode-client:pre-alpha
      ```
    :::
    ::::


## Deployer Image

1. Build the Docker image
```sh
docker build . -t api3/airnode-deployer:latest
```

2. Ensure that your `.env` file looks like [.env.example](https://github.com/api3dao/airnode/blob/pre-alpha/packages/deployer/.env.example) and is the current working directory.

3. When running [deploy](deployer-image.md#deploy) your `config.json` and `security.json` must be in the current working directory.
(They are also needed for other commands temporarily.)

4. Run the image with one of the following commands:

### `deploy`

:::: tabs
::: tab Linux/Mac
  ```sh
  docker run -it --rm \
    --env-file aws.env \
    -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) \
    -v $(pwd)/output:/app/output \
    api3/deployer:latest deploy
  ```
:::
::: tab Windows
  ```sh
  docker run -it --rm ^
    --env-file .env ^
    --env COMMAND=deploy-first-time ^
    -v "%cd%"/output:/app/output ^
    api3/deployer:latest deploy
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
    -v $(pwd)/output:/app/output \
    api3/deployer:latest remove -r output/receipt.json
  ```
:::
::: tab Windows
  ```sh
  docker run -it --rm ^
    --env-file aws.env ^
    -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) ^
    -v "%cd%"/output:/app/output ^
    api3/deployer:latest remove -r output/receipt.json
  ```
:::
