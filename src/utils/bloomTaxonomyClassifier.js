/**
 * Bloom Taxonomy Cognitive Question Classifier
 */
const BLOOM_KEYWORDS = {
  Remember: ['recall', 'list', 'name', 'identify', 'define'],
  Understand: ['explain', 'summarize', 'classify', 'describe'],
  Apply: ['calculate', 'solve', 'implement', 'use'],
  Analyze: ['differentiate', 'compare', 'contrast', 'examine'],
  Evaluate: ['assess', 'critique', 'judge', 'justify'],
  Create: ['design', 'formulate', 'construct', 'develop']
};

function classifyQuestionCognitiveLevel(promptText) {
  const lower = promptText.toLowerCase();
  for (const [level, keywords] of Object.entries(BLOOM_KEYWORDS)) {
    if (keywords.some(kw => lower.includes(kw))) {
      return level;
    }
  }
  return 'Understand';
}

module.exports = { classifyQuestionCognitiveLevel, BLOOM_KEYWORDS };
