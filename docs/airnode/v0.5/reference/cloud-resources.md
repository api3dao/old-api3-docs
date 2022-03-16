---
title: Cloud Resources
---

<TitleSpan>Reference</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

When deployed to a cloud provider, such as AWS or GCP, Airnode uses certain
resources to fully operate.

:::: tabs

::: tab AWS

| Resource    | Description                                                  |
| :---------- | :----------------------------------------------------------- |
| EventBridge |                                                              |
| CloudWatch  |                                                              |
| Lambda      | Functions that access an API.                                |
| IAM         |                                                              |
| API Gateway | Endpoints for the HTTP Gateway and HTTP Signed Data Gateway. |
| S3          |                                                              |

:::

::: tab GCP

| Resource        | Description                                                  |
| :-------------- | :----------------------------------------------------------- |
| Cloud Scheduler |                                                              |
| Cloud Functions | Functions that access an API.                                |
| API Gateway     | Endpoints for the HTTP Gateway and HTTP Signed Data Gateway. |
| Cloud Storage   |                                                              |

:::

::::
