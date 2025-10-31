# Angular App Tests

This folder contains all Playwright E2E tests for the Angular application.

## Test Files

### `angular-app.spec.ts`

Basic Angular app functionality tests:

- Homepage loading
- Main content display
- Navigation/toolbar presence
- Basic UI structure

### `angular-crud.spec.ts`

CRUD operations tests:

- **GET** - Load and display users from API
- **POST** - Create new users
- **PUT** - Update existing users
- **DELETE** - Delete users
- **Cancel** - Cancel edit operations
- Error handling and loading states

## Running Tests

### Run all Angular tests

```bash
npx playwright test angular/
```

### Run specific test file

```bash
npx playwright test angular/angular-app.spec.ts
npx playwright test angular/angular-crud.spec.ts
```

### Run with specific browser

```bash
npx playwright test angular/ --project=angular-chromium
npx playwright test angular/ --project=angular-firefox
npx playwright test angular/ --project=angular-webkit
```

### Debug mode

```bash
npx playwright test angular/ --debug
```

### UI mode

```bash
npx playwright test angular/ --ui
```

## Prerequisites

- Angular app must be running on `http://localhost:4200`
- API server must be running on `http://localhost:3001` (for CRUD tests)

## Test Coverage

- ✅ Component rendering
- ✅ User interactions (clicks, form submissions)
- ✅ API integration (all HTTP methods)
- ✅ RxJS observables & state management
- ✅ Error handling
- ✅ Loading states
- ✅ Two-way data binding
- ✅ Form validation

## Configuration

Tests use the baseURL configured in `playwright.config.ts`:

- `angular-chromium`: Chrome browser
- `angular-firefox`: Firefox browser
- `angular-webkit`: Safari browser

All pointing to `http://localhost:4200`

## Angular-Specific Features Tested

- Standalone components
- HttpClient service integration
- FormsModule two-way binding
- @if and @for control flow
- Component lifecycle (OnInit)
