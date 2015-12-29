import fixtures from './d3-fixtures.json';

export const d3actPieExtractMostPopularTechnologiesByYear = (year) => {
  return fixtures.mostPopularTechnologies[year].reduce((accumulator, current) => {
    accumulator[current.name] = (current.score * 100).toPrecision(4);// 0.544 * 100 = 54.400000000000006 :(
    return accumulator;
  }, {});
};

export const d3actBarExtractMostPopularTechnologiesByYear = (year) => {
  return fixtures.mostPopularTechnologies[year].reduce((accumulator, current) => {
    accumulator.push({
      xValue: current.name,
      yValue: parseFloat((current.score * 100).toPrecision(4))// 0.544 * 100 = 54.400000000000006 :(
    });
    return accumulator;
  }, []);
};

export const d3actPieExtractDesktopOperatingSystemByYear = (year) => {
  return fixtures.desktopOperatingSystem[year].reduce((accumulator, current) => {
    accumulator[current.name] = (current.score * 100).toPrecision(4);// 0.544 * 100 = 54.400000000000006 :(
    return accumulator;
  }, {});
};

export const d3actBarExtractDesktopOperatingSystemByYear = (year) => {
  return fixtures.desktopOperatingSystem[year].reduce((accumulator, current) => {
    accumulator.push({
      xValue: current.name,
      yValue: parseFloat((current.score * 100).toPrecision(4))// 0.544 * 100 = 54.400000000000006 :(
    });
    return accumulator;
  }, []);
};
