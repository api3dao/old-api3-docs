(window.webpackJsonp=window.webpackJsonp||[]).push([[564],{1275:function(t,n,e){"use strict";e.r(n);var s=e(9),a=Object(s.a)({},(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("TitleSpan",[t._v(t._s(t.$frontmatter.folder))]),t._v(" "),e("h1",{attrs:{id:"frontmatter-title"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#frontmatter-title"}},[t._v("#")]),t._v(" "+t._s(t.$frontmatter.title))]),t._v(" "),e("VersionWarning"),t._v(" "),e("TocHeader"),t._v(" "),e("TOC",{staticClass:"table-of-contents",attrs:{"include-level":[2,3]}}),t._v(" "),e("p",[t._v("Airnode serves an API to a blockchain according to\n"),e("RouterLink",{attrs:{to:"/ois/v1.0/"}},[t._v("Oracle Integration Specifications (OIS)")]),t._v(". An API is composed of\n"),e("RouterLink",{attrs:{to:"/ois/v1.0/ois.html#_5-2-operation"}},[t._v("operations")]),t._v(", which represent individual\nfunctionalities that an API offers. OIS maps each API operation to an\n"),e("RouterLink",{attrs:{to:"/ois/v1.0/ois.html#_5-endpoints"}},[t._v("endpoint")]),t._v(", which can be thought of as an Airnode\noperation. The endpoints that an Airnode will serve over the request–response\nprotocol are listed under\n"),e("RouterLink",{attrs:{to:"/airnode/v0.7/reference/deployment-files/config-json.html#triggers"}},[t._v("triggers")]),t._v(" of\n"),e("RouterLink",{attrs:{to:"/airnode/v0.7/reference/deployment-files/config-json.html"}},[t._v("config.json")]),t._v(".")],1),t._v(" "),e("h2",{attrs:{id:"endpointid"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#endpointid"}},[t._v("#")]),t._v(" "),e("code",[t._v("endpointId")])]),t._v(" "),e("p",[e("code",[t._v("endpointId")]),t._v(" identifies specific endpoints that an Airnode serves, and is\ncomputed in JS (using ethers.js) as follows:")]),t._v(" "),e("div",{staticClass:"language-js line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[t._v("ethers"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("utils"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("keccak256")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n  ethers"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("utils"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("defaultAbiCoder"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("encode")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'string'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'string'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("oisTitle"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" endpointName"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br"),e("span",{staticClass:"line-number"},[t._v("4")]),e("br"),e("span",{staticClass:"line-number"},[t._v("5")]),e("br"),e("span",{staticClass:"line-number"},[t._v("6")]),e("br")])]),e("p",[t._v("An alternative method to create an "),e("code",[t._v("endpointId")]),t._v(" is to use the\n"),e("RouterLink",{attrs:{to:"/airnode/v0.7/reference/packages/admin-cli.html"}},[t._v("Admin CLI")]),t._v(" to derive the endpoint ID.")],1),t._v(" "),e("p",[t._v("Note that this means that an "),e("code",[t._v("endpointId")]),t._v(" is not unique, and two Airnodes can\nserve equivalent endpoints using the same ID (in fact, this is the desired\noutcome).This is not an issue, as requests are made with a "),e("code",[t._v("airnode")]),t._v(" (Airnode's\n"),e("code",[t._v("address")]),t._v(") and "),e("code",[t._v("endpointId")]),t._v(" pair.")]),t._v(" "),e("p",[t._v("This convention of determining an "),e("code",[t._v("endpointId")]),t._v(" is not enforced at the\nprotocol-level. For example, one could choose to generate an "),e("code",[t._v("endpointId")]),t._v("\nrandomly, and as long as requesters use the correct "),e("code",[t._v("endpointId")]),t._v(", this will not\nbe an issue.")]),t._v(" "),e("h2",{attrs:{id:"authorizers"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#authorizers"}},[t._v("#")]),t._v(" Authorizers")]),t._v(" "),e("p",[t._v("Airnodes can assign a list of authorizers to their endpoints. See the section\n"),e("RouterLink",{attrs:{to:"/airnode/v0.7/concepts/authorization.html"}},[t._v("Authorizer")]),t._v(" for more information.")],1)],1)}),[],!1,null,null,null);n.default=a.exports}}]);