import React from "react";
import renderer from "react-test-renderer";

import Tag from "..";

describe("Tag component", () => {
  it("Should exist", () => {
    expect(Tag).toMatchSnapshot();
  });

  it("Should expose Tag Group", () => {
    expect(Tag.Group).toMatchSnapshot();
  });

  it("Should have tag classname", () => {
    const component = renderer.create(<Tag>Tag name</Tag>);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("Should concat classname in props with Bulma classname", () => {
    const component = renderer.create(
      <Tag className="other-class this-is-a-test">Tag name</Tag>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("Should use inline styles", () => {
    const component = renderer.create(
      <Tag style={{ width: 250 }}>Tag name</Tag>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("Should be Large", () => {
    const component = renderer.create(
      <Tag size={"large" as "large"}>Tag Large</Tag>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("Should be group tags", () => {
    const component = renderer.create(
      <Tag.Group gapless>
        <Tag>Tag 1</Tag>
        <Tag>Tag 2</Tag>
      </Tag.Group>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("Should use use color black", () => {
    const component = renderer.create(
      <Tag color={"black" as "black"}>tag black</Tag>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
