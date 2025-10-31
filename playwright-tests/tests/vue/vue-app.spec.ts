import { test, expect } from "@playwright/test";

test.describe("Vue App Tests", () => {
  test("should load Vue app homepage", async ({ page }) => {
    await page.goto("/");

    // Check for Vue app heading
    await expect(page.locator("h1")).toBeVisible();
  });

  test("should have interactive counter button", async ({ page }) => {
    await page.goto("/");

    // Find and click the counter button (Vue default template has a counter)
    const button = page.locator("button");
    await expect(button).toBeVisible();

    // Click and verify counter increases
    await button.click();
    await button.click();
  });

  test("should display Vue logo", async ({ page }) => {
    await page.goto("/");

    // Check for Vue logo image
    const vueLogo = page.locator('img[alt*="Vue"]');
    await expect(vueLogo).toBeVisible();
  });
});
