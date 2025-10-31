# Playwright Demo with React, Angular, and Vue.js

This repository demonstrates end-to-end testing with Playwright across three popular frontend frameworks: React, Angular, and Vue.js.

## Project Structure

```
playwright-demo/
├── react-app/          # React application (Vite)
├── angular-app/        # Angular application
├── vue-app/            # Vue.js application (Vite)
└── playwright-tests/   # Playwright E2E tests for all apps
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

Each app has its own dependencies. The dependencies are already installed, but if you need to reinstall:

```bash
# React app
cd react-app && npm install

# Angular app
cd angular-app && npm install

# Vue app
cd vue-app && npm install

# Playwright tests
cd playwright-tests && npm install
```

## Running the Applications

### React App (Port 5173)

```bash
cd react-app
npm run dev
```

Visit: http://localhost:5173

### Angular App (Port 4200)

```bash
cd angular-app
npm start
```

Visit: http://localhost:4200

### Vue App (Port 5174)

```bash
cd vue-app
npm run dev
```

Visit: http://localhost:5174

## Running Playwright Tests

### Run all tests

Make sure all three apps are running first, then:

```bash
cd playwright-tests
npx playwright test
```

### Run tests for a specific app

```bash
# React app tests only
npx playwright test react-app.spec.ts

# Angular app tests only
npx playwright test angular-app.spec.ts

# Vue app tests only
npx playwright test vue-app.spec.ts
```

### Run tests for a specific browser

```bash
# React tests on Chromium only
npx playwright test --project=react-chromium

# Angular tests on Firefox only
npx playwright test --project=angular-firefox

# Vue tests on WebKit only
npx playwright test --project=vue-webkit
```

### Interactive UI Mode

```bash
cd playwright-tests
npx playwright test --ui
```

### Debug Mode

```bash
cd playwright-tests
npx playwright test --debug
```

### View Test Report

```bash
cd playwright-tests
npx playwright show-report
```

## Test Projects

Playwright is configured with 9 test projects (3 browsers × 3 apps):

### React Projects

- `react-chromium` - React app on Chrome
- `react-firefox` - React app on Firefox
- `react-webkit` - React app on Safari

### Angular Projects

- `angular-chromium` - Angular app on Chrome
- `angular-firefox` - Angular app on Firefox
- `angular-webkit` - Angular app on Safari

### Vue Projects

- `vue-chromium` - Vue app on Chrome
- `vue-firefox` - Vue app on Firefox
- `vue-webkit` - Vue app on Safari

## Writing Tests

Tests are located in `playwright-tests/tests/` directory:

- `react-app.spec.ts` - Tests for React application
- `angular-app.spec.ts` - Tests for Angular application
- `vue-app.spec.ts` - Tests for Vue application

Each test file uses the `baseURL` configured in `playwright.config.ts` to target the correct app.

## Useful Commands

### Generate tests with Codegen

```bash
cd playwright-tests

# For React app
npx playwright codegen http://localhost:5173

# For Angular app
npx playwright codegen http://localhost:4200

# For Vue app
npx playwright codegen http://localhost:5174
```

### Update Playwright browsers

```bash
cd playwright-tests
npx playwright install
```

## Technologies Used

- **React**: v18 with Vite
- **Angular**: v20 (latest)
- **Vue.js**: v3 with Vite
- **Playwright**: Latest version for E2E testing
- **TypeScript**: For type-safe tests

## Learn More

- [Playwright Documentation](https://playwright.dev)
- [React Documentation](https://react.dev)
- [Angular Documentation](https://angular.dev)
- [Vue.js Documentation](https://vuejs.org)
- [Vite Documentation](https://vitejs.dev)

## License

MIT
