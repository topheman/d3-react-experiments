import React from 'react';
import TransitionMultiLineChart from '../TransitionMultiLineChart/TransitionMultiLineChart';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { mockDataLifeExpectancy } from '../../../test/jestHelpers';

describe('components/d3/StaticMultiLineChart', () => {
  it('should render correctly [deep]', () => {
    const wrapper = mount(
      <TransitionMultiLineChart
        {...mockDataLifeExpectancy()}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
