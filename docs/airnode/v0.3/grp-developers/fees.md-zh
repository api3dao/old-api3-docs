---
title: Fees
---

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

There are some one-time setup/maintenance costs and the ongoing costs to call an Airnode. The Airnode protocol is designed in a way that the requester assumes all gas costs, including the request fulfillment (response) transactions.

## Sponsors

Fees are encountered when a sponsor engages in setup activity such as sponsoring a requester. These are per call transaction gas costs and are relatively small. Funds will come from the wallet mnemonic that the sponsor supplies when calling certain [admin commands](../reference/packages/admin-cli.md) as shown below.

- [sponsor-requester](../reference/packages/admin-cli.md#sponsor-requester)
- [unsponsor-requester](../reference/packages/admin-cli.md#unsponsor-requester)
- [create-template](../reference/packages/admin-cli.md#create-template)
- [request-withdrawal](../reference/packages/admin-cli.md#request-withdrawal)

## Airnodes

Fees are encountered, as transaction gas costs, when funding a requester's sponsor wallet for an Airnode and when executing the Airnode in response to a request.

- Funding a sponsor wallet associated with an Airnode: A sponsor wallet is funded manually by a sponsor using their preferred wallet management tool such as MetaMask.

- [Calling](../grp-developers/call-an-airnode.md) an Airnode: Transaction gas fees are withdrawn from the sponsor wallet related to the Airnode being called by a sponsored requester.

<airnode-SponsorWalletWarning/>

Learn more about [sponsor wallets](../concepts/sponsor.md) in the reference section.

## API Provider Fees

Some API providers charge a subscription fee to access their data. This is a typical practice and usually requires the requester to create an account on a website and then subscribe to a level of service offered. These types of services are usually billed monthly and can be based on an annual rate to save costs. The subscription (even if free) will most likely involve the use of a security scheme such as an api-key that must be used to access the data. See [Calling an Airnode](call-an-airnode.md) to learn more on how to pass the security credentials to an Airnode.
