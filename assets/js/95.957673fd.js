(window.webpackJsonp=window.webpackJsonp||[]).push([[95],{559:function(e,t,a){e.exports=a.p+"assets/img/developer-overview.1d5f1fb5.png"},959:function(e,t,a){"use strict";a.r(t);var r=a(9),o=Object(r.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("TitleSpan",[e._v(e._s(e.$frontmatter.folder))]),e._v(" "),r("h1",{attrs:{id:"frontmatter-title"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#frontmatter-title"}},[e._v("#")]),e._v(" "+e._s(e.$frontmatter.title))]),e._v(" "),r("VersionWarning"),e._v(" "),r("p",[e._v("A "),r("strong",[e._v("Developer")]),e._v(" is you, if you wish to consume off-chain data from APIs. You do\nso using Airnodes. An Airnode is a first-party oracle that will push off-chain\nAPI data to your on-chain contract. In the diagram below your contract is called\na requester. It will make a request to the on-chain RRP protocol contract\n(AirnodeRrp.sol) that will add the request to the event logs. The off-chain\nAirnode will access the event logs, get the API data and perform a callback to\nthe requester.")]),e._v(" "),r("p",[e._v("In summary you only need to do two things.")]),e._v(" "),r("ul",[r("li",[e._v("Call "),r("code",[e._v("makeFullRequest()")]),e._v(" or "),r("code",[e._v("makeTemplateRequest()")]),e._v(" on the AirnodeRrp.sol\ncontract which returns a "),r("RouterLink",{attrs:{to:"/airnode/v0.2/concepts/request.html#requestid"}},[r("code",[e._v("requestId")])]),e._v(".")],1),e._v(" "),r("li",[e._v("Add a "),r("code",[e._v("myFulfill()")]),e._v(" function (call it what you like) to your requester (your\ncontract) where the off-chain Airnode can send the requested data when ready.\nThe data includes the same "),r("code",[e._v("requestId")]),e._v(" returned when the request was made.")])]),e._v(" "),r("blockquote",[r("p",[r("img",{attrs:{src:a(559),alt:"call"}})]),e._v(" "),r("ol",[r("li",[r("p",{staticClass:"diagram-line",staticStyle:{color:"black"}},[e._v("The requester (myContract.sol) makes a request to the RRP protocol contract (AirnodeRrp.sol) by calling `makeFullRequest()` which adds the request to the event logs and returns a requestId to the requester.")])]),e._v(" "),r("li",[r("p",{staticClass:"diagram-line",staticStyle:{color:"black"}},[e._v("Airnode retrieves the on-chain request from the event logs.")])]),e._v(" "),r("li",[r("p",{staticClass:"diagram-line",staticStyle:{color:"green"}},[e._v("Airnode gathers response data from the API specified in the request.")])]),e._v(" "),r("li",[r("p",{staticClass:"diagram-line",staticStyle:{color:"blue"}},[e._v("Airnode performs a callback to a named function `myFulfill()` in myContract.sol via the AirnodeRrp.sol function `fulfill()` with the requested data and the requestId.")])])])]),e._v(" "),r("p",[e._v("For a more detailed diagram see the first image in the\n"),r("RouterLink",{attrs:{to:"/airnode/v0.2/grp-developers/call-an-airnode.html"}},[e._v("Calling an Airnode")]),e._v(" doc.")],1)],1)}),[],!1,null,null,null);t.default=o.exports}}]);