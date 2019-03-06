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
    userName: {
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
   * Creates an account/user
   * @param {String} uuid Universally unique identifier. Primary Key in User Schema
   * @param {String} email User email. It must be unique in User Schema
   * @param {String} password Encrypted password
   * @param {String} userName User screen name in the application. It must be unique in User Schema
   * @return {String} Code to verify user email. It must be unique in User Schema
   */
  async createAccount(uuid, email, password, userName) {
    let verificationCode = uuidV4();
    let foundDoc = await this.model.findOne({ verificationCode }).lean();
    while (foundDoc) {
      verificationCode = uuidV4();
      // eslint-disable-next-line no-await-in-loop
      foundDoc = await this.model.findOne({ verificationCode }).lean();
    }
    const userProfileData = {
      uuid,
      email,
      password,
      userName,
      role: 'user',
      avatarURL: null,
      verificationCode,
      verifiedAt: null,
      reviews: [],
      trades: [],
      comments: [],
    };
    const userCreated = await this.model.create(userProfileData);
    console.log(userCreated);
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
   * @returns {Object} userData User's data
   */
  async findByEmail(email) {
    const userData = await this.model.findOne({ email }).lean();
    return userData;
  }

  /**
   * Finds an user using an uuid
   * @param {String} uuid User's uuid
   * @returns {Object} userData User's data
   */
  async findByUuid(uuid) {
    const userData = await this.model.findOne({ uuid }).lean();
    return userData;
  }

  /**
   * Updates some of the user data
   * @param {String} uuid Universally unique identifier. Primary Key in User Schema
   * @param {String} email User email. It must be unique in User Schema
   * @param {String} userName User screen name in the application. It must be unique in User Schema
   */
  async updateData(uuid, email, userName) {
    await this.model.updateOne({ uuid }, { email, userName });
  }
}

module.exports = new User();
