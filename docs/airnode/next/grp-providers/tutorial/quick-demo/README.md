---
title: Quick Deploy
---

<TitleSpan>Quick Deploy Demo</TitleSpan>

# {{$frontmatter.title}}
<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

This demo is a simple Airnode deployment, using a hands-on approach, to better understand the overall deployment process.

An Airnode deployment uses a Docker image (called [deployer image](../../docker/deployer-image.md)) which in turn requires three files as input.

- [config.json](./config.json.md)
- [secrets.env](./secrets.env.md)
- [aws.env](./aws.env.md)

For the purpose of this demo these files have been created for you and only require a few minor changes on your part to make the deployment of the demo Airnode successful. These change are needed for you to supply AWS credentials and a chain provider url.

## Getting Started

Create a folder called `/quick-deploy-demo` with two more internal folders named `/config` and `/output`. Place the contents of the files provided ([config.json](./config.json.md), [secrets.env](./secrets.env.md) and [aws.env](./aws.env.md)) into each.

```
quick-deploy-demo
├── aws.env
├── config
│   ├── config.json
│   └── secrets.env
└── output
    ├── receipt.json
```

By default, the deployer image looks for `config.json` and `secrets.env` in `/config`, `aws.env` in `/quick-deploy-demo` and writes `receipt.json` to the `/output` folder. You can place the `aws.env` file into the `/config` folder as well but will need to update its path in the deployer image call.

## Files Changes


### config.json

This file requires no changes on your part. It has been created with just one API endpoint.

### secrets.env

### aws.env