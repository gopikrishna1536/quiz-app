const test = require('node:test');
const assert = require('node:assert/strict');
const QuestionShuffleRandomizer = require('../lib/questionShuffleRandomizer');

test('Question Shuffle Tests', async (t) => {
  await t.test('should produce deterministic permutation given identical seed', () => {
    const items = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'];
    const s1 = QuestionShuffleRandomizer.shuffle(items, 12345);
    const s2 = QuestionShuffleRandomizer.shuffle(items, 12345);
    assert.deepEqual(s1, s2);
  });
});
