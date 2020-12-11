const db = require('../database.js');
const Posts = db.Posts;
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

exports.posts_create = (req,res,next) => {

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

        Posts.create({
            description:req.body.description,
            media: req.file.path
        }).then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Post could not be created"
            });
        });
        
    });
};

exports.posts_update = (req,res,next) => {

    let upload = multer({ storage: storage}).single('media');
    const id = req.query.id;

    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send({message : 'Please select an image to upload'});
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        Posts.upload({
            description:req.body.description,
            media: req.file.path
        },{where:{id:id}}).then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Post could not be updated"
            });
        });
    });
}

exports.posts_delete = (req,res,next) => {

    var id = req.query.id

    Posts.destroy({where:{id: id} })
    .then (result => {
        res.send(result);    
    })
    .catch(err => { 
        res.status(500).send({
            message: err.message || "Could not delete user."
        })
    })   
}

exports.posts_get_all = (req, res, next) => {
   
    const nick = req.query.nick
    Posts.findAll({where: {creator:nick}})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        return res.status(500).send({
            message:err.message||"Error while searching users."});
    });
};

exports.posts_get = (req, res, next) => {
   
    const id = req.query.id
    Posts.findOne({where: {id:id}})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        return res.status(500).send({
            message:err.message||"Error while searching users."});
    });
};
