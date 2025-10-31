---
marp: true
theme: default
paginate: true
backgroundColor: #fff
backgroundImage: url('https://marp.app/assets/hero-background.svg')
style: |
  section {
    font-size: 28px;
  }
  code {
    font-size: 20px;
  }
  pre {
    font-size: 18px;
  }
  h1 {
    color: #2563eb;
  }
  h2 {
    color: #3b82f6;
  }
---

<!-- _class: invert -->

# 🎭 Playwright

## Modern End-to-End Testing

**Building Reliable Web Application Tests**

_Your Name | Your Organization | October 2025_

---

## What is Playwright?

Playwright is a modern end-to-end testing framework developed by **Microsoft**

**Key Features:**

- ✅ Cross-browser testing (Chromium, Firefox, WebKit)
- ✅ Auto-wait capabilities eliminate flaky tests
- ✅ Built specifically for modern web applications
- ✅ First-class TypeScript and JavaScript support
- ✅ Fast, reliable, and developer-friendly

> "Reliable and fast testing across all modern browsers"

---

## Why Choose Playwright?

| Feature         | Playwright   | Selenium     | Cypress       |
| --------------- | ------------ | ------------ | ------------- |
| **Speed**       | ⚡ Fast      | 🐌 Slower    | ⚡ Fast       |
| **Auto-wait**   | ✅ Yes       | ❌ No        | ✅ Yes        |
| **Browsers**    | All 3 major  | All browsers | Chrome only\* |
| **API Testing** | ✅ Built-in  | ❌ No        | ⚠️ Limited    |
| **Debugging**   | 🎯 Excellent | ⚠️ Basic     | 🎯 Good       |

---

## Who Uses Playwright?

**Companies:**

- Microsoft (creator and heavy user)
- VS Code team
- GitHub
- Bing
- Many Fortune 500 companies

**Common Use Cases:**

- End-to-end testing
- Visual regression testing
- API testing
- Web scraping and automation
- CI/CD integration

---

## Course Objectives

### What You'll Learn Today

✅ Setting up Playwright projects from scratch
✅ Writing effective and maintainable test cases
✅ Using proper selectors and locators
✅ Testing API calls and CRUD operations
✅ Testing across multiple frameworks (React, Angular, Vue)
✅ Debugging techniques and best practices
✅ CI/CD integration strategies

---

## Installation & Setup

### Getting Started

```bash
npm init playwright@latest
```

**What Gets Installed:**

- Playwright Test runner
- Browser binaries (Chromium, Firefox, WebKit)
- Example test files
- Configuration file (playwright.config.ts)
- GitHub Actions workflow (optional)

**Quick Start:** Interactive setup wizard, installs in under 2 minutes

---

## Project Structure

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

- `playwright.config.ts` - Configure browsers, timeouts, baseURL
- `tests/*.spec.ts` - Your test files
- Test results automatically generated

---

## Configuration Overview

### playwright.config.ts

```typescript
export default {
  testDir: "./tests",
  timeout: 30000,
  retries: 2,
  use: {
    baseURL: "http://localhost:3000",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [{ name: "chromium" }, { name: "firefox" }, { name: "webkit" }],
};
```

---

## Your First Test

### Writing Your First Test

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

## Running Tests

### Basic Commands

```bash
# Run all tests
npx playwright test

# See browser
npx playwright test --headed

# Interactive UI mode
npx playwright test --ui

# Debug mode
npx playwright test --debug

# Specific file
npx playwright test example.spec.ts
```

---

## Test Anatomy

```typescript
import { test, expect } from "@playwright/test";

test.describe("User Login Feature", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("should login with valid credentials", async ({ page }) => {
    await page.getByLabel("Email").fill("user@example.com");
    await page.getByLabel("Password").fill("password");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL("/dashboard");
  });
});
```

---

## Key Concepts

### Page Object & Fixtures

**Page Object:**

- Main interface to interact with the browser
- Every test receives a `page` object
- Provides methods like `goto()`, `click()`, `fill()`

**Context:**

- Isolated browser context (like incognito)
- Each test gets fresh context

**Fixtures:**

