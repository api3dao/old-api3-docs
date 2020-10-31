# Airnode protocol: Wallet designation

## Glossary

**Provider:** An entity that runs an Airnode to serve one or more APIs

**Requester:** An entity that can endorse a client

**Client:** A contract that makes requests to providers

**Endorsement:** A requester allowing a client's requests to be fulfilled by the wallets designated to the requester

## Wallet designation

Fulfilling a request requires the provider to make a transaction, which costs gas.
This requires the provider to make sure that their node wallet is always funded, which is not feasible for first-party oracles (see the [whitepaper](/README.md#whitepaper)).
As a solution, the Airnode protocol allows the requester to cover the fulfillment gas costs through the wallet designation scheme.

Each provider has a wallet designated for each requester.
When a requester makes a request to a provider, the provider fulfills this request using the wallet it has designated for the requester.
The requester can simply send ETH to this designated wallet whenever they need to fund it for it to fulfill more requests.
Note that this is essentially a custodial wallet, i.e., the provider is authorized to use the deposited funds as they want.
Therefore, the requester should only deposit an amount that they can trust the provider with.

If the requester decides that they will not use a designated wallet any longer, they can make a request to withdraw funds from it.
The provider's Airnode listens for withdrawal requests and fulfills them automatically.
Therefore, the requester should be able to receive their funds from their designated wallet in a few minutes notice.
The designated wallet does not get deleted, and can be used in the future simply by funding it again.

Note that there is no mechanism that prevents the provider from funding their designated wallets themselves.
Therefore, the Airnode protocol also supports the legacy scheme where the provider covers the gas costs, and even a hybrid scheme where the provider covers the gas costs coming from some requesters, and requires others to cover the gas costs of their requests.

## Wallet derivation

A provider has a single private key that they use across all chains.
The provider announces the master public key associated to this private key under `xpub`.
Wallets that are designated to requesters are derived from this master public key, and this can be verified by third parties in a trustless way.

Wallet derivation is done through an [HD wallet](https://github.com/ethereumbook/ethereumbook/blob/develop/05wallets.asciidoc#hd_wallets).
The `m/0/*` path is reserved for the functionality described here and any additional functionality (e.g., a pub-sub protocol) will be implemented through `m/1/*`, `m/2/*`, etc. (i.e., we do not conform to EIP-601).

Each requester is identified with a unique index, `requesterInd`.
A provider can derive the wallet they have designated for a requester using the path:
```
m / 0 / requesterInd
```
Since the provider has announced their `xpub`, the requester (or any other third party) can also derive this wallet's address, as the path is non-hardened.

## Endorsement

While making a request, the client sends the address of the wallet designated to a requester as an argument for the provider Airnode to use to fulfill the request.
However, the use of their designated wallet requires the requester's consent.
The requester announcing that a client can use their designated wallets beforehand is called an endorsement.
If a client makes a request with a wallet designated to a requester that has not endorsed the client, the provider Airnode will ignore the request.
Otherwise, the request will be fulfilled with the requester's designated wallet.

[Home](/README.md#contents)
