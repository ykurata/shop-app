const express = require('express');
const router = express.Router();

const authentication = require("./middleware/auth");

const Message = require('../models').Message;


// Post a new message 
router.post("/:id", authentication, (req, res) => {
  Message.create({
    itemId: req.params.id,
    senderId: req.user,
    recieverId: req.body.recieverId,
    text: req.body.text
  })
})


module.exports = router;