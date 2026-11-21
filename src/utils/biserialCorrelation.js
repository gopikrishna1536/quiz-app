/**
 * Point-Biserial Item Discrimination Index
 * Formula: r_pbi = ((M1 - M0) / Sn) * sqrt(p * q)
 */
function calculatePointBiserial({ studentTotals, itemScores }) {
  const n = studentTotals.length;
  let correctTotals = [];
  let incorrectTotals = [];

  for (let i = 0; i < n; i++) {
    if (itemScores[i] === 1) correctTotals.push(studentTotals[i]);
    else incorrectTotals.push(studentTotals[i]);
  }

  const p = correctTotals.length / n;
  const q = 1 - p;
  if (p === 0 || q === 0) return 0;

  const mean1 = correctTotals.reduce((a, b) => a + b, 0) / correctTotals.length;
  const mean0 = incorrectTotals.reduce((a, b) => a + b, 0) / incorrectTotals.length;

  const overallMean = studentTotals.reduce((a, b) => a + b, 0) / n;
  const stdDev = Math.sqrt(studentTotals.reduce((sum, val) => sum + Math.pow(val - overallMean, 2), 0) / n);

  if (stdDev === 0) return 0;
  const rPbi = ((mean1 - mean0) / stdDev) * Math.sqrt(p * q);
  return Number(rPbi.toFixed(3));
}

module.exports = { calculatePointBiserial };
