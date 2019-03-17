'use strict';

const changePassword = require('../../../../../domain/use-cases/user/change-password-uc');

/**
 * Updates user's password
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} next Next function
 */
async function changePasswordController(req, res, next) {
  const passwordData = { ...req.body };
  const { authorization } = req.headers;

  try {
    await changePassword(passwordData, authorization);
    return res.send();
  } catch (err) {
    return next(err);
  }
}

module.exports = changePasswordController;
