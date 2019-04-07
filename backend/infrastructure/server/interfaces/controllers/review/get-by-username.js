'use strict';

const getByUsername = require('../../../../../domain/use-cases/review/get-by-username-uc');

/**
 * Get all the reviews from an user using pagination
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} next Next function
 */
async function getByUsernameController(req, res, next) {
  const queryData = { ...req.query };

  try {
    const reviewData = await getByUsername(queryData);
    if (!reviewData) {
      return res.status(404).send();
    }
    return res.status(200).json(reviewData);
  } catch (err) {
    return next(err);
  }
}

module.exports = getByUsernameController;
