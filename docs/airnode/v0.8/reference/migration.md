---
title: Migration Guide
docSetName: Airnode v0.8
folder: Reference
basePath: /airnode/v0.8
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<!--TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" /-->

The following guide assumes a valid v0.7.x `config.json` file. All changes
listed below will need to be implemented in order to migrate to Airnode v0.8.
This document is written in a way that will preserve existing behaviour with
earlier Airnode versions, but some of the new fields have additional options
that can be found in the v0.8
[Airnode documentation](https://old-docs.api3.org/airnode/v0.8/)

## Summary

1. `chains[n].authorizers` is now an object rather than an array of strings

2. `chains[n].authorizations` added as a new object allowing the Airnode
   operator to authorize specific endpoints for specific requester contracts
   without having to make onchain transactions. i.e. providing an offchain way
   to authorize specific requesters.

3. `chains[n].options` has been reworked to allow for one or more strategies for
   fetching the current gas price when submitting fulfillment transactions

4. `rrp[n].cacheResponses` added as a new required field for specifying if the
   response should be cached for requests that fail to get confirmed before the
   next RRP cycle.

5. `nodeSettings.httpGateway.corsOrigins` added as a new required field for
   defining optional
   [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
   strings. Empty array indicates no allowed CORS origins.

6. `nodeSettings.httpSignedDataGateway.corsOrigins` same as
   `nodeSettings.httpGateway.corsOrigins`

7. `ois[n].oisFormat` updated to "1.1.2"

8. `nodeSettings.nodeVersion` updated to "0.8.1"

## Details

1. `chains[n].authorizers`

In earlier Airnode versions, `chains[n].authorizers` was an array of addresses
that were used to specify which onchain contract addresses to query when
attempting to authorize a request. This has been changed to be an object where
the key is the authorizer type and the value is the list of addresses. The only
supported key is currently `requesterEndpointAuthorizers`.

```diff
{
-  "authorizers": ["0x1234..."],
+  "authorizers": {
+    "requesterEndpointAuthorizers": ["0x1234..."]
+  }
}
```

2. `chains[n].authorizations`

This is a new object providing the Airnode operator with an offchain option for
allowing (whitelisting) specific requesters to access specific endpoints. The
key is the authorization type and the value is another object. The only
supported key is currently `requesterEndpointAuthorizations`.

The keys for `requesterEndpointAuthorizations` object are endpoint IDs and the
values are the list of requesters.

```diff
{
+  "authorizations": {
+    "requesterEndpointAuthorizations": {}
+  }
}
```

3. `chains[n].options`

In previous Airnode versions, it was not possible to specify the strategy to use
when determining the gas price to use for fulfillment transactions. The
recommended price from the RPC provider URL was used along with some modifiers.

With Airnode v0.8, the approach has been reworked to allow for multiple
strategies to be used. These oracles (strategies) are used starting with the
first oracle in the array. If the oracle fails to report a gas price, then the
next oracle is used. As such, there are two important rules to note:

1. The ordering of the gas price oracles matters
2. All oracles are optional, but a constant gas price oracle must be defined
   (typically last) as a fallback.

See the
[Gas Price Strategies](https://old-docs.api3.org/airnode/v0.8/concepts/gas-prices.html)
page for more information

```diff
{
  "options": {
    "fulfillmentGasLimit": 500000,
-   "txType": "eip1559",
-   "baseFeeMultiplier": 2,
-   "priorityFee": {
-     "value": 3.12
-     "unit": "gwei",
-   }
+   "gasPriceOracle": [
+     {
+       "gasPriceStrategy": "providerRecommendedEip1559GasPrice",
+       "baseFeeMultiplier": 2,
+       "priorityFee": {
+         "value": 3.12,
+         "unit": "gwei"
+       }
+     },
+     {
+       "gasPriceStrategy": "constantGasPrice",
+       "gasPrice": {
+         "value": 10,
+         "unit": "gwei"
+       }
+     }
+   ]
  }
}
```

4. `rrp[n].cacheResponses`

Airnode v0.8 provides a way for operators to specify whether or not an API
response should be cached. Caching can (optionally) be used if a request fails
to get confirmed before the next RRP cycle which runs every minute. This means
that if the request is picked up again in next cycle as unfulfilled, the cached
response will be used instead of making a new API call. This can be used to
ensure that a requester always receives the value they require at a certain
point in time, rather than whenever the last Airnode cycle ran that submitted
the confirmed fulfillment transaction. It will likely reduce the number of API
calls made to the specific API endpoint.

The amount of time a response is cached for depending on where the Airnode is
hosted (AWS, GCP, Docker etc.). Refer to the
[Airnode docs](https://old-docs.api3.org/airnode/v0.8/) for more details.

This field is required for all `rrp` objects, even if it is set to false

```diff
{
  "endpointId": "0x13dea...",
  "oisTitle": "My OIS title",
  "endpointName": "convertToUSD",
+ "cacheResponses": false
}
```

5. `nodeSettings.httpGateway.corsOrigins`

A new required array has been added that allows for defining
[CORS Origins](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). String
values can be entered that will allow certain origins access to the HTTP
gateway. This will allow requests initiated from browsers to access the HTTP
gateway.s

`["*"]` can be used to allow all origins. It's also worth nothing that this
array currently only supports simple string values and not regex patterns.

Refer to the
[Airnode docs](https://old-docs.api3.org/airnode/v0.8/reference/deployment-files/config-json.html#httpgateway-corsorigins)
for more details

```diff
{
  "httpGateway": {
    "enabled": true,
    "apiKey": "${HTTP_GATEWAY_API_KEY}",
    "maxConcurrency": 20,
+   "corsOrigins": []
  }
}
```

6. `nodeSettings.httpSignedDataGateway.corsOrigins`

Exactly the same as `nodeSettings.httpGateway.corsOrigins`, except for the HTTP
signed data gateway.

```diff
{
  "httpSignedDataGateway": {
    "enabled": true,
    "apiKey": "${HTTP_SIGNED_DATA_GATEWAY_API_KEY}",
    "maxConcurrency": 20,
+   "corsOrigins": []
  }
}
```

1. `ois[n].oisFormat`

Updated to "1.1.2"

```diff
{
-  "oisFormat": "1.0.0"
+  "oisFormat": "1.1.2"
}
```

8. `nodeSettings.nodeVersion`

Updated to "0.8.1"

```diff
{
-  "nodeVersion": "0.7.0"
+  "nodeVersion": "0.8.1"
}
```
