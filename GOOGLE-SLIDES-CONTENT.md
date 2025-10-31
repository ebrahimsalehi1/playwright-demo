# 🎭 Playwright Training - Google Slides Ready Format

**Instructions:** Each section below represents one slide. Copy the content and paste it into a new slide in Google Slides. Format titles as headings and content as body text or bullet points.

---

## SLIDE 1: Title Slide

**Title:** Playwright: Modern End-to-End Testing

**Subtitle:** Building Reliable Web Application Tests

**Add:** Your name, organization, date, and Playwright logo

---

## SLIDE 2: What is Playwright?

**Title:** What is Playwright?

**Content:**
Playwright is a modern end-to-end testing framework developed by Microsoft

**Key Features:**
• Cross-browser testing (Chromium, Firefox, WebKit)
• Auto-wait capabilities eliminate flaky tests
• Built specifically for modern web applications
• First-class TypeScript and JavaScript support
• Fast, reliable, and developer-friendly

**Quote:** "Reliable and fast testing across all modern browsers"

---

## SLIDE 3: Why Choose Playwright?

**Title:** Why Choose Playwright?

**Comparison Table:**

| Feature     | Playwright   | Selenium     | Cypress       |
| ----------- | ------------ | ------------ | ------------- |
| Speed       | ⚡ Fast      | 🐌 Slower    | ⚡ Fast       |
| Auto-wait   | ✅ Yes       | ❌ No        | ✅ Yes        |
| Browsers    | All 3 major  | All browsers | Chrome only\* |
| API Testing | ✅ Built-in  | ❌ No        | ⚠️ Limited    |
| Debugging   | 🎯 Excellent | ⚠️ Basic     | 🎯 Good       |

**Key Advantages:**
• Faster test execution
• More reliable (auto-waits eliminate flakiness)
• Better developer experience
• Modern architecture

---

## SLIDE 4: Who Uses Playwright?

**Title:** Who Uses Playwright?

**Companies:**
• Microsoft (creator and heavy user)
• VS Code team
• GitHub
• Bing
• Many Fortune 500 companies

**Common Use Cases:**
• End-to-end testing
• Visual regression testing
• API testing
• Web scraping and automation
• CI/CD integration

---

## SLIDE 5: Course Objectives

**Title:** What You'll Learn Today

**Learning Outcomes:**
✅ Setting up Playwright projects from scratch
✅ Writing effective and maintainable test cases
✅ Using proper selectors and locators
✅ Testing API calls and CRUD operations
✅ Testing across multiple frameworks (React, Angular, Vue)
✅ Debugging techniques and best practices
✅ CI/CD integration strategies

---

## SLIDE 6: Installation & Setup

**Title:** Getting Started - Installation

**Command:**

```
npm init playwright@latest
```

**What Gets Installed:**
• Playwright Test runner
• Browser binaries (Chromium, Firefox, WebKit)
• Example test files
• Configuration file (playwright.config.ts)
• GitHub Actions workflow (optional)

**Quick Start:**
• Interactive setup wizard
• Choose TypeScript or JavaScript
• Select test folder location
• Installs in under 2 minutes

---

## SLIDE 7: Project Structure

**Title:** Playwright Project Structure

```
my-project/
├── playwright.config.ts      # Main configuration
├── tests/                    # Your test files
│   ├── example.spec.ts
│   └── my-test.spec.ts
├── playwright-report/        # HTML test reports
├── test-results/            # Screenshots & videos
└── package.json
```

**Key Files:**
• `playwright.config.ts` - Configure browsers, timeouts, baseURL
• `tests/*.spec.ts` - Your test files
• Test results automatically generated

---

## SLIDE 8: Configuration Overview

**Title:** Key Configuration Options

**playwright.config.ts:**

```typescript
export default {
  testDir: "./tests", // Test location
  timeout: 30000, // Test timeout
  retries: 2, // Retry on failure
  use: {
    baseURL: "http://localhost:3000",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [{ name: "chromium" }, { name: "firefox" }, { name: "webkit" }],
};
```

---

## SLIDE 9: Your First Test

**Title:** Writing Your First Test

**Simple Example:**

```typescript
import { test, expect } from "@playwright/test";

test("homepage has correct title", async ({ page }) => {
  // Navigate to page
  await page.goto("https://example.com");

  // Assert title
  await expect(page).toHaveTitle(/Example/);
});
```

**Three Simple Steps:**

1. Import test and expect
2. Define test with async function
3. Interact with page and make assertions

---

## SLIDE 10: Running Tests

**Title:** How to Run Tests

**Basic Commands:**

```bash
npx playwright test                 # Run all tests
npx playwright test --headed        # See browser
npx playwright test --ui            # Interactive UI mode
npx playwright test --debug         # Debug mode
npx playwright test example.spec.ts # Specific file
```

**Useful Options:**
• `--project=chromium` - Run on specific browser
• `--grep "login"` - Run tests matching pattern
• `--reporter=html` - Generate HTML report

---

## SLIDE 11: Test Anatomy

**Title:** Understanding Test Structure

