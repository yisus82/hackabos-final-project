'use strict';

const activate = require('../../../../../domain/use-cases/user/activate-uc');

/**
 * Activates an user account
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} next Next function
 */
async function activateController(req, res, next) {
  const { verificationCode } = req.query;

  try {
    await activate(verificationCode);
    return res.status(301).redirect(`${process.env.FRONTEND_BASE_URL}/users/login`);
  } catch (err) {
    return next(err);
  }
}

module.exports = activateController;
