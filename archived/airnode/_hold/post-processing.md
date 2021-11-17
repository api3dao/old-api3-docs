---
title: Post-processing
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

This page describes the post-processing feature of OIS endpoints, which specifies how an API response should be processed before it is consumed by the on-chain requester.

## Motivation

While creating an OIS, API operations are typically mapped to Airnode endpoints one-to-one.
This means that the Airnode will have the same on-chain interface as the Web API it integrates to.
This is convenient because the respective integration is simple and this allows the Web API documentation to be reused for the oracle endpoints.

Naive integration of endpoints may not be ideal in some cases.
For example:
1. The API accepts a name as the query parameter and returns the age of the respective person.
The requester contract only needs to know if the person is older than 18.
The requester contract can get the age and compare it with 18 on-chain, yet this would make the exact age of the person public.
A more appropriate integration would produce an endpoint that would only return if a person is older than 18 years old.
2. An open banking API accepts a client ID as the query parameter, and returns the bank account balance of the respective client.
The requester contract only needs to know if the owner of the associated Ethereum account has at least $X in their back account.
The requester contract can get the balance and compare it with X on-chain, yet this would make the exact balance of the owner of the Ethereum account public.
A more appropriate integration would produce an endpoint that would only return if a client has more than $X in their bank account, where X is defined by the requester.
3. One of the fields that the API returns is an-ISO formatted date.
The requester contract will use this value as a timestamp, and requires it to be formatted as Unix time.
Making this conversion on-chain is difficult and expensive, and thus a more appropriate integration would produce an endpoint that also exposed the same value in Unix time.
4. The API does not want to expose a field of its response to on-chain requesters due to legal reasons.
Ideally, the integration would make this field unavailable to the on-chain endpoint.
5. The API returns the prices and volumes of an asset across a number of exchanges.
The requester contract wants each price to be weighted by the respective volume using a custom formula.
The requester can have all the needed information encoded and delivered to the chain by the Airnode, and do this operation on-chain, which this would incur a high gas cost.
Instead, this calculation can be done by the Airnode off-chain, and the endpoint would only expose the product.

All of these user scenarios can be satisfied by a parameterizable post-processing step that operates on the API response before it is used to create the oracle response.

## Implementation architecture

*https://imgur.com/a/2R6Mgcl*

The *adapter* is the component of the Airnode that calls the integrated API and uses it to encode the oracle response, ready to be written back to the chain.
As post-processing is a step between the API call and the creation of the oracle response, it is done by the adapter, as seen in the diagram.

In the serverless configuration, the coordinator function spawns as many adapter functions as there are unique API calls to be made to sandbox them.
The post-processing is done by these individually spawned adapter functions, i.e., the Airnode does not spawn serverless functions specific to post-processing.
In the containerized configuration, the coordinator and the adapters will run in the same physical container, and so will the post-processing operation.

## Specifying the post-processing

The post-processing operation is specified as a snippet of JS code that will be run with the same Node.js runtime that the Airnode runs on.
While developing this snippet, the user has access to three objects pre-defined in the environment:
- `apiRequestParameters` is the object that holds the API request parameters
- `apiResponse` is the JSON object returned by the API
- `postProcessingParameters` is the object that holds the post-processing parameters

and the snippet should define an object called `postProcessedResponse`.
In other words, you can think of the snippet this way:

```js
function postProcess(apiRequestParameters, apiResponse, postProcessingParameters) {
  // your snippet goes here
  return postProcessedResponse;
}
```

`apiRequestParameters` houses the API request parameters.
These are already used to make the API request and are probably no longer useful to you, yet they are still made available during post-processing for convenience.
`apiResponse` is a useful object because in most cases this is what you want to process to build your post-processed response out of.
Finally, `postProcessingParameters` allows the requester to parameterize your post-processing, meaning that while it does not allow them to specify an arbitrary computation, it provides some flexibility for the use cases that require it.
Post-processing has a single output, `postProcessedResponse`, which is the JSON object that the adapter will process to create the encoded oracle response.
Note that the adapter will not have access to `apiResponse`.

### Untrusted code

