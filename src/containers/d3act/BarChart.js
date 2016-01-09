import React from 'react';

import navigator from '../../utils/react/navigator';
import BarChartPanel from '../../components/d3act/BarChartPanel/BarChartPanel';

const D3actBarChart = () => (
  <div>
    <h2>d3act</h2>
    <BarChartPanel/>
    <p>Data comes from <a href="http://stackoverflow.com/research/developer-survey-2015" title="2015 Developer Survey">stackoverflow 2015 Developer Survey</a></p>
  </div>
);

export default navigator()(D3actBarChart);
