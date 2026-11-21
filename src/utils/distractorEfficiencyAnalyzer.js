/**
 * Multiple Choice Distractor Efficiency Analyzer
 */
function analyzeDistractors(options, selectionCounts, totalTakers) {
  return options.map(opt => {
    const count = selectionCounts[opt.key] || 0;
    const selectionRate = totalTakers > 0 ? (count / totalTakers) * 100 : 0;
    const isFunctional = opt.isCorrect ? true : selectionRate >= 5.0; // chosen by at least 5%

    return {
      key: opt.key,
      isCorrect: opt.isCorrect,
      selectionCount: count,
      selectionRatePercent: Number(selectionRate.toFixed(1)),
      isFunctional
    };
  });
}

module.exports = { analyzeDistractors };
