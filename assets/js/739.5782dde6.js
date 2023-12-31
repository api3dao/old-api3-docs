(window.webpackJsonp=window.webpackJsonp||[]).push([[739],{1513:function(t,e,a){"use strict";a.r(e);var s=a(9),n=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("TitleSpan",[t._v(t._s(t.$frontmatter.folder))]),t._v(" "),a("h1",{attrs:{id:"frontmatter-title"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#frontmatter-title"}},[t._v("#")]),t._v(" "+t._s(t.$frontmatter.title))]),t._v(" "),a("TocHeader"),t._v(" "),a("TOC",{staticClass:"table-of-contents",attrs:{"include-level":[2,3]}}),t._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[t._v("This function uses IDs.")]),t._v(" "),a("p",[t._v("Be sure to understand the difference between using a name or ID. See\n"),a("RouterLink",{attrs:{to:"/dapis/developers/#dapi-names"}},[t._v("dAPI Names")]),t._v(".")],1)]),t._v(" "),a("p",[t._v("This function reads a value directly from a Beacon or Beacon set using its ID.\nIn the code example below, "),a("code",[t._v("_datafeedId")]),t._v(" is a Beacon or Beacon set ID. For\non-chain smart contracts the "),a("code",[t._v("msg.sender")]),t._v(" argument received by the function\n"),a("a",{attrs:{href:"https://github.com/api3dao/airnode-protocol-v1/blob/v0.5.0/contracts/dapis/DapiServer.sol#L708-L721",target:"_blank",rel:"noopener noreferrer"}},[t._v("readDataFeedValueWithId()"),a("OutboundLink")],1),t._v("\nmust have "),a("RouterLink",{attrs:{to:"/dapis/developers/#coverage-policies"}},[t._v("read access")]),t._v(" for the dAPI requested.")],1),t._v(" "),a("p",[t._v("Calling from off-chain code ("),a("em",[t._v("using a library such as "),a("code",[t._v("ether.js")])]),t._v(") is not\nsubject to coverage policies. Off-chain code is beyond the scope of this doc.")]),t._v(" "),a("h2",{attrs:{id:"example-usage"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#example-usage"}},[t._v("#")]),t._v(" Example Usage")]),t._v(" "),a("div",{staticClass:"language-solidity line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-solidity"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// SPDX-License-Identifier: MIT")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("pragma")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("solidity")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.8")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v(".9")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"@api3/airnode-protocol-v1/contracts/dapis/interfaces/IDapiServer.sol"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("contract")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("mySmartContract")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("myGetDataFeedValue")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("address")]),t._v(" _dapiServerContractAddress"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("bytes32")]),t._v(" _datafeedId\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("external")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("int224")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" value"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Calling the DapiServer for a data feed value.")]),t._v("\n        value "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("IDapiServer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("_dapiServerContractAddress"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("readDataFeedValueWithId")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("_datafeedId"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br"),a("span",{staticClass:"line-number"},[t._v("17")]),a("br")])]),a("p",[t._v("See another code example of "),a("code",[t._v("readDataFeedValueWithId()")]),t._v(" in the\n"),a("a",{attrs:{href:"https://github.com/api3dao/data-feed-reader-example/blob/main/contracts/DataFeedReaderExample.sol#L19",target:"_blank",rel:"noopener noreferrer"}},[t._v("data-feed-reader-example repo"),a("OutboundLink")],1),t._v(".")]),t._v(" "),a("h2",{attrs:{id:"parameters"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#parameters"}},[t._v("#")]),t._v(" Parameters")]),t._v(" "),a("p",[a("code",[t._v("readDataFeedValueWithId(bytes32 _datafeedId)")])]),t._v(" "),a("ul",[a("li",[a("code",[t._v("bytes32 datafeedId")]),t._v(" - The ID of a Beacon or Beacon set to retrieve a value\nfor.")])]),t._v(" "),a("h2",{attrs:{id:"returns"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#returns"}},[t._v("#")]),t._v(" Returns")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("int224 value")]),t._v(" - The value of the Beacon or Beacon set.")])]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("Please note:")]),t._v(" "),a("p",[t._v("The "),a("code",[t._v("DapiServer.sol")]),t._v(" contract casts the reported data point to "),a("code",[t._v("int224")]),t._v(". If this\nis a problem (because the reported data may not fit into 224 bits or it is of a\ncompletely different type such as "),a("code",[t._v("bytes32")]),t._v("), do not use this contract and\nimplement a customized version instead. The contract casts the timestamps to\n"),a("code",[t._v("uint32")]),t._v(", which means it will not work work past-2106 in the current form. If\nthis is an issue, consider casting the timestamps to a larger type.")])]),t._v(" "),a("p",[t._v("If the timestamp is "),a("code",[t._v("0")]),t._v(' then the function will revert with "'),a("em",[t._v("Data feed does not\nexist")]),t._v('".')])],1)}),[],!1,null,null,null);e.default=n.exports}}]);