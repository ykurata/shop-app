const express = require('express');
const router = express.Router();

const authentication = require("./middleware/auth");

const Item = require('../models').Item;


// Post a new item 
router.post("/", authentication,(req, res) => {
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

module.exports = router;