/**
 * BNP Paribas Fortis Survey - Survey Page Logic
 * Handles form generation, validation, and submission
 */

// Survey state
const SurveyState = {
  answers: {},
  currentProgress: 0,
  isSubmitting: false
};

/**
 * Initialize the survey when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  initializeSurvey();
});

/**
 * Main initialization function
 */
function initializeSurvey() {
  // Check if user already voted in this session
  if (typeof SessionControl !== 'undefined' && !SessionControl.enforceOneVotePerSession()) {
    console.log('User has already voted in this session');
    return;
  }

  // Update header texts from config
  updateHeaderFromConfig();

  // Generate questions
  generateQuestions();

  // Setup form submission
  setupFormSubmission();

  // Initialize progress
  updateProgress();

  console.log('Survey initialized with', SURVEY_CONFIG.questions.length, 'questions');
}

/**
 * Update header texts from configuration
 */
function updateHeaderFromConfig() {
  const titleEl = document.getElementById('surveyTitle');
  const subtitleEl = document.getElementById('surveySubtitle');
  const descriptionEl = document.getElementById('surveyDescription');

  if (titleEl) titleEl.textContent = SURVEY_CONFIG.title;
  if (subtitleEl) subtitleEl.textContent = SURVEY_CONFIG.subtitle;
  if (descriptionEl) descriptionEl.textContent = SURVEY_CONFIG.description;
}

/**
 * Generate all questions from configuration
 */
function generateQuestions() {
  const container = document.getElementById('questionsContainer');
  if (!container) {
    console.error('Questions container not found');
    return;
  }

  // Clear existing content
  container.innerHTML = '';

  // Generate each question
  SURVEY_CONFIG.questions.forEach((question, index) => {
    const questionBlock = createQuestionBlock(question, index + 1);
    container.appendChild(questionBlock);
  });
}

/**
 * Create a question block element
 */
function createQuestionBlock(question, number) {
  const block = document.createElement('div');
  block.className = 'question-block';
  block.setAttribute('data-question-id', question.id);

  // Header
  const header = document.createElement('div');
  header.className = 'question-header';

  const questionNumber = document.createElement('span');
  questionNumber.className = 'question-number';
  questionNumber.textContent = `Question ${number}`;

  const questionText = document.createElement('h3');
  questionText.className = 'question-text';
  questionText.textContent = question.text;

  const requiredIndicator = document.createElement('span');
  requiredIndicator.className = 'question-required';
  requiredIndicator.textContent = question.required ? '(Required)' : '(Optional)';

  header.appendChild(questionNumber);
  header.appendChild(questionText);
  header.appendChild(requiredIndicator);

  // Add subtitle if question type is multiple
  if (question.type === 'multiple') {
    const subtitle = document.createElement('p');
    subtitle.className = 'question-subtitle';
    subtitle.textContent = 'Select all that apply';
    header.appendChild(subtitle);
  }

  block.appendChild(header);

  // Options
  const optionsList = createOptionsListElement(question);
  block.appendChild(optionsList);

  // Error message placeholder
  const errorDiv = document.createElement('div');
  errorDiv.className = 'question-error hidden';
  errorDiv.setAttribute('role', 'alert');
  block.appendChild(errorDiv);

  return block;
}

/**
 * Create options list for a question
 */
function createOptionsListElement(question) {
  const list = document.createElement('ul');
  list.className = 'options-list';

  question.options.forEach(option => {
    const item = createOptionItem(question, option);
    list.appendChild(item);
  });

  return list;
}

/**
 * Create a single option item
 */
function createOptionItem(question, option) {
  const item = document.createElement('li');
  item.className = 'option-item';

  const label = document.createElement('label');
  label.className = 'option-label';
  label.setAttribute('for', option.id);

  // Input (radio or checkbox)
  const input = document.createElement('input');
  input.type = question.type === 'single' ? 'radio' : 'checkbox';
  input.name = question.id;
  input.id = option.id;
  input.value = option.value;
  input.className = 'option-input';

  // Add change event listener
  input.addEventListener('change', () => handleOptionChange(question, option, input));

  // Custom checkmark
  const checkmark = document.createElement('span');
  checkmark.className = 'option-checkmark';

  // Option text
  const text = document.createElement('span');
  text.className = 'option-text';
  text.textContent = option.text;

  label.appendChild(input);
  label.appendChild(checkmark);
  label.appendChild(text);
  item.appendChild(label);

  return item;
}

/**
 * Handle option selection change
 */
