(window.webpackJsonp=window.webpackJsonp||[]).push([[263],{879:function(e,n,a){"use strict";a.r(n);var s=a(9),t=Object(s.a)({},(function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("TitleSpan",[e._v(e._s(e.$frontmatter.folder))]),e._v(" "),a("h1",{attrs:{id:"frontmatter-title"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#frontmatter-title"}},[e._v("#")]),e._v(" "+e._s(e.$frontmatter.title))]),e._v(" "),a("VersionWarning"),e._v(" "),a("TocHeader"),e._v(" "),a("TOC",{staticClass:"table-of-contents",attrs:{"include-level":[2,3]}}),e._v(" "),a("p",[e._v("Airnode is a serverless oracle node implemented with a "),a("em",[e._v('"set and forget"')]),e._v(" "),a("RouterLink",{attrs:{to:"/airnode/v0.10/grp-providers/airnode/design-philosophy.html"}},[e._v("philosophy")]),e._v(".")],1),e._v(" "),a("p",[e._v("An Airnode is capable of serving one or more APIs to\n"),a("RouterLink",{attrs:{to:"/airnode/v0.10/concepts/requester.html"}},[e._v("requesters")]),e._v(" (which are on-chain smart contracts) that request\ndata served by a particular Airnode. Each and every Airnode has a\n"),a("RouterLink",{attrs:{to:"/airnode/v0.10/grp-providers/guides/build-an-airnode/configuring-airnode.html#airnodewalletmnemonic"}},[e._v("unique mnemonic")]),e._v("\nidentifying its wallet. This mnemonic is kept secret and Airnode is publicly\nidentified using the default "),a("RouterLink",{attrs:{to:"/airnode/v0.10/concepts/airnode.html#airnodeaddress"}},[e._v("address")]),e._v(" derived from\nthe mnemonic.")],1),e._v(" "),a("h2",{attrs:{id:"airnodeaddress"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#airnodeaddress"}},[e._v("#")]),e._v(" "),a("code",[e._v("airnodeAddress")])]),e._v(" "),a("p",[e._v("An Airnode is identified by the default address of a BIP 44 wallet (with the\npath "),a("code",[e._v("m/44'/60'/0'/0/0")]),e._v(") which is referred to as the "),a("code",[e._v("airnodeAddress")]),e._v(". This\naddress is same for all chains on which Airnode operates. The wallet mnemonic is\nspecified in the "),a("RouterLink",{attrs:{to:"/airnode/v0.10/reference/deployment-files/secrets-env.html"}},[e._v("secrets.env")]),e._v("\nfile when deploying the Airnode.")],1),e._v(" "),a("p",[e._v("Use the admin CLI command\n"),a("RouterLink",{attrs:{to:"/airnode/v0.10/reference/packages/admin-cli.html#derive-airnode-address"}},[e._v("derive-airnode-address")]),e._v("\nto derive the "),a("code",[e._v("airnodeAddress")]),e._v(" from the mnemonic for informational purposes.")],1),e._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("npx @api3/airnode-admin derive-airnode-address "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n--airnode-mnemonic "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"cricket elephant ..."')]),e._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# outputs")]),e._v("\nAirnode address: 0xaBd9"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("..")]),e._v(".\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br")])]),a("h2",{attrs:{id:"xpub"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#xpub"}},[e._v("#")]),e._v(" "),a("code",[e._v("xpub")])]),e._v(" "),a("p",[e._v("The Airnode owner announces the "),a("em",[e._v("extended public key")]),e._v(" ("),a("code",[e._v("xpub")]),e._v(" of the hardened\nderivation path "),a("code",[e._v("m/44'/60'/0'")]),e._v(") off-chain. Then a sponsor derives a\n"),a("RouterLink",{attrs:{to:"/airnode/v0.10/concepts/sponsor.html#sponsorwallet"}},[e._v("sponsor wallet")]),e._v(" for the Airnode using the "),a("code",[e._v("xpub")]),e._v(" and\n"),a("code",[e._v("airnodeAddress")]),e._v(". The sponsor wallet will then be used by the Airnode to fulfill\nrequests made by the sponsor's contracts.")],1),e._v(" "),a("p",[e._v("Use the admin CLI command\n"),a("RouterLink",{attrs:{to:"/airnode/v0.10/reference/packages/admin-cli.html#derive-airnode-xpub"}},[e._v("derive-airnode-xpub")]),e._v(" to\nget the "),a("code",[e._v("xpub")]),e._v(" of an Airnode by passing the same mnemonic used to create the\n"),a("code",[e._v("airnodeAddress")]),e._v(".")],1),e._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("npx @api3/airnode-admin derive-airnode-xpub "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n--airnode-mnemonic "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"cricket elephant ..."')]),e._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# outputs")]),e._v("\nAirnode xpub: xpub6CUGRUo"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("..")]),e._v(".\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br")])]),a("h2",{attrs:{id:"admin-cli-generate-airnode-mnemonic"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#admin-cli-generate-airnode-mnemonic"}},[e._v("#")]),e._v(" Admin CLI: "),a("code",[e._v("generate-airnode-mnemonic")])]),e._v(" "),a("p",[e._v("The\n"),a("RouterLink",{attrs:{to:"/airnode/v0.10/reference/packages/admin-cli.html#generate-airnode-mnemonic"}},[e._v("generate-airnode-mnemonic")]),e._v("\ncommand is useful because it will generate a mnemonic as well as return the\n"),a("code",[e._v("airnodeAddress")]),e._v(" and "),a("code",[e._v("xpub")]),e._v(".")],1),e._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("npx @api3/airnode-admin generate-airnode-mnemonic\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# output")]),e._v("\nThis mnemonic is created locally on your machine using "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"ethers.Wallet.createRandom"')]),e._v(" under the hood.\nMake sure to back it up securely, e.g., by writing it down on a piece of paper:\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("############################## MNEMONIC ###############################")]),e._v("\n\ncricket elephant "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("..")]),e._v(".\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("############################## MNEMONIC ###############################")]),e._v("\n\nThe Airnode address "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("for")]),e._v(" this mnemonic is: 0xaBd9"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("..")]),e._v(".\nThe Airnode xpub "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("for")]),e._v(" this mnemonic is: xpub6CUGRUo"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("..")]),e._v(".\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br"),a("span",{staticClass:"line-number"},[e._v("12")]),a("br"),a("span",{staticClass:"line-number"},[e._v("13")]),a("br"),a("span",{staticClass:"line-number"},[e._v("14")]),a("br")])]),a("h2",{attrs:{id:"verification"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#verification"}},[e._v("#")]),e._v(" Verification")]),e._v(" "),a("p",[e._v("The "),a("code",[e._v("xpub")]),e._v(" that the Airnode owner has announced is not verified on-chain. A\nsponsor can verify the "),a("code",[e._v("xpub")]),e._v(" off-chain. Use the admin CLI command\n"),a("RouterLink",{attrs:{to:"/airnode/v0.10/reference/packages/admin-cli.html#verify-airnode-xpub"}},[e._v("verify-xpub")]),e._v(" command\nfrom the admin CLI.")],1),e._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("npx @api3/airnode-admin verify-airnode-xpub "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n--airnode-xpub xpub6CUGRUo"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("..")]),e._v(". "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n--airnode-address 0xaBd9"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("..")]),e._v(".\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# output")]),e._v("\nAirnode xpub is: VALID\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br")])])],1)}),[],!1,null,null,null);n.default=t.exports}}]);