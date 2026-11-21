# Psychometric Assessment & Testing System Design Specification

## 1. System Overview
The Quiz Assessment engine is engineered for psychometric evaluation, adaptive item response theory (IRT), and secure certification.

## 2. Integrated Psychometric Modules
- `src/utils/cronbachAlphaReliability.js`: Cronbach's alpha internal consistency.
- `src/utils/biserialCorrelation.js`: Point-biserial item discrimination index.
- `src/utils/distractorEfficiencyAnalyzer.js`: Distractor efficiency and plausibility.
- `src/utils/raschModelAbilityScorer.js`: 1PL Rasch latent student ability estimation.
- `src/utils/speedAccuracyTradeoff.js`: Speed-accuracy reward scoring.
- `src/utils/spacedRepetitionScheduler.js`: SuperMemo SM-2 spaced repetition.
- `src/utils/quizStreakMultiplier.js`: Combo streak point multiplier.
- `src/utils/rubricMatrixScorer.js`: Multi-criterion weighted grading rubric.
- `src/utils/proctoringAnomalyDetector.js`: Integrity anomaly monitoring.
- `src/utils/eloQuestionRating.js`: Dual Elo question and learner ability.
- `src/utils/adaptiveTestStoppingRule.js`: Computerized Adaptive Testing (CAT) SEM rule.
- `src/utils/leaderboardTiebreakerEngine.js`: Tournament leaderboard tiebreaker.
- `src/utils/certificateCredentialSigner.js`: HMAC completion certificate security.
- `src/utils/bloomTaxonomyClassifier.js`: Bloom taxonomy cognitive complexity.

## 3. Automated Verification
```bash
node --test tests/*.test.js
```
