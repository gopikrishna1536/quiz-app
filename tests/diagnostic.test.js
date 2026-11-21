const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { DiagnosticEngine } = require('../lib/diagnosticEngine');

describe('Student Diagnostic & Knowledge Gap Analysis Tests', () => {
  const gradedSample = [
    // Python (100% - Mastered)
    { category: 'python', question: 'Q1', isCorrect: true, correctOption: 'O(1)' },
    { category: 'python', question: 'Q2', isCorrect: true, correctOption: '@app.get()' },

    // SQL (50% - Needs Review)
    { category: 'sql', question: 'Q3', isCorrect: true, correctOption: 'B-Tree' },
    { category: 'sql', question: 'Q4', isCorrect: false, correctOption: 'Durability', explanation: 'Durability guarantees transactions.' },

    // System Design (0% - Critical Gap)
    { category: 'system-design', question: 'Q5', isCorrect: false, correctOption: 'Write-Through', explanation: 'Write-Through writes cache and DB synchronously.' }
  ];

  test('should classify proficiency tiers accurately across technical domains', () => {
    const report = DiagnosticEngine.analyzeKnowledgeGaps(gradedSample);

    assert.equal(report.categories['python'].proficiency, 'MASTERED');
    assert.equal(report.categories['python'].accuracyPercentage, 100);

    assert.equal(report.categories['sql'].proficiency, 'NEEDS_REVIEW');
    assert.equal(report.categories['sql'].accuracyPercentage, 50);

    assert.equal(report.categories['system-design'].proficiency, 'CRITICAL_GAP');
    assert.equal(report.categories['system-design'].accuracyPercentage, 0);

    assert.equal(report.masteredCount, 1);
    assert.equal(report.gapCount, 2);
    assert.equal(report.overallProficiency, 'REVISION_RECOMMENDED');
  });

  test('should generate prioritized study plan targeting knowledge gaps first', () => {
    const report = DiagnosticEngine.analyzeKnowledgeGaps(gradedSample);
    assert.equal(report.studyPlan.length, 2);

    // High priority critical gap first
    assert.equal(report.studyPlan[0].category, 'system-design');
    assert.equal(report.studyPlan[0].priority, 'HIGH');
    assert.equal(report.studyPlan[0].reviewItems.length, 1);
    assert.equal(report.studyPlan[0].reviewItems[0].correctAnswer, 'Write-Through');
  });

  test('should return empty report when no submission details exist', () => {
    const report = DiagnosticEngine.analyzeKnowledgeGaps([]);
    assert.equal(report.masteredCount, 0);
    assert.equal(report.studyPlan.length, 0);
  });
});
