import React, { useState, useLayoutEffect, Fragment } from 'react';
import { CloudProps, Position } from '../types';
import CloudElement from './CloudElement';

import './style.css';

const ThreeDCloud: React.FunctionComponent = () => {
  const [size] = useState<number>(250);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [list, setList] = useState<Array<CloudProps>>([
    { item: 'TagCloud' },
    { item: 'TypeScript' },
    { item: 'CSS3' },
    { item: 'Animation' },
    { item: 'React' },
    { item: 'Component' },
    { item: 'Module' },
    { item: 'Sphere' },
    { item: 'ES6' },
    { item: 'v0.1.0' },
    { item: <h1>Hello World!</h1> },
  ]);

  const elements: Array<React.ReactNode> = [
    'TagCloud',
    'TypeScript',
    'CSS3',
    'Animation',
    'React',
    'Component',
    'Module',
    'Sphere',
    'ES6',
    'v0.1.0',
    <h1>Hello World!</h1>,
  ];

  const [elementRandomPosition] = React.useState<Array<Number>>(() =>
    elements.map((_element, index) => index)
  );

  const radius = 200;

  const getMaxSpeed = (name: string) =>
    ({ slow: 0.2, normal: 1, fast: 2 }[name] || 1);

  const maxSpeed = getMaxSpeed('slow'); // rolling max speed

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

  function createItems() {
    const cloudElements = list.map((element, index) => ({
      item: element.item,
      position: computePosition(index),
    }));

    setList(cloudElements);
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

  const mounted = React.useRef(true);

  useLayoutEffect(() => {
    if (mounted.current) {
      createItems();
      mounted.current = false;
    }
  }, []);

  return (
    <div className="threed-cloud-container">
      <div
        style={{
          width: `${2 * radius}px`,
          height: `${2 * radius}px`,
        }}
      >
        {hasLoaded &&
          list.map((element, indexElement) => (
            <Fragment key={indexElement}>
              <CloudElement
                depth={depth}
                sc={sc}
                initialPos={element.position!}
              >
                {element.item}
              </CloudElement>
            </Fragment>
          ))}
      </div>
    </div>
  );
};

export default ThreeDCloud;
