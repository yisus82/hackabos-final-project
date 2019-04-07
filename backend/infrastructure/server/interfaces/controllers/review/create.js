'use strict';

const create = require('../../../../../domain/use-cases/review/create-uc');

/**
 * Creates a review
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} next Next function
 */
async function createController(req, res, next) {
  const reviewData = { ...req.body };
  const { authorization } = req.headers;

  try {
    await create(reviewData, authorization);
    return res.status(204).json();
  } catch (err) {
    return next(err);
  }
}

module.exports = createController;
