'use strict';

const register = require('../../../../../domain/use-cases/user/register-uc');

/**
 * Creates an user account
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} next Next function
 */
async function registerController(req, res, next) {
  const accountData = { ...req.body };

  try {
    await register(accountData);
    return res.status(204).json();
  } catch (err) {
    return next(err);
  }
}

module.exports = registerController;
