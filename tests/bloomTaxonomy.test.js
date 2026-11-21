const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { classifyQuestionCognitiveLevel } = require('../src/utils/bloomTaxonomyClassifier');

describe('Bloom Taxonomy Classifier Tests', () => {
  test('classifies question cognitive level accurately from action verbs', () => {
    assert.equal(classifyQuestionCognitiveLevel('Calculate the variance of the sample'), 'Apply');
    assert.equal(classifyQuestionCognitiveLevel('Design a microservices architecture'), 'Create');
  });
});
