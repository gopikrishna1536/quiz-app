const test = require('node:test');
const assert = require('node:assert/strict');
const SpacedRepetitionFlashcards = require('../lib/spacedRepetitionFlashcards');

test('Spaced Repetition Tests', async (t) => {
  await t.test('should advance review interval on perfect quality score', () => {
    const res = SpacedRepetitionFlashcards.calculateNextReview(0, 2.5, 5);
    assert.equal(res.repetitions, 1);
    assert.equal(res.intervalDays, 1);
    assert.ok(res.easinessFactor >= 2.5);
  });
});
