'use strict';

const addComment = require('../../../../../domain/use-cases/review/add-comment-uc');

/**
 * Adds a comment to a review
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} next Next function
 */
async function addCommentController(req, res, next) {
  const commentData = { ...req.body };
  const { authorization } = req.headers;

  try {
    await addComment(commentData, authorization);
    return res.status(204).json();
  } catch (err) {
    return next(err);
  }
}

module.exports = addCommentController;
