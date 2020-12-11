module.exports = (sequelize,Sequelize) =>{
    const User =  sequelize.define ('User',{
        firstname:{
            type:Sequelize.STRING,
            allowNull: false
        },
        lastname:{
            type:Sequelize.STRING,
            allowNull: false
        },
        nick:{
            type:Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        password:{
            type:Sequelize.STRING,
            allowNull: false
        },
        private:{
            type:Sequelize.BOOLEAN,
            allowNull: false
        },
        photo:{
            type:Sequelize.STRING,
            allowNull: true
        }
    });
}