'use strict';

exports.main = {
  auth: false,
  handler: function (request, reply) {
    reply.view('main', {title: 'Welcome to Donations'});
  },

};

exports.signup = {
  auth: false,
  handler: function (request, reply) {
    reply.view('signup', {title: 'Sign up for Donations'});
  },

};

exports.login = {
  auth: false,
  handler: function (request, reply) {
    reply.view('login', {title: 'Login to Donations'});
  },

};

exports.authenticate = {
  auth: false,
  handler: function (request, reply) {
    const user = request.payload;
    if ((user.email in this.users) && (user.password === this.users[user.email].password)) {
      request.cookieAuth.set({
        loggedIn: true,
        loggedInUser: user.email,
      });
      reply.redirect('/home');
    } else {
      reply.redirect('/login');
    }
  },

};

exports.logout = {
  auth: false,
  handler: function (request, reply) {
    request.cookieAuth.clear();
    reply.redirect('/');
  },

};

exports.register = {
  auth: false,
  handler: function (request, reply) {
    const user = request.payload;
    this.users[user.email] = user;
    reply.redirect('/login');
  },

};

exports.viewSettings = {
  handler: function (request, reply) {
    const userEmail = request.auth.credentials.loggedInUser;
    const user = this.users[userEmail];
    reply.view('settings', {user: user});
  },

};

exports.updateSettings = {
  handler: function (request, reply) {
    const oldUserEmail = request.auth.credentials.loggedInUser;
    delete this.users[oldUserEmail];
    const user = request.payload;
    this.users[user.email] = user;
    request.cookieAuth.set({
      loggedIn: true,
      loggedInUser: user.email,
    });
    reply.redirect('/settings');
  },

};