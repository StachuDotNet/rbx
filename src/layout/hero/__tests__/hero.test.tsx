import { COLORS } from "../../../base/helpers";
import { Hero, HERO_SIZES } from "../hero";
import { HeroBody } from "../hero-body";
import { HeroFoot } from "../hero-foot";
import { HeroHead } from "../hero-head";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateOneOfPropType,
} from "../../../__tests__/testing";

const COMPONENT = Hero;
const COMPONENT_NAME = "Hero";
const DEFAULT_ELEMENT = "section";
const BULMA_CLASS_NAME = "hero";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Body: HeroBody,
    Foot: HeroFoot,
    Head: HeroHead,
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeShallowWrapper,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeShallowWrapper);

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("color", () => {
      validateOneOfPropType(propTypes, "color", COLORS);

      COLORS.map(color =>
        it(`should be ${color}`, () => {
          const node = makeNode({ color });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-${color}`)).toBe(true);
        }),
      );
    });

    describe("gradient", () => {
      validateBoolPropType(propTypes, "gradient");

      [false, true].map(gradient =>
        it(`should ${gradient ? "" : "not "}have gradient`, () => {
          const node = makeNode({ gradient });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass("is-bold")).toBe(gradient);
        }),
      );
    });

    describe("size", () => {
      validateOneOfPropType(propTypes, "size", HERO_SIZES);

      HERO_SIZES.map(size =>
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        }),
      );
    });
  });
});
