---
title: Airnode Client Image
---

<TitleSpan>Docker Images</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>
<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

Usually the Airnode is deployed on a serverless platform using the [deployer](./deployer-image.md). However, there is another option which is to run the Airnode in a docker container on your machine locally, on premise or cloud hosted.

A docker client image has been published on [Docker Hub](https://hub.docker.com/r/api3/airnode-client). If you want to build the container from the source yourself, you can find the image and built instructions in the [Airnode repository](https://github.com/api3dao/airnode/tree/v0.2/packages/airnode-node/docker).

## Configuration

The Airnode needs two configuration files for its run: `config.json` and `secrets.env`. These files need to be passed to the Docker container via volumes.

The Docker container looks for configuration files mounted internally in the `/app/config` directory.

Your current working directory should contain the `config` folder with the configuration files above and you bind it to the `/app/config` directory for the docker using the `--volume` parameter.

:::: tabs

::: tab Linux/Mac/WSL2

```sh
$ tree
.
└── config
    ├── config.json
    └── secrets.env
$ docker run --volume $(pwd)/config:/app/config ...
```

:::

::: tab Windows PowerShell

```sh
$ tree
.
└── config
    ├── config.json
    └── secrets.env
$ docker run --volume $(pwd)/config:/app/config ...
```

:::

::: tab Windows CMD

```sh
$ tree
.
└── config
    ├── config.json
    └── secrets.env
$ docker run --volume %cd%:/config:/app/config ...
```

:::

::::

## Usage

Example directory structure and commands for running the Airnode Docker container. The below commands are run from the depicted directory.

### Running Airnode

It is recommended to run the Airnode in a detached mode using the `--detach` parameter, but you may run the it without it as well.

:::: tabs

::: tab Linux/Mac/WSL2

```sh
docker run --detach \
  --volume $(pwd)/config:/app/config \
  --name airnode \
  api3/airnode-client:0.2.2
```

:::

::: tab Windows PowerShell

```sh
docker run --detach \
  --volume $(pwd)/config:/app/config \
  --name airnode \
  api3/airnode-client:0.2.2
```

:::

::: tab Windows

```sh
docker run --detach ^
  --volume %cd%/config:/app/config ^
  --name airnode ^
  api3/airnode-client:0.2.2
```

:::

::::

> If you want to connect Airnode to a blockchain running on localhost, you need to make the blockchain accessible from within the docker itself. If you use docker for linux you can use `--network="host"` parameter. For windows, wsl or mac connect to `host.docker.internal` instead of `127.0.0.1`. See [https://stackoverflow.com/a/24326540](https://stackoverflow.com/a/24326540).

### Checking Airnode logs

If you run the Airnode in a detached mode, you need to use the `logs` command to access the logs. You can also use `--follow` parameter to stream the Airnode log output.

```bash
docker logs airnode
```

or

```bash
docker logs --follow airnode
```

## Stopping Airnode

```bash
docker stop airnode
```
