'use strict';

const addOffer = require('../../../../../domain/use-cases/trade/add-offer-uc');

/**
 * Adds an offer to a trade
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} next Next function
 */
async function addOfferController(req, res, next) {
  const offerData = { ...req.body };
  const { authorization } = req.headers;

  try {
    await addOffer(offerData, authorization);
    return res.status(204).json();
  } catch (err) {
    return next(err);
  }
}

module.exports = addOfferController;
