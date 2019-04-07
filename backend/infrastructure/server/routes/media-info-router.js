'use strict';

const express = require('express');

const create = require('../interfaces/controllers/media-info/create');
const getByPage = require('../interfaces/controllers/media-info/get-by-page');
const findByID = require('../interfaces/controllers/media-info/find-by-id');

const mediaInfoRouter = express.Router();

mediaInfoRouter.get('/', findByID);
mediaInfoRouter.post('/', create);
mediaInfoRouter.get('/list', getByPage);

module.exports = mediaInfoRouter;
