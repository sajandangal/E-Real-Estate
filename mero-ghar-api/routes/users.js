const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const router = express.Router();
const auth = require('../auth');


//ROUTES FOR USER REGISTRATION/ SIGNUP
router.post('/signup', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            throw new Error('Sorry!! could not hash!');
        }
        User.create({
            fullName: req.body.fullName,
            profilePicture: req.body.profilePicture,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            password: hash

        }).then((user) => {
            let token = jwt.sign({ _id: user._id }, process.env.SECRET);
            res.json({ status: "Signup Successful!", token: token });

        }).catch(next);
    });
});

//ROUTES FOR USER LOGIN
router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user == null) {
                let err = new Error('Sorry! User not found.');
                err.status = 401;
                return next(err);
            }
            else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match.');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                        res.json({ status: 'Login Successful!', token: token });
                        //console.log("Login Successful!");
                    }).catch(next);
            }
        }).catch(next);
});

router.get('/myProfile', auth.verifyUser, (req, res, next) => {
    res.json({
        _id: req.user._id, fullName: req.user.fullName, phone: req.user.phone,
        address: req.user.address, email: req.user.email, profilePicture: req.user.profilePicture
    });
});

router.put('/myProfile', auth.verifyUser, (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true })
        .then((user) => {
            res.json(user);

        }).catch(next);
});

router.post('/:id/wishlist', auth.verifyUser, (req, res, next) => {
    User.findOne({ _id: req.user._id })
        .then((user) => {
            user.wishlist.push(req.body)
            user.save()
                .then(user => {
                    res.json(user.wishlist);
                })
                .catch(next);
        })
})
module.exports = router;