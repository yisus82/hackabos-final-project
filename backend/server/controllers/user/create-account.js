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
    userName: Joi.string()
      .min(5)
      .max(30)
      .required(),
  };

  return Joi.validate(payload, schema);
}

/**
 * Insert the user into the database generating an uuid and calculating the bcrypt password
 * @param {String} email User email. It must be unique in User Schema
 * @param {String} password User password in plain text
 * @param {String} userName User screen name in the application. It must be unique in User Schema
 * @return {String} verificationCode Code to verify user email. It must be unique in User Schema
 */
async function insertUserIntoDatabase(email, password, userName) {
  const saltRounds = parseInt(process.env.AUTH_BCRYPT_SALT_ROUNDS, 10);
  const securePassword = await bcrypt.hash(password, saltRounds);
  const uuid = uuidV4();

  return userModel.createAccount(uuid, email, securePassword, userName);
}

/**
 * Send an email with a verification link to the user to activate the account
 * @param {String} email User email
 * @param {String} verificationCode Code to verify user email
 * @return {Object} Sengrid response
 */
async function sendEmailRegistration(email, verificationCode) {
  sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: {
      email: process.env.SENDGRID_FROM,
      name: 'MediAddicted',
    },
    subject: 'Welcome to MediAddicted',
    text: '',
    html: `To confirm your account <a href="${
      process.env.HTTP_SERVER_DOMAIN
    }/user/activate?verification_code=${verificationCode}">activate it here</a>`,
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

  const { email, password, userName } = accountData;

  try {
    const verificationCode = await insertUserIntoDatabase(email, password, userName);
    res.status(204).json();

    try {
      await sendEmailRegistration(email, verificationCode);
    } catch (err) {
      console.error('Sengrid error', err);
    }

    return null;
  } catch (err) {
    return next(err);
  }
}

module.exports = create;
