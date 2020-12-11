const db = require('../model');
const Like = db.Like;

exports.like_create = (req,res,next) => {
    if(!req.cookies.nick) return res.status(400).send();
    var nick = req.cookies.nick
    var id = req.query.id
    Like.create({
        like: true,
        dislike: false,
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

exports.dislike_create = (req,res,next) => {
    if(!req.cookies.nick) return res.status(400).send();
    var nick = req.cookies.nick
    var id = req.query.id
    Like.create({
        like: false,
        dislike: true,
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

exports.like_change = (req,res,next) => {
    if(!req.cookies.nick) return res.status(400).send();
    var nick = req.cookies.nick
    var id = req.query.id
    var change = req.body.change
    if(change==true){
        Like.update({
            like: false
        }, {where : {creator:nick, topost:id}})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Could not post comment"
            });
        }); 
    }
    else{
        Like.update({
            like: true,
            dislike: false
        }, {where : {creator:nick, topost:id}})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Could not post comment"
            });
        }); 
    }
}

exports.dislike_change = (req,res,next) => {
    if(!req.cookies.nick) return res.status(400).send();
    var nick = req.cookies.nick
    var id = req.query.id
    var change = req.body.change
    if(change==true){
        Like.update({
            dislike: false
        }, {where : {creator:nick, topost:id}})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Could not post comment"
            });
        }); 
    }
    else{
        Like.update({
            like: false,
            dislike: true
        }, {where : {creator:nick, topost:id}})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Could not post comment"
            });
        }); 
    }
}

exports.like_get = (req,res,next) => {
    if(!req.cookies.nick) return res.status(400).send();
    var nick = req.cookies.nick
    var id = req.query.id
    Comment.findOne({where:{creator: nick, topost:id}})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Could not retrieve comments"
        });
    }); 
    
}
