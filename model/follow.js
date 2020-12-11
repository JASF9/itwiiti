module.exports = (sequelize,Sequelize) =>{ 
    const Follow = sequelize.define ('Follow',{
        id:{
            type:Sequelize.INTEGER,
            autoincrement: true,
            primaryKey: true,
            allowNull: false
        }
    });
}