/**
 * Grading and Scoring Logic for Quiz Assessment Engine.
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

module.exports = { gradeQuizSubmission };
