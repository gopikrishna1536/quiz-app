const { test, describe } = require('node:test');
const assert = require('node:assert');
const { gradeQuizSubmission } = require('../lib/grader');

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
});
