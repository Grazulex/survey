/**
 * BNP Paribas Fortis Survey Configuration
 * Survey about the use of Kata in recruitment process
 */

const SURVEY_CONFIG = {
  title: "Kata in Recruitment Survey",
  subtitle: "BNP Paribas Fortis",
  description: "Help us understand your perspective on using Kata in recruitment. Your input will shape our hiring practices. Takes only 2 minutes.",
  logoPath: "assets/images/bnp-paribas-fortis-logo.png",
  logoAlt: "BNP Paribas Fortis",

  // Questions configuration - For recruiters and team leaders
  questions: [
    {
      id: "q1",
      text: "Do you currently use coding Kata in your recruitment process?",
      type: "single",
      required: true,
      options: [
        { id: "q1_opt1", text: "Yes, regularly", value: "yes_regularly" },
        { id: "q1_opt2", text: "Yes, occasionally", value: "yes_occasionally" },
        { id: "q1_opt3", text: "No, but considering it", value: "no_considering" },
        { id: "q1_opt4", text: "No, and not planning to", value: "no_not_planning" },
        { id: "q1_opt5", text: "Used in the past, but stopped", value: "stopped" }
      ]
    },
    {
      id: "q2",
      text: "What is your main interest in using Kata for recruitment? (multiple answers possible)",
      type: "multiple",
      required: true,
      options: [
        { id: "q2_opt1", text: "Better assess technical skills", value: "assess_skills" },
        { id: "q2_opt2", text: "Standardize evaluation process", value: "standardize" },
        { id: "q2_opt3", text: "Reduce time-to-hire", value: "reduce_time" },
        { id: "q2_opt4", text: "Improve candidate experience", value: "candidate_experience" },
        { id: "q2_opt5", text: "Identify problem-solving abilities", value: "problem_solving" },
        { id: "q2_opt6", text: "Reduce bias in hiring", value: "reduce_bias" }
      ]
    },
    {
      id: "q3",
      text: "What concerns do you have about implementing Kata? (multiple answers possible)",
      type: "multiple",
      required: true,
      options: [
        { id: "q3_opt1", text: "Time investment required", value: "time_investment" },
        { id: "q3_opt2", text: "Candidate may decline participation", value: "candidate_decline" },
        { id: "q3_opt3", text: "Difficulty creating relevant exercises", value: "creating_exercises" },
        { id: "q3_opt4", text: "Evaluating results objectively", value: "objective_evaluation" },
        { id: "q3_opt5", text: "Technical setup and infrastructure", value: "technical_setup" },
        { id: "q3_opt6", text: "No significant concerns", value: "no_concerns" }
      ]
    },
    {
      id: "q4",
      text: "Which format would work best for your team?",
      type: "single",
      required: true,
      options: [
        { id: "q4_opt1", text: "Live coding with team member(s)", value: "live_with_team" },
        { id: "q4_opt2", text: "Take-home exercise", value: "takehome" },
        { id: "q4_opt3", text: "Pair programming session", value: "pair_programming" },
        { id: "q4_opt4", text: "Online platform (HackerRank, Codility, etc.)", value: "online_platform" },
        { id: "q4_opt5", text: "Combination of formats", value: "combination" }
      ]
    },
    {
      id: "q5",
      text: "What support would help you implement Kata successfully? (multiple answers possible)",
      type: "multiple",
      required: false,
      options: [
        { id: "q5_opt1", text: "Ready-to-use exercise templates", value: "templates" },
        { id: "q5_opt2", text: "Training on evaluation criteria", value: "evaluation_training" },
        { id: "q5_opt3", text: "Technical platform/tools", value: "platform" },
        { id: "q5_opt4", text: "Best practices guide", value: "best_practices" },
        { id: "q5_opt5", text: "Benchmarking with other teams", value: "benchmarking" },
        { id: "q5_opt6", text: "Time allocation/resources", value: "resources" }
      ]
    }
  ],

  // Confirmation messages
  messages: {
    success: "Thank you for your participation!",
    successDetails: "Your responses have been successfully saved.",
    error: "An error occurred",
    errorDetails: "Please try again later.",
    requiredField: "This field is required",
    selectAtLeastOne: "Please select at least one option"
  },

  // Storage configuration
  storage: {
    key: "bnp_survey_responses",
    version: "1.0.0"
  }
};

// Validation utilities
const SurveyUtils = {
  /**
   * Validates a single answer
   */
  validateSingleAnswer(questionId, answer) {
    if (!answer || answer.trim() === '') {
      return false;
    }
    return true;
  },

  /**
   * Validates multiple answers
   */
  validateMultipleAnswers(questionId, answers) {
    return Array.isArray(answers) && answers.length > 0;
  },

  /**
   * Generates a unique ID for a response
   */
  generateResponseId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Gets the current timestamp in ISO format
   */
  getCurrentTimestamp() {
    return new Date().toISOString();
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SURVEY_CONFIG, SurveyUtils };
}
