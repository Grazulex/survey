/**
 * BNP Paribas Fortis Survey - Results Page Logic
 * Displays survey results with charts and statistics
 */

// Chart color palette (BNP colors)
const CHART_COLORS = [
  '#008755', // Primary green
  '#007348', // Dark green
  '#39A87B', // Medium sea green
  '#6ABB97', // Green sheen
  '#8BC8AA', // Eton blue
  '#10B981', // Success green
  '#3B82F6', // Info blue
  '#F59E0B', // Warning
];

let chartInstances = [];

/**
 * Initialize results page
 */
document.addEventListener('DOMContentLoaded', () => {
  loadAndDisplayResults();
  setupEventHandlers();
});

/**
 * Setup event handlers
 */
function setupEventHandlers() {
  const exportButton = document.getElementById('exportButton');
  if (exportButton) {
    exportButton.addEventListener('click', () => {
      SurveyStorage.exportAsJSON();
    });
  }
}

/**
 * Load and display results
 */
function loadAndDisplayResults() {
  const responses = SurveyStorage.getAllResponses();
  const stats = SurveyStorage.getStats();

  console.log('Loaded responses:', responses.length);

  if (responses.length === 0) {
    showNoDataMessage();
    return;
  }

  hideNoDataMessage();
  displayStatistics(stats);
  displayResults(responses);
}

/**
 * Show no data message
 */
function showNoDataMessage() {
  const noDataMessage = document.getElementById('noDataMessage');
  const resultsContainer = document.getElementById('resultsContainer');

  if (noDataMessage) noDataMessage.classList.remove('hidden');
  if (resultsContainer) resultsContainer.classList.add('hidden');
}

/**
 * Hide no data message
 */
function hideNoDataMessage() {
  const noDataMessage = document.getElementById('noDataMessage');
  const resultsContainer = document.getElementById('resultsContainer');

  if (noDataMessage) noDataMessage.classList.add('hidden');
  if (resultsContainer) resultsContainer.classList.remove('hidden');
}

/**
 * Display statistics overview
 */
function displayStatistics(stats) {
  const totalResponsesEl = document.getElementById('totalResponses');
  const lastUpdateEl = document.getElementById('lastUpdate');

  if (totalResponsesEl) {
    totalResponsesEl.textContent = stats.totalResponses || 0;
  }

  if (lastUpdateEl && stats.lastUpdated) {
    const date = new Date(stats.lastUpdated);
    lastUpdateEl.textContent = date.toLocaleDateString();
  }
}

/**
 * Display all results
 */
function displayResults(responses) {
  const container = document.getElementById('resultsContainer');
  if (!container) return;

  // Clear existing content
  container.innerHTML = '';

  // Create result section for each question
  SURVEY_CONFIG.questions.forEach((question, index) => {
    const resultSection = createResultSection(question, responses, index);
    container.appendChild(resultSection);
  });
}

/**
 * Create result section for a question
 */
function createResultSection(question, responses, index) {
  const section = document.createElement('div');
  section.className = 'result-section';
  section.id = `result-${question.id}`;

  // Header
  const header = document.createElement('div');
  header.className = 'result-header';

  const questionText = document.createElement('h2');
  questionText.className = 'result-question';
  questionText.textContent = `${index + 1}. ${question.text}`;

  header.appendChild(questionText);
  section.appendChild(header);

  // Analyze data
  const analysisData = analyzeQuestionData(question, responses);

  // Chart
  const chartContainer = document.createElement('div');
  chartContainer.className = 'chart-container';

  const chartWrapper = document.createElement('div');
  chartWrapper.className = 'chart-wrapper';

  const canvas = document.createElement('canvas');
  canvas.id = `chart-${question.id}`;

  chartWrapper.appendChild(canvas);
  chartContainer.appendChild(chartWrapper);
  section.appendChild(chartContainer);

  // Create chart
  setTimeout(() => {
    createChart(canvas, question, analysisData);
  }, 100);

  return section;
}

/**
 * Analyze question data
 */
function analyzeQuestionData(question, responses) {
  const counts = {};

  // Initialize counts for all options
  question.options.forEach(option => {
    counts[option.value] = 0;
  });

  // Count responses
  responses.forEach(response => {
    const answer = response.answers[question.id];

    if (question.type === 'single') {
      if (answer && counts.hasOwnProperty(answer)) {
        counts[answer]++;
      }
    } else if (question.type === 'multiple') {
      if (Array.isArray(answer)) {
        answer.forEach(value => {
          if (counts.hasOwnProperty(value)) {
            counts[value]++;
          }
        });
      }
    }
  });

  return counts;
}

/**
 * Create chart for question
 */
function createChart(canvas, question, data) {
  const ctx = canvas.getContext('2d');

  // Prepare data
  const labels = question.options.map(opt => opt.text);
  const values = question.options.map(opt => data[opt.value] || 0);

  // Choose chart type based on question
  const chartType = question.type === 'single' ? 'pie' : 'bar';

  const chartConfig = {
    type: chartType,
    data: {
      labels: labels,
      datasets: [{
        label: 'Responses',
        data: values,
        backgroundColor: CHART_COLORS,
        borderColor: '#FFFFFF',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            font: {
              size: 12
            }
          }
        },
        title: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.parsed || context.parsed.y || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    }
  };

  // Additional options for bar charts
  if (chartType === 'bar') {
    chartConfig.options.scales = {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    };
  }

  const chart = new Chart(ctx, chartConfig);
  chartInstances.push(chart);
}

/**
 * Destroy all charts (for cleanup)
 */
function destroyAllCharts() {
  chartInstances.forEach(chart => {
    if (chart) chart.destroy();
  });
  chartInstances = [];
}

// Export for debugging
if (typeof window !== 'undefined') {
  window.ResultsDebug = {
    reload: loadAndDisplayResults,
    destroyCharts: destroyAllCharts
  };
}
