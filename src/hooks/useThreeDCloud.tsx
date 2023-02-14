import React from 'react';
import { useRef, useLayoutEffect, useState, ReactNode } from 'react';
import { CloudProps, Position } from '../components/types';

const config = {
  size: 250,
  maxSpeed: 'slow',
  initSpeed: 'slow',
  radius: 150, // rolling radius, unit `px`
  direction: 90, // rolling init direction, unit clockwise `deg`, optional: `0`(top) , `90`(left), `135`(right-bottom)(default)...
  keep: true, // whether to keep rolling after mouse out area, optional: `false`, `true`(default)(decelerate to rolling init speed, and keep rolling with mouse)
  useContainerInlineStyles: true,
  useItemInlineStyles: true,
  itemClass: 'tagcloud--item',
  useHTML: false,
};

export function useThreeDCloud() {
  const [size] = useState<number>(250);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [list, setList] = useState<Array<CloudProps>>([
    { item: 'TagCloud' },
    { item: 'JavaScript' },
    { item: 'CSS3' },
    { item: 'Animation' },
    { item: 'Interactive' },
    { item: 'Mouse' },
    { item: 'Rolling' },
    { item: 'Sphere' },
    { item: '6KB' },
    { item: 'v2.x' },
    { item: <h1>Hello</h1> },
  ]);

  const elements: Array<ReactNode> = [
    'TagCloud',
    'JavaScript',
    'CSS3',
    'Animation',
    'Interactive',
    'Mouse',
    'Rolling',
    'Sphere',
    '6KB',
    'v2.x',
    <h1>Hello</h1>,
  ];

  const [elementRandomPosition] = useState<Array<Number>>(() => {
    return elements.map((_element, index) => index);
  });

  const radius = 200;

  const getMaxSpeed = (name: string) =>
    ({ slow: 0.2, normal: 1, fast: 2 }[name] || 1);

  const maxSpeed = getMaxSpeed(config.maxSpeed); // rolling max speed

  // Direction
  const a = -(Math.min(Math.max(0, -size), size) / radius) * maxSpeed;
  const b = (Math.min(Math.max(-500, -size), size) / radius) * maxSpeed;
  const l = Math.PI / 180;
  const sc = [
    Math.sin(a * l),
    Math.cos(a * l),
    Math.sin(b * l),
    Math.cos(b * l),
  ];

  // rolling depth
  const depth = 1.5 * radius;

  function updateLoaded(loaded: boolean) {
    setHasLoaded(loaded);
  }

  function createItems() {
    const cloudElements = list.map((element, index) => {
      return {
        item: element.item,
        position: computePosition(index),
      };
    });

    setList(cloudElements);
    setHasLoaded(true);
  }

  function computePosition(index: number, random = true): Position {
    const textsLength = elements.length;

    if (random)
      index = getRandomPosition(
        Math.floor(Math.random() * (textsLength + 1))
      ).valueOf();
    const phi = Math.acos(-1 + (2 * index + 1) / textsLength);
    const theta = Math.sqrt((textsLength + 1) * Math.PI) * phi;

    return {
      x: (size * Math.cos(theta) * Math.sin(phi)) / 2,
      y: (size * Math.sin(theta) * Math.sin(phi)) / 2,
      z: (size * Math.cos(phi)) / 2,
    };
  }

  function getRandomPosition(index: number): Number {
    let closest = elementRandomPosition.reduce(function (
      previousValue: Number,
      currentValue: Number
    ): Number {
      return Math.abs(currentValue.valueOf() - index) <
        Math.abs(previousValue.valueOf() - index)
        ? currentValue
        : previousValue;
    });
    for (let i = 0; i < elementRandomPosition.length; i++) {
      if (elementRandomPosition[i] === closest) {
        elementRandomPosition.splice(i, 1);
      }
    }
    return closest;
  }

  const mounted = useRef(true);

  useLayoutEffect(() => {
    if (mounted.current) {
      createItems();
      mounted.current = false;
    }
  }, []);

  return {
    list,
    hasLoaded,
    radius,
    depth,
    sc,
    elements,
  };
}
