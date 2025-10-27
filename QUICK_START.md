# 🚀 Quick Start Guide

## Instant Setup (30 seconds)

### 1. Start the Server
```bash
./start-server.sh
```
Or manually:
```bash
python3 -m http.server 8080
```

### 2. Open Your Browser
Navigate to: **http://localhost:8080/index.html**

### 3. You're Ready! 🎉

---

## Test the Application

### Take the Survey
1. Go to http://localhost:8080/index.html
2. Answer the 5 questions about Kata
3. Click "Submit Survey"
4. See success message

### View Results
1. Go to http://localhost:8080/results.html
2. See beautiful charts with your responses
3. Click "Export Data" to download

### Admin Panel
1. Go to http://localhost:8080/admin.html
2. View statistics
3. Export data (JSON/CSV)
4. Delete data (with confirmation)

---

## Customize Questions

Edit `js/config.js` and change the questions:

```javascript
questions: [
  {
    id: "q1",
    text: "Your question here?",
    type: "single", // or "multiple"
    required: true,
    options: [
      { id: "opt1", text: "Option 1", value: "option1" },
      // ...
    ]
  }
]
```

---

## Customize Colors

Edit `css/style.css` and change CSS variables:

```css
:root {
  --color-primary: #008755;  /* Your color */
  --color-primary-dark: #007348;
  /* ... */
}
```

---

## Deploy to Production

### Option 1: GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
# Enable GitHub Pages in repository settings
```

### Option 2: Netlify
- Go to https://app.netlify.com/drop
- Drag the entire folder
- Done! Get instant URL

### Option 3: Your Web Server
```bash
# Upload all files to your web server
scp -r * user@server:/var/www/html/survey/
```

---

## Need Help?

- **User Guide**: `USER_GUIDE.md` (comprehensive manual)
- **Deployment**: `DEPLOYMENT.md` (detailed instructions)
- **Developer Docs**: `README.md` (customization guide)
- **Project Overview**: `PROJECT_SUMMARY.md` (complete specs)

---

## Quick Commands

```bash
# Start server
./start-server.sh

# Or manually with Python
python3 -m http.server 8080

# Or with Node.js
npx serve -p 8080

# Or with PHP
php -S localhost:8080
```

---

**That's it!** You're ready to go. 🚀

For more details, see the complete documentation in `USER_GUIDE.md`.
