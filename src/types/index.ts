import { PropsWithChildren } from 'react';

export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface CloudContainerProps extends PropsWithChildren {
  className?: string;
  iconOnHover?: boolean;
  isPausable?: boolean;
  item?: CloudElementProps;
  mouseTracking?: boolean;
  position?: Position;
  radius: number;
  randomPosition?: boolean;
  size: number;
  speed: number;
}

export interface CloudElementProps extends PropsWithChildren {
  depth: number;
  pause: boolean;
  position: Position;
  sc: number[];
  scale?: number;
  style?: ItemStyle;
}

export interface ItemStyle {
  filter?: string;
  height?: string;
  opacity?: string;
  transform?: string;
  width?: string;
}
