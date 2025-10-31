# 🎭 Playwright Training PowerPoint - Slide Outline

## Complete Slide Deck Structure for Teaching Playwright

---

## **Section 1: Introduction (Slides 1-5)**

### Slide 1: Title Slide

- **Title:** "Playwright: Modern End-to-End Testing"
- **Subtitle:** "Building Reliable Web Application Tests"
- **Your Name/Organization**
- **Date**
- **Playwright Logo**

### Slide 2: What is Playwright?

- **Definition:** Modern end-to-end testing framework by Microsoft
- **Key Points:**
  - Cross-browser testing (Chromium, Firefox, WebKit)
  - Auto-wait capabilities
  - Built for modern web apps
  - First-class TypeScript support
- **Quote:** "Reliable and fast testing across all modern browsers"

### Slide 3: Why Playwright?

**Comparison with other tools:**

- ✅ **Speed:** Faster than Selenium
- ✅ **Reliability:** Auto-waits eliminate flaky tests
- ✅ **Browser Coverage:** All major browsers
- ✅ **Developer Experience:** Excellent debugging tools
- ✅ **Modern Features:** Network interception, screenshots, videos
- **Chart:** Playwright vs Selenium vs Cypress (features comparison)

### Slide 4: Who Uses Playwright?

- **Companies:** Microsoft, VS Code, GitHub, Bing, etc.
- **Use Cases:**
  - E2E testing
  - Visual regression testing
  - API testing
  - Web scraping
  - Test automation in CI/CD

### Slide 5: Course Objectives

**What You'll Learn:**

- ✅ Setting up Playwright projects
- ✅ Writing effective test cases
- ✅ Working with different selectors
- ✅ Handling API calls and testing CRUD operations
- ✅ Testing across multiple frameworks (React, Angular, Vue)
- ✅ Best practices and debugging techniques
- ✅ CI/CD integration

---

## **Section 2: Getting Started (Slides 6-12)**

### Slide 6: Installation & Setup

**Code Example:**

```bash
npm init playwright@latest
```

- **What it installs:**
  - Playwright Test runner
  - Browser binaries
  - Example tests
  - Configuration file

### Slide 7: Project Structure

**File tree diagram:**

```
my-project/
├── playwright.config.ts    # Configuration
├── tests/                  # Test files
│   └── example.spec.ts
├── playwright-report/      # Test reports
└── test-results/          # Screenshots, videos
```

### Slide 8: Configuration Overview

**Key configuration options:**

- `testDir`: Where tests are located
- `timeout`: Test timeout
- `retries`: Number of retries on failure
- `use.baseURL`: Base URL for tests
- `projects`: Browser configurations
- `webServer`: Dev server setup

### Slide 9: Your First Test

**Simple example:**

```typescript
import { test, expect } from "@playwright/test";

test("homepage has title", async ({ page }) => {
  await page.goto("https://example.com");
  await expect(page).toHaveTitle(/Example/);
});
```

### Slide 10: Running Tests

**Commands:**

```bash
npx playwright test              # Run all tests
npx playwright test --headed     # With browser visible
npx playwright test --debug      # Debug mode
npx playwright test --ui         # Interactive UI mode
```

### Slide 11: Test Anatomy

**Parts of a Playwright test:**

```typescript
test.describe("Feature Name", () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
  });

  test("should do something", async ({ page }) => {
    // Test implementation
  });
});
```

### Slide 12: Page Object & Fixtures

- **Page Object:** Main interface to interact with browser
- **Context:** Isolated browser context
- **Browser:** Browser instance
- **Fixtures:** Reusable test setup

---

## **Section 3: Locators & Selectors (Slides 13-18)**

### Slide 13: What are Locators?

- **Definition:** Ways to find elements on a page
- **Why important:** Core of interaction with web elements
- **Playwright's approach:** Auto-waiting, strict mode

### Slide 14: Selector Types

**Table with examples:**
| Selector Type | Example | Use Case |
|--------------|---------|----------|
| Text | `page.getByText('Login')` | Visible text |
| Role | `page.getByRole('button')` | Accessibility |
| Label | `page.getByLabel('Email')` | Form inputs |
| Placeholder | `page.getByPlaceholder('Search')` | Input hints |
| Test ID | `page.getByTestId('submit-btn')` | Stable IDs |
| CSS | `page.locator('.class')` | CSS selectors |

