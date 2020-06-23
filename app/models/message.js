module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define('message', {        
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: Sequelize.STRING
        }
    });
  
    return Message;
};