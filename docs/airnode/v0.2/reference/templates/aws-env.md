---
title: aws.env
---
<TitleSpan>Templates</TitleSpan>
# {{$frontmatter.title}}

The `aws.env` contains AWS credentials from an IAM user. These credentials are used by the Docker [deployer image](../../grp-providers/docker/deployer-image.md) to deploy an Airnode to AWS. For more details, see the [full description of the secrets file](../deployment-files/aws-env.md).

Do not place double quotes (") around the value of each field.

```sh
AWS_ACCESS_KEY_ID=<FILL_*>
AWS_SECRET_ACCESS_KEY=<FILL_*>
```
