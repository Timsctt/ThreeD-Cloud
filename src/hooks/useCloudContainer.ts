import React, { useEffect, useRef, useState } from 'react';
import { CloudElementProps, CloudContainerProps, Position } from '../types';

export function useCloudContainer({
  children,
  size = 150,
  speed = 1,
  radius = 200,
  randomPosition = true,
  isPausable = true,
  iconOnHover = false,
  mouseTracking = true,
}: CloudContainerProps) {
  const elements: Array<JSX.Element> = React.Children.toArray(
    children
  ) as Array<JSX.Element>;
  const numberElements = elements.length;
  const ref = useRef<HTMLDivElement>(null);

  const [pause, setPause] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  }>({
    x: -500,
    y: 0,
  });

  // Direction
  const a =
    -(Math.min(Math.max(-mousePosition.y, -size), size) / radius) * speed;
  const b =
    (Math.min(Math.max(-mousePosition.x, -size), size) / radius) * speed;
  const l = Math.PI / 180;
  const sc = [
    Math.sin(a * l),
    Math.cos(a * l),
    Math.sin(b * l),
    Math.cos(b * l),
  ];

  // rolling depth
  const depth = 1.5 * radius;

  const elementRandomPosition: Array<Number> = elements.map(
    (_element, index) => index
  );

  function computePosition(index: number): Position {
    if (randomPosition)
      index = getRandomIndex(
        Math.floor(Math.random() * (numberElements + 1))
      ).valueOf();
    const theta = Math.acos(-1 + (2 * index + 1) / numberElements);
    const phi = Math.sqrt((numberElements + 1) * Math.PI) * theta;

    return {
      x: (size * Math.sin(theta) * Math.cos(phi)) / 2,
      y: (size * Math.sin(theta) * Math.sin(phi)) / 2,
      z: (size * Math.cos(theta)) / 2,
    };
  }

  function getRandomIndex(index: number): Number {
    const closest = elementRandomPosition.reduce(
      (previousValue: Number, currentValue: Number): Number =>
        Math.abs(currentValue.valueOf() - index) <
        Math.abs(previousValue.valueOf() - index)
          ? currentValue
          : previousValue
    );
    for (let i = 0; i < elementRandomPosition.length; i++) {
      if (elementRandomPosition[i] === closest) {
        elementRandomPosition.splice(i, 1);
      }
    }
    return closest;
  }

  const elementsList: Array<CloudElementProps> = elements.map(
    (element, index) => ({
      children: React.createElement(
        element.type,
        element.props,
        element.props.children
      ),
      depth,
      position: computePosition(index),
      size,
      speed,
      sc,
      pause,
    })
  );

  const handlePause = (): void => {
    if (isPausable) {
      setPause(!pause);
    }
  };

  const handlePauseByKey = (
    event: React.KeyboardEvent<HTMLDivElement>
  ): void => {
    if (event.code === 'Space') {
      handlePause();
    }
  };

  const updateMousePosition = (event: MouseEvent) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const XClient = (event.clientX - (rect.left + rect.width / 2)) / 5;
      const YClient = (event.clientY - (rect.top + rect.height / 2)) / 5;
      setMousePosition({ x: XClient, y: YClient });
    }
  };

  useEffect(() => {
    if (mouseTracking) {
      document.addEventListener('mousemove', updateMousePosition);

      return () => {
        document.removeEventListener('mousemove', updateMousePosition);
      };
    }
    return undefined;
  }, []);

  return {
    handlePause,
    pause,
    handlePauseByKey,
    isPausable,
    iconOnHover,
    elements,
    depth,
    sc,
    elementsList,
    ref,
  };
}
