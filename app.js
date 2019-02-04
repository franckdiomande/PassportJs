const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
// const localStrategy = require('passport-local').Strategy;
// const mongo = require('mongodb');
const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo_sktwiup6jrmccbde:27017/passport');
const db = mongoose.connection;

/*db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('okdsdsd');
});*/


// Include routes
const routes = require('./routes/index');

// Include users
const users = require('./routes/users');

// Init app
const app = express();


// View engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

// BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Express session
app.use(session({
    secret: 'passport',
    saveUninitialized: true,
    resave: true
}));

// Init passport
app.use(passport.initialize());
app.use(passport.session());

// Express validator
app.use(expressValidator({
    errorFormatter(param, msg, value, location) {
        let namespace = param.split('.');
        let root = namespace.shift();
        let formParam = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }

        return {
            param: formParam,
            msg: msg,
            value: value
        }

    }
}));

// Connect flash
app.use(flash());


// Global vars
app.use((req, res, next)=>{

    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');

    next();
});

app.use('/', routes);
app.use('/users', users);


// Set port
// app.set('port', process.env.PORT || 9000);

app.listen(80);


