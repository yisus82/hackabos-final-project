'use strict';

const getByUsername = require('../../../../../domain/use-cases/trade/get-by-username-uc');

/**
 * Get all the trades from an user using pagination
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} next Next function
 */
async function getByUsernameController(req, res, next) {
  const queryData = { ...req.query };
  const { authorization } = req.headers;

  try {
    const tradeData = await getByUsername(queryData, authorization);
    if (!tradeData) {
      return res.status(404).send();
    }
    return res.status(200).json(tradeData);
  } catch (err) {
    return next(err);
  }
}

module.exports = getByUsernameController;
