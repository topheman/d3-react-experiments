import React from 'react';
import TransitionMultiLineChart from '../TransitionMultiLineChart/TransitionMultiLineChart';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { mockDataLifeExpectancy } from '../../../test/jestHelpers';

describe('components/recharts/TransitionMultiLineChart', () => {
  it('should render correctly [shallow]', () => {
    const wrapper = shallow(
      <TransitionMultiLineChart
        {...mockDataLifeExpectancy()}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
