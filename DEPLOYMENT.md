# 🚀 Deployment Guide - BNP Paribas Fortis Kata Survey

## Quick Deploy Checklist

- [ ] Test locally
- [ ] Verify all files are present
- [ ] Configure paths if needed
- [ ] Upload to web server
- [ ] Test on production
- [ ] Verify mobile responsiveness
- [ ] Test data persistence
- [ ] Configure security (if needed)

---

## Deployment Methods

### Method 1: Simple Static Hosting (Recommended)

The survey is a **static web application** with no backend requirements.

#### Compatible Platforms
- ✅ GitHub Pages
- ✅ Netlify
- ✅ Vercel
- ✅ AWS S3 + CloudFront
- ✅ Azure Static Web Apps
- ✅ Firebase Hosting
- ✅ Any web server (Apache, Nginx, IIS)

#### Requirements
- Web server capable of serving HTML/CSS/JS
- HTTPS recommended (but not required)
- No database needed
- No server-side code
- No build process required

---

## Step-by-Step Deployment

### Option A: GitHub Pages

1. **Create GitHub Repository**
```bash
cd /path/to/survey
git init
git add .
git commit -m "Initial commit: BNP Kata Survey"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kata-survey.git
git push -u origin main
```

2. **Enable GitHub Pages**
- Go to repository Settings
- Navigate to "Pages"
- Source: Deploy from branch
- Branch: `main` / `root`
- Click Save

3. **Access Your Site**
- URL: `https://YOUR_USERNAME.github.io/kata-survey/`
- Wait 2-3 minutes for deployment

**Custom Domain** (Optional)
- Add `CNAME` file with your domain
- Configure DNS records
- Enable HTTPS in GitHub Pages settings

---

### Option B: Netlify

1. **Install Netlify CLI** (Optional)
```bash
npm install -g netlify-cli
```

2. **Deploy via Drag & Drop**
- Go to https://app.netlify.com/drop
- Drag the entire `/survey` folder
- Done! Get instant URL

3. **Deploy via CLI**
```bash
cd /path/to/survey
netlify deploy --prod
```

4. **Deploy via Git**
- Connect GitHub repository
- Build command: (leave empty)
- Publish directory: `/`
- Auto-deploys on push

**Configuration**: No `netlify.toml` needed (pure static site)

---

### Option C: Traditional Web Server

#### Apache

1. **Upload Files**
```bash
# Via SCP
scp -r /path/to/survey/* user@server:/var/www/html/survey/

# Via SFTP
# Use FileZilla, Cyberduck, or WinSCP
```

2. **Configure Apache** (Optional)
Create `.htaccess`:
```apache
# Enable HTTPS redirect
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Enable GZIP compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json
</IfModule>

# Set cache headers
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType image/png "access plus 1 year"
</IfModule>

# Security headers
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
```

3. **Set Permissions**
```bash
chmod 755 /var/www/html/survey
chmod 644 /var/www/html/survey/*
```

#### Nginx

1. **Upload Files**
```bash
scp -r /path/to/survey/* user@server:/usr/share/nginx/html/survey/
```

