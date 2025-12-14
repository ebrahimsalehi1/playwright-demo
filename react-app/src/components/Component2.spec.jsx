import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Component2 from "./Component2";

describe("Component2", () => {
  /**
   * In Vitest with Testing Library,
   * you may want more categorization, so use nested describe blocks.
   * Please take a look at the example here.
   */
  describe("rendering tests", () => {
    /**
     * In vitest with Testing library,
     * you can find HTML elements using the getByRole method.
     * In this example, the component is created in React.
     */
    it("renders Component2 with checked prop set to true", () => {
      render(<Component2 checked={true} />);
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
      expect(screen.getByRole("checkbox")).toHaveAttribute("checked");
    });

    it("renders Component2 with checked prop set to false", () => {
      render(<Component2 checked={false} />);
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
      expect(screen.getByRole("checkbox")).not.toHaveAttribute("checked");
    });
  });
});
