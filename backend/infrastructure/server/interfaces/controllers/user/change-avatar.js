'use strict';

const changeAvatar = require('../../../../../domain/use-cases/user/change-avatar-uc');

/**
 * Updates user's avatar
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} next Next function
 */
async function changeAvatarController(req, res, next) {
  const { file } = req;
  const { authorization } = req.headers;

  try {
    const avatarURL = await changeAvatar(file, authorization);
    res.header('Location', avatarURL);
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = changeAvatarController;
