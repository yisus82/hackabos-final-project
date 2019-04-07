'use strict';

const express = require('express');
const multer = require('multer');

const activate = require('../interfaces/controllers/user/activate');
const changeAvatar = require('../interfaces/controllers/user/change-avatar');
const changePassword = require('../interfaces/controllers/user/change-password');
const getUserProfile = require('../interfaces/controllers/user/get-user-profile');
const login = require('../interfaces/controllers/user/login');
const register = require('../interfaces/controllers/user/register');

const userRouter = express.Router();
const upload = multer();

userRouter.get('/', getUserProfile);
userRouter.post('/', register);
userRouter.get('/activate', activate);
userRouter.post('/avatar', upload.single('avatar'), changeAvatar);
userRouter.post('/login', login);
userRouter.patch('/password', changePassword);

module.exports = userRouter;
