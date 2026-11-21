const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { analyzeDistractors } = require('../src/utils/distractorEfficiencyAnalyzer');

describe('Distractor Efficiency Tests', () => {
  test('flags non-functioning distractors chosen by less than 5% of test takers', () => {
    const options = [
      { key: 'A', isCorrect: true },
      { key: 'B', isCorrect: false },
      { key: 'C', isCorrect: false }
    ];
    const selections = { A: 80, B: 18, C: 2 };
    const res = analyzeDistractors(options, selections, 100);
    assert.equal(res.find(o => o.key === 'B').isFunctional, true);
    assert.equal(res.find(o => o.key === 'C').isFunctional, false);
  });
});
