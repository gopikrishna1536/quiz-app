/**
 * Computerized Adaptive Testing (CAT) Standard Error Stopping Rule
 */
function shouldStopCatTest({ testLength, minItems = 5, maxItems = 30, standardError, targetSem = 0.30 }) {
  if (testLength < minItems) return false;
  if (testLength >= maxItems) return true;
  return standardError <= targetSem;
}

module.exports = { shouldStopCatTest };
