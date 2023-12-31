(window.webpackJsonp=window.webpackJsonp||[]).push([[756],{1533:function(e,t,a){"use strict";a.r(t);var s=a(9),r=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"frontmatter-title"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#frontmatter-title"}},[e._v("#")]),e._v(" "+e._s(e.$frontmatter.title))]),e._v(" "),a("TocHeader"),e._v(" "),a("TOC",{staticClass:"table-of-contents",attrs:{"include-level":[2,3]}}),e._v(" "),a("h2",{attrs:{id:"language-does-not-exist"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#language-does-not-exist"}},[e._v("#")]),e._v(" language does not exist")]),e._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token number"}},[e._v("4")]),e._v(":47:20 PM: Language does not exist: text\n"),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("4")]),e._v(":47:20 PM: Language does not exist: text\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br")])]),a("p",[e._v("This message may appear (may times) when running "),a("code",[e._v("yarn docs:dev or docs:build")]),e._v(".\nWhile the message does not seem to be an issue it is annoying. Adding\n"),a("code",[e._v('NODE_OPTIONS="--max-old-space-size=4096"')]),e._v(" seems to help sometimes.")]),e._v(" "),a("h2",{attrs:{id:"hierarchyrequesterror"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#hierarchyrequesterror"}},[e._v("#")]),e._v(" HierarchyRequestError")]),e._v(" "),a("p",[a("code",[e._v("HierarchyRequestError: The operation would yield an incorrect node tree.")])]),e._v(" "),a("p",[e._v("This browser error will not show up when using the VuePress dev server, only in\nbuilds.")]),e._v(" "),a("p",[e._v("Do not place HTML comment lines "),a("code",[e._v("\x3c!-- --\x3e")]),e._v(" inside a paragraph element when using\nVue components. There are cases where it will work such as before or after any\ntext within the element. Generally it is a practice that can cause issues..")]),e._v(" "),a("h2",{attrs:{id:"vuepress-plugin-html-redirect"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vuepress-plugin-html-redirect"}},[e._v("#")]),e._v(" @vuepress/plugin-html-redirect")]),e._v(" "),a("p",[e._v("Note that a redirect is to a directory path and not to a file. There must be a\nREADME.md file in the directory that VuePress can display. Going to a file will\ncause a problem in production and display a counter. However this will not\nhappen in development. Most likely this is a problem with the plugin as at Jul,\n5th 2021.")]),e._v(" "),a("h2",{attrs:{id:"config-themeconfig-smoothscroll"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#config-themeconfig-smoothscroll"}},[e._v("#")]),e._v(" config.themeConfig.smoothScroll")]),e._v(" "),a("p",[e._v("See\n"),a("RouterLink",{attrs:{to:"/dev/theme.html#config-themeconfig-smoothscroll"}},[e._v("config.themeConfig.smoothScroll")]),e._v(".")],1),e._v(" "),a("h2",{attrs:{id:"inline-code-file-references"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#inline-code-file-references"}},[e._v("#")]),e._v(" Inline Code File References")]),e._v(" "),a("p",[e._v("When you change a file that holds code and reference it using the VuePress\nmarkdown operator <<< and change the code, the changes may not appear.")]),e._v(" "),a("div",{staticClass:"language-markdown line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-markdown"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("\x3c!-- prettier-ignore --\x3e")]),e._v("\n<<< @/docs/airnode/v0.3/grp-providers/tutorial/quick-deploy-local/src/config.json\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br")])]),a("p",[e._v("VuePress uses "),a("a",{attrs:{href:"https://vuepress.vuejs.org/config/#locales",target:"_blank",rel:"noopener noreferrer"}},[e._v("cache-loader"),a("OutboundLink")],1),e._v(" by\ndefault to greatly speed up the compilation of webpack. Remove the cache one\ntime to get the code files changes to appear.")]),e._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("yarn")]),e._v(" docs:dev --no-cache "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# remove cache before each build.")]),e._v("\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br")])]),a("p",[e._v("Also note that it may be necessary to instruct Prettier not to format the <<<\noperator. When the path is long Prettier may add a line break before the path.")]),e._v(" "),a("h2",{attrs:{id:"symlinks-for-readme-md"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#symlinks-for-readme-md"}},[e._v("#")]),e._v(" SymLinks for README.md")]),e._v(" "),a("p",[e._v("When creating a symlink for a markdown file you may need to wait for Visual\nStudio Code to redraw the legends correctly to the right of the filename.")]),e._v(" "),a("h2",{attrs:{id:"chrome-console-error-app-js"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#chrome-console-error-app-js"}},[e._v("#")]),e._v(" Chrome Console Error (app.js)")]),e._v(" "),a("p",[e._v("It may be time to clear Chrome's cached files during development if there is a\nconsole error referencing the fact that "),a("code",[e._v("app.js")]),e._v(" cannot be found. This seems\nvery rare.")]),e._v(" "),a("h2",{attrs:{id:"vue-language-features-volar"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue-language-features-volar"}},[e._v("#")]),e._v(" Vue Language Features (Volar)")]),e._v(" "),a("p",[e._v("This VS Code plugin is used for Vue 3 support. Using it with VuePress (and\nVue 2) will cause issues where the markdown files get checked as being js code.")])],1)}),[],!1,null,null,null);t.default=r.exports}}]);