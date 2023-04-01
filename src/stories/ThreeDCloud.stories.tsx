import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CloudContainer } from '..';

export default {
  title: 'Three D Cloud',
  component: CloudContainer,
  args: {
    radius: 200,
    size: 150,
    speed: 0.75,
    className: '',
    randomPosition: true,
    isPausable: true,
    iconOnHover: true,
    mouseTracking: true,
  },
} as ComponentMeta<typeof CloudContainer>;

const Template: ComponentStory<typeof CloudContainer> = (args) => (
  <CloudContainer {...args}>
    <span>Hello World!</span>
    <span>Hello People!</span>
    <span>Hello Dev!</span>
    <h1>Hello title!</h1>
  </CloudContainer>
);

export const Cloud = Template.bind({});
