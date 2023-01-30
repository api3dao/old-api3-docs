---
title: Migration Guide
docSetName: Airnode v0.10
folder: Reference
basePath: /airnode/v0.10
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<!--TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" /-->

The following guide assumes a valid v0.9.x `config.json` file. All changes
listed below will need to be implemented in order to migrate to Airnode v0.10.x.
This document is written in a way that will preserve existing behaviour with
earlier Airnode versions.

The document also mentions changes to user facing services related to Airnode,
such as airnode-deployer, airnode-admin, etc., and new features.

## Migration

### Summary

1. `ois[n].oisFormat` updated to "1.4.0".

2. `nodeSettings.nodeVersion` updated to "0.10.0".

3. Field `chains[n].authorizers.crossChainRequesterAuthorizers` was added.

4. Fields `nodeSettings.httpGateway.apiKey` and
   `nodeSettings.httpSignedDataGateway.apiKey` were removed.

5. Field `nodeSettings.heartbeat.id` was removed.

6. Command `airnode-deployer remove-with-deployment-details` no longer exists.
   It was replaced by a command `airnode-deployer remove <deployment ID>`.

### Details

1. `ois[n].oisFormat`

Updated to "1.4.0"

```diff
{
-  "oisFormat": "1.2.0"
+  "oisFormat": "1.4.0"
}
```

2. `nodeSettings.nodeVersion`

Updated to "0.10.0"

```diff
{
-  "nodeVersion": "0.9.2"
+  "nodeVersion": "0.10.0"
}
```

3. A new field `chains[n].authorizers.crossChainRequesterAuthorizers` was added,
   allowing for
   [cross-chain request authorization](../concepts/authorizers.md#cross-chain-crosschainrequesterauthorizers).
   Even if not used, the field needs to be in the config file and set to an
   empty array.

```diff
{
   "authorizers": {
-     "requesterEndpointAuthorizers": []
+     "requesterEndpointAuthorizers": [],
+     "crossChainRequesterAuthorizers": []
   },
}
```

4. Fields `nodeSettings.httpGateway.apiKey` and
   `nodeSettings.httpSignedDataGateway.apiKey` were removed from the gateways
   configurations.
   [Gateway URLs](../grp-providers/guides/build-an-airnode/http-gateways.md#gateway-urls)
   now contain a randomly generated UUID serving as an authentication mechanism.
   **This change is relevant only for those using the
   [HTTP Gateways feature](../grp-providers/guides/build-an-airnode/http-gateways.md).**

```diff
{
   "httpGateway": {
      "enabled": true,
-     "apiKey": "${HTTP_GATEWAY_API_KEY}",
      "maxConcurrency": 20,
      "corsOrigins": []
   },
   "httpSignedDataGateway": {
      "enabled": true,
-     "apiKey": "${HTTP_SIGNED_DATA_GATEWAY_API_KEY}",
      "maxConcurrency": 20,
      "corsOrigins": []
   },
}
```

5. Field `nodeSettings.heartbeat.id` was removed from the heartbeat
   configuration. The ID is no longer needed to recognize which Airnode is
   sending the heartbeat request as
   [the payload is signed by the Airnode](../grp-providers/guides/build-an-airnode/heartbeat.md#heartbeat-endpoint)
   and the Airnode's public key can be recovered from the signature. **This
   change is relevant only for those using the
   [Heartbeat feature](../grp-providers/guides/build-an-airnode/heartbeat.md).**

```diff
{
   "heartbeat": {
      "enabled": true,
      "apiKey": "${HEARTBEAT_API_KEY}",
-     "id": "${HEARTBEAT_ID}",
      "url": "${HEARTBEAT_URL}"
   },
}
```

6. The command `airnode-deployer remove-with-deployment-details` no longer
   exists and was replaced by a new command
   `airnode-deployer remove <deployment ID>`. In order to remove the Airnode
   deployment with this command, you need to provide a deployment ID. You can
   find deployment ID in the
   [`receipt.json`](./deployment-files/receipt-json.md) file for a given
   deployment or via
   [`airnode-deployer list`](./packages/deployer.md#listing-airnodes) command.
   You can still remove the Airnode deployment with the
   `airnode-deployer remove-with-receipt` command as before.

## New features

- _Skipping API calls to just run pre/post processing (TODO
  https://github.com/api3dao/api3-docs/issues/1118 still open)_
- There are two new reserved parameters available,
  [`_gasPrice`](../../../ois/v1.4/reserved-parameters.md#gasprice) and
  [`_minConfirmations`](../../../ois/v1.4/reserved-parameters.md#minconfirmations).
  You can read more about how and what are they used for in the
  [documentation](../../../ois/v1.4/reserved-parameters.md).
- We now support a new type of authorizers, cross-chain authorizers. Read more
  about when it makes sense to use it and how in the
  [documentation](../concepts/authorizers.md#cross-chain-crosschainrequesterauthorizers).
- Airnode's Deployer CLI went through multiple changes, improving the user
  experience. There are four additional commands,
  [`list`](./packages/deployer.md#listing-airnodes),
  [`info`](./packages/deployer.md#fetching-deployment-information),
  [`rollback`](./packages/deployer.md#reverting-to-a-previous-version) and
  [`fetch-files`](./packages/deployer.md#fetching-deployment-files) to help you
  interact with your deployments more easily. You can read all about the new
  features in the [documentation](../grp-providers/docker/deployer-image.md).
- In order to provide a better sense of Airnode behaviour and improve the
  visibility of request logs within cloud provider monitoring services, the log
  level specified by `nodeSettings.logLevel` within `config.json` has been
  changed from `INFO` to `DEBUG` for `airnode-examples` integrations. Similarly,
  integration deployment commands are now run with the `--debug` flag.
