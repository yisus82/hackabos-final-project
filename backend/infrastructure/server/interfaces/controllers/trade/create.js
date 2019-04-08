'use strict';

const create = require('../../../../../domain/use-cases/trade/create-uc');

/**
 * Creates a trade
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} next Next function
 */
async function createController(req, res, next) {
  const tradeData = { ...req.body };
  const { authorization } = req.headers;

  try {
    await create(tradeData, authorization);
    return res.status(204).json();
  } catch (err) {
    return next(err);
  }
}

module.exports = createController;
