'use strict';

const getUsersByPage = require('../../../../../domain/use-cases/user/get-users-by-page-uc');

/**
 * Gets a user profile data
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} next Next function
 */
async function getUsersByPageController(req, res, next) {
  const queryData = { ...req.query };
  const { authorization } = req.headers;

  try {
    const usersData = await getUsersByPage(queryData, authorization);
    if (!usersData) {
      return res.status(404).send();
    }
    return res.status(200).json(usersData);
  } catch (err) {
    return next(err);
  }
}

module.exports = getUsersByPageController;
