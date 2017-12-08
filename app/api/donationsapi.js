'use strict';

const Donation = require('../models/donation');
const Boom = require('boom');
const utils = require('./utils');

exports.findAllDonations = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Donation.find({}).populate('donor').populate('candidate').then(donations => {
      reply(donations);
    }).catch(err => {
      reply(Boom.badImplementation('error accessing db'));
    });
  },
};

exports.findDonations = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Donation.find({ candidate: request.params.id }).populate('donor').populate('candidate').then(donations => {
      reply(donations);
    }).catch(err => {
      reply(Boom.badImplementation('error accessing db'));
    });
  },

};

exports.makeDonation = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    const donation = new Donation(request.payload);
    donation.candidate = request.params.id;

    const authorization = request.headers.authorization;
    const token = authorization.replace('bearer ', '');
    donation.donor = utils.decodeToken(token).userId;
    donation.save().then(newDonation => {
      return Donation.populate(newDonation, 'candidate');
    }).then(populatedDonation => {
      reply(populatedDonation).code(201);
    }).catch(err => {
      reply(Boom.badImplementation('error making donation'));
    });
  },

};

exports.deleteAllDonations = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Donation.remove({}).then(err => {
      reply().code(204);
    }).catch(err => {
      reply(Boom.badImplementation('error removing Donations'));
    });
  },

};

exports.deleteDonations = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Donation.remove({ candidate: request.params.id }).then(result => {
      reply().code(204);
    }).catch(err => {
      reply(Boom.badImplementation('error removing Donations'));
    });
  },
};
