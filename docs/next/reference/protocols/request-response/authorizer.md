---
title: Authorizer
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

An authorizer is a contract with the following interface:

```solidity
interface IRrpAuthorizer {
    function AUTHORIZER_TYPE() external view returns (uint256);

    function isAuthorized(
        bytes32 requestId,
        address airnode,
        bytes32 endpointId,
        address sponsor,
        address requester
    ) external view returns (bool);
}
```

When an Airnode receives a request, it will use authorizers to verify if it should be responded to. Therefore, an authorizer contract can be used to implement an arbitrary authorization policy depending on the arguments above (`requestId`, `airnodeId`, etc.). Note that the authorizer does not have to use all of the arguments, and can even decide on external criteria such as `blockNumber` (e.g., "do not respond to anyone after block number N").

Airnodes can assign a list of authorizer contract addresses to their endpoints. These authorizers can be general purpose ones, but also custom-implemented by the Airnode to fit a specific need.

## Why is the authorizer scheme needed?

Airnodes have to be able to fulfill requests selectively. This is required for two main reasons:

1. The Airnode only fulfills requests made by requesters who have made payment to the Airnode owner, which allows them to monetize their services.
1. The services of the Airnode are sensitive and can only be accessed by certain requesters, e.g., who have gone through KYC.

A protocol that does not have the authorizer scheme or equivalent functionality cannot be considered as permissionless, and will not be able to achieve wide-spread adoption.

## How are authorizers implemented?

There are two main points to consider about how authorization policies are implemented:

1. If the policies are kept off-chain, the requester cannot see them or check if they satisfy them. Furthermore, the Airnode owner updating the policies (e.g., increasing the service fees) requires off-chain coordination with the requester.
2. Embedding the policies in the request–response loop results in a gas cost overhead.

Based on these considerations, Airnode uses a hybrid method. An Airnode announces its authorization policy through off-chain channels as the addresses of a list of authorizer contracts. Whenever the Airnode receives a request, it checks if it should fulfill this request by making a static call that queries this on-chain policy. Similarly, the requester can use this on-chain policy by making a static call to check if they are authorized. This scheme both allows the Airnode to set transparent and flexible policies, and this to be done with no gas overhead.

## Authorizer list

An authorizer typically checks for a single condition ("has the requester made their monthly payment", "is this client address whitelisted", etc.). Authorizers can be combined to enforce more complex policies. If any of the authorizers in the list gives access, the request will considered to be authorized. From a logical standpoint, the authorization outcomes get `OR`ed.

## Default behavior: Let everyone through

An authorizer list of `[]` means "let everyone through". If the Airnode wants to deny all access on a chain, it should not operate on it (i.e., not have it in the `chains` list of its `config.json`). If the Airnode wants to give access selective acess, it should use an authorizer that implements that logic.

## API-side authorization

Sometimes the Airnode operator does not want to use on-chain authorizers for reasons such as:
- the parameter that authorization depends on (e.g., if the requester has paid) should not be made public
- the Airnode operator does not want to interact with the chain to alter authorization statuses (e.g., does not want to make a transaction to whitelist a new user, which will cost them gas fees)

In this case, the Airnode operator can use the `_relay_metadata` parameter for the Airnode to pass-through request metadata, which the API backend can process and respond (or not) accordingly.

## Authorizer examples

Authorizers allow Airnodes to implement a wide variety of policies.
Here are some examples:

- Respond to requests from requesters that have paid their monthly subscription fee in DAI
- Respond to individual requests for which a per-call fee has been paid in API3 tokens
- Respond to requests made by clients that were whitelisted by the API3 DAO
- Respond to requests made by requesters who have been whitelisted by the Airnode owner's backend (for example, based on Paypal payments)
