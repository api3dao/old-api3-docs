(window.webpackJsonp=window.webpackJsonp||[]).push([[119],{1076:function(e,s,t){"use strict";t.r(s);var o=t(9),r=Object(o.a)({},(function(){var e=this,s=e.$createElement,o=e._self._c||s;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("TitleSpan",[e._v(e._s(e.$frontmatter.folder))]),e._v(" "),o("h1",{attrs:{id:"frontmatter-title"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#frontmatter-title"}},[e._v("#")]),e._v(" "+e._s(e.$frontmatter.title))]),e._v(" "),o("VersionWarning"),e._v(" "),o("TocHeader"),e._v(" "),o("TOC",{staticClass:"table-of-contents",attrs:{"include-level":[2,3]}}),e._v(" "),o("p",[e._v("A sponsor is an entity (individual, business, etc.). Sponsors create\nrelationships between "),o("RouterLink",{attrs:{to:"/airnode/v0.4/concepts/requester.html"}},[e._v("requesters")]),e._v(" and\n"),o("RouterLink",{attrs:{to:"/airnode/v0.4/concepts/sponsor.html#sponsorwallet"}},[e._v("sponsorWallets")]),e._v(". They do so by sponsoring requesters\nand deriving sponsorWallets for Airnodes they want their requesters to call.")],1),e._v(" "),o("blockquote",[o("p",[o("img",{attrs:{src:t(593),alt:"relationships"}})])]),e._v(" "),o("p",[e._v("Making the relationship:")]),e._v(" "),o("ul",[o("li",[e._v('A sponsor "sponsors" a requester.')]),e._v(" "),o("li",[e._v('A sponsor "derives" a '),o("RouterLink",{attrs:{to:"/airnode/v0.4/concepts/sponsor.html#sponsorwallet"}},[e._v("sponsorWallet")]),e._v(" for a desired\nAirnode.")],1)]),e._v(" "),o("p",[e._v("Making a request.")]),e._v(" "),o("ol",[o("li",[e._v('The now "sponsored" requester makes a '),o("RouterLink",{attrs:{to:"/airnode/v0.4/concepts/request.html"}},[e._v("request")]),e._v(" of an Airnode.\nParameters passed to the Airnode include the "),o("code",[e._v("sponsorAddress")]),e._v(" and the\n"),o("code",[e._v("sponsorWalletAddress")]),e._v(".")],1),e._v(" "),o("li",[e._v("The Airnode verifies that the sponsor of the requester is the sponsor that\nderived the "),o("code",[e._v("sponsorWallet")]),e._v(" associated with the Airnode.")]),e._v(" "),o("li",[e._v("The Airnode uses the respective sponsor's "),o("code",[e._v("sponsorWallet")]),e._v(" to fulfill the\nrequest, meaning that the sponsor covers the gas cost.")])]),e._v(" "),o("p",[e._v("How a requester refers to the sponsor.")]),e._v(" "),o("ol",[o("li",[o("p",[e._v("A requester can have multiple sponsors that have sponsored it. While making a\nrequest, the requester provides the "),o("code",[e._v("sponsorAddress")]),e._v(" that it wants to have\nthe request fulfilled by. The AirnodeRrp.sol protocol contract checks if the\nrequester is sponsored, and if so, emits the request event.")])]),e._v(" "),o("li",[o("p",[e._v("Next Airnode derives the "),o("code",[e._v("sponsorWallet")]),e._v(" address using the provided\n"),o("code",[e._v("sponsorAddress")]),e._v(", then checks if this matches "),o("code",[e._v("sponsorWallet")]),e._v(". Airnode will\nignore the request if the two do not match. This is done this way because\nderiving the "),o("code",[e._v("sponsorWallet")]),e._v(" address from the "),o("code",[e._v("sponsorAddress")]),e._v(" on-chain is\nnot feasible.")])])]),e._v(" "),o("h2",{attrs:{id:"sponsoraddress"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#sponsoraddress"}},[e._v("#")]),e._v(" sponsorAddress")]),e._v(" "),o("p",[e._v("A sponsor is identified by a "),o("code",[e._v("sponsorAddress")]),e._v(" which is usually the default\naccount "),o("code",[e._v("m/44'/60'/0'/0/0")]),e._v(" of a BIP 44 wallet owned by the sponsor. The sponsor\ncan use a different address from the wallet if desired such as\n"),o("code",[e._v("m/44'/60'/0'/0/2")]),e._v(".")]),e._v(" "),o("p",[e._v("Note that a sponsor could use multiple addresses from multiple wallets. Below\nare some example reasons why one would want to have multiple "),o("code",[e._v("sponsorAddress")]),e._v("\nidentities on-chain:")]),e._v(" "),o("ul",[o("li",[e._v("To keep separate "),o("code",[e._v("sponsorWallets")]),e._v(" for two separate use-cases for easier\naccounting.")]),e._v(" "),o("li",[e._v("To duplicate transaction queues for a single use-case and increase response\nthroughput.")])]),e._v(" "),o("h2",{attrs:{id:"sponsorwallet"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#sponsorwallet"}},[e._v("#")]),e._v(" sponsorWallet")]),e._v(" "),o("p",[e._v("Each "),o("RouterLink",{attrs:{to:"/airnode/v0.4/concepts/airnode.html"}},[e._v("Airnode")]),e._v(" can keep a unique"),o("code",[e._v("sponsorWallet")]),e._v(" for a sponsor. The\nwallet is identified by a "),o("code",[e._v("sponsorAddress/airnodeAddress")]),e._v(" pair. A sponsor must\ntake action to "),o("a",{attrs:{href:"#derive-a-sponsor-wallet"}},[e._v("derive")]),e._v(" a "),o("code",[e._v("sponsorWallet")]),e._v(" for a\nparticular Airnode. "),o("RouterLink",{attrs:{to:"/airnode/v0.4/concepts/requester.html"}},[e._v("Requesters")]),e._v(", that have been sponsored by a\nsponsor, can specify their requests be fulfilled by the "),o("code",[e._v("sponsorWallet")]),e._v("\ndesignated to the sponsor. This allows the sponsor to cover the gas cost of\nrequest fulfillments by the Airnode since the sponsor must send funds to this\nwallet before making the request.")],1),e._v(" "),o("p",[e._v("Requests from the same "),o("code",[e._v("sponsorWallet")]),e._v(" are performed sequentially to respect the\ntransaction nonce. A single Airnode run will only attempt to serve five oldest\nrequests to prevent timeout issues. For high volatility use cases it is\nrecommended to use multiple sponsors (and thus sponsor wallets) as the requests\nfrom different sponsor wallets are performed in parallel.")]),e._v(" "),o("div",{staticClass:"custom-block tip"},[o("p",{staticClass:"custom-block-title"},[e._v("Wallet and Protocols")]),e._v(" "),o("p",[e._v("A sponsorWallet derived for a particular sponsor depends on the Airnode protocol\n(RRP, the forthcoming PSP protocol, etc.). This means that a sponsorWallet\naddress derived for a particular sponsor will be different for each protocol.\nThis is intentional and allows a particular sponsor to only fund a particular\nprotocol (e.g. only RRP).")])]),e._v(" "),o("h3",{attrs:{id:"derivation-path"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#derivation-path"}},[e._v("#")]),e._v(" Derivation Path")]),e._v(" "),o("p",[e._v("Each sponsor is identified by a "),o("code",[e._v("sponsorAddress")]),e._v(", and their sponsor wallets are\ndesignated implicitly by a derivation path. For the RRP protocol the derivation\npath for a "),o("code",[e._v("sponsorWallet")]),e._v(" starts with "),o("code",[e._v("m/44'/60'/0'/1/...")]),e._v(". Other branches will\nbe used to derive the sponsor wallets for other protocols.")]),e._v(" "),o("div",{staticClass:"custom-block warning"},[o("p",{staticClass:"custom-block-title"},[e._v("Understanding Derivation Paths")]),e._v(" "),o("p",[e._v("It is not important to understand derivation paths, you can simply use the\naddresses the admin CLI derives for you.")])]),e._v(" "),o("p",[e._v("The general path for connecting to the base Ethereum set of addresses looks like\nthis: "),o("code",[e._v("m/44’/60’/0’/0")]),e._v(". This sequence is broken down into different sections and\nchanges based on what is being worked with. The sequence goes:\n"),o("code",[e._v("m’ / purpose’ / coin_type’ / account’ / change / address_index")]),e._v(". The "),o("code",[e._v("change")]),e._v("\npart of the BIP44 derivation path is used to determine which protocol a sponsor\nwallet path will be for. Here ("),o("code",[e._v("m/44'/60'/0'/1/...")]),e._v(") has been reserved for the\nRRP protocol where the value of "),o("code",[e._v("change")]),e._v(" is 1.")]),e._v(" "),o("p",[e._v("An Ethereum address is 20 bytes-long, which makes it 160 bits. Each index in the\nHD wallet non-hardened derivation path goes up to 2^31. This requires the\ndivision of these 160 bits into six 31 bit-long chunks, therefore derivation\npath for a sponsor wallet of a requester using the RRP protocol would be:")]),e._v(" "),o("div",{staticClass:"language-sh line-numbers-mode"},[o("pre",{pre:!0,attrs:{class:"language-sh"}},[o("code",[e._v("m/44"),o("span",{pre:!0,attrs:{class:"token string"}},[e._v("'/60'")]),e._v("/0'/1/"),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("..")]),e._v(".\n  /1st least significant "),o("span",{pre:!0,attrs:{class:"token number"}},[e._v("31")]),e._v("-bits of the sponsor address "),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("sponsor "),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v("&&")]),e._v(" 0x7FFFFFFF"),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("…\n  /2nd least significant "),o("span",{pre:!0,attrs:{class:"token number"}},[e._v("31")]),e._v("-bits of the sponsor address "),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("sponsor "),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">>")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token number"}},[e._v("31")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v("&&")]),e._v(" 0x7FFFFFFF"),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("…\n  /3rd least significant "),o("span",{pre:!0,attrs:{class:"token number"}},[e._v("31")]),e._v("-bits of the sponsor address "),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("sponsor "),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">>")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token number"}},[e._v("62")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v("&&")]),e._v(" 0x7FFFFFFF"),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("…\n  /4th least significant "),o("span",{pre:!0,attrs:{class:"token number"}},[e._v("31")]),e._v("-bits of the sponsor address "),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("sponsor "),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">>")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token number"}},[e._v("93")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v("&&")]),e._v(" 0x7FFFFFFF"),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("…\n  /5th least significant "),o("span",{pre:!0,attrs:{class:"token number"}},[e._v("31")]),e._v("-bits of the sponsor address "),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("sponsor "),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">>")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token number"}},[e._v("124")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v("&&")]),e._v(" 0x7FFFFFFF"),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("…\n  /6th least significant "),o("span",{pre:!0,attrs:{class:"token number"}},[e._v("31")]),e._v("-bits of the sponsor address "),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("sponsor "),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">>")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token number"}},[e._v("155")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v("&&")]),e._v(" 0x7FFFFFFF"),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n")])]),e._v(" "),o("div",{staticClass:"line-numbers-wrapper"},[o("span",{staticClass:"line-number"},[e._v("1")]),o("br"),o("span",{staticClass:"line-number"},[e._v("2")]),o("br"),o("span",{staticClass:"line-number"},[e._v("3")]),o("br"),o("span",{staticClass:"line-number"},[e._v("4")]),o("br"),o("span",{staticClass:"line-number"},[e._v("5")]),o("br"),o("span",{staticClass:"line-number"},[e._v("6")]),o("br"),o("span",{staticClass:"line-number"},[e._v("7")]),o("br")])]),o("p",[e._v("Anyone can use the xpub that the Airnode has announced (through off-chain\nchannels) and the sponsor's "),o("code",[e._v("sponsorAddress")]),e._v(" to derive a "),o("code",[e._v("sponsorWalletAddress")]),e._v("\nfor a specific Airnode–sponsor pair. In other words, a sponsor can calculate the\naddress of their respective sponsor wallet for an Airnode and have requesters\nuse it to make requests right away.")]),e._v(" "),o("h3",{attrs:{id:"gas-costs"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#gas-costs"}},[e._v("#")]),e._v(" Gas Costs")]),e._v(" "),o("p",[e._v("Although the "),o("code",[e._v("sponsorWallet")]),e._v(" scheme allows the sponsor to cover the fulfillment\ngas costs, it is just as easy to have the Airnode cover the gas costs. In this\ncase the Airnode funds the "),o("code",[e._v("sponsorWallet")]),e._v(", instead of the sponsor. Furthermore,\nthis scheme allows hybrid use-cases where the Airnode covers the fulfillment gas\ncosts for one sponsor (e.g., because they have made a special service agreement\nwith them), while requiring others to cover their own fulfillment gas costs.")]),e._v(" "),o("h3",{attrs:{id:"trusting-the-sponsorwallet"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#trusting-the-sponsorwallet"}},[e._v("#")]),e._v(" Trusting the "),o("code",[e._v("sponsorWallet")])]),e._v(" "),o("airnode-SponsorWalletWarning"),e._v(" "),o("p",[e._v("The risk mentioned above becomes negligible when:")]),e._v(" "),o("ol",[o("li",[e._v("The Airnode is a first-party oracle, because first-party oracles are\ntrustworthy")]),e._v(" "),o("li",[e._v("The Airnode is being used for a high value use-case, which already implies a\nhigh level of trust")])]),e._v(" "),o("p",[e._v("If the sponsor does not trust the Airnode at all, they can fund the sponsor\nwallet just enough to cover a single fulfillment for each request to the\nAirnode. Therefore, this scheme both supports the traditional per-call payments,\nbut also allows the protocol to leverage the trustworthiness of Airnodes to\nreduce unnecessary gas costs caused by microtransactions.")]),e._v(" "),o("h3",{attrs:{id:"withdrawals"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#withdrawals"}},[e._v("#")]),e._v(" Withdrawals")]),e._v(" "),o("p",[e._v("If the sponsor decides not to use a particular "),o("code",[e._v("sponsorWallet")]),e._v(" going forward,\nthey can make a request to withdraw funds from it, see the\n"),o("RouterLink",{attrs:{to:"/airnode/v0.4/reference/packages/admin-cli.html#request-withdrawal"}},[e._v("request-withdrawal")]),e._v("\ncommand. The Airnode listens for withdrawal requests and fulfills them\nautomatically. Therefore, the sponsor should be able to receive their funds from\ntheir "),o("code",[e._v("sponsorWallet")]),e._v(" in a few minutes notice. The "),o("code",[e._v("sponsorWallet")]),e._v(" does not get\ndeleted, and can be used in the future simply by funding it again.")],1),e._v(" "),o("h2",{attrs:{id:"sponsoring-a-requester"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#sponsoring-a-requester"}},[e._v("#")]),e._v(" Sponsoring a Requester")]),e._v(" "),o("p",[e._v("A sponsor specifies the public address ("),o("code",[e._v("sponsorAddress")]),e._v(") of an account from a\nmnemonic it owns and the on-chain "),o("code",[e._v("requesterAddress")]),e._v(' of a requester to "sponsor\na requester". This sponsorship is know to have, and be defined by, a\n'),o("code",[e._v("sponsorAddress/requesterAddress")]),e._v(" pair.")]),e._v(" "),o("p",[e._v("This sponsorship allows the requester to use the sponsor's "),o("code",[e._v("sponsorWallet")]),e._v(" for a\nparticular Airnode to cover gas costs incurred by the Airnode in response to a\nrequest. Learn more about\n"),o("RouterLink",{attrs:{to:"/airnode/v0.2/grp-developers/requesters-sponsors.html"}},[e._v("sponsorships")]),e._v(".")],1),e._v(" "),o("p",[e._v("Use the "),o("RouterLink",{attrs:{to:"/airnode/v0.4/reference/packages/admin-cli.html#sponsor-requester"}},[e._v("Admin CLI tool")]),e._v("\nto sponsor a requester. An example can be seem in the\n"),o("RouterLink",{attrs:{to:"/airnode/v0.4/grp-developers/requesters-sponsors.html#how-to-sponsor-a-requester"}},[e._v("Requesters and Sponsors")]),e._v("\ndoc.")],1),e._v(" "),o("h2",{attrs:{id:"derive-a-sponsor-wallet"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#derive-a-sponsor-wallet"}},[e._v("#")]),e._v(" Derive a Sponsor Wallet")]),e._v(" "),o("p",[e._v("When a sponsor wishes to access an Airnode (via a requester) it must create a\n"),o("code",[e._v("sponsorWallet")]),e._v(" for the Airnode. Requesters that have been sponsored by the same\nsponsor, can specify their requests be fulfilled by the "),o("code",[e._v("sponsorWallet")]),e._v("\nbelonging to the sponsor. A sponsor uses a\n"),o("RouterLink",{attrs:{to:"/airnode/v0.4/concepts/sponsor.html#sponsoraddress"}},[e._v("sponsorAddress")]),e._v(" and the "),o("RouterLink",{attrs:{to:"/airnode/v0.4/concepts/airnode.html#xpub"}},[e._v("xpub")]),e._v(" of a\nparticular Airnode to derive a "),o("a",{attrs:{href:"#sponsorwallet"}},[e._v("sponsorWallet")]),e._v(" for the Airnode.\nThe sponsor must also provide the "),o("RouterLink",{attrs:{to:"/airnode/v0.4/concepts/airnode.html#airnodeaddress"}},[e._v("airnodeAddress")]),e._v("\nbecause it will be used to verify that the provided "),o("code",[e._v("xpub")]),e._v(" belongs to the\nAirnode wallet before deriving a child sponsor wallet address.")],1),e._v(" "),o("p",[e._v("Use the\n"),o("RouterLink",{attrs:{to:"/airnode/v0.4/reference/packages/admin-cli.html#derive-sponsor-wallet-address"}},[e._v("Admin CLI tool")]),e._v("\nto derive a "),o("code",[e._v("sponsorWallet")]),e._v(". An example can be seem in the\n"),o("RouterLink",{attrs:{to:"/airnode/v0.4/grp-developers/requesters-sponsors.html#how-to-derive-a-sponsor-wallet"}},[e._v("Requesters and Sponsors")]),e._v("\ndoc.")],1)],1)}),[],!1,null,null,null);s.default=r.exports},593:function(e,s,t){e.exports=t.p+"assets/img/concepts-sponsor-relationships.190471f2.png"}}]);