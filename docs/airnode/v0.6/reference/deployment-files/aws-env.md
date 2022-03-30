---
title: aws.env
---

<TitleSpan>Deployment Files</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

When it is time to deploy the Airnode to AWS, the Docker
[deployer image](../../grp-providers/docker/deployer-image.md) will need the AWS
credentials to build the node.

- Do not place double quotes (") around the value of each variable.
- Variable names cannot contain dashes (-).

```bash
AWS_ACCESS_KEY_ID=XYZ...123
AWS_SECRET_ACCESS_KEY=ABC7...89
```
