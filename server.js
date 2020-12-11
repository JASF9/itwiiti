const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const Sequelize = require('sequelize');

const userRoutes = require('./route/user ') 
const postsRoutes = require('./route/posts')
const followRoutes = require('./route/follow')
const commentRoutes = require('./route/comment')
const likeRoute = require('./route/like') 
const authRoutes = require('./route/auth') 

const app = express();
const cookieParser = require("cookie-parser")



const PORT = process.env.PORT || 8000;

app.use(cors())
app.use(cookieParser())
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));

app.use('/user', userRoutes)
app.use('/post', postsRoutes)
app.use('/follow',followRoutes)
app.use('/comment',commentRoutes)
app.use('/like',likeRoute)
app.use('/auth', authRoutes)

app.use((req, res) => {
  res.status(404).send({'message': 'Errorrrrr 404'});
});

const db = require("./model");
db.sequelize.sync({force:true});

app.listen(PORT, () => {
    console.log('servidor corriendo en el puerto: ' + PORT) 
})
.catch(err => console.log(err));