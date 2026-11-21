const express = require('express');
const path = require('path');
const cors = require('cors');
const questions = require('./data/questions.json');
const { gradeQuizSubmission, scoreContestSubmission } = require('./lib/grader');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Health endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Quiz Assessment API', totalQuestions: questions.length });
});

// Categories list
app.get('/api/categories', (req, res) => {
  const categories = [...new Set(questions.map(q => q.category))];
  res.json({ categories });
});

// Get quiz questions (omits correctIndex for security)
app.get('/api/questions', (req, res) => {
  const { category, limit = 5 } = req.query;

  let filtered = questions;
  if (category) {
    filtered = filtered.filter(q => q.category.toLowerCase() === category.toLowerCase());
  }

  // Sanitize: do not send correct answers to client before submission!
  const sanitized = filtered.slice(0, parseInt(limit)).map(q => ({
    id: q.id,
    category: q.category,
    question: q.question,
    options: q.options
  }));

  res.json({ questions: sanitized, count: sanitized.length });
});

// Submit answers and receive score report
app.post('/api/quiz/submit', (req, res) => {
  try {
    const { submissions } = req.body;
    if (!submissions || !Array.isArray(submissions)) {
      return res.status(400).json({ error: 'Submissions array is required.' });
    }

    const report = gradeQuizSubmission(questions, submissions);
    res.json({ success: true, report });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit timed contest answers with speed bonuses and streak multipliers
app.post('/api/quiz/submit-timed', (req, res) => {
  try {
    const { submissions, timeLimitSeconds } = req.body;
    if (!submissions || !Array.isArray(submissions)) {
      return res.status(400).json({ error: 'Submissions array is required.' });
    }

    const report = scoreContestSubmission(questions, submissions, { timeLimitSeconds });
    res.json({ success: true, report });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Quiz server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
