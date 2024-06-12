/**
 * Created by Christos Ploutarchou
 * Project : node_rest_api_with_mysql
 * Filename : Tutorial.js
 * Date: 04/04/2020
 * Time: 00:01
 **/
module.exports = (database, DataTypes) => {
    return database.define("Restaurant", {
        restaurant_id: { field: 'restaurant_id', type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        name: DataTypes.STRING(60),
        address: DataTypes.STRING(60),
        ratings: { type: DataTypes.STRING(140), unique: true },
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    });
};