- Reusable test setup
- Built-in: `page`, `context`, `browser`, `request`

---

## Understanding Locators

### What are Locators?

**Definition:** Locators are ways to find elements on a web page

**Why They Matter:**

- Core of interacting with web elements
- Proper locators = stable tests
- Bad locators = flaky tests

**Playwright's Approach:**

- Auto-waiting (waits for element to be ready)
- Strict mode (ensures single element match)
- Resilient to page changes

---

## Types of Selectors

| Selector           | Code Example                      | Use Case       |
| ------------------ | --------------------------------- | -------------- |
| **By Role**        | `page.getByRole('button')`        | Buttons, links |
| **By Label**       | `page.getByLabel('Email')`        | Form inputs    |
| **By Text**        | `page.getByText('Login')`         | Visible text   |
| **By Placeholder** | `page.getByPlaceholder('Search')` | Input hints    |
| **By Test ID**     | `page.getByTestId('submit-btn')`  | Stable IDs     |
| **By CSS**         | `page.locator('.btn-primary')`    | CSS classes    |

---

## Recommended Selectors ⭐

### Priority Order (Best to Worst)

**1. 🥇 getByRole** - Most accessible and stable

```typescript
page.getByRole("button", { name: "Submit" });
```

**2. 🥈 getByLabel** - Perfect for form elements

```typescript
page.getByLabel("Email address");
```

**3. 🥉 getByTestId** - Stable IDs for testing

```typescript
page.getByTestId("submit-button");
```

---

## Chaining & Filtering

### Advanced Locator Techniques

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
await page.locator(".item").nth(2).click();
```

---

## Auto-Waiting Magic

### Playwright's Built-in Waits

**Automatic checks:**
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

---

## Codegen - Test Generator

### Record Your Tests

```bash
npx playwright codegen https://example.com
```

**What It Does:**

- Opens browser and inspector
- Records your actions
- Generates test code automatically
- Shows you best selector practices

**Use Cases:** Learning, prototyping, exploring apps

---

## Common Actions

### Interacting with Elements

```typescript
// Click
await page.getByRole("button", { name: "Submit" }).click();

// Fill input
await page.getByLabel("Email").fill("test@example.com");

// Select dropdown
await page.getByLabel("Country").selectOption("USA");

// Check/Uncheck
await page.getByLabel("Accept terms").check();

// Upload file
await page.getByLabel("Upload").setInputFiles("file.pdf");
```

---

## Keyboard & Mouse

### Advanced Interactions

**Keyboard:**

```typescript
await page.keyboard.press("Enter");
await page.keyboard.type("Hello World");
await page.keyboard.press("Control+A");
```

**Mouse:**

```typescript
await page.mouse.click(100, 200);
await page.mouse.dblclick(100, 200);
```

**Hover & Drag:**

```typescript
await page.getByRole("button").hover();
await page.locator("#source").dragTo(page.locator("#target"));
```

---

## Navigation

### Page Navigation

```typescript
// Go to URL
await page.goto("https://example.com");

// Go back/forward
await page.goBack();
await page.goForward();

// Reload page
await page.reload();
```

---

## Multiple Elements

### Working with Lists

```typescript
// Count elements
const count = await page.locator(".item").count();

// Iterate over elements
const items = page.locator(".item");
for (let i = 0; i < (await items.count()); i++) {
  const text = await items.nth(i).textContent();
  console.log(text);
}

// Get all text
const allTexts = await page.locator(".item").allTextContents();
```

---

## Frames & IFrames

### Working with Frames

```typescript
// By name
const frame = page.frame("frame-name");
await frame.locator(".button").click();

// By selector
const frameLocator = page.frameLocator("#my-iframe");
await frameLocator.locator(".button").click();
```

**Why Frames Are Special:** Separate DOM context

---

## Dialogs & Pop-ups

### Handling Dialogs

```typescript
// Handle alert/confirm/prompt
page.on("dialog", async (dialog) => {
  console.log(dialog.message());
  await dialog.accept();
});

