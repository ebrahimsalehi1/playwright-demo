import test, { expect } from "@playwright/test";

test.describe("typescript basics", () => {
  /**
   * toBe is fine for reference comparison but toEqual would be Ok for comparing the content.
   */
  test("toBe", async () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = obj1;
    expect(obj1).toBe(obj2);
  });

  test("toEqual", async () => {
    const obj = { a: 1, b: 2 };
    expect(obj).toEqual({ a: 1, b: 2 });
  });

  /**
   * toBeNaN checks if a value is NaN (Not a Number).
   * This occurs when the mathematical operation is undefined (like 0/0) or
   * when converting a non-numeric to a number fails like parseInt("hello")
   */
  test("toBeNaN", async () => {
    let value = NaN;
    expect(value).toBeNaN();

    value = 0 / 0;
    expect(value).toBeNaN();

    value = ("value" as any) * 3;
    expect(value).toBeNaN();

    value = (undefined as any) + 1;
    expect(value).toBeNaN();

    value = Math.sqrt(-1);
    expect(value).toBeNaN();

    value = Math.log(-1);
    expect(value).toBeNaN();
  });
});
