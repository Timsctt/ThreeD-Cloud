import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThreeDCloud } from '..';

export default {
  title: 'Three D Cloud',
  component: ThreeDCloud,
  argTypes: {},
} as ComponentMeta<typeof ThreeDCloud>;

const Template: ComponentStory<typeof ThreeDCloud> = (args) => (
  <ThreeDCloud {...args} />
);

export const Primary = Template.bind({});

Primary.args = {};
