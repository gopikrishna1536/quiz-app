const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { calculateStreakBonus } = require('../src/utils/quizStreakMultiplier');

describe('Quiz Streak Multiplier Tests', () => {
  test('scales combo multiplier as correct streak increases', () => {
    assert.equal(calculateStreakBonus(2), 1.0);
    assert.equal(calculateStreakBonus(4), 1.25);
    assert.equal(calculateStreakBonus(6), 1.5);
    assert.equal(calculateStreakBonus(12), 2.0);
  });
});
