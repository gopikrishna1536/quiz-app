const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { shouldStopCatTest } = require('../src/utils/adaptiveTestStoppingRule');

describe('CAT Stopping Rule Tests', () => {
  test('halts test once standard error criterion is satisfied after min questions', () => {
    assert.equal(shouldStopCatTest({ testLength: 10, standardError: 0.28 }), true);
    assert.equal(shouldStopCatTest({ testLength: 3, standardError: 0.25 }), false);
  });
});
