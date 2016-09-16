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

export const victoryLabelSetupPopulationByAgeRange = () => {
  return [
    {fill: '#F66D3B', label: '0-14'},
    {fill: '#D92E1D', label: '15-64'},
    {fill: '#FFAF59', label: '65+'}
  ];
};

export const victoryWorldPopulationByAgeRange = (mode) => (fillInfos) => {
  const results = Object.keys(censusPreparedData).reduce((acc, year) => {
    acc[year] = Object.keys(censusPreparedData[year]).reduce((accRange, range, index) => {
      if (range !== 'Total') {
        switch (mode) {
          case 'pie':
            accRange.push({
              x: `${range} (${censusPreparedData[year][range]['Percent Both Sexes']}%)`,
              y: censusPreparedData[year][range]['Percent Both Sexes']
              // no fill infos, you pass that in colorScale prop
            });
            break;
          case 'bar':
            accRange.push({
              x: index,
              y: censusPreparedData[year][range]['Both Sexes Population'],
              fill: fillInfos[index - 1].fill
            });
            break;
          default:
            throw new Error('Bad argument passed. Only accepts percentage or number');
        }
        return accRange;
      }
      return accRange;
    }, []);
    return acc;
  }, {});
  return (year) => {
    return results[year];
  };
};

export const victoryLabelWorldPopulationByAgeRange = () => {
  const results = Object.keys(censusPreparedData).reduce((acc, year) => {
    acc[year] = Object.keys(censusPreparedData[year]).reduce((accRange, range) => {
      if (range !== 'Total') {
        accRange.push(range + ' - ' + (censusPreparedData[year][range]['Both Sexes Population']).toString().replace(/\B(?=(\d{3})+\b)/g, ' '));
        return accRange;
      }
      return accRange;
    }, []);
    return acc;
  }, {});
  return (year) => {
    return results[year];
  };
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
