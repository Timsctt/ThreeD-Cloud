import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CloudContainer } from '..';

export default {
  title: 'Three D Cloud',
  component: CloudContainer,
  argTypes: {},
  args: { radius: 200, size: 150, speed: 0.75 },
} as ComponentMeta<typeof CloudContainer>;

const Template: ComponentStory<typeof CloudContainer> = (args) => (
  <CloudContainer {...args}>
    <span>Hello World!</span>
    <span>Hello People!</span>
    <span>Hello Dev!</span>
  </CloudContainer>
);

export const Cloud = Template.bind({});
