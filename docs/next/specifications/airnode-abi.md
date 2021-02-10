---
title: Airnode ABI
---

# {{$frontmatter.title}}

[Contract application binary interface \(ABI\)](https://docs.soliditylang.org/en/v0.6.12/abi-spec.html) is used to encode different types of data while interacting with Ethereum contracts. As a result, both Solidity and modules such as web3.js and ethers.js treat ABI encoding–decoding functionality as a first-class citizen. This makes using contract ABI for encoding API call parameters a very attractive option.

Although encoding API call parameters using contract ABI has many advantages, it cannot be used for this purpose directly. Quoting from the [Solidity docs](https://docs.soliditylang.org/en/v0.6.12/abi-spec.html):

> The encoding is not self describing and thus requires a schema in order to decode.

This means that whenever we pass API call parameters \(of type `bytes`\), we would also need to pass a list of the types of these parameters, which is cumbersome \(and it is not clear how these types would be encoded\). As a solution, Airnode uses _Airnode ABI specifications_, an extension of contract ABI specifications that includes a header that keeps the schema.

## Header

The Airnode ABI specifications header is of type `bytes32` and acts as the schema \(i.e., describes the types of the API call parameters\). The header is encoded in UTF-8 for ease of use. Here is an example:

```text
"1BSabiuBa"
```

The first character, `1`, represents the encoding version. Each following character represents the type of an API call parameter.

### Type encodings

The types are encoded in UTF-8 characters as follows:

```text
B: bytes
S: string
a: address
u: uint256
i: int256
b: bytes32
```

Note that dynamically-sized types are represented with uppercase letters, and statically-sized types are represented with lowercase letters.

## Encoding format

Airnode ABI specifications has the following encoding format:

```text
[------------------------][-----------------------------------------]
  Header of type bytes32      API call parameter name–value pairs
```

Note that each API call parameter is preceded with a name of type `bytes32`.

## Example encoding

If we wanted to encode the following API call parameters

```javascript
{
  "MyFirstBytes": "0x1234",
  "MyString": "1234",
  "MyFirstAddress": "0x0000000000000000000000000000000000001234",
  "MyBytes32": "1234",
  "MyInt256": "-1234",
  "MyUint256": "1234",
  "MySecondBytes": "0x5678",
  "MySecondAddress": "0x0000000000000000000000000000000000005678"
}
```

we would to do this in our client contract as:

```text
bytes memory parameters = abi.encode(
    bytes32("1BSabiuBa"),
    bytes32("MyFirstBytes"), bytes(hex"1234"),
    bytes32("MyString"), "1234",
    bytes32("MyFirstAddress"), 0x0000000000000000000000000000000000001234,
    bytes32("MyBytes32"), bytes32("1234"),
    bytes32("MyInt256"), -1234,
    bytes32("MyUint256"), 1234,
    bytes32("MySecondBytes"), bytes(hex"5678"),
    bytes32("MySecondAddress"), 0x0000000000000000000000000000000000005678
    );
```

Note that we did not need to add an external library to our contract, and `abi.encode()` is fairly cheap in terms of gas usage \(compared to alternative encoding methods\).

## Example decoding

If the user knows the schema of the encoded parameters, they can even decode them on-chain. For example, if the schema is `(bytes,string)`:

```text
(
    bytes32 header,
    bytes32 name1, bytes memory value1,
    bytes32 name2, string memory value2
    ) = abi.decode(parameters, (bytes32,bytes32,bytes,bytes32,string));
```

Note that we disregarded the header and hardcoded the schema into our code. It is also possible to parse the header on-chain and decode accordingly, yet that would be a lot more complex.

## Details

### `bytes32`

A parameter being of type `bytes32` implies that the parameter is UTF-8 encoded text. For example, if the parameter is

```text
0x68656c6c6f000000000000000000000000000000000000000000000000000000
```

Airnode will decode it as

```text
"hello"
```

and feed that to the API, which is what the user would want to do in most cases.

This becomes a problem if the parameter is not encoded text, but for example a hash such as:

```text
0x1fd36c61981313c0c155d33ffac0325bd7c00d21d52442981bb13d2fa13e8f71
```

If this hash is encoded as a `bytes32` type, Airnode will decode it as:

```text
ÓlaÀÁUÓ?úÀ2[×À
!Õ$B±=/¡>q
```

which is probably not what the user is looking for. Instead, the user should typecast the parameter into a `bytes` type as:

```text
bytes parameterAsBytes = abi.encodePacked(parameterAsBytes32);
```

and encode it as such. Then, Airnode would decode it as

```text
"0x1fd36c61981313c0c155d33ffac0325bd7c00d21d52442981bb13d2fa13e8f71"
```

### Omitted types

We have omitted `array` and `tuple` because they are not suitable to be used as API parameters. `uint8-uint128`, `int8-int128`, `bytes1-bytes31` are omitted because they are padded to 32 bytes by the ABI encoder anyway \(meaning that the user should simply typecast these to the 32-byte versions\).

Finally, we have omitted `bool` to avoid confusion because there are too many types that start with the letter 'B'. A simple workaround is to encode a `bool` type parameter as `bytes32` as:

```text
bytes32 boolAsBytes32 = boolAsBool ? bytes32("true") : bytes32("false");
```

This works because both `bool(true)` and `bytes32("true")` would be decoded as `"true"` at the Airnode-end, and vice versa.

### Size limit

The header can encode up to 31 parameters \(and 1 byte is used to encode the encoding version\). This is far more than what would be needed in practice, and thus is tolerated to avoid a more complex solution.

### Padding

We are using the [strict encoding mode](https://docs.soliditylang.org/en/v0.6.12/abi-spec.html#strict-encoding-mode) so that we can decode the values later on. This means that each parameter will be padded with zeros to complete them to 32 bytes. Although this padding increases gas costs, ABI encoding/decoding functions being cheap balances this. Furthermore, the [template](/request-response-protocol/template.md) pattern we use in our protocols allows us to refer to these encoded parameters without explicitly passing them in our requests, making the increased cost induced by padding irrelevant in most cases.

## `@api3/airnode-abi`

The user may need to encode and decode Airnode ABI off-chain. For that, we have published the related [Airnode monorepo package](https://github.com/api3dao/airnode/tree/master/packages/airnode-abi) under the name `@api3/airnode-abi`. You can refer to the [`airnode-starter`](https://github.com/api3dao/airnode-starter/blob/9ec0e62b9d5edccd2b711250055b6bdb0cc049ef/scripts/make-request.js#L25) repo for an example usage.
