/**
 * SuperMemo SM-2 Spaced Repetition Flashcard Engine
 */
function scheduleNextReview({ repetitions, easeFactor, intervalDays, quality }) {
  // quality: 0 to 5
  let newRepetitions = repetitions;
  let newInterval = intervalDays;
  let newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (newEaseFactor < 1.3) newEaseFactor = 1.3;

  if (quality >= 3) {
    if (repetitions === 0) newInterval = 1;
    else if (repetitions === 1) newInterval = 6;
    else newInterval = Math.round(intervalDays * newEaseFactor);
    newRepetitions += 1;
  } else {
    newRepetitions = 0;
    newInterval = 1;
  }

  return {
    repetitions: newRepetitions,
    intervalDays: newInterval,
    easeFactor: Number(newEaseFactor.toFixed(2))
  };
}

module.exports = { scheduleNextReview };
