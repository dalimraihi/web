const express = require('express');

const user = require ('../controllers/admin');

const formidable = require('express-formidable');


const route = express.Router();


route.post('/logindash',user.logindash)

//route.post('/createPhoto', formidable() , user.createphoto)


module.exports = route 