require('dotenv').config()

module.exports = {
    HOST: 'https://wall-app-joao.herokuapp.com/',
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASS,
    DB: "wall_app",
    dialect: "mysql"
};