```typescript
import { test, expect } from "@playwright/test";

test.describe("User Login Feature", () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
    await page.goto("/login");
  });

  test("should login with valid credentials", async ({ page }) => {
    // Test implementation
    await page.getByLabel("Email").fill("user@example.com");
    await page.getByLabel("Password").fill("password");
    await page.getByRole("button", { name: "Login" }).click();

    // Assertions
    await expect(page).toHaveURL("/dashboard");
  });
});
```

---

## SLIDE 12: Page Object & Fixtures

**Title:** Key Concepts - Page & Fixtures

**Page Object:**
• Main interface to interact with the browser
• Every test receives a `page` object
• Provides methods like `goto()`, `click()`, `fill()`

**Context:**
• Isolated browser context (like incognito)
• Each test gets fresh context

**Fixtures:**
• Reusable test setup
• Built-in: `page`, `context`, `browser`, `request`
• Create custom fixtures for common scenarios

---

## SLIDE 13: What are Locators?

**Title:** Understanding Locators

**Definition:**
Locators are ways to find elements on a web page

**Why They Matter:**
• Core of interacting with web elements
• Proper locators = stable tests
• Bad locators = flaky tests

**Playwright's Approach:**
• Auto-waiting (waits for element to be ready)
• Strict mode (ensures single element match)
• Resilient to page changes

---

## SLIDE 14: Selector Types

**Title:** Types of Selectors

| Selector           | Code Example                      | Use Case               |
| ------------------ | --------------------------------- | ---------------------- |
| **By Role**        | `page.getByRole('button')`        | Buttons, links, inputs |
| **By Label**       | `page.getByLabel('Email')`        | Form inputs            |
| **By Text**        | `page.getByText('Login')`         | Visible text           |
| **By Placeholder** | `page.getByPlaceholder('Search')` | Input hints            |
| **By Test ID**     | `page.getByTestId('submit-btn')`  | Stable IDs             |
| **By CSS**         | `page.locator('.btn-primary')`    | CSS classes            |

---

## SLIDE 15: Recommended Selectors ⭐

**Title:** Selector Best Practices

**Priority Order (Best to Worst):**

1. 🥇 **getByRole** - Most accessible and stable

   ```typescript
   page.getByRole("button", { name: "Submit" });
   ```

2. 🥈 **getByLabel** - Perfect for form elements

   ```typescript
   page.getByLabel("Email address");
   ```

3. 🥉 **getByTestId** - Stable IDs for testing

   ```typescript
   page.getByTestId("submit-button");
   ```

4. ⚠️ **CSS/XPath** - Last resort (brittle)
   ```typescript
   page.locator("div > button:nth-child(3)"); // Avoid!
   ```

**Why This Order?**
• Matches how users interact
• More resilient to UI changes
• Better accessibility

---

## SLIDE 16: Chaining & Filtering

**Title:** Advanced Locator Techniques

**Chaining Locators:**

```typescript
await page
  .locator(".user-card")
  .filter({ hasText: "John Doe" })
  .getByRole("button", { name: "Edit" })
  .click();
```

**Position-based:**

```typescript
await page.locator(".item").first().click();
await page.locator(".item").last().click();
await page.locator(".item").nth(2).click();
```

**Filtering:**

```typescript
await page.locator("article").filter({ hasText: "Playwright" });
```

---

## SLIDE 17: Auto-Waiting

**Title:** Playwright's Auto-Wait Magic

**Built-in Waits (Automatic):**
✅ Element is visible
✅ Element is attached to DOM
✅ Element is stable (not animating)
✅ Element receives events
✅ Element is enabled

**You Don't Need:**

```typescript
// ❌ Manual waits (avoid!)
await page.waitForTimeout(1000);
```

**When Manual Waits Are Needed:**

```typescript
// ✅ Wait for specific state
await page.waitForLoadState("networkidle");
await page.waitForSelector(".loaded");
```

---

## SLIDE 18: Codegen - Test Generator

**Title:** Codegen - Record Your Tests

**Command:**

```bash
npx playwright codegen https://example.com
```

**What It Does:**
• Opens browser and inspector
• Records your actions
• Generates test code automatically
• Shows you best selector practices

**Use Cases:**
• Learning proper selectors
• Quick test prototyping
• Exploring new applications
• Training team members

**Demo Screenshot:** [Show codegen in action]

---

## SLIDE 19: Common Actions

**Title:** Interacting with Elements

**Essential Actions:**

```typescript
// Click
await page.getByRole("button", { name: "Submit" }).click();

// Fill input
await page.getByLabel("Email").fill("test@example.com");

// Select dropdown
await page.getByLabel("Country").selectOption("USA");

// Check/Uncheck checkbox
await page.getByLabel("Accept terms").check();
await page.getByLabel("Newsletter").uncheck();

// Upload file
await page.getByLabel("Upload").setInputFiles("file.pdf");
```

---

## SLIDE 20: Keyboard & Mouse Actions

**Title:** Advanced Interactions

**Keyboard:**

```typescript
await page.keyboard.press("Enter");
await page.keyboard.type("Hello World");
await page.keyboard.press("Control+A");
```

**Mouse:**

```typescript
await page.mouse.move(100, 200);
await page.mouse.click(100, 200);
await page.mouse.dblclick(100, 200);
```

