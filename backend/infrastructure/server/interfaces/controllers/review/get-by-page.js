'use strict';

const getByPage = require('../../../../../domain/use-cases/review/get-by-page-uc');

/**
 * Get all the reviews using pagination
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} next Next function
 */
async function getByPageController(req, res, next) {
  const queryData = { ...req.query };

  try {
    const reviewData = await getByPage(queryData);
    if (!reviewData) {
      return res.status(404).send();
    }
    return res.status(200).json(reviewData);
  } catch (err) {
    return next(err);
  }
}

module.exports = getByPageController;
