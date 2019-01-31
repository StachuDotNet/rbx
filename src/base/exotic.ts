import React from "react";

import { Omit } from "../types";

// tslint:disable:no-reserved-keywords

/**
 * Maps a keyof JSX.IntrinsicElement (e.g. 'div' or 'svg') or a
 * React.ComponentType to it's type.
 *
 * For example:
 *   FromReactType<"div"> ==> HTMLDivElement
 *   FromReactType<"svg"> ==> SVGSVGElement
 *   FromReactType<React.FC<P>. ==> React.FC<P>
 */
export type FromReactType<
  T extends React.ReactType
> = T extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[T] extends React.DetailedHTMLFactory<
      React.HTMLAttributes<infer U>,
      infer U
    >
    ? U
    : JSX.IntrinsicElements[T] extends React.SVGProps<infer V>
    ? V
    : never
  : T;

/**
 * Returns those keys which are non-optional
 */
export type NonOptionalPropKeys<P extends {}> = Required<
  { [K in keyof P]: undefined extends P[K] ? never : K }
>[keyof P];

/**
 * Returns true if P has an index signature, otherwise false.
 * https://www.typescriptlang.org/docs/handbook/interfaces.html
 */
export type HasIndexSignature<P extends {}> = (string | number) extends keyof P
  ? true
  : number extends keyof P
  ? true
  : false;

/**
 * Returns `true` or `false` depending on whether `TAsComponentProps` has
 * required props that overlap with either required or optional TOwnProps.
 */
export type HasIntersectingNonOptionalProps<
  TOwnProps extends {},
  TAsComponentProps extends {}
> = Extract<
  NonOptionalPropKeys<TAsComponentProps>,
  keyof TOwnProps
> extends undefined
  ? false
  : true;

/**
 * Returns true if P has at least one non-optional keys, else false
 */
export type HasNonOptionalPropKeys<P extends {}> = NonOptionalPropKeys<
  P
> extends never
  ? false
  : true;

/**
 * Returns true if PReceived accepts PForwarded props, else false
 */
export type ForwardingPropsCompatible<
  PForwarding extends {},
  PReceiving extends {}
> = keyof PForwarding extends undefined
  ? true
  : keyof PReceiving extends undefined
  ? false
  : keyof PForwarding extends (keyof PForwarding & keyof PReceiving)
  ? {
      [K in keyof PForwarding &
        keyof PReceiving]: PForwarding[K] extends PReceiving[K] ? true : false
    }[keyof PForwarding & keyof PReceiving] extends false
    ? false
    : true
  : false;

/**
 * Does TAsComponentProps have an index signature, masking it's required props?
 *   --> return 0
 * Does TAsComponentProps have no required props?
 *   --> return 0 | 1
 * Is there an interesection between TAsComponentProps props that are required
 * and TOwnProps?
 *   --> return 0
 * --> return 0 | 1
 */
export type ForwardRefAsExoticComponentCompositeProps<
  TOwnProps extends {},
  TAsComponentProps extends {}
> = {
  0: TOwnProps & { with: TAsComponentProps };
  1: TOwnProps & (Omit<TAsComponentProps, keyof TOwnProps> & { with?: never });
}[HasIndexSignature<TAsComponentProps> extends true
  ? 0
  : HasNonOptionalPropKeys<TAsComponentProps> extends false
  ? (0 | 1)
  : HasIntersectingNonOptionalProps<TOwnProps, TAsComponentProps> extends true
  ? 0
  : (0 | 1)];

/**
 * This is used to copy all properties from React.ForwardRefExoticComponent
 * except the callable annotation.
 */
export type NonCallableForwardRefExoticComponentProps<
  TDefaultComponent extends React.ReactType,
  TOwnProps extends {},
  TExtendedProps = TOwnProps & {
    as?: TDefaultComponent;
    with?: React.ComponentProps<TDefaultComponent>;
    children?: React.ReactNode;
  }
> = Pick<
  React.ForwardRefExoticComponent<TExtendedProps>,
  keyof React.ForwardRefExoticComponent<TExtendedProps>
>;

// tslint:disable:no-any
export type ForwardRefAsExoticComponent<
  TDefaultComponent extends React.ReactType,
  TOwnProps extends {},
  TForwardsProps extends {}
> = NonCallableForwardRefExoticComponentProps<TDefaultComponent, TOwnProps> & {
  <
    TAsComponent extends React.ReactType = TDefaultComponent,
    TAsComponentProps = React.ComponentProps<TAsComponent>
  >(
    props: {
      as?: TAsComponent;
      children?: React.ReactNode;
    } & ForwardRefAsExoticComponentCompositeProps<
      TOwnProps,
      TAsComponentProps
    > &
      React.RefAttributes<
        TAsComponent extends keyof JSX.IntrinsicElements
          ? FromReactType<TAsComponent>
          : TAsComponent
      >,
  ): React.ReactElement<any> | null;
  defaultProps: {
    as: TDefaultComponent;
  } & Partial<TOwnProps>;
  displayName: string;
  propTypes?: React.WeakValidationMap<
    { [k in "as" | "with" | "children" | keyof TOwnProps]: any }
  >;
};

export function forwardRefAs<
  TDefaultComponent extends React.ReactType,
  TOwnProps extends {},
  TForwardsProps extends {} = {}
>(
  Component: React.RefForwardingComponent<
    any,
    TOwnProps & { as: React.ReactType; children?: React.ReactNode; with?: any }
  >,
  defaultProps: ForwardRefAsExoticComponent<
    TDefaultComponent,
    TOwnProps,
    TForwardsProps
  >["defaultProps"],
) {
  const factory = React.forwardRef(Component);
  factory.defaultProps = {};
  Object.assign(factory.defaultProps, defaultProps);

  return factory as ForwardRefAsExoticComponent<
    TDefaultComponent,
    TOwnProps,
    TForwardsProps
  >;
}
// tslint:enable:no-any
