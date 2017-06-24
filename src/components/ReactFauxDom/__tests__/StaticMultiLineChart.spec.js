import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import StaticMultiLineChart from '../StaticMultiLineChart/StaticMultiLineChart';
import { mockDataLifeExpectancy } from '../../../test/jestHelpers';

describe('components/ReactFauxDom/StaticMultiLineChart', () => {
  it('should render correctly [shallow]', () => {
    const wrapper = shallow(
      <StaticMultiLineChart
        {...mockDataLifeExpectancy()}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
