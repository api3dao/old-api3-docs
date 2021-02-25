
//const versions = require('../versions.json')
//const fse = require('fs-extra')
//const path = process.cwd()+"/docs"
const vrs = ['next', 'pre-alpha']
var selectedVrs = "DUDE-3";

module.exports = {
  
  get version(){
    console.log('+++++++++++++++++++++ SIDEBARS. get version +++++++++++++++++++++++++')
    return selectedVrs
  },

  setVersion(vrs){
    console.log('+++++++++++++++++++++ SIDEBARS. set version +++++++++++++++++++++++++')
    selectedVrs = vrs
    return '/'+vrs+'/'
  },

  get versionMenu(){
    const v = {
      text: 'Versions',
      ariaLabel: 'Versions Menu',
      items: [
        { text: 'next', link: '/next/' },
        { text: 'pre-alpha', link: '/pre-alpha/' }
      ]
    }
    console.log(process.env.NODE_ENV)
    console.log(v)
    if(process.env.NODE_ENV === 'development') return v;
    return { text: '', link: '' };
  },


  get list () {
    console.log('+++++++++++++++++++++ SIDEBARS +++++++++++++++++++++++++')
    let sidebars = {}

    vrs.forEach((version) => {
      let sidebar = require(`../../${version}/sidebar.js`)
      sidebars[`/${version}/`] = sidebar
    })
    //console.log('>>> sidebars:', JSON.stringify(sidebars))

    return sidebars
  },

}

