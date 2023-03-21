---
title: Migration Guide
docSetName: Airnode v0.11
folder: Reference
basePath: /airnode/v0.11
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

The following guide assumes a valid v0.10.x `config.json` file. All changes
listed below will need to be implemented in order to migrate to Airnode v0.11.x.
This document is written in a way that will preserve existing behavior with
earlier Airnode versions.

The document also mentions changes to user facing services related to Airnode,
such as airnode-deployer, airnode-admin, etc., and new features.

## Summary

1. `ois[n].oisFormat` updated to "2.0.0".

2. `nodeSettings.nodeVersion` updated to "0.11.0".

3. Pre/post-processing is dropping version of the processing environment.

4. Section `nodeSettings.oevGateway` was added.

## Details

1. `ois[n].oisFormat`

Updated to "2.0.0"

```diff
{
- "oisFormat": "1.4.0"
+ "oisFormat": "2.0.0"
}
```

2. `nodeSettings.nodeVersion`

Updated to "0.11.0"

```diff
{
- "nodeVersion": "0.10.0"
+ "nodeVersion": "0.11.0"
}
```

3. `ois[n].endpoints[n].preProcessingSpecifications` and
   `ois[n].endpoints[n].postProcessingSpecifications`

Removes `14` from the `Node 14` environment value to represent that the Node
version of the pre- and post-processing environments is dictated by the Node.js
version of Airnode. As of v0.11, the Node.js version of Airnode was upgraded
from 14 to 18.

```diff
{
  "preProcessingSpecifications": [
    {
-     "environment": "Node 14",
+     "environment": "Node",
      "timeoutMs": 5000,
      "value": ""
    }
  ]
}
```

```diff
{
  "postProcessingSpecifications": [
    {
-     "environment": "Node 14",
+     "environment": "Node",
      "timeoutMs": 5000,
      "value": ""
    }
  ]
}
```

4. With the new OEV gateway feature there's a new section in the configuration
   file for it. The new section `nodeSettings.oevGateway` needs to be added in
   order for the configuration file to be valid.

```diff
{
  "httpSignedDataGateway": {
    "enabled": false
  },
+ "oevGateway": {
+   "enabled": false
+ },
  "logFormat": "plain",
  "logLevel": "INFO",
}
```

Read the
[OEV gateway documentation](../grp-providers/guides/build-an-airnode/oev-gateway.md)
to learn more about this feature.

## New features

- The Node.js version of Airnode was upgraded from 14 to 18.
- The `coingecko-signed-data` and `coingecko-testable` HTTP gateway
  `airnode-examples` integrations have been combined into a single
  `coingecko-http-gateways` integration.
- There's a new gateway available called the OEV gateway. You can read more
  about this feature in its
  [documentation](../grp-providers/guides/build-an-airnode/oev-gateway.md).
