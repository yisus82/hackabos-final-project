'use strict';

const cloudinary = require('cloudinary');
const checkAuth = require('../../auth/check-auth');
const createMediAddictedError = require('../../errors/mediaddicted-error');
const userRepository = require('../../repositories/user-repository');

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

/**
 * Gets an user profile
 * @param {Object} avatarFile Image file
 * @param {String} auth Auth token
 * @returns {String} Avatar URL
 */
async function changeAvatar(avatarFile, auth) {
  const { role, username } = await checkAuth(auth);

  if (role === 'guest') {
    throw createMediAddictedError(403, 'Not authorized');
  }

  if (!avatarFile.buffer) {
    throw createMediAddictedError(400, 'File buffer not found');
  }

  try {
    const { secure_url: avatarURL } = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream(
          {
            resource_type: 'image',
            public_id: username,
            width: 200,
            height: 200,
            format: 'png',
            crop: 'limit',
          },
          async(err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        )
        .end(avatarFile.buffer);
    });
    await userRepository.changeAvatar(username, avatarURL);
    return avatarURL;
  } catch (err) {
    throw createMediAddictedError(400, err);
  }
}

module.exports = changeAvatar;
