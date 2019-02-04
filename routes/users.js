const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

router.get('/register', (req, res)=>{

    res.render('register');

});

router.get('/login', (req, res)=>{

    res.render('login');

});


router.post('/register', (req, res)=>{


    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    // Validation
    // req.checkBody('name', 'Name can not be empty').notEmpty();
    // req.checkBody('email', 'Email can not be empty').notEmpty();
    // req.checkBody('email', 'Email is not valid').isEmail();
    // req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if(errors){
        res.render('register', {errors})
    }else {
        let newUser = new User({
            name,
            username,
            password,
            email
        });

        User.createUser(newUser, (error, user)=>{
            if(error){
                throw error;
            }
            console.log(user);
        });

        req.flash('success_msg', 'Vous etes inscrit !');
        res.redirect('/users/login')
    }


});

module.exports = router;