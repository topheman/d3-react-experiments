import React from 'react';
import WorldPopulationByAgeRange from '../WorldPopulationByAgeRange/WorldPopulationByAgeRange';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import {
  victoryWorldPopulationByAgeRange,
  victoryLabelWorldPopulationByAgeRange,
  victoryLabelSetupPopulationByAgeRange
} from '../../../resources/helper';

describe('components/victory/WorldPopulationByAgeRange', () => {
  it('should render correctly [shallow]', () => {

    const labelColorConfig = victoryLabelSetupPopulationByAgeRange();
    const getBarLabelByYear = victoryLabelWorldPopulationByAgeRange();
    const compilePieData = victoryWorldPopulationByAgeRange('pie');
    const compileBarData = victoryWorldPopulationByAgeRange('bar');

    const wrapper = shallow(
      <WorldPopulationByAgeRange
        labelColorConfig={labelColorConfig}
        compilePieData={compilePieData}
        compileBarData={compileBarData}
        getBarLabelByYear={getBarLabelByYear}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
