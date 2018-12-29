import { Title, TITLE_SIZES } from "../title";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateOneOfPropType,
} from "../../../__tests__/testing";

const COMPONENT = Title;
const COMPONENT_NAME = "Title";
const DEFAULT_ELEMENT = "h1";
const BULMA_CLASS_NAME = "title";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
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

    describe("spaced", () => {
      validateBoolPropType(propTypes, "spaced");

      [false, true].map(spaced =>
        [false, true].map(subtitle => {
          const isSpaced = spaced && !subtitle;
          it(`should ${
            isSpaced ? "" : "not "
          }be spaced when spaced ${spaced} and subtitle ${subtitle}`, () => {
            const node = makeNode({ spaced });
            const wrapper = makeShallowWrapper(node);
            expect(wrapper.hasClass("is-spaced")).toBe(spaced);
          });
        }),
      );
    });

    describe("subtitle", () => {
      validateBoolPropType(propTypes, "subtitle");

      [false, true].map(subtitle =>
        it(`should ${subtitle ? "" : "not "}be subtitle`, () => {
          const node = makeNode({ subtitle });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass("subtitle")).toBe(subtitle);
          expect(wrapper.hasClass("title")).toBe(!subtitle);
        }),
      );
    });

    describe("size", () => {
      validateOneOfPropType(propTypes, "size", TITLE_SIZES);

      TITLE_SIZES.map(size =>
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        }),
      );
    });
  });
});
