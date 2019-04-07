'use strict';

const findByID = require('../../../../../domain/use-cases/review/find-by-id-uc');

/**
 * Gets a review data
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} next Next function
 */
async function findByIDController(req, res, next) {
  const queryData = { ...req.query };

  try {
    const reviewData = await findByID(queryData);
    if (!reviewData) {
      return res.status(404).send();
    }
    return res.status(200).json(reviewData);
  } catch (err) {
    return next(err);
  }
}

module.exports = findByIDController;
