/**
 * Diagnostic Analysis & Knowledge Gap Recommendation Engine.
 * Evaluates performance across technical categories, identifies weak areas, and builds actionable study plans.
 */

class DiagnosticEngine {
  /**
   * Generates category-level breakdown and diagnostic evaluation.
   */
  static analyzeKnowledgeGaps(gradedDetails = []) {
    if (!Array.isArray(gradedDetails) || gradedDetails.length === 0) {
      return {
        categories: {},
        masteredCount: 0,
        gapCount: 0,
        studyPlan: []
      };
    }

    const categoryStats = {};

    gradedDetails.forEach(item => {
      const cat = (item.category || 'General').toLowerCase();
      if (!categoryStats[cat]) {
        categoryStats[cat] = { total: 0, correct: 0, missedExplanations: [] };
      }

      categoryStats[cat].total++;
      if (item.isCorrect) {
        categoryStats[cat].correct++;
      } else {
        categoryStats[cat].missedExplanations.push({
          question: item.question,
          correctAnswer: item.correctOption,
          explanation: item.explanation || 'Review core documentation on this concept.'
        });
      }
    });

    const categories = {};
    const studyPlan = [];
    let masteredCount = 0;
    let gapCount = 0;

    for (const [cat, stat] of Object.entries(categoryStats)) {
      const accuracyPct = Math.round((stat.correct / stat.total) * 100);
      let proficiency = 'CRITICAL_GAP';
      let priority = 'HIGH';

      if (accuracyPct >= 85) {
        proficiency = 'MASTERED';
        priority = 'LOW';
        masteredCount++;
      } else if (accuracyPct >= 70) {
        proficiency = 'COMPETENT';
        priority = 'LOW';
      } else if (accuracyPct >= 50) {
        proficiency = 'NEEDS_REVIEW';
        priority = 'MEDIUM';
        gapCount++;
      } else {
        gapCount++;
      }

      categories[cat] = {
        totalQuestions: stat.total,
        correctAnswers: stat.correct,
        accuracyPercentage: accuracyPct,
        proficiency,
        priority
      };

      if (proficiency === 'CRITICAL_GAP' || proficiency === 'NEEDS_REVIEW') {
        studyPlan.push({
          category: cat,
          proficiency,
          priority,
          recommendedAction: proficiency === 'CRITICAL_GAP'
            ? `Dedicate 4-6 hours to foundational study in ${cat.toUpperCase()}`
            : `Review practice problems and flashcards in ${cat.toUpperCase()}`,
          reviewItems: stat.missedExplanations
        });
      }
    }

    // Sort study plan by priority (High priority gaps first)
    studyPlan.sort((a, b) => (a.priority === 'HIGH' ? -1 : 1));

    return {
      categories,
      masteredCount,
      gapCount,
      overallProficiency: gapCount === 0 ? 'READY_FOR_INTERVIEWS' : 'REVISION_RECOMMENDED',
      studyPlan
    };
  }
}

module.exports = { DiagnosticEngine };
