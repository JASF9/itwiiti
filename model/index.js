const Sequelize = require("sequelize");

const sequelize = new Sequelize({
    host: "ec2-52-201-184-16.compute-1.amazonaws.com",
    database: "d3r9612757a8rm",
    user: "jwuwrzrvrcqerm",
    port: "5432",
    password: "9eb74723f384dbeb2b0e4b84a36da3815ad666aaaf17014198f58f40fc33fbab"
}
)
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Posts = require("./posts")(sequelize,Sequelize);
db.Follow = require("./follow")(sequelize,Sequelize);
db.Comment = require("./comment")(sequelize)(Sequelize);
db.Like = require("./like")(sequelize)(Sequelize);

//Relations
db.Posts.belongsTo(db.User,{as:'creator'});

db.Follow.belongsTo(db.User, {as: 'owner'});
db.Follow.belongsTo(db.User, {as: 'follower'});

db.Comment.belongsTo(db.User, {as: 'creator'});
db.Comment.belongsTo(db.Posts, {as: 'topost'});

db.Like.belongsTo(db.User, {as: 'creator'});
db.Like.belongsTo(db.Posts, {as: 'topost'});

module.exports = db;