### Slide 15: Recommended Selectors (Best Practices)

**Priority order:**

1. ⭐ **getByRole** - Most accessible
2. ⭐ **getByLabel** - For form elements
3. ⭐ **getByTestId** - For stable identification
4. ⚠️ **CSS/XPath** - Last resort (brittle)

**Code Examples:**

```typescript
// ✅ Good
await page.getByRole("button", { name: "Submit" }).click();
await page.getByLabel("Email").fill("test@example.com");

// ❌ Avoid
await page.locator("div > button:nth-child(3)").click();
```

### Slide 16: Chaining & Filtering

```typescript
// Chaining
await page
  .locator(".user-card")
  .filter({ hasText: "John" })
  .getByRole("button", { name: "Edit" })
  .click();

// First/Last/Nth
await page.locator(".item").first().click();
await page.locator(".item").nth(2).click();
```

### Slide 17: Waiting Strategies

**Auto-waiting (built-in):**

- ✅ Element is visible
- ✅ Element is attached to DOM
- ✅ Element is stable (not animating)
- ✅ Element receives events

**Manual waits:**

```typescript
await page.waitForSelector(".loaded");
await page.waitForLoadState("networkidle");
await page.waitForTimeout(1000); // Avoid!
```

### Slide 18: Codegen Demo

**Screenshot showing:**

- Running codegen command
- Browser window with recording
- Generated code output

```bash
npx playwright codegen https://example.com
```

---

## **Section 4: Actions & Interactions (Slides 19-24)**

### Slide 19: Common Actions

**Code examples:**

```typescript
// Click
await page.getByRole("button").click();

// Fill input
await page.getByLabel("Email").fill("test@example.com");

// Select dropdown
await page.getByLabel("Country").selectOption("USA");

// Check/Uncheck
await page.getByLabel("Accept").check();

// Upload file
await page.getByLabel("Upload").setInputFiles("file.pdf");
```

### Slide 20: Keyboard & Mouse

```typescript
// Keyboard
await page.keyboard.press("Enter");
await page.keyboard.type("Hello World");

// Mouse
await page.mouse.move(100, 200);
await page.mouse.click(100, 200);

// Hover
await page.getByRole("button").hover();
```

### Slide 21: Navigation

```typescript
// Go to URL
await page.goto("https://example.com");

// Go back/forward
await page.goBack();
await page.goForward();

// Reload
await page.reload();

// Wait for navigation
await Promise.all([page.waitForNavigation(), page.getByRole("link").click()]);
```

### Slide 22: Multiple Elements

```typescript
// Count elements
const count = await page.locator(".item").count();

// Iterate over elements
const items = page.locator(".item");
for (let i = 0; i < (await items.count()); i++) {
  await items.nth(i).click();
}

// Get all text content
const texts = await page.locator(".item").allTextContents();
```

### Slide 23: Frames & IFrames

```typescript
// Access frame
const frame = page.frame("frame-name");
await frame.locator(".element").click();

// Or by selector
const frameElement = page.frameLocator("#frame-id");
await frameElement.locator(".element").click();
```

### Slide 24: Dialogs & Pop-ups

```typescript
// Handle dialogs
page.on("dialog", (dialog) => {
  console.log(dialog.message());
  dialog.accept(); // or dialog.dismiss()
});

// New pages/tabs
const [newPage] = await Promise.all([
  context.waitForEvent("page"),
  page.getByRole("link").click(),
]);
```

---

## **Section 5: Assertions (Slides 25-29)**

### Slide 25: Assertion Types

**Categories:**

- Page assertions
- Locator assertions
- Generic assertions

### Slide 26: Page Assertions

```typescript
// URL
await expect(page).toHaveURL(/dashboard/);

// Title
await expect(page).toHaveTitle("Dashboard");

// Screenshot comparison
await expect(page).toHaveScreenshot();
```

### Slide 27: Locator Assertions

