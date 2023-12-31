(window.webpackJsonp=window.webpackJsonp||[]).push([[389],{1045:function(e,t,r){"use strict";r.r(t);var n=r(9),o=Object(n.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("TitleSpan",[e._v(e._s(e.$frontmatter.folder))]),e._v(" "),r("h1",{attrs:{id:"frontmatter-title"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#frontmatter-title"}},[e._v("#")]),e._v(" "+e._s(e.$frontmatter.title))]),e._v(" "),r("VersionWarning"),e._v(" "),r("p",[e._v("Airnode is deployed with two files:")]),e._v(" "),r("ul",[r("li",[r("p",[r("RouterLink",{attrs:{to:"/airnode/v0.3/reference/deployment-files/config-json.html"}},[e._v("config.json")]),e._v(" is the file that specifies the API–Airnode\nintegrations and various node and deployment parameters.")],1)]),e._v(" "),r("li",[r("p",[r("RouterLink",{attrs:{to:"/airnode/v0.3/reference/deployment-files/secrets-env.html"}},[e._v("secrets.env")]),e._v(" is the file that keeps the secret parameters\n(airnode mnemonic, API keys, blockchain provider URLs and others) that the\nAirnode deployments will use.")],1)]),e._v(" "),r("li",[r("p",[r("RouterLink",{attrs:{to:"/airnode/v0.3/reference/deployment-files/aws-env.html"}},[e._v("aws.env")]),e._v(" is the file that holds credentials if the Airnode is\ndeployed to AWS cloud provider. It is required by the Docker\n"),r("RouterLink",{attrs:{to:"/airnode/v0.3/grp-providers/docker/deployer-image.html"}},[e._v("deployer image")]),e._v(".")],1)])]),e._v(" "),r("p",[e._v("Airnode deployments utilizes secrets such as security scheme values (i.e., API\nkeys) and blockchain provider URLs. While populating "),r("code",[e._v("config.json")]),e._v(" you can use\nstandard shell variable interpolation syntax (e.g. "),r("code",[e._v("${VARIABLE}")]),e._v(") to insert\nvalues from "),r("code",[e._v("secrets.env")]),e._v(". That way the secrets are kept separately but are\navailable as part of the configuration during the Airnode runtime.")]),e._v(" "),r("p",[e._v("The "),r("code",[e._v("config.json")]),e._v(" file does NOT reference values in "),r("code",[e._v("aws.env")]),e._v(" as it is read\ndirectly by the deployer image.")]),e._v(" "),r("p",[e._v("The deployer image outputs a "),r("RouterLink",{attrs:{to:"/airnode/v0.3/reference/deployment-files/receipt-json.html"}},[e._v("receipt.json")]),e._v(" file after\ndeployment, which contains information about the deployment that can be referred\nto later on for interaction or removal.")],1)],1)}),[],!1,null,null,null);t.default=o.exports}}]);