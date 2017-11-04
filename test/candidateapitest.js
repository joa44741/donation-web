'use strict';

const assert = require('chai').assert;
var request = require('sync-request');

suite('Candidate API tests', function () {

  test('get candidates', function () {

    const url = 'http://localhost:4000/api/candidates';
    var res = request('GET', url);
    const candidates = JSON.parse(res.getBody('utf8'));

    assert.equal(2, candidates.length);

    assert.equal(candidates[0].firstName, 'Lisa');
    assert.equal(candidates[0].lastName, 'Simpson');
    assert.equal(candidates[0].office, 'President');

    assert.equal(candidates[1].firstName, 'Donald');
    assert.equal(candidates[1].lastName, 'Simpson');
    assert.equal(candidates[1].office, 'President');

  });

  test('get one candidate', function () {

    const allCandidatesUrl = 'http://localhost:4000/api/candidates';
    var res = request('GET', allCandidatesUrl);
    const candidates = JSON.parse(res.getBody('utf8'));

    const oneCandidateUrl = allCandidatesUrl + '/' + candidates[0]._id;
    res = request('GET', oneCandidateUrl);
    const oneCandidate = JSON.parse(res.getBody('utf8'));

    assert.equal(oneCandidate.firstName, 'Lisa');
    assert.equal(oneCandidate.lastName, 'Simpson');
    assert.equal(oneCandidate.office, 'President');

  });

  test('create a candidate', function () {

    const candidatesUrl = 'http://localhost:4000/api/candidates';
    const newCandidate = {
      firstName: 'Barnie',
      lastName: 'Grumble',
      office: 'President',
    };

    const res = request('POST', candidatesUrl, { json: newCandidate });
    const returnedCandidate = JSON.parse(res.getBody('utf8'));

    assert.equal(returnedCandidate.firstName, 'Barnie');
    assert.equal(returnedCandidate.lastName, 'Grumble');
    assert.equal(returnedCandidate.office, 'President');

  });

  test('delete one candidate', function () {

    const allCandidatesUrl = 'http://localhost:4000/api/candidates';
    let res = request('GET', allCandidatesUrl);
    let candidates = JSON.parse(res.getBody('utf8'));

    const oneCandidateUrl = allCandidatesUrl + '/' + candidates[2]._id;
    res = request('DELETE', oneCandidateUrl);
    const statusCode = res.statusCode;

    assert.equal(statusCode, 204);

    res = request('GET', allCandidatesUrl);
    candidates = JSON.parse(res.getBody('utf8'));

    assert.equal(2, candidates.length);

    assert.equal(candidates[0].firstName, 'Lisa');
    assert.equal(candidates[0].lastName, 'Simpson');
    assert.equal(candidates[0].office, 'President');

    assert.equal(candidates[1].firstName, 'Donald');
    assert.equal(candidates[1].lastName, 'Simpson');
    assert.equal(candidates[1].office, 'President');

  });

  test('delete all candidates', function () {

    const allCandidatesUrl = 'http://localhost:4000/api/candidates';

    let res = request('DELETE', allCandidatesUrl);
    const statusCode = res.statusCode;

    assert.equal(statusCode, 204);

    res = request('GET', allCandidatesUrl);
    let candidates = JSON.parse(res.getBody('utf8'));

    assert.equal(0, candidates.length);

    const lisa = {
      firstName: 'Lisa',
      lastName: 'Simpson',
      office: 'President',
    };

    const donald = {
      firstName: 'Donald',
      lastName: 'Simpson',
      office: 'President',
    };

    request('POST', allCandidatesUrl, { json: lisa });
    request('POST', allCandidatesUrl, { json: donald });

  });
});
