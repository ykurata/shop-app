const express = require('express');
const router = express.Router();
var multer  = require('multer');
var AWS = require('aws-sdk');

const upload = require("./service/upload");
const authentication = require("./middleware/auth");
const Item = require('../models').Item;

// Post multiple images
router.post("/:id", upload.array('image', 4), authentication, (req, res) => {
  Item.findOne({ where: { id: req.params.id }})
    .then(item => {
      if (!item) {
        return res.status(400).json({ error: "Item is not found" });
      }
      const filesArr = [];
      req.files.map(file => filesArr.push(file.location));
     
      item.update({
        image: filesArr
      })
      .then(item => {
        res.status(200).json(item);
      })
      .catch(err => {
        res.status(400).json(err);
      });
    });
});

module.exports = router;