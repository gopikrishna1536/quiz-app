/**
 * Contest Leaderboard Multi-Factor Tie Breaker
 * Primary: Score (descending)
 * Secondary: Elapsed time in seconds (ascending)
 * Tertiary: Error count (ascending)
 */
class LeaderboardTieBreaker {
  static rankParticipants(participants) {
    return [...participants].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.elapsedSeconds !== b.elapsedSeconds) return a.elapsedSeconds - b.elapsedSeconds;
      return a.errorCount - b.errorCount;
    }).map((p, idx) => ({ ...p, rank: idx + 1 }));
  }
}

module.exports = LeaderboardTieBreaker;
