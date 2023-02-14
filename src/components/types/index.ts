import { PropsWithChildren, ReactNode } from "react";

export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface CloudProps {
  position?: Position;
  item?: ReactNode;
  scale?: number;
  radius?: number;
  // list: Array<ReactNode>;
  depth?: number;
  sc?: Array<number>;
  list?: Array<{ item: ReactNode; position: Position }>;
}

export interface CloudElementProps extends PropsWithChildren {
  position?: Position;
  item?: ReactNode;
  scale?: number;
  style?: ItemStyle;
  depth: number;
  sc: number[];
  initialPos: Position;
  children: ReactNode;
}

export interface ItemStyle {
  filter?: string;
  transform?: string;
  opacity?: string;
  width?: string;
  height?: string;
}
