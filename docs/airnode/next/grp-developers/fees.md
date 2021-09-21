---
title: Fees
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

<Fix>This doc needs updating once the new repo README(s) are ready for the Airnode (beta) re-writes.
</Fix>

There are some one-time setup/maintenance costs and the ongoing costs to call an Airnode.

<!--
1. Sponsorships: gas costs to sponsor a requester.
2. Airnodes: gas costs incurred for the execution of Airnode in response to a request.
3. API Provider: subscriptions with API providers.
-->

<!--![fees-requester](../assets/images/fees-requester.png)-->

## Requesters

Fees are encountered when sponsoring a requester. These are per call transaction gas costs and are relatively small. Funds will come from the wallet mnemonic that the sponsor supplies when calling certain [admin commands](../reference/cli-commands.md) as shown below. 

- [sponsor-requester](../reference/cli-commands.md#sponsor-requester)
- [unsponsor-requester](../reference/cli-commands.md#unsponsor-requester)


## Airnodes

Fees are encountered, as transaction gas costs, when funding a requester's sponsor wallet for an Airnode and when executing the Airnode in response to a request.

- Funding a sponsor wallet:
  A sponsor wallet is funded manually by a sponsor using their preferred wallet management tool such as MetaMask.

- [request-withdrawal](../reference/cli-commands.md#request-withdrawal) from a sponsor wallet:
  Transaction gas fees ar incurred to remove a sponsor's funds from a sponsor wallet.

- [Executing](../grp-developers/call-an-airnode.md) an Airnode:
  Transaction gas fees are withdrawn from the sponsor wallet related to the Airnode being called by the sponsored requester. 

<SponsorWalletWarning/>

Learn more about [sponsor wallets](../reference/concepts/sponsor-wallet.md) in the reference section.

## API Provider Fees

Some API providers charge a subscription fee to access their data. This is a typical practice and usually requires the requester to create an account on a website and then subscribe to a level of service offered. These types of services are usually billed monthly and can be based on an annual rate to save costs. The subscription (even if free) will most likely involve the use of a security scheme such as an api-key that must be used to access the data. See [Calling an Airnode](call-an-airnode.md) to learn more on how to pass the security credentials to an Airnode.

