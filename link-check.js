/**
 * USAGE: see the usage instruction at 
 * https://docs.api3.org/dev/link-validator.html
 */

const { readFileSync } = require('fs')
var file = require('file')
var colors = require('colors')
const oust = require('oust');
const axios = require('axios');

/**
 * node index.js http:localhost:8080 docs/.vuepress/dist
 * Gather args
 * [2] (baseURL) the target protocol URL (http://localhost:8080) for link verification
 * [3] (distDir) is the sub-directory (usually dist) with the html docs
 */
const baseURL = process.argv[2];
const distDir = process.argv[3];

console.log
console.log('\n\n')
console.log('++++++++++++++++++++++++')
console.log('Link Validator')
console.log('baseURL:', baseURL)
console.log('distDir:', distDir)
console.log('++++++++++++++++++++++++\n')

// Array of dir objects and their files {dir,files}
let arr = [];

// The total count of links that failed or passed, displayed when script ends.
let totalFailedCnt = 0;
let totalPassedCnt = 0;

// Array of all links that fail, displayed when script ends.
let failuresArr = [];

/**
 * Callback for file.walkSync, add each 
 * @param {*} dirPath 
 * @param {*} dirs 
 * @param {*} files 
 */
function tempCB(dirPath, dirs, files){
    arr.push( {dir:dirPath, files:files} )
}

async function testLink(url, filePath){
  try {
    const response = await axios.get(url);

    // If there is an anchor make sure it exists.
    // Ignore however any direct anchor in the TOC (http://127.0.01:8080#deploying)
    let arr = url.split('.html#')
    if (arr.length === 2)
    {
      // If the anchor is missing in the response.data, throw an error
      if(response.data.indexOf('#'+arr[1]) === -1){
        throw new Error('Did not find anchor: #'+arr[1])
      }
    }
    return 0
	} catch (error) {
    console.log('   ', colors.bold.red(error.toString()), colors.bold.red('-'), colors.bold.red(url))
    failuresArr.push({file:filePath, url:url, error:error.toString()})
    return 1
	}
}

/**
 * Creates a list of file paths from the rootDir
 */
async function start(){
  file.walkSync(distDir, tempCB);
  for(let i=0; i< arr.length; i++){
    for(let z=0; z< arr[i].files.length; z++){
      const filePath = arr[i].dir+'/'+arr[i].files[z];
      /** 
       * Only html files, skip dir "/deprecated/"" and files starting with: "/depr-""
      */
      if(filePath.indexOf('.html') > 0 &&
        filePath.indexOf('/depr-') === -1 &&
        filePath.indexOf('/deprecated/') === -1 
        ){

        const htmlString = readFileSync(filePath, 'utf8')
        const links = oust(htmlString, 'links');
        console.log(colors.bold.blue('\n--> '+filePath), colors.bold.blue('('+links.length+' links)'))

        let passed = 0;
        let failed = 0;

        // Go thru the links
        for(var x=0;x<links.length; x++){
          let url = links[x]
          if( url.indexOf('http://') === -1 && url.indexOf('https://') === -1 ) {
            url = baseURL+url
          }
          // Axios test link
          let fail = await testLink(url, filePath)
          if(fail === 1){
            failed++; totalFailedCnt++;
          }
          else{
            passed++; totalPassedCnt++;
          }
        }
        // Finished testing all links from a given file
        if(failed > 0 ) console.log(colors.bold.black('    --------------------------------------'))
        process.stdout.write(colors.bold.blue('    Passed: '+passed))
        if(failed > 0) process.stdout.write(colors.bold.red('    Failed: '+failed))
        console.log()
      }
    }
  }

  // Printout at the END
  console.log('\n')

  // Failures
  if(failuresArr.length > 0){
    console.log(colors.bold.underline.blue('Total passed: '+totalPassedCnt))
    console.log(colors.bold.underline.red('Total failed: '+totalFailedCnt))
    console.log()
    for( var i=0; i<failuresArr.length; i++){
      console.log(colors.bold.red(failuresArr[i].file))
      console.log(colors.bold.red(failuresArr[i].url))
      console.log(colors.bold.red(failuresArr[i].error))
      console.log()
    }
  }
  else{
    console.log(colors.bold.green('All links tested OK.'))
    console.log(colors.bold.underline.blue('Total passed: '+totalPassedCnt))
  }
  console.log('++++++++++++++++++++++++')
  console.log('END: Link Validator')
  console.log('++++++++++++++++++++++++\n')
}

start()
