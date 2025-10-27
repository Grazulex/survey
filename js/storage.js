/**
 * BNP Paribas Fortis Survey - Storage Module
 * Handles data persistence using LocalStorage
 */

const SurveyStorage = {
  /**
   * Get the storage key from config
   */
  getStorageKey() {
    return SURVEY_CONFIG.storage.key;
  },

  /**
   * Initialize storage structure if it doesn't exist
   */
  initStorage() {
    const key = this.getStorageKey();
    const existing = localStorage.getItem(key);

    if (!existing) {
      const initialData = {
        responses: [],
        stats: {
          totalResponses: 0,
          lastUpdated: null
        },
        version: SURVEY_CONFIG.storage.version
      };
      localStorage.setItem(key, JSON.stringify(initialData));
      console.log('Storage initialized');
    }
  },

  /**
   * Get all data from storage
   */
  getAllData() {
    this.initStorage();
    const key = this.getStorageKey();
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },

  /**
   * Save a new response
   */
  saveResponse(response) {
    const data = this.getAllData();

    // Add response
    data.responses.push(response);

    // Update stats
    data.stats.totalResponses = data.responses.length;
    data.stats.lastUpdated = response.timestamp;

    // Save back to storage
    const key = this.getStorageKey();
    localStorage.setItem(key, JSON.stringify(data));

    console.log('Response saved. Total responses:', data.stats.totalResponses);
    return true;
  },

  /**
   * Get all responses
   */
  getAllResponses() {
    const data = this.getAllData();
    return data ? data.responses : [];
  },

  /**
   * Get statistics
   */
  getStats() {
    const data = this.getAllData();
    return data ? data.stats : { totalResponses: 0, lastUpdated: null };
  },

  /**
   * Clear all data
   */
  clearAllData() {
    const key = this.getStorageKey();
    localStorage.removeItem(key);
    this.initStorage();
    console.log('All data cleared');
    return true;
  },

  /**
   * Export data as JSON
   */
  exportAsJSON() {
    const data = this.getAllData();
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `survey-data-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log('Data exported as JSON');
  },

  /**
   * Export data as CSV
   */
  exportAsCSV() {
    const responses = this.getAllResponses();

    if (responses.length === 0) {
      alert('No data to export');
      return;
    }

    // Build CSV
    let csv = 'Response ID,Timestamp';

    // Add question columns
    SURVEY_CONFIG.questions.forEach(question => {
      csv += `,${question.text.replace(/,/g, ';')}`;
    });
    csv += '\n';

    // Add data rows
    responses.forEach(response => {
      let row = `${response.id},${response.timestamp}`;

      SURVEY_CONFIG.questions.forEach(question => {
        const answer = response.answers[question.id];
        let answerText = '';

        if (Array.isArray(answer)) {
          answerText = answer.join('; ');
        } else {
          answerText = answer || '';
        }

        row += `,"${answerText}"`;
      });

      csv += row + '\n';
    });

    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `survey-data-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log('Data exported as CSV');
  },

  /**
   * Get storage size in KB
   */
  getStorageSize() {
    const key = this.getStorageKey();
    const data = localStorage.getItem(key);
    if (!data) return 0;

    const sizeInBytes = new Blob([data]).size;
    const sizeInKB = (sizeInBytes / 1024).toFixed(2);
    return sizeInKB;
  }
};

// Initialize storage on load
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    SurveyStorage.initStorage();
  });
}

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.SurveyStorage = SurveyStorage;
}
