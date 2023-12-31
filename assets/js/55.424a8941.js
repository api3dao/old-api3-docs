(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{1017:function(e,s,r){"use strict";r.r(s);var t=r(9),o=Object(t.a)({},(function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("TitleSpan",[e._v(e._s(e.$frontmatter.folder))]),e._v(" "),t("h1",{attrs:{id:"frontmatter-title"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#frontmatter-title"}},[e._v("#")]),e._v(" "+e._s(e.$frontmatter.title))]),e._v(" "),t("VersionWarning"),e._v(" "),t("TocHeader"),e._v(" "),t("TOC",{staticClass:"table-of-contents",attrs:{"include-level":[2,3]}}),e._v(" "),t("p",[e._v("As a developer it helps to understand what a "),t("strong",[e._v("requester")]),e._v(" is and what a\n"),t("strong",[e._v("sponsor")]),e._v(" does. They are both important parts of the Airnode ecosystem. This\ndoc will further define them and walk you through the process of sponsoring a\nrequester and deriving a sponsor wallet using the admin CLI commands.")]),e._v(" "),t("h2",{attrs:{id:"what-is-a-requester"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#what-is-a-requester"}},[e._v("#")]),e._v(" What is a Requester?")]),e._v(" "),t("p",[e._v("The term "),t("RouterLink",{attrs:{to:"/airnode/v0.3/concepts/requester.html"}},[e._v("requester")]),e._v(" is important to remember. When\nrequester is mentioned, the reference is to your smart contract that calls an\nAirnode.")],1),e._v(" "),t("blockquote",[t("p",[t("img",{attrs:{src:r(577),alt:"image"}})])]),e._v(" "),t("p",[e._v("As an example see the "),t("code",[e._v("myContract.sol")]),e._v(" contract in the diagram within the\n"),t("RouterLink",{attrs:{to:"/airnode/v0.3/grp-developers/"}},[e._v("Overview")]),e._v(" doc, it is a requester.")],1),e._v(" "),t("h2",{attrs:{id:"what-is-a-sponsor"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#what-is-a-sponsor"}},[e._v("#")]),e._v(" What is a Sponsor?")]),e._v(" "),t("p",[e._v("Equally important is the term "),t("RouterLink",{attrs:{to:"/airnode/v0.3/concepts/sponsor.html"}},[e._v("sponsor")]),e._v(". A sponsor is an\nentity such as yourself, an organization, etc. Sponsors create relationships\nbetween requesters and Airnodes.")],1),e._v(" "),t("h3",{attrs:{id:"sponsor-s-requester-airnode-relationships"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#sponsor-s-requester-airnode-relationships"}},[e._v("#")]),e._v(" Sponsor's Requester/Airnode Relationships")]),e._v(" "),t("p",[e._v('As a sponsor you will use the public address from an account within a mnemonic\nyou own to "'),t("strong",[e._v("sponsor a requester")]),e._v('" and then use the public address (now know\nas a '),t("RouterLink",{attrs:{to:"/airnode/v0.3/concepts/sponsor.html#sponsoraddress"}},[e._v("sponsorAddress")]),e._v(') to "'),t("strong",[e._v("derive a\n"),t("RouterLink",{attrs:{to:"/airnode/v0.3/concepts/sponsor.html#sponsorwallet"}},[e._v("sponsorWallet")])],1),e._v("\" for an Airnode. This\naction creates a relationship between a sponsor's requester and a particular\nAirnode. You do this because a sponsor is the entity that pays for the\nfulfillment of a request, the gas costs the Airnode will incur. These costs will\nbe withdrawn from the "),t("code",[e._v("sponsorWallet")]),e._v(" of the Airnode when the requester calls\nit.")],1),e._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[e._v("sponsorAddress")]),e._v(" "),t("p",[e._v("A "),t("RouterLink",{attrs:{to:"/airnode/v0.3/concepts/sponsor.html#sponsoraddress"}},[e._v("sponsorAddress")]),e._v(" is a public address of\nan account from a mnemonic, usually the default account. Rather than the default\naccount another account from the mnemonic can be used. The "),t("code",[e._v("sponsorAddress")]),e._v(" is\nused to uniquely identify a sponsor.")],1)]),e._v(" "),t("ol",[t("li",[t("p",[e._v("In the diagram below a sponsor uses a "),t("code",[e._v("sponsorAddress")]),e._v(" to sponsor a requester\nwith the Admin CLI. The CLI will use the default address of the mnemonic\npassed as the "),t("code",[e._v("sponsorAddress")]),e._v(" for the sponsorship unless another account is\nspecified.")])]),e._v(" "),t("li",[t("p",[e._v("Next the sponsor will derive a "),t("code",[e._v("sponsorWallet")]),e._v(" for an Airnode using the\n"),t("code",[e._v("sponsorAddress")]),e._v(".")])]),e._v(" "),t("li",[t("p",[e._v("The requester can now make requests of the Airnode.")])])]),e._v(" "),t("blockquote",[t("p",[t("img",{attrs:{src:r(578),alt:"image"}})])]),e._v(" "),t("hr"),e._v(" "),t("p",[e._v("In the above diagram it is possible to use the same sponsorAddress\n"),t("code",[e._v("(0xF4...dDyu9)")]),e._v(" to derive other sponsor wallets for other Airnodes. And it is\npossible to sponsor more than one requester with the same "),t("code",[e._v("sponsorAddress")]),e._v(".\nHowever it is important to remember that all requesters can now access all the\nAirnodes regardless if they need to. There is no harm in this scenario.")]),e._v(" "),t("h3",{attrs:{id:"advanced-scenarios"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#advanced-scenarios"}},[e._v("#")]),e._v(" Advanced Scenarios")]),e._v(" "),t("ul",[t("li",[t("p",[t("strong",[e._v("Two requesters, one Airnode, one sponsorWallet")]),e._v(":")]),e._v(" "),t("p",[e._v("Two requesters sponsored with the same "),t("code",[e._v("sponsorAddress")]),e._v(" (e.g., "),t("code",[e._v("0xF4...dDyu9")]),e._v(")\nwould access the same Airnode using a single sponsorWallet derived by the\n"),t("code",[e._v("sponsorAddress")]),e._v(".")])]),e._v(" "),t("li",[t("p",[t("strong",[e._v("Two requesters, one Airnode, two sponsorWallets")]),e._v(":")]),e._v(" "),t("p",[e._v("Sponsor two different requesters each with a different "),t("code",[e._v("sponsorAddress")]),e._v(" (e.g.,\n"),t("code",[e._v("0xF4...dDyu9")]),e._v(" and "),t("code",[e._v("0xG9...fFzc5")]),e._v("). Using the separate sponsorAddresses you\ncan derive two separate sponsorWallets for the same Airnode. Now each\nrequester will deplete funds from a separate Airnode sponsorWallet when using\nthe Airnode.")])]),e._v(" "),t("li",[t("p",[t("strong",[e._v("One requester, two Airnodes, two sponsorWallets")]),e._v(":")]),e._v(" "),t("p",[e._v("A requester can make requests from two different Airnodes. Sponsor the\nrequester with a "),t("code",[e._v("sponsorAddress")]),e._v(". Derive two sponsorWallets, one for each of\ntwo the Airnodes, using the "),t("code",[e._v("sponsorAddress")]),e._v(". Despite the fact that the\nsponsorWallet for each Airnode was derived with the same "),t("code",[e._v("sponsorAddress")]),e._v(" the\nsponsorWallets are different since they are derived using the airnode's xpub\nplus the "),t("code",[e._v("sponsorAddress")]),e._v(". The sponsor must fund both wallets separately using\nthe unique "),t("code",[e._v("sponsorWalletAddress")]),e._v(" of the two sponsorWallets.")])])]),e._v(" "),t("h3",{attrs:{id:"things-to-remember"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#things-to-remember"}},[e._v("#")]),e._v(" Things to Remember")]),e._v(" "),t("p",[e._v("When you sponsor a requester with a "),t("code",[e._v("sponsorAddress")]),e._v(" you are giving it\npermission to use the sponsorWallet (associated with a Airnode) that was derived\nusing the same "),t("code",[e._v("sponsorAddress")]),e._v(".")]),e._v(" "),t("p",[e._v("When the requester makes a request to the Airnode, the Airnode will use funds\nfrom the corresponding sponsorWallet to pay gas costs in response to the\nrequest. Therefore the sponsor pays for the fulfillment of the request.")]),e._v(" "),t("p",[e._v("Sponsors need to keep their sponsorWallets topped off if they want Airnodes to\nfulfill requests made by their requesters. However this does not cover the cost\nof API data that the Airnode serves, see\n"),t("RouterLink",{attrs:{to:"/airnode/v0.3/grp-developers/fees.html#api-provider-fees"}},[e._v("API Provider Fees")]),e._v(".")],1),e._v(" "),t("h2",{attrs:{id:"admin-cli-commands"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#admin-cli-commands"}},[e._v("#")]),e._v(" Admin CLI Commands")]),e._v(" "),t("p",[e._v("There are several sponsor and requester related commands in the\n"),t("RouterLink",{attrs:{to:"/airnode/v0.3/reference/packages/admin-cli.html"}},[e._v("Admin CLI Commands")]),e._v(" package. You can also\nsee a list of available commands using "),t("code",[e._v("npx @api3/airnode-admin --help")]),e._v(".")],1),e._v(" "),t("p",[e._v("In the next two sections of this doc you will use two commands from the\n"),t("code",[e._v("@api3/airnode-admin")]),e._v(" package to "),t("em",[e._v("sponsor a requester")]),e._v(" and to "),t("em",[e._v("derive a sponsor\nwallet")]),e._v(".")]),e._v(" "),t("ol",[t("li",[t("RouterLink",{attrs:{to:"/airnode/v0.3/reference/packages/admin-cli.html#sponsor-requester"}},[e._v("sponsor-requester")]),e._v("\nsponsors a requester.")],1),e._v(" "),t("li",[t("RouterLink",{attrs:{to:"/airnode/v0.3/reference/packages/admin-cli.html#derive-sponsor-wallet-address"}},[e._v("derive-sponsor-wallet-address")]),e._v("creates\na sponsor wallet associated with an Airnode.")],1)]),e._v(" "),t("h2",{attrs:{id:"how-to-sponsor-a-requester"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#how-to-sponsor-a-requester"}},[e._v("#")]),e._v(" How to Sponsor a Requester")]),e._v(" "),t("p",[e._v("To sponsor a requester execute the "),t("code",[e._v("sponsor-requester")]),e._v(" command using the\nparameters detailed in the list below. Your requester should already be deployed\non-chain. This command has transaction gas costs.")]),e._v(" "),t("ul",[t("li",[t("code",[e._v("providerURL")]),e._v(": A blockchain provider URL (such as Infura) with providerID for\nthe desired network.")]),e._v(" "),t("li",[t("code",[e._v("sponsor-mnemonic")]),e._v(": Used for gas costs to fund the sponsorship and used to\nderive the sponsorAddress from the default address. The sponsorAddress will be\nneeded to derive a sponsorWallet for an Airnode.")]),e._v(" "),t("li",[t("code",[e._v("requester-address")]),e._v(": Address of the requester contract.")]),e._v(" "),t("li",[t("code",[e._v("derivation-path (optional)")]),e._v(" ("),t("em",[e._v("not used in the example below")]),e._v("): Selects an\nalternate account to use from the mnemonic rather than the default account.")])]),e._v(" "),t("p",[e._v("Executing the command\n"),t("RouterLink",{attrs:{to:"/airnode/v0.3/reference/packages/admin-cli.html#sponsor-requester"}},[e._v("sponsor-requester")]),e._v(" will\nsponsor a requester and returns the requesterAddress and sponsorAddress.")],1),e._v(" "),t("Tabs",{attrs:{type:"border-card"}},[t("Tab",{attrs:{label:"Linux/Mac"}},[t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[e._v("npx @api3/airnode-admin sponsor-requester "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --providerUrl https://ropsten.infura.io/v3/"),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("KEY"),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --sponsor-mnemonic "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"cricket...oppose"')]),e._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --requester-address 0x2c"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("..")]),e._v(".gDER7\n\nRequester 0x2c"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("..")]),e._v(".gDER7 sponsored using sponsorAddress 0xF4"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("..")]),e._v(".dDyu9\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br"),t("span",{staticClass:"line-number"},[e._v("5")]),t("br"),t("span",{staticClass:"line-number"},[e._v("6")]),t("br")])])]),e._v(" "),t("Tab",{attrs:{label:"Windows"}},[t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('npx @api3/airnode-admin sponsor-requester ^\n  --providerUrl https://ropsten.infura.io/v3/<KEY> ^\n  --sponsor-mnemonic "cricket...oppose" ^\n  --requester-address 0x2c...gDER7\n\nRequester 0x2c...gDER7 sponsored using sponsorAddress 0xF4...dDyu9\n')])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br"),t("span",{staticClass:"line-number"},[e._v("5")]),t("br"),t("span",{staticClass:"line-number"},[e._v("6")]),t("br")])])])],1),e._v(" "),t("h2",{attrs:{id:"how-to-derive-a-sponsor-wallet"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#how-to-derive-a-sponsor-wallet"}},[e._v("#")]),e._v(" How to Derive a Sponsor Wallet")]),e._v(" "),t("p",[e._v("To use a particular Airnode you must "),t("em",[e._v("derive a sponsorWallet")]),e._v(". Once the\nsponsorWallet is created it must be funded using the public address\n("),t("code",[e._v("sponsorWalletAddress")]),e._v(") returned by the command"),t("code",[e._v("derive-sponsor-wallet-address")]),e._v(".\nEach Airnode keeps a separate list of individual sponsorWallets that can access\nthe Airnode. Learn more about a\n"),t("RouterLink",{attrs:{to:"/airnode/v0.3/concepts/sponsor.html#sponsorwallet"}},[e._v("sponsorWallet")]),e._v(".")],1),e._v(" "),t("p",[e._v("To derive a sponsorWallet for an Airnode execute the\n"),t("RouterLink",{attrs:{to:"/airnode/v0.3/reference/packages/admin-cli.html#derive-sponsor-wallet-address"}},[e._v("derive-sponsor-wallet-address")]),e._v("\ncommand using the parameters detailed in the list below. There are no\ntransaction gas costs to do so.")],1),e._v(" "),t("ul",[t("li",[t("code",[e._v("airnode-xpub")]),e._v(": The extended public address of the Airnode for path\nm/44'/60'/0'.")]),e._v(" "),t("li",[t("code",[e._v("airnode-address")]),e._v(": The public address of the desired Airnode.")]),e._v(" "),t("li",[t("code",[e._v("sponsor-address")]),e._v(": The sponsorAddress (an address of an Ethereum account)\nowned by a sponsor. Usually the sponsorAddress is the one returned when\nsponsoring a requester.")])]),e._v(" "),t("p",[e._v("The command "),t("code",[e._v("derive-sponsor-wallet-address")]),e._v(" will return the public address\n("),t("code",[e._v("sponsorWalletAddress")]),e._v(") of the sponsorWallet to be funded by the sponsor.")]),e._v(" "),t("Tabs",{attrs:{type:"border-card"}},[t("Tab",{attrs:{label:"Linux/Mac"}},[t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[e._v("npx @api3/airnode-admin derive-sponsor-wallet-address "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --airnode-xpub xpub6CUGRUo"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("..")]),e._v(". "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --airnode-address 0xe1"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("..")]),e._v(".dF05s "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --sponsor-address 0xF4"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("..")]),e._v(".dDyu9\n\nSponsor wallet address: 0x14D5a34E5a370b9951Fef4f8fbab2b1016D557d9\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br"),t("span",{staticClass:"line-number"},[e._v("5")]),t("br"),t("span",{staticClass:"line-number"},[e._v("6")]),t("br")])])]),e._v(" "),t("Tab",{attrs:{label:"Windows"}},[t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[e._v("npx @api3/airnode-admin derive-sponsor-wallet-address ^\n  --airnode-xpub xpub6CUGRUo"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("..")]),e._v(". ^\n  --airnode-address 0xe1"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("..")]),e._v(".dF05s ^\n  --sponsor-address 0xF4"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("..")]),e._v(".dDyu9\n\nSponsor wallet address: 0x14D5a34E5a370b9951Fef4f8fbab2b1016D557d9\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br"),t("span",{staticClass:"line-number"},[e._v("5")]),t("br"),t("span",{staticClass:"line-number"},[e._v("6")]),t("br")])])])],1),e._v(" "),t("p",[e._v("Sponsors need to keep their sponsorWallets topped off if they want Airnodes to\nfulfill requests made by their requesters. However this does not cover the cost\nof API data that the Airnode serves, see\n"),t("RouterLink",{attrs:{to:"/airnode/v0.3/grp-developers/fees.html#api-provider-fees"}},[e._v("API Provider Fees")]),e._v(".")],1),e._v(" "),t("p",[e._v("If you forget the public address ("),t("code",[e._v("sponsorWalletAddress")]),e._v(") of the sponsorWallet\nsimply run "),t("code",[e._v("derive-sponsor-wallet-address")]),e._v(" again. Since the wallet already\nexists for the airnodeAddress/sponsorAddress pair it will just return the\naddress.")]),e._v(" "),t("airnode-SponsorWalletWarning"),e._v(" "),t("h2",{attrs:{id:"record-keeping"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#record-keeping"}},[e._v("#")]),e._v(" Record Keeping")]),e._v(" "),t("p",[e._v("During and after sponsoring requesters and deriving a sponsorWallet there are a\nfew things to keep track of.")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",[e._v("Item")]),e._v(" "),t("th",[e._v("Description")])])]),e._v(" "),t("tbody",[t("tr",[t("td",[e._v("sponsor's mnemonic")]),e._v(" "),t("td",[e._v("The mnemonic from which the "),t("code",[e._v("sponsorAddress")]),e._v(" was extracted.")])]),e._v(" "),t("tr",[t("td",[e._v("sponsor address")]),e._v(" "),t("td",[e._v("The public address of an account derived from a sponsor's mnemonic when sponsoring a requester. Record which "),t("code",[e._v("sponsorAddress")]),e._v(" was used to create a sponsorWallet for each Airnode.")])]),e._v(" "),t("tr",[t("td",[e._v("sponsor wallet address")]),e._v(" "),t("td",[e._v("Record the "),t("code",[e._v("sponsorWalletAddress")]),e._v(" of the sponsorWallet derived for an Airnode. For each Airnode you have derived a sponsorWallet, the Airnode keeps the private key and returns the public address ("),t("code",[e._v("sponsorWalletAddress")]),e._v(") which is used to fund the sponsorWallet.")])])])]),e._v(" "),t("p",[e._v("You can acquire the public address ("),t("code",[e._v("sponsorWalletAddress")]),e._v(") of a sponsorWallet\nlater, if you lose it, by running the command "),t("code",[e._v("derive-sponsor-wallet-address")]),e._v("\nagain. Since the sponsorWallet was already created for the\n"),t("code",[e._v("sponsorAddress/airnodeAddress")]),e._v(" pair, the command will only return the public\naddress for the wallet. However you must use the same "),t("code",[e._v("sponsorAddress")]),e._v(" used when\nthe wallet was first created or a new sponsorWallet will be created.")])],1)}),[],!1,null,null,null);s.default=o.exports},577:function(e,s){e.exports="data:image/png;base64,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"},578:function(e,s,r){e.exports=r.p+"assets/img/sponsor-overview.be6d2c57.png"}}]);