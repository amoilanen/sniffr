# Sniffr Node.js/Express Example

A simple Express.js server demonstrating server-side user agent detection using Sniffr.

## Overview

This example shows how to use Sniffr on the server side to detect browser, OS, and device information from user agent strings.

## Features

- Simple Express.js server
- Two endpoints for detection:
  - `/detect` - Detect browser/OS/device from a provided user agent
  - `/detect-hardcoded` - Get detection results for predefined user agent strings
- JSON API responses
- Clear documentation

## Installation

### Using npm pack (Recommended for Testing)

This approach creates a realistic tarball package like users would receive from npm:

```bash
# From the project root
npm run dist
npm pack

# Then in the directory of the example
npm install
npm install ../../sniffr-*.tgz
npm start
```

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

### Switching to Published NPM Package

To use the published version from NPM instead, update `package.json`:

```json
"dependencies": {
  "express": "^4.18.2",
  "sniffr": "^1.4.0"  // Change from "file:../../" or the tarball
}
```

Then run:
```bash
npm install
npm start
```

## Usage

### Start the Server

```bash
npm start
```

The server will start on `http://localhost:3000`

### API Endpoints

#### 1. Root Endpoint - API Documentation

```
GET http://localhost:3000/
```

Returns API documentation and available endpoints.

#### 2. Detect Endpoint - Detect from User Agent

```
GET http://localhost:3000/detect?userAgent=<user-agent-string>
```

**Parameters:**
- `userAgent` (optional): A user agent string. If not provided, uses the request's user-agent header.

**Example:**
```bash
curl "http://localhost:3000/detect?userAgent=Mozilla/5.0%20(Windows%20NT%2010.0;%20Win64;%20x64)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/120.0.0.0%20Safari/537.36"
```

**Response:**
```json
{
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "browser": {
    "name": "chrome",
    "version": "120.0.0.0",
    "versionNumbers": [120, 0, 0, 0]
  },
  "os": {
    "name": "windows",
    "version": "10.0",
    "versionNumbers": [10, 0]
  },
  "device": {
    "name": "Unknown",
    "version": "Unknown",
    "versionNumbers": []
  }
}
```

#### 3. Detect Hardcoded Endpoint - Predefined User Agents

```
GET http://localhost:3000/detect-hardcoded
```

Returns detection results for several predefined user agent strings including:
- Chrome on Windows
- Firefox on Linux
- Safari on macOS
- Safari on iPhone
- Safari on iPad
- Chrome on Android

**Example:**
```bash
curl http://localhost:3000/detect-hardcoded
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
   npm start
   ```

4. **Test your changes**:
   ```bash
   curl "http://localhost:3000/detect?userAgent=your-test-agent"
   ```

### Alternative: Using file:// for Rapid Development

If you prefer faster iteration without repacking:

```bash
# Build only (from root)
npm run dist

# Update link (from this directory)
npm install file:../../
npm start
```

## Troubleshooting

### Module not found error

If you get "Cannot find module 'sniffr'":
1. Make sure you've run `npm install` in this directory
2. If using tarball: ensure you've run `npm install ../../sniffr-*.tgz`
3. If using file protocol: ensure you've run `npm install file:../../`

### Version mismatch

If the local changes aren't reflected:
1. Rebuild Sniffr: `npm run dist` (from parent directory)
2. If using tarball: `npm pack` then `npm install ../../sniffr-*.tgz`
3. If using file protocol: Restart the server (Node caches require() calls)
4. Clear node_modules if needed: `rm -rf node_modules && npm install && npm install ../../sniffr-*.tgz`

## Project Structure

```
├── package.json          # Project dependencies
├── server.js            # Express server with endpoints
└── README.md            # This file
```

## Dependencies

- `express`: Web framework
- `sniffr`: Browser detection library

## License

MIT

