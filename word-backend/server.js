const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Paths
const frontendDistPath = path.join(__dirname, '..', 'vite-project', 'dist');
const publicPath = path.join(__dirname, 'public');
const sslKeyPath = path.join(__dirname, 'ssl', 'key.pem');
const sslCertPath = path.join(__dirname, 'ssl', 'cert.pem');

// Check if SSL certificates exist
if (!fs.existsSync(sslKeyPath) || !fs.existsSync(sslCertPath)) {
  console.error('❌ SSL certificates not found!');
  console.error('   Please run: npm run generate-ssl');
  console.error('   Or manually generate key.pem and cert.pem in the ssl/ directory');
  process.exit(1);
}

// Load SSL certificates
const key = fs.readFileSync(sslKeyPath, 'utf8');
const cert = fs.readFileSync(sslCertPath, 'utf8');

// Serve static files from frontend dist (Vite build output)
if (fs.existsSync(frontendDistPath)) {
  // Serve assets directory
  app.use('/assets', express.static(path.join(frontendDistPath, 'assets')));
  // Serve any other static files from dist root (e.g., favicon, etc.)
  app.use(express.static(frontendDistPath, { index: false })); // Don't use index.html as default
  console.log('✅ Serving frontend assets from:', frontendDistPath);
} else {
  console.warn('⚠️  Frontend dist folder not found. Build the frontend first: cd ../vite-project && npm run build');
}

// Serve static files from public directory (icons, etc.)
app.use(express.static(publicPath));
console.log('✅ Serving public assets from:', publicPath);

// Root route - status endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Word Add-in Backend Server',
    version: '1.0.0',
    endpoints: {
      taskpane: '/taskpane.html',
      manifest: '/manifest.xml',
      assets: '/assets/*',
      icons: '/icons/*'
    }
  });
});

// Serve taskpane.html (prefer built version from dist, fallback to public)
app.get('/taskpane.html', (req, res) => {
  // First try to serve from dist (has correct asset references from Vite build)
  const distTaskpanePath = path.join(frontendDistPath, 'taskpane.html');
  const publicTaskpanePath = path.join(publicPath, 'taskpane.html');
  
  if (fs.existsSync(distTaskpanePath)) {
    res.sendFile(distTaskpanePath);
  } else if (fs.existsSync(publicTaskpanePath)) {
    res.sendFile(publicTaskpanePath);
  } else {
    res.status(404).send('taskpane.html not found. Please build the frontend first.');
  }
});

// Serve manifest.xml
app.get('/manifest.xml', (req, res) => {
  const manifestPath = path.join(__dirname, 'manifest.xml');
  if (fs.existsSync(manifestPath)) {
    res.setHeader('Content-Type', 'application/xml');
    res.sendFile(manifestPath);
  } else {
    res.status(404).send('manifest.xml not found');
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Create HTTPS server
const server = https.createServer({ key, cert }, app);

// Start server
server.listen(PORT, () => {
  console.log('\n🚀 Word Add-in Backend Server running!');
  console.log(`   URL: https://localhost:${PORT}`);
  console.log(`   Taskpane: https://localhost:${PORT}/taskpane.html`);
  console.log(`   Manifest: https://localhost:${PORT}/manifest.xml`);
  console.log('\n⚠️  Note: You may see a security warning due to self-signed certificate.');
  console.log('   This is normal for development. Accept the certificate to proceed.\n');
});

// Handle errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please stop the other process or change the port.`);
  } else {
    console.error('❌ Server error:', error);
  }
  process.exit(1);
});

