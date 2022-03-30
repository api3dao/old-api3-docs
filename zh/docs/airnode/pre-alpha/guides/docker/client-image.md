---
title: Client image instructions
---

# {{$frontmatter.title}}
<VersionWarning/> <TOC class="table-of-contents" :include-level="[2,3]" />

1. Build the Docker image (you can skip this step and fetch the pre-built image). :::: tabs ::: tab Linux/Mac
      ```sh
      mv Dockerfile Dockerfile-deployer && \
      mv Dockerfile-client Dockerfile && \
      docker build . -t api3/airnode-client:0.1.0 && \
      mv Dockerfile Dockerfile-client && \
      mv Dockerfile-deployer Dockerfile
      ```
    ::: ::: tab Windows
      ```sh
      mv Dockerfile Dockerfile-deployer && ^
      mv Dockerfile-client Dockerfile && ^
      docker build . -t api3/airnode-client:0.1.0 && ^
      mv Dockerfile Dockerfile-client && ^
      mv Dockerfile-deployer Dockerfile
      ```
    ::: ::::

1. Ensure that your `.env` file looks like [.env.example](https://github.com/api3dao/airnode/blob/pre-alpha/packages/node/__dev__/.env.example) and is the current working directory.

2. Also ensure that [config.json](https://github.com/api3dao/airnode/blob/pre-alpha/packages/node/__dev__/config.json.example) is also in the current working directory. Note that `nodeSettings.cloudProvider` should be `local`.

3. The following command runs an airnode client that is invoked every minute.

    :::: tabs ::: tab Linux/Mac
      ```sh
      docker run -it --rm \
          --env-file .env \
          -v "$(pwd):/airnode/out" \
          api3/airnode-client:pre-alpha
      ```
    ::: ::: tab Windows
      ```sh
      docker run -it --rm ^
          --env-file .env ^
          -v "%cd%:/airnode/out" ^
          api3/airnode-client:pre-alpha
      ```
    ::: ::::
