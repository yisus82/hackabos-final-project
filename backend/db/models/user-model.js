'use strict';

const uuidV4 = require('uuid/v4');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    uuid: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: String,
    username: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    avatarURL: String,
    verificationCode: {
      type: String,
      unique: true,
    },
    verifiedAt: Date,
    reviews: [],
    trades: [],
    comments: [],
    __v: { type: Number, select: false },
  },
  { timestamps: true }
);

class User {
  constructor() {
    this.model = mongoose.model('User', userSchema);
  }

  /**
   * Generates a new verificationCode for an user if one does not exists
   * @param {String} uuid Universally unique identifier. Primary Key in User Schema
   * @returns {String} Code to verify user email. It must be unique in User Schema
   */
  async generateVerificationCode(uuid) {
    let foundDoc = await this.model.findOne({ uuid }).lean();
    let verificationCode;
    if (!foundDoc) {
      verificationCode = uuidV4();
      foundDoc = await this.model.findOne({ verificationCode }).lean();
      while (foundDoc) {
        verificationCode = uuidV4();
        // eslint-disable-next-line no-await-in-loop
        foundDoc = await this.model.findOne({ verificationCode }).lean();
      }
    } else {
      ({ verificationCode } = foundDoc);
    }
    return verificationCode;
  }

  /**
   * Creates an account/user
   * @param {String} uuid Universally unique identifier. Primary Key in User Schema
   * @param {String} email User email. It must be unique in User Schema
   * @param {String} password Encrypted password
   * @param {String} username User screen name in the application. It must be unique in User Schema
   * @returns {String} Code to verify user email. It must be unique in User Schema
   */
  async createAccount(uuid, email, password, username) {
    const verificationCode = await this.generateVerificationCode(uuid);
    const userProfileData = {
      uuid,
      email,
      password,
      username,
      role: 'user',
      avatarURL: null,
      verificationCode,
      verifiedAt: null,
      reviews: [],
      trades: [],
      comments: [],
    };
    await this.model.create(userProfileData);
    return verificationCode;
  }

  /**
   * Activates an user account
   * @param {String} verificationCode Code to verify user email
   * @returns {Object} foundUsers, activatedUsers Number of users found and activated
   */
  async activateAccount(verificationCode) {
    let foundUsers = 0;
    let activatedUsers = 0;
    const verifiedAt = new Date().toISOString();
    const updatedUser = await this.model.findOneAndUpdate(
      { verificationCode, verifiedAt: null },
      { verifiedAt }
    );
    if (updatedUser) {
      activatedUsers += 1;
      foundUsers += 1;
    } else {
      const foundUser = await this.model.findOne({ verificationCode });
      if (foundUser) {
        foundUsers += 1;
      }
    }
    return { foundUsers, activatedUsers };
  }

  /**
   * Finds an user using an email
   * @param {String} email User's email
   * @returns {Object} userProfileData User's data
   */
  async findByEmail(email) {
    const userProfileData = await this.model.findOne({ email }).lean();
    return userProfileData;
  }

  /**
   * Finds an user using an username
   * @param {String} username User's name
   * @returns {Object} userProfileData User's data
   */
  async findByUserName(username) {
    const userProfileData = await this.model.findOne({ username }).lean();
    return userProfileData;
  }

  /**
   * Finds an user using an uuid
   * @param {String} uuid User's uuid
   * @returns {Object} userProfileData User's data
   */
  async findByUuid(uuid) {
    const userProfileData = await this.model.findOne({ uuid }).lean();
    return userProfileData;
  }

  /**
   * Changes an user's password
   * @param {String} uuid Universally unique identifier. Primary Key in User Schema
   * @param {String} password Encrypted password
   */
  async changePassword(uuid, password) {
    await this.model.updateOne({ uuid }, { password });
  }
}

module.exports = new User();
