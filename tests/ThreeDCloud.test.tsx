import { render } from '@testing-library/react';
import { ThreeDCloud } from '../src';

describe('displayCloud', () => {
  it('should render the cloud', () => {
    render(
      <ThreeDCloud radius={200} size={150}>
        <p>element</p>
        <p>element</p>
      </ThreeDCloud>
    );
  });
});
