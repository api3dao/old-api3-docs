---
title: Adminnable
---

<TitleSpan>Concepts and Definitions</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Airnode protocol package includes a set of contracts that implement ranked admin
functionality for multiple independent entities. These contracts can be easily
extended to build various kinds of admin logic.

There is also a contract that implements data structures, modifiers and utility
functions for contracts that require whitelisting functionality. This contract
must be inherited and extended based on the particular requirements and needs of
the child contract.

These contracts are currently being used in the [`authorizer`](authorization.md)
contracts in order to be able to set different levels of admins that will be
authorized to make requests or make whitelisting configuration changes to
adminned addresses and requesters (i.e. setting an expiration timestamp to
whitelist a requester to access an Airnode-endpoint pair).

## Adminnable

This contract implements multiple levels ranked of admins and defines a
_metaAdmin_ which is initialized in the contract constructor. This _metaAdmin_
address is sort of an "owner" of the contract and will always have enough
privileges to invoke functions that use the `onlyWithRank` modifier.

So the main purpose of this contract is that any other contract that needs to
have a mapping between addresses and ranks but also needs an admin with a higher
rank than all other admins then this other contract should inherit `Adminnable`
and will get all this functionality.

### setRank

The `setRank()` function can be called by an admin of higher rank to set the
rank of an admin of lower rank.

This function emits a `SetRank` event with the following signature:

```
event SetRank(
    address indexed callerAdmin,
    address indexed targetAdmin,
    uint256 newRank
);
```

### decreaseSelfRank

The `decreaseSelfRank()` function can be called by an admin to decrease its
rank.

This function emits a `DecreasedSelfRank` event with the following signature:

```
event DecreasedSelfRank(address indexed admin, uint256 newRank);
```

### transferMetaAdminStatus

The `transferMetaAdminStatus()` function can be called by the _metaAdmin_ to
transfer its status to another address.

This function emits a `TransferredMetaAdminStatus` event with the following
signature:

```
event TransferredMetaAdminStatus(address indexed metaAdmin);
```

## SelfAdminnable

This contract implements multiple levels of ranked admins independently for
addresses, where the address itself is the highest ranking admin, respectively.
These addresses will always be able invoke functions that use the `onlyWithRank`
modifier.

The main difference between this contract and the `Adminnable` contract is that
this one supports one more level in the mapping meaning that a single address is
mapped to many address/rank pairs. So this mapping can be used to set multiple
addresses and ranks to a multiple services or entities.
[AirnodeRequesterRrpAuthorizer](authorization.md#airnoderequesterrrpauthorizer)
contract inherits this contract because it needs to have admins per Airnode. The
mapping in this case will contain multiple Airnode addresses that each have its
own mapping of admin address and rank.

Another important difference is that this contract does not have a metaAdmin
address that can be set. Although the concept of addresses with higher rank than
the rest of the admins still exist. These addresses with highest ranks are the
adminned entity or service addresses. In
[AirnodeRequesterRrpAuthorizer](authorization.md#airnoderequesterrrpauthorizer)
the Airnode addresses will act as this sort of metaAdmins.

### setRank

The `setRank()` function can be called by an admin of higher rank to set the
rank of an admin of lower rank for the adminned address.

This function emits a `SetRank` event with the following signature:

```
event SetRank(
    address indexed adminned,
    address indexed callerAdmin,
    address indexed targetAdmin,
    uint256 newRank
);
```

### decreaseSelfRank

The `decreaseSelfRank()` function can be called by an admin to decrease its rank
for the adminned address.

This function emits a `DecreasedSelfRank` event with the following signature:

```
event DecreasedSelfRank(
    address indexed adminned,
    address indexed admin,
    uint256 newRank
);
```

## Whitelister

This contract implements permanent or time-limited whitelisting of addresses for
multiple independent services.

Each service address can have multiple addresses whitelisted and each address
can be whitelisted until an expiration date or indefinitely by setting
`whitelistedPastExpiration` to true. The service is considered whitelisted even
if only one of these apply.

This contract is meant to be inherit from and child contracts should implement
functions that read or modify the `serviceIdToUserToWhitelistStatus` internal
mapping values.

For a reference on how to use this contract in another contract then checkout
any [`authorizer`](authorization.md) contract or the abstract
[`RequesterRrpAuthorizer`](https://github.com/api3dao/airnode/blob/master/packages/protocol/contracts/rrp/authorizers/RequesterRrpAuthorizer.sol)
contract