```typescript
// Visibility
await expect(locator).toBeVisible();
await expect(locator).toBeHidden();

// Content
await expect(locator).toHaveText("Hello");
await expect(locator).toContainText("Hello");

// Attributes
await expect(locator).toHaveAttribute("href", "/home");

// State
await expect(locator).toBeEnabled();
await expect(locator).toBeChecked();
```

### Slide 28: Custom Matchers

```typescript
// Count
await expect(page.locator(".item")).toHaveCount(5);

// Value
await expect(input).toHaveValue("test@example.com");

// CSS
await expect(element).toHaveCSS("color", "rgb(255, 0, 0)");

// Negation
await expect(element).not.toBeVisible();
```

### Slide 29: Soft Assertions

```typescript
// Continue test even if assertion fails
await expect.soft(page.locator(".title")).toHaveText("Title");
await expect.soft(page.locator(".subtitle")).toBeVisible();

// Test continues, but marked as failed at the end
```

---

## **Section 6: API Testing (Slides 30-35)**

### Slide 30: Why API Testing in Playwright?

- **Benefits:**
  - Faster than UI tests
  - More reliable
  - Test backend independently
  - Setup test data
  - Mock responses

### Slide 31: Making API Requests

```typescript
import { test, expect } from "@playwright/test";

test("GET users", async ({ request }) => {
  const response = await request.get("/api/users");
  expect(response.ok()).toBeTruthy();

  const users = await response.json();
  expect(users).toHaveLength(3);
});
```

### Slide 32: CRUD Operations Demo

**Using your project as example:**

```typescript
// POST - Create
const response = await request.post("/api/users", {
  data: { name: "John", email: "john@example.com" },
});

// PUT - Update
await request.put("/api/users/1", {
  data: { name: "John Updated" },
});

// DELETE
await request.delete("/api/users/1");
```

### Slide 33: API Context & Headers

```typescript
// Set headers
const context = await request.newContext({
  extraHTTPHeaders: {
    Authorization: "Bearer token123",
    "Content-Type": "application/json",
  },
});

// Use in test
const response = await context.get("/api/protected");
```

### Slide 34: Combining API + UI Tests

```typescript
test("create user via API, verify in UI", async ({ request, page }) => {
  // Setup via API (fast)
  await request.post("/api/users", {
    data: { name: "Test User", email: "test@example.com" },
  });

  // Verify in UI
  await page.goto("/users");
  await expect(page.getByText("Test User")).toBeVisible();
});
```

### Slide 35: Network Mocking

```typescript
// Mock API response
await page.route("/api/users", (route) => {
  route.fulfill({
    status: 200,
    body: JSON.stringify([{ id: 1, name: "Mocked User" }]),
  });
});

await page.goto("/users");
```

---

## **Section 7: Real-World Example (Slides 36-42)**

### Slide 36: Demo Project Overview

**Screenshot of your project structure:**

```
playwright-demo/
├── api-server/          # JSON Server API
├── react-app/           # React + Vite
├── angular-app/         # Angular 20
├── vue-app/             # Vue 3
└── playwright-tests/    # E2E Tests
```

### Slide 37: Testing React App

**Live demo or code walkthrough:**

- Component rendering
- State management testing
- User interactions
- API integration

### Slide 38: Testing Angular App

**Showcase Angular-specific features:**

- Service testing
- Observable testing
- Two-way binding verification
- Component lifecycle

### Slide 39: Testing Vue App

**Showcase Vue-specific features:**

- Composition API testing
- Reactive state testing
- v-model bindings
- Event handling

### Slide 40: CRUD Testing Patterns

**Common pattern across all frameworks:**

```typescript
test.describe("CRUD Operations", () => {
  test("CREATE - POST", async ({ page }) => {});
  test("READ - GET", async ({ page }) => {});
  test("UPDATE - PUT", async ({ page }) => {});
  test("DELETE", async ({ page }) => {});
});
```

### Slide 41: Multi-Browser Testing

**Configuration showcase:**

```typescript
projects: [
  { name: "react-chromium", use: { baseURL: "http://localhost:5173" } },
  { name: "angular-firefox", use: { baseURL: "http://localhost:4200" } },
  { name: "vue-webkit", use: { baseURL: "http://localhost:5174" } },
];
```

