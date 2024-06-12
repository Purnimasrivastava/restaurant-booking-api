/**
 * Created by Christos Ploutarchou
 * Project : node_rest_api_with_mysql
 * Filename : Sequelize.js
 * Date: 04/04/2020
 * Time: 22:08
 **/

const db = require("../models");
const _ = require("lodash");
const Restaurants = db.restaurants;
const Dishes = db.dishes;
const Op = db.Sequelize.Op;

// Create and save new Restaurants
exports.create = async (request, result) => {
    if (!request.body.name || !request.body.address ) {
        result.status(400).send({
            message: "Restaurant name and address can not be empt"
        });
    }

    // Create a Restaurants object
    const data  = {
        name: request.body.name,
        address: request.body.address,
        ...(request.body.ratings && {ratings: request.body.ratings}),
    };
    const restaurant = await Restaurants.create(data);

    if(request.body?.dishes){
        await Promise.all(request.body.dishes.map(async (dish)=>{
            await Dishes.create({
                name: dish.name,
                price: dish.price,
                restaurant_id: restaurant.restaurant_id
            })
        }));
    }
    result.send(restaurant);
};

// Retrieve all Restaurants (Receive data with condition).
exports.getAllRestaurants = (request, result) => {
    Restaurants.findAll()
        .then(data => {
            result.send(data);
        }).catch(err => {
        result.status(500).send({
            message: err.message || "Some error occurred while retrieving data."
        });
    });
};

// Get Restaurants object by ID
exports.getRestaurantByID = (request, result) => {
    const paramID = request.params.id;
    Restaurants.findOne({
        where: { restaurant_id: paramID },
        attributes:['restaurant_id','name','address','ratings'],
        include: [{
            model: Dishes,
            as: 'menu',
            attributes:['dish_id','name','price']
        }]
    }).then(data => {
        result.send(data);
    }).catch(err => {
        result.status(500).send({
            message: err.message || `Some error occurred while retrieving data with id : ${paramID}`
        });
    });
};

exports.searchRestaurants = async (request, result) => {
    const search = request.query?.search || null;
    let restaurantsData = []
    try{
       const restaurants = await Restaurants.findAll({
            ...(search && { where: { name: { [Op.like]: `%${search}%` }}}) ,
           attributes:['restaurant_id','name']
        })
        restaurantsData.push(...restaurants)
        if(search){
            const restaurantDishes = await Dishes.findAll({
                where:{
                    name: { [Op.like]: `%${search}%` }
                },
                attributes:['name','restaurant_id']
            })

            if(restaurantDishes.length){
                const ids = restaurantDishes.map(ele=>ele.restaurant_id)
                const restaurants = await Restaurants.findAll({
                    where:{
                        restaurant_id: ids
                    },
                    attributes:['restaurant_id','name']
                })
                restaurantsData.push(...restaurants)
            }
        }
       restaurantsData =  _.uniqBy(restaurantsData,'restaurant_id')
        result.send(restaurantsData);

    }catch (e) {
        result.status(500).send({
            message: e.message || `Some error occurred while retrieving data`
        });
    }
};




