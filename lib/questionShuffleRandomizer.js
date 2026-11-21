/**
 * Seeded Fisher-Yates Shuffle Randomizer
 */
class QuestionShuffleRandomizer {
  static pseudoRandom(seed) {
    let s = seed;
    return () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  }

  static shuffle(array, seed = 42) {
    const copy = [...array];
    const rng = QuestionShuffleRandomizer.pseudoRandom(seed);
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
}

module.exports = QuestionShuffleRandomizer;
