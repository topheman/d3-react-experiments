import { csv, json } from 'd3-request';

const resources = {};

export const asyncLoadLifeExpectancy = () => {
  // we use cache, not to make the request multiple times
  if (resources.lifeExpectancy) {
    return Promise.resolve(resources.lifeExpectancy);
  }
  return new Promise((res, rej) => {
    /**
     * we use webpack's require (which will pass by file-loader) the require will:
     * - return the real address accessible via http (may change once build according to hash for example)
     * - this will automatically copy the file to assets (and version it with a hash)
     */
    csv(require('./fixtures/life-expectancy.csv'), (error, data) => {
      if (error) {
        return rej(error);
      }
      // cache the response for next ones
      resources.lifeExpectancy = data;
      return res(data);
    });
  });
};

/**
 * Retrieve the download infos of the last month for one package
 * Call to the npm registry API
 * Results are cached in localStorage
 * @param packageName
 * @returns {Promise}
 */
const asyncLoadNpmLastDownloadsInMonth = (packageName) => {
  const currentDate = (new Date()).toISOString().substr(0, 10);
  const baseUrl = 'https://api.npmjs.org/downloads/range/last-month/';
  const url = `${baseUrl}${['*', ''].indexOf(packageName) > -1 ? '' : packageName}`;
  // invalidate cache
  if (localStorage.getItem('currentDate') !== currentDate) {
    localStorage.removeItem(currentDate);
  }
  // return cached resource if cached
  let resource = JSON.parse(localStorage.getItem(currentDate)) || {};
  if (resource && resource[url]) {
    return Promise.resolve(resource[url]);
  }
  return new Promise((res, rej) => {
    json(url, (error, data) => {
      if (error) {
        return rej(error);
      }
      // cache resource
      resource = JSON.parse(localStorage.getItem(currentDate)) || {};
      resource[url] = data;
      localStorage.setItem(currentDate, JSON.stringify(resource));
      // keep track of the date to be able to invalidate cache
      localStorage.setItem('currentDate', currentDate);
      return res(data);
    });
  });
};

/**
 * Retrieve the download infos of the last month for multiple packages in parallel
 * Call to the npm registry API
 * @param packageNames
 * @returns {*|Promise<U>|Thenable<U>|Promise.<*>}
 */
export const bulkLoadNpmLastDownloadsInMonth = (packageNames = []) => {
  const promises = packageNames
    .filter((packageName, index, arr) => arr.indexOf(packageName) === index)
    .map(asyncLoadNpmLastDownloadsInMonth);
  return Promise.all(promises)
    .then(results => results.reduce((acc, cur, index) => {
      acc[packageNames[index]] = cur;
      return acc;
    }, {}));
};
