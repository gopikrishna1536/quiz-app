const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { estimateStudentAbility, calculateProbCorrect } = require('../src/utils/raschModelAbilityScorer');

describe('Rasch 1PL Ability Model Tests', () => {
  test('estimates higher latent ability theta for students getting hard questions right', () => {
    const difficulties = [-1.0, 0.0, 1.0, 2.0];
    const highAbility = estimateStudentAbility(difficulties, [1, 1, 1, 1]);
    const lowAbility = estimateStudentAbility(difficulties, [0, 0, 0, 0]);
    assert.ok(highAbility > lowAbility);
  });
});
