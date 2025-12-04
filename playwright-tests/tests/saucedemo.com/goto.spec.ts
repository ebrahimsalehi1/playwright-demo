import test, { expect } from "@playwright/test";

/**
  Each test in Playwright can have a page fixture, 
  which provides methods for performing operations on the page 
  such as goto(), title(), url(), and many more. 
  One of the most commonly used methods is goto(). 
  
  Here you can see an example: 
 */

test.describe("SauceDemo General Tests", () => {
  /**
   * If you want to perform repetitive actions before each test, simply use test.beforeEach.
   */
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
  });

  test("has title", async ({ page }) => {
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
    // Using element locator with fill() method
    const usernameInput = page.locator("#user-name");
    const passwordInput = page.locator("#password");

    await usernameInput.fill("standard_user");
    await passwordInput.fill("secret_sauce");

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
    await page.screenshot({ path: "sample.png" });
  });

  /**
   * In Playwright, one way to find an element in the DOM is to use getByRole.
   * In this sample, the element is <input type="submit" value="Login">, so the role is 'button' and the name is 'Login'.
   */

  test("get by role", async ({ page }) => {
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
    const usernameInput = page.locator("input[name='user-name']");
    await expect(usernameInput).toBeVisible();
    await usernameInput.fill("standard_user");
  });

  /**
    In Playwright, to find an element by its class name,
    use a dot (.) before the class name in the CSS selector.
   */

  test("get by classname", async ({ page }) => {
    const usernameInput = page.locator(".input_error.form_input");
    await expect(usernameInput).toHaveCount(2);
  });

  /**
   * If we want to find an element with a data-test attribute,
   * we can use page.locator() as shown in the example below.
   */
  test("find a data-test attribute", async ({ page }) => {
    const loginButtonSelector = "[data-test='login-button']";
    const loginButton = page.locator(loginButtonSelector);
    await expect(loginButton).toBeVisible();
    await loginButton.click();
  });

  /**
   * It is not recommended in Playwright,
   * but For finding an element in DOM such as normal way in Browser,
   * you can use page.evaluate
   */

  test("page evaluate", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.evaluate(() => {
      document
        .querySelector("#user-name")
        ?.setAttribute("value", "standard_user");
    });
  });

  /**
   * Finding elements based on the property is doable with page.locator.
   * Please see the example here:
   */
  test("find by property", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    const selector = "input[autocorrect='off']";
    const elements = page.locator(selector);
    expect(elements).toHaveCount(2);
  });

  /**
   * If you want to wait until a page reaches a specific loading state,
   * you can use page.waitForLoadState method.
   * 'networkidle' waits for the network to be idle
   */
  test("page.waitForLoadState", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.waitForLoadState("networkidle");
  });

  /**
   * If you want to ensure that the content of the string contains an expected substring,
   * you can use toContain().
   */
  test("toContain", () => {
    const value = "text1 text2 text3";
    expect(value).toContain("text1 text2");
  });

  /**
   * For ensuring that the value is false in a boolean context,
   * you can use toBeFalsy().
   * Some values such as 0, '', null, undefined, and NaN are falsy.
   */
  test("toBeFalsy", () => {
    let value = undefined;
    expect(value).toBeFalsy();

    value = null;
    expect(value).toBeFalsy();

    value = 0;
    expect(value).toBeFalsy();

    value = "";
    expect(value).toBeFalsy();

    value = false;
    expect(value).toBeFalsy();
  });
});
