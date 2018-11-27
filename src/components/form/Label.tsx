import { cx } from "emotion";
import React from "react";

import { classNames, clean, ModifierProps } from "@/modifiers";

export type LabelModifierProps = Partial<{
  children: React.ReactNode;
  className: string;
  htmlFor: string;
  size: "small" | "medium" | "large";
  style: React.CSSProperties;
}>;

export type LabelProps = ModifierProps &
  LabelModifierProps &
  Partial<Omit<React.ComponentPropsWithoutRef<"label">, "unselectable">>;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, className, size, ...allProps }, ref) => {
    const props = clean(allProps);
    return (
      <label
        {...props}
        ref={ref}
        className={cx("label", classNames(allProps), className, {
          [`is-${size}`]: size,
        })}
      >
        {children}
      </label>
    );
  },
);
Label.defaultProps = {
  children: null,
};
