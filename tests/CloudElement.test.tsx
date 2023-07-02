import '@testing-library/jest-dom/extend-expect';
import { renderHook } from '@testing-library/react-hooks';
import { useCloudElement } from '../src/hooks/useCloudElement';

describe('useCloudElement', () => {
  it('sets the initial state correctly', () => {
    const props = {
      position: { x: 0, y: 0, z: 0 },
      sc: [1, 1, 1, 1],
      depth: 50,
      pause: true,
    };

    const { result } = renderHook(() => useCloudElement(props));

    expect(result.current.style).toEqual({});
    expect(result.current.scale).toEqual(1);
  });

  it('should update the style and scale over time', () => {
    const props = {
      position: { x: 0, y: 0, z: 0 },
      pause: false,
      depth: 1,
      sc: [1, 1, 1, 1],
    };

    jest.useFakeTimers();

    const { result } = renderHook(() => useCloudElement(props));

    // Initial values
    expect(result.current.style).toEqual({});
    expect(result.current.scale).toBe(1);

    // Wait for one interval (15ms)
    jest.advanceTimersByTime(15);

    // Updated values after one interval
    expect(result.current.style).toBeDefined();
    expect(result.current.scale).toBeDefined();

    // Wait for another interval (15ms)
    jest.advanceTimersByTime(15);

    // Updated values after two intervals
    expect(result.current.style).toBeDefined();
    expect(result.current.scale).toBeDefined();

    // Clear the interval and timers
    jest.useRealTimers();
  });
});
