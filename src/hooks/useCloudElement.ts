import { useEffect, useLayoutEffect, useState } from 'react';
import { CloudElementProps } from '../components/types/index';
import { ItemStyle, Position } from '../components';

export function useCloudElement({ initialPos, sc, depth }: CloudElementProps) {
  const [position, setPosition] = useState<Position>(initialPos);
  const [per, setPer] = useState<number>(1);
  const [style, setStyle] = useState<ItemStyle>({});
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);

  const dimension = {
    offsetWidth: 50,
    offsetHeight: 50,
  };

  function nextPosition() {
    const rx1 = position.x;
    const ry1 = position.y * sc[1] + position.z * -sc[0];
    const rz1 = position.y * sc[0] + position.z * sc[1];

    const rx2 = rx1 * sc[3] + rz1 * sc[2];
    const ry2 = ry1;
    const rz2 = rz1 * sc[3] - rx1 * sc[2];

    setPer((2 * depth) / (2 * depth + rz2));

    setPosition({ x: rx2, y: ry2, z: rz2 });
  }

  function getStyle(): ItemStyle {
    nextPosition();
    setScale(Math.round(per * 1e3) / 1e3);
    let alpha = per * per - 0.2;
    alpha = Math.abs(Math.round((alpha > 1 ? 1 : alpha) * 1e3) / 1e3);

    const left = (position.x - dimension.offsetWidth / 2).toFixed(2);
    const top = (position.y - dimension.offsetHeight / 2).toFixed(2);
    const transform = `translate3d(${left}px, ${top}px, 0) scale(${scale})`;

    return {
      transform,
      filter: `alpha(opacity=${Math.abs(100 * alpha)})`,
      opacity: `${alpha}`,
    };
  }

  useLayoutEffect(() => {
    setStyle(getStyle());
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    const updateStyleInterval = setInterval(() => {
      setStyle(getStyle());
    }, 15);
    return () => clearInterval(updateStyleInterval);
  }, [style]);

  return {
    hasLoaded,
    style,
    scale,
  };
}
