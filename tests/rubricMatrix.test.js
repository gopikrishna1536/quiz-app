const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { scoreRubric } = require('../src/utils/rubricMatrixScorer');

describe('Rubric Matrix Scorer Tests', () => {
  test('evaluates multi-criterion weighted rubric assessment', () => {
    const criteria = [
      { name: 'Accuracy', earnedScore: 9, maxScore: 10, weight: 0.5 },
      { name: 'Clarity', earnedScore: 8, maxScore: 10, weight: 0.5 }
    ];
    const res = scoreRubric(criteria);
    assert.equal(res.percentage, 85.0);
    assert.equal(res.gradeLetter, 'B');
  });
});
