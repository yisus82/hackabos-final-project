'use strict';

const create = require('../../../../../domain/use-cases/media-info/create-uc');

/**
 * Creates a media info
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} next Next function
 */
async function createController(req, res, next) {
  const mediaInfoData = { ...req.body };
  const { authorization } = req.headers;

  try {
    await create(mediaInfoData, authorization);
    return res.status(204).json();
  } catch (err) {
    return next(err);
  }
}

module.exports = createController;
