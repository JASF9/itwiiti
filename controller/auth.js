const db = require('../database.js');
const bcrypt = require('bcryptjs');

exports.login = (req,res,next) => {

    if(!req.body.nick||!req.body.password){
        res.status(400).send({ message: "There cannot be empty fields."});
    }
    db.User.findOne({where:{nick:req.body.nick}})
    .then(result => {
        const verified = bcrypt.compareSync(req.body.password, result.password);
        if(!verified){ return res.status(400).send({
            message: "Incorrect nick or password."
        })}
        res.writeHead(200, {
            "Set-Cookie" : "nick="+req.body.nick
        }).send()
    })
    .catch(err =>{
        res.status(500).send({
            message: err.message||"Error while loggin."
        })
    })

}