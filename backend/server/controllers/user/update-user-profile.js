'use strict';

const Joi = require('joi');

const userModel = require('../../../db/models/user-model');

/**
 * Validates data
 * @param {Object} payload Data to be validated
 * @returns {Object} The validation result
 */
async function validate(payload) {
  const schema = {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    userName: Joi.string()
      .min(5)
      .max(30)
      .required(),
  };

  return Joi.validate(payload, schema);
}

/**
 * Updates some data from a user's profile
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
async function updateUserProfile(req, res) {
  const userProfileData = { ...req.body };
  const { claims } = req;
  try {
    await validate(userProfileData);
  } catch (err) {
    return res.status(400).send(err.message);
  }
  try {
    await userModel.updateData(claims.uuid, userProfileData.email, userProfileData.userName);
    return res.status(204).send();
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

module.exports = updateUserProfile;
