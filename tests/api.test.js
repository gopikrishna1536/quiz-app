const { test, describe, before, after } = require('node:test');
const assert = require('node:assert');
const app = require('../server');

describe('Quiz App HTTP Endpoints & Category Tests', () => {
  let server;
  let baseUrl;

  before(async () => {
    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}`;
        resolve();
      });
    });
  });

  after(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  test('GET /health returns status ok and total questions count', async () => {
    const res = await fetch(`${baseUrl}/health`);
    const data = await res.json();
    assert.strictEqual(res.status, 200);
    assert.strictEqual(data.status, 'ok');
    assert.strictEqual(data.totalQuestions, 12);
  });

  test('GET /api/categories returns all available categories', async () => {
    const res = await fetch(`${baseUrl}/api/categories`);
    const data = await res.json();
    assert.strictEqual(res.status, 200);
    assert.ok(data.categories.includes('python'));
    assert.ok(data.categories.includes('sql'));
    assert.ok(data.categories.includes('system-design'));
    assert.ok(data.categories.includes('devops'));
  });

  test('GET /api/questions?category=sql filters by category and sanitizes answers', async () => {
    const res = await fetch(`${baseUrl}/api/questions?category=sql`);
    const data = await res.json();
    assert.strictEqual(res.status, 200);
    assert.strictEqual(data.count, 2);

    for (const q of data.questions) {
      assert.strictEqual(q.category, 'sql');
      // Must NOT leak correctIndex to client!
      assert.strictEqual(q.correctIndex, undefined);
      assert.strictEqual(q.explanation, undefined);
    }
  });

  test('POST /api/quiz/submit-timed calculates timed bonus points', async () => {
    const res = await fetch(`${baseUrl}/api/quiz/submit-timed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        submissions: [
          { questionId: 7, selectedIndex: 3, timeTakenSeconds: 5 }, // correct (Durability)
          { questionId: 8, selectedIndex: 1, timeTakenSeconds: 10 } // correct (B-Tree)
        ]
      })
    });

    const data = await res.json();
    assert.strictEqual(res.status, 200);
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.report.correctCount, 2);
    assert.strictEqual(data.report.maxStreak, 2);
    assert.ok(data.report.totalPoints > 200);
  });
});
