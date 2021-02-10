---
title: Authorizer
---

# {{$frontmatter.title}}

An authorizer is a contract with the following interface:

```text
interface IAuthorizer {
    function checkIfAuthorized(
        bytes32 requestId,
        bytes32 providerId,
        bytes32 endpointId,
        uint256 requesterIndex,
        address designatedWallet,
        address clientAddress
        )
        external
        view
        returns (bool status);
}
```

When an Airnode receives a request, it will use authorizers to verify if it should be responded to. Therefore, an authorizer contract can be used to implement an arbitrary authorization policy depending on the arguments above \(`requestId`, `providerId`, etc.\). Note that the authorizer does not have to use all of the arguments, and can even decide on external criteria such as `blockNumber` \(e.g., "do not respond to anyone after block number N"\).

Providers can assign a list of authorizer contract addresses to their endpoints. These authorizers can be general purpose ones, but also custom-implemented by the provider to fit a specific need.

## Why is the authorizer scheme needed?

Providers have to be able to fulfill requests selectively. This is required for two main reasons:

1. The provider only fulfills requests made by requesters who have made payment, which allows them to monetize their services.
2. The services of the provider are sensitive and can only be accessed by certain requesters, e.g., who have gone through KYC.

A protocol that does not have the authorizer scheme or equivalent functionality cannot be considered as permissionless, and will not be able to achieve wide-spread adoption.

## How are authorizers implemented?

There are two main points to consider about how authorization policies are implemented:

1. If the policies are kept off-chain, the requester cannot see them or check if they satisfy them. Furthermore, the provider updating the policies \(e.g., increasing the service fees\) requires off-chain coordination with the requester.

2. Embedding the policies in the request–response loop results in a gas cost overhead.

Based on these considerations, Airnode uses a hybrid method. A provider announces their policy for a specific endpoint on-chain by setting a list of authorizers. Whenever the provider's Airnode receives a request, it checks if it should fulfill this request by making a static call that queries this on-chain policy. Similarly, the requester can use this on-chain policy by making a static call to check if they are authorized. This scheme both allows the provider to set transparent and flexible policies, and this to be done with no gas overhead.

## Authorizer list

An authorizer typically checks for a single condition \("has the requester made their monthly payment", "is this client address whitelisted", etc.\). Authorizers can be combined to enforce more complex policies.

Say we have authorizer contracts X, Y, Z, T, and our authorizer list is

```text
[X, Y, 0, Z, T]
```

This means that the following must be satisfied

```text
(X AND Y) OR (Z AND T)
```

for the request to be considered authorized. In other words, consequent authorizer contracts need to verify authorization simultaneously, while `0` represents the start of an independent authorization policy.

From a logical standpoint, consequent authorizers get `AND`ed while `0` acts as an `OR` gate, providing great flexibility in forming a policy out of simple building blocks. We could also define a `NOT` gate here to achieve a full set of universal logic gates, but this not very useful in this context because authorizers tend to check for positive conditions \("have paid", "is whitelisted", etc.\) and we generally would not need policies that require these to be false. Note that authorizer lists with multiple elements should not start or end with `0`, and `0`s should not be used consecutively, e.g., `[X, Y, 0, 0, Z, T]`.

It should also be noted that one can implement a single proxy authorizer that does all the required checks.

## Default behavior: Deny all access

An authorizer list of `[]` means "deny everyone", `[0]` means "let everyone through". The authorizers of an endpoint will be `[]` by default, and will deny access to everyone as a safety measure. Therefore, a provider cannot serve an endpoint without updating its authorizers first.

## Authorizer examples

Authorizers allow providers to implement a wide variety of policies. Here are some examples:

* Respond to requests from requesters that have paid their monthly subscription fee in DAI
* Respond to individual requests for which a per-call fee has been paid in API3 tokens
* Respond to requests made by clients that were whitelisted by the API3 DAO
* Respond to requests made by requesters who have been whitelisted by the API provider backend \(for example, based on Paypal payments\)
* ...
