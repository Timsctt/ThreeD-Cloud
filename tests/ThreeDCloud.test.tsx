import { render } from '@testing-library/react';
import { ThreeDCloud } from '../src';

describe('displayCloud', () => {
  it('should render the cloud', () => {
    render(<ThreeDCloud />);
  });
});
