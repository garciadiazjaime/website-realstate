import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";

import ListItems from "../listItems";
import Card from "../card";

jest.mock("../card", () => jest.fn().mockReturnValue(null));

describe("ListItems", () => {
  describe("when there are items", () => {
    it("renders the items expected", () => {
      const data = [
        {
          _id: 1
        },
        {
          _id: 2
        }
      ];

      mount(<ListItems data={data} />);

      expect(Card).toHaveBeenCalledTimes(2);
    });
  });

  describe("whene there are no items", () => {
    it("renders null", () => {
      const component = renderer.create(<ListItems />);
      const tree = component.toJSON();

      expect(tree).toBe(null);
    });
  });
});
