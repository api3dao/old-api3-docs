---
title: Creating a Requester
---



# {{ $frontmatter.title }}

Each requester needs to create a requester record, and get assigned a requester index. This is fairly early, using @api3/airnode-admin. A requester index grants you a separate designated wallet for each provider, which you can use @api3/airnode-admin to derive for a specific provider. You will need to fund the address of thet designated wallet that you have derived if you want the provider to respond to the requests that your client contracts will make.

## $page Info

::: tip $page Info
{{$page}}
:::