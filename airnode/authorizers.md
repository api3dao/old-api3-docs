# Airnode protocol: Authorizers

Providers have to be able to fulfill requests selectively.
This is required for two main reasons:

1. The provider only fulfills requests made by requesters who have made payment, which allows them to monetize their services.
2. The services that the provider provides are sensitive and can only be accessed by certain requesters, e.g., who have gone through KYC.

Regardless of the reason, the provider must be able to set policies that manage access to their services.
There are two main points to consider about how these policies are implemented:

1. If the policies are kept off-chain, the requester cannot see them or check if they satisfy them.
Furthermore, the provider updating the policies (e.g., increasing the service prices) requires off-chain coordination.
2. Embedding the policies in the request-response loop results in a gas cost overhead.

Based on these considerations, we designed a hybrid method.
A provider announces their policy for a specific endpoint on-chain.
Whenever the provider's Airnode receives a request, it checks if it should fulfill this request by making a static call to this on-chain policy.
Similarly, the requester can call this on-chain policy by making a static call to check if they are authorized.
This scheme both allows the provider to set transparent and flexible policies, and this to be done with no gas overhead.

Policies are implemented as lists of *Authorizers*.
An authorizer is a contract with the following abstract:

```
abstract contract Authorizer {
    uint public authorizerType;

    function checkIfAuthorized(
        bytes32 endpointId,
        address clientAddress
        )
        virtual
        external
        view
        returns (bool status);
}
```

One can simply query if a client is authorized to make a request to a specific endpoint of a provider through a static call.

An authorizer typically checks for a single condition (e.g., has the requester that has endorsed this client made their monthly payment, is this client address whitelisted, etc.).
Authorizers can be combined to enforce more complex policies.

Say we have authorizer contracts X, Y, Z, T, and our authorizer array is `[X, Y, 0, Z, T]`.
This means that the requester should satisfy `(X AND Y) OR (Z AND T)` to be considered authorized.
In other words, consequent authorizer contracts need to verify authorization simultaneously, while `0` represents the start of an independent authorization policy.

From a logical standpoint, consequent authorizers get `AND`ed while `0` acts as an `OR` gate, providing great flexibility in forming a policy out of simple building blocks.
We could also define a `NOT` gate here to achieve a full set of universal logic gates, but that does not make much sense in this context because authorizers tend to check for positive conditions (have paid, is whitelisted, etc.) and we would not need policies that require these to be false.
Note that authorizer lists with multiple elements should not start or end with `0`, and `0`s should not be used consecutively, e.g., `[X, Y, 0, 0, Z, T]`.

`[]` returns false (deny everyone), `[0]` returns true (accept everyone).
Note that this means endpoints deny access to everyone by default as a security measure.

[Home](/README#contents)
