'use strict';

const express = require('express');
const createAccount = require('../controllers/user/create-account');
const activateAccount = require('../controllers/user/activate-account');
const login = require('../controllers/user/login');
const getUserProfile = require('../controllers/user/get-user-profile');
const updateUserProfile = require('../controllers/user/update-user-profile');
const checkJWTToken = require('../controllers/session/check-jwt-token');

const userRouter = express.Router();

userRouter.post('/', createAccount);
userRouter.get('/activate', activateAccount);
userRouter.post('/login', login);
userRouter.get('/:uuid', checkJWTToken, getUserProfile);
userRouter.put('/', checkJWTToken, updateUserProfile);

module.exports = userRouter;
