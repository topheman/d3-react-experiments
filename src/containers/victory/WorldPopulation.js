import React from 'react';

import navigator from '../../utils/react/navigator';
import WorldPopulation from '../../components/victory/WorldPopulation/WorldPopulation';

const VictoryWorldPopulationSexRatio = () => (
  <div>
    <h2>Victory</h2>
    <WorldPopulation/>
    <p>Data comes from <a href="http://www.census.gov/population/international/data/idb/informationGateway.php" title="census.gov">census.gov</a></p>
  </div>
);

export default navigator()(VictoryWorldPopulationSexRatio);