2. **Configure Nginx**
Edit `/etc/nginx/sites-available/default`:
```nginx
server {
    listen 80;
    server_name survey.example.com;

    root /usr/share/nginx/html/survey;
    index index.html;

    # Enable GZIP
    gzip on;
    gzip_types text/css application/javascript application/json;
    gzip_min_length 1000;

    # Cache static assets
    location ~* \.(css|js|png|jpg|jpeg|gif|svg|ico)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Content-Type-Options "nosniff";
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";

    # Main location
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

3. **Test and Reload**
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## Post-Deployment Checklist

### 1. Functional Testing

**Test Each Page**
- [ ] `index.html` loads correctly
- [ ] Logo displays
- [ ] All 5 questions appear
- [ ] Can select options (single and multiple choice)
- [ ] Progress bar updates
- [ ] Form validation works
- [ ] Can submit survey
- [ ] Success message displays

- [ ] `results.html` loads
- [ ] Shows "No data" message initially
- [ ] After submitting survey, results appear
- [ ] Charts render correctly (requires internet for Chart.js CDN)
- [ ] Export button works

- [ ] `admin.html` loads
- [ ] Statistics display
- [ ] Export JSON works
- [ ] Export CSV works
- [ ] Delete data works (with confirmation)

### 2. Cross-Browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### 3. Mobile Responsiveness

**Test on Multiple Devices**
- [ ] iPhone (375px width)
- [ ] Android phone (360px width)
- [ ] iPad (768px width)
- [ ] Small mobile (320px width)

**Check:**
- [ ] Text is readable without zooming
- [ ] Buttons are easy to tap
- [ ] Logo scales properly
- [ ] Charts are visible and interactive
- [ ] No horizontal scrolling
- [ ] Forms are easy to fill

### 4. Performance Testing

**Load Times** (Target: < 2 seconds)
- [ ] index.html: Fast
- [ ] results.html: Fast (Chart.js from CDN may add ~500ms)
- [ ] Images load quickly

**Optimization Tips**
- Compress logo image if > 100KB
- Use GZIP compression on server
- Enable browser caching
- Consider hosting Chart.js locally (optional)

### 5. Data Persistence Testing

- [ ] Submit a survey
- [ ] Refresh the page
- [ ] Check results page - data persists
- [ ] Close browser completely
- [ ] Reopen and check - data persists
- [ ] Test in private/incognito mode
  - Expected: Data does NOT persist (LocalStorage is session-only)

---

## Security Considerations

### Current Security Level: Basic

**What's Included:**
- ✅ No server-side code (reduces attack surface)
- ✅ No database (no SQL injection risk)
- ✅ No user authentication (no password breaches)
- ✅ Client-side only (data stays local)

**What's NOT Included:**
- ❌ No admin authentication
- ❌ No CSRF protection (not needed for local storage)
- ❌ No rate limiting
- ❌ No server-side validation

### Security Enhancements (Optional)

#### 1. Protect Admin Panel

**Option A: HTTP Basic Auth (Apache)**
Create `.htpasswd`:
```bash
htpasswd -c /etc/apache2/.htpasswd admin
```

Add to `.htaccess` or Apache config:
```apache
<Files "admin.html">
    AuthType Basic
    AuthName "Admin Area"
    AuthUserFile /etc/apache2/.htpasswd
    Require valid-user
</Files>
```

**Option B: HTTP Basic Auth (Nginx)**
Create password file:
```bash
htpasswd -c /etc/nginx/.htpasswd admin
```

Add to Nginx config:
```nginx
location = /admin.html {
    auth_basic "Admin Area";
    auth_basic_user_file /etc/nginx/.htpasswd;
}
```

**Option C: IP Whitelist**
Allow only specific IPs to access admin panel:

Apache:
```apache
<Files "admin.html">
    Order Deny,Allow
    Deny from all
    Allow from 192.168.1.0/24
    Allow from 10.0.0.5
</Files>
```

Nginx:
```nginx
location = /admin.html {
    allow 192.168.1.0/24;
    allow 10.0.0.5;
    deny all;
}
```

#### 2. Enable HTTPS

**Let's Encrypt (Free)**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-apache

# Get certificate
sudo certbot --apache -d survey.example.com

# Auto-renewal (already configured by certbot)
sudo certbot renew --dry-run
```

#### 3. Add Content Security Policy

Add to HTML `<head>` or server headers:
```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
               style-src 'self' 'unsafe-inline';
               img-src 'self' data:;">
```

---

## Scaling Considerations

### Current Capacity
- **Users**: Unlimited (static site)
- **Responses**: Limited by browser LocalStorage (~5-10MB)
- **Estimated**: ~10,000 responses before hitting limits

### Storage Limits

**LocalStorage Capacity**
- Most browsers: 5-10MB
- Each response: ~500 bytes
- Theoretical max: 10,000-20,000 responses

**When You Hit Limits**
Users will see errors when LocalStorage is full.

### Solutions for High Volume

#### Option 1: Periodic Data Export
1. Export data regularly (weekly/monthly)
2. Delete old data from LocalStorage
3. Archive exported files

#### Option 2: Add Backend (Major Change)
If you need:
- Centralized data storage
- Cross-device access
- Analytics
- More than 10,000 responses

Consider adding:
- Backend API (Node.js, Python, PHP)
- Database (MongoDB, PostgreSQL, MySQL)
- Cloud storage (AWS S3, Google Cloud Storage)

