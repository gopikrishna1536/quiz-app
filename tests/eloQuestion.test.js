const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { updateQuestionElo } = require('../src/utils/eloQuestionRating');

describe('Dual Elo Question Rating Tests', () => {
  test('question rating drops when solved correctly by novice student', () => {
    const res = updateQuestionElo(1000, 1500, true);
    assert.ok(res.newStudentElo > 1000);
    assert.ok(res.newQuestionElo < 1500);
  });
});
