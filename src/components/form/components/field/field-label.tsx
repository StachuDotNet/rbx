import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";

export type FieldLabelModifierProps = Partial<{
  children: React.ReactNode;
  size: "small" | "normal" | "medium" | "large";
  style: {};
}>;

export type FieldLabelProps = ModifierProps & FieldLabelModifierProps;

const FieldLabel = renderAsExoticComponent<FieldLabelProps, "div">(
  ({ children, className, size, ...props }, ref) => (
    <Element
      {...props}
      ref={ref}
      className={cx("field-label", className, {
        [`is-${size}`]: size,
      })}
    >
      {children}
    </Element>
  ),
  "div",
);
FieldLabel.defaultProps = Object.assign(
  {
    children: null,
  },
  FieldLabel.defaultProps,
);

export default FieldLabel;