### Slide 42: Test Organization

**Folder structure best practice:**

```
tests/
├── react/
│   ├── basic.spec.ts
│   └── crud.spec.ts
├── angular/
│   ├── basic.spec.ts
│   └── crud.spec.ts
└── vue/
    ├── basic.spec.ts
    └── crud.spec.ts
```

---

## **Section 8: Debugging & Troubleshooting (Slides 43-48)**

### Slide 43: Debugging Tools

**List of tools:**

- ✅ Playwright Inspector
- ✅ UI Mode
- ✅ Trace Viewer
- ✅ Screenshots & Videos
- ✅ Console logs
- ✅ VS Code extension

### Slide 44: Debug Mode

```bash
# Run in debug mode
npx playwright test --debug

# Debug specific test
npx playwright test example.spec.ts --debug
```

**Screenshot:** Playwright Inspector window

### Slide 45: UI Mode

```bash
npx playwright test --ui
```

**Features:**

- Watch mode
- Time travel debugging
- Step through actions
- See locators
- View screenshots

### Slide 46: Trace Viewer

```typescript
// Enable tracing
use: {
  trace: 'on-first-retry',
  screenshot: 'only-on-failure',
  video: 'retain-on-failure'
}
```

```bash
# View trace
npx playwright show-trace trace.zip
```

### Slide 47: Common Issues & Solutions

**Table format:**
| Issue | Cause | Solution |
|-------|-------|----------|
| Flaky tests | Race conditions | Use proper auto-waits |
| Element not found | Wrong selector | Use getByRole/getByLabel |
| Timeout | Slow loading | Increase timeout or optimize |
| Test fails in CI | Different environment | Use consistent baseURL |

### Slide 48: Best Practices for Stable Tests

- ✅ Use data-testid for stable selectors
- ✅ Leverage auto-waiting
- ✅ Avoid hard-coded waits
- ✅ Use page.waitForLoadState() when needed
- ✅ Keep tests independent
- ✅ Clean up test data

---

## **Section 9: Advanced Topics (Slides 49-55)**

### Slide 49: Page Object Model (POM)

```typescript
// pages/loginPage.ts
export class LoginPage {
  constructor(private page: Page) {}

  async login(email: string, password: string) {
    await this.page.getByLabel("Email").fill(email);
    await this.page.getByLabel("Password").fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
  }
}

// In test
const loginPage = new LoginPage(page);
await loginPage.login("user@example.com", "password");
```

### Slide 50: Custom Fixtures

```typescript
// fixtures/auth.ts
export const test = base.extend<{ authenticatedPage: Page }>({
  authenticatedPage: async ({ page }, use) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill("user@example.com");
    await page.getByLabel("Password").fill("password");
    await page.getByRole("button", { name: "Login" }).click();
    await use(page);
  },
});

// In test
test("dashboard", async ({ authenticatedPage }) => {
  await authenticatedPage.goto("/dashboard");
});
```

### Slide 51: Visual Regression Testing

```typescript
// Take screenshot
await expect(page).toHaveScreenshot('homepage.png');

// Compare on next run
// If different, test fails and shows diff

// Update baseline
npx playwright test --update-snapshots
```

### Slide 52: Parallel Execution

```typescript
// playwright.config.ts
export default {
  workers: process.env.CI ? 1 : 4, // 4 parallel workers
  fullyParallel: true,
};

// Run tests in parallel
test.describe.configure({ mode: "parallel" });
```

### Slide 53: Test Annotations

```typescript
// Skip test
test.skip("not ready", async ({ page }) => {});

// Conditional skip
test.skip(
  ({ browserName }) => browserName === "webkit",
  "Feature not supported in WebKit"
);

// Mark as slow
test.slow();

// Add tags
test("login @smoke @auth", async ({ page }) => {});
```

### Slide 54: Reporter Options

```typescript
// playwright.config.ts
reporter: [
  ["html"], // HTML report
  ["json", { outputFile: "results.json" }],
  ["junit", { outputFile: "results.xml" }],
  ["list"], // Console output
  ["allure-playwright"], // Allure integration
];
```

### Slide 55: Global Setup & Teardown

