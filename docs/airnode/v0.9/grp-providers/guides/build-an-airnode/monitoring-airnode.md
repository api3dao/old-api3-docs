---
title: Monitoring Airnode
docSetName: Airnode v0.9
folder: API Providers > Build an Airnode
basePath: /airnode/v0.9
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

## Cloud Provider Log Organization

Airnode logs or log groups are named similarly in AWS and GCP and include the
following hyphen-separated components: `airnode`, `<airnode short address>`,
`<stage>`, and `<airnode cycle stage or request type>`, for example,
`airnode-9e62180-tutorial-startCoordinator`. The possible Airnode cycle stages
or request types and the logs they contain are as follows:

- `startCoordinator`: Logs for chain provider initialization and request
  fetching
- `run`: Logs of API calls and withdrawals originating from blockchain requests
- `httpReq`: Logs for [HTTP gateway requests](./http-gateways.md)
- `httpSignedReq`: Logs for
  [HTTP signed data gateway requests](./http-gateways.md)

### AWS

Airnode logs are available in
[CloudWatch](https://console.aws.amazon.com/cloudwatch) under Logs > Log groups.
Note that for the HTTP gateways, AWS generates a unique `requestId` for each
request. These should not be confused with the `requestId` of a request
originating from a blockchain.

### GCP

Airnode logs are available in the
[Logs Explorer](https://console.cloud.google.com/logs/). It can be convenient to
query or stream logs by the "Cloud Function" Resource Type and then by "Function
Name" in order to view a specific request type or Airnode cycle stage.

## Local Airnode Client

Running the `airnode-client` Docker image will output container logs to the
command line. These logs are also available through the Docker interface e.g.
under Containers within Docker Desktop. For more on the `airnode-client` image,
[see here](../../docker/client-image.md).
