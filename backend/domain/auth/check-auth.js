'use strict';

const jwt = require('jsonwebtoken');
const createMediAddictedError = require('../errors/mediaddicted-error');

/**
 * Checks authorization
 * @param {String} auth Auth token
 * @returns {Object} Decoded token for authenticated user, object with role 'guest' if no auth
 */
async function checkAuth(auth) {
  if (!auth) {
    return {
      role: 'guest',
    };
  }

  const [prefix, token] = auth.split(' ');
  if (prefix !== 'JWT') {
    throw createMediAddictedError(401, 'Token format invalid');
  }

  if (!token) {
    throw createMediAddictedError(401, 'Token was not provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.AUTH_JWT_SECRET);

    if (!decoded) {
      throw createMediAddictedError(401, 'Token invalid');
    }

    return decoded;
  } catch (e) {
    throw createMediAddictedError(401, 'Error verifying token');
  }
}

module.exports = checkAuth;
