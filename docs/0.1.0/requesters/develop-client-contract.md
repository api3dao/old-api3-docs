---
title: Developing a Client Contract
---

# {{ $frontmatter.title }}

## Overview

A client is a contract that makes requests to providers using the Airnode.sol contract that implements the protocol. A client is endorsed by a requester, which means that it can specify its request to be fulfilled by the respective requester's designated wallet.

The Airnode protocol is designed to be flexible, and is meant to serve a variety of use cases. See the Airnode client examples for some potential design patterns. The first step a requester needs to take is to develop and deploy such a client contract.

## Endorsing your contract

Assuming you have already created a requester, you should endorse the client contract so that it can make requests. You can use @api3/airnode-admin to endorse client contracts. Endorsing a client contract means it can make requests that will be fulfilled by the designated wallet associated with your requester record. You can use @api3/airnode-admin to derive your designated wallet and fund it so that the provider you have made requests to can fulfill your requests.