import React from 'react';
import { useCloudContainer } from '../../hooks/useCloudContainer';
import { CloudContainerProps } from '../../types';
import CloudElement from './CloudElement';

import './style.css';
import { Pause } from '../../assets/Pause';
import { Play } from '../../assets/Play';

export const CloudContainer: React.FunctionComponent<CloudContainerProps> = (
  props: CloudContainerProps
) => {
  const {
    sc,
    radius,
    elementsList,
    handlePause,
    pause,
    handlePauseByKey,
    isPausable,
    iconOnHover,
    ref,
  } = useCloudContainer(props);

  return (
    <div
      className={`threed-cloud-container ${isPausable ? 'tdcIsPausable' : ''}`}
      role="button"
      onClick={handlePause}
      onKeyDown={handlePauseByKey}
      tabIndex={0}
    >
      {isPausable && iconOnHover && (
        <span className="tdc-animation-icon">
          {pause ? <Play /> : <Pause />}
        </span>
      )}
      <div
        className={props.className}
        style={{
          width: `${props.size}px`,
          height: `${props.size}px`,
        }}
        ref={ref}
      >
        {elementsList.map((element, elementIndex) => (
          <CloudElement
            key={elementIndex}
            depth={radius}
            sc={sc}
            position={element.position}
            pause={pause}
          >
            {element.children}
          </CloudElement>
        ))}
      </div>
    </div>
  );
};
