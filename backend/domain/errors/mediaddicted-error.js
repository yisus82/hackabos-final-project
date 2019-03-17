'use strict';

class MediAddictedError extends Error {
  constructor(status, message) {
    super();
    this.name = 'MediAddictedError';
    this.status = status;
    this.message = message;
  }
}

/**
 * Creates a MediAddictedError
 * @param {number} status Status code
 * @param {String} message Error message
 */
function createMediAddictedError(status, message) {
  return new MediAddictedError(status, message);
}

module.exports = createMediAddictedError;
