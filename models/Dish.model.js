/**
 * Created by Christos Ploutarchou
 * Project : node_rest_api_with_mysql
 * Filename : Tutorial.js
 * Date: 04/04/2020
 * Time: 00:01
 **/
module.exports = (database, DataTypes) => {
    return database.define("Dish", {
        dish_id: { field: 'dish_id', type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        restaurant_id:  {
            field: 'restaurant_id',
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        name: DataTypes.STRING(60),
        price: DataTypes.DECIMAL(10, 2),
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    });
};
