module.exports = (sequelize, type) => {
    return sequelize.define('User', {
        user_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: type.STRING,
            required: true,
            max: 100
        },
        username: {
            type: type.STRING,
            required: true,
            max: 100
        },
        password: {
            type: type.STRING,
            required: true,
            max: 100
        },
        phone: {
          type: type.STRING,
          required: true,
          unique: true,
          max: 50
        },
        email: {
          type: type.STRING,
          required: true,
          lowercase: true,
          unique: true,
          trim: true
        },
        role: {
            type: type.STRING,
            allowNull: false,
            defaultValue: 'user'
        },   
    })
}