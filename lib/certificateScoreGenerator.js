const crypto = require('node:crypto');

/**
 * Verifiable Assessment Completion Certificate Generator
 */
class CertificateScoreGenerator {
  static generateCertificate(studentName, courseTitle, scorePercent, passingThreshold = 70) {
    const passed = scorePercent >= passingThreshold;
    if (!passed) {
      return { issued: false, message: 'Passing score not achieved' };
    }

    const issueDate = new Date().toISOString();
    const certPayload = `${studentName}:${courseTitle}:${scorePercent}:${issueDate}`;
    const certId = crypto.createHash('sha256').update(certPayload).digest('hex').slice(0, 16).toUpperCase();

    return {
      issued: true,
      certificateId: `CERT-${certId}`,
      studentName,
      courseTitle,
      scorePercent,
      issueDate,
      verificationUrl: `https://quiz.platform.io/verify/CERT-${certId}`
    };
  }
}

module.exports = CertificateScoreGenerator;
