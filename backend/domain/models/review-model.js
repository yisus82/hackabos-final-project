'use strict';

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new Schema(
  {
    text: String,
    author: String,
    __v: { type: Number, select: false }
  },
  { timestamps: true }
);

const reviewSchema = new Schema(
  {
    title: String,
    text: String,
    author: String,
    mediaInfo: {
      type: ObjectId,
      ref: 'MediaInfo'
    },
    comments: [commentSchema],
    __v: { type: Number, select: false }
  },
  { timestamps: true }
);

reviewSchema.plugin(mongoosePaginate);

class Review {
  constructor() {
    this.model = mongoose.model('Review', reviewSchema);
  }

  /**
   * Creates a review
   * @param {String} title Title
   * @param {String} text Review's text
   * @param {String} author Author's username
   * @param {String} mediaInfo Media info's ID
   */
  async create(title, text, author, mediaInfo) {
    const reviewData = {
      title,
      text,
      author,
      mediaInfo,
      comments: []
    };
    await this.model.create(reviewData);
  }

  /**
   * Finds a review using an ID
   * @param {ObjectId} id Review's ID
   * @returns {Object} Review's data
   */
  async findByID(id) {
    return this.model
      .findById(id)
      .populate('mediaInfo')
      .lean();
  }

  /**
   * Gets all the reviews using pagination
   * @param {number} page Page number
   * @param {number} limit Page limit
   * @returns {Object} Reviews in the page given within the limit given sorted
   * by date descending
   */
  async getByPage(page = 1, limit = 10) {
    const options = {
      page,
      limit,
      lean: true,
      leanWithId: false,
      sort: { createdAt: -1 },
      populate: 'mediaInfo'
    };
    return this.model.paginate({}, options);
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
    const options = {
      page,
      limit,
      lean: true,
      leanWithId: false,
      sort: { createdAt: -1 },
      populate: 'mediaInfo'
    };
    return this.model.paginate({ mediaInfo }, options);
  }

  /**
   * Gets all the reviews from an user using pagination
   * @param {String} username User's username
   * @param {number} page Page number
   * @param {number} limit Page limit
   * @returns {Object} Reviews from an user in the page given within the limit given sorted
   * by date descending
   */
  async getByUsername(username, page = 1, limit = 10) {
    const options = {
      page,
      limit,
      lean: true,
      leanWithId: false,
      sort: { createdAt: -1 },
      populate: 'mediaInfo'
    };
    return this.model.paginate({ author: username }, options);
  }

  /**
   * Adds a comment to a review
   * @param {String} reviewID Review's ID
   * @param {String} text Comment's text
   * @param {String} author Comment's author
   */
  async addComment(reviewID, text, author) {
    const commentData = {
      text,
      author
    };
    await this.model.findByIdAndUpdate(reviewID, { $push: { comments: commentData } });
  }
}

module.exports = new Review();
