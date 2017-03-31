import React from 'react';
import StaticMultiLineChart from '../StaticMultiLineChart/StaticMultiLineChart';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { mockDataLifeExpectancy } from '../../../test/jestHelpers';

describe('components/d3/StaticMultiLineChart', () => {
  it('should render correctly [deep]', () => {
    const wrapper = mount(
      <StaticMultiLineChart
        {...mockDataLifeExpectancy()}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
