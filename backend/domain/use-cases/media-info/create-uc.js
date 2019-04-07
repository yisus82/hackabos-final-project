'use strict';

const Joi = require('joi');
const checkAuth = require('../../auth/check-auth');
const createMediAddictedError = require('../../errors/mediaddicted-error');
const mediaInfoRepository = require('../../repositories/media-info-repository');

/**
 * Validates data
 * @param {Object} payload Data to be validated
 * @returns {Object} The validation result
 */
async function validateSchema(payload) {
  const schema = {
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    imageURL: Joi.string()
      .uri()
      .required(),
  };

  return Joi.validate(payload, schema);
}

/**
 * Creates a media info
 * @param {Object} mediaInfoData Media info's data
 * @param {String} auth Auth token
 * @returns {Object} null if OK
 */
async function create(mediaInfoData, auth) {
  const { role } = await checkAuth(auth);

  if (role !== 'admin') {
    throw createMediAddictedError(403, 'Not authorized');
  }

  try {
    await validateSchema(mediaInfoData);
  } catch (err) {
    throw createMediAddictedError(400, err);
  }

  await mediaInfoRepository.create(
    mediaInfoData.title,
    mediaInfoData.description,
    mediaInfoData.category,
    mediaInfoData.imageURL
  );

  return null;
}

module.exports = create;