// New windows/tabs
const [newPage] = await Promise.all([
  context.waitForEvent("page"),
  page.getByRole("link").click(),
]);
```

---

## Assertion Types

### Making Assertions

**Three Categories:**

1. **Page Assertions** - URL, title, screenshot
2. **Locator Assertions** - Visibility, content, attributes, state
3. **Generic Assertions** - Values, arrays, objects

**All assertions auto-wait!**

---

## Page Assertions

```typescript
// URL
await expect(page).toHaveURL("https://example.com/dashboard");
await expect(page).toHaveURL(/dashboard/);

// Title
await expect(page).toHaveTitle("Dashboard | MyApp");

// Screenshot comparison
await expect(page).toHaveScreenshot("homepage.png");
```

---

## Locator Assertions

### Element Assertions

```typescript
// Visibility
await expect(page.locator(".success")).toBeVisible();

// Content
await expect(page.locator("h1")).toHaveText("Welcome");

// Attributes
await expect(page.locator("a")).toHaveAttribute("href", "/home");

// State
await expect(page.locator("button")).toBeEnabled();
await expect(page.locator("input")).toBeChecked();
```

---

## More Assertions

```typescript
// Count
await expect(page.locator(".item")).toHaveCount(5);

// Value
await expect(page.getByLabel("Email")).toHaveValue("test@example.com");

// CSS
await expect(element).toHaveCSS("color", "rgb(255, 0, 0)");

// Negation
await expect(element).not.toBeVisible();
```

---

## Soft Assertions

### Continue on Failure

```typescript
// Normal assertion - test stops on failure
await expect(page.locator(".title")).toHaveText("Title");

// Soft assertion - test continues
await expect.soft(page.locator(".title")).toHaveText("Title");
await expect.soft(page.locator(".subtitle")).toBeVisible();
await expect.soft(page.locator(".footer")).toContainText("2024");

// All assertions checked, then marked failed if any failed
```

**Use Case:** Checking multiple page elements

---

## Why API Testing?

### API Testing in Playwright

**Why Test APIs?**
✅ **Faster** - No browser rendering
✅ **More Reliable** - No UI flakiness
✅ **Test Backend** - Independently from UI
✅ **Setup Data** - Prepare test scenarios
✅ **Verify Backend** - Check data after UI actions

---

## Making API Requests

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
});
```

---

## CRUD Operations

### POST - Create

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

### PUT - Update & DELETE - Remove

```typescript
await request.put("/api/users/1", { data: { name: "Updated" } });
await request.delete("/api/users/1");
```

---

## Authentication & Headers

```typescript
const context = await request.newContext({
  extraHTTPHeaders: {
    Authorization: "Bearer token123",
    "Content-Type": "application/json",
  },
});

const response = await context.get("/api/protected");
```

---

## Combining API + UI

### Best Practice

```typescript
test("verify user after API creation", async ({ request, page }) => {
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
  expect(response.ok()).toBeTruthy();
});
```

---

## Network Mocking

### Mocking API Responses

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

**Use Cases:** Error states, offline mode, slow connections

---

## Demo Project Overview

### Real-World Demo Project

```
playwright-demo/
├── api-server/          # JSON Server REST API
├── react-app/           # React + Vite
├── angular-app/         # Angular 20
├── vue-app/             # Vue 3 + Vite
└── playwright-tests/    # Organized test suites
```

**Demonstrates:** Full CRUD across all frameworks, API integration, organized tests

---

## Testing React App

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

**Tests:** useState hooks, useEffect, form handling

---

## Testing Angular App

```typescript
test("update user in Angular app", async ({ page }) => {
  await page.goto("http://localhost:4200");

  // Click edit
  await page.getByTestId("edit-user-1").click();

  // Verify form populated
  await expect(page.getByTestId("input-name")).toHaveValue("John Doe");

  // Update
  await page.getByTestId("input-name").fill("John Updated");
  await page.getByTestId("submit-button").click();

  // Verify
  await expect(page.getByText("John Updated")).toBeVisible();
});
```

**Tests:** HttpClient, RxJS, FormsModule, @if/@for

---

## Testing Vue App

