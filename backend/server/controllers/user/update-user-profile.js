'use strict';

const Joi = require('joi');
const bcrypt = require('bcrypt');

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
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    userName: Joi.string()
      .min(5)
      .max(30)
      .required(),
  };

  return Joi.validate(payload, schema);
}

async function updateUserProfile(req, res) {
  const userProfileData = { ...req.body };
  const { claims } = req;
  try {
    await validate(userProfileData);
  } catch (err) {
    return res.status(400).send(err.message);
  }
  const saltRounds = parseInt(process.env.AUTH_BCRYPT_SALT_ROUNDS, 10);
  const securePassword = await bcrypt.hash(userProfileData.password, saltRounds);
  try {
    await userModel.updateData(
      claims.uuid,
      userProfileData.email,
      securePassword,
      userProfileData.userName
    );
    return res.status(204).send();
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

module.exports = updateUserProfile;
