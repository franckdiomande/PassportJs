const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');
// mongoose.connect('mongodb://mongo_sktwiup6jrmccbde:27017/passport');
// const db = mongoose.connection;

const UserSchema = mongoose.Schema({

    name: {
        type: String,

    },

    username: {
        type: String,
        index: true,

    },

    password: {
        type: String,

    },

    email: {
        type: String,

    },

});

let User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = (newUser, callback)=>{

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {

            newUser.password = hash;
            newUser.save(callback);

        });
    });


};