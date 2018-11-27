import { cx } from "emotion";
import React from "react";

import { Element, renderAsExoticComponent } from "@/components/element";
import { ModifierProps } from "@/modifiers";

export type PanelBlockModifierProps = Partial<{
  active: boolean;
}>;

export type PanelBlockProps = ModifierProps & PanelBlockModifierProps;

export const PanelBlock = renderAsExoticComponent<PanelBlockProps, "div">(
  ({ className, active, ...props }, ref) => (
    <Element
      {...props}
      ref={ref}
      className={cx("panel-block", className, {
        "is-active": active,
      })}
    />
  ),
  "div",
);
PanelBlock.defaultProps = Object.assign(
  {
    active: false,
  },
  PanelBlock.defaultProps,
);
