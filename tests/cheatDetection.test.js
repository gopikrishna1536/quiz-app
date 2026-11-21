const test = require('node:test');
const assert = require('node:assert/strict');
const CheatDetectionMonitor = require('../lib/cheatDetectionMonitor');

test('Cheat Detection Tests', async (t) => {
  await t.test('should flag exam with multiple sub-second answers', () => {
    const answers = [
      { timeTakenMs: 300, tabSwitched: false },
      { timeTakenMs: 400, tabSwitched: false },
      { timeTakenMs: 500, tabSwitched: false }
    ];
    const res = CheatDetectionMonitor.evaluateIntegrity(answers);
    assert.equal(res.isFlaggedForReview, true);
    assert.ok(res.integrityScore < 50);
  });
});
