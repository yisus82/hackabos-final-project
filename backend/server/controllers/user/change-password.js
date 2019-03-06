'use strict';

const bcrypt = require('bcrypt');
const Joi = require('joi');

const userModel = require('../../../db/models/user-model');

/**
 * Validates data
 * @param {Object} payload Data to be validated
 * @returns {Object} The validation result
 */
async function validate(payload) {
  const schema = {
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
  };

  return Joi.validate(payload, schema);
}

/**
 * Updates user's password
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
async function changePassword(req, res) {
  const bodyData = { ...req.body };
  const { claims } = req;
  try {
    await validate(bodyData);
  } catch (err) {
    return res.status(400).send(err.message);
  }
  const saltRounds = parseInt(process.env.AUTH_BCRYPT_SALT_ROUNDS, 10);
  const securePassword = await bcrypt.hash(bodyData.password, saltRounds);
  try {
    await userModel.changePassword(claims.uuid, securePassword);
    return res.status(204).send();
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

module.exports = changePassword;
