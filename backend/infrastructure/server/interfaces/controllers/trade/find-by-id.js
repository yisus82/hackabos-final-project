'use strict';

const findByID = require('../../../../../domain/use-cases/trade/find-by-id-uc');

/**
 * Gets a trade data
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} next Next function
 */
async function findByIDController(req, res, next) {
  const queryData = { ...req.query };
  const { authorization } = req.headers;

  try {
    const tradeData = await findByID(queryData, authorization);
    if (!tradeData) {
      return res.status(404).send();
    }
    return res.status(200).json(tradeData);
  } catch (err) {
    return next(err);
  }
}

module.exports = findByIDController;
