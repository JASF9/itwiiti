const db = require('../model');
const User = db.User;
const Posts = db.Posts;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

exports.user_create = (req,res,next) => {

    if(!req.body.firstname||!req.body.lastname||!req.body.nick||!req.body.password){
        res.status(400).send({ message: "There cannot be empty fields."});
    }

    const hash = bcrypt.hashSync(req.body.password,10);
   
    if(!isNickUnique(req.body.nick)){
        res.status(400).send({
            message: "The nick is taken."
        })
    }
    User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        nick: req.body.nick,
        password: hash,
        private: req.body.private,
    }).then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "User could not be created"
        });
    });
};

exports.user_update = (req,res,next) => {
    
    const hash = bcrypt.hashSync(req.body.password,10);
    
    if(!isNickUnique(req.body.nick)){
    res.status(400).send({
            message: "The nick is taken."
        })
    }
    User.update({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        nick: req.body.nick,
        password: hash
    },{
        where:{
            nick:req.query.nick
        }})
    .then(data => {
        if(data.length){
            res.send(data)
        }      
    })
    .catch(err => { 
        res.status(500).send({
            message: err.message || "Could not update user info."
        })
    })
}

exports.user_delete = (req, res, next) => {

    var nick = req.query.text

    Posts.destroy({where:{creator:nick}});
    User.destroy({where:{nick: nick} })
    .then (result => {
        res.send(result);    
    })
    .catch(err => { 
        res.status(500).send({
            message: err.message || "Could not delete user."
        })
    })
}

exports.user_search = (req, res, next) => {
   
    const nick = req.query.text
    var condition = nick ? {nick: { [Op.iLike]: `%${nick}%`}} :null;
    
    User.findAll({where: condition})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        return res.status(500).send({
            message:err.message||"Error while searching users."});
    });
};

exports.user_get_other = (req,res,next) => {
    var nick = req.query.nick
    User.findOne({where:{nick : nick}})
    .then (data => {
        res.send(data)
    })
    .catch(err => {
        return res.status(500).send({
            message:err.message||"Error while searching users."});
    });
    
}

exports.user_get_all = (req, res, next) => {
   
    User.findAll()
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        return res.status(500).send({
            message:err.message||"Error while getting users."});
    });
};

exports.user_get  = (req, res, next) => {
    if(!req.cookies.nick) return res.status(400).send();
    var nick = req.cookies.nick
    User.findOne({where:{nick : nick}})
    .then (data => {
        res.send(data)
    })
    .catch(err => {
        return res.status(500).send({
            message:err.message||"Error while searching users."});
    });

}

exports.set_photo = (req,res,next) => {

    let upload = multer({ storage: storage}).single('media');

    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        User.update({
            photo: req.file.path
        },{
            where:{
                nick:req.query.nick
            }})
        .then(data => {
            if(data.length){
                res.send(data)
            }      
        })
        .catch(err => { 
            res.status(500).send({
                message: err.message || "Could not upload user's photo."
            })
        })  
    });
    
}

const isNickUnique = (nickname) => {
    User.findOne( {where:{nick: nickname}})
    .then(data => {
        if(!data.length){
            return true;
        }
        else{
            return false;
        }
    })
    .catch( () => {
        return false;
    })
}
