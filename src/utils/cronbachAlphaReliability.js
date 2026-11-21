/**
 * Cronbach's Alpha Internal Consistency Reliability
 * Formula: alpha = (K / (K - 1)) * (1 - (sum(itemVariances) / totalVariance))
 */
function calculateVariance(values) {
  if (values.length <= 1) return 0;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const ss = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
  return ss / (values.length - 1);
}

function calculateCronbachAlpha(responseMatrix) {
  // responseMatrix: N students x K questions
  const n = responseMatrix.length;
  const k = responseMatrix[0].length;
  if (k <= 1 || n <= 1) return 0;

  let sumItemVariances = 0;
  for (let j = 0; j < k; j++) {
    const col = responseMatrix.map(row => row[j]);
    sumItemVariances += calculateVariance(col);
  }

  const totalScores = responseMatrix.map(row => row.reduce((a, b) => a + b, 0));
  const totalVariance = calculateVariance(totalScores);

  if (totalVariance === 0) return 0;
  const alpha = (k / (k - 1)) * (1 - (sumItemVariances / totalVariance));
  return Number(Math.max(0, Math.min(1, alpha)).toFixed(3));
}

module.exports = { calculateVariance, calculateCronbachAlpha };
