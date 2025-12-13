import test, { expect } from "@playwright/test";
test.describe("SauceDemo React Tests", () => {
  /**
   * If you use page.locator('...').all(),
   * you should be aware that it may cause flaky tests.
   * You need to use other methods instead.
   * both pictures show the same flaky test error.
   *
   * expect(elements.length).toBe(4); // ❌ Received 0
   * ✅ ❌
   */
  test("page.locator('...').all", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    const elements = await page.locator(".box").all();

    for (const element of elements) {
      await expect(element).toHaveAttribute(
        "non-exists-attribute", // ✅ Flaky
        "non-exists-value" // ✅ Flaky
      );
    }
  });

  /**
   * To ensure that all the elements you expect are in the DOM, you can use toHaveCount.
   * Here is an example:
   */
  test("toHaveCount", async ({ page }) => {
    await page.goto("http://localhost:5173");
    await expect(page.locator(".box")).toHaveCount(4);
  });

  /**
   * If you want to get a list of inner text from elements,
   * you can use allInnerTexts(),
   * but be aware that it doesn't work in all situations.
   * However, in this example it works correctly because the test waits until all the DOM elements are present.
   */

  test("allInnerTexts", async ({ page }) => {
    await page.goto("http://localhost:5173");
    const boxLocator = page.locator(".box");
    await expect(boxLocator).toHaveCount(4);

    const list = await boxLocator.allInnerTexts();
    expect(list).toEqual(["Element 1", "Element 2", "Element 3", "Element 4"]);
  });

  /**
   * As you can see, this is a flaky test.
   * It expects a length of 4,
   * but it returns 0 because we need to wait until all DOM elements are rendered.
   */

  test("allInnerTexts flaky", async ({ page }) => {
    await page.goto("http://localhost:5173");
    const boxLocator = page.locator(".box");

    const list = await boxLocator.allInnerTexts();
    expect(list).toHaveLength(4); // ❌ Received length: 0
  });

  test("getByRole('...').and('...')", async ({ page }) => {
    await page.goto("http://localhost:5173");

    const buttonRole = page.getByRole("button").and(page.getByText("Add User"));
    await expect(buttonRole).toHaveCount(1);
  });

  /**
   * Most HTML elements accept the title attribute.
   * For example <div title='elements-demo'>.
   * To find an element by its title attribute, you can use page.getByTitle().
   */
  test("getByTitle", async ({ page }) => {
    await page.goto("http://localhost:5173");
    await expect(page.getByTitle("elements-demo")).toBeVisible();
  });

  /**
   * If you want to find HTML elements by their tag name,
   * you can use the tag name directly in page.locator().
   * In this example, it finds all <input> elements in the DOM.
   */

  test("find by tag name", async ({ page }) => {
    await page.goto("http://localhost:5173");
    await expect(page.locator("input")).toHaveCount(3);
    const elements = await page.locator("input").all();
    expect(elements).toHaveLength(3);
  });

  /**
   * If you want to find descendent elements within a parent,
   * you can chain locators using page.locator('...').locator('...').
   * The second locator will search within the context of the first locator.
   */
  test("find children", async ({ page }) => {
    await page.goto("http://localhost:5173");
    const childrenElements = page.locator("form").locator("*");
    await expect(childrenElements).toHaveCount(6);
  });
});
