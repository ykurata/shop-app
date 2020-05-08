const express = require('express');
const router = express.Router();

const authentication = require("./middleware/auth");

const Item = require('../models').Item;
const validateItemInput = require("../validation/item");


// Post a new item 
router.post("/", authentication, (req, res) => {
  // form validation 
  const { errors, isValid } = validateItemInput(req.body);
  // check validation 
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Item.create({
    userId: req.user,
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price
  })
  .then(item => {
    res.json(item);
  })
  .catch(err => {
    console.log(err);
  });
});


// Upadate a posted item
router.put("/update/:id", authentication, (req, res) => {
  // form validation 
  const { errors, isValid } = validateItemInput(req.body);
  // check validation 
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Item.findOne({ where: { id: req.params.id }})
    .then(item => {
      item.update({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price
      })
      res.status(200).json(item);
    })
    .catch(err => {
      console.log(err);
    });
});


// GET all items 
router.get("/all", (req, res) => {
  Item.findAll({ order: [[ "createdAt", "DESC"]]})
    .then(items => {
      res.status(200).json(items);
    })
    .catch(err => {
      console.log(err);
    });
});


// GET by item's id
router.get("/get/:id", (req, res) => {
  Item.findOne({ where: { id: req.params.id }})
    .then(item => {
      res.status(200).json(item);
    })
    .catch(err => {
      console.log(err);
    });
});


// Get list of items by userId
router.get("/get/by-user/:id", (req, res) => {
  Item.findAll({ where: { userId: req.params.id}})
    .then(items => {
      res.status(200).json(items);
    })
    .catch(err => {
      console.log(err);
    });
});


// DELETE an item by item's id
router.delete("/delete/:id", authentication, (req, res) => {
  Item.findOne({ where: { id: req.params.id }})
    .then(item => {
      item.destroy();
      return res.json({ message: "Successfully deleted"});
    })
    .catch(err => {
      console.log(err);
    });
});


module.exports = router;