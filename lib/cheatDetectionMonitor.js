/**
 * Exam Integrity & Anti-Cheating Monitor
 */
class CheatDetectionMonitor {
  static evaluateIntegrity(answers) {
    let rapidAnswersCount = 0;
    let tabSwitchCount = 0;

    for (const a of answers) {
      // Any answer under 800ms is statistically impossible to read and comprehend
      if (a.timeTakenMs < 800) rapidAnswersCount++;
      if (a.tabSwitched) tabSwitchCount++;
    }

    const suspicious = rapidAnswersCount >= 3 || tabSwitchCount >= 2;
    return {
      totalQuestions: answers.length,
      rapidAnswersCount,
      tabSwitchCount,
      isFlaggedForReview: suspicious,
      integrityScore: Math.max(0, 100 - (rapidAnswersCount * 20) - (tabSwitchCount * 25))
    };
  }
}

module.exports = CheatDetectionMonitor;
