(window.webpackJsonp=window.webpackJsonp||[]).push([[546],{1255:function(e,t,a){"use strict";a.r(t);var n=a(9),_=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("TitleSpan",[e._v(e._s(e.$frontmatter.folder))]),e._v(" "),a("h1",{attrs:{id:"frontmatter-title"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#frontmatter-title"}},[e._v("#")]),e._v(" "+e._s(e.$frontmatter.title))]),e._v(" "),a("VersionWarning"),e._v(" "),a("p",[e._v("The "),a("code",[e._v("secrets.env")]),e._v(" file is bundled with a "),a("RouterLink",{attrs:{to:"/airnode/v0.6/reference/deployment-files/config-json.html"}},[e._v("config.json")]),e._v(" file and\ncontains the secrets that the respective Airnode deployments will need. All\nvariables defined in a "),a("code",[e._v("secrets.env")]),e._v(" file will be available in the "),a("code",[e._v("config.json")]),e._v("\nfile via variable interpolation (e.g. "),a("code",[e._v("${VARIABLE_NAME}")]),e._v(").")],1),e._v(" "),a("p",[e._v("There are few pieces of data that are "),a("strong",[e._v("highly recommend")]),e._v(" to be provided via\nvariables. The variable names shown can be adjusted to anything desired. Just be\nsure to change the correlating interpolation value in "),a("code",[e._v("config.json")]),e._v(".")]),e._v(" "),a("table",[a("thead",[a("tr",[a("th",[e._v("Variable name")]),e._v(" "),a("th",[a("code",[e._v("config.json")]),e._v(" field name")]),e._v(" "),a("th",[e._v("Description")])])]),e._v(" "),a("tbody",[a("tr",[a("td",[e._v("AIRNODE_WALLET_MNEMONIC")]),e._v(" "),a("td",[a("code",[e._v("nodeSettings.airnodeWalletMnemonic")])]),e._v(" "),a("td",[e._v("The wallet mnemonic that will be used by the Airnode")])]),e._v(" "),a("tr",[a("td",[e._v("CHAIN_PROVIDER_URL")]),e._v(" "),a("td",[a("code",[e._v("chains[].providers.<name>.url")])]),e._v(" "),a("td",[e._v("The blockchain provider url")])]),e._v(" "),a("tr",[a("td",[e._v("SS_MY_API_KEY")]),e._v(" "),a("td",[a("code",[e._v("apiCredentials[].securitySchemeValue")])]),e._v(" "),a("td",[e._v("A security scheme value")])]),e._v(" "),a("tr",[a("td",[e._v("HEARTBEAT_URL")]),e._v(" "),a("td",[a("code",[e._v("nodeSettings.heartbeat.url")])]),e._v(" "),a("td",[e._v("The URL to make the heartbeat request to")])]),e._v(" "),a("tr",[a("td",[e._v("HEARTBEAT_API_KEY")]),e._v(" "),a("td",[a("code",[e._v("nodeSettings.heartbeat.apiKey")])]),e._v(" "),a("td",[e._v("The API key to authenticate against the heartbeat URL")])]),e._v(" "),a("tr",[a("td",[e._v("HEARTBEAT_ID")]),e._v(" "),a("td",[a("code",[e._v("nodeSettings.heartbeat.id")])]),e._v(" "),a("td",[e._v("The Airnode heartbeat ID for accounting purposes")])]),e._v(" "),a("tr",[a("td",[e._v("HTTP_GATEWAY_API_KEY")]),e._v(" "),a("td",[a("code",[e._v("nodeSettings.httpGateway.apiKey")])]),e._v(" "),a("td",[e._v("The API key to authenticate against the HTTP gateway")])]),e._v(" "),a("tr",[a("td",[e._v("HTTP_SIGNED_DATA_GATEWAY_API_KEY")]),e._v(" "),a("td",[a("code",[e._v("nodeSettings.httpSignedDataGateway.apiKey")])]),e._v(" "),a("td",[e._v("The API key to authenticate against the signed data HTTP gateway")])]),e._v(" "),a("tr",[a("td",[e._v("GCP_PROJECT_ID")]),e._v(" "),a("td",[a("code",[e._v("nodeSettings.cloudProvider.projectId")])]),e._v(" "),a("td",[e._v("(GCP only) The GCP project ID for deployment")])])])]),e._v(" "),a("p",[e._v("Below is an example of "),a("code",[e._v("secrets.env")]),e._v(".")]),e._v(" "),a("ul",[a("li",[e._v("Variable names cannot contain dashes (-) or start with a number.")])]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('AIRNODE_WALLET_MNEMONIC="achieve climb couple wait accident symbol spy blouse reduce foil echo label"\nCHAIN_PROVIDER_URL="https://mainnet.infura.io/v3/5122f3ff104f30f21412aa38fd143d53"\n\nSS_MY_API_KEY="FRACZKMH4F32BZ8X5uTd"\n\nHEARTBEAT_API_KEY="d714a900-3b9e-4e4d-8eae-756ef06a8836"\nHEARTBEAT_ID="916d3ec80fda"\nHEARTBEAT_URL="https://your.heartbeat.service.io/airnode"\n\nHTTP_GATEWAY_API_KEY="441ffc41-3c8b-44b9-a689-63b500fd17da"\nHTTP_SIGNED_DATA_GATEWAY_API_KEY="58b0c6d6-b250-4f2e-b9ed-700655d1c8ae"\n\n# GCP only\nGCP_PROJECT_ID="my-gcp-airnode-project-01"\n')])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br"),a("span",{staticClass:"line-number"},[e._v("12")]),a("br"),a("span",{staticClass:"line-number"},[e._v("13")]),a("br"),a("span",{staticClass:"line-number"},[e._v("14")]),a("br")])])],1)}),[],!1,null,null,null);t.default=_.exports}}]);