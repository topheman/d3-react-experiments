import { csv } from 'd3-request';

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
