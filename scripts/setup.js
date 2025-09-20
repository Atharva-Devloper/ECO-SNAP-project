#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up EcoSnap Development Environment...\n');

// Check if Node.js version is compatible
const nodeVersion = process.version;
const requiredVersion = 'v14.0.0';
console.log(`📦 Node.js version: ${nodeVersion}`);

// Create environment files if they don't exist
const serverEnvPath = path.join(__dirname, '../server/.env');
const clientEnvPath = path.join(__dirname, '../client/.env');

if (!fs.existsSync(serverEnvPath)) {
  console.log('📝 Creating server .env file...');
  fs.copyFileSync(
    path.join(__dirname, '../server/.env.example'),
    serverEnvPath
  );
}

if (!fs.existsSync(clientEnvPath)) {
  console.log('📝 Creating client .env file...');
  fs.copyFileSync(
    path.join(__dirname, '../client/.env.example'),
    clientEnvPath
  );
}

console.log('\n✅ Environment files created!');
console.log('\n📋 Next steps:');
console.log('1. Update the .env files with your configuration');
console.log('2. Install dependencies: npm run install:all');
console.log('3. Start development: npm run dev');
console.log('\n🌟 Happy coding!');
