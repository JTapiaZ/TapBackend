const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize, type) =>{ 
    const Product = sequelize.define('Product', {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            required: true,
            max: 100
        },
        description: {
            type: DataTypes.STRING,
            required: true,
            max: 500
        },
        price: {
            type: DataTypes.STRING,
            required: true,
            max: 100
        },
        ingredient_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Ingredients',
                key: 'ingredient_id'
            },
            allowNull: false,
        }
    })
    return Product;
}