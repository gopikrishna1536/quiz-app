/**
 * 1-Parameter Logistic (1PL) Rasch Model Ability Estimation
 * P(correct) = 1 / (1 + exp(-(theta - b)))
 */
function calculateProbCorrect(theta, b) {
  return 1 / (1 + Math.exp(-(theta - b)));
}

function estimateStudentAbility(itemDifficulties, responses, maxIterations = 20) {
  let theta = 0.0; // initial ability estimate
  for (let iter = 0; iter < maxIterations; iter++) {
    let f = 0;
    let fPrime = 0;
    for (let i = 0; i < itemDifficulties.length; i++) {
      const b = itemDifficulties[i];
      const p = calculateProbCorrect(theta, b);
      const q = 1 - p;
      f += (responses[i] - p);
      fPrime -= (p * q);
    }
    if (Math.abs(fPrime) < 1e-6) break;
    const delta = f / fPrime;
    theta -= delta;
    if (Math.abs(delta) < 1e-4) break;
  }
  return Number(theta.toFixed(2));
}

module.exports = { calculateProbCorrect, estimateStudentAbility };
