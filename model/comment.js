module.exports = (sequelize,Sequelize) =>{ 
    const Comment = sequelize.define ('Comment',{
        content:{
            type:Sequelize.STRING,
            allowNull: false
        },
        id:{
            type:Sequelize.INTEGER,
            autoincrement: true,
            primaryKey: true,
            allowNull: false
        }
    });
}