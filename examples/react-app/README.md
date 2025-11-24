# Sniffr React Example

A simple React application demonstrating client-side browser, OS, and device detection using Sniffr with the User-Agent Client Hints API.

## Overview

This example shows how to use Sniffr in a React application to detect and display the user's browser, operating system, and device information asynchronously.

## Features

- Modern React 18 setup with `create-react-app`
- Asynchronous detection using `sniffHints()` for maximum accuracy
- Beautiful, responsive UI with cards displaying detection results
- Raw JSON details available for inspection
- Graceful error handling
- Loading state indicator

## Installation

### Using npm pack (Recommended for Testing)

This approach creates a realistic tarball package like users would receive from npm:

```bash
# From the project root
npm run dist
npm pack

# Then in this directory
npm install
npm install ../../sniffr-*.tgz
npm start
```

This will start the development server on `http://localhost:3000`

### Using file:// protocol (For Rapid Development)

For faster iteration during development, you can use the file protocol:

```bash
# From the project root
npm run dist

# Then in this directory
npm install
npm install file:../../
npm start
```

This will start the development server on `http://localhost:3000`

### Switching to Published NPM Package

To use the published version from NPM instead, update `package.json`:

```json
"dependencies": {
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-scripts": "5.0.1",
  "sniffr": "^1.4.0"  // Change from "file:../../" or the tarball
}
```

Then run:
```bash
npm install
npm start
```

## Usage

### Start Development Server

```bash
npm start
```

The app will automatically open in your browser at `http://localhost:3000`. If not, visit it manually.

### Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build/` directory.

### How It Works

1. **Component Lifecycle**: When the app mounts, a `useEffect` hook triggers the browser detection
2. **Asynchronous Detection**: Uses `sniffHints()` which:
   - Attempts to use the User-Agent Client Hints API (Chrome, Edge, Opera, Brave)
   - Falls back to user agent string parsing for other browsers (Firefox, Safari)
   - Provides graceful error handling
3. **Display Results**: Shows detected OS, browser, and device in attractive cards
4. **JSON Details**: Raw detection data available in collapsible section

### Detection Accuracy

The example uses the recommended `sniffHints()` method which provides better accuracy:

```javascript
const sniffer = new Sniffr();
await sniffer.sniffHints();
```

For backward compatibility, you can also use the synchronous `sniff()` method:

```javascript
const sniffer = new Sniffr();
sniffer.sniff();
```

## Testing Local Changes

When developing Sniffr, follow these steps to test your changes:

1. **Make changes to Sniffr** source code (`src/sniffr.ts`)

2. **Build and pack the library** (from the Sniffr root directory):
   ```bash
   npm run dist
   npm pack
   ```

3. **Update this example with the new tarball** (from this directory):
   ```bash
   npm install ../../sniffr-*.tgz
   ```

4. **Restart the dev server**:
   ```bash
   npm start
   ```

5. **Test in your browser**:
   - Open `http://localhost:3000`
   - Verify that your changes are reflected in the detection results
   - Open browser DevTools Console to see any errors

### Alternative: Using file:// for Rapid Development

If you prefer faster iteration without repacking:

```bash
# Build only (from root)
npm run dist

# Update link (from this directory)
npm install file:../../
npm start
```

With this approach:
- Hot reload works during development
- Hard refresh browser: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac) after rebuilds

## Browser Compatibility

The app works in all modern browsers:

- **Chrome/Brave/Edge**: Full support with Client Hints API
- **Firefox**: Works with user agent string fallback
- **Safari**: Works with user agent string fallback
- **Opera**: Full support with Client Hints API

## Project Structure

```
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── App.js             # Main React component with detection logic
│   ├── App.css            # Styling
│   ├── index.js           # React entry point
│   └── reportWebVitals.js # Performance monitoring
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## Component Details

### App.js

The main component that:
- Manages detection state (`detectionData`, `loading`, `error`)
- Runs detection on component mount
- Displays loading spinner while detecting
- Shows error message if detection fails
- Renders detection results in beautiful cards
- Provides collapsible JSON details

### App.css

Responsive styling with:
- Gradient background
- Card-based layout
- Mobile-friendly responsive grid
- Hover effects and animations
- Professional color scheme

## Dependencies

- `react`: JavaScript library for building UIs
- `react-dom`: React rendering for web
- `react-scripts`: Build and development tools
- `sniffr`: Browser detection library

## Available Scripts

- `npm start`: Run development server
- `npm build`: Create production build
- `npm test`: Run tests (if configured)
- `npm eject`: Eject from create-react-app (one-way operation)

## Troubleshooting

### Module not found error

If you get "Cannot find module 'sniffr'":
1. Make sure you've run `npm install` in this directory
2. If using tarball: ensure you've run `npm install ../../sniffr-*.tgz`
3. If using file protocol: ensure you've run `npm install file:../../`
4. Try clearing node_modules and reinstalling

### Changes not reflecting

If local Sniffr changes aren't showing up:
1. Rebuild Sniffr: `npm run dist` (from parent directory)
2. If using tarball: `npm pack` then `npm install ../../sniffr-*.tgz`
3. If using file protocol: Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
4. If still not working, restart the dev server

### Port 3000 already in use

If port 3000 is busy:
```bash
PORT=3001 npm start
```

## Development Tips

- **Hot Reload**: Changes to source files automatically reload in the browser
- **React DevTools**: Install React DevTools browser extension for debugging
- **Console Logging**: Check browser console for any detection errors
- **Network Tab**: View the User-Agent Client Hints API requests

## License

MIT

