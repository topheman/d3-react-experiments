import React from 'react';

import Navigator from '../../components/Navigator/Navigator';
import PieChartPanel from '../../components/d3act/PieChartPanel/PieChartPanel';

const D3actMixed = () => (
  <div>
    <Navigator prev="/d3act-barchart" next="/victory-world-population-sex-ratio">
    <h2>d3act</h2>
    <PieChartPanel/>
    <p>Data comes from <a href="http://stackoverflow.com/research/developer-survey-2015" title="2015 Developer Survey">stackoverflow 2015 Developer Survey</a></p>
    </Navigator>
  </div>
);

export default D3actMixed;
