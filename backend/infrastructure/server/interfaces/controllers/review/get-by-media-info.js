'use strict';

const getByMediaInfo = require('../../../../../domain/use-cases/review/get-by-media-info-uc');

/**
 * Get all the reviews from a media info using pagination
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} next Next function
 */
async function getByMediaInfoController(req, res, next) {
  const queryData = { ...req.query };

  try {
    const reviewData = await getByMediaInfo(queryData);
    if (!reviewData) {
      return res.status(404).send();
    }
    return res.status(200).json(reviewData);
  } catch (err) {
    return next(err);
  }
}

module.exports = getByMediaInfoController;
