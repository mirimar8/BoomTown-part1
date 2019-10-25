const { Pool } = require('pg');

module.exports = (app) => {
  /**
   * @TODO: Configuration Variables
   *
   *  Retrieve the necessary information to connect to Postgres
   *  For example: app.get('PG_DB')
   */

  app.get('PORT');
  app.get('PG_HOST');
  app.get('PG_DB');
  app.get('PG_USER');
  app.get('PG_PASSWORD');


  return new Pool({
    /**
     *  @TODO: Supply the correct configuration values to connect to postgres
     */

    port: app.get('PORT'),
    host: app.get('PG_HOST'),
    database: app.get('PG_DB'),
    user: app.get('PG_USER'),
    password: app.get('PG_PASSWORD'),
    connectionTimeoutMillis: 30000,
    idleTimeoutMillis: 2000

  });
};
