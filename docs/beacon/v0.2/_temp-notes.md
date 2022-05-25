# Operations Repo

Could you please have a look through this when you have a chance and see if it
helps you better understand the relationships between the data:
https://github.com/api3dao/operations/blob/main/DEVELOPMENT_USAGE.md

I'm not sure of your coding skill level; if this is too much then we can
probably ask Ashar to put together something to create an export for you, or
recreate the documentation export (the code is still available as linked above).
No judgement either way.

In terms of endpoints, these two will remain active indefinitely (on chain value
and last transactions):

You can get the last 5 transactions for a beacon using this URL (example):
https://api.api3data.link/beacons/last_transactions?chainId=137&beaconId=0x5b4e1550f636c4e06478d5d8cd2a9ee106ffb2b7c227d0de57284c2952216c97

Apologies, incorrect beaconId, I've updated the example link with the first
Amberdata beacon listed on Protofire's demo site:
https://api.api3data.link/beacons/last_transactions?chainId=30&beaconId=0x33ced632274973f86303f003416dfcb0d0a59aefe7a0f3fef5c42bb890383846

The response will initially be slow as we aren't forcing it to stay warm, but
later calls should be faster. You'll ge t an array of on-chain tx events back,
which will follow this schema: { address, blockHash, blockNumber, data,
logIndex, parsedLog, removed, topics, transactionHash, transactionIndex }

This schema contains more fields than required for the UI - we can delete unused
fields once things have settled.

What you'll need for the UI fields: "On-Chain Value":

This is the same type of value as exposed by the on_chain_value endpoint. You'll
find this value in [].parsedLog.args.[1].hex and just like the on_chain_value
you'll need to look up the \_times parameter of the beacon to divide the value
to get the decimal value.

"Timestamp": This is [].parsedLog.args.[2].hex

To get the on-chain value:

The endpoint underneath implements readDataFeedWithId:
https://github.com/api3dao/airnode-protocol-v1/blob/315d6e24dedb00e02a99e3445aae74623b1168c9/contracts/dapis/DapiServer.sol#L691

You can query the endpoint with either (chainId and dataFeedId) or (chainId and
airnodeAddress and templateId) or (chainId and dapiName): eg.
https://api.api3data.link/beacons/on_chain_value?chainId=30&airnodeAddress=0x5b1243308f56156553F067D354b162f71E581b28&templateId=0xb0039a5af9f6c937f3d1c7af36a5dc83c53961d0356a373185e7972d6daf6b5a
https://api.api3data.link/beacons/on_chain_value?chainId=30&dataFeedId=0x33ced632274973f86303f003416dfcb0d0a59aefe7a0f3fef5c42bb890383846
dataFeedId is synonymous with beaconId (for this purpose, refer to the
DapiServer.sol for more info) The templateId+airnodeAddress is a convenience
method (we derive it on the endpoint as can be seen in the DapiServer.sol
contract).

## Protofire website

This is their example site if you haven't seen it already:
http://api3-explorer.s3-website.eu-west-3.amazonaws.com/beacons/rsk/0x33ced632274973f86303f003416dfcb0d0a59aefe7a0f3fef5c42bb890383846

### S3 Bucket

I've added the export process to the operations CI along with an export system
that follows the example you gave above^ The JSON blobs are stored in both
https://operations-development.s3.amazonaws.com/latest/*.json and
https://operations-development.s3.amazonaws.com/commit-hash/*.json So you can
either always use the latest to be pushed or pin your usage to a specific commit
hash.

These are the S3 files currently being exposed:
https://operations-development.s3.amazonaws.com/latest/operations.json (the full
operations object)
https://operations-development.s3.amazonaws.com/latest/apis.json (/data/apis)
https://operations-development.s3.amazonaws.com/latest/chains.json
(/data/chains) https://operations-development.s3.amazonaws.com/latest/dapis.json
(/data/dapis)
https://operations-development.s3.amazonaws.com/latest/documentation.json (the
old documentation export, copied from the last code used)
https://operations-development.s3.amazonaws.com/latest/documentation-alternative.json
(the variation you gave above)
https://operations-development.s3.amazonaws.com/latest/explorer.json
(/data/explorer payload) These are currently updated for every new PR commit. An
example of the commit hash variant (pinned version):
https://operations-development.s3.amazonaws.com/46139b8f39f0653adee4719fd492e0d75a64d93a/operations.json
(edited)

## Value

That value is not abi encoded. You can get the decimal value by trimming off the
'0x' and then parsing the remaining portion of it using parseInt(something, 16):

````
 let obj =
{"error":false,"beaconResponse":[{"type":"BigNumber","hex":"0x0d18"},1653383678]};
parseInt(obj.beaconResponse[0].hex.substring(2), 16);
// outputs in node prompt:
3352
```

That value needs to be divided by the `_times` parameter in the template to get
the float value (if applicable).

You can also alternatively use ethers to parse
the value (but ethers adds more overhead, hence the first example):

````

ethers.BigNumber.from(obj.beaconResponse[0]) (edited)

```


```

## Production document

https://docs.google.com/document/d/1R7UYJnoRmsXtVADW4Ny3WOv5A53MhBdaDKQB_G-cv7k/edit?usp=sharing

{ pricingCoverage.fee === 0 && <div>free beacons</div> }

## polygon-testnet Only

Add this cotract (hardcoded) for polygon-testnet, chains list.

https://github.com/api3dao/utility-contracts/blob/main/SelfServeDapiServerWhitelister/deployments/polygon-testnet/SelfServeDapiServerWhitelister.json
