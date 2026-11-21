/**
 * Grading and Scoring Logic for Quiz Assessment Engine.
 * Supports standard grading as well as timed contest scoring with streak multipliers.
 */

/**
 * Calculates consecutive streak multiplier.
 * 1 in a row: 1.0x
 * 2 in a row: 1.2x
 * 3 in a row: 1.5x
 * 4 in a row: 1.75x
 * 5+ in a row: 2.0x
 */
function getStreakMultiplier(streak) {
  if (streak >= 5) return 2.0;
  if (streak === 4) return 1.75;
  if (streak === 3) return 1.5;
  if (streak === 2) return 1.2;
  return 1.0;
}

/**
 * Standard grade calculation with letter grades and percentage.
 */
function gradeQuizSubmission(questions, submissions) {
  if (!Array.isArray(questions) || !Array.isArray(submissions)) {
    throw new Error('Questions and submissions must be arrays.');
  }

  const questionMap = new Map();
  for (const q of questions) {
    questionMap.set(q.id, q);
  }

  let correctCount = 0;
  const details = [];

  for (const sub of submissions) {
    const q = questionMap.get(sub.questionId);
    if (!q) continue;

    const isCorrect = q.correctIndex === sub.selectedIndex;
    if (isCorrect) correctCount++;

    details.push({
      questionId: q.id,
      question: q.question,
      selectedOption: q.options[sub.selectedIndex] ?? 'No Answer',
      correctOption: q.options[q.correctIndex],
      isCorrect,
      explanation: q.explanation
    });
  }

  const total = submissions.length;
  const scorePercentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  let grade = 'F';
  if (scorePercentage >= 90) grade = 'A+';
  else if (scorePercentage >= 80) grade = 'A';
  else if (scorePercentage >= 70) grade = 'B';
  else if (scorePercentage >= 60) grade = 'C';
  else if (scorePercentage >= 50) grade = 'D';

  return {
    totalQuestions: total,
    correctCount,
    incorrectCount: total - correctCount,
    scorePercentage,
    grade,
    passed: scorePercentage >= 60,
    details
  };
}

/**
 * Competitive contest scoring taking time taken and consecutive streaks into account.
 * Base: 100 pts per correct answer.
 * Time bonus: up to 50 pts based on speed (assuming default 30s per question).
 * Multiplier applied based on active answer streak.
 */
function scoreContestSubmission(questions, submissions, options = {}) {
  const timeLimitSeconds = options.timeLimitSeconds ?? 30;
  const basePoints = options.basePoints ?? 100;

  const baseReport = gradeQuizSubmission(questions, submissions);

  let totalPoints = 0;
  let currentStreak = 0;
  let maxStreak = 0;

  const questionMap = new Map(questions.map(q => [q.id, q]));

  const timedDetails = submissions.map((sub, idx) => {
    const q = questionMap.get(sub.questionId);
    const isCorrect = q && q.correctIndex === sub.selectedIndex;
    const timeTaken = Math.max(0, Number(sub.timeTakenSeconds || 0));

    let pointsEarned = 0;
    let multiplier = 1.0;

    if (isCorrect) {
      currentStreak++;
      if (currentStreak > maxStreak) maxStreak = currentStreak;
      multiplier = getStreakMultiplier(currentStreak);

      const timeRemaining = Math.max(0, timeLimitSeconds - timeTaken);
      const timeBonus = Math.round((timeRemaining / timeLimitSeconds) * 50);
      pointsEarned = Math.round((basePoints + timeBonus) * multiplier);
      totalPoints += pointsEarned;
    } else {
      currentStreak = 0;
    }

    return {
      questionId: sub.questionId,
      isCorrect,
      timeTaken,
      pointsEarned,
      multiplier,
      currentStreak
    };
  });

  return {
    ...baseReport,
    totalPoints,
    maxStreak,
    timedDetails
  };
}

module.exports = {
  gradeQuizSubmission,
  scoreContestSubmission,
  getStreakMultiplier
};