```typescript
// global-setup.ts
async function globalSetup() {
  // Start API server
  // Seed database
  // Login and save state
}

// playwright.config.ts
export default {
  globalSetup: "./global-setup",
  globalTeardown: "./global-teardown",
};
```

---

## **Section 10: CI/CD Integration (Slides 56-60)**

### Slide 56: Why CI/CD Testing?

- **Benefits:**
  - Catch bugs early
  - Automated on every commit
  - Consistent environment
  - Fast feedback
  - Prevent regressions

### Slide 57: GitHub Actions Example

```yaml
name: Playwright Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright
        run: npx playwright install --with-deps
      - name: Run tests
        run: npx playwright test
      - name: Upload report
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

### Slide 58: Docker Integration

```dockerfile
FROM mcr.microsoft.com/playwright:latest
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npx", "playwright", "test"]
```

### Slide 59: Parallelization in CI

```yaml
strategy:
  matrix:
    browser: [chromium, firefox, webkit]
    shard: [1/4, 2/4, 3/4, 4/4]

steps:
  - name: Run tests
    run: npx playwright test --project=${{ matrix.browser }} --shard=${{ matrix.shard }}
```

### Slide 60: CI Best Practices

- ✅ Use caching for dependencies
- ✅ Run tests in parallel
- ✅ Save artifacts (reports, videos)
- ✅ Set appropriate timeouts
- ✅ Use retry on failure
- ✅ Run on multiple OS if needed

---

## **Section 11: Best Practices (Slides 61-66)**

### Slide 61: Test Organization

**Principles:**

- One feature per file
- Group related tests
- Use descriptive names
- Keep tests independent
- Clean folder structure

### Slide 62: Writing Maintainable Tests

```typescript
// ❌ Bad
test("test1", async ({ page }) => {
  await page.goto("http://localhost:3000/page1");
  await page.locator("div").nth(3).click();
  await page.locator("input").fill("test");
});

// ✅ Good
test("user can submit contact form", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Name").fill("John Doe");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Thank you")).toBeVisible();
});
```

### Slide 63: Test Data Management

```typescript
// Use constants
const TEST_USER = {
  email: "test@example.com",
  password: "Test123!",
};

// Use fixtures
test.use({
  testUser: { email: "test@example.com", name: "Test User" },
});

