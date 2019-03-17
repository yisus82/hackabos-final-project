'use strict';

const activateAccount = require('../../../../../domain/use-cases/activate-account-uc');

/**
 * Activates an user account
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} next Next function
 */
async function activateAccountController(req, res, next) {
  const { verificationCode } = req.query;

  try {
    const message = await activateAccount(verificationCode);
    return res.send(message);
  } catch (err) {
    return next(err);
  }
}

module.exports = activateAccountController;
