const test = require('node:test');
const assert = require('node:assert/strict');
const AdaptiveDifficultyEngine = require('../lib/adaptiveDifficultyEngine');

test('Adaptive Difficulty Engine Tests', async (t) => {
  await t.test('should increase ability on correct answers and suggest HARD questions', () => {
    let theta = 0.5;
    for (let i = 0; i < 3; i++) {
      const res = AdaptiveDifficultyEngine.adjustAbility(theta, true, 'MEDIUM');
      theta = res.newTheta;
    }
    assert.ok(theta > 1.0);
    const finalRes = AdaptiveDifficultyEngine.adjustAbility(theta, true, 'HARD');
    assert.equal(finalRes.recommendedDifficulty, 'HARD');
  });
});
