const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize, type) =>{ 
    const Ingredient = sequelize.define('Ingredient', {
        ingredient_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            required: true,
            max: 100
        },
        quantity: {
            type: DataTypes.INTEGER,
            required: true,
        },
    })
    return Ingredient;
}