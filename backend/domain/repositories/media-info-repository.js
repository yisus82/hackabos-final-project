'use strict';

const mediaInfoModel = require('../models/media-info-model');

class MediaInfoRepository {
  constructor() {
    this.model = mediaInfoModel;
  }

  /**
   * Creates a media info
   * @param {String} title Title
   * @param {String} description Description
   * @param {String} category Category
   * @param {String} imageURL Image URL
   */
  async create(title, description, category, imageURL) {
    await this.model.create(title, description, category, imageURL);
  }

  /**
   * Finds a media info using an ID
   * @param {ObjectId} id Media info's ID
   * @returns {Object} Media info's data
   */
  async findByID(id) {
    return this.model.findByID(id);
  }

  /**
   * Returns media infos using pagination
   * @param {number} page Page number
   * @param {number} limit Page limit
   * @returns {Object} Media infos in the page given within the limit given sorted
   * by title ascending
   */
  async getByPage(page, limit) {
    return this.model.getByPage(page, limit);
  }
}

module.exports = new MediaInfoRepository();
