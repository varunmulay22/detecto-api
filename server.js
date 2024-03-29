const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex= require('knex');
const bcrypt = require('bcrypt');
const register = require('./controllers/Register.js');
const signin = require('./controllers/Signin.js');
const profile = require('./controllers/Profile.js');
const image = require('./controllers/Image.js');

const db = knex({
  client: 'pg',
  connection: {
    host : 'postgresql-asymmetrical-49758',
    user : 'postgres',
    password : 'test',
    database : 'detecto'
  }
});

const app=express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{res.send('it is working');})
app.post('/signin', (req, res)=>{signin.signinHandler(req,res,db,bcrypt)})
app.post('/register', (req, res)=>{register.registerHandler(req,res,db,bcrypt)} )
app.get('/profile/:id', (req, res)=>{profile.profileHandler(req,res,db)})
app.put('/image', (req, res)=>{image.imageHandler(req,res,db)})
app.post('/imageurl', (req, res)=>{image.handleApiCall(req,res)})

var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {console.log("Listening on Port 3000");});