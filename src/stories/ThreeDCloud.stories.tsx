import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThreeDCloud } from '..';

export default {
  title: 'Three D Cloud',
  component: ThreeDCloud,
  argTypes: {},
  args: { radius: 200, size: 150, speed: 0.75 },
} as ComponentMeta<typeof ThreeDCloud>;

const Template: ComponentStory<typeof ThreeDCloud> = (args) => (
  <ThreeDCloud {...args}>
    <span>Hello World!</span>
    <span>Hello People!</span>
    <span>Hello Dev!</span>
  </ThreeDCloud>
);

export const Cloud = Template.bind({});
