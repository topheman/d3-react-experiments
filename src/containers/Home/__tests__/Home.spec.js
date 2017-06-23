import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Home from '../Home';

describe('containers/Home', () => {
  it('should render correctly [deep]', () => {
    const wrapper = mount(
      <Home />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
