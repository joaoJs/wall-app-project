module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {        
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        // isVerified: {
        //     type: BOOLEAN
        // }
    });
  
    return User;
};