---
title: aws.env
folder: Reference > Deployment Files
basePath: /airnode/v0.2
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>
When it is time to deploy the Airnode to a cloud provider (AWS), the Docker
[deployer image](../../grp-providers/docker/deployer-image.md) will need the AWS
credentials to build the node. Do not place double quotes (") around the value
of each field.

```bash
AWS_ACCESS_KEY_ID=XYZ...123
AWS_SECRET_ACCESS_KEY=ABC7...89
```
