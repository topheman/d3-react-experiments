import React from 'react';

import navigator from '../../components/Navigator/injectNavigator';
import BarChartPanel from '../../components/d3act/BarChartPanel/BarChartPanel';

import { d3actBarExtractMostPopularTechnologiesByYear } from '../../resources/helper';

/**
 * This data could be fetch from a server or whatever
 * Since we have it in local, it's prepare only once.
 */
const data = {
  2015: d3actBarExtractMostPopularTechnologiesByYear(2015),
  2014: d3actBarExtractMostPopularTechnologiesByYear(2014),
  2013: d3actBarExtractMostPopularTechnologiesByYear(2013)
};

const D3actBarChart = () => {
  return (
    <div>
      <h2>d3act</h2>
      <BarChartPanel data={data}/>
      <p>Data comes from <a href="http://stackoverflow.com/research/developer-survey-2015" title="2015 Developer Survey">stackoverflow 2015 Developer Survey</a></p>
    </div>
  );
};

export default navigator()(D3actBarChart);
