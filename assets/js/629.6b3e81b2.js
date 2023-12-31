(window.webpackJsonp=window.webpackJsonp||[]).push([[629],{1369:function(t,e,s){"use strict";s.r(e);var n=s(9),a=Object(n.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("TitleSpan",[t._v(t._s(t.$frontmatter.folder))]),t._v(" "),s("h1",{attrs:{id:"frontmatter-title"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#frontmatter-title"}},[t._v("#")]),t._v(" "+t._s(t.$frontmatter.title))]),t._v(" "),s("VersionWarning"),t._v(" "),s("TocHeader"),t._v(" "),s("TOC",{staticClass:"table-of-contents",attrs:{"include-level":[2,3]}}),t._v(" "),s("p",[t._v("An Airnode can authorize smart contracts (know as requesters) access to its\nendpoints using "),s("RouterLink",{attrs:{to:"/airnode/v0.8/concepts/authorizers.html"}},[t._v("Authorizers")]),t._v(". This method is\non-chain and requires some blockchain knowledge by an API provider.")],1),t._v(" "),s("p",[t._v("An "),s("RouterLink",{attrs:{to:"/airnode/v0.8/concepts/authorizers.html"}},[t._v("Authorizer")]),t._v(' is a contract which typically\nchecks for a single condition ("has the requester made their monthly payment",\n"is this '),s("code",[t._v("requesterAddress")]),t._v(' whitelisted", etc.). Authorizers can be combined to\nenforce more complex policies. If any of the authorizers in the list gives\naccess, the request will considered to be authorized. From a logical standpoint,\nthe authorization outcomes get '),s("em",[t._v("OR")]),t._v("ed.")],1),t._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[t._v("Alternative: Relayed Meta Data")]),t._v(" "),s("p",[t._v("As an alternative to authorizers and authorizations, an API provider can use\n"),s("RouterLink",{attrs:{to:"/airnode/v0.8/grp-providers/guides/build-an-airnode/api-security.html#relayed-meta-data-security-schemes"}},[t._v("Relayed Meta Data")]),t._v(" to\nauthenticate a request. This approach is off-chain and requires no blockchain\nknowledge by the API provider. Note that it is possible to use authorizers,\nauthorizations, and relayed meta data together.")],1)]),t._v(" "),s("p",[t._v("When you deploy your Airnode a receipt file is generated which contains the\nAirnode's "),s("code",[t._v("airnodeAddress")]),t._v(". Sponsors (via their sponsored requesters) use\n"),s("code",[t._v("airnodeAddress")]),t._v(" and an "),s("code",[t._v("endpointId")]),t._v(" to make requests to your Airnode's\nendpoints. However, you probably do not want to serve them publicly.")]),t._v(" "),s("ul",[s("li",[t._v("Only serve your own\n"),s("RouterLink",{attrs:{to:"/airnode/v0.8/grp-developers/requesters-sponsors.html"}},[t._v("requester contracts")]),t._v(".")],1),t._v(" "),s("li",[t._v("Only serve sponsors who have made a subscription payment.")]),t._v(" "),s("li",[t._v("Only serve sponsors who have gone through KYC.")])]),t._v(" "),s("p",[t._v("You can use different authorizer contracts for your Airnode deployment per chain\nby declaring them in the "),s("code",[t._v("config.json")]),t._v(" file under "),s("code",[t._v("chains[n].authorizers")]),t._v(". Add\none or more authorizer contract addresses to the\n"),s("code",[t._v("chains[n].authorizers.{<authorizerSchemeType>}")]),t._v(" array as shown below (e.g.\n"),s("code",[t._v("requesterEndpointAuthorizers")]),t._v("). If the array is left empty then all requests\nwill be accepted by the Airnode but still could be filtered by the another\nmethod of authorization,\n"),s("RouterLink",{attrs:{to:"/airnode/v0.8/grp-providers/guides/build-an-airnode/api-security.html#relayed-meta-data-security-schemes"}},[t._v("Relayed Meta Data Security Schemes")]),t._v(".")],1),t._v(" "),s("div",{staticClass:"language-json line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n ...\n "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"chains"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("                   Scheme type requesterEndpointAuthorizers lists\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("        on-chain authorizer contract addresses\n      ...               such as RequesterAuthorizerWithAirnode\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"authorizers"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("  ⬇︎\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"requesterEndpointAuthorizers"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Requests must satisfy at least")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0xeabb...C123"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("                 "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// one of the authorizer contracts")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0xCE5e...1abc"')]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      ...\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"authorizers"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"requesterEndpointAuthorizers"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// All requests will be processed")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"3"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      ...\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"authorizers"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"requesterEndpointAuthorizers"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Requests must satisfy a")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0xeabb...C123"')]),t._v("                  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// single authorizer contract")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n   "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br"),s("span",{staticClass:"line-number"},[t._v("17")]),s("br"),s("span",{staticClass:"line-number"},[t._v("18")]),s("br"),s("span",{staticClass:"line-number"},[t._v("19")]),s("br"),s("span",{staticClass:"line-number"},[t._v("20")]),s("br"),s("span",{staticClass:"line-number"},[t._v("21")]),s("br"),s("span",{staticClass:"line-number"},[t._v("22")]),s("br"),s("span",{staticClass:"line-number"},[t._v("23")]),s("br"),s("span",{staticClass:"line-number"},[t._v("24")]),s("br"),s("span",{staticClass:"line-number"},[t._v("25")]),s("br"),s("span",{staticClass:"line-number"},[t._v("26")]),s("br"),s("span",{staticClass:"line-number"},[t._v("27")]),s("br"),s("span",{staticClass:"line-number"},[t._v("28")]),s("br"),s("span",{staticClass:"line-number"},[t._v("29")]),s("br"),s("span",{staticClass:"line-number"},[t._v("30")]),s("br"),s("span",{staticClass:"line-number"},[t._v("31")]),s("br")])]),s("h2",{attrs:{id:"requesterauthorizerwithairnode"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#requesterauthorizerwithairnode"}},[t._v("#")]),t._v(" RequesterAuthorizerWithAirnode")]),t._v(" "),s("p",[t._v("A common use case for an authorizer is the\n"),s("RouterLink",{attrs:{to:"/airnode/v0.8/concepts/authorizers.html#requesterauthorizerwithairnode"}},[t._v("RequesterAuthorizerWithAirnode")]),t._v("\nauthorizer contract developed for Airnode operators to use right out-of-the-box.\nIt allows the whitelisting of requester contracts (with or without expiration\ntimestamps) on a per endpoint basis. Endpoints are declared in the\n"),s("code",[t._v("ois.endpoints")]),t._v(" field of the "),s("code",[t._v("config.json")]),t._v(" file. This is the most common use\ncase and can be implemented with the following steps:")],1),t._v(" "),s("ol",[s("li",[t._v("Add the RequesterAuthorizerWithAirnode\n"),s("RouterLink",{attrs:{to:"/airnode/v0.8/reference/airnode-addresses.html#requesterauthorizerwithairnode"}},[t._v("authorizer contract address")]),t._v("\nto the array "),s("code",[t._v("chains[n].authorizers.requesterEndpointAuthorizers")]),t._v(".")],1),t._v(" "),s("li",[t._v("After your Airnode is deployed, call the Admin CLI command\n"),s("RouterLink",{attrs:{to:"/airnode/v0.8/reference/packages/admin-cli.html#set-whitelist-expiration"}},[t._v("set-whitelist-expiration")]),t._v("\nto add the desired requester contract addresses to the whitelist maintained\nby RequesterAuthorizerWithAirnode.")],1)]),t._v(" "),s("p",[t._v("Once implemented, only requester contract addresses you have added to\nRequesterAuthorizerWithAirnode will have access to your Airnode.")])],1)}),[],!1,null,null,null);e.default=a.exports}}]);