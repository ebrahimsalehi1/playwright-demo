import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Component1 from "./Component1";

/**
 * In React Testing Library,
 * the render method will render your component,
 * and in the example, as you can see, expect(...).toBeInTheDocument()
 * checks whether the component is in the DOM or not.
 */

describe("Component1", () => {
  it("should render Component1", () => {
    render(<Component1 />);
    expect(screen.getByText("Component 1")).toBeInTheDocument();
  });
});
