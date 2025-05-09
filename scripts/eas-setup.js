#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up EAS for your project...');

// Check if EAS CLI is installed
try {
  execSync('eas --version', { stdio: 'ignore' });
  console.log('✅ EAS CLI is already installed');
} catch (error) {
  console.log('⚙️ Installing EAS CLI...');
  execSync('npm install -g eas-cli', { stdio: 'inherit' });
}

// Check if user is logged in to Expo
try {
  const whoAmIOutput = execSync('eas whoami', { encoding: 'utf8' });
  console.log(`✅ Logged in as: ${whoAmIOutput.trim()}`);
} catch (error) {
  console.log('🔑 Please log in to your Expo account:');
  execSync('eas login', { stdio: 'inherit' });
}

// Check if eas.json exists
const easJsonPath = path.join(process.cwd(), 'eas.json');
if (!fs.existsSync(easJsonPath)) {
  console.log('📝 Creating EAS configuration...');
  execSync('eas build:configure', { stdio: 'inherit' });
} else {
  console.log('✅ EAS configuration already exists');
}

// Install required dependencies
console.log('📦 Installing required dependencies...');
execSync('yarn add expo-dev-client expo-updates', { stdio: 'inherit' });

console.log('\n🎉 EAS setup complete! You can now use the following commands:');
console.log('  - yarn build:development  # Build a development version');
console.log('  - yarn build:preview      # Build a preview version');
console.log('  - yarn build:production   # Build a production version');
console.log('  - yarn update:preview     # Push an update to preview channel');
console.log('  - yarn update:production  # Push an update to production channel'); 