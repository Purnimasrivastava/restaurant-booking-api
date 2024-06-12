require('dotenv').config();
/**
 * Created by Christos Ploutarchou
 * Project : node_rest_api_with_mysql
 * Filename : db.config.js
 * Date: 03/04/2020
 * Time: 21:32
 **/
module.exports = {
  HOST:  process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_DATABASE,
  dialect: "postgres"
};

