const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const sslDir = path.join(__dirname, 'ssl');
const keyPath = path.join(sslDir, 'key.pem');
const certPath = path.join(sslDir, 'cert.pem');

// Create ssl directory if it doesn't exist
if (!fs.existsSync(sslDir)) {
  fs.mkdirSync(sslDir, { recursive: true });
}

// Check if certificates already exist
if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
  console.log('SSL certificates already exist. Delete them first if you want to regenerate.');
  process.exit(0);
}

console.log('Generating self-signed SSL certificate...');
console.log('This may take a few seconds...');

try {
  // Generate self-signed certificate valid for 365 days
  execSync(
    `openssl req -x509 -newkey rsa:4096 -keyout "${keyPath}" -out "${certPath}" -days 365 -nodes -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"`,
    { stdio: 'inherit' }
  );
  console.log('\n✅ SSL certificates generated successfully!');
  console.log(`   Key: ${keyPath}`);
  console.log(`   Cert: ${certPath}`);
  console.log('\n⚠️  Note: This is a self-signed certificate. You may need to accept the security warning in your browser.');
} catch (error) {
  console.error('\n❌ Error generating SSL certificate:', error.message);
  console.log('\n📝 Manual generation instructions:');
  console.log('   Run this command in the ssl/ directory:');
  console.log('   openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"');
  process.exit(1);
}

