import React, { PropsWithChildren, useLayoutEffect, useState } from 'react';
import { CloudProps, Position } from '../components/types';

export function useCloudContainer({
  children = [],
  size,
  speed,
  radius,
}: PropsWithChildren<CloudProps>) {
  const elements: Array<JSX.Element> = React.Children.toArray(
    children
  ) as Array<JSX.Element>;

  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [elementsList, setElementsList] = useState<Array<CloudProps>>(
    elements.map((element) => ({
      item: element!.props.children,
      radius,
      size,
      speed,
    }))
  );

  const elementRandomPosition: Array<Number> = elements.map(
    (_element, index) => index
  );

  const mounted = React.useRef(true);

  // Direction
  const a = -(Math.min(Math.max(0, -size), size) / radius) * speed;
  const b = (Math.min(Math.max(-500, -size), size) / radius) * speed;
  const l = Math.PI / 180;
  const sc = [
    Math.sin(a * l),
    Math.cos(a * l),
    Math.sin(b * l),
    Math.cos(b * l),
  ];

  // rolling depth
  const depth = 1.5 * radius;

  function createItems() {
    const cloudElements = elementsList.map((element, index) => ({
      item: element.item,
      radius,
      position: computePosition(index),
      size,
      speed,
    }));

    setElementsList(cloudElements);
    setHasLoaded(true);
  }

  function computePosition(index: number, random = true): Position {
    const textsLength = elements.length;

    if (random)
      index = getRandomPosition(
        Math.floor(Math.random() * (textsLength + 1))
      ).valueOf();
    const theta = Math.acos(-1 + (2 * index + 1) / textsLength);
    const phi = Math.sqrt((textsLength + 1) * Math.PI) * theta;

    return {
      x: (size * Math.sin(theta) * Math.cos(phi)) / 2,
      y: (size * Math.sin(theta) * Math.sin(phi)) / 2,
      z: (size * Math.cos(theta)) / 2,
    };
  }

  function getRandomPosition(index: number): Number {
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

  useLayoutEffect(() => {
    if (mounted.current) {
      createItems();
      mounted.current = false;
    }
  }, []);

  return {
    elements,
    depth,
    sc,
    elementsList,
    hasLoaded,
  };
}
