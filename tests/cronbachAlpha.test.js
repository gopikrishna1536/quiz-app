const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { calculateCronbachAlpha } = require('../src/utils/cronbachAlphaReliability');

describe('Cronbach Alpha Reliability Tests', () => {
  test('calculates high alpha for consistent student responses', () => {
    const matrix = [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0],
      [1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ];
    const alpha = calculateCronbachAlpha(matrix);
    assert.ok(alpha >= 0.70);
  });
});
