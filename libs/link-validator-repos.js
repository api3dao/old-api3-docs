/**
 * Checks links in repos that are directed to the docs.
 *
 * node ./libs/link-validator-repos.js
 * Execute from root of api3-docs
 *
 * USAGE: see the usage instructions at
 * https://docs.api3.org/dev/link-validator.html
 *
 * To follow the flow of this script start at the bottom.
 *
 * This script requires a GitHub token to run. Place it in a file named:
 * myGitHubToken.json in the /libs folder. Formatted as follows:
 * { "token": "ghp_hn3WSv9...1D44QIJ4Q1li2" }
 */

const colors = require('colors');
const oust = require('oust');
const axios = require('axios');
const {
  latestVersion,
  latestBeaconVersion,
  latestOisVersion,
} = require('../docs/.vuepress/config');
const { token } = require('./myGitHubToken.json');

console.log;
console.log('\n\n');
console.log('|++++++++++++++++++++++++');
console.log('| Link Validator Repos');
console.log('|++++++++++++++++++++++++\n');

// The total count of links that failed or passed, displayed when script ends.
let totalFailedCnt = 0;
let totalPassedCnt = 0;

// Array of all links that fail, displayed when script ends.
let failuresArr = [];

/**
 * Tests one link per execution, called only by the run() function.
 * @param {*} url
 * @param {*} filePath
 * @returns
 */
async function testLink(url, filePath) {
  try {
    // START: ignore section
    // TODO: This needs to move to an ignore file.
    let ignore = [];
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

/**
 * Test all links in the links object. Called only by the start() function.
 */
async function run() {
  console.log('\n> Checking links:', Object.keys(links).length), 'links.';
  for (var key in links) {
    let fail = await testLink(key, links[key]);
    if (fail === 1) {
      totalFailedCnt++;
    } else {
      totalPassedCnt++;
    }
  }
  console.log('\n');
}

/**
 * Only allow links to the docs to be tested.
 * @param {*} href
 * @returns
 */
async function filter(href) {
  if (href && href.indexOf('https://docs.api3.org/') === 0) return href;
  return undefined;
}

/**
 * Loads all links to the docs for all files.
 */
async function loadLinks() {
  console.log('\n> Loading links from markdown files @GitHub.');
  let cnt = 0;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    cnt++;
    try {
      const url =
        'https://github.com/api3dao/' +
        file.repo +
        '/blob/' +
        file.branch +
        '/' +
        file.path;

      axios.defaults.timeout = 10000;
      const r = await axios.get(url, {
        headers: {
          Authorization: `Bearer ` + token,
          'Content-Type': 'application/json',
        },
      });

      // Parse the html for links and add them to the links object.
      const rLinks = oust(r.data, 'links');

      // Filter and rewrites.
      for (let i = 0; i < rLinks.length; i++) {
        let href = rLinks[i];

        /** Filter the href. */
        href = await filter(href, url);
        if (href === undefined) {
          continue;
        }

        // Re-write /airnode/latest, /beacon/latest, /ois/latest
        href = href.replace('/airnode/latest/', latestVersion);
        href = href.replace('/beacon/latest/', latestBeaconVersion);
        href = href.replace('/ois/latest/', latestOisVersion);
        /** Add URL to links object */
        links[href] = 'src > ' + url;
      }

      // Pause because calling GitHub rapidly upsets them.
      await new Promise((resolve) => setTimeout(resolve, 50));
      if (cnt > 1) {
        process.stdout.moveCursor(0, -1); // up one line
        process.stdout.clearLine(1); // from cursor to end
      }

      console.log(cnt, 'Scanned file >', url);
    } catch (error) {
      console.error(error);
      process.stdout.write(
        colors.bold.red('Failed to get links for file:', url, '\n')
      );
      process.exit();
    }
  }
  process.stdout.moveCursor(0, -1); // up one line
  process.stdout.clearLine(1); // from cursor to end
  console.log('> Links loaded:', Object.keys(links).length);
  console.log(links);
}

/**
 * Loads all files for each repo/branch pair.
 */
async function loadFiles() {
  console.log('\n> Scanning repos for markdown files @GitHub.');
  let cnt = 0;
  try {
    for (var key in repos) {
      cnt++;

      // Axios get repo/branch files.
      const url =
        'https://api.github.com/repos/api3dao/' +
        key +
        '/git/trees/' +
        repos[key] +
        '?recursive=1';
      const r = await axios.get(url, {
        headers: {
          Authorization: `Bearer ` + token,
          'Content-Type': 'application/json',
        },
      });

      // Add only markdown files to the files array.
      for (let i = 0; i < r.data.tree.length; i++) {
        // Do not scan api3-docs
        if (key === 'api3-docs') continue;
        const file = r.data.tree[i];
        if (file.path.endsWith('.md')) {
          files.push({ repo: key, branch: repos[key], path: file.path });
        }
      }
      if (cnt > 1) {
        process.stdout.moveCursor(0, -1); // up one line
        process.stdout.clearLine(1); // from cursor to end
      }

      console.log(' ', cnt, 'Scanned repo > ', key, '/', repos[key]);
    }
  } catch (error) {
    console.error(error);
    process.stdout.write(colors.bold.red('Failed to get file:', url, '\n'));
    process.exit();
  }
  process.stdout.moveCursor(0, -1); // up one line
  process.stdout.clearLine(1); // from cursor to end
  console.log('> Markdown files found in repos:', files.length);
}

/**
 * Prints out any failures at the end of the script execution.
 */
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

/**
 * Loads all api3dao repos from Github and their default_branch.
 */
async function loadRepos() {
  console.log('\n> Loading repos @GitHub.');
  let cnt = 0;
  try {
    const url = 'https://api.github.com/orgs/api3dao/repos';
    const r = await axios.get(url, {
      headers: {
        Authorization: `Bearer ` + token,
        'Content-Type': 'application/json',
      },
    });

    for (let i = 0; i < r.data.length; i++) {
      const repo = r.data[i];
      repos[repo.name] = repo.default_branch;
    }
    console.log(repos);
  } catch (error) {
    console.error(error);
    process.stdout.write(colors.bold.red('Failed to get repos:', '\n'));
    process.exit();
  }
  process.stdout.moveCursor(0, -1); // up one line
  process.stdout.clearLine(1); // from cursor to end
  console.log('> Repos loaded:', Object.keys(repos).length);
}

let repos = {};
let files = [];
let links = {};

/**
 * Start the full execution of this script.
 */
async function start() {
  await loadRepos();
  await loadFiles();
  await loadLinks();
  await run();
  await printFailures(); // Print failures

  console.log('\n|++++++++++++++++++++++++');
  console.log('| END: Link Validator Repos');
  console.log('|++++++++++++++++++++++++\n');
}

start();
