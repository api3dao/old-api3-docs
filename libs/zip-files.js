/**
 * This script zips files from a tutorial into a project folder
 * to be downloaded by the reader. These folders are useful for the
 * reader to use when running the tutorial.
 *
 * USAGE: see the usage instructions at
 * https://docs.api3.org/dev/zip-files.html
 */

const JSZip = require('jszip');
const fs = require('fs');
const colors = require('colors');

console.log;
console.log('\n\n');
console.log('++++++++++++++++++++++++');
console.log('Zip Files');
console.log('++++++++++++++++++++++++\n');

/**
 *
 * @param {string} vrs The version of the docs the folder is in, v0.3, v1.1
 * @param {string} folder The folder that the tutorial is in.
 * @param {boolean}} includeAWS If there is an aws.env file to include
 */
async function run(vrs, folder, includeAWS) {
  console.log(includeAWS);
  try {
    var zip = new JSZip();

    // prettier-ignore
    const configData = fs.readFileSync(
      'docs/airnode/' + vrs +'/grp-providers/tutorial/' +folder + '/src/config.json',
      'utf8'
    );
    // prettier-ignore
    const secretsData = fs.readFileSync(
      'docs/airnode/' + vrs + '/grp-providers/tutorial/' +folder + '/src/secrets.env',
      'utf8'
    );
    let awsData;
    if (includeAWS) {
      // prettier-ignore
      awsData = fs.readFileSync(
        'docs/airnode/' + vrs + '/grp-providers/tutorial/' + folder + '/src/aws.env',
        'utf8'
      );
    }

    zip
      .folder(folder)
      .folder('config')
      .file('config.json', configData)
      .file('secrets.env', secretsData);
    if (includeAWS) {
      zip.folder(folder).file('aws.env', awsData);
      zip.folder(folder).folder('output');
    }

    // prettier-ignore
    zip
      .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
      .pipe(
        fs.createWriteStream(
          './docs/.vuepress/public/zip-files/' + folder + '-'+ vrs +'.zip'
        )
      )
      .on('finish', function () {
        // JSZip generates a readable stream with a "end" event,
        // but is piped here in a writable stream which emits a "finish" event.
        console.log('zip file written.');
      });
  } catch (error) {
    process.stdout.write(colors.bold.red(error));
  }
}

run('v0.3', 'quick-deploy-aws', true);
run('v0.3', 'quick-deploy-container', false);