```typescript
test("delete user in Vue app", async ({ page }) => {
  await page.goto("http://localhost:5174");

  // Count initial users
  const initialCount = await page.locator(".user-card").count();

  // Handle confirmation
  page.on("dialog", (dialog) => dialog.accept());

  // Delete
  await page.getByTestId("delete-user-1").click();

  // Verify
  const finalCount = await page.locator(".user-card").count();
  expect(finalCount).toBe(initialCount - 1);
});
```

**Tests:** Composition API, reactive refs, v-model, v-for

---

## CRUD Testing Pattern

```typescript
test.describe("CRUD Operations", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("CREATE - POST new user", async ({ page }) => {
    // Fill form and submit
  });

  test("READ - GET and display users", async ({ page }) => {
    // Verify users load
  });

  test("UPDATE - PUT existing user", async ({ page }) => {
    // Edit and save
  });

  test("DELETE - Remove user", async ({ page }) => {
    // Delete and confirm
  });
});
```

---

## Multi-Browser Configuration

```typescript
// playwright.config.ts
projects: [
  // React tests
  {
    name: "react-chromium",
    use: { baseURL: "http://localhost:5173" },
  },
  {
    name: "react-firefox",
    use: { baseURL: "http://localhost:5173" },
  },

  // Angular & Vue...
];
```

**Run specific:**

```bash
npx playwright test --project=react-firefox
```

---

## Organized Test Structure

```
tests/
├── react/
│   ├── README.md
│   ├── react-app.spec.ts
│   └── react-crud.spec.ts
├── angular/
│   ├── angular-app.spec.ts
│   └── angular-crud.spec.ts
└── vue/
    ├── vue-app.spec.ts
    └── vue-crud.spec.ts
```

**Benefits:** Easy to find, run by framework, scales well

---

## Debugging Tools

### Playwright Debugging Arsenal

🔍 **Playwright Inspector** - Step through tests
🎯 **UI Mode** - Interactive test runner
📊 **Trace Viewer** - Time-travel debugging
📸 **Screenshots & Videos** - Visual debugging
📝 **Console Logs** - See page console
🔧 **VS Code Extension** - IDE integration

---

## Debug Mode

```bash
npx playwright test --debug
```

**Features:**

- Opens Playwright Inspector
- Pause before each action
- Step through test line by line
- Inspect page state
- Try selectors in real-time

**When to Use:** Test failing, exploring apps, verifying selectors

---

## UI Mode ⭐

```bash
npx playwright test --ui
```

**Features:**
✨ **Watch Mode** - Auto-rerun on changes
⏱️ **Time Travel** - Step backward through test
🎬 **Action Log** - See each step
🔍 **Locator Picker** - Find elements visually
📸 **Screenshots** - Every step captured

**Best for:** Development & debugging

---

## Trace Viewer

### Enable Traces

```typescript
use: {
  trace: 'on-first-retry',
  screenshot: 'only-on-failure',
  video: 'retain-on-failure'
}
```

**View trace:**

```bash
npx playwright show-trace trace.zip
```

**Shows:** Timeline, screenshots, network, console, DOM snapshots

---

## Common Issues & Solutions

| Issue                 | Cause           | Solution            |
| --------------------- | --------------- | ------------------- |
| **Flaky tests**       | Race conditions | Use auto-waits      |
| **Element not found** | Wrong selector  | Use getByRole/Label |
| **Timeout**           | Slow loading    | Increase timeout    |
| **CI failures**       | Environment     | Consistent baseURL  |

---

## Writing Stable Tests

### Best Practices

**Do's:**
✅ Use data-testid for stable selectors
✅ Leverage auto-waiting
✅ Keep tests independent
✅ Clean up test data
✅ Use meaningful test names

**Don'ts:**
❌ Don't use brittle selectors
❌ Don't hardcode waits
❌ Don't create dependent tests

---

## Page Object Model

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
}
```

**Usage:**

```typescript
const loginPage = new LoginPage(page);
await loginPage.login("user@example.com", "password");
```

---

## Custom Fixtures

```typescript
import { test as base } from "@playwright/test";

