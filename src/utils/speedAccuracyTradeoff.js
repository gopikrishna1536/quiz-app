/**
 * Speed-Accuracy Tradeoff Scoring
 */
function calculateSpeedAccuracyScore({ isCorrect, responseTimeMs, benchmarkTimeMs = 15000 }) {
  if (!isCorrect) return { points: 0, speedBonus: 0 };
  const basePoints = 100;
  // If answered correctly within benchmark time, grant linear speed bonus up to +50 points
  const timeRatio = Math.max(0, (benchmarkTimeMs - responseTimeMs) / benchmarkTimeMs);
  const speedBonus = Math.round(timeRatio * 50);

  return {
    points: basePoints + speedBonus,
    speedBonus
  };
}

module.exports = { calculateSpeedAccuracyScore };
