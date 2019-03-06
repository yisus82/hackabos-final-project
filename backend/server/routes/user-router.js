'use strict';

const express = require('express');

const activateAccount = require('../controllers/user/activate-account');
const changePassword = require('../controllers/user/change-password');
const checkJWTToken = require('../controllers/session/check-jwt-token');
const createAccount = require('../controllers/user/create-account');
const getUserProfile = require('../controllers/user/get-user-profile');
const login = require('../controllers/user/login');

const userRouter = express.Router();

userRouter.get('/', checkJWTToken, getUserProfile);
userRouter.post('/', createAccount);
userRouter.get('/activate', activateAccount);
userRouter.post('/login', login);
userRouter.patch('/password', checkJWTToken, changePassword);

module.exports = userRouter;
