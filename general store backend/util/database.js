const Sequelize = require('sequelize');

const sequelize = new Sequelize('general-store','root','K8321@art#',{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;