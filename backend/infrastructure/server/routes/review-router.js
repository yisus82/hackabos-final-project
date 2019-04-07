'use strict';

const express = require('express');

const addComment = require('../interfaces/controllers/review/add-comment');
const create = require('../interfaces/controllers/review/create');
const getByMediaInfo = require('../interfaces/controllers/review/get-by-media-info');
const getByPage = require('../interfaces/controllers/review/get-by-page');
const getByUsername = require('../interfaces/controllers/review/get-by-username');
const findByID = require('../interfaces/controllers/review/find-by-id');

const reviewRouter = express.Router();

reviewRouter.get('/', findByID);
reviewRouter.post('/', create);
reviewRouter.patch('/comment', addComment);
reviewRouter.get('/info', getByMediaInfo);
reviewRouter.get('/list', getByPage);
reviewRouter.get('/user', getByUsername);

module.exports = reviewRouter;
