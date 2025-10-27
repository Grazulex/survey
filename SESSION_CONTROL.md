# 🔒 Session Control - One Vote Per Person

## The Challenge

During a discussion session, you want to ensure each participant votes only once. Here are several solutions depending on your context.

---

## ✅ Solution 1: SessionStorage (RECOMMENDED - Simple)

**Best for**: In-person sessions, meeting rooms, same-day discussions

### How it Works
- Uses browser's `sessionStorage` instead of `localStorage`
- Data is cleared when browser tab/window is closed
- Each person gets one vote per browser session
- No internet or backend required

### Pros
✅ Very simple to implement
✅ No infrastructure needed
✅ Works offline
✅ Automatic cleanup (closes with browser)
✅ Perfect for same-day sessions

### Cons
❌ Can be bypassed by:
  - Opening private/incognito window
  - Using different browser
  - Clearing browser data

### Implementation

**Already included in**: `js/session-control.js`

Add to `index.html` before `</head>`:
```html
<script src="js/session-control.js"></script>
```

Modify `js/survey.js` - add at the top of `initializeSurvey()`:
```javascript
// Check if user already voted in this session
if (!SessionControl.enforceOneVotePerSession()) {
  return; // Stop initialization
}
```

After successful submission in `displaySuccessMessage()`:
```javascript
// Mark user as voted
SessionControl.markAsVoted();
```

---

## 🎫 Solution 2: Unique Access Codes (RECOMMENDED - Secure)

**Best for**: Controlled distribution, known participants, formal sessions

### How it Works
1. Before session: Generate unique codes (one per participant)
2. Distribute codes (email, printed cards, QR codes)
3. Participants enter code to access survey
4. Code is marked as "used" after submission
5. Used codes cannot be reused

### Pros
✅ Most secure method
✅ Tracks who voted (optional)
✅ Can't be easily bypassed
✅ Works across devices
✅ Audit trail available

### Cons
❌ Requires preparation (generating codes)
❌ Extra step for participants
❌ More complex to implement

### Implementation Example

**Create codes** (run before session):
```javascript
// Generate 50 codes
const codes = [];
for (let i = 0; i < 50; i++) {
  codes.push(SessionControl.generateSessionCode());
}
console.log(codes);
```

**Add code validation** to survey:
```html
<!-- Add before questions -->
<div id="codeEntry" class="card">
  <h2>Access Code</h2>
  <p>Enter your unique access code to participate:</p>
  <input type="text" id="accessCode" placeholder="Enter code">
  <button onclick="validateCode()">Continue</button>
</div>
```

---

## 📱 Solution 3: Device Fingerprinting (ADVANCED)

**Best for**: Open sessions, large groups, anonymous surveys

### How it Works
- Creates a "fingerprint" of the device/browser
- Based on: browser version, screen size, timezone, etc.
- Stores fingerprint with vote
- Blocks duplicate fingerprints

### Pros
✅ No user action required
✅ Works across sessions
✅ Anonymous
✅ Relatively secure

### Cons
❌ Requires JavaScript library (FingerprintJS)
❌ Not 100% unique (false positives possible)
❌ Privacy concerns
❌ Can be bypassed with VPN/different browser

### Implementation
Requires external library - see DEPLOYMENT.md for details.

---

## 🖥️ Solution 4: Kiosk Mode (PHYSICAL CONTROL)

**Best for**: In-person meetings with one shared device

### How it Works
1. One device (tablet/laptop) placed in meeting room
2. Each person votes on same device
3. After each vote, reset for next person
4. Physical control ensures one vote each

### Pros
✅ 100% effective (physical control)
✅ No technical bypassing possible
✅ Simple for participants
✅ No codes needed

### Cons
❌ Requires dedicated device
❌ Takes time (sequential voting)
❌ Not suitable for large groups
❌ Requires facilitator

