import React from 'react';

import navigator from '../../utils/react/navigator';
import PieChartPanel from '../../components/d3act/PieChartPanel/PieChartPanel';

const D3actMixed = () => (
  <div>
    <h2>d3act</h2>
    <PieChartPanel/>
    <p>Data comes from <a href="http://stackoverflow.com/research/developer-survey-2015" title="2015 Developer Survey">stackoverflow 2015 Developer Survey</a></p>
  </div>
);

export default navigator()(D3actMixed);
