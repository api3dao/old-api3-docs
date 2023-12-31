(window.webpackJsonp=window.webpackJsonp||[]).push([[736],{1511:function(e,a,t){"use strict";t.r(a);var r=t(9),n=Object(r.a)({},(function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("TitleSpan",[e._v(e._s(e.$frontmatter.folder))]),e._v(" "),t("h1",{attrs:{id:"frontmatter-title"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#frontmatter-title"}},[e._v("#")]),e._v(" "+e._s(e.$frontmatter.title))]),e._v(" "),t("TocHeader"),e._v(" "),t("TOC",{staticClass:"table-of-contents",attrs:{"include-level":[2,3]}}),e._v(" "),t("p",[e._v("The\n"),t("a",{attrs:{href:"https://github.com/api3dao/airnode-protocol-v1/blob/v0.5.1/contracts/dapis/DapiServer.sol",target:"_blank",rel:"noopener noreferrer"}},[e._v("DapiServer.sol"),t("OutboundLink")],1),e._v("\ncontract serves data feeds to contracts with read access. All the related\ncontracts can be imported from the\n"),t("a",{attrs:{href:"https://www.npmjs.com/package/@api3/airnode-protocol-v1",target:"_blank",rel:"noopener noreferrer"}},[e._v("@api3/airnode-protocol-v1"),t("OutboundLink")],1),e._v("\nnpm package.")]),e._v(" "),t("h2",{attrs:{id:"starter-project"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#starter-project"}},[e._v("#")]),e._v(" Starter Project")]),e._v(" "),t("p",[e._v("The starter project\n"),t("a",{attrs:{href:"https://github.com/api3dao/data-feed-reader-example",target:"_blank",rel:"noopener noreferrer"}},[e._v("data-feed-reader-example"),t("OutboundLink")],1),e._v("\nis an example GitHub project that reads from a dAPI on the Polygon Mumbai\ntestnet. Be sure to read through the\n"),t("a",{attrs:{href:"https://github.com/api3dao/data-feed-reader-example/blob/main/README.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("README.md"),t("OutboundLink")],1),e._v("\nand some of the example code such as the\n"),t("a",{attrs:{href:"https://github.com/api3dao/data-feed-reader-example/blob/main/contracts/DataFeedReaderExample.sol",target:"_blank",rel:"noopener noreferrer"}},[e._v("DataFeedReaderExample.sol"),t("OutboundLink")],1),e._v("\ncontract. Read through this entire page before running the starter project to\nbetter understand some of the terms and concepts mentioned. Finally follow the\ninstruction in the README to get acquainted with reading data feeds.")]),e._v(" "),t("h2",{attrs:{id:"coverage-policies"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#coverage-policies"}},[e._v("#")]),e._v(" Coverage Policies")]),e._v(" "),t("p",[t("code",[e._v("DapiServer.sol")]),e._v(" will check that the requester has a coverage policy for each\ndAPI it may attempt to read. See available dAPIs on the\n"),t("a",{attrs:{href:"https://market.api3.org",target:"_blank",rel:"noopener noreferrer"}},[e._v("API3 Market"),t("OutboundLink")],1),e._v(". During the "),t("em",[e._v("preview period")]),e._v(", all dAPIs\non production networks have free access (limited time offer). Please go to the\n"),t("a",{attrs:{href:"https://forms.monday.com/forms/embed/f44d0ed9dfd0154885f48fdb3b87a489?r=use1",target:"_blank",rel:"noopener noreferrer"}},[e._v("Request Data"),t("OutboundLink")],1),e._v("\npage to request dAPI access on production networks. See\n"),t("RouterLink",{attrs:{to:"/dapis/reference/chains.html"}},[e._v("Chains and Contracts")]),e._v(", which includes supported\nnetworks.")],1),e._v(" "),t("p",[e._v("On the Polygon Mumbai testnet, developers can "),t("em",[e._v("self-enable")]),e._v(" the use of any dAPI.\nDuring the deployment flow of your smart contract that reads a data feed, add\ncode that self-enables the desired dAPI. The following scripts from the\n"),t("RouterLink",{attrs:{to:"/dapis/developers/#starter-project"}},[e._v("Starter Project")]),e._v(" detail how this is done. Please be sure to\nexplore the starter project in its entirety.")],1),e._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://github.com/api3dao/data-feed-reader-example/blob/phase-0/scripts/allow-to-read-with-name.js",target:"_blank",rel:"noopener noreferrer"}},[e._v("allow-to-read-with-name.js"),t("OutboundLink")],1)]),e._v(" "),t("li",[t("a",{attrs:{href:"https://github.com/api3dao/data-feed-reader-example/blob/phase-0/scripts/allow-to-read-with-id.js",target:"_blank",rel:"noopener noreferrer"}},[e._v("allow-to-read-with-id.js"),t("OutboundLink")],1)])]),e._v(" "),t("h2",{attrs:{id:"dapi-names"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dapi-names"}},[e._v("#")]),e._v(" dAPI Names")]),e._v(" "),t("p",[e._v("A dAPI is a live data point associated with human readable "),t("code",[e._v("dapiName")]),e._v(". dAPI\ndefinitions simplify access and can return aggregated Beacon values or a single\nBeacon value. This is suitable where the more recent data point (meaning its set\nof Beacons could change as needed) is always more favorable, e.g., in the\ncontext of an asset price data feed.")]),e._v(" "),t("p",[e._v("Pass a "),t("code",[e._v("dapiName")]),e._v(", as an encoded bytes32 value, to the desired "),t("code",[e._v("DapiServer.sol")]),e._v("\nreader function that uses "),t("code",[e._v("dapiName")]),e._v(' as its parameter. This is done to save gas\nwhen your smart contract calls a "readByName" function on DapiServer.sol.')]),e._v(" "),t("ul",[t("li",[t("RouterLink",{attrs:{to:"/dapis/developers/read-data-feed-with-dapi-name.html"}},[e._v("readDataFeedWithDapiName(_dapiName)")]),e._v(" -\nreturns a value and timestamp")],1),e._v(" "),t("li",[t("RouterLink",{attrs:{to:"/dapis/developers/read-data-feed-value-with-dapi-name.html"}},[e._v("readDataFeedValueWithDapiName(_dapiName)")]),e._v(" -\nreturns a value")],1)]),e._v(" "),t("p",[e._v("The example below generates the encoded bytes32 value of AVAX/USD. Try encoding\nAVAX/USD in the "),t("a",{attrs:{href:"https://playground.ethers.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("ethers playground"),t("OutboundLink")],1),e._v(".")]),e._v(" "),t("div",{staticClass:"language-solidity line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-solidity"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// Encode the dapiName (such as AVAX/USD) to bytes32")]),e._v("\nethers"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("utils"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("formatBytes32String")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"AVAX/USD"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// Yields: 0x415641582f555344000000000000000000000000000000000000000000000000")]),e._v("\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br")])]),t("p",[e._v("Then pass the encoded value to the functions mentioned above.")]),e._v(" "),t("div",{staticClass:"language-solidity line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-solidity"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// Calling readDataFeedWithDapiName() using the DapiServer contract")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("value"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" timestamp"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("IDapiServer")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("_dapiServerContractAddress"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("readDataFeedWithDapiName")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"0x415641582f555344000000000000000000000000000000000000000000000000"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br")])]),t("h2",{attrs:{id:"dapiserver-functions"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dapiserver-functions"}},[e._v("#")]),e._v(" DapiServer Functions")]),e._v(" "),t("ul",[t("li",[t("RouterLink",{attrs:{to:"/dapis/developers/read-data-feed-with-dapi-name.html"}},[e._v("readDataFeedWithDapiName()")]),e._v(" - Returns a\nvalue and timestamp using the dAPI name.")],1),e._v(" "),t("li",[t("RouterLink",{attrs:{to:"/dapis/developers/read-data-feed-value-with-dapi-name.html"}},[e._v("readDataFeedValueWithDapiName()")]),e._v(" -\nReturns a value using the dAPI name.")],1),e._v(" "),t("li",[t("RouterLink",{attrs:{to:"/dapis/developers/reader-can-read-datafeed.html"}},[e._v("readerCanReadDataFeed()")]),e._v(" - Whether a reader\ncan read a dAPI, Beacon, or Beacon set.")],1),e._v(" "),t("li",[t("RouterLink",{attrs:{to:"/dapis/developers/data-feed-id-to-reader-to-whitelist-status.html"}},[e._v("dataFeedIdToReaderToWhitelistStatus()")]),e._v(" -\nDetails about the coverage policy status of a reader address for a dAPI,\nBeacon, or Beacon set.")],1),e._v(" "),t("li",[t("RouterLink",{attrs:{to:"/dapis/developers/read-data-feed-with-id.html"}},[e._v("readDataFeedWithId()")]),e._v(" - Returns a value and\ntimestamp using a Beacon or Beacon set ID.")],1),e._v(" "),t("li",[t("RouterLink",{attrs:{to:"/dapis/developers/read-data-feed-value-with-id.html"}},[e._v("readDataFeedValueWithId()")]),e._v(" - Returns a\nvalue using a Beacon or Beacon set ID.")],1)]),e._v(" "),t("h2",{attrs:{id:"optionally-use-beacon-ids"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#optionally-use-beacon-ids"}},[e._v("#")]),e._v(" Optionally, use Beacon IDs")]),e._v(" "),t("p",[e._v("It is possible (as an option) to use a Beacon ID or Beacon set ID by calling\n"),t("RouterLink",{attrs:{to:"/dapis/developers/read-data-feed-with-id.html"}},[e._v("readDataFeedId()")]),e._v(" and\n"),t("RouterLink",{attrs:{to:"/dapis/developers/read-data-feed-value-with-id.html"}},[e._v("readDataFeedValueById()")]),e._v(". Doing so is\nconsidered an advanced user flow. In practice reading with a name and reading\nwith an ID are very different things. When you read with a name, you benefit\nfrom what the name maps to and how its value is aggregated from sourced Beacons.\nAPI3 manages dAPI name mappings to provide the best possible responses. When you\nread with an ID, you will always read a value directly from a Beacon or Beacon\nset. Also see "),t("RouterLink",{attrs:{to:"/dapis/#dapi-composition"}},[e._v("dAPI Composition")]),e._v(".")],1)],1)}),[],!1,null,null,null);a.default=n.exports}}]);