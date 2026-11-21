const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { scheduleNextReview } = require('../src/utils/spacedRepetitionScheduler');

describe('SuperMemo SM-2 Scheduler Tests', () => {
  test('advances intervals progressively for high quality recall ratings', () => {
    const rev1 = scheduleNextReview({ repetitions: 0, easeFactor: 2.5, intervalDays: 0, quality: 5 });
    assert.equal(rev1.intervalDays, 1);
    const rev2 = scheduleNextReview({ repetitions: 1, easeFactor: rev1.easeFactor, intervalDays: rev1.intervalDays, quality: 5 });
    assert.equal(rev2.intervalDays, 6);
  });
});
