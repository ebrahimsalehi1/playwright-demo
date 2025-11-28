import test, { expect } from "@playwright/test";

/**
  Each test in Playwright can have a page fixture, 
  which provides methods for performing operations on the page 
  such as goto(), title(), url(), and many more. 
  One of the most commonly used methods is goto(). 
  
  Here you can see an example: 
 */

test.describe("SauceDemo General Tests", () => {
  test("has title", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    await test.expect(page).toHaveTitle(/swag labs/i);
  });

  /**
   In Playwright, the page object plays a very important role.
   One use case is working with keyboard events.
   For example, if you want to log in to a web application,
   after entering the username and password, you may press the Enter key
   so that the login button is clicked.

   Here is a sample of how to do that:
   */

  test("should login successfully", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");

    expect(page.locator("#login-button")).toBeVisible();

    await page.keyboard.press("Enter");

    expect(page.url()).toMatch(/inventory.html/);
  });

  /**
   * In Playwright, you can take a screenshot of your current page.
   * This action is very beneficial whenever you want to show an error.

   * Here is a sample of how to do that:
 */

  test("take a screenshot", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    await page.screenshot({ path: "sample.png" });
  });

  /**
   * In Playwright, one way to find an element in the DOM is to use getByRole.
   * In this sample, the element is <input type="submit" value="Login">, so the role is 'button' and the name is 'Login'.
   */

  test("get by role", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    const loginButton = page.getByRole("button", { name: "Login" });
    expect(loginButton).toBeVisible();
    await loginButton.click();
  });

  /**
   * In Playwright, we can find an element by its placeholder attribute.
   * In this example, the element has a placeholder="Username" attribute.
   */

  /**
   * In Playwright, sometimes we can not see the result of our tests execution.
   * To solve this problem, we can pause the test execution at any point.
   */

  test("get by placeholder", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    const usernameInput = page.getByPlaceholder("Username");
    await expect(usernameInput).toBeVisible();
    await usernameInput.fill("standard_user");

    await page.pause();
  });

  /**
    In Playwright, to find an element by its ID, 
    simply use # before the ID name. 
    Since IDs should be unique, this will locate the element precisely.
   */

  test("get by id", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    const usernameInput = page.locator("#user-name");
    await expect(usernameInput).toBeVisible();
    await usernameInput.fill("standard_user");

    await page.pause();
  });

  /**
   In Playwright, to find an element by its name attribute, 
   use [name='value'] in a CSS selector, similar to querySelector
   */
  test("get by name", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    const usernameInput = page.locator("input[name='user-name']");
    await expect(usernameInput).toBeVisible();
    await usernameInput.fill("standard_user");
  });

  /**
    In Playwright, to find an element by its class name,
    use a dot (.) before the class name in the CSS selector.
   */

  test("get by classname", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    const usernameInput = page.locator(".input_error.form_input");
    await expect(usernameInput).toHaveCount(2);
  });
});
