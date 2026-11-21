const test = require('node:test');
const assert = require('node:assert/strict');
const PartialCreditGrader = require('../lib/partialCreditGrader');

test('Partial Credit Grader Tests', async (t) => {
  await t.test('should award partial credit when 1 of 2 correct choices selected', () => {
    const res = PartialCreditGrader.gradeMsq(['A'], ['A', 'C'], 2.0);
    assert.equal(res.awardedPoints, 1.0);
    assert.equal(res.isPartiallyCorrect, true);
  });

  await t.test('should award zero points if incorrect choice is included', () => {
    const res = PartialCreditGrader.gradeMsq(['A', 'B'], ['A', 'C'], 2.0);
    assert.equal(res.awardedPoints, 0.0);
  });
});
