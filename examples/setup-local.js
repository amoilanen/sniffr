#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// Colors for output
const colors = {
  GREEN: '\033[0;32m',
  BLUE: '\033[0;34m',
  YELLOW: '\033[1;33m',
  NC: '\033[0m', // No Color
};

const PROJECT_ROOT = path.resolve(__dirname, '..');
const EXAMPLES_DIR = path.join(PROJECT_ROOT, 'examples');

function printHeader(text) {
  console.log(`${colors.BLUE}===================================================${colors.NC}`);
  console.log(`${colors.BLUE}${text}${colors.NC}`);
  console.log(`${colors.BLUE}===================================================${colors.NC}`);
}

function printSuccess(text) {
  console.log(`${colors.GREEN}✓ ${text}${colors.NC}`);
}

function printInfo(text) {
  console.log(`${colors.YELLOW}ℹ ${text}${colors.NC}`);
}

function setupExample(exampleName) {
  const examplePath = path.join(EXAMPLES_DIR, exampleName);

  if (!fs.existsSync(examplePath)) {
    console.error(`Error: Example directory not found: ${examplePath}`);
    return false;
  }

  try {
    printHeader(`Setting up ${exampleName}`);

    // Install dependencies
    printInfo('Installing dependencies...');
    execSync('npm install', { cwd: examplePath, stdio: 'inherit' });
    printSuccess('Dependencies installed');

    // Link local sniffr
    printInfo('Linking local Sniffr version...');
    execSync(`npm link "${PROJECT_ROOT}"`, { cwd: examplePath, stdio: 'inherit' });
    printSuccess('Local Sniffr linked');

    // Verify
    printInfo('Verifying setup...');
    const sniffrPath = path.join(examplePath, 'node_modules', 'sniffr');
    if (fs.existsSync(sniffrPath)) {
      printSuccess(`${exampleName} is ready to use!`);
    } else {
      console.warn('Warning: Sniffr not found in node_modules');
    }

    console.log('');
    return true;
  } catch (error) {
    console.error(`Error setting up ${exampleName}: ${error.message}`);
    return false;
  }
}

// Main logic
const example = process.argv[2] || '';

if (!example || example === 'all') {
  // Setup all examples
  const examplesArr = ['node-express-app', 'react-app'];
  for (const exampleDir of examplesArr) {
    const examplePath = path.join(EXAMPLES_DIR, exampleDir);
    if (fs.existsSync(examplePath)) {
      setupExample(exampleDir);
    }
  }
} else {
  // Setup specific example
  if (!setupExample(example)) {
    process.exit(1);
  }
}

printHeader('Setup Complete!');
console.log('');
console.log(`${colors.GREEN}Next steps:${colors.NC}`);
console.log('');

if (!process.argv[2] || process.argv[2] === 'all') {
  console.log('Express example:');
  console.log('  cd examples/node-express-app && npm start');
  console.log('');
  console.log('React example:');
  console.log('  cd examples/react-app && npm start');
} else {
  console.log(`  cd examples/${process.argv[2]} && npm start`);
}

console.log('');
console.log('📖 For more information, see examples/README.md');

