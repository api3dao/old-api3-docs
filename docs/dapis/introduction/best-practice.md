---
title: Best Practices
folder: Introduction
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

dAPIs are aggregated from multiple beacons using a decentralized pool of
independent Airnodes. All Airnodes are API provider owned and operated. API
providers supply data to the `DAPIServer` contract which lives on many chains.

dAPP developers should consider these basic practices while using dAPIs.

- Keep it Simple
- Monitoring
- Security

## Keep it Simple

dAPIs are the quickest way to connect smart contracts to the real-world data
such as asset prices. Retrieve the latest pricing data of an asset in a single
call and use that data either on-chain within a smart contract or off-chain in
another application of choosing.

If you already have a project started and would like to integrate dAPIs, add the
`DapiServer.sol` contract to your existing smart contract. Then call a dAPI
using `DapiServer.sol` and a human readable dAPI name (e.g., AAVE/BTC).

```solidity
import "@api3/airnode-protocol-v1/contracts/dapis/interfaces/IDapiServer.sol";
...
 (value, timestamp) =
            IDapiServer(_dapiServerContractAddress).readDataFeedWithDapiName(_dapiName);
    }
```

See a sample smart contract using the function
[readDataFeedWithDapiName()](../developers/read-data-feed-with-dapi-name.md).

::: tip Summary for "Keep it Simple"

Use the `DapiServer.sol` contract function
[readDataFeedWithDapiName(\_dapiName)](../developers/read-data-feed-with-dapi-name.md)
as the best way to access dAPI values as aggregated beacon values. There are
other [functions](../developers/#dapiserver-functions) of `DapiServer.sol`
available for other use cases.

:::

## Monitoring

Code sample here written in nodejs.

::: tip Summary for "Monitoring"

Build and deploy a monitoring app of your own that checks dAPIs that are
important to you.

:::

## Security

dAPP developers do not need to trust API3 as all Airnodes are owned and operated
by an API provider. Each API provider has deployed their Airnode using a
`secrets.env` file that API3 does not possess. Therefore the Airnode operates
under the complete autonomy of the API provider who's signed data is used to
update
[DapiServer.sol](https://github.com/api3dao/airnode-protocol-v1/blob/v0/contracts/dapis/DapiServer.sol)
contract. API3 cannot alter values from API providers.

::: tip Summary for "Security"

All [API3 source code](https://github.com/orgs/api3dao/repositories?type=all) is
open sourced and can be verified by anyone. Consider reading through API3 source
code to verify claims of security.

:::
