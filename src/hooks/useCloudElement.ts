import { CloudElementProps } from '../components/types';
import { useEffect, useLayoutEffect, useState } from 'react';
import { ItemStyle, Position } from '../components/types';

export function useCloudElement(props: CloudElementProps) {
  const [position, setPosition] = useState<Position>(props.initialPos);
  const [per, setPer] = useState<number>(1);
  const [style, setStyle] = useState<ItemStyle>({});
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [scale] = useState<number>(1);

  const dimension = {
    offsetWidth: 50,
    offsetHeight: 50,
  };

  function updatePosition(position: Position) {
    setPosition(position);
  }

  function updatePercentage(per: number) {
    setPer(per);
  }

  function updateStyle(style: ItemStyle) {
    setStyle(style);
  }

  function updateLoaded(loaded: boolean) {
    setHasLoaded(loaded);
  }

  function nextPosition() {
    const rx1 = position.x;
    const ry1 = position.y * props.sc[1] + position.z * -props.sc[0];
    const rz1 = position.y * props.sc[0] + position.z * props.sc[1];

    const rx2 = rx1 * props.sc[3] + rz1 * props.sc[2];
    const ry2 = ry1;
    const rz2 = rz1 * props.sc[3] - rx1 * props.sc[2];

    setPer((2 * props.depth) / (2 * props.depth + rz2));

    setPosition({ x: rx2, y: ry2, z: rz2 });
  }

  function getStyle(): ItemStyle {
    nextPosition();
    let scale = Math.round(per * 1e3) / 1e3;
    let alpha = per * per - 0.2;
    alpha = Math.abs(Math.round((alpha > 1 ? 1 : alpha) * 1e3) / 1e3);

    const left = (position.x - dimension.offsetWidth / 2).toFixed(2);
    const top = (position.y - dimension.offsetHeight / 2).toFixed(2);
    const transform = `translate3d(${left}px, ${top}px, 0) scale(${scale})`;

    return {
      transform: transform,
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
    scale,
  };
}
