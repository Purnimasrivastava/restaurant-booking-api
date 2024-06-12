/**
 * Created by Christos Ploutarchou
 * Project : node_rest_api_with_mysql
 * Filename : routes.js
 * Date: 05/04/2020
 * Time: 01:45
 **/

const post = require("../controllers/Post");
const restaurant = require("../controllers/Restaurant.Controller");
const order = require("../controllers/Order.Controller");
const express = require("express");
const router = express.Router();
// Create New Post
//router.post("/api/posts/create", post.create);
router.post("/api/restaurant/create", restaurant.create);
router.get("/api/restaurant", restaurant.searchRestaurants)
router.get("/api/restaurant/:id", restaurant.getRestaurantByID)
router.post('/api/cart', order.postCart)
router.get('/api/cart/:cartId', order.checkout)
// // // Retrieve all posts
// router.get("/api/posts/all", post.getAllPosts);
// // Retrieve all Published posts
// router.get("/api/posts/published", post.getAllPublishedPosts);
// // Retrieve all Published posts by Publisher Name
// router.get("/api/posts/publisher", post.getAllPostsByPublisherName);
// // Retrieve all posts by title
// router.get("/api/posts", post.getPostByTitle);
// // Retrieve post by ID
// router.get("/api/posts/:id", post.getPostByID);
// // // Update post by ID
// router.put("/api/post/update/:id", post.updatePostByID);
// // // Delete post by ID
// router.delete("/api/post/delete/:id", post.deletePostByID);
// // Delete all posts
// router.delete("/api/posts/deleteAll", post.deleteAllPosts);

module.exports = router;
