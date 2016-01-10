import React from 'react';

import navigator from '../../utils/react/navigator';
import WorldPopulationByAgeRange from '../../components/victory/WorldPopulationByAgeRange/WorldPopulationByAgeRange';

const VictoryWorldPopulationByAgeRange = () => (
  <div>
    <h2>Victory</h2>
    <WorldPopulationByAgeRange/>
    <p>Data comes from <a href="http://www.census.gov/population/international/data/idb/informationGateway.php" title="census.gov">census.gov</a></p>
  </div>
);

export default navigator()(VictoryWorldPopulationByAgeRange);
