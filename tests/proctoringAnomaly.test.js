const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { detectAnomalies } = require('../src/utils/proctoringAnomalyDetector');

describe('Proctoring Anomaly Detector Tests', () => {
  test('flags session when suspicious clipboard and tab events occur', () => {
    const res = detectAnomalies({ tabSwitches: 2, pasteEvents: 1, rapidClickCount: 0 });
    assert.equal(res.anomalyScore, 70);
    assert.equal(res.flaggedForReview, true);
  });
});
