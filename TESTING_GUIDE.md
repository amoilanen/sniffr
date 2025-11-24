# Testing Sniffr

## 1. Unit testing

Use the existing test suite:
```bash
npm test
```

## 2. Testing standalone script

```bash
npm run dist
```

then copy/paste the file ./dist/sniffr.standalone.min.js into the browser Dev tools console and observe that there is an object `Sniffr` available with the recognized values of os, browser, device.

## 3. Testing built NPM package in a browser an on a server side (Node)

### Prerequisites

- Node.js installed (v14 or higher)
- npm available
- Sniffr repository cloned

### Setup

#### Recommended: Using npm pack

Using `npm pack` creates a real tarball package that closely mimics what users will receive from npm, providing the most realistic testing.

##### 1. First Time Setup

```bash
# From project root
npm install          # Install main project dependencies
npm run dist         # Build Sniffr
npm pack             # Create sniffr-X.X.X.tgz tarball

# Install both examples with the tarball
cd examples/node-express-app && npm install
npm install ../../sniffr-*.tgz

cd ../react-app && npm install
npm install ../../sniffr-*.tgz
```

##### 2. Quick Setup (if already installed)

Rebuild Sniffr, repack, and update examples:

```bash
npm run dist
npm pack

# Update examples with new tarball
cd examples/node-express-app
npm install ../../sniffr-*.tgz

cd ../react-app
npm install ../../sniffr-*.tgz
```

## Testing Workflow

### Scenario 1: Test Server-side Detection (Express)

**Goal:** Verify user agent detection on the backend

#### Step 1: Start Express Server
```bash
cd examples/node-express-app
npm start
```

Expected output:
```
╔═══════════════════════════════════════════════╗
║  Sniffr Express Example Server                ║
║  Listening on http://localhost:3000           ║
╚═══════════════════════════════════════════════╝
```

#### Step 2: Test Endpoints

In a new terminal:

```bash
# Test 1: Get API documentation
curl http://localhost:3000/

# Test 2: Detect with hardcoded user agents
curl http://localhost:3000/detect-hardcoded

# Test 3: Detect specific user agent
curl "http://localhost:3000/detect?userAgent=Mozilla/5.0%20(Windows%20NT%2010.0;%20Win64;%20x64)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/120.0.0.0%20Safari/537.36"
```

#### Step 3: Make Changes to Sniffr

Edit `src/sniffr.ts`:
- Add new browser matching rules
- Modify OS detection
- Update device detection

#### Step 4: Rebuild, Repack, and Test

```bash
# From project root
npm run dist
npm pack

# Update the example with new tarball
cd examples/node-express-app
npm install ../../sniffr-*.tgz
npm start
```

In the other terminal, test again:
```bash
curl http://localhost:3000/detect-hardcoded
```

Check if your changes are reflected in the output.

### Scenario 2: Test Client-side Detection (React)

**Goal:** Verify user agent detection in browser

#### Step 1: Start React App

```bash
cd examples/react-app
npm start
```

This automatically opens http://localhost:3000 in your browser.

#### Step 2: View Detection Results

On the page you should see:
- Operating System detected (e.g., "linux")
- Browser detected (e.g., "chrome")
- Device detected (e.g., "Unknown")

#### Step 3: Make Changes to Sniffr

Edit `src/sniffr.ts` in the project root.

#### Step 4: Rebuild, Repack, and Test

```bash
# From project root
npm run dist
npm pack

# Update the example with new tarball
cd examples/react-app
npm install ../../sniffr-*.tgz
```

In your browser:
- Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

Check the page for updated detection results.

#### Step 5: Browser DevTools

Open DevTools (F12 or Cmd+Option+I):

- **Console tab:** Check for any JavaScript errors
- **Network tab:** Observe User-Agent Client Hints API calls
- **Application tab:** View local storage/session data if needed

### Scenario 3: Test Multiple Browsers

#### Step 1: Install Additional Browsers

- Chrome: https://www.google.com/chrome
- Firefox: https://www.mozilla.org/firefox
- Safari: Built-in on macOS
- Edge: https://www.microsoft.com/en-us/edge

#### Step 2: Run React Example in Each Browser

```bash
cd examples/react-app
npm start
```

For each browser:
1. Visit http://localhost:3000
2. Observe detection results
3. Check DevTools console for compatibility
4. Verify Client Hints API support (Chrome/Edge vs Firefox/Safari)

### Scenario 4: Test Hardcoded User Agents (Express)

**Goal:** Verify detection across many different user agents

```bash
cd examples/node-express-app
npm start
```

In another terminal:

```bash
curl http://localhost:3000/detect-hardcoded | jq
```

This tests detection for:
1. Chrome on Windows
2. Firefox on Linux
3. Safari on macOS
4. Safari on iPhone
5. Safari on iPad
6. Chrome on Android

Expected output:
```json
{
  "results": {
    "chrome_windows": {
      "browser": { "name": "chrome", "version": "120.0.0.0" },
      "os": { "name": "windows", "version": "10.0" },
      "device": { "name": "Unknown" }
    },
    ...
  }
}
```

### Notes

- Always rebuild with `npm run dist` after code changes
- Use `npm pack` to create a realistic tarball for testing (recommended)
- Use `file://` protocol for rapid development iteration (alternative)
- After reinstalling with a new tarball, restart the development server
- Both examples handle errors gracefully
- Check browser console for Client Hints API behavior
- Each browser may have different detection capabilities

