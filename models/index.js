/**
 * Created by Christos Ploutarchou
 * Project : node_rest_api_with_mysql
 * Filename : Sequelize.js
 * Date: 03/04/2020
 * Time: 23:33
 **/
const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const database = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect
});

const db = {};
db.Sequelize = Sequelize;
db.databaseConf = database;
// function to drop existing tables and re-sync database
db.dropRestApiTable = () => {
  db.databaseConf.sync({ force: true }).then(() => {
    console.log("table just dropped and db re-synced.");
  });
};
db.customers = require("./Customer.model")(database, Sequelize);
db.restaurants = require("./Restaurant.model")(database, Sequelize);
db.dishes = require("./Dish.model")(database, Sequelize);
db.orders = require("./Order.model")(database, Sequelize);
db.orderItems = require("./OrderItem.model")(database, Sequelize);
db.orderItems.belongsTo(db.dishes, { as: "dish",foreignKey: "dish_id" });
db.orders.hasMany(db.orderItems, { as: "orderItems",foreignKey: "order_id" });
db.restaurants.hasMany(db.dishes,{as:'menu', foreignKey:'restaurant_id'});
db.orders.belongsTo(db.customers, { as: "customer",foreignKey: "customer_id" });
db.orders.belongsTo(db.restaurants, { as: "restaurant",foreignKey: "restaurant_id" });
module.exports = db;
