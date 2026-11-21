const test = require('node:test');
const assert = require('node:assert/strict');
const CertificateScoreGenerator = require('../lib/certificateScoreGenerator');

test('Certificate Generator Tests', async (t) => {
  await t.test('should generate certificate hash for passing candidate', () => {
    const cert = CertificateScoreGenerator.generateCertificate('Gopi Krishna', 'System Architecture Masterclass', 92);
    assert.equal(cert.issued, true);
    assert.ok(cert.certificateId.startsWith('CERT-'));
  });
});
