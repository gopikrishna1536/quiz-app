/**
 * Multi-Level Tournament Leaderboard Tiebreaker
 */
function rankWithTiebreakers(participants) {
  return [...participants].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.durationSeconds !== b.durationSeconds) return a.durationSeconds - b.durationSeconds;
    return b.highestStreak - a.highestStreak;
  });
}

module.exports = { rankWithTiebreakers };
