const test = require('node:test');
const assert = require('node:assert/strict');
const NegativeMarkingCalculator = require('../lib/negativeMarkingCalculator');

test('Negative Marking Tests', async (t) => {
  await t.test('should deduct fractional penalty for wrong answers (JEE / NEET pattern)', () => {
    // 100 questions: 80 correct (+320), 20 wrong (-20) -> Net 300 marks
    const res = NegativeMarkingCalculator.grade(100, 80, 20, 4.0, 1.0);
    assert.equal(res.grossMarks, 320);
    assert.equal(res.penaltyDeducted, 20);
    assert.equal(res.netScore, 300);
    assert.equal(res.accuracyPercent, 80.0);
  });
});
