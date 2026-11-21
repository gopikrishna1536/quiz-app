const test = require('node:test');
const assert = require('node:assert/strict');
const LeaderboardTieBreaker = require('../lib/leaderboardTieBreaker');

test('Leaderboard Tie Breaker Tests', async (t) => {
  await t.test('should award higher rank to faster participant with equal score', () => {
    const list = [
      { id: 'UserA', score: 90, elapsedSeconds: 45, errorCount: 1 },
      { id: 'UserB', score: 90, elapsedSeconds: 30, errorCount: 1 }
    ];
    const ranked = LeaderboardTieBreaker.rankParticipants(list);
    assert.equal(ranked[0].id, 'UserB');
    assert.equal(ranked[0].rank, 1);
  });
});
