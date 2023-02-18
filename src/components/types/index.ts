import { PropsWithChildren, ReactNode } from 'react';

export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface CloudProps extends PropsWithChildren {
  item?: ReactNode;
  position?: Position;
  radius: number;
  size: number;
  speed: number;
}

export interface CloudElementProps extends PropsWithChildren {
  children: ReactNode;
  depth: number;
  initialPos: Position;
  item?: ReactNode;
  position?: Position;
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
