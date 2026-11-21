/**
 * Online Exam Proctoring Anomaly Detector
 */
function detectAnomalies({ tabSwitches, pasteEvents, rapidClickCount }) {
  let riskScore = 0;
  riskScore += (tabSwitches || 0) * 20;
  riskScore += (pasteEvents || 0) * 30;
  riskScore += (rapidClickCount || 0) * 10;

  return {
    anomalyScore: riskScore,
    flaggedForReview: riskScore >= 50
  };
}

module.exports = { detectAnomalies };
