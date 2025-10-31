# Vue App Tests

This folder contains all Playwright E2E tests for the Vue.js application.

## Test Files

### `vue-app.spec.ts`

Basic Vue app functionality tests:

- Homepage loading
- Interactive counter button
- Vue logo visibility
- Basic UI interactions

### `vue-crud.spec.ts`

CRUD operations tests:

- **GET** - Load and display users from API
- **POST** - Create new users
- **PUT** - Update existing users
- **DELETE** - Delete users
- **Cancel** - Cancel edit operations
- Error handling and loading states

## Running Tests

### Run all Vue tests

```bash
npx playwright test vue/
```

### Run specific test file

```bash
npx playwright test vue/vue-app.spec.ts
npx playwright test vue/vue-crud.spec.ts
```

### Run with specific browser

```bash
npx playwright test vue/ --project=vue-chromium
npx playwright test vue/ --project=vue-firefox
npx playwright test vue/ --project=vue-webkit
```

### Debug mode

```bash
npx playwright test vue/ --debug
```

### UI mode

```bash
npx playwright test vue/ --ui
```

## Prerequisites

- Vue app must be running on `http://localhost:5174`
- API server must be running on `http://localhost:3001` (for CRUD tests)

## Test Coverage

- ✅ Component rendering
- ✅ User interactions (clicks, form submissions)
- ✅ API integration (all HTTP methods)
- ✅ Reactive state management
- ✅ Error handling
- ✅ Loading states
- ✅ Form validation
- ✅ v-model bindings

## Configuration

Tests use the baseURL configured in `playwright.config.ts`:

- `vue-chromium`: Chrome browser
- `vue-firefox`: Firefox browser
- `vue-webkit`: Safari browser

All pointing to `http://localhost:5174`

## Vue-Specific Features Tested

- Composition API (setup script)
- Reactive refs and computed properties
- v-model two-way binding
- v-for list rendering
- v-if conditional rendering
- Lifecycle hooks (onMounted)
- Event handling (@click, @submit)
