const { Pool } = require('pg');

module.exports = (app) => {
  return new Pool({
    port: app.get('PORT'),
    host: app.get('PG_HOST'),
    database: app.get('PG_DB'),
    user: app.get('PG_USER'),
    password: app.get('PG_PASSWORD'),
    connectionTimeoutMillis: 30000,
    idleTimeoutMillis: 2000
  });
};
