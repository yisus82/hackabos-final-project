'use strict';

const mongoose = require('mongoose');

mongoose.Promise = Promise;

const mongoURI = process.env.MONGO_URI;

async function connect() {
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
  });
}

async function disconnect() {
  mongoose.connection.close();
}

async function getConnection() {
  return mongoose.connection || connect();
}

module.exports = {
  connect,
  disconnect,
  getConnection,
};