export const test = base.extend<{ authenticatedPage: Page }>({
  authenticatedPage: async ({ page }, use) => {
    // Setup: Login
    await page.goto("/login");
    await page.getByLabel("Email").fill("user@example.com");
    await page.getByLabel("Password").fill("password");
    await page.getByRole("button", { name: "Login" }).click();

    await use(page);

    // Teardown: Logout
    await page.getByRole("button", { name: "Logout" }).click();
  },
});
```

---

## Visual Regression Testing

```typescript
// Take screenshot
await expect(page).toHaveScreenshot("homepage.png");
```

**What Happens:**

1. First run: Creates baseline
2. Next runs: Compares with baseline
3. If different: Test fails, shows diff

**Update Baselines:**

```bash
npx playwright test --update-snapshots
```

---

## Parallel Execution

```typescript
// playwright.config.ts
export default {
  workers: process.env.CI ? 1 : 4,
  fullyParallel: true,
};
```

**Benefits:**

- Faster test execution
- Better resource utilization
- Scales with CI

---

## Test Annotations

```typescript
// Skip tests
test.skip("not ready yet", async ({ page }) => {});

// Conditional skip
test.skip(({ browserName }) => browserName === "webkit");

// Mark slow (triples timeout)
test.slow();

// Tags
test("login @smoke @auth", async ({ page }) => {});
```

**Run tagged:**

```bash
npx playwright test --grep @smoke
```

---

## Test Reporting

```typescript
reporter: [
  ["html"],
  ["list"],
  ["json", { outputFile: "results.json" }],
  ["junit", { outputFile: "results.xml" }],
];
```

**Third-party:** Allure, Monocart, Tesults

---

## Global Setup & Teardown

```typescript
// global-setup.ts
async function globalSetup() {
  // Start API server
  console.log("Starting API server...");

  // Seed database
  await seedDatabase();

  // Global authentication
  // ...
}

export default globalSetup;
```

**Config:**

```typescript
globalSetup: './global-setup',
globalTeardown: './global-teardown'
```

---

## Why CI/CD Testing?

### Continuous Integration Benefits

✅ **Catch bugs early** - Before production
✅ **Automated** - Run on every commit/PR
✅ **Consistent** - Same environment every time
✅ **Fast feedback** - Know if changes break tests
✅ **Prevent regressions** - Guard against breaking changes

---

## GitHub Actions Example

```yaml
name: Playwright Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## Docker Integration

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

---

## Parallel CI Execution

### Sharding Tests

```yaml
strategy:
  matrix:
    shard: [1/4, 2/4, 3/4, 4/4]

steps:
  - run: npx playwright test --shard=${{ matrix.shard }}
```

**Result:** 4x faster execution!

---

## CI/CD Best Practices

**Recommendations:**
✅ **Cache dependencies** - npm ci + cache
✅ **Run in parallel** - Use sharding
✅ **Save artifacts** - Reports, videos, traces
✅ **Set timeouts** - Prevent hanging builds
✅ **Retry on failure** - Handle flakiness (2-3 retries)
✅ **Use Docker** - Consistent environment

---

## Test Organization Principles

**Best Practices:**
✅ **One feature per file** - `login.spec.ts`, `checkout.spec.ts`
✅ **Group related tests** - Use describe blocks
✅ **Descriptive names** - "user can login with valid credentials"
✅ **Keep independent** - No shared state
✅ **Folder structure** - Group by feature/page/framework

---

## Maintainable Test Code

### ❌ Bad

```typescript
test("test1", async ({ page }) => {
  await page.goto("http://localhost:3000/p1");
  await page.locator("div").nth(3).click();
});
```

### ✅ Good

```typescript
test("user can submit contact form", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Full Name").fill("John Doe");
  await page.getByRole("button", { name: "Send" }).click();
  await expect(page.getByText("Thank you")).toBeVisible();
});
```

---

## Test Data Management

```typescript
// Constants
const TEST_USERS = {
  valid: { email: "test@example.com", password: "Test123!" },
  admin: { email: "admin@example.com", password: "Admin123!" },
};

// API Setup
test.beforeEach(async ({ request }) => {
  await request.post("/api/users", {
    data: { name: "Test User" },
  });
});

// Environment Variables
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
```

