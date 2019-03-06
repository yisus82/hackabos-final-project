'use strict';

const userModel = require('../../../db/models/user-model');

/**
 * Gets a user profile data
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
async function getUserProfile(req, res) {
  const { uuid } = req.query;
  try {
    const userProfileData = await userModel.findByUuid(uuid);
    if (userProfileData) {
      return res.json(userProfileData);
    }
    return res.status(404).send();
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

module.exports = getUserProfile;