### Implementation
Add "Next Person" button after submission:
```javascript
// After showing success message
setTimeout(() => {
  SessionControl.clearVotingStatus();
  location.reload();
}, 10000); // 10 seconds to read message
```

---

## 🌐 Solution 5: Backend Authentication (ROBUST)

**Best for**: Multi-session campaigns, formal voting, audit requirements

### How it Works
- Add backend server (Node.js, PHP, Python)
- User authentication (SSO, email, employee ID)
- Backend tracks who voted in database
- Most secure and auditable

### Pros
✅ Most secure
✅ Full audit trail
✅ Can track demographics
✅ Works across devices and sessions
✅ Can't be bypassed

### Cons
❌ Requires backend development
❌ Requires database
❌ Requires hosting infrastructure
❌ Not anonymous
❌ GDPR considerations

### Not Included
This changes the architecture significantly. See DEPLOYMENT.md for backend options.

---

## 📊 Comparison Table

| Solution | Security | Setup | Anonymity | Works Offline |
|----------|----------|-------|-----------|---------------|
| SessionStorage | Low-Medium | ⭐⭐⭐⭐⭐ Easy | ✅ Yes | ✅ Yes |
| Access Codes | High | ⭐⭐⭐ Moderate | ✅ Yes* | ✅ Yes |
| Device Fingerprint | Medium | ⭐⭐ Complex | ✅ Yes | ✅ Yes |
| Kiosk Mode | Very High | ⭐⭐⭐⭐ Easy | ✅ Yes | ✅ Yes |
| Backend Auth | Very High | ⭐ Very Complex | ❌ No | ❌ No |

*With anonymous codes

---

## 💡 Recommendation for Your Use Case

**Context**: Discussion session about Kata usage with recruiters/team leaders

### Best Solution: **SessionStorage** (Solution 1)

**Why?**
1. **Same-day session**: People won't come back in new browser
2. **Small group**: Easier to monitor
3. **Discussion context**: Trust-based environment
4. **No preparation**: Works immediately
5. **Simple**: No complexity for participants

### Implementation Steps

1. Add `session-control.js` to `index.html`:
```html
<script src="js/session-control.js"></script>
```

2. Modify `survey.js` (2 places):
   - Check at start
   - Mark after submission

3. Test:
   - Submit survey
   - Try to submit again → Blocked
   - Close browser
   - Reopen → Can vote again (new session)

### Alternative: **Kiosk Mode** (If one shared device)

If everyone votes on same tablet/laptop in the room:
- Physical control guarantees one vote
- Reset between participants
- Simplest for small groups

---

## 🔧 Quick Implementation

Want to add SessionStorage control right now?

### Step 1: Add Script
```bash
# Script already created: js/session-control.js
```

### Step 2: Modify index.html
Add before closing `</head>`:
```html
<script src="js/session-control.js"></script>
```

### Step 3: Modify survey.js

At line 24 (in `initializeSurvey()`), add:
```javascript
function initializeSurvey() {
  // Check if already voted
  if (!SessionControl.enforceOneVotePerSession()) {
    return;
  }

  // ... rest of existing code
}
```

At line ~350 (in `displaySuccessMessage()`), add:
```javascript
function displaySuccessMessage() {
  // Mark as voted
  SessionControl.markAsVoted();

  // ... rest of existing code
}
```

### Step 4: Test
1. Open survey
2. Complete and submit
3. Try to access again
4. Should show "already voted" message

---

## 🎯 Summary

**For your discussion session:**

✅ Use **SessionStorage** (Solution 1)
- Already implemented in `session-control.js`
- Just add 3 lines of code
- Works perfectly for discussion context
- No prep needed

**Result**: Each person can vote once per browser session. Perfect for a 1-2 hour discussion meeting.

**Need more security?** Consider Solution 2 (Access Codes) for formal sessions.

---

**File**: `js/session-control.js` (already created)
**Documentation**: This file
**Status**: Ready to integrate
