import { Meta, moduleMetadata, Story } from "@storybook/angular";

import { IconButtonModule } from "../icon-button";

import { BannerComponent } from "./banner.component";

export default {
  title: "Component Library/Banner",
  component: BannerComponent,
  decorators: [
    moduleMetadata({
      imports: [IconButtonModule],
    }),
  ],
  args: {
    bannerType: "warning",
  },
  argTypes: {
    onClose: { action: "onClose" },
  },
} as Meta;

const Template: Story<BannerComponent> = (args: BannerComponent) => ({
  props: args,
  template: `
    <bit-banner [bannerType]="bannerType" (onClose)="onClose($event)">Content Really Long Text Lorem Ipsum Ipsum Ipsum <button>Button</button></bit-banner>
  `,
});

export const Premium = Template.bind({});
Premium.args = {
  bannerType: "premium",
};

export const Info = Template.bind({});
Info.args = {
  bannerType: "info",
};

export const Warning = Template.bind({});
Warning.args = {
  bannerType: "warning",
};

export const Danger = Template.bind({});
Danger.args = {
  bannerType: "danger",
};
