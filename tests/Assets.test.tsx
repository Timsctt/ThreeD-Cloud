import React from 'react';
import { render } from '@testing-library/react';
import { Play } from '../src/assets/Play';
import { Pause } from '../src/assets/Pause';

test('renders the Play component', () => {
  const { container } = render(<Play />);

  expect(container.firstChild).toMatchSnapshot();
});

test('renders the Pause component', () => {
  const { container } = render(<Pause />);

  expect(container.firstChild).toMatchSnapshot();
});
