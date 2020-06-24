module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define('message', {        
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }   
    });
  
    return Message;
};