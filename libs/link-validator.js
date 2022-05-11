/**
 * USAGE: see the usage instructions at
 * https://docs.api3.org/dev/link-validator.html
 */

const { readFileSync } = require('fs');
var file = require('file');
var colors = require('colors');
const oust = require('oust');
const axios = require('axios');

/**
 * node ./libs/link-validator.js  http://127.0.0.1:8082  ./docs/.vuepress/dist/airnode/v0.3
 * Gather args
 * [2] (baseURL) the target URL (http://localhost:8080) for link verification.
 * [3] (distDir) is the sub-directory (usually dist) with the html docs. If /dist is
 *     used then all folders are validated. Suggest narrowing the scope.
 *     The following (partial list) are suggested folders to check.
 *
 *     /dist/dao-members
 *     /dist/common
 *     /dist/airnode/v0.3
 *     /dist/airnode/next
 *     /dist/dev
 */
const baseURL = process.argv[2];
const distDir = process.argv[3];

console.log;
console.log('\n\n');
console.log('|++++++++++++++++++++++++');
console.log('| Link Validator');
console.log('| baseURL:', baseURL);
console.log('| distDir:', distDir);
console.log('|++++++++++++++++++++++++\n');

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
function tempCB(dirPath, dirs, files) {
  arr.push({ dir: dirPath, files: files });
}

// TODO: This needs to move to an ignore file.
/*
var fs = require("fs");
var text = fs.readFileSync("./link-validator-ignore.txt");
var textByLine = text.split("\n")
*/
let ignore = [
  'https://staging.api3.eth.link/#/',
  'https://www.coingecko.com/en/api/documentation',
  'https://faucet.goerli.mudit.blog/',
  'https://www.rinkebyfaucet.com/',
  'https://dx.doi.org/10.1063/1.3597793',
];

async function testLink(url, filePath) {
  try {
    // IGNORE
    // Some a tags may have javascript:void(0) in href
    if (ignore.indexOf(url) > -1 || url.indexOf('javascript:void(0)') > -1) {
      return;
    }
    // END: ignore section

    axios.defaults.timeout = 10000;
    const response = await axios.get(url);

    // If the urlAnchor is missing/typo in the response.data, throw an error.
    let arr = url.split('.html#');
    let arr2 = url.split('/#');

    let urlAnchor = null;
    // Which one is it? Only of the arrays will have 2 rows.
    if (arr.length === 2) {
      urlAnchor = '#' + arr[1];
    } else if (arr2.length === 2) {
      urlAnchor = '#' + arr2[1];
    }

    // Sometimes the anchor indicator (#) is in the
    // path: https://api3.eth.link/#/history/secondary-6
    // This is not an anchor, ignore it.
    if (urlAnchor && urlAnchor.indexOf('#/') > -1) {
      urlAnchor = null;
    }

    // Look for urlAnchor in response.data.
    if (urlAnchor && response.data.indexOf(urlAnchor + '"') === -1) {
      throw new Error('Did not find anchor: ' + urlAnchor);
    }
    process.stdout.write('.');
    return 0;
  } catch (error) {
    process.stdout.write(colors.bold.red('X'));
    failuresArr.push({ file: filePath, url: url, error: error.toString() });
    return 1;
  }
}

let linksObj = {};
/**
 * Creates a list of file paths from the rootDir
 */
async function run(task) {
  let passed = 0;
  let failed = 0;
  console.log('Checking (' + task + ')', Object.keys(linksObj).length),
    'links.';
  for (var key in linksObj) {
    if (linksObj.hasOwnProperty(key)) {
      let fail = await testLink(key, linksObj[key]);
      if (fail === 1) {
        totalFailedCnt++;
      } else {
        totalPassedCnt++;
      }
    }
  }
  console.log('\n');
}

async function loadLinks() {
  file.walkSync(distDir, tempCB);
  for (let i = 0; i < arr.length; i++) {
    for (let z = 0; z < arr[i].files.length; z++) {
      const filePath = arr[i].dir + '/' + arr[i].files[z];

      // Only html files
      if (filePath.indexOf('.html') > 0) {
        const htmlString = readFileSync(filePath, 'utf8');
        const links = oust(htmlString, 'links');

        // Go thru the links and add to master list (linksObj)
        for (var x = 0; x < links.length; x++) {
          let url = links[x];
          if (url.indexOf('http://') === -1 && url.indexOf('https://') === -1) {
            url = baseURL + url;
            linksObj[url] = 'LINK src: ' + filePath;
          } else {
            linksObj[url] = 'LINK src: ' + filePath;
          }
        } // Finished getting all links
      } // end for
    } // end for
  }
}

async function loadImages() {
  file.walkSync(distDir, tempCB);
  for (let i = 0; i < arr.length; i++) {
    for (let z = 0; z < arr[i].files.length; z++) {
      const filePath = arr[i].dir + '/' + arr[i].files[z];

      // Only html files
      if (filePath.indexOf('.html') > 0) {
        const htmlString = readFileSync(filePath, 'utf8');
        const images = oust(htmlString, 'images');

        // Go thru the images and add to master list (linksObj)
        for (var x = 0; x < images.length; x++) {
          let url = images[x];

          // Some may use data:image/ because they are small and VuePress converts to data:image
          // So skip them
          if (url.indexOf('data:image/') === -1) {
            if (
              url.indexOf('http://') === -1 &&
              url.indexOf('https://') === -1
            ) {
              url = baseURL + url;
              linksObj[url] = 'IMAGE src: ' + filePath;
            } else {
              linksObj[url] = 'IMAGE src: ' + filePath;
            }
          }
        } // Finished getting all images
      } // end for
    } // end for
  }
}

async function printFailures() {
  if (failuresArr.length > 0) {
    console.log(colors.bold.underline.blue('Total passed: ' + totalPassedCnt));
    console.log(colors.bold.underline.red('Total failed: ' + totalFailedCnt));
    console.log();
    for (var i = 0; i < failuresArr.length; i++) {
      console.log(i + 1, '-------------------');
      console.log('|', colors.bold.red(failuresArr[i].file));
      console.log('|', colors.bold.red('target > ' + failuresArr[i].url));
      console.log('|', colors.bold.red(failuresArr[i].error));
      console.log();
    }
  } else {
    console.log(colors.bold.green('All links OK.'));
    console.log(colors.bold.underline.blue('Total passed: ' + totalPassedCnt));
  }
}

async function start() {
  linksObj = {}; // Clear master list after each run()
  await loadImages();
  await run('images');

  linksObj = {};
  await loadLinks();
  await run('links');

  // Print failures
  await printFailures();

  console.log('\n|++++++++++++++++++++++++');
  console.log('| END: Link Validator');
  console.log('|++++++++++++++++++++++++\n');
}

start();
