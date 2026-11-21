/**
 * SuperMemo SM-2 Spaced Repetition Algorithm
 */
class SpacedRepetitionFlashcards {
  static calculateNextReview(repetitions, easinessFactor, qualityScore) {
    // Quality: 0 to 5 (5 = perfect recall)
    let ef = easinessFactor + (0.1 - (5 - qualityScore) * (0.08 + (5 - qualityScore) * 0.02));
    ef = Math.max(1.3, ef);

    let nextRepetitions = repetitions;
    let intervalDays = 1;

    if (qualityScore < 3) {
      nextRepetitions = 0;
      intervalDays = 1;
    } else {
      nextRepetitions += 1;
      if (nextRepetitions === 1) intervalDays = 1;
      else if (nextRepetitions === 2) intervalDays = 6;
      else intervalDays = Math.round((repetitions - 1) * ef);
    }

    return {
      repetitions: nextRepetitions,
      easinessFactor: Number(ef.toFixed(2)),
      intervalDays
    };
  }
}

module.exports = SpacedRepetitionFlashcards;
