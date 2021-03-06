'use strict';

require('dotenv-safe').config();
const httpServer = require('./infrastructure/server');
const httpServerConfig = require('./config/http-server-config');
const dbConnectionPool = require('./infrastructure/db/pools/mongo-pool');

/**
 * Initialize dependencies
 * */
(async function initApp() {
  try {
    await dbConnectionPool.connect();
    await httpServer.listen(httpServerConfig.port);
    console.log(`Listening on port: ${httpServerConfig.port}`);
  } catch (err) {
    await httpServer.close();
    console.error(err);
    process.exit(1);
  }
}());
