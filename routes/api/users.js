const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../../models/Users');

// Gets all Users : database
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        if (!users) throw Error('No items');

        res.status(200).json(users);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

// Gets All Users : hardcode
// router.get('/', (req, res) => res.json(User));




// Get single user : database
router.get('/:id', async (req, res) => {
    try {
        const users = await User.findById(req.params.id);
        if (!users) throw Error('No items');

        res.status(200).json(users);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

// Get Single User: hard code
// router.get('/:id', (req, res) => {
//     const found = User.some(user => user.id === parseInt(req.params.id));

//     if (found) {
//         res.json(User.filter(user => user.id === parseInt(req.params.id)));
//     } else {
//         res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
//     }
// });

// Register Form
router.get('/register', function (req, res) {
    res.render('register');
});

// Register Proccess
router.post('/register', function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;
    const claimed_points = 0;
    const unclaimed_points = 0;
    const is_admin = false;
    const is_disabled = false;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        let newUser = new User({
            name: name,
            email: email,
            password: password,
            claimed_points: claimed_points,
            unclaimed_points: unclaimed_points,
            is_admin: is_admin,
            is_disabled: is_disabled
        });

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                if (err) {
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        req.flash('success', 'You are now registered and can log in');
                        res.redirect('/users/login');
                    }
                });
            });
        });
    }
});

// Login Form
router.get('/login', function (req, res) {
    res.render('login');
});

// Login Process
router.post('/login', function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// logout
router.get('/logout', function (req, res) {
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/users/login');
});


// make admin: database
router.put('/:id', (req, res) => {

    User.findOneAndUpdate({
        is_admin: req.query.is_admin,
    }, req.body, {
        new: true
    })
        .then(User => {
            res.json(User)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// make admin: hard code
// router.put('/:id', (req, res) => {
//     const found = users.some(user => user.id === parseInt(req.params.id));

//     if (found) {
//         const makeAdmin = req.body;
//         users.forEach(user => {
//             if (user.id === parseInt(req.params.id)) {
//                 user.is_admin = makeAdmin.is_admin ? makeAdmin.is_admin : user.is_admin;

//                 res.json({ msg: 'User updated', user });
//             }
//         });
//     } else {
//         res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
//     }
// });


// disable user: database
router.put('/:id', (req, res) => {

    User.findOneAndUpdate({
        is_disabled: req.query.is_disabled,
    }, req.body, {
        new: true
    })
        .then(User => {
            res.json(User)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// disable user: hard code
// router.put('/:id', (req, res) => {
//     const found = users.some(user => user.id === parseInt(req.params.id));

//     if (found) {
//         const disableUser = req.body;
//         users.forEach(user => {
//             if (user.id === parseInt(req.params.id)) {
//                 user.is_disabled = disableUser.is_disabled ? disableUser.is_disabled : user.is_disabled;

//                 res.json({ msg: 'User updated', user });
//             }
//         });
//     } else {
//         res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
//     }
// });

// disable user: database
router.put('/:id', (req, res) => {

    User.findOneAndUpdate({
        is_disabled: req.query.is_disabled,
    }, req.body, {
        new: true
    })
        .then(User => {
            res.json(User)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// disable user: hard code
// router.put('/:id', (req, res) => {
//     const found = users.some(user => user.id === parseInt(req.params.id));

//     if (found) {
//         const disableUser = req.body;
//         users.forEach(user => {
//             if (user.id === parseInt(req.params.id)) {
//                 user.is_disabled = disableUser.is_disabled ? disableUser.is_disabled : user.is_disabled;

//                 res.json({ msg: 'User updated', user });
//             }
//         });
//     } else {
//         res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
//     }
// });

// claim points: database
router.put('/:id', (req, res) => {

    User.findOneAndUpdate({
        claimed_points: req.query.claimed_points,
    }, req.body, {
        new: true
    })
        .then(User => {
            res.json(User)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// claimpoints: hard code
// router.put('/:id', (req, res) => {
//     const found = users.some(user => user.id === parseInt(req.params.id));

//     if (found) {
//         const claimPoints = req.body;
//         users.forEach(user => {
//             if (user.id === parseInt(req.params.id)) {
//                 user.claimed_points = claimPoints.claimed_points ? claimPoints.unclaimed_points : user.claimed_points;

//                 res.json({ msg: 'User updated', user });
//             }
//         });
//     } else {
//         res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
//     }
// });

module.exports = router;