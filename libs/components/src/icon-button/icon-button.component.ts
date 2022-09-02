import { Component, HostBinding, Input } from "@angular/core";

export type IconButtonStyle = "contrast" | "main" | "muted" | "primary" | "secondary" | "danger";

const styles: Record<IconButtonStyle, string[]> = {
  contrast: [
    "tw-bg-transparent",
    "!tw-text-contrast",
    "tw-border-transparent",
    "hover:tw-bg-transparent-hover",
    "hover:tw-border-text-contrast",
    "focus:before:tw-ring-text-contrast",
    "disabled:hover:tw-bg-transparent",
    "disabled:hover:tw-border-transparent",
  ],
  main: [
    "tw-bg-transparent",
    "!tw-text-main",
    "tw-border-transparent",
    "hover:tw-bg-transparent-hover",
    "hover:tw-border-text-main",
    "focus:before:tw-ring-text-main",
    "disabled:hover:tw-bg-transparent",
    "disabled:hover:tw-border-transparent",
  ],
  muted: [
    "tw-bg-transparent",
    "!tw-text-muted",
    "tw-border-transparent",
    "hover:tw-bg-transparent-hover",
    "hover:tw-border-primary-700",
    "focus:before:tw-ring-primary-700",
    "disabled:hover:tw-bg-transparent",
    "disabled:hover:tw-border-transparent",
  ],
  primary: [
    "tw-bg-primary-500",
    "!tw-text-contrast",
    "tw-border-primary-500",
    "hover:tw-bg-primary-700",
    "focus:before:tw-ring-primary-700",
    "disabled:hover:tw-bg-primary-500",
    "disabled:hover:tw-border-transparent",
  ],
  secondary: [
    "tw-bg-transparent",
    "!tw-text-muted",
    "tw-border-text-muted",
    "hover:!tw-text-contrast",
    "hover:tw-bg-text-muted",
    "focus:before:tw-ring-primary-700",
    "disabled:hover:tw-bg-transparent",
    "disabled:hover:!tw-text-muted",
    "disabled:hover:tw-border-text-muted",
    "disabled:hover:tw-border-transparent",
  ],
  danger: [
    "tw-bg-transparent",
    "!tw-text-danger",
    "tw-border-danger-500",
    "hover:!tw-text-contrast",
    "hover:tw-bg-danger-500",
    "focus:before:tw-ring-primary-700",
    "disabled:hover:tw-bg-transparent",
    "disabled:hover:!tw-text-danger",
    "disabled:hover:tw-border-danger-500",
    "disabled:hover:tw-border-transparent",
  ],
};

export type IconButtonSize = "base" | "xl" | "2xl" | "default";

const sizes: Record<IconButtonSize, string[]> = {
  base: ["tw-text-base", "tw-p-0.5"],
  xl: ["tw-text-xl", "tw-p-0.5"],
  "2xl": ["tw-text-2xl", "tw-p-0.5"],
  default: ["tw-p-3"],
};

@Component({
  selector: "button[bitIconButton]",
  template: `<i class="bwi" [ngClass]="icon"></i>`,
})
export class BitIconButtonComponent {
  @Input("bitIconButton") icon: string;

  @Input() buttonType: IconButtonStyle = "main";

  @Input() size: IconButtonSize = "default";

  @HostBinding("class") get classList() {
    return [
      "tw-font-semibold",
      "tw-border",
      "tw-border-solid",
      "tw-rounded",
      "tw-transition",
      "tw-leading-none",
      "hover:tw-no-underline",
      "disabled:tw-opacity-60",
      "focus:tw-outline-none",
      "focus:tw-z-10",

      // Workaround for box-shadow with transparent offset issue:
      // https://github.com/tailwindlabs/tailwindcss/issues/3595
      // Switch to outline with outline-offset when Safari supports border radius on outline.
      "tw-relative",
      "before:tw-content-['']",
      "before:tw-block",
      "before:tw-absolute",
      "before:-tw-inset-[3px]",
      "before:tw-rounded-md",
      "before:tw-transition",
      "before:tw-ring",
      "focus:tw-outline-none",
      "focus:before:tw-ring-text-contrast",
    ]
      .concat(styles[this.buttonType])
      .concat(sizes[this.size]);
  }
}
