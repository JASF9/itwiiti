const db = require('../model');
const Comment = db.Commnet;
const Op = db.Sequelize.Op;

exports.comment_create = (req,res,next) => {
    if(!req.cookies.nick) return res.status(400).send();
    var nick = req.cookies.nick
    var id = req.query.id
    Comment.create({
        content: req.body.content,
        creator:nick,
        topost: id
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Could not post comment"
        });
    }); 
}

exports.comment_get = (req,res,next) => {
    var id = req.query.id
    Comment.findAll({where:{topost:id}})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Could not retrieve comments"
        });
    }); 
    
}