---

## Selector Strategy

### Priority (Best → Worst)

1. 🥇 **User-facing attributes** (Role, label, text)
2. 🥈 **Test IDs** (data-testid)
3. 🥉 **CSS/XPath** (Last resort)

**Why?**

- More resilient to changes
- Better accessibility
- Matches user behavior

---

## Performance Tips

### Optimization Strategies

✅ **Use API for setup**

```typescript
// ✅ Fast
await request.post('/api/users', { data: {...} });

// ❌ Slow
await page.goto('/users/new');
await page.fill('...');
```

✅ **Reuse authentication** - `storageState: 'auth.json'`
✅ **Run in parallel** - Configure workers
✅ **Screenshot only on failure**

---

## Common Anti-Patterns ⚠️

### What NOT to Do

❌ **Hard-coded waits**

```typescript
await page.waitForTimeout(3000); // BAD!
```

❌ **Testing implementation details**
❌ **Brittle selectors** (`nth-child`)
❌ **Dependent tests**
❌ **Multiple things in one test**

---

## Exercise 1: Basic Test

### Task (10 minutes)

Write a test that:

1. Navigates to a homepage
2. Clicks on a navigation link
3. Verifies the new page loads
4. Checks for expected content

**Starter:**

```typescript
test("navigate to products page", async ({ page }) => {
  // Your code here
});
```

---

## Exercise 2: Form Testing

### Task (15 minutes)

Write a test that:

1. Fills out a registration/contact form
2. Submits the form
3. Verifies success message appears

**Fields:**

- Name, Email, Message
- Subscribe checkbox
- Submit button

---

## Exercise 3: CRUD Operations

### Task (20 minutes)

Write 4 tests:

1. **CREATE** - Add new item via form
2. **READ** - Verify items display
3. **UPDATE** - Edit existing item
4. **DELETE** - Remove item with confirmation

**Tips:** Use data-testid, handle dialogs, verify counts

---

## Exercise 4: API + UI

### Task (20 minutes)

Combine API and UI:

1. Create test data via API (POST)
2. Navigate to UI and verify data appears
3. Modify via UI
4. Verify change via API (GET)

---

## Key Takeaways

### What We Learned

✅ Playwright is **fast, reliable, and modern**
✅ Use **proper selectors** (role, label, testid)
✅ **Auto-waiting** eliminates flaky tests
✅ **API testing** complements UI testing
✅ Organize tests by **feature/framework**
✅ **CI/CD integration** is straightforward
✅ **Debugging tools** make troubleshooting easy

**Remember:** Write tests that match user behavior!

---

## Learning Resources

### Continue Learning

📚 [playwright.dev](https://playwright.dev) - Documentation
🎓 [Getting Started Guide](https://playwright.dev/docs/intro)
📺 [YouTube @Playwrightdev](https://youtube.com/@Playwrightdev)
💬 [Discord](https://discord.gg/playwright) - Community
🐙 [GitHub](https://github.com/microsoft/playwright)

---

## Our Demo Project

### Repository Features

✅ Three frameworks: **React, Angular, Vue**
✅ **Complete CRUD** operations
✅ **REST API** with JSON Server
✅ **Organized test suites** by framework
✅ **Comprehensive documentation**
✅ **Best practices** demonstrated

🔗 **github.com/ebrahimsalehi1/playwright-demo**

---

## Next Steps

### Your Journey Continues

**Action Items:**

1. ✅ **Practice** with the demo project
2. 📝 **Write tests** for your applications
3. 🔍 **Explore** advanced features
4. 👥 **Join** the Playwright community
5. 🤝 **Share** with your team

**30-Day Challenge:** Week 1: Setup, Week 2: Write 10 tests, Week 3: API tests, Week 4: CI/CD

---

<!-- _class: invert -->

# Thank You! 🚀

**Questions?**

**Contact:**
📧 Email: [your-email]
💼 LinkedIn: [your-profile]
🔗 Demo: github.com/ebrahimsalehi1/playwright-demo

**Remember:** The best way to learn is by doing!

**Start testing today!**
