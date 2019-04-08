'use strict';

const express = require('express');

const addOffer = require('../interfaces/controllers/trade/add-offer');
const create = require('../interfaces/controllers/trade/create');
const getByPage = require('../interfaces/controllers/trade/get-by-page');
const getByUsername = require('../interfaces/controllers/trade/get-by-username');
const findByID = require('../interfaces/controllers/trade/find-by-id');

const tradeRouter = express.Router();

tradeRouter.get('/', findByID);
tradeRouter.post('/', create);
tradeRouter.get('/list', getByPage);
tradeRouter.patch('/offer', addOffer);
tradeRouter.get('/user', getByUsername);

module.exports = tradeRouter;
