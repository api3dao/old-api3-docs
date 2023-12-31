(window.webpackJsonp=window.webpackJsonp||[]).push([[762],{1540:function(s,a,e){"use strict";e.r(a);var t=e(9),n=Object(t.a)({},(function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"frontmatter-title"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#frontmatter-title"}},[s._v("#")]),s._v(" "+s._s(s.$frontmatter.title))]),s._v(" "),e("TocHeader"),s._v(" "),e("TOC",{staticClass:"table-of-contents",attrs:{"include-level":[2,3]}}),s._v(" "),e("p",[s._v("The docs are group into documents sets, two of which are versioned.")]),s._v(" "),e("ul",[e("li",[s._v("Airnode (versioned)")]),s._v(" "),e("li",[s._v("API3")]),s._v(" "),e("li",[s._v("DAO Members")]),s._v(" "),e("li",[s._v("dAPIs")]),s._v(" "),e("li",[s._v("QRNG")]),s._v(" "),e("li",[s._v("OIS (versioned)")])]),s._v(" "),e("p",[s._v("All versions of a particular document set are maintained in the api3-docs repo.\nVersioning of a document set is not implemented using traditional tags in a\nGitHub repo. This allows all document set versions to be available while using\nthe docs. It also allows older versions to be updated independently of any other\nversion.")]),s._v(" "),e("h2",{attrs:{id:"base-routes"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#base-routes"}},[s._v("#")]),s._v(" Base Routes")]),s._v(" "),e("p",[s._v("All sub-folders in "),e("code",[s._v("/docs")]),s._v(" are base routes except for "),e("code",[s._v("/.vuepress")]),s._v(". Each\nrepresents a logical group called a "),e("em",[s._v("document set")]),s._v(". The "),e("code",[s._v("/airnode & /ois")]),s._v("\nfolders contain versions of their respective document set.")]),s._v(" "),e("div",{staticClass:"language-text line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("docs/\n ├── airnode\n    ├── pre-alpha\n    ├── v0.2\n    ├── ...\n    └── v0.10\n ├── api3\n ├── common\n ├── dev\n ├── dao-members\n ├── ois\n    ├── v1.0\n    ...\n    └── v1.4\n └── qrng\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br"),e("span",{staticClass:"line-number"},[s._v("15")]),e("br")])]),e("h2",{attrs:{id:"config-js"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#config-js"}},[s._v("#")]),s._v(" config.js")]),s._v(" "),e("p",[s._v("The folders for "),e("code",[s._v("/airnode, and /ois")]),s._v(" are versioned. A corresponding versions\narray is declared in "),e("em",[s._v(".vuepress/config.json")]),s._v(" for each.")]),s._v(" "),e("ul",[e("li",[s._v("Update the "),e("code",[s._v("versions & versionOis")]),s._v(" key in "),e("code",[s._v("/doc/.vuepress/config.json")]),s._v(".\nProvide the version name and url. These keys should only contain the current\nreleases. Hidden releases are not added to these keys. Readers must manually\nadd a desired version into the browser UR bar to access hidden releases.\n"),e("ul",[e("li",[e("strong",[s._v("name:")]),s._v(" The name of the version to display in the pick-list. A url without\na file will load the root README.md file of the base route by default.")]),s._v(" "),e("li",[e("strong",[s._v("url:")]),s._v(" The entry path to the version, its current route in the navbar.")])])]),s._v(" "),e("li",[s._v("Set the "),e("code",[s._v("latestVersion & latestOisVersion")]),s._v(" to the start path of the latest\nversions for each.")]),s._v(" "),e("li",[s._v("Set "),e("code",[s._v("airnodeVersionNext")]),s._v(".")])]),s._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[s._v("latestVersion")]),s._v(" "),e("p",[e("code",[s._v("latestVersion")]),s._v(" is a legacy key name and is associated to Airnode.")])]),s._v(" "),e("div",{staticClass:"language-json line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/// Doc set versioned pick lists.")]),s._v("\nversions"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n   "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" name"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" 'v0."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("'"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" url"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" '/airnode/v0."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("/' "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n   ...\n   "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" name"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" 'v0."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("6")]),s._v("'"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" url"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" '/airnode/v0."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("6")]),s._v("/' "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n   "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" name"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" 'v0."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v("'"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" url"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" '/airnode/v0."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v("/' "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n   "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" name"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" 'v0."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("'"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" url"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" '/airnode/v0."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("/' "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n   "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" name"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" 'v0."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v("'"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" url"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" '/airnode/v0."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v("/' "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n   "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" name"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" 'v0."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("'"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" url"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" '/airnode/v0."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("/' "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n   "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" name"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" 'pre-alpha'"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" url"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" '/airnode/pre-alpha/' "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\nversionsOis"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" name"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" 'v1."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("'"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" url"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" '/ois/v1."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("/' "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/// Next version of airnode, used by /next route.")]),s._v("\nairnodeVersionNext"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" name"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" 'v0."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("'"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" url"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" '/airnode/v0."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("/' "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/// Latest/current Airnode doc set versioned paths.")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/// Used by api3dao/airnode CI link checking.")]),s._v("\nlatestVersion"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" '/airnode/v0."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("/'"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\nlatestOisVersion"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" '/ois/v1."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("/'"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/// The title of the versioned doc sets, these are used by the search.")]),s._v("\nlatestTitle"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" 'Airnode v0."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("'"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\nlatestOisTitle"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" 'OIS v1."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("'"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br"),e("span",{staticClass:"line-number"},[s._v("15")]),e("br"),e("span",{staticClass:"line-number"},[s._v("16")]),e("br"),e("span",{staticClass:"line-number"},[s._v("17")]),e("br"),e("span",{staticClass:"line-number"},[s._v("18")]),e("br"),e("span",{staticClass:"line-number"},[s._v("19")]),e("br"),e("span",{staticClass:"line-number"},[s._v("20")]),e("br"),e("span",{staticClass:"line-number"},[s._v("21")]),e("br"),e("span",{staticClass:"line-number"},[s._v("22")]),e("br"),e("span",{staticClass:"line-number"},[s._v("23")]),e("br"),e("span",{staticClass:"line-number"},[s._v("24")]),e("br")])]),e("p",[s._v("Set the "),e("code",[s._v("themeConfig.startPath")]),s._v(" to the start path of the latest Airnode version.")]),s._v(" "),e("div",{staticClass:"language-json line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[s._v("themeConfig"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n   startPath"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v("'/airnode/v0."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("/'"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br")])]),e("h2",{attrs:{id:"create-a-version"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#create-a-version"}},[s._v("#")]),s._v(" Create a Version")]),s._v(" "),e("ol",[e("li",[e("p",[s._v("Make a copy of the current version and rename it as needed.")])]),s._v(" "),e("li",[e("p",[s._v("Markdown pages will probably contained hyperlinks to remote GitHub repos.\nMore than likely these links will need updating in the version just created.\nHowever these cannot be updated until the airnode monorepo contains a tag to\nuse for these links.")])]),s._v(" "),e("li",[e("p",[s._v("Adjust the list of sidebars as needed in "),e("code",[s._v("config.json")]),s._v(".")]),s._v(" "),e("div",{staticClass:"language-json line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[s._v("sidebar"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n   '/airnode/v0."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("/'"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" require(`../airnode/v0."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("/sidebar.js`)"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n   ...\n   '/airnode/v0."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v("/'"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" require(`../airnode/v0."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v("/sidebar.js`)"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n   '/airnode/v0."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("/'"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" require(`../airnode/v0."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("/sidebar.js`)"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n   '/airnode/pre-alpha/'"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" require(`../airnode/pre-alpha/sidebar.js`)"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n   '/dapis/'"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" require(`../dapis/sidebar.js`)"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n   '/ois/v1."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/'"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" require(`../ois/v1."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("/sidebar.js`)"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n   '/ois/v1."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("/'"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" require(`../ois/v1."),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("/sidebar.js`)"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n   '/qrng/'"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" require(`../qrng/sidebar.js`)"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n   '/dao-members/'"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" require(`../dao-members/sidebar.js`)"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n   '/api3/'"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" require(`../api3/sidebar.js`)"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n   '/dev/'"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" require(`../dev/sidebar.js`)"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n   '/operations/'"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" require(`../operations/sidebar.js`)"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br"),e("span",{staticClass:"line-number"},[s._v("15")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("Change the version in "),e("code",[s._v("package.json")]),s._v(" when the Airnode version changes, not\nOIS. This version reflects a release of the docs and is not shown anywhere in\nthe docs.")])]),s._v(" "),e("li",[e("p",[s._v("Update "),e("code",[s._v("check-links-imgs.yaml")]),s._v(" to exclude future versions.")]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[s._v("run: "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n   "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("find")]),s._v(" docs/\n   -not -path "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"*/.vuepress/*"')]),s._v("\n   -not -path "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"docs/airnode/v0.11/*"')]),s._v("\n   -not -path "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"docs/ois/v2.0/*"')]),s._v("\n   -type f -name "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"*.md"')]),s._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("xargs")]),s._v(" lychee - -c .github/workflows/lychee.toml\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("Update "),e("code",[s._v("$frontmatter")]),s._v(" for all pages to the proper version number. Be sure to\ninclude the "),e("code",[s._v("$frontmatter")]),s._v(" key such as "),e("code",[s._v("docSetName")]),s._v(" in the search criteria to\nfind and replace only "),e("code",[s._v("$frontmatter")]),s._v(" keys.")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("\nfind:             docSetName: Airnode v0.9\nreplace with:     docSetName: Airnode v0.10\nfind:             basePath: /airnode/v0.9\nreplace with:     basePath: /airnode/v0.10\nfiles to include: docs/airnode/v0.11\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("Find and replace the string "),e("code",[s._v("0.9.2")]),s._v(" with its replacement "),e("code",[s._v("v0.10.1")]),s._v(". This will\nappear in CLI commands and config files.")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"nodeVersion"')]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"0.10.1"')]),s._v("\ndocker run api3/airnode-admin:0.10.1 --help\napi3/airnode-deployer:0.10.1 deploy\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("Update the zip files in the\ntutorials"),e("a",{attrs:{href:"/zip-files/quick-deploy-gcp-v0.10.zip",download:""}},[s._v("\nquick-deploy-gcp")]),s._v(".")])]),s._v(" "),e("li",[e("p",[s._v("Push branch changes to the repo, pull back to local main branch and run\n"),e("code",[s._v("sh deploy.sh")]),s._v(".")])])]),s._v(" "),e("h2",{attrs:{id:"update-older-versions"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#update-older-versions"}},[s._v("#")]),s._v(" Update Older Versions")]),s._v(" "),e("p",[s._v("Older versions and non-version base routes can be updated at any time, even\nwhile work progresses on the "),e("strong",[s._v("/next")]),s._v(" base route. It should be noted that such\nupdates will not be reflected in any other base route, if needed they must be\nmanaged separately.")])],1)}),[],!1,null,null,null);a.default=n.exports}}]);