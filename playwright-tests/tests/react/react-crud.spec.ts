import { test, expect } from "@playwright/test";

test.describe("React App - CRUD Operations", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display user manager component", async ({ page }) => {
    const heading = page.locator('h2:has-text("User Management")');
    await expect(heading).toBeVisible();
  });

  test("should load and display existing users", async ({ page }) => {
    // Wait for users to load
    const usersList = page.locator('[data-testid="users-list"]');
    await expect(usersList).toBeVisible();

    // Check if users are displayed
    const userCards = page.locator(".user-card");
    await expect(userCards).toHaveCount(3); // 3 default users
  });

  test("should create a new user (POST)", async ({ page }) => {
    // Fill in the form
    await page.locator('[data-testid="input-name"]').fill("Test User");
    await page.locator('[data-testid="input-email"]').fill("test@example.com");
    await page.locator('[data-testid="input-role"]').fill("Tester");

    // Submit the form
    await page.locator('[data-testid="submit-button"]').click();

    // Wait for the user to appear in the list
    await page.waitForTimeout(500);

    // Verify the new user appears
    const newUser = page.locator('.user-card:has-text("Test User")');
    await expect(newUser).toBeVisible();
    await expect(
      newUser.locator('p:has-text("test@example.com")')
    ).toBeVisible();
  });

  test("should edit an existing user (PUT)", async ({ page }) => {
    // Wait for users to load
    await page.waitForTimeout(500);

    // Click edit on first user
    await page.locator('[data-testid="edit-user-1"]').click();

    // Verify form is populated
    const nameInput = page.locator('[data-testid="input-name"]');
    await expect(nameInput).toHaveValue("John Doe");

    // Update the name
    await nameInput.clear();
    await nameInput.fill("John Updated");

    // Submit
    await page.locator('[data-testid="submit-button"]').click();

    // Wait for update
    await page.waitForTimeout(500);

    // Verify the update
    const updatedUser = page.locator('[data-testid="user-1"]');
    await expect(
      updatedUser.locator('h4:has-text("John Updated")')
    ).toBeVisible();
  });

  test("should delete a user (DELETE)", async ({ page }) => {
    // Wait for users to load
    await page.waitForTimeout(500);

    // Get initial user count
    const initialCount = await page.locator(".user-card").count();

    // Set up dialog handler
    page.on("dialog", (dialog) => dialog.accept());

    // Delete first user
    await page.locator('[data-testid="delete-user-1"]').click();

    // Wait for deletion
    await page.waitForTimeout(500);

    // Verify user count decreased
    const finalCount = await page.locator(".user-card").count();
    expect(finalCount).toBe(initialCount - 1);
  });

  test("should cancel editing", async ({ page }) => {
    // Wait for users to load
    await page.waitForTimeout(500);

    // Click edit
    await page.locator('[data-testid="edit-user-1"]').click();

    // Verify cancel button appears
    const cancelButton = page.locator('[data-testid="cancel-button"]');
    await expect(cancelButton).toBeVisible();

    // Click cancel
    await cancelButton.click();

    // Verify form is reset
    const nameInput = page.locator('[data-testid="input-name"]');
    await expect(nameInput).toHaveValue("");
  });
});
