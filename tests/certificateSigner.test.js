const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { signCertificate, verifyCertificate } = require('../src/utils/certificateCredentialSigner');

describe('Certificate HMAC Signer Tests', () => {
  test('generates valid cryptographic completion certificate token', () => {
    const cert = signCertificate({ studentId: 'student-123', courseId: 'algo-101', gradePercent: 95 });
    assert.equal(verifyCertificate(cert.payload, cert.hmac), true);
  });
});
