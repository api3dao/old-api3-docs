(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{538:function(e,s,r){e.exports=r.p+"assets/img/requesters-sponsors-1.7efe6c24.png"},539:function(e,s,r){e.exports=r.p+"assets/img/sponsor-overview.be6d2c57.png"},887:function(e,s,r){"use strict";r.r(s);var t=r(9),a=Object(t.a)({},(function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("TitleSpan",[e._v(e._s(e.$frontmatter.folder))]),e._v(" "),t("h1",{attrs:{id:"frontmatter-title"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#frontmatter-title"}},[e._v("#")]),e._v(" "+e._s(e.$frontmatter.title))]),e._v(" "),t("VersionWarning"),e._v(" "),t("TocHeader"),e._v(" "),t("TOC",{staticClass:"table-of-contents",attrs:{"include-level":[2,3]}}),e._v(" "),t("p",[e._v("As a developer it helps to understand what a "),t("strong",[e._v("requester")]),e._v(" is and what a\n"),t("strong",[e._v("sponsor")]),e._v(" does. They are both important parts of the Airnode ecosystem. This\ndoc will further define them and walk you through the process of sponsoring a\nrequester and deriving a sponsor wallet using the admin CLI commands.")]),e._v(" "),t("h2",{attrs:{id:"what-is-a-requester"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#what-is-a-requester"}},[e._v("#")]),e._v(" What is a Requester?")]),e._v(" "),t("p",[e._v("The term "),t("RouterLink",{attrs:{to:"/airnode/v0.10/concepts/requester.html"}},[e._v("requester")]),e._v(" is important to remember. When\nrequester is mentioned, the reference is to your smart contract that calls an\nAirnode.")],1),e._v(" "),t("blockquote",[t("img",{attrs:{src:r(538),width:"350px"}})]),e._v(" "),t("p",[e._v("As an example see the "),t("code",[e._v("myContract.sol")]),e._v(" contract in the diagram within the\n"),t("RouterLink",{attrs:{to:"/airnode/v0.10/grp-developers/"}},[e._v("Overview")]),e._v(" doc, it is a requester.")],1),e._v(" "),t("h2",{attrs:{id:"what-is-a-sponsor"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#what-is-a-sponsor"}},[e._v("#")]),e._v(" What is a Sponsor?")]),e._v(" "),t("p",[e._v("Equally important is the term "),t("RouterLink",{attrs:{to:"/airnode/v0.10/concepts/sponsor.html"}},[e._v("sponsor")]),e._v(". A sponsor is an\nentity such as yourself, an organization, etc. Sponsors create relationships\nbetween requesters and Airnodes.")],1),e._v(" "),t("h3",{attrs:{id:"sponsor-s-requester-airnode-relationships"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#sponsor-s-requester-airnode-relationships"}},[e._v("#")]),e._v(" Sponsor's Requester/Airnode Relationships")]),e._v(" "),t("p",[e._v('As a sponsor you will use the public address from an account within a mnemonic\nyou own to "'),t("strong",[e._v("sponsor a requester")]),e._v('" and then use the public address (known as a\n'),t("RouterLink",{attrs:{to:"/airnode/v0.10/concepts/sponsor.html#sponsoraddress"}},[e._v("sponsorAddress")]),e._v(') to "'),t("strong",[e._v("derive a\n"),t("RouterLink",{attrs:{to:"/airnode/v0.10/concepts/sponsor.html#sponsorwallet"}},[e._v("sponsorWallet")])],1),e._v("\" for an Airnode. This\naction creates a relationship between a sponsor's requester and a particular\nAirnode. You do this because a sponsor is the entity that pays for the\nfulfillment of a request, the gas costs the Airnode will incur. These costs will\nbe withdrawn from the "),t("code",[e._v("sponsorWallet")]),e._v(" of the Airnode when the requester calls\nit.")],1),e._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[e._v("sponsorAddress")]),e._v(" "),t("p",[e._v("A "),t("RouterLink",{attrs:{to:"/airnode/v0.10/concepts/sponsor.html#sponsoraddress"}},[e._v("sponsorAddress")]),e._v(" is a public address of\nan account from a mnemonic, usually the default account. Rather than the default\naccount another account from the mnemonic can be used. The "),t("code",[e._v("sponsorAddress")]),e._v(" is\nused to uniquely identify a sponsor.")],1)]),e._v(" "),t("ol",[t("li",[t("p",[e._v("In the diagram below a sponsor uses a "),t("code",[e._v("sponsorAddress")]),e._v(" to sponsor a requester\nwith the Admin CLI. The CLI will use the default address of the mnemonic\npassed as the "),t("code",[e._v("sponsorAddress")]),e._v(" for the sponsorship unless another account is\nspecified.")])]),e._v(" "),t("li",[t("p",[e._v("Next the sponsor will derive a "),t("code",[e._v("sponsorWallet")]),e._v(" for an Airnode using the\n"),t("code",[e._v("sponsorAddress")]),e._v(".")])]),e._v(" "),t("li",[t("p",[e._v("The requester can now make requests of the Airnode.")])])]),e._v(" "),t("blockquote",[t("p",[t("img",{attrs:{src:r(539),alt:"image"}})])]),e._v(" "),t("hr"),e._v(" "),t("p",[e._v("In the above diagram it is possible to use the same sponsorAddress\n"),t("code",[e._v("(0xF4...dDyu9)")]),e._v(" to derive other sponsor wallets for other Airnodes. And it is\npossible to sponsor more than one requester with the same "),t("code",[e._v("sponsorAddress")]),e._v(".\nHowever it is important to remember that all requesters can now access all the\nAirnodes regardless if they need to. There is no harm in this scenario.")]),e._v(" "),t("h3",{attrs:{id:"advanced-scenarios"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#advanced-scenarios"}},[e._v("#")]),e._v(" Advanced Scenarios")]),e._v(" "),t("ul",[t("li",[t("p",[t("strong",[e._v("Two requesters, one Airnode, one sponsorWallet")]),e._v(":")]),e._v(" "),t("p",[e._v("Two requesters sponsored with the same "),t("code",[e._v("sponsorAddress")]),e._v(" (e.g., "),t("code",[e._v("0xF4...dDyu9")]),e._v(")\nwould access the same Airnode using a single sponsorWallet derived by the\n"),t("code",[e._v("sponsorAddress")]),e._v(".")])]),e._v(" "),t("li",[t("p",[t("strong",[e._v("Two requesters, one Airnode, two sponsorWallets")]),e._v(":")]),e._v(" "),t("p",[e._v("Sponsor two different requesters each with a different "),t("code",[e._v("sponsorAddress")]),e._v(" (e.g.,\n"),t("code",[e._v("0xF4...dDyu9")]),e._v(" and "),t("code",[e._v("0xG9...fFzc5")]),e._v("). Using the separate sponsorAddresses you\ncan derive two separate sponsorWallets for the same Airnode. Now each\nrequester will deplete funds from a separate Airnode sponsorWallet when using\nthe Airnode.")])]),e._v(" "),t("li",[t("p",[t("strong",[e._v("One requester, two Airnodes, two sponsorWallets")]),e._v(":")]),e._v(" "),t("p",[e._v("A requester can make requests from two different Airnodes. Sponsor the\nrequester with a "),t("code",[e._v("sponsorAddress")]),e._v(". Derive two sponsorWallets, one for each of\ntwo the Airnodes, using the "),t("code",[e._v("sponsorAddress")]),e._v(". Despite the fact that the\nsponsorWallet for each Airnode was derived with the same "),t("code",[e._v("sponsorAddress")]),e._v(" the\nsponsorWallets are different since they are derived using the airnode's xpub\nplus the "),t("code",[e._v("sponsorAddress")]),e._v(". The sponsor must fund both wallets separately using\nthe unique "),t("code",[e._v("sponsorWalletAddress")]),e._v(" of the two sponsorWallets.")])])]),e._v(" "),t("h3",{attrs:{id:"things-to-remember"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#things-to-remember"}},[e._v("#")]),e._v(" Things to Remember")]),e._v(" "),t("p",[e._v("When you sponsor a requester with a "),t("code",[e._v("sponsorAddress")]),e._v(" you are giving it\npermission to use the sponsorWallet (associated with a Airnode) that was derived\nusing the same "),t("code",[e._v("sponsorAddress")]),e._v(".")]),e._v(" "),t("p",[e._v("When the requester makes a request to the Airnode, the Airnode will use funds\nfrom the corresponding sponsorWallet to pay gas costs in response to the\nrequest. Therefore the sponsor pays for the fulfillment of the request.")]),e._v(" "),t("p",[e._v("Sponsors need to keep their sponsorWallets topped off if they want Airnodes to\nfulfill requests made by their requesters. However this does not cover the cost\nof API data that the Airnode serves, see\n"),t("RouterLink",{attrs:{to:"/airnode/v0.10/grp-developers/fees.html#api-provider-fees"}},[e._v("API Provider Fees")]),e._v(".")],1),e._v(" "),t("h2",{attrs:{id:"admin-cli-commands"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#admin-cli-commands"}},[e._v("#")]),e._v(" Admin CLI Commands")]),e._v(" "),t("p",[e._v("There are several sponsor and requester related commands in the\n"),t("RouterLink",{attrs:{to:"/airnode/v0.10/reference/packages/admin-cli.html"}},[e._v("Admin CLI Commands")]),e._v(" package. You can also\nsee a list of available commands using "),t("code",[e._v("npx @api3/airnode-admin --help")]),e._v(".")],1),e._v(" "),t("p",[e._v("In the next two sections of this doc you will use two commands from the\n"),t("code",[e._v("@api3/airnode-admin")]),e._v(" package to "),t("em",[e._v("sponsor a requester")]),e._v(" and to "),t("em",[e._v("derive a sponsor\nwallet")]),e._v(".")]),e._v(" "),t("ol",[t("li",[t("RouterLink",{attrs:{to:"/airnode/v0.10/reference/packages/admin-cli.html#sponsor-requester"}},[e._v("sponsor-requester")]),e._v("\nsponsors a requester.")],1),e._v(" "),t("li",[t("RouterLink",{attrs:{to:"/airnode/v0.10/reference/packages/admin-cli.html#derive-sponsor-wallet-address"}},[e._v("derive-sponsor-wallet-address")]),e._v("creates\na sponsor wallet associated with an Airnode.")],1)]),e._v(" "),t("h2",{attrs:{id:"how-to-sponsor-a-requester"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#how-to-sponsor-a-requester"}},[e._v("#")]),e._v(" How to Sponsor a Requester")]),e._v(" "),t("p",[e._v("To sponsor a requester execute the "),t("code",[e._v("sponsor-requester")]),e._v(" command using the\nparameters detailed in the list below. Your requester should already be deployed\non-chain. This command has transaction gas costs.")]),e._v(" "),t("ul",[t("li",[t("code",[e._v("providerURL")]),e._v(": A blockchain provider URL (such as Infura) with providerID for\nthe desired network.")]),e._v(" "),t("li",[t("code",[e._v("sponsor-mnemonic")]),e._v(": Used for gas costs to fund the sponsorship and used to\nderive the sponsorAddress from the default address. The sponsorAddress will be\nneeded to derive a sponsorWallet for an Airnode.")]),e._v(" "),t("li",[t("code",[e._v("requester-address")]),e._v(": Address of the requester contract.")]),e._v(" "),t("li",[t("code",[e._v("derivation-path (optional)")]),e._v(" ("),t("em",[e._v("not used in the example below")]),e._v("): Selects an\nalternate account to use from the mnemonic rather than the default account.")])]),e._v(" "),t("p",[e._v("Executing the command\n"),t("RouterLink",{attrs:{to:"/airnode/v0.10/reference/packages/admin-cli.html#sponsor-requester"}},[e._v("sponsor-requester")]),e._v(" will\nsponsor a requester and returns the requesterAddress and sponsorAddress.")],1),e._v(" "),t("Tabs",{attrs:{type:"border-card"}},[t("Tab",{attrs:{label:"Linux/Mac"}},[t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[e._v("npx @api3/airnode-admin sponsor-requester "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --providerUrl https://sepolia.infura.io/v3/"),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("KEY"),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --sponsor-mnemonic "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"cricket...oppose"')]),e._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --requester-address 0x2c"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("..")]),e._v(".gDER7\n\nRequester 0x2c"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("..")]),e._v(".gDER7 sponsored using sponsorAddress 0xF4"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("..")]),e._v(".dDyu9\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br"),t("span",{staticClass:"line-number"},[e._v("5")]),t("br"),t("span",{staticClass:"line-number"},[e._v("6")]),t("br")])])]),e._v(" "),t("Tab",{attrs:{label:"Windows"}},[t("div",{staticClass:"language-batch line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-batch"}},[t("code",[t("span",{pre:!0,attrs:{class:"token command"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("npx")]),e._v(" @api3/airnode-admin sponsor-requester "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("^")]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"token parameter attr-name"}},[e._v("--providerUrl")]),e._v(" https://sepolia.infura.io/v3/<KEY> "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("^")]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"token parameter attr-name"}},[e._v("--sponsor-mnemonic")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"cricket...oppose"')]),e._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("^")]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"token parameter attr-name"}},[e._v("--requester-address")]),e._v(" 0x2c...gDER7")]),e._v("\n\n"),t("span",{pre:!0,attrs:{class:"token command"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("Requester")]),e._v(" 0x2c...gDER7 sponsored using sponsorAddress 0xF4...dDyu9")]),e._v("\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br"),t("span",{staticClass:"line-number"},[e._v("5")]),t("br"),t("span",{staticClass:"line-number"},[e._v("6")]),t("br")])])])],1),e._v(" "),t("h2",{attrs:{id:"how-to-derive-a-sponsor-wallet"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#how-to-derive-a-sponsor-wallet"}},[e._v("#")]),e._v(" How to Derive a Sponsor Wallet")]),e._v(" "),t("p",[e._v("To use a particular Airnode you must "),t("em",[e._v("derive a sponsorWallet")]),e._v(". Once the\nsponsorWallet is created it must be funded using the public address\n("),t("code",[e._v("sponsorWalletAddress")]),e._v(") returned by the command\n"),t("code",[e._v("derive-sponsor-wallet-address")]),e._v(". Each Airnode keeps a separate list of\nindividual sponsorWallets that can access the Airnode. Learn more about a\n"),t("RouterLink",{attrs:{to:"/airnode/v0.10/concepts/sponsor.html#sponsorwallet"}},[e._v("sponsorWallet")]),e._v(".")],1),e._v(" "),t("p",[e._v("To derive a sponsorWallet for an Airnode execute the\n"),t("RouterLink",{attrs:{to:"/airnode/v0.10/reference/packages/admin-cli.html#derive-sponsor-wallet-address"}},[e._v("derive-sponsor-wallet-address")]),e._v("\ncommand using the parameters detailed in the list below. There are no\ntransaction gas costs to do so.")],1),e._v(" "),t("ul",[t("li",[t("code",[e._v("airnode-xpub")]),e._v(": The extended public address of the Airnode for path\nm/44'/60'/0'.")]),e._v(" "),t("li",[t("code",[e._v("airnode-address")]),e._v(": The public address of the desired Airnode.")]),e._v(" "),t("li",[t("code",[e._v("sponsor-address")]),e._v(": The sponsorAddress (an address of an Ethereum account)\nowned by a sponsor. Usually the sponsorAddress is the one returned when\nsponsoring a requester.")])]),e._v(" "),t("p",[e._v("The command "),t("code",[e._v("derive-sponsor-wallet-address")]),e._v(" will return the public address\n("),t("code",[e._v("sponsorWalletAddress")]),e._v(") of the sponsorWallet to be funded by the sponsor.")]),e._v(" "),t("Tabs",{attrs:{type:"border-card"}},[t("Tab",{attrs:{label:"Linux/Mac"}},[t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[e._v("npx @api3/airnode-admin derive-sponsor-wallet-address "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --airnode-xpub xpub6CUGRUo"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("..")]),e._v(". "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --airnode-address 0xe1"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("..")]),e._v(".dF05s "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --sponsor-address 0xF4"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("..")]),e._v(".dDyu9\n\nSponsor wallet address: 0x14D5a34E5a370b9951Fef4f8fbab2b1016D557d9\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br"),t("span",{staticClass:"line-number"},[e._v("5")]),t("br"),t("span",{staticClass:"line-number"},[e._v("6")]),t("br")])])]),e._v(" "),t("Tab",{attrs:{label:"Windows"}},[t("div",{staticClass:"language-batch line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-batch"}},[t("code",[t("span",{pre:!0,attrs:{class:"token command"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("npx")]),e._v(" @api3/airnode-admin derive-sponsor-wallet-address "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("^")]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"token parameter attr-name"}},[e._v("--airnode-xpub")]),e._v(" xpub6CUGRUo... "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("^")]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"token parameter attr-name"}},[e._v("--airnode-address")]),e._v(" 0xe1...dF05s "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("^")]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"token parameter attr-name"}},[e._v("--sponsor-address")]),e._v(" 0xF4...dDyu9")]),e._v("\n\n"),t("span",{pre:!0,attrs:{class:"token command"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("Sponsor")]),e._v(" wallet address: 0x14D5a34E5a370b9951Fef4f8fbab2b1016D557d9")]),e._v("\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br"),t("span",{staticClass:"line-number"},[e._v("5")]),t("br"),t("span",{staticClass:"line-number"},[e._v("6")]),t("br")])])])],1),e._v(" "),t("p",[e._v("Sponsors need to keep their sponsorWallets topped off if they want Airnodes to\nfulfill requests made by their requesters. However this does not cover the cost\nof API data that the Airnode serves, see\n"),t("RouterLink",{attrs:{to:"/airnode/v0.10/grp-developers/fees.html#api-provider-fees"}},[e._v("API Provider Fees")]),e._v(".")],1),e._v(" "),t("p",[e._v("If you forget the public address ("),t("code",[e._v("sponsorWalletAddress")]),e._v(") of the sponsorWallet\nsimply run "),t("code",[e._v("derive-sponsor-wallet-address")]),e._v(" again. Since the wallet already\nexists for the airnodeAddress/sponsorAddress pair it will just return the\naddress.")]),e._v(" "),t("airnode-SponsorWalletWarning"),e._v(" "),t("h2",{attrs:{id:"record-keeping"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#record-keeping"}},[e._v("#")]),e._v(" Record Keeping")]),e._v(" "),t("p",[e._v("During and after sponsoring requesters and deriving a sponsorWallet there are a\nfew things to keep track of.")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",[e._v("Item")]),e._v(" "),t("th",[e._v("Description")])])]),e._v(" "),t("tbody",[t("tr",[t("td",[e._v("sponsor's mnemonic")]),e._v(" "),t("td",[e._v("The mnemonic from which the "),t("code",[e._v("sponsorAddress")]),e._v(" was extracted.")])]),e._v(" "),t("tr",[t("td",[e._v("sponsor address")]),e._v(" "),t("td",[e._v("The public address of an account derived from a sponsor's mnemonic when sponsoring a requester. Record which "),t("code",[e._v("sponsorAddress")]),e._v(" was used to create a sponsorWallet for each Airnode.")])]),e._v(" "),t("tr",[t("td",[e._v("sponsor wallet address")]),e._v(" "),t("td",[e._v("Record the "),t("code",[e._v("sponsorWalletAddress")]),e._v(" of the sponsorWallet derived for an Airnode. For each Airnode you have derived a sponsorWallet, the Airnode keeps the private key and returns the public address ("),t("code",[e._v("sponsorWalletAddress")]),e._v(") which is used to fund the sponsorWallet.")])])])]),e._v(" "),t("p",[e._v("You can acquire the public address ("),t("code",[e._v("sponsorWalletAddress")]),e._v(") of a sponsorWallet\nlater, if you lose it, by running the command "),t("code",[e._v("derive-sponsor-wallet-address")]),e._v("\nagain. Since the sponsorWallet was already created for the\n"),t("code",[e._v("sponsorAddress/airnodeAddress")]),e._v(" pair, the command will only return the public\naddress for the wallet. However you must use the same "),t("code",[e._v("sponsorAddress")]),e._v(" used when\nthe wallet was first created or a new sponsorWallet will be created.")])],1)}),[],!1,null,null,null);s.default=a.exports}}]);