**Hover:**

```typescript
await page.getByRole("button").hover();
```

**Drag & Drop:**

```typescript
await page.locator("#source").dragTo(page.locator("#target"));
```

---

## SLIDE 21: Navigation

**Title:** Page Navigation

**Basic Navigation:**

```typescript
// Go to URL
await page.goto("https://example.com");

// Go back/forward
await page.goBack();
await page.goForward();

// Reload page
await page.reload();
```

**Wait for Navigation:**

```typescript
await Promise.all([
  page.waitForNavigation(),
  page.getByRole("link", { name: "Products" }).click(),
]);
```

---

## SLIDE 22: Working with Multiple Elements

**Title:** Multiple Elements

**Count Elements:**

```typescript
const count = await page.locator(".item").count();
console.log(`Found ${count} items`);
```

**Iterate Over Elements:**

```typescript
const items = page.locator(".item");
for (let i = 0; i < (await items.count()); i++) {
  const text = await items.nth(i).textContent();
  console.log(text);
}
```

**Get All Text:**

```typescript
const allTexts = await page.locator(".item").allTextContents();
```

---

## SLIDE 23: Frames & IFrames

**Title:** Working with Frames

**Access Frame:**

```typescript
// By name
const frame = page.frame("frame-name");
await frame.locator(".button").click();

// By selector
const frameLocator = page.frameLocator("#my-iframe");
await frameLocator.locator(".button").click();
```

**Why Frames Are Special:**
• Separate DOM context
• Need explicit frame access
• Common in embedded content

---

## SLIDE 24: Dialogs & Pop-ups

**Title:** Handling Dialogs

**JavaScript Dialogs:**

```typescript
// Handle alert/confirm/prompt
page.on("dialog", async (dialog) => {
  console.log(dialog.message());
  await dialog.accept(); // or dialog.dismiss()
});

await page.getByRole("button").click();
```

**New Windows/Tabs:**

```typescript
const [newPage] = await Promise.all([
  context.waitForEvent("page"),
  page.getByRole("link", { name: "Open new tab" }).click(),
]);

await newPage.waitForLoadState();
```

---

## SLIDE 25: Assertion Types

**Title:** Making Assertions

**Three Categories:**

1. **Page Assertions**
   • URL, title, screenshot

2. **Locator Assertions**
   • Visibility, content, attributes, state

3. **Generic Assertions**
   • Values, arrays, objects

**All assertions auto-wait!**

---

## SLIDE 26: Page Assertions

**Title:** Page-Level Assertions

```typescript
// URL
await expect(page).toHaveURL("https://example.com/dashboard");
await expect(page).toHaveURL(/dashboard/);

// Title
await expect(page).toHaveTitle("Dashboard | MyApp");
await expect(page).toHaveTitle(/Dashboard/);

// Screenshot comparison
await expect(page).toHaveScreenshot("homepage.png");
```

---

## SLIDE 27: Locator Assertions

**Title:** Element Assertions

**Visibility:**

```typescript
await expect(page.locator(".success")).toBeVisible();
await expect(page.locator(".loading")).toBeHidden();
```

**Content:**

```typescript
await expect(page.locator("h1")).toHaveText("Welcome");
await expect(page.locator(".message")).toContainText("Success");
```

**Attributes:**

```typescript
await expect(page.locator("a")).toHaveAttribute("href", "/home");
await expect(page.locator("img")).toHaveAttribute("alt");
```

**State:**

```typescript
await expect(page.locator("button")).toBeEnabled();
await expect(page.locator("input")).toBeChecked();
```

---

## SLIDE 28: Custom Matchers

**Title:** More Assertions

**Count:**

```typescript
await expect(page.locator(".item")).toHaveCount(5);
```

**Value:**

```typescript
await expect(page.getByLabel("Email")).toHaveValue("test@example.com");
```

**CSS:**

```typescript
await expect(element).toHaveCSS("color", "rgb(255, 0, 0)");
```

**Negation:**

```typescript
await expect(element).not.toBeVisible();
```

---

## SLIDE 29: Soft Assertions

**Title:** Soft Assertions (Continue on Failure)

**Normal Assertion:**

```typescript
// Test stops on failure
await expect(page.locator(".title")).toHaveText("Title");
```

**Soft Assertion:**

```typescript
// Test continues, marks as failed at the end
await expect.soft(page.locator(".title")).toHaveText("Title");
await expect.soft(page.locator(".subtitle")).toBeVisible();
await expect.soft(page.locator(".footer")).toContainText("2024");

// All assertions checked, then test marked failed if any failed
```

**Use Case:** Checking multiple page elements

---

## SLIDE 30: Why API Testing?

**Title:** API Testing in Playwright

**Why Test APIs?**
✅ **Faster** - No browser rendering
✅ **More Reliable** - No UI flakiness
✅ **Test Backend** - Independently from UI
✅ **Setup Data** - Prepare test scenarios
✅ **Verify Backend** - Check data after UI actions

**When to Use:**
• Testing REST APIs
• Setting up test data
• Verifying backend state
• Mocking API responses

---

## SLIDE 31: Making API Requests

