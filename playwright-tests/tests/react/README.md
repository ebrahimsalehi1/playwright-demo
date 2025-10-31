# React App Tests

This folder contains all Playwright E2E tests for the React application.

## Test Files

### `react-app.spec.ts`

Basic React app functionality tests:

- Homepage loading
- Interactive counter button
- React logo visibility
- Basic UI interactions

### `react-crud.spec.ts`

CRUD operations tests:

- **GET** - Load and display users from API
- **POST** - Create new users
- **PUT** - Update existing users
- **DELETE** - Delete users
- **Cancel** - Cancel edit operations
- Error handling and loading states

## Running Tests

### Run all React tests

```bash
npx playwright test react/
```

### Run specific test file

```bash
npx playwright test react/react-app.spec.ts
npx playwright test react/react-crud.spec.ts
```

### Run with specific browser

```bash
npx playwright test react/ --project=react-chromium
npx playwright test react/ --project=react-firefox
npx playwright test react/ --project=react-webkit
```

### Debug mode

```bash
npx playwright test react/ --debug
```

### UI mode

```bash
npx playwright test react/ --ui
```

## Prerequisites

- React app must be running on `http://localhost:5173`
- API server must be running on `http://localhost:3001` (for CRUD tests)

## Test Coverage

- ✅ Component rendering
- ✅ User interactions (clicks, form submissions)
- ✅ API integration (all HTTP methods)
- ✅ State management
- ✅ Error handling
- ✅ Loading states
- ✅ Form validation

## Configuration

Tests use the baseURL configured in `playwright.config.ts`:

- `react-chromium`: Chrome browser
- `react-firefox`: Firefox browser
- `react-webkit`: Safari browser

All pointing to `http://localhost:5173`
