'use strict';

const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userModel = require('../../../db/models/user-model');

/**
 * Validates data
 * @param {Object} payload Data to be validated
 * @returns {Object} The validation result
 */
async function validateSchema(payload) {
  const schema = {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
  };

  return Joi.validate(payload, schema);
}

/**
 * Authenticates a user
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
async function login(req, res) {
  const accountData = { ...req.body };

  try {
    await validateSchema(accountData);
  } catch (err) {
    return res.status(400).send(err);
  }

  try {
    const userProfileData = await userModel.findByEmail(accountData.email);

    if (!userProfileData) {
      return res.status(404).send();
    }

    if (!userProfileData.verifiedAt) {
      return res.status(403).send();
    }

    if (!(await bcrypt.compare(accountData.password, userProfileData.password))) {
      return res.status(401).send();
    }

    const payloadJWT = {
      uuid: userProfileData.uuid,
      username: userProfileData.username,
      email: userProfileData.email,
      role: userProfileData.role,
    };
    const jwtTokenExpiration = parseInt(process.env.AUTH_ACCESS_TOKEN_TTL, 10);
    const token = jwt.sign(payloadJWT, process.env.AUTH_JWT_SECRET, {
      expiresIn: jwtTokenExpiration,
    });
    const response = {
      accessToken: token,
      expiresIn: jwtTokenExpiration,
    };
    return res.json(response);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

module.exports = login;
