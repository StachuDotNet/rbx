import { cx } from "emotion";
import React from "react";

import modifiers, { ModifierProps } from "modifiers";
import { Colors } from "modifiers/colors";

export type IconModifierProps = Partial<{
  children: React.ReactNode;
  className: string;
  style: {};
  icon: string;
  size: "small" | "medium" | "large" | "auto";
  align: "left" | "right";
  color: Colors;
}>;

export type IconProps = ModifierProps & IconModifierProps;

const Icon = React.forwardRef<HTMLElement, IconProps>(
  ({ icon, size, color, className, align, children, ...allProps }, ref) => {
    const props = modifiers.clean(allProps);
    return (
      <span
        {...props}
        className={cx("icon", modifiers.classNames(allProps), className, {
          [`is-${size}`]: size,
          [`is-${align}`]: align,
          [`has-text-${color}`]: color,
        })}
      >
        {children || (
          <i
            ref={ref}
            className={cx("rbc", {
              [`rbc-${icon}`]: icon,
            })}
          />
        )}
      </span>
    );
  },
);
Icon.defaultProps = {
  children: null,
};

export default Icon;