The Airnode will be running the post-processing snippet.
Therefore, it is absolutely paramount for the Airnode operator to make sure that it does not do anything malicious, such as reading the cloud provider credentials from the environment variables and posting them to an external party.
For the same reason, the snippet should not `eval()` post-processing parameters similar to

```js
// DO NOT USE THIS POST-PROCESSING SNIPPET
{
  eval(postProcessingParameters.untrustedCodeByRequester)
}
```

### Node.js runtime

The Airnode operator is responsible with specifying the post-processing in a way that is compatible with the Node.js runtime their Airnode is using.
For example, if the Airnode operator is doing an upgrade that will change their Node.js version, they should also update their post-processing snippets accordingly if required.

### Minification

In general, you do not need to minify post-processing code because it will not be written to the chain or emitted as an event.
However, `postProcessingParameters` names have to be shorter than 32 characters because Airnode ABI uses `bytes32` types to encode request parameter names.

## Post-processing examples

Let us go over the examples given in the motivation section:

1. The requester makes the following request

```js
apiRequestParameters: { name: "Alice Robert" }
```

and gets the following response

```js
apiResponse: { age: "23" }
```

If we want the endpoint to return if the person is older than 18, we need the following snippet with no post-processing parameters

```js
postProcessedResponse = {
  olderThan18: apiResponse.age > 18
  };
```

2. The requester makes the following request

```js
apiRequestParameters: { clientId: "0d01825c-e9eb-43a7-83e1-156e10d42237" }
```

and gets the following response

```js
apiResponse: { balance: "123525" }
```

If we want the endpoint to return if the client's balance is larger than 10,000, we need the following snippet with the post-processing parameter `balanceThreshold`

```js
postProcessedResponse = {
  balanceGreaterThanThreshold: apiResponse.balance > postProcessingParameters.balanceThreshold
  };
```

3. The requester makes the following request

```js
apiRequestParameters: { packageId: "744b7975-fc20-4070-8ea5-acac85f44e46" }
```
and gets the following response

```js
apiResponse: { arrivalTime: "2021-09-06T12:43:27+00:00" }
```

If we want the endpoint to also return the arrival time in Unix time, we need the following snippet with no post-processing parameters

```js
postProcessedResponse = {
  ...apiResponse,
  arrivalTimeInUnixTime: (new Date(apiResponse.arrivalTime)).getTime() / 1000
  };
```

4. The requester makes the following request

```js
apiRequestParameters: { packageId: "744b7975-fc20-4070-8ea5-acac85f44e46" }
```
and gets the following response
```js
apiResponse: { arrivalTime: "2021-09-06T12:43:27+00:00",
address: "221B Baker St., London, U.K." }
```

If we want the endpoint to omit the `address` field of the response, we need the following snippet with no post-processing parameters

```js
const {address, ...redactedApiResponse} = apiResponse;
postProcessedResponse = redactedApiResponse;
```

5. The requester makes the following request
```js
apiRequestParameters: { asset: "ethereum" }
```

and gets the following response
```js
apiResponse: {
    exchanges: {
      exchangeA: {
        price: 3902.70,
        volume: 250585713
      },
      exchangeB: {
        price: 3902.02,
        volume: 1658376471
      }
  }
}
```

If we want the endpoint to weight the prices quadratically when the asset is `ethereum` and linearly for other cases, we need the following snippet with no post-processing parameters

```js
if (apiRequestParameters.asset == 'ethereum') {
  weightA = Math.sqrt(apiResponse.exchanges.exchangeA.volume);
  weightB = Math.sqrt(apiResponse.exchanges.exchangeB.volume);
} else {
  weightA = apiResponse.exchanges.exchangeA.volume;
  weightB = apiResponse.exchanges.exchangeB.volume;
}
postProcessedResponse = { weightedPrice: (weightA * apiResponse.exchanges.exchangeA.price + weightB * apiResponse.exchanges.exchangeB.price) / (weightA + weightB) };
```

## Post-processing parameters

While implementing the integration, the post-processing parameter should be treated similar to request parameters.
In other words, these are parameters that are expected to be provided by the requester, and thus they should be documented accordingly.
You are highly recommended to populate the `description`, `required` and `example` fields of these parameters in your OIS, and further document their effects and implications if needed.