'use strict';

const assert = require('chai').assert;
var request = require('sync-request');

suite('User API tests', function () {

  test('get users', function () {

    const url = 'http://localhost:4000/api/users';
    var res = request('GET', url);
    const users = JSON.parse(res.getBody('utf8'));

    assert.equal(3, users.length);

    assert.equal(users[0].firstName, 'Homer');
    assert.equal(users[0].lastName, 'Simpson');
    assert.equal(users[0].email, 'homer@simpson.com');
    assert.equal(users[0].password, 'secret');

    assert.equal(users[1].firstName, 'Marge');
    assert.equal(users[1].lastName, 'Simpson');
    assert.equal(users[1].email, 'marge@simpson.com');
    assert.equal(users[1].password, 'secret');

    assert.equal(users[2].firstName, 'Bart');
    assert.equal(users[2].lastName, 'Simpson');
    assert.equal(users[2].email, 'bart@simpson.com');
    assert.equal(users[2].password, 'secret');


  });

  test('get one user', function () {

    const allUsersUrl = 'http://localhost:4000/api/users';
    var res = request('GET', allUsersUrl);
    const users = JSON.parse(res.getBody('utf8'));

    const oneUserUrl = allUsersUrl + '/' + users[0]._id;
    res = request('GET', oneUserUrl);
    const oneUser = JSON.parse(res.getBody('utf8'));

    assert.equal(oneUser.firstName, 'Homer');
    assert.equal(oneUser.lastName, 'Simpson');
    assert.equal(oneUser.email, 'homer@simpson.com');
    assert.equal(oneUser.password, 'secret');

  });

  test('create a user', function () {

    const usersUrl = 'http://localhost:4000/api/users';
    const newUser = {
      firstName: 'Andreas',
      lastName: 'John',
      email: 'john-andi@gmx.de',
      password: 'test',
    };

    const res = request('POST', usersUrl, { json: newUser });
    const returnedUser = JSON.parse(res.getBody('utf8'));

    assert.equal(returnedUser.firstName, 'Andreas');
    assert.equal(returnedUser.lastName, 'John');
    assert.equal(returnedUser.email, 'john-andi@gmx.de');
    assert.equal(returnedUser.password, 'test');

  });

  test('delete one user', function () {

    const allUsersUrl = 'http://localhost:4000/api/users';
    let res = request('GET', allUsersUrl);
    let users = JSON.parse(res.getBody('utf8'));

    const oneUserUrl = allUsersUrl + '/' + users[3]._id;
    res = request('DELETE', oneUserUrl);
    const statusCode = res.statusCode;

    assert.equal(statusCode, 204);

    res = request('GET', allUsersUrl);
    users = JSON.parse(res.getBody('utf8'));

    assert.equal(3, users.length);

    assert.equal(users[0].firstName, 'Homer');
    assert.equal(users[0].lastName, 'Simpson');
    assert.equal(users[0].email, 'homer@simpson.com');
    assert.equal(users[0].password, 'secret');

    assert.equal(users[1].firstName, 'Marge');
    assert.equal(users[1].lastName, 'Simpson');
    assert.equal(users[1].email, 'marge@simpson.com');
    assert.equal(users[1].password, 'secret');

    assert.equal(users[2].firstName, 'Bart');
    assert.equal(users[2].lastName, 'Simpson');
    assert.equal(users[2].email, 'bart@simpson.com');
    assert.equal(users[2].password, 'secret');

  });

  test('delete all users', function () {

    const allUsersUrl = 'http://localhost:4000/api/users';

    let res = request('DELETE', allUsersUrl);
    const statusCode = res.statusCode;

    assert.equal(statusCode, 204);

    res = request('GET', allUsersUrl);
    let users = JSON.parse(res.getBody('utf8'));

    assert.equal(0, users.length);

    const homer = {
      firstName: 'Homer',
      lastName: 'Simpson',
      email: 'homer@simpson.com',
      password: 'secret',
    };

    const marge = {
      firstName: 'Marge',
      lastName: 'Simpson',
      email: 'marge@simpson.com',
      password: 'secret',
    };

    const bart = {
      firstName: 'Bart',
      lastName: 'Simpson',
      email: 'bart@simpson.com',
      password: 'secret',
    };

    request('POST', allUsersUrl, { json: homer });
    request('POST', allUsersUrl, { json: marge });
    request('POST', allUsersUrl, { json: bart });

  });
});
