(window.webpackJsonp=window.webpackJsonp||[]).push([[607],{1329:function(t,s,a){"use strict";a.r(s);var e=a(9),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("TitleSpan",[t._v(t._s(t.$frontmatter.folder))]),t._v(" "),a("h1",{attrs:{id:"frontmatter-title"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#frontmatter-title"}},[t._v("#")]),t._v(" "+t._s(t.$frontmatter.title))]),t._v(" "),a("VersionWarning"),t._v(" "),a("TocHeader"),t._v(" "),a("TOC",{staticClass:"table-of-contents",attrs:{"include-level":[2,4]}}),t._v(" "),a("p",[a("a",{attrs:{href:"https://docs.soliditylang.org/en/v0.6.12/abi-spec.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Contract application binary interface (ABI)"),a("OutboundLink")],1),t._v("\nis used to encode different types of data while interacting with Ethereum\ncontracts. As a result, both Solidity and modules such as\n"),a("a",{attrs:{href:"https://web3js.readthedocs.io/",target:"_blank",rel:"noopener noreferrer"}},[t._v("web3.js"),a("OutboundLink")],1),t._v(" and\n"),a("a",{attrs:{href:"https://docs.ethers.io/",target:"_blank",rel:"noopener noreferrer"}},[t._v("ethers.js"),a("OutboundLink")],1),t._v(" treat ABI encoding–decoding functionality\nas a first-class citizen. This makes using contract ABI for encoding API call\nparameters a very attractive option.")]),t._v(" "),a("p",[t._v("Although encoding API call parameters using contract ABI has many advantages, it\ncannot be used for this purpose directly. Quoting from the\n"),a("a",{attrs:{href:"https://docs.soliditylang.org/en/v0.6.12/abi-spec.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Solidity docs"),a("OutboundLink")],1),t._v(":")]),t._v(" "),a("blockquote",[a("p",[t._v("The encoding is not self describing and thus requires a schema in order to\ndecode.")])]),t._v(" "),a("p",[t._v("This means that when passing API call parameters (of type "),a("code",[t._v("bytes")]),t._v("), you would\nalso need to pass a list of the types for these parameters, which is cumbersome\nand it is not clear how these types would be encoded. As a solution, Airnode\nuses "),a("em",[t._v("Airnode ABI specifications")]),t._v(", an extension of contract ABI specifications\nthat includes a header that keeps the schema.")]),t._v(" "),a("h2",{attrs:{id:"header"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#header"}},[t._v("#")]),t._v(" Header")]),t._v(" "),a("p",[t._v("The Airnode ABI specifications header is of type "),a("code",[t._v("bytes32")]),t._v(" and acts as the\nschema (i.e., describes the types of the API call parameters). The header is\nencoded in UTF-8 for ease of use. Here is an example:")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('"1BSasbiuBa"\n')])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("The first character, "),a("code",[t._v("1")]),t._v(", represents the encoding version. Each following\ncharacter represents the type of an API call parameter.")]),t._v(" "),a("h3",{attrs:{id:"type-encodings"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#type-encodings"}},[t._v("#")]),t._v(" Type encodings")]),t._v(" "),a("p",[t._v("The types are encoded in UTF-8 characters as follows:")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("B: bytes\nb: bytes32\nS: string\ns: string32\na: address\nu: uint256\ni: int256\nf: bool\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br")])]),a("p",[t._v("Note that dynamically-sized types are represented with uppercase letters and\nstatically-sized types are represented with lowercase letters. Another thing to\nnotice is that "),a("code",[t._v("s")]),t._v(" represents "),a("code",[t._v("string32")]),t._v(", but this is an artificial type and it\nis not part of\n"),a("a",{attrs:{href:"https://docs.soliditylang.org/en/latest/types.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("solidity types"),a("OutboundLink")],1),t._v(". This type\nis instead represented on chain as "),a("code",[t._v("bytes32")]),t._v(". The reasons for this are explained\nin depth in "),a("RouterLink",{attrs:{to:"/airnode/v0.7/reference/specifications/airnode-abi-specifications.html#string32"}},[t._v("string32 details")]),t._v(" section.")],1),t._v(" "),a("h2",{attrs:{id:"encoding-format"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#encoding-format"}},[t._v("#")]),t._v(" Encoding format")]),t._v(" "),a("p",[t._v("Airnode ABI specifications has the following encoding format (which is somewhat\nsimilar to "),a("a",{attrs:{href:"https://github.com/antirez/sds",target:"_blank",rel:"noopener noreferrer"}},[t._v("SDS"),a("OutboundLink")],1),t._v("):")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("[------------------------][-----------------------------------------]\n  Header of type bytes32      API call parameter name–value pairs\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("p",[t._v("Note that each API call parameter is preceded with a name of type "),a("code",[t._v("bytes32")]),t._v(".")]),t._v(" "),a("h2",{attrs:{id:"example-encoding"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#example-encoding"}},[t._v("#")]),t._v(" Example encoding")]),t._v(" "),a("p",[t._v("To encode the following API call parameters")]),t._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"MyFirstBytes"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0x1234"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"MyString"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1234"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"MyFirstAddress"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0x0000000000000000000000000000000000001234"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"MyString32"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1234"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"MyBytes32"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0x68656c6c6f000000000000000000000000000000000000000000000000000000"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"MyInt256"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"-1234"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"MyUint256"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1234"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"MySecondBytes"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0x5678"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"MySecondAddress"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0x0000000000000000000000000000000000005678"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br")])]),a("p",[t._v("you would do this in a requester contract as:")]),t._v(" "),a("div",{staticClass:"language-solidity line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-solidity"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("bytes")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("memory")]),t._v(" parameters "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" abi"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("encode")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("bytes32")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1BSasbiuBa"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("bytes32")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"MyFirstBytes"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("bytes")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("hex"),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1234"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("bytes32")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"MyString"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1234"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("bytes32")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"MyFirstAddress"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0x0000000000000000000000000000000000001234")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("bytes32")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"MyString32"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("bytes32")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1234"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("bytes32")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"MyBytes32"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0x68656c6c6f000000000000000000000000000000000000000000000000000000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("bytes32")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"MyInt256"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1234")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("bytes32")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"MyUint256"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1234")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("bytes32")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"MySecondBytes"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("bytes")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("hex"),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"5678"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("bytes32")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"MySecondAddress"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0x0000000000000000000000000000000000005678")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br")])]),a("p",[t._v("Note that you do not need to add an external library to the contract, and\n"),a("code",[t._v("abi.encode()")]),t._v(" is fairly cheap in terms of gas usage (compared to alternative\nencoding methods).")]),t._v(" "),a("h2",{attrs:{id:"example-decoding"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#example-decoding"}},[t._v("#")]),t._v(" Example decoding")]),t._v(" "),a("p",[t._v("If you know the schema of the encoded parameters, then decode them on-chain. For\nexample, if the schema is "),a("code",[t._v("(bytes,string)")]),t._v(":")]),t._v(" "),a("div",{staticClass:"language-solidity line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-solidity"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("bytes32")]),t._v(" header"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("bytes32")]),t._v(" name1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("bytes")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("memory")]),t._v(" value1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("bytes32")]),t._v(" name2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("memory")]),t._v(" value2\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" abi"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("decode")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("parameters"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("bytes32")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("bytes32")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("bytes")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("bytes32")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br")])]),a("p",[t._v("Note that this disregards the header and hard codes the schema into the code. It\nis also possible to parse the header on-chain and decode accordingly, yet that\nwould be a lot more complex.")]),t._v(" "),a("h2",{attrs:{id:"details"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#details"}},[t._v("#")]),t._v(" Details")]),t._v(" "),a("h3",{attrs:{id:"string32"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#string32"}},[t._v("#")]),t._v(" "),a("code",[t._v("string32")])]),t._v(" "),a("p",[t._v("A parameter being of type "),a("code",[t._v("string32")]),t._v(" (encoded as characted "),a("code",[t._v("s")]),t._v(" in the ABI\nspecification schema header) implies that the parameter is UTF-8 encoded text.\nFor example, if the parameter is")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("0x68656c6c6f000000000000000000000000000000000000000000000000000000\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("Airnode will decode it as")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('"hello"\n')])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("and feed that to the API, which is what the user would want to do in most cases.\nThis becomes a problem if the parameter is not encoded text, but for example a\nhash such as:")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("0x1fd36c61981313c0c155d33ffac0325bd7c00d21d52442981bb13d2fa13e8f71\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("If this hash is encoded as a "),a("code",[t._v("string32")]),t._v(" type, Airnode will decode it as:")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("ÓlaÀÁUÓ?úÀ2[×À\n!Õ$B±=/¡>q\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("p",[t._v("which is probably not what the user is looking for. For these use cases, the\nuser should use the "),a("RouterLink",{attrs:{to:"/airnode/v0.7/reference/specifications/airnode-abi-specifications.html#bytes32"}},[a("code",[t._v("bytes32")])]),t._v(" type\ninstead.")],1),t._v(" "),a("h3",{attrs:{id:"bytes32"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bytes32"}},[t._v("#")]),t._v(" "),a("code",[t._v("bytes32")])]),t._v(" "),a("p",[t._v("To encode a "),a("code",[t._v("bytes32")]),t._v(" hash on chain, use the "),a("code",[t._v("bytes32")]),t._v(" type which is represented\nby "),a("code",[t._v("b")]),t._v(" in the ABI header schema.")]),t._v(" "),a("div",{staticClass:"language-solidity line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-solidity"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("bytes")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("memory")]),t._v(" parameters "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" abi"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("encode")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("bytes32")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1b"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("bytes32")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"MyBytes32"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0x1fd36c61981313c0c155d33ffac0325bd7c00d21d52442981bb13d2fa13e8f71")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br")])]),a("p",[t._v("When decoded by Airnode, the value would be the hash itself:")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('"0x1fd36c61981313c0c155d33ffac0325bd7c00d21d52442981bb13d2fa13e8f71"\n')])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("If you want to store 32 byte string values on chain, use the\n"),a("RouterLink",{attrs:{to:"/airnode/v0.7/reference/specifications/airnode-abi-specifications.html#string32"}},[a("code",[t._v("string32")])]),t._v(" type instead.")],1),t._v(" "),a("h3",{attrs:{id:"bool"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bool"}},[t._v("#")]),t._v(" "),a("code",[t._v("bool")])]),t._v(" "),a("p",[t._v("The "),a("code",[t._v("bool")]),t._v(" type, encoded as charatcter "),a("code",[t._v("f")]),t._v(" using the ABI specification schema\ncan be used to encode a boolean value. The header symbol is "),a("code",[t._v("f")]),t._v(", because\ncharacter "),a("code",[t._v("b")]),t._v(" was already reserved for bytes encodings. So we chose letter "),a("code",[t._v("f")]),t._v('\nas bool values are commonly used to represent "boolean flags".')]),t._v(" "),a("h3",{attrs:{id:"omitted-types"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#omitted-types"}},[t._v("#")]),t._v(" Omitted types")]),t._v(" "),a("p",[a("code",[t._v("array")]),t._v(" and "),a("code",[t._v("tuple")]),t._v(" are omitted because they are not suitable to be used as API\nparameters. "),a("code",[t._v("uint8-uint128")]),t._v(", "),a("code",[t._v("int8-int128")]),t._v(", "),a("code",[t._v("bytes1-bytes31")]),t._v(" are omitted because\nthey are padded to 32 bytes by the ABI encoder anyway (meaning that the user\nshould simply typecast these to the 32-byte versions).")]),t._v(" "),a("h3",{attrs:{id:"size-limit"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#size-limit"}},[t._v("#")]),t._v(" Size limit")]),t._v(" "),a("p",[t._v("The header can encode up to 31 parameters (and 1 byte is used to encode the\nencoding version). This is far more than what would be needed in practice, and\nthus is tolerated to avoid a more complex solution.")]),t._v(" "),a("h3",{attrs:{id:"padding"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#padding"}},[t._v("#")]),t._v(" Padding")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://docs.soliditylang.org/en/v0.6.12/abi-spec.html#strict-encoding-mode",target:"_blank",rel:"noopener noreferrer"}},[t._v("Strict encoding mode"),a("OutboundLink")],1),t._v("\nis used so that you can decode the values later on. This means that each\nparameter will be padded with zeros to complete them to 32 bytes. Although this\npadding increases gas costs, ABI encoding/decoding functions being cheap\nbalances this. Furthermore, the "),a("RouterLink",{attrs:{to:"/airnode/v0.7/concepts/template.html"}},[t._v("template")]),t._v(" pattern\nused in the protocols allows for the referencing of these encoded parameters\nwithout explicitly passing them in requests, making the increased cost induced\nby padding irrelevant in most cases.")],1),t._v(" "),a("h2",{attrs:{id:"api3-airnode-abi"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#api3-airnode-abi"}},[t._v("#")]),t._v(" "),a("code",[t._v("@api3/airnode-abi")])]),t._v(" "),a("p",[t._v("Encode and decode parameters with the "),a("RouterLink",{attrs:{to:"/airnode/v0.7/reference/packages/airnode-abi.html"}},[t._v("airnode-abi")]),t._v("\npackage.")],1),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" encode "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@api3/airnode-abi'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" decode "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@api3/airnode-abi'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" parameters "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" type"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'string32'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" name"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'from'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" value"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'ETH'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" type"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'uint256'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" name"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'amount'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" value"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'100000'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" encodedData "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("encode")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("parameters"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" decoded "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("decode")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("encodedData"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'ENCODED:'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" encodedData"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'\\nDECODED:'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" decoded"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br")])]),a("p",[t._v("See the package doc "),a("RouterLink",{attrs:{to:"/airnode/v0.7/reference/packages/airnode-abi.html"}},[t._v("airnode-abi")]),t._v(" for more\ninformation on how to encode and decode with Airnode ABI off-chain. Also see\ncode samples in the\n"),a("a",{attrs:{href:"https://github.com/api3dao/airnode/tree/v0.7/packages/airnode-examples",target:"_blank",rel:"noopener noreferrer"}},[t._v("examples"),a("OutboundLink")],1),t._v("\npackage.")],1),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://github.com/api3dao/airnode/blob/v0.7/packages/airnode-examples/integrations/coingecko/request-utils.ts#L8",target:"_blank",rel:"noopener noreferrer"}},[t._v("request-utils.ts"),a("OutboundLink")],1)])])],1)}),[],!1,null,null,null);s.default=n.exports}}]);