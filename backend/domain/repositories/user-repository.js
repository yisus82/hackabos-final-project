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
   * Creates an account/user
   * @param {String} email User email. It must be unique in User Schema
   * @param {String} password Encrypted password
   * @param {String} username User screen name in the application. Primary Key in User Schema
   * @returns {String} Code to verify user email. It must be unique in User Schema
   */
  async createAccount(email, password, username) {
    const emailFound = await this.model.findByEmail(email);
    if (emailFound) {
      throw createMediAddictedError(400, 'Duplicated email');
    }

    const userNameFound = await this.model.findByUserName(username);
    if (userNameFound) {
      throw createMediAddictedError(400, 'Duplicated username');
    }
    return this.model.createAccount(email, password, username);
  }

  /**
   * Activates an user account
   * @param {String} verificationCode Code to verify user email
   * @returns {Object} Number of users found and activated
   */
  async activateAccount(verificationCode) {
    return this.model.activateAccount(verificationCode);
  }

  /**
   * Changes an user's password
   * @param {String} username User screen name in the application. Primary Key in User Schema
   * @param {String} password Encrypted password
   */
  async changePassword(username, password) {
    return this.model.changePassword(username, password);
  }
}

module.exports = new UserRepository();
