/**
 * Created by Christos Ploutarchou
 * Project : node_rest_api_with_mysql
 * Filename : Tutorial.js
 * Date: 04/04/2020
 * Time: 00:01
 **/
module.exports = (database, DataTypes) => {
    return database.define("Customer", {
        customer_id: { field: 'customer_id', type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        firstname: DataTypes.STRING(60),
        lastname: DataTypes.STRING(60),
        email: { type: DataTypes.STRING(140), unique: true },
        country_code: DataTypes.STRING(3),
        customer_phone: DataTypes.STRING(15),
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    });
};
