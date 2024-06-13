/**
 * Created by Christos Ploutarchou
 * Project : node_rest_api_with_mysql
 * Filename : routes.js
 * Date: 05/04/2020
 * Time: 01:45
 **/

const restaurant = require("../controllers/Restaurant.Controller");
const order = require("../controllers/Order.Controller");
const express = require("express");
const router = express.Router();

router.post("/api/restaurant/create", restaurant.create);
router.get("/api/restaurant", restaurant.searchRestaurants)
router.get("/api/restaurant/:id", restaurant.getRestaurantByID)
router.post('/api/cart', order.postCart)
router.get('/api/cart/:cartId', order.checkout)

module.exports = router;