// Use API to create test data
test.beforeEach(async ({ request }) => {
  await request.post("/api/users", { data: TEST_USER });
});
```

### Slide 64: Selector Strategies

**Priority:**

1. **User-facing attributes** (role, label, text)
2. **Test IDs** (data-testid)
3. **CSS/XPath** (last resort)

**Why?**

- More resilient to changes
- Better accessibility
- Matches user behavior

### Slide 65: Performance Tips

- ✅ Use API for test setup
- ✅ Reuse authentication state
- ✅ Run tests in parallel
- ✅ Use `page.waitForLoadState()`
- ✅ Avoid unnecessary waits
- ✅ Screenshot only on failure

### Slide 66: Common Anti-Patterns

**Avoid these:**

- ❌ Using `page.waitForTimeout()`
- ❌ Testing implementation details
- ❌ Brittle selectors (nth-child)
- ❌ Dependent tests
- ❌ Testing multiple things in one test
- ❌ No assertions

---

## **Section 12: Hands-On Exercise (Slides 67-70)**

### Slide 67: Exercise 1 - Basic Test

**Task:** Write a test that:

1. Navigates to homepage
2. Clicks on a button
3. Verifies new content appears

**Time:** 10 minutes

### Slide 68: Exercise 2 - Form Testing

**Task:** Write a test that:

1. Fills out a registration form
2. Submits the form
3. Verifies success message

**Time:** 15 minutes

### Slide 69: Exercise 3 - CRUD Operations

**Task:** Write tests for:

1. Create a new item (POST)
2. Read/display items (GET)
3. Update an item (PUT)
4. Delete an item (DELETE)

**Time:** 20 minutes

### Slide 70: Exercise 4 - API + UI

**Task:**

1. Create data via API
2. Verify it appears in UI
3. Modify via UI
4. Verify via API

**Time:** 20 minutes

---

## **Section 13: Q&A and Resources (Slides 71-75)**

### Slide 71: Key Takeaways

**Summary of main points:**

- ✅ Playwright is fast, reliable, and modern
- ✅ Use proper selectors (role, label, testid)
- ✅ Leverage auto-waiting
- ✅ API testing complements UI testing
- ✅ Organize tests by feature/framework
- ✅ Integrate with CI/CD
- ✅ Use debugging tools effectively

### Slide 72: Resources

**Links:**

- 📚 [Official Documentation](https://playwright.dev)
- 🎓 [Playwright University](https://playwright.dev/docs/intro)
- 💬 [Discord Community](https://discord.gg/playwright)
- 🐙 [GitHub Repository](https://github.com/microsoft/playwright)
- 📺 [YouTube Tutorials](https://www.youtube.com/@Playwrightdev)
- 📝 [Blog Posts & Articles](https://playwright.dev/community/blog)

### Slide 73: Demo Project

**Your demo repository:**

- 🔗 Repository link
- 📋 README with setup instructions
- 🎯 Three framework examples (React, Angular, Vue)
- 🔧 Complete CRUD operations
- 🧪 Comprehensive test suites
- 📝 Detailed documentation

### Slide 74: Next Steps

**Continue Learning:**

1. Practice with the demo project
2. Write tests for your own applications
3. Explore advanced features (traces, videos)
4. Join the Playwright community
5. Contribute to open source
6. Share your learnings

### Slide 75: Thank You!

- **Contact Information**
- **Questions?**
- **Demo Project Link**
- **Social Media / LinkedIn**
- **Office Hours / Follow-up Sessions**

---

## **Appendix Slides (Optional)**

### A1: Cheat Sheet

**Quick reference of common commands**

### A2: Troubleshooting Guide

**Common errors and solutions**

### A3: Migration from Selenium

**For teams transitioning**

### A4: Performance Benchmarks

**Speed comparisons**

### A5: Enterprise Features

**Authentication, reporting, scaling**

---

## **Slide Design Tips:**

### Visual Elements to Include:

- 🎨 **Code syntax highlighting** for all code blocks
- 📊 **Diagrams** for architecture and flow
- 📸 **Screenshots** of UI Mode, Inspector, Trace Viewer
- 🎬 **Animated GIFs** of test execution
- ✅ **Icons** for success/failure/tips
- 📈 **Charts** for comparisons and metrics

### Color Scheme:

- **Primary:** Playwright Green (#2EAD33)
- **Secondary:** Dark Blue (#1E3A5F)
- **Accent:** Orange (#FF7E33)
- **Success:** Green
- **Error:** Red
- **Warning:** Yellow

### Fonts:

- **Headings:** Bold, Sans-serif (e.g., Segoe UI, Arial)
- **Body:** Regular, Sans-serif
- **Code:** Monospace (e.g., Consolas, Courier New)

### Layout:

- **Consistent header** with title and logo
- **Consistent footer** with slide number
- **60/40 rule:** 60% visual, 40% text
- **White space:** Don't overcrowd slides
- **One concept per slide**

---

## **Presentation Flow:**

**Total Time: 2-3 hours (with breaks)**

- Introduction: 10 min
- Getting Started: 20 min
- Locators & Selectors: 20 min
- Actions & Assertions: 20 min
- **Break: 10 min**
- API Testing: 15 min
- Real-World Examples: 25 min
- Debugging: 15 min
- **Break: 10 min**
- Advanced Topics: 20 min
- CI/CD: 10 min
- Best Practices: 15 min
- Hands-On Exercises: 60 min
- Q&A: 15 min

---

## **Interactive Elements:**

1. **Live Coding Sessions** (Slides 36-42)
2. **Polls/Quizzes** after each section
3. **Hands-On Exercises** (Slides 67-70)
4. **Q&A breaks** after major sections
5. **Code challenges** with solutions
6. **Group discussions** on best practices

---

## **Handout Materials:**

- 📄 PDF copy of slides
- 💻 Demo project repository link
- 📋 Cheat sheet (one-page reference)
- 🔗 Resource links document
- 📝 Exercise solutions
- 🎯 Assessment quiz

---

This comprehensive outline provides everything needed for an effective Playwright training session!
