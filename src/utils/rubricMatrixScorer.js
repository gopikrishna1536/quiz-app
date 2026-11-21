/**
 * Weighted Rubric Matrix Grading Evaluator
 */
function scoreRubric(criteria) {
  if (!Array.isArray(criteria) || criteria.length === 0) return { totalScore: 0, maxScore: 0 };
  let weightedScore = 0;
  let totalWeight = 0;

  criteria.forEach(c => {
    const weight = c.weight || 1;
    const score = c.earnedScore || 0;
    const max = c.maxScore || 10;
    weightedScore += (score / max) * weight * 100;
    totalWeight += weight;
  });

  const finalPercentage = totalWeight > 0 ? weightedScore / totalWeight : 0;
  return {
    percentage: Number(finalPercentage.toFixed(1)),
    gradeLetter: finalPercentage >= 90 ? 'A' : (finalPercentage >= 80 ? 'B' : (finalPercentage >= 70 ? 'C' : 'F'))
  };
}

module.exports = { scoreRubric };
