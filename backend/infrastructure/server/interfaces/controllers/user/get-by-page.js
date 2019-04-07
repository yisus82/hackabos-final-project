'use strict';

const getByPage = require('../../../../../domain/use-cases/user/get-by-page-uc');

/**
 * Get users using pagination
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} next Next function
 */
async function getByPageController(req, res, next) {
  const queryData = { ...req.query };
  const { authorization } = req.headers;

  try {
    const usersData = await getByPage(queryData, authorization);
    if (!usersData) {
      return res.status(404).send();
    }
    return res.status(200).json(usersData);
  } catch (err) {
    return next(err);
  }
}

module.exports = getByPageController;