function handleOptionChange(question, option, inputElement) {
  const questionId = question.id;

  if (question.type === 'single') {
    // Single choice: store the selected value
    SurveyState.answers[questionId] = inputElement.value;

    // Update visual state
    updateSingleChoiceVisuals(questionId);
  } else {
    // Multiple choice: store array of selected values
    if (!SurveyState.answers[questionId]) {
      SurveyState.answers[questionId] = [];
    }

    if (inputElement.checked) {
      // Add to array if not already present
      if (!SurveyState.answers[questionId].includes(inputElement.value)) {
        SurveyState.answers[questionId].push(inputElement.value);
      }
    } else {
      // Remove from array
      SurveyState.answers[questionId] = SurveyState.answers[questionId].filter(
        val => val !== inputElement.value
      );
    }
  }

  // Clear error for this question
  clearQuestionError(questionId);

  // Update progress
  updateProgress();

  console.log('Answer updated:', questionId, SurveyState.answers[questionId]);
}

/**
 * Update visual state for single choice questions
 */
function updateSingleChoiceVisuals(questionId) {
  const questionBlock = document.querySelector(`[data-question-id="${questionId}"]`);
  if (!questionBlock) return;

  const labels = questionBlock.querySelectorAll('.option-label');
  labels.forEach(label => {
    const input = label.querySelector('input');
    if (input && input.checked) {
      label.classList.add('checked');
    } else {
      label.classList.remove('checked');
    }
  });
}

/**
 * Calculate and update progress
 */
function updateProgress() {
  const totalQuestions = SURVEY_CONFIG.questions.length;
  const answeredQuestions = Object.keys(SurveyState.answers).filter(questionId => {
    const answer = SurveyState.answers[questionId];

    // Check if answer is valid (not empty)
    if (Array.isArray(answer)) {
      return answer.length > 0;
    }
    return answer && answer.trim() !== '';
  }).length;

  const progressPercentage = Math.round((answeredQuestions / totalQuestions) * 100);
  SurveyState.currentProgress = progressPercentage;

  // Update progress bar
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');

  if (progressFill) {
    progressFill.style.width = `${progressPercentage}%`;
  }

  if (progressText) {
    progressText.textContent = `${progressPercentage}% completed`;
  }
}

/**
 * Setup form submission handler
 */
function setupFormSubmission() {
  const form = document.getElementById('surveyForm');
  if (!form) {
    console.error('Survey form not found');
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    await handleFormSubmit();
  });
}

/**
 * Handle form submission
 */
async function handleFormSubmit() {
  // Prevent double submission
  if (SurveyState.isSubmitting) {
    console.log('Already submitting...');
    return;
  }

  console.log('Form submitted, validating...');

  // Validate all answers
  const validation = validateAllAnswers();

  if (!validation.isValid) {
    displayValidationErrors(validation.errors);
    return;
  }

  // Clear any previous errors
  clearAllErrors();

  // Set submitting state
  SurveyState.isSubmitting = true;
  const submitButton = document.getElementById('submitButton');
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.classList.add('loading');
  }

  try {
    // Save response using storage module
    const responseId = SurveyUtils.generateResponseId();
    const timestamp = SurveyUtils.getCurrentTimestamp();

    const response = {
      id: responseId,
      timestamp: timestamp,
      answers: { ...SurveyState.answers }
    };

    console.log('Saving response:', response);

    // Check if SurveyStorage exists (from storage.js)
    if (typeof SurveyStorage !== 'undefined') {
      SurveyStorage.saveResponse(response);
    } else {
      // Fallback: save to localStorage directly
      const existingData = JSON.parse(localStorage.getItem(SURVEY_CONFIG.storage.key) || '{"responses": [], "stats": {}}');
      existingData.responses.push(response);
      existingData.stats = {
        totalResponses: existingData.responses.length,
        lastUpdated: timestamp
      };
      localStorage.setItem(SURVEY_CONFIG.storage.key, JSON.stringify(existingData));
    }

    console.log('Response saved successfully');

    // Show success message
    displaySuccessMessage();

  } catch (error) {
    console.error('Error saving response:', error);
    displayErrorMessage(error.message);

    // Re-enable submit button on error
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.classList.remove('loading');
    }
    SurveyState.isSubmitting = false;
  }
}

/**
 * Validate all answers
 */
