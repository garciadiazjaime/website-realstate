import React from "react";

import renderer from "react-test-renderer";

import Card from "../card";

describe("Card", () => {
  describe("when there are items", () => {
    it("renders the items expected", () => {
      const data = {
        _id: 1,
        url: "url",
        image: "imageUrl",
        price: "price",
        description: "description",
        address: "address"
      };
      const formatter = {
        format: value => value
      };

      const component = renderer.create(
        <Card data={data} formatter={formatter} />
      );
      const tree = component.toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
