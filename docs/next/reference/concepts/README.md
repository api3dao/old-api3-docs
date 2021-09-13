---
title: Request-Response Protocol
---
<TitleSpan>Concepts and Definitions</TitleSpan>
# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

The first protocol implemented for Airnode is request–response.
An Airnode serving the request–response protocol listens for requests, makes the API call specified by the request, and fulfills the request as soon as possible.

## Contracts

The request–response protocol is implemented as a single permissionless contract that all Airnodes interact with, which is named `AirnodeRrp.sol`. This base contract has the following inheritance tree that compartmentalizes the aspects of the protocol.

  >  ![rrp-sol-diagram](../../assets/images/RRP-protocol-contracts.png)

### AirnodeRrp.sol

The [AirnodeRrp.sol](https://github.com/api3dao/airnode/blob/master/packages/protocol/contracts/AirnodeRrp.sol) contract sits between a requester and the Airnode. It inherits from four additional contracts as illustrated in the diagram above.

- Used by requesters to make requests.
- Used by Airnodes to fulfill requests.

The [Admin](../cli-commands.md) (`@api3/airnode-admin`) package is a CLI tool used to interact with `AirnodeRrp.sol` and perform administrative actions. See the [admin package](https://github.com/api3dao/airnode/tree/master/packages/admin) in GitHub.

To use AirnodeRrp.sol a requester must import AirnodeRrpClient.sol.

`import "@api3/airnode-protocol/contracts/AirnodeRrpClient.sol";`


### IAirnodeRrp.sol

The [IAirnodeRrp.sol](https://github.com/api3dao/airnode/blob/master/packages/protocol/contracts/rrp/interfaces/IAirnodeRrp.sol) contract <FixInline>Add summary, see the pre-alpha docs.</FixInline>

- <FixInline>add bullet highlights</FixInline>
- 

### AuthorizationUtils.sol

The [AuthorizationUtils.sol](https://github.com/api3dao/airnode/blob/master/packages/protocol/contracts/rrp/AuthorizationUtils.sol) contract <FixInline>Add summary, see the pre-alpha docs.</FixInline>

- <FixInline>add bullet highlights</FixInline>


### WithdrawalUtils.sol

The [WithdrawalUtils.sol](https://github.com/api3dao/airnode/blob/master/packages/protocol/contracts/rrp/WithdrawalUtils.sol) contract <FixInline>Add summary, see the pre-alpha docs.</FixInline>

- <FixInline>add bullet highlights</FixInline>


### TemplateUtils.sol

The [TemplateUtils.sol](https://github.com/api3dao/airnode/blob/master/packages/protocol/contracts/rrp/TemplateUtils.sol) contract <FixInline>Add summary, see the pre-alpha docs.</FixInline>

- <FixInline>add bullet highlights</FixInline>
- 
