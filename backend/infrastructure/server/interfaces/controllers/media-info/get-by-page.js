'use strict';

const getByPage = require('../../../../../domain/use-cases/media-info/get-by-page-uc');

/**
 * Get media infos using pagination
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} next Next function
 */
async function getByPageController(req, res, next) {
  const queryData = { ...req.query };

  try {
    const mediaInfoData = await getByPage(queryData);
    if (!mediaInfoData) {
      return res.status(404).send();
    }
    return res.status(200).json(mediaInfoData);
  } catch (err) {
    return next(err);
  }
}

module.exports = getByPageController;
