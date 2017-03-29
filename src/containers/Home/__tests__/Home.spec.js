import React from 'react';
import Home from '../Home';
import renderer from 'react-test-renderer';

describe('containers/Home', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Home/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
