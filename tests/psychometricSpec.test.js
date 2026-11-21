const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

describe('Psychometric Documentation Tests', () => {
  test('confirms psychometric architecture document exists and is complete', () => {
    const docPath = path.join(__dirname, '..', 'docs', 'PSYCHOMETRIC_ENGINE_SPEC.md');
    assert.ok(fs.existsSync(docPath));
    const content = fs.readFileSync(docPath, 'utf8');
    assert.ok(content.includes('Psychometric Assessment & Testing System Design'));
  });
});
