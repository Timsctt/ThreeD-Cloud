import React, { Fragment } from 'react';
import { useThreeDCloud } from '../../hooks/useThreeDCloud';
import { CloudProps } from '../types';
import CloudElement from './CloudElement';

import './style.css';

const ThreeDCloud: React.FunctionComponent<CloudProps> = ({
  children,
  radius,
  size,
  speed,
}: CloudProps) => {
  const { sc, depth, elementsList, hasLoaded } = useThreeDCloud({
    children,
    size,
    speed,
    radius,
  });

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
