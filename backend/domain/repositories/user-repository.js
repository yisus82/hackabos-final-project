'use strict';

const userModel = require('../models/user-model');
const createMediAddictedError = require('../errors/mediaddicted-error');

class UserRepository {
  constructor() {
    this.model = userModel;
  }

  /**
   * Gets an user using an username
   * @param {String} username
   * @param {Object} userData data to be updated
   * @returns {Object} User profile data
   */
  async getUserProfile(username) {
    return this.model.findByUserName(username);
  }

  /**
   * Finds an user using an email
   * @param {String} email User's email
   * @returns {Object} User profile data
   */
  async findByEmail(email) {
    return this.model.findByEmail(email);
  }

  /**
   * Registers an user
   * @param {String} email User email. It must be unique in User Schema
   * @param {String} password Encrypted password
   * @param {String} username User screen name in the application. Primary Key in User Schema
   * @returns {String} Code to verify user email. It must be unique in User Schema
   */
  async register(email, password, username) {
    try {
      return await this.model.register(email, password, username);
    } catch (err) {
      if (err.errors.email) {
        throw createMediAddictedError(400, 'Duplicated email');
      } else if (err.errors.username) {
        throw createMediAddictedError(400, 'Duplicated username');
      } else {
        throw err;
      }
    }
  }

  /**
   * Activates an user
   * @param {String} verificationCode Code to verify user email
   * @returns {Object} Number of users found and activated
   */
  async activate(verificationCode) {
    return this.model.activate(verificationCode);
  }

  /**
   * Changes an user's password
   * @param {String} username User screen name in the application. Primary Key in User Schema
   * @param {String} password Encrypted password
   */
  async changePassword(username, password) {
    return this.model.changePassword(username, password);
  }

  /**
   * Changes an user's avatar
   * @param {String} username User screen name in the application. Primary Key in User Schema
   * @param {String} avatarURL User's avatar URL
   */
  async changeAvatar(username, avatarURL) {
    return this.model.changeAvatar(username, avatarURL);
  }
}

module.exports = new UserRepository();
