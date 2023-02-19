import { useEffect, useState } from 'react';
import { CloudElementProps } from '../components/types/index';
import { ItemStyle, Position } from '../components';

export function useCloudElement(props: CloudElementProps) {
  const dimension = {
    offsetWidth: 50,
    offsetHeight: 50,
  };

  const [scale, setScale] = useState<number>(1);
  const [per, setPer] = useState<number>(1);
  const [position, setPosition] = useState<Position>(props.position);
  const [style, setStyle] = useState<ItemStyle>({});

  function nextPosition() {
    const rx1 = position.x;
    const ry1 = position.y * props.sc[1] + position.z * -props.sc[0];
    const rz1 = position.y * props.sc[0] + position.z * props.sc[1];

    const rx2 = rx1 * props.sc[3] + rz1 * props.sc[2];
    const ry2 = ry1;
    const rz2 = rz1 * props.sc[3] - rx1 * props.sc[2];

    setPosition({ x: rx2, y: ry2, z: rz2 });
  }

  function getStyle(): ItemStyle {
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

  useEffect(() => {
    const updateStyleInterval = setInterval(() => {
      nextPosition();
      setPer((2 * props.depth) / (2 * props.depth + position.z));
      setScale(Math.round(per * 1e3) / 1e3);
      setStyle(getStyle());
    }, 15);
    return () => clearInterval(updateStyleInterval);
  }, [style]);

  return {
    style,
    scale,
  };
}
