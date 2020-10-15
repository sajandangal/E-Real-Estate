const express = require("express");
const Property = require("../models/property");
const auth = require('../auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

router
  .route("/")
  .get((req, res, next) => {
    Property.find()
      .populate({
        path: 'owner'
      })
      .then(property => {
        if (property == null) throw new Error("Not posted property yet.");
        res.json(property);
      })
      .catch(next);
  })

  .post(auth.verifyUser, (req, res, next) => {
    let property = new Property(req.body);
    property.owner = req.user._id;
    property
      .save()
      .then(property => {
        res.statusCode = 201;
        res.json(property);
      })
      .catch(next);
  })

  .put((req, res, next) => {
    res.statusCode = 405;
    res.json({ message: "Method not allowed." });
  })
  .delete(auth.verifyUser, (req, res, next) => {
    Property.deleteMany({ owner: req.user._id })
      .then(response => {
        console.log("property doesnot belong to yo")
        res.json(response);
      })
      .catch(next);
  });


//router for getting specific properties of user
router.route('/myProperties')
  .get(auth.verifyUser, (req, res, next) => {
    Property.find({ owner: req.user._id })
      .populate({
        path: 'owner'
      })
      .then((properties) => {
        if (properties == null) throw new Error("No property posted yet.");
        res.json(properties);
      })
  })


//SPECIFIC PROPERTY DETAIL
router
  .route("/:id")
  .get((req, res, next) => {
    Property.findOne({ _id: req.params.id })
      .populate({
        path: 'owner'
      })
      .then(property => {
        if (property == null) throw new Error("Property has been removed.");
        res.json(property);
      })
      .catch(next);
  })
  .post((req, res, next) => {
    res.statusCode = 405;
    res.json({ message: "Method not allowed." });
  })
  .put(auth.verifyUser, (req, res, next) => {
    Property.findOneAndUpdate(
      { owner: req.user._id, _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
      .populate({
        path: 'owner'
      })
      .then(reply => {
        if (reply == null) throw new Error("Sorry, property update failed.");
        res.json(reply);
      })
      .catch(next);
  })
  .delete(auth.verifyUser, (req, res, next) => {
    Property.findOneAndDelete({ owner: req.user._id, _id: req.params.id })
      .populate({
        path: 'owner'
      })
      .then(response => {
        res.json(response);
      })
      .catch(next);
  });

//FACILITIES ARE MAINTAINED IN THE PROPERTY FROM THESE ROUTES
router
  .route("/:id/facilities")
  .get(auth.verifyUser, (req, res, next) => {
    Property.findOne({ _id: req.params.id })
      .then(property => {
        res.json(property.facilities);
      })
      .catch(next);
  })
  .post(auth.verifyUser, (req, res, next) => {
    Property.findOne({ owner: req.user._id, _id: req.params.id })
      .then(property => {
        property.facilities.push(req.body);
        property
          .save()
          .then(property => {
            res.json(property.facilities);
          })
          .catch(next);
      })
      .catch(next);
  })
  .put((req, res, next) => {
    res.statusCode = 405;
    res.json({ message: "Method not allowed" });
  })
  .delete(auth.verifyUser, (req, res, next) => {
    Property.findOne({ owner: req.user._id, _id: req.params.id })
      .then(property => {
        property.facilities = [];
        property
          .save()
          .then(property => {
            res.json(property.facilities);
          })
          .catch(next);
      })
      .catch(next);
  });

router
  .route("/:id/facilities/:fid")
  .get(auth.verifyUser, (req, res, next) => {
    Property.findOne({ owner: req.user._id, _id: req.params.id })
      .then(property => {
        let facility = property.facilities.id(req.params.fid);
        res.json(facility);
      })
      .catch(next);
  })

  .post(auth.verifyUser, (req, res, next) => {
    res.statusCode = 405;
    res.json({ message: "Method not allowed" });
  })

  .put(auth.verifyUser, (req, res, next) => {
    Property.findOne({ owner: req.user._id, _id: req.params.id })
      .then(property => {
        let facility = property.facilities.id(req.params.fid);
        facility.facility = req.body.facility;
        property
          .save()
          .then(() => {
            res.json(facility);
          })
          .catch(next);
      })
      .catch(next);
  })
  .delete(auth.verifyUser, (req, res, next) => {
    Property.findOne({ owner: req.user._id, _id: req.params.id })
      .then(property => {
        property.facilities.pull(req.params.fid);
        property
          .save()
          .then(property => {
            res.json(property.facilities);
          })
          .catch(next);
      })
      .catch(next);
  });


//This routes will help you in operating rooms of the property
router
  .route("/:id/rooms")
  .get(auth.verifyUser, (req, res, next) => {
    Property.findOne({ owner: req.user._id, _id: req.params.id })
      .then(property => {
        res.json(property.rooms);
      })
      .catch(next);
  })

  .post(auth.verifyUser, (req, res, next) => {
    Property.findOne({ owner: req.user._id, _id: req.params.id })
      .then(property => {
        property.rooms.push(req.body);
        property
          .save()
          .then(property => {
            res.json(property.rooms);
          })
          .catch(next);
      })
      .catch(next);
  })

  .put((req, res, next) => {
    res.statusCode = 405;
    res.json({ message: "Method not allowed" });
  })

  .delete(auth.verifyUser, (req, res, next) => {
    Property.findOne({ owner: req.user._id, _id: req.params.id })
      .then(property => {
        property.rooms = [];
        property
          .save()
          .then(property => {
            res.json(property.rooms);
          })
          .catch(next);
      })
      .catch(next);
  });

router
  .route("/:id/rooms/:rid")
  .get(auth.verifyUser, (req, res, next) => {
    Property.findOne({ owner: req.user._id, _id: req.params.id })
      .then(property => {
        let room = property.rooms.id(req.params.rid);
        res.json(room);
      })
      .catch(next);
  })
  .post((req, res, next) => {
    res.statusCode = 405;
    res.json({ message: "Method not allowed" });
  })

  .put(auth.verifyUser, (req, res, next) => {
    Property.findOne({ owner: req.user._id, _id: req.params.id })
      .then(property => {
        let room = property.rooms.id(req.params.rid);
        room.room = req.body.room;
        room.noofroom = req.body.noofroom;
        property
          .save()
          .then(() => {
            res.json(room);
          })
          .catch(next);
      })
      .catch(next);
  })

  .delete(auth.verifyUser, (req, res, next) => {
    Property.findOne({ owner: req.user._id, _id: req.params.id })
      .then(property => {
        property.rooms.pull(req.params.rid);
        property
          .save()
          .then(property => {
            res.json(property.rooms);
          })
          .catch(next);
      })
      .catch(next);
  });

//ROUTES FOR COMMENTS AND ASSOCIATED USER FOR SPECIFIC PROPERTY
router
  .route("/:id/comments")
  .get()
  .post()
  .put()
  .delete();

router
  .route("/:id/comments/:cid")
  .get()
  .post()
  .put()
  .delete();

module.exports = router;
