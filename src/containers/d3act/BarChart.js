import React from 'react';

import Navigator from '../../components/Navigator/Navigator';
import BarChartPanel from '../../components/d3act/BarChartPanel/BarChartPanel';

const D3actBarChart = () => (
  <div>
    <Navigator prev="/victory-world-population-sex-ratio" next="/d3act-mixed">
    <h2>d3act</h2>
    <BarChartPanel/>
    <p>Data comes from <a href="http://stackoverflow.com/research/developer-survey-2015" title="2015 Developer Survey">stackoverflow 2015 Developer Survey</a></p>
    </Navigator>
  </div>
);

export default D3actBarChart;
