module.exports = (sequelize,Sequelize) =>{ 
    const Posts = sequelize.define ('Posts',{
        description:{
            type:Sequelize.STRING(240),
            allowNull: false
        },
        media:{
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