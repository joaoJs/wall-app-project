require('dotenv').config()

module.exports = {
    HOST: 'mysql://bd500a2021d5e6:a3ac542a@us-cdbr-east-02.cleardb.com/heroku_2e8f25497f4007a?reconnect=true',
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASS,
    DB: "wall_app",
    dialect: "mysql"
};