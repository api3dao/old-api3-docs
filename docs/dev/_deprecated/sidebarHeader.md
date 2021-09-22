<!--
  The sidebarHeader was originally for the concept of different Roles that 
  would show a different sidebar for each Role indicated by an Icon. This 
  file is an archive in case it is ever brought back to life. The text below 
  was part of the versioning.md file.
-->

# sidebarHeader.vue


### Version Sidebars

Each version has 1-N sidebars. For example, **pre-alpha** has only *one* sidebar.js file in its root /docs/pre-alpha along with its markdown files and sub-folders. The folders inside /docs/pre-alpha are groups of documents.

```text
docs/
|- 0.1.0/
|- pre-alpha/
   |- ...folders
   | README.md
   |- sidebar.js
|- next/
```

**0.1.0** has *four* sidebar.js files along with the markdown files for each. These folders split the version into categories. The sidebar in the root of the version is known as the *Info* category. There can only be one *Info* category. Sidebars in the sub-folders are known as *Role* categories.

- /docs/0.1.0
- /docs/0.1.0/grp-members
- /docs/0.1.0/grp-developers
- /docs/0.1.0/grp-providers

```text
docs/
|- 0.1.0/
   |- grp-members
      |- ...folders
      | README.md
      |- sidebar.js
   |- grp-developers
      |- ...folders
      | README.md
      |- sidebar.js
   |- grp-providers
      |- ...folders
      | README.md
      |- sidebar.js
   |- README.md
   |- sidebar.js
|- pre-alpha/
|- next/
```

These categories are represented in the sidebar header as buttons the user can use to switch between sidebars. The *Info* category is represented with the smaller info icon. The *Role* categories are represented as larger icons with a label. 

The **SidebarHeader** is a custom Vue Component. It maintains an array of the header definitions for the version.

<!--![Sidebar Headers](./assets/img/sidebar-header.png)-->

Like versions, sidebarHeaders are declared in the .vuepress/config.json file. Note that there is a implied mapping between versions and sidebarHeaders: version.name = sidebarHeaders.vrs. There can only be one **Info button** for each header and it is declared using the *info* key.

```json{1,6}
versions:[
  {name:'next', url:'/next/'},
  {name:'0.1.0', url:'/0.1.0/'},
  {name:'pre-alpha', url:'/pre-alpha/'},
],
sidebarHeaders:[
  {vrs:'pre-alpha', current:true, buttons:[]},
  {vrs:'0.1.0', buttons:[
    {isActive: false, info:true,          baseUrl:'/next/', img:'info-circle'},
    {isActive: false, label:'Members',    baseUrl:'/next/grp-members/', img:'users'},
    {isActive: false, label:'Requesters', baseUrl:'/next/grp-developers/', img:'eye'},
    {isActive: true,  label:'Providers',  baseUrl:'/next/grp-providers/', img:'sitemap'}
  ]}
  {vrs:'next', buttons:[
    {isActive: false, info:true,          baseUrl:'/next/', img:'info-circle'},
    {isActive: false, label:'Members',    baseUrl:'/next/grp-members/', img:'users'},
    {isActive: false, label:'Requesters', baseUrl:'/next/grp-developers/', img:'eye'},
    {isActive: true,  label:'Providers',  baseUrl:'/next/grp-providers/', img:'sitemap'}
  ]}
],,
```

<!--
  The following was under Create a Version
-->

1. Update the **sidebarHeaders key** in .vuepress/config.json.
    - Leave the **btn key** as an empty array for versions that only have one sidebar. 
    - For versions with multiple sidebars, add each folder that contains a sidebar into the **btn** key array.
        - The **btn.info key** declares the *Info btn* which is the files in hte rott of the version folder.
        - The **btn.baseUrl** is the first markdown file to show when a button is selected in the sidebar header. A btn.url without a file will load the README.md by default. 
        - The **btn.label** key is the button text. 
        - The **btn.isActive** key is the default (highlighted) button and sidebar to load by default.
        - The **btn.img** key defines the image associated with the button.