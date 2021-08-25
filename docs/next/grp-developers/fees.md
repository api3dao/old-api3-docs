---
title: Fees
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

<Fix>This doc needs updating once the new repo README(s) are ready for the Airnode (beta) re-writes.
</Fix>

A requester will have three types of fees to consider.

1. Requester Record Fees: transaction gas costs to maintain a requester record and client contract endorsements.
2. Airnode Execution Fees: transaction gas costs incurred funding Airnode designated wallets and when executing  Airnodes.
3. API Provider Fees: subscriptions with API providers.

![fees-requester](../assets/images/fees-requester.png)

## Requester Record Fees

Fees are encountered when managing a requester's record, client contract endorsements and more. These are per call transaction gas costs and are relatively small. Funds will come from the wallet mnemonic that the requester supplies when calling certain [admin commands](../reference/cli-commands.md) as shown below. 

- [create-requester](../reference/cli-commands.md#create-requester)
- [set-requester-admin](../reference/cli-commands.md#set-requester-admin)
- [endorse-client](../reference/cli-commands.md#endorse-client)
- [unendorse-client](../reference/cli-commands.md#unendorse-client)
- [request-withdrawal](../reference/cli-commands.md#request-withdrawal)


## Airnode Fees

Fees are encountered, as transaction gas costs, when funding a requester's designated wallet for an Airnode and when executing the Airnode.

- [Funding](sponsorship.md#part-3-funding-airnodes) a designated wallet.
  A designated wallet is funded manually by a requester using their preferred wallet management tool such as MetaMask.

- [Executing](../grp-developers/call-an-airnode.md) an Airnode.
  Transaction gas fees are withdrawn from the designated wallet of the requester related to the Airnode being called. 

<SponsorWalletWarning/>

Learn more about [sponsor wallets](../reference/protocols/request-response/sponsor-wallet.md) in the reference section.

## API Provider Fees

Some API providers charge a subscription fee to access their data. This is a typical practice and usually requires the requester to create an account on a website and then subscribe to a level of service offered. These types of services are usually billed monthly and can be based on an annual rate to save costs. The subscription (even if free) will most likely involve the use of a security scheme such as an api-key that must be used to access the data. See [Calling an Airnode](call-an-airnode.md) to learn more on how to pass the security credentials to an Airnode.

