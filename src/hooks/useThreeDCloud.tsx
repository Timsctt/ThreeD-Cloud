import React from 'react';
import { CloudProps } from '../components/types';

export function useThreeDCloud({
  size = 100,
  speed = 1,
  radius = 150,
}: Partial<CloudProps>) {
  const mounted = React.useRef(true);

  // Direction
  const a = -(Math.min(Math.max(0, -size), size) / radius) * speed;
  const b = (Math.min(Math.max(-500, -size), size) / radius) * speed;
  const l = Math.PI / 180;
  const sc = [
    Math.sin(a * l),
    Math.cos(a * l),
    Math.sin(b * l),
    Math.cos(b * l),
  ];

  // rolling depth
  const depth = 1.5 * radius;

  return {
    mounted,
    depth,
    sc,
  };
}
