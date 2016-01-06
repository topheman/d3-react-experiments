import stackoverflowFixtures from './fixtures/stackoverflow-survey.json';
import censusFixtures from './fixtures/census-data-compressed.json';

const censusPreparedData = censusFixtures.data.reduce((acc, curr) => {
  // the key is the year
  acc[curr[2]] = acc[curr[2]] ? acc[curr[2]] : {};
  // the second key is the range of age
  acc[curr[2]][curr[3]] = acc[curr[2]][curr[3]] ? acc[curr[2]][curr[3]] : {};
  // for each range of age of each year, we take the rest of the infos
  for (let i = 4; i <= 10; i++) {
    acc[curr[2]][curr[3]][censusFixtures.headers[i]] = curr[i];
  }
  return acc;
}, {});

export const censusRawData = () => {
  return censusPreparedData;
};

export const d3actPieExtractMostPopularTechnologiesByYear = (year) => {
  return stackoverflowFixtures.mostPopularTechnologies[year].reduce((accumulator, current) => {
    accumulator[current.name] = (current.score * 100).toPrecision(4);// 0.544 * 100 = 54.400000000000006 :(
    return accumulator;
  }, {});
};

export const d3actBarExtractMostPopularTechnologiesByYear = (year) => {
  return stackoverflowFixtures.mostPopularTechnologies[year].reduce((accumulator, current) => {
    accumulator.push({
      xValue: current.name,
      yValue: parseFloat((current.score * 100).toPrecision(4))// 0.544 * 100 = 54.400000000000006 :(
    });
    return accumulator;
  }, []);
};

export const d3actPieExtractDesktopOperatingSystemByYear = (year) => {
  return stackoverflowFixtures.desktopOperatingSystem[year].reduce((accumulator, current) => {
    accumulator[current.name] = (current.score * 100).toPrecision(4);// 0.544 * 100 = 54.400000000000006 :(
    return accumulator;
  }, {});
};

export const d3actBarExtractDesktopOperatingSystemByYear = (year) => {
  return stackoverflowFixtures.desktopOperatingSystem[year].reduce((accumulator, current) => {
    accumulator.push({
      xValue: current.name,
      yValue: parseFloat((current.score * 100).toPrecision(4))// 0.544 * 100 = 54.400000000000006 :(
    });
    return accumulator;
  }, []);
};
