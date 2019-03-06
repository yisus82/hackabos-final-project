'use strict';

const bcrypt = require('bcrypt');
const Joi = require('joi');
const sendgridMail = require('@sendgrid/mail');
const uuidV4 = require('uuid/v4');
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
    username: Joi.string()
      .regex(/^[a-z0-9]{5,20}$/)
      .required(),
  };

  return Joi.validate(payload, schema);
}

/**
 * Insert the user into the database generating an uuid and calculating the bcrypt password
 * @param {String} email User email. It must be unique in User Schema
 * @param {String} password User password in plain text
 * @param {String} username User screen name in the application. It must be unique in User Schema
 * @returns {String} Code to verify user email. It must be unique in User Schema
 */
async function insertUserIntoDatabase(email, password, username) {
  const saltRounds = parseInt(process.env.AUTH_BCRYPT_SALT_ROUNDS, 10);
  const securePassword = await bcrypt.hash(password, saltRounds);
  const uuid = uuidV4();

  return userModel.createAccount(uuid, email, securePassword, username);
}

/**
 * Send an email with a verification link to the user to activate the account
 * @param {String} email User email
 * @param {String} username User screen name in the application
 * @param {String} verificationCode Code to verify user email
 * @returns {Object} Sengrid response
 */
async function sendEmailRegistration(email, username, verificationCode) {
  sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    from: {
      email: process.env.SENDGRID_FROM,
      name: 'MediAddicted',
    },
    to: email,
    dynamic_template_data: {
      username,
      serverDomain: process.env.HTTP_SERVER_DOMAIN,
      verificationCode,
    },
    template_id: process.env.SENDGRID_TEMPLATE_ID,
  };

  return sendgridMail.send(msg);
}

/**
 * Creates an user account
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} next Next function
 */
async function create(req, res, next) {
  const accountData = { ...req.body };

  try {
    await validateSchema(accountData);
  } catch (err) {
    return res.status(400).send(err);
  }

  const { email, password, username } = accountData;

  try {
    const emailFound = await userModel.findByEmail(email);
    if (emailFound) {
      return res.status(400).send('Duplicated email');
    }

    const userNameFound = await userModel.findByUserName(username);
    if (userNameFound) {
      return res.status(400).send('Duplicated username');
    }

    const verificationCode = await insertUserIntoDatabase(email, password, username);
    try {
      await sendEmailRegistration(email, username, verificationCode);
    } catch (err) {
      console.error('Sengrid error: ', err.response.body.errors);
    }

    return res.status(204).json();
  } catch (err) {
    return next(err);
  }
}

module.exports = create;
