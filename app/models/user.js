module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user1', {        
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    });
  
    return User;
};