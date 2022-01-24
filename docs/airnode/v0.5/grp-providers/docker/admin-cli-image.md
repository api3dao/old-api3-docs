---
title: Airnode Admin CLI Image
---

<TitleSpan>Docker Images</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

<!-- TODO: link [docker hub](https://hub.docker.com/r/api3/airnode-admin) once image is published -->
<!-- TODO: link [Airnode repository](https://github.com/api3dao/airnode/tree/v0.3/packages/airnode-admin/docker) once image is published -->

Use the admin CLI image as an alternative method to execute
[Admin CLI Commands](../../reference/packages/admin-cli.md) using npx. Either
method will achieve the same results. The image forgoes downloading the admin
CLI package each time a command is executed using npx.

If you want to build the admin CLI image from the source yourself, you can find
the
[image built instructions](https://github.com/api3dao/airnode/tree/v0.3/packages/airnode-admin/docker)
in the Airnode repository.

Additional information about the
[admin CLI image](../../../v0.3/reference/packages/admin-cli.md#using-docker) is
available in the admin CLI commands doc.

## Usage

The following example shows the difference between using the docker image versus
npx when executing the `get-sponsor-status` admin CLI command.

```sh
#npx
npx @api3/airnode-admin get-sponsor-status \
  --provider-url https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --sponsor-address 0x9Ec6C4... \
  --requester-address 0x2c2e12...

# Docker
docker run api3/airnode-admin:0.4.0 get-sponsor-status \
  --provider-url https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --sponsor-address 0x9Ec6C4... \
  --requester-address 0x2c2e12...
```
