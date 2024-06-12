/**
 * Created by Christos Ploutarchou
 * Project : node_rest_api_with_mysql
 * Filename : Tutorial.js
 * Date: 04/04/2020
 * Time: 00:01
 **/
module.exports = (database, DataTypes) => {
    return database.define("OrderItem", {
        order_item_id: { field: 'order_item_id', type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        order_id:  {
            field: 'order_id',
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        dish_id:  {
            field: 'dish_id',
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        quantity: DataTypes.INTEGER,
        price: DataTypes.DECIMAL(10, 2),
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    });
};
