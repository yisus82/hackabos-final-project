'use strict';

const login = require('../../../../../domain/use-cases/user/login-uc');

/**
 * Authenticates a user
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} next Next function
 */
async function loginController(req, res, next) {
  try {
    const accountData = { ...req.body };
    const { token, ...userProfileData } = await login(accountData);
    return res.json({ token, ...userProfileData });
  } catch (err) {
    return next(err);
  }
}

module.exports = loginController;
