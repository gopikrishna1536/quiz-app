/**
 * Item Response Theory (IRT) Adaptive Difficulty Engine
 */
class AdaptiveDifficultyEngine {
  static adjustAbility(currentTheta, isCorrect, questionDifficulty) {
    // Basic Rasch model approximation: adjust ability theta upwards on success, downwards on failure
    const step = 0.25;
    let newTheta = isCorrect ? currentTheta + step : currentTheta - step;
    newTheta = Math.max(-3.0, Math.min(3.0, newTheta));

    let recommendedDifficulty = 'MEDIUM';
    if (newTheta > 1.0) recommendedDifficulty = 'HARD';
    else if (newTheta < -1.0) recommendedDifficulty = 'EASY';

    return {
      newTheta: Number(newTheta.toFixed(2)),
      recommendedDifficulty
    };
  }
}

module.exports = AdaptiveDifficultyEngine;
