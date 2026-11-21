/**
 * Tamper-Evident Completion Certificate HMAC Signer
 */
const crypto = require('crypto');

function signCertificate({ studentId, courseId, gradePercent, secretKey = 'dev-secret' }) {
  const payload = `${studentId}:${courseId}:${gradePercent}`;
  const hmac = crypto.createHmac('sha256', secretKey).update(payload).digest('hex');
  return { payload, hmac };
}

function verifyCertificate(payload, hmac, secretKey = 'dev-secret') {
  const expected = crypto.createHmac('sha256', secretKey).update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expected));
}

module.exports = { signCertificate, verifyCertificate };
