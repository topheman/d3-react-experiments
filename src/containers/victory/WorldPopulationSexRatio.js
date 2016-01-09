import React from 'react';

import navigator from '../../utils/react/navigator';
import WorldPopulationSexRatio from '../../components/victory/WorldPopulationSexRatio/WorldPopulationSexRatio';

const VictoryWorldPopulationSexRatio = () => (
  <div>
    <h2>Victory</h2>
    <WorldPopulationSexRatio/>
    <p>Data comes from <a href="http://www.census.gov/population/international/data/idb/informationGateway.php" title="census.gov">census.gov</a></p>
  </div>
);

export default navigator()(VictoryWorldPopulationSexRatio);
