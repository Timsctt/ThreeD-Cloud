import '@testing-library/jest-dom/extend-expect';
import { renderHook } from '@testing-library/react-hooks';
import { useCloudElement } from '../src/hooks/useCloudElement';

describe('useCloudElement', () => {
  it('sets the initial state correctly', () => {
    const props = {
      position: { x: 0, y: 0, z: 0 },
      sc: [1, 1, 1, 1],
      depth: 50,
    };

    const { result } = renderHook(() => useCloudElement(props));

    expect(result.current.style).toEqual({});
    expect(result.current.scale).toEqual(1);
  });

  it('updates the state when setStyle is called', () => {
    const props = {
      position: { x: 0, y: 0, z: 0 },
      sc: [1, 1, 1, 1],
      depth: 50,
    };

    const { result } = renderHook(() => useCloudElement(props));

    const newStyle = {
      transform: 'translate3d(10px, 20px, 0) scale(2)',
      filter: 'alpha(opacity=50)',
      opacity: '0.5',
    };

    result.current.style = newStyle;

    expect(result.current.style).toEqual(newStyle);
  });
});
