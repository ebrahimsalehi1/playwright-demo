import { test, expect } from "@playwright/test";

test.describe("React App Tests", () => {
  test("should load React app homepage", async ({ page }) => {
    await page.goto("/");

    // Check for Vite + React title or logo
    await expect(page.locator("h1")).toBeVisible();
  });

  test("should have interactive counter button", async ({ page }) => {
    await page.goto("/");

    // Find and click the counter button
    const button = page.locator("button");
    await expect(button).toBeVisible();

    // Click and verify counter increases
    await button.click();
    await button.click();
  });

  test("should display React logo", async ({ page }) => {
    await page.goto("/");

    // Check for React logo image
    const reactLogo = page.locator('img[alt*="React"]');
    await expect(reactLogo).toBeVisible();
  });
});
