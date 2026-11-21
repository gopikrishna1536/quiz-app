const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { calculateSpeedAccuracyScore } = require('../src/utils/speedAccuracyTradeoff');

describe('Speed-Accuracy Tradeoff Tests', () => {
  test('rewards fast and accurate responses with speed bonus points', () => {
    const fast = calculateSpeedAccuracyScore({ isCorrect: true, responseTimeMs: 5000, benchmarkTimeMs: 15000 });
    const slow = calculateSpeedAccuracyScore({ isCorrect: true, responseTimeMs: 14000, benchmarkTimeMs: 15000 });
    assert.ok(fast.points > slow.points);
  });
});
