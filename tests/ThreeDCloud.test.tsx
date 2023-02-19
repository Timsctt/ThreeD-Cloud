import { render, screen } from '@testing-library/react';
import { CloudContainer } from '../src';
import CloudElement from '../src/components/ThreeDCloud/CloudElement';
import '@testing-library/jest-dom/extend-expect';

describe('displayCloud', () => {
  test('renders the component with elements', () => {
    const elements = [
      { item: <span>Element 1</span>, position: { x: 0, y: 0, z: 0 } },
      { item: <span>Element 2</span>, position: { x: 100, y: 100, z: 0 } },
      { item: <span>Element 3</span>, position: { x: -100, y: -100, z: 0 } },
    ];
    const radius = 200;
    const size = 200;
    const speed = 1;
    const depth = size * 1.5;
    const sc: number[] = [];

    render(
      <CloudContainer radius={radius} speed={speed} size={size}>
        {elements.map((element, index) => (
          <CloudElement
            key={index}
            initialPos={element.position}
            sc={sc}
            depth={depth}
          >
            {element.item}
          </CloudElement>
        ))}
      </CloudContainer>
    );

    const element1 = screen.getByText('Element 1');
    const element2 = screen.getByText('Element 2');
    const element3 = screen.getByText('Element 3');

    expect(element1).toBeInTheDocument();
    expect(element2).toBeInTheDocument();
    expect(element3).toBeInTheDocument();
  });
});
