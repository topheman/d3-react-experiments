import React from 'react';

import Navigator from '../../components/Navigator/Navigator';
import WorldPopulationSexRatio from '../../components/victory/WorldPopulationSexRatio/WorldPopulationSexRatio';

const VictoryWorldPopulationSexRatio = () => (
  <div>
    <Navigator prev="/d3act-mixed" next="/d3act-barchart">
    <h2>Victory</h2>
    <WorldPopulationSexRatio/>
    <p>Data comes from <a href="http://www.census.gov/population/international/data/idb/informationGateway.php" title="census.gov">census.gov</a></p>
    </Navigator>
  </div>
);

export default VictoryWorldPopulationSexRatio;
