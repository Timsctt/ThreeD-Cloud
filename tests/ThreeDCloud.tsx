import React from 'react';
import renderer from 'react-test-renderer';
import { ThreeDCloud } from '../src';

it('renders correctly', () => {
  const tree = renderer.create(<ThreeDCloud />);
  expect(tree).toMatchSnapshot();
});
