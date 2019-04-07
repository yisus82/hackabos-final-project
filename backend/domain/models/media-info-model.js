'use strict';

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const mediaInfoSchema = new Schema(
  {
    title: String,
    description: String,
    category: String,
    imageURL: String,
    __v: { type: Number, select: false },
  },
  { timestamps: true }
);

mediaInfoSchema.plugin(mongoosePaginate);

class MediaInfo {
  constructor() {
    this.model = mongoose.model('MediaInfo', mediaInfoSchema, 'mediaInfos');
  }

  /**
   * Creates a media info
   * @param {String} title Title
   * @param {String} description Description
   * @param {String} category Category
   * @param {String} imageURL Image URL
   */
  async create(title, description, category, imageURL) {
    const mediaInfoData = {
      title,
      description,
      category,
      imageURL,
    };
    await this.model.create(mediaInfoData);
  }

  /**
   * Finds a media info using an ID
   * @param {ObjectId} id Media info's ID
   * @returns {Object} Media info's data
   */
  async findByID(id) {
    return this.model.findById(id).lean();
  }

  /**
   * Gets all the media infos using pagination
   * @param {number} page Page number
   * @param {number} limit Page limit
   * @returns {Object} Media infos in the page given within the limit given sorted
   * by title ascending
   */
  async getByPage(page = 1, limit = 10) {
    const options = {
      page,
      limit,
      lean: true,
      leanWithId: false,
      sort: { title: 1 },
    };
    return this.model.paginate({}, options);
  }
}

module.exports = new MediaInfo();