**Title:** API Testing Example

```typescript
import { test, expect } from "@playwright/test";

test("GET users from API", async ({ request }) => {
  const response = await request.get("https://api.example.com/users");

  // Check status
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Check response body
  const users = await response.json();
  expect(users).toHaveLength(3);
  expect(users[0]).toHaveProperty("name");
});
```

---

## SLIDE 32: CRUD Operations

**Title:** Testing CRUD Operations

**POST - Create:**

```typescript
const response = await request.post("/api/users", {
  data: {
    name: "John Doe",
    email: "john@example.com",
    role: "Developer",
  },
});
expect(response.ok()).toBeTruthy();
```

**PUT - Update:**

```typescript
await request.put("/api/users/1", {
  data: { name: "John Updated" },
});
```

**DELETE - Remove:**

```typescript
await request.delete("/api/users/1");
```

---

## SLIDE 33: API Context & Headers

**Title:** Authentication & Headers

**Set Headers:**

```typescript
const context = await request.newContext({
  extraHTTPHeaders: {
    Authorization: "Bearer token123",
    "Content-Type": "application/json",
  },
});

const response = await context.get("/api/protected");
```

**Reuse Across Tests:**

```typescript
test.beforeAll(async ({ request }) => {
  // Login and save token
});
```

---

## SLIDE 34: Combining API + UI

**Title:** Best Practice: API + UI Testing

**Strategy:**

```typescript
test("verify user in UI after API creation", async ({ request, page }) => {
  // 1. Setup via API (fast!)
  await request.post("/api/users", {
    data: { name: "Test User", email: "test@example.com" },
  });

  // 2. Verify in UI
  await page.goto("/users");
  await expect(page.getByText("Test User")).toBeVisible();

  // 3. Interact with UI
  await page.getByText("Test User").click();

  // 4. Verify via API
  const response = await request.get("/api/users/123");
  const user = await response.json();
  expect(user.lastViewed).toBeTruthy();
});
```

---

## SLIDE 35: Network Mocking

**Title:** Mocking API Responses

**Mock Response:**

```typescript
await page.route("/api/users", async (route) => {
  await route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify([
      { id: 1, name: "Mocked User" },
      { id: 2, name: "Another Mock" },
    ]),
  });
});

await page.goto("/users");
// Page will see mocked data
```

**Use Cases:**
• Testing error states
• Offline mode
• Slow connections

---

## SLIDE 36: Demo Project Overview

**Title:** Real-World Demo Project

**Project Structure:**

```
playwright-demo/
├── api-server/          # JSON Server REST API
├── react-app/           # React + Vite
├── angular-app/         # Angular 20
├── vue-app/             # Vue 3 + Vite
└── playwright-tests/    # Organized test suites
```

**What It Demonstrates:**
• Full CRUD operations across all frameworks
• API integration
• Organized test structure
• Real-world patterns

---

## SLIDE 37: Testing React App

**Title:** React App Testing

**Component:** UserManager with CRUD

**Test Example:**

```typescript
test("create user in React app", async ({ page }) => {
  await page.goto("http://localhost:5173");

  // Fill form
  await page.getByTestId("input-name").fill("John Doe");
  await page.getByTestId("input-email").fill("john@example.com");
  await page.getByTestId("input-role").fill("Developer");

  // Submit
  await page.getByTestId("submit-button").click();

  // Verify
  await expect(page.getByText("John Doe")).toBeVisible();
});
```

**Tests:**
• useState hooks
• useEffect data fetching
• Form handling

---

## SLIDE 38: Testing Angular App

**Title:** Angular App Testing

**Features Tested:**
• HttpClient service
• RxJS Observables
• Two-way data binding (FormsModule)
• @if and @for control flow
• Component lifecycle (OnInit)

**Test Example:**

```typescript
test("update user in Angular app", async ({ page }) => {
  await page.goto("http://localhost:4200");

  // Click edit
  await page.getByTestId("edit-user-1").click();

  // Verify form populated
  await expect(page.getByTestId("input-name")).toHaveValue("John Doe");

  // Update name
  await page.getByTestId("input-name").fill("John Updated");
  await page.getByTestId("submit-button").click();

  // Verify update
  await expect(page.getByText("John Updated")).toBeVisible();
});
```

---

## SLIDE 39: Testing Vue App

**Title:** Vue.js App Testing

**Features Tested:**
• Composition API (script setup)
• Reactive refs
• v-model two-way binding
• v-for list rendering
• onMounted lifecycle

**Test Example:**

```typescript
test("delete user in Vue app", async ({ page }) => {
  await page.goto("http://localhost:5174");

  // Count initial users
  const initialCount = await page.locator(".user-card").count();

  // Handle confirmation dialog
  page.on("dialog", (dialog) => dialog.accept());

  // Delete user
  await page.getByTestId("delete-user-1").click();

  // Verify count decreased
  const finalCount = await page.locator(".user-card").count();
  expect(finalCount).toBe(initialCount - 1);
});
```

---

## SLIDE 40: CRUD Testing Pattern

**Title:** Common CRUD Testing Pattern

**Structure:**

