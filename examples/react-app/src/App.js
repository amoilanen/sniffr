import React, { useEffect, useState } from 'react';
import Sniffr from 'sniffr';
import './App.css';

function App() {
  const [detectionData, setDetectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const detectBrowser = async () => {
      try {
        const sniffer = new Sniffr();
        // Use sniffHints for more accurate detection with Client Hints API
        await sniffer.sniffHints();

        setDetectionData({
          os: {
            name: sniffer.os.name,
            version: sniffer.os.versionString,
            versionNumbers: sniffer.os.version
          },
          browser: {
            name: sniffer.browser.name,
            version: sniffer.browser.versionString,
            versionNumbers: sniffer.browser.version
          },
          device: {
            name: sniffer.device.name,
            version: sniffer.device.versionString,
            versionNumbers: sniffer.device.version
          }
        });
      } catch (err) {
        setError(`Detection failed: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    detectBrowser();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🐕 Sniffr Browser Detection</h1>
        <p>Detecting your browser, OS, and device information...</p>
      </header>

      <main className="App-main">
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Detecting your browser information...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <h2>⚠️ Detection Error</h2>
            <p>{error}</p>
          </div>
        )}

        {detectionData && (
          <div className="detection-results">
            <div className="result-card os">
              <div className="card-icon">🖥️</div>
              <div className="card-content">
                <h2>Operating System</h2>
                <p className="property-value">{detectionData.os.name}</p>
                {detectionData.os.version !== 'Unknown' && (
                  <p className="property-version">Version: {detectionData.os.version}</p>
                )}
              </div>
            </div>

            <div className="result-card browser">
              <div className="card-icon">🌐</div>
              <div className="card-content">
                <h2>Browser</h2>
                <p className="property-value">{detectionData.browser.name}</p>
                {detectionData.browser.version !== 'Unknown' && (
                  <p className="property-version">Version: {detectionData.browser.version}</p>
                )}
              </div>
            </div>

            <div className="result-card device">
              <div className="card-icon">📱</div>
              <div className="card-content">
                <h2>Device</h2>
                <p className="property-value">{detectionData.device.name}</p>
                {detectionData.device.version !== 'Unknown' && (
                  <p className="property-version">Version: {detectionData.device.version}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {detectionData && (
          <div className="details-section">
            <h2>📊 Full Detection Details</h2>
            <details>
              <summary>Click to expand raw JSON</summary>
              <pre>{JSON.stringify(detectionData, null, 2)}</pre>
            </details>
          </div>
        )}
      </main>

      <footer className="App-footer">
        <p>
          Powered by <strong>Sniffr</strong> - Browser, OS and device detection library
        </p>
        <p>
          <a href="https://github.com/amoilanen/sniffr" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;

