const express = require('express');

const path = require('path');
const passport = require('passport');
const jwt = require('jsonwebtoken');


const config = require('./config/database')
const mongoose = require('mongoose');
mongoose.connect(config.database, config.requirements);
const db = mongoose.connection;
db.once('open', function () {
    console.log("Connected to MongoDB successfully!");
}); 
db.on('error', function () {
    console.log(err);
});


const app = express();






// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function (req, res, next) {
    res.locals.user = req.user || null;
    next();
});

// courses API route
app.use('/api/courses', require('./routes/api/courses'));

// categories API route
app.use('/api/categories', require('./routes/api/categories'));

// users API route
app.use('/api/users', require('./routes/api/users'));

app.get('/api/courses/create', verifyToken, (req, res) => {
    jwt.verify(req.admintoken, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.render('add_course');
        }
    });
});

app.get('/api/courses/edit/:id', verifyToken, (req, res) => {
    jwt.verify(req.admintoken, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.render('edit_course');
        }
    });
});

app.get('/api/categories/create', verifyToken, (req, res) => {
    jwt.verify(req.admintoken, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.render('add_category');
        }
    });
});

app.get('/api/categories/edit/:id', verifyToken, (req, res) => {
    jwt.verify(req.admintoken, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.render('edit_category');
        }
    });
});

app.post('/api/users/login', (req, res) => {
    // hard code user
    user = {
        name: 'name',
        email: 'email',
        password: 'password',
        claimed_points: 0,
        unclaimed_points: 0,
        is_admin: true,
        is_disabled: false
    }
    if (user[is_admin]==true){
        jwt.sign({ user }, 'secretkey', (err, admintoken) => {
            res.json({
                admintoken
            });
        });
    }
    
});


// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.admintoken = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }

}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

