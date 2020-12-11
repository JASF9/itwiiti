const db = require('../model');
const Follow = db.Follow;
const Op = db.Sequelize.Op;

exports.follow_create = (req,res,next) => {
    if(!req.cookies.nick) return res.status(400).send();
    var nick = req.cookies.nick
    var target = req.query.nick
    Follow.create({
        owner:target,
        follower: nick
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Could not set follow"
        });
    }); 
}

exports.follow_delete = (req,res,next) => {
    if(!req.cookies.nick) return res.status(400).send();
    var nick = req.cookies.nick
    var target = req.query.nick
    Follow.destroy({ where:{
        owner:target,
        follower: nick
    }
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Could not eliminate follow"
        });
    });
}

exports.follow_get = (req,res,next) => {
    if(!req.cookies.nick) return res.status(400).send();
    var nick = req.cookies.nick
    var owner = req.query.nick
    Follow.findAll({ where:{
        owner:owner,
        follower: nick
    }
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Could not get follow"
        });
    });
}

