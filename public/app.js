let selectedCategory = '';
let currentQuestions = [];
let currentIndex = 0;
let userAnswers = [];

const setupView = document.getElementById('setup-view');
const quizView = document.getElementById('quiz-view');
const resultsView = document.getElementById('results-view');
const categoryGrid = document.getElementById('category-buttons');
const startBtn = document.getElementById('start-btn');

async function initCategories() {
  try {
    const res = await fetch('/api/categories');
    const data = await res.json();
    categoryGrid.innerHTML = '';

    const allBtn = document.createElement('button');
    allBtn.className = 'cat-btn selected';
    allBtn.textContent = 'All Categories';
    allBtn.onclick = () => selectCategory('', allBtn);
    categoryGrid.appendChild(allBtn);

    data.categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'cat-btn';
      btn.textContent = cat.toUpperCase();
      btn.onclick = () => selectCategory(cat, btn);
      categoryGrid.appendChild(btn);
    });
  } catch (err) {
    console.error('Failed to load categories', err);
  }
}

function selectCategory(cat, btn) {
  selectedCategory = cat;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

startBtn.onclick = async () => {
  const url = selectedCategory ? `/api/questions?category=${selectedCategory}` : '/api/questions';
  const res = await fetch(url);
  const data = await res.json();

  currentQuestions = data.questions;
  currentIndex = 0;
  userAnswers = [];

  setupView.classList.add('hidden');
  resultsView.classList.add('hidden');
  quizView.classList.remove('hidden');

  renderQuestion();
};

function renderQuestion() {
  const q = currentQuestions[currentIndex];
  document.getElementById('question-tracker').textContent = `Question ${currentIndex + 1} of ${currentQuestions.length}`;
  document.getElementById('category-badge').textContent = q.category;
  document.getElementById('progress-bar').style.width = `${((currentIndex) / currentQuestions.length) * 100}%`;
  document.getElementById('question-text').textContent = q.question;

  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = '';

  const nextBtn = document.getElementById('next-btn');
  nextBtn.disabled = true;

  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.onclick = () => {
      document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      userAnswers[currentIndex] = { questionId: q.id, selectedIndex: idx };
      nextBtn.disabled = false;
    };
    optionsContainer.appendChild(btn);
  });
}

document.getElementById('next-btn').onclick = async () => {
  if (currentIndex < currentQuestions.length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    // Submit quiz
    const res = await fetch('/api/quiz/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ submissions: userAnswers })
    });
    const result = await res.json();
    renderResults(result.report);
  }
};

function renderResults(report) {
  quizView.classList.add('hidden');
  resultsView.classList.remove('hidden');

  document.getElementById('grade-badge').textContent = report.grade;
  document.getElementById('score-text').textContent = `You scored ${report.scorePercentage}% (${report.correctCount} / ${report.totalQuestions})`;

  const reviewContainer = document.getElementById('review-container');
  reviewContainer.innerHTML = '';

  report.details.forEach(item => {
    const div = document.createElement('div');
    div.className = `review-item ${item.isCorrect ? 'correct' : 'incorrect'}`;
    div.innerHTML = `
      <p><strong>${item.question}</strong></p>
      <p>Your answer: ${item.selectedOption} ${item.isCorrect ? '✓' : '✗'}</p>
      ${!item.isCorrect ? `<p>Correct answer: <strong>${item.correctOption}</strong></p>` : ''}
      <p style="color: var(--muted); font-size: 0.85rem; margin-top: 6px;">💡 ${item.explanation}</p>
    `;
    reviewContainer.appendChild(div);
  });
}

document.getElementById('restart-btn').onclick = () => {
  resultsView.classList.add('hidden');
  setupView.classList.remove('hidden');
};

initCategories();
