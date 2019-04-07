'use strict';

const findByID = require('../../../../../domain/use-cases/media-info/find-by-id-uc');

/**
 * Gets a user profile data
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} next Next function
 */
async function findByIDController(req, res, next) {
  const queryData = { ...req.query };

  try {
    const mediaInfoData = await findByID(queryData);
    if (!mediaInfoData) {
      return res.status(404).send();
    }
    return res.status(200).json(mediaInfoData);
  } catch (err) {
    return next(err);
  }
}

module.exports = findByIDController;
