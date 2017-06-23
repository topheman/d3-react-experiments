import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import TransitionMultiLineChart from '../TransitionMultiLineChart/TransitionMultiLineChart';
import { mockDataLifeExpectancy } from '../../../test/jestHelpers';

describe('components/victory/TransitionMultiLineChart', () => {
  it('should render correctly [shallow]', () => {
    const wrapper = shallow(
      <TransitionMultiLineChart
        {...mockDataLifeExpectancy()}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
