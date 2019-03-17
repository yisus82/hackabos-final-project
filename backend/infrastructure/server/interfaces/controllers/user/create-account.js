'use strict';

const createAccount = require('../../../../../domain/use-cases/user/create-account-uc');

/**
 * Creates an user account
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} next Next function
 */
async function createAccountController(req, res, next) {
  const accountData = { ...req.body };

  try {
    await createAccount(accountData);
    return res.status(204).json();
  } catch (err) {
    return next(err);
  }
}

module.exports = createAccountController;
