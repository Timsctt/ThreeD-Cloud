import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useCloudContainer } from '../src/hooks/useCloudContainer';

describe('useCloudContainer', () => {
  test('returns correct initial state and event handlers', () => {
    const children = [
      <div key="1">Element 1</div>,
      <div key="2">Element 2</div>,
      <div key="3">Element 3</div>,
    ];

    const { result } = renderHook(() =>
      useCloudContainer({
        children,
        size: 150,
        speed: 1,
        radius: 200,
        randomPosition: true,
        isPausable: true,
        iconOnHover: false,
        mouseTracking: true,
      })
    );

    expect(result.current.pause).toBe(false);
    expect(result.current.handlePause).toBeDefined();
    expect(result.current.handlePauseByKey).toBeDefined();
    expect(result.current.isPausable).toBe(true);
    expect(result.current.iconOnHover).toBe(false);
    expect(result.current.radius).toBe(200);
    expect(result.current.sc).toEqual([
      0, 1, 0.015707317311820672, 0.9998766324816606,
    ]);
    expect(result.current.elementsList.length).toBe(3);
    expect(result.current.ref.current).toBeNull();
  });

  test('toggles pause state when handlePause is called', () => {
    const children = [
      <div key="1">Element 1</div>,
      <div key="2">Element 2</div>,
      <div key="3">Element 3</div>,
    ];

    const { result } = renderHook(() =>
      useCloudContainer({
        children,
        size: 150,
        speed: 1,
        radius: 200,
        randomPosition: true,
        isPausable: true,
        iconOnHover: false,
        mouseTracking: true,
      })
    );

    const spaceKeyEvent = {
      code: 'Space',
      key: ' ',
    } as React.KeyboardEvent<HTMLDivElement>;

    expect(result.current.pause).toBe(false);

    act(() => {
      result.current.handlePauseByKey(spaceKeyEvent);
    });

    expect(result.current.pause).toBe(true);

    act(() => {
      result.current.handlePauseByKey(spaceKeyEvent);
    });

    expect(result.current.pause).toBe(false);
  });

  test('updates mouse position on mousemove event', () => {
    const children = [
      <div key="1">Element 1</div>,
      <div key="2">Element 2</div>,
      <div key="3">Element 3</div>,
    ];

    const { result } = renderHook(() =>
      useCloudContainer({
        children,
        size: 150,
        speed: 1,
        radius: 200,
        randomPosition: true,
        isPausable: true,
        iconOnHover: false,
        mouseTracking: true,
      })
    );

    const mockGetBoundingClientRect = jest.fn(() => ({
      left: 100,
      top: 100,
      width: 200,
      height: 200,
    }));

    // Assign the mock object to ref.current
    act(() => {
      // Create a new mutable object with mockGetBoundingClientRect
      const mockRef = {
        current: {
          getBoundingClientRect: mockGetBoundingClientRect,
        },
      };

      // Assign the new object to result.current.ref.current
      Object.assign(result.current.ref, mockRef);
    });

    const mockMouseMoveEvent = new MouseEvent('mousemove', {
      clientX: 150,
      clientY: 150,
    });

    act(() => {
      // Invoke the updateMousePosition function separately
      result.current.updateMousePosition(mockMouseMoveEvent);
    });

    expect(result.current.mousePosition).toEqual({ x: -10, y: -10, z: 0 });
  });
});