```typescript
test.describe("CRUD Operations", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("CREATE - POST new user", async ({ page }) => {
    // Fill form and submit
  });

  test("READ - GET and display users", async ({ page }) => {
    // Verify users load and display
  });

  test("UPDATE - PUT existing user", async ({ page }) => {
    // Edit form and save
  });

  test("DELETE - Remove user", async ({ page }) => {
    // Click delete and confirm
  });
});
```

---

## SLIDE 41: Multi-Browser Configuration

**Title:** Testing Across Browsers & Frameworks

**playwright.config.ts:**

```typescript
projects: [
  // React tests
  { name: "react-chromium", use: { baseURL: "http://localhost:5173" } },
  { name: "react-firefox", use: { baseURL: "http://localhost:5173" } },
  { name: "react-webkit", use: { baseURL: "http://localhost:5173" } },

  // Angular tests
  { name: "angular-chromium", use: { baseURL: "http://localhost:4200" } },

  // Vue tests
  { name: "vue-chromium", use: { baseURL: "http://localhost:5174" } },
];
```

**Run specific:**

```bash
npx playwright test --project=react-firefox
```

---

## SLIDE 42: Organized Test Structure

**Title:** Test Organization Best Practice

**Folder Structure:**

```
tests/
├── react/
│   ├── README.md
│   ├── react-app.spec.ts      # Basic tests
│   └── react-crud.spec.ts     # CRUD tests
├── angular/
│   ├── README.md
│   ├── angular-app.spec.ts
│   └── angular-crud.spec.ts
└── vue/
    ├── README.md
    ├── vue-app.spec.ts
    └── vue-crud.spec.ts
```

**Benefits:**
• Easy to find tests
• Run tests by framework
• Scale as project grows

---

## SLIDE 43: Debugging Tools Overview

**Title:** Playwright Debugging Tools

**Available Tools:**
🔍 **Playwright Inspector** - Step through tests
🎯 **UI Mode** - Interactive test runner
📊 **Trace Viewer** - Time-travel debugging
📸 **Screenshots & Videos** - Visual debugging
📝 **Console Logs** - See page console
🔧 **VS Code Extension** - IDE integration

**All tools work together!**

---

## SLIDE 44: Debug Mode

**Title:** Using Debug Mode

**Command:**

```bash
npx playwright test --debug
```

**Features:**
• Opens Playwright Inspector
• Pause before each action
• Step through test line by line
• Inspect page state
• Try selectors in real-time
• See network requests

**When to Use:**
• Test failing and you don't know why
• Exploring new application
• Verifying selectors work

[Screenshot of Inspector]

---

## SLIDE 45: UI Mode ⭐

**Title:** UI Mode - Interactive Testing

**Command:**

```bash
npx playwright test --ui
```

**Features:**
✨ **Watch Mode** - Auto-rerun on file changes
⏱️ **Time Travel** - Step backward through test
🎬 **Action Log** - See each step
🔍 **Locator Picker** - Find elements visually
📸 **Screenshots** - Every step captured
🐛 **Debug** - Pause and inspect

**Best for:** Development & debugging

[Screenshot of UI Mode]

---

## SLIDE 46: Trace Viewer

**Title:** Trace Viewer - Time Travel Debugging

**Enable in config:**

```typescript
use: {
  trace: 'on-first-retry',      // Or 'on', 'off', 'retain-on-failure'
  screenshot: 'only-on-failure',
  video: 'retain-on-failure'
}
```

**View trace:**

```bash
npx playwright show-trace trace.zip
```

**Shows:**
• Complete timeline
• Screenshots of each action
• Network requests
• Console logs
• DOM snapshots

[Screenshot of Trace Viewer]

---

## SLIDE 47: Common Issues & Solutions

**Title:** Troubleshooting Common Problems

| Issue                          | Cause                   | Solution                           |
| ------------------------------ | ----------------------- | ---------------------------------- |
| **Flaky tests**                | Race conditions         | Use auto-waits properly            |
| **Element not found**          | Wrong selector          | Use getByRole/getByLabel           |
| **Timeout**                    | Slow loading            | Increase timeout or wait for state |
| **Works locally, fails in CI** | Environment differences | Use consistent baseURL             |
| **Element not visible**        | Element hidden/covered  | Check z-index, scroll into view    |

---

## SLIDE 48: Best Practices for Stable Tests

**Title:** Writing Stable Tests

