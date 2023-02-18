import React, { useState, useLayoutEffect, Fragment } from 'react';
import { useThreeDCloud } from '../../hooks/useThreeDCloud';
import { CloudProps, Position } from '../types';
import CloudElement from './CloudElement';

import './style.css';

const ThreeDCloud: React.FunctionComponent<CloudProps> = ({
  children,
  radius,
  size,
  speed,
}: CloudProps) => {
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
  const { mounted, sc, depth } = useThreeDCloud({ size, speed, radius });

  const elementRandomPosition: Array<Number> = elements.map(
    (_element, index) => index
  );

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

  return (
    <div className="threed-cloud-container">
      <div
        style={{
          width: `${2 * radius}px`,
          height: `${2 * radius}px`,
        }}
      >
        {hasLoaded &&
          elementsList.map((element, indexElement) => (
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
