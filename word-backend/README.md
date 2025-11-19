# Word Add-in Backend Server

Production-ready HTTPS Express server for hosting Microsoft Word Add-in.

## 📁 Project Structure

```
word-backend/
├── server.js              # Main Express HTTPS server
├── manifest.xml           # Office Add-in manifest
├── package.json           # Node.js dependencies
├── generate-ssl.js        # SSL certificate generator
├── generate-icons.js      # Icon placeholder generator
├── ssl/                   # SSL certificates (generated)
│   ├── key.pem
│   └── cert.pem
└── public/                # Static assets
    ├── taskpane.html      # Taskpane HTML entry point
    └── icons/             # Add-in icons
        ├── icon-32.png
        ├── icon-64.png
        ├── icon-128.png
        └── icon-256.png
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd word-backend
npm install
```

### 2. Generate SSL Certificates

The server requires HTTPS. Generate self-signed certificates:

```bash
npm run generate-ssl
```

This creates `ssl/key.pem` and `ssl/cert.pem` using OpenSSL.

**Manual generation** (if the script fails):
```bash
cd ssl
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
```

### 3. Generate Icon Placeholders

```bash
npm run generate-icons
```

**Note:** Replace placeholder icons with actual icon files for production.

### 4. Build Frontend

Build the React frontend first:

```bash
cd ../vite-project
npm install
npm run build
```

This creates the `dist/` folder that the backend serves.

### 5. Start Backend Server

```bash
cd ../word-backend
npm start
```

The server will start at: **https://localhost:3000**

You may see a browser security warning due to the self-signed certificate. This is normal for development. Accept the certificate to proceed.

## 📋 Server Endpoints

- `GET /` - Server status and endpoint information
- `GET /taskpane.html` - Taskpane HTML entry point
- `GET /manifest.xml` - Office Add-in manifest
- `GET /assets/*` - Frontend build assets (from `../vite-project/dist/assets`)
- `GET /icons/*` - Add-in icons
- `GET /health` - Health check endpoint

## 🔧 Configuration

### Port

Default port is `3000`. To change it, edit `PORT` in `server.js`:

```javascript
const PORT = 3000; // Change to your desired port
```

### Frontend Build Path

The server looks for frontend build at:
```
../vite-project/dist
```

To change this, edit `frontendDistPath` in `server.js`.

## 📦 Loading Add-in in Word

### Method 1: Upload Custom Add-in (Recommended)

1. **Start the backend server** (if not already running):
   ```bash
   npm start
   ```

2. **Open Microsoft Word**

3. **Go to Insert → Add-ins → Get Add-ins**

4. **Click "Upload My Add-in"** (bottom left)

5. **Select the manifest file**:
   ```
   word-backend/manifest.xml
   ```

6. **Accept the security warning** (self-signed certificate)

7. The add-in should now appear in the **Home** tab ribbon

### Method 2: Sideload via Office Dev Tools

1. Install [Office Add-in Developer Tools](https://www.npmjs.com/package/office-addin-dev-certs)

2. Trust the development certificate:
   ```bash
   npx office-addin-dev-certs install --machine
   ```

3. Use the manifest path: `word-backend/manifest.xml`

## 🔐 SSL Certificate Notes

- **Development:** Self-signed certificates are fine
- **Production:** Use certificates from a trusted CA (Let's Encrypt, etc.)
- **Browser Warning:** You'll need to accept the self-signed certificate in your browser
- **Word:** May require trusting the certificate in Windows Certificate Store

### Trusting Certificate on Windows

1. Open `cert.pem` in a text editor
2. Copy the certificate content (including `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`)
3. Save as `cert.crt`
4. Double-click `cert.crt` → Install Certificate → Local Machine → Place all certificates in the following store → Trusted Root Certification Authorities

## 🐛 Troubleshooting

### Port Already in Use

If port 3000 is already in use:
- Change `PORT` in `server.js`
- Or stop the process using port 3000:
  ```bash
  # Linux/Mac
  lsof -ti:3000 | xargs kill -9
  
  # Windows
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  ```

### Frontend Not Loading

1. **Check if frontend is built:**
   ```bash
   ls ../vite-project/dist
   ```

2. **Rebuild frontend:**
   ```bash
   cd ../vite-project
   npm run build
   ```

3. **Check server logs** for asset path errors

### Certificate Errors

- Ensure `ssl/key.pem` and `ssl/cert.pem` exist
- Regenerate certificates: `npm run generate-ssl`
- Clear browser cache and restart browser
- Trust the certificate in Windows Certificate Store (see above)

### Add-in Not Loading in Word

1. **Check server is running:** Visit https://localhost:3000 in browser
2. **Check manifest URL:** Ensure all URLs in `manifest.xml` use `https://localhost:3000`
3. **Check browser console:** Open Word → File → Options → Trust Center → Trust Center Settings → Trusted Add-in Catalogs
4. **Verify Office.js loads:** Check browser DevTools Network tab when opening taskpane

## 📝 Development Workflow

1. **Make frontend changes:**
   ```bash
   cd ../vite-project
   npm run dev  # Development server on port 5173
   ```

2. **Build for production:**
   ```bash
   npm run build
   ```

3. **Restart backend** (if needed):
   ```bash
   cd ../word-backend
   npm start
   ```

4. **Reload add-in in Word** (may need to remove and re-upload manifest)

## 🔄 Production Deployment

For production:

1. **Replace self-signed certificates** with trusted SSL certificates
2. **Update `manifest.xml`** URLs to production domain
3. **Replace placeholder icons** with actual icon files
4. **Set up proper domain** (e.g., `https://yourdomain.com`)
5. **Configure reverse proxy** (nginx, Apache) if needed
6. **Set up CI/CD** for automated builds and deployments

## 📚 Additional Resources

- [Office Add-ins Documentation](https://docs.microsoft.com/en-us/office/dev/add-ins/)
- [Word Add-in Development](https://docs.microsoft.com/en-us/office/dev/add-ins/word/word-add-ins-programming-overview)
- [Office.js API Reference](https://docs.microsoft.com/en-us/javascript/api/overview/office)

## 📄 License

MIT

