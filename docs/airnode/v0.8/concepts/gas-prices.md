---
title: Gas Prices
folder: Concepts and Definitions
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Airnode supports different strategies to calculate the gas price that it should
use for submitting transactions. These can be defined in the `config.json`.

The supported strategies include:

- `latestBlockPercentileGasPrice`
- `providerRecommendedGasPrice`
- `providerRecommendedEip1559GasPrice`
- `constantGasPrice`

The strategies are attempted in the order that they are defined in `config.json`
where the Airnode will move on to the next strategy in the list if the current
fails. The only required strategy to be included is `constantGasPrice` which is
intended to be used as the final fallback if all other strategies fail to return
a gas price. Therefore, `constantGasPrice` should be set as the last strategy in
the list.

## Strategy: `latestBlockPercentileGasPrice`

The `latestBlockPercentileGasPrice` strategy calculates a gas price based on the
specified percentile of previous transactions in recent blocks and sets the
transaction to `type 0` and a `gasPrice` value. The parameters that the strategy
uses to calculate the gas price can be configured.

```json
{
  "gasPriceStrategy": "latestBlockPercentileGasPrice",
  "percentile": 60,
  "minTransactionCount": 20,
  "pastToCompareInBlocks": 20,
  "maxDeviationMultiplier": 2
}
```

## Strategy: `providerRecommendedGasPrice`

The `providerRecommendedGasPrice` strategy gets a gas price estimate from the
provider, applies the defined multiplier to it and sets the transaction
to`type 0` and a `gasPrice` value.

```json
{
  "gasPriceStrategy": "providerRecommendedGasPrice",
  "recommendedGasPriceMultiplier": 1.2
}
```

## Strategy: `providerRecommendedEip1559GasPrice`

The `providerRecommendedEip1559GasPrice` strategy gets an EIP1559 fee data
estimate from the provider and applies the configured `baseFeeMultiplier` and
`priorityFee` values returning a `type 2` transaction with `maxFeePerGas` and
`maxPriorityFeePerGas` values.

```json
{
  "gasPriceStrategy": "providerRecommendedEip1559GasPrice",
  "baseFeeMultiplier": 2,
  "priorityFee": {
    "value": 3.12,
    "unit": "gwei"
  }
}
```

## Strategy: `constantGasPrice`

The `constantGasPrice` strategy returns a `type 0` gas price with the configured
`gasPrice` value. This strategy is intended to be used as a fallback in the case
that the other strategies fail to return a gas price.

```json
{
  "gasPriceStrategy": "constantGasPrice",
  "gasPrice": {
    "value": 10,
    "unit": "gwei"
  }
}
```
