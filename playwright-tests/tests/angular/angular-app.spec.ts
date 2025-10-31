import { test, expect } from "@playwright/test";

test.describe("Angular App Tests", () => {
  test("should load Angular app homepage", async ({ page }) => {
    await page.goto("/");

    // Check for Angular app content
    await expect(page.locator("h1")).toBeVisible();
  });

  test("should display Angular content", async ({ page }) => {
    await page.goto("/");

    // Check for main content area
    const content = page.locator("main");
    await expect(content).toBeVisible();
  });

  test("should have navigation or toolbar", async ({ page }) => {
    await page.goto("/");

    // Angular apps typically have a toolbar or nav
    const hasHeader = await page
      .locator('header, nav, [role="banner"]')
      .count();
    expect(hasHeader).toBeGreaterThan(0);
  });
});
