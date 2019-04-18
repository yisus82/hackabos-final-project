'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
let server = null;

app.use(bodyParser.json());

/**
 * Add response headers
 */
app.use((req, res, next) => {
  const accessControlAllowMethods = ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'];

  const accessControlAllowHeaders = [
    'Authorization',
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Access-Control-Allow-Request-Method',
    'x-market',
  ];

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Expose-Headers', '*');
  res.header('Access-Control-Allow-Methods', accessControlAllowMethods.join(','));
  res.header('Access-Control-Allow-Headers', accessControlAllowHeaders.join(','));
  next();
});

/**
 * Add all routes
 */
app.use('/users', routes.userRouter);
app.use('/infos', routes.mediaInfoRouter);
app.use('/reviews', routes.reviewRouter);
app.use('/trades', routes.tradeRouter);
app.use('*', (req, res) => res.status(404).send());

/**
 * Special route middleware to catch all next(err) generated by controllers
 */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.name === 'MediAddictedError') {
    const { status, message } = err;
    return res.status(status).json({ message });
  }
  return res.status(500).json({
    message: err.message,
  });
});

/**
 * Start listening requests at a given port
 * @param {Number} port
 */
async function listen(port) {
  if (server === null) {
    server = await app.listen(port);
  }
}

/**
 * Stop listening requests
 */
async function close() {
  if (server) {
    await server.close();
    server = null;
  }
}

module.exports = {
  listen,
  close,
};