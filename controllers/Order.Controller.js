/**
 * Created by Christos Ploutarchou
 * Project : node_rest_api_with_mysql
 * Filename : Sequelize.js
 * Date: 04/04/2020
 * Time: 22:08
 **/

const db = require("../models");
const _ = require("lodash");
const {response} = require("express");
const Restaurants = db.restaurants;
const Orders = db.orders;
const OrderItems = db.orderItems;
const Customers = db.customers;
const Dishes = db.dishes;
const Op = db.Sequelize.Op;

// Create and save new Restaurants
exports.postCart = async (request, result) => {
    if (!request.body.user_email || !request.body.user_name || !request.body.dish_id ||!request.body.quantity || !request.body.restaurant_id) {
        result.status(400).send({
            message: "User email, name  and dish, quantity, restaurant can not be empt"
        });
    }
    let customer = null;
    let order = null;
    await db.databaseConf.transaction(async (t) => {

        // Create or find customer with user_email
         customer = await Customers.findOrCreate({
            where: { email: request.body.user_email },
            defaults: { email: request.body.user_email, firstname: request.body.user_name},
            transaction: t
        });

        const dish = await Dishes.findOne({
            where: { dish_id: request.body.dish_id }
        });

        if(dish){
            // Create or find order with customer_id and status 'open'
             order = await Orders.findOrCreate({
                where: { customer_id: customer[0].customer_id, status: 'open' },
                defaults: { customer_id: customer[0].customer_id, status: 'open', customer_id: customer[0].customer_id, restaurant_id: request.body.restaurant_id  },
                transaction: t
            });
             if(order){
                 const taxRate  =  1.5;
                 const total =( _.toNumber( order[0].total) + _.toNumber(dish.price * request.body.quantity))*taxRate;
                 const subtotal = _.toNumber( order[0].subtotal) + _.toNumber(dish.price * request.body.quantity);
                 const tax = total - subtotal;
                 // Create or find order item with order_id and dish_id and quantity
                 const orderItem = await OrderItems.create({
                     order_id: order[0].order_id, dish_id: request.body.dish_id, quantity: request.body.quantity, price: dish.price
                 },{ transaction: t});
                 await Orders.update({
                        total: total,
                        subtotal: subtotal,
                         tax: tax
                    }, {where: {order_id: order[0].order_id}},
                        { transaction: t}
                    )

             }

        }

    });
    result.send({customer_id:customer[0].customer_id,cart_id:order[0].order_id});

};


exports.checkout =  async (request, result) => {
    const cartId = request.params.cartId;
    if (!cartId) {
        result.status(400).send({
            message: "Cart ID can not be empt"
        });
    }
    // get order with order items for customer_id
    const cart = await Orders.findOne({
        where: { order_id: cartId, status: 'open' },
        attributes:{exclude:['createdAt','updatedAt','created_at','updated_at','customer_id','restaurant_id','address']},
        include: [{
            model: Restaurants,
            as: 'restaurant',
            attributes: ['name', 'address'],
        },{
            model: Customers,
            as: 'customer',
            attributes: ['firstname', 'email'],

        },{
            model: OrderItems,
            as: 'orderItems',
            attributes:{exclude:['createdAt','updatedAt','created_at','updated_at']},
            include: [{
                model: Dishes,
                as: 'dish',
                attributes: ['name', 'price'],
            }]
        }]
    });
    if(!cart){
        result.status(400).send({
            message: "Cart ID not found"
        });
    }
    const cartDetails = {
        cart_id: cart.order_id,
        customer: cart.customer,
        restaurant: cart.restaurant,
        cart: cart.orderItems,
        subtotal: cart.subtotal,
        tax: cart.tax,
        total_bill: cart.total
    }

    result.send(cartDetails)

}





