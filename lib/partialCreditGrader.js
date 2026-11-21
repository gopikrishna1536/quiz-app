/**
 * Multi-Select Question (MSQ) Partial Credit Grader
 */
class PartialCreditGrader {
  static gradeMsq(selectedOptions, correctOptions, maxPoints = 2.0) {
    const selected = new Set(selectedOptions);
    const correct = new Set(correctOptions);

    let truePositives = 0;
    let falsePositives = 0;

    for (const s of selected) {
      if (correct.has(s)) truePositives++;
      else falsePositives++;
    }

    // Zero marks if any incorrect choice was selected
    if (falsePositives > 0) {
      return { awardedPoints: 0.0, isPartiallyCorrect: false };
    }

    const fraction = truePositives / correct.size;
    const points = Number((fraction * maxPoints).toFixed(2));

    return {
      awardedPoints: points,
      isFullyCorrect: fraction === 1.0,
      isPartiallyCorrect: fraction > 0 && fraction < 1.0
    };
  }
}

module.exports = PartialCreditGrader;
