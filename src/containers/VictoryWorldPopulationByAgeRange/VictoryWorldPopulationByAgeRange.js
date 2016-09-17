import React from 'react';

import navigator from '../../utils/react/navigator';
import WorldPopulationByAgeRange from '../../components/victory/WorldPopulationByAgeRange/WorldPopulationByAgeRange';

/**
 * Creating the data once.
 */
import {
  victoryWorldPopulationByAgeRange,
  victoryLabelWorldPopulationByAgeRange,
  victoryLabelSetupPopulationByAgeRange
} from '../../resources/helper';

const labelColorConfig = victoryLabelSetupPopulationByAgeRange();

// returns a functions like (year) => []
const getBarLabelByYear = victoryLabelWorldPopulationByAgeRange();

// returns functions to call with labelColorConfig (which will add colors and labels)
const compilePieData = victoryWorldPopulationByAgeRange('pie');
const compileBarData = victoryWorldPopulationByAgeRange('bar');

const VictoryWorldPopulationByAgeRange = () => (
  <div>
    <h2>Victory</h2>
    <WorldPopulationByAgeRange
      labelColorConfig={labelColorConfig}
      compilePieData={compilePieData}
      compileBarData={compileBarData}
      getBarLabelByYear={getBarLabelByYear}
    />
    <p>Data comes from <a href="http://www.census.gov/population/international/data/idb/informationGateway.php" title="census.gov">census.gov</a></p>
  </div>
);

export default navigator()(VictoryWorldPopulationByAgeRange);
