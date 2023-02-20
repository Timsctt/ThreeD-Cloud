import React from 'react';
import { useCloudElement } from '../../hooks/useCloudElement';
import { CloudElementProps } from '../../types';

const CloudElement: React.FunctionComponent<CloudElementProps> = (
  props: CloudElementProps
) => {
  const { style, scale } = useCloudElement(props);

  return (
    <>
      <span
        className="three-d-item"
        style={{
          filter: style.filter,
          height: style.height,
          opacity: style.opacity,
          transform: style.transform,
          width: style.width,
          scale,
        }}
      >
        {props.children}
      </span>
    </>
  );
};

export default CloudElement;
