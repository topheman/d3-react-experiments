/**
 * A little script to turn the csv from http://www.census.gov/population/international/data/idb/informationGateway.php
 * to json
 *
 * To use it just:
 * node bin/csv-parse-census.js --source ./resources/census_data_20160104_568ac7b494753.csv --output-dir ./src/resources/fixtures
 */

var parse = require('csv-parse');
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));

if (!argv.source || !argv['output-dir']) {
  console.log('--source or --output-dir is missing');
  process.exit(1);
}

var outputExtended = [];
var outputCompressed = {
  headers: [],
  data: []
};

// Create the parser
var parser = parse({delimiter: ','});

// Use the writable stream api
var fileLineNumber = 1;
var headers;
parser.on('readable', function(){
  while(record = parser.read()){
    if (fileLineNumber === 2) {
      headers = record;
      outputCompressed.headers = headers;
    }
    if (fileLineNumber > 2) {
      outputExtended.push(record.reduce(function(acc, curr, index) {
        var toNumeric = parseFloat(curr);
        acc[headers[index]] = isNaN(toNumeric) || headers[index] === 'Age' ? curr : toNumeric;
        return acc;
      }, {}));
      outputCompressed.data.push(record.map(function(curr, index) {
        var toNumeric = parseFloat(curr);
        return isNaN(toNumeric) || headers[index] === 'Age' ? curr : toNumeric;
      }));
    }
    fileLineNumber++;
  }
});

// Catch any error
parser.on('error', function(err){
  console.log(err.message);
});

// When we are done, test that the parsed output matched what expected
parser.on('finish', function(){
  var outputDir = argv['output-dir'].replace(/(\/+)$/,"");// remove trailing slashes
  var outputExtendedFile = outputDir + '/census-data-extended.json';
  fs.writeFileSync(outputExtendedFile, JSON.stringify(outputExtended));
  console.log('Saved at ' + outputExtendedFile);
  var outputCompressedFile = outputDir + '/census-data-compressed.json';
  fs.writeFileSync(outputCompressedFile, JSON.stringify(outputCompressed));
  console.log('Saved at ' + outputCompressedFile);
});

var input = fs.createReadStream(argv.source);
input.pipe(parser);
