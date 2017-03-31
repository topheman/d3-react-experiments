import React from 'react';
import StaticMultiLineChart from '../StaticMultiLineChart/StaticMultiLineChart';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
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
