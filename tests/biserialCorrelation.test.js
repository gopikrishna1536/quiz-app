const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { calculatePointBiserial } = require('../src/utils/biserialCorrelation');

describe('Point-Biserial Correlation Tests', () => {
  test('computes positive discrimination for well-performing question', () => {
    const studentTotals = [10, 9, 8, 5, 3, 2];
    const itemScores = [1, 1, 1, 0, 0, 0];
    const r = calculatePointBiserial({ studentTotals, itemScores });
    assert.ok(r > 0.50);
  });
});
