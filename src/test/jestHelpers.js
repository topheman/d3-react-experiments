const parse = require('csv-parse/lib/sync');
const path = require('path');
const fs = require('fs');
const { prepareDataLifeExpectancy } = require('../resources/helper');

const csvFileContent = fs.readFileSync(path.join(__dirname, '../resources/fixtures/life-expectancy.csv'), 'utf8');
const censusPreparedData = parse(csvFileContent, {columns: true});

module.exports = {
  mockDataLifeExpectancy(selectedCountries = ['Algeria', 'Ethiopia', 'France', 'Germany', 'India']) {
    return prepareDataLifeExpectancy(censusPreparedData, selectedCountries);
  }
};
