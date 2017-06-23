import React from 'react';
import Home from '../Home';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('containers/Home', () => {
  it('should render correctly [deep]', () => {
    const wrapper = mount(
      <Home />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
