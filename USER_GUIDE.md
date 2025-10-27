# 📖 User Guide - BNP Paribas Fortis Kata Survey

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Taking the Survey](#taking-the-survey)
4. [Viewing Results](#viewing-results)
5. [Admin Panel](#admin-panel)
6. [Mobile Usage](#mobile-usage)
7. [Troubleshooting](#troubleshooting)
8. [Privacy & Data](#privacy--data)

---

## Introduction

Welcome to the BNP Paribas Fortis Kata Survey! This application allows you to share your experience with coding Kata in recruitment processes and view aggregated results.

### What is a Kata?
A Kata is a coding exercise used during technical interviews to evaluate programming skills, problem-solving abilities, and code quality.

### Survey Purpose
This survey gathers feedback about:
- Experience with Kata assessments
- Effectiveness of Kata for technical evaluation
- Preferred assessment formats
- Challenges encountered

---

## Getting Started

### Access the Application

**Option 1: Local Development**
```bash
cd /path/to/survey
python3 -m http.server 8080
```
Then open: `http://localhost:8080`

**Option 2: Web Server**
Upload all files to your web server and access via your domain.

### System Requirements
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- JavaScript enabled
- LocalStorage enabled (for data persistence)
- Screen resolution: 320px minimum width

### Mobile Installation (PWA)
On mobile devices, you can "Add to Home Screen" for a native app-like experience:

**iOS (Safari)**
1. Tap the Share button
2. Scroll and tap "Add to Home Screen"
3. Tap "Add"

**Android (Chrome)**
1. Tap the menu (⋮)
2. Tap "Add to Home Screen"
3. Tap "Add"

---

## Taking the Survey

### Step-by-Step Instructions

#### 1. Access the Survey
Navigate to `index.html` or the survey homepage.

#### 2. Read the Questions
The survey contains 5 questions about Kata in recruitment:

- **Question 1**: Your experience with Kata (single choice)
- **Question 2**: Effectiveness rating (single choice)
- **Question 3**: Most valuable aspects (multiple choice)
- **Question 4**: Preferred assessment format (single choice)
- **Question 5**: Challenges encountered (multiple choice, optional)

#### 3. Answer Questions

**Single Choice Questions**
- Click on one option to select it
- The selected option will be highlighted in green
- You can change your answer by clicking a different option

**Multiple Choice Questions**
- Click on as many options as you want
- Each selected option will show a checkmark
- Click again to deselect

#### 4. Monitor Your Progress
- A progress bar at the bottom shows your completion percentage
- The percentage updates as you answer questions

#### 5. Submit Your Answers
- Click the "Submit Survey" button
- If required questions are missing, you'll see error messages
- Once submitted, you'll see a success message

#### 6. After Submission
You can:
- View the aggregated results
- Take the survey again (creates a new response)

### Tips
- ⏱️ Takes only 2 minutes to complete
- 📱 Works perfectly on mobile devices
- 💾 Your progress is saved automatically (if you refresh accidentally)
- ✅ 4 questions are required, 1 is optional

---

## Viewing Results

### Access Results Page
Click "View Results" from any page or navigate to `results.html`.

### Understanding the Results

#### Statistics Overview
At the top, you'll see:
- **Total Responses**: Number of people who completed the survey
- **Last Updated**: Date of the most recent response
- **Completion Rate**: Percentage of surveys completed (always 100% for submitted surveys)

#### Question Results

Each question displays:
- **Question text** with question number
- **Chart visualization**
  - Pie charts for single-choice questions
  - Bar charts for multiple-choice questions
- **Percentage breakdown** for each option

#### Chart Interactions
- Hover over chart segments to see exact numbers and percentages
- Charts use BNP Paribas Fortis brand colors
- Responsive design adapts to your screen size

### Exporting Data
Click "Export Data" to download results as JSON format.

### Printing Results
Click "Print Results" to generate a printer-friendly version.

---

## Admin Panel

### Access Admin Panel
Navigate to `admin.html`.

**⚠️ Important**: This panel is accessible to anyone with the URL. For production use, add authentication.

### Features

#### Survey Information
View key metrics:
- Total number of responses
- Storage size (KB)
- Last response timestamp
- Survey version

#### Data Management

**Export Options**
- **Export as JSON**: Downloads all data in JSON format
  - Includes all responses with timestamps
  - Best for data analysis or backup

- **Export as CSV**: Downloads data in spreadsheet format
  - Opens in Excel or Google Sheets
  - One row per response
  - Columns: Response ID, Timestamp, and each question

**View Results**
Quick link to the results page.

#### Danger Zone

**Delete All Data**
- Permanently removes all survey responses
- Requires double confirmation
- Cannot be undone
- Use for testing or to start fresh

**⚠️ Warning**: This action deletes all data from LocalStorage. There is no way to recover deleted data.

---

## Mobile Usage

### Optimized for Mobile

The survey is **mobile-first**, meaning it's designed primarily for smartphones:

#### Features
- ✅ Large touch targets (easy to tap)
- ✅ Readable text (no zooming needed)
- ✅ Vertical scrolling (natural mobile interaction)
- ✅ Fast loading (minimal data usage)
- ✅ Works offline (once loaded)

#### Best Practices
- Use portrait orientation for the survey
- Landscape works well for viewing results
- Charts are fully interactive on touch devices

#### Supported Resolutions
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px and above

### Offline Capability
Once the page is loaded:
- You can complete the survey offline
- Data is saved locally
- No internet connection required for submission
- Internet needed only for initial load and viewing external resources

---

## Troubleshooting

### Common Issues

#### Survey Won't Submit
**Problem**: Error messages appear when clicking "Submit Survey"

**Solutions**:
1. Check all required questions are answered (marked with "Required")
2. For multiple-choice questions, select at least one option
3. Scroll up to see specific error messages
4. Ensure JavaScript is enabled in your browser

#### Results Not Showing
**Problem**: "No Survey Data Yet" message appears

**Solutions**:
1. Complete at least one survey first
2. Check if LocalStorage is enabled
3. Try a different browser
4. Clear browser cache and try again

#### Progress Bar Not Updating
**Problem**: Progress stays at 0% or doesn't move

**Solutions**:
1. Ensure JavaScript is enabled
2. Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)
3. Check browser console for errors (F12)

#### Can't Export Data
**Problem**: Export buttons don't work

**Solutions**:
1. Ensure pop-ups are not blocked
2. Check if LocalStorage has data
3. Try a different browser
4. Check file download permissions

#### Charts Not Displaying
**Problem**: Charts don't appear on results page

**Solutions**:
1. Check internet connection (Chart.js loads from CDN)
2. Wait a few seconds for charts to render
3. Try refreshing the page
4. Ensure JavaScript is enabled

### Browser Compatibility

**Fully Supported**
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- Opera 76+ ✅

**Limited Support**
- Internet Explorer: ❌ Not supported
- Older browsers: May have visual or functional issues

### Clearing Data

If you encounter persistent issues:

1. **Clear Survey Data Only**
   - Go to Admin Panel
   - Click "Delete All Data"
   - Confirm twice

2. **Clear Browser Cache**
   - Chrome: Settings > Privacy > Clear browsing data
   - Firefox: Options > Privacy > Clear Data
   - Safari: Preferences > Privacy > Manage Website Data

---

## Privacy & Data

### Data Storage

**Where is data stored?**
- All data is stored in your browser's **LocalStorage**
- Data never leaves your device
- No data is sent to external servers
- No analytics or tracking

**What data is collected?**
- Your survey answers
- Timestamp of submission
- Unique response ID (randomly generated)

**What data is NOT collected?**
- ❌ No personal information
- ❌ No email addresses
- ❌ No IP addresses
- ❌ No tracking cookies
- ❌ No browser fingerprinting

### Data Security

**Protection**
- Data is stored locally only
- No transmission over networks
- No third-party access
- No cloud backups

**Limitations**
- Data can be lost if you:
  - Clear browser data
  - Use private/incognito mode
  - Uninstall the browser
  - Delete LocalStorage

### Data Control

**You have full control:**
- ✅ View all responses (Admin Panel)
- ✅ Export data anytime (JSON/CSV)
- ✅ Delete all data anytime (Admin Panel)
- ✅ No account required

### GDPR Compliance

This application:
- ✅ Stores data locally only
- ✅ Allows full data export
- ✅ Allows complete data deletion
- ✅ Collects no personal data
- ✅ Requires no consent (anonymous survey)

---

## Support

### Getting Help

**Documentation**
- User Guide (this file)
- README.md (developer documentation)
- .claude/claude.md (project specifications)

**Technical Issues**
- Check browser console (F12) for error messages
- Review Troubleshooting section above
- Test in a different browser

### Feedback

This is an internal survey tool. For questions or improvements:
- Contact BNP Paribas Fortis IT department
- Review the project documentation
- Check the Backmark task board for known issues

---

## Quick Reference

### Survey Flow
1. Open `index.html`
2. Read and answer 5 questions
3. Watch progress bar
4. Click "Submit Survey"
5. View success message
6. Optional: View results

### Keyboard Shortcuts
- **Tab**: Navigate between options
- **Space**: Select/deselect option
- **Enter**: Submit form (when on submit button)

### File Structure
```
/survey
├── index.html       # Main survey page
├── results.html     # Results and charts
├── admin.html       # Admin panel
├── manifest.json    # PWA configuration
├── css/             # Stylesheets
├── js/              # JavaScript files
└── assets/          # Images and icons
```

### Color Codes (BNP Paribas Fortis)
- Primary Green: `#008755`
- Dark Green: `#007348`
- Light Green: `#39A87B`
- Accent: `#6ABB97`, `#8BC8AA`

---

**Last Updated**: 2025-10-27
**Version**: 1.0.0
**Developed for**: BNP Paribas Fortis
