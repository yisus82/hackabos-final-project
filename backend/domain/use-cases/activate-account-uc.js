'use strict';

const createMediAddictedError = require('../errors/mediaddicted-error');
const userRepository = require('../repositories/user-repository');

/**
 * Activates an user account
 * @param {String} verificationCode Code to verify user email
 * @returns {String} Message if no errors
 */
async function activateAccount(verificationCode) {
  if (!verificationCode) {
    throw createMediAddictedError(400, 'Invalid verification code');
  }

  const { foundUsers, activatedUsers } = await userRepository.activateAccount(verificationCode);

  if (activatedUsers === 1) {
    return 'Account successfully activated';
  }

  if (foundUsers === 1) {
    return 'Account already activated';
  }

  throw createMediAddictedError(404, 'Verification code invalid');
}

module.exports = activateAccount;
