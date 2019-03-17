'use strict';

const getUserProfile = require('../../../../../domain/use-cases/get-user-profile-uc');

/**
 * Gets a user profile data
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} next Next function
 */
async function getUserProfileController(req, res, next) {
  const queryData = { ...req.query };
  const { authorization } = req.headers;

  try {
    const userProfileData = await getUserProfile(queryData, authorization);
    if (!userProfileData) {
      return res.status(404).send();
    }
    return res.status(200).json(userProfileData);
  } catch (err) {
    return next(err);
  }
}

module.exports = getUserProfileController;
