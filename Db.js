const Sequelize = require('sequelize')

const userModel = require('./Models/userModel');
const productModel = require('./Models/productModel');
const ingredientModel = require('./Models/ingredientsModel');

const sequelize = new Sequelize('integracionconti', 'jtapias', 'jtapias1234', {
    host: 'db4free.net',
    dialect: 'mysql'
});

const User = userModel(sequelize, Sequelize); 
const Product = productModel(sequelize, Sequelize); 
const Ingredient = ingredientModel(sequelize, Sequelize); 

sequelize.sync({ force: false })
    .then(() => {
        console.log( 'Synchronized Tables' );
    })

module.exports = {
    User,
    Ingredient,
    Product
}