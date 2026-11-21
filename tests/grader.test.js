const { test, describe } = require('node:test');
const assert = require('node:assert');
const { gradeQuizSubmission, scoreContestSubmission, getStreakMultiplier } = require('../lib/grader');

describe('Quiz Assessment Grading Engine', () => {
  const sampleQuestions = [
    { id: 1, question: 'Q1', options: ['A', 'B', 'C', 'D'], correctIndex: 0, explanation: 'Exp 1' },
    { id: 2, question: 'Q2', options: ['A', 'B', 'C', 'D'], correctIndex: 2, explanation: 'Exp 2' },
    { id: 3, question: 'Q3', options: ['A', 'B', 'C', 'D'], correctIndex: 1, explanation: 'Exp 3' }
  ];

  test('should score 100% and grade A+ when all submissions are correct', () => {
    const submissions = [
      { questionId: 1, selectedIndex: 0 },
      { questionId: 2, selectedIndex: 2 },
      { questionId: 3, selectedIndex: 1 }
    ];

    const report = gradeQuizSubmission(sampleQuestions, submissions);
    assert.strictEqual(report.totalQuestions, 3);
    assert.strictEqual(report.correctCount, 3);
    assert.strictEqual(report.incorrectCount, 0);
    assert.strictEqual(report.scorePercentage, 100);
    assert.strictEqual(report.grade, 'A+');
    assert.strictEqual(report.passed, true);
  });

  test('should accurately calculate partial scores and failures', () => {
    const submissions = [
      { questionId: 1, selectedIndex: 0 }, // correct
      { questionId: 2, selectedIndex: 1 }, // incorrect
      { questionId: 3, selectedIndex: 3 }  // incorrect
    ];

    const report = gradeQuizSubmission(sampleQuestions, submissions);
    assert.strictEqual(report.correctCount, 1);
    assert.strictEqual(report.incorrectCount, 2);
    assert.strictEqual(report.scorePercentage, 33);
    assert.strictEqual(report.grade, 'F');
    assert.strictEqual(report.passed, false);
  });

  test('should throw error on invalid argument types', () => {
    assert.throws(() => gradeQuizSubmission(null, []), /Questions and submissions must be arrays/);
  });

  test('should verify streak multipliers scale correctly with consecutive answers', () => {
    assert.strictEqual(getStreakMultiplier(1), 1.0);
    assert.strictEqual(getStreakMultiplier(2), 1.2);
    assert.strictEqual(getStreakMultiplier(3), 1.5);
    assert.strictEqual(getStreakMultiplier(4), 1.75);
    assert.strictEqual(getStreakMultiplier(5), 2.0);
    assert.strictEqual(getStreakMultiplier(10), 2.0);
  });

  test('should calculate contest score with time bonus and streak multiplier', () => {
    const submissions = [
      { questionId: 1, selectedIndex: 0, timeTakenSeconds: 0 },  // instant answer (30s left): 100 + 50 = 150 * 1.0 = 150
      { questionId: 2, selectedIndex: 2, timeTakenSeconds: 30 }, // last second (0s left): 100 + 0 = 100 * 1.2 = 120
      { questionId: 3, selectedIndex: 1, timeTakenSeconds: 15 }  // half time (15s left): 100 + 25 = 125 * 1.5 = 188
    ];

    const result = scoreContestSubmission(sampleQuestions, submissions, { timeLimitSeconds: 30 });
    assert.strictEqual(result.maxStreak, 3);
    assert.strictEqual(result.correctCount, 3);
    assert.strictEqual(result.totalPoints, 150 + 120 + 188); // 458
  });
});
