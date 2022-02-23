---
title: HTTP Signed Relayed Gateway (optional)
---

<TitleSpan>Build an Airnode</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

::: warning TODO:

This is a difficult concept so it should be documented in a separate section.

:::

The signed relayed triggers can be used to make an HTTP request to Airnode,
which will call the API endpoint specified in the triggers section. After the
API call is made, Airnode will not submit the response on chain - instead, you
need to provide a "relayer" which can be any address and this relayer can use
the API response and submit it onchain. The response of the HTTP request is the
API response data and a signature which can be verified on chain. This signature
guarantees the integrity and authenticity of the data. You need to pass two
required properties when making an HTTP request to get the signed relayed data:

- `_id` - The id of the request. (This should be the `requestId` in case of RRP
  or `subscriptionId` in case of PSP).
- `_relayer` - The address of the account that will submit the response
  transaction on chain.