**Recommended Stack:**
- Frontend: Keep existing HTML/CSS/JS
- Backend: Node.js + Express
- Database: MongoDB (flexible schema for survey data)
- Hosting: Heroku, DigitalOcean, AWS

---

## Monitoring & Maintenance

### What to Monitor

**User-Facing Issues**
- Page load errors (404, 500)
- JavaScript errors (check browser console)
- Chart.js CDN availability
- LocalStorage quota errors

**Performance**
- Page load times
- Time to interactive
- Chart rendering speed

### Maintenance Tasks

**Weekly**
- [ ] Check for user-reported issues
- [ ] Verify all pages load correctly
- [ ] Test survey submission

**Monthly**
- [ ] Review and export survey data
- [ ] Check LocalStorage usage (Admin Panel)
- [ ] Update browser compatibility list
- [ ] Review and respond to feedback

**Yearly**
- [ ] Update Chart.js version (check for breaking changes)
- [ ] Review and update survey questions
- [ ] Security audit
- [ ] Performance optimization

---

## Backup Strategy

### What to Backup

**Critical Files**
- All HTML files
- All CSS files
- All JavaScript files
- Configuration files (manifest.json)
- Logo and assets

**Survey Data**
Data is stored in browser LocalStorage (not on server).

**Backup Options:**
1. **Manual Export**
   - Users export via Admin Panel
   - Save JSON/CSV files

2. **Automated Export Script**
   Create a reminder/script to export data regularly

3. **Browser Extension**
   Use extensions like "LocalStorage Manager" to backup LocalStorage data

### Version Control

**Use Git**
```bash
git init
git add .
git commit -m "Survey version 1.0.0"
git tag v1.0.0
git push origin main --tags
```

**Recommended Workflow:**
- Main branch: Production-ready code
- Dev branch: Testing and development
- Feature branches: For new features
- Tags: For version releases

---

## Troubleshooting Deployment

### Common Issues

#### 1. Charts Not Showing
**Problem**: Chart.js not loading

**Solution:**
- Check internet connection
- Verify CDN URL: `https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js`
- Check browser console for errors
- Consider hosting Chart.js locally

#### 2. Styles Not Loading
**Problem**: Page looks broken

**Solution:**
- Verify all CSS files uploaded
- Check file paths (relative vs absolute)
- Verify MIME types:
  - CSS: `text/css`
  - JS: `application/javascript`
  - PNG: `image/png`

#### 3. Logo Not Displaying
**Problem**: BNP logo missing

**Solution:**
- Verify file exists: `assets/images/bnp-paribas-fortis-logo.png`
- Check file permissions (644)
- Verify path in HTML files

#### 4. Survey Won't Submit
**Problem**: Errors on submission

**Solution:**
- Open browser console (F12)
- Check for JavaScript errors
- Verify all JS files are loaded
- Test in different browser

---

## Rollback Plan

### If Something Goes Wrong

1. **Keep Previous Version**
   - Always keep a backup of the previous working version
   - Use Git tags for version control

2. **Quick Rollback**
   ```bash
   # If using Git
   git checkout v1.0.0

   # Re-upload to server
   scp -r * user@server:/var/www/html/survey/
   ```

3. **Emergency Contact**
   - Document who to contact for hosting issues
   - Keep server credentials secure but accessible

---

## Going Live Checklist

**Pre-Launch**
- [ ] All files uploaded
- [ ] All pages tested
- [ ] Mobile tested
- [ ] Cross-browser tested
- [ ] Logo displays correctly
- [ ] Charts work properly
- [ ] Forms submit successfully
- [ ] Data persists after refresh
- [ ] Export functions work
- [ ] Admin panel protected (if needed)

**Launch**
- [ ] Announce to users
- [ ] Provide survey URL
- [ ] Share user guide
- [ ] Monitor for issues

**Post-Launch**
- [ ] Check first submissions
- [ ] Verify data collection
- [ ] Monitor performance
- [ ] Collect user feedback

---

## Support & Contact

**Documentation**
- USER_GUIDE.md - End-user instructions
- README.md - Developer documentation
- .claude/claude.md - Project specifications

**Technical Support**
- BNP Paribas Fortis IT Department
- Check browser console for errors
- Review this deployment guide

---

**Last Updated**: 2025-10-27
**Version**: 1.0.0
**Deployment Status**: Ready for Production ✅
