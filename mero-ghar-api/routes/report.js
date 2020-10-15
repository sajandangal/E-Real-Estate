const express = require("express");
const Reports = require("../models/reports");
const auth = require('../auth');

const router = express.Router();

router.route("/")
    .get(auth.verifyAdmin, (req, res, next) => {
        Reports.find()
            .then((reports) => {
                if (reports == null) throw new Error("No report of property yet.");
                res.json(reports);
            }).catch(next)
    })

    .post(auth.verifyUser, (req, res, next) => {
        let complain = new Reports(req.body);
        complain.reported_by = req.user._id;
        //wishlist.properties = req.properties._id;
        // wishlist.properties.push(req.properties._id)
        complain.save()
            .then((complain) => {
                res.json(complain);
            }).catch(next)
    })

    .put((req, res, next) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed" });
    })

    .delete(auth.verifyAdmin, (req, res, next) => {
        Wishlist.deleteMany({ user: req.user._id })
            .then(response => {
                res.json(response);
            })
            .catch(next);
    })

router.route('/:rid')
    .delete(auth.verifyAdmin, (req, res, next) => {
        Report.findOneAndDelete({ _id: params.rid })
            .then(response => {
                res.json(response);
            })
            .catch(next);
    })

module.exports = router;