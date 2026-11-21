/**
 * Dual Elo Question & Student Ability Updater
 */
function updateQuestionElo(studentElo, questionElo, isCorrect, k = 16) {
  const expectedStudentWin = 1 / (1 + Math.pow(10, (questionElo - studentElo) / 400));
  const studentActual = isCorrect ? 1.0 : 0.0;

  const newStudentElo = Math.round(studentElo + k * (studentActual - expectedStudentWin));
  const newQuestionElo = Math.round(questionElo + k * ((1 - studentActual) - (1 - expectedStudentWin)));

  return { newStudentElo, newQuestionElo };
}

module.exports = { updateQuestionElo };
