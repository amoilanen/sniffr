const express = require('express');
const Sniffr = require('sniffr').default;

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Static files
app.use(express.static('public'));

/**
 * GET /detect
 * Detects browser, OS, and device from a user agent string passed as query parameter
 * or detects from the request headers
 */
app.get('/detect', (req, res) => {
  try {
    // Get user agent from query param or from request headers
    const userAgent = req.query.userAgent || req.get('user-agent') || '';

    if (!userAgent) {
      return res.status(400).json({
        error: 'No user agent provided',
        message: 'Please provide a user agent string via ?userAgent=<agent> query parameter or send a request with user-agent header'
      });
    }

    // Create a new Sniffr instance and detect
    const sniffer = new Sniffr();
    sniffer.sniff(userAgent);

    // Return the detection results
    res.json({
      userAgent: userAgent,
      browser: {
        name: sniffer.browser.name,
        version: sniffer.browser.versionString,
        versionNumbers: sniffer.browser.version
      },
      os: {
        name: sniffer.os.name,
        version: sniffer.os.versionString,
        versionNumbers: sniffer.os.version
      },
      device: {
        name: sniffer.device.name,
        version: sniffer.device.versionString,
        versionNumbers: sniffer.device.version
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Detection failed',
      message: error.message
    });
  }
});

/**
 * GET /detect-hardcoded
 * Returns detection results for a hardcoded user agent string
 */
app.get('/detect-hardcoded', (req, res) => {
  try {
    // Hardcoded user agent strings for different browsers/devices
    const userAgents = {
      chrome_windows: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      firefox_linux: 'Mozilla/5.0 (X11; Linux x86_64; rv:121.0) Gecko/20100101 Firefox/121.0',
      safari_macos: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15',
      iphone_safari: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
      ipad_safari: 'Mozilla/5.0 (iPad; CPU OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
      android_chrome: 'Mozilla/5.0 (Linux; Android 13; SM-A536B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
    };

    // Create results for all hardcoded user agents
    const results = {};

    Object.entries(userAgents).forEach(([key, userAgent]) => {
      const sniffer = new Sniffr();
      sniffer.sniff(userAgent);

      results[key] = {
        userAgent: userAgent,
        browser: {
          name: sniffer.browser.name,
          version: sniffer.browser.versionString,
          versionNumbers: sniffer.browser.version
        },
        os: {
          name: sniffer.os.name,
          version: sniffer.os.versionString,
          versionNumbers: sniffer.os.version
        },
        device: {
          name: sniffer.device.name,
          version: sniffer.device.versionString,
          versionNumbers: sniffer.device.version
        }
      };
    });

    res.json({
      message: 'Detection results for hardcoded user agent strings',
      results: results
    });
  } catch (error) {
    res.status(500).json({
      error: 'Detection failed',
      message: error.message
    });
  }
});

/**
 * GET /
 * Returns API documentation
 */
app.get('/', (req, res) => {
  res.json({
    name: 'Sniffr Express Example',
    version: '1.0.0',
    description: 'A simple Express server demonstrating server-side user agent detection using Sniffr',
    endpoints: {
      '/detect': {
        method: 'GET',
        description: 'Detect browser/OS/device from user agent',
        parameters: {
          userAgent: 'Optional user agent string query parameter. If not provided, uses the request user-agent header'
        },
        example: '/detect?userAgent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      '/detect-hardcoded': {
        method: 'GET',
        description: 'Returns detection results for predefined user agent strings',
        example: '/detect-hardcoded'
      }
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════╗
║  Sniffr Express Example Server                ║
║  Listening on http://localhost:${PORT}               ║
╚═══════════════════════════════════════════════╝

📝 Available endpoints:

  GET /
    - Returns API documentation

  GET /detect
    - Query param: ?userAgent=<user-agent-string>
    - Example: http://localhost:${PORT}/detect?userAgent=Mozilla/5.0...

  GET /detect-hardcoded
    - Returns detection for predefined user agents
    - Example: http://localhost:${PORT}/detect-hardcoded

Press Ctrl+C to stop the server.
  `);
});

