---
title: Template
---

# {{$frontmatter.title}}

[[toc]]

An oracle request has many parameters. It is very common for [clients](./client.md) \(e.g., a data feed\) to make repeated requests with the exact same parameters. In such instances, it is wasteful to pass all of these parameters repeatedly.

Templates are on-chain records of request parameters that the clients can refer to while making requests. Additional advantages are reducing boilerplate code required to make a request, improving UX and allowing large parameter payloads \(e.g., off-chain computation specifications\) at no additional gas cost.

## `templateId`

Each template is identified by a `templateId`, which is the hash of its contents:

```text
templateId = keccak256(abi.encode(
    providerId,
    endpointId,
    requesterIndex,
    designatedWallet,
    fulfillAddress,
    fulfillFunctionId,
    parameters
    ));
```

This allows Airnode to fetch templates with a static call, and verify that the received parameters are not tampered with.
