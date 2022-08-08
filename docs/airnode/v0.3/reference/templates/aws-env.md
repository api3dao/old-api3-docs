---
title: aws.env
docSetName: Airnode v0.3
folder: Reference > Templates
basePath: /airnode/v0.3
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

The `aws.env` contains AWS credentials from an IAM user. These credentials are
used by the Docker
[deployer image](../../grp-providers/docker/deployer-image.md) to deploy an
Airnode to AWS. For more details, see the full description of the
[aws.env](../deployment-files/aws-env.md) file.

Do not place double quotes (") around the value of each field.

```sh
AWS_ACCESS_KEY_ID=<FILL_*>
AWS_SECRET_ACCESS_KEY=<FILL_*>
```
