const express = require("express");
const Wishlist = require("../models/wishlist");
const auth = require('../auth');

const router = express.Router();

//ROUTES FOR OPERATING WISHLISTS
router.route("/")
    .get(auth.verifyUser, (req, res, next) => {
        Wishlist.find({ user: req.user._id })
            .populate({
                path: 'properties'
            })
            .populate({
                path: 'properties.owner'
            })
            .then((wishlist) => {
                if (wishlist == null) throw new Error("No wishlist property yet.");
                res.json(wishlist);
            }).catch(next)
    })

    .post(auth.verifyUser, (req, res, next) => {
        let wishlist = new Wishlist(req.body);
        wishlist.user = req.user._id;
        //wishlist.properties = req.properties._id;
        // wishlist.properties.push(req.properties._id)
        wishlist.save()
            .then((wishlist) => {
                res.json(wishlist);
            }).catch(next)
    })

    .put((req, res, next) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed" });
    })

    .delete(auth.verifyUser, (req, res, next) => {
        Wishlist.deleteMany({ user: req.user._id })
            .then(response => {
                res.json(response);
            })
            .catch(next);
    })

//ROUTES FOR OPERATING SPECIFIC WISHLISTS
router.route('/:wid')
    .get(auth.verifyUser, (req, res, next) => {
        Wishlist.findOne({ user: req.user._id, _id: req.params.wid })
            // .populate({
            //     path: 'properties'
            // })
            .then((property) => {
                res.json(property);
            })

    })
    .delete(auth.verifyUser, (req, res, next) => {
        Wishlist.findOneAndDelete({ user: req.user._id, _id: req.params.wid })
            .then(response => {
                res.json(response);
            })
            .catch(next);
    })

module.exports = router;