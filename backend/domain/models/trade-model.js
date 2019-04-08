'use strict';

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const offerSchema = new Schema(
  {
    text: String,
    author: String,
    __v: { type: Number, select: false },
  },
  { timestamps: true }
);

const tradeSchema = new Schema(
  {
    title: String,
    text: String,
    author: String,
    offers: [offerSchema],
    __v: { type: Number, select: false },
  },
  { timestamps: true }
);

tradeSchema.plugin(mongoosePaginate);

class Trade {
  constructor() {
    this.model = mongoose.model('Trade', tradeSchema);
  }

  /**
   * Creates a Trade
   * @param {String} title Title
   * @param {String} text Trade's text
   * @param {String} author Author's username
   */
  async create(title, text, author) {
    const tradeData = {
      title,
      text,
      author,
      offers: [],
    };
    await this.model.create(tradeData);
  }

  /**
   * Finds a trade using an ID
   * @param {ObjectId} id Trade's ID
   * @returns {Object} Trade's data
   */
  async findByID(id) {
    return this.model.findById(id).lean();
  }

  /**
   * Gets all the trades using pagination
   * @param {number} page Page number
   * @param {number} limit Page limit
   * @returns {Object} Trades in the page given within the limit given sorted
   * by date descending
   */
  async getByPage(page = 1, limit = 10) {
    const options = {
      page,
      limit,
      lean: true,
      leanWithId: false,
      sort: { createdAt: -1 },
    };
    return this.model.paginate({}, options);
  }

  /**
   * Gets all the trades from an user using pagination
   * @param {String} username User's username
   * @param {number} page Page number
   * @param {number} limit Page limit
   * @returns {Object} Trades from an user in the page given within the limit given sorted
   * by date descending
   */
  async getByUsername(username, page = 1, limit = 10) {
    const options = {
      page,
      limit,
      lean: true,
      leanWithId: false,
      sort: { createdAt: -1 },
    };
    return this.model.paginate({ author: username }, options);
  }

  /**
   * Adds an offer to a trade
   * @param {String} tradeID Trade's ID
   * @param {String} text Offer's text
   * @param {String} author Offer's author
   */
  async addOffer(tradeID, text, author) {
    const offerData = {
      text,
      author,
    };
    await this.model.findByIdAndUpdate(tradeID, { $push: { offers: offerData } });
  }
}

module.exports = new Trade();
