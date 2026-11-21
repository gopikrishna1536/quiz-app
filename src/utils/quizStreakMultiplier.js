/**
 * Quiz Combo Streak Point Multiplier
 */
function calculateStreakBonus(currentStreak) {
  if (currentStreak >= 10) return 2.0;
  if (currentStreak >= 5) return 1.5;
  if (currentStreak >= 3) return 1.25;
  return 1.0;
}

module.exports = { calculateStreakBonus };
