/**
 * Competitive Exam Negative Marking Grading Engine
 */
class NegativeMarkingCalculator {
  static grade(totalQuestions, correctCount, wrongCount, marksPerCorrect = 4.0, penaltyPerWrong = 1.0) {
    const unattempted = totalQuestions - correctCount - wrongCount;
    const grossMarks = correctCount * marksPerCorrect;
    const penalty = wrongCount * penaltyPerWrong;
    const netScore = Number((grossMarks - penalty).toFixed(2));
    const accuracyPercent = (correctCount + wrongCount) > 0
      ? Number(((correctCount / (correctCount + wrongCount)) * 100).toFixed(1))
      : 0;

    return {
      totalQuestions,
      correctCount,
      wrongCount,
      unattempted,
      grossMarks,
      penaltyDeducted: penalty,
      netScore,
      accuracyPercent
    };
  }
}

module.exports = NegativeMarkingCalculator;
