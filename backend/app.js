'use strict';

require('dotenv-safe').config();
const httpServer = require('./server');
const httpServerConfig = require('./config/http-server-config');
const dbConnectionPool = require('./db/pools/mongo-pool');

/**
 * Initialize dependencies
 * */
(async function initApp() {
  try {
    await dbConnectionPool.connect();
    await httpServer.listen(httpServerConfig.port, httpServerConfig.host);
    console.log(`Listening: ${httpServerConfig.host}:${httpServerConfig.port}`);
  } catch (err) {
    await httpServer.close();
    console.error(err);
    process.exit(1);
  }
}());
