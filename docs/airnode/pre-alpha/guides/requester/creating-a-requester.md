---
title: Creating a requester
docSetName: Airnode pre-alpha
folder: Guides > Requester
basePath: /airnode/pre-alpha
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}
<VersionWarning/>
<TOC class="table-of-contents" :include-level="[2,3]" />

Each requester needs to create a requester record, and get assigned a requester index.
This is fairly easy, using [@api3/airnode-admin](https://github.com/api3dao/airnode/tree/pre-alpha/packages/admin#create-requester).
A requester index grants you a separate [designated wallet](../../protocols/request-response/designated-wallet.md) for each provider, which you can use [@api3/airnode-admin](https://github.com/api3dao/airnode/tree/pre-alpha/packages/admin#derive-designated-wallet) to derive for a specific provider.
You will need to fund the address of the designated wallet that you have derived if you want the provider to respond to the requests that your client contracts will make.

<airnode-DesignatedWalletWarning/>
