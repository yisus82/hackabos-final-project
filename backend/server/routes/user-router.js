'use strict';

const express = require('express');

const activateAccount = require('../controllers/user/activate-account');
const checkJWTToken = require('../controllers/session/check-jwt-token');
const createAccount = require('../controllers/user/create-account');
const getUserProfile = require('../controllers/user/get-user-profile');
const login = require('../controllers/user/login');
const updateUserProfile = require('../controllers/user/update-user-profile');

const userRouter = express.Router();

userRouter.get('/', checkJWTToken, getUserProfile);
userRouter.post('/', createAccount);
userRouter.patch('/', checkJWTToken, updateUserProfile);
userRouter.get('/:uuid', checkJWTToken, getUserProfile);
userRouter.get('/activate', activateAccount);
userRouter.post('/login', login);

module.exports = userRouter;
