
const versions = require('../versions.json')
const fse = require('fs-extra')
const path = process.cwd()+"/docs"


const vrs = ['next', 'pre-alpha']

module.exports = {

  get list () {
    let sidebars = {}

    vrs.forEach((version) => {
      let sidebar = require(`../../${version}/sidebar.js`)
      sidebars[`/${version}/`] = sidebar
    })
    console.log('>>> sidebars:', sidebars)

    return sidebars
  },

}