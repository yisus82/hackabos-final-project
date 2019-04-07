'use strict';

const reviewModel = require('../models/review-model');

class ReviewRepository {
  constructor() {
    this.model = reviewModel;
  }

  /**
   * Creates a review
   * @param {String} title Title
   * @param {String} text Review's text
   * @param {String} author Author's username
   * @param {String} mediaInfo Media info's ID
   */
  async create(title, text, author, mediaInfo) {
    await this.model.create(title, text, author, mediaInfo);
  }

  /**
   * Finds a review using an ID
   * @param {ObjectId} id Review's ID
   * @returns {Object} Review's data
   */
  async findByID(id) {
    return this.model.findByID(id);
  }

  /**
   * Returns all the reviews using pagination
   * @param {number} page Page number
   * @param {number} limit Page limit
   * @returns {Object} Reviews in the page given within the limit given sorted
   * by date descending
   */
  async getByPage(page, limit) {
    return this.model.getByPage(page, limit);
  }

  /**
   * Gets all the reviews from a media info using pagination
   * @param {String} mediaInfo Media info's ID
   * @param {number} page Page number
   * @param {number} limit Page limit
   * @returns {Object} Reviews from a media info in the page given within the limit given sorted
   * by date descending
   */
  async getByMediaInfo(mediaInfo, page = 1, limit = 10) {
    return this.model.getByMediaInfo(mediaInfo, page, limit);
  }

  /**
   * Gets all the reviews from an user using pagination
   * @param {String} username User's username
   * @param {number} page Page number
   * @param {number} limit Page limit
   * @returns {Object} Reviews from an user in the page given within the limit given sorted
   * by date descending
   */
  async getByUsername(username, page, limit) {
    return this.model.getByUsername(username, page, limit);
  }

  /**
   * Adds a comment to a review
   * @param {String} reviewID Review's ID
   * @param {String} text Comment's text
   * @param {String} author Comment's author
   */
  async addComment(reviewID, text, author) {
    await this.model.addComment(reviewID, text, author);
  }
}

module.exports = new ReviewRepository();
