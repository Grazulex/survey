/**
 * BNP Paribas Fortis Survey - Session Control
 * Ensures each person can only vote once during a session
 */

const SessionControl = {
  /**
   * Check if user has already voted in this session
   */
  hasVoted() {
    const voted = sessionStorage.getItem('survey_voted');
    return voted === 'true';
  },

  /**
   * Mark user as having voted
   */
  markAsVoted() {
    sessionStorage.setItem('survey_voted', 'true');
    sessionStorage.setItem('survey_voted_timestamp', new Date().toISOString());
  },

  /**
   * Clear voting status (admin only)
   */
  clearVotingStatus() {
    sessionStorage.removeItem('survey_voted');
    sessionStorage.removeItem('survey_voted_timestamp');
  },

  /**
   * Check voting status and redirect if already voted
   */
  enforceOneVotePerSession() {
    if (this.hasVoted()) {
      // User has already voted in this session
      this.showAlreadyVotedMessage();
      return false;
    }
    return true;
  },

  /**
   * Show "already voted" message
   */
  showAlreadyVotedMessage() {
    const form = document.getElementById('surveyForm');
    const successCard = document.getElementById('successMessage');

    if (form) form.classList.add('hidden');

    if (successCard) {
      successCard.classList.remove('hidden');

      const title = successCard.querySelector('.success-title');
      const description = successCard.querySelector('.success-description');
      const actions = successCard.querySelector('.success-actions');

      if (title) {
        title.textContent = 'You have already voted';
      }

      if (description) {
        description.textContent = 'Thank you! You have already submitted your response in this session. Each person can only vote once.';
      }

      if (actions) {
        actions.innerHTML = '<a href="results.html" class="btn btn-primary">View Results</a>';
      }
    }
  },

  /**
   * Generate a unique session code (for manual distribution)
   */
  generateSessionCode() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  },

  /**
   * Validate session code (if using codes)
   */
  validateSessionCode(code) {
    // Get list of valid codes from config
    const validCodes = this.getValidCodes();
    return validCodes.includes(code.toUpperCase());
  },

  /**
   * Get valid session codes (can be customized)
   */
  getValidCodes() {
    // Load from config or generate
    const codes = sessionStorage.getItem('session_codes');
    if (codes) {
      return JSON.parse(codes);
    }
    return [];
  },

  /**
   * Mark a code as used
   */
  markCodeAsUsed(code) {
    const usedCodes = JSON.parse(sessionStorage.getItem('used_codes') || '[]');
    usedCodes.push(code.toUpperCase());
    sessionStorage.setItem('used_codes', JSON.stringify(usedCodes));
  },

  /**
   * Check if code has been used
   */
  isCodeUsed(code) {
    const usedCodes = JSON.parse(sessionStorage.getItem('used_codes') || '[]');
    return usedCodes.includes(code.toUpperCase());
  }
};

// Export
if (typeof window !== 'undefined') {
  window.SessionControl = SessionControl;
}
