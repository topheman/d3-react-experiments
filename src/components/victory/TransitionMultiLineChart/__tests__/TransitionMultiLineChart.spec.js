import React from 'react';
import TransitionMultiLineChart from '../TransitionMultiLineChart';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { mockDataLifeExpectancy } from '../../../../test/jestHelpers';

describe('components/victory/TransitionMultiLineChart', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <TransitionMultiLineChart
        {...mockDataLifeExpectancy()}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
