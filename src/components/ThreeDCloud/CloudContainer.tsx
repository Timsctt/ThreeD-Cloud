import React from 'react';
import { useCloudContainer } from '../../hooks/useCloudContainer';
import { CloudContainerProps } from '../../types';
import CloudElement from './CloudElement';

import './style.css';

export const CloudContainer: React.FunctionComponent<CloudContainerProps> = (
  props: CloudContainerProps
) => {
  const { sc, depth, elementsList } = useCloudContainer(props);

  return (
    <div className="threed-cloud-container">
      <div
        className={props.className}
        style={{
          width: `${2 * props.radius}px`,
          height: `${2 * props.radius}px`,
        }}
      >
        {elementsList.map((element, elementIndex) => (
          <CloudElement
            key={elementIndex}
            depth={depth}
            sc={sc}
            position={element.position}
          >
            {element.children}
          </CloudElement>
        ))}
      </div>
    </div>
  );
};
