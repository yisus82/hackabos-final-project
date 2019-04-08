'use strict';

const tradeModel = require('../models/trade-model');

class TradeRepository {
  constructor() {
    this.model = tradeModel;
  }

  /**
   * Creates a trade
   * @param {String} title Title
   * @param {String} text Review's text
   * @param {String} author Author's username
   */
  async create(title, text, author) {
    await this.model.create(title, text, author);
  }

  /**
   * Finds a trade using an ID
   * @param {ObjectId} id Trade's ID
   * @returns {Object} Trade's data
   */
  async findByID(id) {
    return this.model.findByID(id);
  }

  /**
   * Returns all the trades using pagination
   * @param {number} page Page number
   * @param {number} limit Page limit
   * @returns {Object} Reviews in the page given within the limit given sorted
   * by date descending
   */
  async getByPage(page, limit) {
    return this.model.getByPage(page, limit);
  }

  /**
   * Gets all the trades from an user using pagination
   * @param {String} username User's username
   * @param {number} page Page number
   * @param {number} limit Page limit
   * @returns {Object} Trades from an user in the page given within the limit given sorted
   * by date descending
   */
  async getByUsername(username, page, limit) {
    return this.model.getByUsername(username, page, limit);
  }

  /**
   * Adds an offer to a trade
   * @param {String} tradeID Trade's ID
   * @param {String} text Offer's text
   * @param {String} author Offer's author
   */
  async addOffer(tradeID, text, author) {
    await this.model.addOffer(tradeID, text, author);
  }
}

module.exports = new TradeRepository();