**Do's:**
✅ Use data-testid for stable selectors
✅ Leverage auto-waiting (don't use sleep/timeout)
✅ Use page.waitForLoadState() when needed
✅ Keep tests independent (no shared state)
✅ Clean up test data
✅ Use meaningful test names

**Don'ts:**
❌ Don't use brittle selectors (nth-child)
❌ Don't hardcode waits (waitForTimeout)
❌ Don't make tests dependent on each other
❌ Don't test implementation details
❌ Don't create data without cleanup

---

## SLIDE 49: Page Object Model (POM)

**Title:** Page Object Model Pattern

**Concept:** Encapsulate page interactions in classes

**Example:**

```typescript
// pages/loginPage.ts
export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/login");
  }

  async login(email: string, password: string) {
    await this.page.getByLabel("Email").fill(email);
    await this.page.getByLabel("Password").fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
  }

  async getErrorMessage() {
    return this.page.locator(".error-message").textContent();
  }
}
```

**In Test:**

```typescript
const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login("user@example.com", "password");
```

---

## SLIDE 50: Custom Fixtures

**Title:** Creating Custom Fixtures

**Concept:** Reusable test setup

**Example:**

```typescript
// fixtures/auth.ts
import { test as base } from "@playwright/test";

export const test = base.extend<{ authenticatedPage: Page }>({
  authenticatedPage: async ({ page }, use) => {
    // Setup: Login
    await page.goto("/login");
    await page.getByLabel("Email").fill("user@example.com");
    await page.getByLabel("Password").fill("password");
    await page.getByRole("button", { name: "Login" }).click();

    // Use authenticated page
    await use(page);

    // Teardown: Logout
    await page.getByRole("button", { name: "Logout" }).click();
  },
});
```

**Usage:**

```typescript
test("access dashboard", async ({ authenticatedPage }) => {
  await authenticatedPage.goto("/dashboard");
  // Already logged in!
});
```

---

## SLIDE 51: Visual Regression Testing

**Title:** Visual Testing with Screenshots

**Take Screenshot:**

```typescript
await expect(page).toHaveScreenshot("homepage.png");
```

**What Happens:**

1. First run: Creates baseline screenshot
2. Next runs: Compares with baseline
3. If different: Test fails, shows diff image

**Update Baselines:**

```bash
npx playwright test --update-snapshots
```

**Use Cases:**
• Detect visual regressions
• Verify layout consistency
• Check responsive design

**Configuration:**

```typescript
expect(page).toHaveScreenshot("page.png", {
  maxDiffPixels: 100, // Allow minor differences
});
```

---

## SLIDE 52: Parallel Execution

**Title:** Running Tests in Parallel

**Configuration:**

```typescript
// playwright.config.ts
export default {
  workers: process.env.CI ? 1 : 4, // 4 parallel workers locally
  fullyParallel: true, // Run all tests in parallel
};
```

**Test-level:**

```typescript
// Parallel within describe
test.describe.configure({ mode: "parallel" });

test.describe("My Tests", () => {
  test("test 1", async ({ page }) => {});
  test("test 2", async ({ page }) => {});
});
```

**Benefits:**
• Faster test execution
• Better resource utilization
• Scales with CI

---

## SLIDE 53: Test Annotations

**Title:** Test Annotations & Tags

**Skip Tests:**

```typescript
test.skip("not ready yet", async ({ page }) => {});

// Conditional skip
test.skip(
  ({ browserName }) => browserName === "webkit",
  "Feature not supported in Safari"
);
```

**Mark Slow:**

```typescript
test.slow(); // Triples timeout
```

**Tags:**

```typescript
test("login @smoke @auth", async ({ page }) => {});
```

**Run tagged tests:**

```bash
npx playwright test --grep @smoke
npx playwright test --grep-invert @slow  # Exclude @slow
```

---

## SLIDE 54: Reporter Options

**Title:** Test Reporting

**Built-in Reporters:**

```typescript
reporter: [
  ["html"], // Interactive HTML
  ["list"], // Console output
  ["json", { outputFile: "results.json" }],
  ["junit", { outputFile: "results.xml" }],
  ["dot"], // Minimal output
];
```

**Third-party:**
• Allure
• Monocart
• Tesults

**Custom Reporter:**

```typescript
class MyReporter {
  onTestEnd(test, result) {
    console.log(`${test.title}: ${result.status}`);
  }
}
```

---

## SLIDE 55: Global Setup & Teardown

**Title:** Global Setup/Teardown

**Use Cases:**
• Start/stop test server
• Seed database
• Authenticate once for all tests
• Environment setup

**global-setup.ts:**

```typescript
async function globalSetup() {
  // Start API server
  console.log("Starting API server...");

  // Seed database
  await seedDatabase();

  // Global authentication
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("/login");
  // ... login
  await page.context().storageState({ path: "auth.json" });
  await browser.close();
}

export default globalSetup;
```

**Config:**

```typescript
globalSetup: './global-setup',
globalTeardown: './global-teardown'
```

---

## SLIDE 56: Why CI/CD Testing?

**Title:** Continuous Integration & Testing

**Benefits:**
✅ **Catch bugs early** - Before they reach production
✅ **Automated** - Run on every commit/PR
✅ **Consistent** - Same environment every time
✅ **Fast feedback** - Know if changes break tests
✅ **Prevent regressions** - Guard against breaking changes
✅ **Confidence** - Safe to deploy

**When Tests Run:**
• On every push
• On pull requests
• Before deployment
• Scheduled (nightly)

---

## SLIDE 57: GitHub Actions Example

**Title:** GitHub Actions Integration

**.github/workflows/playwright.yml:**

```yaml
name: Playwright Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps

      - name: Run Playwright tests
        run: npx playwright test

      - name: Upload test report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

---

## SLIDE 58: Docker Integration

**Title:** Running Playwright in Docker

**Dockerfile:**

```dockerfile
FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["npx", "playwright", "test"]
```

**Build & Run:**

```bash
docker build -t my-playwright-tests .
docker run -it my-playwright-tests
```

**Benefits:**
• Consistent environment
• Works anywhere
• Easy CI/CD integration

---

## SLIDE 59: Parallel CI Execution

**Title:** Sharding Tests in CI

**GitHub Actions Matrix:**

```yaml
strategy:
  matrix:
    shard: [1/4, 2/4, 3/4, 4/4]

steps:
  - name: Run tests
    run: npx playwright test --shard=${{ matrix.shard }}
```

**What It Does:**
• Splits tests into 4 groups
• Runs each group in parallel
• 4x faster execution!

**Browser Matrix:**

```yaml
strategy:
  matrix:
    browser: [chromium, firefox, webkit]
```

---

## SLIDE 60: CI/CD Best Practices

**Title:** CI Best Practices

**Recommendations:**
✅ **Cache dependencies** - npm ci + cache
✅ **Run in parallel** - Use sharding
✅ **Save artifacts** - Reports, videos, traces
✅ **Set timeouts** - Prevent hanging builds
✅ **Retry on failure** - Handle flakiness (2-3 retries)
✅ **Run on multiple OS** - If cross-platform app
✅ **Use Docker** - Consistent environment

**Performance:**

```yaml
- name: Cache node modules
  uses: actions/cache@v3
  with:
    path: node_modules
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

---

## SLIDE 61: Test Organization Principles

**Title:** Organizing Your Tests

**Best Practices:**
✅ **One feature per file** - `login.spec.ts`, `checkout.spec.ts`
✅ **Group related tests** - Use describe blocks
✅ **Descriptive names** - "user can login with valid credentials"
✅ **Keep independent** - No shared state between tests
✅ **Folder structure** - Group by feature/page/framework

**Example Structure:**

```
tests/
├── auth/
│   ├── login.spec.ts
│   └── signup.spec.ts
├── products/
│   ├── list.spec.ts
│   └── details.spec.ts
└── checkout/
    └── purchase.spec.ts
```

---

## SLIDE 62: Writing Maintainable Tests

**Title:** Maintainable Test Code

**❌ Bad:**

```typescript
test("test1", async ({ page }) => {
  await page.goto("http://localhost:3000/p1");
  await page.locator("div").nth(3).click();
  await page.locator("input").fill("test");
});
```

**✅ Good:**

```typescript
test("user can submit contact form", async ({ page }) => {
  await page.goto("/contact");

  await page.getByLabel("Full Name").fill("John Doe");
  await page.getByLabel("Email").fill("john@example.com");
  await page.getByLabel("Message").fill("Hello!");

  await page.getByRole("button", { name: "Send Message" }).click();

  await expect(page.getByText("Thank you for your message")).toBeVisible();
});
```

**Why Better?**
• Clear intent
• Stable selectors
• Easy to understand

---

## SLIDE 63: Test Data Management

**Title:** Managing Test Data

**Constants:**

```typescript
const TEST_USERS = {
  valid: { email: "test@example.com", password: "Test123!" },
  admin: { email: "admin@example.com", password: "Admin123!" },
};
```

**Fixtures:**

```typescript
test.use({ testUser: TEST_USERS.valid });
```

**API Setup:**

```typescript
test.beforeEach(async ({ request }) => {
  // Create fresh test data before each test
  await request.post("/api/users", {
    data: { name: "Test User", email: "test@example.com" },
  });
});
```

**Environment Variables:**

```typescript
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
```

---

## SLIDE 64: Selector Strategy

**Title:** Choosing the Right Selector

**Priority (Best → Worst):**

1. 🥇 **User-facing attributes**
   • Role, label, text, placeholder
   • Matches how users see the page

2. 🥈 **Test IDs**
   • `data-testid` attributes
   • Stable, won't change with UI updates

3. 🥉 **CSS/XPath**
   • Last resort
   • Brittle, breaks easily

**Why?**
• More resilient to changes
• Better accessibility
• Matches user behavior
• Easier maintenance

---

## SLIDE 65: Performance Tips

**Title:** Faster Test Execution

**Optimization Strategies:**

✅ **Use API for setup** - Don't use UI to create test data

```typescript
// ❌ Slow
await page.goto('/users/new');
await page.fill('...');

// ✅ Fast
await request.post('/api/users', { data: {...} });
```

✅ **Reuse authentication**

```typescript
use: {
  storageState: "auth.json";
}
```

✅ **Run in parallel** - Configure workers

✅ **Wait smart** - Use `waitForLoadState('networkidle')`

✅ **Screenshot only on failure**

---

## SLIDE 66: Common Anti-Patterns ⚠️

**Title:** What NOT to Do

**Avoid These:**

❌ **Hard-coded waits**

```typescript
await page.waitForTimeout(3000); // BAD!
```

❌ **Testing implementation details**

```typescript
// Testing CSS classes instead of behavior
expect(element).toHaveClass("btn-primary");
```

❌ **Brittle selectors**

```typescript
page.locator("div > div > button:nth-child(3)"); // BAD!
```

❌ **Dependent tests**

```typescript
// Test 2 depends on Test 1 running first - BAD!
```

❌ **Multiple things in one test**

```typescript
// Test login AND profile AND settings - BAD! Split them.
```

---

## SLIDE 67: Exercise 1 - Basic Test

**Title:** Hands-On Exercise 1

**Task:** Write a test that:

1. Navigates to a homepage
2. Clicks on a navigation link
3. Verifies the new page loads
4. Checks for expected content

**Time:** 10 minutes

**Starter Code:**

```typescript
import { test, expect } from "@playwright/test";

test("navigate to products page", async ({ page }) => {
  // Your code here
});
```

**Bonus:** Add an assertion for the page title

---

## SLIDE 68: Exercise 2 - Form Testing

**Title:** Hands-On Exercise 2

**Task:** Write a test that:

1. Fills out a registration/contact form
2. Submits the form
3. Verifies success message appears
4. (Bonus) Verify form clears after submission

**Time:** 15 minutes

**Fields to test:**
• Name (text input)
• Email (email input)
• Message (textarea)
• Subscribe checkbox
• Submit button

---

## SLIDE 69: Exercise 3 - CRUD Operations

**Title:** Hands-On Exercise 3

**Task:** Write 4 tests for CRUD:

1. **CREATE** - Add a new item via form
2. **READ** - Verify items display correctly
3. **UPDATE** - Edit an existing item
4. **DELETE** - Remove an item with confirmation

**Time:** 20 minutes

**Tips:**
• Use data-testid attributes
• Handle confirmation dialogs
• Verify counts change appropriately

---

## SLIDE 70: Exercise 4 - API + UI

**Title:** Hands-On Exercise 4

**Task:** Combine API and UI testing:

1. Create test data via API (POST)
2. Navigate to UI and verify data appears
3. Modify the data via UI
4. Verify the change via API (GET)

**Time:** 20 minutes

**Example Flow:**

```typescript
test('api + ui workflow', async ({ request, page }) => {
  // 1. Create via API
  const response = await request.post('/api/items', {...});
  const item = await response.json();

  // 2. Verify in UI
  await page.goto('/items');
  await expect(page.getByText(item.name)).toBeVisible();

  // 3. Edit in UI
  // ...

  // 4. Verify via API
  // ...
});
```

---

## SLIDE 71: Key Takeaways

**Title:** What We Learned Today

**Main Points:**
✅ Playwright is **fast, reliable, and modern**
✅ Use **proper selectors** (role, label, testid)
✅ **Auto-waiting** eliminates flaky tests
✅ **API testing** complements UI testing perfectly
✅ Organize tests by **feature/framework**
✅ **CI/CD integration** is straightforward
✅ **Debugging tools** make troubleshooting easy
✅ Follow **best practices** for maintainable tests

**Remember:** Write tests that match user behavior!

---

## SLIDE 72: Learning Resources

**Title:** Continue Learning

**Official Resources:**
📚 [playwright.dev](https://playwright.dev) - Documentation
🎓 [playwright.dev/docs/intro](https://playwright.dev/docs/intro) - Getting Started Guide
📺 [YouTube @Playwrightdev](https://youtube.com/@Playwrightdev) - Video Tutorials
💬 [Discord](https://discord.gg/playwright) - Community Chat

**Additional Resources:**
🐙 [GitHub Repo](https://github.com/microsoft/playwright) - Source Code & Issues
📝 [Blog](https://playwright.dev/community/blog) - Articles & Updates
🎯 [Examples](https://github.com/microsoft/playwright/tree/main/examples) - Code Samples

---

## SLIDE 73: Demo Project

**Title:** Our Demo Project

**Repository Features:**
✅ Three frameworks: **React, Angular, Vue**
✅ **Complete CRUD** operations
✅ **REST API** with JSON Server
✅ **Organized test suites** by framework
✅ **Comprehensive documentation**
✅ **Best practices** demonstrated

**What's Included:**
• Working applications on all 3 frameworks
• API server with mock data
• Full test coverage (basic + CRUD)
• Setup scripts and documentation
• Real-world patterns you can copy

🔗 **[Repository Link Here]**

---

## SLIDE 74: Next Steps

**Title:** Your Journey Continues

**Action Items:**

1. ✅ **Practice** with the demo project
2. 📝 **Write tests** for your own applications
3. 🔍 **Explore** advanced features (traces, videos, visual testing)
4. 👥 **Join** the Playwright community (Discord)
5. 🤝 **Share** your learnings with your team
6. 🌟 **Contribute** to open source Playwright projects

**30-Day Challenge:**
• Week 1: Set up Playwright in your project
• Week 2: Write 10 tests
• Week 3: Add API tests
• Week 4: Integrate with CI/CD

---

## SLIDE 75: Thank You!

**Title:** Thank You for Attending!

**Contact:**
📧 Email: [your-email]
💼 LinkedIn: [your-profile]
🐦 Twitter: [your-handle]
🔗 Demo Project: [repo-link]

**Questions?**
Let's discuss during Q&A!

**Office Hours:**
[Schedule time for follow-up questions]

**Feedback:**
[Survey link or feedback form]

---

**Remember:** The best way to learn is by doing. Start testing today! 🚀
