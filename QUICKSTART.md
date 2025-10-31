# Quick Start Guide

## 🚀 Setup Complete!

Your Playwright demo with React, Angular, and Vue.js is ready to use!

## 📁 Project Structure

```
playwright-demo/
├── react-app/          ✅ React + Vite (Port 5173)
├── angular-app/        ✅ Angular (Port 4200)
├── vue-app/            ✅ Vue.js + Vite (Port 5174)
├── playwright-tests/   ✅ Playwright E2E Tests
└── package.json        ✅ Root scripts for easy testing
```

## 🎯 Quick Commands (from root directory)

### Start Applications

```bash
# Start React app
npm run start:react

# Start Angular app
npm run start:angular

# Start Vue app
npm run start:vue

# Or use the bash script to start all at once
./start-all-apps.sh
```

### Run Tests (after starting apps)

```bash
# Run all tests
npm test

# Run tests with UI mode
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Run tests for specific app
npm run test:react
npm run test:angular
npm run test:vue

# View test report
npm run test:report
```

### Generate Tests with Codegen

```bash
# Generate tests for React app (after starting it)
npm run codegen:react

# Generate tests for Angular app (after starting it)
npm run codegen:angular

# Generate tests for Vue app (after starting it)
npm run codegen:vue
```

## 📝 Typical Workflow

1. **Start all applications** (in separate terminals or use the script):

   ```bash
   # Terminal 1
   npm run start:react

   # Terminal 2
   npm run start:angular

   # Terminal 3
   npm run start:vue
   ```

2. **Wait for all apps to be ready** (check browser):

   - React: http://localhost:5173 ✓
   - Angular: http://localhost:4200 ✓
   - Vue: http://localhost:5174 ✓

3. **Run Playwright tests** (in a new terminal):

   ```bash
   npm test
   ```

4. **View results**:
   ```bash
   npm run test:report
   ```

## 🧪 Testing Features

- **9 Test Projects**: Each app tested on 3 browsers (Chromium, Firefox, WebKit)
- **Parallel Execution**: Tests run concurrently for speed
- **HTML Reports**: Beautiful test reports with screenshots and videos
- **Debug Mode**: Step through tests with Playwright Inspector
- **UI Mode**: Interactive test runner with watch mode

## 📚 Test Files

- `playwright-tests/tests/react-app.spec.ts` - React app tests
- `playwright-tests/tests/angular-app.spec.ts` - Angular app tests
- `playwright-tests/tests/vue-app.spec.ts` - Vue app tests

## 💡 Tips

1. **Run specific browser tests**:

   ```bash
   cd playwright-tests
   npx playwright test --project=react-chromium
   ```

2. **Run tests in headed mode** (see the browser):

   ```bash
   cd playwright-tests
   npx playwright test --headed
   ```

3. **Update browsers**:

   ```bash
   cd playwright-tests
   npx playwright install
   ```

4. **Create new tests**: Use codegen to record interactions and generate test code automatically!

## 🐛 Troubleshooting

- **Port already in use**: Stop other running instances or change ports in each app's config
- **Tests failing**: Make sure all three apps are running and accessible
- **Browsers not installed**: Run `cd playwright-tests && npx playwright install`

## 🎉 You're Ready!

Start exploring Playwright's powerful testing capabilities across different frameworks!

For more details, see the main [README.md](README.md)
