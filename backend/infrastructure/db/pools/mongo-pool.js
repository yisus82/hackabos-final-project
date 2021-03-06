'use strict';

const mongoose = require('mongoose');

mongoose.Promise = Promise;

const mongoURI = process.env.MONGO_URI;

/**
 * Connect to DB server
 */
async function connect() {
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
}

/**
 * Disconnect from DB server
 */
async function disconnect() {
  mongoose.connection.close();
}

/**
 * Get a connection to DB
 */
async function getConnection() {
  return mongoose.connection || connect();
}

module.exports = {
  connect,
  disconnect,
  getConnection,
};
