/**
 * Created by Christos Ploutarchou
 * Project : node_rest_api_with_mysql
 * Filename : Tutorial.js
 * Date: 04/04/2020
 * Time: 00:01
 **/
module.exports = (database, DataTypes) => {
    return database.define("Order", {
        order_id: { field: 'order_id', type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        customer_id:  {
            field: 'customer_id',
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        restaurant_id:  {
            field: 'restaurant_id',
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        subtotal: DataTypes.DECIMAL(10, 2),
        tax: DataTypes.DECIMAL(10, 2),
        total: DataTypes.DECIMAL(10, 2),
        status: DataTypes.STRING(60),
        address: DataTypes.STRING(60),
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    });
};
