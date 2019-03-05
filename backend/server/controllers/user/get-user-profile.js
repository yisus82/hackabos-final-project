'use strict';

const UserModel = require('../../../db/models/user-model');

async function getUserProfile(req, res) {
  const { uuid } = req.claims;
  try {
    const userProfileData = await UserModel.findOne({ uuid }, { _id: 0 }, { lean: true });
    return res.json(userProfileData);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

module.exports = getUserProfile;
