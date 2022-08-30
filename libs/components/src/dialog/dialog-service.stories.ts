import { DialogModule, DialogRef, DIALOG_DATA } from "@angular/cdk/dialog";
import { Component, Inject } from "@angular/core";
import { Meta, moduleMetadata, Story } from "@storybook/angular";

import { I18nService } from "@bitwarden/common/abstractions/i18n.service";

import { ButtonModule } from "../button";
import { IconButtonModule } from "../icon-button";
import { SharedModule } from "../shared/shared.module";
import { I18nMockService } from "../utils/i18n-mock.service";

import { DialogCloseDirective } from "./dialog-close.directive";
import { DialogService } from "./dialog.service";
import { DialogComponent } from "./dialog/dialog.component";

interface Animal {
  animal: string;
}

@Component({
  selector: "app-story-dialog",
  template: `<button bitButton (click)="openDialog()">Open Dialog</button>`,
})
class StoryDialogComponent {
  constructor(public dialogService: DialogService) {}

  openDialog() {
    this.dialogService.open(StoryDialogContentComponent, {
      data: {
        animal: "panda",
      },
    });
  }
}

@Component({
  selector: "story-dialog-content",
  template: `
    <bit-dialog [dialogSize]="large">
      <span bit-dialog-title>Dialog Title</span>
      <span bit-dialog-content>
        Dialog body text goes here.
        <br />
        Animal: {{ animal }}
      </span>
      <div bit-dialog-footer class="tw-flex tw-flex-row tw-gap-2">
        <button bitButton buttonType="primary" (click)="dialogRef.close()">Save</button>
        <button bitButton buttonType="secondary" bitDialogClose>Cancel</button>
      </div>
    </bit-dialog>
  `,
})
class StoryDialogContentComponent {
  constructor(public dialogRef: DialogRef, @Inject(DIALOG_DATA) private data: Animal) {}

  get animal() {
    return this.data?.animal;
  }
}

export default {
  title: "Component Library/Dialogs/Service",
  component: StoryDialogComponent,
  decorators: [
    moduleMetadata({
      declarations: [DialogComponent, StoryDialogContentComponent, DialogCloseDirective],
      imports: [SharedModule, IconButtonModule, ButtonModule, DialogModule],
      providers: [
        DialogService,
        {
          provide: I18nService,
          useFactory: () => {
            return new I18nMockService({
              close: "Close",
            });
          },
        },
      ],
    }),
  ],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Zt3YSeb6E6lebAffrNLa0h/Tailwind-Component-Library",
    },
  },
} as Meta;

const Template: Story<StoryDialogComponent> = (args: StoryDialogComponent) => ({
  props: args,
});

export const Default = Template.bind({});
