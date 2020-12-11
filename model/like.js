module.exports = (sequelize,Sequelize) =>{
    const Like =  sequelize.define ('Like',{
        like:{
            type:Sequelize.BOOLEAN,
            allowNull: true
        },
        dislike:{
            type:Sequelize.BOOLEAN,
            allowNull: true
        }
    });
}