function validateAllAnswers() {
  const errors = [];

  SURVEY_CONFIG.questions.forEach(question => {
    if (question.required) {
      const answer = SurveyState.answers[question.id];

      if (question.type === 'single') {
        if (!SurveyUtils.validateSingleAnswer(question.id, answer)) {
          errors.push({
            questionId: question.id,
            message: SURVEY_CONFIG.messages.requiredField
          });
        }
      } else if (question.type === 'multiple') {
        if (!SurveyUtils.validateMultipleAnswers(question.id, answer)) {
          errors.push({
            questionId: question.id,
            message: SURVEY_CONFIG.messages.selectAtLeastOne
          });
        }
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

/**
 * Display validation errors
 */
function displayValidationErrors(errors) {
  console.log('Validation errors:', errors);

  // Clear previous errors
  clearAllErrors();

  // Show general error message
  const errorContainer = document.getElementById('errorContainer');
  if (errorContainer) {
    errorContainer.textContent = 'Please answer all required questions before submitting.';
    errorContainer.classList.remove('hidden');
  }

  // Highlight specific questions with errors
  errors.forEach(error => {
    const questionBlock = document.querySelector(`[data-question-id="${error.questionId}"]`);
    if (questionBlock) {
      questionBlock.classList.add('has-error');

      const errorDiv = questionBlock.querySelector('.question-error');
      if (errorDiv) {
        errorDiv.textContent = error.message;
        errorDiv.classList.remove('hidden');
      }

      // Scroll to first error
      if (errors[0].questionId === error.questionId) {
        questionBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });
}

/**
 * Clear all validation errors
 */
function clearAllErrors() {
  const errorContainer = document.getElementById('errorContainer');
  if (errorContainer) {
    errorContainer.textContent = '';
    errorContainer.classList.add('hidden');
  }

  document.querySelectorAll('.question-block').forEach(block => {
    block.classList.remove('has-error');
    const errorDiv = block.querySelector('.question-error');
    if (errorDiv) {
      errorDiv.textContent = '';
      errorDiv.classList.add('hidden');
    }
  });
}

/**
 * Clear error for specific question
 */
function clearQuestionError(questionId) {
  const questionBlock = document.querySelector(`[data-question-id="${questionId}"]`);
  if (questionBlock) {
    questionBlock.classList.remove('has-error');
    const errorDiv = questionBlock.querySelector('.question-error');
    if (errorDiv) {
      errorDiv.textContent = '';
      errorDiv.classList.add('hidden');
    }
  }

  // Check if all errors are cleared, hide main error container
  const hasErrors = document.querySelectorAll('.question-block.has-error').length > 0;
  if (!hasErrors) {
    const errorContainer = document.getElementById('errorContainer');
    if (errorContainer) {
      errorContainer.classList.add('hidden');
    }
  }
}

/**
 * Display success message
 */
function displaySuccessMessage() {
  // Mark user as voted in this session
  if (typeof SessionControl !== 'undefined') {
    SessionControl.markAsVoted();
  }

  const form = document.getElementById('surveyForm');
  const successCard = document.getElementById('successMessage');

  // Update success message from config
  const successTitle = document.getElementById('successTitle');
  const successDescription = document.getElementById('successDescription');

  if (successTitle) {
    successTitle.textContent = SURVEY_CONFIG.messages.success;
  }
  if (successDescription) {
    successDescription.textContent = SURVEY_CONFIG.messages.successDetails;
  }

  // Hide form and show success card
  if (form) {
    form.classList.add('hidden');
  }
  if (successCard) {
    successCard.classList.remove('hidden');
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Display error message
 */
function displayErrorMessage(message) {
  const errorContainer = document.getElementById('errorContainer');
  if (errorContainer) {
    errorContainer.textContent = message || SURVEY_CONFIG.messages.errorDetails;
    errorContainer.classList.remove('hidden');
  }

  // Scroll to error
  errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Reset form (for testing)
 */
function resetForm() {
  SurveyState.answers = {};
  SurveyState.currentProgress = 0;
  SurveyState.isSubmitting = false;

  // Clear all inputs
  document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
    input.checked = false;
  });

  // Clear all visual states
  document.querySelectorAll('.option-label').forEach(label => {
    label.classList.remove('checked');
  });

  // Clear errors
  clearAllErrors();

  // Reset progress
  updateProgress();

  // Show form, hide success
  const form = document.getElementById('surveyForm');
  const successCard = document.getElementById('successMessage');
  if (form) form.classList.remove('hidden');
  if (successCard) successCard.classList.add('hidden');

  // Re-enable submit button
  const submitButton = document.getElementById('submitButton');
  if (submitButton) {
    submitButton.disabled = false;
    submitButton.classList.remove('loading');
  }

  console.log('Form reset');
}

// Export for testing/debugging
if (typeof window !== 'undefined') {
  window.SurveyDebug = {
    state: SurveyState,
    reset: resetForm,
    getAnswers: () => SurveyState.answers,
    getProgress: () => SurveyState.currentProgress
  };
}
