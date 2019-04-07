'use strict';

const express = require('express');
const multer = require('multer');

const activateAccount = require('../interfaces/controllers/user/activate-account');
const changePassword = require('../interfaces/controllers/user/change-password');
const createAccount = require('../interfaces/controllers/user/create-account');
const getUserProfile = require('../interfaces/controllers/user/get-user-profile');
const login = require('../interfaces/controllers/user/login');
const changeAvatar = require('../interfaces/controllers/user/change-avatar');

const userRouter = express.Router();
const upload = multer();

userRouter.get('/', getUserProfile);
userRouter.post('/', createAccount);
userRouter.get('/activate', activateAccount);
userRouter.post('/avatar', upload.single('avatar'), changeAvatar);
userRouter.post('/login', login);
userRouter.patch('/password', changePassword);

module.exports = userRouter;
