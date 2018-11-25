import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";
import { Breakpoints } from "modifiers/responsives";

export type ContainerModifierProps = Partial<{
  children: React.ReactNode;
  fluid: boolean;
  breakpoint: Breakpoints;
}>;

export type ContainerProps = ModifierProps & ContainerModifierProps;

const Container = renderAsExoticComponent<ContainerProps, "div">(
  ({ children, fluid, breakpoint, className, ...props }, ref) => (
    <Element
      {...props}
      ref={ref}
      className={cx("container", className, {
        "is-fluid": fluid,
        [`is-${breakpoint}`]: breakpoint,
      })}
    >
      {children}
    </Element>
  ),
  "div",
);
Container.defaultProps = Object.assign(
  {
    children: null,
    fluid: false,
  },
  Container.defaultProps,
);

export default Container;
